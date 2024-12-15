# vue-devtools-editor-url
这是一个vue-devtools的插件，可用于改变devtool面板上点击打开本地文件的路径。

它在面对微前端，monorepo的项目架构网站时，能够供你所需校准打开本地文件路径。

因此它可用于vue2和vue3项目中。

# Usage
通过包管理工具如npm, pnpm, yarn等下载本插件
```
pnpm add vue-devtools-editor-url -D
```

然后在你想要校准路径的项目中使用它。如在微前端中，哪几个微应用打开路径不对，就在对应的微应用中使用它进行校准。
```js
import { setupDevtools } from 'vue-devtools-editor-url'

// 先创建vue应用的实例
const app = new Vue({
 ...
})

// 在创建了vue实例后

// setupDevtools方法接受两个入参：
// - app. vue应用的实例
// - url. 指定的打开url，它可以是一个字符串，也可以是一个方法（适合动态url）

setupDevtools(app, 'your-custom-open-editor-url')
// 结果发起的最终请求会变成 "/__open-in-editor?file=your-custom-open-editor-url"

// 使用该插件更多是为了解决动态url的场景，所以你可以传一个方法，方法里的回调参数是一个点击devtool原本的url
setupDevtools(app, function (originUrl) {
    return originUrl + '/add-something'
})
// 结果发起的最终请求会变成 `/__open-in-editor?file=${originUrl}/add-something`
```