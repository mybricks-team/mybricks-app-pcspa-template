import { fAxios } from '@/services/http'
export default async function upload(url: string, file) {
    const formData = new FormData();
    formData.append("file", file);
    return await fAxios.post(
        url,
        formData
    ).then((response) => {
        return response;
    }).catch((error) => {
        console.error("上传文件失败，报错信息:", error);
        throw error;
    });
}
