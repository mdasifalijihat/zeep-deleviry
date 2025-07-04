import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch pending riders using react-query
  const {
    data: pendingRiders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=pending");
      return res.data;
    },
  });

  const handleApprove = async (id, email) => {
    const res = await axiosSecure.patch(`/riders/approve/${id}`, {email});
    if (res.data.modifiedCount > 0) {
      Swal.fire("Approved!", "Rider has been approved.", "success");
      refetch(); // Refresh data
    }
  };

  const handleReject = async (id, email) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will reject the rider application.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/riders/${id}`, email);
      if (res.data.deletedCount > 0) {
        Swal.fire("Rejected!", "Rider application has been rejected.", "success");
        refetch(); // Refresh data
      }
    }
  };

  const handleView = (rider) => {
    Swal.fire({
      title: rider.name,
      html: `
        <p><strong>Email:</strong> ${rider.email}</p>
        <p><strong>Phone:</strong> ${rider.phone || "N/A"}</p>
        <p><strong>Age:</strong> ${rider.age}</p>
        <p><strong>Region:</strong> ${rider.region}</p>
        <p><strong>District:</strong> ${rider.district}</p>
        <p><strong>Bike:</strong> ${rider.bikeBrand} (${rider.bikeRegNumber})</p>
        <p><strong>NID:</strong> ${rider.nid}</p>
        <p><strong>Applied On:</strong> ${new Date(rider.submittedAt).toLocaleString()}</p>
      `,
      confirmButtonText: "Close",
    });
  };

  if (isLoading) {
    return <p className="text-center">Loading pending riders...</p>;
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-yellow-500">⏳ Pending Riders</h2>
      {pendingRiders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra text-sm">
            <thead className="bg-yellow-100">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Bike</th>
                <th>Region</th>
                <th>District</th>
                <th>Applied On</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRiders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.phone || "N/A"}</td>
                  <td>{rider.bikeBrand} ({rider.bikeRegNumber})</td>
                  <td>{rider.region}</td>
                  <td>{rider.district}</td>
                  <td>{new Date(rider.submittedAt).toLocaleDateString()}</td>
                  <td className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleView(rider)}
                      className="btn btn-sm btn-info tooltip"
                      data-tip="View"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleApprove(rider._id, rider.email)}
                      className="btn btn-sm btn-success tooltip"
                      data-tip="Approve"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleReject(rider._id, rider.email)}
                      className="btn btn-sm btn-error tooltip"
                      data-tip="Reject"
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No pending applications.</p>
      )}
    </div>
  );
};

export default PendingRiders;
