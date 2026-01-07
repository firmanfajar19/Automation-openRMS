/**
 * Create or update PR comment with Allure summary
 * Compatible with Playwright + Allure 2
 */

const fs = require("fs");
const path = require("path");

// --------------------------------------------------
// Config
// --------------------------------------------------
const SUMMARY_PATH = "allure-report/widgets/summary.json";
const COMMENT_MARKER = "🧪 Playwright Test Summary";

// --------------------------------------------------
// Validate summary.json
// --------------------------------------------------
if (!fs.existsSync(SUMMARY_PATH)) {
    console.error(`❌ ${SUMMARY_PATH} not found`);
    process.exit(1);
}

const summary = JSON.parse(fs.readFileSync(SUMMARY_PATH, "utf8"));
const stat = summary.statistic || {};

// --------------------------------------------------
// Normalize stats (Allure 2 safe)
// --------------------------------------------------
const passed = stat.passed || 0;
const failed = stat.failed || 0;
const broken = stat.broken || 0;
const skipped = stat.skipped || 0;
const unknown = stat.unknown || 0;

const total = passed + failed + broken + skipped + unknown;
const passRate = total
    ? ((passed / total) * 100).toFixed(2)
    : "0.00";

// --------------------------------------------------
// Build markdown body
// --------------------------------------------------
const reportUrl = process.env.ALLURE_REPORT_URL || "#";

const body = `
### 🧪 Playwright Test Summary

| Status | Count |
|-------|------:|
| ✅ Passed  | ${passed} |
| ❌ Failed  | ${failed} |
| ⚠️ Broken  | ${broken} |
| ⏭ Skipped | ${skipped} |

**📊 Total Tests:** ${total}  
**📈 Pass Rate:** ${passRate}%

🔗 **[View Full Allure Report](${reportUrl})**

<sub>Generated automatically by GitHub Actions</sub>
`.trim();

// --------------------------------------------------
// Write to file (used by github-script)
// --------------------------------------------------
fs.writeFileSync("pr-comment.md", body);

console.log("✅ PR summary generated successfully");
