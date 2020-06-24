import React from "react";
import {
  Icon,
  Button,
  Form,
  Input,
  Col,
  Row,
  Typography,
  Tooltip,
  message,
  Spin
  // Upload
} from "antd";
import "antd/dist/antd.css";
import AddSurveyItem from "./SurveyItems/addItem";
import Question from "../MainPage/Question";
import SurveySettings from "./Settings";
import Uploader from "./SurveyItems/Inputs/Upload";
import axios from "axios";

class CreateSurvey extends React.Component {
  state = {
    viewMode: false,
    viewModeRender: "",
    defaultState: true,
    modalVisibility: false,
    isEdit: false,
    editId: 0,
    title: "",
    desc: "",
    item: {
      question: "Type question here ...", //Main question
      desc: "Add additional description here ...", //addition description for the question
      type: "",
      choices: [],
      is_required: false
    },
    items: [],
    options: {
      sections: [],
      frequency: 0,
      is_test: 0,
      is_shared: false,
      start: "",
      end: "",
      anonymity: true
    },
    questionError: { error: "none", errorMessage: "" },
    loading: false,
    fileList: [],
    uploaded: false
  };

  componentDidMount() {
    let items = [...this.state.items, this.state.item];
    this.setState({ items });
  }

  addItem = item => {
    let items = this.state.items;
    const addItem = [...items, item];
    if (this.state.isEdit) {
      items.splice(this.state.editId, 1, item);
      this.setState({
        isEdit: false,
        modalVisibility: !this.state.modalVisibility,
        item: {
          question: "Type question here ...", //Main question
          description: "Add additional description here ...", //addition description for the question
          type: "",
          choices: [],
          is_required: false
        }
      });
    } else {
      this.setState({
        modalVisibility: !this.state.modalVisibility,
        isEdit: false,
        items: addItem
      });
    }
  };

  editItem = id => {
    if (!this.state.isEdit) {
      this.setState({
        item: this.state.items[id],
        isEdit: true,
        editId: id,
        modalVisibility: !this.state.modalVisibility
      });
    }
  };

  removeItem = id => {
    let items = this.state.items;
    this.setState({
      items: items.slice(0, id).concat(items.slice(id + 1))
    });
  };

  toggleModal = () => {
    if (this.state.isEdit) {
      this.setState({ isEdit: !this.state.isEdit });
    }
    this.setState({
      modalVisibility: !this.state.modalVisibility
    });
  };

  addNewQuestion = e => {
    this.toggleModal();
  };

  handleUpload = ({ fileList }) => {
    console.log("fileList", fileList);
    //console.log("latest file: ", fileList[fileList.length - 1]);
    this.setState({ fileList: fileList, uploaded: true });
  };

  renderTitleDescription = () => {
    if (this.state.viewMode) {
      return (
        <span>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            {this.state.title}
          </Typography.Title>
          <Typography style={{ marginBottom: 20 }}>
            {this.state.desc}
          </Typography>
        </span>
      );
    } else
      return (
        <span>
          <Typography.Title level={2}>Create Survey</Typography.Title>
          <Form.Item
            style={{ marginBottom: 0 }}
            name="title"
            rules={[{ required: true, message: "Please input your note!" }]}
            validateStatus={this.state.questionError.error}
            help={this.state.questionError.errorMessage}
          >
            <Input
              placeholder="Title"
              onChange={e => this.setState({ title: e.target.value })}
            />
          </Form.Item>
          <Form.Item name="desc" style={{ marginBottom: 0 }}>
            <Input.TextArea
              placeholder="Description"
              onChange={e => this.setState({ desc: e.target.value })}
              style={{ marginBottom: 0, paddingBottom: 0 }}
            />
          </Form.Item>
          <Form.Item style={{ margin: 0, padding: 0 }}>
            <Uploader
              handleUpload={this.handleUpload}
              fileList={this.state.fileList}
              uploaded={this.state.uploaded}
            />
          </Form.Item>
        </span>
      );
  };

  renderButton = () => {
    if (this.state.viewMode) {
      return (
        <Button
          type="primary"
          onClick={e =>
            this.setState({ viewMode: false, viewModeRender: "", isEdit: true })
          }
        >
          Edit
        </Button>
      );
    } else
      return (
        <Button type="primary" onClick={e => this.createSurveyItem(e)}>
          Save
        </Button>
      );
  };

  createSections = () => {
    //MAKING SECTIONS
    var dts = {};
    dts.secs = [];
    var itemsLength = this.state.items.length;

    const sections = this.state.options.sections;
    let tempSections = sections;
    var a = -1; //index of sections in dataToSend
    var x = 0; //index of sections in this.state
    var flag = 1; //1 if first time to create section
    var end = false;
    var random = 0; //isRandom
    var items = this.state.items;

    items.forEach((item, i) => {
      var num = i + 1;
      item.order_id = num;

      if (!end) {
        if (tempSections[x]) {
          if (
            num >= parseInt(tempSections[x].firstNum, 10) &&
            num <= parseInt(tempSections[x].lastNum, 10)
          ) {
            random = 1;
            if (num === parseInt(tempSections[x].firstNum, 10)) {
              flag = 1;
            }
          } else {
            random = 0;
          }
        } else {
          random = 0;
        }

        if (flag === 1) {
          a = a + 1;
          dts.secs[a] = {};
          dts.secs[a].is_random = random;
          dts.secs[a].title = null;
          dts.secs[a].desc = null;
          dts.secs[a].order_id = a;
          dts.secs[a].questions = [];
          flag = 0;
        }
        dts.secs[a].questions.push(item);

        if (tempSections[x] && num === parseInt(tempSections[x].lastNum, 10)) {
          flag = 1;
          x = x + 1; //proceed next section in this.state
        }
        if (num === itemsLength) {
          end = true;
        }
      }
    });
    return dts.secs;
  };

  createSurveyItem = e => {
    var title = this.state.title;
    if (title.length < 1) {
      e.preventDefault();
      this.setState({
        questionError: {
          error: "error",
          errorMessage: "This field is required"
        }
      });
    } else {
      //Data to send:
      var dataToSend = {};
      dataToSend.title = this.state.title;
      dataToSend.desc = this.state.desc;
      dataToSend.frequency = this.state.options.frequency;
      dataToSend.is_test = this.state.options.is_test;
      dataToSend.is_shared = this.state.options.is_shared;
      dataToSend.start = this.state.options.start;
      dataToSend.end = this.state.options.end;
      dataToSend.anonymity = this.state.options.anonymity;
      dataToSend.sections = this.createSections();
      // console.log("dataToSend: ", dataToSend);

      var formData = new FormData();
      formData.append("survey", JSON.stringify(dataToSend));
      if (this.state.fileList[0]) {
        var filelist = this.state.fileList[0].originFileObj;
        formData.append("descMedia", filelist);
      }
      this.setState({ loading: true });
      //API
      axios
        .post("https://esm-api.herokuapp.com/api/create-survey", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.usertoken,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response);
          this.setState({ loading: false });
          message.success(response.data);
          this.setState({
            viewMode: true,
            viewModeRender: "none",
            defaultState: false
          });
          this.props.addData(this.state);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  viewSurvey = () => {
    this.setState({ viewMode: this.props.setToView });
  };

  saveOptions = data => {
    this.setState({ options: data });
  };

  render() {
    if (!this.state.loading) {
      return (
        <Row type="flex" justify="center" align="middle">
          <Col span={15} style={{ margin: 5, marginTop: 20 }}>
            <Form>
              <SurveySettings saveOptions={this.saveOptions} />
              {this.renderTitleDescription()}
              {/*-------------ADD NEW SURVEY ITEM MODAL----------- */}
              <AddSurveyItem
                values={this.state.item}
                modalVisibility={this.state.modalVisibility}
                addItem={this.addItem}
                toggleModal={this.toggleModal}
                isEdit={this.state.isEdit}
                editItem={this.editItem}
              />

              {/*-------------RENDER ALL SURVEY ITEMS--------- */}
              <Form.Item>
                <Question
                  data={this.state.items}
                  removeItem={this.removeItem}
                  editItem={this.editItem}
                  toggleModal={this.toggleModal}
                  viewModeRender={this.state.viewModeRender}
                />
              </Form.Item>
              {this.renderButton()}
            </Form>
          </Col>
          <Col
            span={1}
            style={{ float: "right", display: this.state.viewModeRender }}
          >
            <Tooltip title="Add new question/item">
              <Button type="dashed" onClick={this.addNewQuestion}>
                <Icon
                  type="plus-circle"
                  theme="twoTone"
                  twoToneColor="#1790FF"
                />
              </Button>
            </Tooltip>
          </Col>
        </Row>
      );
    } else {
      return (
        <Row type="flex" justify="center" align="middle">
          <Spin size="large" tip="Saving..." />
        </Row>
      );
    }
  }
}

const WrappedApp = Form.create({ name: "coordinated" })(CreateSurvey);
export default WrappedApp;
