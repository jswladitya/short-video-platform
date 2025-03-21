import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET() {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    return NextResponse.json(authenticationParameters);
/* 
    it will return parameters like
{
    token:"5dd0e211-8d67-452e-9acd-954c0bd53a1f",
    expire: 1601047259,
    signature:"dcb8e72e2b6e98186ec56c62c9e62886f40eaa96"
}
*/

  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Imagekit auth failed" },
      { status: 500 }
    );
  }
}
