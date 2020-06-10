const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //匹配插值表达式里的内容

export function parseHtml(html) {
    // 根据html解析成树结构 <div a="1"></div>

    while (html) {
        let textEnd = html.indexOf('<');
        // 匹配标签
        if (textEnd == 0) {
            const startTagMatch = parseStartTag();

            // 结束标签
            if (startTagMatch) {
                // 开始标签
                // console.log(startTagMatch)
                start(startTagMatch.tagName, startTagMatch.attrs)
            }
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

    function start(tagName, attrs) {
        console.log(tagName,attrs)
    }

    function end(tagName) {
        console.log(tagName)
    }

    function chars(text) {
        console.log(text)
    }


    // 截取html模版字符串
    function advance(n) {
        html = html.substring(n);
    }

    //
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
}
