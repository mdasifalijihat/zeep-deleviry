import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const UpdateProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const userId = user?.uid || user?._id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["userProfile", userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${userId}`);
      return res.data;
    },
    onSuccess: (profile) => {
      reset({
        ...profile,
        createdAt: profile.createdAt
          ? new Date(profile.createdAt).toLocaleString()
          : "",
        lastLogIn: profile.lastLogIn
          ? new Date(profile.lastLogIn).toLocaleString()
          : "",
      });
    },
  });

  const onSubmit = async (formData) => {
    try {
      const { ...editable } = formData;
      const res = await axiosSecure.patch(`/users/${userId}`, editable);

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Profile updated successfully.", "success");
        refetch();
      } else {
        Swal.fire("No Change", "No fields were updated.", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update profile.", "error");
    }
  };

  if (isLoading) return <p className="text-center mt-8">Loading profile…</p>;
  if (isError)
    return <p className="text-center text-red-500 mt-8">Profile load failed.</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* User Image */}
        <div className="flex items-center space-x-4 mb-4">
          {user?.photoURL || user?.image ? (
            <img
              src={user.photoURL || user.image}
              alt="User avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
              No Image
            </div>
          )}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Name is required.</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            readOnly
            {...register("email")}
            className="w-full input input-bordered bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block font-medium mb-1">Role</label>
          <select
            {...register("role", { required: true })}
            className="w-full select select-bordered"
          >
            <option value="user">User</option>
            <option value="rider">Rider</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">Role is required.</p>
          )}
        </div>

        {/* Created At */}
        <div>
          <label className="block font-medium mb-1">Created At</label>
          <input
            type="text"
            readOnly
            {...register("createdAt")}
            className="w-full input input-bordered bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Last Login */}
        <div>
          <label className="block font-medium mb-1">Last Login</label>
          <input
            type="text"
            readOnly
            {...register("lastLogIn")}
            className="w-full input input-bordered bg-gray-100 cursor-not-allowed"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
