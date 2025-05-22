import { Box, Container, Grid, Typography } from "@mui/material";


export default function Footer() {

    return (
        <Container sx={{ my: 5 }}>
            <Grid container>
                <Grid size={{ md: 3, xs: 12, }} sx={{ py: { xs: 2, md: 0 } }}>
                    <Box>
                        <Box component="span" mb={1} sx={{ color: 'hsl(220, 70.50%, 58.80%)' }}>Stay</Box>cation.
                        <Typography variant="body2" color="textDisabled">We kaboom your beauty holiday</Typography>
                    </Box>
                </Grid>
                <Grid size={{ md: 3, xs: 12 }} sx={{ py: { xs: 2, md: 0 } }}>
                    <Typography variant="body1" sx={{ color: "#152C5B" }} mb={1}>For Beginners</Typography>
                    <Typography variant="body2" color="textDisabled">New Account</Typography>
                    <Typography variant="body2" color="textDisabled" my={1}>Start Booking a Room</Typography>
                    <Typography variant="body2" color="textDisabled">Use Payments</Typography>

                </Grid>
                <Grid size={{ md: 3, xs: 12 }} sx={{ py: { xs: 2, md: 0 } }}>
                    <Typography variant="body1" sx={{ color: "#152C5B" }} mb={1}>Explore Us</Typography>
                    <Typography variant="body2" color="textDisabled">Our Careers</Typography>
                    <Typography variant="body2" color="textDisabled" my={1}>Privacy</Typography>
                    <Typography variant="body2" color="textDisabled">Terms & Conditions</Typography>
                </Grid>
                <Grid size={{ md: 3, xs: 12 }} sx={{ py: { xs: 2, md: 0 } }}>
                    <Typography variant="body1" sx={{ color: "#152C5B" }} mb={1}>Connect Us</Typography>
                    <Typography variant="body2" color="textDisabled">support@staycation.id</Typography>
                    <Typography variant="body2" color="textDisabled" my={1}>021 - 2208 - 1996</Typography>
                    <Typography variant="body2" color="textDisabled">Staycation, Kemang, Jakarta</Typography>
                </Grid>
            </Grid>
            <Typography variant="body2" color="textDisabled" mt={5} textAlign={"center"}>Copyright {new Date().getFullYear()} • All rights reserved • Staycation</Typography>
            <Typography variant="body2" color="textDisabled" mt={1} textAlign={"center"}>Created By Mostafa Mahmoud</Typography>

        </Container>
    )
}
