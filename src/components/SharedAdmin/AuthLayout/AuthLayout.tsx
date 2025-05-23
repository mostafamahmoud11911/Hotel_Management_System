import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router'
import AuthBackground from '../AuthBackground/AuthBackground'


export default function AuthLayout() {
    const isDesktop = useMediaQuery("(min-width: 900px)");

    return (
        <Grid container >
            <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ py: 1, px: 4 }}>
                    

                    <Typography variant="h5" gutterBottom><Box component="span" sx={{ color: 'hsl(220, 70.50%, 58.80%)' }}>Stay</Box>cation.</Typography>

                    <Box sx={{ px: { sm: 2, md: 6 }, mt: 3 }}>
                        <Outlet />
                    </Box>

                </Box>
            </Grid>
            <Grid size={{ sm: 12, md: 6 }} >
                {isDesktop && <AuthBackground />}
            </Grid>
        </Grid>
    )
}
