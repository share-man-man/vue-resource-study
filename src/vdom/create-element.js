export function createTextVNode(text) {
    return vnode(undefined, undefined, undefined, undefined, text)
}

export function createElementVNode(tag, data = {}, ...children) {
    let key = data.key
    if (key) {
        delete data.key
    }
    return vnode(tag, data, key, children)
}

function vnode(tag, data, key, children, text) {
    return {
        tag,
        data,
        key,
        children,
        text
        // 源码还有其它属性
    }
}
