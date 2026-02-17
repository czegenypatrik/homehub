import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import supabase from '../db/supabase';

function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
        }
    };

    return (
        <Card sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleLogin}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                        required
                        fullWidth
                    />

                    <TextField
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                        required
                        fullWidth
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        size="large"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Login'}
                    </Button>

                    {error && <Alert severity="error">{error}</Alert>}
                </Box>
            </CardContent>
        </Card>
    );
}

export default Login;
