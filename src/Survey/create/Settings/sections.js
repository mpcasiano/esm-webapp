import React from "react";

import { Form, Icon, Button, InputNumber } from "antd";

let id = 0;

class Sections extends React.Component {
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    if (keys.length === 0) {
      return;
    }
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        //console.log('Received values of form: ', values);
        this.props.saveSection(keys.map(key => names[key]));
        console.log("saved!");
        //console.log('Merged values:', keys.map(key => names[key]));
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");
    const formItems = keys.map((k, index) => (
      <div
        key={k}
        style={{ height: "30px", lineHeight: "30px", marginBottom: "25px" }}
      >
        <span>from </span>
        <Form.Item style={{ display: "inline-block" }}>
          {getFieldDecorator(`names[${k}].firstNum`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [{ required: true, message: "Please input a number" }]
          })(<InputNumber min={1} />)}
        </Form.Item>
        <span> to </span>
        <Form.Item style={{ display: "inline-block" }}>
          {getFieldDecorator(`names[${k}].lastNum`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [{ required: true, message: "Please input a number" }]
          })(<InputNumber min={1} />)}
        </Form.Item>
        {keys.length >= 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            style={{ marginLeft: "10px" }}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </div>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          Input range of numbers you want to randomize
        </div>
        {formItems}
        <Form.Item>
          <Button type="dashed" onClick={this.add}>
            <Icon type="plus" /> Add Section
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedSections = Form.create({})(Sections);
export default WrappedSections;
