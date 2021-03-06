{
  // 基本定义
  let ajax = function (callback) {
    console.log('执行');
    setTimeout(function () {
      callback && callback.call()
    }, 1000);
  };
  ajax(function () {
    console.log('timeout1');
  })
  // 执行 timeout1
}

{
  let ajax = function () {
    console.log('执行2');
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve()
      }, 1000);
    })
  };

  ajax().then(function () {
    console.log('promise', 'timeout2');
  })
}

{
  let ajax = function () {
    console.log('执行3');
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve()
      }, 1000);
    })
  };

  ajax()
    .then(function () {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve()
        }, 2000);
      });
    })
    .then(function () {
      console.log('timeout3');
    })
}

{
  let ajax = function (num) {
    console.log('执行4');
    return new Promise(function (resolve, reject) {
      if (num > 5) {
        resolve()
      } else {
        throw new Error('出错了')
      }
    })
  }

  ajax(6).then(function () {
    console.log('log', 6);
  }).catch(function (err) {
    console.log('catch', err);
  });

  ajax(3).then(function () {
    console.log('log', 3);
  }).catch(function (err) {
    console.log('catch', err);
  });
}


{
  function loadImg(src) {
    return new Promise(resolve, reject) => {
      let img = document.createElement('img');
      img.src = src;
      img.onload = function () {
        resolve(img);
      }
      img.onerror = function (err) {
        reject(err)
      }
    }
  }

  function showImgs() {
    imgs.forEach(img => {
      document.body.appendChild(img);
    });
  } 

   // 所有图片加载完成后添加到页面
  Promise.all([
    loadImg('1.jpg'),
    loadImg('2.jpg'),
    loadImg('3.jpg')
  ]).then(showImgs);

   // 有一个完成就行
  Promise.race([
    loadImg('1.jpg'),
    loadImg('2.jpg'),
    loadImg('3.jpg')
  ]).then(showImgs);

}