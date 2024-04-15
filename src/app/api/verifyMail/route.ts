import { json } from "@sveltejs/kit";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/app/model/UserModel";

export async function POST(request: Request) {
  // Connect to the database
  await dbConnect();

  try {
    const { pin } = await request.json();
    const username = "aaaaa";
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // if user exist then check if the otp is correct and not expired
    const isCodeValid = user.verifyCode === pin;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    if (isCodeValid && isCodeNotExpired) {
      // if otp is valid and not expired then update the user's verification status
      user.isVerified = true;
      // user.verifyCode = undefined;
      // user.verifyCodeExpiry = undefined;
      console.log("user backend ===>", user);
      await user.save({ validateBeforeSave: false });
      console.log(user);

      return Response.json(
        { success: true, message: "Account verified successfully" },
        { status: 200 }
      );
      // If code has expired
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired. Please sign up again to get a new code.",
        },
        { status: 400 }
      );
      // if code is incorrect
    } else {
      return Response.json(
        { success: false, message: "Incorrect verification code" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    return Response.json(
      { success: false, message: "Error verifying user" },
      { status: 500 }
    );
  }
}
