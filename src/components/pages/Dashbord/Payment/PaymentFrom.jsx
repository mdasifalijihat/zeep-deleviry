import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const [cardError, setCardError] = useState(""); // error state
  const [loading, setLoading] = useState(false); // optional loader

  const { data: parcelInfo = {}, isPending } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return <span className="loading loading-spinner loading-xs"></span>;
  }

  console.log(parcelInfo);

  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;
  console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("Payment method error:", error);
      setCardError(error.message); // set error
    } else {
      console.log("Payment method created:", paymentMethod);
      setCardError(""); // clear error
      // optional: send paymentMethod.id to backend

      const res = await axiosSecure.post("/create-payment-intent", {
        amount: amountInCents,
        parcelId,
      });

      const clientSecret = res.data.clientSecret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Jenny Rosen",
          },
        },
      });
      if (result.error) {
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("payment succeeded!");
          Swal.fire({
            title: "Payment Successful!",
            text: `Thank you. Your payment has been processed.`,
            icon: "success",
            confirmButtonText: "OK",
            timer: 2500,
            timerProgressBar: true,
          });
        }
      }
      console.log("res from intent", res);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <div className="card shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-xl font-bold mb-4">
            Pay for Parcel Pickup
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Show Amount */}
            <p className="text-lg font-semibold text-center text-gray-700">
              Amount to Pay: <span className="text-primary">৳{amount}</span>
            </p>
            {/* Card input */}
            <div className="p-3 border rounded-md">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#333",
                      "::placeholder": { color: "#888" },
                    },
                    invalid: { color: "#e53e3e" },
                  },
                }}
              />
            </div>

            {cardError && (
              <p className="text-error text-sm font-medium">{cardError}</p>
            )}

            <button
              type="submit"
              className="btn btn-success w-full"
              disabled={!stripe || loading}
            >
              {loading ? "Processing…" : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
