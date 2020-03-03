# 表格交互，验证
组件代码路径：src/components/code-table
demo使用页面：views/tables/


项目可直接启动：访问路径：/#/codes
提交请求后控制台打印请求数据

采用原来方式修改，没有完全组件化，动态化

可使用views/tables/codeTable.vue页面替换原入库页面，部分功能自己补充
1.后台校验(请求后台使用子调父组件并返回校验结果方式)

提交可由2中方式提交：
1。post参数方式提交
2.form表达submit提交(提交时不做表单校验。表单校验已经分步校验完)


弹框部分注释掉了，集成到项目可以放开




=========================================================================================================





# vue-assembly

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
