import { json } from "@sveltejs/kit";

export async function POST(request: Request) {
  return json(
    {
      success: true,
      message: "Entered.",
    },
    { status: 201 }
  );
}
