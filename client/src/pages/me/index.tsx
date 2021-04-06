import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { Image, OpenData, View } from "@tarojs/components";
import ImgPortal from "../../assets/imgs/raw/fetch_credits.jpg";
import LayoutBase from "../../layouts/base";
import { AtAvatar, AtButton } from "taro-ui";
import { Colors } from "../../settings";
import { callPayProps, PaperStatus } from "../../ds";
import miment from "miment";
import { funcTodo } from "../../functions";

export const CompMe = () => {
  const userCreditSurplus = 0;
  const openid = Taro.getStorageSync("data").openid;
  const [papers, setPapers] = useState<callPayProps[]>([]);
  const db = Taro.cloud.database();

  useEffect(() => {
    Taro.showLoading({ title: "正在加载……" });
    db.collection("paper")
      .where({ openid: openid })
      .orderBy("submitTime", "desc")
      .get()
      .then((res) => {
        Taro.hideLoading();
        const _papers = res.data;
        console.log("文件列表", _papers);
        // @ts-ignore
        setPapers(_papers);
      });
  }, []);

  const downloadFile = (cloudFileId: string) => {
    Taro.showLoading({
      title: "正在下载……",
    });
    Taro.cloud.downloadFile({
      fileID: cloudFileId,
      success: (res) => {
        Taro.hideLoading();
        console.log("下载成功", res);
        Taro.saveFile({
          tempFilePath: res.tempFilePath,
          success: (res) => {
            console.log("保存成功", res);
            Taro.openDocument({
              filePath: res.savedFilePath,
              success: (res) => {
                console.log("打开成功", res);
              },
            });
          },
        });
      },
    });
  };

  return (
    <LayoutBase>
      <View style={{ margin: "0 10%" }}>
        <View
          id={"user-info"}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <View id={"user-avatar"} style={{ marginRight: "10%" }}>
            <AtAvatar
              circle
              openData={{ type: "userAvatarUrl" }}
              size={"large"}
              customStyle={{ border: "2px solid #ccc" }}
            />
          </View>
          <View id={"user-info"} style={{ color: Colors.White }}>
            <View id={"user-name"}>
              微信昵称：{<OpenData type={"userNickName"} />}
            </View>
            <View id={"user-credit-surplus"}>
              积分余额：
              <text
                style={{ textDecoration: "underline", color: Colors.Blond }}
                onClick={funcTodo}
              >
                {userCreditSurplus}
              </text>
            </View>
            {/*<View id={"user-credit-history"}>我的积分历史记录</View>*/}
          </View>
        </View>

        <View style={{ fontSize: "large", fontWeight: 500, margin: "10px 0" }}>
          订单进度 {papers.length > 0 && "( " + papers.length + " )"}
        </View>
        <View>
          {papers.length === 0 ? (
            <View
              style={{
                fontSize: "small",
                color: Colors.Blond,
                textAlign: "center",
              }}
            >
              您暂无订单
            </View>
          ) : (
            papers.map((paperItem) => (
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                  paddingBottom: "2px",
                  borderBottom: "1px solid #aaa",
                }}
              >
                <View style={{ width: "80%", textAlign: "left" }}>
                  <text
                    className={"overflow-2"}
                    style={{
                      color: Colors.Blond,
                    }}
                  >
                    {paperItem.paperName}
                  </text>
                  <View style={{ color: "#ccc", fontSize: "small" }}>
                    {miment(new Date(paperItem.submitTime)).format()}
                  </View>
                </View>
                <View
                  style={{ fontSize: "small", margin: "0 10px", width: "30%" }}
                >
                  {paperItem.status}
                </View>
                <View>
                  <AtButton
                    type={"primary"}
                    size={"small"}
                    onClick={() => {
                      downloadFile(paperItem.cloudFileId);
                    }}
                    customStyle={{
                      margin: "2px",
                      fontSize: "small",
                    }}
                  >
                    预览原文
                  </AtButton>
                  <AtButton
                    type={"primary"}
                    size={"small"}
                    disabled={paperItem.status !== PaperStatus.Finished}
                    customStyle={{ margin: "2px", fontSize: "small" }}
                  >
                    预览报告
                  </AtButton>
                </View>
              </View>
            ))
          )}
        </View>

        {/* 获取更多积分*/}
        <View style={{ margin: "10px" }} onClick={funcTodo}>
          <Image src={ImgPortal} className={"w100"} mode={"widthFix"} />
        </View>
      </View>
    </LayoutBase>
  );
};

export default CompMe;
