import React, { useState } from "react";
import { blockExplore } from "./Web3";
import style from "./style.css";

const App = () => {
  const [buyPrice, setBuyPrice] = useState(0);
  const [feesPercent, setFeesPercent] = useState(10);
  const [gasCost, setGasCost] = useState(0);
  const [desiredProfit, setDesiredProfit] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(1600);
  const [localPrice, setlocalPrice] = useState(52000);

  const [invest, setInvest] = useState(0);
  const [enterPrice, setEnterPrice] = useState(0);
  const [exitPrice, setExitPrice] = useState(0);
  const [leverage, setLeverage] = useState(10);

  // Block Ex
  const [gasPrice, setGasPrice] = useState(0);
  const [blockNumber, setBlockNumber] = useState(0);

  const handleBuyPriceChange = (event) => {
    setBuyPrice(event.target.value);
  };

  const handleFeesPercentChange = (event) => {
    setFeesPercent(event.target.value);
  };

  const handleGasCostChange = (event) => {
    setGasCost(event.target.value);
  };

  const handleDesiredProfitChange = (event) => {
    setDesiredProfit(event.target.value);
  };

  const handleEthPriceChange = (event) => {
    setEthPrice(event.target.value);
  };

  const handleLocalPriceChange = (event) => {
    setlocalPrice(event.target.value);
  };

  const handleEnterPriceChange = (event) => {
    setEnterPrice(event.target.value);
  };

  const handleExitPriceChange = (event) => {
    setExitPrice(event.target.value);
  };

  const handleLeverageChange = (event) => {
    setLeverage(event.target.value);
  };

  const handleInvestChange = (event) => {
    setInvest(event.target.value);
  };

  React.useEffect(() => {
    setSellingPrice(
      (Number(buyPrice) + Number(desiredProfit) + Number(gasCost)) /
        (1 - Number(feesPercent) / 100)
    );
    /*
    const gasHandler = async () => {
      const { gasPrice, blockNumber } = await blockExplore();
      setGasPrice(gasPrice);
      setBlockNumber(blockNumber);
    };

    // Retrieve crypto price from CoinGecko API
    const getCryptoPrice = async () => {
      const symbol = "bitcoin";
      const response = await JSON.parse(
        `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd&include_24hr_change=true`
      );
      const { usd, usd_24h_change } = response.data[symbol];
      setTempoCoin(usd, usd_24h_change);
    };

    const intervalId = setInterval(gasHandler, 5000);
    gasHandler();

    return () => clearInterval(intervalId);
    */
  }, [buyPrice, desiredProfit, feesPercent, gasCost]);

  function levCalc() {
    let levSum =
      (
        ((Number(invest) * Number(leverage)) / Number(enterPrice)) *
        (Number(exitPrice) - Number(enterPrice))
      ).toFixed(2) *
      (1 - Number(feesPercent) / 100);

    return levSum;
  }

  function shortCalc() {
    let shortLiq = enterPrice / leverage;
    shortLiq += +enterPrice;

    return shortLiq.toLocaleString();
  }

  return (
    <div className="container-wrapper">
      {/* ////BLOCK GAS HIDDEN//// 
      <div className="gas-section">
        <h2>
          <span role="img" aria-label="gasemo">
            🟢 💨
          </span>{" "}
          Gas Price: {Number(gasPrice).toFixed(2)}
        </h2>
        <h2>
          <span role="img" aria-label="gasemo">
            🟢
          </span>{" "}
          Latest Block: {blockNumber}
        </h2>
      </div>
      */}
      <div className="container">
        <div
          style={{
            border: "1px solid gray",
            borderRadius: "3px",
            marginTop: "50px",
            padding: "25px"
          }}
        >
          <h1
            style={{
              //marginTop: "100px",
              backgroundColor: "blue",
              borderRadius: "3px",
              padding: "10px",
              textAlign: "center"
            }}
          >
            Flipper Calculator
          </h1>
          <div className="inputContainer">
            <div className="inputLabel">Buy Price:</div>
            <input
              type="number"
              value={buyPrice}
              onChange={handleBuyPriceChange}
              className="input"
              placeholder="0"
            />
            <div className="inputSuffix">ETH</div>
          </div>

          <div className="inputContainer">
            <div className="inputLabel">ETH Price:</div>
            <input
              type="number"
              value={ethPrice}
              onChange={handleEthPriceChange}
              className="input"
              placeholder="0"
            />
            <div className="inputSuffix">$</div>
          </div>

          <div className="inputContainer">
            <div className="inputLabel">Local Price:</div>
            <input
              type="number"
              value={localPrice}
              onChange={handleLocalPriceChange}
              className="input"
              placeholder="0"
            />
            <div className="inputSuffix">T</div>
          </div>

          <div className="inputContainer">
            <div className="inputLabel">MarketFee + Royalty:</div>
            <input
              type="number"
              value={feesPercent}
              onChange={handleFeesPercentChange}
              className="input"
              placeholder="0"
            />
            <div className="inputSuffix">%</div>
          </div>
          <div className="inputContainer">
            <div className="inputLabel">Gas Costs:</div>
            <input
              type="number"
              value={gasCost}
              onChange={handleGasCostChange}
              className="input"
              placeholder="0"
            />
            <div className="inputSuffix">ETH</div>
          </div>

          <div className="inputContainer">
            <div className="inputLabel">Desired Profit:</div>
            <input
              type="number"
              value={desiredProfit}
              onChange={handleDesiredProfitChange}
              className="input"
              placeholder="0"
            />
            <div className="inputSuffix">ETH</div>
          </div>

          <br />
          <hr class="solid" />
          <br />

          <div style={style.result}>
            <p>Total Spendings:</p>
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                backgroundColor: "gray",
                borderRadius: "3px",
                padding: "5px"
              }}
            >
              {(Number(buyPrice) + Number(gasCost)).toFixed(4)} ETH
            </p>
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                backgroundColor: "gray",
                borderRadius: "3px",
                padding: "5px"
              }}
            >
              {(
                (Number(buyPrice) + Number(gasCost)) *
                ethPrice
              ).toLocaleString()}{" "}
              $
            </p>
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                backgroundColor: "gray",
                borderRadius: "3px",
                padding: "5px"
              }}
            >
              {(
                (Number(buyPrice) + Number(gasCost)) *
                ethPrice *
                localPrice
              ).toLocaleString()}{" "}
              T
            </p>
          </div>
          <div style={style.result}>
            <p>Sell Price:</p>
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                backgroundColor: "gold",
                borderRadius: "3px",
                padding: "5px"
              }}
            >
              {sellingPrice.toFixed(4)} ETH
            </p>
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                backgroundColor: "gold",
                borderRadius: "3px",
                padding: "5px"
              }}
            >
              {(sellingPrice * ethPrice).toLocaleString()} $
            </p>
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                backgroundColor: "gold",
                borderRadius: "3px",
                padding: "5px"
              }}
            >
              {(sellingPrice * ethPrice * localPrice).toLocaleString()} T
            </p>
          </div>
          <div style={style.result}>
            <p>Profit/Loss:</p>
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                backgroundColor: "green",
                borderRadius: "3px",
                padding: "5px"
              }}
            >
              {desiredProfit} ETH
            </p>
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                backgroundColor: "green",
                borderRadius: "3px",
                padding: "5px"
              }}
            >
              {(desiredProfit * ethPrice).toLocaleString()} $
            </p>
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                backgroundColor: "green",
                borderRadius: "3px",
                padding: "5px"
              }}
            >
              {(desiredProfit * ethPrice * localPrice).toLocaleString()} T
            </p>
          </div>
        </div>

        <div
          style={{
            border: "1px solid gray",
            borderRadius: "3px",
            marginTop: "50px",
            padding: "25px"
          }}
        >
          <h1
            style={{
              //marginTop: "100px",
              backgroundColor: "blue",
              borderRadius: "3px",
              padding: "10px",
              textAlign: "center"
            }}
          >
            Leverage Calculator
          </h1>

          <div className="inputContainer">
            <div className="inputLabel">Amount:</div>
            <input
              type="number"
              value={invest}
              onChange={handleInvestChange}
              className="input"
              placeholder="0"
            />
            <div className="inputSuffix">$</div>
          </div>

          <div className="inputContainer">
            <div className="inputLabel">Entry Price:</div>
            <input
              type="number"
              value={enterPrice}
              onChange={handleEnterPriceChange}
              className="input"
              placeholder="0"
            />
            <div className="inputSuffix">$</div>
          </div>

          <div className="inputContainer">
            <div className="inputLabel">Exit Price:</div>
            <input
              type="number"
              value={exitPrice}
              onChange={handleExitPriceChange}
              className="input"
              placeholder="0"
            />
            <div className="inputSuffix">$</div>
          </div>

          <div className="inputContainer">
            <div className="inputLabel">USD Price:</div>
            <input
              type="number"
              value={localPrice}
              onChange={handleLocalPriceChange}
              className="input"
              placeholder="0"
            />
            <div className="inputSuffix">T</div>
          </div>

          <div className="inputContainer">
            <div className="inputLabel">Leverage:</div>
            <input
              type="number"
              value={leverage}
              onChange={handleLeverageChange}
              className="input"
              placeholder="0"
            />
            <div className="inputSuffix">$</div>
          </div>

          <div className="inputContainer">
            <div className="inputLabel">Fees:</div>
            <input
              type="number"
              value={feesPercent}
              onChange={handleFeesPercentChange}
              className="input"
              placeholder="0"
            />
            <div className="inputSuffix">%</div>
          </div>

          <br />
          <hr class="solid" />
          <p className="outputLabel">Margin:</p>

          <div className="pl">
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                backgroundColor: "gray",
                borderRadius: "3px",
                padding: "15px",
                lineHeight: "30px",
                margin: "5px"
              }}
            >
              {invest} $
              <br />
              {(invest / enterPrice).toFixed(6)} ₿
              <br />
              {(invest * localPrice).toLocaleString()} T
            </p>
            <p className="outputLabel">Size:</p>
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                backgroundColor: "gray",
                borderRadius: "3px",
                padding: "15px",
                lineHeight: "30px",
                margin: "5px"
              }}
            >
              {(invest * leverage).toLocaleString()} $
              <br />
              {((invest / enterPrice) * leverage).toFixed(6)} ₿
              <br />
              {(invest * leverage * localPrice).toLocaleString()} T
            </p>
            <p className="outputLabel">P&L:</p>
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                backgroundColor: "teal",
                borderRadius: "3px",
                padding: "15px",
                lineHeight: "30px",
                margin: "5px"
              }}
            >
              {levCalc() > 0
                ? "+" + levCalc().toLocaleString()
                : levCalc().toLocaleString()}{" "}
              $
              <br />
              {(levCalc() * localPrice).toLocaleString()} T
            </p>
            <p className="outputLabel">Liquid price:</p>
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                backgroundColor: "goldenrod",
                borderRadius: "3px",
                padding: "15px",
                lineHeight: "30px",
                margin: "5px"
              }}
            >
              Long: {(enterPrice - enterPrice / leverage).toLocaleString()} $
              <br />
              Short: {shortCalc()} $
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
