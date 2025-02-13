import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg">
      {/* Left Side: Heading */}
      <a className="text-2xl font-semibold text-white" href="/">Library Management</a>

      {/* Right Side: Buttons/Links */}
      <div className="space-x-4 hidden md:flex">
        <Link
          to="/"
          className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to="/add-user"
          className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-300"
        >
          Add User
        </Link>
        <Link
          to="/add-book"
          className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-300"
        >
          Add Book
        </Link>
        <Link
          to="/issue-book"
          className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-300"
        >
          Issue Book
        </Link>
        <Link
          to="/issue-history"
          className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-300"
        >
          History
        </Link>
      </div>

      {/* Mobile Menu Button (Hamburger Icon) */}
      <div className="md:hidden">
        <button
          className="text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-gray-800 p-4 rounded-lg shadow-lg md:hidden z-10">
          <Link
            to="/"
            className="block text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-300 mb-2"
          >
            Home
          </Link>
          <Link
            to="/add-user"
            className="block text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-300 mb-2"
          >
            Add User
          </Link>
          <Link
            to="/add-book"
            className="block text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-300 mb-2"
          >
            Add Book
          </Link>
          <Link
            to="/issue-book"
            className="block text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-300"
          >
            Issue Book
          </Link>
          <Link
            to="/issue-history"
            className="block text-white bg-gray-700 hover:bg-gray-600 px-4 mt-2 py-2 rounded-md transition-colors duration-300"
          >
            History
          </Link>
        </div>
      )}
    </nav>
  );
}
