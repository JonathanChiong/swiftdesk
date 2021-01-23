import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./sass/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// COMPONENTS---------------------------------------
import Navbar from "./components/NavbarComponent";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import { Orders } from "./components/Orders/Orders";
import UserInventory from "./components/UserInventory/UserInventory";
import Invoices from "./components/Invoices";
import Error404 from "./components/Error404";

//Import fetch actions
import { fetchProducts } from "./redux/userInventory/inventoryActions";
import { fetchOrder } from "./redux/order/orderActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrder());
    dispatch(fetchProducts());
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <div className="appContainer">
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/orders" component={Orders} />
            <Route path="/invoices" component={Invoices} />
            <Route path="/inventory" component={UserInventory} />
            <Route path="*" component={Error404} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </React.Fragment>
  );
}

export default App;
