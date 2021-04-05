import { View } from "@tarojs/components";
import React from "react";

export interface SpanProps {
  height: number;
}

export const Span = ({ height }: SpanProps) => {
  return <View style={{ height: height }} />;
};

export const SpanHorizontal = Span;
