import React, { useEffect, useState } from 'react';
import { InfoCircleOutlined, EditOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons'
import { Button, Select, Popconfirm, Tooltip, Modal, Form, Input, Typography, message, FormInstance } from 'antd';
import css from './index.less';
import useGenCode from './hooks/use-gen-code';
import { deleteFileSystemDirectoryHandleMemo, getFileSystemDirectoryHandle, getLocalData, setLocalData } from '../../utils/fileSystemHandle';
import { i18nLangContentFilter } from '@/utils';

export type OutCodeDirItemType = { type: 'vue' | 'react', dirname: string, id: string, description?: string, isNew?: boolean }
export type OutCodeDirListType = OutCodeDirItemType[];

type ConstantContext = any;
type HandleContext = any;
type VariableContext = any;

export const isHttps = !!window.showDirectoryPicker;

async function createOutCodeDirItem(variableContext: VariableContext, constantContext: ConstantContext, form: FormInstance) {
  const id = uuid();
  return await new Promise<OutCodeDirItemType>((res, rej) => {
    Modal.confirm({
      title: '创建出码文件夹',
      okText: '确认创建并出码',
      cancelText: '取消',
      width: 600,
      content: (
        <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Form.Item name='description' label='标签' rules={[{ required: true, message: '标签不能为空' }]}
            tooltip='用于区分同名文件夹（由于浏览器安全策略，无法拿到本地文件系统的真实路径，因此无法直接显示出码文件夹路径，只能通过标签区分）'>
            <Input placeholder="请输入出码文件夹标签" />
          </Form.Item>
          {
            isHttps
              ? <Form.Item name='dirname' label='文件夹路径' rules={[{ required: true, message: '出码文件夹路径不能为空' }]}>
                <OutCodeDirCheck id={id} variableContext={variableContext} constantContext={constantContext} />
              </Form.Item>
              : <Form.Item label='文件夹路径'>由于浏览器安全策略, 非 https 无法直接访问本地文件系统, 所以会以下载的方式进行出码, 无需配置出码文件夹路径</Form.Item>
          }
          <Form.Item name='type' label='出码类型' rules={[{ required: true, message: '出码类型不能为空' }]}>
            <Select options={[{ label: 'Vue3', value: 'vue' }, { label: 'React', value: 'react' }]} />
          </Form.Item>
        </Form>
      ),
      async onOk() {
        const formValues = await form.validateFields().then(async (values) => values).catch(() => false);
        if (!formValues) return Promise.reject();
        form.resetFields();
        return res({ ...formValues, id, isNew: true });
      },
      onCancel() { form.resetFields(); rej('取消创建出码文件夹'); },
    })
  })
}

async function getDescription(inputDescription: string = '') {
  let desc = inputDescription;
  return await new Promise<string>((res, rej) => {
    Modal.confirm({
      title: '标签',
      width: 500,
      content: (
        <Input placeholder="请输入出码文件夹标签" defaultValue={inputDescription} onChange={e => desc = e.target.value} />
      ),
      onOk() {
        if (desc) { return res(desc) }
        message.warn('请输入出码文件夹标签');
        return Promise.reject();
      },
      onCancel() { rej(inputDescription) },
    })
  })
}

function OutCodeDirCheck(props: {
  variableContext: VariableContext, constantContext: ConstantContext,
  id: string, value?: string, onChange?: (value: string) => void,
}) {
  const [dirName, setDirName] = useState(props.value);

  const handleClick = async () => {
    try {
      const handleId = `${props.constantContext.fileId}-${props.id}`;
      const handle = await getFileSystemDirectoryHandle(handleId, { reopen: true });
      setDirName(handle.name);
      props.onChange?.(handle.name);
    } catch (e: any) { console.log(e?.message || e); }
  }

  const baseStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '4px 8px',
    margin: '4px 0 0 0',
    border: '1px solid #cccca9',
    borderRadius: '5px',
    fontWeight: 'bold',
  }

  if (!dirName) {
    return (
      <div style={{
        ...baseStyle, backgroundColor: '#efefef', color: 'rgba(0, 0, 0, 0.75)', opacity: 0.5,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }} >
        <div><InfoCircleOutlined style={{ marginRight: 4 }} />{' '}未选择出码文件夹</div>
        <EditOutlined style={{ cursor: 'pointer' }} onClick={handleClick} />
      </div>
    )
  }

  return (
    <div style={{ ...baseStyle, backgroundColor: '#fcfae7', color: '#555' }} >
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>当前出码文件夹:</span>{' '}{dirName}</div>
        <EditOutlined style={{ cursor: 'pointer' }} onClick={handleClick} />
      </div>
    </div>
  )
}

function OutCodeDirItem(props: {
  variableContext: VariableContext, constantContext: ConstantContext, handleContext: HandleContext,
  value: OutCodeDirItemType, onChange: (value: OutCodeDirItemType) => void, handleDel: () => void,
}) {
  const { variableContext, constantContext, handleContext, value, onChange, handleDel } = props;
  const [flag, setFlag] = useState(0);
  const forceUpdate = () => setFlag(c => c + 1);

  const [saveCodeToLocal, outCodeLoading] = useGenCode({
    save: () => handleContext.handleSaveButtonClick!(false),
    contextInfo: {
      fileName: variableContext.fileName,
      componentName: variableContext.componentName,
      fileId: constantContext.fileId,
      userId: constantContext.user.id,
    },
    getParam: () => {
      return {
        ...handleContext.getToJson?.(true),
        configuration: {
          comLibs: variableContext.comlibs,
          i18nLangContent: i18nLangContentFilter(variableContext.i18nLangContent, variableContext.i18nUsedIdList)
        },
      }
    },
    hasPermissionFn: variableContext.hasPermissionFn,
  })

  const codeToLocal = async (handle?: FileSystemDirectoryHandle) => {
    await saveCodeToLocal(handle, {
      componentName: variableContext.componentName!,
      staticResourceToCDN: !!variableContext.staticResourceToCDN,
      toLocalType: value.type,
      loadingMessage: isHttps ? `正在出码到文件夹: ${value.dirname} ...` : `正在下载到本地...`,
      fileId: constantContext.fileId,
      id: value.id,
    });
  }

  const [confirmForm] = Form.useForm();

  /** 出码到本地 */
  const genComToLocal = async () => {
    try {
      if (!variableContext.componentName) {
        await new Promise((res, rej) => {
          Modal.confirm({
            title: '请先输入组件名称',
            width: 500,
            content: (
              <Form form={confirmForm}>
                <Form.Item
                  name="componentName"
                  label="组件名称"
                  tooltip="需要为大驼峰命名，如: TestCom"
                  rules={[
                    {
                      pattern: /^[A-Z][a-zA-Z0-9]*$/,
                      message: '需要为大驼峰命名，如: TestCom',
                    },
                    { required: true, message: '组件名不能为空' },
                  ]}
                >
                  <Input placeholder="请输入组件名称" />
                </Form.Item>
              </Form>
            ),
            async onOk() {
              const inputComponentName = (await confirmForm.validateFields())?.componentName
              confirmForm.resetFields()
              variableContext.componentName = inputComponentName
              res(inputComponentName)
            },
            onCancel() {
              rej('取消输入组件名称')
            },
          })
        })
      }
      if (!isHttps) return await codeToLocal();
      const handleId = `${constantContext.fileId}-${value.id}`;
      const handle = await getFileSystemDirectoryHandle(handleId, {
        notExistMessage: `检测到原目录(${value.dirname})已被删除、移动、重命名或者权限失效，请重新选择、授权工作目录`
      });
      onChange({ ...value, dirname: handle.name });
      forceUpdate();
      if (handle) { await codeToLocal(handle) }
      else { console.warn(`FileHandle 获取失败`, handle); }
    } catch (e) {
      message.error('出码失败，请联系管理员')
      console.log(e)
    }
  }

  const handleDelete = async () => {
    if (outCodeLoading) return;
    handleDel();
    const localData = await getLocalData();
    const nextOutCodePathMap = { ...localData.outCodePathMap };
    Reflect.deleteProperty(nextOutCodePathMap, value.id);
    setLocalData({ outCodePathMap: nextOutCodePathMap });
    const handleId = `${constantContext.fileId}-${value.id}`;
    deleteFileSystemDirectoryHandleMemo(handleId);
  }

  const editDescription = async () => {
    try {
      const description = await getDescription(value.description);
      onChange({ ...value, description });
    } catch (e) { }
  }

  useEffect(() => {
    if (value.isNew) {
      genComToLocal().then(() => {
        onChange({ ...value, isNew: false });
      })
    }
  }, [value.isNew]);

  return (
    <div key={flag} style={{ margin: '8px 0', padding: '8px', border: '1px solid #ddd', borderRadius: 3 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#555', flex: '0 0 48px' }}>出码类型</span>
        <span style={{ fontSize: 14, fontWeight: 500 }}>{{ vue: 'Vue3', react: 'React' }[value.type]}</span>
        {/* <Select size='small' value={value.type} onChange={(type) => { onChange({ ...value, type }) }}
          options={[{ label: 'Vue3', value: 'vue' }, { label: 'React', value: 'react' }]} style={{ flexBasis: 70 }} /> */}
        <Tooltip title={value.description}>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <div className={`${css.tag} ${!value.description ? css.tagWarn : ''}`} style={{ width: '100%', maxWidth: 'fit-content' }} onClick={editDescription}>
              <Typography.Text ellipsis style={{ width: '100%', maxWidth: 'fit-content' }}>{value.description || '未定义'}</Typography.Text>
            </div>
          </div>

        </Tooltip>
        {/* <DownloadOutlined style={{ cursor: 'pointer' }} onClick={() => !outCodeLoading && genComToLocal()} /> */}
        <Button style={{ padding: 0, fontSize: 12, fontWeight: 500 }} size='small' loading={outCodeLoading} type='text' onClick={() => !outCodeLoading && genComToLocal()}>下载</Button>
        <Popconfirm
          title={
            isHttps
              ? "确定要删除此出码文件夹吗? (添加出码文件夹需重新授权)"
              : "确定要删除此出码类型吗? "
          }
          onConfirm={() => handleDelete()}
          okText="确定"
          cancelText="取消"
        >
          <Button style={{ padding: 0, fontSize: 12, fontWeight: 500 }} size='small' type='text'>删除</Button>
        </Popconfirm>
      </div>
      {
        isHttps
          ? <div style={{ marginTop: 8 }}>
            <OutCodeDirCheck id={value.id} variableContext={variableContext} constantContext={constantContext}
              value={value.dirname} onChange={(dirname) => { onChange({ ...value, dirname }); }} />
          </div>
          : null
      }
    </div>
  )
}

function uuid() { return Math.floor(Math.random() * 10000 * Date.now()).toString(36); }

export default function OutCodeDirList(props: {
  variableContext: VariableContext, constantContext: ConstantContext, handleContext: HandleContext,
  value: OutCodeDirListType, onChange: (value: OutCodeDirListType) => void,
}) {
  const { variableContext, constantContext, value, onChange, handleContext } = props;
  const [form] = Form.useForm();

  const handleAdd = async () => {
    try {
      const item = await createOutCodeDirItem(variableContext, constantContext, form);
      onChange([...value, item]);
    } catch (e) { }
  }

  const handleDel = (index: number) => { onChange([...value.slice(0, index), ...value.slice(index + 1)]); }

  const title = isHttps ? '出码文件夹' : '出码类型'

  return (
    <div>
      <span style={{ color: '#555' }}>{title}</span>

      <div className={css.btnAdd} onClick={() => handleAdd()}>添加{title}</div>

      {value.map((item, index) => (
        <OutCodeDirItem key={item.id} variableContext={variableContext} constantContext={constantContext}
          handleDel={handleDel.bind(null, index)} handleContext={handleContext}
          value={item} onChange={(itemValue) => onChange([...value.slice(0, index), itemValue, ...value.slice(index + 1)])}
        />
      ))}

    </div>
  )
}
