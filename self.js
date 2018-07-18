function getAst (funBody) {
  // 生成 ast
  let stageIndex = 0
  const ast = []
  exec()
  return ast

  function exec () {
    // const reg = /([\s\S])*(?!_yield)(_yield\()?/g
    // 此处也可以用后行断言
    const reg = /((?!_yield)[\s\S])*(_yield\()/g
    const stage = reg.exec(funBody)

    if (stage && stage[0]) {
      ast[stageIndex] = {
        all: stage[0],
        yield: stage[2]
      }
      advance(stage[0].length)
      // 有 yield 语句的时候才需要获取参数
      if (stage[2]) {
        getYieldArg(ast[stageIndex])
      } else {
        stageIndex++
        exec()
      }
    } else {
      // 处理剩下没有 yield 的字符
      if (funBody) {
        ast[stageIndex] = {
          all: funBody,
          yield: null,
        }
      }

      return ast
    }
  }

  function getYieldArg (stage) {
    let currentScope = 1
    let str = ''
    for (let i = 0; i < funBody.length; i++) {
      const s = funBody[i]
      if (currentScope === 0) {
        if (s === ';' || s === ',') str += s
        break
      }
      str += s
      s === '(' && currentScope++
      s === ')' && currentScope--
    }

    stage.all += str
    stage.yield += str
    advance(str.length)
    stageIndex++
    exec()
  }

  function advance (n) {
    funBody = funBody.substring(n)
  }
}

function createGeneratorContext (ast, cb) {
  console.log(ast, cb);

  const genObj = {
    'next': verb('next'),
    'throw': verb('throw'),
    'return': verb('return'),
  }

  function verb (type) {
    // 0 next; 1 thorw; 2 return
    return val => step(type, val)
  }

  function step (type, val) {

  }
}

function createGenCallback (ast) {

}

function gen (...args) {
  return (fun) => {
    const name = fun.name
    let funBody = fun.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1].trim()
    if (!funBody.includes('_yield')) {
      return console.error('fun is not a generator function')
    }

    const ast = getAst(funBody)
    const cb = createGenCallback(ast)

    return createGeneratorContext(ast, cb)
  }
}

gen()(function () {
  _yield('hello');
  _yield('world');
  return 'ending';
})