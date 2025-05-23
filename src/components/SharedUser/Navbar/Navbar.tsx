import { useMemo, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink, useNavigate } from 'react-router';
import { Button, Container, styled } from '@mui/material';
import { Auth, Paths } from '../../../constant/enums';



const drawerWidth = 240;

export default function DrawerAppBar() {

    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = useMemo(() => [{ id: crypto.randomUUID(), path: Paths.LANDING, text: "Home" }, { id: crypto.randomUUID(), path: `/${Paths.EXPLORE}`, text: "Explore" }], []);


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };


    const Link = styled(NavLink)(({ theme }) => ({
        textDecoration: 'none',
        color: theme.palette.text.secondary,
        '&.active': {
            color: 'hsl(220, 70.50%, 58.80%)',
        },
        '&:hover': {
            color: 'hsl(220, 70.50%, 58.80%)',
            backgroundColor: 'rgba(98, 143, 229, 0.08)' // Light blue hover
        }
    }))

    const isAuthenticated = localStorage.getItem("authToken") !== null;

    const navigate = useNavigate();

    const handelLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate(Paths.LANDING);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Container>
                <AppBar component="nav" position="sticky" color='transparent' sx={{ boxShadow: "none" }}>
                    <Toolbar>
                        <IconButton
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <Box component="span" sx={{ color: 'hsl(220, 70.50%, 58.80%)' }}>Stay</Box>cation.
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'flex', gap: "20px" } }}>
                            {navItems.map((item) => (
                                <Link to={item.path} key={item.id}>
                                    {item.text}
                                </Link>
                            ))}
                        </Box>
                        {isAuthenticated ? (
                            <Box sx={{
                                display: { xs: 'none', sm: 'flex', gap: "20px" },
                                marginLeft: "20px",
                                alignItems: "center"
                            }}>
                                <Link
                                    to={`/${Paths.FAVORITE}`}
                                >
                                    Favorites
                                </Link>
                                <Button
                                    variant="outlined"
                                    onClick={handelLogout}
                                    sx={{
                                        color: 'hsl(220, 70.50%, 58.80%)',
                                        borderColor: 'hsl(220, 70.50%, 58.80%)',
                                        borderRadius: '8px',
                                        padding: '6px 16px',
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            backgroundColor: 'hsl(220, 70.50%, 58.80%)',
                                            color: 'white',
                                            borderColor: 'hsl(220, 70.50%, 58.80%)'
                                        }
                                    }}
                                >
                                    Logout
                                </Button>
                            </Box>
                        ) : (
                            <Box sx={{ display: { xs: 'none', sm: 'flex', gap: "20px", marginLeft: "20px", } }}>
                                <Link to={`/${Auth.LOGIN}`}>Login</Link>
                                <Link
                                    to={`/${Auth.REGISTER}`}
                                >
                                    Sign Up
                                </Link>
                            </Box>
                        )}
                    </Toolbar>
                </AppBar>
            </Container>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ my: 2 }}>
                            <span style={{ color: 'hsl(220, 70.50%, 58.80%)' }}>Stay</span>cation.
                        </Typography>
                        <Divider />
                        <List>
                            {navItems.map((item) => (
                                <ListItem key={item.id} disablePadding>
                                    <ListItemButton sx={{ textAlign: 'center' }}>
                                        <Link to={item.path}>
                                            <ListItemText primary={item.text} />
                                        </Link>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            {isAuthenticated ? (
                                <>
                                    <Box sx={{
                                        display: { xs: 'flex', sm: 'none' },
                                        flexDirection: { xs: 'column' },
                                        alignItems: { xs: "start" },
                                        gap: { xs: "8px" },
                                        width: '100%'
                                    }}>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{ textAlign: 'center' }}>
                                                <Link to={`/${Paths.FAVORITE}`}>
                                                    <ListItemText primary="Favorites" />
                                                </Link>
                                            </ListItemButton>
                                        </ListItem>

                                        <Button
                                            variant="outlined"
                                            onClick={handelLogout}
                                            sx={{
                                                color: 'hsl(220, 70.50%, 58.80%)',
                                                borderColor: 'hsl(220, 70.50%, 58.80%)',
                                                borderRadius: '8px',
                                                padding: '8px 16px',
                                                textTransform: 'none',
                                                fontWeight: 500,
                                                margin: '0 15px',
                                                '&:hover': {
                                                    backgroundColor: 'hsl(220, 70.50%, 58.80%)',
                                                    color: 'white',
                                                    borderColor: 'hsl(220, 70.50%, 58.80%)'
                                                }
                                            }}
                                        >
                                            Logout
                                        </Button>
                                    </Box>
                                </>
                            ) : (
                                <Box sx={{
                                    display: "flex",
                                    gap: '12px',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    marginLeft: '10px',
                                    alignItems: {xs:'start', sm:'center'}
                                }}>
                                    <Button
                                        component={Link}
                                        to={`/${Auth.LOGIN}`}
                                        variant="text"
                                        sx={{
                                            color: 'text.secondary',
                                            '&:hover': {
                                                color: 'hsl(220, 70.50%, 58.80%)',
                                                backgroundColor: 'rgba(98, 143, 229, 0.08)'
                                            }
                                        }}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        component={Link}
                                        to={`/${Auth.REGISTER}`}
                                        variant="contained"
                                        sx={{
                                            backgroundColor: 'hsl(220, 70.50%, 58.80%)',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'hsl(220, 70%, 50%)'
                                            }
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                </Box>
                            )}
                        </List>
                    </Box>
                </Drawer>
            </nav>
        </Box>
    );
}
