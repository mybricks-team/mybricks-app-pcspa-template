import { fAxios } from './http'
import { getRtComlibsFromEdit, isCloundModuleComboUrl } from './../utils/comlib'

export const ComlibService = {
  getRtSourceCode: async (editComlibs) => {
    if (!Array.isArray(editComlibs)) {
      return ''
    }
    const rtLibs = getRtComlibsFromEdit(editComlibs)

    rtLibs.sort((a, b) => {
      return isCloundModuleComboUrl(a) ? 1 : -1
    })
    let scriptHtml = ``
    for (let index = 0; index < rtLibs.length; index++) {
      const lib = rtLibs[index]
      if (isCloundModuleComboUrl(lib)) {
        const str = await fAxios.get(lib)
        scriptHtml = `
        ${scriptHtml}

        <script type="text/javascript">
        ${str}
        </script>
        `
      } else {
        scriptHtml = `
        ${scriptHtml}

        <script src="${lib}"></script>
        `
      }
    }
    return scriptHtml
  },
}

export const MaterialService = {
  getMateralMaterialInfo: async ({ namespace }) => {
    const { data: comoponent, code } = await fAxios.get(
      `/api/material/namespace/content?namespace=${namespace}`
    )
    if (code === 1 && comoponent) {
      return comoponent
    }
    throw new Error('invalid materialInfo')
  },
}

export const FileService = {
  getFiles: async ({ extName }) => {
    const { data: files, code } = await fAxios.get(
      `/api/file/get?extName=${extName}`
    )
    if (code === 1 && files) {
      return files
    }
    throw new Error('invalid files')
  },
  getSysTemFiles: async ({ extName }) => {
    const { data: files, code } = await fAxios.get(
      `/api/file/getSysTemFiles?extName=${extName}`
    )
    if (code === 1 && files) {
      return files
    }
    throw new Error('invalid files')
  }
}

export const VersionService = {
  getPublishVersions: async ({ fileId, pageSize = 10, pageIndex = 1 }) => {
    const { data: versions, code } = await fAxios.get(
      `/api/workspace/publish/versions?fileId=${fileId}&pageSize=${pageSize}&pageIndex=${pageIndex}`
    )
    if (code === 1 && versions) {
      return versions
    }
    throw new Error('invalid versions')
  },
}
