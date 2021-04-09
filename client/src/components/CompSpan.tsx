import { View } from "@tarojs/components";

export interface SpanProps {
  height: number;
}

export const CompSpan = ({ height }: SpanProps) => {
  return <View style={{ height: height || 10 }} />;
};

export const CompSpanHorizontal = CompSpan;
