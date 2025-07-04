import React, { useState } from "react";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      Swal.fire("Error", "Please enter an email or UID", "error");
      return;
    }

    setFoundUsers([]);
    setSearchLoading(true);
    
    try {
      // Changed from 'email' to 'term' parameter
      const res = await axiosSecure.get(`/users/search?term=${encodeURIComponent(searchTerm)}`);
      
      // Updated response handling
      if (res.data?.success) {
        setFoundUsers(res.data.data || []);
        
        if (res.data.data?.length === 0) {
          Swal.fire({
            title: "No Results",
            text: "No users matched your search",
            icon: "info"
          });
        }
      } else {
        Swal.fire({
          title: "Error",
          text: res.data?.message || "Search failed",
          icon: "error"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to search users",
        icon: "error"
      });
    } finally {
      setSearchLoading(false);
    }
  };

  const { mutate: makeAdmin, isPending: isMakingAdmin } = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.patch(`/users/${userId}/role`, { 
        role: "admin" 
      });
      return res.data;
    },
    onSuccess: (data, userId) => {
      if (data?.success) {
        Swal.fire("Success", "User role updated to admin", "success");
        setFoundUsers(prevUsers => 
          prevUsers.map(user => 
            user._id === userId ? { ...user, role: "admin" } : user
          )
        );
        queryClient.invalidateQueries(['users']);
      }
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to update role",
        "error"
      );
    }
  });

  const handleMakeAdmin = (userId) => {
    const user = foundUsers.find(u => u._id === userId);
    if (!user) return;

    Swal.fire({
      title: `Make ${user.email} admin?`,
      text: user.uid ? `UID: ${user.uid}` : "No UID associated",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin"
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdmin(userId);
      }
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        <span className="mr-2">👨‍💼</span> Admin Management
      </h2>
      
      <div className="flex flex-col space-y-4 mb-6">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Search by email or UID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered join-item w-full"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={searchLoading}
            className="btn btn-primary join-item"
          >
            {searchLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>

      {searchLoading && (
        <div className="text-center py-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {foundUsers.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Email</th>
                <th>UID</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {foundUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td className="font-mono text-sm">
                    {user.uid || "N/A"}
                  </td>
                  <td>
                    <span className={`badge ${
                      user.role === "admin" ? "badge-success" :
                      user.role === "rider" ? "badge-warning" : "badge-info"
                    }`}>
                      {user.role || "user"}
                    </span>
                  </td>
                  <td>
                    {user.role !== "admin" ? (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="btn btn-sm btn-success"
                        disabled={isMakingAdmin}
                      >
                        {isMakingAdmin ? "Processing..." : "Make Admin"}
                      </button>
                    ) : (
                      <span className="text-green-500">Already Admin</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;