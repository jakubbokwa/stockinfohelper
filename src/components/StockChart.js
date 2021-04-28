import React, { memo } from "react";
import { Line } from "react-chartjs-2";

const StockChart = memo(({ data }) => {
  //
  //accessing the ticker (symbol) of a stock
  const ticker = data["Meta Data"]["2. Symbol"].toUpperCase();

  // Accessing the last 24 months (+ the current one) from Monthly Data
  const twoYearsMonthlyData = Object.entries(
    data["Monthly Adjusted Time Series"]
  ).slice(0, 25);

  //Preparing the data into an array suitable for Chart.js - "X" axis
  const arrayOfDates = twoYearsMonthlyData
    .map((array) => {
      return [array[0].slice(0, 7)];
    })
    .reverse();

  //Preparing the data into an array suitable for Chart.js - "Y" axis
  const arrayOfValues = twoYearsMonthlyData
    .map((array) => {
      return [array[1]];
    })
    .map((object) => {
      return [object[0]["5. adjusted close"]];
    })
    .map((array) => {
      return array[0];
    })
    .reverse();

  //Extracting the first and last monthly values to determine overall profit/loss and change the colour
  const firstValue = arrayOfValues[0];
  const lastValue = arrayOfValues[arrayOfValues.length - 1];

  return (
    <div className="stock-chart-body">
      <h2>Monthly performance chart - last 2 years:</h2>
      <div className="stock-chart">
        <Line
          height={300}
          width={600}
          data={{
            labels: arrayOfDates,
            datasets: [
              {
                label: `${ticker} adj. close [USD]`,
                data: arrayOfValues,
                backgroundColor: `${
                  lastValue - firstValue > 0 ? ["#78be7b"] : ["#e23737"]
                }`,
                borderColor: `${
                  lastValue - firstValue > 0 ? ["#78be7b"] : ["#e23737"]
                }`,
                borderWidth: 2,
              },
            ],
            options: {
              responsive: true,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            },
          }}
        />
      </div>
    </div>
  );
});

export default StockChart;
