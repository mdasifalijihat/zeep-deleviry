import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    createUser(data.email, data.password).then(result => {
        console.log(result.user)
        navigate('/')
    }).catch((error) => {
        console.error(error)
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-4xl font-bold mb-2">Create an Account</h1>
        <p className="text-gray-600 mb-6">Register with Profast</p>

        {/* Avatar placeholder */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-200 rounded-full h-24 w-24 flex items-center justify-center text-gray-500">
            {/* You can replace this with an actual image upload component or icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />{" "}
              {/* User head */}
              <path
                fillRule="evenodd"
                d="M10 17a7 7 0 00-7 7H3a8 8 0 0116 0h-1a7 7 0 00-7-7z"
                clipRule="evenodd"
              />{" "}
              {/* User body */}
              <path d="M10 11a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" />{" "}
              {/* Arrow up for upload */}
            </svg>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name ? "border-red-500" : ""
              }`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-lime-400 hover:bg-lime-500 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 text-sm mb-4">
          Already have an account?{" "}
          <Link
            to={"/login"}
            href="#"
            className="font-bold text-lime-600 hover:text-lime-800"
          >
            Login
          </Link>
        </p>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
