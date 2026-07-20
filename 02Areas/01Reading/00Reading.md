---
cssclasses:
  - cards
---
## 📊 书籍统计
```dataview
TABLE WITHOUT ID
status, length(rows) as 数量
FROM "02Areas/01Reading"
WHERE file.name != "00Reading"  
GROUP BY status
```

## 📚 我的书架
``` dataview

TABLE Without ID
embed(link(cover)) as Cover,
file.link as Book,
author,
publisher,
publishDate,
doubanUrl,
status,
rating,
type,
readDate
FROM "02Areas/01Reading"
WHERE file.name != "00Reading"  

```
