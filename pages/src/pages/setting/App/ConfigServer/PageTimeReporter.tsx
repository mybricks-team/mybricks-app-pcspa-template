import React, { useEffect } from 'react'
import { Form, Button,Card, Switch} from 'antd'
const { Meta } = Card;
import { _NAMESPACE_ } from "..";
import dayjs from "dayjs";
import { TConfigProps } from '../useConfig';

const fieldName = `reporterStatus`

export default ({ config, mergeUpdateConfig, loading, user }: TConfigProps) => {
  const [form] = Form.useForm();

  const pageRepoterConfig = config?.pageRepoterConfig || {}
  useEffect(() => {
    console.log(pageRepoterConfig)
    form.setFieldsValue(pageRepoterConfig)
  }, [pageRepoterConfig])

  const onSubmit = (values) => {
    const updateTime = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    mergeUpdateConfig({
        pageRepoterConfig: { ...values, updateTime, user: user?.email }
    })
  }

  return <>
    <Form  form={form} onFinish={onSubmit}>
      <Form.Item
        name={fieldName} 
        label="上报用户的页面开发数据"
        required
        tooltip="默认关闭，打开开关后，会上报用户的页面开发数据到统计中心。"
        valuePropName="checked"
      >
        <Switch checkedChildren="开启" unCheckedChildren="关闭" />
      </Form.Item>
      <Form.Item style={{ textAlign: 'right' }}>
      {Object.keys(pageRepoterConfig).length > 0 && <Meta description={`${pageRepoterConfig.user} 更新于 ${pageRepoterConfig.updateTime}`} />}
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  </>
}