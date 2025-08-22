class MyBricksStudioDB {
  static instance: MyBricksStudioDB | null = null

  dbName: string = 'mybricks-file-db'
  storeName: string = 'mybricks-file-content'
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

        if (this.db.objectStoreNames.contains(this.storeName)) {
          resolve('成功打开数据库')
        }
        // else {
        //   console.log(this.storeName)
        // }
      }

      // 第一次默认会 upgrade，建一个 store
      request.onupgradeneeded = (e: any) => {
        const db = e.target.result

        if (!db.objectStoreNames.contains(this.storeName)) {
          const objectStore = db.createObjectStore(this.storeName, { autoIncrement: true, });

          objectStore.createIndex('fileId', 'fileId', { unique: false });
          objectStore.createIndex("createTime", "createTime", { unique: false, multiEntry: false });
        }

      }

      request.onerror = () => reject('无法打开数据库')
    })
  }

  add(id, data, version: string) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('数据库未打开')
        return
      }

      const transaction = this.db.transaction([this.storeName], 'readwrite')
      const objectStore = transaction.objectStore(this.storeName)

      const request = objectStore.add({
        fileId: id,
        data,
        version,
        createTime: new Date().getTime()
      })

      request.onsuccess = function (event) {
        resolve(event.target?.result)
      }

      transaction.oncomplete = function () {
        // console.log('存储事务完成')
      }

      transaction.onerror = function (event) {
        reject('存储事务失败')
      }
    })
  }

  // set(id: string, data: any) {
  //   return new Promise((resolve, reject) => {
  //     if (!this.db) {
  //       reject('数据库未打开')
  //       return
  //     }

  //     const transaction = this.db.transaction([this.storeName], 'readwrite')
  //     const objectStore = transaction.objectStore(this.storeName)

  //     const request = objectStore.put({ id: id, data: data, createTime: new Date().getTime() })

  //     request.onsuccess = function (event) {
  //       resolve('对象已存储，ID为：' + id)
  //     }

  //     transaction.oncomplete = function () {
  //       console.log('存储事务完成')
  //     }

  //     transaction.onerror = function (event) {
  //       reject('存储事务失败')
  //     }
  //   })
  // }

  get(fileId) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('数据库未打开')
        return
      }

      const transaction = this.db.transaction([this.storeName], 'readonly')
      const objectStore = transaction.objectStore(this.storeName)

      const index = objectStore.index('fileId')

      const cursorRequest = index.openCursor(IDBKeyRange.only(fileId));
      const resultArray = [];

      cursorRequest.onsuccess = (e: any) => {
        const cursor = e.target.result

        if (cursor) {
          resultArray.push(cursor.value);
          cursor.continue();
          // resolve(retrievedData.data)
        } else {
          resultArray.sort((a, b) => { // 最新数据排在前
            return b.createTime - a.createTime
          })

          resolve(resultArray)
        }
      }

      cursorRequest.onerror = () => reject('检索对象失败')
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
        // resolve('对象已删除，ID为：' + id)
      }

      transaction.oncomplete = function () {
        console.log('删除事务完成')
      }

      transaction.onerror = function (event) {
        reject('删除事务失败')
      }
    })
  }

  deleteByFileId(fileId) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('数据库未打开')
        return
      }

      const transaction = this.db.transaction([this.storeName], 'readwrite')
      const objectStore = transaction.objectStore(this.storeName)

      const index = objectStore.index('fileId')

      const cursorRequest = index.openCursor(IDBKeyRange.only(fileId));

      cursorRequest.onsuccess = (e: any) => {
        const cursor = e.target.result

        if (cursor) {
          cursor.delete();
          cursor.continue();
        } else {
          // console.log(`删除 fileId：${fileId} 记录成功`)
          resolve({ msg: 'success' })
        }
      }

      cursorRequest.onerror = () => reject('检索对象失败')
    })
  }
}

async function getMybricksStudioDB() {
  // 单例模式
  const instance = new MyBricksStudioDB()
  await instance.openDB()
  return instance
}

const initialSaveFileContent = async (fileDBRef, ctx, saveType) => {
  const list = await fileDBRef.current.get(ctx.fileId)
  const firstItem = list[0]

  if (firstItem) {
    return await saveFileContentByIndexDB(firstItem, ctx, fileDBRef, saveType)
  }
}

const saveFileContentByIndexDB = async (item, ctx, fileDBRef, saveType) => {
  const json = item.data
  const res = await ctx.save({ name: ctx.fileName, content: JSON.stringify(json) }, { saveType })

  await fileDBRef.current.deleteByFileId(ctx.fileId)

  return res
}

const addVersionContent = async (params: { fileId, version, fileDBRef, json }) => {
  const { fileId, version, fileDBRef, json } = params

  const newVerison = getNextVerison(version)

  // 处理某些情况下 导致 indexDB 存储数据报错问题
  const newJson = JSON.parse(JSON.stringify(json))

  return await fileDBRef.current.add(fileId, newJson, newVerison)
}

const getNextVerison = (version, max = 100) => {
  if (!version) return '1.0.0'
  const vAry = version.split(".");
  let carry = false;
  const isMaster = vAry.length === 3;
  if (!isMaster) {
    max = -1;
  }

  for (let i = vAry.length - 1; i >= 0; i--) {
    const res = Number(vAry[i]) + 1;
    if (i === 0) {
      vAry[i] = res;
    } else {
      if (res === max) {
        vAry[i] = 0;
        carry = true;
      } else {
        vAry[i] = res;
        carry = false;
      }
    }
    if (!carry) break;
  }

  return vAry.join(".");
}

const compareVersionLatest = (v1: string, v2: string): number => {
  const [v1Main, v1PreRelease] = v1.split('-')
  const [v2Main, v2PreRelease] = v2.split('-')

  // 比较版本主体的大小
  const v1List = v1Main.split('.')
  const v2List = v2Main.split('.')
  const len1 = v1List.length
  const len2 = v2List.length
  const minLen = Math.min(len1, len2)
  let curIdx = 0
  for (curIdx; curIdx < minLen; curIdx += 1) {
    const v1CurNum = parseInt(v1List[curIdx])
    const v2CurNum = parseInt(v2List[curIdx])
    if (v1CurNum > v2CurNum) {
      return 1
    } else if (v1CurNum < v2CurNum) {
      return -1
    }
  }
  if (len1 > len2) {
    for (let lastIdx = curIdx; lastIdx < len1; lastIdx++) {
      if (parseInt(v1List[lastIdx]) != 0) {
        return 1
      }
    }
    return 0
  } else if (len1 < len2) {
    for (let lastIdx = curIdx; lastIdx < len2; lastIdx += 1) {
      if (parseInt(v2List[lastIdx]) != 0) {
        return -1
      }
    }
    return 0
  }

  // 如果存在先行版本，还需要比较先行版本的大小
  if (v1PreRelease && !v2PreRelease) {
    return 1
  } else if (!v1PreRelease && v2PreRelease) {
    return -1
  } else if (v1PreRelease && v2PreRelease) {
    const [gama1, time1] = v1PreRelease.split('.')
    const [gama2, time2] = v2PreRelease.split('.')
    if (gama1 > gama2) return 1
    if (gama2 > gama1) return -1
    if (parseInt(time1) > parseInt(time2)) return 1
    if (parseInt(time2) > parseInt(time1)) return -1
  }
  return 0
}


export {
  getMybricksStudioDB,
  initialSaveFileContent,
  saveFileContentByIndexDB,
  addVersionContent,
  compareVersionLatest
}