import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { NavLink, } from "react-router";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); 

  // Fetch payments data
  const {
    isLoading,
    error,
    data: payments = [],
  } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Compute dashboard stats
  const totalParcels = payments.length;
  const paidParcels = payments.filter(
    (p) => p.payment_status === "paid"
  ).length;
  const pendingPayments = payments.filter(
    (p) => p.payment_status !== "paid"
  ).length;
  const deletedParcels = payments.filter(
    (p) => p.status?.toLowerCase() === "deleted"
  ).length;

  const stats = [
    {
      title: "Total Parcels",
      value: totalParcels,
      icon: "📦",
      color: "bg-primary",
    },
    {
      title: "Paid Parcels",
      value: paidParcels,
      icon: "✅",
      color: "bg-success",
    },
    {
      title: "Pending Payments",
      value: pendingPayments,
      icon: "⌛",
      color: "bg-warning",
    },
    {
      title: "Deleted Parcels",
      value: deletedParcels,
      icon: "🗑️",
      color: "bg-error",
    },
  ];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center p-4">
        Error loading data: {error.message}
      </div>
    );

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome Back, {user?.displayName || "User"}!
        </h1>
        <p className="text-gray-600">
          Here's the overview of your parcel dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map(({ title, value, icon, color }, idx) => (
          <div
            key={idx}
            className={`shadow-lg rounded-lg p-6 flex items-center space-x-4 ${color} text-white`}
          >
            <div className="text-4xl">{icon}</div>
            <div>
              <p className="text-2xl font-semibold">{value}</p>
              <p className="text-sm opacity-90">{title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Parcels List */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Recent Parcels</h2>
        {payments.length === 0 ? (
          <p className="text-gray-500">No parcels found.</p>
        ) : (
          <ul className="divide-y divide-gray-200 border rounded-md">
            {payments.slice(0, 5).map((parcel) => (
              <li
                key={parcel._id}
                className="p-4 flex justify-between items-center"
              >
                <span className="font-semibold">{parcel.tracking_id}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    parcel.payment_status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {parcel.payment_status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NavLink className="btn btn-primary btn-outline" to={"/dashboard/myParcels"}>
            View My Parcels
          </NavLink>        
          <NavLink to={'/pricing'} className="btn btn-success btn-outline">
            Add New Parcel
          </NavLink>
          <NavLink to={'/dashboard/paymentHistory'} className="btn btn-info btn-outline">Payment History</NavLink>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
