import { json } from "@sveltejs/kit";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import UserModel from "@/app/model/UserModel";

export async function POST(request: Request) {
  await dbConnect()
    .then(() => {
      console.log("db connected in controller");
    })
    .catch((error) => {
      console.log("error to connect to db in controller", error);
    });

  try {
    const { username, email, password, role } = await request.json();
    const existingVerifiedUserByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUserByUsername) {
      return json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(verifyCode);

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.role = role;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        role,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
      });

      await newUser.save();
    }
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    console.log("emailResponse=====>", emailResponse);
    if (!emailResponse.success) {
      return json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
