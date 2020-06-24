import React, { Component } from "react";
import { signupClient } from "../Users/API";
import {
  Form,
  Input,
  Button,
  Typography,
  Divider,
  Icon,
  message,
  Col,
  Row
} from "antd";
import ClientList from "./clients";
import axios from "axios";

class RegisterClient extends Component {
  constructor() {
    super();
    this.state = {
      confirmDirty: false,
      error: "",
      data: null,
      loading: false
    };
  }

  componentDidMount() {
    this.updateClientList();
  }

  updateClientList = () => {
    this.setState({ loading: true });

    axios
      .get("https://esm-api.herokuapp.com/api/view-clients", {
        headers: { Authorization: "Bearer " + localStorage.usertoken }
      })
      .then(res => {
        var tempData = [];
        if (res) {
          var i = 0;
          res.data.forEach(user => {
            i = i + 1;
            var temp = {
              key: "",
              date: "2014-12-24",
              id: 0,
              name: "",
              username: "",
              tags: ["active"]
            };
            temp.key = i;
            temp.id = user.id;
            if (user.first_name != null && user.last_name != null) {
              temp.name = user.first_name + " " + user.last_name;
            } else {
              temp.name = "";
              temp.tags = ["NEW"];
            }
            temp.username = user.username;
            tempData.push(temp);
          });
        }
        this.setState({ data: tempData, loading: false });
      })
      .catch(err => {
        this.setState({
          data: null,
          loading: false
        });
        console.log(err);
      });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        const newUser = {
          first_name: null,
          last_name: null,
          username: values.username,
          email: null,
          password: values.password
        };
        //after sign-up, redirect to login page
        console.log(this.newUser);
        signupClient(newUser).then(res => {
          if (res.status === 200) {
            this.props.form.resetFields();
            this.updateClientList();
            this.setState({ loading: false });
            return message.success("User registered successfully");
          } else if (res.response.data) {
            //this.setState({ error: res.response.data });
            this.setState({ loading: false });
            return message.error(res.response.data);
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Typography.Title level={2} style={{ margin: "30px 0 0 120px" }}>
          Clients
        </Typography.Title>
        <Divider style={{ marginTop: "10px" }} />
        <div style={{ margin: "0 200px" }}>
          Fill out the fields below to create a new account:
          <div>
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <Row>
                <Col span={6}>
                  <Form.Item>
                    {getFieldDecorator("username", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your username!"
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Username"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item hasFeedback>
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your password!"
                        },
                        {
                          validator: this.validateToNextPassword
                        }
                      ]
                    })(
                      <Input.Password
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Password"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item hasFeedback>
                    {getFieldDecorator("confirm", {
                      rules: [
                        {
                          required: true,
                          message: "Please confirm your password!"
                        },
                        {
                          validator: this.compareToFirstPassword
                        }
                      ]
                    })(
                      <Input.Password
                        onBlur={this.handleConfirmBlur}
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Confirm Password"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Create account
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          <i>Names are initially blank. They can be updated by your clients.</i>
          <div style={{ marginTop: "20px" }}>
            <ClientList
              loading={this.state.loading}
              data={this.state.data}
              updateClientList={this.updateClientList}
            />
          </div>
        </div>
      </div>
    );
  }
}

const Clients = Form.create({ name: "register" })(RegisterClient);

export default Clients;
