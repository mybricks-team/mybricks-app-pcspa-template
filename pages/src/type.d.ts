declare module '*.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare interface Window {
  _mybricks_render_web: RenderWeb;
  _mybricks_render_web_vue2: RenderWeb;
  _mybricks_render_web_vue3: RenderWeb;
  __POWERED_BY_QIANKUN__: boolean;
  React: React;
  Vue: Vue;
  ReactDOM: ReactDOM;
  antd: any;
  antd_5_21_4: any;
  pluginConnectorDomain: Function
  showDirectoryPicker: Function
  fileId: string
  designerRef: any
  mybricks: any
  importDump: Function
}

declare type RenderWeb = {
  render: (json: Record<string, any> | string, opts: Record<string, any>) => any
}

declare const APP_TYPE: 'react' | 'vue2' | 'vue3';

declare const APP_NAME: string;

declare const APP_VERSION: string;

declare const APP_ENV: 'development' | 'production';