"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Loader2, DollarSign, Users, TrendingUp, 
  Search, Activity, ThumbsUp, ExternalLink, ShieldCheck, 
  Calendar, Briefcase, Building2 
} from 'lucide-react';
import AuthButton from '../../components/AuthButton';

export default function GameDetails() {
  const params = useParams();
  const steamAppID = params?.steamAppID; 
  
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!steamAppID) return;

    const fetchGameData = async () => {
      try {
        setLoading(true);
        // CONEXÃO REAL: Chama a API que acabamos de arrumar
        const res = await fetch(`/api/game/${steamAppID}`);
        
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        
        // Garante imagem de fundo
        if (!data.background) {
            data.background = data.header_image;
        }

        setGame(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [steamAppID]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-purple-500 relative">
        <div className="fixed inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <Loader2 className="w-12 h-12 animate-spin mb-4 relative z-10" />
        <span className="font-mono text-xs tracking-[0.3em] animate-pulse uppercase relative z-10">Accessing Database...</span>
      </div>
    );
  }

  if (error || !game) {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-10 relative z-10">
            <h2 className="text-2xl font-bold mb-2 font-[family-name:var(--font-rajdhani)]">TARGET NOT FOUND</h2>
            <p className="text-slate-500 mb-4">Could not retrieve intel for ID: {steamAppID}</p>
            <Link href="/" className="px-4 py-2 bg-slate-800 rounded border border-slate-700 hover:border-purple-500 transition-colors">
                Return to Scanner
            </Link>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30 pb-20 relative overflow-x-hidden">
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>
      <div className="fixed inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 pointer-events-none z-0"></div>

      {/* NAVBAR */}
      <nav className="relative z-20 w-full max-w-7xl mx-auto p-6 flex justify-between items-center border-b border-slate-800/50 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-xs uppercase tracking-widest">BACK TO SCANNER</span>
        </Link>
        <AuthButton />
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 mt-8">
          
          {/* HEADER BOX */}
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-slate-800 mb-10 shadow-2xl group bg-slate-900">
              <div className="absolute inset-0 z-0">
                  <img 
                    src={game.background} 
                    className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-[3s]" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1015] via-[#0b1015]/40 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full z-10 flex flex-col justify-end h-full">
                  {game.genres && (
                      <div className="flex flex-wrap gap-2 mb-4">
                          {game.genres.slice(0, 4).map((g: any) => (
                              <span key={typeof g === 'string' ? g : g.description} className="px-4 py-1.5 rounded-full bg-black/50 border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
                                  {typeof g === 'string' ? g : g.description}
                              </span>
                          ))}
                      </div>
                  )}
                  
                  <h1 className="text-4xl md:text-7xl font-bold text-white font-[family-name:var(--font-rajdhani)] uppercase leading-none mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">
                      {game.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-200 font-mono">
                      <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                          <Calendar className="w-4 h-4 text-purple-400" />
                          <span>Release: <span className="text-white font-bold">{game.releaseDate || "N/A"}</span></span>
                      </div>
                      <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                          <Briefcase className="w-4 h-4 text-blue-400" />
                          <span>Dev: <span className="text-white font-bold">{game.developer || "Unknown"}</span></span>
                      </div>
                      <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                          <Building2 className="w-4 h-4 text-green-400" />
                          <span>Pub: <span className="text-white font-bold">{game.publisher || "Unknown"}</span></span>
                      </div>
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* SIDEBAR */}
              <div className="lg:col-span-4 sticky top-6">
                  <div className="bg-[#12161b] border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-50"></div>

                      <div className="rounded-xl overflow-hidden border border-slate-700 shadow-lg relative group">
                          <img src={game.header_image} alt="Box Art" className="w-full h-auto object-cover" />
                      </div>

                      <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800">
                          <div className="flex justify-between items-start mb-2">
                             <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Market Price</span>
                             {game.discount > 0 && (
                                <span className="text-[10px] text-green-400 bg-green-900/20 px-2 py-0.5 rounded border border-green-900/30 flex items-center gap-1 animate-pulse">
                                    <TrendingUp className="w-3 h-3" /> DISCOUNT
                                </span>
                             )}
                          </div>
                          
                          <div className="flex items-center gap-3">
                              {game.isFree ? (
                                  <span className="text-5xl font-bold text-white font-[family-name:var(--font-rajdhani)]">FREE</span>
                              ) : (
                                  <>
                                    <span className="text-5xl font-bold text-white font-[family-name:var(--font-rajdhani)]">${game.price}</span>
                                    {game.discount > 0 && (
                                        <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded shadow-lg shadow-red-900/20">-{game.discount}%</span>
                                    )}
                                  </>
                              )}
                          </div>
                      </div>

                      <div className="flex flex-col gap-3">
                          <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] border border-white/10 hover:scale-[1.02]">
                              <Search className="w-5 h-5" />
                              <span>FIND KEY DEALS</span>
                          </button>
                          
                          <a href={`https://store.steampowered.com/app/${steamAppID}`} target="_blank" className="w-full bg-slate-900 border border-slate-700 text-slate-500 hover:text-white hover:border-slate-500 py-3 rounded-lg flex items-center justify-center gap-2 transition-all text-xs uppercase font-bold tracking-wider">
                              <ExternalLink className="w-4 h-4" />
                              View on Steam
                          </a>
                      </div>
                  </div>
              </div>

              {/* INTEL BOXES */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                  <div className="bg-[#12161b] border border-slate-800 rounded-2xl p-8 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
                      <h3 className="text-white font-bold mb-4 font-[family-name:var(--font-rajdhani)] text-xl flex items-center gap-2">
                          <ShieldCheck className="w-6 h-6 text-purple-500" /> 
                          MISSION BRIEFING
                      </h3>
                      <div 
                        className="text-slate-400 leading-relaxed text-sm font-light prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: game.description }}
                      />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="bg-[#12161b] border border-slate-800 p-6 rounded-2xl hover:border-purple-500/50 transition-all group shadow-lg">
                           <div className="flex justify-between items-start mb-4">
                                <div className="p-2.5 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors border border-purple-500/10">
                                    <DollarSign className="w-6 h-6 text-purple-500"/>
                                </div>
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border border-slate-800 px-2 py-1 rounded">Financial</span>
                           </div>
                           <span className="text-xs text-slate-400 block mb-1">Gross Revenue Est.</span>
                           <div className="text-4xl font-bold text-white font-[family-name:var(--font-rajdhani)]">{game.revenueEst || "N/A"}</div>
                      </div>

                      <div className="bg-[#12161b] border border-slate-800 p-6 rounded-2xl hover:border-blue-500/50 transition-all group shadow-lg">
                           <div className="flex justify-between items-start mb-4">
                                <div className="p-2.5 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors border border-blue-500/10">
                                    <Users className="w-6 h-6 text-blue-500"/>
                                </div>
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border border-slate-800 px-2 py-1 rounded">Audience</span>
                           </div>
                           <span className="text-xs text-slate-400 block mb-1">Total Agents</span>
                           <div className="text-4xl font-bold text-white font-[family-name:var(--font-rajdhani)]">~{game.ownersEst || "N/A"}</div>
                      </div>

                      <div className="bg-[#12161b] border border-slate-800 p-6 rounded-2xl hover:border-green-500/50 transition-all group shadow-lg">
                           <div className="flex justify-between items-start mb-4">
                                <div className="p-2.5 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors border border-green-500/10">
                                    <ThumbsUp className="w-6 h-6 text-green-500"/>
                                </div>
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border border-slate-800 px-2 py-1 rounded">Rating</span>
                           </div>
                           <span className="text-xs text-slate-400 block mb-1">Metacritic Score</span>
                           <div className="text-4xl font-bold text-white font-[family-name:var(--font-rajdhani)]">
                               {game.scorePercent ? game.scorePercent : "N/A"}
                           </div>
                      </div>

                      <div className="bg-[#12161b] border border-slate-800 p-6 rounded-2xl hover:border-yellow-500/50 transition-all group shadow-lg">
                           <div className="flex justify-between items-start mb-4">
                                <div className="p-2.5 bg-yellow-500/10 rounded-xl group-hover:bg-yellow-500/20 transition-colors border border-yellow-500/10">
                                    <Activity className="w-6 h-6 text-yellow-500"/>
                                </div>
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border border-slate-800 px-2 py-1 rounded">Live</span>
                           </div>
                           <span className="text-xs text-slate-400 block mb-1">Active Players Now</span>
                           <div className="text-4xl font-bold text-white font-[family-name:var(--font-rajdhani)]">
                               {game.activePlayers ? game.activePlayers.toLocaleString() : "..."}
                           </div>
                      </div>
                  </div>
              </div>
          </div>
      </main>
    </div>
  );
}