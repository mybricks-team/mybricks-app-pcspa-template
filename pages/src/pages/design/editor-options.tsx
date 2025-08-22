import axios from "axios";
import API from "@mybricks/sdk-for-app/api";

export const PURE_INTERNET_EDITOR_OPTIONS = {
  expression: {
    CDN: {
      codemirror: "/mfs/editor_assets/codemirror/codemirror_1.0.13_index.min.js",
    },
  },
  richtext: {
    CDN: {
      tinymce: "/mfs/editor_assets/richText/tinymce/5.7.1/tinymce.min.js",
      indent2emPluginCDN: "/mfs/editor_assets/richText/tinymce/5.7.1/plugins/indent2em/plugin.js",
      language: "/mfs/editor_assets/richText/tinymce/5.7.1/zh_CN.js",
    },
  },
  align: {
    CDN: {
      left: "/mfs/editor_assets/align/left.defc4a63ebe8ea7d.svg",
      rowCenter: "/mfs/editor_assets/align/center.c284343a9ff9672a.svg",
      right: "/mfs/editor_assets/align/right.a7763b38b84b5894.svg",
      top: "/mfs/editor_assets/align/top.98906024d52b69de.svg",
      columnCenter: "/mfs/editor_assets/align/center.100376f4ade480cd.svg",
      bottom: "/mfs/editor_assets/align/bottom.6ee532067ed440ca.svg",
      column: "/mfs/editor_assets/align/column-space-between.31d560c0e611198f.svg",
      row: "/mfs/editor_assets/align/row-space-between.ead5cd660c0f1c33.svg",
    },
  },
  array: {
    CDN: {
      sortableHoc: "/mfs/editor_assets/react-sortable/react-sortable-hoc-2.0.0_index.umd.min.js",
    },
  },
  expcode: {
    CDN: {
      prettier: {
        standalone: "/mfs/editor_assets/prettier/2.6.2/standalone.js",
        babel: "/mfs/editor_assets/prettier/2.6.2/parser-babel.js",
      },
      eslint: "/mfs/editor_assets/eslint/8.15.0/eslint.js",
      paths: {
        vs: "/mfs/editor_assets/monaco-editor/0.33.0/min/vs",
      },
      monacoLoader: "/mfs/editor_assets/monaco-editor/0.33.0/min/vs/loader.min.js",
    },
  },
  csseditor: {
    CDN: {
      prettier: {
        standalone: "/mfs/editor_assets/prettier/2.6.2/standalone.js",
        babel: "/mfs/editor_assets/prettier/2.6.2/parser-babel.js",
      },
      eslint: "/mfs/editor_assets/eslint/8.15.0/eslint.js",
      paths: {
        vs: "/mfs/editor_assets/monaco-editor/0.33.0/min/vs",
      },
      monacoLoader: "/mfs/editor_assets/monaco-editor/0.33.0/min/vs/loader.min.js",
    },
  },
  stylenew: {
    CDN: {
      prettier: {
        standalone: "/mfs/editor_assets/prettier/2.6.2/standalone.js",
        babel: "/mfs/editor_assets/prettier/2.6.2/parser-babel.js",
      },
      eslint: "/mfs/editor_assets/eslint/8.15.0/eslint.js",
      paths: {
        vs: "/mfs/editor_assets/monaco-editor/0.33.0/min/vs",
      },
      monacoLoader: "/mfs/editor_assets/monaco-editor/0.33.0/min/vs/loader.min.js",
    },
  },
  code: {
    CDN: {
      prettier: {
        standalone: "/mfs/editor_assets/prettier/2.6.2/standalone.js",
        babel: "/mfs/editor_assets/prettier/2.6.2/parser-babel.js",
      },
      eslint: "/mfs/editor_assets/eslint/8.15.0/eslint.js",
      paths: {
        vs: "/mfs/editor_assets/monaco-editor/0.33.0/min/vs",
      },
      monacoLoader: "/mfs/editor_assets/monaco-editor/0.33.0/min/vs/loader.min.js",
    },
  },
};

export const DESIGN_MATERIAL_EDITOR_OPTIONS = (ctx) => {
  return {
    icon: {
      extras: [
        {
          title: "物料中心",
          key: "MaterialCenter",
          async dataFetcher(): Promise<Record<string, string>> {
            const result = await API.Material.getMaterialList({
              type: "picture",
              tags: "icon",
              pageSize: 9999
            }).then((res) => {
              return Object.fromEntries(
                res.list
                  .map((item: { namespace: string; title: string; preview_img: string }) => [
                    item.namespace,
                    {
                      title: item.title,
                      svg: item.preview_img,
                    },
                  ])
                  .filter((item: any) => item[1])
              );
            });
            return result;
          },
        },
      ],
    },
    imageselector: {
      extras: [
        {
          title: "素材",
          key: "MaterialCenter",
          event() {
            return new Promise((resolve) => {
              ctx.sdk.openUrl({
                url: "MYBRICKS://mybricks-material/materialSelectorPage",
                params: {
                  userId: ctx.user?.id,
                  combo: false,
                  title: "选择图片素材",
                  type: "picture",
                  tags: ["image"],
                },
                onSuccess: async ({ materials }) => {
                  if (materials.length > 0) {
                    resolve(materials[0].preview_img);
                  }
                },
              });
            });
          },
        },
      ],
    },
  };
};

export function mergeEditorOptions(editorOptions: (Record<string, any> | boolean)[]): Record<string, any> {
  const options: Record<string, any> = {};
  for (let i = 0; i < editorOptions.length; i++) {
    const element = editorOptions[i];
    if (typeof element === "boolean") {
      continue;
    } else {
      Object.assign(options, element);
    }
  }
  return options;
}
