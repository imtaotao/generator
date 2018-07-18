// https://github.com/Microsoft/tslib/blob/master/docs/generator.md

// opthis 中的状态码解释

function gen (ctx, cb) {
  // 该 flag 变量指示 generator 当前是否正在执行，以防止在其执行期间在同一 generator 的再次执行
  let flag = false
  // 该 yieldStar 变量存储传递给 yieldstar 应委托操作的指令的迭代器
  let yieldStar
  /**
   * 该 temporaryVar 变量是一个临时变量，用于存储以下值之一：
   * 从 yield 或恢复时的完成值 yield*
   * catch块的错误值
   * 目前的保护区区域
   * 委托给表达式的动词（next，throw或return方法）yield*
   * 评估委托给表达式的动词的结果yield*
   */
  let temporaryVar

  const state = {
    // 指定要在 cb 函数中执行的下一个开关，每个 try yield yield * 都会导致 label 改变
    label: 0,
    // 一堆保护区域，它们是4元组，用于描述构成try..catch..finally块的标签
    tys: [],
    // 用于try..finally块的待处理操作的堆栈。[try, catch, finally, end]
    ops: [],
    sent () {
      // 如果 temporaryVar 保存的是一个 throw 就代表发送错或者外部调用 throw 方法了
      if (temporaryVar[0] & 1) {
        throw temporaryVar[1]
      }

      return temporaryVar[1]
    }
  }

  return {
    'next': verb(0),
    'throw': verb(1),
    'return': verb(2),
  }

  function verb(n) {
    return val => step([n, val])
  }

  function step (opts) {
    if (flag) throw 'Generator is already executing'
    // 遍历 state，知道拿到想要的东西
    while(state) {
      try {
        flag = true

        // 如果 yield* 操作是有存储值的
        if (yieldStar) {
          temporaryVar = opts[0] & 2
            ? 'return'
            : opts[0]
              ? 'throw'
              : 'next'

          // 如果 t 是一个方法，调用，并且存储返回
          if (!(temporaryVar = temporaryVar.call(y, opts[1]).done)) {
            return temporaryVar
          }
        }

        yieldStar = null

        // 如果 temporaryVar 存在，只可能是 { value: xx, done: boolean }
        if (temporaryVar) {
          opts = [0, temporaryVar.value]
        }

        // 判断 opts 的值
        switch (opts[0]) {
          // 会直接走 cb()，这样做可以直接启动 generator 函数
          case 0 :

          // gen.throw(xx) 调用，保存 opts 然后直接走 cb(), 这样可以让 state.send 方法拿到值
          case 1 :
            t = opts
            break

          // yield xx
          case 4 :

          default:

        }

        op = cb.call(ctx, state)
      } catch (error) {

      } finally {

      }
    }
  }
}