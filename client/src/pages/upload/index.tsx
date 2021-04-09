import Taro from "@tarojs/taro";
import LayoutBase from "../../layouts/base";
import { View } from "@tarojs/components";
import { useEffect, useState } from "react";
import "./index.scss";
import CompSelectBillType from "../../components/upload/CompSelectBillType";
import { CompUploadPaper } from "../../components/upload/CompUploadPaper";
import { CompSpan } from "../../components/CompSpan";
import CompSubmitPaper from "../../components/upload/CompSubmitPaper";
import { BillType } from "../../ds/bill";
import loadUserData from "../../functions/loadUserData";

export const PageUpload = () => {
  const [isFast, setFast] = useState(true);
  const [paperId, setPaperId] = useState("");
  const [paperName, setPaperName] = useState("");
  const [openid, setOpenid] = useState("");
  useEffect(() => {
    loadUserData().then((openid) => {
      setOpenid(openid);
    });
  });

  return (
    <LayoutBase>
      <View style={{ margin: "0 10%" }}>
        <CompSelectBillType isFast={isFast} setFast={setFast} />

        <CompSpan height={20} />

        <CompUploadPaper
          openid={openid}
          setPaperName={setPaperName}
          setPaperId={setPaperId}
        />

        <CompSpan height={20} />

        <CompSubmitPaper
          paperName={paperName}
          openid={openid}
          paperPath={paperId}
          billType={isFast ? BillType.Fast : BillType.Normal}
        />
      </View>
    </LayoutBase>
  );
};

export default PageUpload;
