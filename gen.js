
//参数：
//   @param thisArg用作转换后的生成器主体的`this`绑定的值。
//   @param body充当转换后的生成器主体的函数。
//
//变量：
//   _助手和助手之间共享的生成器的持久状态
//           发电机体 state对象具有以下成员：
//             sent（） - 返回或抛出当前完成值的方法。
//             label  - 继续评估生成器主体的下一个点。
//             trys  - 一堆受保护区域（try / catch / finally块）。
//             ops  - 在finally块内部的一堆挂起指令。
//   f表示生成器是否正在执行的值。
//   y委托yield *的迭代器。
//   t一个临时变量，它包含以下值之一（请注意这些值
//           案例不重叠）：
//           - 从`yield`或`yield *`恢复时的完成值。
//           -  catch块的错误值。
//           - 当前受保护的区域（try / catch / finally / end标签的数组）。
//           - 委托表达式的动词（`next`，`throw`或`return`方法）
//             一个`yield *`。
//           - 评估委托给`yield *`表达式的动词的结果。
//

//   0：next（value？） - 使用指定值启动或恢复生成器。
//   1：throw（错误） - 使用异常恢复生成器。如果发电机是
//                         暂停在一个或多个受保护区域内，进行评估
//                         任何介入的最终阻止当前标签和
//                         最近的catch块或函数边界。如果没有被捕，那么
//                         向调用者抛出异常。
//   2：return（value？） - 恢复生成器，就像返回一样。如果发电机是
//                         暂停在一个或多个受保护区域内，评估任何
//                         干涉最后的块。
//   3：break（label） - 跳转到指定的标签。如果标签在...之外
//                         当前受保护区域，最终评估任何干预
//                         块
//   4：yield（value？） - 使用可选值对调用者执行生成。什么时候
//                         恢复，生成器将继续下一个标签。
//   5：yield *（value） - 将评估委托给提供的迭代器。什么时候
//                         委托完成后，生成器将在下一个继续
//                         标签
//   6：catch（错误） - 处理从生成器体内抛出的异常。如果
//                         当前标签位于一个或多个受保护区域内
//                         评估当前之间的任何干预最终块
//                         label和最近的catch块或函数边界。如果
//                         未被捕获，异常被抛出给调用者。
//   7：endfinally  - 结束finally块，恢复之前的最后一条指令
//                         输入finally块。
var __generator = (this && this.__generator) || function (thisArg, body) {
    var f // 保证 next 在调用的时候不能受到影响
    var y
    var t // 存储着 next 进来的值
    var g = { // generator 对象
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }
    // 遍历器接口
    if (typeof Symbol === "function" ) {
      g[Symbol.iterator] = function() {
        return this;
      }
    }

    // state
    var _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1) {
          throw t[1];
        }

        return t[1];
      },
      trys: [],
      ops: []
    }

    return g;

    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }

    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_) {

          try {
            f = 1
            // 该语句的前两个语句try..finally处理委托yield*：
            // --- start ---
            // 如果y变量已设置，并且y有一个next，throw或return方法（取决于当前操作），我们将调用此方法并存储返回值（IteratorResult）t
            if (y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) {
              return t;
            }
            y = false

            console.log(t);
            if (t) {
              op = [0, t.value];
            }
            // --- end ---
            // console.log(_.trys[0], op);
            switch (op[0]) {
                case 0: // 如果是 0, 是 next 就走 default

                // 是 throw, 让 t = op, 在 send 的时候就会拿到 t,
                // 然后调用 body 回调， throw 被 catch 捕捉到
                case 1: // throw
                  t = op;
                  break;
                case 4: // 是 代表 next 已经经过 default 了
                  _.label++;
                  return { value: op[1], done: false };
                // yield *
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:

                    // 如果已经有 try，获取第一行当前受保护区域并将其存储在t临时变量中
                    t = _.trys;
                    t = t.length > 0 && t[t.length - 1];
                    // 如果我们遇到操作码6（“捕获”）或操作码2（“返回”），并且我们不在受保护区域中
                    if (!t && (op[0] === 6 || op[0] === 2)) {
                      // 就完成了这一次的 generator 操作，因为报错了，所以后面的 next 或者 return 都会被放弃
                      _ = 0;
                      continue;
                    }
                    // --- 只要 op[0] 为 6 或者 2，继续往下走肯定有 trys
                    // 3 代表在 try 之内的代码
                    // 如果在 try 之外 而且没有 try 或者当前代码没有在 try 里面，就让 label 为 op[1]
                    // 此时 op[1] 为 finally 时的位置
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                      _.label = op[1];
                      break;
                    }
                    // 这里肯定有 try 不然在上上面就 continue 了
                    // 如果语句在受保护区域的 try 块内处 6 (错误)
                    if (op[0] === 6 && _.label < t[1]) {
                      // 在这种情况下，我们跳转到catch块（如果存在）。
                      _.label = t[1];
                      // 我们将 t 的值替换为操作，以便可以将异常读取为转换后的生成器主体的转换catch子句的第一个语句。
                      t = op;
                      break;
                    }
                    // 处理带有子句 try catch 里面的 finally 的代码，只要我们还没有在finally子句中
                    if (t && _.label < t[2]) {
                      // 我们就跳转到finally子句
                      _.label = t[2];
                      // 并将挂起的操作推送到_.ops堆栈中
                      // 这允许我们在完成finally子句的执行后继续执行挂起操作，只要它不用它自己的完成值取代此操作。
                      _.ops.push(op);
                      break;
                    }
                    // finally 子句中的任何其他 完成值 将取代try or catch子句中的挂起完成值。上面的if语句从堆栈中弹出挂起的完成
                    if (t[2]) {
                      _.ops.pop();
                    }
                    // 处理我们退出受 try catch 的点。这里我们从堆栈中弹出当前 try catch
                    // 并继续 while 语句以在下一个 try catch 或函数边界再次评估当前操作。
                    _.trys.pop();
                    continue;
            }

            op = body.call(thisArg, _);
        }
        catch (e) {
          op = [6, e];
          y = 0;
        }
        finally {
          f = t = 0;
        }
      }

      // 到这里的只有可能是 1，6 会被捕获
      // 可以替换为 if (op[0] === 1 || op[0] === 6) throw op[1]
      if (op[0] & 5) {
        throw op[1];
      }

      // 如果为 next，op[0] 为 0
      // 如果为 return, op[0] 为 2
      return { value: op[0] ? op[1] : undefined, done: true };
    }
};

function * a() {
  try {
      const aa = yield 'tt'
  } catch (e) {
      1 + 1
  }

  try {
      const bb = yield 'ff'
  } catch (e) {}
}

function a() {
  var aa, e_1, bb, e_2;
  return __generator(this, function (_a) {
      switch (_a.label) {
        // 遇到 try 就往 trys push
        // 有四个位置 [try位置， catch位置, finally 位置， 结束位置]

        // 遇见 try 首先 push 位置，然后插入正常的代码片段(通过ast获取))
        // 知道遇见 yield 语句的，在这里return [一个当前方法的index, 1*]
        // 1* 如果是 yield 基本是就是 一个值
        //    如果是 return 基本上也是一个值
        //    如果是 break 是一个当前 try catch 结束的位置
          case 0:
              _a.trys.push([0, 2, , 3]);
              a++
              return [4 /*yield*/, 'tt'];

          // 从 yeild 断开的地方继续执行，里面包含的代码是 yield 结束到 try 结束
          // 在 yeild 断开恢复的第一个代码块，需要 a.send 拿到 next(或者 throw)进来的值，不管有不有变量接着
          // try 所有代码完成之后 break 调到 trys 当前单元所标记的最后一个值
          case 1:
              aa = _a.sent();
              return [3 /*break*/, 3];
          //
          case 2:
              e_1 = _a.sent();
              1 + 1;
              return [3 /*break*/, 3];
          case 3:
              _a.trys.push([3, 5, , 6]);
              return [4 /*yield*/, 'ff'];
          case 4:
              bb = _a.sent();
              return [3 /*break*/, 6];
          case 5:
              e_2 = _a.sent();
              return [3 /*break*/, 6];
          case 6: return [2 /*return*/];
      }
  });
}

var __values = (this && this.__values) || function (o) {
  var m = typeof Symbol === "function" && o[Symbol.iterator]
  i = 0;
  if (m) return m.call(o);
  return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
};