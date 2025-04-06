import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ image, name, symbol }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const getCoinPrice = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`,
          { signal: controller.signal }
        );
        const json = await response.json();
        setPrice(json);
      } catch (error) {
        if (error.name === "AbortError") {
          // Request was intentionally aborted, no action needed
        } else {
          console.error("Error fetching coin price:", error);
        }
      }
    };

    getCoinPrice();
    return () => controller.abort();
  }, [symbol]);

  return (
    <>
      {price && (
        <Link
          to={`/coinDetails/${symbol}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <li className="main-list">
            <img
              className="icons"
              src={image || "https://via.placeholder.com/50"}
              alt={`Icon for ${name}`}
            />
            {name} <span className="tab">${price.USD} USD</span>
          </li>
        </Link>
      )}
    </>
  );
};

export default CoinInfo;