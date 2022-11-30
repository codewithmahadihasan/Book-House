import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import logo from "./404.json";

const WrongRoute = () => {
  return (
    <div>
      <section className="flex items-center h-full p-16 bg-gray-900 text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
              <Lottie animationData={logo} loop={true} />
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 text-gray-400">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link
              rel="noopener noreferrer"
              to="/"
              className="px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WrongRoute;
