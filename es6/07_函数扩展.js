// 函数参数的默认值
{
  //es5
  function log(x, y) {
    y = y || 'World';
    console.log(x, y);
  }
  //es6
  function log(x, y='world') {
    console.log(x, y);
  }

  log('Hello') // Hello World
  log('Hello', 'China') // Hello China
  log('Hello', '') // Hello World
}

// 作用域
{
  let x = 'test';

  function test2(x, y = x) {
    console.log('作用域', x, y);
  }
  test2('kill'); // kill kill

  let x = 1;

  function f(y = x) {
    let x = 2;
    console.log(y);
  }
  f() // 1
  // 上面代码中，函数f调用时，参数y = x形成一个单独的作用域。这个作用域里面，
  // 变量x本身没有定义，所以指向外层的全局变量x。函数调用时，函数体内部的局部变量x影响不到默认值变量x。


  // 如果此时，全局变量x不存在，就会报错。
  function f(y = x) {
    let x = 2;
    console.log(y);
  }
  f() // ReferenceError: x is not defined

  var x = 1;

  function foo(x = x) {
    // ...
  }
  foo() // ReferenceError: x is not defined
}


// rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了

// arguments[0]执行method第一个参数：fn, 所以arguments[0]()的意思就是：fn() 。
// 此时, this执向arguments, 当前method调用传人了1个参数, arguments => [0：fn，callee: fn, length: 1]

{
  function test3(...arg) {
    for (let v of arg) {
      console.log('rest', v);
    }
  }
  test3(1, 2, 3, 4, 'a'); // 1 2 3 4 'a'
}

{
  console.log(...[1, 2, 4]); // 1 2 4
  console.log('a', ...[1, 2, 4]); // 'a' 1 2 4
}

// 箭头函数 this指向定义时的对象
//不能作为构造函数使用
// 没有arguments对象
{
  // arrow函数名 v参数 v*2函数体 返回值
  let arrow = v => v * 2;
  let arrow2 = () => 5;
  console.log('arrow', arrow(3));
  console.log(arrow2());

  // 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
  // 报错
  let getTempItem = id => { id: id, name: "Temp" };

  // 不报错
  let getTempItem = id => ({ id: id, name: "Temp" });

}



//伪调用
{
  function tail(x) {
    console.log('tail', x);
  }

  function fx(x) {
    return tail(x)
  }
  fx(123); //123
}

