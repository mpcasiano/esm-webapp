import React, { Component } from "react";
import {
  Drawer,
  Typography,
  Button,
  Icon,
  Row,
  Col,
  Avatar,
  Divider
} from "antd";
import Overview from "./Overview.js";

class Profile extends Component {
  state = {
    profile: {}
  };

  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      //Bearer token
      "Bearer " + localStorage.usertoken
    );

    fetch("https://esm-api.herokuapp.com/api/view-surveybuilder-profile", {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ profile: result });
      })
      .catch(error => console.log("error", error));
  }
  logout = () => {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("expiry");
  };
  render() {
    // console.log("token:", localStorage.usertoken);
    const logout = (
      <Row type="flex" justify="center">
        <Button type="danger" onClick={this.logout}>
          <Icon type="poweroff" />
          Logout
        </Button>
      </Row>
    );

    return (
      <Drawer
        title="Profile"
        placement="right"
        closable={true}
        onClose={this.props.toggleDrawer}
        visible={this.props.visibility}
        width={350}
        footer={logout}
      >
        <Row type="flex">
          <Col
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                margin: "15px"
              }}
            >
              <Typography.Title level={4}>
                {this.state.profile.first_name} {this.state.profile.last_name}
              </Typography.Title>
              <Avatar size={64} style={{ margin: "15px" }} />
              <Typography>{this.state.profile.email}</Typography>
              <Typography.Text type="secondary"> Researcher</Typography.Text>
            </Row>
            <Divider />
            <Overview />
            <Divider />
            {logout}
          </Col>
        </Row>
      </Drawer>
    );
  }
}

export default Profile;
