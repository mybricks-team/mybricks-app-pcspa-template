import React, { FC, useRef, useMemo, useCallback, useState } from 'react'
import debounce from 'lodash/debounce'
import { Items } from '@mybricks/plugin-connector-http'
import { AnyType } from '@/types'
import SQLPanel from '../sqlPanel'

import styles from './index.less'

interface CollaborationHttpProps {
  onClose?(): void
  initService: AnyType
  openFileSelector(): Promise<any>
  originConnectors: any[]
  connectorService: {
    add(item: AnyType): void
    remove(item: AnyType): void
    update(item: AnyType): void
    test(item: AnyType, params: any): Promise<AnyType>
  }
}

const {
  PanelWrap,
  Collapse,
  Button,
  notice,
  Debug,
  uuid,
  safeDecode,
  FormItem,
  NameInput,
  EditorWithFullScreen,
  MethodRadio,
} = Items
const CollaborationHttp: FC<CollaborationHttpProps> = (props) => {
  const { onClose, connectorService, openFileSelector, initService } = props
  const [service, setService] = useState<AnyType>(
    initService || {
      id: uuid(),
      type: 'http-sql',
      title: '',
      method: 'POST',
      input: '',
      output: '',
      path: '',
    }
  )
  const [showFileSelector, setShowFileSelector] = useState(false)
  const panelRef = useRef<AnyType>({})

  const validate = useCallback((service) => {
    let error = ''
    if (service.path) {
      if (!service.markList?.length) {
        error = '数据标记组必须存在'
        notice(error)
      } else {
        const markList = service.markList
        const defaultMark = markList.find((m) => m.id === 'default')

        if (!defaultMark) {
          error = '数据标记组中【默认】组必须存在'
        } else if (markList.length > 1) {
          const errorMark = markList.find(
            (m) =>
              !m.predicate ||
              !m.predicate.key ||
              m.predicate.value === undefined ||
              m.predicate.value === ''
          )

          if (errorMark) {
            error = `数据标记组中【${errorMark.title}】组的生效标识不存在或标识值为空`
          }
        }
      }
    }

    error && notice(error)
    return !error
  }, [])

  const onSave = useCallback(() => {
    if (!validate(service)) {
      return
    }

    initService
      ? connectorService.update(service)
      : connectorService.add(service)
    onClose()
  }, [connectorService, service, initService, onClose])

  const SQLPanelService = useMemo(() => {
    return {
      add: (item) => {
        const { id, type, ...other } = item

        setService((service) => ({
          ...service,
          ...other,
          title: service.title || other.title,
        }))
      },
    }
  }, [])

  const onCloseFileSelector = useCallback(() => setShowFileSelector(false), [])

  return (
    <PanelWrap
      ref={panelRef}
      title="领域接口"
      style={{ top: 40 }}
      extra={
        <Button type="primary" onClick={onSave}>
          保 存
        </Button>
      }
      onClose={onClose}
    >
      <Collapse header="基本信息" defaultFold={false}>
        <NameInput
          defaultValue={service.title}
          onChange={(e) =>
            setService((service) => ({ ...service, title: e.target.value }))
          }
        />
        <FormItem label="地址" require>
          <div className={styles.editor}>
            <Button
              type="default"
              style={{ marginLeft: '0' }}
              onClick={() => setShowFileSelector(true)}
            >
              {service.domainServiceMap ? '更新' : '选择'}领域接口
            </Button>
            {service.domainServiceMap ? (
              <div className={styles.serviceTitle}>
                已选择接口: {service.domainServiceMap.serviceTitle}（Path:
                /api/system/domain/run）
              </div>
            ) : null}
          </div>
        </FormItem>
        <MethodRadio
          defaultValue={service.method}
          onChange={(method) =>
            setService((service) => ({ ...service, method }))
          }
        />
      </Collapse>
      {service.domainServiceMap ? (
        <>
          <Collapse header="当开始请求">
            <EditorWithFullScreen
              CDN={undefined}
              key={service.id}
              onChange={debounce((code: string) => {
                setService((service) => ({
                  ...service,
                  input: encodeURIComponent(code),
                }))
              }, 200)}
              value={safeDecode(service.input)}
            />
          </Collapse>
          <Collapse header="当返回响应">
            <EditorWithFullScreen
              CDN={undefined}
              key={service.id}
              onChange={debounce((code: string) => {
                setService((service) => ({
                  ...service,
                  output: encodeURIComponent(code),
                }))
              }, 200)}
              value={safeDecode(service.output)}
            />
          </Collapse>
        </>
      ) : null}
      <Collapse header="接口调试" defaultFold={false}>
        <Debug
          model={service}
          connect={connectorService.test}
          onChangeModel={setService}
          registerBlur={panelRef.current.registerBlur}
        />
      </Collapse>
      {showFileSelector ? (
        <SQLPanel
          single
          openFileSelector={openFileSelector}
          onClose={onCloseFileSelector}
          connectorService={SQLPanelService as AnyType}
        />
      ) : null}
    </PanelWrap>
  )
}

export default CollaborationHttp
