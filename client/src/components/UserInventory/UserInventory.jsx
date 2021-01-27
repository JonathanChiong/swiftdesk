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

    return <Fragment>Hello World</Fragment>;
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
