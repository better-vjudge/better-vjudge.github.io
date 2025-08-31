# 代码编辑器

最开始为了速度用的 `CodeMirror`，但觉得太丑了，就换成了 `Monaco`。

不知道为什么，直接引用不行，就：

```js
const loadMonacoScript = () => {
    return new Promise((resolve, reject) => {
        if (typeof require !== 'undefined' && typeof monaco !== 'undefined') {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/monaco-editor/0.49.0/min/vs/loader.min.js';
        script.onload = () => {
            require.config({
                'vs/nls': { availableLanguages: { '*': 'zh-cn' } },
                paths: {
                    vs: 'https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/monaco-editor/0.49.0/min/vs'
                }
            });
            require(['vs/editor/editor.main'], () => {
                resolve();
            });
        };
        script.onerror = (err) => {
            console.error('Failed to load Monaco Editor script:', err);
            reject(err);
        };
        document.body.appendChild(script);
    });
};
```

再往上面套个工具栏，自动保存代码直接存题号，两种布局 `css` 实现的。