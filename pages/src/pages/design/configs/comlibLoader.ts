import isObject from 'lodash/isObject'
import { Modal, message } from 'antd'
// import { MaterialService } from './../../../services'
// import { MaterialComlib } from './../../../types'
import { getComlibsByNamespaceAndVersion, updateMyComponents } from './../../../utils/comlib'
import { initMaterials } from './initMaterials'
import { addComlib } from './addComlib'
import { upgradeLatestComlib, upgradeComlibByVersion } from './upgradeComlib'
import { deleteComlib } from './deleteComlib'

const init = () => {
  if (!window['__comlibs_edit_']) {
    window['__comlibs_edit_'] = []
  }

  if (!window['__comlibs_rt_']) {
    window['__comlibs_rt_'] = window['__comlibs_edit_']
  }

  if (!window['CloudComponentDependentComponents']) {
    window['CloudComponentDependentComponents'] = {}
  }
}

const MY_SELF_ID = '_myself_';


export default (ctx) => (libDesc) => {
  init();

  const mySelfLib = ctx?.comlibs.find(t => t?.id === MY_SELF_ID)

  const addSelfLibComponents = ((components, comlibsComponents) => {
    components.forEach(component => {
      const mySelfLib = ctx?.comlibs.find(t => t?.id === MY_SELF_ID)
      const index = mySelfLib.comAray.findIndex((item) => item.namespace === component.namespace);
      
      if (comlibsComponents.find(item => item.namespace === component.namespace)) {
        return
      }
      /** 当前组件已经存在 */
      if (index !== -1) {
        mySelfLib.comAray[index] = {
          materialId: component.materialId,
          namespace: component.namespace,
          version: component.version,
        };
      } else {
        mySelfLib.comAray.push({
          materialId: component.materialId,
          namespace: component.namespace,
          version: component.version,
        });
      }
    })

    return mySelfLib.comAray
  })

  // 返回当前添加的物料信息
  const updateCtxMyComlibComponents = ((components, comlibsComponents) => {
    const updateComs = [];
    const mySelfLib = ctx?.comlibs.find(t => t?.id === MY_SELF_ID)

    components.forEach(component => {
      if (comlibsComponents.find(item => item.namespace === component.namespace)) {
        return
      }

      const index = mySelfLib.comAray.findIndex((item) => item.namespace === component.namespace);

      if (index === -1) {
        // 没有，添加
        mySelfLib.comAray.push({
          materialId: component.materialId,
          namespace: component.namespace,
          version: component.version,
        });
      } else {
        // 更新
        mySelfLib.comAray[index] = {
          materialId: component.materialId,
          namespace: component.namespace,
          version: component.version,
        };
      }

      updateComs.push({
        materialId: component.materialId,
        namespace: component.namespace,
        version: component.version,
      })
    })

    return updateComs
  })

  const removeSelfLibComponents = (comNamespaces) => {
    let mySelfLib = ctx?.comlibs.find(t => t?.id === MY_SELF_ID)
    comNamespaces.forEach(comNamespace => {
      const removeIdx = mySelfLib?.comAray?.findIndex?.((item) => {
        return item.namespace === comNamespace;
      });
      mySelfLib.comAray.splice(removeIdx, 1);
    })
  }

  // const updateSelfLibComponent = (component) => {
  //   const mySelfLib = ctx?.comlibs.find(t => t?.id === MY_SELF_ID)
  //   if (!component?.namespace || !component?.version) {
  //     return mySelfLib.comAray
  //   }

  //   mySelfLib.comAray.forEach(com => {
  //     if (com.namespace === component?.namespace) {
  //       com.version = component.version
  //     }
  //   })

  //   return mySelfLib.comAray
  // }
  // 获取组件库下面的所有组件
  const getComLibComponents = () => {
    let normalLibs  = ctx.comlibs.filter(lib => lib.id !==  MY_SELF_ID)
    let arr = []
     normalLibs.forEach(item => {
      if(Array.isArray(item.deps) && item.deps.length) {
        arr.push(...item.deps)
      }
      if(!item.deps) {
        let target = window['__comlibs_edit_'].find(lib => lib.namespace=== item.namespace)
        if(Array.isArray(target.comAray)) {
          arr.push(...target.comAray)
        }
      }
     })
    return arr
  }
  const getSelfComponents = () => {
    let mySelfArr = mySelfLib?.comAray.filter(com => isObject(com))
    let normalLibs = getComLibComponents()
    return [ ...mySelfArr, ...normalLibs]
  }

  // const LATEST_COMLIBS = cloneDeep(ctx.latestComlibs || []);

  return new Promise(async (resolve, reject) => {
    ; (async () => {
      /** 带加载命令，如：新增组件、更新组件、更新组件库 */
      if (libDesc?.cmd) {
        const { cmd, libId, comNamespace } = libDesc
        const comlib = window['__comlibs_edit_'].find((lib) => lib.id === libId)

        let index = -1
        let com
        let comlibsComponents = getComLibComponents();
        switch (cmd) {
          case 'upgradeCom':
            const mySelfLib = ctx?.comlibs.find(t => t?.id === MY_SELF_ID) ?? [];
            const curCom = mySelfLib.comAray?.find(com => com.namespace === comNamespace);

            ctx.sdk.openUrl({
              url: 'MYBRICKS://mybricks-material/materialSelectorPage',
              params: {
                // 这里如果带上了组件库下面的组件，需要在下面的success 里面，去除掉comlibs下面的组件
                defaultSelected: getSelfComponents(),
                curUpgradeMaterial: curCom,
                userId: ctx.user?.id,
                combo: true,
                tags: [APP_TYPE]
              },
              onSuccess: (params) => {
                const { materials, updatedMaterials } = params
                const key = Math.random();
                message.loading({ content: '正在更新组件，请稍后...', key, duration: 0 });

                const newComponents = updateCtxMyComlibComponents(updatedMaterials, comlibsComponents)
                updateMyComponents(newComponents).then((myComlib: any) => {
                  message.success({ content: "更新成功", key, duration: 2})
                  resolve({
                    id: '_myself_',
                    title: '我的组件',
                    defined: true,
                    comAray: myComlib?.comAray || []
                  })
                }).catch((e) => {
                  console.error("更新组件: ", e);
                  message.error({ content: "更新失败", key, duration: 2})
                })

                // const newComponents = addSelfLibComponents(materials, comlibsComponents)
                // getComlibsByNamespaceAndVersion(newComponents).then((newComlib) => {
                //   const curMaterial = updatedMaterials[0]
                //   const curComInfo = newComlib?.comAray.find(item => item.namespace === curMaterial?.namespace)

                //   resolve({
                //     id: '_myself_',
                //     title: '我的组件',
                //     defined: true,
                //     comAray: newComlib?.comAray || []
                //   })
                //   message.success(`${curComInfo ? `【${curComInfo.title}】` : ''} 组件 版本：${curMaterial.version} 更新成功`)
                // }).catch(e => {
                //   message.error('更新失败')
                //   console.warn(`[MyBricks PC Warn]: ${comNamespace} 更新失败`)
                // })

              }
            })
            break;
          case 'deleteCom': /** 需要resolve一个comlib对象 */
            index = comlib.comAray.findIndex((com) => com.namespace === comNamespace);

            if (index !== -1) {
              com = comlib.comAray[index];
              Modal.confirm({
                className: 'fangzhou-theme',
                okText: '确定',
                cancelText: '取消',
                centered: true,
                title: `请确认是否删除组件“${com.title}”，当前操作不可逆！`,
                getContainer: () => document.body,
                onOk() {
                  removeSelfLibComponents([comNamespace])
                  resolve(ctx?.comlibs.find(t => t?.id === MY_SELF_ID));
                  // console.log('123返回', ctx?.comlibs.find(t => t?.id === MY_SELF_ID))
                  // const mySelf = ctx?.comlibs.find(t => t?.id === MY_SELF_ID)
                  // mySelf.comAray = [...mySelf.comAray]
                  // resolve({ ...mySelf });
                },
                wrapClassName: 'z-index-10000',
                maskStyle: { zIndex: 10000 },
              });
            }
            break;
          // 引擎 3.3.0 废弃 addCom 命令，改为 addUICom 和 addJSCom
          case 'addCom':
            ctx.sdk.openUrl({
              url: 'MYBRICKS://mybricks-material/materialSelectorPage',
              params: {
                defaultSelected: getSelfComponents(),
                userId: ctx.user?.id,
                combo: true,
                tags: [APP_TYPE]
              },
              onSuccess: ({ materials, updatedMaterials }) => {
                const newComponents = addSelfLibComponents(materials, comlibsComponents)
                getComlibsByNamespaceAndVersion(newComponents).then((newComlib) => {
                  resolve({
                    id: '_myself_',
                    title: '我的组件',
                    defined: true,
                    comAray: newComlib?.comAray || []
                  })
                })
              }
            })

            break;
          case 'addUICom':
            ctx.sdk.openUrl({
              url: 'MYBRICKS://mybricks-material/materialSelectorPage',
              params: {
                defaultSelected: getSelfComponents(),
                userId: ctx.user?.id,
                combo: true,
                tags: [APP_TYPE]
              },
              onSuccess: ({ materials, updatedMaterials }) => {
                const key = Math.random();
                message.loading({ content: '正在加载组件，请稍后...', key, duration: 0 });

                const newComponents = updateCtxMyComlibComponents(updatedMaterials, comlibsComponents)
                updateMyComponents(newComponents).then((myComlib: any) => {
                  message.success({ content: "加载成功", key, duration: 2})
                  resolve({
                    id: '_myself_',
                    title: '我的组件',
                    defined: true,
                    comAray: myComlib?.comAray || []
                  })
                }).catch((e) => {
                  console.error("添加UI组件: ", e);
                  message.error({ content: "加载失败", key, duration: 2})
                })

                // const newComponents = addSelfLibComponents(materials, comlibsComponents)
                // console.log("newComponents: ", newComponents)
                // console.time("加载时间")
                // getComlibsByNamespaceAndVersion(newComponents).then((newComlib) => {
                //   console.log("newComlib: ", newComlib)
                //   console.timeEnd("加载时间")
                //   resolve({
                //     id: '_myself_',
                //     title: '我的组件',
                //     defined: true,
                //     comAray: newComlib?.comAray || []
                //   })
                // })
              }
            })

            break;
          case 'addJSCom':
            ctx.sdk.openUrl({
              url: 'MYBRICKS://mybricks-material/materialSelectorPage',
              params: {
                defaultSelected: getSelfComponents(),
                userId: ctx.user?.id,
                combo: true,
                tags: ['js']
              },
              onSuccess: ({ materials, updatedMaterials }) => {
                const key = Math.random();
                message.loading({ content: '正在加载组件，请稍后...', key, duration: 0 });

                const newComponents = updateCtxMyComlibComponents(updatedMaterials, comlibsComponents)
                updateMyComponents(newComponents).then((myComlib: any) => {
                  message.success({ content: "加载成功", key, duration: 2})
                  resolve({
                    id: '_myself_',
                    title: '我的组件',
                    defined: true,
                    comAray: myComlib?.comAray || []
                  })
                }).catch((e) => {
                  console.error("添加JS组件: ", e);
                  message.error({ content: "加载失败", key, duration: 2})
                })
                // const newComponents = addSelfLibComponents(materials, comlibsComponents)
                // getComlibsByNamespaceAndVersion(newComponents).then((newComlib) => {
                //   resolve({
                //     id: '_myself_',
                //     title: '我的组件',
                //     defined: true,
                //     comAray: newComlib?.comAray || []
                //   })
                // })
              }
            })

            break;
          case 'deleteComLib':
            deleteComlib(ctx, { ...libDesc, namespace: libDesc?.libNamespace })
            resolve(true);
            break
          case 'upgradeComLib':
            const upgradedComlib = await upgradeLatestComlib(ctx, { ...libDesc, namespace: libDesc?.libNamespace, id: libId });
            return resolve(upgradedComlib)
          default:
            break
        }
        return
      }

      /** 不带命令，且描述为空，即页面初始化，加载组件及组件库 */
      if (!libDesc) { // 此处加载报错，会导致引擎一直处于加载中
        try {
          // 延迟组件库加载，避免劫持 appendChild 导致非组件库样式被误删
          setTimeout(async () => {
            const comlibs = await initMaterials(ctx);
            return resolve(comlibs)
          }, 600)
        } catch (e) {
          console.error(e)
        }
      }
      /** 不带命令，增加、更新组件库，新增时comLibAdder resolve的组件库会带到libDesc来 */
      if (libDesc?.editJs) {
        const material = ctx.comlibs.find(lib => lib.namespace === libDesc?.libNamespace)
        if (material) {
          //upgrade
          const comlib = {
            ...material,
            ...libDesc
          }
          const addedComlib = await upgradeComlibByVersion(ctx, { ...comlib, namespace: comlib?.libNamespace, id: libDesc?.libId })
          return resolve(addedComlib)
        } else {
          //新增
          const addedComlib = await addComlib(ctx, { ...libDesc, namespace: libDesc?.libNamespace, id: libDesc?.libId })
          return resolve(addedComlib)
        }
      }

    })().catch(() => { })
  })
}
