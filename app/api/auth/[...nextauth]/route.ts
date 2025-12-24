import NextAuth from "next-auth/next";
import SteamProvider from "next-auth-steam";
import type { NextRequest } from "next/server";

async function handler(req: NextRequest, ctx: any) {
  // AQUI ESTÁ A MUDANÇA: Adicionei (NextAuth as any)
  // Isso força o TypeScript a aceitar os argumentos sem reclamar
  return (NextAuth as any)(req, ctx, {
    providers: [
      SteamProvider(req, {
        clientSecret: process.env.STEAM_SECRET!,
        callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/steam`,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    trustHost: true,
    callbacks: {
      async session({ session, token }: any) {
        if (session?.user) {
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