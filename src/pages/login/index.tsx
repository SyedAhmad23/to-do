import {
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography,
    createTheme,
} from '@mui/material';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "@/constants/Routes";
import { loginUser } from '@/features/auth/authSlice';
import { RootState } from '@/app/store';

let theme = createTheme()
theme = createTheme(theme, {
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

function Login() {
    const classes = theme;
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
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
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
                        color="primary"
                        className={classes.submit}
                        onClick={handleLogin}
                    >
                        {/* {loading ? "loading..." : "Login"} */}
                        Login
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default Login;
