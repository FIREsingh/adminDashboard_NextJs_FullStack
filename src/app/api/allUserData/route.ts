import dbConnect from "@/lib/dbConnect";
import UserModel from "@/app/model/UserModel";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  await dbConnect()
    .then(() => {
      console.log("db connected in controller");
    })
    .catch((error) => {
      console.log("error to connect to db in controller", error);
    });

  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));

  console.log("type is ===>", typeof page);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  console.log(`startIndex ==> ${startIndex}, endIndex ==> ${endIndex}`);

  const allUsers = await UserModel.find().limit(limit).skip(startIndex);
  const count = await UserModel.countDocuments();

  return Response.json(
    {
      success: true,
      message: "data is ready to fetch",
      data: allUsers,
      count: count,
    },
    { status: 201 }
  );
}
