import React, { useEffect, useState } from "react";
import { message, Tooltip, Modal, Descriptions } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";

// import servicePlugin, {
//   call as callConnectorHttp,
//   mock as connectorHttpMock,
// } from "@mybricks/plugin-connector-http";
import domainServicePlugin, {
  call as callDomainHttp,
} from "@mybricks/plugin-connector-domain";
import pluginToCode from "@mybricks/plugin-tocode";
// import { openFilePanel } from "@mybricks/sdk-for-app/ui";
import versionPlugin from "mybricks-plugin-version";
import localePlugin from "@mybricks/plugin-locale";
// import notePlugin from "@mybricks/plugin-note";
// import { use as useTheme } from "@mybricks/plugin-theme";
import { openFilePanel } from "@mybricks/sdk-for-app/ui";
import { showAIPageModal } from '@mybricks/ai-utils'
import pluginDomain from "@mybricks/plugin-domain";
import DomainModelExecutor from "@mybricks/plugin-domain/dist/esm/runtime/DomainModelExecutor";

import comlibLoaderFunc from "../configs/comlibLoader";
import { comLibAdderFunc } from "../configs/comLibAdder";
import CollaborationHttp from "../plugin/collaboration-http";
import { runJs } from "../../../utils/runJs";

import { shapeUrlByEnv, checkElement } from "../../../utils";
import { EnumMode } from "../components/PublishModal";
import {
  GET_DEFAULT_PAGE_HEADER,
  GET_PAGE_CONFIG_EDITOR,
  USE_CUSTOM_HOST,
} from "../constants";
import { fAxios } from "@/services/http";
import { createFromIconfontCN } from "@ant-design/icons";
import download from "@/utils/download";
import searchUser from "@/utils/searchUser";
import { blobToBase64 } from "@/utils/blobToBase64";

// import { render as renderUI } from '@mybricks/render-web'

import { EnumLocale, getLocaleLang } from "../../setting/App/I18nConfig/utils";

import { compareVersionLatest } from "../utils/saveContent";

const { confirm } = Modal;
import editViewConfig from "./editView";
import getAiView from "./getAiView";
import { getExecuteEnvByMode } from "@/pages/design/app-configs/utils";

// const getComs = () => {
//   const comDefs = {}
//   const regAry = (comAray) => {
//     comAray.forEach((comDef) => {
//       if (comDef.comAray) {
//         regAry(comDef.comAray)
//       } else {
//         comDefs[`${comDef.namespace}-${comDef.version}`] = comDef
//       }
//     })
//   }

//   const comlibs = [
//     ...(window['__comlibs_edit_'] || []),
//     ...(window['__comlibs_rt_'] || []),
//   ]
//   comlibs.forEach((lib) => {
//     const comAray = lib.comAray
//     if (comAray && Array.isArray(comAray)) {
//       regAry(comAray)
//     }
//   })
//   return comDefs
// }

const CUSTOM_HOST_TITLE = `自定义域名`;
const DOMAIN_APP_NAMESPACE = "mybricks-domain";

const isReact = APP_TYPE === "react";

export default function appConfig(
  ctx,
  appData,
  save,
  designerRef,
  remotePlugins = [],
  fileDBRef,
  setBeforeunload,
  builtPlugins
) {
  const envList = ctx.envList;
  // 获得环境信息映射表
  const envMap = [
    ...envList,
    { name: USE_CUSTOM_HOST, title: CUSTOM_HOST_TITLE },
  ].reduce((res, item) => {
    res[item.name] = item.title;
    return res;
  }, {});

  const domainApp = appData.installedApps.find(
    (app) => app.namespace === DOMAIN_APP_NAMESPACE
  );

  ctx.debugMode =
    ctx.executeEnv === USE_CUSTOM_HOST
      ? EnumMode.CUSTOM
      : envList.length > 0
        ? EnumMode.ENV
        : EnumMode.DEFAULT;

  getExecuteEnvByMode(ctx.debugMode, ctx, envList);

  const adder: Array<{
    type: string;
    title: string;
    inputs?: { id: string; title: string; schema: Record<string, string> }[];
    outputs?: { id: string; title: string; schema: Record<string, string> }[];
    template?: Record<string, any>;
  }> = [
    // {
    //   type: 'normal',
    //   title: '页面',
    //   inputs: [
    //     {
    //       id: 'open',
    //       title: '打开',
    //       schema: {
    //         type: 'any',
    //       },
    //     },
    //   ],
    // },
  ];

  if (isReact) {
    // adder.push({
    //   type: 'defined',
    //   title: 'AI生成...',
    //   // @ts-ignore
    //   load: () => {
    //     return new Promise((resolve, reject) => {
    //       const destroy = showAIPageModal({
    //         onGenerateFinish({ templateJson }) {
    //           resolve(templateJson)
    //           destroy?.()
    //         },
    //       })
    //     })
    //   }
    // })
    // @ts-ignore
    // adder.push({})

    const { adderAntd4Ary, adderAntd5Ary } = getAdders(ctx.comlibs);

    adder.push(
      ...[
        {
          type: "normal",
          title: "页面",
          inputs: [
            {
              id: "open",
              title: "打开",
              schema: {
                type: "any",
              },
            },
          ],
        },
        ...adderAntd4Ary,
        ...adderAntd5Ary
      ]
    );
  }

  const getCurrentLocale = () => {
    return getLocaleLang(ctx?.appConfig?.localeConfig);
  };

  const { notePlugin, themePlugin, httpPlugin } = builtPlugins;
  const servicePlugin = httpPlugin.default;
  const callConnectorHttp = httpPlugin.call;
  const connectorHttpMock = httpPlugin.mock;

  const connetorPlugins: any[] = [
    servicePlugin({
      isPrivatization: ctx.setting?.system.config?.isPureIntranet === true,
      // addActions: domainApp
      //   ? [
      //     {
      //       type: 'http-sql',
      //       title: '领域接口',
      //       noUseInnerEdit: true,
      //       getTitle: (item) => {
      //         return item.content?.domainServiceMap
      //           ? item.content.title
      //           : `${item.content.title || ''}(未选择)`
      //       },
      //       render: (props) => {
      //         return (
      //           <CollaborationHttp
      //             {...props}
      //             openFileSelector={() =>
      //               openFilePanel({
      //                 allowedFileExtNames: ['domain'],
      //                 parentId: ctx.sdk.projectId,
      //                 fileId: ctx.fileId,
      //               })
      //             }
      //           />
      //         )
      //       },
      //     },
      //   ]
      //   : void 0,
    }),
  ];
  // if (domainApp) {
  //   connetorPlugins.push(
  //     domainServicePlugin({
  //       openFileSelector() {
  //         return openFilePanel({
  //           allowedFileExtNames: ['domain'],
  //           parentId: ctx.sdk.projectId,
  //           fileId: ctx.fileId,
  //         })
  //       },
  //     })
  //   )
  // }
  return {
    // debugger(json, opts) {
    //   return renderUI(json, opts)
    // },
    shortcuts: {
      "ctrl+s": [save],
    },
    plugins: [
      // ...connetorPlugins,
      notePlugin.default({
        user: ctx.user,
        onUpload: async (file: File) => {
          return new Promise(async (resolve, reject) => {
            const { manateeUserInfo, fileId } = ctx;
            let uploadService = ctx.uploadService;
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folderPath", `/files/${fileId}`);

            const useConfigService = !!uploadService;

            if (!useConfigService) {
              uploadService = "/paas/api/flow/saveFile";
            }

            try {
              const res = await axios<any, any>({
                url: uploadService,
                method: "post",
                data: formData,
                headers: {
                  "Content-Type": "multipart/form-data",
                  ...manateeUserInfo,
                },
              });
              const { data = {} } = res.data;
              const { url } = data;
              if (!url) {
                reject(`没有返回图片地址`);
              }
              const staticUrl = /^http/.test(url)
                ? url
                : `${getDomainFromPath(uploadService)}${url}`;
              resolve({ url: staticUrl });
              reject(`【图片上传出错】: ${message}`);
            } catch (error) {
              message.error(error.message);
              reject(error);
            }
          });
        },
        onAtsEmail: ({ subject, to, body, extra, from }) => {
          let data = { fileId: ctx.fileId, subject, to, body, extra, from };
          const config = appData.config[APP_NAME]?.config;
          const serviceApi = config?.emailApiConfig?.sendAtsEmailApi || "";
          if (serviceApi) {
            axios({
              method: "POST",
              url: serviceApi,
              withCredentials: false,
              data,
              headers: {
                "Content-Type": "application/json",
              },
            }).catch((err) => {
              console.log("err", err);
            });
          }
        },
        onSearchUser: (keyword: string) => {
          return new Promise(async (resolve, reject) => {
            try {
              const res = await searchUser(`api/pc-page-template/searchUser`, {
                keyword,
              });
              // @ts-ignore
              const formatRes = (res || []).map((item) => {
                const { email, id, name, avatar } = item;
                return {
                  name: name ? `${name}(${email})` : email,
                  id,
                  username: email,
                  orgDisplayName: "",
                  thumbnailAvatarUrl: avatar,
                };
              });
              resolve(formatRes);
            } catch (e) {
              message.error("搜索用户失败!");
              reject("搜索用户失败!");
            }
          });
        },
      }),
      // localePlugin({
      //   defaultPackLink:
      //     ctx?.appConfig?.localeConfig?.defaultI18nLink ||
      //     "/mybricks-app-pcspa/public/i18n-example.json",
      //   onPackLoad: ({ i18nLangContent }) => {
      //     ctx.i18nLangContent = i18nLangContent;
      //   },
      //   onUsedIdChanged: ({ ids }) => {
      //     ctx.i18nUsedIdList = ids;
      //   },
      // }),
      // ...remotePlugins,
      themePlugin.use({ sdk: appData }),
      ...(ctx.isPreview
        ? []
        : [
            versionPlugin({
              user: ctx.user,
              file: appData.fileContent || {},
              disabled: ctx.disabled,
              needSavePreview: true,
              needPublishRevert: true,
              envMap,
              onInit: (versionApi) => {
                ctx.versionApi = versionApi;
              },
              onRevert: async (params: {
                pubAssetFilePath: string;
                nowVersion: string;
                fileId: number;
                type: string;
              }) => {
                const { fileId, nowVersion, pubAssetFilePath, type } = params;
                try {
                  const finish = message.loading("正在回滚...", 0);
                  const res: { code: number; message: string } =
                    await fAxios.post("/api/pcpage/rollback", {
                      filePath: pubAssetFilePath,
                      nowVersion,
                      type,
                      fileId,
                    });
                  finish();

                  if (res.code === 1) {
                    message.success(res.message);
                  } else {
                    message.error("回滚失败！");
                  }
                } catch (e) {
                  message.error("回滚失败！");
                }
              },
              // modalActiveExtends: [
              //   {
              //     type: "publish",
              //     title: (
              //       <Tooltip
              //         color="white"
              //         title={
              //           <a
              //             target="_blank"
              //             href="https://docs.mybricks.world/docs/publish-integration/kjkj/"
              //           >
              //             使用说明
              //           </a>
              //         }
              //       >
              //         下载
              //       </Tooltip>
              //     ),
              //     onClick({ fileId, type: envType, version }) {
              //       const loadend = message.loading(
              //         `版本 ${version} 下载中...`,
              //         0
              //       );
              //       download(
              //         `api/pcpage/download-product/${fileId}/${envType}/${version}`
              //       ).finally(() => {
              //         loadend();
              //       });
              //     },
              //   },
              // ],
            }),
          ]),
      // pluginToCode({
      //   type: "spa",
      // }),
      // pluginDomain()
    ],
    // ...(ctx.hasMaterialApp
    //   ? {
    //       comLibAdder: comLibAdderFunc(ctx),
    //     }
    //   : {}),
    // comLibLoader: comlibLoaderFunc(ctx),
    // comLibLoader: () => {
    //   return new Promise((resolve) => {
    //     resolve(['https://assets.mybricks.world/comlibs/mybricks.basic-comlib/1.1.86/2025-03-12_17-36-16/edit.js', 'http://localhost:20000/comlib.js'])
    //   })
    // },
    comLibAdder: appData.comLibAdder(ctx),
    comLibLoader: appData.comLibLoader({
      comlibs: ctx.comlibs
    }),
    pageContentLoader() {
      //加载页面内容
      return new Promise(async (resolve, reject) => {
        const content = appData.fileContent?.content || {};
        let curContent = { ...content };

        const list = await fileDBRef.current.get(appData.fileId);

        // todo 冗余代码
        if (list.length > 0) {
          const item = list[0];
          if (
            compareVersionLatest(item.version, appData.fileContent.version) ===
            1
          ) {
            confirm({
              title: "存在未保存的内容，是否恢复？",
              icon: <ExclamationCircleOutlined />,
              okText: "确认",
              cancelText: "取消",
              content: `内容暂存时间：${moment.unix(item.createTime / 1000).format("YYYY-MM-DD HH:mm:ss")}`,
              onOk() {
                curContent = { ...item.data };
                setBeforeunload(true);
                delete curContent.comlibs;

                resolve(curContent);
              },
              onCancel() {
                delete curContent.comlibs;

                resolve(curContent);
              },
            });
          } else {
            delete curContent.comlibs;

            resolve(curContent);
          }
        } else if (curContent.templateJson) { //说明是从AI中创建的模板
          // 等设计器加载完毕之后将模板Json导入
          checkElement('_mybricks-geo-webview_', 300).then(() => {
            designerRef.current.loadTpt(curContent.templateJson)
          })

          return resolve({})
        } else {
          delete curContent.comlibs;

          resolve(curContent);
        }

        // 避免修改原始数据
        // const curContent = { ...content }
      });
    },
    toplView: {
      title: "交互",
      cards: {
        main: {
          title: "页面",
          inputs: [
            {
              id: "open",
              title: "打开",
              schema: {
                type: "any",
              },
            },
          ],
        },
      },
      globalIO: {
        startWithSingleton: true,
      },
      // vars: {},
      // fx: {},
      useStrict: false,
      useExtendedInput: true, // 开启场景卡片的扩展输入
    },
    aiView: getAiView(ctx?.appConfig?.publishLocalizeConfig?.enableAI, {
      model: ctx?.appConfig?.publishLocalizeConfig?.selectAIModel,
      designerRef
    }),
    editView: editViewConfig({ ctx, envList }),
    com: {
      env: {
        // renderCom(json, opts, coms) {
        //   return renderUI(
        //     json,
        //     {
        //       comDefs: { ...getComs(), ...coms },
        //       observable: window["mybricks"].createObservable,
        //       ...(opts || {}),
        //       env: {
        //         ...(opts?.env || {}),
        //         edit: false,
        //         runtime: true
        //       }
        //     }
        //   )
        // },
        i18n(title) {
          if (typeof title === "string") return title;
          const i18nLangContent = ctx.i18nLangContent || {};
          // 搭建页面使用中文
          return (
            i18nLangContent[title?.id]?.content?.[getCurrentLocale()] ||
            i18nLangContent[title?.id]?.content?.["zh-CN"] ||
            JSON.stringify(title)
          );
        },
        /** 调用领域模型 */
        // callDomainModel(domainModel, type, params) {
        //   return callDomainHttp(domainModel, params, {action: type} as any)
        // },
        callConnector(connector, params, connectorConfig: any = {}) {
          const plugin = designerRef.current?.getPlugin(
            connector.connectorName
          );

          if (
            ctx.executeEnv === USE_CUSTOM_HOST &&
            !ctx.MYBRICKS_HOST.default
          ) {
            throw new Error(`自定义域名必须设置default域名`);
          }

          let newParams = params;

          if (ctx.executeEnv === USE_CUSTOM_HOST) {
            if (params instanceof FormData) {
              newParams.append(
                "MYBRICKS_HOST",
                JSON.stringify(ctx.MYBRICKS_HOST)
              );
            } else if (Array.isArray(newParams)) {
              newParams["MYBRICKS_HOST"] = { ...ctx.MYBRICKS_HOST };
            } else if (typeof newParams === "object") {
              newParams = {
                ...params,
                MYBRICKS_HOST: { ...ctx.MYBRICKS_HOST },
              };
            }
          }

          if (!plugin) {
            /** 启动 Mock */
            if (connectorConfig?.openMock) {
              return connectorHttpMock({ ...connector, ...connectorConfig });
            }

            //服务接口类型
            return callConnectorHttp(
              {
                ...connector,
                script: connector.script,
                useProxy: !ctx.directConnection,
              },
              newParams,
              {
                ...connectorConfig,
                before: (options) => {
                  return {
                    ...options,
                    url: shapeUrlByEnv(
                      envList,
                      ctx.executeEnv,
                      options.url,
                      ctx.MYBRICKS_HOST
                    ),
                  };
                },
              }
            );
          } else {
            return plugin.callConnector(
              { ...connector, useProxy: !ctx.directConnection },
              newParams,
              {
                ...connectorConfig,
                before: (options) => {
                  return {
                    ...options,
                    url: shapeUrlByEnv(
                      envList,
                      ctx.executeEnv,
                      options.url,
                      ctx.MYBRICKS_HOST
                    ),
                  };
                },
              }
            );
          }
        },
        callDomainModel(...args) {
          const plugin = designerRef.current?.getPlugin("@mybricks/plugin-domain");
          return plugin.callDomainModel(...args)
        },
        vars: {
          get getExecuteEnv() {
            return () => ctx.executeEnv;
          },
          get getI18nContent() {
            return () => {
              return ctx.i18nLangContent || {};
            };
          },
          get locale() {
            return getCurrentLocale();
          },
          getQuery: () => ({ ...(ctx.debugQuery || {}) }),
          getProps: () => ({ ...(ctx.debugMainProps || {}) }),
          get getRouter() {
            const toast = (info: string) => {
              message.info(info);
            };
            return () => ({
              reload: () => toast("reload"),
              redirect: ({ url }: { url: string }) => toast(`redirect: ${url}`),
              back: () => toast("back"),
              forward: () => toast("forward"),
              pushState: ({
                state,
                title,
                url,
              }: {
                state: any;
                title: string;
                url: string;
              }) =>
                toast(`pushState: ${JSON.stringify({ state, title, url })}`),
              openTab: ({ url, title }: { url: string; title: string }) =>
                toast(`open a new tab: ${JSON.stringify({ url, title })}`),
            });
          },
          get getCookies() {
            return () => {
              return {};
            };
          },
          get customMethods() {
            return {
              options: ctx?.appConfig?.component?.customMethodOptions || [],
            };
          },
        },
        get uploadFile() {
          return async (files) => {
            if (!ctx.runtimeUploadService) {
              message.warn("请先配置运行时上传接口");
              return;
            }
            // 创建FormData对象
            const formData = new FormData();

            // 添加文件到FormData对象
            for (const file of files) {
              formData.append("file", file);
            }

            try {
              // 发送POST请求
              const response = await fetch(ctx.runtimeUploadService, {
                method: "POST",
                body: formData,
              }).then((res) => {
                if (res.status !== 200 && res.status !== 201) {
                  throw new Error(`上传失败！`);
                }
                return res.json();
              });
              console.log(`res,`, response);
              return {
                url: response?.data?.url,
                name: files[0].name,
              };
            } catch (error) {
              message.error(`上传失败，请检查上传接口设置！`);
              // 错误处理
              console.error("文件上传失败", error);
              return {};
            }
          };
        },
        get hasPermission() {
          return ({ permission, key }) => {
            const hasPermissionFn = ctx?.hasPermissionFn;

            if (!ctx.debugHasPermissionFn) {
              return true;
            }

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
                designerRef.current?.console?.log.error(
                  "权限方法",
                  `权限方法返回值类型应为 Boolean 或者 { permission: Boolean } 请检查，[Key] ${code};[返回值] Type: ${typeof result}; Value: ${JSON.stringify(result)}`
                );
                console.error(
                  `权限方法返回值类型应为 Boolean 或者 { permission: Boolean } 请检查，[Key] ${code};[返回值] Type: ${typeof result}; Value: ${JSON.stringify(result)}`
                );
              }
            } catch (error) {
              result = true;
              designerRef.current?.console?.log.error(
                "权限方法",
                `${error.message}`
              );
              console.error(`权限方法出错[Key] ${code};`, error);
            }

            return result;
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
    },
    geoView: {
      scenes: {
        adder,
      },
      ...(!!ctx.hasAIComlib ? {
        nav: {
          // float: true,
          comShortcuts: [
            {
              title: 'AI组件',
              icon: <svg viewBox="0 0 1024 1024" width="48" height="48"><path d="M487.061859 314.542494L617.31068 709.457506H540.741047l-26.839594-80.445651h-141.876875l-26.839594 80.445651h-76.78903l130.468219-394.915012h88.197686z m-46.073418 92.000571L394.988155 544.617055h88.197686L441.061573 406.543065zM755.530935 318.345379h-69.036995v394.915012h69.036995v-394.915012z" fill="currentColor" p-id="2721"></path><path d="M832.1737 908.889587H195.629206c-53.679189 0-99.679474-46.073418-99.679474-99.679474V214.789887c0-53.679189 46.000286-99.679474 99.679474-99.679474h636.544494c53.679189 0 99.679474 46.073418 99.679474 99.679474v594.420226c-3.802885 53.679189-46.000286 99.679474-99.679474 99.679474zM195.629206 191.826311a24.718754 24.718754 0 0 0-23.036709 22.963576v594.420226c0 11.481788 11.554921 22.963577 23.036709 22.963576h636.544494a24.718754 24.718754 0 0 0 23.036709-22.963576V214.789887a24.718754 24.718754 0 0 0-23.036709-22.963576H195.629206zM38.394526 302.987573a38.394515 38.394515 0 0 0 0 76.715898h57.555206V302.987573H38.394526z" fill="currentColor" p-id="2722"></path><path d="M985.605495 383.579489a38.394515 38.394515 0 0 0 0-76.715898h-57.482074v76.715898h57.482074zM38.394526 644.296529a38.394515 38.394515 0 0 0 0 76.715898h57.555206V640.493644H38.394526v3.802885zM985.605495 644.369661h-57.555206v80.445651h57.555206A38.394515 38.394515 0 0 0 1023.926878 686.493929c0-26.839594-15.357806-42.1974-38.321383-42.1974zM383.506367 38.394515a38.394515 38.394515 0 0 0-76.715898 0v76.715898h76.715898V38.394515zM303.060716 985.605485a38.394515 38.394515 0 0 0 76.715898 0v-76.715898h-76.78903v76.715898zM644.369672 985.605485c0 22.963577 19.087559 38.321383 38.321383 38.321383 19.160691 0 38.321383-19.160691 38.321382-38.321383v-76.715898H640.493654v76.715898h3.802886zM720.939305 38.394515A38.394515 38.394515 0 0 0 682.617922 0.073132c-19.160691 0-38.321383 19.160691-38.321382 38.321383v76.715898h80.44565V38.394515h-3.802885z" fill="currentColor" p-id="2723"></path></svg>,
              namespace: 'mybricks.basic-comlib.ai-mix'
            }
          ],
        }
      } : {}),
      theme: {
        css: [
          // 去除默认的样式文件
          // "public/antd/antd@4.21.6.variable.min.css",
          ///...(!isReact ? ['./public/elementUI/element@2.15.14.css'] : []),
        ],
      },
      layout: window._disableSmartLayout ? "flex-column" : "smart",
      toolbarContainer: '#sdk_toolbar_center',
    },
  };
}

function getAdders(comlibs) {
  const { hasAntd4Normal, hasAntd4Basic, hasAntd5Normal, hasAntd5Basic } = comlibs.reduce((pre, { namespace }) => {
    if (namespace === "mybricks.basic-comlib.antd5") pre.hasAntd5Basic = true;
    else if (namespace === "mybricks.normal-pc.antd5") pre.hasAntd5Normal = true;
    else if (namespace === "mybricks.normal-pc") pre.hasAntd4Normal = true;
    else if (namespace === "mybricks.basic-comlib") pre.hasAntd4Basic = true;
    return pre;
  }, { hasAntd4Normal: false, hasAntd4Basic: false, hasAntd5Normal: false, hasAntd5Basic: false });

  const template = ({ namespace, title, type }) => ({
    type,
    title,
    template: { namespace: namespace, deletable: false, asRoot: true }
  });
  const silentPrintIO = {
    inputs: [
      {
        id: "print",
        title: "打印",
        schema: {
          type: "any",
        },
      },
    ],
    outputs: [
      {
        id: "printed",
        title: "打印完成",
        schema: {
          type: "any",
        },
      },
    ],
  }

  const adderAntd4Ary = [];
  const adderAntd5Ary = [];

  if (hasAntd4Basic) {
    adderAntd4Ary.push(
      template({
        type: "popup",
        title: "对话框",
        namespace: "mybricks.basic-comlib.popup"
      }),
      template({
        type: "popup",
        title: "抽屉",
        namespace: "mybricks.basic-comlib.drawer"
      })
    )
    if (hasAntd5Basic) {
      adderAntd5Ary.push(
        template({
          type: "popup",
          title: "对话框(antd5)",
          namespace: "mybricks.basic-comlib.antd5.popup"
        }),
        template({
          type: "popup",
          title: "抽屉(antd5)",
          namespace: "mybricks.basic-comlib.antd5.drawer"
        }),
      )
    }
  } else if (hasAntd5Basic) {
    adderAntd5Ary.push(
      template({
        type: "popup",
        title: "对话框",
        namespace: "mybricks.basic-comlib.antd5.popup"
      }),
      template({
        type: "popup",
        title: "抽屉",
        namespace: "mybricks.basic-comlib.antd5.drawer"
      }),
    )
  }

  if (hasAntd4Normal) {
    adderAntd4Ary.push(
      template({
        type: "popup",
        title: "打印对话框",
        namespace: "mybricks.normal-pc.print",
      }),
      {
        ...template({
          type: "normal",
          title: "静默打印",
          namespace: "mybricks.normal-pc.silent-print",
        }),
        ...silentPrintIO
      }
    )
    if (hasAntd5Normal) {
      adderAntd5Ary.push(
        template({
          type: "popup",
          title: "打印对话框(antd5)",
          namespace: "mybricks.normal-pc.antd5.print",
        }),
        {
          ...template({
            type: "normal",
            title: "静默打印(antd5)",
            namespace: "mybricks.normal-pc.antd5.silent-print",
          }),
          ...silentPrintIO
        }
      )
    }
  } else if (hasAntd5Normal) {
    adderAntd5Ary.push(
      template({
        type: "popup",
        title: "打印对话框",
        namespace: "mybricks.normal-pc.antd5.print",
      }),
      {
        ...template({
          type: "normal",
          title: "静默打印",
          namespace: "mybricks.normal-pc.antd5.silent-print",
        }),
        ...silentPrintIO
      }
    )
  }

  return {
    adderAntd4Ary,
    adderAntd5Ary
  }
}
