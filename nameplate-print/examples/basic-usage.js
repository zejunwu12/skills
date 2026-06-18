/**
 * basic-usage.js — 分组名牌打印示例
 *
 * 运行: node examples/basic-usage.js
 * 输出: example_output.docx
 */

const path = require('path');
const { generateGroupNameDoc } = require('../scripts/generate_groups.js');

async function main() {
  const outputPath = path.join(__dirname, '..', 'example_output.docx');

  await generateGroupNameDoc({
    groups: ['商旅开发组A', '商旅开发组B', '安全保卫组', '会务接待组'],
    outputPath,
  });

  console.log('文档已生成:', outputPath);
}

main().catch(err => {
  console.error('生成失败:', err.message);
  process.exit(1);
});