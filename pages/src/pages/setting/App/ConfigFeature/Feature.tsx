import React, { useEffect } from 'react'
import { Form, Card, Button, Switch } from 'antd'
import { _NAMESPACE_ } from "..";
import dayjs from "dayjs";
import { TConfigProps } from '../useConfig';
const { Meta } = Card;

export default ({ config, mergeUpdateConfig, loading, user }: TConfigProps) => {
  const [form] = Form.useForm();

  const feature = config?.feature || {};

  useEffect(() => {
    form.setFieldsValue(feature)
  }, [feature]);

  const onSubmit = (values) => {
    const updateTime = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    mergeUpdateConfig({
      feature: {
        ...feature,
        disableSmartLayout: values.disableSmartLayout,
        updateTime,
        user: user?.email
      }
    });
  }

  return <>
    <Form form={form} style={{ marginTop: 12 }}>
      <Form.Item
        name={"disableSmartLayout"}
        label="默认使用纵向布局"
        tooltip="关闭后，默认将使用智能布局，你也可以在开启本开关的情况下，手动将布局调整为智能布局"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item style={{ textAlign: 'right' }}>
        {Object.keys(feature).length > 0 && <Meta description={`${feature.user} 更新于 ${feature.updateTime}`} />}
        <Button type="primary" htmlType="submit" onClick={() => { onSubmit(form.getFieldsValue()) }}>
          保存
        </Button>
      </Form.Item>
    </Form>
  </>
}
