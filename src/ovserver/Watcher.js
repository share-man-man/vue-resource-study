import {pushTarget, popTarget} from "./dep";

let id = 0

class Watcher {
    constructor(vm, exprOrFn, cb, options) {
        // console.log(vm)
        // exprOrFn()
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        this.cn = cb;
        this.options = options;
        if (typeof exprOrFn === 'function') {
            this.getter = exprOrFn;
        }
        this.id = id++
        this.get()
    }

    get() {
        // 先把渲染watcher放到全局上
        pushTarget(this);
        // 在页面取值，自动添加依赖
        this.getter();
        // 取完后再删除
        popTarget();
    }
}

export default Watcher
