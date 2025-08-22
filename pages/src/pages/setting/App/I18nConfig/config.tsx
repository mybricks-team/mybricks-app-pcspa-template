import React, { useEffect, useState } from 'react'
import { Form, Card, Button, Switch, Input, Select } from 'antd'
import { _NAMESPACE_ } from "..";
import dayjs from "dayjs";
import { TConfigProps } from '../useConfig';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { EnumLocale } from './utils';
const { Meta } = Card;
const formItemLayout = {
  labelCol: {
    xs: { span: 23 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 19, offset: 5 },
  },
};


const localOptions = [{
  value: EnumLocale.DEFAULT,
  label: `中文`
}, {
  value: EnumLocale.BROWER,
  label: `浏览器默认语言`
}, {
  value: EnumLocale.LOCALESTORAGE,
  label: `localStorage`
}]

export default ({ config, mergeUpdateConfig, loading, user }: TConfigProps) => {
  const [form] = Form.useForm();

  const localeConfig = config?.localeConfig || {};
  useEffect(() => {
    const newConfig = localeConfig
    if (!localeConfig.localeGetMethod) {
      newConfig.localeGetMethod = EnumLocale.DEFAULT
    }
    form.setFieldsValue(newConfig)
  }, [localeConfig]);


  const onSubmit = (values) => {
    const updateTime = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    mergeUpdateConfig({
      localeConfig: {
        ...localeConfig,
        antdLocaleLinks: values.antdLocaleLinks || [],
        localeGetMethod: values.localeGetMethod || EnumLocale.DEFAULT,
        localStorageKey: values.localStorageKey || '',
        defaultI18nLink: values.defaultI18nLink || '',
        updateTime,
        user: user?.email
      }
    });
  }

  return <>
    <Form form={form} style={{ marginTop: 12 }}>
      <Form.Item
        name='defaultI18nLink'
        label="默认语言包地址"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
      >
        <Input placeholder='请输入默认的语言包地址' />
      </Form.Item>
      <Form.Item
        name='localeGetMethod'
        label="语言获取方式"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 6 }}
      >
        <Select options={localOptions} />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.localeGetMethod !== currentValues.localeGetMethod}
      >
        {({ getFieldValue }) =>
          getFieldValue('localeGetMethod') === EnumLocale.LOCALESTORAGE ? (<Form.Item
            name='localStorageKey'
            label="localStorageKey"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
          >
            <Input />
          </Form.Item>) : null
        }
      </Form.Item>

      <Form.List
        name="antdLocaleLinks"
        rules={[
          // {
          //   validator: async (_, links) => {
          //     if (!names || names.length < 2) {
          //       return Promise.reject(new Error('At least 2 passengers'));
          //     }
          //   },
          // },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}

                label={index === 0 ? 'Antd语言包' : ''}
                tooltip={index === 0 ? '填写语言包对应的地址' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "请输入语言包地址",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="passenger name" style={{ width: '60%' }} />
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
              </Form.Item>
            ))}
            <Form.Item label=" " colon={false} labelCol={{ span: 5 }}
              wrapperCol={{ span: 8 }} >
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
                icon={<PlusOutlined />}
              >
                添加语言包
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item style={{ textAlign: 'right' }}>
        {<Meta description={`${localeConfig.user} 更新于 ${localeConfig.updateTime}`} />}
        <Button type="primary" htmlType="submit" onClick={() => { onSubmit(form.getFieldsValue()) }}>
          保存
        </Button>
      </Form.Item>
    </Form>
  </>
}
