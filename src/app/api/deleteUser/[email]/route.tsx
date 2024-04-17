import dbConnect from "@/lib/dbConnect";
import UserModel from "@/app/model/UserModel";

export async function GET(
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
  const userData = await UserModel.deleteOne({ email: params.email });
  return Response.json(
    {
      success: true,
      message: "User has deleted successfully .",
    },
    { status: 201 }
  );
}
