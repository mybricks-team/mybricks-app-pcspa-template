export enum EnumLocale {
  DEFAULT = 'default',
  BROWER = 'browser',
  LOCALESTORAGE = 'localStorage'
}

type Tconfig = {
  localStorageKey: string,
  localeGetMethod: EnumLocale
}
/** 默认语言配置 */
const DEFAULT_LOCALE_LANG = "zh-CN"; 
export const getLocaleLang = (localeConfig: Tconfig = {} as any) => {
  const { localStorageKey = '', localeGetMethod = EnumLocale.DEFAULT } = localeConfig || {}

  if (localeGetMethod === EnumLocale.DEFAULT) {
    return DEFAULT_LOCALE_LANG
  } else if (localeGetMethod === EnumLocale.BROWER) {
    return window.navigator.language || DEFAULT_LOCALE_LANG
  } else if (localeGetMethod === EnumLocale.LOCALESTORAGE) {
    return localStorage.getItem(localStorageKey) || DEFAULT_LOCALE_LANG
  }
  return DEFAULT_LOCALE_LANG
}