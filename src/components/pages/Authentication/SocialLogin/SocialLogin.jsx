import React from "react";
import useAuth from "../../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../../../../hooks/useAxios";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();

  const from = location.state?.from || "/";

  const handleGoogleLogin = () => {
    googleLogin()
      .then(async (result) => {
        const user = result.user;
        console.log(result);

        // Prepare user info to save in database
        const userInfo = {
          email: user.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        // Save user info in your backend
        const res = await axiosInstance.post("/users", userInfo);
        console.log(res.data);

        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin} // fixed typo: 'hanldeGooleLogin' -> 'handleGoogleLogin'
        className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 focus:outline-none focus:shadow-outline"
      >
        <img
          src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
          alt="Google logo"
          className="h-6 w-6"
        />
        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
