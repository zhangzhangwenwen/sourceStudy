// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  bind: function () {
    console.log('bind')  // creatElm -> invokeCreateHooks的时候执行
  },
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  },
  update: function () {
    console.log('update')
  },
  destroy: function () {
    console.log('destroy')
  },
  componentUpdated: function () {
    console.log('componentUpdated')
  },
})
let app = new Vue({
  el: '#app',
  components: {
    App
  },
  template: `<div>
  <input v-focus />
  </div>`
})



  // "with(this){ 
    // return 
    //     _c('div',  
    //       [_c('app-layout',
    //         [ _c('h1',{attrs:{"slot":"header"},slot:"header"},[_v(_s(title))]) ,
    //           _v(" "),
    //           _c('p',[_v(_s(msg))]),
    //           _v(" "),
    //           _c('p',{attrs:{"slot":"footer"},slot:"footer"},[_v(_s(desc))])])],1)}"


  // "with(this){
  //   return 
  //     _c('div',
  //       [_c(
   //           'child',{scopedSlots:_u([{key:"default",fn:function(props){return [_c('p',[_v("hello from parent")]),_v(" "),_c('p',[_v(_s(props.text)+" + "+_s(props.msg))])]}}])}
  //         )
//          ],1)}"



// "with(this){return 
//   _c('div', 
//     [_c('keep-alive',
//         [_c(currentComp,{tag:"component"})],1),
//   _v(" "),
//   _c('button',{on:{"click":change}},[_v("switch")])],1)}"

// currentComp 变化的时候 需要重新生成vnode 这时调用_c(currentComp,{tag:"component"})] 就会直接在缓存中取出来 将componentInstance
// 挂载到vnode 的componentInstance上， 再去createElm中调用createComponent的时候 isReactivated就是true



// directives 相关的原理
// 1.先将指令解析成 // "with(this){return _c('div',[_c('input',{directives:[{name:\"focus\",rawName:\"v-focus\"}]})])}"
// 2.创建vode 的时候在vnode.data.directives 里面添加 { directives: [{ name: 'focus', rowname: 'v-focus' }] }
// 3. createElm 的时候调用createComponent 取出vnode.data 无 继续向下执行
// 4. 走到 invokeCreateHooks 开始执行 cbs.create 
// (除了creat之外还有activate, update, remove, destroy)hook 该hook中包含了 { updateAttrs, updateClass, updateDOMListeners, updateDOMProps,updateStyle, _enter,create, updateDirectives }
// 5. 由于使用的是·v-directives 所以这里调用 updateDirectives
// 6. 调用updateDirectives 的_update 方法
// 7. _update函数中，先将指令标准化"
  // newdirs = { 
  //    "v-focus":{"name":"focus","rawName":"v-focus","modifiers":{},"def":{ bind: fn, inseted: fn, update: fn, componentUpdated: fn, unbind: fn, }}
  //    "v-plus":{"name":"focus","rawName":"v-focus","modifiers":{},"def":{bind: fn, inseted: fn, update: fn, componentUpdated: fn, unbind: fn,}}
  //  }"
// 8. 循环 newdirs（每一项教dir）, 取出存储在def中的bind方法并且执行, 如果当前dir中存在inserted方法 则将该dir 存储在dirsWithInsert中
// 9. 判断存储在dirsWithInsert的length 如果有设置一个callInsert函数（callInsert函数中会依次执行insert方法）
// 10. 如果是首次渲染，那么执行mergeVnodehook, 将callInsert放到组件的vnode.data.hook.insert 中去执行
// 11. 回到invokeCreateHooks方法 继续执行下面的流程 此时vnode.data.hook中有了insert方法 则将当前input 的vnode节点push进insertedVnodeQueue
// 12. 回到patch 流程 执行到invokeInsertHook 方法
// 13. invokeInsertHook 方法， 循环执行insertedVnodeQueue中的insert方法 insert方法调用invoke函数 执行wrappedHook中的callInsert方法，callInsert方法
//     循环执行当前vnode 的节点中的所有指令中的insert
