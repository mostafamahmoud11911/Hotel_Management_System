import "./StripePayment.module.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "@/Components";
import { Helmet } from 'react-helmet';


const stripePromise = loadStripe(
  "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
);

const StripePayment = () => {
  return (
    <>
      <Helmet>
        <title> StripePayment • Staycation</title>
      </Helmet>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
  );
};

export default StripePayment;
