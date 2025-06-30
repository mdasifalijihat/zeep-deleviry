import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch parcel info by parcelId
  const { data: parcelInfo = {}, isPending } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="text-center mt-8">
        <span className="loading loading-spinner text-primary loading-md"></span>
      </div>
    );
  }

  // Validate cost
  const amount = Number(parcelInfo.cost || 0);
  if (!amount) {
    return (
      <div className="text-red-500 text-center mt-10 font-semibold">
        Invalid parcel cost.
      </div>
    );
  }

  const amountInCents = Math.round(amount * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);
    setCardError("");

    // Create payment method
    const { error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethodError) {
      setCardError(paymentMethodError.message);
      setLoading(false);
      return;
    }

    try {
      // Create payment intent on backend
      const intentRes = await axiosSecure.post("/create-payment-intent", {
        amount: amountInCents,
       });
      const clientSecret = intentRes.data.clientSecret;

      // Confirm the card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName || "Anonymous",
            email: user.email,
          },
        },
      });

      if (result.error) {
        setCardError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        // Prepare payment data for backend record
        const paymentData = {
          parcelId,
          email: user.email,
          amount,
          paymentMethod:
            (result.paymentIntent.payment_method_types &&
              result.paymentIntent.payment_method_types[0]) ||
            "card",
          transactionId: result.paymentIntent.id,
        };

        // Record payment
        const paymentRes = await axiosSecure.post("/payments", paymentData);

        if (paymentRes.data.insertedId) {
          await Swal.fire({
            title: "Payment Successful!",
            html: `Thank you. Your payment has been processed.<br><br><strong>Transaction ID:</strong> ${result.paymentIntent.id}`,
            icon: "success",
            confirmButtonText: "OK",
             timerProgressBar: true,
          });

          // Redirect after alert
          navigate("/dashboard/myParcels");
        }
      }
    } catch (err) {
      setCardError("Payment processing failed. Please try again.");
      Swal.fire({
        title: "Payment Failed!",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
      console.error(err);
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
            <p className="text-lg font-semibold text-center text-gray-700">
              Amount to Pay: <span className="text-primary">৳{amount}</span>
            </p>

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
