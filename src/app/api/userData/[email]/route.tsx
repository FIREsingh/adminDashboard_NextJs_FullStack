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
  const userData = await UserModel.findOne({ email: params.email });
  return Response.json(
    {
      success: true,
      message: "Entered.",
      data: userData,
    },
    { status: 201 }
  );
}
