import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import React, { useState } from "react";
import { MarkSegmentedControl } from "../../components/MarkSegmentedControl";
import { Span } from "../../components/Span";
import LayoutBase from "../../layouts/base";
import { LayoutBottom } from "../../layouts/LayoutBottom";

import ImgDetail1 from "../../assets/imgs/tinified/detail1.jpg";
import ImgDetail2 from "../../assets/imgs/tinified/detail2.jpg";
import ImgFooter from "../../assets/imgs/tinified/footer.jpg";

export default () => {
  const subMenus = ["服务详情", "对比报告", "用户评价", "常见Q&A"];
  const [curSeg, setCurSeg] = useState(0);

  return (
    <LayoutBase bottom={<LayoutBottom />}>
      <Span height={10} />

      {/* 分段器按钮 */}
      <MarkSegmentedControl
        elements={subMenus}
        curSeq={curSeg}
        setCurSeq={setCurSeg}
      />

      <Span height={20} />

      {/* 分段器的内容*/}
      <View style={{ margin: "0 10px" }}>
        {/* 服务详情 */}
        {curSeg === 0 && (
          <Image
            className={"w100"}
            src={ImgDetail1}
            mode={"widthFix"}
            style={{ verticalAlign: "bottom" }}
          />
        )}

        {/* 对比报告 */}
        {curSeg === 1 && (
          <Image className={"w100"} src={ImgDetail2} mode={"widthFix"} />
        )}
      </View>

      {/* 尾部内容 */}
      <View>
        <Image
          className={"w100"}
          src={ImgFooter}
          mode={"widthFix"}
          style={{ verticalAlign: "bottom" }}
          showMenuByLongpress={true}
        />
      </View>
    </LayoutBase>
  );
};
