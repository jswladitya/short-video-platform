import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST (request: NextRequest){
    
    try {
        const {email,password} = await request.json()
        
        if(!email || !password){
            return NextResponse.json(
                {
                    error: "email and password are required"
                },
                {status:400}
            )
        }
        await connectToDatabase();

        // checking if user already exits
        const existingUser = await User.findOne({email})

        if(existingUser){
            return NextResponse.json(
                {
                    error: "User with this email already exists"
                },
                {status:400}
            )
        }

        await User.create({
            email:email,
            password:password
        })

        return NextResponse.json(
            {
                message: "User registered successfuly"
            },
            {status:201}
        )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json(
            {
                error: "failed to register"
            },
            {status:500}
        );
    }
}