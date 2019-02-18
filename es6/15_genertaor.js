{
  // genertaor基本定义
  let tell=function* (){
    yield 'a';
    yield 'b';
    return 'c'
  };

  let k=tell();

  console.log(k.next());// { value: 'a', done: false }
  console.log(k.next());// { value: 'b', done: false }
  console.log(k.next());// { value: 'c', done: false }
  console.log(k.next());// { value: undefind, done: true }
}

{
  let obj={};
  obj[Symbol.iterator]=function* (){
    yield 1;
    yield 2;
    yield 3;
  }

  for(let value of obj){
    console.log('value',value); // 1 2 3
  }
}

{
  let state=function* (){
    //一直循环
    while(1){
      yield 'A';
      yield 'B';
      yield 'C';
    }
  }
  let status=state();
  console.log(status.next()); // A
  console.log(status.next()); // B
  console.log(status.next()); // C
  console.log(status.next()); // A
  console.log(status.next()); // B
}

