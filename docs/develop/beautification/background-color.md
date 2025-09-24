# 主体颜色

灰色背景太难看了，于是：

```css
body {
    background-color: #fff !important;
}
#description-container>dd {
    background-color: #fff !important;
}
```

考虑到暗色模式时背景颜色不会改变，所以添加样式：
```css
.dark-mode body {
    background-color: #1e1e1e !important;
}
.dark-mode #description-container>dd {
    background-color: #2c2c2e !important;
}
```

