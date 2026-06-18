---
name: nameplate-print
description: 当用户需要将组名/团队名称生成为可打印的名牌或标识牌文档时使用。每个组名独占一页，大字体居中排版，适合直接打印张贴。支持自定义组名列表、字体和字号
---

# 分组名牌打印

## Overview

This skill generates a Word document (.docx) where each page prints a single group name in large font, centered both horizontally and vertically. Designed for printing and posting on walls, name tags, signs, or banners for organizational grouping.

**Typical use cases:**
- Event group signage (e.g., "商旅开发组A", "安全保卫组")
- Team/group name posters for meetings or activities
- Any scenario where each group name needs a full-page printout

## Core Capabilities

| Feature | Default | Configurable |
|---------|---------|-------------|
| Page orientation | Landscape | Yes |
| Font | SimHei (黑体) | Yes |
| Font size | 110pt | Yes |
| Horizontal alignment | Center | Yes |
| Vertical alignment | Center | Yes |
| Paper size | A4 | Yes |

## Workflow

### Step 1: Install Dependencies

Ensure Node.js and the `docx` package are available in the working directory:

```bash
cd <work-dir>
npm init -y
npm install docx
```

### Step 2: Prepare the Group Names

Gather the list of group names from the user (or use the provided list). Each name becomes one page in the document.

### Step 3: Run the Generation Script

Create a script that uses the skill's module:

```javascript
const { generateGroupNameDoc } = require('C:\\Users\\Admin\\.trae-cn\\skills\\group-name-print\\scripts\\generate_groups.js');

generateGroupNameDoc({
  groups: ['商旅开发组A', '商旅开发组B', '安全保卫组'],
  outputPath: 'path/to/output.docx',
});
```

### Step 4: Execute

```bash
node generate.js
```

## Script API

### `generateGroupNameDoc(options)`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `groups` | `string[]` | (required) | Array of group name strings, one per page |
| `outputPath` | `string` | (required) | Full path for the output .docx file |
| `font` | `string` | `'SimHei'` | Font name |
| `fontSize` | `number` | `110` | Font size in points |
| `orientation` | `string` | `'landscape'` | Page orientation |
| `pageSize` | `'A4'` | `'A4'` | Paper size |
| `bold` | `boolean` | `true` | Whether to bold the text |
| `margin` | `number` | `720` | Page margins in twips |

### Return Value

Returns a `Promise<Buffer>` — the generated .docx file buffer.

## Edge Cases & Notes

- **Long names**: Names longer than ~10 Chinese characters may wrap at 110pt. Reduce font size if needed.
- **SimHei**: If not installed on the machine opening the docx, Word falls back to default font.
- **Font size**: Stick to 72–150pt for reliable rendering.
- **Large groups**: No practical limit — each group = one page.

