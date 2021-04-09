import Taro from "@tarojs/taro";
import { BillStatus } from "../ds/bill";
import { BillVals } from "../settings";

const billVals = [BillVals.Fast, BillVals.Normal];
const db = Taro.cloud.database();

export const handlePay = async ({ billId, billType }) => {
  await Taro.showLoading({
    title: "正在加载",
  });

  // 调用云支付接口，需要参数biillId, billVal
  const payData = {
    billVal: billVals[billType],
    billId: billId,
  };
  const resCallPay = await Taro.cloud.callFunction({
    name: "pay",
    data: payData,
  });
  console.log({ resCallPay });

  // 唤起微信支付
  await Taro.requestPayment({
    // @ts-ignore
    ...resCallPay.result.payment,
    success: (res) => {
      // 更新数据库中订单状态为待受理
      db.collection("bill")
        .doc(billId)
        .update({
          data: {
            status: BillStatus.ToAccept,
          },
        });

      // 交互显示
      Taro.hideLoading();
      Taro.showToast({
        title: "支付成功！",
      });
      console.log("支付成功", res);
    },
    fail: (res) => {
      Taro.hideLoading();
      Taro.showToast({
        title: "支付失败！",
        icon: "error",
      });
      console.log("支付失败", res);
    },
  });
};
