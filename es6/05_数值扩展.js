// ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示
{
  console.log('B', 0B111110111); // 503
  console.log(0o767); // 503
}
// Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity。
{
  Number.isFinite(15); // true
  Number.isFinite(0.8); // true
  Number.isFinite(NaN); // false
  Number.isFinite(Infinity); // false
  Number.isFinite(-Infinity); // false
  Number.isFinite('foo'); // false
  Number.isFinite('15'); // false
  Number.isFinite(true); // false
}
// Number.isNaN()用来检查一个值是否为NaN。
{
  Number.isNaN(NaN) // true
  Number.isNaN(15) // false
  Number.isNaN('15') // false
  Number.isNaN(true) // false
  Number.isNaN(9 / NaN) // true
  Number.isNaN('true' / 0) // true
  Number.isNaN('true' / 'true') // true
}
// Number.isInteger()用来判断一个数值是否为整数。
{
  console.log('25', Number.isInteger(25)); // true
  console.log('25.0', Number.isInteger(25.0)); // true
  console.log('25.1', Number.isInteger(25.1)); // false
  console.log('25.1', Number.isInteger('25')); // false 
  //误判
  Number.isInteger(3.0000000000000002) // true
  Number.isInteger(5E-324) // false
  Number.isInteger(5E-325) // true
  // 如果对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。
}
// Number.isSafeInteger()则是用来判断一个整数是否为安全数。
{
  console.log(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
  console.log('10', Number.isSafeInteger(10));
  console.log('a', Number.isSafeInteger('a'));
}

// Math.trunc方法用于去除一个数的小数部分，返回整数部分。
{
  Math.trunc(4.1) // 4
  Math.trunc(4.9) // 4
  Math.trunc(-4.1) // -4
  Math.trunc(-4.9) // -4
  Math.trunc(-0.1234) // -0
  // 对于非数值，Math.trunc内部使用Number方法将其先转为数值。
  Math.trunc('123.456') // 123
  Math.trunc(true) //1
  Math.trunc(false) // 0
  Math.trunc(null) // 0
  // 对于空值和无法截取整数的值，返回NaN。
  Math.trunc(NaN); // NaN
  Math.trunc('foo'); // NaN
  Math.trunc(); // NaN
  Math.trunc(undefined) // NaN
}
// Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
// 它会返回五种值。
// 参数为正数，返回 + 1；
// 参数为负数，返回 - 1；
// 参数为 0，返回0；
// 参数为 - 0，返回 - 0;
// 其他值，返回NaN。
{
  Math.sign(-5) // -1
  Math.sign(5) // +1
  Math.sign(0) // +0
  Math.sign(-0) // -0
  Math.sign(NaN) // NaN
}

// Math.cbrt方法用于计算一个数的立方根。
{
  Math.cbrt(-1) // -1
  Math.cbrt(0) // 0
  Math.cbrt(1) // 1
  Math.cbrt(2) // 1.2599210498948734
  Math.cbrt('8') // 2
  Math.cbrt('hello') // NaN
}