import {parseHtml} from "./parser";

// 实现模版的编译
export function compileToFunctions(template) {

    let ast = parseHtml(template)
    // 模版编译原理
    // 1、先把代码转化为ast语法树 parser解析(正则)
    // 2、标记静态树(优化用) 树得遍历标记
    // 3、通过ast产生的语法树生成 => render()函数  代码生成
}
