# 功能原理

:::warning

这部分给出了部分代码，是用于其他的开发者开发。
可以借鉴，但不能完全照搬然后改名字。
这种不文明行为只会获得他人网爆。

:::

## 页脚添加说明

等到页脚 `footer` 出现，在末尾添加要说的话。

```js
// 添加页脚信息
const checkFooter = setInterval(() => {
    const $footer = $("body > div.body-footer");
    if ($footer.length > 0) {
        clearInterval(checkFooter);
        if ($footer.find('a[href*="zhangyimin12345"]').length === 0) {
            $footer.append("<p>Theme powered by <a href=\"https://www.cnblogs.com/zhangyimin12345/p/19046066/VJudge-beautification\">Better VJudge（by zhangyimin12345）</a></p>");
        }
    }
}, 300);
```

## 自动更新

从北极小狐那儿~~偷~~学来的，创建一个 `versions.json` 存放最新版本，每次检查当前版本（`GM_info.script.version`）是否是最新版本。

- 如果是，不做任何操作
- 如果不是，就创建一个窗口，扔出最新版源码链接，篡改猴会自动处理。

至于稍后提醒，就是存一下，让一天内不再弹出弹窗。

~~（话说为什么不用 `swal`）~~

## 爬取样例

用 `#frame-description` 定位，在里面寻找 `table.vjudge_sample`，找到一个存一个。

```js
function fetchTestCases() {
    testCaseList = [];
    const $iframe = $('#frame-description'); // 使用 iframe 的 id 来定位
    if (!$iframe.length) {
        return;
    }
    const iframeDoc = $iframe[0].contentDocument || $iframe[0].contentWindow.document;
    if (!iframeDoc) {
        return;
    }
    // 在 iframe 的文档中查找样例表格
    const $sampleTables = $(iframeDoc).find('table.vjudge_sample');
    if ($sampleTables.length > 0) {
        $sampleTables.each(function () {
            $(this).find('tbody tr').each(function () {
                const $row = $(this);
                const input = $row.find('td:first pre').text().trim();
                const output = $row.find('td:last pre').text().trim();
                if (input && output) {
                    testCaseList.push({ input, output });
                }
            });
        });
        if (testCaseList.length > 0) {
            $('#better-vjudge-terminal-input-field').val(testCaseList[0].input);
        }
    } else {
        // 重试机制
        setTimeout(() => {
            const retryDoc = $iframe[0].contentDocument || $iframe[0].contentWindow.document;
            const retrySampleTables = $(retryDoc).find('table.vjudge_sample');
            if (retrySampleTables.length > 0) {
                fetchTestCases();
            }
        }, 100);
    }
}
```

## 代码编辑器

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

## 运行

用 `Rextester` 白嫖代码运行，爬样例前面讲过了，自定义样例逻辑也不复杂，就不讲了。
~~拿 AI 调了半天才调好。~~

```js
async function rextesterCompiler(code, input = '') {
    const maxRetries = 3;
    const retryDelay = 1000;

    const makeRequest = () => {
        return new Promise((resolve, reject) => {
            const data = new FormData();
            data.append('LanguageChoiceWrapper', '7');
            data.append('EditorChoiceWrapper', '1');
            data.append('LayoutChoiceWrapper', '1');
            data.append('Program', code);
            data.append('CompilerArgs', '-Wall -std=c++14 -O2 -o a.out source_file.cpp'); 
            data.append('Input', input);
            data.append('ShowWarnings', 'false');
            data.append('IsInEditMode', 'false');
            data.append('IsLive', 'false');

            GM_xmlhttpRequest({
                method: 'POST',
                url: 'https://rextester.com/rundotnet/Run',
                data: data,
                onload: function (responseDetails) {
                    if (responseDetails.status !== 200 || !responseDetails.responseText) {
                        return reject(new Error(`HTTP ${responseDetails.status}: Request failed`));
                    }
                    try {
                        const response = JSON.parse(responseDetails.responseText);
                        resolve({
                            errors: response.Errors || null,
                            result: response.Result || null,
                            warnings: response.Warnings || null,
                            time: response.Stats || null
                        });
                    } catch (e) {
                        reject(new Error(`Parse Error: ${e.message}`));
                    }
                },
                ontimeout: function () {
                    reject(new Error("Request to Rextester timed out"));
                },
                onerror: function (err) {
                    reject(new Error(`Network Error: ${err.statusText || err}`));
                }
            });
        });
    };

    // 执行带重试的请求
    for (let i = 0; i < maxRetries; i++) {
        try {
            const result = await makeRequest();
            return result; // 成功，直接返回
        } catch (error) {
            if (i === maxRetries - 1) throw error; // 最后一次重试失败，抛出错误
            console.warn(`Rextester request failed (attempt ${i + 1}/${maxRetries}), retrying in ${retryDelay}ms...`, error);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
}
```

:::warning

这部分给出了部分代码，是用于其他的开发者开发。
可以借鉴，但不能完全照搬然后改名字。
这种不文明行为只会获得他人唾弃。

:::
