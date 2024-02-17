import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { ROUTES } from "@/constants/Routes";
import { useRouter } from "next/router";
import LockIcon from '@mui/icons-material/Lock';
const Navbar = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.setItem('isLoggedIn', 'false');
        router.push(ROUTES.login);
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#607d8b', color: '#fff' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    TO-DO
                </Typography>
                <Button style={{ backgroundColor: '#212121' }} variant="contained"
                    onClick={handleLogout} endIcon={<LockIcon />}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
