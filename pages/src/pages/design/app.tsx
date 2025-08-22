import React, { useEffect, useState } from 'react'

import { View } from '@mybricks/sdk-for-app/ui'

import Designer from './designer'

import { parseQueryString } from '@/utils'

import './prerender'

import '@/reset.less'

export default function App() {
  const fileId = parseQueryString('id');
  return (
    <View
      appType={APP_TYPE}
      onLoad={(appData) => {
        return <Designer appData={appData} />
      }}
      useCustomLoad={!fileId}
      onCustomLoad={
        (appData) => {
          return <DesignerWithoutFileId appData={appData} />
        }
      }
    />
  )
}

let templateJson

try {
  const templateString = localStorage.getItem(`${location.hostname}/preview@pcpage`);
  templateJson = JSON.parse(templateString)
} catch (error) {
  
}

const DesignerWithoutFileId = ({ appData }) => {
  return <Designer appData={{
    isPreview: true,
    ...appData,
    fileContent: {
      name: templateJson ? "AI模板预览" : "动态模板预览",
      content: templateJson ? { templateJson } : {}
    }
  }} />
}