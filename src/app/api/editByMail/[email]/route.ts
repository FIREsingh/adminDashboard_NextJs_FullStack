import dbConnect from "@/lib/dbConnect";
import UserModel from "@/app/model/UserModel";

export async function PUT(
  request: Request,
  { params }: { params: { email: string } }
) {
  await dbConnect()
    .then(() => {
      console.log("db connected in controller");
    })
    .catch((error) => {
      console.log("error to connect to db in controller", error);
    });

  const { username, role } = await request.json();
  console.log("data ====>", username, role);
  await UserModel.updateOne(
    { email: params.email },
    { $set: { username, role } }
  );
  return Response.json(
    {
      success: true,
      message: "User has Edited successfully .",
    },
    { status: 201 }
  );
}
