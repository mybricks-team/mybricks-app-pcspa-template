// 海牛侧-上报用户的页面开发时间
import React , { useEffect, useState } from "react";
import get from "lodash/get";
import axios from "axios";

interface PageTimerType {
  operable: boolean,
  appData: any,
  currentRef: React.MutableRefObject<{
    dump: any;
    toJSON: any;
    geoView: any;
    switchActivity: any;
    getPluginData: any;
    loadContent: any;
    toplView: {
        focusCom: (comId: string) => void;
    };
}>
}
function parseTokenOrSession(data: string | null) {
  if (!data) return "";

  try {
    return atob(atob(data));
  } catch {
    return "";
  }
}

function sendPageTimer(appData: any, currentRef: any) {
  const makeSendParam = (target) => {
    const projectId = get(target, ["sdk", "projectId"]);
    const pageId = get(target, ["fileId"]);
    const mybricksUserId = get(target, ["user", "id"]);
    return { projectId, pageId, mybricksUserId };
  };

  const getAuth = () => {
    const token = parseTokenOrSession(localStorage.getItem("token"));
    const session = parseTokenOrSession(localStorage.getItem("session"));
    return [token, session];
  };
  const request = async (data: any) => {
    const [token, session] = getAuth();
    try {
      await axios({
        method: "POST",
        url: "/biz/modularity/project0/saveMybricksPageDevTime",
        withCredentials: true,
        data,
        headers: {
          "Content-Type": "application/json",
          token,
          session,
        },
      });
      return true;
    } catch (e) {
      console.log(e?.data?.msg);
      return false;
    }
  };

  const sendRequest = () => {
    const pageRepoterConfig = get(appData, ["appConfig", "pageRepoterConfig"]);
    if (!pageRepoterConfig?.reporterStatus) return false;
    const baseData = makeSendParam(appData);
    const { level: pageLevel } =
      currentRef.current?.getSummary() || {};
    // 接口上报时间
    try {
      request({
        ...baseData,
        devTotalTime: 60,
        pageLevel,
      });
    } catch {
      console.log("页面数据上报失败");
    }
  };

  return sendRequest()
}

const PAGE_NO_OPTTIME = 5 //五分钟

// 自定义 hook：usePageStayTime
export const usePageStayTime = ({operable, appData, currentRef}:PageTimerType) => {
  const [optCount, setOptCount] = useState(0); // 用户总停留时间
  const [isPageVisible, setIsPageVisible] = useState(true); // 页面是否可见

  useEffect(() => {
    // 监听页面是否可见
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // 页面不可见时
        setOptCount(PAGE_NO_OPTTIME)
      } else {
        // 页面重新可见时
      }
      setIsPageVisible(!document.hidden);
    };

    // 监听 visibilitychange 事件
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 监听用户操作（点击、滚动、键盘按键等）
    const handleUserActivity = () => {
      if (isPageVisible) {
        // 页面可见时,重置操作次数
        setOptCount(0)
      }
    };

    // 监听点击、滚动、鼠标移动、键盘按键等事件
    ['click', 'mousemove','keydown'].forEach(event => {
      document.addEventListener(event, handleUserActivity);
    });

    // 定时器每秒钟上报一次停留时间
    const intervalId = setInterval(() => {
      if(!operable) return
      if (isPageVisible) {
        if(optCount > PAGE_NO_OPTTIME) {
          return 
        }
        setOptCount(value => value + 1)
        // 接口上报
        sendPageTimer(appData, currentRef)
      }
    }, 1000 *  60);

    // 清理副作用，组件卸载时移除事件监听器和定时器
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      ['click', 'mousemove', 'keydown'].forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
      clearInterval(intervalId);
    };
  }, [optCount, isPageVisible, operable ]);

};

export default sendPageTimer;
