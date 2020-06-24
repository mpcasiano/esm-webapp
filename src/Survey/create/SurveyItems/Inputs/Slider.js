import React, { Fragment, Component } from "react";
import { Slider, Row, Radio, InputNumber, Button } from "antd";
import {
  SentimentVeryDissatisfied,
  SentimentVerySatisfied,
  SentimentSatisfied,
  SentimentDissatisfied
} from "@material-ui/icons";

const emoticons = {
  1: { label: <SentimentVeryDissatisfied /> },
  2: { label: <SentimentDissatisfied /> },
  3: {},
  4: { label: <SentimentSatisfied /> },
  5: { label: <SentimentVerySatisfied /> }
};

const likert = {
  1: { label: 1 },
  2: { label: 2 },
  3: { label: 3 },
  4: { label: 4 },
  5: { label: 5 }
};

class CustomSlider extends Component {
  state = {
    isEdit: false,
    askMinMax: "none",
    defaultValue: 3,
    min: 1,
    max: 5,
    marks: {},
    displayOptions: "block"
  };

  componentDidMount() {
    let state = this.props.sliderSettings;
    if (this.props.sliderSettings != null) {
      this.setState({ state });
    }
  }

  onSelect = value => {
    if (value === "likert") {
      this.setState({ marks: likert, min: 1, max: 5, askMinMax: "none" });
    } else if (value === "emoticons") {
      this.setState({ marks: emoticons, askMinMax: "none" });
    } else if (value === "cont") {
      this.setState({ min: 0, max: 100, askMinMax: "none", marks: {} });
    } else if (value === "disc") {
      this.setState({ askMinMax: "block", marks: {} });
    }
  };

  setSliderSettings = settings => {
    this.setState({ displayOptions: "none" });
    let slider = {
      min: settings.min,
      max: settings.max,
      marks: settings.marks
    };
    this.props.setSliderSettings(slider);
  };
  render() {
    return (
      <Fragment>
        <Row>
          <Slider
            defaultValue={this.state.defaultValue}
            max={this.state.max}
            min={this.state.min}
            marks={this.state.marks}
          />
        </Row>
        {/*-------SLIDER OPTIONS------ */}
        <Row style={{ display: this.state.displayOptions }}>
          Slider Options:
          <Radio.Group onChange={e => this.onSelect(e.target.value)}>
            <Radio value="cont">Continuous</Radio>
            <Radio value="disc">Discrete</Radio>
            <Radio value="likert">Likert Scale</Radio>
            <Radio value="emoticons">Emoticons</Radio>
          </Radio.Group>
        </Row>
        <Row style={{ display: this.state.askMinMax }}>
          Min: <InputNumber onChange={e => this.setState({ min: e })} /> Max:{" "}
          <InputNumber onChange={e => this.setState({ max: e })} />{" "}
        </Row>
        <Button
          style={{ display: this.state.displayOptions }}
          onClick={e => {
            this.setSliderSettings(this.state);
          }}
        >
          Done
        </Button>
      </Fragment>
    );
  }
}

export default CustomSlider;
