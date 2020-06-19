import {createTextVNode, createElementVNode} from "./vdom/create-element";

export function renderMixin(Vue) {
    // console.log('初始化render方法')
    Vue.prototype._render = function () {
        // console.log('调用了_render()方法')
        const vm = this
        const {render} = vm.$options
        Vue.prototype._v = function (text) {
            // 创建文本的虚拟节点
            // console.log('v')
            return createTextVNode(text)
        }
        Vue.prototype._c = function () {
            // console.log('c')
            // 创建标签的虚拟节点
            return createElementVNode(...arguments)
        }
        Vue.prototype._s = function (val) {
            // 判断当前的是否为对象，防止出现 [object,object]
            return !val ? '' : typeof val === 'object' ? JSON.stringify(val) : val
        }
        let vnode = render.call(vm)
        return vnode
    }
}
