import { createClient } from '@/lib/supabase/client';

type inputSignup = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export async function signup(input: inputSignup) {
    const supabase = createClient();

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
    }
}