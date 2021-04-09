import Taro from "@tarojs/taro";

export interface updaterDeviceProps {
  db: any;
  openid: string;
}

export const updateDevice = ({ db, openid }: updaterDeviceProps) => {
  const device = Taro.getSystemInfoSync();
  db.collection("user-device")
    .doc(openid)
    .set({
      data: device,
      success: () => {
        console.log("save user-device data into database user-device");
      },
    });
};

export default updateDevice;
