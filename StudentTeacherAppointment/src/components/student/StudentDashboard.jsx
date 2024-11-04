import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

function StudentDashboard() {
  const { user } = useAuth();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const allSlots = JSON.parse(localStorage.getItem('teacherAvailability') || '[]');
      const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');

      // Filter slots that are available and pending (relevant for this student)
      const relevantSlots = allSlots.filter(slot => 
        slot.status === 'available' || 
        (slot.status === 'pending' && slot.studentEmail === user.email)
      );
      setAvailableSlots(relevantSlots);

      // Load confirmed appointments for the student
      const userConfirmedAppointments = allAppointments.filter(apt => 
        apt.studentEmail === user.email && apt.studentConfirmed
      );
      setConfirmedAppointments(userConfirmedAppointments);
    };

    loadData();
    const intervalId = setInterval(loadData, 5000);
    return () => clearInterval(intervalId);
  }, [user.email]);

  const handleConfirmAppointment = (appointmentId) => {
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedAppointments = allAppointments.map(apt =>
      apt.id === appointmentId ? { ...apt, studentConfirmed: true } : apt
    );

    // Update state after confirmation
    const confirmedAppointment = updatedAppointments.find(apt => apt.id === appointmentId);
    if (confirmedAppointment && !confirmedAppointments.some(apt => apt.id === appointmentId)) {
      setConfirmedAppointments(prev => [...prev, confirmedAppointment]);
    }

    // Update local storage
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    // Remove the confirmed appointment from available slots
    setAvailableSlots(prevSlots => prevSlots.filter(slot => slot.id !== appointmentId));
    toast.success('Appointment confirmed');
  };

  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Available Appointments</h2>
        <div className="space-y-4">
          {availableSlots.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No available appointments at the moment.</p>
          ) : (
            availableSlots.map((slot) => (
              <div key={slot.id} className="border p-4 rounded">
                <p className="font-medium">Teacher: {slot.teacherName}</p>
                <p>Date: {slot.date}</p>
                <p>Time: {slot.time}</p>
                <p>Duration: {slot.duration} minutes</p>
                <p>Status: Available</p>
                <button
                  onClick={() => handleConfirmAppointment(slot.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                >
                  Confirm Appointment
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">My Appointments</h2>
        <div className="space-y-4">
          {confirmedAppointments.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No confirmed appointments yet.</p>
          ) : (
            confirmedAppointments.map((appointment) => (
              <div key={appointment.id} className="border p-4 rounded">
                <p className="font-medium">Teacher: {appointment.teacherName}</p>
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
                <p>Duration: {appointment.duration} minutes</p>
                <p>Purpose: {appointment.purpose}</p>
                <p>Status: Confirmed</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentDashboard;
