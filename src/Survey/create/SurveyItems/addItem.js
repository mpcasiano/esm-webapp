import React from "react";
import { Input, Switch, Col, Modal, Form } from "antd";
import "antd/dist/antd.css";
import InputTypes from "./Inputs/inputTypes";
import Uploader from "./Inputs/Upload";
import { decodeInput } from "./Inputs/input_decoder";

class AddSurveyItem extends React.Component {
  state = {
    question: "", //Main question
    desc: "", //addition description for the question
    type: "Select input type",
    choices: [],
    is_required: false,
    sliderSettings: {},
    questionError: { error: "none", errorMessage: "" },
    typeError: { error: "none", errorMessage: "" },
    fileList: [],
    uploaded: false
  };

  componentDidUpdate(prevProps) {
    const { setFieldsValue } = this.props.form;
    const values = this.props.values;
    if (prevProps.values !== this.props.values) {
      setFieldsValue({
        question: values.question,
        is_required: values.is_required,
        desc: values.desc
      });
      this.setState({
        question: values.question,
        desc: values.desc,
        is_required: values.is_required,
        type: values.type,
        choices: values.choices
      });
    }
  }

  enterText = (e, obj) => {
    this.setState({
      [obj]: e
    });
  };

  onInput = e => {
    this.setState({ str: e.target.value });
  };

  getInputType = type => {
    this.setState({ type });
  };

  isRequired = e => {
    this.setState({
      is_required: !this.state.is_required
    });
  };

  setOptions = choices => {
    this.setState({ choices });
  };

  setSliderSettings = settings => {
    this.setState({ choices: settings });
  };

  handleSubmit = resetFields => {
    var questionLength = this.state.question;
    if (questionLength.length < 1) {
      this.setState({
        questionError: {
          error: "error",
          errorMessage: "This field is required"
        },
        typeError: { error: "none", errorMessage: "" }
      });
    } else if (this.state.type === "Select input type") {
      this.setState({
        typeError: {
          error: "error",
          errorMessage: "This field is required"
        },
        questionError: { error: "none", errorMessage: "" }
      });
    } else {
      this.props.addItem(this.state);
      this.getInputType("Select response type");
      this.setState({
        question: "", //Main question
        desc: "", //addition description for the question
        type: "Select input type",
        choices: [],
        is_required: false,
        sliderSettings: {},
        questionError: { error: "none", errorMessage: "" },
        typeError: { error: "none", errorMessage: "" }
      });
      resetFields();
    }
  };

  handleUpload = ({ fileList }) => {
    console.log("fileList in items", fileList);
    //console.log("latest file: ", fileList[fileList.length - 1]);
    this.setState({ fileList: fileList, uploaded: true });
  };

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;

    return (
      <Modal
        visible={this.props.modalVisibility}
        onOk={e => {
          e.preventDefault();
          this.handleSubmit(resetFields);
        }}
        onCancel={e => {
          this.props.toggleModal();
          this.setState({ type: "Select Input Type" });
          resetFields();
        }}
        title="Add new Survey Item"
      >
        <Col>
          <Form>
            <Form.Item style={{ marginBottom: 2 }} name="is_required">
              {getFieldDecorator("is_required", {})(
                <Switch
                  size="small"
                  onChange={e => this.isRequired()}
                  checked={this.state.is_required}
                />
              )}{" "}
              Required
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 2 }}
              validateStatus={this.state.questionError.error}
              help={this.state.questionError.errorMessage}
            >
              {getFieldDecorator("question", {
                rules: [{ required: true, message: "This field is required!" }]
              })(
                <Input
                  placeholder="Enter question here..."
                  onChange={e => {
                    this.setState({ question: e.target.value });
                  }}
                />
              )}
            </Form.Item>
            <Form.Item style={{ marginBottom: 2 }} name="desc">
              {getFieldDecorator("desc", {
                rules: [{ required: false }]
              })(
                <Input.TextArea
                  placeholder="place additional description here..."
                  onChange={e => this.setState({ desc: e.target.value })}
                />
              )}
            </Form.Item>
            <Form.Item style={{ marginBottom: 2 }}>
              <Uploader
                handleUpload={this.handleUpload}
                fileList={this.state.fileList}
                uploaded={this.state.uploaded}
              />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 2 }}
              validateStatus={this.state.typeError.error}
              help={this.state.typeError.errorMessage}
            >
              {getFieldDecorator("type", {
                rules: [{ required: true, message: "This field is required!" }]
              })(
                <span style={{ margin: "15px 0px" }}>
                  <InputTypes
                    setInputType={this.getInputType}
                    newItem={this.props.modalVisibility}
                    isEdit={this.props.isEdit}
                    type={this.state.type}
                  />
                </span>
              )}
            </Form.Item>
            <Form.Item style={{ marginBottom: 2 }}>
              <span style={{ margin: "5px 0px" }}>
                {decodeInput(
                  this.state.type,
                  this.setOptions,
                  this.setSliderSettings
                )}
              </span>
            </Form.Item>
          </Form>
        </Col>
      </Modal>
    );
  }
}
const AddItem = Form.create({ name: "login" })(AddSurveyItem);
export default AddItem;
