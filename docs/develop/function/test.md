# 运行

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

