import React, { Component } from "react";
import { Card, Col, Row, Spin, Typography, Divider, Empty } from "antd";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import GroupIcon from "@material-ui/icons/Group";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import Chart from "react-apexcharts";
const moment = require("moment");

class SurveyForms extends Component {
  renderVisual = obj => {
    if (obj.data && obj.numOfEntries > 0) {
      var options = {
        chart: {
          height: 250,
          type: "line",
          toolbar: {
            show: false
          }
        },
        title: {
          text: "Records per day",
          align: "left"
        },
        stroke: {
          width: 7,
          curve: "smooth"
        },
        xaxis: {
          type: "category"
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1
          }
        },
        markers: {
          size: 4,
          colors: ["#FFA41B"],
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: {
            size: 7
          }
        },
        yaxis: {
          min: 0,
          title: {
            text: "No. of records"
          },
          tickAmount: 4,
          labels: {
            formatter: function(value) {
              if (value % 1 === 0) {
                return value;
              }
            }
          }
        }
      };
      var series = [
        {
          name: "Records",
          data: obj.data
        }
      ];
      return (
        <div id="chart">
          <Chart
            options={options}
            series={series}
            type="line"
            height={250}
            width={700}
            style={{
              marginLeft: -70
            }}
          />
        </div>
      );
    } else {
      return (
        <Empty
          description={<span style={{ opacity: "70%" }}>No records yet</span>}
        />
      );
    }
  };

  renderCard = obj => {
    const cardStyle = {
      borderRadius: "10px",
      backgroundColor: obj.cardColor
    };

    const avatarStyle = {
      fontSize: "40px",
      width: "60px",
      height: "60px",
      float: "right",
      backgroundColor: obj.font.color
    };

    return (
      <Col span={8}>
        <Card
          bordered={false}
          style={cardStyle}
          bodyStyle={{
            padding: "4%",
            paddingLeft: "5%"
          }}
        >
          <Row align="middle" type="flex">
            <Col span={12} style={obj.font}>
              <span style={obj.labelStyle}>{obj.title}</span>
              <Typography.Title level={3} style={obj.font}>
                {obj.count}
              </Typography.Title>
            </Col>
            <Col span={12}>
              <Avatar style={avatarStyle} variant="rounded">
                {obj.icon}
              </Avatar>
            </Col>
          </Row>
        </Card>
      </Col>
    );
  };

  computeNewRecords = records => {
    var today = moment().format("MMM DD");
    if (!records || records.length < 1) {
      return 0;
    } else if (records) {
      if (records[records.length - 1].x === today) {
        return records[records.length - 1].y;
      } else {
        return 0;
      }
    } else return 0;
  };

  render() {
    const surveys = this.props.surveys;
    if (surveys) {
      return (
        <div style={{ width: "60vw", margin: "auto", padding: 0 }}>
          {Object.keys(surveys).map((item, i) => (
            <div key={i}>
              <Row align="bottom" type="flex">
                <Col span={12} style={{ fontSize: "20px" }}>
                  {surveys[item].title}
                </Col>
                <Col span={12}>
                  <i style={{ float: "right" }}>
                    Active since {surveys[item].updatedAt}
                  </i>
                </Col>
              </Row>

              <br />

              <Row gutter={24}>
                {this.renderCard({
                  title: "New records",
                  count: "+" + this.computeNewRecords(surveys[item].records),
                  icon: <NewReleasesIcon fontSize="inherit" />,
                  font: {
                    color: "default"
                  },
                  labelStyle: {
                    opacity: "70%"
                  }
                })}
                {this.renderCard({
                  title: "Users",
                  count: surveys[item].numberOfParticipants,
                  icon: <GroupIcon fontSize="inherit" />,
                  font: {
                    color: "default"
                  },
                  labelStyle: {
                    opacity: "70%"
                  }
                })}
                {this.renderCard({
                  title: "Total records",
                  count: surveys[item].numberOfEntries,
                  icon: (
                    <AssignmentIcon
                      fontSize="inherit"
                      style={{ color: "#1890ff" }}
                    />
                  ),
                  font: {
                    color: "white"
                  },
                  cardColor: "#1890ff",
                  labelStyle: {
                    opacity: "100%"
                  }
                })}
              </Row>
              <Card
                style={{ marginTop: "20px", borderRadius: "10px" }}
                bordered={false}
              >
                <div
                  style={{
                    width: "60vw"
                  }}
                  type="flex"
                  align="middle"
                  justify="center"
                >
                  {this.renderVisual({
                    data: surveys[item].records,
                    numOfEntries: surveys[item].numberOfEntries
                  })}
                </div>
              </Card>
              <Divider />
            </div>
          ))}
        </div>
      );
    }
  }
}

export default SurveyForms;
