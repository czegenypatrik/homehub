import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import supabase from '../db/supabase';
import { useAuth } from '../types/useAuth';

function Header() {
    const [loading, setLoading] = useState<boolean>(false);
    const user = useAuth();

    const handleLogout = async () => {
        setLoading(true);

        const { error } = await supabase.auth.signOut();

        setLoading(false);

        if (error) {
            console.error('Logout failed:', error.message);
        }
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p={2}
        >
            <div>{user?.user_metadata.username}</div>

            <Button
                variant="outlined"
                color="primary"
                onClick={handleLogout}
                disabled={loading}
            >
                {loading ? 'Logging out...' : 'Logout'}
            </Button>
        </Stack>
    );
}

export default Header;
