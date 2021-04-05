import { Component } from "react";
import "./app.scss";
import Taro from "@tarojs/taro";
import { API } from "./ds";

const funcLogIn = () => {
  Taro.login({
    success: (resLogin) => {
      Taro.getUserInfo({
        success: (res) => {
          let userData = res.userInfo;
          Taro.request({
            url: API.API_USER_LOGIN,
            data: { js_code: resLogin.code },
            success: (resLoginBackend) => {
              userData = { ...userData, ...resLoginBackend.data };
              console.log({ userData });
              Taro.setStorageSync("data", userData);
              console.log("Successfully set userData into local storage");
            },
          });
        },
      });
    },
  });
};

class App extends Component {
  componentDidMount() {
    Taro.getStorage({
      key: "data",
      fail: () => {
        console.log("Not found key of data in local storage.");
        console.log("try logging...");
        funcLogIn();
      },
      success: (res) => {
        console.log("Found key of data in local storage.");
        console.log(res.data);
      },
      complete: () => {
        console.log("初始化用户数据完成");
      },
    });
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
