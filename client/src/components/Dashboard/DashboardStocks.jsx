import { useSelector } from "react-redux";
import { Fragment } from "react";
import { Col, Spinner, Row, Alert } from "react-bootstrap";
import { Card } from "../UserInventory/Card";

export const DashboardStocks = () => {
  const { products, fetchError, loading } = useSelector(
    (state) => state.products
  );

  return (
    <Fragment>
      <h2 className="dashboardh2">Inventory</h2>
      {fetchError && <Alert variant="warning">{fetchError}</Alert>}

      {loading && (
        <div style={{ width: "100%", textAlign: "center", height: "200px" }}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
      <Row>
        {products.map((product) => (
          <Col lg={2} md={6} sm={12} key={product._id} className="product">
            <Card
              product={product.product}
              stocks={product.stocks}
              basePrice={product.basePrice}
              sellPrice={product.sellPrice}
              productId={product._id}
            />
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};
