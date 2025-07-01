import React, { useState } from "react";
import useAddTrackingUpdate from "../../../../hooks/useAddTrackingUpdate";

const TracParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [parcelId, setParcelId] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");

  const {
    mutate: addTrackingUpdate,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useAddTrackingUpdate();

  const handleSubmit = (e) => {
    e.preventDefault();

    addTrackingUpdate({
      tracking_id: trackingId,
      parcel_id: parcelId,
      status,
      message,
      updated_by: updatedBy,
    });

    // Reset form after submit
    setTrackingId("");
    setParcelId("");
    setStatus("");
    setMessage("");
    setUpdatedBy("");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Tracking Update</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          required
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Parcel ID (optional)"
          value={parcelId}
          onChange={(e) => setParcelId(e.target.value)}
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Location / Note"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Updated by (email/name)"
          value={updatedBy}
          onChange={(e) => setUpdatedBy(e.target.value)}
        />

        <button className="btn btn-primary" type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Submit Update"}
        </button>
      </form>

      {isSuccess && (
        <p className="text-green-500 mt-2">Update added successfully!</p>
      )}
      {isError && (
        <p className="text-red-500 mt-2">
          {error?.message || "Something went wrong."}
        </p>
      )}
    </div>
  );
};

export default TracParcel;
