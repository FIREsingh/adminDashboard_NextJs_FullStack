import { json } from "@sveltejs/kit";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import UserModel from "@/app/model/UserModel";

export async function POST(request: Request) {
  await dbConnect()
    .then(() => {
      console.log("db connected in controller");
    })
    .catch((error) => {
      console.log("error to connect to db in admin register controller", error);
    });

  try {
    //fetch data from request
    const { username, email, password, role } = await request.json();

    if (!username || !email || !password) {
      return json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    //check if user name already exists by mail
    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      return json(
        {
          success: false,
          message: "User already exists with this email",
        },
        { status: 400 }
      );

      //else create user in db
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        username,
        email,
        role,
        password: hashedPassword,
        isVerified: true,
      });
      await newUser.save({ validateBeforeSave: false });
    }
    return json(
      {
        success: true,
        message: "User registered successfully.",
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
