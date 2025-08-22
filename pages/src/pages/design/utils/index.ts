import API from "@mybricks/sdk-for-app/api";

interface IAppSetting {
  baseConfig?: {
    isEncode?: string;
  };
}

const APP_NAME = "mybricks-app-pc-cdm";

/**
 * @description 获取当前应用setting
 * @returns object
 */
export const getAppSetting = async () => {
  const settings = await API.Setting.getSetting([APP_NAME]);
  return settings[APP_NAME]?.config as IAppSetting;
};

/** 检查是否符合大驼峰命名规范 */
export function isValidPascalCase(name: string) {
  // 大驼峰命名规范：每个单词的首字母大写，无空格或特殊字符
  var pattern = /^[A-Z][a-zA-Z0-9]*$/;
  return pattern.test(name);
}