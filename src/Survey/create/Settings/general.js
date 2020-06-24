import React from "react";
import { Checkbox, Radio, Select, Row } from "antd";
import PublicIcon from "@material-ui/icons/Public";
import LockIcon from "@material-ui/icons/Lock";

class GeneralSettings extends React.Component {
  render() {
    return (
      <div>
        <Select
          defaultValue="1"
          style={{ width: 120 }}
          onChange={this.props.savePrivacy}
        >
          <Select.Option value="1">
            <Row align="middle" type="flex">
              <PublicIcon fontSize="inherit" style={{ marginRight: 5 }} />
              Public
            </Row>
          </Select.Option>
          <Select.Option value="0">
            <Row align="middle" type="flex">
              <LockIcon fontSize="inherit" style={{ marginRight: 5 }} />
              Private
            </Row>
          </Select.Option>
        </Select>{" "}
        {this.props.isShared ? (
          <span type="inline">Everyone can see this survey</span>
        ) : (
          <span type="inline">
            You are the only one who can see this survey
          </span>
        )}
        <br /> <br />
        <div>
          <Radio.Group onChange={this.props.saveAnonymity} defaultValue={true}>
            Target participants:
            <br />
            <Radio value={true}>Anonymous users</Radio>
            <Radio value={false}>Registered users</Radio>
          </Radio.Group>
        </div>
        <br />
        <div>
          <Checkbox onChange={this.props.saveIsTest}>
            For test only (responses will not be saved)
          </Checkbox>
        </div>
      </div>
    );
  }
}

export default GeneralSettings;
