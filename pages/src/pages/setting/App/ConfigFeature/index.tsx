import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Card, Button } from 'antd'
import { _NAMESPACE_ } from "..";
import { TConfigProps } from '../useConfig';
import Feature from './Feature';


export default (props: TConfigProps) => {
  const { config, mergeUpdateConfig } = props

  const [form] = Form.useForm();

  const uploadConfig = config?.uploadServer || {}
  useEffect(() => {
    form.setFieldsValue(uploadConfig)
  }, [uploadConfig])

  return <>
    <Feature {...props} />
  </>
}