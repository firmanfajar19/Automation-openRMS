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
const COMMENT_MARKER = "🧪 Test Summary";

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

// --------------------------------------------------
// Pass rate
// --------------------------------------------------
const passRate = total
    ? ((passed / total) * 100).toFixed(2)
    : "0.00";

// --------------------------------------------------
// Duration (ms → human readable)
// --------------------------------------------------
const durationMs = time.duration || 0;

function formatDuration(ms) {
    const sec = Math.floor(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
}

// --------------------------------------------------
// Donut color logic
// --------------------------------------------------
let donutColor = "#22c55e"; // green

if (failed > 0) {
    donutColor = "#ef4444"; // red
} else if (broken > 0 || skipped > 0) {
    donutColor = "#f59e0b"; // yellow (optional)
}

// --------------------------------------------------
// Donut SVG
// --------------------------------------------------
const radius = 40;
const circumference = 2 * Math.PI * radius;
const offset = circumference - (passRate / 100) * circumference;

const donutSvg = `
<svg width="120" height="120" viewBox="0 0 120 120">
  <circle
    cx="60"
    cy="60"
    r="${radius}"
    stroke="#e5e7eb"
    stroke-width="12"
    fill="none"
  />
  <circle
    cx="60"
    cy="60"
    r="${radius}"
    stroke="${donutColor}"
    stroke-width="12"
    fill="none"
    stroke-dasharray="${circumference}"
    stroke-dashoffset="${offset}"
    transform="rotate(-90 60 60)"
  />
  <text
    x="50%"
    y="50%"
    dominant-baseline="middle"
    text-anchor="middle"
    font-size="16"
    font-weight="bold"
    fill="#111827"
  >
    ${passRate}%
  </text>
</svg>
`.trim();

// --------------------------------------------------
// Build markdown body
// --------------------------------------------------
const reportUrl = process.env.ALLURE_REPORT_URL || "#";

const body = `
### 🧪 Test Summary

${donutSvg}

| Status | Count |
|-------|------:|
| ✅ Passed  | ${passed} |
| ❌ Failed  | ${failed} |
| ⚠️ Broken  | ${broken} |
| ⏭ Skipped | ${skipped} |

**📊 Total Tests:** ${total}  
**📈 Pass Rate:** ${passRate}%
**⏱ Duration:** ${formatDuration(durationMs)}

<sub>Generated automatically by GitHub Actions</sub>
`.trim();

// --------------------------------------------------
// Write to file (used by github-script)
// --------------------------------------------------
fs.writeFileSync("pr-comment.md", body);
console.log("✅ PR summary generated successfully");