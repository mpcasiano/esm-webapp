import React from "react";
import { Spin, List, Empty } from "antd";
import visualResponse from "./ChartTypes";

class IndividualResponses extends React.Component {
  render() {
    const dataArray = this.props.data;
    if (dataArray) {
      return (
        <div>
          <div type="flex" align="middle" justify="center">
            <Spin spinning={this.props.loading} size="large" />
          </div>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 1,
              position: "top",
              margin: 5
            }}
            dataSource={dataArray}
            renderItem={user => (
              <div key={user.id}>
                {/* user ID: {user.id}*/}
                {visualResponse(user.data)}
              </div>
            )}
          />
        </div>
      );
    } else {
      return <Empty />;
    }
  }
}
export default IndividualResponses;
