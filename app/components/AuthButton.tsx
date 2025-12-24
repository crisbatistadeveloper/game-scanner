"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut, User, Loader2 } from "lucide-react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  // 1. Carregando
  if (status === "loading") {
    return (
      <div className="h-10 w-32 bg-slate-900/50 rounded-full animate-pulse flex items-center justify-center border border-slate-800">
        <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
      </div>
    );
  }

  // 2. Logado (Com indicador de Plataforma)
  if (session) {
    return (
      <div className="flex items-center gap-3 bg-slate-950 border border-purple-500/20 pl-1 pr-4 py-1 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.1)] group hover:border-purple-500/50 transition-all">
        {/* Foto do Usuário */}
        <div className="relative">
            {session.user?.image ? (
                <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="w-9 h-9 rounded-full border-2 border-slate-800 group-hover:border-purple-500 transition-colors"
                />
            ) : (
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <User className="w-5 h-5 text-purple-500" />
                </div>
            )}
            {/* Bolinha de Status Online */}
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-950 rounded-full"></div>
        </div>
        
        {/* Informações da Conta */}
        <div className="flex flex-col text-left mr-1">
            {/* INDICADOR DE PLATAFORMA (NOVIDADE) */}
            <div className="flex items-center gap-1 mb-0.5">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg" 
                  className="w-3 h-3 opacity-70"
                  alt="Steam" 
                />
                <span className="text-[9px] text-purple-400 font-bold tracking-widest uppercase">STEAM LINKED</span>
            </div>
            
            <span className="text-sm font-bold text-white leading-none truncate max-w-[120px]">
              {session.user?.name}
            </span>
        </div>

        {/* Divisória */}
        <div className="w-px h-6 bg-slate-800 mx-1"></div>

        {/* Botão Sair */}
        <button
          onClick={() => signOut()}
          className="text-slate-500 hover:text-red-400 transition-colors p-1 rounded-md hover:bg-red-500/10"
          title="Disconnect Account"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // 3. Deslogado
  return (
    <button
      onClick={() => signIn("steam")}
      className="flex items-center gap-2 bg-[#171a21] hover:bg-[#2a475e] text-white px-5 py-2.5 rounded-lg font-bold transition-all border border-slate-600 hover:border-white shadow-lg group active:scale-95"
    >
      <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg" className="w-5 h-5 opacity-80 group-hover:opacity-100" />
      <span className="font-mono text-sm tracking-wide">CONNECT STEAM</span>
    </button>
  );
}