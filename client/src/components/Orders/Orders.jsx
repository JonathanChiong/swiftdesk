import { Fragment, useState } from "react";
import { createOrder } from "../../redux/order/orderActions";
import { useSelector, useDispatch } from "react-redux";
import { validateOrder } from "./validateOrder";
import {
  Form,
  Col,
  Alert,
  Row,
  Accordion,
  Card,
  Spinner,
  Table,
} from "react-bootstrap";

export const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const products = useSelector((state) => state.products.products);
  const [orderError, setOrderError] = useState("");
  const [form, setForm] = useState({
    f_name: "",
    l_name: "",
    order: [],
    currentOrder: "",
    quantity: 0,
  });

  //Handle Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //Handle add order
  const handleAddOrder = (e) => {
    e.preventDefault();
    if (form.currentOrder === "" || form.quantity === 0) {
      return;
    }

    const currentProduct = products.find(
      (i) => i.product === form.currentOrder
    );
    const price = currentProduct?.sellPrice;

    const cart = {
      product: form.currentOrder,
      quantity: form.quantity,
      price: price,
    };

    setForm({
      ...form,
      order: [...form.order, cart],
      currentOrder: "",
      quantity: 0,
    });

    setOrderError("");
  };

  //Handle cancel
  const handleCancel = (e) => {
    e.preventDefault();
    setForm({
      f_name: "",
      l_name: "",
      order: [],
      currentOrder: "",
      quantity: 0,
    });
    setOrderError("");
  };

  //Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let orderCleared = "";

    if (form.order.length > 0) {
      //Validate order
      orderCleared = validateOrder(form.order, products);
    }

    if (orderCleared === "") {
      setOrderError("Please place an order");
      return;
    }

    if (orderCleared === false) {
      setOrderError("Order exceeds available stocks");
      return;
    }
    if (form.f_name === "") {
      setOrderError("Enter a name");
      return;
    }

    if (orderCleared) {
      dispatch(
        createOrder({
          f_name: form.f_name,
          l_name: form.l_name,
          order: form.order,
        })
      );
      setForm({
        f_name: "",
        l_name: "",
        order: [],
        currentOrder: "",
        price: 0,
        quantity: 0,
      });
      setOrderError("");
    }
  };

  const calculateOrderTotal = (order) => {
    let result = 0;
    for (var i = 0; i < order.length; i++) {
      result += order[i].price * order[i].quantity;
    }

    return result;
  };

  const formatDate = (mongoDate) => {
    var date = new Date(mongoDate);
    return date.toDateString();
  };
  return (
    <Fragment>
      <h3>Create order</h3>
      <br />
      <Row>
        <Col lg={6} md={8} sm={12} style={{ padding: 0 }}>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Row>
              <Form.Group as={Col} controlId="first-name">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First name"
                  name="f_name"
                  value={form.f_name}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="last-name">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  name="l_name"
                  value={form.l_name}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="order">
                <Form.Label>Product</Form.Label>
                <Form.Control
                  as="select"
                  name="currentOrder"
                  value={form.currentOrder}
                  onChange={(e) => handleChange(e)}
                >
                  <option>{""}</option>
                  {products.map((product) => (
                    <option value={product.product} key={product._id}>
                      {product.product}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  placeholder="Quantity"
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
            </Form.Row>
            {form.order.length > 0 && (
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Qty</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {form.order.map((order, index) => {
                    return (
                      <tr key={"currOrder" + index}>
                        <td>{order.quantity}</td>
                        <td>{order.product}</td>
                        <td>{order.price}</td>
                        <td>{order.quantity * order.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
            {orderError && <Alert variant="danger">{orderError}</Alert>}
            <button className="orderAdd" onClick={(e) => handleAddOrder(e)}>
              Add product
            </button>
            <br />
            <br />
            <button
              className="orderSubmitCancel"
              onClick={(e) => handleCancel(e)}
            >
              Cancel
            </button>{" "}
            <button className="orderSubmit" type="submit">
              Submit
            </button>
          </Form>
        </Col>
      </Row>
      <hr />
      <h3>Order history</h3>
      <br />

      {orders.error && <Alert variant="warning">{orders.error}</Alert>}

      {orders.loading && (
        <div style={{ width: "100%", textAlign: "center", height: "200px" }}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}

      <Row>
        <Col lg={6} md={8} sm={12} style={{ padding: 0 }}>
          <Accordion defaultActiveKey="0">
            {orders.orders.map((order) => {
              return (
                <Card key={"00" + order._id}>
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey={order.invoice_num}
                  >
                    <span style={{ float: "right" }}>
                      Total:{" "}
                      <strong>
                        Php
                        {calculateOrderTotal(order.order)}
                      </strong>
                    </span>
                    <span>Invoice: {order.invoice_num}</span>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={order.invoice_num}>
                    <Card.Body>
                      <strong>Date: </strong>
                      {formatDate(order.createdAt)}
                      <br />
                      <strong>Name: </strong>
                      {` ${order.f_name} ${order.l_name}`}
                      <br />
                      <strong>Items:</strong>
                      <br />
                      {order.order.map((order, i) => {
                        return (
                          <div key={i + "orderlist"}>
                            {`${order.quantity} ${order.product}`} - SRP{" "}
                            {order.price}
                          </div>
                        );
                      })}
                      <br />
                      <strong>Total: </strong>
                      {calculateOrderTotal(order.order)}
                      <br />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })}
          </Accordion>
        </Col>
      </Row>
    </Fragment>
  );
};
