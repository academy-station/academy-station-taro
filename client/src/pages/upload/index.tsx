import Taro from "@tarojs/taro";
import LayoutBase from "../../layouts/base";
import { Button, Checkbox, View } from "@tarojs/components";
import { useState } from "react";
import "./index.scss";
import { callPayProps, PaperStatus, UserData } from "../../ds";
import { Colors } from "../../settings";

export const PageUpload = () => {
  const [paperType, setPaperType] = useState(0);
  const [paperName, setPaperName] = useState("");
  const [paperCloudFileId, setPaperCloudFileId] = useState("");
  const [paperTime, setPaperTime] = useState(0);
  const userData: UserData = Taro.getStorageSync("data");
  const openid = userData.openid;
  const PayVals = [1, 29800];
  const maxFileSize = 10; // 5 * 1024 * 1024 b
  const ENABLE_PAYMENT = true;

  const handleUpload = () => {
    Taro.chooseMessageFile({
      count: 1,
      success: (res) => {
        Taro.showLoading({
          title: "正在上传",
        });
        const file = res.tempFiles[0];
        console.log("文件详情", file);

        // 检测文档类型
        if (!(file.name.endsWith(".doc") || file.name.endsWith(".docx"))) {
          return Taro.showToast({
            title: "仅支持word文档",
            icon: "error",
          });
        }

        // 检测文档大小
        if (file.size > maxFileSize * 1024 * 1024) {
          return Taro.showToast({
            title: `仅支持小于${maxFileSize}Mb文件`,
            icon: "error",
          });
        }

        // 上传文件
        const paper_id = [openid, file.name].join("-");
        Taro.cloud.uploadFile({
          cloudPath: "paper/" + paper_id,
          filePath: file.path,
          success: (res) => {
            Taro.hideLoading();
            Taro.showToast({
              title: "上传成功",
              icon: "success",
            });
            console.log("上传文件成功", res);
            setPaperName(file.name);
            setPaperCloudFileId(res.fileID);
            setPaperTime(file.time);
          },
          fail: (res) => {
            Taro.hideLoading();
            Taro.showToast({
              title: "上传失败",
              icon: "error",
            });
            console.log("上传文件失败", res);
          },
        });
      },
    });
  };

  const callPay = () => {
    // 检测文件是否已上传
    if (!paperName.length) {
      return Taro.showToast({
        title: "请先上传文件！",
        icon: "error",
      });
    }
    Taro.showLoading();

    // 生成请求参数
    const time = new Date().getTime();
    const data: callPayProps = {
      cloudFileId: paperCloudFileId,
      paperName: paperName,
      payId: [time, openid.substr(-5, 5)].join("-"),
      payVal: PayVals[paperType],
      openid: openid,
      paperTime: paperTime,
      status: PaperStatus.Pending,
      submitTime: new Date().getTime(),
    };

    const db = Taro.cloud.database();
    db.collection("paper").add({
      data: data,
      success: (res) => {
        console.log("数据库插入完成", res);
      },
      fail: (res) => {
        console.log("数据库插入失败", res);
      },
    });

    // 云支付
    ENABLE_PAYMENT &&
      Taro.cloud
        .callFunction({
          name: "pay",
          data: data,
        })
        .then((res) => {
          console.log("调用云-支付", res);
          // @ts-ignore
          const payment = res.result.payment;
          console.log({ payment });
          Taro.hideLoading();
          Taro.requestPayment({
            ...payment,
            success: (res) => {
              console.log("支付成功", res);
              Taro.navigateTo({
                url: "/pages/me/index",
              });
              Taro.showToast({
                title: "支付成功",
              });
            },
            fail: (res) => {
              console.log("支付失败", res);
            },
          });
        });
  };

  return (
    <LayoutBase>
      <View style={{ margin: "0 10%" }}>
        <View style={{ marginBottom: "20px" }}>
          <View style={{ marginBottom: "10px" }}>1. 选择查重服务</View>
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
              checked={paperType === 0}
              style={{ margin: "5%" }}
              onClick={() => {
                setPaperType(0);
              }}
            />
            <View className={"selectContent"}>
              <View>
                高速查重，
                <text style={{ fontSize: "large", color: Colors.Blond }}>
                  {"3 "}
                </text>
                小时出报告
              </View>
            </View>
          </View>

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
              checked={paperType === 1}
              style={{ margin: "5%" }}
              onClick={() => {
                setPaperType(1);
              }}
            />
            <View className={"selectContent"}>
              <View>标准查重，24小时出报告</View>
            </View>
          </View>
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
                color: Colors.Blond,
                textAlign: "center",
                padding: "5px 0",
                display: "block",
                fontSize: "small",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              已上传：
              {paperName}
            </View>
          )}

          <View className={"desc"}>
            <View className={"desc-row"}>文件后缀为 .doc、.docx</View>
            <View className={"desc-row"}>
              文件大小{" < "}
              {maxFileSize} Mb
              <View className={"desc-row"}>不支持PDF文档</View>
            </View>
          </View>
        </View>

        <View style={{ marginBottom: "20px" }}>
          <View style={{ marginBottom: "10px" }}>
            <Button
              style={{ backgroundColor: "#7773EC", color: "#fff" }}
              onClick={callPay}
            >
              确认提交
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

export default PageUpload;
