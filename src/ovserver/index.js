import {isObject} from "../util";
import {arrayMethods} from "./array";

//es6的类
class Observer {
    constructor(data) {
        // 在数据上可以获取__ob__属性 ，指代Observer实例，__ob__是一个响应式的标实
        Object.defineProperty(data, '__ob__', {
            enumerable: false, // 不可枚举，防止递归观测的时候死循环
            configurable: false,// 不肯配置
            value: this
        })
        // 对数组索引进行拦截，性能查，直接更改数组索引并不多
        if (Array.isArray(data)) {
            // vue的数组变异方法
            data.__proto__ = arrayMethods; // 通过原型链向上查找的方式，先找自身的方法
            this.observeArray(data)
        } else {
            this.walk(data);// 对数据一步一步的处理
        }
    }

    observeArray(data) {
        for (let i = 0; i < data.length; i++) {
            observer(data[i])
        }
    }

    walk(data) {
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key]);
        })
    }
}

// vue2性能问题，递归重写get和set
function defineReactive(data, key, value) {
    // 如果传入的值还是一个对象，进行递归监测
    observer(value)

    // 监测对象
    Object.defineProperty(data, key, {
        get() {
            return value;
        },
        set(newValue) {
            if (value == newValue) return;
            observer(newValue) // 如果新传入的值为对象，那么递归执行
            value = newValue
        }
    })
}

export function observer(data) {
    // 使用defineProperty实现响应式

    // 判断是否对象
    if (!isObject(data)) {
        return;
    }
    // 防止对象被重复观测
    if (data.__ob__ instanceof Observer) {
        return;
    }

    // 对数据拦截
    return new Observer(data); // 可以看到当前数据是否被观测
}
