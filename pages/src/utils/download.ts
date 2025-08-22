export default async function download(url: string) {
  let fileName;

  return await fetch(url)
    .then((response) => {
      const disposition = response.headers.get("Content-Disposition");
      const match = disposition && disposition.match(/filename=(.+)/);
      fileName = match ? match[1] : "defaultFileName";

      if (!response.ok) {
        throw new Error("下载文件失败！");
      }
      return response.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("下载文件失败，报错信息:", error);
      throw error;
    });
}
