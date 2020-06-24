import React, { Fragment, Component } from "react";
import { Radio, Tooltip } from "antd";

class RadioOpt extends Component {
  state = {
    isEdit: false,
    options: []
  };

  renderRadioButtons() {
    return this.props.options.map((option, i) => {
      return (
        <Radio value={option} key={i} style={{ margin: 0, display: "block" }}>
          <Tooltip
            title="Click to edit text or delete option"
            overlayStyle={{ display: this.props.viewModeRender }}
          >
            <span onClick={e => this.props.editText(i, option)}>{option}</span>
          </Tooltip>
        </Radio>
      );
    });
  }
  render() {
    return (
      <Fragment>
        <Radio.Group style={{ display: "block" }}>
          {this.renderRadioButtons()}
        </Radio.Group>
      </Fragment>
    );
  }
}

export default RadioOpt;
