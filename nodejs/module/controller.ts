import {
  Req,
  Post,
  Body,
  Controller
} from "@nestjs/common";
import { Logger } from "@mybricks/rocker-commons";
import publish from "./publish";

@Controller("api/pc-page-template")
export default class PcPageController {

  @Post("/publish")
  async publish(
    @Body("userId") userId: string,
    @Body("fileId") fileId: number,
    @Body("fileName") fileName: string,
    @Body("json") json: any,
    @Req() req: any
  ) {

    try {
      await publish({
        userId,
        fileId,
        fileName,
        json
      })
      return {
        code: 1,
        message: "发布成功",
        data: {},
      };
    } catch (error) {
      Logger.info("[publish] fail " + error.message, error);
      return {
        code: -1,
        errCode: error.errCode,
        message:
          error?.message ||
          (error.code ? `发布失败，错误码：${error.code}` : "发布失败"),
        stack: error?.stack,
      };
    }
  }

  @Post("/searchUser")
  async searchUser(
    @Body("keyword") keyword: string,
  ) {
    return await this.service.searchUser({ keyword });
  }
}

export function isDefined(v: any) {
  return v !== undefined;
}
