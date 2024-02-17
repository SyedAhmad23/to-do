import {
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography,
} from '@mui/material';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "@/constants/Routes";
import { loginUser } from '@/features/auth/authSlice';
import { RootState } from '@/app/store';
import LockOpenIcon from '@mui/icons-material/LockOpen';


function Login() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            router.push(ROUTES.dashboard);
        }
    }, []);

    const { loading, error } = useSelector((state: RootState) => state.auth);
    const handleLogin = async () => {
        let userCredentials = {
            username,
            password
        };
        try {
            //@ts-ignore
            const result = await dispatch(loginUser(userCredentials));
            console.log('Response from server:', result);
            if (loginUser.fulfilled.match(result)) {
                setUsername('');
                setPassword('');
                localStorage.setItem('isLoggedIn', 'true');
                router.push(ROUTES.dashboard);
            }
        } catch (error) {
            console.error("Error in handleSubmit:", error);
        }
        console.log('Form submitted with data:', username, password);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Typography variant="body2" color="error">{error}</Typography>}
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        style={{ backgroundColor: '#009688' }}
                        onClick={handleLogin}
                        endIcon={<LockOpenIcon />}
                    >
                        {loading ? "loading..." : "Login"}
                        {/* Login */}
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default Login;
