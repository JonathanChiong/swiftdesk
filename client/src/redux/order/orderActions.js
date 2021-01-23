import {
  CREATE_ORDER,
  FETCH_ORDER_BEGIN,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_ERROR,
} from "./orderTypes";
import axios from "axios";

export const fetchOrder = () => {
  return (dispatch) => {
    dispatch(fetchOrderBegin());
    axios
      .get("transactions/")
      .then((orders) => {
        console.log(orders);
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

export const createOrder = (order) => {
  return (dispatch) => {
    axios
      .post("transactions/add", order)
      .then((response) => {
        dispatch(createOrderSuccess(response.data));
      })
      .catch((error) => error.message);
  };
};

export const createOrderSuccess = (order) => ({
  type: CREATE_ORDER,
  payload: order,
});
