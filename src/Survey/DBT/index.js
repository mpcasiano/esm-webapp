import React from "react";
import {
  Tabs,
  Col,
  Row,
  Typography,
  Form,
  Input,
  DatePicker,
  Radio
} from "antd";
import DBTForm from "./Page";
import Responses from "./responses";
import "antd/dist/antd.css";

const { TabPane } = Tabs;
class DBT extends React.Component {
  state = {};

  render() {
    return (
      <Row type="flex" justify="center" style={{ height: "100%" }}>
        <Col span={22} style={{ margin: 5, marginTop: 20, height: "100%" }}>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            Dialectal Behavior Therapy
          </Typography.Title>
          <Typography>Skills Diary Card</Typography>
          {/*-----------------TABPANE GOES HERE -------------*/}
          <Tabs defaultActiveKey="2">
            <TabPane tab="Preview" key="1">
              <Row type="flex" justify="center" align="middle">
                <Col
                  span={20}
                  style={{
                    margin: 5,
                    height: "100%"
                  }}
                >
                  <Form layout="inline">
                    <Row
                      style={{
                        backgroundColor: "#FFF",
                        padding: 15,
                        borderRadius: 20
                      }}
                    >
                      <Form.Item label="Initials">
                        <Input />
                      </Form.Item>
                      <Form.Item label="ID #">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Filled out in Session?">
                        <Radio.Group>
                          <Radio.Button value="Yes">Yes</Radio.Button>
                          <Radio.Button value="No">No</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item label="How often do you fill out this side?">
                        <Radio.Group>
                          <Radio value="daily">Daily</Radio>
                          <Radio value="2to3">2-3 times</Radio>
                          <Radio value="4to6">4-6 times</Radio>
                          <Radio value="once">Once</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item label="Date Started">
                        <DatePicker />
                      </Form.Item>
                    </Row>
                    <Row
                      type="flex"
                      style={{
                        backgroundColor: "#FFF",
                        padding: 15,
                        marginTop: 15,
                        borderRadius: 20
                      }}
                    >
                      <DBTForm />
                    </Row>
                  </Form>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Responses" key="2">
              <Responses />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

export default DBT;
