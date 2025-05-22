
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";



export default function MasterLayout() {

    const [collapsed, setCollapsed] = useState(false);


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    marginLeft: { md: collapsed ? '80px' : '240px' },
                    transition: 'margin-left 0.3s ease'
                }}
            >
                <Navbar />
                <Box sx={{ p: 1 }}>
                    <Outlet />

                </Box>
            </Box>
        </Box>

    )
}