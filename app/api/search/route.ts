import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) return NextResponse.json([]);

  try {
    const res = await fetch(`https://store.steampowered.com/api/storesearch/?term=${query}&l=english&cc=us`);
    const data = await res.json();

    if (data.items && Array.isArray(data.items)) {
       const formattedResults = data.items.map((item: any) => {
          // Lógica de Preço
          const finalPrice = item.price ? item.price.final / 100 : 0;
          const initialPrice = item.price ? item.price.initial / 100 : 0;
          const discount = item.price ? parseInt(item.price.discount_percent) : 0;
          
          return {
            steamAppID: item.id,
            external: item.name,
            thumb: item.tiny_image, // ou item.header_image se disponível na busca
            price: finalPrice.toFixed(2),
            originalPrice: initialPrice.toFixed(2),
            discount: discount, // Retorna a % de desconto (ex: 50)
            isFree: finalPrice === 0
          };
       });
       
       return NextResponse.json(formattedResults);
    }

    return NextResponse.json([]);

  } catch (error) {
    console.error("Erro no Scanner:", error);
    return NextResponse.json([]);
  }
}