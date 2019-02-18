// 数组2扩展
// Array.from()
// Array.of()
// 数组实例的 copyWithin()
// 数组实例的 find() 和 findIndex()
// 数组实例的 fill()
// 数组实例的 entries() ，keys() 和 values()
// 数组实例的 includes()
// 数组的空位

// Array.of方法用于将一组值，转换为数组。
{
  let arr = Array.of(3, 4, 7, 9, 11);
  console.log('arr=', arr); // [3,4,7,9,11]

  let empty = Array.of();
  console.log('empty', empty); // []
}
// 类似数组的对象，Array.from将它转为真正的数组。
{
  let p = document.querySelectorAll('p');
  let pArr = Array.from(p);
  pArr.forEach(function (item) {
    console.log(item.textContent);
  });
  // 类似map 映射
  console.log(Array.from([1, 3, 5], function (item) {
    return item * 2
  })); // [2,6,10]
}
// fill方法使用给定值，填充一个数组。
{
  console.log('fill-7', [1, 'a', undefined].fill(7)); // [7, 7, 7]
  // fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
  ['a', 'b', 'c'].fill(7, 1, 2)
  // ['a', 7, 'c']
  // 上面代码表示，fill方法从 1 号位开始，向原数组填充 7，到 2 号位之前结束。

  // 注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
  let arr = new Array(3).fill({
    name: "Mike"
  });
  arr[0].name = "Ben";
  arr
  // [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

  let arr = new Array(3).fill([]);
  arr[0].push(5);
  arr
  // [[5], [5], [5]]
}
// entries() ，keys()和values() ——用于遍历数组
// keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
{
  for (let index of ['1', 'c', 'ks'].keys()) {
    console.log('keys', index); // 0 1 2
  }
  for (let value of ['1', 'c', 'ks'].values()) {
    console.log('values', value); // '1', 'c', 'ks
  }
  for (let [index, value] of ['1', 'c', 'ks'].entries()) {
    console.log('values', index, value);
  }
  // 如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
  let letter = ['a', 'b', 'c'];
  let entries = letter.entries();
  console.log(entries.next().value); // [0, 'a']
  console.log(entries.next().value); // [1, 'b']
  console.log(entries.next().value); // [2, 'c']

}
// copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
// Array.prototype.copyWithin(target, start = 0, end = this.length)
// 它接受三个参数
// target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
// start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
// end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
{
  console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4));
  // copyWithin()会连空位一起拷贝。
  [, 'a', 'b', , ].copyWithin(2, 0) // [,"a",,"a"]
  // 将3号位复制到0号位
  [1, 2, 3, 4, 5].copyWithin(0, 3, 4)
  // [4, 2, 3, 4, 5]

  // -2相当于3号位，-1相当于4号位
  [1, 2, 3, 4, 5].copyWithin(0, -2, -1)
  // [4, 2, 3, 4, 5]

  // 将3号位复制到0号位
  [].copyWithin.call({
    length: 5,
    3: 1
  }, 0, 3)
  // {0: 1, 3: 1, length: 5}

  // 将2号位到数组结束，复制到0号位
  let i32a = new Int32Array([1, 2, 3, 4, 5]);
  i32a.copyWithin(0, 2);
  // Int32Array [3, 4, 5, 4, 5]

  // 对于没有部署 TypedArray 的 copyWithin 方法的平台
  // 需要采用下面的写法
  [].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
  // Int32Array [4, 2, 3, 4, 5]
}

// 数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，
// 所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
{
  [1, 4, -5, 10].find((n) => n < 0)
  // -5
  [1, 5, 10, 15].find(function (value, index, arr) {
    return value > 9;
  }) // 10
}
// 数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回 - 1。
{
  [1, 5, 10, 15].findIndex(function (value, index, arr) {
    return value > 9;
  }) // 2
  function f(v) {
    return v > this.age;
  }
  let person = {
    name: 'John',
    age: 20
  };
  [10, 12, 26, 15].find(f, person); // 26
}
// Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似
{
  [1, 2, 3].includes(2) // true
  [1, 2, 3].includes(4) // false
  [1, 2, NaN].includes(NaN) // true
  // 第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为 - 4，但数组长度为3），则会重置为从0开始。
  [1, 2, 3].includes(3, 3); // false
  [1, 2, 3].includes(3, -1); // true

  [NaN].indexOf(NaN)
  // -1
  [NaN].includes(NaN)
  // true
}
