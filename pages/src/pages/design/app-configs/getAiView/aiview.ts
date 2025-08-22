// import { getNewDSL as genGetNewDsl, getDSLPrompts as genGetDslPrompts, getSystemPrompts as genGetSystemPrompts, DslHelper, Services } from '/Users/cocolbell/Desktop/projects/mybricks/sdk-for-ai/dist/index.umd'
import { getNewDSL as genGetNewDsl, getDSLPrompts as genGetDslPrompts, getSystemPrompts as genGetSystemPrompts, DslHelper, Services } from '@mybricks/ai-utils'

const { checkValueType, getValidSlotStyle, getValidSizeValue, transformToValidBackground } = DslHelper

const getNewDSL = (params) => {
  const { designerRef } = params;
  let gridComponentNamespace = "";
  let customContainerComponentNamespace = "";
  return genGetNewDsl({
    flex: (component) => {
      if (!gridComponentNamespace) {
        const allComDef = designerRef.current.components.getAllComDef()
        const keys = Object.keys(allComDef)

        if (keys.find((key) => key.startsWith("mybricks.basic-comlib.antd5"))) {
          gridComponentNamespace = "mybricks.basic-comlib.antd5.grid"
        } else {
          gridComponentNamespace = "mybricks.basic-comlib.grid"
        }

        if (keys.find((key) => key.startsWith("mybricks.normal-pc.antd5"))) {
          customContainerComponentNamespace = "mybricks.normal-pc.antd5.custom-container"
        } else {
          customContainerComponentNamespace = "mybricks.normal-pc.custom-container"
        }
      }

      // 兼容把样式写到 layout 的情况
      if (component.style) {
        const { width, height, justifyContent, alignItems, flex, styleAry, ...extra } = component.style

        if (!component?.style?.styleAry) {
          component.style.styleAry = [
            {
              selector: ':root',
              css: {}
            }
          ]
        }
        component.style.styleAry[0].css = {
          ...(component.style.styleAry[0]?.css ?? {}),
          ...(extra ?? {})
        }
      }

      if (component?.style?.styleAry) {
        component?.style?.styleAry?.forEach?.(item => {
          if (!item.css) {
            item.css = {}
          }
          // [TODO] 幻觉处理
          if (item.css.margin) {
            delete item.css.margin
          }
        })
      }
  
      // 处理幻觉
      // if (component.style?.paddingLeft) {
      //   component.style.marginLeft = component.style?.paddingLeft
      //   delete component.style?.paddingLeft
      // }
      // if (component.style?.paddingRight) {
      //   component.style.marginRight = component.style?.paddingRight
      //   delete component.style?.paddingRight
      // }
  
      // 处理绝对定位兼容
      const rootStyle = component?.style?.styleAry?.find?.(s => s.selector === ':root')?.css
      if (rootStyle?.position === 'absolute') {
        component.style.position = rootStyle.position;
  
        if (rootStyle.left) {
          component.style.left = rootStyle.left
          delete rootStyle.left
        }
        if (rootStyle.right) {
          component.style.right = rootStyle.right
          delete rootStyle.right
        }
        if (rootStyle.top) {
          component.style.top = rootStyle.top
          delete rootStyle.top
        }
        if (rootStyle.bottom) {
          component.style.bottom = rootStyle.bottom
          delete rootStyle.bottom
        }
  
        delete rootStyle.position
      }

      // 兼容布局写到rootStyle的情况
      if (rootStyle?.flexDirection) {
        if (!component.style) {
          component.style = {}
        }
        component.style.flexDirection = rootStyle.flexDirection
      }
      if (rootStyle?.alignItems) {
        if (!component.style) {
          component.style = {}
        }
        component.style.alignItems = rootStyle.alignItems
      }
      if (rootStyle?.justifyContent) {
        if (!component.style) {
          component.style = {}
        }
        component.style.justifyContent = rootStyle.justifyContent
      }
  
      const shouldTransformToGrid = component.style?.flexDirection === 'row' && component?.comAry?.some(com => {
        return !!com.style.flex || (checkValueType(com.style?.width) === 'percentage' && com.style?.width !== '100%')
      })
  
      if (shouldTransformToGrid) {
        const { justifyContent = 'flex-start', alignItems = 'flex-start', columnGap = 0 } = component.style ?? {};
        component.namespace = gridComponentNamespace
  
        const heightProps = {
          height: '100%',
          mode: 'auto'
        }
        switch (true) {
          case component.style?.height === 'fit-content': {
            delete heightProps.height;
            heightProps.mode = 'auto';
            break
          }
        }
  
        component.data = {
          rows: [
            {
              cols: component?.comAry?.map((com, index) => {
                const comStyle = com.layout ?? com.style
  
                const base: any = {
                  key: `col${index}`,
                  isDragging: false,
                  isHover: false,
                  slotStyle: getValidSlotStyle(),
                  style: {
                    height: comStyle?.height || 'auto'
                  }
                }
  
                const widthType = checkValueType(getValidSizeValue(comStyle?.width))
  
                switch (true) {
                  case comStyle?.flex === 1: {
                    base.width = 50
                    base.widthMode = 'auto'
                    break
                  }
                  case comStyle?.width === undefined || comStyle.width === null: {
                    base.width = 50
                    base.widthMode = 'fit-content'
                    break
                  }
                  case comStyle?.width === 'fit-content': {
                    base.width = 50
                    base.widthMode = 'fit-content'
                    break
                  }
                  case widthType === 'percentage': {
                    base.width = parseFloat(getValidSizeValue(comStyle?.width) as any)
                    base.widthMode = '%'
                    break
                  }
                  case widthType === 'number': {
                    base.width = getValidSizeValue(comStyle?.width)
                    // base.widthMode = 'px'
                    base.widthMode = 'fit-content'
                    break
                  }
                }
  
                delete comStyle?.flex;
  
                return base
              }),
              key: 'row0',
              ...heightProps,
              style: {
                justifyContent,
                alignItems,
                columnGap
              }
            }
          ]
        }
        component?.comAry?.forEach((com, index) => {
          if (!component.slots) {
            component.slots = {}
          }
          component.slots[`col${index}`] = {
            id: `col${index}`,
            title: `列${index}`,
            comAry: [com],
            style: {
              width: '100%',
              height: com.style?.height
            }
          }
          com.style.width = '100%'
        })
        component.comAry = undefined
        delete component.comAry
  
        return
      }
  
      // 处理textAlign幻觉
      if (rootStyle?.textAlign) {
        if (component.style?.flexDirection === 'column') {
          component.style.alignItems = 'center'
        }
        if (component.style?.flexDirection === 'row') {
          component.style.justifyContent = 'center'
        }
      }
  
      if (component.style?.flexDirection === 'column' || component.style?.flexDirection === 'row') {
        component.namespace = customContainerComponentNamespace
        if (!component.data) {
          component.data = {}
        }
  
        let slotWidth = getValidSizeValue(component.style?.width, '100%')
        if (checkValueType(slotWidth) === 'number') {
          slotWidth = '100%'
        }
  
        let slotHeight = getValidSizeValue(component.style?.height, 'auto')
        if (checkValueType(slotHeight) === 'number') {
          slotHeight = '100%'
        }
  
        component.data.slotStyle = getValidSlotStyle(component.style)
        component.slots = {
          content: {
            id: 'content',
            title: component.title ? `${component.title}插槽` : '内容',
            style: {
              width: slotWidth,
              height: slotHeight,
              flexDirection: component.style.flexDirection,
              layout: `flex-${component.style.flexDirection}`,
              justifyContent: component.data.slotStyle.justifyContent,
              alignItems: component.data.slotStyle.alignItems,
            },
            comAry: component?.comAry
          }
        }
        component.comAry = undefined
        component.style = {
          ...(component.style ?? {}),
          width: getValidSizeValue(component.style?.width, 'fit-content'),
          height: getValidSizeValue(component.style?.height, 'auto'),
        }
        delete component.comAry
  
        return
      }
    },
    'system.page': (component) => {
      const allComDef = designerRef.current.components.getAllComDef()
      const keys = Object.keys(allComDef)
      if (keys.find((key) => key.startsWith("mybricks.normal-pc.antd5"))) {
        customContainerComponentNamespace = "mybricks.normal-pc.antd5.custom-container"
      } else {
        customContainerComponentNamespace = "mybricks.normal-pc.custom-container"
      }
      component.namespace = customContainerComponentNamespace
    }
  })
}

const getSystemPrompts = genGetSystemPrompts({
  title: "京东购物网站",
  pages: [
    {
      title: "首页",
      prd: `购物网站首页一般包含导航栏、搜索栏、商品类目导航、轮播banner、个人信息、猜你喜欢等区域。

      我们从上到下，从左到右来分析UI

      ## 顶部导航栏
      功能：顶部导航栏，提供一些基础信息的展示（如位置信息、用户昵称），同时提供一些二级页面的快捷入口
      视觉：电商网站的导航栏不是重点区域，高度相对较小，文字内容也不大，不是重点视觉，可以延展至和页面等宽，不需要间距
        - 左侧：居左展示位置信息和用户名称
        - 右侧：居右展示购物车、我的订单等其他页面入口
      
      ## 搜索栏
      功能：吸引用户点击，作为全局搜索入口，由输入框和按钮组成
      视觉：重点区域，用红色边框高亮，但左右两侧较空，所以可以放置一些logo、一些辅助的按钮来填充
        - 左侧：居左展示京东logo
        - 中间：重点放置搜索栏
        - 右侧：放置一个引入注目的AI按钮

      ## 核心内容区
      功能：提升利用率，通过左中右三个分区，展示更多信息，吸引用户和展示信息的重点区域
      视觉：
        - 左侧：居左展示商品分类导航
        - 中间：展示活动轮播 + 顶流商品，提升营销氛围
        - 右侧：居右展示个人信息卡片，包含头像昵称以及优惠券订单等特殊信息，用黑金氛围表示个人的尊贵感

      ## 猜你喜欢
      功能：通过标签分类 + 商品瀑布流的方式留住顾客，让顾客产生留下的冲动
      视觉：
        - 一个分类标签栏，提供了「为你推荐」「进口好物」等分类标签
        - 商品卡片的瀑布流，用列表实现一行N列的瀑布流
      `
    },
    {
      title: "商品详情页",
      prd: `商品详情页包含导航栏、店铺信息、商品图片、商品名称、商品价格、商品评价、收货地址等内容

      从上到下，从左到右来分析UI

      ## 顶部导航栏，和之前一样，一般而言，同一个网站的顶部导航栏都是不变的

      ## 店铺区域
      功能：展示商品所属店铺信息，右侧比较空白，所以将店铺搜索栏展示于此
      视觉：
        - 左侧：居左展示，店铺卡片，包含店铺头像、店铺名称、以及一些店铺的操作按钮（收藏店铺、联系客服）
        - 右侧：居右展示，一个符合整体风格的搜索栏，可以搜搜店铺的商品
     
      ## 商品区域
      功能：核心区域，重点展示商品的各类信息以及选购信息
      视觉：
        - 左侧：居左展示，轮播的商品图片，用于展示商品的更多图片
        - 右侧：居右展示，整个商品的选购信息卡片，从上到下，需要展示商品价格、商品划线价、送到什么收获地址、款式选择、数量，操作按钮（加入购物车 + 立即购买）

      ## 商品评价
      功能：一般在底部都是可垂直方向延展的内容，所以将商品评价方到底部，可以通过加载更多的列表来加载更多的评价
        - 评价的总结信息，展示各种标签「赞不绝口」「省时便捷」「安装简单」等总结性标签 + 评论总数
        - 评价列表，包含评价用户信息，评价图片以及评价内容`
    },
  ],
  style: `网页的设计要富有美感，关注设计元素间距，圆角，字体大小，图片配合等，网页的纵向排列应包含尽可能多的功能模块
  一个偏向活力的京东红风格是一个不错的选择
  颜色
    主题色：#e93b3d
    次要色：#333
    背景色：#f5f5f5
  字体
    标题：bold 16px
    正文：14px
  边框
    圆角：4px
    阴影：0 2px 8px rgba(0,0,0,0.1)
  
  你也可以任意发挥，但是尽量遵循需求，如果要求模仿某个网站，一定要以该网站主题主题、排版布局为准。
  通常可以参考一些比较出名的网站，不限于风格，比如京东、淘宝、特斯拉等网站的元素设计。`
})

const getDSLPrompts = genGetDslPrompts({
  dslDemoPrompts: `
  1、page.dsl文件，为页面界面的结构描述，如下为一个卡片中有一个文本：
  \`\`\`dsl file="page.dsl"
  <page title="你好世界" style={{backgroundColor: "#fff"}}>
    <card.component.namespace
      title="卡片"
      layout={{ width: '100%', height: 'fit-content' }}
      data={{"title":"卡片","useExtra":false,"bordered":true,"hoverable":false,"cursor":false,"size":"default","style":{},"bodyStyle":{},"outputContent":0,"dataType":"number","borderStyle":{"borderRadius":"8px 8px 8px 8px","borderColor":"#F0F0F0 #F0F0F0 #F0F0F0 #F0F0F0","borderWidth":"1px 1px 1px 1px","borderStyle":"solid solid solid solid"},"isAction":false,"items":[{"key":"key1","name":"操作项1"}],"padding":"24px","isHeight":false,"height":"80px","showTitle":true,"slotStyle":{"display":"flex","position":"inherit","flexDirection":"column","alignItems":"flex-start","justifyContent":"flex-start","flexWrap":"nowrap","rowGap":0,"columnGap":0}}}
    >
      <slots.body title="卡片内容" layout={{ width: '100%', height: '100%', "justifyContent":"flex-start","alignItems":"flex-start","layout":"flex-column" }}>
        <text.component.namespace
          title="文本"
          layout={{ width: 'fit-content' }}
          data={{"content":"文字","outputContent":"","align":"left","isEllipsis":false,"ellipsis":{"rows":1},"style":{},"useDynamicStyle":false,"useHoverStyle":true,"legacyConfigStyle":{}}}
        />
      </slots.body>
    </card.component.namespace>
  </page>
  \`\`\`
  注意：
  上述用到的“card.component.namespace”表达的是使用card组件的namesapce，如果包含多个card组件，优先选择namespace中包含antd5的组件namespace
  上述用到的“text.component.namespace”以及可能的其它组件均同上述card组件同理。
  “page”为特殊画布节点，不需要选择建议组件的namespace，直接使用“page”即可。
  “flex”组件为特殊组件，不需要选择建议组件的namespace，直接使用“flex”即可。
  更多用法关注组件使用建议，严格按照组件的文档提示来使用。

  特别地，只有插槽可以配置height=100%，其他标签都不可以

  `,
  canvasInfoPrompts: `
  当前搭建画布的宽度为1024，所有元素的尺寸需要关注此信息，且尽可能自适应布局。1024只是在MyBricks搭建时的画布宽度，实际运行时可能会更宽。
  
  搭建内容必须参考PC端网站进行设计，内容必须考虑左右排列的丰富度，以及以下PC的特性
    比如:
      1. 布局需要自适应画布宽度，实际运行的电脑宽度不固定；
      2. 宽度和间距配置的时候要注意，画布只有1024，特别注意总宽度不可以超过1024；
      3. 页面可以配置backgroundColor；
  搭建风格也要尽可能贴合中国网站的设计风格；
  `,
  componentSuggestionPrompts: `
  1. 基础布局必须使用“flex”组件，禁止使用容器、布局类组件；
  2. 文本、图片、按钮、图标组件属于基础组件，任何情况下都可以优先使用，即使不在允许使用的组件里；
  3. 对于图标，图标禁止使用emoji或者特殊符号，必须使用图标组件来搭建；
  4. 关于图片
    4.1 如果是常规图片，使用https://ai.mybricks.world/image-search?term=dog&w=100&h=200，其中term代表搜索词，w和h可以配置图片宽高；
    4.2 如果是Logo，可以使用https://placehold.co来配置一个带文本和颜色的图标，其中text需要为图标的英文搜索词，禁止使用emoji或者特殊符号；
  5. 尽可能使用margin替代padding，多注意组件是否需要配置margin，如果是横向布局，组件间的间距必须使用右侧组件的左间距，如果是横向布局，必须使用下侧组件的上间距；
  6. 仔细是否需要用到绝对定位，是相对于父元素的；
  7. page下方的元素合理配置左右margin，导航栏、通栏内容、菜单等都不需要配置左右间距，主要是考虑美观度；
  8. 给所有使用到的组件设置主题色
  `,
})

const getPRDPromptsAtFirst = () => {
  return `对于需求，我们需要严格按以下格式返回
    <需求格式>
    1.概述
    2.总体设计规范
    3.设计亮点
      - 在此部分，你需要扮演创意总监的角色，超越简单的功能堆砌，核心是增加内容的丰富度和美观度，请从以下角度发散思考，对每个区域都提供一些可落地的设计亮点
        - 丰富度
          - 通过左右分栏、左中右分栏等方式增加PC网站的信息密度，不至于大片留白
          - 通过绝对定位、标签、高亮信息、补充文字等方式来补充局部的内容
        - 美观度
          - 通过渐变色、半透明背景色、边框、阴影、多色文字等方式来增添美观度
    4.内容分析和描述
      - 从上到下，从左到右分析和描述内容
    5.参考风格和网站
      - 提供一些可被参考的设计风格，以及可被参考的网页设计
    </需求格式>
    `
}

export const getExamplePrompts = () => {
  return `
  <example>
    <user_query>搭建两个竖排的按钮，按钮宽度固定 + 铺满</user_query>
    <assistant_response>
    \`\`\`dsl file="page.dsl"
      <page title="测试页面" style={{backgroundColor: "#f5f5f5"}}>
        <button.component.namespace
          title="按钮1" 
          layout={{width: 50, height: 36}}
          styleAry={[{selector:".button",css:{"backgroundColor":"red"}}]}
          data={{ text:"按钮1", type: 'primary' }}
        />
        <button.component.namespace
          title="按钮2" 
          layout={{width: '100%', height: 36}}
          styleAry={[{selector:".button",css:{"backgroundColor":"blue"}}]}
          data={{ text:"按钮2", type: 'primary' }}
        />
      </page>
    \`\`\`
    </assistant_response>
  </example>
  `
}

export const getExamplePromptsAtFirst = () => {
  return `
  <example>
    <user_query>我要搭建一个京东首页</user_query>
    <assistant_response>
      好的，我来参考京东首页的内容实现一下，以下是需求分析规格说明书和组件选型的内容：
      \`\`\`md file="prd.md"
      # 概述
      首页一般包含导航栏、搜索栏、商品类目导航、轮播banner、个人信息、猜你喜欢等区域。

      # 总体设计规范
      - 一致性：保证各区域的圆角一致、保证字体大小合理，审视间距的配置是否过大或者过小，又或者是多个间距叠加在一起了；
      - 丰富性：电商网站要求信息量大，在每一个区域展示更多的内容，增加信息展示的密度；

      # 设计亮点
      - 内容丰富分成左中右三栏不对称的「核心内容」区域
      - 可以配置渐变色和阴影的AI按钮，引入注目
      - 左右不对称的「科学研究」区域
      - 对商品卡片的内容进行拓展，图片加价格太过单调，可以拓展成一个丰富的商品卡片，上方商品图片，下方排一个「无理由退货」「百亿补贴」等营销标签，中间左侧放置价格以及划线价，右侧放置销量，再下方提供多少人已购买字样

      我们从上到下，从左到右来分析UI

      ## 顶部导航栏
      功能：顶部导航栏，提供一些基础信息的展示（如位置信息、用户昵称），同时提供一些二级页面的快捷入口
      视觉：电商网站的导航栏不是重点区域，高度相对较小，文字内容也不大，不是重点视觉，可以延展至和页面等宽，不需要间距
        - 左侧：居左展示位置信息和用户名称
        - 右侧：居右展示购物车、我的订单等其他页面入口
      
      ## 搜索栏
      功能：吸引用户点击，作为全局搜索入口，由输入框和按钮组成
      视觉：重点区域，用红色边框高亮，但左右两侧较空，所以可以放置一些logo、一些辅助的按钮来填充
        - 左侧：居左展示京东logo
        - 中间：重点放置搜索栏
        - 右侧：放置一个引入注目的AI按钮

      ## 核心内容区
      功能：提升利用率，通过左中右三个分区，展示更多信息，吸引用户和展示信息的重点区域
      视觉：
        - 左侧：居左展示商品分类导航
        - 中间：展示活动轮播 + 顶流商品，提升营销氛围
        - 右侧：居右展示个人信息卡片，包含头像昵称以及优惠券订单等特殊信息，用黑金氛围表示个人的尊贵感

      ## 猜你喜欢
      功能：通过标签分类 + 商品瀑布流的方式留住顾客，让顾客产生留下的冲动
      视觉：
        - 一个分类标签栏，提供了「为你推荐」「进口好物」等分类标签
        - 商品卡片的瀑布流，用列表实现一行N列的瀑布流

      # 参考风格和网站
      红色营销风格，京东、淘宝等PC站点设计
      
      \`\`\`
    
      推荐采用以下组件进行搭建
      \`\`\`json file="require.json"
      [
        {
          "namespace": "mybricks.somelib.icon"
        },
        {
          "namespace": "mybricks.somelib.text"
        },
        {
          "namespace": "mybricks.somelib.button"
        }
      ]
      \`\`\`
    </assistant_response>
  </example>

  <example>
    <user_query>开发一个大学官网</user_query>
    <assistant_response>
      好的，我来实现一个大学官网，以下是需求分析规格说明书和组件选型的内容：
      \`\`\`md file="prd.md"
      # 概述
      一个大学的门户网站，这个大学网站包含了导航栏、学校介绍、历史沿革、院系设置、招生就业、学术科研、页脚等部分。

      # 总体设计规范
      - 一致性：保证各区域的圆角一致、保证字体大小合理，审视间距的配置是否过大或者过小，又或者是多个间距叠加在一起了；
      - 丰富性：官网要求信息量大，在卡片设计和其他内容展示更多的内容和丰富的样式，增加信息展示的密度和层次感；

      # 设计亮点
      - 对学校介绍进行拓展
        - 利用双色标题，展示学校的slogan
        - 利用左右分栏的不对称布局展示更多的信息
        - 利用绝对定位绘制一些高亮标签
      - 标题+副标题增添每个区域的内容丰富度
      - 左右不对称的「科学研究」区域，增加内容利用率

      我们从上到下，从左到右来分析UI

      ## 顶部导航栏
      功能：顶部导航栏，提供一些学校logo和其他区域的导航入口。
      视觉：导航栏核心是一个总览作用，可以延展至和页面等宽，不需要间距
        - 左侧：居左展示logo和学校名称
        - 右侧：居右展示各个区域或者其他页面的入口
      
      ## 学校介绍
      功能：作为第一个看到的区域，内容必须有冲击力且能说明优势
      视觉：重点区域，同时展示slogan、简短的介绍，一个学校图片、以及一些学校的数据，比如就业率、专业数量、教学质量等信息
        - 左侧：用双色标题展示slogan，同时展示一句优势介绍，再用主题色提供一些数据支持，提供两个带按钮的图标
        - 右侧：放置学校图片，同时可以用绝对定位绘制一些高亮信息（比如科研实力top1等）

      ## 历史沿革
      功能：介绍学校厚重的历史
      视觉：通过标题和副标题总结该区域，同时介绍学校历史
        - 左侧历史图片，右侧历史总结
        - 下方再添加学校的一些数据，比如办学历史、校园面积、教职工数量等

      ## 院系设置
      功能：介绍学校覆盖各类学科领域知识
      视觉：通过标题和副标题总结该区域，同时详细介绍下学院、王牌专业、教师数量等信息
        - 通过横向列表+卡片的形式来展示此区域
        - 卡片部分能够展示一些详细信息，比如学院信息，王牌专业（使用高亮标签），教师和学生数量（使用图标+文字）
        - 同时提供了解更多的入口

      ## 科学研究
      功能：介绍学校浓厚的科学研究氛围和实力
      视觉：通过标题和副标题总结该区域，同时通过左右不对称的样式增加美观度
        - 左侧介绍中重点实验室、合作实验室等图片和信息
        - 右侧通过数据卡片，提供一些专利数量、论文数量、国家重点实验室等数据支持，可以通过边框来绘制带封边的卡片

      ## 页脚
      功能：展示快速导航、在线服务连接、联系方式、以及版权信息
      视觉：左右无间距的深色页脚，注意响应式，也可以添加几个平台的图标用于跳转其他平台账号
      \`\`\`

      # 参考风格和网站
      清华大学、harvard.edu等校园网站设计
    
      推荐采用以下组件进行搭建
      \`\`\`json file="require.json"
      [
        {
          "namespace": "mybricks.somelib.icon"
        },
        {
          "namespace": "mybricks.somelib.text"
        },
        {
          "namespace": "mybricks.somelib.button"
        },
        {
          "namespace": "mybricks.somelib.list"
        },
        {
          "namespace": "mybricks.somelib.image"
        }
      ]
      \`\`\`
    </assistant_response>
  </example>
  `
}

const getAvailable = Services.getAvailable

export const getAIResponse = Services.getAIResponse

export default {
  getAvailable,
  getNewDSL,
  getDSLPrompts,
  getSystemPrompts,
  getPRDPromptsAtFirst,
  getExamplePrompts,
  getExamplePromptsAtFirst
}