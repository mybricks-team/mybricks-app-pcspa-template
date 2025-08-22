import {
  MySelf_COM_LIB,
  PC_NORMAL_COM_LIB,
  CHARS_COM_LIB,
  BASIC_COM_LIB,
  MY_SELF_ID,
} from "../constants";
import { compareVersions } from "compare-versions";
import API from "@mybricks/sdk-for-app/api";
const legacyLibs =
  APP_TYPE === "react" ? [PC_NORMAL_COM_LIB, CHARS_COM_LIB, BASIC_COM_LIB] : [];

export const compatContent = (content) => {
  content = JSON.parse(content);

  return content[APP_TYPE] ?? content;
};

const getLibsFromConfig = (appData: Record<string, any>) => {
  let libs = [];
  if (appData?.defaultComlibs?.length) {
    appData?.defaultComlibs.forEach((lib) => {
      let { namespace, content, version } = lib;
      const legacyLib = legacyLibs.find((lib) => lib.namespace === namespace);
      content = compatContent(content);
      if (legacyLib) {
        libs.push({ id: legacyLib.id, namespace, version, ...content });
      } else {
        libs.push({ ...lib, ...content });
      }
    });
  } else {
    libs.push(...legacyLibs);
  }
  if (
    !appData.fileContent?.content?.comlibs ||
    appData.fileContent?.content?.comlibs?.some(
      (lib) => typeof lib === "string"
    )
  ) {
    //initial or cdn legacy
    const myselfLib =
      appData.fileContent?.content?.comlibs?.find(
        (lib) => lib.id === "_myself_"
      ) ?? MySelf_COM_LIB;
    libs.unshift(myselfLib);
    return libs;
  } else {
    libs = appData.fileContent?.content?.comlibs.map((lib) => {
      if (lib.id === "_myself_") return lib;
      try {
        const legacyLib = legacyLibs.find(
          ({ namespace }) => lib.namespace === namespace
        );
        if (legacyLib && compareVersions(legacyLib.version, lib.version) >= 0) {
          lib.legacy = true;
        }
      } catch (error) {
        console.error(error);
      }
      return lib;
    });
    let hasMySelfLib = libs.some(item => item.id === MY_SELF_ID);
    if(!hasMySelfLib) {
      libs.unshift(MySelf_COM_LIB);
    }
    return libs;
  }
};

export const getLatestComLib = async (comlibs) => {
  const latestComlibs = await API.Material.getLatestComponentLibrariesByPOST(
    comlibs.filter((lib) => lib.id !== "_myself_").map((lib) => lib.namespace)
  ).then((libs: Array<any>) =>
    (libs ?? []).map((lib) => ({
      ...lib,
      ...compatContent(lib.content),
    }))
  );

  return { comlibs, latestComlibs };
};

const checkDeps = async (libs) => {
  for (let i = 0; i < libs.length; i++) {
    const lib = libs[i];
    if (typeof lib === 'string' || "externals" in lib || lib.id === "_myself_") continue;
    try {
      const material = await getLibExternals({
        namespace: lib.namespace,
        version: lib.version,
      });
      Object.assign(lib, material);
    } catch (error) {
      console.error("获取物料依赖失败\n", error);
    }
  }
  return libs;
};

export const getLibExternalsFill = (lib) => {
  if (lib.namespace === "mybricks.normal-pc" && !lib.externals?.length) {
    // 兼容，添加默认的externals
    lib.externals = [
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
  }
}

const getLibExternals = ({ namespace, version }) => {
  return API.Material.getMaterialContent({
    namespace,
    version,
    codeType: "pure",
  }).then((lib) => {
    const content = compatContent(lib.content);
    const res = {
      ...lib,
      ...content,
    }
    getLibExternalsFill(res);
    return res;
  });
};

export const createScript = (url: string) => {
  if (document.querySelector(`script[src="${url}"]`)) return Promise.resolve();
  const script = document.createElement("script");
  script.src = url;
  script.defer = true;
  return new Promise((resolve, reject) => {
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const createLink = (url: string) => {
  let querySelector = document.querySelector.bind(document), appendChild = document.head.appendChild.bind(document.head);

  // 考虑在搭建态的情况，css要塞到shadowDom里
  const desnGeoViewShadowDom = document.querySelector('#_mybricks-geo-webview_')?.shadowRoot

  if (desnGeoViewShadowDom) {
    querySelector = desnGeoViewShadowDom.querySelector.bind(desnGeoViewShadowDom);
    //@ts-ignore
    appendChild = (element) => {
      const firstChild = desnGeoViewShadowDom.firstChild;
      // 将 <style> 标签插入到第一个子元素之前
      if (firstChild) {
        desnGeoViewShadowDom.insertBefore(element, firstChild);
      } else {
        // 如果没有子元素，直接添加到 Shadow Root
        desnGeoViewShadowDom.appendChild(element);
      }
    }
  }

  if (querySelector(`link[href="${url}"]`)) return Promise.resolve();
  const link = document.createElement("link");
  link.href = url;
  link.rel = "stylesheet";
  return new Promise((resolve, reject) => {
    link.onload = resolve;
    link.onerror = reject;
    appendChild(link);
  });
};

const insertDeps = async (libs) => {
  if (!libs.length) return libs;
  for (const lib of libs) {
    if (typeof lib === 'object' && "externals" in lib) {
      getLibExternalsFill(lib);
      await insertExternal(lib)
    }
  }
  // await Promise.all(
  //   libs.map((lib) => {
  //     return (typeof lib === 'object' && "externals" in lib) ? insertExternal(lib) : Promise.resolve();
  //   })
  // );
  return libs;
};

/** 获取 CSS 文件依赖，由于 comlibLoader 执行时，设计器还没 init，所以只能放到styleAry去，这里可以获取styleAry */
const getCssDeps = (libs) => {
  if (!libs.length) return libs;
  function getCssLinkElements(lib) {
    const p = [];
    lib.externals?.forEach((it) => {
      const { library, urls } = it;
      if (Array.isArray(urls) && urls.length) {
        urls.forEach((url) => {
          if (url.endsWith(".css")) {
            const link = document.createElement("link");
            link.href = url;
            link.rel = "stylesheet";
            p.push(link);
          }
        });
      }
    });
    return p;
  }
  return libs.reduce((acc, lib) => {
    if (typeof lib === 'object' && "externals" in lib) {
      const eles = getCssLinkElements(lib);
      return acc.concat(eles.filter(c => !!c));
    }
    return acc
  }, [])
};

const loadScripts = (scripts: string[]) => {
  // console.log("scripts: ", scripts);
  return new Promise((resolve, reject) => {
    if (scripts.length === 0) {
      // 如果没有剩余的脚本，则说明所有脚本都已经加载完成
      resolve(true);
    } else {
      // console.log(`开始加载 ${scripts[0]}`)
      createScript(scripts[0]).then(() => {
        // console.log(`加载完成 ${scripts[0]} 开始下一个`)
        loadScripts(scripts.slice(1)).then(() => {
          resolve(true)
        }).catch(reject);
      }).catch(reject)
    }
  })
}

const insertExternal = async (lib) => {
  const css = [];
  const js = [];
  if (lib?.externals) {
    for (const external of lib.externals) {
      const { library, urls } = external;
      if (library && library in window) { 
        // 有配置library且window上已有，不加载覆盖
        // console.log(`[组件库依赖加载]: ${library} 已存在，不进行加载覆盖`, external);
      } else {
        if (Array.isArray(urls)) {
          for (const url of urls) {
            if (url.endsWith(".js")) {
              // js按顺序加载
              js.push(url)
            } else if (url.endsWith(".css")) {
              // css不用按顺序
              css.push(createLink(url));
            }
          }
        }
      }
    }
  }
  // for (const url of js) {
  //   await createScript(url);
  // }
  await loadScripts(js);
  await Promise.all(css);
  return lib;
};

// const insertExternal = async (lib) => {
//   const p = [];
//   lib.externals?.forEach((it) => {
//     const { library, urls } = it;
//     if (Array.isArray(urls) && urls.length) {
//       urls.forEach((url) => {
//         if (url.endsWith(".js")) {
//           if (!!library && library in window) return;
//           p.push(createScript(url));
//         } else if (url.endsWith(".css")) {
//           p.push(createLink(url));
//         }
//       });
//     }
//   });
//   await Promise.all(p);
//   return lib;
// };

const composeAsync =
  (...fns) =>
    async (arg) =>
      fns.reduceRight(async (pre, fn) => fn(await pre), Promise.resolve(arg));

const getInitComLibs = composeAsync(
  getLatestComLib,
  insertDeps,
  checkDeps,
  getLibsFromConfig
);

const upgradeExternal = composeAsync(insertExternal, getLibExternals);

export { getInitComLibs, upgradeExternal, insertDeps, getCssDeps };
