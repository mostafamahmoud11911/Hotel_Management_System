import { Box, Button, Container, Step, StepButton, Stepper, Typography } from '@mui/material'
import { AddressElement, CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { FormEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import checkoutImg from '../../../assets/Images/creditCard.png'
import paymentDone from "../../../assets/Images/paymentDone.png"
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { api } from '../../../utils/custom'
import { Paths } from '../../../constant/enums'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const steps = ['Make payment', 'Complete the application'];

export default function Checkout() {
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();
    const stripe = useStripe();
    const element = useElements();


    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };
    const handlePayment = async (tokenId: string) => {
        setLoading(true)
        try {
            const { data } = await api.post(`/portal/booking/${id}/pay`, { token: tokenId });
            console.log(data);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            toast.success(data.message);
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>
            toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!stripe || !element) return;
        const cardElement = element.getElement(CardElement);
        if (!cardElement) return;
        // const addressElement = element.getElement(AddressElement);
        // const address = addressElement ? addressElement.getValue() : null;


        const { error, token } = await stripe.createToken(cardElement);

        if (error) {
            return toast.error(error.message)
        }
        if (token) {
            handlePayment(token.id);
        }
    }


    return (
        <Container>
            <Stepper nonLinear activeStep={activeStep} sx={{ mb: 4, maxWidth: { md: '50%', xs: '100%' }, mx: 'auto' }}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>

            {activeStep === 0 ? (<Box sx={{ display: 'flex', justifyContent: 'center', gap: "30px", flexWrap: 'wrap' }}>
                <Box sx={{ flex: { md: 1, xs: '1 0 100%' }, display: { md: "flex", xs: "none" }, justifyContent: "center", alignItems: "center" }}>
                    <LazyLoadImage src={checkoutImg} effect="blur" loading='lazy'  style={{ width: "70%" }} alt="pay-image" />
                </Box>
                <Box component="form" onSubmit={handleSubmit} sx={{ flex: { md: 1, xs: '1 0 100%' }, display: "flex", flexDirection: "column", gap: "20px" }}>
                    <AddressElement options={{ mode: 'shipping' }} className='card' />
                    <CardElement className='card' />
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button type="submit" aria-label='pay' variant='contained' disabled={loading}>{loading ? "Pay..." : "Pay"}</Button>
                        <Button variant='outlined' aria-label='back' onClick={() => navigate(-1)}>Cancel</Button>
                    </Box>
                </Box>
            </Box>) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: "30px" }}>
                    <Box textAlign="center">
                        <Typography variant='h5' component="h2">Yay! Completed</Typography>
                        <LazyLoadImage effect="blur" src={paymentDone} alt="" />
                        <Box>
                            <Typography variant='subtitle2' component="p" color='textDisabled'>We will inform you via email later</Typography>
                            <Typography variant='subtitle2' component="p" color='textDisabled'>once the transaction has been accepted</Typography>
                            <Button variant='contained' aria-label='back to home' sx={{ mt: 2 }} onClick={() => navigate(Paths.LANDING)}>Back to Home</Button>
                        </Box>
                    </Box>
                </Box>
            )}




        </Container>
    )
}
