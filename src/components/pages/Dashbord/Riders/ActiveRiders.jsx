import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [activeRiders, setActiveRiders] = useState([]);

  useEffect(() => {
    fetchRiders();
  }, [axiosSecure]);

  const fetchRiders = () => {
    axiosSecure.get("/riders?status=approved").then((res) => {
      setActiveRiders(res.data);
    });
  };

  const handleDeactivate = async (riderId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to deactivate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.patch(`/riders/${riderId}`, {
          status: "inactive",
        });
        Swal.fire("Success", "Rider deactivated successfully", "success");
        fetchRiders(); // Refresh list
      } catch (error) {
        Swal.fire("Error", "Failed to deactivate rider", "error");
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-green-600">
        ✅ Active Riders
      </h2>
      {activeRiders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead className="bg-green-100 text-sm">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>NID Number</th>
                <th>Region</th>
                <th>District</th>
                <th>Bike Number</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {activeRiders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.nidNumber || "N/A"}</td>
                  <td>{rider.region}</td>
                  <td>{rider.district}</td>
                  <td>{rider.bikeRegNumber}</td>
                  <td>
                    <span className="text-green-600 font-semibold capitalize">
                      {rider.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeactivate(rider._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No active riders found.</p>
      )}
    </div>
  );
};

export default ActiveRiders;
