import { Button, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Colors } from "../settings";

export const LayoutBottom = () => {
  return (
    <View style={{ position: "fixed", bottom: 0 }} className="mid w100">
      <Button
        style={{
          width: "50%",
          borderRadius: 0,
          background: Colors.Blue,
          color: Colors.White,
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
          background: Colors.Blue,
          color: Colors.White,
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
