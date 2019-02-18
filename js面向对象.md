## JavaScript学习笔记

### 面向对象的三大特性
        面向对象特点：
        1. 抽象：抓住核心问题
        2. 封装：即把能够实现功能的函数写成封装起来，在面向对象里叫做方法。简单来说就是把实现功能的函数写成方法。
        3. 继承：继承的意思是，在实现同一种功能的前提下，新对象可以使用就对象的属性和方法。
         自己没有的，拿别人过来用，就是继承
        4. 多态：一个变量在引用不同类型的情况下的不同状态。多态开发在开发组件和模块化开发的时候能节省很多资源。
         父类引用指向子类的对象（JavaScript中用不到）

### 创建对象的四种方式
    * 使用字面量创建对象
     ```js
        var o = {key:value, key:value...}
     ```
     用一个创建一个，不能复用，造成代码冗余，资源浪费
    * 使用内置构造函数创建对象
     ```js
        var o = new Object();
        var o = new Array();
     ```
     创建出来的对象都是空的对象，要手动的去为对象添加属性。造成代码重复
    * 封装简单的工厂函数（不推荐使用）
     ```js
     function createObj(){
          var obj = {};
          obj.xx=xxx;
          return obj;
     }
     ```
    * 自定义构造函数
    ```
    function 构造函数名{
        this.xxx=xxx;
        //....
    }
    ```
    0.构造函数名首字母要大写
    1.构造函数一般和new关键字一起使用
    2.构造函数返回值默认为新创建好对象 如果手动返回基本数据类型，不影响默认返回值，如果返回的是对象，那么新创建出来的对象将不会返回，取而代之的是return后面的对象

    构造函数（constructor）的执行步骤
    1.使用new关键字创建对象
    2.调用构造函数，将new创建出来的对象赋值给构造函数内的this
    3.使用this给新创建出来的对象增加成员
    4.默认返回新创建出来的这个对象

### 原型
#### 构造函数存在问题
    构造函数中的方法，每新创建一个对象的时候，该对象都会重新的创建一次这个方法，每个独享独占一个方法
    但是该方法内容完全相同，所以造成资源浪费

    1.解决办法1
    将构造函数内的方法，进行提取，放在构造函数外面，在构造函数内部进行引用赋值
    那么创建出来的对象，都会指向构造函数外面的这个函数，达到共享的目的
    问题：全局变量增多，造成全局变量污染，代码结构混乱，不容易维护

    2.解决办法2
    使用原型

### 原型

#### 原型是什么？
    在构造函数创建出来的时候，系统会默认的创建并关联一个对象，这个对象就是原型，原型对象默认是空对象
    默认的原型对象中会有一个属性constructor指向该构造函数

#### 原型的作用
    原型对象中的成员，可以被使用和它关联的构造函数创建出来的所有对象共享

#### 原型对象的使用
    1. 使用对象的动态特性，为原型对象添加成员
    2. 直接替换原型对象

    注意事项：
        直接替换原型对象，会导致替换之前创建的对象的原型和替换之后创建的对象的原型不一致

#### 原型的使用该注意事项
    1.使用对象访问属性的时候，会现在对象中查找，如果找到了就直接使用
    如果没有找到，就去原型中查找
    2.使用对象设置属性的时候，只会在对象本身中查找，不会去原型中查找，如果在对象本身中没有找到这个属性
    则给该对象新增一个属性，如果在对象中有这个属性，修改这个属性
    3.如果在原型对象中有引用类型的属性，那么使用对象进行修改该属性内容，则其他所有跟这个原型对象相关的对象都会受到影响
    Person.prototype.car = {};
    var p = new Person( );
    p.car = {}; //这是修改属性
    p.car.brand= ""; //这是修改属性的内容
    4.一般情况下不会将属性添加到原型对象中
    只会将需要共享的方法，添加到原型对象中

#### __proto__
    1.这个属性不是标准属性，所以存在通用性问题
    2.一般不推荐使用这个属性
    3.调试的时候，可以使用这个属性
    4.这个属性是原型中的属性

替换原型时候的注意事项：
    在新替换的原型中，没有constructor属性，会影响三角结构关系的合理性
    so，在新替换的原型中，手动添加constructor属性，以保证关系的合理性，赋值为关联的构造函数


## 继承
### 混入式继承
    for in
    使用for in遍历对象1的属性，将所有的属性添加到另外一个对象2上
    这时候就可以称 对象2 继承自 对象1
### 原型继承
    * 利用对象的动态特性，为原型对象添加成员
    * 直接替换原型对象
        1.替换前的对象，在替换之后，所有的成员都丢失
        2.替换原型对象的时候，需要手动去指定原型对象的construtor属性
    * 利用混入给原型对象添加成员
### 经典继承
```js
    var 对象1 = Object.create(对象2);
```
    这个时候，创建出来的对象1继承自对象2

    Object.create方法存在兼容性问题
    如何解决？
    1.检测浏览器是否支持Object.create方法，如果不支持，直接手动给Object添加create方法
    2.自定义函数，在函数内部判断浏览器是否支持Object.create方法，如果不支持，则手动创建对象返回，否则直接调用

    ```js
        function create(obj){
            if(Object.create){
                return Object.create(obj);
            }else{
                function F(){
                }

                F.prototype = obj;

                return new F();
            }
        }
    ```

## 原型链
### 什么是原型链
    每个构造函数都有原型对象，每个对象都有构造函数，每个构造函数的原型对象都是对象，也就有构造函数
    然后就形成一个链式的结构，我们称之为原型链

### 原型继承是什么？
    通过修改原型链的结构，实现继承的方式就是原型继承

### 对象和原型的成员关系
```js
function Person(){};
var p = new Person();
```
p对象中包含的成员有：Person.prototype中的成员和自身拥有成员
Person.prototype中的成员有：Object.prototype的成员和自身的成员

p对象可以访问Person.prototype和Object.prototype中的所有成员

## Object.prototype的成员
* constructor ：指向和该原型相关的构造函数
* hasOwnProperty 方法: 判断对象本身是否拥有某个属性
* properIsEnumerable 方法： 1.判断属性是否属于对象本身，2.判断属性是否可以被遍历
* toString toLocaleString: 将对象转换成字符串 toLocalString转换成字符串的时候应用的本地的设置格式
* valueOf 方法：在对象参与运算的时候，首先调用valueOf方法获取对象的值，如果该值无法参与运算，将会调用toString方法
* __proto__ 属性: 指向当前对象的原型对象


## 什么是原型
    在构造函数创建出来的时候，系统会默认的帮构造函数创建并关联一个对象，这个对象就是原型
    原型默认的是一个空的对象

## 原型的作用
    原型中的属性和方法 可以被使用该构造函数创建出来的对象使用
    直说就是一个对象能用另外一个对象的属性和方法。

    当使用对象去访问属性和方法的时候
    会首先在对象自己内部进行查找，如果找到了，就直接使用
    如果没有找到，就去原型中查找，查找到之后，使用
    如果原型中还没有， 如果是属性，就是Undefined
    如果是方法，就报错

## 继承方式
### 第一种方式：构造函数继承

    function Person (name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.say = function(){
        console.log('hello, my name is ' +this.name);
    };
    function Man(name, age) {
        Person.apply(this, arguments);
    }
    //Man.prototype = new Person('pursue');
    var man1 = new Man('joe');
    var man2 = new Man('david');
    console.log(man1.name === man2.name);//false
    man1.say(); //say is not a function

    缺点：不靠谱，因为方法继承不过去

### 第二种方式：拷贝继承 把他爹的东西复制一份给自己
    for(varname in Person.prototype){
        Man1.prototype[name] = Person.prototype[name];
    }

    缺点：
    你爸有个陶瓷杯子挺好看，你拿着你爸的杯子去陶瓷店里跟人家说去给我按照这个杯子也给我做一个一模一样的，这不叫继承

### 第四种方式：组合继承

    function Man(name, age) {
        Person.apply(this, arguments);
    }
    Man.prototype = new Person();

    看着靠谱了，就有一个小瑕疵，man的constructor 不是Man 就是说，你的杯子非得说是你爸的杯子造出来的而不是人家模具造出来的。

### 第五种方式： 寄生组合继承 常用经典继承方式
    function Man(name, age) {
        Person.apply(this, arguments);
    }
    Man.prototype = new Person();//A
    Man.prototype.constructor = Man;//b.
    很多人 其实不明白//A这句，这样只是很暴力的在对属性进行覆盖。
    如果我换种写法你们就秒懂了，
    Man.prototype = Object.create(Person.prototype);//a.
    相当于
    function create(obj){
        function T(){};
        T.prototype = obj;
        return new T();
    }

    Child.prototype = Object.create(Parent.prototype)

    function Parent(name) {
        this.name = name;
    }

    Parent.prototype.play = function() {
        console.log(this.name);
    }


    function Child(name, age) {
        Parent.call(this, name);
        this.age = age;
    }

    Child.prototype = Object.create(Parent.prototype);

    // 多态
    Child.prototype.play = function() {
        Parent.prototype.play.call(this);
        console.log(this.age);
    }

    最后一种是我们 经常用的，不过多解释了

相关参考：
https://segmentfault.com/a/1190000002440502


## Function
### 3种创建函数的方式
    * 直接声明函数
    * 函数表达式
    * new Function()

可以用Function来创建函数:
语法：
```js
var 函数名 = new Function();  //创建一个空的函数
var 函数名 = new Function("函数体") //创建一个没有参数的函数
var 函数名 = new Function("参数1","参数2", "参数3",..."函数体")
//当给Fucntion传多个参数的时候，最后一个参数为函数体，前面的参数为创建出来的函数的形参
//Function接收的所有的参数都是字符串类型的！！！
```

## arguments对象
arguments对象是函数内部的一个对象，在函数调用的时候，系统会默认的将所有传入的实参存入该对象

注意：不管有没有形参，实参都会被存入该对象

## eval
可以将字符串转换成js代码并执行

注意：当使用eval解析JSON格式字符串的时候，要注意，会将{}解析为代码段
1.可以在JSON格式字符串前面拼接 "var 变量名 ="
    eval("var 变量名 =" + JSON格式的字符串);

2.可以在JSON格式字符串前后拼接()
    eval("("+JSON格式的字符串+")")

## 静态成员和实例成员
###静态成员
    通过构造函数去访问的属性和方法就是静态成员

###实例成员
    通过对象（实例）去访问的属性和方法就是实例成员


### 原型链
### 函数的原型链
    可以把Funciton当做一个构造函数，其他构造函数都是这个Function构造函数的实例
    再用对象原型链的方式，去分析这个原型关系
### instansof
    判断一个构造函数的原型是不是存在于该对象的原型链上

    javascript中所有的对象 都会有  Object.prototype
    所以 所有的对象 instanceof Object 都是true
## 歌曲列表管理案例
## 递归
    自己调用自己
### 化归思想
    化繁为简，化未知为已知
### 递归的两个要素
    1.自己调用自己
    2.有递归结束条件

    用途 使用递归获取后代元素

## 作用域
### 什么是作用域
    变量起作用的范围
### 什么是块级作用域
    JS中没有块级作用域，使用代码块限定的作用域就是块级作用域
### JS中的作用域叫做 词法作用域

### 词法作用域
    在代码写好的时候，就能确定变量的作用域，这种作用域就是词法作用域

    动态作用域.（是词法作用域就不可能是动态作用域）

    在js当中，只有函数能创造作用域

    var num = 123;
    function f1(){
        console.log(num);  //如果是动态作用域打印的就是456 如果是词法作用域 打印123
    }
    function f2(){
        var num = 456;
        f1();
    }
    f2();

### 变量提升
    JS代码的运行分两个阶段
    * 预解析阶段
        * 变量名和函数提升
            将var声明的变量名和function开头的函数进行提升
            提升到当前作用域的最上方
    * 执行阶段

    注意：
        1.变量和函数同名的时候
            只提升函数，忽略变量名
        2.函数同名的时候
            都提升，但是后面的函数会覆盖前面的函数
        3.函数表达式，只会提升变量名，不会提后面的函数

        4.变量提升只会将变量和函数提升到当前作用域的最上方
        ```js
         funciton foo(){
            var num =123;
         }
        ```
        5.变量提升是分块 <script> 的

        ```html
        <script>
        foo()
        function foo(){
            console.log("第一个script标签内的函数")
        };
        </script>

        <script>
        foo()
        function foo(){
            console.log("第2个script标签内的函数")
        }
        </script>
        ```
        6.条件式函数声明 能否被提升，取决于浏览器， 不推荐使用！！！
        ```
        foo();//会报错，因为未被提升
        if(true){
            function foo(){

            }
        }


        ```
## 作用域链
    只要是函数都有作用域，函数内部的作用域可以访问函数外部的作用域
    只要是函数就可以创造作用域
    函数中又可以再创建函数
    函数内部的作用域可以访问函数外部的作用域
    如果有多个函数嵌套，那么就会构成一个链式访问结构，这就是作用域链
    当多个函数嵌套的时候，就会形成一个链式的结构，这个就是作用域链

## 绘制作用域链图的步骤
    1.先绘制0级作用域链
    2.在全局作用域中查找，变量和函数的声明，找到之后，将所有的变量和函数用小方格放在0级作用域链上
    3.再从0级作用域链上的函数引出1级作用域链
    4.再去每一个1级作用域链中查找变量和函数的声明，找到之后.....
    5.以此重复，就画好了整个作用域链

## 变量的搜索规则
    1.首先在访问变量的作用域中查找该变量，如果找到直接使用
    2.如果没有找到，去上一级作用域中继续查找，如果如果找到直接使用
    3.如果没有找到，继续去上一级作用域中继续查找，直到全局作用域
    4.如果找到了就用，如果没有直到就报错

## 闭包
### 闭包是什么
    一个封闭的对外不公开的包裹结构或空间
### js中的闭包是函数

### 闭包要解决的问题
    1、在函数外部访问不到函数内部的数据
    2、要解决的问题就是需要在外部间接的访问函数内部的数据

### 闭包的基本结构
    ```js
    function outer(){
        var data = "数据";
        return function(){
            return data;
        }
    }
    ```

    ```js
    function outer(){
        var data = "数据";
        var data1 = "数据1";
        return {
            getData:function(){
                return data;
            },
            getData1:function(){
                return data1;
            }
        }
    }
    ```
    ```js
     function outer(){
            var data = "数据";
            return {
                getData:function(){
                    return data;
                },
                setData:function(value){
                    data = value;
                    return data;
                }
            }
        }
    ```

## 闭包的作用
    如果把数据放在全局作用域内，那么所有人都可以随意修改，这个数据就不再可靠。
    闭包可以创建一个私有空间，在这个空间内部的数据，外部无法直接访问
    外部空间想要访问函数内部的数据，只能通过闭包提供的指定的方法，在这个方法内部
    可以设置一些校验规则，让数据变得更加的安全。

## 闭包练习
    setTimeout的执行时机
        所有的主任务的代码执行完毕之后，去检查所有的setTimeout回调函数，如果到时间了就执行

    用闭包来解决回调函数在调用的时候访问的是全局的变量
    在闭包中创建一个变量，来单独存储当前的回调函数需要的数据，
    在调用的时候就会去使用这个单独的数据，而不是去访问全局变量

    注册点击事件的时候
    点击事件在触发的时候访问的是全局的变量
    在闭包中创建一个变量，来单独存储当前的事件处理函数需要的数据，
    在调用的时候就会去使用这个单独的数据，而不是去访问全局变量


## 闭包缓存
    缓存：将常用的数据进行存储，以提升性能

    硬件缓存
    浏览器缓存
    CDN
    内存型数据库

    如何用闭包实现缓存
    1、写一个闭包在闭包中创建一个对象，用来做缓存的存储对象
    2、在闭包中创建一个对象，用来做缓存的存储对象
    3、在闭包中创建一个数组，用来存储换中的键
    4、返回一个函数，这个函数需要两个参数，一个是key 一个是value
    5、在返回的函数中,判断传入的value是否为undefined
    6、如果为Undefined 则表示是获取值，就直接返回在第一步创建的缓存对象中指定的键对应的值
    7、如果不为Undefined 则表示是设置值
    8、在缓存对象中设置指定的key的值为value
    9、把key加入存储key的数组
    10、判断key数组是不是超出了缓存大小限制
    11、如果超出限制，删除数组第一个元素（使用shift），获取到删除的key
    12、使用删除的key删除缓存对象中存储的值（delete）

## 使用缓存解决斐波那契数列的性能问题
    就是将已经计算过的数字缓存进一个数组中，下次再来访问的时候，直接在数组中进行查找，如果找到直接使用，如果没有找到，计算后将数字存入数组，然后返回该数字
## 沙箱模式
    沙箱模式就是一个封闭的独立的环境

    沙箱模式的基本模型
    (function(){
        //变量定义
        //逻辑代码
        //如果需要，向window对象添加成员，以暴露接口
    })()

    第三方框架
    插件
    独立的组件

## 函数的四种调用模式
this指向不同

函数模式
    this--->window
方法模式
    this---->调用方法的对象
构造函数模式
    this----->new出来的对象
    工厂模式
    寄生模式
上下文模式
    this----->指定的是谁就是谁
    call   函数.call(对象,arg1,arg2,arg3,...argn)
    apply  函数.apply(对象,数组)
        都可以用来改变this的指向为参数的第一个值
        call是使用单独的每一个参数来传参
        apply是使用数组进行传参的，这个数组在调用的时候，会被意义拆解，当做函数的每一个采参数

    call在函数的形参个数确定的情况下使用
    apply在函数的形参个数不确定的情况下使用

```js
    /*
    * 四种调用模式：
    * 1、函数调用 == window
    * 2、方法调用 == 宿主
    * 3、构造器 == 实例对象
    * 4、上下文（间接调用） == 自由指定
    *
    * 函数执行时，内部的this指向才会确定，
    * 函数执行时this的指向与定义无关，与调用方式有关。
    * */

    function fn() {
        console.log( this );
    }
    var obj = {
        fn: fn
    }
    var o = {
        obj : {
            f: fn
        }
    }

    fn(); // window
    obj.fn(); // obj
    o.obj.f(); // obj
    new fn(); // fn函数的实例对象
    new o.obj.f(); // f函数的实例对象
    fn.call( [1, 2, 3] ); // 数组
    fn.apply( { val: 100 } ); // 对象

    // 传入定时器的回调函数，this指向window
    setTimeout( function() {
        console.log( this );
    }, 500);

    document.getElementById( 'div' ).addEventListener( 'click', function() {
        console.log( this ); //<div id="div"></div>
    } );
```

## 回调函数
```js
    //回调函数
    function fn(callback) {
        callback();
    }
    fn(function() {
        alert(1)
    });

    //回调时间不确定
    function fn(callback) {
        setTimeout(function() {
            callback(333);
        },3000);
    }
    fn(function(param) {
        alert(param);
    });
```

## 深拷贝和浅拷贝

    对于字符串类型，浅复制是对值的复制，对于对象来说，浅复制是对对象地址的复制，并没有开辟新的栈，也就是复制的结果是两个对象指向同一个地址，修改其中一个对象的属性，则另一个对象的属性也会改变，而深复制则是开辟新的栈，两个对象对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性。

### 浅拷贝
```js
    var obj = { a:1, arr: [2,3] };
    var shallowObj = shallowCopy(obj);

    function shallowCopy(src) {
    var dst = {};
    for (var prop in src) {
        if (src.hasOwnProperty(prop)) {
        dst[prop] = src[prop];
        }
    }
    return dst;
    }
```

### 深拷贝
1. 第一种方法、通过递归解析解决
```js
    var china = {
        nation : '中国',
        birthplaces:['北京','上海','广州'],
        skincolr :'yellow',
        friends:['sk','ls']
    }
    //深复制，要想达到深复制就需要用递归
    function deepCopy(o,c){
        var c = c || {}
        for(var i in o){
        if(typeof o[i] === 'object'){
                //要考虑深复制问题了
                    if(o[i].constructor === Array){
                    //这是数组
                    c[i] =[]
                }else{
                    //这是对象
                    c[i] = {}
                }
                deepCopy(o[i],c[i])
            }else{
                c[i] = o[i]
            }
        }
        return c
    }
    var result = {name:'result'}
    result = deepCopy(china,result)
    console.dir(result)
```

2. 第二种方法：通过JSON解析解决
```js
    var test ={
        name:{
            xing:{
                first:'张',
                second:'李'
        },
        ming:'老头'
        },
        age :40,
        friend :['隔壁老王','宋经纪','同事']
    }
    var result = JSON.parse(JSON.stringify(test))
    result.age = 30
    result.name.xing.first = '往'
    result.friend.push('fdagldf;ghad')
    console.dir(test)
    console.dir(result)
```

    参考：
        深入剖析 JavaScript 的深复制
        http://jerryzou.com/posts/dive-into-deep-clone-in-javascript/
