import {initMixin} from "./init";
import {renderMixin} from "./render";
import {lifeCycleMixin} from "./lifecycle";
import {initGlobalApi} from "./global-api";

// 混入初始化方法
initMixin(Vue)
// 混入渲染方法
renderMixin(Vue)
// 混入生命周期方法
lifeCycleMixin(Vue)

//初始化全局api，给构造函数扩展全局方法
initGlobalApi(Vue)

function Vue(options) {
    // 内部进行初始化操作
    this._init(options);
}

export default Vue
