import React from "react";
import { Row, Col, Select } from "antd";
import {
  RadioButtonChecked,
  CheckBox,
  Tune,
  Grade,
  TextFields,
  Today,
  Schedule,
  Photo,
  Http,
  ExposurePlus1
} from "@material-ui/icons";
import "antd/dist/antd.less";
const { Option } = Select;

class InputTypes extends React.Component {
  state = {
    value: 1,
    responseType: "Select response type"
  };

  onSelect = e => {
    this.props.setInputType(e);
    this.setState({ responseType: e });
  };

  onNewItem = () => {
    this.setState({ responseType: "Select response type" });
  };

  responseType = () => {
    if (this.props.isEdit) {
      return this.state.responseType;
    } else return "Select response type";
  };

  render() {
    return (
      <Col span={10}>
        <Select
          onChange={this.onSelect}
          placeholder="Select Response Type"
          value={this.props.type}
        >
          <Option value={2}>
            <Row type="flex" align="middle">
              <RadioButtonChecked fontSize="small" /> Option
            </Row>
          </Option>
          <Option value={5}>
            <Row type="flex" align="middle">
              <CheckBox fontSize="small" /> Checkbox
            </Row>
          </Option>
          <Option value={0}>
            <Row type="flex" align="middle">
              <Tune fontSize="small" /> Slider Scale
            </Row>
          </Option>
          <Option value={3}>
            <Row type="flex" align="middle">
              <Grade fontSize="small" /> Rating
            </Row>
          </Option>
          <Option value={4}>
            <Row type="flex" align="middle">
              <ExposurePlus1 fontSize="small" /> Numeric Entry
            </Row>
          </Option>
          <Option value={9}>
            <Row type="flex" align="middle">
              <TextFields fontSize="small" /> Text Entry
            </Row>
          </Option>
          <Option value={7}>
            <Row type="flex" align="middle">
              <Today fontSize="small" /> Date and Time
            </Row>
          </Option>
          <Option value={8}>
            <Row type="flex" align="middle">
              <Schedule fontSize="small" /> Amount of Time
            </Row>
          </Option>
          <Option value={6}>
            <Row type="flex" align="middle">
              <ExposurePlus1 fontSize="small" /> Number Wheel
            </Row>
          </Option>
          <Option value={1}>
            <Row type="flex" align="middle">
              <TextFields fontSize="small" /> Free Text
            </Row>
          </Option>
          <Option value={10}>
            <Row type="flex" align="middle">
              <Photo fontSize="small" />
              {" \t"}Photo File
            </Row>
          </Option>
          <Option value={11}>
            <Row type="flex" align="middle">
              <Http fontSize="small" /> Webpage Entry
            </Row>
          </Option>
        </Select>
      </Col>
    );
  }
}

export default InputTypes;
