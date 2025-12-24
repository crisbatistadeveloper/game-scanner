import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Mudança 1: params é Promise
) {
  // Mudança 2: Aguardamos o params antes de ler o ID
  const { id } = await params;

  try {
    // 1. Busca Detalhes na Steam
    const res = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}&cc=us&l=english`);
    const data = await res.json();

    if (!data || !data[id] || !data[id].success) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    const game = data[id].data;

    // 2. Busca Players Online
    let activePlayers = 0;
    try {
        const playersRes = await fetch(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${id}`);
        const playersData = await playersRes.json();
        activePlayers = playersData.response?.player_count || 0;
    } catch (e) {
        console.log("Player count error (non-critical)");
    }

    // 3. Formata Valores
    const price = game.price_overview ? game.price_overview.final / 100 : 0;
    const initialPrice = game.price_overview ? game.price_overview.initial / 100 : 0;
    const discount = game.price_overview ? game.price_overview.discount_percent : 0;

    // 4. Estimativas
    const totalReviews = game.recommendations ? game.recommendations.total : 0;
    const estOwners = totalReviews * 40;
    const estRevenue = estOwners * (price > 0 ? price : 10);

    // 5. Retorno
    return NextResponse.json({
      id: game.steam_appid,
      name: game.name,
      header_image: game.header_image,
      background: `https://cdn.akamai.steamstatic.com/steam/apps/${id}/library_hero.jpg`,
      price: price.toFixed(2),
      originalPrice: initialPrice.toFixed(2),
      discount: discount,
      description: game.short_description,
      releaseDate: game.release_date?.date || "TBA",
      developer: game.developers?.[0] || "Unknown",
      publisher: game.publishers?.[0] || "Unknown",
      genres: game.genres?.map((g: any) => g.description) || [],
      activePlayers: activePlayers,
      scorePercent: game.metacritic?.score || 0,
      revenueEst: estRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
      ownersEst: estOwners.toLocaleString('en-US', { notation: "compact" }),
      isFree: game.is_free
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}