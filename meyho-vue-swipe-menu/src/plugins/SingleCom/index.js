// 导入组件，组件必须声明name
import SingleCom from "@/components/SingleCom";

//为SingleCom组件提供install安装方法，供按需引入
SingleCom.install = function(Vue) {
  Vue.component(SingleCom.name, SingleCom);
};

// 默认导出组件
export default SingleCom;
