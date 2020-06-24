import React, { Component } from "react";
import { Col, Row, Table, Button, Spin } from "antd";
import "antd/dist/antd.css";

const { Column } = Table;
class Respondents extends Component {
  state = {
    respondents: []
  };

  componentDidMount() {
    fetch("https://esm-api.herokuapp.com/api/admin/view-all-clients")
      .then(res => res.json())
      .then(
        result => {
          this.setState({ respondents: result });
          return result;
        },
        error => {
          console.log(error);
        }
      );
  }

  handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age"
      }
    });
  };

  render() {
    if (this.state.respondents.length > 0) {
      return (
        <Row type="flex" justify="center" align="middle">
          <Col
            span={20}
            style={{ marginTop: 20, marginBottom: 20, height: "100%" }}
          >
            <Row type="flex" justify="space-between">
              <Col>
                <h1>{this.props.title}</h1>
              </Col>
              <Col>
                <Button type="primary" onClick={e => this.toCSV}>
                  Add Respondents
                </Button>
              </Col>
            </Row>
            <Row>
              <Table
                dataSource={this.state.respondents}
                onChange={this.handleChange}
              >
                <Column title="ID" dataIndex="id" />
                <Column title="username" dataIndex="username" />
                <Column title="Email" dataIndex="email" />
                <Column
                  title="Name"
                  render={item => item.first_name + " " + item.last_name}
                />
              </Table>
            </Row>
          </Col>
        </Row>
      );
    } else
      return (
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ height: "100vh" }}
        >
          <Col>
            <Spin size="large" />
          </Col>
        </Row>
      );
  }
}

export default Respondents;
