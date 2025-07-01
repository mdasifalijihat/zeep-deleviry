 import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

import useAuth from "../../../../hooks/useAuth";
import useAxios from "../../../../hooks/useAxios";
import SocialLogin from "../SocialLogin/SocialLogin";
 import axios from "axios";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxios();
  const navigate = useNavigate();
   const location = useLocation();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /* ───────── Helper: upload image & return URL ───────── */
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_UPLOAD_KEY
    }`;
    const res = await axios.post(url, formData);
    return res.data?.data?.url;
  };

  /* ───────── Main submit ───────── */
  const onSubmit = async (data) => {
    try {
      // 1. upload avatar first (if any)
      let avatarUrl = "";
      if (data.avatar?.[0]) {
        avatarUrl = await uploadImage(data.avatar[0]);
      }

      // 2. create Firebase user
      const { user } = await createUser(data.email, data.password);

      // 3. save user doc to MongoDB
      await axiosPublic.post("/users", {
        uid: user.uid, // so you can query by uid later
        email: data.email,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      });

      // 4. update Firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: avatarUrl,
      });

      Swal.fire("Welcome!", "Account created successfully.", "success");
      reset();
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Registration failed.", "error");
    }
  };

  /* ───────── UI ───────── */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-4xl font-bold mb-2">Create an Account</h1>
        <p className="text-gray-600 mb-6">Register with Profast</p>

        {/* Avatar upload */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Upload Avatar
            </label>
            <input
               type="file"
              accept="image/*"
              {...register("avatar")}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Name</label>
            <input
              type="text"
               {...register("name", { required: "Name is required" })}
              className={`input input-bordered w-full ${
                errors.name && "input-error"
              }`}
              placeholder="Your name"
            />
            {errors.name && (
              <small className="text-red-500">{errors.name.message}</small>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
               {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
              })}
              className={`input input-bordered w-full ${
                errors.email && "input-error"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <small className="text-red-500">{errors.email.message}</small>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              className={`input input-bordered w-full ${
                errors.password && "input-error"
              }`}
              placeholder="••••••"
            />
            {errors.password && (
              <small className="text-red-500">{errors.password.message}</small>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-lime-600 font-bold">
            Login
          </Link>
        </p>

        <div className="divider">OR</div>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
