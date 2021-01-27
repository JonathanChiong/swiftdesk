import { Fragment } from "react";
import { Col, Row, Accordion, Card, Spinner, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

export const DashboardOrders = () => {
  const orders = useSelector((state) => state.orders);

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
      <h2 className="dashboardh2">Order history</h2>
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
