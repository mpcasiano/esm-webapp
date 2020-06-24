import React, { Component } from "react";
import { Col, Row, Table, Button, Spin } from "antd";
import IndividualSummary from "./IndivSummary";
import "antd/dist/antd.css";

const { ColumnGroup, Column } = Table;
class ViewResponses extends Component {
  state = {
    id: 0,
    data: {},
    filteredInfo: null,
    sortedInfo: null
  };

  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.usertoken);
    fetch(
      "https://esm-api.herokuapp.com/api/view-answers/" + this.props.survey.id,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      }
    )
      .then(response => response.json())
      .then(result => {
        this.setState({ data: result });
      })
      .catch(error => console.log("error", error));
  }

  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
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

  renderColumns = questions => {
    return questions.map((item, i) => {
      return <Column title={item.question} dataIndex={item.id} key={item.id} />;
    });
  };

  render() {
    let sortedInfo = this.state.sortedInfo || {};
    let filteredInfo = this.state.filteredInfo || {};
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: "15%"
      },
      {
        title: "Question",
        dataIndex: "question",
        key: "name",
        ellipsis: true
      },
      {
        title: "Input Type",
        dataIndex: "type",
        key: "age",
        width: "25%"
      }
    ];
    if (this.state.data) {
      return (
        <Row type="flex" justify="center" align="middle">
          <Col span={20} style={{ marginTop: 20, height: "100vh" }}>
            <Row type="flex" justify="space-between">
              <Col>
                <h1>{this.props.title}</h1>
              </Col>
              <Col>
                <Button type="primary" onClick={e => this.toCSV}>
                  Download as .csv
                </Button>
              </Col>
            </Row>
            <Row>
              <Table
                dataSource={this.state.data.questions}
                onChange={this.handleChange}
                columns={columns}
                expandedRowRender={row => (
                  <Row style={{ width: "100%" }}>
                    <IndividualSummary data={row.answers} />
                  </Row>
                )}
              />
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

export default ViewResponses;
