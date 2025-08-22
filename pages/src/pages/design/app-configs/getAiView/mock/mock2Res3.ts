export default `M:根据您提供的需求，我来为您搭建一个现代简约风格的大学官网。这个网站将展现学校的专业形象和丰富内容。

\`\`\`dsl file="page.dsl"
<page title="大学官网" style={{backgroundColor: "#f8fafc"}}>
    <!-- 顶部导航栏 -->
    <flex row title="顶部导航栏" layout={{width: '100%', height: 80, alignItems: 'center', justifyContent: 'space-between'}} styleAry={[{selector: ':root', css: {backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}]}>
      <flex row title="Logo区域" layout={{marginLeft: 60, alignItems: 'center'}}>
        <mybricks.normal-pc.antd5.single-image
          title="校徽"
          layout={{width: 50, height: 50, marginRight: 12}}
          data={{"src": "https://placehold.co/50x50/1677FF/FFFFFF?text=UNI", "objectFit": "cover"}}
        />
        <mybricks.normal-pc.antd5.text
          title="学校名称"
          layout={{width: 'fit-content'}}
          data={{"content": "北京理工大学", "align": "left"}}
          styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '24px', fontWeight: 'bold', color: '#1677FF'}}]}
        />
      </flex>
      <flex row title="导航菜单" layout={{marginRight: 60}}>
        <mybricks.normal-pc.antd5.menu
          title="主导航"
          layout={{width: 'fit-content'}}
          data={{"dataSource": [
            {"key": "home", "title": "学校简介", "menuType": "menu", "defaultActive": true},
            {"key": "college", "title": "院系设置", "menuType": "menu"},
            {"key": "admission", "title": "招生就业", "menuType": "menu"},
            {"key": "news", "title": "新闻公告", "menuType": "menu"},
            {"key": "research", "title": "学术科研", "menuType": "menu"},
            {"key": "life", "title": "校园生活", "menuType": "menu"},
            {"key": "contact", "title": "联系我们", "menuType": "menu"}
          ], "mode": "horizontal"}}
          styleAry={[
            {selector: '.ul li:not(.ant-menu-item-selected)', css: {color: '#333333', fontSize: '16px'}},
            {selector: '.ul li.ant-menu-item-selected', css: {color: '#1677FF', fontSize: '16px'}},
            {selector: 'ul li.ant-menu-item-selected:after', css: {borderWidth: '3px', borderColor: '#1677FF'}}
          ]}
        />
      </flex>
    </flex>

    <!-- 主横幅区域 -->
    <flex column title="主横幅区域" layout={{width: '100%', height: 500, justifyContent: 'center', alignItems: 'center'}} styleAry={[{selector: ':root', css: {backgroundImage: 'url(https://ai.mybricks.world/image-search?term=university+campus+aerial&w=1200&h=500)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'}}]}>
      <flex column title="横幅遮罩" layout={{width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, justifyContent: 'center', alignItems: 'center'}} styleAry={[{selector: ':root', css: {backgroundColor: 'rgba(0,0,0,0.4)'}}]}>
        <mybricks.normal-pc.antd5.text
          title="主标题"
          layout={{width: 'fit-content', marginBottom: 20}}
          data={{"content": "培养卓越人才，服务国家发展", "align": "center"}}
          styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '48px', fontWeight: 'bold', color: '#ffffff'}}]}
        />
        <mybricks.normal-pc.antd5.text
          title="副标题"
          layout={{width: 'fit-content', marginBottom: 30}}
          data={{"content": "百年名校，传承创新，培育英才", "align": "center"}}
          styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '20px', color: '#ffffff', opacity: 0.9}}]}
        />
        <flex row title="操作按钮" layout={{alignItems: 'center'}}>
          <mybricks.normal-pc.antd5.custom-button
            title="了解更多"
            layout={{width: 'fit-content', marginRight: 20}}
            data={{"text": "了解更多", "type": "primary", "size": "large"}}
            styleAry={[{selector: '.button', css: {backgroundColor: '#1677FF', borderRadius: '25px', padding: '12px 30px'}}]}
          />
          <mybricks.normal-pc.antd5.custom-button
            title="招生信息"
            layout={{width: 'fit-content'}}
            data={{"text": "招生信息", "type": "ghost", "size": "large"}}
            styleAry={[{selector: '.button', css: {borderColor: '#ffffff', color: '#ffffff', borderRadius: '25px', padding: '12px 30px'}}]}
          />
        </flex>
      </flex>
    </flex>

    <!-- 学校简介区域 -->
    <flex column title="学校简介区域" layout={{width: '100%', marginTop: 80, marginBottom: 80}} styleAry={[{selector: ':root', css: {backgroundColor: '#ffffff'}}]}>
      <flex column title="简介标题" layout={{width: '100%', alignItems: 'center', marginBottom: 50}}>
        <mybricks.normal-pc.antd5.text
          title="区域标题"
          layout={{width: 'fit-content', marginBottom: 10}}
          data={{"content": "学校简介", "align": "center"}}
          styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '36px', fontWeight: 'bold', color: '#1677FF'}}]}
        />
        <flex column title="标题下划线" layout={{width: 80, height: 3}} styleAry={[{selector: ':root', css: {backgroundColor: '#1677FF'}}]}>
        </flex>
      </flex>
      
      <flex row title="简介内容" layout={{width: '100%', marginLeft: 80, marginRight: 80, alignItems: 'center', justifyContent: 'space-between'}}>
        <flex column title="文字内容" layout={{width: 500}}>
          <mybricks.normal-pc.antd5.text
            title="历史沿革"
            layout={{width: '100%', marginBottom: 30}}
            data={{"content": "历史沿革", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '24px', fontWeight: 'bold', color: '#333333'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="历史描述"
            layout={{width: '100%', marginBottom: 40}}
            data={{"content": "学校创建于1940年，前身为延安自然科学院，是中国共产党创办的第一所理工科大学。经过80多年的建设发展，现已成为一所以理工为主、工理管文协调发展的全国重点大学。", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '16px', color: '#666666', lineHeight: '1.6'}}]}
          />
          
          <mybricks.normal-pc.antd5.text
            title="现任领导"
            layout={{width: '100%', marginBottom: 20}}
            data={{"content": "现任领导", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '20px', fontWeight: 'bold', color: '#333333'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="领导介绍"
            layout={{width: '100%', marginBottom: 30}}
            data={{"content": "校长：张军院士，党委书记：赵长禄教授，副校长团队致力于推进学校双一流建设。", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '16px', color: '#666666', lineHeight: '1.6'}}]}
          />
        </flex>
        
        <flex column title="图片展示" layout={{width: 400}}>
          <mybricks.normal-pc.antd5.single-image
            title="校园风光"
            layout={{width: 400, height: 300, marginBottom: 20}}
            data={{"src": "https://ai.mybricks.world/image-search?term=university+building+modern&w=400&h=300", "objectFit": "cover"}}
            styleAry={[{selector: '.img', css: {borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="图片说明"
            layout={{width: '100%'}}
            data={{"content": "现代化的教学楼群，为师生提供优质的学习环境", "align": "center"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#999999'}}]}
          />
        </flex>
      </flex>
    </flex>

    <!-- 院系设置区域 -->
    <flex column title="院系设置区域" layout={{width: '100%', marginBottom: 80}} styleAry={[{selector: ':root', css: {backgroundColor: '#f8fafc', padding: '80px 0'}}]}>
      <flex column title="院系标题" layout={{width: '100%', alignItems: 'center', marginBottom: 50}}>
        <mybricks.normal-pc.antd5.text
          title="院系标题"
          layout={{width: 'fit-content', marginBottom: 10}}
          data={{"content": "院系设置", "align": "center"}}
          styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '36px', fontWeight: 'bold', color: '#1677FF'}}]}
        />
        <flex column title="标题下划线" layout={{width: 80, height: 3}} styleAry={[{selector: ':root', css: {backgroundColor: '#1677FF'}}]}>
        </flex>
      </flex>
      
      <flex row title="院系卡片" layout={{width: '100%', marginLeft: 80, marginRight: 80, justifyContent: 'space-between'}}>
        <flex column title="工程学院" layout={{width: 280, marginRight: 20}} styleAry={[{selector: ':root', css: {backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', padding: '30px', transition: 'transform 0.3s ease'}}]}>
          <mybricks.normal-pc.antd5.icon
            title="工程图标"
            layout={{width: 60, height: 60, marginBottom: 20}}
            data={{"icon": "BuildOutlined"}}
            styleAry={[{selector: '.icon', css: {color: '#1677FF'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="学院名称"
            layout={{width: '100%', marginBottom: 15}}
            data={{"content": "机械与车辆学院", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '20px', fontWeight: 'bold', color: '#333333'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="学院介绍"
            layout={{width: '100%', marginBottom: 20}}
            data={{"content": "设有机械工程、车辆工程、工业工程等专业，是国内顶尖的工程技术人才培养基地。", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#666666', lineHeight: '1.5'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="专业数量"
            layout={{width: '100%'}}
            data={{"content": "8个本科专业 | 6个研究生专业", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '12px', color: '#1677FF', fontWeight: 'bold'}}]}
          />
        </flex>
        
        <flex column title="信息学院" layout={{width: 280, marginRight: 20}} styleAry={[{selector: ':root', css: {backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', padding: '30px'}}]}>
          <mybricks.normal-pc.antd5.icon
            title="信息图标"
            layout={{width: 60, height: 60, marginBottom: 20}}
            data={{"icon": "LaptopOutlined"}}
            styleAry={[{selector: '.icon', css: {color: '#52c41a'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="学院名称"
            layout={{width: '100%', marginBottom: 15}}
            data={{"content": "信息与电子学院", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '20px', fontWeight: 'bold', color: '#333333'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="学院介绍"
            layout={{width: '100%', marginBottom: 20}}
            data={{"content": "涵盖计算机科学、电子信息工程、通信工程等前沿技术专业，培养数字化时代人才。", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#666666', lineHeight: '1.5'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="专业数量"
            layout={{width: '100%'}}
            data={{"content": "10个本科专业 | 8个研究生专业", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '12px', color: '#52c41a', fontWeight: 'bold'}}]}
          />
        </flex>
        
        <flex column title="理学院" layout={{width: 280}} styleAry={[{selector: ':root', css: {backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', padding: '30px'}}]}>
          <mybricks.normal-pc.antd5.icon
            title="理学图标"
            layout={{width: 60, height: 60, marginBottom: 20}}
            data={{"icon": "ExperimentOutlined"}}
            styleAry={[{selector: '.icon', css: {color: '#fa541c'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="学院名称"
            layout={{width: '100%', marginBottom: 15}}
            data={{"content": "理学院", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '20px', fontWeight: 'bold', color: '#333333'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="学院介绍"
            layout={{width: '100%', marginBottom: 20}}
            data={{"content": "包含数学、物理、化学、材料科学等基础理科专业，为科学研究奠定坚实基础。", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#666666', lineHeight: '1.5'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="专业数量"
            layout={{width: '100%'}}
            data={{"content": "6个本科专业 | 7个研究生专业", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '12px', color: '#fa541c', fontWeight: 'bold'}}]}
          />
        </flex>
      </flex>
    </flex>

    <!-- 招生就业区域 -->
    <flex column title="招生就业区域" layout={{width: '100%', marginBottom: 80}} styleAry={[{selector: ':root', css: {backgroundColor: '#ffffff'}}]}>
      <flex column title="招生标题" layout={{width: '100%', alignItems: 'center', marginBottom: 50}}>
        <mybricks.normal-pc.antd5.text
          title="招生标题"
          layout={{width: 'fit-content', marginBottom: 10}}
          data={{"content": "招生就业", "align": "center"}}
          styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '36px', fontWeight: 'bold', color: '#1677FF'}}]}
        />
        <flex column title="标题下划线" layout={{width: 80, height: 3}} styleAry={[{selector: ':root', css: {backgroundColor: '#1677FF'}}]}>
        </flex>
      </flex>
      
      <flex row title="招生内容" layout={{width: '100%', marginLeft: 80, marginRight: 80, justifyContent: 'space-between'}}>
        <flex column title="招生政策" layout={{width: 450}} styleAry={[{selector: ':root', css: {backgroundColor: '#f0f7ff', borderRadius: '12px', padding: '40px'}}]}>
          <mybricks.normal-pc.antd5.text
            title="政策标题"
            layout={{width: '100%', marginBottom: 20}}
            data={{"content": "招生政策", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '24px', fontWeight: 'bold', color: '#1677FF'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="政策内容"
            layout={{width: '100%', marginBottom: 30}}
            data={{"content": "2024年计划招生5000人，其中本科生4000人，研究生1000人。设有多种招生渠道：高考统招、自主招生、保送生、国际生等。", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '16px', color: '#666666', lineHeight: '1.6'}}]}
          />
          <mybricks.normal-pc.antd5.custom-button
            title="查看详情"
            layout={{width: 'fit-content'}}
            data={{"text": "查看招生简章", "type": "primary", "size": "large"}}
            styleAry={[{selector: '.button', css: {backgroundColor: '#1677FF', borderRadius: '8px'}}]}
          />
        </flex>
        
        <flex column title="就业指导" layout={{width: 450}} styleAry={[{selector: ':root', css: {backgroundColor: '#f6ffed', borderRadius: '12px', padding: '40px'}}]}>
          <mybricks.normal-pc.antd5.text
            title="就业标题"
            layout={{width: '100%', marginBottom: 20}}
            data={{"content": "就业指导", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '24px', fontWeight: 'bold', color: '#52c41a'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="就业率"
            layout={{width: '100%', marginBottom: 15}}
            data={{"content": "毕业生就业率达98.5%", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '18px', fontWeight: 'bold', color: '#333333'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="就业内容"
            layout={{width: '100%', marginBottom: 30}}
            data={{"content": "提供职业规划、就业指导、企业宣讲、实习推荐等全方位就业服务。与500+知名企业建立合作关系。", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '16px', color: '#666666', lineHeight: '1.6'}}]}
          />
          <mybricks.normal-pc.antd5.custom-button
            title="就业服务"
            layout={{width: 'fit-content'}}
            data={{"text": "就业服务平台", "type": "primary", "size": "large"}}
            styleAry={[{selector: '.button', css: {backgroundColor: '#52c41a', borderRadius: '8px'}}]}
          />
        </flex>
      </flex>
    </flex>

    <!-- 新闻公告区域 -->
    <flex column title="新闻公告区域" layout={{width: '100%', marginBottom: 80}} styleAry={[{selector: ':root', css: {backgroundColor: '#f8fafc', padding: '80px 0'}}]}>
      <flex column title="新闻标题" layout={{width: '100%', alignItems: 'center', marginBottom: 50}}>
        <mybricks.normal-pc.antd5.text
          title="新闻标题"
          layout={{width: 'fit-content', marginBottom: 10}}
          data={{"content": "新闻公告", "align": "center"}}
          styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '36px', fontWeight: 'bold', color: '#1677FF'}}]}
        />
        <flex column title="标题下划线" layout={{width: 80, height: 3}} styleAry={[{selector: ':root', css: {backgroundColor: '#1677FF'}}]}>
        </flex>
      </flex>
      
      <flex row title="新闻内容" layout={{width: '100%', marginLeft: 80, marginRight: 80, justifyContent: 'space-between'}}>
        <flex column title="学校新闻" layout={{width: 450}}>
          <mybricks.normal-pc.antd5.text
            title="新闻标题"
            layout={{width: '100%', marginBottom: 30}}
            data={{"content": "学校新闻", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '24px', fontWeight: 'bold', color: '#333333'}}]}
          />
          
          <flex column title="新闻项1" layout={{width: '100%', marginBottom: 25}} styleAry={[{selector: ':root', css: {backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}]}>
            <mybricks.normal-pc.antd5.text
              title="新闻标题1"
              layout={{width: '100%', marginBottom: 10}}
              data={{"content": "我校在2024年QS世界大学排名中位列全球第280位", "align": "left"}}
              styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '16px', fontWeight: 'bold', color: '#333333'}}]}
            />
            <mybricks.normal-pc.antd5.text
              title="新闻日期1"
              layout={{width: '100%'}}
              data={{"content": "2024-03-15", "align": "left"}}
              styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#999999'}}]}
            />
          </flex>
          
          <flex column title="新闻项2" layout={{width: '100%', marginBottom: 25}} styleAry={[{selector: ':root', css: {backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}]}>
            <mybricks.normal-pc.antd5.text
              title="新闻标题2"
              layout={{width: '100%', marginBottom: 10}}
              data={{"content": "校长张军院士当选中国科学院院士", "align": "left"}}
              styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '16px', fontWeight: 'bold', color: '#333333'}}]}
            />
            <mybricks.normal-pc.antd5.text
              title="新闻日期2"
              layout={{width: '100%'}}
              data={{"content": "2024-03-10", "align": "left"}}
              styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#999999'}}]}
            />
          </flex>
        </flex>
        
        <flex column title="通知公告" layout={{width: 450}}>
          <mybricks.normal-pc.antd5.text
            title="公告标题"
            layout={{width: '100%', marginBottom: 30}}
            data={{"content": "通知公告", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '24px', fontWeight: 'bold', color: '#333333'}}]}
          />
          
          <flex column title="公告项1" layout={{width: '100%', marginBottom: 25}} styleAry={[{selector: ':root', css: {backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}]}>
            <mybricks.normal-pc.antd5.text
              title="公告标题1"
              layout={{width: '100%', marginBottom: 10}}
              data={{"content": "关于2024年春季学期开学安排的通知", "align": "left"}}
              styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '16px', fontWeight: 'bold', color: '#333333'}}]}
            />
            <mybricks.normal-pc.antd5.text
              title="公告日期1"
              layout={{width: '100%'}}
              data={{"content": "2024-03-12", "align": "left"}}
              styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#999999'}}]}
            />
          </flex>
          
          <flex column title="公告项2" layout={{width: '100%', marginBottom: 25}} styleAry={[{selector: ':root', css: {backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}]}>
            <mybricks.normal-pc.antd5.text
              title="公告标题2"
              layout={{width: '100%', marginBottom: 10}}
              data={{"content": "2024年研究生招生复试安排公告", "align": "left"}}
              styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '16px', fontWeight: 'bold', color: '#333333'}}]}
            />
            <mybricks.normal-pc.antd5.text
              title="公告日期2"
              layout={{width: '100%'}}
              data={{"content": "2024-03-08", "align": "left"}}
              styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#999999'}}]}
            />
          </flex>
        </flex>
      </flex>
    </flex>

    <!-- 学术科研区域 -->
    <flex column title="学术科研区域" layout={{width: '100%', marginBottom: 80}} styleAry={[{selector: ':root', css: {backgroundColor: '#ffffff'}}]}>
      <flex column title="科研标题" layout={{width: '100%', alignItems: 'center', marginBottom: 50}}>
        <mybricks.normal-pc.antd5.text
          title="科研标题"
          layout={{width: 'fit-content', marginBottom: 10}}
          data={{"content": "学术科研", "align": "center"}}
          styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '36px', fontWeight: 'bold', color: '#1677FF'}}]}
        />
        <flex column title="标题下划线" layout={{width: 80, height: 3}} styleAry={[{selector: ':root', css: {backgroundColor: '#1677FF'}}]}>
        </flex>
      </flex>
      
      <flex row title="科研统计" layout={{width: '100%', marginLeft: 80, marginRight: 80, justifyContent: 'space-between', marginBottom: 50}}>
        <flex column title="科研数据1" layout={{width: 200, alignItems: 'center'}} styleAry={[{selector: ':root', css: {backgroundColor: '#f0f7ff', borderRadius: '12px', padding: '30px'}}]}>
          <mybricks.normal-pc.antd5.text
            title="数据1"
            layout={{width: 'fit-content', marginBottom: 10}}
            data={{"content": "50+", "align": "center"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '36px', fontWeight: 'bold', color: '#1677FF'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="标签1"
            layout={{width: 'fit-content'}}
            data={{"content": "科研机构", "align": "center"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '16px', color: '#666666'}}]}
          />
        </flex>
        
        <flex column title="科研数据2" layout={{width: 200, alignItems: 'center'}} styleAry={[{selector: ':root', css: {backgroundColor: '#f6ffed', borderRadius: '12px', padding: '30px'}}]}>
          <mybricks.normal-pc.antd5.text
            title="数据2"
            layout={{width: 'fit-content', marginBottom: 10}}
            data={{"content": "200+", "align": "center"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '36px', fontWeight: 'bold', color: '#52c41a'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="标签2"
            layout={{width: 'fit-content'}}
            data={{"content": "科研项目", "align": "center"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '16px', color: '#666666'}}]}
          />
        </flex>
        
        <flex column title="科研数据3" layout={{width: 200, alignItems: 'center'}} styleAry={[{selector: ':root', css: {backgroundColor: '#fff2e8', borderRadius: '12px', padding: '30px'}}]}>
          <mybricks.normal-pc.antd5.text
            title="数据3"
            layout={{width: 'fit-content', marginBottom: 10}}
            data={{"content": "1000+", "align": "center"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '36px', fontWeight: 'bold', color: '#fa541c'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="标签3"
            layout={{width: 'fit-content'}}
            data={{"content": "学术论文", "align": "center"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '16px', color: '#666666'}}]}
          />
        </flex>
        
        <flex column title="科研数据4" layout={{width: 200, alignItems: 'center'}} styleAry={[{selector: ':root', css: {backgroundColor: '#f9f0ff', borderRadius: '12px', padding: '30px'}}]}>
          <mybricks.normal-pc.antd5.text
            title="数据4"
            layout={{width: 'fit-content', marginBottom: 10}}
            data={{"content": "100+", "align": "center"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '36px', fontWeight: 'bold', color: '#722ed1'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="标签4"
            layout={{width: 'fit-content'}}
            data={{"content": "专利授权", "align": "center"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '16px', color: '#666666'}}]}
          />
        </flex>
      </flex>
      
      <flex row title="科研成果" layout={{width: '100%', marginLeft: 80, marginRight: 80, alignItems: 'center', justifyContent: 'space-between'}}>
        <flex column title="图片展示" layout={{width: 400}}>
          <mybricks.normal-pc.antd5.single-image
            title="科研实验室"
            layout={{width: 400, height: 280}}
            data={{"src": "https://ai.mybricks.world/image-search?term=university+laboratory+research&w=400&h=280", "objectFit": "cover"}}
            styleAry={[{selector: '.img', css: {borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)'}}]}
          />
        </flex>
        
        <flex column title="成果描述" layout={{width: 500}}>
          <mybricks.normal-pc.antd5.text
            title="成果标题"
            layout={{width: '100%', marginBottom: 20}}
            data={{"content": "科研成果", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '24px', fontWeight: 'bold', color: '#333333'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="成果内容"
            layout={{width: '100%', marginBottom: 30}}
            data={{"content": "近年来，学校在人工智能、新材料、生物医学工程等领域取得重大突破。获得国家科技进步奖5项，省部级科技奖30余项。与华为、腾讯、中科院等单位建立深度合作关系。", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '16px', color: '#666666', lineHeight: '1.6'}}]}
          />
          <mybricks.normal-pc.antd5.custom-button
            title="科研详情"
            layout={{width: 'fit-content'}}
            data={{"text": "查看科研详情", "type": "primary", "size": "large"}}
            styleAry={[{selector: '.button', css: {backgroundColor: '#1677FF', borderRadius: '8px'}}]}
          />
        </flex>
      </flex>
    </flex>

    <!-- 校园生活区域 -->
    <flex column title="校园生活区域" layout={{width: '100%', marginBottom: 80}} styleAry={[{selector: ':root', css: {backgroundColor: '#f8fafc', padding: '80px 0'}}]}>
      <flex column title="生活标题" layout={{width: '100%', alignItems: 'center', marginBottom: 50}}>
        <mybricks.normal-pc.antd5.text
          title="生活标题"
          layout={{width: 'fit-content', marginBottom: 10}}
          data={{"content": "校园生活", "align": "center"}}
          styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '36px', fontWeight: 'bold', color: '#1677FF'}}]}
        />
        <flex column title="标题下划线" layout={{width: 80, height: 3}} styleAry={[{selector: ':root', css: {backgroundColor: '#1677FF'}}]}>
        </flex>
      </flex>
      
      <flex row title="活动展示" layout={{width: '100%', marginLeft: 80, marginRight: 80, justifyContent: 'space-between'}}>
        <flex column title="学生活动" layout={{width: 300}} styleAry={[{selector: ':root', css: {backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)'}}]}>
          <mybricks.normal-pc.antd5.single-image
            title="活动图片1"
            layout={{width: 260, height: 180, marginBottom: 20}}
            data={{"src": "https://ai.mybricks.world/image-search?term=university+students+activities&w=260&h=180", "objectFit": "cover"}}
            styleAry={[{selector: '.img', css: {borderRadius: '8px'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="活动标题1"
            layout={{width: '100%', marginBottom: 10}}
            data={{"content": "学生社团活动", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '18px', fontWeight: 'bold', color: '#333333'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="活动描述1"
            layout={{width: '100%'}}
            data={{"content": "丰富多彩的社团活动，包括文艺演出、学术讲座、体育竞赛等。", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#666666', lineHeight: '1.5'}}]}
          />
        </flex>
        
        <flex column title="社团组织" layout={{width: 300}} styleAry={[{selector: ':root', css: {backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)'}}]}>
          <mybricks.normal-pc.antd5.single-image
            title="活动图片2"
            layout={{width: 260, height: 180, marginBottom: 20}}
            data={{"src": "https://ai.mybricks.world/image-search?term=university+student+organizations&w=260&h=180", "objectFit": "cover"}}
            styleAry={[{selector: '.img', css: {borderRadius: '8px'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="活动标题2"
            layout={{width: '100%', marginBottom: 10}}
            data={{"content": "社团组织", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '18px', fontWeight: 'bold', color: '#333333'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="活动描述2"
            layout={{width: '100%'}}
            data={{"content": "拥有100+个学生社团，涵盖学术、文艺、体育、公益等各个领域。", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#666666', lineHeight: '1.5'}}]}
          />
        </flex>
        
        <flex column title="校园设施" layout={{width: 300}} styleAry={[{selector: ':root', css: {backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)'}}]}>
          <mybricks.normal-pc.antd5.single-image
            title="活动图片3"
            layout={{width: 260, height: 180, marginBottom: 20}}
            data={{"src": "https://ai.mybricks.world/image-search?term=university+campus+facilities&w=260&h=180", "objectFit": "cover"}}
            styleAry={[{selector: '.img', css: {borderRadius: '8px'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="活动标题3"
            layout={{width: '100%', marginBottom: 10}}
            data={{"content": "校园设施", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '18px', fontWeight: 'bold', color: '#333333'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="活动描述3"
            layout={{width: '100%'}}
            data={{"content": "现代化的图书馆、体育馆、食堂等设施，为学生提供优质的学习生活环境。", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#666666', lineHeight: '1.5'}}]}
          />
        </flex>
      </flex>
    </flex>

    <!-- 页脚区域 -->
    <flex column title="页脚区域" layout={{width: '100%'}} styleAry={[{selector: ':root', css: {backgroundColor: '#001529', padding: '60px 0 40px 0'}}]}>
      <flex row title="页脚内容" layout={{width: '100%', marginLeft: 80, marginRight: 80, justifyContent: 'space-between', marginBottom: 40}}>
        <flex column title="联系信息" layout={{width: 300}}>
          <mybricks.normal-pc.antd5.text
            title="联系标题"
            layout={{width: '100%', marginBottom: 20}}
            data={{"content": "联系我们", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '20px', fontWeight: 'bold', color: '#ffffff'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="地址"
            layout={{width: '100%', marginBottom: 15}}
            data={{"content": "地址：北京市海淀区中关村南大街5号", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#ffffff', opacity: 0.8}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="电话"
            layout={{width: '100%', marginBottom: 15}}
            data={{"content": "电话：010-68918888", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#ffffff', opacity: 0.8}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="邮箱"
            layout={{width: '100%'}}
            data={{"content": "邮箱：info@university.edu.cn", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#ffffff', opacity: 0.8}}]}
          />
        </flex>
        
        <flex column title="快速链接" layout={{width: 200}}>
          <mybricks.normal-pc.antd5.text
            title="链接标题"
            layout={{width: '100%', marginBottom: 20}}
            data={{"content": "快速链接", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '20px', fontWeight: 'bold', color: '#ffffff'}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="链接1"
            layout={{width: '100%', marginBottom: 10}}
            data={{"content": "教务系统", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#ffffff', opacity: 0.8}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="链接2"
            layout={{width: '100%', marginBottom: 10}}
            data={{"content": "图书馆", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#ffffff', opacity: 0.8}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="链接3"
            layout={{width: '100%', marginBottom: 10}}
            data={{"content": "学生服务", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#ffffff', opacity: 0.8}}]}
          />
          <mybricks.normal-pc.antd5.text
            title="链接4"
            layout={{width: '100%'}}
            data={{"content": "校友网", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#ffffff', opacity: 0.8}}]}
          />
        </flex>
        
        <flex column title="关注我们" layout={{width: 200}}>
          <mybricks.normal-pc.antd5.text
            title="关注标题"
            layout={{width: '100%', marginBottom: 20}}
            data={{"content": "关注我们", "align": "left"}}
            styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '20px', fontWeight: 'bold', color: '#ffffff'}}]}
          />
          <flex row title="社交媒体" layout={{alignItems: 'center'}}>
            <mybricks.normal-pc.antd5.icon
              title="微博"
              layout={{width: 32, height: 32, marginRight: 15}}
              data={{"icon": "WeiboOutlined"}}
              styleAry={[{selector: '.icon', css: {color: '#ffffff'}}]}
            />
            <mybricks.normal-pc.antd5.icon
              title="微信"
              layout={{width: 32, height: 32, marginRight: 15}}
              data={{"icon": "WechatOutlined"}}
              styleAry={[{selector: '.icon', css: {color: '#ffffff'}}]}
            />
            <mybricks.normal-pc.antd5.icon
              title="抖音"
              layout={{width: 32, height: 32}}
              data={{"icon": "TikTokOutlined"}}
              styleAry={[{selector: '.icon', css: {color: '#ffffff'}}]}
            />
          </flex>
        </flex>
      </flex>
      
      <flex column title="版权信息" layout={{width: '100%', alignItems: 'center'}} styleAry={[{selector: ':root', css: {borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px'}}]}>
        <mybricks.normal-pc.antd5.text
          title="版权"
          layout={{width: 'fit-content'}}
          data={{"content": "© 2024 北京理工大学 版权所有 | 京ICP备15016654号", "align": "center"}}
          styleAry={[{selector: '[data-item-type="root"]', css: {fontSize: '14px', color: '#ffffff', opacity: 0.6}}]}
        />
      </flex>
    </flex>
</page>
\`\`\`

我为您搭建了一个完整的现代简约风格大学官网，包含以下主要特色：

## 设计亮点

1. **现代简约风格**：采用简洁的设计语言，大量留白，突出内容重点
2. **渐变背景**：使用蓝紫色渐变背景，营造科技感和现代感
3. **响应式布局**：所有组件都采用自适应布局，确保在不同屏幕尺寸下都能良好显示

## 页面结构

1. **顶部导航栏**：包含校徽、学校名称和主导航菜单
2. **主横幅区域**：大图背景配上遮罩层，突出学校slogan和主要操作
3. **学校简介**：图文并茂展示学校历史和现任领导
4. **院系设置**：用卡片式布局展示不同学院，每个学院有独特的配色
5. **招生就业**：左右布局展示招生政策和就业指导
6. **新闻公告**：左右分栏显示学校新闻和通知公告
7. **学术科研**：数据统计+图文介绍的形式展示科研实力
8. **校园生活**：三栏卡片展示学生活动和校园设施
9. **页脚区域**：深色背景，包含联系信息、快速链接和社交媒体

## 设计特色

- **配色方案**：主要使用蓝色系（#1677FF）作为主色调，搭配绿色、橙色等辅助色
- **卡片设计**：大量使用圆角卡片，增加层次感和现代感
- **阴影效果**：适当使用阴影，增强立体感
- **图标运用**：使用Antd图标库，保持视觉统一性
- **渐变背景**：在多个区域使用渐变背景，增加视觉吸引力

整个网站信息架构清晰，视觉层次分明，既体现了大学的专业性和权威性，又展现了现代化的设计理念。`