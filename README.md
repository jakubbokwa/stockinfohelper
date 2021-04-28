# This is an application which helps in daily stock tracking.

## Name

Stock Info Helper

## Description

It helps with tracking the information about a stock by providing recent information about the stock's performance as well as long term results provided in a chart.

## Installation

After obtaining the files from GitHub, open the folder with the application files with a terminal and run `npm install`.

The application uses the https://www.alphavantage.co/ stock API, thus the user needs to obtain a secret API key from there. Then, in the root level of the application (at the same level as .gitignore and package.json files) the user should create a file called '.env' where the secret key should be pasted in a form as follows:

`REACT_APP_API_KEY=yourSecretKeyHere`

Only after the API key has been provided, can you make the API calls and get the application to work properly.

After the process has been completed, open the application with `npm start`.

## Usage

Type appropriate stock ticker (symbol) in the input field and click the button to start a query. The application handles the tickers of companies from the American stock markets.

## Live preview:

https://compassionate-swanson-8a3604.netlify.app/

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
