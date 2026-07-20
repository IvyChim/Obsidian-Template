***
```dataviewjs                 
let ftMd = dv.pages("").file.sort(t => t.cday)[0]
let total = parseInt([new Date() - ftMd.ctime] / (60*60*24*1000))
let totalDays = "您已使用 Obsidian "+"**"+total+"**"+" 天，"
let nofold = '!"misc/templates"'
let allFile = dv.pages(nofold).file
let totalMd = "共创建 "+
	"**"+allFile.length+"**"+" 篇笔记"
let totalTag = "**"+allFile.etags.distinct().length+"**"+" 个标签"
let totalTask = "**"+allFile.tasks.length+"**"+" 个任务。 "
dv.paragraph(
	totalDays+totalMd+"，"+totalTag+"，"+totalTask
)
```
***


```dataviewjs  
await dv.view(  
"03Resources/00Obsidian/Scripts/time-dashboard"  
);  
``` 


# 快速导航
>[!col]
>
>>[!Tips]+ <u> PROJECTS </u> 
>>- [[Example Project|📌 Example Project]]
>
>>[!note]+ <u> NOTES </u>
>>- `$='[['+moment().format("YYYY")+'|📝 年度笔记]]'`
>>- `$='[['+moment().format("YYYYMMDD")+'|🔖 今日笔记]]'`
>
>>[!example]+ <u> AREAS </u>
>>
>>- [[00Reading|📖 Reading]]
>>- [[00Film|🎬 Film Library]]
>>- [[00Music|🎵 Music Library]]
>>- [[00Travel|🛫 Travel]]

# 最近活动
>[!col]
>>
>>### 最近编辑
>>```dataview
table 
file.mtime as date_modited
from !"模板" and !"kanban"
sort file.mtime desc
limit 10
>>```
>
> >### 最近创建
> >```dataview
table 
file.ctime as date_created
where date(today) - file.ctime <=dur(3 days)
sort file.ctime desc
limit 10
>>```
