import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Card, Button } from 'antd'
import API from "@mybricks/sdk-for-app/api";
import { _NAMESPACE_ } from "..";
import dayjs from "dayjs";
import { TConfigProps } from '../useConfig';
import UploadConfig from './UploadConfig'
import RuntimeUploadConfig from './RuntimeUploadConfig'
import PublishApi from './PublishApi'
import EmailConfigApi from './EmailConfigApi';
import PageTimeReporter from './PageTimeReporter';
// import PublishLocalize from '../ConfigBase/PublishLocalize';
const { Meta } = Card;

export default (props: TConfigProps) => {
  const { config, mergeUpdateConfig, loading, user, options } = props
  const isInGroup = options?.type === 'group'

  return <>
    {!isInGroup && <UploadConfig {...props} />}
    <RuntimeUploadConfig {...props} />
    {!isInGroup && <PublishApi {...props} />}
    {<EmailConfigApi {...props} />}
    {<PageTimeReporter {...props} />}
    {/* <PublishLocalize {...props} /> */}
  </>
}