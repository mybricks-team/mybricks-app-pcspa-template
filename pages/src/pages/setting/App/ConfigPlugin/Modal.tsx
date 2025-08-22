import React, { useEffect, useMemo, useState } from "react";
import { Modal, Form, Input, ModalProps, Select, Switch } from "antd";
import { EnumPluginType, PluginType } from "./type";

export const pluginTypeMap = {
  [EnumPluginType.NORMAL]: '普通',
  [EnumPluginType.CONNECTOR]: '连接器'
}

interface AppendModalProps
  extends ModalProps,
  Partial<{
    status: "edit" | "append";
    plugin: PluginType;
  }> { }

export default ({
  status,
  visible,
  plugin = {},
  onOk,
  onCancel,
}: AppendModalProps) => {
  const [form] = Form.useForm();
  const [currentType, setCurrentType] = useState(EnumPluginType.NORMAL)
  const _onOk = () => {
    form
      .validateFields()
      .then((values) => {
        onOk(values);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const title = useMemo(
    () => (status === "edit" ? "更新插件" : "添加插件"),
    [status]
  );

  useEffect(() => {
    if (!plugin.type) {
      plugin.type = EnumPluginType.NORMAL
    }
    setCurrentType(plugin.type)
    form.setFieldsValue(plugin);
    return () => form.resetFields();
  }, [plugin, visible]);

  return (
    <Modal
      visible={visible}
      width={600}
      title={title}
      closable={true}
      okText="保存"
      cancelText="取消"
      maskClosable={false}
      onOk={_onOk}
      onCancel={onCancel}
    >
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
        <Form.Item
          label='插件标识'
          name='name'
          rules={[{ required: true, message: '请填写插件代码中定义的name' }]}
          tooltip="插件的唯一标识，与代码中的name一致"
        >
          <Input
            allowClear
          />
        </Form.Item>
        <Form.Item
          label='中文名称'
          name='title'
          rules={[{ required: true, message: '请填写插件名称' }]}
        >
          <Input
            allowClear
          />
        </Form.Item>
        <Form.Item
          label='插件类型'
          name='type'
          rules={[{ required: true, message: '请选择插件类型' }]}
        >
          <Select
            onChange={val => setCurrentType(val)}
            defaultValue={EnumPluginType.NORMAL}
            options={Object.keys(pluginTypeMap).map(item => ({
              label: pluginTypeMap[item],
              value: item
            }))} />
        </Form.Item>
        {/* <Form.Item
          label='是否禁用'
          name='disabled'
        >
          <Switch defaultChecked={plugin?.disabled} />
        </Form.Item> */}
        <Form.Item
          label="插件地址"
          name='url'
          rules={[{ required: true, message: '请填写插件地址' }]}
        >
          <Input.TextArea
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="runtime地址"
          name='runtimeUrl'
          rules={currentType === EnumPluginType.CONNECTOR ? [{ required: true, message: '请填写插件Runtime地址' }] : []}
          extra="搭建页发布后，生产环境使用"
        >
          <Input.TextArea allowClear />
        </Form.Item>
        <Form.Item
          label='更新信息'
          name='description'
        >
          <Input.TextArea
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
