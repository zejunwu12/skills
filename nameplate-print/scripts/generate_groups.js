const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun,
  AlignmentType, VerticalAlign, PageOrientation,
} = require('docx');

const PAGE_DIMENSIONS = {
  A4: { width: 11906, height: 16838 },
};

/**
 * Generate a Word document with group names printed one per page.
 *
 * @param {Object} options
 * @param {string[]} options.groups          - Array of group name strings (required)
 * @param {string} options.outputPath        - Output .docx file path (required)
 * @param {string} [options.font='SimHei']   - Font name (e.g. 'SimHei', 'Microsoft YaHei')
 * @param {number} [options.fontSize=110]    - Font size in points
 * @param {'landscape'|'portrait'} [options.orientation='landscape'] - Page orientation
 * @param {'A4'} [options.pageSize='A4']     - Paper size
 * @param {boolean} [options.bold=true]      - Bold the text
 * @param {number} [options.margin=720]      - Page margins in twips (1440 twips = 1 inch)
 * @returns {Promise<Buffer>} The generated .docx file buffer
 */
async function generateGroupNameDoc(options) {
  const {
    groups,
    outputPath,
    font = 'SimHei',
    fontSize = 110,
    orientation = 'landscape',
    pageSize = 'A4',
    bold = true,
    margin = 720,
  } = options;

  if (!groups || !Array.isArray(groups) || groups.length === 0) {
    throw new Error('"groups" must be a non-empty array of strings');
  }
  if (!outputPath) {
    throw new Error('"outputPath" is required');
  }

  const isLandscape = orientation === 'landscape';
  const baseDim = PAGE_DIMENSIONS[pageSize] || PAGE_DIMENSIONS.A4;

  const sections = groups.map((name) => ({
    properties: {
      page: {
        size: {
          width: isLandscape ? baseDim.width : baseDim.height,
          height: isLandscape ? baseDim.height : baseDim.width,
          orientation: isLandscape ? PageOrientation.LANDSCAPE : PageOrientation.PORTRAIT,
        },
        margin: {
          top: margin,
          right: margin,
          bottom: margin,
          left: margin,
        },
      },
      verticalAlign: VerticalAlign.CENTER,
    },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: name,
            font: {
              ascii: font,
              hAnsi: font,
              eastAsia: font,
            },
            size: fontSize * 2, // docx uses half-points
            bold,
          }),
        ],
      }),
    ],
  }));

  const doc = new Document({ sections });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  return buffer;
}

module.exports = { generateGroupNameDoc };

// --- Standalone CLI usage ---
if (require.main === module) {
  const groupsArg = process.argv[2];        // JSON array string or comma-separated
  const outArg = process.argv[3];           // output path
  const fontArg = process.argv[4];          // optional font
  const sizeRaw = process.argv[5];
  const sizeArg = sizeRaw ? parseInt(sizeRaw.replace(/["']/g, ''), 10) : undefined;
  const orientArg = process.argv[6];        // optional orientation

  let groups;
  try {
    groups = JSON.parse(groupsArg);
  } catch {
    groups = groupsArg ? groupsArg.split(',').map(s => s.trim()) : [];
  }

  if (groups.length === 0) {
    console.error('Usage: node generate_groups.js "<groups>" <outputPath> [font] [fontSize] [orientation]');
    console.error('  groups: JSON array or comma-separated list');
    console.error('  Example: node generate_groups.js "[\"组A\",\"组B\"]" out.docx SimHei 110 landscape');
    process.exit(1);
  }

  generateGroupNameDoc({
    groups,
    outputPath: outArg || 'group_names.docx',
    font: fontArg,
    fontSize: sizeArg,
    orientation: orientArg,
  }).then(() => {
    console.log('Document created successfully at:', outArg || 'group_names.docx');
  }).catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
}
