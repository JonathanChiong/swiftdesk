import { combineReducers } from "redux";
import userInventoryReducer from "../redux/userInventory/inventoryReducer";
import orderReducer from "./order/orderReducer";

export default combineReducers({
  products: userInventoryReducer,
  orders: orderReducer,
});
