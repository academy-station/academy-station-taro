import { Checkbox, View } from "@tarojs/components";
import { Colors } from "../../settings";
import Taro from "@tarojs/taro";

export interface CompSelectBillTypeProps {
  isFast: boolean;
  setFast: any;
}

export const CompSelectBillType = ({
  isFast,
  setFast,
}: CompSelectBillTypeProps) => {
  return (
    <View id={"selectBillType"}>
      <View style={{ marginBottom: "10px" }}>1. 选择查重服务</View>

      <View
        style={{
          border: "2px solid #967CE3",
          display: "flex",
          alignItems: "center",
          marginTop: "-2px",
        }}
      >
        <Checkbox
          value={"check"}
          checked={isFast}
          style={{ margin: "5%" }}
          onClick={() => {
            setFast(true);
          }}
        />
        <View className={"selectContent"}>
          <View>
            高速查重，
            <text style={{ fontSize: "large", color: Colors.Blond }}>
              {"3 "}
            </text>
            小时出报告
          </View>
        </View>
      </View>

      <View
        style={{
          border: "2px solid #967CE3",
          display: "flex",
          alignItems: "center",
          marginTop: "-2px",
        }}
      >
        <Checkbox
          value={"check"}
          checked={!isFast}
          style={{ margin: "5%" }}
          onClick={() => {
            setFast(false);
          }}
        />
        <View className={"selectContent"}>
          <View>标准查重，24小时出报告</View>
        </View>
      </View>
    </View>
  );
};

export default CompSelectBillType;
