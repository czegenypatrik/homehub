import { useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import supabase from '../db/supabase';

export function useAuth(): User | null {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data, error }) => {
            if (!error) {
                setUser(data.user);
            }
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event: string, session: Session | null) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return user;
}
