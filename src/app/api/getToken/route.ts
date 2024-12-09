import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function GET(): Promise<any> {
  try {
    const { accessToken } = await getAccessToken();
    const response = NextResponse.json({ accessToken });
    
    //const cookieOptions = `Max-Age=3600; Path=/; HttpOnly; Secure; SameSite=Strict`;
    response.headers.set('Set-Cookie', `authToken=${accessToken};`);
    return response;
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to get access token' }));
  }
}
