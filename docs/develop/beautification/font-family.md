# 字体

字体看着有点不舒服，就换了一下：
```css
body, input, button, select, iframe, table.table {
    font-family: 'Comfortaa', LXGW Wenkai Screen, sans-serif !important;
}
#description-container>dd {
    font-family: 'Comfortaa', LXGW Wenkai Screen, sans-serif !important;
}
```

至于字体引用，用 `jsdelivr` 的镜像 `jsdmirror`。

```js
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://cdn.jsdmirror.com/npm/@fontsource/comfortaa@5.0.17/index.css';
document.head.appendChild(fontLink);
const fontLink2 = document.createElement('link');
fontLink2.rel = 'stylesheet';
fontLink2.href = 'https://cdn.jsdmirror.com/npm/lxgw-wenkai-screen-webfont@1.7.0/style.min.css';
document.head.appendChild(fontLink2);
```

代码个人喜欢 `Consolas`。

```css
table.vjudge_sample pre, textarea {
    font-family: Consolas, monospace !important;
}
```

还有一些图标，从则是北极小狐那儿弄来的 `iconfont`。

```css
.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
@font-face {
    font-family: 'iconfont';  /* Project id 4284341 */
    src: url('//aowuucdn.oss-accelerate.aliyuncs.com/iconfont/iconfont.woff2') format('woff2'),
         url('//aowuucdn.oss-accelerate.aliyuncs.com/iconfont/iconfont.woff2.ttf') format('truetype');
}
```

