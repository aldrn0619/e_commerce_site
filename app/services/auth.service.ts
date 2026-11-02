import { createClient } from '@/lib/supabase/server';

type inputSignup = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class AuthService {
    
    static async signup(input: inputSignup) {
        const supabase = await createClient();

        const { data, error } = await supabase.auth.signUp({
            email: input.email.trim(),
            password: input.password,
            options: {
                data: {
                    firstName: input.firstName.trim(),
                    lastName: input.lastName.trim(),
                }
            }
        });

        if (error) {
            throw new Error(error.message);
        }

        return {
            user: data.user,
            session: data.session,
            message: 'Signup successful. Please check your email for confirmation.',
        };
    }
}

