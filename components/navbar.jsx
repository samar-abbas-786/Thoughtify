"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa"; // <-- Importing Profile Icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user_id exists in localStorage
    const userId = localStorage.getItem("user_id");
    setIsLoggedIn(!!userId);
  }, []);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              💡Thoughtify
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden w-full justify-center sm:flex sm:space-x-20 items-center">
            <Link
              href="/"
              className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500 hover:text-indigo-600 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/create"
              className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500 hover:text-indigo-600 text-sm font-medium"
            >
              Create
            </Link>

            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-900 hover:text-indigo-600 text-sm font-medium"
              >
                <FaUserCircle size={24} />
                {/* <span>Profile</span> */}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              {/* Hamburger Icon */}
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
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

              {/* Cross Icon */}
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              href="/create"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              Create
            </Link>

            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 text-center"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                href="/"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              >
                <FaUserCircle size={24} />
                {/* <span>Profile</span> */}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
