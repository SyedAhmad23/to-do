import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { login } from '@/features/auth/authSlice';
import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/Routes';

function Signup() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('https://dummyjson.com/auth/signup', { email, password });
            dispatch(login(response.data));
            router.push(ROUTES.login);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleSignup}>Signup</Button>
        </div>
    );
}
export default Signup