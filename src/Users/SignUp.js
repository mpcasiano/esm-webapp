import React, { Component } from "react";
import { signup } from "./API";
import { Form, Input, Button, Typography, Card, message, Spin } from "antd";
import { Link } from "react-router-dom";
import "./style.css";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
const { Title } = Typography;

class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      confirmDirty: false,
      loading: false
    };
  }

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
        const newUser = {
          first_name: values.first_name,
          last_name: values.last_name,
          username: values.username,
          email: values.email,
          password: values.password
        };
        //after sign-up, redirect to login page
        console.log(this.newUser);
        this.setState({ loading: true });
        signup(newUser).then(res => {
          this.setState({ loading: false });
          console.log("ressss: ", res);
          if (res.status === 200) {
            message.success("Successfully created the account!");
            this.props.history.push("/signin");
          } else if (res.status === 409) {
            message.error(res.data);
          } else {
            message.error("Server error");
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="landing-page">
        <div
          type="flex"
          align="middle"
          justify="center"
          style={{ verticalAlign: "middle", paddingTop: "15vh" }}
        >
          <Card style={{ width: "50vw" }} bordered={false}>
            <Avatar
              style={{
                width: "100px",
                height: "100px",
                margin: "-60px 0 30px 0",
                fontSize: "50px",
                backgroundColor: "#69c0ff"
              }}
            >
              <PersonIcon fontSize="inherit" />
            </Avatar>
            <Title level={2}>Create your account</Title>
            <Spin spinning={this.state.loading} size="large">
              <Form
                layout="vertical"
                onSubmit={this.handleSubmit}
                style={{ paddingTop: "2vh" }}
                initialValues={{ email: null }}
              >
                <Form.Item
                  label="First name"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 12px)",
                    padding: "0 30px 0 30px",
                    marginBottom: 15
                  }}
                >
                  {getFieldDecorator("first_name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your first name!"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item
                  label="Last name"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 12px)",
                    padding: "0 30px 0 30px",
                    marginBottom: 15
                  }}
                >
                  {getFieldDecorator("last_name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your last name!"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>

                <Form.Item
                  label="E-mail (optional)"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 12px)",
                    padding: "0 30px 0 30px",
                    marginBottom: 15
                  }}
                >
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        type: "email",
                        message: "The input is not valid E-mail!"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item
                  label="Username"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 12px)",
                    padding: "0 30px 0 30px",
                    marginBottom: 15
                  }}
                >
                  {getFieldDecorator("username", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your username!"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item
                  label="Password"
                  hasFeedback
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 12px)",
                    padding: "0 30px 0 30px",
                    marginBottom: 15
                  }}
                >
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
                  })(<Input.Password />)}
                </Form.Item>
                <Form.Item
                  label="Confirm Password"
                  hasFeedback
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 12px)",
                    padding: "0 30px 0 30px",
                    marginBottom: 15
                  }}
                >
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
                  })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Sign Up
                  </Button>
                </Form.Item>
              </Form>
              Already have an account? <Link to="/signin">Sign in</Link>
            </Spin>
          </Card>
        </div>
      </div>
    );
  }
}

const SignUp = Form.create({ name: "register" })(SignUpForm);

export default SignUp;
