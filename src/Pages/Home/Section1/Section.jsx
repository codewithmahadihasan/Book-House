import React from "react";
import Lottie from "lottie-react";
import second from "./section1.json";

const Section = () => {
  return (
    <div>
      <div className="relative">
        <img
          src="https://c0.wallpaperflare.com/preview/319/490/499/person-selling-books.jpg"
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />
        <div className="relative bg-gray-900 bg-opacity-75">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col items-center justify-between xl:flex-row">
              <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                  Discover millions of copies of gently used books for sale from
                  sellers around the world.
                </h2>
                <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
                  By choosing to shop for used books, you can save money, be
                  sustainable, support independent booksellers, and have access
                  to an unbeatable selection of literature from the past. You
                  can find novels, memoirs and autobiographies, cookbooks,
                  poetry, children's picture-books, textbooks, car manuals, and
                  hard-to-find out-of-print editions.
                </p>
                <a
                  href="/"
                  aria-label=""
                  className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-purple-400 hover:text-purple-700"
                >
                  Learn more
                  <svg
                    className="inline-block w-3 ml-2"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                  </svg>
                </a>
              </div>
              <div className="w-full max-w-xl xl:px-8  py-10 xl:w-5/12">
                <Lottie animationData={second} loop={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
