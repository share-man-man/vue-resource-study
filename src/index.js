import {initMixin} from "./init";

function Vue(options) {
    // 内部进行初始化操作
    this._init(options);
}

// 混入初始化方法
initMixin(Vue)

export default Vue
