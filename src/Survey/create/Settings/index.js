import React from "react";
import { Modal, Button, Icon, Tabs, Typography, Radio, TimePicker } from "antd";
import Sections from "./sections";
import GeneralSettings from "./general";

class SurveySettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      sections: [],
      frequency: 0,
      is_test: 0,
      is_shared: true,
      start: null,
      end: null,
      anonymity: true
    };
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    //console.log(e);
    let x = this.state;
    var options = {};
    options.sections = x.sections;
    options.frequency = x.frequency;
    options.is_test = x.is_test;
    options.is_shared = x.is_shared;
    options.start = x.start;
    options.end = x.end;
    options.anonymity = x.anonymity;

    this.props.saveOptions(options);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    //console.log(e);

    this.setState({
      visible: false
    });
  };

  saveSection = data => {
    this.setState({ sections: data });
  };

  saveIsTest = data => {
    if (data.target.checked) {
      this.setState({ is_test: 1 });
    } else {
      this.setState({ is_test: 0 });
    }
  };

  saveFrequency = data => {
    this.setState({ frequency: data.target.value });
  };

  startTime = time => {
    console.log("start time: ", time);
    this.setState({ start: time });
  };

  endTime = time => {
    console.log("end time: ", time);
    this.setState({ end: time });
  };

  savePrivacy = value => {
    if (value === "0" || value === 0) {
      this.setState({ is_shared: false });
    } else {
      this.setState({ is_shared: true });
    }
  };

  saveAnonymity = data => {
    this.setState({ anonymity: data.target.value });
  };

  render() {
    return (
      <div>
        <Icon
          type="setting"
          onClick={this.showModal}
          style={{ float: "right", fontSize: "20px" }}
          theme="twoTone"
        />

        <Modal
          title="Settings"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Done
            </Button>
          ]}
        >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="General" key="1">
              <GeneralSettings
                saveIsTest={this.saveIsTest}
                saveFrequency={this.saveFrequency}
                frequency={this.state.frequency}
                isShared={this.state.is_shared}
                savePrivacy={this.savePrivacy}
                saveAnonymity={this.saveAnonymity}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Sections" key="2">
              <Sections saveSection={this.saveSection} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Notifications" key="3">
              <div>
                <Typography> Set Notification timer:</Typography>
                <Radio.Group onChange={this.saveFrequency} defaultValue={1}>
                  <Radio key="0" value="once">
                    Once
                  </Radio>
                  <Radio key="1" value="daily">
                    Daily
                  </Radio>
                  <Radio key="2" value="random">
                    Random
                  </Radio>
                </Radio.Group>
              </div>
              <br />
              <div>
                Set survey time frame: <br />
                <div>
                  <TimePicker
                    use12Hours
                    placeholder="Start time"
                    onChange={this.startTime}
                  />

                  <Typography.Text type="secondary"> ~ </Typography.Text>

                  <TimePicker
                    use12Hours
                    placeholder="End time"
                    onChange={this.endTime}
                  />
                </div>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </Modal>
      </div>
    );
  }
}

export default SurveySettings;
