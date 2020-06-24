import React from "react";
import {
  Col,
  Typography,
  Row,
  Switch,
  Rate,
  Slider,
  InputNumber,
  Input,
  DatePicker,
  TimePicker,
  Upload,
  Tooltip,
  Popconfirm,
  Icon,
  Button
} from "antd";
import "antd/dist/antd.less";
import Radio from "../create/SurveyItems/Inputs/Radio";
import CheckBox from "../create/SurveyItems/Inputs/CheckBox";
import Uploader from "../create/SurveyItems/Inputs/Upload";

class Question extends React.Component {
  renderInputType = (itemType, choices) => {
    switch (itemType) {
      case 0:
        if (choices.marks != null) {
          return (
            <Slider min={choices.min} max={choices.max} marks={choices.marks} />
          );
        } else return <Slider min={choices.min} max={choices.max} />;
      case 1:
        return <Input.TextArea />;
      case 2:
        return <Radio options={choices} viewModeRender="none" />;
      case 3:
        return <Rate />;
      case 4:
        return <InputNumber />;
      case 5:
        return <CheckBox options={choices} viewModeRender="none" />;
      case 6:
        return <Slider min={choices.min} max={choices.max} />;
      case 7:
        return (
          <DatePicker.RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            placeholder={["Start Time", "End Time"]}
          />
        );
      case 8:
        return <TimePicker />;
      case 9:
        return <Input />;
      case 10:
        return <Upload.Dragger />;
      case 11:
        return <Input />;

      default:
        return <Input.TextArea />;
    }
  };
  render() {
    return this.props.data.map((item, i) => {
      return (
        <Tooltip
          title="Click to edit details"
          placement="right"
          overlayStyle={{ opacity: 0.5, display: this.props.viewModeRender }}
          key={i}
          trigger="hover"
        >
          <Col
            style={{
              boxShadow: "0px 0px 13px #e8e8e8",
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: "5px 15px",
              marginBottom: 15
            }}
            span={24}
            key={i}
          >
            <span onClick={e => this.props.editItem(i)}>
              <Row style={{ marginTop: 15 }}>
                <Typography.Paragraph
                  style={{
                    padding: 0,
                    marginBottom: 0
                  }}
                >
                  {item.question}
                </Typography.Paragraph>
              </Row>
              <Row>
                <Typography.Paragraph
                  type="secondary"
                  style={{
                    padding: 0,
                    marginTop: 0
                  }}
                >
                  {item.desc}
                </Typography.Paragraph>
              </Row>
              <Row>
                <Uploader fileList={item.fileList} uploaded={true} />
              </Row>
              <Row>
                <span style={{ margin: "20px 0px" }}>
                  {this.renderInputType(item.type, item.choices)}
                </span>
              </Row>
            </span>
            <Row>
              <span style={{ float: "right", margin: 10 }}>
                <Popconfirm
                  title="Are you sure delete this task?"
                  okText="Yes"
                  onConfirm={e => this.props.removeItem(i)}
                  cancelText="No"
                >
                  <Button
                    style={{
                      border: "none",
                      display: this.props.viewModeRender
                    }}
                  >
                    <Icon
                      type="delete"
                      theme="twoTone"
                      twoToneColor="#ff0000"
                    />
                    Delete{" "}
                  </Button>
                </Popconfirm>
                <Switch size="small" checked={item.is_required} /> Required
              </span>
            </Row>
          </Col>
        </Tooltip>
      );
    });
  }
}

export default Question;
