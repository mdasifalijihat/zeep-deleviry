import React, { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [payingParcel, setPayingParcel] = useState(null);

  const isPaid = (status = "") => status.toLowerCase() === "paid";

  const handleViewDetails = (parcel) => {
    setSelectedParcel(parcel);
    document.getElementById("parcel-detail-modal")?.showModal();
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this parcel? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/parcels/${id}`);
        if (res.data.deleteCount) {
          // Close dialogs to avoid conflicts
          document.getElementById("parcel-detail-modal")?.close();
          document.getElementById("pay-modal")?.close();

          await Swal.fire({
            title: "Deleted!",
            text: "The parcel has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          await refetch();
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete parcel.",
          icon: "error",
        });
      }
    }
  };

  const handlePayClick = (parcel) => {
    setPayingParcel(parcel);
    document.getElementById("pay-modal")?.showModal();
  };

  const handleConfirmPay = async () => {
    if (!payingParcel) return;

    try {
      // TODO: uncomment and implement backend call
      // await axiosSecure.patch(`/parcels/pay/${payingParcel._id}`);

      document.getElementById("pay-modal")?.close();

      await Swal.fire({
        title: "Success!",
        text: "Payment completed successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setPayingParcel(null);
      await refetch();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update payment status.",
        icon: "error",
      });
    }
  };

  if (isLoading) return <p className="p-4">Loading…</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Parcels</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>CreatedAt</th>
              <th>Cost(৳)</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, idx) => (
              <tr key={parcel._id}>
                <th>{idx + 1}</th>
                <td>{parcel.type === "document" ? "Document" : "Non‑document"}</td>
                <td>{format(new Date(parcel.creation_date), "PPP p")}</td>
                <td>{parcel.cost}</td>
                <td>
                  <span
                    className={`badge ${
                      isPaid(parcel.status) ? "badge-success" : "badge-error"
                    } badge-outline`}
                  >
                    {isPaid(parcel.status) ? "Paid" : "Unpaid"}
                  </span>
                </td>
                <td className="flex flex-wrap gap-2">
                  <button
                    className="btn btn-sm btn-info text-white"
                    onClick={() => handleViewDetails(parcel)}
                  >
                    View
                  </button>

                  {!isPaid(parcel.status) && (
                    <button
                      className="btn btn-sm btn-success text-white"
                      onClick={() => handlePayClick(parcel)}
                    >
                      Pay
                    </button>
                  )}

                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => handleDelete(parcel._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      <dialog id="parcel-detail-modal" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Parcel Details</h3>
          {selectedParcel && (
            <div className="space-y-2">
              <p><strong>Tracking ID:</strong> {selectedParcel.tracking_id}</p>
              <p><strong>Sender:</strong> {selectedParcel.senderName}</p>
              <p><strong>Receiver:</strong> {selectedParcel.receiverName}</p>
              <p><strong>Address:</strong> {selectedParcel.receiverAddress}</p>
              <p><strong>Cost:</strong> ৳{selectedParcel.cost}</p>
              <p><strong>Status:</strong> {selectedParcel.status}</p>
              <p><strong>CreatedAt:</strong> {format(new Date(selectedParcel.creation_date), "PPP p")}</p>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Pay Confirmation Modal */}
      <dialog id="pay-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Confirm Payment</h3>
          {payingParcel && (
            <>
              <p>
                Pay <strong>৳{payingParcel.cost}</strong> for TrackingID&nbsp;
                <strong>{payingParcel.tracking_id}</strong>?
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <button className="btn btn-success" onClick={handleConfirmPay}>
                  Confirm Pay
                </button>
                <form method="dialog">
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyParcels;
