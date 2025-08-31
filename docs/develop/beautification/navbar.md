# 顶栏

使其透明固定并添加毛糊玻璃背景效果。

```css
.navbar {
    border-radius: 0rem;
    background-color: rgba(0, 0, 0, 50%) !important;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    backdrop-filter: blur(3px);
}
```

由于顶栏固定，需要将主内容添加 `padding-top` 属性。

```css
.container-fluid, .container {
    padding-top: 45px;
}
```

但这样会对不应该 `padding-top` 的元素添加属性，所以：

```css
#index-intro, #solution-container {
    margin-top: 60px;
}
#prob-statistics .container, #contest_overview, #contest_status, #contest_problem, #prob-properties .container, #prob-operation .container, #description-container {
    padding-top: 0px !important;
}
```

