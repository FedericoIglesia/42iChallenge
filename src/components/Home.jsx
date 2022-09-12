import React from "react";
import { useEffect } from "react";
import Crypto from "./Crypto";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCryptos } from "../redux/actions";
import h from "./Home.module.css";
// import deleteBtn from "../delete.png";

function Home() {
  const cryptos = useSelector((state) => state.cryptos);
  let fav = useSelector((state) => state.fav);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCryptos());
  }, []);

  //   function handleDelete(e) {
  //     console.log("target" + e.target.value);
  //     dispatch(deleteCoin(e.target.value));
  //   }

  //   console.log("fav: " + fav);
  //   console.log("localStorage:  => " + localStorage.coins);

  return (
    <div>
      <ul
        style={{
          margin: 0,
          marginBlock: 0,
          paddingInline: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {Object.keys(cryptos).length > 0 ? (
          fav.length > 0 ? (
            fav.map((c, i) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    maxWidth: "100vw",
                  }}
                >
                  <Crypto
                    name={c}
                    // price={cryptos[c.toLowerCase()].prices.USD}
                    // price={cryptos.btc.prices.USD}
                    key={i}
                    value={c}
                  />
                </div>
              );
            })
          ) : (
            <h2 style={{ marginLeft: "35%" }}>
              No tenes ninguna crypto guardada!
            </h2>
          )
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={h.loader}></div>
          </div>
        )}
      </ul>
      <Link to="/search">
        <button className={h["home-addCoin-btn"]}>+</button>
      </Link>
    </div>
  );
}

export default Home;
