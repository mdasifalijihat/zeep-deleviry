import React from "react";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router";


const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const navigate =useNavigate()
  const hanldeGooleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result);
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button
        onClick={hanldeGooleLogin}
        className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 focus:outline-none focus:shadow-outline"
      >
        <img
          src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
          alt="Google logo"
          className="h-6 w-6"
        />
        <span>Login with google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
