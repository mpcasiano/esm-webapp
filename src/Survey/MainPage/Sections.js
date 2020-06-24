import React from "react";
import { Col, Typography, Row } from "antd";
import "antd/dist/antd.css";
import Question from "./Question";

class Sections extends React.Component {
  editItem = () => {
    //do nothing unless editMode;
  };
  render() {
    return this.props.sections.map((item, i) => {
      return (
        <Row type="flex" align="middle" key={i}>
          <Col
            style={{
              //boxShadow: "0px 0px 13px #e8e8e8",
              borderRadius: "20px",
              padding: "5px 15px",
              marginBottom: 15,
              width: "100%"
            }}
            key={i}
          >
            <span>
              <Row>
                <Typography.Paragraph style={{ margin: "10px 0px" }}>
                  {item.title}
                </Typography.Paragraph>
              </Row>
              <Row>
                <Typography.Paragraph
                  style={{ marginBottom: 10 }}
                  type="secondary"
                >
                  {item.desc}
                </Typography.Paragraph>
              </Row>
              <Row type="flex" justify="center">
                <Question
                  data={item.survey_questions}
                  viewModeRender={"none"}
                  editItem={this.editItem}
                />
              </Row>
            </span>
          </Col>
        </Row>
      );
    });
  }
}

export default Sections;
