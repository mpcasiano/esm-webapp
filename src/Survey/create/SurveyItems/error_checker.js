import React from "react";

export const handleSubmit = state => {
  var questionLength = this.state.question;
  if (questionLength.length < 1) {
    this.setState({
      questionError: {
        error: "error",
        errorMessage: "This field is required"
      },
      typeError: { error: "none", errorMessage: "" }
    });
  } else if (this.state.type === "Select input type") {
    this.setState({
      typeError: {
        error: "error",
        errorMessage: "This field is required"
      },
      questionError: { error: "none", errorMessage: "" }
    });
  } else {
    this.props.addItem(this.state);
    this.getInputType("Select response type");
    this.setState({
      question: "", //Main question
      desc: "", //addition description for the question
      type: "Select input type",
      choices: [],
      is_required: false,
      sliderSettings: {},
      questionError: { error: "none", errorMessage: "" },
      typeError: { error: "none", errorMessage: "" }
    });
  }
};
