import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CheckoutForm = ({ data }) => {
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const { price, image } = data;

  useEffect(() => {
    fetch("https://serversite-liart.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: data.userName,
            email: data.userEmail,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      const paymentInfo = {
        price: data.price,
        transactionId: paymentIntent?.id,
        orderId: data._id,
        customerEmail: data.userEmail,
      };
      fetch("https://serversite-liart.vercel.app/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          auth: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(paymentInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.insertedId) {
            fetch(`https://serversite-liart.vercel.app/books?image=${image}`, {
              method: "PUT",
              headers: {
                "content-type": "application/json",
                auth: `bearer ${localStorage.getItem("token")}`,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);

                Swal.fire(
                  "Payment Successfully Done",
                  "Thank you very much",
                  "success"
                );
                setSuccess("Payment Sucessfully");
                setTransactionId(paymentIntent?.id);
              });
          }
        });
    }
    setProcessing(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="bg-purple-400 hover:bg-purple-600 rounded cursor-pointer mt-10 px-10 py-2 disabled:cursor-none disabled:bg-gray-500"
          disabled={!stripe || !clientSecret || processing || success}
        >
          Pay
        </button>

        <p className="text-red-600 font-bold text-center py-5">{cardError}</p>

        {success && (
          <div className="font-bold text-center py-5">
            <p className="text-green-600 ">{success}</p>
            <p>Your transaction id : {transactionId}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
