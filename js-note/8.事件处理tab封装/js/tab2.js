(function(w){
    function Tab(config) {
        this.menu = null;
        this.menuBox = null;
        if(config){
            this._init(config)
        }
    }
    Tab.prototype = {
        constructor :  Tab,
        //初始化
        _init : function(config) {
            this.initElements(config);
            this.initEvent();
            if (config.auto) {
                this.autoPlay();
            }
        },
        //事件绑定
        initEvent : function() {
            for (var i = 0; i < this.menu.length; i++) {
                var li = this.menu[i];
                li.index = i;
                var that = this;
                console.log(that)
                li.onclick = function(){
                  //that还是只想Tab创建出来的对象
                    //this指的就是当前点击事件触发的这个li
                    that.change(this);
                }
            }
        },
        //DOM绑定
        initElements : function(config) {
            var menu = document.getElementById(config.menu);
            var menuBox = document.getElementById(config.menuBox);

            this.menu = menu.children;
            this.menuBox = menuBox.children;
        },
        //改变元素显示隐藏
        change : function(menu) {
            // console.log(menu);
            for (var i = 0; i < this.menu.length; i++) {
                this.menu[i].className = 'tab-item';
                //让div隐藏
                this.menuBox[i].style.display = 'none';
            }
            menu.className += ' active';
            this.menuBox[menu.index].style.display = 'block';
        },
        //自动播放
        autoPlay : function() {
            var index = 0;
            var that = this;
            setInterval(function() {
                index++;
                if (index == that.menu.length) {
                    index = 0;
                }
                that.change(that.menu[index]);
            }, 1000);
        }
    }

    w.Tab = Tab;
})(window);
