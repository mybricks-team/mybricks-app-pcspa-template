import {EnumMode} from "@/pages/design/components/PublishModal";
import {USE_CUSTOM_HOST} from "@/pages/design/constants";

export function getDomainFromPath(path: string) {
  if (!path) return path
  if (path.startsWith('http') || path.startsWith('https')) {
    const [protocol, url] = path.split('//')
    const domain = url.split('/')[0]
    return `${protocol}//${domain}`
  } else {
    return location.origin
  }
}

export function getExecuteEnvByMode(debugMode, ctx, envList) {
  if (debugMode === EnumMode.DEFAULT) {
    ctx.executeEnv = ''
  } else if (
    debugMode === EnumMode.ENV &&
    (!ctx.executeEnv || !envList.find((item) => item.name === ctx.executeEnv))
  ) {
    ctx.executeEnv = envList[0].name
  } else if (debugMode === EnumMode.CUSTOM) {
    ctx.executeEnv = USE_CUSTOM_HOST
  }
}

