import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinChart from "./CoinChart";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const COINPAPRIKA_API = "https://api.coinpaprika.com/v1";

const CoinDetail = () => {
  const params = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getCoinDetail = async () => {
      // Fetch CryptoCompare data
      const details = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${params.symbol}&tsyms=USD&api_key=${API_KEY}`
      );
      const description = await fetch(
        `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${params.symbol}&api_key=${API_KEY}`
      );
      const detailsJson = await details.json();
      const descripJson = await description.json();

      // Fetch CoinGecko data
      const allCoinsRes = await fetch("https://api.coingecko.com/api/v3/coins/list");
      const allCoins = await allCoinsRes.json();
      const matchedCoin = allCoins.find(
        (coin) => coin.symbol.toLowerCase() === params.symbol.toLowerCase()
      );

      let geckoData = null;
      if (matchedCoin) {
        const geckoRes = await fetch(`https://api.coingecko.com/api/v3/coins/${matchedCoin.id}`);
        geckoData = await geckoRes.json();
      }

      // Fetch CoinPaprika data
      const paprikaList = await fetch(`${COINPAPRIKA_API}/coins`);
      const allPaprikaCoins = await paprikaList.json();
      const matchedPaprika = allPaprikaCoins.find(
        (coin) => coin.symbol.toLowerCase() === params.symbol.toLowerCase() && coin.rank !== 0
      );

      let paprikaData = null;
      if (matchedPaprika) {
        const paprikaRes = await fetch(`${COINPAPRIKA_API}/coins/${matchedPaprika.id}`);
        paprikaData = await paprikaRes.json();
      }

      setFullDetails({
        numbers: detailsJson.DISPLAY,
        textData: descripJson.Data,
        gecko: geckoData,
        paprika: paprikaData,
      });
    };

    getCoinDetail().catch(console.error);
  }, [params.symbol]);

  if (!fullDetails) return <p>Loading coin details...</p>;

  const coinText = fullDetails.textData[params.symbol];
  const coinNums = fullDetails.numbers[params.symbol]?.USD;
  const gecko = fullDetails.gecko;
  const paprika = fullDetails.paprika;

  const fallbackDescription =
    coinText?.Description || gecko?.description?.en || paprika?.description || "No description available.";

  const whitepaperLink =
    coinText?.WhitePaper?.Url ||
    (gecko?.links?.homepage || []).find((link) => link?.toLowerCase().includes("whitepaper")) ||
    paprika?.whitepaper?.link;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{coinText?.FullName}</h1>
      <img
        className="images"
        src={`https://www.cryptocompare.com${coinNums?.IMAGEURL}`}
        alt={`Icon for ${params.symbol}`}
      />
      <div className="description-box">{fallbackDescription}</div>
      <br />
      <div>
        This coin was built with the algorithm{" "}
        {coinText?.Algorithm || gecko?.hashing_algorithm || "N/A"}
      </div>
      <br />
      <table>
        <tbody>
          <tr><th>Launch Date</th><td>{coinText?.AssetLaunchDate || gecko?.genesis_date || "N/A"}</td></tr>
          <tr>
            <th>Website</th>
            <td>
              {coinText?.AssetWebsiteUrl ? (
                <a href={coinText.AssetWebsiteUrl} target="_blank" rel="noopener noreferrer">
                  {coinText.AssetWebsiteUrl}
                </a>
              ) : gecko?.links?.homepage?.[0] ? (
                <a href={gecko.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                  {gecko.links.homepage[0]}
                </a>
              ) : paprika?.links?.website?.[0] ? (
                <a href={paprika.links.website[0]} target="_blank" rel="noopener noreferrer">
                  {paprika.links.website[0]}
                </a>
              ) : (
                "N/A"
              )}
            </td>
          </tr>
          <tr>
            <th>Whitepaper</th>
            <td>
              {whitepaperLink ? (
                <a href={whitepaperLink} target="_blank" rel="noopener noreferrer">
                  {whitepaperLink}
                </a>
              ) : (
                "N/A"
              )}
            </td>
          </tr>
          <tr><th>Monetary Symbol</th><td>{params.symbol}</td></tr>
          <tr><th>Market</th><td>{coinNums?.MARKET || "N/A"}</td></tr>
          <tr><th>Last Transaction</th><td>{coinNums?.LASTMARKET || "N/A"}</td></tr>
          <tr><th>Last Transaction Value</th><td>{coinNums?.PRICE || "N/A"}</td></tr>
          <tr><th>Volume</th><td>{coinNums?.VOLUME24HOUR || "N/A"}</td></tr>
          <tr><th>Today's Open Price</th><td>{coinNums?.OPEN24HOUR || "N/A"}</td></tr>
          <tr><th>Highest Price During the Day</th><td>{coinNums?.HIGH24HOUR || "N/A"}</td></tr>
          <tr><th>Lowest Price During the Day</th><td>{coinNums?.LOW24HOUR || "N/A"}</td></tr>
          <tr><th>Change From Previous Day</th><td>{coinNums?.CHANGE24HOUR || "N/A"}</td></tr>
          <tr><th>Market Cap</th><td>{coinNums?.MKTCAP || "N/A"}</td></tr>
        </tbody>
      </table>

      <CoinChart
        symbol={params.symbol}
        market={coinNums?.MARKET || "CCCAGG"}
      />
    </div>
  );
};

export default CoinDetail;
