import React, { useEffect, useState } from "react";
// import API from '@mybricks/sdk-for-app/api'

import ConfigServer from "./ConfigServer";
import ConfigEnv from "./ConfigEnv";
import useConfig from "./useConfig";
import ConfigPlugin from "./ConfigPlugin";
import ConfigBase from "./ConfigBase";
import ConfigDesigner from "./ConfigDesigner";
import ConfigComponent from "./ConfigComponent";
export const _NAMESPACE_ = APP_NAME;
import { Collapse, Spin } from "antd";
import I18nConfig from "./I18nConfig";
import ConfigFeature from "./ConfigFeature";
import ConfigLocalizeAssetPath from "./ConfigLocalizeAssetPath";

import style from "./app.less";

export default (props) => {
  const { options = {} } = props;
  const configContext = useConfig(_NAMESPACE_, {}, options);

  const isInGroup = options?.type === "group";

  return (
    <Spin spinning={configContext.loading}>
      <Collapse
        style={{ padding: 24 }}
        className={style.wrapper}
        defaultActiveKey={[0, 1, 2, 3, 4, "ConfigComponent"]}
      >
        <Collapse.Panel key={0} header="设计器">
          <ConfigDesigner {...configContext} />
        </Collapse.Panel>
        {!isInGroup && (
          <Collapse.Panel key={1} header="基础设置">
            <ConfigBase {...configContext} />
          </Collapse.Panel>
        )}
        {isInGroup && (
          <Collapse.Panel key={2} header="多语言配置">
            <I18nConfig {...configContext} />
          </Collapse.Panel>
        )}
        {isInGroup && (
          <Collapse.Panel key="ConfigComponent" header="组件配置">
            <ConfigComponent {...configContext} />
          </Collapse.Panel>
        )}
        <Collapse.Panel key={99} header="本地化文件路径">
          <ConfigLocalizeAssetPath {...configContext} />
        </Collapse.Panel>
        <Collapse.Panel key={3} header="服务扩展">
          <ConfigServer {...configContext} />
        </Collapse.Panel>

        {/* {!isInGroup && <Collapse.Panel key={1} header="基础设置">
          <ConfigBase {...configContext} />
        </Collapse.Panel>}
        {!isInGroup && <Collapse.Panel key={2} header="服务扩展">
          <ConfigServer {...configContext} />
        </Collapse.Panel>} */}
        <Collapse.Panel key={4} header="发布环境">
          <ConfigEnv {...configContext} />
        </Collapse.Panel>
        {!isInGroup && (
          <Collapse.Panel key={5} header="插件扩展">
            <ConfigPlugin {...configContext} />
          </Collapse.Panel>
        )}
        <Collapse.Panel key={6} header="实验室">
          <ConfigFeature {...configContext} />
        </Collapse.Panel>
      </Collapse>
    </Spin>
  );
};
