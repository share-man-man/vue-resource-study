const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //匹配插值表达式里的内容

export function generate(el) {
    const children = genChildren(el)
    let code = `_c("${el.tag}",${!el.attrs.length ? undefined : `${genProps(el.attrs)}`}${children ? `,${children}` : ''})`
    return code;
}

// 处理标签属性，返回js对象的字符串
function genProps(attrs) {
    let str = ''
    for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i]
        // style和class做特殊处理
        if (attr.name === 'style') {
            let obj = {}
            attr.value.split(";").forEach(item => {
                let [key, value] = item.split(":");
                obj[key] = value
            })
            attr.value = obj//将字符串属性换为对象
        }
        str += `${attr.name}:${attr.value ? JSON.stringify(attr.value).replace(/\s*/g, "") : undefined},`
    }
    return `{${str.slice(0, -1)}}`
}

//  生成子节点
function genChildren(el) {
    const children = el.children
    if (children) {
        const returnStr = children.map(c => gen(c)).join(',')
        // console.log(returnStr)
        return returnStr
    } else {
        return false
    }
}

// 生成节点
function gen(node) {
    // 如果自节点是标签，继续递归生成；如果是文本，返回文本
    if (node.type === 1) {
        return generate(node)
    } else {
        let text = node.text
        if (!defaultTagRE.test(text)) {
            return `_v(${JSON.stringify(text)})`
        } else {
            let tokens = []
            let lastIndex = defaultTagRE.lastIndex = 0
            let match, index //匹配结果
            while (match = defaultTagRE.exec(text)) {
                index = match.index
                tokens.push(JSON.stringify(text.slice(lastIndex, index)))
                tokens.push(`_s(${match[1].trim()})`)
                lastIndex = index + match[0].length
                // break
            }
            if (lastIndex < text.length) {
                tokens.push(JSON.stringify(text.slice(lastIndex)))
            }
            return `_v(${tokens.join("+")})`
        }
        return `_v(${text})`
    }
}
