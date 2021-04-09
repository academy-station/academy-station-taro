import { OfficialAccount, View } from "@tarojs/components";
import { CompSwiper } from "../components/CompSwiper";
import { Colors } from "../settings";

export interface LayoutBaseProps {
  children?: any;
  bottom?: any;
}

export const LayoutBase = ({ children, bottom }: LayoutBaseProps) => {
  return (
    <View
      className="index"
      style={{
        backgroundColor: Colors.PurpleDark1,
        color: Colors.White,
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <View style={{ marginBottom: 40 }}>
        <CompSwiper />
        {children}
      </View>
      {bottom}

      <View>
        <OfficialAccount
          onLoad={(e) => {
            console.log("OfficialAccount", e);
          }}
        />
      </View>
    </View>
  );
};

export default LayoutBase;
