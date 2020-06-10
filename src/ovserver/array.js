// 获取数组本来的方法
let oldArrayMethods = Array.prototype; //获取array对象的原型方法

// 创建数组对象，不会改变array的原型方法
export let arrayMethods = Object.create(oldArrayMethods);

let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'sort',
    'reverse',
    'splice'
]

methods.forEach(method => {
    arrayMethods[method] = function (...args) { //函数劫持 aop
        const ob = this.__ob__;
        // 当用户调用数组方法是，会先执行自己改造的逻辑，在执行数组原型方法
        let result = oldArrayMethods[method].apply(this, args);
        let inserted;
        // push unshift splice 都会新增属性(可能是对象)
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice': // [].splice(arr,1,'xiaomanman')
                inserted = args.slice(2);
                break
            default:
                break;
        }
        inserted && ob.observeArray(inserted)
        return result
    }
})
