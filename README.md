# Crypto Tracker App (CryptoHustle Pro)

This web app: **An enhanced cryptocurrency tracking tool that allows users to view a list of blockchain coins, see their real-time prices, navigate to detailed views for each coin, and track 30-day price history through interactive charts. It uses multiple public APIs including CryptoCompare, CoinGecko, and CoinPaprika to deliver reliable and rich data.**

Time spent: **6** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] Users can see a list of blockchain-based cryptocurrencies with their names, symbols, images, and prices.
- [x] A search bar allows users to filter and find specific cryptocurrencies.
- [x] Crypto prices and images are fetched dynamically using the CoinGecko API.
- [x] The app displays a responsive and well-organized list of coins.
- [x] The UI includes structured elements for easy readability and interaction.
- [x] Each coin links to a detail page using dynamic React Router paths (`/coinDetails/:symbol`).
- [x] The detail page includes name, description, algorithm, launch date, whitepaper, website, and market data.
- [x] A "Not Found" page is rendered when users access invalid routes.

## Stretch Features

The following **stretch** features are implemented:

- [x] Added an interactive 30-day price chart using Recharts, powered by the CryptoCompare API.
- [x] Integrated AbortController to cancel in-flight API requests when navigating between pages.
- [x] Implemented fallback logic across three APIs (CryptoCompare, CoinGecko, CoinPaprika) to ensure completeness and robustness of coin data.
- [x] Applied layout transformations for tablets and mobile devices, including responsive sidebar behavior.
- [x] Built a Layout component with a persistent Home button across all pages using nested routing.

## API Usage and Rate Limits

This project integrates data from multiple public APIs:

### CryptoCompare
- Used for real-time prices, detailed coin metadata, and historical chart data
- Requires API key (`VITE_APP_API_KEY`)
- Rate limit (free tier): 100,000 calls per month  
  [API Docs](https://min-api.cryptocompare.com/documentation)

### CoinGecko
- Used for trending coins, algorithms, launch dates, and descriptions
- No API key required
- Rate limit: 50 calls per minute (IP-based)  
  [API Docs](https://www.coingecko.com/en/api/documentation)

### CoinPaprika
- Used to supplement missing data such as whitepaper URLs and coin metadata
- No API key required
- No official published limit (recommended: under 30 calls/second)  
  [API Docs](https://api.coinpaprika.com/)

## Video Walkthrough

Here's a walkthrough of implemented required and stretch features:

<img src='https://i.imgur.com/7Hp6Pyi.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [Peek](https://github.com/phw/peek)

## Repository

GitHub Repository: [Crypto Tracker App](https://github.com/FAU-FullStack-Dev-Spring2025/lab-6-alej4ndro-cm)

## Notes

Some challenges encountered while building the app:

- Integrating multiple APIs required careful coordination of fetch timing and data fallbacks.
- CryptoCompare calls had to be managed with AbortController to avoid performance slowdowns when navigating quickly.
- Case-sensitive URL paths caused empty detail pages when users typed lowercase symbols.
- The historical data returned from CryptoCompare required formatting and date conversion for accurate chart rendering.
- Responsive layout work required restructuring the sidebar into a top bar on smaller viewports.

## License

    Copyright 2025 Alejandro Munoz

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
