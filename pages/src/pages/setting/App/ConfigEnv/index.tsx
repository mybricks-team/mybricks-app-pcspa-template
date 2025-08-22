import React, { useCallback, useEffect, useRef, useState } from 'react'
import { message, Form, Input, Card, Button, Space, Descriptions, Modal, Col, Popconfirm, Typography, Divider } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { _NAMESPACE_ } from "..";
import dayjs from "dayjs";
import styles from "./index.less";
import { TConfigProps } from '../useConfig';
import EditModal from './Modal';

const { Meta } = Card;

const UpdateInfo = ({ configItem }) => {
  return Object.keys(configItem).length > 0 && <Meta description={`${configItem?.user} 更新于 ${configItem?.updateTime}`} />
}

export type TPublishEnv = {
  name: string,
  title: string,
  // 该环境下的接口前缀
  defaultApiPrePath: string
  updateTime: string
  user: any
}

export type TPublishConfig = {
  envList: Array<TPublishEnv>,
}

export default ({ config, mergeUpdateConfig, updateConfig, loading, user }: TConfigProps) => {
  const [visible, setVisible] = useState(false)
  const [status, setStatus] = useState<"edit" | "append">()
  const [publishEnv, setPublishEnv] = useState<TPublishEnv>()

  const publishEnvConfig: TPublishConfig = config?.publishEnvConfig || {}
  const { envList = [] } = publishEnvConfig

  const onClickAdd = () => {
    setStatus('append')
    setPublishEnv({
      name: '',
      title: '',
      defaultApiPrePath: '',
      updateTime: '',
      user: {
        email: user.email
      },
    })
    setVisible(true)
  };

  const createConfig = (newEnvList) => {
    let newConfig = { ...config }
    // 因为平台会合并协作组与全局setting，所以协作组环境没有设置时，需要直接删除publishEnvConfig字段
    if (newEnvList.length === 0) {
      delete newConfig.publishEnvConfig
    } else {
      newConfig.publishEnvConfig = { envList: newEnvList }
    }
    return newConfig
  }

  const onOk = async (publishEnv) => {
    setVisible(false)
    const updateTime = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    const currentPublishEnv = { ...publishEnv, user: { email: user.email }, updateTime }
    const newEnvList = [...envList]
    if (status === "edit") {
      const index = envList.findIndex(
        ({ name }) => name === publishEnv.name
      );
      newEnvList.splice(index, 1, currentPublishEnv);
    } else if (status === "append") {
      if (envList.find(({ name, title }) => name === publishEnv.name || title === publishEnv.title)) {
        message.info("该环境已存在");
        return;
      }
      newEnvList.push(currentPublishEnv);
    }

    await updateConfig(createConfig(newEnvList)).then(() => {
      message.success(status === "edit" ? "更新成功" : "添加成功");
    })
  }

  const onCancel = () => {
    setVisible(false)
  }

  const onEdit = (publishEnv: TPublishEnv) => {
    setStatus('edit')
    setPublishEnv(publishEnv)
    setVisible(true)
  }

  const onDelete = async (publishEnv: TPublishEnv) => {
    const newEnvList = [...envList]
    const index = envList.findIndex(
      ({ name }) => name === publishEnv.name
    );
    newEnvList.splice(index, 1);
    return updateConfig(createConfig(newEnvList)).then(() => {
      message.success("删除成功");
    })
  }


  return <>
    {envList.map(item => {
      const { title = '', name = '', defaultApiPrePath = '', updateTime, user } = item
      // return <Card
      //   style={{ width: '100%' }}
      //   actions={[
      //     <EditOutlined key="edit" onClick={() => onEdit(item)} />
      //   ]}
      // >
      //   <Descriptions title={title} layout="horizontal" column={1} labelStyle={{
      //     fontWeight: '500'
      //   }}>
      //     <Descriptions.Item label="name">{name}</Descriptions.Item>
      //     <Descriptions.Item label="接口前缀">{defaultApiPrePath}</Descriptions.Item>
      //   </Descriptions>
      //   <Meta
      //     description={`${user.email} 更新于 ${updateTime}`}
      //   />
      // </Card>
      return <>
        <Descriptions
          title={title}
          column={1}
          labelStyle={{
            fontWeight: '500'
          }}
          extra={
            <>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => { onEdit(item) }}
              >
                编辑
              </Button>
              <Popconfirm
                title={`确定删除环境 ${item.title} 吗？`}
                onConfirm={() => { onDelete(item) }}
                okText="确定"
                cancelText="再想想"
              >
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                >
                  删除
                </Button>
              </Popconfirm>
            </>
          }
        >
          <Descriptions.Item label="环境名称">{title}</Descriptions.Item>
          <Descriptions.Item label="环境标识">{name}</Descriptions.Item>
          <Descriptions.Item label="接口默认前缀">{defaultApiPrePath}</Descriptions.Item>
        </Descriptions>
        <Typography.Paragraph type="secondary" style={{ textAlign: 'right' }}>
          {user?.email} 更新于 {updateTime}
        </Typography.Paragraph>
        <Divider />
      </>
    })}
    <Button onClick={onClickAdd} type="dashed" block icon={<PlusOutlined />}>添加</Button>
    <EditModal visible={visible} status={status} publishEnv={publishEnv} onOk={onOk} onCancel={onCancel} />
  </>
}