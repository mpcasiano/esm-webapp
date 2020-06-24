import React, { Component } from "react";
import { Table } from "antd";
import "antd/dist/antd.css";

class IndividualSummary extends Component {
  render() {
    const columns = [
      {
        title: "answer ID",
        dataIndex: "record_id",
        key: "id",
        width: "15%"
      },
      {
        title: "Answer",
        dataIndex: "answer",
        key: "name",
        ellipsis: true
      }
    ];
    return (
      <Table
        dataSource={this.props.data}
        onChange={this.handleChange}
        columns={columns}
        scroll={{ x: true }}
        bordered
        size="small"
        pagination={false}
      />
    );
  }
}

export default IndividualSummary;
