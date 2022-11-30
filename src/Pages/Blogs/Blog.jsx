import { useState } from "react";

const Item = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded shadow-sm">
      <button
        type="button"
        aria-label="Open item"
        title="Open item"
        className="flex items-center justify-between w-full p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-lg font-medium">{title}</p>
        <div className="flex items-center justify-center w-8 h-8 border rounded-full">
          <svg
            viewBox="0 0 24 24"
            className={`w-3 text-gray-600 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          >
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              points="2,7 12,17 22,7"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          <p className="text-gray-700">{children}</p>
        </div>
      )}
    </div>
  );
};

export const Blog = () => {
  return (
    <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div class="max-w-xl sm:mx-auto lg:max-w-2xl">
        <div class="flex flex-col mb-16 sm:text-center">
          <div class="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
            <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              <span class="relative inline-block">
                <span class="relative">FAQ</span>
              </span>{" "}
              Section
            </h2>
          </div>
        </div>
        <div class="space-y-4">
          <Item title="What are the different ways to manage a state in a React application?">
            1. Local (UI) state Local state is data we manage in one or another
            component. <br />
            2. URL state Data that exists on our URLs, including the pathname
            and query parameters.
            <br /> 3. Server state Data that comes from an external server that
            must be integrated with our UI state. <br /> 4. Global (UI) state
            Global state is data we manage across multiple components.
          </Item>
          <Item title="How does prototypical inheritance work?">
            The Prototypal Inheritance is a feature in javascript used to add
            methods and properties in objects. It is a method by which an object
            can inherit the properties and methods of another object.
            Traditionally, in order to get and set the [[Prototype]] of an
            object, we use Object. getPrototypeOf and Object
          </Item>
          <Item title="What is a unit test?">
            Unit testing is a software testing method by which individual units
            of source code sets of one or more computer program modules together
            with associated control data, usage procedures, and operating
            procedures—are tested to determine whether they are fit for use
          </Item>
          <Item title="React vs Angular vs Vue">
            React is a UI library, Angular is a fully-fledged front-end
            framework, while Vue.js is a progressive framework. They can be used
            almost interchangeably to build front-end applications, but they're
            not 100 percent the same, so it makes sense to compare them and
            understand their differences. Each framework is component-based and
            allows the rapid creation of UI features.
          </Item>
          <Item title="Why should we write unit tests?">
            They enable you to catch bugs early in the development process.
            Automated unit tests help a great deal with regression testing. They
            detect code smells in your codebase. For example, if you're having a
            hard time writing unit tests for a piece of code, it might be a sign
            that your function is too complex.
          </Item>
        </div>
      </div>
    </div>
  );
};
