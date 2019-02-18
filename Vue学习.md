## Vue


## 安装vue
	$ npm init
    $ npm install vue -S
    # 全局安装 vue-cli
    $ npm install --g vue-cli
    # 创建一个基于 webpack 模板的新项目my-project
    $ vue init webpack my-project
    # 进入项目目录
    $ cd my-project
    # 安装依赖，走你
    $ npm install
    # 运行项目
    $ npm run dev


### vue项目初始化
  - index.html 单页应用程序的显示部分 127.0.0.1
    + 由于我们使用了html-webpack-plugin插件， 引入的script都不需要些了
    + <div id="app"></div>
  - 入口js main.js
    + 引入 Vue 、VueRouter，配置路由规则(创建对象),创建Vue实例对象,给其进行options配置
* vue文件注意事项
  - template 1根 script data是函数返回对象 style scoped范围生效
* options:
  - template:html片段，可以包含{{text}}
  - data:(在new Vue的时候是对象，在组件内是函数)
  - 构建Vue实例 router: 配置路由
  - el: 指定元素('#app')
    + 1:判断是字符串还是DOM元素
    + 2: 也可以获取到该dom元素直接作为el的值,性能能提升一点
* 组件options
  - data是一个函数，返回一个对象
  - methods是一个对象,其key是函数名，value是函数体
    + 在模板中直接使用函数名，在js部分使用this.函数名
  - props:是一个数组,`['xxx','abc']`
    + 在模板中直接使用，在js部分通过this.$props.xxx使用
  - components:是一个对,声明组件内引用的子组件
    + 引入、声明、使用
  - filters:是一个对象,其过滤器名称对应的函数，接受一个value，最终返回一个value
  - 生命周期：created模板还未生成、发起请求获取数据,不能操作DOM
    + mounted: 数据已经装载到模板上，操作DOM
    + mounted 元素上有ref="name"  ,在钩子函数中this.$refs.name操作DOM元素
* 实例(vm/this(VueComponent对象))事件
    + $emit/$on/$once/$off()
* 实例属性
    + $props,$parent,$children,$refs
* 全局函数
    + Vue.use(param) 安装插件 param需要实现install函数 接受一个Vue，可以在Vue的原型上挂载属性，后期组件内通过this.就可以拿到该数据，在所有组件中使用
    + 单文件 Vue.component(名称,组件对象)
    + 引包 Vue.component(名称,options)
    + Vue.filter(过滤器名,function(value){ return value; } )
* 生僻指令
    + :key 当DOM列表中删除某一个元素 ，更优化的方案是直接删除这一个DOM元素
      * Vue就需要辨识你删除的数组中的元素与DOM中那个元素的对应关系
        - 如果不指定key,vue也会去计算，把对象计算出一个唯一标识，相对损耗性能
        - 我们来通过key告知vue,这个元素的标识就是obj.id index,可以很好的提升性能
    + v-on:事件  @事件=
    + v-bind:属性 :属性=
* 路由使用
    + 使用步骤
      * 1:下载
      * 2: 引入对象
      * 3: 安装插件
      * 4: 创建路由对象配置路由规则
      * 5: 配置进vue实例对象的options中
      * 6: 留坑 <router-view></router-view>
    + 1:去哪里 `<router-link :to="{name:'xxx'}"></router-link>`
    + 2:导航 `{name:'xxx' ,path:'/xxx',component:Home}`
    + 3:去了以后干什么
      * 在created函数中，发请求
      * 获取路由参数 this.$route.params|query.xxx;

#### webpack属性配置
```javascript
'use strict';
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//提取公共模块,其的依赖
const webpack = require('webpack');
//压缩混淆
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    //入口
    entry: {
        main: './src/main.js',
        //再加一个入口
        vendors: ['vue', 'vue-router', 'moment', 'axios', 'vue-preview'],
    },
    output: {
        //所有产出资源路径
        path: path.join(__dirname, 'dist'),
        //设置资源路径的请求地址
        publicPath: '/', // 企业中也可以是www.baidu.com/
        filename: 'js/[name].[hash:6].js',
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'
                // 打包提取css
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: "css-loader!autoprefixer-loader"
                // })
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
            },
            {
                test: /\.(jpg|png|svg|ttf|woff|woff2|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 4096, //4096字节以上生成文件，否则base6
                    name: 'assets/[name].[ext]'
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                // options: {   如果多次使用babel-loader就需要多次options
                //     presets: ['es2015'], //关键字
                //     plugins: ['transform-runtime'], //函数
                // }
            },
            // 解析vue-preview的es6代码
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader',
                // options: {   建议使用.babelrc文件，在当前根目录就可以了
                //     presets: ['es2015'], //关键字
                //     plugins: ['transform-runtime'], //函数
                // }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        //压缩插件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            //manifest 清单，用来记录使用者和第三方包的依赖关系
            names: ['vendors', 'manifest']
        }),
        //提取css插件，设置名称
        new ExtractTextPlugin("css/style.[contenthash:6].css"),
        new htmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ],

    //使用代理跨域
    devServer: { //webpack自动启动一个Node的服务器帮助你转发
        proxy: {
            '/v2/*': { //请求以/v2/xxxx开头
                target: 'https://api.douban.com/',
                //https://api.douban.com/v2/xxx做代理
                changeOrigin: true,
            }
        }
    }
}
```

#### 使用代理跨域
```javascript
    devServer: { //webpack自动启动一个Node的服务器帮助你转发
        proxy: {
            '/v2/*': { //请求以/v2/xxxx开头
                target: 'https://api.douban.com/',
                //https://api.douban.com/v2/xxx做代理
                changeOrigin: true,
            }
        }
    }
```


### es6
---
#### webpack-ES6的处理
* ES6的模块,vue本身默认支持es6的模块导入导出
* babel
    - babel-loader(内部依赖babel-core)
        + 关键字(presets  es2015)
        + 函数(plugins babel-plugin-transform-runtime)

#### ES6中的模块
* 默认
    - 导入`import [,..xxx] [,..from] './xxx.ext'`
    - 导出 `export default obj;`
* 声明式
    - 1导出 `export var obj = xxx;`
    - 2导出 `export var obj2 = {};`
    - 3单独导出 ` export {stu};`
    - 导入 `import {obj,obj2,stu} from './xxx.js';  直接使用obj`
* 全体
* 默认导出和声明式导入在使用上的区别
    - 要注意，声明式导入的时候，必须{名称} 名称要一致（按需导入)
    - 默认导入，可以随意的使用变量名

```javascript
    {
        default:"我是默认导出的结果"
        import xxx from './cal.js'会获取到整个对象的default属性
        obj1:"我是声明式导出1"
        obj2:"我是声明式导出2"
        obj3:"我是声明式导出3"     import {obj1,obj2}
        obj4:"我是声明式导出4"
    }
    import * as allObj from './cal.js';  获取的就是一整个对象
```
* import 和export一定写在顶级，不要包含在{}内


#### ES6中的代码变化
* 对象属性的声明

```javascript
    var name = 'abc';
    var person = {name}; 简写-> var person = {name:name};

    声明函数
    var cal = {
        add:function(){
            return 1;
        },
        add2(){
            return 2;
        },
        add3:funtion(n1,n2){
            return n1 + n2;
        },
        add4(n1,n2){  干掉了function
            return n1 + n2;
        }
    }
```
* 当属性的key和变量的名相同,而要使用变量的值做value,
* 就可以简写{name}->{name:name}
* es6中的函数声明
    - 就是干掉了:function    add(){ }


#### vue单文件方式
* 单文件就是以*.vue结尾的文件。最终通过webpack也会编译成*.js在浏览器运行
* 内容： <template></template> + <script></script> + <style></style>
    - 1:template中只能有一个根节点 2.x
    - 2:script中  按照 export default {配置} 来写
    - 3:style中 可以设置scoped属性，让其只在template中生效

#### 以单文件的方式启动
* webpack找人来理解你的单文件代码
    - vue-loader,vue-template-compiler,代码中依赖vue,
* 启动命令
* `..\\node_modules\\.bin\\webpack-dev-server --inline --hot --open`

#### vue介绍
* 2014年诞生,2013年react,09年angularjs
* 作者 尤雨溪
* 核心概念:     组件化  双向数据流 (基于ES5中的defineProperty来实现的),IE9才支持
* angular核心： 模块化 双向数据绑定(脏检测:一个数组（$watch）)
    - 开发一个登陆的模块，登陆需要显示的头部、底部、中部
    - 组件:组合起来的一个部件（头部、底部、中部）
    - __细分代码__
        + 头部: 页面、样式、动态效果
        + 代码: template style script
* 框架对比，建议学完vue再看
* https://cn.vuejs.org/v2/guide/comparison.html#React

#### 数据流
* 1向：js内存属性发生改变，影响页面的变化
* 1向：页面的改变影响js内存属性的改变

####  vue中常用的v-指令演示
* 常用指令
* v-text 是元素的innerText只能在双标签中使用
* v-html 是元素的innerHTML，不能包含<!--{{xxx}} -->
* v-if 元素是否移除或者插入
* v-show 元素是否显示或隐藏
* v-model 双向数据绑定，v-bind是单向数据绑定(内存js改变影响页面)

#### class结合v-bind使用
* 需要根据可变的表达式的结果来给class赋值，就需要用到v-bind:class="xxx"
* v-bind:属性名="表达式"，最终表达式运算结束的结果赋值给该属性名
    - 简化的写法是: `:属性名="表达式"`
* class:结果的分类
    - 一个样式: 返回字符串(三元表达式和key和样式的清单对象)
    - 多个样式：返回对象(样式做key，true或flase做值)

#### methods和v-on的使用
* 绑定事件的方法
    - `v-on:事件名="表达式||函数名"`
    - 简写: `@事件名="表达式||函数名"`
* 函数名如果没有参数，可以省略()  只给一个函数名称
* 声明组件内函数，在export default这个对象的根属性加上methods属性，其是一个对象
    - key 是函数名 值是函数体
* 在export default这个对象的根属性加上data属性，其是一个函数，返回一个对象
    - 对象的属性是我们初始化的变量的名称
* 凡是在template中使用变量或者函数，不需要加this
* 在script中使用就需要加上this

#### v-for的使用
* 可以使用操作数组 (item,index)
* 可以使用操作对象 (value,key,index)

* key 是类似trank by 的一个属性
* 为的是告诉vue，js中的元素，与页面之间的关联，当识图删除元素的时候，是单个元素的删除而不是正版替换，所以需要关联其关系，设置(必须,性能)
* 2.2.0+ 的版本里，当在组件中使用 v-for 时，key 现在是必须的。

#### 漂亮的列表

#### 父子组件使用
* 父和子，使用的是父，被用的是子
* 父需要声明子组件，引入子组件对象，声明方式如下

```javascript
import 子组件对象 from './xxx.vue';

    {
        components:{
            组件名:子组件对象
        }
    }
```

* 全局组件，使用更为方便，不需要声明，直接用
* 在main.js中引入一次，在main.js中使用 `vue.component('组件名',组件对象);`
* 所有的组件就可以直接通过组件名，使用

#### 父传子
* 父组件通过子组件的属性将值进行传递
    - 方式有2:
        + 常量:  prop1="常量值"
        + 变量:  :prop2="变量名"
* 子组件需要声明
    - 根属性props:['prop1','prop2']
    - 在页面中直接使用{{prop1}}
    - 在js中应该如何使用prop1？   this.prop1获取

#### 看文档的对象分类
* 1:全局的代表Vue.的
* 2:实例的代表this.或者new Vue().
* 3:选项代表 new Vue() 的参数
* 或者 export default里边的属性

#### 子向父组件通信（vuebus）(扩展)
* 通过new Vue()这样的一个对象，来$on('事件名',fn(prop1,pro2))
* 另一个组件引入同一个vuebus,  来$emit('事件名',prop1,pro2)
    - 父传子: 属性作为参数
        + 常量 title="xxx"   子组件声明接收参数 props:['xxx']
        + 变量 :title="num"  子组件声明接收参数 props:['xxx']
    - 子传父: vuebus（只能是同一辆车）
        + 先停车到父组件，On一下
        + 再开车到子组件，如果需要的话，emit一下，触发上述时间的回调函数

#### 总结
* -1 : 已经存在node_modules包，已经存在package.json和webpack.config.js文件
* 1: 创建index.html,看看其所在文件和webpack.config.js文件中描述的关系
* 2: 在index.html div->id->app
* 3: 创建main.js,看看其所在文件和webpack.config.js文件中描述的关系
* 4: 在main.js中引入vue,和相关组件对象
* 5: new Vue(选项options) , 目的地el   渲染内容 render:c=>c(App) 渲染App的内容
* 6: 编写app.vue
    - template 在2.x以后只能有一个根节点
    - script 格式是export default { 选项options}
    - style 加上scoped（范围的）之后，样式只对当前模板有效
* 7: 可能使用组件或者使用函数或者接受参数
    - options(根属性):
        + data 是一个函数,return一个对象
        + methods 是一个对象,key是函数名,value是函数体
        + components 是一个对象,key是组件名,值是组件对象
        + props 是一个数组,元素是多个接受的参数
* 8: 套路总结
    - 凡是在上边可以使用的东西
    - 在下边就可以使用，通过this.
* 9:启动
    - 进入到webpack.config.js 和package.json文件同在的目录中启动命令行
    - 输入: 正在编码:  npm run dev
        + 报错: 检查命令所执行的../ 上级,是否存在node_modules目录及相关文件是否存在
    - 输入: 代码编写完毕，提交到公司 :  npm run build

#### 过滤器
* content | 过滤器,vue中没有提供相关的内置过滤器,可以自定义过滤器
* 组件内的过滤器 + 全局过滤器
    - 组件内过滤器就是options中的一个filters的属性（一个对象）
        + 多个key就是不同过滤器名,多个value就是与key对应的过滤方式函数体
    - `Vue.filter(名,fn)`
* 输入的内容帮我做一个反转
* 例子:父已托我帮你办点事
* 总结
    - 全局 ：范围大，如果出现同名时，权利小
    - 组件内: 如果出现同名时，权利大，范围小

#### 获取DOM元素
* 救命稻草, 前端框架就是为了减少DOM操作，但是特定情况下，也给你留了后门
* 在指定的元素上，添加ref="名称A"
* 在获取的地方加入 this.$refs.名称A
    - 如果ref放在了原生DOM元素上，获取的数据就是原生DOM对象
        + 可以直接操作
    - 如果ref放在了组件对象上，获取的就是组件对象
        + 1:获取到DOM对象,通过this.$refs.sub.$el,进行操作
    - 对应的事件
        + created 完成了数据的初始化，此时还未生成DOM，无法操作DOM
        + mounted 将数据已经装载到了DOM之上,可以操作DOM

#### mint-ui
* 组件库
* 饿了么出品,element-ui 在PC端使用的
* 移动端版本 mint-ui
* https://mint-ui.github.io/#!/zh-cn
* 注意:
    - 如果是全部安装的方式
        + 1:在template中可以直接使用组件标签
        + 2:在script中必须要声明，也就是引入组件对象（按需加载）

#### wappalyzer
* 获取到当前网站的使用的技术
* https://wappalyzer.com/download

#### vue-router
* 前端路由 核心就是锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据
* ui-router:锚点值改变，如何获取模板？ajax、
* vue中，模板数据不是通过ajax请求来，而是调用函数获取到模板内容
* 核心：锚点值改变
* 以后看到vue开头，就知道必须Vue.use
* vue的核心插件:
    - vue-router 路由
    - vuex 管理全局共享数据
* 使用方式
    - 1:下载 `npm i vue-router -S`
    - 2:在main.js中引入 `import VueRouter from 'vue-router';`
    - 3:安装插件 `Vue.use(VueRouter);`
    - 4:创建路由对象并配置路由规则
        + `let router = new VueRouter({ routes:[ {path:'/home',component:Home}  ]   });`
    - 5:将其路由对象传递给Vue的实例，options中
        + options中加入 `router:router`
    - 6:在app.vue中留坑 ` <router-view></router-view>`


#### 命名路由
* 需求，通过a标签点击，做页面数据的跳转
* 使用router-link标签
    - 1:去哪里 `<router-link to="/beijing">去北京</router-link>`
    - 2:去哪里 `<router-link :to="{name:'bj'}">去北京</router-link>`
        + 更利于维护，如果修改了path，只修改路由配置中的path，该a标签会根据修改后的值生成href属性

#### 参数router-link
* 在vue-router中，有两大对象被挂载到了实例this
* $route(只读、具备信息的对象)、$router(具备功能函数)
* 查询字符串
    - 1:去哪里 `<router-link :to="{name:'detail',query:{id:1}  } ">xxx</router-link>`
    - 2:导航(查询字符串path不用改) `{ name:'detail' , path:'/detail',组件}`
    - 3:去了干嘛,获取路由参数(要注意是query还是params和对应id名)
        + `this.$route.query.id`
* path方式
    - 1:去哪里 `<router-link :to="{name:'detail',params:{name:1}  } ">xxx</router-link>`
    - 2:导航(path方式需要在路由规则上加上/:xxx)
    - `{ name:'detail' , path:'/detail/:name',组件}`
    - 3:去了干嘛,获取路由参数(要注意是query还是params和对应name名)
        + `this.$route.params.name`


#### 编程式导航
* 模拟类似用户点击的行为，通过程序来发生锚点值改变，从而触发后续的行为
* 借助浏览器history历史功能向前和向后的功能
* 在vue-router安装插件以后，就多了两个属性
  - this.$route 具备路由信息只读的   req
  - this.$router 具备相关功能        res
* this.$router.go 根据浏览器记录 前进1 后退-1
* this.$router.push(直接跳转到某个页面显示)
    - push参数: 字符串 /xxx
    - 对象 :  `{name:'xxx',query:{id:1},params:{name:2}  }`
```javascript
    跳转会home页面
         this.$router.push({
              name: 'home',
             path: '/'
         });  参数可以是字符串代表path，也可以给对象（命名路由）

    后退
    this.$router.go(-1);
```

#### 导航钩子
```javascript
beforeRouteEnter (to, from, next) {
    在渲染该组件的对应路由被 confirm 前调用
    不！能！获取组件实例 `this`
    因为当钩子执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
     在当前路由改变，但是该组件被复用时调用
     举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
     由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
     可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
     导航离开该组件的对应路由时调用
     可以访问组件实例 `this`
  }
```

#### 复习
* 过滤器，全局，组件内
* 获取DOM元素 ，在元素上ref="xxx"
* 在代码中通过this.$refs.xxx 获取其元素
    - 原生DOM标签获取就是原生DOM对象
    - 如果是组件标签，获取的就是组件对象  $el继续再获取DOM元素
* 声明周期事件(钩子)回调函数
    - created: 数据的初始化、DOM没有生成
    - mounted: 将数据装载到DOM元素上，此时有DOM
* 路由
    - `window.addEventListener('hashchange',fn);`
    - 根据你放`<router-view></router-view><div id="xxx"></div>` 作为一个DOM上的标识
    - 最终当锚点值改变触发hashchange的回调函数，我们将指定的模板数据插入到DOM标识上

#### 重定向和404
* 进入后，默认就是/
* 重定向 `{ path:'/' ,redirect:'/home'  }`
* 重定向 `{ path:'/' ,redirect:{name:'home'}  }`
* 404 : 在路由规则的最后的一个规则
    - 写一个很强大的匹配
    - `{ path:'*' , component:notFoundVue}`

#### 多视图
* 以前可以一次放一个坑对应一个路由和显示一个组件
    - 一次行为 = 一个坑 + 一个路由 + 一个组件
    - 一次行为 = 多个坑 + 一个路由 + 多个组件
* components 多视图 是一个对象 对象内多个key和value
    - key对应视图的name属性
    - value 就是要显示的组件对象
* 多个视图`<router-view></router-view>` -> name就是default
* `<router-view name='xxx'></router-view>` -> name就是xxx


#### 嵌套路由
* 用单页去实现多页应用，复杂的嵌套路由
* 开发中一般会需要使用
* 视图包含视图
* 路由父子级关系路由

```javascript
期组件内包含着第一层router-view
{ name:'music' ,path:'/music', component:Music ,
    children:[   子路由的path /就是绝对路径   不/就是相对父级路径
        {name:'music.oumei' ,path:'oumei', component:Oumei },
        {name:'music.guochan' ,path:'guochan', component:Guochan }
    ]
}
```

并且发起的时候携带了一个content-type的头

#### axios
```
    //引入
    import Axios from 'axios';
    Axios.defaults.baseURL = 'http://182.254.146.100:8899/api/';
    //给Vue原型挂载一个属性
    Vue.prototype.$axios = Axios;
```
* https://segmentfault.com/a/1190000008470355?utm_source=tuicool&utm_medium=referral
* post请求的时候，如果数据是字符串 默认头就是键值对，否则是对象就是application/json
* this.$axios.get(url,options)
* this.$axios.post(url,data,options)
* options:{ params:{id:1}//查询字符串, headers:{ 'content-type':'xxxxx' },baseURL:''  }
* 全局默认设置 ：Axios.defaults.baseURL = 'xxxxx';
* 针对当前这一次请求的相关设置

* 合并请求
* axios.all([请求1,请求2])
* 分发响应  axios.spread(fn)
* fn:对应参数(res)和请求的顺序一致
* 应用场景:
    - 必须保证两次请求都成功，比如，分头获取省、市的数据
* 执行特点: 只要有一次失败就算失败，否则成功

* 可以发起http请求，运行在浏览器和Nodejs
* 合并请求,如果有多个请求，保证每一个请求都成功才算ok，否则异常
* http://www.cnblogs.com/Upton/p/6180512.html

```javascript
axios.all([get1(), get2()])
  .then(axios.spread(function (res1, res2) {
    // 只有两个请求都完成才会成功，否则会被catch捕获
  }));
```
* 不支持跨域
* 1:下载
* 2:引入、挂载Vue原型上，this.xxxx 使用


#### 单文件方式引入bootstrap
```javascript

new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),
```
* 以上方式是将jquery声明成全局变量。供bootstrap使用


#### npm命令
* npm i(install) 包名 -S(--save)-D(--save-dev) 安装包
* 全部或者生产恢复包: npm i(install) --production(只恢复生产依赖dependencies)

#### yarn命令
* yarn add||remove 包名 -S(--save)-D(--save-dev) 安装包
* 全部或者生产恢复包: yarn i(install) --production(只恢复生产依赖dependencies)


#### token(扩展)
* cookie 和session的机制，cookie自动带一个字符串
* cookie只在浏览器
* 移动端原生应用，也可以使用http协议，1:可以加自定义的头、原生应用没有cookie
* 对于三端来讲，token可以作为类似cookie的使用，并且可以通用
* 拦截器可以用在添加token上


#### 监视
* watch 可以对（单个）变量进行监视，也可以深度监视
* 如果需求是对于10个变量进行监视？
* 计算属性computed 可以监视多个值，并且指定返回数据，并且可以显示在页面
* 都是options中的根属性
    - watch监视单个
    - computed可以监视多个this相关属性值的改变,如果和原值一样
    - 不会触发函数的调用，并且可以返回对象

## 面试题
一、什么是MVVM？
MVVM是Model-View-ViewModel的缩写。MVVM是一种设计思想。Model 层代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑；View 代表UI 组件，它负责将数据模型转化成UI 展现出来，ViewModel 是一个同步View 和 Model的对象。

在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。

ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

二、mvvm和mvc区别？它和其它框架（jquery）的区别是什么？哪些场景适合？
mvc和mvvm其实区别并不大。都是一种设计思想。主要就是mvc中Controller演变成mvvm中的viewModel。mvvm主要解决了mvc中大量的DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。

区别：vue数据驱动，通过数据来显示视图层而不是节点操作。
场景：数据操作比较多的场景，更加便捷

三、vue的优点是什么？
低耦合。视图（View）可以独立于Model变化和修改，一个ViewModel可以绑定到不同的"View"上，当View变化的时候Model可以不变，当Model变化的时候View也可以不变。
可重用性。你可以把一些视图逻辑放在一个ViewModel里面，让很多view重用这段视图逻辑。
独立开发。开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计。
可测试。界面素来是比较难于测试的，而现在测试可以针对ViewModel来写。
四、 组件之间的传值？
父组件与子组件传值
父组件通过标签上面定义传值
子组件通过props方法接受数据
子组件向父组件传递数据
子组件通过$emit方法传递参数
五、路由之间跳转
声明式（标签跳转） 编程式（ js跳转）

六、vue.cli中怎样使用自定义的组件？有遇到过哪些问题吗？
第一步：在components目录新建你的组件文件（indexPage.vue），script一定要export default {}
第二步：在需要用的页面（组件）中导入：import indexPage from '@/components/indexPage.vue'
第三步：注入到vue的子组件的components属性上面,components:{indexPage}
第四步：在template视图view中使用，
例如有indexPage命名，使用的时候则index-page
七、vue如何实现按需加载配合webpack设置
webpack中提供了require.ensure()来实现按需加载。以前引入路由是通过import 这样的方式引入，改为const定义的方式进行引入。
不进行页面按需加载引入方式：import home from '../../common/home.vue'
进行页面按需加载的引入方式：const home = r => require.ensure( [], () => r (require('../../common/home.vue')))

八、vuex面试相关
（1）vuex是什么？怎么使用？哪种功能场景使用它？
vue框架中状态管理。在main.js引入store，注入。新建一个目录store，….. export 。场景有：单页应用中，组件之间的状态。音乐播放、登录状态、加入购物车

（2）vuex有哪几种属性？
有五种，分别是 State、 Getter、Mutation 、Action、 Module

vuex的State特性
A、Vuex就是一个仓库，仓库里面放了很多对象。其中state就是数据源存放地，对应于一般Vue对象里面的data
B、state里面存放的数据是响应式的，Vue组件从store中读取数据，若是store中的数据发生改变，依赖这个数据的组件也会发生更新
C、它通过mapState把全局的 state 和 getters 映射到当前组件的 computed 计算属性中
vuex的Getter特性
A、getters 可以对State进行计算操作，它就是Store的计算属性
B、 虽然在组件内也可以做计算属性，但是getters 可以在多组件之间复用
C、 如果一个状态只在一个组件内使用，是可以不用getters
vuex的Mutation特性
Action 类似于 mutation，不同在于：Action 提交的是 mutation，而不是直接变更状态；Action 可以包含任意异步操作。
（3）不用Vuex会带来什么问题？
可维护性会下降，想修改数据要维护三个地方；
可读性会下降，因为一个组件里的数据，根本就看不出来是从哪来的；
增加耦合，大量的上传派发，会让耦合性大大增加，本来Vue用Component就是为了减少耦合，现在这么用，和组件化的初衷相背。
九、 v-show和v-if指令的共同点和不同点
v-show指令是通过修改元素的display的CSS属性让其显示或者隐藏
v-if指令是直接销毁和重建DOM达到让元素显示和隐藏的效果
十、 如何让CSS只在当前组件中起作用
将当前组件的<style>修改为<style scoped>

十一、<keep-alive></keep-alive>的作用是什么?
<keep-alive></keep-alive> 包裹动态组件时，会缓存不活动的组件实例，主要用于保留组件状态或避免重新渲染。

十二、Vue中引入组件的步骤?
1）采用ES6的import ... from ...语法或CommonJS的require()方法引入组件
2）对组件进行注册,代码如下

// 注册
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})
3）使用组件<my-component></my-component>

十三、指令v-el的作用是什么?
提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标.可以是 CSS 选择器，也可以是一个 HTMLElement 实例

十四、在Vue中使用插件的步骤
采用ES6的import ... from ...语法或CommonJSd的require()方法引入插件
使用全局方法Vue.use( plugin )使用插件,可以传入一个选项对象Vue.use(MyPlugin, { someOption: true })
十五、请列举出3个Vue中常用的生命周期钩子函数
created: 实例已经创建完成之后调用,在这一步,实例已经完成数据观测, 属性和方法的运算, watch/event事件回调. 然而, 挂载阶段还没有开始, $el属性目前还不可见
mounted: el被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
activated: keep-alive组件激活时调用
十六、active-class是哪个组件的属性？
vue-router模块的router-link组件。

十七、怎么定义vue-router的动态路由以及如何获取传过来的动态参数？
在router目录下的index.js文件中，对path属性加上/:id。
使用router对象的params.id。

十八、vue-router有哪几种导航钩子？
三种，一种是全局导航钩子：router.beforeEach(to,from,next)，作用：跳转前进行判断拦截。
第二种：组件内的钩子；
第三种：单独路由独享组件

十九、生命周期相关面试题
总共分为8个阶段创建前/后，载入前/后，更新前/后，销毁前/后。

创建前/后： 在beforeCreate阶段，vue实例的挂载元素el和数据对象data都为undefined，还未初始化。在created阶段，vue实例的数据对象data有了，el还没有。
载入前/后：在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。在mounted阶段，vue实例挂载完成，data.message成功渲染。
更新前/后：当data变化时，会触发beforeUpdate和updated方法。
销毁前/后：在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在
（1）、什么是vue生命周期
答： Vue 实例从创建到销毁的过程，就是生命周期。也就是从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

（2）、vue生命周期的作用是什么
答：它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程时更容易形成好的逻辑。

（3）、vue生命周期总共有几个阶段
答：可以总共分为8个阶段：创建前/后, 载入前/后,更新前/后,销毁前/销毁后

（4）、第一次页面加载会触发哪几个钩子
答：第一次页面加载时会触发 beforeCreate, created, beforeMount, mounted 这几个钩子

（5）、DOM 渲染在 哪个周期中就已经完成
答：DOM 渲染在 mounted 中就已经完成了。

（6）、简单描述每个周期具体适合哪些场景
答：生命周期钩子的一些使用方法：

beforecreate : 可以在这加个loading事件，在加载实例时触发
created : 初始化完成时的事件写在这里，如在这结束loading事件，异步请求也适宜在这里调用
mounted : 挂载元素，获取到DOM节点
updated : 如果对数据统一处理，在这里写上相应函数
beforeDestroy : 可以做一个确认停止事件的确认框
nextTick : 更新数据后立即操作dom
二十、说出至少4种vue当中的指令和它的用法？
v-if：判断是否隐藏；v-for：数据循环；v-bind:class：绑定一个属性；v-model：实现双向绑定

二十一、vue-loader是什么？使用它的用途有哪些？
解析.vue文件的一个加载器。
用途：js可以写es6、style样式可以scss或less、template可以加jade等

二十二、scss是什么？在vue.cli中的安装使用步骤是？有哪几大特性？
答：css的预编译。
使用步骤：
第一步：先装css-loader、node-loader、sass-loader等加载器模块
第二步：在build目录找到webpack.base.config.js，在那个extends属性中加一个拓展.scss
第三步：在同一个文件，配置一个module属性
第四步：然后在组件的style标签加上lang属性 ，例如：lang=”scss”

特性:

可以用变量，例如（$变量名称=值）；
可以用混合器，例如（）
可以嵌套
二十三、为什么使用key？
当有相同标签名的元素切换时，需要通过 key 特性设置唯一的值来标记以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容。

二十四、为什么避免 v-if 和 v-for 用在一起
当 Vue 处理指令时，v-for 比 v-if 具有更高的优先级，通过v-if 移动到容器元素，不会再重复遍历列表中的每个值。取而代之的是，我们只检查它一次，且不会在 v-if 为否的时候运算 v-for。

二十五、VNode是什么？虚拟 DOM是什么？
Vue在 页面上渲染的节点，及其子节点称为“虚拟节点 (Virtual Node)”，简写为“VNode”。“虚拟 DOM”是由 Vue 组件树建立起来的整个 VNode 树的称呼。





一、对于MVVM的理解？
MVVM 是 Model-View-ViewModel 的缩写。
Model代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑。
View 代表UI 组件，它负责将数据模型转化成UI 展现出来。
ViewModel 监听模型数据的改变和控制视图行为、处理用户交互，简单理解就是一个同步View 和 Model的对象，连接Model和View。
在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。
ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

二、Vue的生命周期
beforeCreate（创建前） 在数据观测和初始化事件还未开始
created（创建后） 完成数据观测，属性和方法的运算，初始化事件，$el属性还没有显示出来
beforeMount（载入前） 在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置：编译模板，把data里面的数据和模板生成html。注意此时还没有挂载html到页面上。
mounted（载入后） 在el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html页面中。此过程中进行ajax交互。
beforeUpdate（更新前） 在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。
updated（更新后） 在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
beforeDestroy（销毁前） 在实例销毁之前调用。实例仍然完全可用。
destroyed（销毁后） 在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用。
1.什么是vue生命周期？
答： Vue 实例从创建到销毁的过程，就是生命周期。从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、销毁等一系列过程，称之为 Vue 的生命周期。

2.vue生命周期的作用是什么？
答：它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程时更容易形成好的逻辑。

3.vue生命周期总共有几个阶段？
答：它可以总共分为8个阶段：创建前/后, 载入前/后,更新前/后,销毁前/销毁后。

4.第一次页面加载会触发哪几个钩子？
答：会触发 下面这几个beforeCreate, created, beforeMount, mounted 。

5.DOM 渲染在 哪个周期中就已经完成？
答：DOM 渲染在 mounted 中就已经完成了。

三、 Vue实现数据双向绑定的原理：Object.defineProperty（）
vue实现数据双向绑定主要是：采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty（）来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调。当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 Object.defineProperty 将它们转为 getter/setter。用户看不到 getter/setter，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。

vue的数据双向绑定 将MVVM作为数据绑定的入口，整合Observer，Compile和Watcher三者，通过Observer来监听自己的model的数据变化，通过Compile来解析编译模板指令（vue中是用来解析 {{}}），最终利用watcher搭起observer和Compile之间的通信桥梁，达到数据变化 —>视图更新；视图交互变化（input）—>数据model变更双向绑定效果。

js实现简单的双向绑定

```js
	<body>
	    <div id="app">
	    <input type="text" id="txt">
	    <p id="show"></p>
	</div>
	</body>
	<script type="text/javascript">
	    var obj = {}
	    Object.defineProperty(obj, 'txt', {
	        get: function () {
	            return obj
	        },
	        set: function (newValue) {
	            document.getElementById('txt').value = newValue
	            document.getElementById('show').innerHTML = newValue
	        }
	    })
	    document.addEventListener('keyup', function (e) {
	        obj.txt = e.target.value
	    })
	</script>
```

四、Vue组件间的参数传递
1.父组件与子组件传值
父组件传给子组件：子组件通过props方法接受数据;
子组件传给父组件：$emit方法传递参数
2.非父子组件间的数据传递，兄弟组件传值
eventBus，就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。项目比较小时，用这个比较合适。（虽然也有不少人推荐直接用VUEX，具体来说看需求咯。技术只是手段，目的达到才是王道。）

五、Vue的路由实现：hash模式 和 history模式
hash模式：在浏览器中符号“#”，#以及#后面的字符称之为hash，用window.location.hash读取；
特点：hash虽然在URL中，但不被包括在HTTP请求中；用来指导浏览器动作，对服务端安全无用，hash不会重加载页面。

history模式：history采用HTML5的新特性；且提供了两个新方法：pushState（），replaceState（）可以对浏览器历史记录栈进行修改，以及popState事件的监听到状态变更。

六、Vue与Angular以及React的区别？
（版本在不断更新，以下的区别有可能不是很正确。我工作中只用到vue，对angular和react不怎么熟）
1.与AngularJS的区别
相同点：
都支持指令：内置指令和自定义指令；都支持过滤器：内置过滤器和自定义过滤器；都支持双向数据绑定；都不支持低端浏览器。

不同点：
AngularJS的学习成本高，比如增加了Dependency Injection特性，而Vue.js本身提供的API都比较简单、直观；在性能上，AngularJS依赖对数据做脏检查，所以Watcher越多越慢；Vue.js使用基于依赖追踪的观察并且使用异步队列更新，所有的数据都是独立触发的。

2.与React的区别
相同点：
React采用特殊的JSX语法，Vue.js在组件开发中也推崇编写.vue特殊文件格式，对文件内容都有一些约定，两者都需要编译后使用；中心思想相同：一切都是组件，组件实例之间可以嵌套；都提供合理的钩子函数，可以让开发者定制化地去处理需求；都不内置列数AJAX，Route等功能到核心包，而是以插件的方式加载；在组件开发中都支持mixins的特性。
不同点：
React采用的Virtual DOM会对渲染出来的结果做脏检查；Vue.js在模板中提供了指令，过滤器等，可以非常方便，快捷地操作Virtual DOM。

七、vue路由的钩子函数
首页可以控制导航跳转，beforeEach，afterEach等，一般用于页面title的修改。一些需要登录才能调整页面的重定向功能。

beforeEach主要有3个参数to，from，next：

to：route即将进入的目标路由对象，

from：route当前导航正要离开的路由

next：function一定要调用该方法resolve这个钩子。执行效果依赖next方法的调用参数。可以控制网页的跳转。

八、vuex是什么？怎么使用？哪种功能场景使用它？
只用来读取的状态集中放在store中； 改变状态的方式是提交mutations，这是个同步的事物； 异步逻辑应该封装在action中。
在main.js引入store，注入。新建了一个目录store，….. export 。
场景有：单页应用中，组件之间的状态、音乐播放、登录状态、加入购物车
图片描述

state
Vuex 使用单一状态树,即每个应用将仅仅包含一个store 实例，但单一状态树和模块化并不冲突。存放的数据状态，不可以直接修改里面的数据。
mutations
mutations定义的方法动态修改Vuex 的 store 中的状态或数据。
getters
类似vue的计算属性，主要用来过滤一些数据。
action
actions可以理解为通过将mutations里面处里数据的方法变成可异步的处理数据的方法，简单的说就是异步操作数据。view 层通过 store.dispath 来分发 action。

```js
	const store = new Vuex.Store({ //store实例
	      state: {
	         count: 0
	             },
	      mutations: {
	         increment (state) {
	          state.count++
	         }
	          },
	      actions: {
	         increment (context) {
	          context.commit('increment')
	   }
	 }
	})
	modules
	项目特别复杂的时候，可以让每一个模块拥有自己的state、mutation、action、getters,使得结构非常清晰，方便管理。

	const moduleA = {
	  state: { ... },
	  mutations: { ... },
	  actions: { ... },
	  getters: { ... }
	 }
	const moduleB = {
	  state: { ... },
	  mutations: { ... },
	  actions: { ... }
	 }

	const store = new Vuex.Store({
	  modules: {
	    a: moduleA,
	    b: moduleB
	})
	九、vue-cli如何新增自定义指令？
	1.创建局部指令

	var app = new Vue({
	    el: '#app',
	    data: {
	    },
	    // 创建指令(可以多个)
	    directives: {
	        // 指令名称
	        dir1: {
	            inserted(el) {
	                // 指令中第一个参数是当前使用指令的DOM
	                console.log(el);
	                console.log(arguments);
	                // 对DOM进行操作
	                el.style.width = '200px';
	                el.style.height = '200px';
	                el.style.background = '#000';
	            }
	        }
	    }
	})
	2.全局指令

	Vue.directive('dir2', {
	    inserted(el) {
	        console.log(el);
	    }
	})
	3.指令的使用

	<div id="app">
	    <div v-dir1></div>
	    <div v-dir2></div>
	</div>
```

	十、vue如何自定义一个过滤器？
```js
	html代码：

	<div id="app">
	     <input type="text" v-model="msg" />
	     {{msg| capitalize }}
	</div>
	JS代码：

	var vm=new Vue({
	    el:"#app",
	    data:{
	        msg:''
	    },
	    filters: {
	      capitalize: function (value) {
	        if (!value) return ''
	        value = value.toString()
	        return value.charAt(0).toUpperCase() + value.slice(1)
	      }
	    }
	})
	全局定义过滤器

	Vue.filter('capitalize', function (value) {
	  if (!value) return ''
	  value = value.toString()
	  return value.charAt(0).toUpperCase() + value.slice(1)
	})
```

过滤器接收表达式的值 (msg) 作为第一个参数。capitalize 过滤器将会收到 msg的值作为第一个参数。

十一、对keep-alive 的了解？
keep-alive是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。
在vue 2.1.0 版本之后，keep-alive新加入了两个属性: include(包含的组件缓存) 与 exclude(排除的组件不缓存，优先级大于include) 。

使用方法

```js
	<keep-alive include='include_components' exclude='exclude_components'>
	  <component>
	    <!-- 该组件是否缓存取决于include和exclude属性 -->
	  </component>
	</keep-alive>
```
参数解释
include - 字符串或正则表达式，只有名称匹配的组件会被缓存
exclude - 字符串或正则表达式，任何名称匹配的组件都不会被缓存
include 和 exclude 的属性允许组件有条件地缓存。二者都可以用“，”分隔字符串、正则表达式、数组。当使用正则或者是数组时，要记得使用v-bind 。

使用示例

```js
	<!-- 逗号分隔字符串，只有组件a与b被缓存。 -->
	<keep-alive include="a,b">
	  <component></component>
	</keep-alive>

	<!-- 正则表达式 (需要使用 v-bind，符合匹配规则的都会被缓存) -->
	<keep-alive :include="/a|b/">
	  <component></component>
	</keep-alive>

	<!-- Array (需要使用 v-bind，被包含的都会被缓存) -->
	<keep-alive :include="['a', 'b']">
	  <component></component>
	</keep-alive>
```

1. css只在当前组件起作用
答：在style标签中写入scoped即可 例如：<style scoped></style>

2. v-if 和 v-show 区别
答：v-if按照条件是否渲染，v-show是display的block或none；

3. $route和$router的区别
答：$route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。而$router是“路由实例”对象包括了路由的跳转方法，钩子函数等。

4. vue.js的两个核心是什么？
答：数据驱动、组件系统

5. vue几种常用的指令
答：v-for 、 v-if 、v-bind、v-on、v-show、v-else

6. vue常用的修饰符？
答：.prevent: 提交事件不再重载页面；.stop: 阻止单击事件冒泡；.self: 当事件发生在该元素本身而不是子元素的时候会触发；.capture: 事件侦听，事件发生的时候会调用

7. v-on 可以绑定多个方法吗？
答：可以

8. vue中 key 值的作用？
答：当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。key的作用主要是为了高效的更新虚拟DOM。

9. 什么是vue的计算属性？
答：在模板中放入太多的逻辑会让模板过重且难以维护，在需要对数据进行复杂处理，且可能多次使用的情况下，尽量采取计算属性的方式。好处：①使得数据处理结构清晰；②依赖于数据，数据更新，处理结果自动更新；③计算属性内部this指向vm实例；④在template调用时，直接写计算属性名即可；⑤常用的是getter方法，获取数据，也可以使用set方法改变数据；⑥相较于methods，不管依赖的数据变不变，methods都会重新计算，但是依赖数据不变的时候computed从缓存中获取，不会重新计算。

10. vue等单页面应用及其优缺点
答：优点：Vue 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件，核心是一个响应的数据绑定系统。MVVM、数据驱动、组件化、轻量、简洁、高效、快速、模块友好。
缺点：不支持低版本的浏览器，最低只支持到IE9；不利于SEO的优化（如果要支持SEO，建议通过服务端来进行渲染组件）；第一次加载首页耗时相对长一些；不可以使用浏览器的导航按钮需要自行实现前进、后退。