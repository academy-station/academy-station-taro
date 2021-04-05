import { View } from "@tarojs/components";
import React from "react";

export interface MarkSegmentedControlProps {
  curSeq: any;
  setCurSeq: any;
  elements: string[];
  bgColor?: string;
  bgColorSelected?: string;
  textColor?: string;
  textColorSelected?: string;
}

export const MarkSegmentedControl = (props: MarkSegmentedControlProps) => {
  props.bgColor = props.bgColor || "#598AF3";
  props.bgColorSelected = props.bgColorSelected || "#210058";
  props.textColor = props.textColor || "#210058";
  props.textColorSelected = props.textColorSelected || "#fff";

  return (
    <View
      className={"mid"}
      style={{
        border: "2px solid #598AF3",
        borderLeft: 0,
        borderRight: 0,
        marginTop: 5,
        marginBottom: 5,
      }}
    >
      {props.elements.map((item, index) => (
        <View
          key={index}
          style={{
            backgroundColor:
              props.curSeq === index ? props.bgColorSelected : props.bgColor,
            color:
              props.curSeq === index
                ? props.textColorSelected
                : props.textColor,
            fontSize: 16,
            borderRadius: 0,
            border: 0,
            padding: "5px 0",
            width: 100 / props.elements.length + "%",
          }}
          onClick={() => props.setCurSeq(index)}
        >
          {item}
        </View>
      ))}
    </View>
  );
};
