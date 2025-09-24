# 爬取样例

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

