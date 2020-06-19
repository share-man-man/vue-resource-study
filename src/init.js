import {initState} from "./state";
import {compileToFunctions} from "./compiler/index";
import {mountComponent} from "./lifecycle";

export function initMixin(Vue) {

    Vue.prototype._init = function (options) {
        const vm = this;
        vm.$options = options
        //初始化 data props watch method等
        initState(vm)//初始化状态
        // 通过模板进行渲染
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }


    Vue.prototype.$mount = function (el) { //可能是字符串，或者是一个dom对象

        // 如果同时传入template 和 render 默认会采用render，抛弃template
        // 如果都没传，就是用id=app的模版
        const vm = this;
        el = vm.$el = document.querySelector(el)
        const opts = vm.$options;

        // 没有render才需要编译
        if (!opts.render) {
            let template = vm.$options.template
            if (!template && el) {
                template = el.outerHTML
            }
            // 还有注释节点、事件、自闭和标签、插槽等没处理
            const render = compileToFunctions(template);
            opts.render = render;
            // console.log(opts.render)
        }

        // 挂载组件
        mountComponent(vm, el)


    }
}
