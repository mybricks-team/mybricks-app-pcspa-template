import API from "@mybricks/sdk-for-app/api";

const publish = async (params: any) => {
  const { userId, fileId, json, fileName, icon } = params;

  // @ts-ignore
  const publishResult: any = await API.File.publish({
    userId,
    fileId,
    extName: "pc-page-template",
    content: JSON.stringify(json)
  })

  await API.Material.createCommonMaterial({
    userId,
    title: fileName,
    type: "pc-page-template",
    namespace: `mybricks.pc.page.template.${fileId}`,
    scene: null,
    previewImg: icon,
    content: JSON.stringify({
      publishId: publishResult.pib_id,
    }),
  })
}

export default publish
