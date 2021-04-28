import React, { useState } from "react";
import Navbar from "./Navbar";
import StockDailyInfo from "./StockDailyInfo";
import StockChart from "./StockChart";
import "./styles.css";

function App() {
  //
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  //Fetching function
  const getData = async (daily, monthly) => {
    setIsLoading(true);
    const dataDaily = await fetch(daily);
    const dataMonthly = await fetch(monthly);
    const resDaily = await dataDaily.json();
    const resMonthly = await dataMonthly.json();
    const response = [];
    await response.push(resDaily);
    await response.push(resMonthly);
    setData(response);
    setIsLoading(false);
  };

  // API URLs
  const baseUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_";
  const url1 = `${baseUrl}DAILY_ADJUSTED&symbol=${input || "MSFT"}&apikey=${
    process.env.REACT_APP_API_KEY
  }`;
  const url2 = `${baseUrl}MONTHLY_ADJUSTED&symbol=${input || "MSFT"}&apikey=${
    process.env.REACT_APP_API_KEY
  }`;
  //

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getData(url1, url2);
    setInput("");
  };

  return (
    <main>
      <Navbar />
      <div className="search">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="ticker"
            value={input}
            type="text"
            placeholder="Enter stock ticker, e.g. MSFT"
          />
          <button>Search</button>
        </form>
      </div>
      {isLoading ? (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      ) : data ? (
        data[0]["Time Series (Daily)"] ? (
          <section className="stock-wrapper">
            <StockDailyInfo data={data[0]} />
            <StockChart data={data[1]} />
          </section>
        ) : data[0]["Note"] ? (
          <h2 className="ticker-message">
            Search volume exceeded. Try again in 1 minute.
          </h2>
        ) : (
          <h2 className="ticker-message">
            No stock found with given ticker. Try another one.
          </h2>
        )
      ) : (
        <div className="ticker-message">
          <h2>
            Type a stock ticker above to show information about the company.
          </h2>
        </div>
      )}
    </main>
  );
}

export default App;
