import { fAxios } from '@/services/http'
export default async function seachUser(url: string, params) {
    return await fAxios.post(
        url,
        params
    ).then((response) => {
        return response;
    })
        .catch((error) => {
            console.error("搜索用户失败，报错信息:", error);
            throw error;
        });
}
