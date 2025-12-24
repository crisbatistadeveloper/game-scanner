import NextAuth from "next-auth/next";
import SteamProvider from "next-auth-steam";
import type { NextRequest } from "next/server";

async function handler(req: NextRequest, ctx: any) {
  // --- ÁREA DE DIAGNÓSTICO ---
  // Isso vai aparecer nos logs da Vercel (Logs amarelos/brancos)
  console.log(">>> INICIANDO LOGIN STEAM <<<");
  console.log("1. URL Base (NEXTAUTH_URL):", process.env.NEXTAUTH_URL);
  
  // Verifica se a senha existe (mostra TRUE ou FALSE, não mostra a senha por segurança)
  const temSenha = !!process.env.STEAM_SECRET;
  console.log("2. STEAM_SECRET foi detectada?", temSenha);
  
  if (!temSenha) {
    console.error("!!! ERRO CRÍTICO: A variável STEAM_SECRET está vazia ou indefinida !!!");
  }
  // ---------------------------

  return (NextAuth as any)(req, ctx, {
    providers: [
      SteamProvider(req, {
        clientSecret: process.env.STEAM_SECRET || "", // Usa vazio se não tiver, para o log pegar o erro
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