import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [teachers, setTeachers] = useState([]);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    department: '',
    subject: ''
  });

  useEffect(() => {
    const storedTeachers = JSON.parse(localStorage.getItem('teachers') || '[]');
    const storedStudents = JSON.parse(localStorage.getItem('pendingStudents') || '[]');
    setTeachers(storedTeachers);
    setPendingStudents(storedStudents);
  }, []);

  const handleAddTeacher = (e) => {
    e.preventDefault();
    if (!newTeacher.email.includes('.teacher@gmail.com')) {
      toast.error('Invalid teacher email format');
      return;
    }

    const updatedTeachers = [...teachers, newTeacher];
    setTeachers(updatedTeachers);
    localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
    setNewTeacher({ name: '', email: '', department: '', subject: '' });
    toast.success('Teacher added successfully');
  };

  const handleApproveStudent = (student) => {
    const updatedPending = pendingStudents.filter(s => s.email !== student.email);
    const approvedStudents = JSON.parse(localStorage.getItem('approvedStudents') || '[]');
    approvedStudents.push(student);

    localStorage.setItem('pendingStudents', JSON.stringify(updatedPending));
    localStorage.setItem('approvedStudents', JSON.stringify(approvedStudents));
    setPendingStudents(updatedPending);
    toast.success('Student approved');
  };

  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Add New Teacher</h2>
        <form onSubmit={handleAddTeacher} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={newTeacher.name}
              onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={newTeacher.email}
              onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              value={newTeacher.department}
              onChange={(e) => setNewTeacher({...newTeacher, department: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              value={newTeacher.subject}
              onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Teacher
          </button>
        </form>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Pending Student Approvals</h2>
        <div className="space-y-4">
          {pendingStudents.map((student, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded">
              <div>
                <p className="font-medium">{student.name}</p>
                <p className="text-sm text-gray-600">{student.email}</p>
              </div>
              <button
                onClick={() => handleApproveStudent(student)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;