import React from "react";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./image.json";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Section3 = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
        <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
          <div className="max-w-xl mb-6">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider uppercase bg-teal-400 text-teal-900 rounded-full">
                Book house
              </p>
            </div>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none max-w-lg mb-6">
              Hello People
              <br className="hidden md:block" />
              Are you want to join with us ?
            </h2>
            <p className="text-gray-700 text-base md:text-lg">
              Hare You can find novels, memoirs and autobiographies, cookbooks,
              poetry, children's picture-books, textbooks, car manuals, and
              hard-to-find out-of-print editions.
            </p>
          </div>
          {!user ? (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="inline-flex items-center justify-center w-full h-12 px-10 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-teal-400 hover:bg-teal-700 focus:shadow-outline focus:outline-none"
              >
                <div className="flex items-center">
                  <div className="mr-3 font-semibold text-white">Log In</div>
                  <IoIosArrowForward></IoIosArrowForward>
                </div>
              </Link>
              <Link
                to="/sign-up"
                className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold transition duration-200 bg-white border border-gray-300 rounded md:w-auto hover:bg-gray-100 focus:shadow-outline focus:outline-none"
              >
                Sign Up with Email
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex items-center justify-center lg:w-1/2">
          <Lottie animationData={groovyWalkAnimation} loop={true} />;
        </div>
      </div>
    </div>
  );
};

export default Section3;
