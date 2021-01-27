import { Fragment } from "react";
import { Col, Row, Accordion, Card, Spinner, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

export const DashboardOrders = () => {
  const orders = useSelector((state) => state.orders);

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
                <Card key={order._id}>
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey={order.invoice_num}
                  >
                    <span style={{ float: "right" }}>
                      <strong>Total: Php {order.subTotal}</strong>
                    </span>
                    <span>
                      <em>Invoice: {order.invoice_num}</em>
                    </span>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={order.invoice_num}>
                    <Card.Body>
                      <strong>Name: </strong>
                      {` ${order.f_name} ${order.l_name}`}
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
