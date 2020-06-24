import React from "react";
import Chart from "react-apexcharts";
import { List, Card, Empty } from "antd";
import Avatar from "@material-ui/core/Avatar";

function visualResponse(dataResponse) {
  if (dataResponse) {
    return Object.keys(dataResponse).map((item, i) => (
      <div key={i} type="flex">
        <Card
          style={{ marginBottom: "50px", marginTop: "20px" }}
          title={dataResponse[item].question}
          extra={<Avatar variant="rounded">Q{i + 1}</Avatar>}
          bordered={false}
          headStyle={{ marginTop: 0, marginBottom: 0 }}
        >
          <div
            style={{
              width: "40vw"
            }}
          >
            {renderChart({
              questionType: dataResponse[item].type,
              index: i,
              choices: JSON.parse(dataResponse[item].choices),
              answers: dataResponse[item].answers
            })}
          </div>
        </Card>
      </div>
    ));
  } else {
    return <Empty />;
  }
}

function renderChart(p) {
  var resData = [];
  if (p.questionType === 0 || p.questionType === 3) {
    //slider scale, rating scale

    for (let i = p.choices.min - 1; i < p.choices.max; i++) {
      resData[i] = {
        x: String(i + 1),
        y: 0
      };
    }
    p.answers.forEach(d => {
      var answer = parseInt(d.answer, 10) - 1;
      resData[String(answer)].y++;
    });

    const options = {
      chart: {
        id: "chart",
        toolbar: {
          show: false
        }
      },
      xaxis: {
        type: "category",
        title: {
          text: "Category"
        }
      },
      yaxis: {
        title: {
          text: "no. of responses"
        }
      }
    };

    const series = [{ name: "Responses", data: resData }];

    return (
      <div id="chart" align="center">
        <Chart
          options={options}
          series={series}
          type="bar"
          height={300}
          width={400}
        />
      </div>
    );
  } else if (p.questionType === 5) {
    //checklist

    p.choices.forEach(choice => {
      resData[choice] = {
        x: choice,
        y: 0
      };
    });

    p.answers.forEach(d => {
      var stringArray = d.answer.split(",");
      stringArray.forEach(answer => {
        resData[answer].y++;
      });
    });
    var data = [];

    for (var d in resData) {
      data.push(resData[d]);
    }

    const options = {
      chart: {
        id: "chart",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        type: "category",
        title: {
          text: "no. of responses"
        }
      }
    };

    const series = [{ name: "Responses", data: data }];
    return (
      <div id="chart" align="middle">
        <Chart
          options={options}
          series={series}
          type="bar"
          height={300}
          width={400}
        />
      </div>
    );
  } else if (
    p.questionType === 1 ||
    p.questionType === 4 ||
    p.questionType === 6 ||
    p.questionType === 7 ||
    p.questionType === 8 ||
    p.questionType === 10 ||
    p.questionType === 11
  ) {
    //free text entry, numeric entry, number wheel, date&time, time, media, webpage
    return (
      <div style={{ height: "50vh", width: "40vw", overflow: "auto" }}>
        <List
          size="small"
          dataSource={p.answers}
          renderItem={item => (
            <div>{item.answer && <List.Item>{item.answer}</List.Item>}</div>
          )}
        />
      </div>
    );
  } else if (p.questionType === 2) {
    //multiple choice
    resData = [];
    p.choices.forEach(choice => {
      resData[choice] = {
        x: choice,
        y: 0
      };
    });

    p.answers.forEach(d => {
      resData[d.answer].y++;
    });

    var labels = [];
    var dataSeries = [];

    var index = 0;
    for (d in resData) {
      labels[index] = resData[d].x;
      dataSeries[index] = resData[d].y;
      index++;
    }

    const options = {
      chart: {
        width: 380,
        type: "pie",
        toolbar: {
          show: false
        }
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            }
          }
        }
      ]
    };
    const series = dataSeries;
    return (
      <div id="chart">
        <Chart
          options={options}
          series={series}
          type="pie"
          width={380}
          style={{
            display: "flex",
            justifyContent: "center",
            verticalAlign: "middle"
          }}
        />
      </div>
    );
  } else {
    return <div>others</div>;
  }
}

export default visualResponse;
