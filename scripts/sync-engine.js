// check-engineのエンジン本体（index.html / css/style.css / js/app.js）を
// sync-targets.jsonに列挙した各アプリリポジトリへコピーし、コミットする。
// js/config.js（アプリ固有設定）はコピー対象に含めない。
//
// 使い方:
//   node scripts/sync-engine.js          … 反映してコミットまで行う（pushはしない）
//   node scripts/sync-engine.js --push   … コミット後、各リポジトリへpushも行う
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ENGINE_FILES = ["index.html", "css/style.css", "js/app.js"];
const repoRoot = path.resolve(__dirname, "..");
const targets = JSON.parse(
  fs.readFileSync(path.join(__dirname, "sync-targets.json"), "utf8")
);
const shouldPush = process.argv.includes("--push");

for (const rel of targets) {
  const targetRoot = path.resolve(repoRoot, rel);

  if (!fs.existsSync(path.join(targetRoot, ".git"))) {
    console.log(`[skip] ${rel} は git リポジトリではありません`);
    continue;
  }

  let changed = false;
  for (const file of ENGINE_FILES) {
    const src = path.join(repoRoot, file);
    const dest = path.join(targetRoot, file);
    const srcContent = fs.readFileSync(src);
    const destContent = fs.existsSync(dest) ? fs.readFileSync(dest) : null;

    if (!destContent || !srcContent.equals(destContent)) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, srcContent);
      changed = true;
      console.log(`[update] ${rel}/${file}`);
    }
  }

  if (!changed) {
    console.log(`[no change] ${rel}`);
    continue;
  }

  execSync(`git add ${ENGINE_FILES.map((f) => `"${f}"`).join(" ")}`, {
    cwd: targetRoot
  });

  const staged = execSync("git diff --cached --name-only", {
    cwd: targetRoot
  })
    .toString()
    .trim();

  if (!staged) {
    console.log(`[no staged change] ${rel}`);
    continue;
  }

  execSync(`git commit -m "sync: check-engineからエンジン更新を反映"`, {
    cwd: targetRoot,
    stdio: "inherit"
  });

  if (shouldPush) {
    execSync("git push", { cwd: targetRoot, stdio: "inherit" });
    console.log(`[pushed] ${rel}`);
  } else {
    console.log(`[committed] ${rel} (--push を付けるとpushまで行います)`);
  }
}
