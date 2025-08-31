# 页脚添加说明

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

