import React from "react";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./image.json";

const Section2 = () => {
  return (
    <div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-5 row-gap-8 lg:grid-cols-2 ">
          <div className="flex flex-col justify-center">
            <div className="max-w-xl mb-6">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                Welcome to
                <br className="hidden md:block" />
                <span className="relative px-1">
                  <div className="absolute inset-x-0 bottom-0 h-3 transform -skew-x-12 bg-teal-400" />
                  <span className="relative inline-block text-purple-400">
                    BOOK HOUSE
                  </span>
                </span>
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                By choosing to shop for used books, you can save money, be
                sustainable, support independent booksellers, and have access to
                an unbeatable selection of literature from the past.
              </p>
            </div>
            <div className="grid gap-5 row-gap-8 sm:grid-cols-2">
              <div className="bg-white border-l-4 shadow-sm border-purple-400">
                <div className="h-full p-5 border border-l-0 rounded-r">
                  <h6 className="mb-2 font-semibold leading-5">
                    As a user activity
                  </h6>
                  <p className="text-sm text-gray-900">
                    A user cannot buy any product unless he has to log in and
                    buy any product.Anyone who logs in will be added as a user.
                  </p>
                </div>
              </div>
              <div className="bg-white border-l-4 shadow-sm border-purple-400">
                <div className="h-full p-5 border border-l-0 rounded-r">
                  <h6 className="mb-2 font-semibold leading-5">
                    As a seller activity
                  </h6>
                  <p className="text-sm text-gray-900">
                    If a user is added as a seller during registration, he will
                    no longer receive the user's activities. He will get only
                    the assets to sell the product.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Lottie animationData={groovyWalkAnimation} loop={true} />;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
