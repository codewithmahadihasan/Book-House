import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  const loader = useLoaderData();
  console.log(loader);
  const stripePromise = loadStripe(
    "pk_test_51M6r9zFvc3JNNMRtgB97XVKGmZmttDCLJzGSTxjuhcLQzZXF4SkY6fEuu7PZUzyqlcsaFsFT3HjpogHy4jYya9sp00dHZBejaM"
  );

  return (
    <div>
      <section className=" text-gray-700 ">
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          <h1 className="text-4xl font-bold leading-none sm:text-5xl">
            Payment For
            <br />
            <span className="text-violet-400 mx-3">"{loader.product}"</span>
          </h1>
          <p className="px-8 mt-8 mb-12 text-lg">
            Please Pay <strong>{loader.price} Taka</strong> for your perseus
            book
            <br />
          </p>
          <div className="w-3/4">
            <Elements stripe={stripePromise}>
              <CheckoutForm data={loader}></CheckoutForm>
            </Elements>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payment;
