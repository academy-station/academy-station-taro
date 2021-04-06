// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();
const subMchId = "1606844230";

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await cloud.cloudPay.unifiedOrder({
    body: "body",
    spbillCreateIp: "127.0.0.1",
    subMchId: subMchId,
    totalFee: event.payVal,
    outTradeNo: event.payId,
    envId: "cloud1",
    functionName: "pay_cb",
  });
  return res;
};
