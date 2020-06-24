import React, { Fragment, Component } from "react";
import { Upload, Button, Spin, Tooltip } from "antd";

class Uploader extends Component {
  state = {
    isLoading: false,
    fileList: []
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    // console.log("getBase64 img: ", img, typeof img);
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  beforeUpload = file => {
    const isImgorVid =
      file.type.includes("image") || file.type.includes("video");
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      console.error("Image must smaller than 2MB!");
    }
    return isImgorVid && isLt2M;
  };

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ isLoading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          isLoading: false,
          fileList: imageUrl
        });
      });
    }
  };

  removeUpload = info => {
    this.setState({ fileList: [], imageUrl: "" });
  };

  preview = info => {
    console.log("fileList: ", this.state.fileList);
    console.log("preview", info);
  };

  render() {
    /*const uploadButton = (
      <div>
        {this.state.isLoading ? (
          <Spin size="small" />
        ) : (
          <Button
            size="small"
            type="link"
            style={{
              marginTop: -10,
              padding: 0
            }}
          >
            + Add Media Description
          </Button>
        )}
      </div>
    );
    const { imageUrl } = this.state;
          */
    return (
      <Fragment>
        <Upload
          listType="picture"
          //showUploadList={true}
          multiple={false}
          //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          //beforeUpload={this.beforeUpload}
          //onChange={this.handleChange}
          //onRemove={this.removeUpload}
          onPreview={this.preview}
          //new:
          fileList={this.props.fileList}
          onChange={this.props.handleUpload}
          beforeUpload={() => false}
        >
          {/*this.state.fileList.length > 0 ? (
            <Tooltip title="Click image to edit">
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  maxWidth: "50%",
                  height: "auto",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              />
            </Tooltip>
          ) : (
            uploadButton
          )*/}
          {!this.props.uploaded && (
            <Button
              size="small"
              type="link"
              style={{
                marginTop: -10,
                padding: 0
              }}
            >
              + Add Media Description
            </Button>
          )}
        </Upload>
      </Fragment>
    );
  }
}

export default Uploader;
