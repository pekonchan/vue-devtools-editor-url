[中文文档](https://github.com/pekonchan/vue-devtools-editor-url/blob/main/README_zh.md)

# vue-devtools-editor-url
This is a vue-devtools plugin that can be used to change the path of the local file opened by clicking on the devtool panel.

It can be used to calibrate open local file paths in the face of the micro-front end, monorepo's project architecture website.

It can be used in vue2 and vue3 projects.

# Usage
Download the plug-in using package management tools such as npm, pnpm, and yarn
```
pnpm add vue-devtools-editor-url -D
```

Then use it in the project where you want to calibrate the path. For example, in the micro front end, which several micro applications open the path is not correct, it is used in the corresponding micro application for calibration.

```js
import { setupDevtools } from 'vue-devtools-editor-url'

// Create an instance of the vue application first
const app = new Vue({
 ...
})

// After creating a vue instance

// The setupDevtools method accepts two inputs:
// - app. vue instance
// - url. The specified open url, which can be either a string or a method (suitable for dynamic urls)

setupDevtools(app, 'your-custom-open-editor-url')
// The resulting final request will become "/__open-in-editor?file=your-custom-open-editor-url"

// Using this plugin is more to solve the dynamic url scenario, so you can pass a method whose callback parameter is a click on the original devtool url
setupDevtools(app, function (originUrl) {
    return originUrl + '/add-something'
})
// The resulting final request will become `/__open-in-editor?file=${originUrl}/add-something`
```