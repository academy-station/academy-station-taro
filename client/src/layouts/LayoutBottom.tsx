import { Button, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
// import CompMe from "../pages/me";

export const Colors = {
  bg1: "#281167",
  bg2: "#7496F0",
  text1: "#281167",
  text2: "#fff",
};

// const barMenus = ["个人中心", "获取优惠券"];

export const LayoutBottom = () => {
  return (
    <View style={{ position: "fixed", bottom: 0 }} className="mid w100">
      <Button
        style={{
          width: "50%",
          borderRadius: 0,
          background: Colors.bg2,
          color: Colors.text1,
          fontWeight: "bold",
        }}
        onClick={() => {
          Taro.navigateTo({
            url: "/pages/upload/index",
          });
        }}
      >
        {"立即查重"}
      </Button>

      <Button
        style={{
          width: "50%",
          borderRadius: 0,
          background: Colors.bg2,
          color: Colors.text1,
          fontWeight: "bold",
        }}
        onClick={() => {
          Taro.navigateTo({
            url: "/pages/me/index",
          });
        }}
      >
        {"个人中心"}
      </Button>
    </View>
  );
};
