import { GET_CRYPTOS, FAV_COIN, DELETE_COIN, GET_PRICES } from "./actions";

const initialState = {
  cryptos: [],
  fav: [],
  currentCoin: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CRYPTOS:
      return {
        ...state,
        cryptos: action.payload,
        fav:
          Object.keys(localStorage).length > 0
            ? JSON.parse(localStorage.getItem("coins"))
            : [],
      };
    case FAV_COIN:
      localStorage.setItem(
        "coins",
        JSON.stringify([...state.fav, action.payload])
      );
      return {
        ...state,
        fav: [...state.fav, action.payload],
      };

    case DELETE_COIN:
      let coin = action.payload;
      console.log(action.payload);
      let newCoins;
      if (state.fav.length == 0) {
        newCoins = [];
        localStorage.clear();
      } else {
        newCoins = state.fav.filter((f) => f !== coin);
        localStorage.setItem("coins", JSON.stringify(newCoins));
        console.log(localStorage);
      }
      console.log("newCoins" + newCoins);
      return {
        ...state,
        fav: newCoins,
      };

    // case GET_PRICES:
    //   return {
    //     ...state,
    //     currentCoin: action.payload,
    //   };

    default: {
      return {
        ...state,
      };
    }
  }
};
