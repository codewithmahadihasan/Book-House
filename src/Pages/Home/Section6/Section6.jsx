import React from "react";
import Swal from "sweetalert2";

const Section6 = () => {
  const fromSubmit = (event) => {
    event.preventDefault();
    Swal.fire(
      "Your requested successfully",
      "Sorry sir you can't impliment this this work right now",
      "success"
    );
    event.target.reset();
  };

  return (
    <div className="bg-gray-300">
      <div className="relative bg-gray-900">
        <div className="absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 224 12"
            fill="currentColor"
            className="w-full -mb-1 text-white"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
          </svg>
        </div>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
            <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
              If you want to be our super customer then subscribe us with your
              email
            </h2>
            <p className="mb-6 text-base font-thin tracking-wide text-gray-300 md:text-lg">
              We are very happy to have customers like you.
            </p>
            <form
              onSubmit={fromSubmit}
              className="flex flex-col items-center w-full mb-4 md:flex-row md:px-16"
            >
              <input
                placeholder="Email"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-3 text-white transition duration-200 bg-transparent border-2 border-gray-400 rounded appearance-none md:mr-2 md:mb-0 focus:border-purple-200 focus:outline-none focus:shadow-outline"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section6;
