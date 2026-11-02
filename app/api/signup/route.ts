import { NextResponse } from "next/server";
import { AuthService } from "@/app/services/auth.service";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate signup input fields
        if (
            typeof body.firstName !== "string" ||
            typeof body.lastName !== "string" ||
            typeof body.email !== "string" ||
            typeof body.password !== "string" ||
            !body.firstName.trim() ||
            !body.lastName.trim() ||
            !body.email.trim() ||
            !body.password.trim()
        ) {
            return NextResponse.json(
                { error: "Invalid Input: Please fill in all fields." },
                { status: 400 }
            )
        }

        // Validate Password Confirmation if missing
        if (typeof body.confirmPassword !== "string" || !body.confirmPassword.trim()) {
            return NextResponse.json(
                { error: "Confirm Password is required." },
                { status: 400 }
            )
        }

        // Validate email is already exists
        

        // Validate Password Confirmation
        if (body.password !== body.confirmPassword) {
            return NextResponse.json(
                { error: "Password and Confirm Password do not Match." },
                { status: 400 }
            )
        }
        
        const result = await AuthService.signup({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,    
        });

        return NextResponse.json({
            message: "If this email can be registered, you will receive a confirmation email."
        });
    } catch (error) {
        console.error("Signup Error:", error);

        return NextResponse.json(
            { error: error instanceof Error
                ? error.message
                : "Signup failed. Please try again later." },
            { status: 500 }
        );
    }
}