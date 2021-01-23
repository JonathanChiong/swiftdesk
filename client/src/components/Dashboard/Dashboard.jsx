import { Component } from "react";
import { DashboardOrders } from "./DashboardOrders";
import { DashboardStocks } from "./DashboardStocks";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div className="dashboard ">
        <DashboardStocks />
        <DashboardOrders />
      </div>
    );
  }
}

export default Dashboard;
