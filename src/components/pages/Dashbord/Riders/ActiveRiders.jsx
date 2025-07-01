import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [activeRiders, setActiveRiders] = useState([]);

  useEffect(() => {
    axiosSecure.get("/riders?status=approved").then((res) => {
      setActiveRiders(res.data);
    });
  }, [axiosSecure]);

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-green-600">✅ Active Riders</h2>
      {activeRiders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead className="bg-green-100">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Bike</th>
                <th>Region</th>
                <th>District</th>
              </tr>
            </thead>
            <tbody>
              {activeRiders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.bikeBrand} ({rider.bikeRegNumber})</td>
                  <td>{rider.region}</td>
                  <td>{rider.district}</td>
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
