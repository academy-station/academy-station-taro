import Taro from "@tarojs/taro";
import { Image, OpenData, View } from "@tarojs/components";
import ImgPortal from "../../assets/imgs/raw/fetch_credits.jpg";
import LayoutBase from "../../layouts/base";
import { AtAvatar, AtButton, AtTag } from "taro-ui";
import { CloudBaseUrl, Colors } from "../../settings";
import miment from "miment";
import { funcTodo } from "../../functions";
import { Bill, BillStatus, BillType } from "../../ds/bill";
import { useEffect, useState } from "react";
import { handlePay } from "../../functions/pay";

const openid = Taro.getStorageSync("data").openid;
const db = Taro.cloud.database();

export const CompMe = () => {
  const userCreditSurplus = 0;
  const [bills, setBills] = useState<Bill[]>([]);

  const updateBills = () => {
    Taro.showLoading({
      title: "正在加载……",
    });
    db.collection("bill")
      .where({ openid: openid })
      .get()
      .then((res) => {
        Taro.hideLoading();
        console.log({ res });
        // @ts-ignore
        setBills(res.data);
      });
  };

  useEffect(updateBills, []);

  const handlePayAgain = async (bill: Bill) => {
    const billItem = (
      await db
        .collection("bill")
        // @ts-ignore
        .doc(bill._id)
        // @ts-ignore
        .get()
    ).data;
    console.log({ billItem });
    // @ts-ignore
    await db.collection("bill").doc(billItem._id).remove();
    console.log("删除原订单id", billItem._id);
    delete billItem._id;
    delete billItem._openid;
    const resAdd = await db.collection("bill").add({ data: billItem });
    const billIdNew = resAdd._id.toString();
    // @ts-ignore
    handlePay({ billId: billIdNew, billType: billItem.type }).finally(() => {
      updateBills();
    });
  };

  const downloadFile = async (fileId: string, filePrefix: string) => {
    Taro.showLoading({
      title: "正在下载……",
    });
    fileId = [CloudBaseUrl, filePrefix, fileId].join("/");
    console.log({ fileId });
    const res = await Taro.cloud.downloadFile({
      fileID: fileId,
    });
    Taro.hideLoading();
    console.log("下载成功", res);
    Taro.openDocument({
      filePath: res.tempFilePath,
      // @ts-ignore
      showMenu: true,
      success: (res) => {
        console.log("打开成功", res);
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
          订单进度 {bills.length > 0 && "( " + bills.length + " )"}
        </View>

        <View>
          {bills.length === 0 ? (
            <View
              style={{
                fontSize: "small",
                color: Colors.Blond,
                textAlign: "center",
                textDecoration: "underline",
              }}
              onClick={() => {
                Taro.navigateTo({
                  url: "/pages/upload/index",
                });
              }}
            >
              您暂无订单，点击查重
            </View>
          ) : (
            bills.map((bill) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                  paddingBottom: "2px",
                  borderBottom: "1px solid #aaa",
                }}
              >
                <View
                  style={{
                    marginBottom: "5px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <View id={"paper_type"}>
                    {bill.type === BillType.Fast ? (
                      <AtTag
                        size={"small"}
                        type={"primary"}
                        customStyle={{
                          backgroundColor: Colors.Magenta,
                          color: "white",
                          width: "40px",
                        }}
                      >
                        高速
                      </AtTag>
                    ) : (
                      <AtTag customStyle={{ width: "40px" }} size={"small"}>
                        标准
                      </AtTag>
                    )}
                  </View>

                  <View>
                    <text
                      className={"overflow-2"}
                      style={{
                        color: Colors.Blond,
                        marginLeft: "10px",
                      }}
                      onClick={() => {
                        downloadFile(bill.fileId, "paper");
                      }}
                    >
                      {bill.name}
                    </text>
                  </View>
                </View>

                <View
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    id={"submit_time"}
                    style={{ color: "#ccc", fontSize: "small" }}
                  >
                    {miment(new Date(bill.times.submitTime)).format(
                      "YYYY-MM-DD hh:mm"
                    )}
                  </View>

                  <View id={"status"} style={{ fontSize: "small" }}>
                    {bill.status === BillStatus.ToPay ? (
                      <text
                        style={{
                          color: Colors.Blond,
                          textDecoration: "underline",
                        }}
                        onClick={() => {
                          handlePayAgain(bill);
                        }}
                      >
                        点击付款
                      </text>
                    ) : (
                      bill.status
                    )}
                  </View>
                  <View id={"operations"} style={{ display: "inline-flex" }}>
                    <AtButton
                      type={"primary"}
                      size={"small"}
                      disabled={bill.status !== BillStatus.Finished}
                      customStyle={{ margin: "2px", fontSize: "small" }}
                      onClick={() => {
                        downloadFile(bill.fileId, "report1");
                      }}
                    >
                      报告1
                    </AtButton>

                    <AtButton
                      type={"primary"}
                      size={"small"}
                      disabled={bill.status !== BillStatus.Finished}
                      customStyle={{ margin: "2px", fontSize: "small" }}
                      onClick={() => {
                        downloadFile(bill.fileId, "report2");
                      }}
                    >
                      报告2
                    </AtButton>
                  </View>
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
