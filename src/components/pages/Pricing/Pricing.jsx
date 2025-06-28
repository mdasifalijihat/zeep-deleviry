import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function generateTrackingID() {
  const random = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `TRK-${Date.now()}-${random}`;
}

const AddParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const weight = parseFloat(watch("weight")) || 0;

  const onSubmit = (data) => {
    let cost = 0;
    const withinCity = senderRegion === receiverRegion;

    if (data.type === "document") {
      cost = withinCity ? 60 : 80;
    } else {
      if (weight <= 3) {
        cost = withinCity ? 110 : 150;
      } else {
        const extraWeight = weight - 3;
        cost = withinCity
          ? 110 + extraWeight * 40
          : 150 + extraWeight * 40 + 40;
      }
    }

    Swal.fire({
      title: `Delivery Cost: ৳${cost}`,
      text: "Do you want to confirm this booking?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        const creationDate = new Date();

        const parcelInfo = {
          ...data,
          cost,
          email: user?.email || "unknown",
          creation_date: creationDate.toISOString(),
          creation_timestamp: creationDate.getTime(),
          status: "Pending",
          tracking_id: generateTrackingID(),
        };

        console.log("Parcel Saved:", parcelInfo);

        // save data to the server
        axiosSecure.post("/parcels", parcelInfo).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            // todo payment getway create 
            Swal.fire("Success!", "Parcel booking confirmed.", "success");
          }
        });

        reset();
      }
    });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Add Parcel</h1>
      <p className="mb-6 text-gray-600">Enter your parcel details</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Parcel Info</h2>
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="document"
                {...register("type", { required: true })}
              />{" "}
              Document
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="non-document"
                {...register("type", { required: true })}
              />{" "}
              Not-Document
            </label>
          </div>
          <input
            {...register("title", { required: true })}
            placeholder="Parcel Name"
            className="input input-bordered w-full my-2"
          />
          {parcelType === "non-document" && (
            <input
              {...register("weight")}
              placeholder="Parcel Weight (KG)"
              className="input input-bordered w-full"
              type="number"
              min="0"
              step="0.1"
            />
          )}
        </div>

        {/* Sender Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Sender Details</h2>
          <input
            {...register("senderName", { required: true })}
            placeholder="Sender Name"
            className="input input-bordered w-full mb-2"
          />
          <input
            {...register("senderContact", { required: true })}
            placeholder="Sender Contact No"
            className="input input-bordered w-full mb-2"
          />
          <select
            {...register("senderRegion", { required: true })}
            className="select select-bordered w-full mb-2"
          >
            <option value="">Select your region</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattogram">Chattogram</option>
            <option value="Khulna">Khulna</option>
            {/* Add more regions */}
          </select>
          <select
            {...register("senderWarehouse", { required: true })}
            className="select select-bordered w-full mb-2"
          >
            <option value="">Select Wire house</option>
            <option value="Central">Central</option>
            <option value="North">North</option>
            <option value="South">South</option>
          </select>
          <input
            {...register("senderAddress", { required: true })}
            placeholder="Address"
            className="input input-bordered w-full mb-2"
          />
          <textarea
            {...register("pickupInstruction")}
            placeholder="Pickup Instruction"
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Receiver Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Receiver Details</h2>
          <input
            {...register("receiverName", { required: true })}
            placeholder="Receiver Name"
            className="input input-bordered w-full mb-2"
          />
          <input
            {...register("receiverContact", { required: true })}
            placeholder="Receiver Contact No"
            className="input input-bordered w-full mb-2"
          />
          <select
            {...register("receiverRegion", { required: true })}
            className="select select-bordered w-full mb-2"
          >
            <option value="">Select your region</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattogram">Chattogram</option>
            <option value="Khulna">Khulna</option>
            {/* Add more regions */}
          </select>
          <select
            {...register("receiverWarehouse", { required: true })}
            className="select select-bordered w-full mb-2"
          >
            <option value="">Select Wire house</option>
            <option value="Central">Central</option>
            <option value="North">North</option>
            <option value="South">South</option>
          </select>
          <input
            {...register("receiverAddress", { required: true })}
            placeholder="Address"
            className="input input-bordered w-full mb-2"
          />
          <textarea
            {...register("deliveryInstruction")}
            placeholder="Delivery Instruction"
            className="textarea textarea-bordered w-full"
          />
        </div>

        <p className="text-sm text-gray-500">* PickUp Time 4pm–7pm Approx.</p>

        <button
          type="submit"
          className="btn bg-lime-400 hover:bg-lime-500 text-white"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default AddParcel;
