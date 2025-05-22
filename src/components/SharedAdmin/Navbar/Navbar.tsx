import { AppBar, Avatar, Box, IconButton, Typography } from "@mui/material";
import { KeyboardArrowDown } from '@mui/icons-material';
import profileImg from "../../../assets/Images/photo.jpg"
import { useEffect, useState } from "react";




export default function Navbar() {


    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user")!)
        setUser(user?.userName)
    }, [])




    return (
        <AppBar position="static" sx={{ backgroundColor: "#F8F9FB", boxShadow: 0 }}>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end", marginRight: "3rem" }}>

                <IconButton >
                    <Avatar alt="Profile" src={profileImg} sx={{ objectFit: "cover" }} />
                </IconButton>


                <Typography sx={{ color: "gray" }}>{user}</Typography>
                <KeyboardArrowDown />
            </Box>

        </AppBar>
    )
}
