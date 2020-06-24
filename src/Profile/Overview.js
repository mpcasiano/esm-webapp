import React, { Component } from "react";
import { Row, Col, Statistic } from "antd";

class Overview extends Component {
  render() {
    return (
      <Row>
        <Col span={12} style={{ padding: "10px" }}>
          <Statistic title="Total Surveys" value={23} />
        </Col>
        <Col span={12} style={{ padding: "10px" }}>
          <Statistic title="Active Surveys" value={4} />
        </Col>
        <Col span={12} style={{ padding: "10px" }}>
          <Statistic title="Active Clients" value={17} />
        </Col>
        <Col span={12} style={{ padding: "10px" }}>
          <Statistic title="Active Participants" value={208} />
        </Col>
      </Row>
    );
  }
}

export default Overview;
