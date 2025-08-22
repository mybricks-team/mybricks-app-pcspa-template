export enum EnumPluginType {
  NORMAL = 'normal',
  CONNECTOR = 'connector'
}
export type PluginType = {
  name: string;
  title: string;
  url: string;
  type: EnumPluginType,
  disabled: boolean,
  runtimeUrl: string;
  description?: string;
  updateTime: string;
  user: Record<string, any>;
};
