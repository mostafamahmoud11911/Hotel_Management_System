import { Box, Container, Stack, styled, Typography, Skeleton } from "@mui/material";
import { Ballot } from '@mui/icons-material';
import { PieChart } from '@mui/x-charts/PieChart';
import { AxiosError } from "axios";
import { toast } from "sonner";
import { api } from "../../../utils/custom";
import { useEffect, useState } from "react";



const CardLayout = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),
  gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  },
}));


const CartLayout = styled(Box)(({ theme }) => ({
  display: "grid",
  padding: "3rem 1rem 3rem",

  gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
}))


export default function Home() {

  const [pending, setPending] = useState(false);
  const [dashboardDetails, setDashboardDetails] = useState({ rooms: 0, facilities: 0, bookings: { pending: 0, completed: 0 }, ads: 0, users: { user: 0, admin: 0 } })




  const getDashboardDetails =async () => {
    setPending(true)
    try {
      const { data } = await api.get("/admin/dashboard");
        setDashboardDetails(data.data)
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>
      toast.error(err?.response?.data?.message || err.message ||
        'An unexpected error occurred');
    } finally {
      setPending(false)
    }
  }




  useEffect(() => {
    getDashboardDetails()
  }, []);


  const bookingDetails = [
    {
      id: crypto.randomUUID(),
      value: dashboardDetails.bookings.pending,
      label: "Pending",
    },
    {
      id: crypto.randomUUID(),
      value: dashboardDetails.bookings.completed,
      label: "Completed",
    }
  ]


  const userDetails = [
    {
      id: crypto.randomUUID(),
      value: dashboardDetails.users.admin,
      label: "Admin"
    },
    {
      id: crypto.randomUUID(),
      value: dashboardDetails.users.user,
      label: "User"
    }
  ]


  const cards =[
    {
      id: crypto.randomUUID(),
      count: dashboardDetails.rooms,
      text: "Rooms",
      icon: <Ballot sx={{ color: "#203FC7" }} />
    },
    {
      id: crypto.randomUUID(),
      count: dashboardDetails.facilities,
      text: "Facilities",
      icon: <Ballot sx={{ color: "#203FC7" }} />
    },
    {
      id: crypto.randomUUID(),
      count: dashboardDetails.ads,
      text: "Ads",
      icon: <Ballot sx={{ color: "#203FC7" }} />
    },
  ]



  return (
    <Container>
      {pending ? <DashboardSkeleton /> :
        <Box>
          <CardLayout>
            {cards.map(card => (
              <Box key={card.id} sx={{ backgroundColor: "#000", color: "white", flex: 1, p: 2, borderRadius: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h4">{card.count}</Typography>
                    <Typography variant="h5">{card.text}</Typography>
                  </Box>
                  <Box sx={{ backgroundColor: "#203FC759", width: 40, height: 40, borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {card.icon}
                  </Box>
                </Stack>
              </Box>
            ))}
          </CardLayout>


          <CartLayout>
            <Box>
              <PieChart
                colors={['red', 'blue']}
                series={[
                  {
                    data: bookingDetails,
                  },
                ]}
                width={200}
                height={200}
              />
            </Box>
            <Box>
              <PieChart

                series={[
                  {
                    data: userDetails
                  },
                ]}
                width={200}
                height={200}
              />
            </Box>
          </CartLayout>
        </Box>}
    </Container>
  )
}




const DashboardSkeleton = () => {
  return (
    <Box>
      {/* Cards Skeleton */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        {[1, 2, 3].map((item) => (
          <Box key={item} sx={{ backgroundColor: '#f5f5f5', flex: 1, p: 2, borderRadius: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Skeleton variant="text" width={80} height={40} />
                <Skeleton variant="text" width={120} height={30} />
              </Box>
              <Skeleton 
                variant="circular" 
                width={40} 
                height={40} 
                sx={{ backgroundColor: '#e0e0e0' }} 
              />
            </Stack>
          </Box>
        ))}
      </Box>

      {/* Charts Skeleton */}
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ 
          width: 200, 
          height: 200, 
          backgroundColor: '#f5f5f5',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Skeleton 
            variant="circular" 
            width={180} 
            height={180} 
            sx={{ backgroundColor: '#e0e0e0' }} 
          />
        </Box>
        <Box sx={{ 
          width: 200, 
          height: 200, 
          backgroundColor: '#f5f5f5',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Skeleton 
            variant="circular" 
            width={180} 
            height={180} 
            sx={{ backgroundColor: '#e0e0e0' }} 
          />
        </Box>
      </Box>
    </Box>
  );
};