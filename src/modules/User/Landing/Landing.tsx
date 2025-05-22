import { Box, Container, Typography } from "@mui/material";
import Heading from "./_components/Heading";
import AdsPopular from "./_components/AdsPopular";
import Backyard from "./_components/Backyard";
import LivingRoom from "./_components/LivingRoom";
import Reviews from "./_components/Reviews";



export default function Landing() {
  return (
    <Container>
      <Box sx={{ margin: "0 20px" }}>
        <Heading />
        <Box sx={{ mt: 5 }}>
          <Typography variant="body1" color="#152C5B" fontWeight={"bold"} mb={2}>Most popular ads</Typography>
          <AdsPopular />
        </Box>

        <Box sx={{ mt: 5 }}>
          <Typography variant="body1" color="#152C5B" fontWeight={"bold"} mb={2}>Houses with beauty backyard</Typography>
          <Backyard />
        </Box>


        <Box sx={{ mt: 5 }}>
          <Typography variant="body1" color="#152C5B" fontWeight={"bold"} mb={2}>Hotels with large living room</Typography>
          <LivingRoom />
        </Box>



        <Box sx={{ mt: 5 }}>
          <Reviews />
        </Box>
      </Box>
    </Container>
  )
}
