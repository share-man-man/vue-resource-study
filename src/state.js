import {observer} from './ovserver/index.js'

export function initState(vm) {
    const opts = vm.$options
    if (opts.data) {
        initData(vm)
    }
    // ...
}

// 代理函数
function proxy(target, property, key) {
    Object.defineProperty(target, key, {
        get() {
            return target[property][key]
        },
        set(v) {
            target[property][key] = v
        }
    })
}


function initData(vm) {
//    数据响应式原理
    let data = vm.$options.data;//用户传入的数据
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    // 将数据代理到实例上
    for (let key in data) {
        proxy(vm, '_data', key)
    }

    // 观测数据
    observer(data)
    // console.log(data)
}
