import {register} from "@/lib/config/service";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
 try {
  const data = await request.json();

  // Validasi input
  if (!data.email || !data.password || !data.fullname || !data.phone) {
   return NextResponse.json({error: "All fields are required"}, {status: 400});
  }

  const result = await register(data);

  if (!result.status) {
   return NextResponse.json(
    {error: result.message},
    {status: result.statusCode}
   );
  }

  return NextResponse.json(result);
 } catch (error) {
  console.error("Registration error:", error);
  return NextResponse.json({error: "Internal server error"}, {status: 500});
 }
}
