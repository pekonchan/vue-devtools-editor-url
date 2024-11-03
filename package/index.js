import { setupDevtoolsPlugin } from '@vue/devtools-api'

export function setupDevtools (app, fileUrlMaker) {
  setupDevtoolsPlugin({
    id: 'editor-url-custom',
    label: 'Editor URL Custom',
    packageName: 'launch-editor',
    app,
  }, (api) => {
    api.on.inspectComponent((payload, context) => {
      let fileUrl = ''
      if (typeof fileUrlMaker === 'function') {
        fileUrl = fileUrlMaker(payload.instanceData.file)
      } else if (typeof fileUrlMaker === 'string') {
        fileUrl = fileUrlMaker
      }
      payload.instanceData.file = fileUrl
    })
  })
}

export default {
  install (Vue, options) {
    const { fileUrl } = options
    // 检查 Vue 版本
    const version = Vue.version.split('.')[0]

    if (version === '2') {
      // Vue 2 兼容代码
      Vue.mixin({
        beforeCreate () {
          if (this.$options.devtoolEditor) {
            setupDevtools(this, fileUrl)
          }
        },
      })
    } else if (version === '3') {
      // Vue 3 兼容代码
      setupDevtools(Vue, fileUrl)
    } else {
      console.warn('Unsupported Vue version')
    }
  },
}
