const connectorLoader = (config: Record<string, any>) => new Promise((resolve, reject) => {
    const { plugins = [] } = config;
    const connectorPlugin = plugins.find(item => item?.type === 'connector')
    if (!connectorPlugin) {
        return resolve(false);
    }
    if (!connectorPlugin.runtimeUrl) {
        const log = `插件【${connectorPlugin}】没有设置runtime地址`
        console.error(log)
        return reject(log)
    }
    const script = document.createElement('script')
    script.src = connectorPlugin.runtimeUrl
    script.onload = () => {
        resolve(true)
    }
    script.onerror = () => {
        const log = `插件【${connectorPlugin}】加载失败`
        console.error(log)
        return reject(log)
    }
    document.body.appendChild(script)
})

export { connectorLoader }