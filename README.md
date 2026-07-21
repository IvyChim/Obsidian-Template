## Ivy's Obsidian Life System

> 一个基于 PARA 与 Periodic Notes 构建的 All-in-One Obsidian 知识管理系统。

本仓库是一个开箱即用的 Obsidian Vault 模板，旨在帮助刚接触 Obsidian 的用户快速建立一套完整、可持续维护的个人知识管理系统（PKM）。

本人入坑 Obsidian 将近三年，在此之前一直使用Onenote作为主要笔记工具。得益于AI工具应用，如今要上手 Obsidian 比三年前要简单得多。如果完全靠手搓 JavaScript、CSS ，真的很容易劝退一大部分人，特别是新手或对管理系统不熟悉的用户。但个人体验而言，Obsidian 绝对是目前市面上最好用且最有前景的笔记软件。因此，为了向更多人安利这款软件，本文将基于我长期实践和不断优化的仓库结构整理一个**开箱即用 Obsidian Vault 模板**，希望**新手们**再也无需从零开始折腾各种插件配置，只需下载并打开，就能拥有一套完整的知识管理系统，并逐步构建属于自己的 Second Brain。

## 设计理念

本仓库采用 Tiago Forte 提出的 **PARA（Projects、Areas、Resources、Archive）** 作为知识管理的核心框架。与传统按主题分类不同，PARA 更强调「行动导向（Action-oriented）」的组织方式。

- **Projects（项目）**：指的是具有明确目标和截止时间，需要完成的事项。如：
	- 毕业论文
	- 数学建模竞赛
	- 雅思备考
	这些项目结束后，会归档至 Archive。
	
- **Areas（领域）**：指长期持续维护的责任领域，没有明确结束时间。如：
	- 阅读
	- 健康管理
	- 财务管理
	- 语言学习
	Areas 更关注自身持续成长，而不是一次性完成。
	
- **Resources（资源）**：主要用于存放知识、资料和参考信息，可以按主题分类整理，也可以设立临时中转站，将收集的信息暂时放置，最后归入Areas关联的主题上。如：
	- 技术笔记
	- 学习资料
	- Obsidian 配置
	这里更像自己的知识库（Second Brain），后期可以接入AI协助消化知识。
	
- **Archive（归档）**：所有已经完成或暂时不再维护的内容都会进入 Archive，从而保持当前工作空间简洁。


当然，知识管理只是生活的一部分，PARA 解决的是 **「知识应该放在哪里？」** 的问题，我们的生活还有很多围绕"时间"展开的内容，例如：
- 每日日记
- 每月总结
- 年度规划
- 习惯养成
- 时间管理

这些内容天然具有时间属性。

因此，本仓库引入 **Periodic Notes**，作为整个系统的时间维度。所有 Daily、Monthly、Yearly Notes 都统一放在 `00PeriodicNotes` 中进行管理。

Periodic Notes 回答的是另一个问题：**「事情发生在什么时候？」** 它提供了时间维度（Time）。

### 💡为什么将 PARA 与 Periodic Notes 结合？

这是本仓库最核心的设计思想。PARA 与 Periodic Notes 并不是互相替代，而是互相补充。

它们分别管理两个不同的维度：

- **空间维度（PARA）**：知识属于哪里？
- **时间维度（Periodic Notes）**：知识产生于什么时候？

举个例子：

今天阅读一本书：
- 阅读记录属于 **Reading Area**
- 阅读发生在 **Daily Note**

完成一个项目：
- 项目资料属于 **Projects**
- 每天推进过程记录在 **Daily Note**

这样，无论是从知识分类，还是从时间回顾，都可以快速找到对应内容。

## 仓库结构

```text
.
├── .obsidian            # Obsidian 配置
├── 00PeriodicNotes      # 时间维度（日记、周记、月记等）
├── 01Projects           # 项目
├── 02Areas              # 长期领域
├── 03Resources          # 资源库
├── 04Archives           # 归档 
├── 🏠 Home.md           # Dashboard 首页
└── README.md
```

整个 Vault 遵循的工作流：

> **Home → Periodic Notes → PARA**

---

## 仓库特色

![Full_view](./03Resources/00Obsidian/Assets/Full_view.png)

相比一个普通的 Obsidian Vault，本模板更加注重实际使用体验。其中包含以下核心模块：

### 🏠 Home 首页

是整个 Vault 的入口，由【homepage】插件生成，内容可自行编辑，插件可将其固定为首页布局，它主要提供【统计Dashboard、快速导航、最近活动页面入口】。

其中【Important Days】的日程维护在“00PeriodicNotes/ImportantDates”文件中，只需在文件编辑新增重要事件及日期，首页会自动调整显示，已过期事项将不再显示。

![Home](./03Resources/00Obsidian/Assets/Home.png)

### ⏳ 日程管理 (2026.md)

本页面主要展示：年度计划、月度任务和日程总览。其中：

【年度计划】通过构建 **mermaid** 图实现，在该页面可直接编辑修改。

【月度任务】下有【Habit Tracker】，通过JS和CSS实现，数据来源 Daily Note。而四大模块主要依赖Tasks和column插件，在页面内可直接编辑修改。新的月份需要模版时，可直接点击右上角调整为”源码模式“后，复制模版月，再粘贴到新月份即可。其中【Habit Tracker】需修改代码中对应的月份信息。

【日程总览】是一个关于当前月的to do list日历图，由自行配置JS及CSS片段实现。

![Schedule Dashboard](./03Resources/00Obsidian/Assets/Schedule_dashboard.png)

![Habit_tracker](./03Resources/00Obsidian/Assets/Habit_tracker.png)

### 📚 阅读管理

这是一个完整的 Reading Workflow，存放在【02Areas/01Reading/00Reading】中，本页面主要展示：
- 阅读统计
- 书籍展示

它通过 Dataview 自动更新，日常只需新增/修改【02Areas/01Reading】内的阅读笔记文件即可，适合长期阅读管理。

当然，这套逻辑完全可复用在其他Areas中，如 Film/Music的档案管理。

![Reading](./03Resources/00Obsidian/Assets/Reading.png)

### 📝 模版管理

本仓库已配置【Templater】插件，并为常用文件夹【00PeriodicNotes】和【02Areas】设置了模版映射，例如：今日笔记模版——TP01_Diary 和读书笔记模版——TP02_Reading，根据自身习惯直接修改模版文档即可。

![[Template.png]]


## 插件说明

为了保证模板能够正常运行，本仓库依赖以下社区插件。

下载本仓库后，Obsidian 会自动检测缺失的插件。安装完成后，点击 **Trust author and enable plugins（信任作者并启用插件）**，即可直接使用本模板的大部分功能，无需额外配置。

| 插件 | 功能说明 | 官方链接 |
|------|----------|----------|
| **Calendar** | 提供日历视图，方便快速切换 Daily Notes，与 Periodic Notes 配合使用。 | https://github.com/liamcain/obsidian-calendar-plugin |
| **Columns** | 支持多栏布局，用于 Dashboard 页面排版。 | https://github.com/tnichols217/obsidian-columns |
| **Dataview** | 本模板最核心的插件，用于生成阅读列表、统计信息、Dashboard 等动态内容。 | https://blacksmithgu.github.io/obsidian-dataview/ |
| **Editing Toolbar** | 提供类似 Word 的可视化编辑工具栏，方便 Markdown 新手使用。 | https://github.com/PKM-er/obsidian-editing-toolbar |
| **Excalidraw** | 在 Obsidian 内创建手绘图、流程图、思维导图等。 | https://github.com/zsviczian/obsidian-excalidraw-plugin |
| **Homepage** | 指定 Vault 打开时默认进入 Home Dashboard。 | https://github.com/mirnovov/obsidian-homepage |
| **Kanban** | 创建看板（Kanban）管理项目和任务。 | https://github.com/mgmeyers/obsidian-kanban |
| **Minimal Theme Settings** | Minimal 主题的扩展设置，用于调整主题样式。 | https://github.com/kepano/obsidian-minimal-settings |
| **Style Settings** | 为主题和插件提供统一的可视化样式配置界面。 | https://github.com/mgmeyers/obsidian-style-settings |
| **Tasks** | 增强 Obsidian 原生任务管理，支持查询、过滤、截止日期等高级功能。 | https://publish.obsidian.md/tasks/ |
| **Tasks Calendar Wrapper** | 在 Calendar 中显示 Tasks 任务，提高时间管理效率。 | https://github.com/SeanCoates/obsidian-task-calendar-wrapper |
| **Templater** | 高级模板插件，用于自动创建 Daily Note、阅读记录等模板内容。 | https://silentvoid13.github.io/Templater/ |

### 💡插件安装方法

1. 打开 **Settings → Community Plugins**
2. 关闭 Safe Mode（如果尚未关闭）
3. 点击 **Browse**
4. 搜索并安装上述插件
5. 返回插件列表，启用所有插件
6. 首次打开 Vault 时，点击 **Trust author and enable plugins** 即可完成配置

⚠️：如果某些 Dashboard、阅读统计或自动化功能无法正常显示，请首先确认 **Dataview** 和 **Templater** 已成功启用。这两个插件是本模板的核心依赖。


## 安装教程

1. **下载仓库**
    - 点击 **Code → Download ZIP**
    - 解压到本地
2. **打开 Obsidian**
    - 选择 **Open folder as vault**
    - 打开下载后的文件夹
3. **安装并启用插件**
    - 根据 README 中的插件列表安装所需社区插件
    - 安装完成后，点击 **Trust author and enable plugins（信任作者并启用插件）**
4. **开始使用**
    - 点击左边“管理工作区布局”，打开 Default 布局，即可进入 Dashboard 开始体验整个 Vault。
