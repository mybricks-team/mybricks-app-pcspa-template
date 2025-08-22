import { getQueryString, requireScript } from '@/utils'
import { PreviewStorage } from '@/utils/previewStorage';
import renderUI from './renderUI';
import { getRtComlibsFromConfigEdit } from '../../utils/comlib'
import { insertDeps } from '../../utils/getComlibs'
import '@/reset.less'
const fileId = getQueryString('fileId')
const previewStorage = new PreviewStorage({ fileId })

let { dumpJson, comlibs } = previewStorage.getPreviewPageData()
const Vue = window.Vue;
let vueApp;

if (!dumpJson) {
    debugger
    
    throw new Error('数据错误：项目数据缺失')
}

function cssVariable(dumpJson) {
    const themeData = dumpJson?.plugins?.['@mybricks/plugins/theme/use']
  
    if (themeData) {
      const { antdV4Variable, themes } = themeData
      if (antdV4Variable) {
        const localKey = localStorage.getItem("MYBRICKS_PLUGINS_THEME_KEY")
        let activeVariables;
        let localVariables;
        const variables = themes[0].content.variables;
        variables.forEach(({ active, key, variables }) => {
          if (active) {
            activeVariables = variables;
          }
          if (localKey === key) {
            localVariables = variables;
          }
        });
        const style = document.createElement('style');
        style.id = themes[0].namespace;
        let innerHTML = '';
        (localVariables || activeVariables || variables[0].variables).forEach(({ configs }) => {
          if (Array.isArray(configs)) {
            configs.forEach(({ key, value }) => {
              innerHTML = innerHTML + `${key}: ${value};\n`
            })
          }
        });
        antdV4Variable.configs.forEach(({ key, value }) => {
          innerHTML = innerHTML + `${key}: ${value};\n`
        })
        style.innerHTML = `:root {\n${innerHTML}}`
        document.head.appendChild(style)
      } else {
        if (Array.isArray(themes)) {
          themes.forEach(({ namespace, content }) => {
            const variables = content?.variables
      
            if (Array.isArray(variables)) {
              const style = document.createElement('style')
              style.id = namespace
              let innerHTML = ''
      
              variables.forEach(({ configs }) => {
                if (Array.isArray(configs)) {
                  configs.forEach(({ key, value }) => {
                    innerHTML = innerHTML + `${key}: ${value};\n`
                  })
                }
              })
      
              style.innerHTML = `:root {\n${innerHTML}}`
              document.head.appendChild(style)
            }
          })
        }
      }
    }
  }
  
  cssVariable(dumpJson)

const render = async (props) => {
    const { container } = props
    if (comlibs && Array.isArray(comlibs)) {
        await insertDeps(comlibs)
        Promise.all(getRtComlibsFromConfigEdit(comlibs).map((t) => requireScript(t))).then(() => {
            vueApp = new Vue({
                render: (h) => h(renderUI({ ...props, renderType: 'vue2' })),
            }).$mount((container ?? document).querySelector('#root'))
        })
    }
}


if (!window.__POWERED_BY_QIANKUN__) {
    render({});
}

export async function bootstrap() {
    console.log('vue2 app bootstrap');
}

export async function mount(props) {
    render(props);
}

export async function unmount(props) {
    vueApp.$destroy();
    vueApp.$el.innerHTML = '';
}