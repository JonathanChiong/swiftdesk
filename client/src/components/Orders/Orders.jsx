import { Fragment, useState } from "react";
import {
  Form,
  Col,
  Button,
  Row,
  Accordion,
  Card,
  Spinner,
} from "react-bootstrap";
import { createOrder } from "../../redux/order/orderActions";
import { useSelector, useDispatch } from "react-redux";

export const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const [error, setError] = useState("");
  const products = useSelector((state) => state.products.products);

  const [form, setForm] = useState({
    f_name: "",
    l_name: "",
    order: "",
    quantity: 0,
    subTotal: 0,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let final = 0;

    const currentProduct = products.find((i) => i.product === form.order);
    const price = currentProduct?.sellPrice;
    final = price * value || 0;

    setForm({ ...form, [name]: value, subTotal: final });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.order) {
      setError("Product is required");
      return;
    }
    if (!form.f_name) {
      setError("First name is required");
      return;
    }

    dispatch(createOrder(form));

    setForm({
      f_name: "",
      l_name: "",
      order: "",
      quantity: 0,
    });

    setError("");
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
                  name="order"
                  value={form.order}
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
              {form.order ? (
                <Form.Group as={Col} controlId="quantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Quantity"
                    name="quantity"
                    value={form.quantity}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
              ) : (
                <Form.Group as={Col}></Form.Group>
              )}
            </Form.Row>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button variant="dark" size="md" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <hr />
      <h3>Order history</h3>
      <br />

      {orders.error && <h2 style={{ color: "red" }}>{orders.error}</h2>}

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
                <Card key={order._id}>
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey={order.invoice_num}
                  >
                    Invoice: {order.invoice_num}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={order.invoice_num}>
                    <Card.Body>
                      {`${order.f_name} ${order.l_name}`}
                      <br />
                      <br />
                      <strong>Items:</strong>
                      <br />
                      {`${order.quantity} ${order.order}`}
                      <br />
                      <strong>Subtotal:</strong>
                      <br />
                      {`Php ${order.subTotal}`}
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
