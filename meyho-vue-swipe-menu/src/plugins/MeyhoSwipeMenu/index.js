// 导入组件，组件必须声明name
import MeyhoVueSwipeMenu from "@/components/MeyhoVueSwipeMenu.vue"

// 为组件提供install安装方法，供按需引入
MeyhoVueSwipeMenu.install = function (Vue) {
    Vue.component(MeyhoVueSwipeMenu.name, MeyhoVueSwipeMenu)
}

// 默认导出组件
export default MeyhoVueSwipeMenu