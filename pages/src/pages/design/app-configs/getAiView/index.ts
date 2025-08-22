import aiViewConfig, { getAIResponse } from './aiview'
// import { mock1Prompts } from './mock';
// import mock2Prompts from './mock/mock2Prompts';
// import mock1Res from './mock/mock1Res'
// import mock2Res from './mock/mock2Res'
// import { aiUtils } from "./utils/get-ai-encrypt-data"

// const DEFAULT_MODEL = 'deepseek-chat';
const DEFAULT_MODEL = 'openai/gpt-4.1-mini-2025-04-14';
function getDesignerParams(args, { defaultModel }) {
  let context = args[0];
  let tools = undefined;
  let extraOption = {};

  if (args.length === 2) {
    tools = args[0];
    context = args[1];
  }

  if (args.length === 3) {
    tools = args[0];
    context = args[1];
    extraOption = args[2];
  }

  let model = defaultModel || DEFAULT_MODEL, role;

  switch (true) {
    case extraOption?.expert === 'image': {
      model = 'anthropic/claude-sonnet-4';
      role = 'image'
      break;
    }
    case ['image'].includes(extraOption?.aiRole): {
      model = 'anthropic/claude-sonnet-4';
      role = 'image'
      break
    }
    case ['architect'].includes(extraOption.aiRole): {
      model = 'google/gemini-2.5-pro-preview';
      // model = 'openai/gpt-4.1'
      // model = 'deepseek/deepseek-r1-0528'
      role = 'architect'
      break
    }
    case ['expert'].includes(extraOption.aiRole): {
      model = 'anthropic/claude-sonnet-4';
      role = 'expert'
      break
    }
    default: {
      role = 'default'
      break;
    }
  }

  return {
    context: context ?? {},
    tools,
    model,
    role,
  }
}

const getAiView = (enableAI, option) => {
  const { model: defaultModel, designerRef } = option ?? {};

  if (enableAI) {
    return {
      ...aiViewConfig,
      getNewDSL: aiViewConfig.getNewDSL({ designerRef }),
      async requestAsStream(messages, ...args) {
        const { context, tools, model, role } = getDesignerParams(args, {
          defaultModel
        });
        const { write, complete, error, cancel } = context ?? {};
        // 用于debug用户当前使用的模型
        window._ai_use_model_ = model;

        // const cancelControl = !!AbortController ? new AbortController() : null;

        // cancel?.(() => {
        //   cancelControl?.abort?.();
        // });

        // let _message = Array.from(messages)

        // console.log(1, _message)

        // const isFirstOne = messages.length === 2
        // if (isFirstOne) {
        //   write(mock1Res);
        //   complete();
        //   return
        //   _message[0].content = mock1Prompts
        // }

        // const isScenond = messages.length > 2
        // if (isScenond) {
        //   setTimeout(() => {
        //     write(mock2Res);
        //     complete();
        //   }, 1000)
        //   return 
        //   // _message[0].content = mock2Prompts
        //   // _message = [_message[0], _message[1], _message[2], _message[3]]
        // }

        // console.log(2, _message)

        try {
          const { abort } = await getAIResponse({
            model,
            messages,
            role,
            tools
          }, {
            onMessage: (chunk) => {
              write(chunk);
            },
            onComplete: (content) => {
              complete();
            },
            devMode: APP_ENV !== 'production',
          })

          cancel?.(abort)

          // const response = await fetch(
          //   APP_ENV === 'production' ? "//ai.mybricks.world/stream-with-tools" : "//ai.mybricks.world/stream-test",
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //       ...(role ? {
          //         "M-Request-Role": role,
          //       } : {})
          //     },
          //     signal: cancelControl?.signal,
          //     credentials: 'include',
          //     body: JSON.stringify(
          //       APP_ENV === 'production' ? aiUtils.getAiEncryptData({
          //         model,
          //         role,
          //         messages,
          //         tools,
          //         tool_choice: 'auto',
          //         // tool_choice: {"type": "function", "function": {"name": "query_knowledges"}},
          //       }) : {
          //         model,
          //         messages,
          //         tools,
          //         tool_choice: 'auto',
          //       }
          //     ),
          //   }
          // );

          // const reader = response.body.getReader();
          // const decoder = new TextDecoder();

          // while (true) {
          //   const { done, value } = await reader.read();
          //   if (done) {
          //     break;
          //   }

          //   const chunk = decoder.decode(value, { stream: true });
          //   write(chunk);
          // }

          // complete();
        } catch (ex) {
          error(ex);
        }
      },
    };
  }

  return void 0;
};

export default getAiView
