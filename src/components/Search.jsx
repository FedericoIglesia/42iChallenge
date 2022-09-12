import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { getCryptos, favCoin } from "../redux/actions";

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

      setName("");
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = (e) => {
    setShow(false);
    dispatch(favCoin(e.target.value));
  };

  useEffect(() => localStorage.setItem("coins", JSON.stringify(fav)), [fav]);

  return (
    <div>
      {crypto ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => handleInput(e)}
            value={name}
          ></input>
          <button onClick={handleSubmit}>Search</button>
          {/* <p>{price[currentCoin.toLowerCase()].prices.USD}</p> */}
        </form>
      ) : (
        <p>Loading...</p>
      )}
      <ul>
        {coins.map((c, i) => (
          <li key={i}>
            <button onClick={handleShow}>{c}</button>
          </li>
        ))}
      </ul>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentCoin}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {show && <h4>{crypto[currentCoin.toLowerCase()].prices.USD}</h4>}
        </Modal.Body>
        <Modal.Footer>
          <Link to="/">
            <Button value={currentCoin} onClick={(e) => handleSave(e)}>
              Guardar
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Search;
