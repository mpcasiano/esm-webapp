import React, { Fragment, Component } from "react";
import { Form, Input, Col, Row, Button } from "antd";
import RadioOpt from "./Radio";
import CheckBox from "./CheckBox";

class AddOptions extends Component {
  state = {
    value: "",
    isEdit: false, //is the creator currently editing the survey form
    showDeleteBtn: "hidden",
    editOpt: "",
    idToEdit: 0,
    options: []
  };

  addOption = e => {
    e.preventDefault();
    let options = this.state.options;
    let value = this.state.value;
    let id = this.state.idToEdit;
    const addOpt = [...options, value];

    if (this.state.isEdit) {
      options.splice(id, 1, { value });
      this.props.addOptions(options);
      this.setState({ isEdit: false, showDeleteBtn: "hidden" });
    } else {
      this.props.addOptions(addOpt);
      this.setState({
        options: addOpt,
        value: ""
      });
    }
  };

  handleEdit = (i, opt) => {
    this.setState({
      editOpt: opt,
      isEdit: true,
      idToEdit: i,
      value: opt,
      showDeleteBtn: "visible"
    });
  };

  removeOption = () => {
    let options = this.state.options;
    let id = this.state.idToEdit;
    this.setState({
      options: options.slice(0, id).concat(options.slice(id + 1)),
      showDeleteBtn: "hidden",
      value: ""
    });
    this.props.addOptions(options.slice(0, id).concat(options.slice(id + 1)));
  };

  handleChange = e => {
    e.persist();
    this.setState({
      value: e.target.value
    });
  };

  renderResponseType = () => {
    if (this.state.options.length > 0) {
      if (this.props.responseType === "radio")
        return (
          <RadioOpt
            options={this.state.options}
            isEdit={this.state.isEdit}
            editText={this.handleEdit}
            viewModeRender={this.props.viewModeRender}
          />
        );
      else
        return (
          <CheckBox
            options={this.state.options}
            isEdit={this.state.isEdit}
            editText={this.handleEdit}
            viewModeRender={this.props.viewModeRender}
          />
        );
    } else return null;
  };

  render() {
    return (
      <Fragment>
        <Form.Item>
          <Row>Add {this.props.responseType} option:</Row>
          <Row>
            <Col span={20}>
              <Input
                type="text"
                value={this.state.value}
                name="inputValue"
                onChange={this.handleChange}
                onPressEnter={this.addOption}
                placeholder="Type here then press ENTER"
              />
            </Col>
            <Col span={4}>
              <Button
                type="danger"
                onClick={this.removeOption}
                style={{ visibility: this.state.showDeleteBtn }}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Form.Item>
        {this.renderResponseType()}
      </Fragment>
    );
  }
}

export default AddOptions;
