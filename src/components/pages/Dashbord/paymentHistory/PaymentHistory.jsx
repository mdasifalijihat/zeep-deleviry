import React from "react";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-24">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <p className="text-center mt-8 text-gray-500">
        No payment history found.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      <table className="table w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Amount (BDT)</th>
            <th className="border border-gray-300 px-4 py-2">Payment Method</th>
            <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
            <th className="border border-gray-300 px-4 py-2">Paid At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(
            ({ _id, amount, paymentMethod, transactionId, paidAt }) => (
              <tr key={_id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{amount}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {paymentMethod}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {transactionId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(paidAt).toLocaleString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
