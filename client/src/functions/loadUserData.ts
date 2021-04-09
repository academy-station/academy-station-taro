import Taro from "@tarojs/taro";

export const loadUserData = async () => {
  // 判断缓存中是否有user数据
  if (Taro.getStorageInfoSync().keys.indexOf("openid") === -1) {
    const user_record = await Taro.cloud.callFunction({ name: "login" });
    // @ts-ignore
    const openid = user_record.result.openid;
    Taro.setStorageSync("openid", openid);
  }

  return await Taro.getStorageSync("openid");
};

export default loadUserData;
