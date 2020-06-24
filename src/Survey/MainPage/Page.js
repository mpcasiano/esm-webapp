import React, { Component, Fragment } from "react";
import {
  Col,
  Typography,
  Input,
  Row,
  Form,
  Button,
  message,
  Popconfirm
} from "antd";
import "antd/dist/antd.css";
import Sections from "./Sections";
import axios from "axios";

class SurveyPreview extends Component {
  state = {
    viewMode: true,
    viewModeRender: "",
    defaultState: true,
    modalVisibility: false,
    isEdit: false,
    editId: 0,
    surveyTitle: "",
    surveyDesc: "",
    items: [
      {
        question: "Type question here ...", //Main question
        description: "Add additional description here ...", //addition description for the question
        inputType: "",
        choices: [],
        isRequired: false
      }
    ],
    accessCode: null
  };

  deleteSurvey = id => {
    axios
      .delete("https://esm-api.herokuapp.com/api/delete-survey/" + id, {
        headers: { Authorization: "Bearer " + localStorage.usertoken }
      })
      .then(res => {
        this.props.updateSurveyList();
        message.success(res.data);
        //this.props.history.push("/survey");
      })
      .catch(err => {
        message.error("You are not authorized to delete this survey");
      });
  };

  renderTitleDescription = () => {
    if (this.state.viewMode) {
      return (
        <span>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            {this.state.surveyTitle}
          </Typography.Title>
          <Typography style={{ marginBottom: 20 }}>
            {this.state.surveyDesc}
          </Typography>
          <Button>Delete</Button>
        </span>
      );
    } else
      return (
        <span>
          <Typography.Title level={2}>Create Survey</Typography.Title>
          <Form.Item style={{ marginBottom: 0 }} required>
            <Input
              placeholder="Title"
              onChange={e => this.setState({ surveyTitle: e.target.value })}
            />
          </Form.Item>
          <Form.Item>
            <Input.TextArea
              placeholder="Description"
              onChange={e => this.setState({ surveyDesc: e.target.value })}
            />
          </Form.Item>
        </span>
      );
  };

  renderButton = () => {
    if (this.state.viewMode) {
      return (
        <Button
          type="primary"
          onClick={e =>
            this.setState({ viewMode: false, viewModeRender: "", isEdit: true })
          }
        >
          Edit
        </Button>
      );
    } else
      return (
        <Button
          type="primary"
          onClick={e =>
            this.setState({
              viewMode: true,
              viewModeRender: this.props.viewModeRender,
              isEdit: false
            })
          }
        >
          Save
        </Button>
      );
  };

  render() {
    return (
      <Fragment>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ height: "100%" }}
        >
          <Col span={17} style={{ margin: 5, marginTop: 20, height: "100%" }}>
            <Popconfirm
              title="Are you sure delete this survey?"
              onConfirm={e => {
                this.deleteSurvey(this.props.data.id);
              }}
              okText="Yes"
              cancelText="Cancel"
            >
              <Button
                style={{ float: "right", color: "#FF4D4F" }}
                type="link"
                size="small"
              >
                Delete
              </Button>
            </Popconfirm>
            <Typography.Title level={3} style={{ marginBottom: 0 }}>
              {this.props.data.title}
            </Typography.Title>
            <Typography style={{ marginBottom: 20 }}>
              {this.props.data.desc}
            </Typography>
            <Typography.Text type="secondary">Access code: </Typography.Text>
            <Typography.Text code copyable>
              {this.props.data.access_code}
            </Typography.Text>
            {this.props.data.desc_media && (
              <Row
                type="flex"
                justify="center"
                align="middle"
                style={{ marginTop: 20 }}
              >
                <img
                  src={`data:image/png;base64,${Buffer.from(
                    this.props.data.desc_media
                  ).toString("base64")}`}
                  alt="halu"
                  width="200"
                  height="200"
                />
              </Row>
            )}
            <Form>
              <Sections sections={this.props.data.survey_sections} />
              {/* {this.renderButton()} */}
            </Form>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default SurveyPreview;
