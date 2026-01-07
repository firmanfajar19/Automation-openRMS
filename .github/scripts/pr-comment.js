/**
 * Create or update PR comment (ANTI-SPAM)
 */

const fs = require("fs");

const COMMENT_MARKER = "🧪 Playwright Test Summary";
const body = fs.readFileSync("pr-comment.md", "utf8");

module.exports = async ({ github, context }) => {
    const { owner, repo } = context.repo;
    const issue_number = context.issue.number;

    const { data: comments } = await github.rest.issues.listComments({
        owner,
        repo,
        issue_number,
    });

    const existing = comments.find(
        c => c.body && c.body.includes(COMMENT_MARKER)
    );

    if (existing) {
        await github.rest.issues.updateComment({
            owner,
            repo,
            comment_id: existing.id,
            body,
        });
        console.log("♻️ Updated existing PR comment");
    } else {
        await github.rest.issues.createComment({
            owner,
            repo,
            issue_number,
            body,
        });
        console.log("🆕 Created new PR comment");
    }
};
