---
type: meta
title: "Dashboard"
updated: 2026-04-22
---
# 電験3種 Wiki Dashboard

## Recent Activity
```dataview
TABLE type, status, updated FROM "denken-study/wiki" SORT updated DESC LIMIT 15
```

## Seed Pages（要開発）
```dataview
LIST FROM "denken-study/wiki" WHERE status = "seed" SORT updated ASC
```

## 矛盾フラグ付きページ
```dataview
LIST FROM "denken-study/wiki" WHERE contains(tags, "contradiction") SORT updated DESC
```

## 重要度A（未成熟）
```dataview
LIST FROM "denken-study/wiki/concepts" WHERE status != "mature" AND status != "evergreen" SORT updated ASC
```
