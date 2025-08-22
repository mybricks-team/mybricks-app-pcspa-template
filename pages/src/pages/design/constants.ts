export const USE_CUSTOM_HOST = '__USE_CUSTOM_HOST__'

export const PROJECT_ENV = [{ title: '测试环境', name: 'staging' }, { title: '线上环境', name: 'prod' }]

export const GET_DEFAULT_PAGE_HEADER = (appData) => {
    return {
        title: appData.fileContent?.name,
        favicon: '',
        meta: [],
    }
}

export const DEFAULT_META = [
    {
        type: 'name',
        key: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
    },
    {
        type: 'name',
        key: 'referrer',
        content: 'no-referrer'
    },
    {
        type: 'http-equiv',
        key: 'X-UA-Compatible',
        content: 'IE=edge'
    },
    {
        type: 'http-equiv',
        key: 'Access-Control-Allow-Origin',
        content: '*'
    },
]

export const GET_PAGE_CONFIG_EDITOR = (ctx) => {
    return {
        title: '页面',
        items: [
            {
                title: '标题(title)',
                type: 'Text',
                description: 'HTML文档的标题',
                options: {
                    locale: true
                },
                value: {
                    get: (context) => {
                        return ctx.pageHeader.title
                    },
                    set: (context, v: any) => {
                        if (v?.id) {
                            v.zh_CN = ctx.i18nLangContent[v.id]?.content?.['zh-CN']
                        }
                        ctx.pageHeader.title = v
                    },
                },
            },
            {
                title: '图标(favicon)',
                type: 'ImageSelector',
                description: '网页的图标',
                options: {
                    useBase64: true
                },
                value: {
                    get: (context) => {
                        return ctx.pageHeader.favicon
                    },
                    set: (context, v: any) => {
                        ctx.pageHeader.favicon = v
                    },
                },
            },
            {
                title: '元数据(meta)',
                type: 'array',
                description: 'HTML文档的元数据, 用于浏览器(如何显示内容或重新加载页面), 搜索引擎(关键词), 或其他 web 服务。',
                options: {
                    getTitle: ({ type, key }) => {
                        return `${type}=${key}`;
                    },
                    onAdd: () => {
                        const defaultMeta = {
                            type: `name`,
                            key: `author`,
                            content: ``
                        };
                        return defaultMeta;
                    },
                    items: [
                        {
                            title: '关联属性',
                            type: 'Radio',
                            options: [
                                { label: 'name', value: 'name' },
                                { label: 'http-equiv', value: 'http-equiv' },
                            ],
                            value: 'type'
                        },
                        {
                            title: 'name',
                            description: '可选属性, 把content属性关联到一个名称',
                            type: 'Text',
                            value: 'key',
                            ifVisible(item) {
                                return item.type === 'name';
                            },
                        },
                        {
                            title: 'http-equiv',
                            description: '可选属性, 把content属性关联到HTTP头部',
                            type: 'Text',
                            value: 'key',
                            ifVisible(item) {
                                return item.type === 'http-equiv';
                            },
                        },
                        {
                            title: 'content',
                            description: '必填属性, 定义与http-equiv或name属性相关的元信息',
                            type: 'Textarea',
                            value: 'content'
                        },
                    ]
                },
                value: {
                    get() {
                        return ctx.pageHeader.meta
                    },
                    set(context, v) {
                        ctx.pageHeader.meta = v;
                    },
                },
            }
        ]
    }
};