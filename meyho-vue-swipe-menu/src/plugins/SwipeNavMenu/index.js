// 导入组件，组件必须声明name
import SwipeNavMenu from "@/components/SwipeNavMenu";

//为SwipeNavMenu组件提供install安装方法，供按需引入
SwipeNavMenu.install = function(Vue) {
  Vue.component(SwipeNavMenu.name, SwipeNavMenu);
};

// 默认导出组件
export default SwipeNavMenu;
