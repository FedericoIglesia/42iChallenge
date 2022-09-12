import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import back from "../back-arrow.png";
import n from "./Nav.module.css";
import { useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation();

  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        marginBottom: "8rem",
        fontSize: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // borderBottom: "0.5px solid #fff",
      }}
    >
      <Link to="/">
        <img
          src={back}
          className={location.pathname == "/" ? n.imgNoShow : n.img}
        />
      </Link>

      <h1>CryptoFav</h1>
      <div></div>
    </div>
  );
}

export default Nav;
