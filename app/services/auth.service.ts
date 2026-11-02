import { createClient } from '@/lib/supabase/server';

type inputSignup = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class EmailAlreadyExistsError extends Error {
    constructor() {
        super("This Email already exists. Please try another email or login instead.");
        this.name="EmailAlreadyExistsError";
    }
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
            if (
                error.code === "use_already_exists" ||
                /already registered|already exists/i.test(error.message)
            ) {
                throw new EmailAlreadyExistsError();
            }
            throw error;
        }

        if (data.user && data.user.identities?.length === 0) {
            throw new EmailAlreadyExistsError();
        }

        return {
            user: data.user,
            session: data.session,
            message: 'Signup successful. Please check your email for confirmation.',
        };
    }

    static async login(email: string, password: string) {
        const supabase = await createClient();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password,
        });

        if (error) {
            throw new Error(error.message);
        }

        return {
            user: data.user,
            session: data.session,
            message: 'Login successful.',
        };
    }
}

