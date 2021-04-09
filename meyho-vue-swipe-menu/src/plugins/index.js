// 导入组件，组件必须声明name
import MyMenu from "@/plugins/MeyhoSwipeMenu"
import SingleCom from "@/plugins/SingleCom";
const components = [ MyMenu, SingleCom ]

const install = function(Vue) {
    // 判断是否安装
    if (install.installed) return // 遍历注册全局组件
    components.map(component => Vue.component(component.name, component))
}

const plugin = {
    // 导出的对象必须具有install，才能被Vue.use()方法安装
    install,
    SingleCom
};

// 判断是否直接引入文件
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue)
}

// 默认导出组件
export default plugin;