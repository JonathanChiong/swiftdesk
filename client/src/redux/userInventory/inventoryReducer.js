import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "./inventoryTypes";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

const userInventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        error: "",
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        loading: false,
        products: [],
        error: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    case CREATE_PRODUCT:
      const previousProducts = state.products;
      return {
        ...state,
        products: [...previousProducts, action.payload],
      };
    case UPDATE_PRODUCT:
      const updatedProducts = state.products.map((i) => {
        if (i._id === action.payload._id) {
          return action.payload;
        }
        return i;
      });
      return { ...state, products: updatedProducts };

    default:
      return state;
  }
};

export default userInventoryReducer;
