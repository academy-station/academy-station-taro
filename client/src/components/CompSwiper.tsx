import { Image, Swiper, SwiperItem, View } from "@tarojs/components";
import Banner from "../assets/imgs/raw/banner.jpg";
import React from "react";

export const CompSwiper = () => {
  return (
    <Swiper
      className="swiper"
      indicatorColor="#999"
      indicatorActiveColor="#333"
      vertical={false}
      circular
      indicatorDots
      autoplay
    >
      <SwiperItem className="swiper-item">
        <View>
          <Image
            src={Banner}
            mode={"center"}
            style={{ height: 150, width: "100%" }}
          />
        </View>
      </SwiperItem>
    </Swiper>
  );
};
