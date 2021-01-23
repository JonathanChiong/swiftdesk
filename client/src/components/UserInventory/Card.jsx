import React, { useState, Fragment } from "react";
import CloseButton from "../../public/cancel.png";

//Using redux with hooks
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  updateProduct,
} from "../../redux/userInventory/inventoryActions";

export const Card = (props) => {
  const dispatch = useDispatch();

  const [showDescription, setShowDescription] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [value, setValue] = useState({
    stocks: props.stocks,
    product: props.product,
    basePrice: props.basePrice,
    sellPrice: props.sellPrice,
  });
  const [inputStyle, setInputStyle] = useState({
    readOnly: {
      backgroundColor: "#dddddd",
      border: "none",
      width: "100%",
      marginBottom: "5px",
    },
    editMode: {
      backgroundColor: "#fafafa",
      border: "1px solid black",
      width: "100%",
      marginBottom: "5px",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(props.productId, value));
    setReadOnly(true);
  };

  const handleCancel = () => {
    setValue({
      stocks: props.stocks,
      product: props.product,
      basePrice: props.basePrice,
      sellPrice: props.sellPrice,
    });
    setReadOnly(true);
  };

  return (
    <div>
      {!showDescription ? (
        <div
          className="productCard"
          onClick={() => setShowDescription(!showDescription)}
        >
          <p className="productStocks">{props.stocks}</p>
          <p>{props.product}</p>
        </div>
      ) : (
        <div className="productCard">
          <span
            className="close-span"
            onClick={() => setShowDescription(!showDescription)}
          >
            <img className="close-btn" src={CloseButton} alt="close-btn" />
          </span>
          <div className="productDescription">
            <form onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor="stocks" style={{ marginBottom: "0px" }}>
                Stocks:
              </label>
              <input
                name="stocks"
                type="number"
                readOnly={readOnly}
                value={value.stocks}
                onChange={(e) => setValue({ ...value, stocks: e.target.value })}
                style={readOnly ? inputStyle.readOnly : inputStyle.editMode}
              ></input>

              <label htmlFor="stocks" style={{ marginBottom: "0px" }}>
                Name:
              </label>
              <input
                name="product"
                type="text"
                readOnly={readOnly}
                value={value.product}
                onChange={(e) =>
                  setValue({ ...value, product: e.target.value })
                }
                style={readOnly ? inputStyle.readOnly : inputStyle.editMode}
              ></input>

              <label htmlFor="stocks" style={{ marginBottom: "0px" }}>
                Base price:
              </label>
              <input
                name="basePrice"
                type="number"
                readOnly={readOnly}
                value={value.basePrice}
                onChange={(e) =>
                  setValue({ ...value, basePrice: e.target.value })
                }
                style={readOnly ? inputStyle.readOnly : inputStyle.editMode}
              ></input>

              <label htmlFor="stocks" style={{ marginBottom: "0px" }}>
                Sell price:
              </label>
              <input
                name="sellPrice"
                type="number"
                readOnly={readOnly}
                value={value.sellPrice}
                onChange={(e) =>
                  setValue({ ...value, sellPrice: e.target.value })
                }
                style={readOnly ? inputStyle.readOnly : inputStyle.editMode}
              ></input>

              {!confirmDelete && readOnly && (
                <Fragment>
                  <button onClick={() => setReadOnly(false)}>EDIT</button>
                  <button onClick={() => setConfirmDelete(true)}>DELETE</button>
                </Fragment>
              )}

              {!readOnly && (
                <Fragment>
                  <button type="submit">Save</button>
                  <button onClick={() => handleCancel()}>Cancel</button>
                </Fragment>
              )}

              {confirmDelete && (
                <Fragment>
                  Are you sure?
                  <button onClick={() => setConfirmDelete(false)}>
                    Cancel
                  </button>
                  <button
                    className="delete"
                    onClick={() => dispatch(deleteProduct(props.productId))}
                  >
                    Confirm Delete
                  </button>
                </Fragment>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
