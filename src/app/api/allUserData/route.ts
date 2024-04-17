import dbConnect from "@/lib/dbConnect";
import UserModel from "@/app/model/UserModel";

export async function GET(request: Request) {
  await dbConnect()
    .then(() => {
      console.log("db connected in controller");
    })
    .catch((error) => {
      console.log("error to connect to db in controller", error);
    });

  const allUsers = await UserModel.find();
  return Response.json(
    {
      success: true,
      message: "data is ready to fetch",
      data: allUsers,
    },
    { status: 201 }
  );
}
