import React, { Fragment, Component } from "react";
import { Form, Row, Col, Select, Slider, Radio, Input } from "antd";
import "antd/dist/antd.css";

const { Option } = Select;
class DBT extends Component {
  state = {};

  render() {
    const slider05 = {
      min: 0,
      max: 5,
      style: { width: 250, float: "right" },
      marks: { 0: "0", 5: "5" }
    };

    const labels = {
      style: { float: "right" }
    };
    return (
      <Fragment>
        <span style={{ width: "100%", height: "100%" }}>
          <Row type="flex" justify="space-between">
            <Form.Item label="Select Day">
              <Select defaultValue="Sunday">
                <Option value="Sunday">Sunday</Option>
                <Option value="Monday">Monday</Option>
                <Option value="Tuesday">Tuesday</Option>
                <Option value="Wednesday">Wednesday</Option>
                <Option value="Thursday">Thursday</Option>
                <Option value="Friday">Friday</Option>
                <Option value="Saturday">Saturday</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Self-Harm">
              <Radio.Group>
                <Radio.Button value="Yes">Yes</Radio.Button>
                <Radio.Button value="No">No</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Skills" {...labels}>
              <Slider
                min={0}
                max={7}
                style={{ width: 250 }}
                marks={{
                  0: "0",
                  7: "7"
                }}
              />
            </Form.Item>
          </Row>
        </span>
        <Row type="flex" style={{ marginTop: 15 }}>
          <Col span={12} style={{ padding: 5 }}>
            <h4>Highest Urge To:</h4>
            <Form.Item label="Commit Suicide" {...labels}>
              <Slider {...slider05} />
            </Form.Item>

            <Form.Item label="Self-harm" {...labels}>
              <Slider {...slider05} />
            </Form.Item>

            <Form.Item label="Use Drugs" {...labels}>
              <Slider {...slider05} />
            </Form.Item>
          </Col>

          <Col span={12} style={{ padding: 5 }}>
            <h4>Highest Rating for Each Day:</h4>
            <Form.Item label="Emotion Misery" {...labels}>
              <Slider {...slider05} />
            </Form.Item>

            <Form.Item label="Physical Misery" {...labels}>
              <Slider {...slider05} />
            </Form.Item>

            <Form.Item label="Joy" {...labels}>
              <Slider {...slider05} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item label="Alcohol">
              <Row type="flex" align="top" justify="space-between">
                <Col span={4}>
                  <Input placeholder="#" />
                </Col>
                <Col span={20}>
                  <Input placeholder="What?" />
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Illcit Drugs">
              <Row type="flex" align="top" justify="space-between">
                <Col span={4}>
                  <Input placeholder="#" />
                </Col>
                <Col span={20}>
                  <Input placeholder="What?" />
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Meds.as Prescribed">
              <Row type="flex" align="top" justify="space-between">
                <Col span={4}>
                  <Input placeholder="#" />
                </Col>
                <Col span={20}>
                  <Input placeholder="What?" />
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="PRN/Over the Counter">
              <Row type="flex" align="top" justify="space-between">
                <Col span={4}>
                  <Input placeholder="#" />
                </Col>
                <Col span={20}>
                  <Input placeholder="What?" />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default DBT;
