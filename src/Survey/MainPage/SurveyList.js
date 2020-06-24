import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { ListItem, ListItemText } from "@material-ui/core";
class SurveyList extends Component {
  render() {
    return this.props.surveys.map((item, i) => {
      return (
        <ListItem
          key={i}
          style={{
            margin: -10,
            wordBreak: "break-all"
          }}
        >
          <NavLink
            to={{ pathname: `/survey/${item.id}` }}
            activeStyle={{ textDecoration: "underline" }}
          >
            <ListItemText primary={item.title} />
          </NavLink>
        </ListItem>
      );
    });
  }
}

export default SurveyList;
