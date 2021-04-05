import Taro from "@tarojs/taro";

export interface TempFile {
  name: string;
  path: string;
  size: number;
  time: number;
  type: string;
}

export interface UploadTempFile {
  file: TempFile;
  user_openid: string;
}

export enum PaperType {
  Normal,
  Fast,
}

export enum PaperStatus {
  Pending = "等待处理",
  Handling = "正在处理",
  Finished = "查重完成",
  Cancelled = "已取消",
}

export interface PaperItem {
  id: string;
  user_openid: string;

  file_name: string;
  time: number | string | Date;
  type: PaperType;
  status: PaperStatus;
  email?: string;
}

export interface UserData extends Taro.UserInfo {
  openid: string;
  session_key: string;
}

export const API_HOST = "https://nanchuan.site:2021/";
export const API = {
  API_PAPER_UPLOAD: API_HOST + "paper/upload/",
  API_PAPER_QUERY: API_HOST + "paper/query/",
  API_PAPER_DOWNLOAD: API_HOST + "paper/download/",
  API_USER_LOGIN: API_HOST + "user/login/",
};
