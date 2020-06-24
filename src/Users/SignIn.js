import React, { Component } from "react";
import { login } from "./API";
import {
  Form,
  Icon,
  Input,
  Button,
  Typography,
  Spin,
  Card,
  message
} from "antd";
import { Link } from "react-router-dom";
import "./style.css";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
const { Title } = Typography;

class SignInForm extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const user = {
          username: values.username,
          password: values.password
        };
        this.setState({ loading: true });
        login(user).then(res => {
          this.setState({ loading: false });
          if (res) {
            this.props.history.push("/dashboard");
          } else {
            message.error("Wrong username or password");
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
          <Card style={{ width: "30vw" }} bordered={false}>
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
            <Title level={2}>Log in</Title>

            <Spin spinning={this.state.loading} size="large">
              <Form
                onSubmit={this.handleSubmit}
                style={{ width: "80%", paddingTop: "3vh" }}
              >
                <Form.Item>
                  {getFieldDecorator("username", {
                    rules: [
                      { required: true, message: "Please input your username!" }
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
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input your Password!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
              <br />
              Don't have an account? <Link to="/signup">Sign up</Link>
            </Spin>
          </Card>
        </div>
      </div>
    );
  }
}
const SignIn = Form.create({ name: "login" })(SignInForm);
export default SignIn;
