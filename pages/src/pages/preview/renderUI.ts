import {
  getComs,
  getQueryString,
  shapeUrlByEnv,
  parseQuery,
  getRenderWeb,
} from "@/utils";
import { runJs } from "@/utils/runJs";
import { connectorLoader } from "@/utils/connectorLoader";
import { PreviewStorage } from "@/utils/previewStorage";
// import { mock as connectorHttpMock } from '@mybricks/plugin-connector-http'
import connectorHttpMock from "@mybricks/plugin-connector-http/runtime/mock";
import { call as callDomainHttp } from "@mybricks/plugin-connector-domain/runtime";
import { proxLocalStorage, proxSessionStorage } from "@/utils/debugMockUtils";
import DomainModelExecutor from "@mybricks/plugin-domain/dist/esm/runtime/DomainModelExecutor";

const fileId = getQueryString("fileId");
const USE_CUSTOM_HOST = "__USE_CUSTOM_HOST__";
const previewStorage = new PreviewStorage({ fileId });
const {
  dumpJson,
  hasPermissionFn,
  executeEnv,
  appConfig,
  envList,
  MYBRICKS_HOST,
  directConnection,
  i18nLangContent,
  debugMockConfig,
  runtimeUploadService,
} = previewStorage.getPreviewPageData();
const domainModel = new DomainModelExecutor(dumpJson.plugins["@mybricks/plugin-domain"] || { domainModels: [] })

proxLocalStorage(debugMockConfig);
proxSessionStorage(debugMockConfig);
const root = ({ renderType, locale, env, ...props }) => {
  const renderUI = getRenderWeb(renderType);
  if (!renderUI) {
    throw Error(`找不到${renderType}渲染器`);
  }
  return renderUI(dumpJson, {
    //控制页面右滑弹出
    sceneOpenType: "redirect",
    env: {
      ...env,
      renderCom(json, opts, coms) {
        return renderUI(json, {
          comDefs: { ...getComs(), ...coms },
          // observable: window['rxui'].observable,
          ...(opts || {}),
          env: {
            ...(opts?.env || {}),
            edit: false,
            runtime: true,
          },
        });
      },
      i18n(title) {
        //多语言
        if (typeof title?.id === "undefined") return title;
        return (
          i18nLangContent[title.id]?.content?.[locale] ||
          i18nLangContent[title.id]?.content?.[`zh-CN`] ||
          JSON.stringify(title)
        );
      },
      /** 调用领域模型 */
      callDomainModel: domainModel.call.bind(domainModel),
      // callDomainModel(domainModel, type, params) {
      //   return callDomainHttp(domainModel, params, { action: type } as any);
      // },
      async callConnector(connector, params, connectorConfig = {}) {
        await connectorLoader(appConfig);
        const plugin =
          window[connector.connectorName] ||
          window["@mybricks/plugins/service"];
        let newParams = params;
        if (executeEnv === USE_CUSTOM_HOST) {
          if (params instanceof FormData) {
            newParams.append("MYBRICKS_HOST", JSON.stringify(MYBRICKS_HOST));
          } else if (Array.isArray(newParams)) {
            newParams["MYBRICKS_HOST"] = { ...MYBRICKS_HOST };
          } else {
            newParams = { ...params, MYBRICKS_HOST: { ...MYBRICKS_HOST } };
          }
        }
        if (plugin) {
          const curConnector = connector.script
            ? connector
            : (dumpJson.plugins[connector.connectorName] || []).find(
              (con) => con.id === connector.id
            );

          if (curConnector?.globalMock || connectorConfig?.openMock) {
            return connectorHttpMock({ ...connector, ...connectorConfig }, {});
          }

          return curConnector
            ? plugin.call(
              { ...connector, ...curConnector, useProxy: !directConnection },
              newParams,
              {
                ...connectorConfig,
                /** http-sql表示为领域接口 */
                before:
                  connector.type === "http-sql"
                    ? (options) => {
                      const newOptions = { ...options };
                      if (!newOptions.headers) {
                        newOptions.headers = {};
                      }
                      newOptions.headers["x-mybricks-debug"] = "true";

                      return newOptions;
                    }
                    : (options) => {
                      return {
                        ...options,
                        url: shapeUrlByEnv(
                          envList,
                          executeEnv,
                          options.url,
                          MYBRICKS_HOST
                        ),
                      };
                    },
              }
            )
            : Promise.reject("接口不存在，请检查连接器插件中接口配置");
        } else {
          return Promise.reject("错误的连接器类型");
        }
      },
      vars: {
        get locale() {
          return locale;
        },
        get getExecuteEnv() {
          return () => executeEnv;
        },
        get getI18nContent() {
          return () => i18nLangContent || {};
        },
        getQuery: () => {
          if (location.hash) { // 兼容 hash 路由场景
            const hash = location.hash.substring(1)
            const searchPart = hash.split('?')[1] || ''
            return parseQuery(`?${searchPart}`)
          }

          return parseQuery(location.search)
        },
        get getProps() {
          return () => {
            // 获取主应用参数方法，如：token等参数，取决于主应用传入
            if (!props) return undefined;
            return props;
          };
        },
        get getRouter() {
          const isUri = (url: string) => {
            return /^http[s]?:\/\/([\w\-\.]+)+[\w-]*([\w\-\.\/\?%&=]+)?$/gi.test(
              url
            );
          };
          return () => ({
            reload: () => location.reload(),
            forcedReload: () => location.reload(true),
            redirect: ({ url }: { url: string }) => location.replace(url),
            back: () => history.back(),
            forward: () => history.forward(),
            pushState: ({
              state,
              title,
              url,
            }: {
              state: any;
              title: string;
              url: string;
            }) => {
              if (isUri(url)) {
                //兼容uri
                location.href = url;
              } else {
                history.pushState(state, title, url);
              }
            },
            openTab: ({ url, title }: { url: string; title: string }) =>
              open(url, title || "_blank"),
          });
        },
      },
      get hasPermission() {
        return ({ permission, key }) => {
          if (!hasPermissionFn) {
            return true;
          }

          // 编辑权限配置为”无“时，不需要进行权限校验
          if (permission?.type === "none") {
            return true;
          }

          const code = permission?.register?.code || key;

          // 如果没有权限编码，不需要校验
          if (code === undefined) {
            return true;
          }

          let result: boolean | { permission: boolean };

          try {
            result = runJs(decodeURIComponent(hasPermissionFn), [
              { key: code },
            ]);

            if (
              typeof result !== "boolean" &&
              typeof result?.permission !== "boolean"
            ) {
              result = true;
              console.warn(
                "权限方法",
                `权限方法返回值类型应为 Boolean 或者 { permission: Boolean } 请检查，[Key] ${code};[返回值] Type: ${typeof result}; Value: ${JSON.stringify(result)}`
              );
              console.error(
                `权限方法返回值类型应为 Boolean 或者 { permission: Boolean } 请检查，[Key] ${code};[返回值] Type: ${typeof result}; Value: ${JSON.stringify(result)}`
              );
            }
          } catch (error) {
            result = true;
            console.warn("权限方法", `${error.message}`);
            console.error(`权限方法出错[Key] ${code};`, error);
          }

          return result;
        };
      },
      get uploadFile() {
        return async (files) => {
          if (!runtimeUploadService) {
            throw new Error("请先配置运行时上传接口");
          }
          // 创建FormData对象
          const formData = new FormData();

          // 添加文件到FormData对象
          for (const file of files) {
            formData.append("file", file);
          }

          try {
            // 发送POST请求
            const response = await fetch(runtimeUploadService, {
              method: "POST",
              body: formData,
            }).then((res) => {
              if (res.status !== 200 && res.status !== 201) {
                throw new Error(`上传失败！`);
              }
              return res.json();
            });

            return {
              url: response?.data?.url,
              name: files[0].name,
            };
          } catch (error) {
            // 错误处理
            console.error("文件上传失败", error);
            throw new Error(`上传失败，请检查上传接口设置！`);
          }
        };
      },
    },
    events: [
      //配置事件
      {
        type: "jump",
        title: "跳转到",
        exe({ options }) {
          const page = options.page;
          if (page) {
            window.location.href = page;
          }
        },
        options: [
          {
            id: "page",
            title: "页面",
            editor: "textarea",
          },
        ],
      },
    ],
    rootId: `C${fileId}`,
  });
};

export default root;
