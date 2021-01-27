import {
  CREATE_ORDER,
  FETCH_ORDER_BEGIN,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_ERROR,
  CREATE_ORDER_ERROR,
} from "./orderTypes";

const initialState = {
  error: "",
  loading: false,
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER_BEGIN:
      return {
        error: "",
        orders: [],
        loading: true,
      };
    case FETCH_ORDER_SUCCESS:
      return {
        error: "",
        loading: false,
        orders: action.payload,
      };
    case FETCH_ORDER_ERROR:
      return {
        error: action.payload,
        loading: false,
        orders: [],
      };
    case CREATE_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case CREATE_ORDER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
