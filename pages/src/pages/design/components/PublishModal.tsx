import React, { useEffect, useMemo, useState } from "react";
import { Modal, Select, Form, Radio, Space, Button, ModalProps } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { USE_CUSTOM_HOST } from "../constants";

export enum EnumMode {
  DEFAULT,
  ENV,
  CUSTOM
}

export default ({
  visible,
  onOk,
  onCancel,
  onOkAndDownload,
  envList,
  projectId
}: ModalProps & { envList: Array<any>, projectId?: string, onOk: (publishConfig: any) => void, onOkAndDownload: (publishConfig: any) => void}) => {

  const [mode, setMode] = useState(envList.length > 0 ? EnumMode.ENV : EnumMode.DEFAULT)
  const [form] = Form.useForm();

  const _onOk = () => {
    form
      .validateFields()
      .then((values) => {
        let { envType, commitInfo } = values
        if (mode === EnumMode.CUSTOM) {
          envType = USE_CUSTOM_HOST
        }
        onOk({
          envType,
          commitInfo
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const _onOkAndDownload= () => {
    form
      .validateFields()
      .then((values) => {
        let { envType, commitInfo } = values
        if (mode === EnumMode.CUSTOM) {
          envType = USE_CUSTOM_HOST
        }
        onOkAndDownload({
          envType,
          commitInfo
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const envOptions = useMemo(() => {
    return envList.map(item => ({
      value: item.name,
      label: item.title
    }))
  }, [envList])

  const hasEnv = envOptions.length > 0

  useEffect(() => {
    if (visible) {
      form.resetFields()
    }
  }, [visible])

  return (
    <Modal
      visible={visible}
      width={600}
      title={"选择发布环境"}
      closable={false}
      okText="发布"
      cancelText="取消"
      maskClosable={false}
      onOk={_onOk}
      onCancel={onCancel}
      footer={
        <Space>
          <Button onClick={onCancel}>取消</Button>
          {/* <Button onClick={_onOkAndDownload}>发布并下载</Button> */}
          <Button type="primary" onClick={_onOk}>发布</Button>
        </Space>
      }
      zIndex={1001}
    >
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
        {projectId
          ? null
          : <Form.Item
            label="发布模式"
            name="mode"
            required
          >
            <Radio.Group defaultValue={mode} onChange={e => setMode(e.target.value)}>
              {hasEnv ? <Radio value={EnumMode.ENV}>选择环境</Radio> : <Radio value={EnumMode.DEFAULT}>默认</Radio>}
              <Radio value={EnumMode.CUSTOM}>自定义域名</Radio>
            </Radio.Group>
          </Form.Item>
        }
        {mode === EnumMode.ENV && <Form.Item
          label="发布环境"
          name="envType"
          required
          rules={[{ required: true, message: "请选择发布环境" }]}
        >
          <Select options={envOptions} placeholder="请选择发布环境" />
        </Form.Item>}
        <Form.Item
          label="发布内容"
          name="commitInfo"
          required
          rules={[{ required: true, message: "请填写本次发布的内容" }, { min: 4, message: '发布的内容不少于四个字' }]}
        >
          <TextArea placeholder="请输入本次发布的内容" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
