import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import serviceCenters from "../../../../../public/warehouses.json";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BeARider = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const axiosSecure = useAxiosSecure();
  const selectedRegion = watch("region");

  // Load unique regions
  useEffect(() => {
    const uniqueRegions = [
      ...new Set(serviceCenters.map((center) => center.region)),
    ];
    setRegions(uniqueRegions);
  }, []);

  // Load districts based on selected region
  useEffect(() => {
    if (selectedRegion) {
      const filteredDistricts = serviceCenters
        .filter((center) => center.region === selectedRegion)
        .map((center) => center.district);
      setDistricts([...new Set(filteredDistricts)]);
      setValue("district", "");
    }
  }, [selectedRegion, setValue]);

  // Form submission handler
  const onSubmit = async (data) => {
    const riderApplication = {
      ...data,
      name: user?.displayName || "",
      email: user?.email || "",
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/riders", riderApplication);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your application is pending approval",
        });
        reset(); // Clear form
      }
    } catch (err) {
      console.error("Rider application submission failed:", err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Be A Rider</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full input input-bordered"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full input input-bordered"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block font-medium">Age</label>
          <input
            type="number"
            {...register("age", { required: true, min: 18 })}
            className="w-full input input-bordered"
            placeholder="Enter your age"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">Minimum age is 18</p>
          )}
        </div>

        {/* NID Number */}
        <div>
          <label className="block font-medium">NID Number</label>
          <input
            type="text"
            {...register("nid", {
              required: true,
              pattern: {
                value: /^[0-9]{10,17}$/,
                message: "Invalid NID format",
              },
            })}
            className="w-full input input-bordered"
            placeholder="Enter your NID number"
          />
          {errors.nid && (
            <p className="text-red-500 text-sm">{errors.nid.message}</p>
          )}
        </div>

        {/* Bike Brand */}
        <div>
          <label className="block font-medium">Bike Brand</label>
          <input
            type="text"
            {...register("bikeBrand", { required: true })}
            className="w-full input input-bordered"
            placeholder="E.g., Honda, Yamaha"
          />
        </div>

        {/* Bike Registration Number */}
        <div>
          <label className="block font-medium">Bike Registration Number</label>
          <input
            type="text"
            {...register("bikeRegNumber", { required: true })}
            className="w-full input input-bordered"
            placeholder="Enter registration number"
          />
        </div>

        {/* Region */}
        <div>
          <label className="block font-medium">Region</label>
          <select
            {...register("region", { required: true })}
            className="w-full select select-bordered"
          >
            <option value="">Select Region</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        {districts.length > 0 && (
          <div>
            <label className="block font-medium">District</label>
            <select
              {...register("district", { required: true })}
              className="w-full select select-bordered"
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
