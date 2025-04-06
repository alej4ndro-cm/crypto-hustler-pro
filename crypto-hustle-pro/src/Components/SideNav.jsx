import React from "react";
import TrendingCoins from "./TrendingCoins"; // Import the new component

const SideNav = () => {
  return (
    <div className="sidenav">
      <h2>Here is a list of the most trending coins</h2>
      
      {/* Trending Coins Section */}
      <TrendingCoins />
    </div>
  );
};

export default SideNav;
