export enum BillType {
  Fast,
  Normal,
}

export enum BillStatus {
  ToPay = "待付款",
  ToAccept = "待受理",
  Handling = "正在受理",
  Finished = "已完成",
  Confirmed = "已确认",
  Refund = "已退款",
}

export interface BillTimes {
  submitTime: number;
  acceptTime?: number;
  finishedTime?: number;
  downloadTime?: number;
  confirmedTime?: number;
  refundTime?: number;
}

export interface FilePaths {
  paperPath: string;
  reportPath1?: string;
  reportPath2?: string;
}

export interface Bill {
  _id?: string;
  openid: string;
  name: string;
  type: BillType;
  status: BillStatus;
  times: BillTimes;
  fileId: string;
  report1: boolean;
  report2: boolean;
}
