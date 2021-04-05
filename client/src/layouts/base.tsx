import { View } from "@tarojs/components";
import { CompSwiper } from "../components/CompSwiper";
import React from "react";
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
        backgroundColor: Colors.bg1,
        color: Colors.text2,
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <View style={{ marginBottom: 40 }}>
        <CompSwiper />
        {children}
      </View>
      {bottom}
    </View>
  );
};

export default LayoutBase;
