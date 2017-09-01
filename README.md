# koxr
react状态管理库

API
### observable
参数为非数组, 普通observable对象;
```
const observableValue = observable(0);
```
定义一个初始值为0的observable对象
```
observableValue(1);
```
observableValue set操作, 异步更新该变量的观察者, 前后两次set同一个值不会更新
```
observableValue();
```
observableValue get操作

参数为数组, 在普通observable对象上扩展['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift']等方法;
```
const observableArray = observable([]);
observableArray.push(0);
observableArray.push(1);
observableArray(); //[0, 1]
```

### autorun
```
const destory = autorun(() => {
    console.log(observableValue())
});
```
observableValue 进行set操作, 都会触发log方法, 执行destory方法终观察,一般处理副作用

### computed
```
const computedValue = computed(() => {
    return observableValue() + 1;
})
```
observableValue 进行set, 会重新计算computedValue的值并缓存, computedValue get操作不会重新计算, 一般用作计算响应值

### when
```
const destory = when(() => {
    //
}, () => {
    console.log(observableValue());
})
```
observableValue set操作, 会计算参数一的值为true时，执行参数二方法;
destory执行终止观察

### observer
```
class App extends Component {
    render() {
        return <div>{observableValue()}</div>;
    }
}
export default observer(App);
```
参数为class

```
observer(() => {
    return <div>{observableValue()}</div>;
});
```
参数为function

observableValue set操作自动更新组件