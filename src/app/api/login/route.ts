import UserModel from "@/app/model/UserModel";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  await dbConnect()
    .then(() => {
      console.log("db connected in controller");
    })
    .catch((error) => {
      console.log("error to connect to db in controller", error);
    });

  try {
    const { email, password } = await request.json();
    console.log(email, password);
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User dont exist.",
        },
        { status: 404 }
      );
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password.",
        },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Logged in seccessfully.",
      },
      { status: 201 }
    );
    const options = {
      httpOnly: true,
    };
    response.cookies.set("token", token, options);
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error while login caught by try-catch",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
