import axios from "axios";
export const GET_CRYPTOS = "GET_CRYPTOS";
export const FAV_COIN = "FAV_COIN";
export const DELETE_COIN = "DELETE_COIN";
export const GET_PRICES = "GET_PRICES";

export function getCryptos() {
  return async function (dispatch) {
    try {
      let response = await axios.get(`https://api.cryptapi.io/info/`);
      return dispatch({
        type: GET_CRYPTOS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function favCoin(payload) {
  return {
    type: FAV_COIN,
    payload,
  };
}

export function deleteCoin(payload) {
  console.log("action = " + payload);
  return {
    type: DELETE_COIN,
    payload,
  };
}

// export function getPrices(name) {
//   return async function (dispatch) {
//     try {
//       let response = await axios.get(`https://api.cryptapi.io/${name}/info/`);
//       console.log("payload " + response.data);

//       return dispatch({
//         type: GET_PRICES,
//         payload: response.data.prices,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }
