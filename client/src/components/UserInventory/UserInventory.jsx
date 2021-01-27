import { Fragment, Component } from "react";
import { Col, Row, Form, Alert, Spinner } from "react-bootstrap";
import { Card } from "./Card";

//Redux
import { connect } from "react-redux";
import { createProduct } from "../../redux/userInventory/inventoryActions";

class UserInventory extends Component {
  constructor() {
    super();

    this.state = {
      form: {
        product: "",
        stocks: 0,
        basePrice: 0,
        sellPrice: 0,
      },
      error: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.form.product) {
      this.setState({ error: "Product name is required" });
      return;
    } else {
      this.props.createProduct(this.state.form);
      this.setState({
        form: {
          product: "",
          stocks: 0,
          basePrice: 0,
          sellPrice: 0,
        },
        error: "",
      });
    }
  };

  render() {
    const { loading, products, error, fetchError } = this.props;

    return (
      <Fragment>
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
        <div>
          <hr />
          <h2 className="dashboardh2">Add Product</h2>
          <br />
          <Row>
            <Col lg={6} md={12} style={{ padding: 0 }}>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <Form.Group>
                  <Form.Row>
                    <Form.Label column lg={2}>
                      Name
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="text"
                        name="product"
                        placeholder="Product name"
                        value={this.state.form.product}
                        onChange={(e) => this.handleChange(e)}
                      />
                    </Col>
                  </Form.Row>
                  <br />
                  <Form.Row>
                    <Form.Label column lg={2}>
                      Quantity
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="number"
                        name="stocks"
                        min={0}
                        placeholder="Quantity"
                        value={this.state.form.stocks}
                        onChange={(e) => this.handleChange(e)}
                      />
                    </Col>
                  </Form.Row>
                  <br />
                  <Form.Row>
                    <Form.Label column lg={2}>
                      Base price
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="number"
                        name="basePrice"
                        min={0}
                        placeholder="Base price"
                        value={this.state.form.basePrice}
                        onChange={(e) => this.handleChange(e)}
                      />
                    </Col>
                  </Form.Row>
                  <br />
                  <Form.Row>
                    <Form.Label column lg={2}>
                      Selling price
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="number"
                        name="sellPrice"
                        min={0}
                        placeholder="Selling price"
                        value={this.state.form.sellPrice}
                        onChange={(e) => this.handleChange(e)}
                      />
                    </Col>
                  </Form.Row>
                  <br />
                  <br />
                  {error && <Alert variant="danger">{error}</Alert>}

                  <button className="orderSubmit" type="submit">
                    Submit
                  </button>
                </Form.Group>
              </form>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  loading: state.products.loading,
  error: state.products.error,
  fetchError: state.products.fetchError,
});

const mapDispatchToProps = {
  createProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInventory);
