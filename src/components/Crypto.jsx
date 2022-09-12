import React, { useEffect, useState } from "react";
import deleteBtn from "../delete.png";
import { useSelector, useDispatch } from "react-redux";
import { getPrices, deleteCoin } from "../redux/actions";
import h from "./Home.module.css";

function Crypto({ name, value }) {
  const dispatch = useDispatch();
  const cryptos = useSelector((state) => state.cryptos);
  let [currentPrice, setCurrentPrice] = useState(0);
  let currentCoin = cryptos[name.toLowerCase()];
  let [currentCoinPrices, setCurrentCoinPrices] = useState([]);
  function handleDelete(e) {
    dispatch(deleteCoin(e.currentTarget.value));
  }
  useEffect(() => {
    setCurrentCoinPrices(Object.keys(currentCoin.prices));
    setCurrentPrice(currentCoin.prices.USD);
  }, []);

  const handlePrice = (e) => {
    setCurrentPrice(currentCoin.prices[e.target.value]);
  };

  return (
    <div
      className={h["crypto-container"]}
      style={{
        border: "1px solid #fff",
        borderLeft: "none",
        borderRight: "none",
        width: "100vw",
      }}
    >
      <li
        className={h.li}
        style={{
          listStyle: "none",
          display: "flex",
          justifyContent: "space-between",
          color: "#fff",
          alignItems: "center",
          margin: "1rem 3rem",
        }}
      >
        <h3
          style={{
            fontSize: "1.5rem",
            lineHeight: 1.5,
            padding: 0,
            flexGrow: 1,
          }}
        >
          {name}
        </h3>
        <p style={{ fontSize: "1.5rem", color: "green", marginRight: "2rem" }}>
          {Number(currentPrice).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <select
          onChange={(e) => handlePrice(e)}
          style={{
            background: "transparent",
            color: "#fff",
            padding: "0.5rem",
            border: "1px solid #fff",
            borderRadius: "3px",
            fontSize: "0.9rem",
          }}
        >
          {currentCoinPrices.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          onClick={(e) => handleDelete(e)}
          value={value}
          style={{ padding: 0, marginLeft: "12rem" }}
          id="myBtn"
          className={h["home-delete-btn"]}
        >
          <img
            src={deleteBtn}
            style={{
              height: "4rem",
              width: "4rem",
              background: "#000",
            }}
          />
        </button>
      </li>
    </div>
  );
}

export default Crypto;
