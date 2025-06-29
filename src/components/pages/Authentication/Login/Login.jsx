import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/'

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result);
        alert("user login successfully ");
        navigate(from);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-600 mb-6">Login with Profast</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              id="email"
              placeholder="Email"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
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
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">password is required </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                password must be 6 characters or longer{" "}
              </p>
            )}
            <Link
              href="#"
              className="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-gray-800"
            >
              Forget Password?
            </Link>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-lime-400 hover:bg-lime-500 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 text-sm mb-4">
          Don't have any account?{" "}
          <Link
            to={"/register"}
            className="font-bold text-lime-600 hover:text-lime-800"
          >
            Register
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

export default Login;
