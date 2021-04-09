import Taro from "@tarojs/taro";
import { Button, View } from "@tarojs/components";
import { Colors } from "../../settings";
import { BillType, BillStatus, Bill } from "../../ds/bill";
import { handlePay } from "../../functions/pay";

const db = Taro.cloud.database();

export interface CompSubmitPaperProps {
  openid: string;
  billType: BillType;
  paperName: string;
  paperPath: string;
}

export const CompSubmitPaper = (props: CompSubmitPaperProps) => {
  const handleSubmit = async () => {
    // 申请授权
    if (Taro.getStorageInfoSync().keys.indexOf("user") === -1) {
      try {
        const res = await Taro.getUserProfile({ desc: "申请授权登录" });
        // 存储到云端
        db.collection("user").doc(props.openid).update({
          data: res.userInfo,
        });
        // 存储到缓存
        Taro.setStorage({ key: "user", data: res.userInfo });
        console.log("授权成功，并更新到数据库、缓存", res.userInfo);
      } catch (err) {
        console.log("授权失败", err);
        return Taro.showToast({
          title: "请放心授权",
          icon: "error",
        });
      }
    }

    await Taro.showLoading({
      title: "正在加载……",
    });

    // 检测文件是否已上传
    if (!props.paperPath) {
      return Taro.showToast({
        title: "请先上传文件！",
        icon: "error",
      });
    }

    // 订单更新到数据库，并获取订单id
    const bill: Bill = {
      name: props.paperName,
      type: props.billType,
      openid: props.openid,
      fileId: props.paperPath,
      report1: false,
      report2: false,
      status: BillStatus.ToPay,
      times: {
        submitTime: new Date().getTime(),
      },
    };
    const resDbAdd = await db.collection("bill").add({ data: bill });
    console.log("订单已插入到数据库", resDbAdd);
    const billId = resDbAdd._id.toString();

    // 微信支付
    handlePay({ billId, billType: props.billType }).finally(() => {
      Taro.navigateTo({
        url: "/pages/me/index",
      });
    });
  };

  return (
    <View id={"submitPaper"}>
      <View style={{ marginBottom: "10px" }}>
        <Button
          style={{
            backgroundColor: Colors.Blue,
            color: Colors.White,
          }}
          onClick={handleSubmit}
        >
          确认提交
        </Button>
      </View>
      <View className={"desc"}>
        <View className={"desc-row"}>请确认文件是否上传正确</View>
        <View className={"desc-row"}>点击提交检测后，查重额度扣除不予退费</View>
      </View>
    </View>
  );
};

export default CompSubmitPaper;
