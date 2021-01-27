import {
  CREATE_ORDER,
  FETCH_ORDER_BEGIN,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_ERROR,
  CREATE_ORDER_ERROR,
  DEDUCT_STOCKS,
} from "./orderTypes";
import axios from "axios";

export const fetchOrder = () => {
  return (dispatch) => {
    dispatch(fetchOrderBegin());
    axios
      .get("api/transactions")
      .then((orders) => {
        dispatch(fetchOrderSuccess(orders.data));
      })
      .catch((error) => dispatch(fetchOrderError(error.message)));
  };
};

export const fetchOrderBegin = () => ({
  type: FETCH_ORDER_BEGIN,
});

export const fetchOrderSuccess = (orders) => ({
  type: FETCH_ORDER_SUCCESS,
  payload: orders,
});

export const fetchOrderError = (error) => ({
  type: FETCH_ORDER_ERROR,
  payload: error,
});

//Create order
export const createOrder = (order) => {
  return (dispatch) => {
    axios
      .post("api/transactions/add", order)
      .then((response) => {
        console.log("action init");
        dispatch(deductStocks(response.data.order));
        dispatch(createOrderSuccess(response.data));
      })
      .catch((error) => dispatch(createOrderError(error.message)));
  };
};

export const createOrderSuccess = (order) => ({
  type: CREATE_ORDER,
  payload: order,
});
export const createOrderError = (error) => ({
  type: CREATE_ORDER_ERROR,
  payload: error,
});

export const deductStocks = (product) => ({
  type: DEDUCT_STOCKS,
  payload: product,
});
