import axios from "axios";

import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_ERROR,
  CREATE_PRODUCT,
  CREATE_PRODUCT_ERROR,
} from "./inventoryTypes";

//ACTIONS---------------------------------------

//FETCH-----------------------------------------
export const fetchProducts = () => {
  return (dispatch) => {
    dispatch(fetchProductsBegin());
    axios
      .get("api/user/inventory/")
      .then((response) => {
        const products = response.data;
        dispatch(fetchProductsSuccess(products));
      })
      .catch((error) => dispatch(fetchProductsError(error.message)));
  };
};
export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsError = (error) => ({
  type: FETCH_PRODUCTS_ERROR,
  payload: error,
});

//Delete----------------------------------------
export const deleteProduct = (productKey) => {
  return (dispatch) => {
    axios
      .delete(`api/user/inventory/delete/${productKey}`)
      .then(dispatch(deleteProductSuccess(productKey)));
  };
};

export const deleteProductSuccess = (productKey) => ({
  type: DELETE_PRODUCT,
  payload: productKey,
});

//Create-----------------------------------------

export const createProduct = (product) => {
  return (dispatch) => {
    axios
      .post(`api/user/inventory/add/`, product)
      .then((response) => dispatch(createProductSuccess(response.data)))
      .catch((error) =>
        dispatch(
          createProductError(
            "Save failed. Check if product exists or contact administrator"
          )
        )
      );
  };
};
export const createProductSuccess = (product) => ({
  type: CREATE_PRODUCT,
  payload: product,
});

export const createProductError = (error) => ({
  type: CREATE_PRODUCT_ERROR,
  payload: error,
});

//Update----------------------------------------

export const updateProduct = (productID, details) => {
  return (dispatch) => {
    axios
      .patch(`api/user/inventory/update/${productID}`, details)
      .then((response) => dispatch(updateProductSuccess(response.data)));
  };
};

export const updateProductSuccess = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product,
});
