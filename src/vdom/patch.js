export function patch(oldNode, newNode) {
    // console.log(oldNode, newNode)

    const isRealElm = oldNode.nodeType
    if (isRealElm) {
        // 真实元素，将创建的新元素插入到老元素后面，再删除老元素
        let newEl = createElm(newNode)
        // console.log(newEl, newNode)
        let oldElm = oldNode
        let parentElm = oldNode.parentNode
        parentElm.insertBefore(newEl, oldElm.nextSibling)
        parentElm.removeChild(oldElm)
        return newEl
    } else {
        // diff算法
    }
}

// 递归创建节点和子节点
function createElm(vnode) {
    let {tag, children, data, key, text} = vnode
    if (typeof tag === 'string') {
        // 元素
        vnode.el = document.createElement(tag)
        // 更新属性
        updateProperties(vnode)
        // 遍历子元素，将生成的真实dom放到el中去
        children.forEach(item => {
            vnode.el.appendChild(createElm(item))
        })
    } else {
        // 普通文本
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}

// 跟新属性
function updateProperties(vnode) {
    let el = vnode.el
    let newProps = vnode.data || {}
    // console.log(data)
    for (let key in newProps) {
        if (key === 'style') {
            Object.assign(el.style, newProps.style)
        }
        // event slot........
        else {
            el.setAttribute(key, newProps[key])
        }
    }
}
