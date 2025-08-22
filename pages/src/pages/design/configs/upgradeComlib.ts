import { message } from 'antd';
import { myRequire } from '../../../utils/comlib'
import { upgradeExternal } from '../../../utils/getComlibs'
const COMLIBS_EDIT = '__comlibs_edit_';

export const upgradeLatestComlib = async (ctx: Record<string, any>, comlib: Record<string, any>) => {
    const { namespace, id } = comlib;
    if(!namespace) return message.error('缺少物料namespace')
    const index = ctx.comlibs.findIndex((lib) => namespace===lib.namespace)
    const winIndex = window[COMLIBS_EDIT].findIndex(lib => lib.namespace===namespace)
    if(index===-1 || winIndex===-1) return message.error(`找不到namespace为【${namespace}】的物料，检查物料namespace`);
    const { latestComlib } = window[COMLIBS_EDIT][winIndex] ?? {}
    const { editJs, rtJs, coms, version } = latestComlib;
    try {
        const material = await upgradeExternal({ namespace, version })
        window[COMLIBS_EDIT].splice(winIndex, 1)
        const { styles } =  await myRequire([material.editJs], (error) => {
            Promise.reject(error)
        })
        ctx.comlibs[index] = Object.assign({...ctx.comlibs[index], version: latestComlib.version, editJs, rtJs, id, coms}, material)
        if(ctx.comlibs[index].hasOwnProperty('legacy')){
            Reflect.deleteProperty( ctx.comlibs[index], 'legacy')
        }
        const loadedComlib = window[COMLIBS_EDIT].find(lib => lib.namespace===namespace);
        loadedComlib.id = id;
        loadedComlib._styleAry = styles;
        return loadedComlib
    } catch (error) {
        throw error
    }
   
}

export const upgradeComlibByVersion = async (ctx: Record<string, any>, comlib: Record<string, any>) => {
    if(comlib.hasOwnProperty('legacy')){
        Reflect.deleteProperty(comlib, 'legacy')
    }
    const { id, namespace, version } = comlib;
    if(!namespace) return message.error('缺少物料namespace')
    const index = ctx.comlibs.findIndex((lib) => namespace===lib.namespace)
    const winIndex = window[COMLIBS_EDIT].findIndex(lib => lib.namespace===namespace)
    if(index===-1 || winIndex===-1) return message.error(`找不到namespace为【${namespace}】的物料，检查物料namespace`);
    try {
        const material = await upgradeExternal({ namespace, version })
        window[COMLIBS_EDIT].splice(winIndex, 1)
        const { styles } =  await myRequire([material.editJs], (error) => {
            Promise.reject(error)
        })
        ctx.comlibs.splice(index, 1, Object.assign(comlib, material));
        const loadedComlib = window[COMLIBS_EDIT].find(lib => lib.namespace===namespace);
        loadedComlib.id = id;
        loadedComlib._styleAry = styles;
        return loadedComlib
    } catch (error) {
        throw error
    }
}