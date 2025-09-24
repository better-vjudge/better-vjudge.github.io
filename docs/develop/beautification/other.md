# 其他

## 广告

很简单，发现所有广告都有一层 `adsbygoogle`，直接把它隐藏，就再也见不到南国群岛岛主招募了。

```css
.adsbygoogle {
    display: none !important;
}
```

## 评论

调了样式后亮色模式下用户评论元素看着不舒服，调了一下样式。

```css
li.comment-post>table .info {
    background-color: #fff !important;
    border-bottom: 2px var(--ground-color) solid;
}
.dark-mode li.comment-post>table .info {
    background-color: #1e1e1e !important;
    border-bottom: none;
}
```

## 评论输入框

底下的颜色看起来不舒服。

```css
div.show-comment-edit {
    margin-top: 10px;
    background-color: #f0f0f0;
}
.dark-mode div.show-comment-edit {
    background-color: #2c2c2e;
}
```

## 杂七杂八的间距调整

```css
#prob-right-panel {
    margin-bottom: 30px;
    padding-bottom: 10px;
}
.comment-posts-container {
    margin-bottom: 10px;
}
```

