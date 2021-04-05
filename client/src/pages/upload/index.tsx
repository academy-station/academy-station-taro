import Taro from "@tarojs/taro";
import LayoutBase from "../../layouts/base";
import { Button, Checkbox, Input, View } from "@tarojs/components";
import React, { useState } from "react";
import "./index.scss";
import {
  API,
  PaperItem,
  PaperStatus,
  PaperType,
  UploadTempFile,
  UserData,
} from "../../ds";

interface CompCheckProps {
  index: number;
  selected: number;
  setSelect: any;
  line1: string;
  surplus: number;
  href?: any;
}

export const CompCheck = (props: CompCheckProps) => {
  return (
    <View
      style={{
        border: "2px solid #967CE3",
        display: "flex",
        alignItems: "center",
        marginTop: "-2px",
      }}
    >
      <Checkbox
        value={"check"}
        checked={props.index === props.selected}
        style={{ margin: "5%" }}
        onClick={() => {
          props.setSelect(props.index);
        }}
      />
      <View className={"selectContent"}>
        <View>{props.line1}</View>
        <View style={{ display: "inline-flex", fontSize: "small" }}>
          余额：{props.surplus}，
          <View style={{ color: "#F9DF70" }}>点击购买 →</View>
        </View>
      </View>
    </View>
  );
};

export const Upload = () => {
  const [paperType, setPaperType] = useState(0);
  const [paperName, setPaperName] = useState("");
  const userData: UserData = Taro.getStorageSync("data");
  const [email, setEmail] = useState("");

  const handleUpload = () => {
    Taro.chooseMessageFile({
      count: 1,
      fail: (res) => {
        console.log({ res });
      },
      success: (res) => {
        Taro.showLoading();
        const file = res.tempFiles[0];
        const uploadFileData: UploadTempFile = {
          file,
          user_openid: userData.openid,
        };

        Taro.uploadFile({
          url: API.API_PAPER_DOWNLOAD,
          name: "file",
          header: { "content-type": "multipart/form-data" },
          filePath: file.path,
          formData: {
            data: JSON.stringify(uploadFileData),
          }, // 重要，与后端解析保持一致：name, path, time, type, size
          success: (res) => {
            Taro.hideLoading();
            console.log({ uploadResult: res });
            setPaperName(file.name);
            Taro.showToast({
              title: "上传成功",
            });
          },
          fail: (res) => {
            Taro.hideLoading();
            console.log({ res });
            Taro.showToast({
              title: "上传失败",
            });
          },
        });
      },
    });
  };

  // todo: 目前上传文件的api要最后使用submit进行确认，并且修改id算法
  const handleSubmit = () => {
    const paper: PaperItem = {
      file_name: paperName,
      id: "test",
      time: "test",
      user_openid: userData.openid,
      status: PaperStatus.Pending,
      type: paperType ? PaperType.Fast : PaperType.Normal,
      email: email,
    };
    console.log({ submit: paper });
    Taro.navigateTo({
      url: "/pages/me/index",
    });
    Taro.showToast({
      title: "提交成功",
    });
  };

  return (
    <LayoutBase>
      <View style={{ margin: "0 10%" }}>
        <View style={{ marginBottom: "20px" }}>
          <View style={{ marginBottom: "10px" }}>1. 选择查重服务</View>
          <CompCheck
            line1={"高速查重，3小时出报告"}
            surplus={1}
            index={0}
            selected={paperType}
            setSelect={setPaperType}
          />
          <CompCheck
            line1={"标准查重，24小时出报告"}
            surplus={0}
            index={1}
            selected={paperType}
            setSelect={setPaperType}
          />
        </View>

        <View style={{ marginBottom: "20px", width: "100%" }}>
          <View style={{ marginBottom: "10px" }}>2. 上传文档</View>

          <View
            style={{
              display: "inline-flex",
              justifyContent: "space-around",
              marginBottom: "10px",
              width: "100%",
            }}
          >
            <Button
              plain
              style={{
                border: "2px solid #967CE3",
                fontWeight: 500,
                color: "#fff",
                width: "100%",
              }}
              onClick={handleUpload}
            >
              {paperName ? "重新选择" : "选择文件"}
            </Button>
          </View>

          {paperName.length > 0 && (
            <View
              style={{
                marginBottom: "10px",
                color: "#F9DF70",
                textAlign: "center",
                padding: "5px 0",
                display: "block",
                fontSize: "small",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              成功上传：
              {paperName}
            </View>
          )}

          <View className={"desc"}>
            <View className={"desc-row"}>五万字以内Word文件，不支持PDF</View>
            <View className={"desc-row"}>文件后缀名为.doc、.docx</View>
          </View>
        </View>

        <View style={{ marginBottom: "20px" }}>
          <View style={{ marginBottom: "10px" }}>3. 报告查收邮箱（必填）</View>
          <View>
            <View style={{ marginBottom: "10px" }}>
              <Input
                placeholder={"xxx@xx.com"}
                style={{
                  backgroundColor: "#fff",
                  color: "#333",
                  padding: "5px",
                }}
                value={email}
                type={"text"}
                onInput={(e) => {
                  setEmail(e.detail.value);
                }}
              />
            </View>

            <View className={"desc"}>
              <View className={"desc-row"}>
                {" "}
                请务必填写正确邮箱号，保证报告查收
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginBottom: "20px" }}>
          <View style={{ marginBottom: "10px" }}>
            <Button
              style={{ backgroundColor: "#7773EC", color: "#fff" }}
              onClick={handleSubmit}
            >
              提交检测
            </Button>
          </View>
          <View className={"desc"}>
            <View className={"desc-row"}>请确认文件是否上传正确</View>
            <View className={"desc-row"}>
              点击提交检测后，查重额度扣除不予退费
            </View>
          </View>
        </View>
      </View>
    </LayoutBase>
  );
};

export default Upload;
