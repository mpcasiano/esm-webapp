import React, { Component, Fragment } from "react";
import { Icon, Button, Col, Row, Tabs, Tooltip, Spin } from "antd";
import { Link } from "react-router-dom";
import { List } from "@material-ui/core";
import ViewResponses from "./Response/ViewResponses";
import Respondents from "./Response/Respondents";
import SurveyTabs from "./MainPage/SurveyList";
import Create from "./create";
import Page from "./MainPage/Page";
import "antd/dist/antd.less";
import Visuals from "../Response";
class Surveys extends Component {
  state = {
    defaultItem: {
      title: "New Survey",
      items: []
    },
    survey: {},
    surveys: [],
    defaultActiveKey: "1",
    isEdit: false
  };

  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.usertoken);
    fetch("https://esm-api.herokuapp.com/api/view-all-survey", {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ surveys: result });
      })
      .catch(error => console.log("error", error));
  }

  updateSurveyList = () => {
    console.log("survey was deleted");
    this.setState({ loading: true });
    this.componentDidMount();
  };

  addData = data => {
    if (this.props.url === "/survey/create") {
      let surveys = this.state.surveys;
      surveys.splice(surveys.length - 1, 1, data);
      this.setState({
        surveys,
        survey: data,
        createNew: false,
        isEdit: !this.state.isEdit
      });
      this.props.redirect(surveys.length - 1);
    } else {
      let surveys = [...this.state.surveys, data];
      this.setState({ surveys });
      this.props.redirect(surveys.length - 1);
    }
  };

  isEdit = () => {
    this.setState({ isEdit: !this.state.isEdit });
  };

  newSurvey = () => {
    let surveys = [...this.state.surveys, this.state.defaultItem];
    this.setState({ surveys });
  };

  renderComponents = () => {
    let url = this.props.url;
    if (url === "/survey/create")
      //render create survey layout
      return (
        <Tabs defaultActiveKey="0">
          <Tabs.TabPane tab="Preview" key="0">
            <Create addData={this.addData} isNew={true} />
          </Tabs.TabPane>
        </Tabs>
      );
    else if (this.state.surveys.length > 0 && url.length > 7) {
      //render survey[id]
      let id = url.slice(8); //get id after 8 characters in `/survey/`
      let survey = this.state.surveys.find(survey => {
        return survey.id == id;
      });
      if (survey && survey.survey_sections) {
        return (
          <Tabs defaultActiveKey="0">
            <Tabs.TabPane tab="Preview" key="0">
              <Page data={survey} updateSurveyList={this.updateSurveyList} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Responses" key="1">
              <ViewResponses survey={survey} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Respondents" key="2">
              <Respondents />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Visuals" key={id}>
              <Visuals surveyID={id} title={survey.title} />
            </Tabs.TabPane>
          </Tabs>
        );
      } else return null;
    }
  };

  render() {
    if (this.state.surveys.length > 0) {
      return (
        <Fragment>
          <Row type="flex" style={{ height: "100vh", overflow: "hidden" }}>
            <Col
              span={4}
              style={{
                marginTop: 0,
                backgroundColor: "#fff",
                borderLeft: "1px solid #eaeaea",
                padding: "20px"
              }}
            >
              <Row
                type="flex"
                align="middle"
                justify="space-between"
                style={{ marginBottom: 10 }}
              >
                <h1>Surveys </h1>
                <Tooltip
                  title="Create new Survey!"
                  trigger="hover"
                  placement="right"
                >
                  <Button
                    style={{
                      border: "none",
                      float: "right",
                      marginTop: "-10px"
                    }}
                    onClick={e => this.newSurvey()}
                  >
                    <Link to="/survey/create">
                      <Icon
                        type="plus-circle"
                        theme="twoTone"
                        twoToneColor="#1790FF"
                        style={{ fontSize: "16px" }}
                      />
                    </Link>
                  </Button>
                </Tooltip>
              </Row>
              <List disablePadding dense>
                <SurveyTabs surveys={this.state.surveys} />
              </List>
            </Col>
            <Col span={20} style={{ height: "100%", overflow: "scroll" }}>
              {this.renderComponents()}
            </Col>
          </Row>
        </Fragment>
      );
    }
    //display loading screen
    else
      return (
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ height: "100%" }}
        >
          <Col>
            <Spin size="large" />
          </Col>
        </Row>
      );
  }
}

export default Surveys;
