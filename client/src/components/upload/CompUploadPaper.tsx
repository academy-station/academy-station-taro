import { Button, View } from "@tarojs/components";
import { Colors } from "../../settings";
import Taro from "@tarojs/taro";
import { useState } from "react";

export interface CompUploadPaperProps {
  openid: string;
  setPaperName: any;
  setPaperId: any;
}

export const CompUploadPaper = (props: CompUploadPaperProps) => {
  const [paperName, setPaperName] = useState("");

  const handleUpload = async () => {
    if (!props.openid) {
      return Taro.showToast({
        title: "未检测到OpenID",
        icon: "error",
      });
    }

    const files = await Taro.chooseMessageFile({
      count: 1,
      type: "file",
      extension: ["doc", "docx"],
    });
    await Taro.showLoading({
      title: "正在上传……",
    });

    const tempFile = files.tempFiles[0];
    console.log({ tempFile });
    const fileId = [props.openid, tempFile.name].join("/");
    const uploadRes = await Taro.cloud.uploadFile({
      filePath: tempFile.path,
      cloudPath: ["paper", fileId].join("/"),
    });
    console.log("文件已存储到服务器", uploadRes);

    props.setPaperName(tempFile.name);
    props.setPaperId(fileId);
    setPaperName(tempFile.name);
    Taro.hideLoading();
    await Taro.showToast({
      title: "上传成功",
      duration: 1000,
    });
  };

  return (
    <View id={"uploadFile"}>
      <View style={{ marginBottom: "10px" }}>2. 上传文档</View>

      <View
        style={{
          display: "inline-flex",
          justifyContent: "space-around",
          marginBottom: "10px",
          width: "100%",
        }}
      >
        <Button
          plain
          style={{
            border: "2px solid #967CE3",
            fontWeight: 500,
            color: Colors.Blond,
            width: "100%",
          }}
          onClick={handleUpload}
        >
          {paperName ? "重新选择" : "选择文件"}
        </Button>
      </View>

      {paperName && (
        <View
          style={{
            marginBottom: "10px",
            color: Colors.Blond,
            textAlign: "center",
            padding: "5px 0",
            display: "block",
            fontSize: "small",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          已上传：
          {paperName}
        </View>
      )}

      <View className={"desc"}>
        <View className={"desc-row"}>文件后缀为 .doc、.docx</View>
        <View className={"desc-row"}>
          文件大小{` < `}10Mb
          <View className={"desc-row"}>不支持PDF文档</View>
        </View>
      </View>
    </View>
  );
};
