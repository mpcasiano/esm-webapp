import React from "react";
import HasOptions from "./addOption";
import CustomSlider from "./Slider";
import Dragger from "./Dragger";
import { Rate, InputNumber, Slider, Input, DatePicker, TimePicker } from "antd";

export const encodeInput = inputType => {
  if (inputType === "option") {
    return 2;
  } else if (inputType === "checkbox") {
    return 5;
  } else if (inputType === "slider scale") {
    return 0;
  } else if (inputType === "rating") {
    return 3;
  } else if (inputType === "numeric entry") {
    return 4;
  } else if (inputType === "text entry") {
    return 9;
  } else if (inputType === "date and time") {
    return 7;
  } else if (inputType === "amount of time") {
    return 8;
  } else if (inputType === "number wheel") {
    return 6;
  } else if (inputType === "free text") {
    return 1;
  } else if (inputType === "photo file") {
    return 10;
  } else if (inputType === "webpage entry") {
    return 11;
  }
};
export const decodeInput = (type, setOptions, setSliderSettings) => {
  switch (type) {
    case 2:
      return <HasOptions addOptions={setOptions} responseType="radio" />;
    case 5:
      return <HasOptions addOptions={setOptions} responseType="checkbox" />;
    case 0:
      return <CustomSlider setSliderSettings={setSliderSettings} />;
    case 3:
      return <Rate />;
    case 4:
      return <InputNumber />;
    case 9:
      return <Input />;
    case 7:
      return (
        <DatePicker.RangePicker
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
          placeholder={["Start Time", "End Time"]}
        />
      );
    case 8:
      return <TimePicker />;
    case 6:
      return <Slider />;
    case 1:
      return <Input.TextArea />;
    case 10:
      return <Dragger />;
    case 11:
      return <Input />;

    default:
      return <Input.TextArea />;
  }
};
