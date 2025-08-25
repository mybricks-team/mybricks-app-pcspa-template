import API from "@mybricks/sdk-for-app/api";
import { Logger } from "@mybricks/rocker-commons";

export async function searchUser({ keyword }) {
  try {
    Logger.info("[searchUser] 开始搜索用户...");
    Logger.info(
      `[searchUser] 调用 API.User.searchUserByKeyword, 参数 keyword: ${keyword}`
    );
    const data = await API.User.searchUserByKeyword({
      keyword,
    });
    Logger.info(`[searchUser] 成功，返回用户条数: ${data?.length}`);
    return data;
  } catch (e) {
    Logger.error(
      `[searchUser] 搜索用户报错: ${e?.message || JSON.stringify(e, null, 2)
      }`
    );
    throw e;
  }
}
