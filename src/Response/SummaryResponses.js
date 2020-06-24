import React from "react";
import { Spin, Typography, Row, Col } from "antd";
import visualResponse from './ChartTypes'

class SummaryResponses extends React.Component {
    render() {
      if (this.props.loading) {
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
        )
      } else {
        return (
          <div>
            <div>
              <Typography.Title level={4} style={{ marginBottom: 0 }}>{this.props.title}</Typography.Title>
              <i>no. of entries: </i><b>{this.props.totalEntries} </b><br />
              <i>no. of respondents: </i><b>{this.props.totalUsers}</b>
            </div>
            {visualResponse(this.props.data)}
          </div>
        )
      }
        
    }
}
export default SummaryResponses;
