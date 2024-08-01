import { paymentByVisa } from "@/Redux/Features/Portal/Payment/PaymentSlice";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Skeleton,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import {
  AddressElement,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./CheckoutForm.module.scss";
import { creditCard, paymentDone } from "@/Assets/Images";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"
const CheckoutForm = () => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //! ************************ Payment function  *************************
  const handlePayment = async (tokenId: any) => {
    try {
      setLoading(true);
      // @ts-ignore
      const element = await dispatch(paymentByVisa({ tokenId, id }));
      // @ts-ignore
      toast.success(element?.payload?.message, {
        autoClose: 2000,
        theme: "colored",
      });
      setActiveStep((currentStep) => currentStep + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      toast.error(error?.message, {
        autoClose: 2000,
        theme: "colored",
      });
    } else {
      const tokenId = token?.id;
      handlePayment(tokenId);
    }
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNavigate = () => {
    navigate("/");
  };
  const MotionButton = motion(Button)
  return (
    <>
      <Box component={"main"}>
        <Box className="userContainer">
          <Box className="Stepper">
            <Stepper activeStep={activeStep}>
              <Step className="circle">
                <StepLabel>{t("MakePayment")} </StepLabel>
              </Step>
              <Step>
                <StepLabel> {t("CompleteTheApplication")} </StepLabel>
              </Step>
            </Stepper>
          </Box>

          <Box>
            {activeStep === 0 ? (
              <>
                <Box className="headerPay">
                  <Typography variant="h3" className="headerTitle">
                    {t("Payment")}
                  </Typography>
                  <Typography className="content">
                    {t("PaymentDesc")}
                  </Typography>
                </Box>

                <Box className="paymentCon">
                  <Box className="leftCon">
                    {!creditCard ? (
                      <Skeleton
                        variant="rectangular"
                        width={420}
                        height={460}
                        animation="wave"
                      />
                    ) : (
                      <img src={creditCard} alt="creditCardImage" />
                    )}
                  </Box>

                  <Box
                    component={"form"}
                    className="paymentForm"
                    onSubmit={handleSubmit}
                  >
                    <AddressElement
                      className="AddressElement"
                      options={{ mode: "billing" }}
                    ></AddressElement>
                    <CardElement className="cardElement" />
                    {loading ? (
                      <LoadingButton
                        sx={{
                          width: "100%",
                          padding: "20px",
                          margin: "20px 0",
                        }}
                        className="loadingButton"
                        loading
                        variant="outlined"
                      ></LoadingButton>
                    ) : (
                      <>
                        <Box className="paymentBtnCon">
                          <MotionButton
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.8 }}
                            variant="contained"
                            className="paymentBtn"
                            disabled={!stripe}
                            type="submit"
                          >
                            {t("Pay")}
                          </MotionButton>
                          <Button
                            variant="contained"
                            className="paymentBtn"
                            onClick={() => navigate("/")}
                            type="submit"
                          >
                            {t("Cancel")}
                          </Button>
                        </Box>
                      </>
                    )}{" "}
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Box className="headerPay">
                  <Typography variant="h3" className="headerTitle">
                    {t("Completed")}
                  </Typography>
                  <img src={paymentDone} alt="" />
                  <Typography className="content">
                    {t("description")}
                  </Typography>
                  <MotionButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.8 }}
                    className="backBtn" onClick={() => handleNavigate()}>
                    {t("BackToHome")}
                  </MotionButton>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CheckoutForm;
