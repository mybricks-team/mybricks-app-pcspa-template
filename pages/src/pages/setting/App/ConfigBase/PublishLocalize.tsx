import React, { useEffect } from 'react'
import { Form, Card, Button, Switch, Input } from 'antd'
import { _NAMESPACE_ } from "..";
import dayjs from "dayjs";
import { TConfigProps } from '../useConfig';
const { Meta } = Card;

const fieldName = `needLocalization`

export default ({ config, mergeUpdateConfig, loading, user }: TConfigProps) => {
  const [form] = Form.useForm();

  const publishLocalizeConfig = config?.publishLocalizeConfig || {};
  console.log(config)
  useEffect(() => {
    form.setFieldsValue(publishLocalizeConfig)
  }, [publishLocalizeConfig]);

  const onSubmit = (values) => {
    const updateTime = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    mergeUpdateConfig({
      publishLocalizeConfig: {
        ...publishLocalizeConfig,
        [fieldName]: !!values[fieldName],
        isEncode: !!values.isEncode,
        enableCompatible: !!values.enableCompatible,
        enableAI: !!values.enableAI,
        selectAIModel: !!values.selectAIModel ? values.selectAIModel : undefined,
        updateTime,
        user: user?.email
      }
    });
  }

  const enableAI = Form.useWatch('enableAI', form);

  return <>
    <Form form={form} style={{ marginTop: 12 }}>
      <Form.Item
        name={fieldName}
        label="本地部署"
        tooltip="发布产物不会依赖公网资源"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        name="isEncode"
        label="数据编码"
        tooltip="开启后对保存、发布的数据进行编码，避免防火墙错误拦截"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        name="enableAI"
        label="启用AI服务"
        tooltip="开启后在页面上添加AI客服和辅助搭建能力"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      {
        enableAI && <Form.Item
          name="selectAIModel"
          label="指定AI模型"
        >
          <Input placeholder='不指定将使用默认模型' />
        </Form.Item>
      }
      <Form.Item
        name="enableCompatible"
        label="兼容低版本浏览器"
        tooltip="开启后对发布后的产物开启兼容模式，兼容IE11和火狐52版本"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item style={{ textAlign: 'right' }}>
        {Object.keys(publishLocalizeConfig).length > 0 && <Meta description={`${publishLocalizeConfig.user} 更新于 ${publishLocalizeConfig.updateTime}`} />}
        <Button type="primary" htmlType="submit" onClick={() => { onSubmit(form.getFieldsValue()) }}>
          保存
        </Button>
      </Form.Item>
    </Form>
  </>
}
