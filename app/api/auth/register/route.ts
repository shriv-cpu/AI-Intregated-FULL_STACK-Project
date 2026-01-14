import { connectedToDatabase } from "@/lib/db";
import User from "@/models/User";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const {email,password}=await request.json()

        if(!email ||  !password){
            return NextResponse.json(
                {error:"email and password are required"},
                {status:400}
            )
        }

        await connectedToDatabase()

        const existingUser= await User.findOne({email})

        if(existingUser){
                return NextResponse.json(
                    {error:"User already register"},
                    {status:400}
                );
        }

      await  User.create({
            email,
            password
        })
        
         return NextResponse.json(
                {message:"user create successfully"},
                {status:400}
            )





    } catch (error) {
        console.error("registered error",)
         return NextResponse.json(
                {message:"user create successfully"},
                {status:400}
            )
    }
}