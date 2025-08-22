import { PC_NORMAL_COM_LIB, CHARS_COM_LIB, BASIC_COM_LIB } from '@/constants'
import { getQueryString, requireScript } from '@/utils'
import { PreviewStorage } from '@/utils/previewStorage'
import { call as callDomainHttp } from '@mybricks/plugin-connector-domain';
import renderUI from './renderUI'
import { getRtComlibsFromConfigEdit } from '../../utils/comlib'
import { insertDeps, createScript, getLibExternalsFill } from '../../utils/getComlibs'
import '@/reset.less'
import { getLocaleLang } from '../setting/App/I18nConfig/utils';

const React = window.React;
const ReactDOM = window.ReactDOM;


const fileId = getQueryString('fileId')
const previewStorage = new PreviewStorage({ fileId })

let { dumpJson, comlibs, appConfig } = previewStorage.getPreviewPageData()

if (!dumpJson) {
  throw new Error('数据错误：项目数据缺失')
}

if (!comlibs) {
  console.warn('数据错误: 组件库缺失')
  comlibs = [PC_NORMAL_COM_LIB, CHARS_COM_LIB, BASIC_COM_LIB]
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
      // 兼容
      innerHTML = innerHTML + `--mybricks-primary-color: var(--mb-color-primary);\n`
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

let reactRoot


const getAntdLocalName = (locale) => {
  const localeArr = locale.split('-');
  if (localeArr.length <= 1) {
    return locale
  }
  const lang = localeArr.pop()?.toUpperCase();
  return localeArr.concat(['_', lang as string]).join('');
}

const getCurrentLocale = () => {
  // return navigator.language
  return getLocaleLang(appConfig?.localeConfig)
}

async function render(props) {
  const { container } = props;
  if (comlibs && Array.isArray(comlibs)) {
    comlibs.forEach((comlib) => {
      getLibExternalsFill(comlib);
    })
    await insertDeps([{
      externals: [
        {
          "name": "@ant-design/icons",
          "library": "icons",
          "urls": [
            "public/ant-design-icons@4.7.0.min.js"
          ]
        },
        {
          "name": "moment",
          "library": "moment",
          "urls": [
            "public/moment/moment@2.29.4.min.js",
            "public/moment/locale/zh-cn.min.js"
          ]
        },
        {
          "name": "antd",
          "library": "antd",
          "urls": [
            "public/antd/antd@4.21.6.variable.min.css",
            "public/antd/antd@4.21.6.min.js",
            "public/antd/locale/zh_CN.js"
          ]
        }
      ]
    }].concat(comlibs))
    // if (!window.antd) {
    //   console.log("没有antd，默认加载")
    //   console.log("兼容通用PC组件库（老版本没有配置externals）")
    //   // 没有antd的话，默认加载
    //   // 兼容通用PC组件库（老版本没有配置externals）
    //   await insertDeps([
    //     {
    //       externals: [
    //         {
    //           "name": "@ant-design/icons",
    //           "library": "icons",
    //           "urls": [
    //             "public/ant-design-icons@4.7.0.min.js"
    //           ]
    //         },
    //         {
    //           "name": "moment",
    //           "library": "moment",
    //           "urls": [
    //             "public/moment/moment@2.29.4.min.js",
    //             "public/moment/locale/zh-cn.min.js"
    //           ]
    //         },
    //         {
    //           "name": "antd",
    //           "library": "antd",
    //           "urls": [
    //             "public/antd/antd@4.21.6.variable.min.css",
    //             "public/antd/antd@4.21.6.min.js",
    //             "public/antd/locale/zh_CN.js"
    //           ]
    //         }
    //       ]
    //     }
    //   ])
    //   await createScript("public/antd/antd@4.21.6.with-locales.min.js")
    // }
    Promise.all(getRtComlibsFromConfigEdit(comlibs).map((t) => requireScript(t))).then(() => {
      const antd = window.antd;
      const antd_5_21_4 = window.antd_5_21_4;
      const lang = getAntdLocalName(getCurrentLocale())

      const antdLocalLib = antd?.locales?.[lang] || (Object.values(antd?.locales || {}))?.find(item => item.locale === getCurrentLocale()) || antd?.locale['zh_CN'].default

      reactRoot = ReactDOM.createRoot((container ?? document).querySelector('#root'));

      const antdProps = {
        // 如鬼没有就传入undefined使用默认的英文，否则使用指定的语言包，并以中文兜底
        locale: [`en_US`, `en`].includes(lang) ? undefined : antdLocalLib
      }
      let reactNode = renderUI({
        ...props, renderType: 'react', locale: getCurrentLocale(), env: {
          callDomainModel(domainModel, type, params) {
            return callDomainHttp(domainModel, params, { action: type } as any);
          }
        }
      })

      const antdConfigProvider = antd?.ConfigProvider

      if (antdConfigProvider) {
        reactNode = React.createElement(
          antdConfigProvider,
          antdProps,
          reactNode
        )
      }

      const antd_5_21_4_ConfigProvider = antd_5_21_4?.ConfigProvider

      if (antd_5_21_4_ConfigProvider) {
        reactNode = React.createElement(
          antd_5_21_4_ConfigProvider,
          antdProps,
          reactNode
        )
      }

      reactRoot.render(reactNode)

      // reactRoot.render(React.createElement(
      //   antd.ConfigProvider,
      //   {
      //     // 如鬼没有就传入undefined使用默认的英文，否则使用指定的语言包，并以中文兜底
      //     locale: [`en_US`, `en`].includes(lang) ? undefined : antdLocalLib
      //   },
      //   renderUI({
      //     ...props, renderType: 'react', locale: getCurrentLocale(), env: {
      //       callDomainModel(domainModel, type, params) {
      //         return callDomainHttp(domainModel, params, { action: type } as any);
      //       }
      //     }
      //   })
      // ));
    })
  }
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('react app bootstrap');
}

export async function mount(props) {
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  // ReactDOM.unmountComponentAtNode((container ?? document).querySelector('#root'));
  reactRoot.unmount();
}