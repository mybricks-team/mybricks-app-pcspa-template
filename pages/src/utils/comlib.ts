
import { PC_COMMON_MAP } from './../constants'
/** 组件库、组件相关utils */

if (!Array.prototype.findLastIndex) {
  Array.prototype.findLastIndex = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError('Array.prototype.findLastIndex called on null or undefined');
    }

    const O = Object(this);
    const len = O.length >>> 0;
    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }

    let k = len - 1;
    while (k >= 0) {
      const kValue = O[k];
      if (callback.call(thisArg, kValue, k, O)) {
        return k;
      }
      k--;
    }

    return -1;
  }
}


function createScript(src, index) {
  var script = document.createElement('script')
  script.setAttribute('src', src)
  script.setAttribute('index', index)
  return script
}

let styleCount = 0

export function myRequire(arr, onError): Promise<{ styles: any }> {
  return new Promise((resolve, reject) => {
    if (!(arr instanceof Array)) {
      console.error('arr is not a Array')
      return false
    }

    var REQ_TOTAL = 0,
      EXP_ARR = [],
      REQLEN = arr.length

    const styles: any = []

    const _headAppendChild = document.head.appendChild

    arr.forEach(function (req_item, index, arr) {
      const script = createScript(req_item, index)
      document.body.appendChild(script)

        ; (function (script) {
          document.head.appendChild = (ele) => {
            if (ele && ele.tagName?.toLowerCase() === 'style') {
              ele.id = 'mybricks_comlib_' + styleCount
              styles.push(ele)
              styleCount++
            }
            _headAppendChild.call(document.head, ele)
            return ele
          }

          script.onerror = (err) => {
            REQ_TOTAL++
            onError(err)
            if (REQ_TOTAL == REQLEN) {
              document.head.appendChild = _headAppendChild
            }
          }
          script.onload = function () {
            REQ_TOTAL++
            const script_index = script.getAttribute('index')
            EXP_ARR[script_index] = this

            if (REQ_TOTAL == REQLEN) {
              resolve({ styles })
              removeStylesBySubstring('mybricks_comlib_')
              // callback && callback.apply(this, EXP_ARR);
              document.head.appendChild = _headAppendChild
            }
          }
        })(script)
    })
  })
}

function removeStylesBySubstring(substring) {
  // 获取所有的 style 标签
  const styleTags = document.querySelectorAll('style');
  // 遍历每个 style 标签
  styleTags.forEach(styleTag => {
    if (styleTag.id.includes(substring)) {
      // 如果匹配，则移除该 style 标签
      styleTag.remove();
    }
  });
}

const MY_SELF_ID = '_myself_';

export const isCloundModuleComboUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return false
  }
  return url.indexOf('/material/components/combo') !== -1
}

export const getRtComlibsFromEdit = (comlibs) => {
  return comlibs.map(comlib => {
    if (PC_COMMON_MAP[comlib]) {
      console.warn(PC_COMMON_MAP[comlib]);
      return PC_COMMON_MAP[comlib]
    }

    if (comlib?.id === MY_SELF_ID) {
      const comboComlib = new ComboComlibURL()
      comboComlib.setComponents(JSON.parse(JSON.stringify(comlib?.comAray)))
      return comboComlib.toRtUrl()
    }

    if (comlib?.rtJs) {
      return comlib.rtJs
    }

    return comlib
  })
}

export const getRtComlibsFromConfigEdit = (comlibs = []) => {
  return comlibs.map(lib => {
    if (lib?.id === MY_SELF_ID) {
      const comboComlib = new ComboComlibURL()
      comboComlib.setComponents(JSON.parse(JSON.stringify(lib?.comAray)))
      return comboComlib.toRtUrl()
    }
    if (lib?.rtJs) {
      return lib.rtJs
    }
    return lib
  })
}

export const getValidUrl = (url = '/api/material/components/combo') => {
  const tempPrefix = location.origin || 'https://xxx.com'
  if (url.indexOf('://') !== -1) {
    return new URL(url)
  }
  return new URL(tempPrefix + url)
}

export class ComboComlibURL {
  private _URL_ = new URL('https://xxx.com')

  constructor(url?) {
    const _url = getValidUrl(url)
    this._URL_ = _url
  }

  getComponents = () => {
    let comAry = this._URL_.searchParams.get('components')
    comAry = comAry.split(',')
    let components = []
    if (Array.isArray(comAry)) {
      comAry.forEach(com => {
        components.push({
          namespace: com.split('@')[0],
          version: com.split('@')[1]
        })
      })
    }
    return components
  }

  setComponents = (components) => {
    if (!Array.isArray(components)) {
      return
    }
    const queryStr = components.reduce((acc, cur) => {
      return `${acc}${!!acc ? ',' : ''}${cur.namespace}@${cur.version}`
    }, '')
    this._URL_.searchParams.set('components', queryStr)
    // TODO: 缓存
    this._URL_.searchParams.set('time', String(new Date().valueOf()))
  }

  deleteComponents = (namespace: string) => {
    const coms = this.getComponents()
    const deleteIdx = coms.findIndex(com => com.namespace === namespace)
    if (deleteIdx) {
      coms.splice(deleteIdx, 1)
    }
    this.setComponents(coms)
  }

  toRtUrl = () => {
    const rtURL = new URL(this.toString());
    rtURL.searchParams.set('comboType', 'rt');
    return rtURL.toString();
  }

  toEditUrl = () => {
    return this.toString()
  }

  toString = () => {
    return this._URL_.toString()
  }
}


export const getMySelfLibComsFromUrl = (url) => {

  if (url?.split('components=')?.[1]?.length === 0) {
    window['__comlibs_edit_'].unshift({
      comAray: [],
      id: '_myself_',
      title: '我的组件',
      defined: true,
    });
    // 跳过空请求
    return Promise.resolve([])
  }

  return new Promise((resolve, reject) => {
    myRequire([url], () => {
      reject(new Error('加载我的组件失败'))
    }).then(({ styles }) => {
      /** 添加之后会有多组件存储于__comlibs_edit_需要合并下 */
      const firstComIdx = window['__comlibs_edit_'].findIndex(
        (lib) => lib.id === MY_SELF_ID,
      );
      const lastComIndex = window['__comlibs_edit_'].findLastIndex(
        (lib) => lib.id === MY_SELF_ID,
      );
      if (firstComIdx !== lastComIndex) {
        window['__comlibs_edit_'][firstComIdx].comAray = [
          ...window['__comlibs_edit_'][lastComIndex].comAray,
        ];
        window['__comlibs_edit_'].splice(lastComIndex, 1);
      }
      setTimeout(() => resolveSelfLibStyle(styles), 1500);
      // console.log('加载', window['__comlibs_edit_'])
      resolve(window['__comlibs_edit_'][firstComIdx]);
    })
  })
}

interface NameAndVersion {
  namespace: string,
  version?: string
}

type ComboLibType = 'rt' | 'edit'

export const getComlibsByNamespaceAndVersion = (nameAndVersions: NameAndVersion[], comboLibType: ComboLibType = 'edit') => {
  const comboComlibURL = new ComboComlibURL()
  comboComlibURL.setComponents(nameAndVersions)
  return getMySelfLibComsFromUrl(comboLibType === 'edit' ? comboComlibURL.toEditUrl() : comboComlibURL.toRtUrl());
}

const getMyComlib = () => {
  const comlibs = window['__comlibs_edit_']
  const firstComIdx = comlibs.findIndex(
    (lib) => lib.id === MY_SELF_ID,
  );
  const lastComIndex = comlibs.findLastIndex(
    (lib) => lib.id === MY_SELF_ID,
  );
  const myComlib = comlibs[firstComIdx];
  const newMyComlib = comlibs[lastComIndex];
  comlibs.splice(lastComIndex, 1);
  return {
    myComlib,
    newMyComlib
  }
}

const mergeMyComlib = (myComlib, newMyComlib) => {
  const { comAray } = myComlib;
  const { comAray: newComAray } = newMyComlib;

  const deps = comAray[comAray.length -1]?.comAray;

  if (deps) {
    const newDeps = newComAray[newComAray.length - 1].comAray;
    newDeps.forEach((dep) =>{ 
      const { namespace, version } = dep;
      if (!deps.find((dep) => dep.namespace === namespace && dep.version === version)) {
        deps.push(dep)
      }
    })
  } else {
    comAray.push(newComAray[newComAray.length - 1])
  }

  const coms = comAray.slice(0, comAray.length - 1);
  const newComs = newComAray.slice(0, newComAray.length - 1);

  newComs.forEach((com) => {
    const { namespace } = com;
    const index = coms.findIndex((com) => com.namespace === namespace)
    if (index === -1) {
      // 添加
      comAray.splice(comAray.length - 1, 0, com)
    } else {
      // 更新
      comAray[index] = com;
    }
  })
}

export const updateMyComponents = (nameAndVersions: NameAndVersion[], comboLibType: ComboLibType = 'edit') => {
  const comboComlibURL = new ComboComlibURL()
  comboComlibURL.setComponents(nameAndVersions)

  return new Promise((resolve, reject) => {
    myRequire([comboLibType === 'edit' ? comboComlibURL.toEditUrl() : comboComlibURL.toRtUrl()], (err) => {
      reject(err)
    }).then(({ styles }) => {
      const { myComlib, newMyComlib } = getMyComlib();
      mergeMyComlib(myComlib, newMyComlib);
      setTimeout(() => resolveSelfLibStyle(styles), 1500);
      resolve(myComlib);
    })
  })
}

export function resolveSelfLibStyle(styles) {
  const childNodes = document.querySelector("[class^='canvasTrans']")?.childNodes;

  if (!childNodes) return;

  let shadowRoot;

  for (let i = 0; i < childNodes.length; i++) {
    // @ts-ignore
    if (childNodes[i]?.shadowRoot) {
      // @ts-ignore
      shadowRoot = childNodes[i]?.shadowRoot;
      break;
    }
  }

  // const shadowRoot = document.querySelector("[class^='canvasTrans']")?.firstChild?.shadowRoot;

  if (shadowRoot) {
    styles.forEach((node) => {
      node.setAttribute('lib-id', '_myself_');
      shadowRoot.appendChild(node);
    });
  }
}