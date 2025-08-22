import renderUI from './renderUI'
import '@/reset.less'
import { scheduleTaskListen } from '../../utils/scheduleTask'
import { getLocaleLang } from '../setting/App/I18nConfig/utils';

const React = window.React;
const ReactDOM = window.ReactDOM;
const antd = window.antd;
const antd_5_21_4 = window.antd_5_21_4;

let reactRoot
let useReactRender = false
const scheduleTask = scheduleTaskListen()
const localeConfig = "--locale-config--";

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
  return getLocaleLang(localeConfig as any)
}

const render = (props) => {
  const { container } = props;
  useReactRender = props?.useReactRender
  // const root = !window.__POWERED_BY_QIANKUN__ ? document.body : (container || document).querySelector('#mybricks-page-root')
  const root = (container || document).querySelector('#mybricks-page-root')
  /** publish template style */
  root.style.width = '100%';
  root.style.height = '100%';
  root.style.overflow = 'auto';
  antd?.message?.config({
    getContainer() {
      return props?.canvasElement || root || document.body
    },
  })
  antd_5_21_4?.message?.config({
    getContainer() {
      return props?.canvasElement || root || document.body
    },
  })
  const antdLangName = getAntdLocalName(getCurrentLocale())
  const antdLocalLib = antd?.locales?.[antdLangName] || (Object.values(antd?.locales || {}))?.find(item => item.locale === getCurrentLocale()) || antd?.locale['zh_CN'].default

  const antdProps = {
    // 如鬼哦没有因为就传入undefined使用默认的英文，否则使用指定的语言包，并以中文兜底
    locale: [`en_US`, `en`].includes(antdLangName)
      ? undefined
      : antdLocalLib
  }
  let reactNode = renderUI({
    ...props,
    renderRoot: root,
    renderType: "react",
    locale: getCurrentLocale(),
    runtime: { onComplete: scheduleTask.addListen },
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

  // const reactNode = React.createElement(
  //   antd.ConfigProvider,
  //   {
  //     // 如鬼哦没有因为就传入undefined使用默认的英文，否则使用指定的语言包，并以中文兜底
  //     locale: [`en_US`, `en`].includes(antdLangName)
  //       ? undefined
  //       : antdLocalLib
  //   },
  //   renderUI({
  //     ...props,
  //     renderRoot: root,
  //     renderType: "react",
  //     locale: getCurrentLocale(),
  //     runtime: { onComplete: scheduleTask.addListen },
  //   })
  // )
  if (!useReactRender && ReactDOM.createRoot) {
    reactRoot = ReactDOM.createRoot(root);

    reactRoot.render(reactNode);
  } else {

    ReactDOM.render(
      reactNode,
      root
    )
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
  scheduleTask.cleanListen()
  if (!useReactRender) {

    reactRoot.unmount()
  } else {
    const { container } = props;

    ReactDOM.unmountComponentAtNode((container ?? document).querySelector('#mybricks-page-root'));
  }
}