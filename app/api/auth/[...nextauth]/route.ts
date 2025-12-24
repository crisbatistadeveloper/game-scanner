import NextAuth from "next-auth";
import SteamProvider from "next-auth-steam";
import type { NextRequest } from "next/server";

async function handler(req: NextRequest, ctx: any) {
  return NextAuth(req, ctx, {
    providers: [
      SteamProvider(req, {
        clientSecret: process.env.STEAM_SECRET!,
        callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/steam`,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    trustHost: true, // <--- A chave para funcionar na Vercel
    callbacks: {
      async session({ session, token }: any) {
        if (session?.user) {
          // Captura o ID da Steam e Avatar para o front-end
          session.user.steamId = token.sub;
          session.user.image = token.picture;
        }
        return session;
      },
      async jwt({ token, account, profile }: any) {
        if (account?.provider === "steam" && profile) {
          token.steamId = profile.steamid;
        }
        return token;
      },
    },
  });
}

export { handler as GET, handler as POST };