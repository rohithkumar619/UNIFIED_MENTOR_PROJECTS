import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">EduScheduler</h3>
            <p className="text-gray-400">
              Making educational appointments simple and efficient.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Home</li>
              <li>About Us</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 text-2xl mb-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaGithub />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin />
              </a>
              <a href="mailto:brohith619@gmail.com" className="text-gray-400 hover:text-white">
                <FaEnvelope />
              </a>
            </div>
            <p className="text-gray-400">Email: brohith619@gmail.com</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EduScheduler. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;