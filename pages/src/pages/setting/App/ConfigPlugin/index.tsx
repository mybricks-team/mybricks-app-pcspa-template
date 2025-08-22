import React, { useState } from "react";
import { Card, Button, Popconfirm, Descriptions, message, Typography, Divider } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import css from './index.less';
import { _NAMESPACE_ } from "..";
import { EnumPluginType, PluginType } from "./type";
import AppendModal, { pluginTypeMap } from "./Modal";
import { TConfigProps } from "../useConfig";

export default ({ config, mergeUpdateConfig, loading, user }: TConfigProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [status, setStatus] = useState<"edit" | "append">();
  const [currentPlugin, setCurrentPlugin] = useState<PluginType & { index: number }>({});

  const plugins: PluginType[] = config?.plugins || [];

  const onOk = async (values) => {
    setVisible(false);
    const updateTime = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    if (status === "edit") {
      plugins.splice(currentPlugin.index, 1, {
        ...values,
        user: {
          email: user?.email
        },
        updateTime,
      });
    } else if (status === "append") {
      if (plugins.find((plugin) => plugin.name === values.name)) {
        message.info("添加失败：已存在name标识相同的插件！");
        return;
      }
      plugins.push({
        ...values,
        user: {
          email: user?.email
        },
        updateTime,
      });
    }
    mergeUpdateConfig({
      plugins
    })
    message.success(status === "edit" ? "更新成功" : "添加成功");
  };
  const onCancel = () => {
    setVisible(false);
  };

  const onAdd = () => {
    setCurrentPlugin({});
    setStatus("append");
    setVisible(true);
  };

  const onEdit = (plugin: PluginType, index: number) => {
    setCurrentPlugin({ ...plugin, index });
    setStatus("edit");
    setVisible(true);
  };

  const onDelete = async (index: number) => {
    plugins.splice(index, 1);
    mergeUpdateConfig({ plugins });
  };

  return (
    <>
      {plugins.map((plugin, index) => {
        const { title, name, url, disabled, runtimeUrl, description, updateTime, user, type = EnumPluginType } = plugin;
        return <>
          <Descriptions
            title={title}
            column={1}
            labelStyle={{
              fontWeight: '500'
            }}
            extra={
              <>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => { onEdit(plugin, index) }}
                >
                  编辑
                </Button>
                <Popconfirm
                  title={`确定删除插件 ${plugin.title} 吗？`}
                  onConfirm={() => { onDelete(index) }}
                  okText="确定"
                  cancelText="再想想"
                >
                  <Button
                    type="link"
                    icon={<DeleteOutlined />}
                  >
                    删除
                  </Button>
                </Popconfirm>
              </>
            }
          >
            <Descriptions.Item label="唯一标识">{name}</Descriptions.Item>
            <Descriptions.Item label="插件类型">{pluginTypeMap[String(type)]}</Descriptions.Item>
            {/* <Descriptions.Item label="是否禁用">{disabled ? '已禁用' : '未禁用'}</Descriptions.Item> */}
            <Descriptions.Item label="资源地址">{url}</Descriptions.Item>
            <Descriptions.Item label="runtime地址">{runtimeUrl}</Descriptions.Item>
            <Descriptions.Item label="更新信息">{description}</Descriptions.Item>
          </Descriptions>
          <Typography.Paragraph type="secondary" style={{ textAlign: 'right' }}>
            {user?.email} 更新于 {updateTime}
          </Typography.Paragraph>
          <Divider />
        </>
      })}
      <Button type="dashed" onClick={onAdd} block icon={<PlusOutlined />}>
        添加插件
      </Button>
      <AppendModal
        visible={visible}
        status={status}
        plugin={currentPlugin}
        onOk={onOk}
        onCancel={onCancel}
      />
    </>
  );
};
