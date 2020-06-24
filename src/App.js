import React, { Component } from "react";
import { Row, Col, Layout, Tooltip } from "antd";
import DBT from "./Survey/DBT";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import SurveyPage from "./Survey";
import Clients from "./Clients";
import { NavLink } from "react-router-dom";
import {
  DashboardRounded,
  DescriptionRounded,
  AccountCircle,
  Assignment,
  GroupRounded
} from "@material-ui/icons";
import "antd/dist/antd.less";

class App extends Component {
  state = {
    drawerVisibility: false
  };

  toggleDrawer = () => {
    this.setState({
      drawerVisibility: !this.state.drawerVisibility
    });
  };

  renderComponent = () => {
    let url = this.props.location.pathname;
    if (url.includes("/survey")) {
      return <SurveyPage url={url} redirect={this.redirectPage} />;
    } else if (url === "/DBT") {
      return <DBT />;
    } else if (url === "/dashboard" || url === "/") {
      return <Dashboard />;
    } else if (url === "/clients") {
      return <Clients />;
    } else {
      this.props.history.push(`/dashboard`);
    }
  };

  redirectPage = id => {
    this.props.history.push(`/survey/${id}`);
  };

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Layout.Sider theme="light" collapsed style={{ padding: "10px" }}>
          <Row
            type="flex"
            align="middle"
            justify="center"
            style={{ height: "100vh" }}
          >
            <Col
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column"
              }}
            >
              <Row />
              <Row>
                <Row style={{ marginBottom: "20px" }}>
                  <Tooltip title="Dashboard" placement="right">
                    <NavLink
                      to="/dashboard"
                      activeStyle={{ borderBottom: "solid 1.5px #5591F5" }}
                    >
                      <DashboardRounded />
                    </NavLink>
                  </Tooltip>
                </Row>
                <Row style={{ marginBottom: "20px" }}>
                  <Tooltip title="Surveys" placement="right">
                    <NavLink
                      to="/survey"
                      activeStyle={{ borderBottom: "solid 1.5px #5591F5" }}
                    >
                      <DescriptionRounded />
                    </NavLink>
                  </Tooltip>
                </Row>
                <Row style={{ marginBottom: "20px" }}>
                  <Tooltip title="Clinical Surveys" placement="right">
                    <NavLink
                      to="/DBT"
                      activeStyle={{ borderBottom: "solid 1.5px #5591F5" }}
                    >
                      <Assignment />
                    </NavLink>
                  </Tooltip>
                </Row>
                <Row style={{ marginBottom: "20px" }}>
                  <Tooltip title="Manage Clients" placement="right">
                    <NavLink
                      to="/clients"
                      activeStyle={{ borderBottom: "solid 1.5px #5591F5" }}
                    >
                      <GroupRounded />
                    </NavLink>
                  </Tooltip>
                </Row>
              </Row>
              <Row>
                <NavLink to="#">
                  <AccountCircle
                    onClick={e =>
                      this.setState({
                        drawerVisibility: !this.state.drawerVisibility
                      })
                    }
                  />
                  <Profile
                    visibility={this.state.drawerVisibility}
                    toggleDrawer={this.toggleDrawer}
                  />
                </NavLink>
              </Row>
            </Col>
          </Row>
        </Layout.Sider>
        <Layout.Content>{this.renderComponent()}</Layout.Content>{" "}
      </Layout>
    );
  }
}

export default App;
