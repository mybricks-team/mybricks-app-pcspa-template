export const scheduleTaskProxy = function () {
  const timeoutList = [];
  const intervalList = [];
  const rawWindowInterval = window.setInterval;
  const rawWindowTimeout = window.setTimeout;
  // @ts-ignore
  window.setTimeout = (handler: TimerHandler, timeout?: number, ...args) => {
    const timeoutId = rawWindowTimeout(handler, timeout, ...args);
    timeoutList.push(timeoutId);
    return timeoutId;
  };
  // @ts-ignore
  window.setInterval = (handler: TimerHandler, timeout?: number, ...args) => {
    const intervalId = rawWindowInterval(handler, timeout, ...args);
    intervalList.push(intervalId);
    return intervalId;
  };
  return function () {
    timeoutList.forEach((timer) => {
      window.clearTimeout(timer);
    });
    intervalList.forEach((interval) => {
      window.clearInterval(interval);
    });
    window.setTimeout = rawWindowTimeout;
    window.setInterval = rawWindowInterval;
  };
};

export const scheduleTaskListen = function () {
  const listenList = [];
  return {
    addListen(listen) {
      if (typeof listen === "function") {
        listenList.push(listen);
      }
    },
    cleanListen() {
      listenList.forEach((fn) => fn());
    },
  };
};