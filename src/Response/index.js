import React from "react";
import { Tabs } from "antd";
import IndividualResponses from "./IndividualResponses";
import SummaryResponses from "./SummaryResponses";
import axios from "axios";
class Visuals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataIndividual: [],
      dataSummary: [],
      totalEntries: 0,
      totalUsers: 0,
      title: "",
      loading: false
    };
  }
  componentDidMount() {
    // console.log('surveyID: ', this.props.surveyID)
    this.setState({ loading: true });
    axios
      .get(
        "https://esm-api.herokuapp.com/api/view-answers/" + this.props.surveyID,
        {
          headers: { Authorization: "Bearer " + localStorage.usertoken }
        }
      )
      .then(res => {
        if (res) {
          var numberOfEntries = 0;
          var numberOfUsers = 0;
          var questions = JSON.parse(JSON.stringify(res.data.questions));
          var users = JSON.parse(JSON.stringify(res.data.users));
          numberOfUsers = users.length;
          var dataResponses = [];
          users.forEach(user => {
            var questionsData = [];
            var records = JSON.parse(JSON.stringify(user.records));
            questions.forEach(q => {
              var qInfo = JSON.parse(JSON.stringify(q));
              var answersArr = qInfo.answers;
              numberOfEntries = qInfo.answers.length;
              var answers = [];
              records.forEach(tempRec => {
                var rec = JSON.parse(JSON.stringify(tempRec));
                answersArr.forEach((ans, i) => {
                  if (ans.record_id === rec.id) {
                    var info = {
                      record_id: rec.id,
                      timestamp: rec.timestamp,
                      answer: ans.answer
                    };
                    answers.push(info);
                    delete answersArr[i];
                  }
                });
              });
              qInfo.answers = answers;
              questionsData.push(qInfo);
            });
            user.data = questionsData;
            delete user.records;
            dataResponses.push(user);
          });

          this.setState({
            dataIndividual: dataResponses,
            dataSummary: res.data.questions,
            totalEntries: numberOfEntries,
            totalUsers: numberOfUsers,
            title: this.props.title,
            loading: false
          });
        }
      })

      .catch(err => {
        this.setState({
          dataIndividual: null,
          dataSummary: null,
          loading: false
        });
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div>
          <Tabs defaultActiveKey="1" tabBarStyle={{ textAlign: "center" }}>
            <Tabs.TabPane tab="Summary" key="1">
              <div style={{ margin: "auto", width: "50vw" }}>
                <SummaryResponses
                  data={this.state.dataSummary}
                  totalEntries={this.state.totalEntries}
                  totalUsers={this.state.totalUsers}
                  title={this.state.title}
                  loading={this.state.loading}
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Individual" key="2">
              <div style={{ margin: "auto", width: "50vw" }}>
                <IndividualResponses
                  data={this.state.dataIndividual}
                  loading={this.state.loading}
                />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Visuals;
