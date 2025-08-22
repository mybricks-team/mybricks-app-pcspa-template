import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import React from 'react'
import { OutCodeDirListType } from '@mybricks/publish-to-com-sdk/ui'

/**
 * @description 通过indexdb来存储文件目录句柄，实现跨页面句柄传递，避免重复打开系统文件选择器
 */
class MyBricksStudioDB {
  static instance: MyBricksStudioDB | null = null

  dbName: string = 'mybricks-db'
  storeName: string = 'mybricks-store'
  db: IDBDatabase | null = null

  constructor() {
    if (MyBricksStudioDB.instance) return MyBricksStudioDB.instance
    MyBricksStudioDB.instance = this
  }

  openDB() {
    if (this.db !== null) return this.db

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1)

      request.onsuccess = (e: any) => {
        this.db = e.target.result
        resolve('成功打开数据库')
      }

      // 第一次默认会 upgrade，建一个 store
      request.onupgradeneeded = (e: any) => {
        const db = e.target.result
        db.createObjectStore(this.storeName, {
          keyPath: 'id',
          autoIncrement: true,
        })
      }

      request.onerror = () => reject('无法打开数据库')
    })
  }

  set(id: string, data: any) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('数据库未打开')
        return
      }

      const transaction = this.db.transaction([this.storeName], 'readwrite')
      const objectStore = transaction.objectStore(this.storeName)
      const request = objectStore.put({ id: id, data: data })

      request.onsuccess = function (event) {
        resolve('对象已存储，ID为：' + id)
      }

      transaction.oncomplete = function () {
        console.log('存储事务完成')
      }

      transaction.onerror = function (event) {
        reject('存储事务失败')
      }
    })
  }

  get(id: string) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('数据库未打开')
        return
      }

      const transaction = this.db.transaction([this.storeName], 'readonly')
      const objectStore = transaction.objectStore(this.storeName)
      const request = objectStore.get(id)

      request.onsuccess = (e: any) => {
        const retrievedData = e.target.result
        if (retrievedData) {
          resolve(retrievedData.data)
        } else {
          resolve(void 0)
        }
      }

      request.onerror = () => reject('检索对象失败')
    })
  }

  delete(id: string) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('数据库未打开')
        return
      }

      const transaction = this.db.transaction([this.storeName], 'readwrite')
      const objectStore = transaction.objectStore(this.storeName)
      const request = objectStore.delete(id)

      request.onsuccess = function (event) {
        resolve('对象已删除，ID为：' + id)
      }

      transaction.oncomplete = function () {
        console.log('删除事务完成')
      }

      transaction.onerror = function (event) {
        reject('删除事务失败')
      }
    })
  }
}

async function getMybricksStudioDB() {
  // 单例模式
  const instance = new MyBricksStudioDB()
  await instance.openDB()
  return instance
}

/** 检查是否存储了文件夹权柄，有则返回权柄 */
async function getMemoryFileSystemDirectoryHandle(id: string) {
  const db = await getMybricksStudioDB()
  const memoryHandle = (await db.get(
    id.toString()
  )) as FileSystemDirectoryHandle
  return memoryHandle
}

/** 检查文件夹权柄状态 */
async function checkMemoryHandleStatus(
  directoryHandle: FileSystemDirectoryHandle
) {
  if (!directoryHandle) return 'notRegister'
  try {
    // @ts-ignore 检查读取权限
    for await (const key of directoryHandle.keys()) {
      key
    }
    // 如果解析成功，说明目录存在
    return 'exist'
  } catch (error) {
    // 如果解析失败，说明目录被删除、移动或重命名
    return 'notExist'
  }
}

/** 记忆化获取文件系统操作权柄 */
async function getFileSystemDirectoryHandle(
  id: string,
  options?: {
    reopen?: boolean,
    notExistMessage?: string,
  }
) {
  // 不强制重新选择文件夹的情况下，尝试获取之前存储的文件夹权柄
  if (!options?.reopen) {
    const memoryHandle = await getMemoryFileSystemDirectoryHandle(id)
    const status = await checkMemoryHandleStatus(memoryHandle)
    if (status === 'exist') return memoryHandle
    if (status === 'notExist') {
      await new Promise((res, rej) => {
        Modal.confirm({
          title: options?.notExistMessage || '检测到原目录已被删除、移动或重命名，请重新选择工作目录',
          icon: <ExclamationCircleOutlined />,
          onOk() { res(true) },
          onCancel() { rej('用户未选择文件夹') },
        })
      })
    }
  }

  const dirHandle = await window.showDirectoryPicker({ id: 'projects', mode: 'readwrite' })

  const fileSystemDirectoryHandle: FileSystemDirectoryHandle = dirHandle

  if (fileSystemDirectoryHandle) {
    const db = await getMybricksStudioDB()
    await db.set(id.toString(), fileSystemDirectoryHandle)
  } else { console.warn('fileSystemDirectoryHandle 获取为空', dirHandle); }

  return fileSystemDirectoryHandle
}

export interface ILocalData {
  outCodeDirList?: OutCodeDirListType,
  outCodePathMap?: Record<string, string>
}

async function deleteFileSystemDirectoryHandleMemo(id: string) {
  const db = await getMybricksStudioDB()
  await db.delete(id);
}

/** 存储数据，浅层合并 */
async function setLocalData(data: ILocalData) {
  const db = await getMybricksStudioDB()
  const key = window.fileId.toString() + '-data';
  const preData: Record<string, any> = (await db.get(key)) || {};
  await db.set(key, { ...preData, ...data });
}

/** 获取数据 */
async function getLocalData() {
  const db = await getMybricksStudioDB()
  const key = window.fileId.toString() + '-data';
  return ((await db.get(key)) || {}) as ILocalData;
}

export {
  getMemoryFileSystemDirectoryHandle,
  getFileSystemDirectoryHandle,
  deleteFileSystemDirectoryHandleMemo,
  setLocalData,
  getLocalData,
}
