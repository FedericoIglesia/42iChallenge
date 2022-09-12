import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { getCryptos, favCoin } from "../redux/actions";
import s from "./Search.module.css";

function Search() {
  const crypto = useSelector((state) => state.cryptos);
  const fav = useSelector((state) => state.fav);
  const dispatch = useDispatch();
  const [coins, setCoins] = useState([]);
  const [currentCoin, setCurrentCoin] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  function handleInput(e) {
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault(e);
    if (name.toLowerCase() === "bitcoin" || name.toLowerCase() === "btc") {
      setCoins((prev) => [...prev, "BTC"]);
      setCurrentCoin("BTC");
    } else if (
      name.toLowerCase() === "ethereum" ||
      name.toLowerCase() === "eth"
    ) {
      setCoins((prev) => [...prev, "ETH"]);
      setCurrentCoin("ETH");
    } else if (name.toLowerCase() === "litecoin") {
      setCoins((prev) => [...prev, "LTC"]);
      setCurrentCoin("LTC");
    } else if (name.toLowerCase() === "trx") {
      setCoins((prev) => [...prev, "TRX"]);
      setCurrentCoin("TRX");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There's no crypto with that name!",
      });
    }
    setName("");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = (e) => {
    setShow(false);
    dispatch(favCoin(e.target.value));
  };

  useEffect(() => localStorage.setItem("coins", JSON.stringify(fav)), [fav]);
  //   console.log(localStorage);
  return (
    <div>
      {crypto ? (
        <form onSubmit={(e) => handleSubmit(e)} className={s.form}>
          <input
            type="text"
            onChange={(e) => handleInput(e)}
            value={name}
            className={s.searchbar}
          ></input>
          <button onClick={handleSubmit} className={s.searchBtn}>
            Buscar
          </button>
          {/* <p>{price[currentCoin.toLowerCase()].prices.USD}</p> */}
        </form>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className={s.loader}></div>
        </div>
      )}
      <ul>
        {coins.map((c, i) => (
          <li
            key={i}
            style={{
              listStyle: "none",
              textAlign: "center",
              marginTop: "5rem",
              marginRight: "4rem",
            }}
          >
            <button onClick={handleShow} className={s.coinTitles}>
              {c}
            </button>
          </li>
        ))}
      </ul>
      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        style={{
          textAlign: "center",
          position: "absolute",
          top: "20%",
          height: "60%",
          width: "80%",
          marginLeft: "10%",
          border: "1px solid white",
          background: "#000",
          borderRadius: "5px",
          color: "#fff",
        }}
      >
        <Modal.Header
          style={{
            width: "1rem",
            height: "1rem",
            padding: "2rem",
            fontSize: "2rem",
            color: "#770606",
          }}
          className={s.modalHeader}
          onClick={handleClose}
        >
          X
        </Modal.Header>
        <Modal.Title
          style={{
            marginTop: "0",
            fontSize: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          {currentCoin}
        </Modal.Title>
        <Modal.Body>
          {show && (
            <h4
              style={{
                color: "green",
                fontSize: "2rem",
                margin: "4rem 0 ",
              }}
            >
              {Number(
                crypto[currentCoin.toLowerCase()].prices.USD
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}{" "}
              USD
            </h4>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Link to="/">
            <button
              value={currentCoin}
              onClick={(e) => handleSave(e)}
              className={s.saveBtn}
            >
              Guardar
            </button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Search;
