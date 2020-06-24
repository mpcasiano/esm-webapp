import React, { Fragment, Component } from "react";
import { Checkbox, Tooltip } from "antd";

class CheckBoxOpt extends Component {
  render() {
    return this.props.options.map((option, i) => {
      return (
        <Fragment key={i}>
          <Checkbox.Group style={{ display: "block" }}>
            <Checkbox value={option} key={i}>
              <Tooltip
                title="Click to edit text or delete option"
                overlayStyle={{ display: this.props.viewModeRender }}
              >
                <span onClick={e => this.props.editText(i, option)}>
                  {option}
                </span>
              </Tooltip>
            </Checkbox>
            <br />
          </Checkbox.Group>
        </Fragment>
      );
    });
  }
}

export default CheckBoxOpt;
