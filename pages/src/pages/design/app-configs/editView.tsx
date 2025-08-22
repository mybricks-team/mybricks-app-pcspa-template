import {message} from "antd";
import {createFromIconfontCN} from "@ant-design/icons";
import {blobToBase64} from "@/utils/blobToBase64";
import axios from "axios";

import {DESIGN_MATERIAL_EDITOR_OPTIONS, mergeEditorOptions, PURE_INTERNET_EDITOR_OPTIONS,} from '../editor-options'
import {getDomainFromPath, getExecuteEnvByMode} from "@/pages/design/app-configs/utils";
import {EnumMode} from "@/pages/design/components/PublishModal";
import {comlibDebugUtils} from '../utils/comlibDebug'
import {GET_DEFAULT_PAGE_HEADER} from "@/pages/design/constants";

const defaultPermissionComments = `/**
*
* interface Props {
*   key: string // 权限key
* }
*
* @param {object} props: Props
* @return {boolean \\ { permission: boolean, type: "hide" | "hintLink", hintLinkUrl?: string, hintLinkTitle?: string }}
*/
`

const defaultPermissionFn = `export default function ({ key }) {
  return true
}
`

export default function get({ctx, envList}) {
  const debugModeOptions =
    envList.length > 0
      ? [
        {label: '选择环境', value: EnumMode.ENV},
        {label: '自定义域名', value: EnumMode.CUSTOM},
      ]
      : [
        {label: '默认', value: EnumMode.DEFAULT},
        {label: '自定义域名', value: EnumMode.CUSTOM},
      ]
  
  return {
    editorAppender(editConfig) {
      editConfig.fontJS = ctx.fontJS
      injectUpload(
        editConfig,
        ctx.uploadService,
        ctx.manateeUserInfo,
        ctx.fileId
      )
      return
    },
    items({}, cate0, cate1, cate2) {
      cate0.title = `页面`
      cate0.items = [
        {
          title: '页面标题',
          type: 'Text',
          description: 'HTML文档的标题',
          options: {
            locale: true
          },
          value: {
            get: (context) => {
              return ctx.pageHeader.title
            },
            set: (context, v: any) => {
              if (v?.id) {
                v.zh_CN = ctx.i18nLangContent[v.id]?.content?.['zh-CN']
              }
              ctx.pageHeader.title = v
            },
          },
        },
        {
          title: '图标',
          type: 'ImageSelector',
          description: '网页的图标(favicon)',
          options: {
            useBase64: true
          },
          value: {
            get: (context) => {
              return ctx.pageHeader.favicon
            },
            set: (context, v: any) => {
              ctx.pageHeader.favicon = v
            },
          },
        },
        {
          title: 'Meta',
          type: 'array',
          description: 'HTML文档的Meta内容',
          options: {
            getTitle: ({type, key}) => {
              return `${type}=${key}`;
            },
            onAdd: () => {
              const defaultMeta = {
                type: `name`,
                key: `author`,
                content: ``
              };
              return defaultMeta;
            },
            items: [
              {
                title: '关联属性',
                type: 'Radio',
                options: [
                  {label: 'name', value: 'name'},
                  {label: 'http-equiv', value: 'http-equiv'},
                ],
                value: 'type'
              },
              {
                title: 'name',
                description: '可选属性, 把content属性关联到一个名称',
                type: 'Text',
                value: 'key',
                ifVisible(item) {
                  return item.type === 'name';
                },
              },
              {
                title: 'http-equiv',
                description: '可选属性, 把content属性关联到HTTP头部',
                type: 'Text',
                value: 'key',
                ifVisible(item) {
                  return item.type === 'http-equiv';
                },
              },
              {
                title: 'content',
                description: '必填属性, 定义与http-equiv或name属性相关的元信息',
                type: 'Textarea',
                value: 'content'
              },
            ]
          },
          value: {
            get() {
              return ctx.pageHeader.meta
            },
            set(context, v) {
              ctx.pageHeader.meta = v;
            },
          },
        },
        // {
        //   title: '名称',
        //   description: `页面的名称，同时作为网页的标题`,
        //   type: 'Text',
        //   //options: {readOnly: true},
        //   value: {
        //     get: (context) => {
        //       return ctx.fileName
        //     },
        //     set: (context, v: any) => {
        //       if (v !== ctx.fileName) {
        //         ctx.fileName = v
        //       }
        //     },
        //   },
        // },
        // {
        //   title: '路径',
        //   description: `在系统中的文件路径`,
        //   type: 'Text',
        //   options: {readOnly: true},
        //   value: {
        //     get: (context) => {
        //       return ctx.absoluteNamePath
        //     },
        //     set: (context, v: any) => {
        //       if (v !== ctx.absoluteNamePath) {
        //         ctx.absoluteNamePath = v
        //       }
        //     },
        //   },
        // },
        // {
        //   title: '自动截图',
        //   type: 'Switch',
        //   description:
        //     '开始时保存会自动生成文件预览图，大型页面中可能会有性能问题，此时可以关闭此功能',
        //   value: {
        //     get: (context) => {
        //       return ctx.useAutoPreviewImage
        //     },
        //     set: (context, v: any) => {
        //       ctx.useAutoPreviewImage = v
        //     },
        //   },
        // },
        null,
        {
          title: '多语言包加载模式',
          type: 'Radio',
          description:
            '页面发布后加载多语言包的模式，【按需加载】只会加载页面中用到的语料，【全量加载】加载语言包中全量语料',
          options: [
            {label: '按需加载', value: 'lazy'},
            {label: '全量加载', value: 'full'},
          ],
          value: {
            get() {
              return ctx?.i18nLangContentType
            },
            set(context, v: string) {
              ctx.i18nLangContentType = v
            },
          },
        },
        {
          title: 'Iconfont',
          type: 'Text',
          description: '设置Iconfont js链接',
          value: {
            get() {
              return ctx.fontJS
            },
            set(context, v: string) {
              ctx.fontJS = v
              createFromIconfontCN({
                scriptUrl: v, // 在 iconfont.cn 上生成
              })
            },
          },
        },
        null,
        {
          title: '权限配置',
          type: 'code',
          description: '设置权限校验方法，调试模式下默认不会启用',
          options: {
            title: '配置权限策略',
            comments: defaultPermissionComments,
            displayType: 'button',
          },
          value: {
            get() {
              return decodeURIComponent(
                ctx?.hasPermissionFn ||
                encodeURIComponent(defaultPermissionFn)
              )
            },
            set(context, v: string) {
              ctx.hasPermissionFn = encodeURIComponent(v)
            },
          },
        }
      ]
      
      if (!ctx.pageHeader) {
        ctx.pageHeader = GET_DEFAULT_PAGE_HEADER(appData)
      }
      
      //const pageConfigEditor = GET_PAGE_CONFIG_EDITOR(ctx)
      cate1.title = '调试'
      cate1.items = [
        {
          title: '调试模式',
          type: 'Radio',
          description: '选择配置接口前缀域名的方式',
          options: debugModeOptions,
          value: {
            get() {
              return ctx.debugMode
            },
            set(_, value) {
              ctx.debugMode = value
              getExecuteEnvByMode(value, ctx, envList)
            },
          },
        },
        {
          title: '服务接口直连',
          type: 'Switch',
          description: '直连模式下服务接口访问将直接请求，不再走代理',
          value: {
            get() {
              return ctx.directConnection
            },
            set(_, value) {
              ctx.directConnection = value
            },
          },
        },
        {
          title: '调试环境',
          type: 'select',
          description:
            '所选环境对应的域名将拼接到接口地址前，发布时的环境不受此控制，你可以在应用配置处修改可选环境（需管理员权限）',
          ifVisible({data}) {
            return ctx.debugMode === EnumMode.ENV
          },
          options: {
            options: envList.map((item) => ({
              value: item.name,
              label: item.title,
            })),
            placeholder: '请选择调试环境',
          },
          value: {
            get() {
              return ctx.executeEnv || ''
            },
            set(context, v) {
              ctx.executeEnv = v
            },
          },
        },
        {
          title: '自定义域名',
          description:
            '自定义各个接口的域名，在接口中以{MYBRICKS_HOST.变量}的形式进行引用，发布后的页面需要主动在window.MYBRICKS_HOST对象上设置域名信息',
          type: 'map',
          ifVisible(info) {
            return ctx.debugMode === EnumMode.CUSTOM
          },
          options: {
            allowEmptyString: false,
          },
          value: {
            get(info) {
              if (!ctx.MYBRICKS_HOST) {
                ctx.MYBRICKS_HOST = {}
              } else if (!('default' in ctx.MYBRICKS_HOST)) {
                ctx.MYBRICKS_HOST.default = 'https://your-domain-name.com'
              }
              return ctx.MYBRICKS_HOST
            },
            set(info, value) {
              Object.keys(value).forEach((key) => {
                // 空格会影响连接器 是否代理判断
                value[key] = value[key]?.trim()
              })
              
              if (typeof value?.default === 'undefined') {
                message.error('必须包含变量名为default的域名')
              } else if (!value?.default) {
                message.error('default域名不能为空')
              } else if (Object.values(value).some((item) => !item)) {
                message.error('域名不能为空')
              } else {
                ctx.MYBRICKS_HOST = value
              }
            },
          },
        },
        {
          title: '环境信息设置',
          description: '可以在应用配置处修改使用的环境',
          ifVisible({data}) {
            return ctx.debugMode === EnumMode.ENV
          },
          type: 'array',
          options: {
            getTitle: (item) => {
              return item.title
            },
            items: [
              {
                title: '环境标识(禁止修改)',
                type: 'text',
                value: 'name',
                options: {
                  readonly: true,
                },
              },
              {
                title: '域名',
                type: 'text',
                value: 'value',
              },
            ],
            addable: false,
            deletable: false,
            draggable: false,
          },
          value: {
            get({data, focusArea}) {
              return ctx.envList
            },
            set({data, focusArea, output, input, ...res}, value) {
              ctx.envList = value
            },
          },
        },
        null,
        {
          title: '权限校验',
          type: 'Switch',
          description: '调试模式下，是否开启权限校验',
          value: {
            get() {
              return ctx.debugHasPermissionFn
            },
            set(context, v) {
              ctx.debugHasPermissionFn = v
            },
          },
        },
        null,
        {
          title: '路由参数',
          type: 'code',
          description: '调试模式下，路由的参数配置',
          options: {
            title: '编辑路由参数',
            language: 'json',
            width: 500,
            minimap: {
              enabled: false,
            },
            displayType: 'button',
          },
          value: {
            get() {
              return ctx.debugQuery
                ? JSON.stringify(ctx.debugQuery, null, 2)
                : '{}'
            },
            set(context: any, v: string) {
              const jsonString = decodeURIComponent(v)
              try {
                const jsonData = JSON.parse(jsonString || '{}')
                ctx.debugQuery = jsonData
              } catch {
                console.error('路由参数数据格式错误')
              }
            },
          },
        },
        {
          title: '主应用参数',
          type: 'code',
          description: '调试模式下，主应用参数配置',
          options: {
            title: '编辑主应用参数',
            language: 'json',
            width: 500,
            minimap: {
              enabled: false,
            },
            displayType: 'button',
          },
          value: {
            get() {
              return ctx.debugMainProps
                ? JSON.stringify(ctx.debugMainProps, null, 2)
                : '{}'
            },
            set(context: any, v: string) {
              const jsonString = decodeURIComponent(v)
              try {
                const jsonData = JSON.parse(jsonString || '{}')
                ctx.debugMainProps = jsonData
              } catch {
                console.error('主应用参数数据格式错误')
              }
            },
          },
        },
        createMockConfigEditor(
          ctx,
          'localStorageMock',
          'localStorage模拟',
          '调试模式下，localStorage模拟'
        ),
        createMockConfigEditor(
          ctx,
          'sessionStorageMock',
          'sessionStorage模拟',
          '调试模式下，sessionStorage模拟'
        ),
        {
          title: '调试组件库',
          type: 'mapCheckbox',
          ifVisible({data}) {
            return ctx.debug
          },
          options: {
            kType: 'auto',
            displayType: 'button',
            addTip: '添加',
            title: '调试组件库',
          },
          value: {
            get() {
              return comlibDebugUtils.get()
            },
            //每个字段的数据结构为{ key, value, checked }
            set(context, v) {
              comlibDebugUtils.set(v)
            },
          },
        },
        {
          title: '调试引擎',
          type: 'text',
          options: {
            placeholder: '请输入引擎地址',
          },
          ifVisible({data}) {
            return ctx.debug
          },
          value: {
            get() {
              const res = localStorage.getItem('__DEBUG_DESIGNER__') || ''
              return res
            },
            set(context, val) {
              localStorage.setItem('__DEBUG_DESIGNER__', val)
            },
          },
        },
      ]
    },
    editorOptions: mergeEditorOptions([
      !!ctx.setting?.system.config?.isPureIntranet &&
      PURE_INTERNET_EDITOR_OPTIONS,
      DESIGN_MATERIAL_EDITOR_OPTIONS(ctx),
    ]),
  }
}


function injectUpload(
  editConfig: Record<string, any>,
  uploadService: string,
  manateeUserInfo: { token: string; session: string },
  fileId: string
) {
  if (!!editConfig && !editConfig.upload) {
    editConfig.upload = async (files: Array<File>): Promise<Array<string>> => {
      /**
       * @description 图片上传支持返回Base64
       */
      if (editConfig.options?.useBase64) {
        try {
          const b64 = await blobToBase64(files[0])
          return [b64]
        } catch (e) {
          throw Error(`【图片转Base64出错】: ${e}`)
        }
      }
      // =========== 图片上传支持返回Base64 end ===============
      
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('folderPath', `/files/${fileId}`)
      
      const useConfigService = !!uploadService
      
      if (!useConfigService) {
        uploadService = '/paas/api/flow/saveFile'
      }
      
      try {
        const res = await axios<any, any>({
          url: uploadService,
          method: 'post',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            ...manateeUserInfo,
          },
        })
        const {status, data, message, code} = res.data
        
        if (status === 200 || code === 1) {
          let url = ''
          if (Array.isArray(data)) {
            url = data?.[0]?.url
          } else {
            url = data.url
          }
          if (!url) {
            throw Error(`没有返回图片地址`)
          }
          const staticUrl = /^http/.test(url)
            ? url
            : `${getDomainFromPath(uploadService)}${url}`
          if (location.protocol === "http:") {
            return [staticUrl].map((url) => url.replace('https', 'http'))
          }
          return [staticUrl]
        }
        
        throw Error(`【图片上传出错】: ${message}`)
      } catch (error) {
        message.error(error.message)
        return []
      }
    }
  }
}


function createMockConfigEditor(ctx, field, title, description) {
  return {
    title: title,
    type: 'mapCheckbox',
    options: {
      kType: 'auto',
      displayType: 'button',
      addTip: '添加',
      title: title,
    },
    description: description,
    value: {
      get() {
        return ctx.debugMockConfig[field]
      },
      //每个字段的数据结构为{ key, value, checked }
      set(context, v) {
        ctx.debugMockConfig[field] = v
      },
    },
  }
}