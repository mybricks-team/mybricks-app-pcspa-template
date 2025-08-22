import { getComs, shapeUrlByEnv, parseQuery, getRenderWeb } from "@/utils";
import { runJs } from "@/utils/runJs";
import DomainModelExecutor from "@mybricks/plugin-domain/dist/esm/runtime/DomainModelExecutor";

const USE_CUSTOM_HOST = "__USE_CUSTOM_HOST__";
/** template */
const projectJson = "--projectJson--";
const projectId = "--slot-project-id--";
const executeEnv = "--executeEnv--";
const envList = "--envList--";
const i18nLangContent = "--i18nLangContent--";
const titleI18n = "--title-i18n--";
const runtimeUploadService = "--runtimeUploadService--";
const pluginTheme = "--plugin-theme--";
const domainModel = new DomainModelExecutor(projectJson.plugins["@mybricks/plugin-domain"] || { domainModels: [] })

function cssVariable() {
  const themeData = pluginTheme as any;

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

cssVariable();

const getCustomHostFromUrl = () => {
  try {
    const url = new URL(location.href);
    const params = new URLSearchParams(url.search);

    // 获取单个参数
    const MYBRICKS_HOST = params.get("MYBRICKS_HOST");
    if (MYBRICKS_HOST) {
      const hostJson = decodeURIComponent(MYBRICKS_HOST)
      window.MYBRICKS_HOST = JSON.parse(hostJson)
    }
  } catch (e) {
    console.error(`getCustomHostFromUrl error`, e)
  }
}
getCustomHostFromUrl()

const getCurrentLocale = () => {
  return navigator.language
}

const isEqual = (param1, param2) => {
  return param1 === param2
}

const root = ({ renderType, locale, runtime, extVars, extCallConnector, customMethodMap, ...props }) => {
  const renderUI = getRenderWeb(renderType);
  const domainServicePath = '--domain-service-path--';//replace it
  /**网页标题i18n处理 */
  try {
    if (titleI18n?.id !== undefined) {
      document.title = i18nLangContent[titleI18n.id]?.content?.[getCurrentLocale()]
    }
  } catch (e) {
    console.error('网页标题国际化处理失败, 失败原因: ', e);
  }
  // =========== 网页标题i18n处理 end ===============
  return renderUI(projectJson, {
    //控制页面右滑弹出
    sceneOpenType: "redirect",
    env: {
      runtime,
      silent: true,
      showErrorNotification: false,
      canvasElement: props?.canvasElement || props.renderRoot || props.container || document.body,
      i18n(title) {
        //多语言
        if (typeof title?.id === 'undefined') return title
        return i18nLangContent[title.id]?.content?.[locale]
          || i18nLangContent[title.id]?.content?.[`zh-CN`]
          || JSON.stringify(title)
        //return title;
      },
      get vars() {
        // 环境变量
        return {
          ...(extVars?.customVars || {}),
          get customMethods() {
            return { methodMap: customMethodMap || {} }
          },
          get getExecuteEnv() {
            return () => executeEnv;
          },
          get getI18nContent() {
            return () => (i18nLangContent || {})
          },
          get getQuery() {
            return () => {
              if (location.hash) { // 兼容 hash 路由场景
                const hash = location.hash.substring(1)
                const searchPart = hash.split('?')[1] || ''
                return parseQuery(`?${searchPart}`)
              }

              return parseQuery(location.search);
            };
          },
          //antd 语言包地址
          get locale() {
            return locale
          },
          get getProps() {
            // 获取主应用参数方法，如：token等参数，取决于主应用传入
            return () => {
              if (!props) return undefined;
              return props;
            };
          },
          get getCookies() {
            return () => {
              const cookies = document.cookie.split("; ").reduce((s, e) => {
                const p = e.indexOf("=");
                s[e.slice(0, p)] = e.slice(p + 1);
                return s;
              }, {});

              return cookies;
            };
          },
          get getRouter() {
            if (extVars?.getRouter) return extVars.getRouter();

            const isUri = (url) => {
              return /^http[s]?:\/\/([\w\-\.]+)+[\w-]*([\w\-\.\/\?%&=]+)?$/gi.test(
                url
              );
            };
            return () => ({
              reload: () => location.reload(),
              forcedReload: () => location.reload(true),
              redirect: ({ url }) => location.replace(url),
              back: () => history.back(),
              forward: () => history.forward(),
              pushState: ({ state, title, url }) => {
                if (isUri(url)) {
                  //兼容uri
                  location.href = url;
                } else {
                  history.pushState(state, title, url);
                }
              },
              openTab: ({ url, title }) => open(url, title || "_blank"),
            });
          },
        };
      },
      projectId,
      /** 调用领域模型 */
      callDomainModel: domainModel.call.bind(domainModel),
      // callDomainModel(domainModel, type, params) {
      //   return window.pluginConnectorDomain.call(domainModel, params, {
      //     action: type,
      //     before(options) {
      //       if (['domain', 'aggregation-model'].includes(domainModel.type)) {
      //         let newOptions = { ...options };
      //         if (projectId) {
      //           Object.assign(newOptions.data, {
      //             projectId: projectId,
      //           });
      //         }
      //         return {
      //           ...newOptions,
      //           url: domainServicePath,
      //         };
      //       } else {
      //         return options;
      //       }
      //     },
      //   });
      // },
      callConnector(connector, params, connectorConfig = {}) {
        const plugin =
          window[connector.connectorName] ||
          window["@mybricks/plugins/service"];
        //@ts-ignore
        const MYBRICKS_HOST = window?.MYBRICKS_HOST;
        //@ts-ignore
        if (isEqual(executeEnv, USE_CUSTOM_HOST)) {
          if (typeof MYBRICKS_HOST === "undefined") {
            console.error(`没有设置window.MYBRICKS_HOST变量`);
            return;
          } else if (!MYBRICKS_HOST.default) {
            console.error(`没有设置window.MYBRICKS_HOST.default`);
            return;
          }
        }
        let newParams = params;
        //@ts-ignore
        if (isEqual(executeEnv, USE_CUSTOM_HOST)) {
          if (params instanceof FormData) {
            newParams.append("MYBRICKS_HOST", JSON.stringify(MYBRICKS_HOST));
          } else if (Array.isArray(newParams)) {
            newParams["MYBRICKS_HOST"] = { ...MYBRICKS_HOST };
          } else {
            newParams = { ...params, MYBRICKS_HOST: { ...MYBRICKS_HOST } };
          }
        }
        if (plugin) {
          /** 兼容云组件，云组件会自带 script */
          const curConnector = connector.script
            ? connector
            : (projectJson.plugins[connector.connectorName] || []).find(
              (con) => con.id === connector.id
            );

          return curConnector
            ? plugin.call({ ...connector, ...curConnector }, newParams, {
              ...connectorConfig,
              /** http-sql表示为领域接口 */
              before: connector.type === 'http-sql' ?
                options => {
                  let newOptions = { ...options }
                  if (projectId) {
                    Object.assign(newOptions.data, {
                      projectId: projectId
                    })
                  }
                  return {
                    ...newOptions,
                    url: domainServicePath
                  }
                }
                : (options) => {
                  const mergedOptions = {
                    ...options,
                    url: shapeUrlByEnv(
                      envList,
                      executeEnv,
                      options.url,
                      MYBRICKS_HOST
                    ),
                  }
                  if (extCallConnector?.before) return extCallConnector.before(mergedOptions);
                  return mergedOptions;
                },
            })
            : Promise.reject("接口不存在，请检查连接器插件中接口配置");
        } else {
          return Promise.reject("错误的连接器类型");
        }
      },
      renderCom(json, opts, coms) {
        return renderUI(json, {
          comDefs: { ...getComs(), ...coms },
          ...(opts || {}),
        });
      },
      get hasPermission() {
        return ({ permission, key }) => {
          // @ts-ignore
          const hasPermissionFn = projectJson?.hasPermissionFn

          if (!hasPermissionFn) {
            return true
          }

          // 编辑权限配置为”无“时，不需要进行权限校验
          if (permission?.type === 'none') {
            return true
          }

          const code = permission?.register?.code || key

          // 如果没有权限编码，不需要校验
          if (code === undefined) {
            return true
          }

          let result: boolean | { permission: boolean }

          try {
            result = runJs(decodeURIComponent(hasPermissionFn), [
              { key: code },
            ])

            if (
              typeof result !== 'boolean' &&
              typeof result?.permission !== 'boolean'
            ) {
              result = true
              console.warn(
                '权限方法',
                `权限方法返回值类型应为 Boolean 或者 { permission: Boolean } 请检查，[Key] ${code};[返回值] Type: ${typeof result}; Value: ${JSON.stringify(result)}`
              )
              console.error(
                `权限方法返回值类型应为 Boolean 或者 { permission: Boolean } 请检查，[Key] ${code};[返回值] Type: ${typeof result}; Value: ${JSON.stringify(result)}`
              )
            }
          } catch (error) {
            result = true
            console.warn(
              '权限方法',
              `${error.message}`
            )
            console.error(`权限方法出错[Key] ${code};`, error)
          }

          return result
        };
      },
      get uploadFile() {
        return async (files) => {
          if (!runtimeUploadService) {
            throw new Error('请先配置运行时上传接口')
          }
          // 创建FormData对象
          const formData = new FormData();

          // 添加文件到FormData对象
          for (const file of files) {
            formData.append('file', file);
          }

          try {
            // 发送POST请求
            const response = await fetch(runtimeUploadService, {
              method: "POST",
              body: formData
            }).then(res => {
              if (res.status !== 200 && res.status !== 201) {
                throw new Error(`上传失败！`)
              }
              return res.json()
            })

            return {
              url: response?.data?.url,
              name: files[0].name
            }
          } catch (error) {
            // 错误处理
            console.error('文件上传失败', error);
            throw new Error(`上传失败，请检查上传接口设置！`)
          }
        }
      },
    },
    rootId: `C--fileId--`,
  });
};

export default root;
