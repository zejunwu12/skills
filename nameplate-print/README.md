# Trae Skills

Trae AI 助手的 Skill 合集仓库。每个 Skill 是一个独立的功能模块，存放在对应的子目录中。

## 已有 Skills

| Skill | 目录 | 说明 |
|-------|------|------|
| 名牌打印 | [nameplate-print/](./nameplate-print/) | 生成分组名牌/标识牌 Word 文档，每个组名独占一页，大字体居中排版，适合打印张贴 |

## 仓库结构

```
skills/                          ← 仓库根目录
├── .gitignore
├── LICENSE
├── README.md
├── nameplate-print/             ← 名牌打印 Skill
│   ├── SKILL.md                 ← Skill 定义文件
│   ├── package.json
│   ├── package-lock.json
│   ├── scripts/
│   │   └── generate_groups.js   ← 核心逻辑
│   └── examples/
│       └── basic-usage.js       ← 使用示例
└── your-new-skill/              ← 后续新增的 Skill
    ├── SKILL.md
    └── ...
```

## 如何新增 Skill

1. 在仓库根目录创建以 skill 名称命名的文件夹，如 `my-skill/`
2. 在文件夹内放置 `SKILL.md`（skill 定义文件）、`package.json`、源码等
3. 向本 `README.md` 的表格中追加一条记录
4. 提交 PR

## 许可

MIT License — 详见 [LICENSE](./LICENSE)