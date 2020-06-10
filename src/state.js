import {observer} from './ovserver/index.js'

export function initState(vm) {
    const opts = vm.$options
    if (opts.data) {
        initData(vm)
    }
    // ...
}


function initData(vm) {
//    数据响应式原理
    let data = vm.$options.data;//用户传入的数据

    data = vm._data = typeof data === 'function' ? data.call(vm) : data;

    // 观测数据
    observer(data)
    // console.log(data)
}
