import { NextResponse } from "next/server";
import { AuthService } from "@/app/services/auth.service";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // validate signin input fields
        if (
            typeof body.email !== "string" ||
            typeof body.password !== "string" ||
            !body.email.trim() ||
            !body.password.trim()
        ) {
            return NextResponse.json(
                { error: "Email and Password is required" },
                { status: 400 }
            )
        }
        
        const result = await AuthService.login(body.email, body.password);

        return NextResponse.json({
            message: "You have successfully logged in.",
            user: result.user,
            session: result.session,
        });
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { error: error instanceof Error
                ? error.message
                : "Login failed. Please try again later." },
            { status: 500 }
        )
    }
}