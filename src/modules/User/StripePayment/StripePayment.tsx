import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Checkout from "../../../components/SharedUser/Checkout/Checkout"



const stripe = loadStripe(import.meta.env.VITE_STRIPE_TOKEN)


export default function StripePayment() {
  return (
    <Elements stripe={stripe}>
      <Checkout />
    </Elements>
  )
}