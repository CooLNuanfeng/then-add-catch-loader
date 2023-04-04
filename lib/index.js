const recast = require('recast')
const babel7 = require('recast/parsers/babel')
const { parse } = require("@babel/parser");
const {
  identifier: id,
  memberExpression,
  callExpression,
  blockStatement,
  arrowFunctionExpression,
  expressionStatement
} = recast.types.builders
const t = recast.types.namedTypes

// function printSource (source) {
//   console.log(recast.print(source).code)
// }

module.exports = function(source, map, meta){
  // console.log(source, map, meta)
  const ast = babel7.parse(source, { parser: { 
    parse(source) {
      return parse(source, {
        sourceType: 'module',
        plugins: ['jsx']
      })
    }
   } })
  // console.log(ast)

  recast.visit(ast, {
    visitCallExpression (path) {
      this.traverse(path)
      let { node } = path
      // printSource(node)
      if (
        t.Identifier.check(node.callee.property) &&
        node.callee.property.name === 'then'
      ){
        let parentPath = path.parentPath
        if(parentPath && t.MemberExpression.check(parentPath.value) && parentPath.value.property.name === 'catch') return false // 父节点有catch则跳过
        // printSource(node.callee)
        const defaultExp = callExpression(
          memberExpression(id('console'), id('log')),
          [id('error')]
        )
        const defaultArrowFunc = arrowFunctionExpression([
          id('error')
        ], blockStatement([
          expressionStatement(defaultExp)
        ]))
        // printSource(defaultArrowFunc)

        const originFunc = callExpression(node.callee, node.arguments)
        const catchFunc = callExpression(id('catch'), [defaultArrowFunc])
        const newFunc = memberExpression(originFunc, catchFunc)
        // printSource(newFunc)
        path.replace(newFunc)
      }

      return false
    }
  })
  let code = recast.print(ast).code
  // console.log('=============')
  // console.log(code)
  return code
}