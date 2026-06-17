# check-engine

チェック・診断系アプリ（物忘れチェック、詐欺リスクチェック、介護疲れチェックなど）を
**コードを改造せず `js/config.js` の書き換えだけ**で量産するための共通エンジン（コピー元）。

このリポジトリ自体は**公開アプリの実体ではなく、エンジンのコピー元（テンプレート）**として運用する。
実際に公開する各チェックアプリは `check-monowasure`（親の物忘れチェック）のように
別リポジトリとして作成する。

- 公開中のアプリ一覧
  - `check-monowasure` — 親の物忘れチェック https://koredeii-app.github.io/check-monowasure/

## 構成

```
/
├─ index.html        … エンジン本体（コピー元）
├─ css/style.css     … エンジン本体（コピー元）
├─ js/app.js         … エンジン本体（コピー元）
├─ js/config.js      … サンプル設定（コピー先では書き換える）
├─ scripts/
│   ├─ sync-engine.js     … エンジンの変更を各アプリリポジトリへ反映するスクリプト
│   └─ sync-targets.json  … 反映先リポジトリの一覧（相対パス）
└─ assets/           … 画像など（OGP画像・アイコン等）
```

## 新しいチェックアプリを作る方法

1. `index.html` / `css/style.css` / `js/app.js` / `assets/` をコピーして新しいフォルダを作る
2. `js/config.js` を書き換える（タイトル・質問・選択肢・結果・相談先URLなど）
3. 新しいGitHubリポジトリ（例: `check-sagi`）を作成してpush、GitHub Pagesを有効化する
4. `scripts/sync-targets.json` に新しいリポジトリの相対パスを追加する（エンジン更新の反映対象にする）

`index.html` / `css/style.css` / `js/app.js` は共通エンジンなので、
このリポジトリ（check-engine）側でのみ編集し、`js/config.js` は編集しない。

## エンジンを修正したとき（全アプリへの反映）

`index.html` / `css/style.css` / `js/app.js` を修正したら、以下を実行すると
`sync-targets.json` に列挙した各アプリリポジトリへコピー＆コミットされる。

```bash
node scripts/sync-engine.js          # 反映してコミットまで（pushはしない）
node scripts/sync-engine.js --push   # コミット後、各リポジトリへpushも行う
```

`js/config.js` はコピー対象に含まれないので、各アプリの設定は保持される。

## config.js の構造

| キー | 内容 |
|------|------|
| `title` | タブのタイトル／トップ画面の見出し |
| `description` | トップ画面の説明文 |
| `startButtonText` | 開始ボタンの文言 |
| `options` | 各質問共通の選択肢（`key` と `label`） |
| `questions` | 質問一覧。各質問は `text` と `scores`（`options` の `key` ごとの点数） |
| `results` | 結果一覧。`maxScore` 以下になる最初の項目が採用される（昇順で記載） |
| `actionButton` | 結果画面の行動ボタン（`text` と `url`） |
| `disclaimer` | 結果画面に表示する注意書き |

## 今後の拡張予定（エンジン側で対応しやすい設計にしてある）

- 結果履歴保存（localStorage）
- PDF出力
- OGP設定
- 複数チェック切替
- 多言語対応
- Google Analytics

これらは `js/app.js` にフックを追加する形で対応し、`config.js` の差し替えだけで
動くアプリの量産フローは変えない方針。
