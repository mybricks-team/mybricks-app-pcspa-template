import React, { useEffect } from 'react'
import { Form, Input, Button, Card } from 'antd'
import dayjs from 'dayjs';
import { _NAMESPACE_ } from "..";
import { TConfigProps } from '../useConfig';

const configKey = `localizeAssetPathConfig`


export default ({ config, mergeUpdateConfig, loading, user }: TConfigProps) => {
  const [form] = Form.useForm();

  const localConfig = config?.[configKey] || { path: 'mfs/files' };
  useEffect(() => {
    form.setFieldsValue(localConfig);
  }, [localConfig]);

  const onSubmit = (values) => {
    const updateTime = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    mergeUpdateConfig({
      [configKey]: {
        ...localConfig,
        updateTime,
        user: user?.email,
        path: values.path || 'mfs/files',
      }
    });
  }

  return <>
    <Form form={form} style={{ marginTop: 12 }}>
      <Form.Item
        name="path"
        label="本地部署文件路径"
        initialValue="mfs/files"
      >
        <Input placeholder="请输入本地部署文件路径: mfs/files" />
      </Form.Item>
      <Form.Item style={{ textAlign: 'right' }}>
        {<Card.Meta description={`${localConfig.user} 更新于 ${localConfig.updateTime}`} />}
        <Button type="primary" htmlType="submit" onClick={() => { onSubmit(form.getFieldsValue()) }}>
          保存
        </Button>
      </Form.Item>
    </Form>
  </>
}