import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import icon from "./icon.png";
import { MdMenuOpen, MdOutlineRestaurantMenu } from "react-icons/md";

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut, dower, setDrower } = useContext(AuthContext);

  const list = (
    <>
      <li>
        <NavLink
          to="/"
          aria-label="Home"
          title="Home"
          className={({ isActive }) => {
            return isActive
              ? "underline text-sky-500  underline-offset-8 font-medium tracking-wide transition-colors duration-200 hover:text-teal-accent-400"
              : "font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400";
          }}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blog"
          aria-label="Blog"
          title="Blog"
          className={({ isActive }) => {
            return isActive
              ? "underline text-sky-500  underline-offset-8 font-medium tracking-wide transition-colors duration-200 hover:text-teal-accent-400"
              : "font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400";
          }}
        >
          Blog
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            aria-label="dashboard"
            title="dashboard"
            className={({ isActive }) => {
              return isActive
                ? "underline text-sky-500  underline-offset-8 font-medium tracking-wide transition-colors duration-200 hover:text-teal-accent-400"
                : "font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400";
            }}
          >
            Dashboard
          </NavLink>
        </li>
      )}

      {user ? (
        <>
          <li className="flex items-center gap-6 justify-center">
            <img
              className="w-12 h-12 rounded-full ring-2 ring-offset-4 bg-gray-500 ring-gray-700 ring-offset-gray-800"
              src={user.photoURL}
              alt=""
            />

            <div className="text-start lg:hidden">
              <h1 className=" font-bold ">{user.displayName}</h1>
              <p className="text-xs">{user.email}</p>
            </div>
          </li>
          <li>
            <button
              onClick={() => logOut()}
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
            >
              Log Out
            </button>
          </li>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
          >
            Log in
          </Link>
          <Link
            to="/sign-up"
            className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md ml-4 bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
          >
            Registration
          </Link>
        </>
      )}
    </>
  );

  return (
    <div className="bg-gray-900 ">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative z-50 flex items-center justify-between">
          <Link
            to="/"
            aria-label="Home"
            title="Home"
            className="inline-flex items-center gap-4"
          >
            <img className="w-12" src={icon} alt="" />
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
              <span className="text-purple-500">Book</span> House
            </span>
          </Link>
          <ul className=" items-center hidden space-x-8 lg:flex">{list}</ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-purple-50 focus:bg-purple-50"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-gray-500 border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        to="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                      >
                        <img className="w-10" src={icon} alt="" />
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                          Book House
                        </span>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav className="text-center">
                    <ul className="space-y-4">{list}</ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
