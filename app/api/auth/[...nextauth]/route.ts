import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
// always provide autOptions to nextauth

export { handler as GET, handler as POST };