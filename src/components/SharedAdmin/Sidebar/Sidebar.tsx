import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
    Dashboard as DashboardIcon,
    Folder as CollectionsIcon,
    BarChart as AnalyticsIcon,
    Logout as LogoutIcon,
    Menu as MenuIcon,
    ChevronLeft as CollapseIcon,
    ExpandMore as ExpandIcon,
    Bed as BedIcon,
    Book as BookIcon,
    Group as GroupIcon,
    Lock as LockIcon
} from '@mui/icons-material';

import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
    Toolbar,
} from '@mui/material';
import { Auth, Pages } from '../../../constant/enums';
import ChangePassModal from '../ChangePassModal/ChangePassModal';

interface NavItem {
    title: string;
    path: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    { title: 'Dashboard', path: `/${Pages.DASHBOARD}`, icon: <DashboardIcon /> },
    { title: 'Facilities', path: `/${Pages.DASHBOARD}/${Pages.FACILITIES}`, icon: <CollectionsIcon /> },
    { title: 'Ads', path: `/${Pages.DASHBOARD}/${Pages.ADS}`, icon: <AnalyticsIcon /> },
    { title: 'Rooms', path: `/${Pages.DASHBOARD}/${Pages.ROOM}`, icon: <BedIcon /> },
    { title: 'Booking', path: `/${Pages.DASHBOARD}/${Pages.BOOKING}`, icon: <BookIcon /> },
    { title: 'Users', path: `/${Pages.DASHBOARD}/${Pages.USERS}`, icon: <GroupIcon /> },
];


const NavLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.text.primary,
}))




const Sidebar = ({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [mobileOpen, setMobileOpen] = useState(false);

    const [open, setOpen] = useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const navigate = useNavigate();

    const handelLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate(`/${Auth.LOGIN}`);
    };










    const drawerWidth = 240;
    const collapsedWidth = 80;


    const drawer = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                bgcolor: 'primary.dark',
                color: 'primary.contrastText',
            }}
        >

            <Toolbar sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: collapsed ? 'center' : 'end', p: 2 }}>
                <IconButton onClick={toggleCollapse} color="inherit" >
                    {collapsed ? <ExpandIcon /> : <CollapseIcon />}
                </IconButton>
            </Toolbar>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />



            <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <React.Fragment>
                    <List>
                        {navItems.map((item) => (
                            <ListItem key={item.title} disablePadding>
                                <NavLink to={item.path} sx={{ width: "100%", color: "white", textDecoration: "none" }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: collapsed ? 'center' : 'initial',
                                            px: 2.5,
                                            '&.Mui-selected': {
                                                bgcolor: 'primary.light',
                                                '&:hover': { bgcolor: 'primary.light' }
                                            }
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: collapsed ? 'auto' : 3,
                                                justifyContent: 'center',
                                                color: 'inherit'
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        {!collapsed && (
                                            <ListItemText primary={item.title} sx={{ opacity: 1 }} />
                                        )}
                                    </ListItemButton>
                                </NavLink>


                            </ListItem>
                        ))}
                        <ListItem disablePadding>
                            <ListItemButton
                                sx={{
                                    justifyContent: collapsed ? 'center' : 'initial',
                                    px: 2.5,
                                    '&.Mui-selected': {
                                        bgcolor: 'primary.light',
                                        '&:hover': { bgcolor: 'primary.light' }
                                    }
                                }}
                                onClick={handleOpen}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: collapsed ? 'auto' : 3,
                                        justifyContent: 'center',
                                        color: 'inherit'
                                    }}
                                >
                                    <LockIcon />
                                </ListItemIcon>
                                {!collapsed && (
                                    <ListItemText primary="Change Password" sx={{ opacity: 1 }} />
                                )}
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                sx={{
                                    justifyContent: collapsed ? 'center' : 'initial',
                                    px: 2.5,
                                    '&.Mui-selected': {
                                        bgcolor: 'primary.light',
                                        '&:hover': { bgcolor: 'primary.light' }
                                    }
                                }}
                                onClick={handelLogout}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: collapsed ? 'auto' : 3,
                                        justifyContent: 'center',
                                        color: 'inherit'
                                    }}
                                >
                                    <LogoutIcon />
                                </ListItemIcon>
                                {!collapsed && (
                                    <ListItemText primary="Logout" sx={{ opacity: 1 }} />
                                )}
                            </ListItemButton>
                        </ListItem>
                    </List>
                </React.Fragment>

            </Box>

        </Box>
    );


    return (
        <>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth
                    }
                }}
            >
                {drawer}
            </Drawer>


            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: collapsed ? collapsedWidth : drawerWidth,
                        transition: 'width 0.3s ease'
                    }
                }}
                open
            >
                {drawer}
            </Drawer>

            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                    position: 'fixed',
                    top: 10,
                    left: 16,
                    zIndex: 1200,
                    display: { md: 'none' }
                }}
            >
                <MenuIcon />
            </IconButton>
            <ChangePassModal open={open} handleClose={handleClose} />
        </>
    );
};

export default Sidebar;