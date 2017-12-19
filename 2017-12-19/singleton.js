window.app = {
  version: '1.0.0',
  init() {
    // 初始化应用程序
	console.log('应用程序初始化完成。');
  },
  destroy() {
    // 应用程序被销毁
	console.log('应用程序已被销毁。')
  }
};

// 测试app
app.init();
app.destroy();

app.createNamespace = function(name) {
  let arr = name.split('.');
  let len = arr.length;
  let current = this;
  for(let i = 0; i < len; i++) {
    if(!current[arr[i]]) {
	  current[arr[i]] = {};
	}
	current = current[arr[i]];
  }
};

// 测试我们创建命名空间的方法
app.createNamespace('store.message.add');
console.log(app);

// 使用闭包创建单例
let counter = (function() {
  let _count = 0;

  return {
    setCount(count) {
      _count = count;
	},
	getCount() {
      return _count;
	}
  }
})();

console.log(counter.getCount());
counter.setCount(10);
console.log(counter.getCount());


// 使用辅助函数来创建单例对象
const singletonHelper = function(fn) {
  let instance;
  return function() {
    if(!instance) {
      instance = fn.apply(this, arguments);
	}
	return instance
  }
};

const createDialog = function(html) {
  let div = document.createElement('div');
  div.innerHTML = html;
  return div;
};

const createSingleDialog = singletonHelper(createDialog);

let d1 = createSingleDialog('d1');
let d2 = createSingleDialog('d2');
console.log(d1, d2, d1 === d2);


// 修改构造函数来创建单例对象
function Car(name) {
  let instance;
  this.name = name;
  instance = this;
  Car = function() {
    return instance;
  };
}

let c1 = new Car('c1');
let c2 = new Car('c2');
console.log(c1, c2, c1 === c2);


// 给构造函数添加辅助变量来创建单例对象
function Animal(name) {
  if(typeof Animal.instance === 'object') {
    return Animal.instance;
  }
  this.name = name;
  Animal.instance = this;
}

let a1 = new Animal('a1');
let a2 = new Animal('a2');
console.log(a1, a2, a1 === a2);