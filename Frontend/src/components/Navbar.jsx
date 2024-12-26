import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Navbar Links */}
        <div className="space-x-6">
          <Link
            to="/feedback"
            className="text-gray-300 hover:text-white transition duration-200"
          >
            Feedback
          </Link>
          <Link
            to="/admin"
            className="text-gray-300 hover:text-white transition duration-200"
          >
            Admin Dashboard
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="bg-blue-800 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
