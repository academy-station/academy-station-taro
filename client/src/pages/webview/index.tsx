import { WebView } from "@tarojs/components";
import { articles } from "../../ds/articles";

export const PageWebViewArticles2 = (options) => {
  const id = Number.parseInt(options.tid.match(/id=(\d+)/)[1]);

  return <WebView src={articles[id].src} />;
};

export default PageWebViewArticles2;
