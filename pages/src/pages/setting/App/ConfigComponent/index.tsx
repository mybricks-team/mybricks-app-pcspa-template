import React, { useEffect } from 'react';
import { Button, Form, Card, Input } from 'antd';
import dayjs from 'dayjs';
import { TConfigProps } from '../useConfig';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Meta } = Card;
export default (props: TConfigProps) => {
  const { config, mergeUpdateConfig, user } = props
  const [form] = Form.useForm();

  const componentConfig = config?.component || {}
  useEffect(() => {
    form.setFieldsValue(componentConfig)
  }, [componentConfig])

  const onSubmit = (values) => {
    const updateTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    mergeUpdateConfig({ component: { ...values, updateTime, user: user?.email } });
  }

  return (
    <Form form={form} onFinish={onSubmit} style={{ marginTop: 12 }}>
      <Form.Item label="主应用函数选项">
        <Form.List name="customMethodOptions" >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key} style={{ display: 'flex', gap: 12 }}>
                  <Form.Item
                    {...field}
                    key={field.key + '-label'}
                    name={[field.name, 'label']}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "请输入展示名称",
                      },
                    ]}
                  >
                    <Input placeholder="展示名称（label）" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    key={field.key + '-value'}
                    name={[field.name, 'value']}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "请输入函数名",
                      },
                    ]}
                  >
                    <Input placeholder="函数名" />
                  </Form.Item>
                  {fields.length > 0 ? (
                    <MinusCircleOutlined
                      style={{
                        position: 'relative',
                        top: 4,
                        fontSize: 24,
                        left: 12,
                        color: '#888'
                      }}
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </div>
              ))}
              <Form.Item label=" " colon={false} labelCol={{ span: 0 }} wrapperCol={{ span: 8 }}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  添加一项
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item style={{ textAlign: 'right' }}>
        {Object.keys(componentConfig).length > 0 && <Meta description={`${componentConfig.user} 更新于 ${componentConfig.updateTime}`} />}
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form >
  );
}