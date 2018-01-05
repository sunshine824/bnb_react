# 前言

为什么选择react而不是vue也不是angular？

之前项目都是用的vue，这次想换个新意的框架，那为什么不是ng呢？ng太过笨重，脏检查机制性能不佳，再加上需要使用到组件思想，果断放弃ng，挑战下新东西，踩踩坑
so,就选择了react


## 技术栈

react + redux + react-router + webpack + ES6/7 + fetch + less + babel


## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，nodejs 必须是 6.0 以上版本 ，node 7 是先行版，有可能会出问题，建议使用 node 6 稳定版

```
git clone https://github.com/sunshine824/bnb_react.git  

npm install  (安装依赖包)

npm start (运行本地开发环境)

npm run build (打包)

```


## 说明

>  喜欢的别忘记了可以star一下的噢！

>  如果npm install太慢导致有些npm依赖包下载失败 你可以看控制台的报错信息，再手动npm install 具体的开发包，推荐使用淘宝的注册源，直接运行，
```
npm install -g cnpm --registry=https://registry.npm.taobao.org

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍



## 功能一览
- [√] 项目按路由模块加载
- [√] 登录，以及登录权限控制
- [√] 退出
- [√] 欢迎主页
- [√] 庞大数据渲染
- [√] redux完整范例
- [√] antd正确使用
- [√] 后台管理系统传统操作
- [√] 日历订单系统
- [√] fetch数据跨域的设置