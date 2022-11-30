import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Login = () => {
  const { login,  google, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  const formHandaler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    login(email, password);
    event.target.reset();
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  return (
    <div>
      <div className="relative">
        <img
          src="https://c4.wallpaperflare.com/wallpaper/767/594/322/books-library-bokeh-depth-of-field-wallpaper-preview.jpg"
          className="absolute  object-cover bg-cover w-full h-full "
          alt=""
        />
        <div className="relative  bg-gray-900 bg-opacity-75">
          <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col items-center justify-between xl:flex-row">
              <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                  WELCOME TO BOOK HOUSE
                </h2>
                <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                  JOIN WITH US AND SHOW OUR ALL UPDATE DATA
                </p>
                <Link
                  to="/"
                  aria-label=""
                  className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-400 hover:text-teal-700"
                >
                  Go To Home Page
                  <svg
                    className="inline-block w-3 ml-2"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                  </svg>
                </Link>
              </div>
              <div className="lg:w-96 w-full text-blue-200">
                <div className="w-full shadow-xl hover:shadow-sky-600  shadow-teal-800  max-w-md p-8 space-y-3 rounded-xl bg-gray-900 text-gray-100">
                  <h1 className="text-2xl font-bold text-center">Login</h1>
                  <form
                    onSubmit={formHandaler}
                    className="space-y-6 ng-untouched ng-pristine ng-valid"
                  >
                    <div className="space-y-1 text-sm">
                      <label className="block text-gray-400">E-mail</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="E-mail"
                        required
                        className="w-full px-4 py-3  rounded-md border-gray-700 bg-gray-100 text-gray-900 focus:border-violet-400"
                      />
                    </div>
                    <div className="space-y-1 text-sm">
                      <label className="block text-gray-400">Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        required
                        className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-100 text-gray-900 focus:border-violet-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="block w-full p-3 text-center rounded-sm text-gray-900 bg-violet-400 hover:bg-violet-600"
                    >
                      Sign in
                    </button>
                    <p className="text-xs mt-10 text-center sm:px-6 text-gray-400">
                      Do you have an account?
                      <Link
                        rel="noopener noreferrer"
                        to="/sign-up"
                        className="hover:underline  ml-2  text-gray-100"
                      >
                        Sign up
                      </Link>
                    </p>
                  </form>
                  <div className="flex items-center mb-2  space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                    <p className="px-3 text-sm text-gray-400">or</p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-700 "></div>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => google()}
                      aria-label="Log in with Google"
                      className="p-3 rounded-sm hover:text-black bg-purple-400 w-full flex items-center gap-28"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="w-4 h-4  fill-current "
                      >
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                      </svg>
                      <span className="font-semibold"> Google</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
