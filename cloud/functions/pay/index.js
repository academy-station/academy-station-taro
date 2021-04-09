// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();
const subMchId = "1606844230";

// 云函数入口函数
exports.main = async (event, context) => {
  console.log({ event });

  return cloud.cloudPay.unifiedOrder({
    body: "论文查重申请",  // 商品描述
    detail: event.billVal > 300 ? "高速查重" : "标准查重",
    spbillCreateIp: "127.0.0.1",
    subMchId: subMchId,
    outTradeNo: event.billId,
    totalFee: event.billVal,
    envId: "cloud1",
    functionName: "pay_cb",
  });
};
