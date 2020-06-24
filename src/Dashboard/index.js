import React from "react";
import SurveyForms from "./SurveyForms";
import axios from "axios";
import { Typography, Divider, Row, Col, Spin } from "antd";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(
        "https://esm-api.herokuapp.com/api/view-anonymous-surveys-overview",
        {
          headers: { Authorization: "Bearer " + localStorage.usertoken }
        }
      )
      .then(res => {
        console.log("surveys: ", res.data);
        this.setState({
          surveys: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ height: "100%" }}
        >
          <Col>
            <Spin size="large" />
          </Col>
        </Row>
      );
    } else {
      return (
        <div>
          <Typography.Title level={2} style={{ margin: "30px 0 0 120px" }}>
            Dashboard
          </Typography.Title>

          <Divider style={{ marginTop: "10px" }} />

          <SurveyForms surveys={this.state.surveys} />
        </div>
      );
    }
  }
}

export default Dashboard;
