import React, { Component } from "react";
import {
  Table,
  Tag,
  Button,
  Popconfirm,
  message,
  Empty,
  Row,
  Spin,
  Typography
} from "antd";
import axios from "axios";

class ClientList extends Component {
  componentDidMount() {
    this.props.updateClientList();
  }

  confirmDeleteClient = id => {
    console.log("id:", id);
    axios
      .delete("https://esm-api.herokuapp.com/api/delete-client/" + id, {
        headers: { Authorization: "Bearer " + localStorage.usertoken }
      })
      .then(res => {
        this.props.updateClientList();
        message.success(res.data);
      });
  };

  render() {
    const columns = [
      {
        title: "Date started",
        dataIndex: "date",
        key: "date",
        width: "15%",
        render: text => <p>{text}</p>
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "30%",
        render: text => <p>{text}</p>
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        width: "25%",
        render: text => <p>{text}</p>
      },
      {
        title: "Status",
        key: "tags",
        dataIndex: "tags",
        width: "15%",
        render: tags => (
          <span>
            {tags.map(tag => {
              var color;
              if (tag === "active") {
                color = "green";
              } else if (tag === "inactive") {
                color = "geekblue";
              } else if (tag === "new") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      },
      {
        title: "Action",
        key: "action",
        width: "15%",
        dataIndex: "action",
        render: (text, record) => (
          <span>
            <Popconfirm
              title="Are you sure to remove this user?"
              onConfirm={e => this.confirmDeleteClient(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger">Delete</Button>
            </Popconfirm>
          </span>
        )
      }
    ];
    if (this.props.loading) {
      return (
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ height: "100%" }}
        >
          <Spin size="large" />
        </Row>
      );
    } else {
      if (this.props.data) {
        return (
          <div>
            <Table
              columns={columns}
              dataSource={this.props.data}
              pagination={{ defaultPageSize: 5 }}
            />
          </div>
        );
      } else {
        return (
          <div>
            <Empty
              description={
                <Typography.Text type="secondary">
                  No clients yet
                </Typography.Text>
              }
            />
          </div>
        );
      }
    }
  }
}

export default ClientList;
