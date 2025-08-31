# 比赛排行榜

发现调了背景之后排行榜内未做的题还是灰色的，于是：

```css
#contest-rank-table td.prob {
    background-color: #fff;
}
#contest-rank-table td.prob.fb {
    background-color: #080 !important;
    color: #fff;
    font-weight: 700;
}
```

但这样会覆盖，于是：
```css
#contest-rank-table th.accepted {
    background-color: #a9f5af !important;
}
#contest-rank-table th.failed {
    background-color: #fdd !important;
}
#contest-rank-table th.pending {
    background-color: #e2e4ff !important;
}
#contest-rank-table td.accepted {
    background-color: #a9f5af !important;
}
#contest-rank-table td.failed {
    background-color: #fdd !important;
}
#contest-rank-table td.pending {
    background-color: #e2e4ff !important;
}
#contest-rank-table td.prob {
    background-color: #fff;
}
```

