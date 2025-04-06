import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // 👈 Add this
import CoinInfo from "./Components/CoinInfo";
import SideNav from "./Components/SideNav";
import "./App.css";

function App() {
  const location = useLocation(); // 👈 Track path change
  const [list, setList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchAllCoinData = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const data = await response.json();
        console.log("CoinGecko API Response:", data); // Debugging
        setList(data);
        setFilteredResults(data); // Initialize filtered list with full data
      } catch (error) {
        console.error("Error fetching CoinGecko data:", error);
      }
    };

    fetchAllCoinData();
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);

    if (searchValue !== "") {
      const filteredData = list.filter((coin) =>
        coin.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list);
    }
  };

  return (
    <div key={location.pathname} className="app-container"> {/* 👈 Force remount on path change */}
      <SideNav />
      
      <div className="whole-page">
        <h1>My Crypto List</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(event) => searchItems(event.target.value)}
        />

        <div className="crypto-list">
          <ul>
            {filteredResults.length > 0
              ? filteredResults.slice(0, 50).map((coin) => (
                  <CoinInfo
                    key={coin.id}
                    image={coin.image || "https://via.placeholder.com/50"}
                    name={coin.name || "Unknown"}
                    symbol={coin.symbol ? coin.symbol.toUpperCase() : "N/A"}
                  />
                ))
              : <p>No results found...</p>}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;