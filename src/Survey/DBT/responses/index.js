import React, { Component } from "react";
import { Row, Table, Tag } from "antd";
import "antd/dist/antd.css";
import data from "./data";
import IndividualSummary from "./diaryResponse";

const { Column } = Table;
class ViewResponses extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null
  };

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
    return (
      <Row type="flex" justify="center" align="middle">
        <Table
          style={{ width: "100%" }}
          dataSource={data}
          onChange={this.handleChange}
          expandedRowRender={row => (
            <Row type="flex" justify="space-around" style={{ marginLeft: -20 }}>
              <IndividualSummary />
            </Row>
          )}
        >
          <Column title="ID #" dataIndex="id" key="id" align="center" />
          <Column
            title="Initials"
            dataIndex="initials"
            key="initials"
            align="center"
          />
          <Column
            title="Filled In Session?"
            dataIndex="inSession"
            key="inSession"
            align="center"
            render={item => <Tag color="green">{item}</Tag>}
          />
          <Column
            title="How often do you fill out?"
            dataIndex="regularity"
            key="regularity"
            align="center"
            render={item => <Tag color="volcano">{item}</Tag>}
          />
          <Column
            title="Date Started"
            dataIndex="dateStarted"
            key="dateStarted"
            align="center"
          />
        </Table>
      </Row>
    );
  }
}

export default ViewResponses;
