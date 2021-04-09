import { Component } from "react";
import "./app.scss";
import Taro from "@tarojs/taro";
import loadUserData from "./functions/loadUserData";

class App extends Component {
  async onLaunch() {}

  async componentDidShow() {
    console.log("======  Load  ======");
    // 云初始化，必须步骤，程序运行期间只需运行一次
    Taro.cloud.init({ traceUser: true });

    await loadUserData();
  }

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
