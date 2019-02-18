{
  console.log('a', `\u0061`); // a a
  console.log('s', `\u20BB7`); // s 不能正常输出字节大于2的字符 添加括号解决

  console.log('s', `\u{20BB7}`); // s 𠮷
}


{
  let s = '𠮷';
  console.log('length', s.length); // 2
  console.log('0', s.charAt(0)); // 乱码
  console.log('1', s.charAt(1)); // 乱码
  console.log('at0', s.charCodeAt(0)); // 55362   charCodeAt取两字节
  console.log('at1', s.charCodeAt(1)); // 57271 

  let s1 = '𠮷a';
  console.log('length', s1.length); // 3
  console.log('code0', s1.codePointAt(0)); // 134071 10进制
  console.log('code0', s1.codePointAt(0).toString(16)); // 20bb7 16进制
  console.log('code1', s1.codePointAt(1)); // 57271 
  console.log('code2', s1.codePointAt(2)); // 97
}

{
  console.log(String.fromCharCode("0x20bb7"));
  console.log(String.fromCodePoint("0x20bb7")); // "𠮷"
}

{
  let str = '\u{20bb7}abc';
  for (let i = 0; i < str.length; i++) {
    console.log('es5', str[i]); //  乱码 乱码 a b c
  }
  for (let code of str) {
    console.log('es6', code); //  𠮷 a b c
  }
}


// includes()： 返回布尔值， 表示是否找到了参数字符串。
// startsWith()： 返回布尔值， 表示参数字符串是否在原字符串的头部。
// endsWith()： 返回布尔值， 表示参数字符串是否在原字符串的尾部。

{
  let str = "string";
  console.log('includes', str.includes("c")); // false
  console.log('start', str.startsWith('str')); // true
  console.log('end', str.endsWith('ng')); // true
}
// repeat方法返回一个新字符串， 表示将原字符串重复n次。
{
  let str = "abc";
  console.log(str.repeat(2)); // abcabc
  'na'.repeat(0) // ""
  // 参数如果是小数， 会被取整。
  'na'.repeat(2.9) // "nana"
  // 如果repeat的参数是负数或者Infinity， 会报错。

  'na'.repeat(Infinity)
  // RangeError
  'na'.repeat(-1)
  // RangeError
  // 但是， 如果参数是 0 到 - 1 之间的小数， 则等同于 0， 这是因为会先进行取整运算。 0 到 - 1 之间的小数， 取整以后等于 - 0， repeat视同为 0。
  'na'.repeat(-0.9) // ""
  // 参数NaN等同于 0。
  'na'.repeat(NaN) // ""
  // 如果repeat的参数是字符串， 则会先转换成数字。
  'na'.repeat('na') // ""
  'na'.repeat('3') // "nanana"
}

//模板字符串
{
  let name = "list";
  let info = "hello world";
  let m = `i am ${name},${info}`;
  console.log(m);
}


// padStart()， padEnd()
// ES2017 引入了字符串补全长度的功能。 如果某个字符串不够指定长度， 会在头部或尾部补全。 padStart() 用于头部补全， padEnd() 用于尾部补全。
{
  // padStart和padEnd一共接受两个参数， 第一个参数用来指定字符串的最小长度， 第二个参数是用来补全的字符串。

  console.log('1'.padStart(2, '0')); // '01
  console.log('1'.padEnd(2, '0')); // '20'

  'x'.padStart(5, 'ab') // 'ababx'
  'x'.padStart(4, 'ab') // 'abax'

  'x'.padEnd(5, 'ab') // 'xabab'
  'x'.padEnd(4, 'ab') // 'xaba'

  // 如果原字符串的长度， 等于或大于指定的最小长度， 则返回原字符串。
  'xxx'.padStart(2, 'ab') // 'xxx'
  'xxx'.padEnd(2, 'ab') // 'xxx'
}

//标签模板
{
  let user = {
    name: 'list',
    info: 'hello world'
  };
  console.log(abc `i am ${user.name},${user.info}`);

  function abc(s, v1, v2) {
    console.log(s, v1, v2);
    return s + v1 + v2
  }
}

{
  console.log(String.raw `Hi\n${1+2}`); // Hi\3 不换行
  console.log(`Hi\n${1+2}`); // Hi 3 换行
}