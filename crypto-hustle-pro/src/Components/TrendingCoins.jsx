import React, { useEffect, useState } from "react";

const TrendingCoins = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/search/trending");
        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const data = await response.json();
        console.log("CoinGecko Trending Coins Response:", data); // Debugging

        setTrending(data.coins.slice(0, 5)); // Display top 5 trending coins
      } catch (error) {
        console.error("Error fetching trending coins:", error);
      }
    };

    fetchTrendingCoins();
  }, []);

  return (
    <div className="trending-coins">
      <h2>Trending Coins</h2>
      {trending.length > 0 ? (
        <ul>
          {trending.map((coin) => (
            <li key={coin.item.id}>
              <img src={coin.item.small} alt={coin.item.name} width="25" height="25" />
              <span>
                <strong>{coin.item.name}</strong> <span className="coin-symbol">({coin.item.symbol.toUpperCase()})</span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading trending coins...</p>
      )}
    </div>
  );
};

export default TrendingCoins;