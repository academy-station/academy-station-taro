import Taro from "@tarojs/taro";
import { View, Image, Button } from "@tarojs/components";
import { useState } from "react";
import { MarkSegmentedControl } from "../../components/MarkSegmentedControl";
import { CompSpan } from "../../components/CompSpan";
import LayoutBase from "../../layouts/base";
import { LayoutBottom } from "../../layouts/LayoutBottom";
import { Colors } from "../../settings";

import ImgDetail1 from "../../assets/imgs/tinified/detail1.jpg";
import ImgDetail2 from "../../assets/imgs/tinified/detail2.png";
import ImgDetail3 from "../../assets/imgs/tinified/detail3.png";
import ImgReport1 from "../../assets/imgs/tinified/report1.png";
import ImgReport2 from "../../assets/imgs/tinified/report2.png";
import ImgReport3 from "../../assets/imgs/tinified/report3.png";
import ImgFooter from "../../assets/imgs/tinified/footer.png";
import { articles } from "../../ds/articles";

export default () => {
  const subMenus = ["服务详情", "对比报告", "用户评价", "常见Q&A"];
  const [curSeg, setCurSeg] = useState(0);
  const comments = [];

  return (
    <LayoutBase bottom={<LayoutBottom />}>
      <CompSpan height={10} />

      {/* 分段器按钮 */}
      <MarkSegmentedControl
        elements={subMenus}
        curSeq={curSeg}
        setCurSeq={setCurSeg}
      />

      {/*<Span height={10} />*/}

      {/* 分段器的内容*/}
      <View style={{ margin: "20px 0  " }} id={"分段器"}>
        {/* 服务详情 */}
        {curSeg === 0 && (
          <>
            <Image className={"w100"} src={ImgDetail1} mode={"widthFix"} />
            <Image className={"w100"} src={ImgDetail2} mode={"widthFix"} />
            <Image className={"w100"} src={ImgDetail3} mode={"widthFix"} />
          </>
        )}

        {/* 对比报告 */}
        {curSeg === 1 && (
          <>
            <Image className={"w100"} src={ImgReport1} mode={"widthFix"} />
            <Image className={"w100"} src={ImgReport2} mode={"widthFix"} />
            <Image className={"w100"} src={ImgReport3} mode={"widthFix"} />
          </>
        )}

        {/*  用户评价 */}
        {curSeg === 2 && (
          <View>
            {comments.length === 0 ? (
              <View
                style={{
                  fontSize: "small",
                  color: Colors.Blond,
                  textAlign: "center",
                }}
              >
                暂无评价
              </View>
            ) : (
              comments.map((comment, index) => (
                <View
                  style={{
                    fontSize: "small",
                    color: Colors.Blond,
                  }}
                  key={index}
                >
                  {comment}
                </View>
              ))
            )}
          </View>
        )}

        {/*  QA */}
        {curSeg === 3 && (
          <>
            {articles.slice(0, 2).map(({ img }, id) => (
              <Image
                style={{ padding: "0 5%", margin: "10px 0", width: "90%" }}
                src={img}
                mode={"widthFix"}
                onClick={() => {
                  const url = `/pages/webview/index?id=${id}`;
                  console.log({ url });
                  Taro.navigateTo({
                    url,
                  });
                }}
                key={id}
              />
            ))}
          </>
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
