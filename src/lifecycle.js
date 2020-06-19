import Watcher from "./ovserver/Watcher";
import {patch} from "./vdom/patch";

export function mountComponent(vm, el) {
    // vue在渲染过程中创建一个 渲染watcher 每次数据变化，更新视图

    const updateComponent = () => {
        // _render() => options.render()
        // _update() => 将虚拟dom改成真实dom
        vm._update(vm._render())
    }

    new Watcher(vm, updateComponent, () => {
    }, true)

}

export function lifeCycleMixin(Vue) {
    // console.log('初始化_update()方法')
    Vue.prototype._update = function (vnode) {
        // console.log('调用了_update方法')
        const vm = this
        // 传入虚拟dom和el，返回真实dom，并替换上去
        vm.$el = patch(vm.$el, vnode)
        //
    }
}
