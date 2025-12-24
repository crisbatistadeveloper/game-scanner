"use client";

import { useState } from 'react';
import { Search, Trophy, TrendingUp, DollarSign, Loader2, Crosshair, BarChart3, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import AuthButton from './components/AuthButton';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]); 
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchGames = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setHasSearched(true);
    setResults([]); 
    
    try {
      const res = await fetch(`/api/search?q=${query}`);
      if (!res.ok) { setResults([]); return; }
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([]); 
      }
    } catch (error) {
      console.error("Erro fatal na busca:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500 selection:text-white relative overflow-x-hidden">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', 
             backgroundSize: '24px 24px' 
           }}>
      </div>
      <div className="fixed inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 pointer-events-none z-0"></div>

      {/* NAVBAR */}
      <nav className="relative z-10 w-full max-w-7xl mx-auto p-6 flex justify-between items-center border-b border-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-500/10 rounded flex items-center justify-center border border-purple-500/20">
             <Crosshair className="w-5 h-5 text-purple-500" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-[family-name:var(--font-rajdhani)] leading-none">
              LOOTSCOPE
            </h1>
            <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">From Gamers to Gamers</span>
          </div>
        </div>
        <AuthButton />
      </nav>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex flex-col items-center justify-center mt-12 md:mt-20 px-4 pb-20">
        
        {/* HERO HEADER */}
        <div className="text-center max-w-4xl mb-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent font-[family-name:var(--font-rajdhani)] uppercase">
            LOOT THE WORLD <br/> WITH PRECISION
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Market intelligence for the modern gamer. <br/>
            <span className="text-purple-400">Scan prices. Analyze trends. Dominate.</span>
          </p>
        </div>

        {/* SEARCH BAR */}
        <form onSubmit={searchGames} className="w-full max-w-2xl relative group mb-16">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative flex items-center bg-slate-900 rounded-lg border border-slate-700 p-2 shadow-2xl">
            <Search className="w-6 h-6 text-slate-500 ml-3" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter game title (e.g. Cyberpunk)..." 
              className="w-full bg-transparent text-white px-4 py-3 focus:outline-none text-lg placeholder-slate-600 font-mono"
            />
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-8 rounded transition-all shadow-lg shadow-purple-900/20">
              SCAN
            </button>
          </div>
          <div className="mt-3 flex justify-between text-xs font-mono text-slate-500 px-2 opacity-70">
            <span className="animate-pulse">&gt; Ready to execute...</span>
            <span>ENCRYPTED CONNECTION</span>
          </div>
        </form>

        {/* FEATURE CARDS (Aparecem só se não buscou) */}
        {!hasSearched && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                <div className="group relative bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-yellow-500/50 transition-all hover:-translate-y-1 cursor-default">
                    <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500 rounded-l-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-start mb-4">
                        <Trophy className="w-8 h-8 text-yellow-500" />
                        <span className="text-xs font-mono bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20">LEGENDARY</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-200">Historic Lows</h3>
                    <p className="text-slate-400 text-sm">Find the perfect entry point for your investment.</p>
                </div>
                <div className="group relative bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-blue-500/50 transition-all hover:-translate-y-1 cursor-default">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-start mb-4">
                        <TrendingUp className="w-8 h-8 text-blue-500" />
                        <span className="text-xs font-mono bg-blue-500/10 text-blue-500 px-2 py-1 rounded border border-blue-500/20">RARE</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-200">Price Drops</h3>
                    <p className="text-slate-400 text-sm">Real-time alerts on market fluctuations.</p>
                </div>
                <div className="group relative bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-purple-500/50 transition-all hover:-translate-y-1 cursor-default">
                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 rounded-l-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-start mb-4">
                        <DollarSign className="w-8 h-8 text-purple-500" />
                        <span className="text-xs font-mono bg-purple-500/10 text-purple-500 px-2 py-1 rounded border border-purple-500/20">EPIC</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-200">Revenue Data</h3>
                    <p className="text-slate-400 text-sm">Deep analysis on game performance and sales.</p>
                </div>
            </div>
        )}

        {/* ÁREA DE RESULTADOS (AGORA COM VISUAL TÁTICO) */}
        <div className="w-full max-w-4xl mt-4">
            {loading && (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
                    <span className="text-sm text-slate-500 font-mono animate-pulse tracking-widest">SCANNING MARKET DATA...</span>
                </div>
            )}

            {!loading && hasSearched && (!results || results.length === 0) && (
                <div className="text-center bg-slate-900/50 border border-slate-800 rounded-xl p-12 border-dashed">
                    <span className="text-5xl mb-4 block opacity-50 grayscale">👾</span>
                    <h3 className="text-white font-bold text-xl mb-2">TARGET NOT FOUND</h3>
                    <p className="text-slate-500 text-sm">Check your spelling or try searching by Steam AppID.</p>
                </div>
            )}

            <div className="flex flex-col gap-3">
                {Array.isArray(results) && results.map((game) => (
                <Link href={`/game/${game.steamAppID}`} key={game.steamAppID} className="block group">
                    <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 flex gap-4 hover:border-purple-500/50 hover:bg-slate-800 transition-all cursor-pointer items-center relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                        
                        {/* Imagem do Jogo */}
                        <div className="relative">
                             <img src={game.thumb} alt={game.external} className="w-24 h-12 md:w-32 md:h-16 rounded object-cover shadow-lg border border-slate-700 group-hover:border-purple-500/30 transition-colors" />
                             {/* Etiqueta de Desconto se houver */}
                             {game.discount > 0 && (
                                <div className="absolute -top-2 -right-2 bg-green-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg animate-pulse">
                                    -{game.discount}%
                                </div>
                             )}
                        </div>
                        
                        {/* Informações Principais */}
                        <div className="flex-1 flex flex-col justify-center">
                            <h3 className="font-bold text-base md:text-lg text-white group-hover:text-purple-400 transition-colors line-clamp-1 font-[family-name:var(--font-rajdhani)] tracking-wide">
                                {game.external}
                            </h3>
                            
                            {/* Tags de Inteligência */}
                            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-mono">
                                <span className="flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> APPID: {game.steamAppID}
                                </span>
                                <span className="hidden md:flex items-center gap-1 text-slate-600">
                                    <BarChart3 className="w-3 h-3" /> ANALYTICS READY
                                </span>
                            </div>
                        </div>

                        {/* Coluna de Preço e Ação */}
                        <div className="flex flex-col items-end justify-center min-w-[80px]">
                            {game.discount > 0 ? (
                                <>
                                    <span className="text-xs text-slate-500 line-through decoration-red-500/50">${game.originalPrice}</span>
                                    <span className="text-lg font-bold text-green-400 font-mono leading-none">${game.price}</span>
                                </>
                            ) : (
                                <span className="text-lg font-bold text-blue-400 font-mono">${game.isFree ? "FREE" : game.price}</span>
                            )}
                            
                            <span className="text-[9px] text-purple-500/0 group-hover:text-purple-500 transition-all font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
                                Inspect <Crosshair className="w-3 h-3" />
                            </span>
                        </div>

                    </div>
                </Link>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}