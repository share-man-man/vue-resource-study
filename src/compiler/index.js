import {parseHtml} from "./parser";
import {generate} from "./generator";

// 实现模版的编译
export function compileToFunctions(template) {

    // 模版编译原理
    // 1、先把代码转化为ast语法树 parser解析(正则)
    // 2、标记静态树(优化用) 树得遍历标记
    // 3、通过ast产生的语法树生成 => render()函数  代码生成

    // 将模版解析为ast语法树
    let ast = parseHtml(template)
    console.log(ast)
    // 通过ast生成字符串
    let code = generate(ast)
    // console.log(code)
}
