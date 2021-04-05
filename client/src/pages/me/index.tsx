import React, { useEffect, useState } from "react";
import { Button, Image, OpenData, View } from "@tarojs/components";
import ImgPortal from "../../assets/imgs/raw/fetch_credits.jpg";
import LayoutBase from "../../layouts/base";
import { AtAvatar } from "taro-ui";
import { Colors } from "../../settings";
import Taro from "@tarojs/taro";
import { API, PaperItem } from "../../ds";

export const CompMe = () => {
  const userCreditSurplus = 0;
  const user_openid = Taro.getStorageSync("data").openid;
  const [papers, setPapers] = useState<PaperItem[]>([]);

  useEffect(() => {
    Taro.showLoading({ title: "正在加载……" });
    Taro.request({
      url: API.API_PAPER_QUERY,
      data: {
        user_openid: user_openid,
      },
      success: (res) => {
        Taro.hideLoading();
        console.log(res.data);
        setPapers(res.data);
      },
    });
  }, []);

  const downloadFile = (id: string) => {
    Taro.showLoading({
      title: "正在下载……",
    });
    Taro.downloadFile({
      url: API.API_PAPER_DOWNLOAD + "?id=" + id,
      success: (res) => {
        Taro.hideLoading();
        Taro.showToast({
          title: "下载成功",
        });
        console.log({ downloadResult: res });
      },
      fail: (res) => {
        Taro.hideLoading();
        Taro.showToast({
          title: "下载失败",
          icon: "none",
        });
        console.log({ downloadFailed: res });
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
          <View id={"user-info"} style={{ color: Colors.text2 }}>
            <View id={"user-name"}>
              微信昵称：{<OpenData type={"userNickName"} />}
            </View>
            <View id={"user-credit-surplus"} style={{ fontSize: "large" }}>
              有效积分余额： {userCreditSurplus}
            </View>
            <View id={"user-credit-history"}>我的积分历史记录</View>
          </View>
        </View>

        <View style={{ fontSize: "large", fontWeight: 500, margin: "10px 0" }}>
          订单进度
        </View>
        <View>
          {papers.map((paperItem) => (
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
              <View style={{ width: "70%" }}>
                <View key={paperItem.id}>{paperItem.file_name}</View>
                <View style={{ color: "#ccc", fontSize: "small" }}>
                  提交时间： {paperItem.time}
                </View>
              </View>
              <View style={{ fontSize: "small", margin: "0 10px" }}>
                {paperItem.status}
              </View>
              <View>
                <Button
                  size={"mini"}
                  onClick={() => {
                    downloadFile(paperItem.id);
                  }}
                >
                  下载原文
                </Button>
                <Button size={"mini"}>下载报告</Button>
              </View>
            </View>
          ))}
        </View>

        <Image src={ImgPortal} className={"w100"} mode={"widthFix"} />
      </View>
    </LayoutBase>
  );
};

export default CompMe;
