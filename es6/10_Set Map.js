// ## Set 结构的实例有以下属性。

//   Set.prototype.constructor：构造函数，默认就是Set函数。
//   Set.prototype.size：返回Set实例的成员总数。
//   Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。
//   下面先介绍四个操作方法。
//   add(value) ：添加某个值，返回 Set 结构本身。
//   delete (value) ：删除某个值，返回一个布尔值，表示删除是否成功。
//   has(value) ：返回一个布尔值，表示该值是否为Set的成员。
//   clear() ：清除所有成员，没有返回值。

// 遍历操作
// Set 结构的实例有四个遍历方法，可以用于遍历成员。
// keys() ：返回键名的遍历器
// values() ：返回键值的遍历器
// entries() ：返回键值对的遍历器
// forEach() ：使用回调函数遍历每个成员

// Set类似数组 但值不能重复
{
  let list = new Set();
  list.add(5);
  list.add(7);

  console.log('size', list.size);
}

{
  let arr = [1, 2, 3, 4, 5];
  let list = new Set(arr);

  console.log('size', list.size);
}

{
  let list = new Set();
  list.add(1);
  list.add(2);
  list.add(1);

  console.log('list', list); // [1,2]

  let arr = [1, 2, 3, 1, '2'];
  let list2 = new Set(arr);

  console.log('unique', list2); // 去重 但不做数据类型转换
}

{
  let arr = ['add', 'delete', 'clear', 'has'];
  let list = new Set(arr);

  console.log('has', list.has('add'));
  console.log('delete', list.delete('add'), list);
  list.clear();
  console.log('list', list);
}

{
  let arr = ['add', 'delete', 'clear', 'has'];
  let list = new Set(arr);

  for (let key of list.keys()) {
    console.log('keys', key); // add,delete ,clear,has
  }
  for (let value of list.values()) {
    console.log('value', value); // add,delete,clear,has
  }
  for (let [key, value] of list.entries()) {
    console.log('entries', key, value);
  }

  list.forEach(function (item) {
    console.log(item);
  }) // add,delete ,clear,has
}


// WeakSet 结构有以下三个方法。
// WeakSet.prototype.add(value) ：向 WeakSet 实例添加一个新成员。
// WeakSet.prototype.delete(value) ：清除 WeakSet 实例的指定成员。
// WeakSet.prototype.has(value) ：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。
// WeakSet 没有size属性，没有办法遍历它的成员。
// ws.size // undefined
// ws.forEach // undefined
// ws.forEach(function (item) { console.log('WeakSet has ' + item) })
// TypeError: undefined is not a function

// WeakSet 只能添加对象 不能遍历
{
  let weakList = new WeakSet();

  let arg = {};

  weakList.add(arg);

  // weakList.add(2); 报错

  console.log('weakList', weakList);
}

// Map 结构原生提供三个遍历器生成函数和一个遍历方法。
// keys() ：返回键名的遍历器。
// values() ：返回键值的遍历器。
// entries() ：返回所有成员的遍历器。
// forEach() ：遍历 Map 的所有成员。
// Map 的遍历顺序就是插入顺序。

//可以添加任意数据类型
//它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
{
  const m = new Map();
  const o = {
    p: 'Hello World'
  };

  m.set(o, 'content')
  m.get(o) // "content"

  let map = new Map();
  let arr = ['123'];

  map.set(arr, 456);

  console.log('map', map, map.get(arr));
}

{
  let map = new Map([
    ['a', 123],
    ['b', 456]
  ]);
  console.log('map args', map);
  console.log('size', map.size);
  console.log('delete', map.delete('a'), map);
  console.log('clear', map.clear(), map);
}


// WeakMap类似WeakSet
{
  let weakmap = new WeakMap();

  let o = {};
  weakmap.set(o, 123);
  console.log(weakmap.get(o));
}


//数据结构  横向对比 增改查删
// 放弃数组 Object作为数据存储 优先使用map 对数据要求高，数据唯一性使用set
{
  //set map array对比
  let set = new Set();
  let map = new Map();
  let array = [];

  //增
  item = set.add('t', 1);
  map.set('t', 1);
  array.push({
    t: 1
  });

  //查
  set.has(item); //必须根据索引 才能查到 
  map.has('t');
  array.find(item => item.t);

  //改
  set.forEach(item => item.t ? item.t = 2 : '');
  map.set('t', 2);
  array.forEach(item => item.t ? item.t = 2 : '');

  //删
  set.forEach(item => item.t ? set.delete(item) : ''); //根据索引删除
  map.delete('t');
  let index = array.findIndex(item => item.t);
  array.splice(index, 1);

} 

{
  //set map Object对比
  let item = {
    t: 1
  };
  let set = new Set();
  let map = new Map();
  let obj = {};

  //增
  set.add(item);
  map.set('t', 1);
  obj['t'] = 1;

  //查
  set.has(item);
  map.has('t');
  't' in obj;

  //改
  item.t = 15;
  map.set('t', 15);
  obj['t'] = 15;

  //删
  set.delete(item);
  map.delete('t');
  delete obj['t'];

}