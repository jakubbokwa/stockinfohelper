import React from "react";

function StockDailyInfo({ data }) {
  //
  //Accessing the data daily for the last 2 days and for the last week.
  const lastTwoDays = Object.entries(data["Time Series (Daily)"]).slice(0, 2);
  const dailyValues = Object.entries(data["Time Series (Daily)"]).slice(1, 7);
  //
  //Calculating the difference of prices during the last 2 days
  const twoDaysDifference = (
    parseFloat(lastTwoDays[0][1]["5. adjusted close"]) -
    parseFloat(lastTwoDays[1][1]["5. adjusted close"])
  ).toFixed(2);
  //
  //Calculating the percentage difference of prices during the last 2 days
  const twoDaysPercentage = (
    ((parseFloat(lastTwoDays[0][1]["5. adjusted close"]) -
      parseFloat(lastTwoDays[1][1]["5. adjusted close"])) /
      parseFloat(lastTwoDays[1][1]["5. adjusted close"])) *
    100
  ).toFixed(2);
  //
  //Accessing the ticker (symbol) of a stock
  const ticker = data["Meta Data"]["2. Symbol"].toUpperCase();
  //
  return (
    <div className="stock-info-body">
      <h2>Stock information about {ticker}:</h2>
      {/* Beginning of the table */}
      <div className="stock-info-values">
        <h3>Most recent return:</h3>
        <div className="stock-returns-recent">
          <span>Date</span>
          <span>Adj. close [USD]</span>
          <span>Growth [USD]</span>
          <span>% Growth d/d</span>
          <span className="stock-recent-date">{lastTwoDays[0][0]}</span>
          <span>{parseFloat(lastTwoDays[0][1]["4. close"]).toFixed(2)}</span>
          <span>{twoDaysDifference}</span>
          <span className={twoDaysPercentage > 0 ? "profit" : "loss"}>
            {twoDaysPercentage}%
          </span>
        </div>
        {/* End of the first half of the table */}
        <h3>Past returns:</h3>
        <div className="stock-returns-past">
          <span>Date</span>
          <span>Adj. close [USD]</span>
          {dailyValues.map((value, index) => {
            return (
              <React.Fragment key={index}>
                <span>{value[0]}</span>
                <span>
                  {parseFloat(value[1]["5. adjusted close"]).toFixed(2)}
                </span>
              </React.Fragment>
            );
          })}
        </div>
        {/* End of the second half of the table */}
      </div>
    </div>
  );
}

export default StockDailyInfo;
