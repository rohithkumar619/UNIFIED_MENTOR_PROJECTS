import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

function TeacherDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newSlot, setNewSlot] = useState({
    date: '',
    time: '',
    duration: 30
  });

  useEffect(() => {
    const loadData = () => {
      const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const teacherAppointments = storedAppointments.filter(apt => apt.teacherEmail === user.email);
      const storedAvailability = JSON.parse(localStorage.getItem('teacherAvailability') || '[]');
      const teacherAvailability = storedAvailability.filter(slot => slot.teacherEmail === user.email);
      
      setAppointments(teacherAppointments);
      setAvailability(teacherAvailability);
    };

    loadData();
    const intervalId = setInterval(loadData, 5000);
    return () => clearInterval(intervalId);
  }, [user.email]);

  const handleAddSlot = (e) => {
    e.preventDefault();
    const slot = {
      id: Date.now(),
      teacherEmail: user.email,
      teacherName: user.name,
      ...newSlot,
      status: 'available'
    };

    const updatedAvailability = [...availability, slot];
    setAvailability(updatedAvailability);
    
    const allAvailability = JSON.parse(localStorage.getItem('teacherAvailability') || '[]');
    allAvailability.push(slot);
    localStorage.setItem('teacherAvailability', JSON.stringify(allAvailability));
    
    setNewSlot({ date: '', time: '', duration: 30 });
    toast.success('Availability slot added');
  };

  const handleAppointmentAction = (appointmentId, status) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status } : apt
    );
    
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedAllAppointments = allAppointments.map(apt =>
      apt.id === appointmentId ? { ...apt, status } : apt
    );
    
    localStorage.setItem('appointments', JSON.stringify(updatedAllAppointments));
    setAppointments(updatedAppointments);
    toast.success(`Appointment ${status}`);
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    if (filter === 'pending') return apt.status === 'pending';
    if (filter === 'approved') return apt.status === 'approved';
    if (filter === 'confirmed') return apt.status === 'approved' && apt.studentConfirmed;
    return apt.status === filter;
  });

  const confirmedAppointments = appointments.filter(
    apt => apt.status === 'approved' && apt.studentConfirmed
  );

  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Add Availability</h2>
        <form onSubmit={handleAddSlot} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={newSlot.date}
              onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              value={newSlot.time}
              onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
            <input
              type="number"
              value={newSlot.duration}
              onChange={(e) => setNewSlot({...newSlot, duration: parseInt(e.target.value)})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              min="15"
              step="15"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Slot
          </button>
        </form>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">My Availability</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availability.map((slot) => (
            <div key={slot.id} className="border p-4 rounded">
              <p className="font-medium">Date: {slot.date}</p>
              <p>Time: {slot.time}</p>
              <p>Duration: {slot.duration} minutes</p>
              <p className="mt-2">
                Status: 
                <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                  slot.status === 'available' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                </span>
              </p>
              {slot.status === 'pending' && (
                <p className="mt-2 text-gray-600">Requested by: {slot.studentName}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">All Appointments</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="confirmed">Confirmed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No appointments found.</p>
          ) : (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="border p-4 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Student: {appointment.studentName}</p>
                    <p>Date: {appointment.date}</p>
                    <p>Time: {appointment.time}</p>
                    <p>Purpose: {appointment.purpose}</p>
                  </div>
                  <div className="text-right">
                    <p className={`inline-block px-2 py-1 rounded-full text-sm ${
                      appointment.status === 'approved' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </p>
                    {appointment.status === 'approved' && (
                      <p className={`mt-2 text-sm ${
                        appointment.studentConfirmed ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {appointment.studentConfirmed ? 'Student Confirmed' : 'Awaiting Confirmation'}
                      </p>
                    )}
                  </div>
                </div>
                {appointment.status === 'pending' && (
                  <div className="mt-4 space-x-4">
                    <button
                      onClick={() => handleAppointmentAction(appointment.id, 'approved')}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAppointmentAction(appointment.id, 'rejected')}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Confirmed Appointments</h2>
        <div className="space-y-4">
          {confirmedAppointments.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No confirmed appointments.</p>
          ) : (
            confirmedAppointments.map((appointment) => (
              <div key={appointment.id} className="border p-4 rounded">
                <p className="font-medium">Student: {appointment.studentName}</p>
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
                <p>Purpose: {appointment.purpose}</p>
                <p className="text-green-600 mt-2">Confirmed by Student</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default TeacherDashboard;
