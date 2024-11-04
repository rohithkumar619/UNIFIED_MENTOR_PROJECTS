import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDashboardClick = (requiredRole) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role === requiredRole) {
      navigate(`/${requiredRole}`);
    }
  };

  const features = [
    {
      title: 'Easy Scheduling',
      description: 'Book appointments with teachers in just a few clicks',
      icon: '📅'
    },
    {
      title: 'Real-time Updates',
      description: 'Get instant notifications about appointment status',
      icon: '🔔'
    },
    {
      title: 'Flexible Management',
      description: 'Teachers can easily manage their availability',
      icon: '⚡'
    }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900">
          Schedule Academic Appointments with Ease
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          EduScheduler streamlines the process of booking appointments between students and teachers,
          making academic consultation more accessible than ever.
        </p>
        <div className="space-x-4">
          {!user && (
            <>
              <Link
                to="/register"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="inline-block bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Login
              </Link>
            </>
          )}
          <button
            onClick={() => handleDashboardClick('student')}
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Student Dashboard
          </button>
          <button
            onClick={() => handleDashboardClick('teacher')}
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Teacher Dashboard
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-16 px-4 rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center space-x-6">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-gray-600">
                Sign up as a student using your academic email address
                (name.student@gmail.com) or teachers can be added by administrators.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Find Your Teacher</h3>
              <p className="text-gray-600">
                Browse through the list of teachers and their available time slots.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Book Appointment</h3>
              <p className="text-gray-600">
                Select a convenient time slot and submit your appointment request.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;