export default `M:好的，我来为您搭建一个现代简约风格的大学官网。我将按照PRD需求，创建一个内容丰富、布局合理、美观大气的大学官网页面。

\`\`\`dsl file="page.dsl"
<page title="大学官网" style={{backgroundColor: "#f8f9fa"}}>
  <flex column title="网站头部" layout={{width: '100%', height: 80}} styleAry={[{ selector: ':root', css: { backgroundColor: '#ffffff', borderBottom: '1px solid #e8e8e8' } }]}>
    <flex row title="头部内容" layout={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-between', marginLeft: 60, marginRight: 60}}>
      <flex row title="Logo区域" layout={{alignItems: 'center'}}>
        <mybricks.normal-pc.antd5.single-image
          title="学校Logo"
          layout={{width: 50, height: 50, marginRight: 15}}
          data={{"src": "https://placehold.co/50x50/2563eb/ffffff?text=LOGO", "objectFit": "cover"}}
        />
        <mybricks.normal-pc.antd5.text
          title="学校名称"
          layout={{width: 'fit-content'}}
          data={{"content": "华夏大学", "align": "left"}}
          styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1e40af', fontSize: '24px', fontWeight: 'bold' } }]}
        />
      </flex>
      <mybricks.normal-pc.antd5.menu
        title="主导航"
        layout={{width: 'fit-content'}}
        data={{"dataSource": [
          {"key": "about", "title": "学校简介", "menuType": "menu", "defaultActive": true},
          {"key": "departments", "title": "院系设置", "menuType": "menu"},
          {"key": "admission", "title": "招生就业", "menuType": "menu"},
          {"key": "news", "title": "新闻公告", "menuType": "menu"},
          {"key": "research", "title": "学术科研", "menuType": "menu"},
          {"key": "campus", "title": "校园生活", "menuType": "menu"},
          {"key": "contact", "title": "联系我们", "menuType": "menu"}
        ], "mode": "horizontal"}}
        styleAry={[
          { selector: '.ul li:not(.ant-menu-item-selected)', css: { color: '#4b5563', fontSize: '16px' } },
          { selector: '.ul li.ant-menu-item-selected', css: { color: '#2563eb', fontSize: '16px' } },
          { selector: 'ul li.ant-menu-item-selected:after', css: { borderColor: '#2563eb', borderWidth: '3px' } }
        ]}
      />
    </flex>
  </flex>

  <flex column title="英雄区域" layout={{width: '100%', height: 500}} styleAry={[{ selector: ':root', css: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', position: 'relative' } }]}>
    <flex column title="英雄内容" layout={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <mybricks.normal-pc.antd5.text
        title="主标题"
        layout={{width: 'fit-content', marginBottom: 20}}
        data={{"content": "培养未来领袖，创造美好明天", "align": "center"}}
        styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#ffffff', fontSize: '48px', fontWeight: 'bold' } }]}
      />
      <mybricks.normal-pc.antd5.text
        title="副标题"
        layout={{width: 'fit-content', marginBottom: 40}}
        data={{"content": "华夏大学致力于为社会培养高素质人才，推动科技创新与社会发展", "align": "center"}}
        styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#ffffff', fontSize: '20px', opacity: '0.9' } }]}
      />
      <flex row title="按钮组" layout={{alignItems: 'center'}}>
        <mybricks.normal-pc.antd5.custom-button
          title="了解更多"
          layout={{width: 'fit-content', marginRight: 20}}
          data={{"text": "了解更多", "type": "primary", "size": "large"}}
          styleAry={[{ selector: '.button', css: { backgroundColor: '#ffffff', color: '#2563eb', borderRadius: '25px', padding: '12px 32px' } }]}
        />
        <mybricks.normal-pc.antd5.custom-button
          title="招生信息"
          layout={{width: 'fit-content'}}
          data={{"text": "招生信息", "type": "ghost", "size": "large"}}
          styleAry={[{ selector: '.button', css: { border: '2px solid #ffffff', color: '#ffffff', borderRadius: '25px', padding: '12px 32px' } }]}
        />
      </flex>
    </flex>
  </flex>

  <flex column title="学校简介区域" layout={{width: '100%', marginTop: 80, marginBottom: 80}}>
    <flex column title="简介内容" layout={{width: '100%', alignItems: 'center', marginLeft: 60, marginRight: 60}}>
      <mybricks.normal-pc.antd5.text
        title="区域标题"
        layout={{width: 'fit-content', marginBottom: 50}}
        data={{"content": "学校简介", "align": "center"}}
        styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1e40af', fontSize: '36px', fontWeight: 'bold' } }]}
      />
      <flex row title="简介内容区" layout={{width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
        <flex column title="左侧文本" layout={{width: 500}}>
          <mybricks.normal-pc.antd5.text
            title="历史沿革标题"
            layout={{width: 'fit-content', marginBottom: 20}}
            data={{"content": "历史沿革", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1f2937', fontSize: '24px', fontWeight: 'bold' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="历史沿革内容"
            layout={{width: 'fit-content', marginBottom: 30}}
            data={{"content": "华夏大学创建于1952年，是一所历史悠久的综合性大学。经过70多年的发展，学校已成为国内知名的高等学府，培养了数十万优秀人才。", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#6b7280', fontSize: '16px', lineHeight: '1.6' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="现任领导标题"
            layout={{width: 'fit-content', marginBottom: 20}}
            data={{"content": "现任领导", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1f2937', fontSize: '24px', fontWeight: 'bold' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="现任领导内容"
            layout={{width: 'fit-content'}}
            data={{"content": "学校现任校长张明教授，党委书记李华教授，副校长王强教授等组成的领导班子，致力于推动学校的全面发展。", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#6b7280', fontSize: '16px', lineHeight: '1.6' } }]}
          />
        </flex>
        <mybricks.normal-pc.antd5.single-image
          title="学校建筑"
          layout={{width: 400, height: 300}}
          data={{"src": "https://ai.mybricks.world/image-search?term=university&w=400&h=300", "objectFit": "cover"}}
          styleAry={[{ selector: '.img', css: { borderRadius: '12px' } }]}
        />
      </flex>
    </flex>
  </flex>

  <flex column title="院系设置区域" layout={{width: '100%', marginBottom: 80}} styleAry={[{ selector: ':root', css: { backgroundColor: '#f8fafc', padding: '80px 0' } }]}>
    <flex column title="院系内容" layout={{width: '100%', alignItems: 'center', marginLeft: 60, marginRight: 60}}>
      <mybricks.normal-pc.antd5.text
        title="院系标题"
        layout={{width: 'fit-content', marginBottom: 50}}
        data={{"content": "院系设置", "align": "center"}}
        styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1e40af', fontSize: '36px', fontWeight: 'bold' } }]}
      />
      <flex row title="院系卡片区" layout={{width: '100%', justifyContent: 'space-between'}}>
        <flex column title="工学院" layout={{width: 300, height: 200}} styleAry={[{ selector: ':root', css: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' } }]}>
          <mybricks.normal-pc.antd5.icon
            title="工学院图标"
            layout={{width: 48, height: 48, marginBottom: 20}}
            data={{"icon": "SettingOutlined"}}
            styleAry={[{ selector: '.icon', css: { color: '#2563eb' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="工学院名称"
            layout={{width: 'fit-content', marginBottom: 15}}
            data={{"content": "工学院", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1f2937', fontSize: '20px', fontWeight: 'bold' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="工学院介绍"
            layout={{width: 'fit-content'}}
            data={{"content": "拥有机械工程、电气工程、计算机科学等多个专业，培养高级工程技术人才。", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#6b7280', fontSize: '14px', lineHeight: '1.5' } }]}
          />
        </flex>
        <flex column title="商学院" layout={{width: 300, height: 200}} styleAry={[{ selector: ':root', css: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' } }]}>
          <mybricks.normal-pc.antd5.icon
            title="商学院图标"
            layout={{width: 48, height: 48, marginBottom: 20}}
            data={{"icon": "DollarOutlined"}}
            styleAry={[{ selector: '.icon', css: { color: '#059669' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="商学院名称"
            layout={{width: 'fit-content', marginBottom: 15}}
            data={{"content": "商学院", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1f2937', fontSize: '20px', fontWeight: 'bold' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="商学院介绍"
            layout={{width: 'fit-content'}}
            data={{"content": "涵盖工商管理、市场营销、金融学等专业，培养现代商业管理人才。", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#6b7280', fontSize: '14px', lineHeight: '1.5' } }]}
          />
        </flex>
        <flex column title="文学院" layout={{width: 300, height: 200}} styleAry={[{ selector: ':root', css: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' } }]}>
          <mybricks.normal-pc.antd5.icon
            title="文学院图标"
            layout={{width: 48, height: 48, marginBottom: 20}}
            data={{"icon": "ReadOutlined"}}
            styleAry={[{ selector: '.icon', css: { color: '#dc2626' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="文学院名称"
            layout={{width: 'fit-content', marginBottom: 15}}
            data={{"content": "文学院", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1f2937', fontSize: '20px', fontWeight: 'bold' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="文学院介绍"
            layout={{width: 'fit-content'}}
            data={{"content": "设有中文、英语、历史等专业，致力于培养文化传承与创新人才。", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#6b7280', fontSize: '14px', lineHeight: '1.5' } }]}
          />
        </flex>
      </flex>
    </flex>
  </flex>

  <flex column title="招生就业区域" layout={{width: '100%', marginBottom: 80}}>
    <flex column title="招生就业内容" layout={{width: '100%', alignItems: 'center', marginLeft: 60, marginRight: 60}}>
      <mybricks.normal-pc.antd5.text
        title="招生就业标题"
        layout={{width: 'fit-content', marginBottom: 50}}
        data={{"content": "招生就业", "align": "center"}}
        styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1e40af', fontSize: '36px', fontWeight: 'bold' } }]}
      />
      <flex row title="招生就业卡片" layout={{width: '100%', justifyContent: 'space-between'}}>
        <flex column title="招生政策" layout={{width: 480, height: 300}} styleAry={[{ selector: ':root', css: { backgroundColor: '#fef3c7', borderRadius: '12px', padding: '40px', backgroundImage: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' } }]}>
          <mybricks.normal-pc.antd5.text
            title="招生政策标题"
            layout={{width: 'fit-content', marginBottom: 20}}
            data={{"content": "招生政策", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#92400e', fontSize: '24px', fontWeight: 'bold' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="招生政策内容"
            layout={{width: 'fit-content', marginBottom: 30}}
            data={{"content": "2024年招生计划已发布，包含各专业招生名额、录取分数线、特殊类型招生等详细信息。欢迎优秀学子报考！", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#78350f', fontSize: '16px', lineHeight: '1.6' } }]}
          />
          <mybricks.normal-pc.antd5.custom-button
            title="查看详情"
            layout={{width: 'fit-content'}}
            data={{"text": "查看详情", "type": "primary", "size": "middle"}}
            styleAry={[{ selector: '.button', css: { backgroundColor: '#d97706', borderRadius: '8px' } }]}
          />
        </flex>
        <flex column title="就业指导" layout={{width: 480, height: 300}} styleAry={[{ selector: ':root', css: { backgroundColor: '#dbeafe', borderRadius: '12px', padding: '40px', backgroundImage: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' } }]}>
          <mybricks.normal-pc.antd5.text
            title="就业指导标题"
            layout={{width: 'fit-content', marginBottom: 20}}
            data={{"content": "就业指导", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1e40af', fontSize: '24px', fontWeight: 'bold' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="就业指导内容"
            layout={{width: 'fit-content', marginBottom: 30}}
            data={{"content": "学校为学生提供全方位就业指导服务，包括职业规划、简历制作、面试技巧等，毕业生就业率连续多年保持在95%以上。", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1e40af', fontSize: '16px', lineHeight: '1.6' } }]}
          />
          <mybricks.normal-pc.antd5.custom-button
            title="了解更多"
            layout={{width: 'fit-content'}}
            data={{"text": "了解更多", "type": "primary", "size": "middle"}}
            styleAry={[{ selector: '.button', css: { backgroundColor: '#2563eb', borderRadius: '8px' } }]}
          />
        </flex>
      </flex>
    </flex>
  </flex>

  <flex column title="新闻公告区域" layout={{width: '100%', marginBottom: 80}} styleAry={[{ selector: ':root', css: { backgroundColor: '#f1f5f9', padding: '80px 0' } }]}>
    <flex column title="新闻公告内容" layout={{width: '100%', alignItems: 'center', marginLeft: 60, marginRight: 60}}>
      <mybricks.normal-pc.antd5.text
        title="新闻公告标题"
        layout={{width: 'fit-content', marginBottom: 50}}
        data={{"content": "新闻公告", "align": "center"}}
        styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1e40af', fontSize: '36px', fontWeight: 'bold' } }]}
      />
      <flex row title="新闻列表" layout={{width: '100%', justifyContent: 'space-between'}}>
        <flex column title="新闻1" layout={{width: 310, height: 250}} styleAry={[{ selector: ':root', css: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' } }]}>
          <mybricks.normal-pc.antd5.single-image
            title="新闻图片1"
            layout={{width: 260, height: 120, marginBottom: 20}}
            data={{"src": "https://ai.mybricks.world/image-search?term=university-news&w=260&h=120", "objectFit": "cover"}}
            styleAry={[{ selector: '.img', css: { borderRadius: '8px' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="新闻标题1"
            layout={{width: 'fit-content', marginBottom: 10}}
            data={{"content": "我校荣获国家级教学成果奖", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1f2937', fontSize: '16px', fontWeight: 'bold' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="新闻内容1"
            layout={{width: 'fit-content'}}
            data={{"content": "近日，我校教学团队凭借创新教学方法荣获国家级教学成果奖，这是对我校教育质量的充分肯定。", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#6b7280', fontSize: '14px', lineHeight: '1.5' } }]}
          />
        </flex>
        <flex column title="新闻2" layout={{width: 310, height: 250}} styleAry={[{ selector: ':root', css: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' } }]}>
          <mybricks.normal-pc.antd5.single-image
            title="新闻图片2"
            layout={{width: 260, height: 120, marginBottom: 20}}
            data={{"src": "https://ai.mybricks.world/image-search?term=campus-activity&w=260&h=120", "objectFit": "cover"}}
            styleAry={[{ selector: '.img', css: { borderRadius: '8px' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="新闻标题2"
            layout={{width: 'fit-content', marginBottom: 10}}
            data={{"content": "第十五届校园文化艺术节开幕", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1f2937', fontSize: '16px', fontWeight: 'bold' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="新闻内容2"
            layout={{width: 'fit-content'}}
            data={{"content": "校园文化艺术节隆重开幕，为期一个月的活动将展示师生的才华和创意，丰富校园文化生活。", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#6b7280', fontSize: '14px', lineHeight: '1.5' } }]}
          />
        </flex>
        <flex column title="新闻3" layout={{width: 310, height: 250}} styleAry={[{ selector: ':root', css: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' } }]}>
          <mybricks.normal-pc.antd5.single-image
            title="新闻图片3"
            layout={{width: 260, height: 120, marginBottom: 20}}
            data={{"src": "https://ai.mybricks.world/image-search?term=research-lab&w=260&h=120", "objectFit": "cover"}}
            styleAry={[{ selector: '.img', css: { borderRadius: '8px' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="新闻标题3"
            layout={{width: 'fit-content', marginBottom: 10}}
            data={{"content": "重点实验室获批国家级项目", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1f2937', fontSize: '16px', fontWeight: 'bold' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="新闻内容3"
            layout={{width: 'fit-content'}}
            data={{"content": "我校人工智能重点实验室成功获批国家级科研项目，项目资金达1000万元。", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#6b7280', fontSize: '14px', lineHeight: '1.5' } }]}
          />
        </flex>
      </flex>
    </flex>
  </flex>

  <flex column title="校园生活区域" layout={{width: '100%', marginBottom: 80}}>
    <flex column title="校园生活内容" layout={{width: '100%', alignItems: 'center', marginLeft: 60, marginRight: 60}}>
      <mybricks.normal-pc.antd5.text
        title="校园生活标题"
        layout={{width: 'fit-content', marginBottom: 50}}
        data={{"content": "校园生活", "align": "center"}}
        styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1e40af', fontSize: '36px', fontWeight: 'bold' } }]}
      />
      <flex row title="校园生活展示" layout={{width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
        <mybricks.normal-pc.antd5.single-image
          title="校园生活图片"
          layout={{width: 500, height: 350}}
          data={{"src": "https://ai.mybricks.world/image-search?term=campus-life&w=500&h=350", "objectFit": "cover"}}
          styleAry={[{ selector: '.img', css: { borderRadius: '12px' } }]}
        />
        <flex column title="校园生活文本" layout={{width: 450}}>
          <mybricks.normal-pc.antd5.text
            title="学生活动标题"
            layout={{width: 'fit-content', marginBottom: 20}}
            data={{"content": "丰富多彩的学生活动", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1f2937', fontSize: '24px', fontWeight: 'bold' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="学生活动内容"
            layout={{width: 'fit-content', marginBottom: 30}}
            data={{"content": "学校拥有100多个学生社团，涵盖学术、文艺、体育、公益等各个领域。每年举办文化艺术节、体育赛事、学术论坛等活动，为学生提供展示才华的平台。", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#6b7280', fontSize: '16px', lineHeight: '1.6' } }]}
          />
          <flex row title="活动特色" layout={{width: '100%', justifyContent: 'space-between'}}>
            <flex column title="特色1" layout={{width: 130, alignItems: 'center'}}>
              <mybricks.normal-pc.antd5.icon
                title="社团图标"
                layout={{width: 40, height: 40, marginBottom: 10}}
                data={{"icon": "TeamOutlined"}}
                styleAry={[{ selector: '.icon', css: { color: '#2563eb' } }]}
              />
              <mybricks.normal-pc.antd5.text
                title="社团数量"
                layout={{width: 'fit-content'}}
                data={{"content": "100+社团", "align": "center"}}
                styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1f2937', fontSize: '16px', fontWeight: 'bold' } }]}
              />
            </flex>
            <flex column title="特色2" layout={{width: 130, alignItems: 'center'}}>
              <mybricks.normal-pc.antd5.icon
                title="活动图标"
                layout={{width: 40, height: 40, marginBottom: 10}}
                data={{"icon": "CalendarOutlined"}}
                styleAry={[{ selector: '.icon', css: { color: '#059669' } }]}
              />
              <mybricks.normal-pc.antd5.text
                title="活动数量"
                layout={{width: 'fit-content'}}
                data={{"content": "年均300+活动", "align": "center"}}
                styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1f2937', fontSize: '16px', fontWeight: 'bold' } }]}
              />
            </flex>
            <flex column title="特色3" layout={{width: 130, alignItems: 'center'}}>
              <mybricks.normal-pc.antd5.icon
                title="参与图标"
                layout={{width: 40, height: 40, marginBottom: 10}}
                data={{"icon": "UserOutlined"}}
                styleAry={[{ selector: '.icon', css: { color: '#dc2626' } }]}
              />
              <mybricks.normal-pc.antd5.text
                title="参与率"
                layout={{width: 'fit-content'}}
                data={{"content": "98%参与率", "align": "center"}}
                styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#1f2937', fontSize: '16px', fontWeight: 'bold' } }]}
              />
            </flex>
          </flex>
        </flex>
      </flex>
    </flex>
  </flex>

  <flex column title="网站尾部" layout={{width: '100%', height: 250}} styleAry={[{ selector: ':root', css: { backgroundColor: '#1f2937', padding: '50px 0' } }]}>
    <flex column title="尾部内容" layout={{width: '100%', alignItems: 'center', marginLeft: 60, marginRight: 60}}>
      <mybricks.normal-pc.antd5.text
        title="联系我们标题"
        layout={{width: 'fit-content', marginBottom: 30}}
        data={{"content": "联系我们", "align": "center"}}
        styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#ffffff', fontSize: '28px', fontWeight: 'bold' } }]}
      />
      <flex row title="联系信息" layout={{width: '100%', justifyContent: 'space-between'}}>
        <flex column title="地址信息" layout={{width: 300}}>
          <mybricks.normal-pc.antd5.text
            title="地址标题"
            layout={{width: 'fit-content', marginBottom: 10}}
            data={{"content": "学校地址", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#e5e7eb', fontSize: '18px', fontWeight: 'bold' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="地址内容"
            layout={{width: 'fit-content'}}
            data={{"content": "北京市海淀区学院路100号", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#9ca3af', fontSize: '16px' } }]}
          />
        </flex>
        <flex column title="联系电话" layout={{width: 300}}>
          <mybricks.normal-pc.antd5.text
            title="电话标题"
            layout={{width: 'fit-content', marginBottom: 10}}
            data={{"content": "联系电话", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#e5e7eb', fontSize: '18px', fontWeight: 'bold' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="电话内容"
            layout={{width: 'fit-content'}}
            data={{"content": "010-88888888", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#9ca3af', fontSize: '16px' } }]}
          />
        </flex>
        <flex column title="电子邮箱" layout={{width: 300}}>
          <mybricks.normal-pc.antd5.text
            title="邮箱标题"
            layout={{width: 'fit-content', marginBottom: 10}}
            data={{"content": "电子邮箱", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#e5e7eb', fontSize: '18px', fontWeight: 'bold' } }]}
          />
          <mybricks.normal-pc.antd5.text
            title="邮箱内容"
            layout={{width: 'fit-content'}}
            data={{"content": "info@hxu.edu.cn", "align": "left"}}
            styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#9ca3af', fontSize: '16px' } }]}
          />
        </flex>
      </flex>
      <mybricks.normal-pc.antd5.text
        title="版权信息"
        layout={{width: 'fit-content', marginTop: 30}}
        data={{"content": "© 2024 华夏大学 版权所有", "align": "center"}}
        styleAry={[{ selector: '[data-item-type="root"]', css: { color: '#6b7280', fontSize: '14px' } }]}
      />
    </flex>
  </flex>
</page>
\`\`\`

我已经为您搭建了一个完整的大学官网，包含以下特色：

## 页面结构
1. **顶部导航** - 包含学校Logo和主要导航菜单
2. **英雄区域** - 渐变背景的主视觉区域，突出学校形象
3. **学校简介** - 历史沿革和现任领导介绍
4. **院系设置** - 以卡片形式展示各学院特色
5. **招生就业** - 双卡片布局展示招生政策和就业指导
6. **新闻公告** - 三栏新闻卡片展示最新动态
7. **校园生活** - 图文结合展示丰富的校园活动
8. **联系我们** - 详细的联系信息

## 设计特色
- **现代简约风格** - 简洁的布局和清晰的视觉层次
- **丰富的色彩运用** - 蓝色主色调配合渐变背景
- **响应式布局** - 适配1024px画布宽度
- **视觉层次分明** - 通过颜色、字体大小、间距区分内容重要性
- **交互友好** - 清晰的导航和按钮设计

整个页面内容完整，涵盖了PRD中要求的所有功能模块，同时保持了现代大学官网应有的专业性和美观性。`