const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //匹配插值表达式里的内容

export function parseHtml(html) {
    // 根据html解析成树结构 <div a="1"></div>

    // 树根
    let root;
    // 当前标签
    let currentParent;
    // 标签栈，判断标签是否闭合
    let stack = [];

    // 创建ast语法树
    function createASTHtml(tagName, attrs) {
        return {
            tag: tagName,
            attrs,
            children: [],
            parent: null,
            type: 1 // 1：普通标签  3：文本
        }
    }

    // 开始标签
    function start(tagName, attrs) {
        // console.log(tagName, attrs)
        let element = createASTHtml(tagName, attrs)
        // 如果没有根节点，那么将该节点设为根节点
        if (!root) {
            root = element
        }
        currentParent = element
        stack.push(element)
    }

    // 结束标签
    function end(tagName) {
        // console.log(tagName)
        // 删除栈中的开始标签
        let element = stack.pop();
        let parent = stack[stack.length-1];
        if(parent){
            element.parent = parent;
            parent.children.push(element);
            // 标签结束后，修改当前父节点
            currentParent = parent
        }
    }

    // 文本
    function chars(text) {
        text = text.replace(/\s/g, '');
        if (text) {
            currentParent.children.push({
                type: 3,
                text
            })
        }
    }

    while (html) {
        let textEnd = html.indexOf('<');

        // 匹配标签
        if (textEnd == 0) {
            // 开始标签
            const startTagMatch = parseStartTag();
            if (startTagMatch) {
                // advance(startTagMatch[0].length)
                start(startTagMatch.tagName, startTagMatch.attrs)
            }

            // 结束标签
            const endTagMatch = html.match(endTag)
            if (endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1])
            }
        }

        // 匹配文本
        let text;
        if (textEnd > 0) {
            text = html.substring(0, textEnd) // 截取文本内容
            chars(text);
        }
        if (text) {
            advance(text.length) // 删除文本内容
        }
    }

    // 截取html模版字符串
    function advance(n) {
        html = html.substring(n);
    }

    // 开始标签
    function parseStartTag() {
        const start = html.match(startTagOpen);
        if (start) {
            const match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length)
            let end, attr
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                // console.log(attr)
                advance(attr[0].length)
                // 三种情况：双引号、单引号、不写
                match.attrs.push({name: attr[1], value: attr[3] || attr[4] || attr[5]})
            }
            // 删除结尾
            if (end) {
                advance(end[0].length)
                return match
            }
        }
    }

    return root;
}
