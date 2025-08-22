import React, { useEffect, useMemo } from "react";
import { Modal, Form, Input, ModalProps } from "antd";
import { TPublishEnv } from "./index";

interface AppendModalProps
  extends ModalProps,
  Partial<{
    status: "edit" | "append";
    publishEnv: TPublishEnv;
  }> { }

export default ({
  status,
  visible,
  publishEnv,
  onOk,
  onCancel,
}: AppendModalProps) => {
  const [form] = Form.useForm();
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
    () => (status === "edit" ? "更新环境信息" : "添加新环境"),
    [status]
  );

  useEffect(() => {
    form.setFieldsValue(publishEnv);
    return () => form.resetFields();
  }, [publishEnv, visible]);

  return (
    <Modal
      visible={visible}
      width={600}
      title={title}
      closable={false}
      okText="保存"
      cancelText="取消"
      maskClosable={false}
      onOk={_onOk}
      onCancel={onCancel}
    >
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
        <Form.Item
          label="title"
          name="title"
          required
          rules={[{ required: true, message: "请输入环境标题" }]}
        >
          <Input placeholder="开发/测试/线上..." />
        </Form.Item>
        <Form.Item
          label="name"
          name="name"
          required
          rules={[{ required: true, message: "请输入环境的名称" }]}
        >
          <Input disabled={status === "edit"} placeholder="dev/test/prod..." />
        </Form.Item>
        <Form.Item
          label="接口默认前缀"
          name="defaultApiPrePath"
          tooltip="该环境下发起的请求会自动带上此前缀（不包含已有域名前缀的接口）"
          rules={[
            { pattern: /^https?:\/\/.+$/, message: "请输入正确的url地址" },
          ]}
        >
          <Input placeholder="https://my.mybricks.world/publish" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
