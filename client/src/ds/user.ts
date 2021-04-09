import Taro from "@tarojs/taro";

export interface User extends Taro.UserInfo {
  openid: string;
  time: number;
}
