# check-engine

チェック・診断系アプリ（物忘れチェック、詐欺リスクチェック、介護疲れチェックなど）を
**コードを改造せず `js/config.js` の書き換えだけ**で量産するための共通エンジン。

## 構成

```
/
├─ index.html      … 触らない（画面の入れ物のみ）
├─ css/style.css   … 触らない（共通デザイン）
├─ js/app.js       … 触らない（共通エンジン本体）
├─ js/config.js    … ここだけ書き換える（アプリ固有の設定）
└─ assets/         … 画像など（OGP画像・アイコン等）
```

## 新しいチェックアプリを作る方法

1. このフォルダ（または公開後のリポジトリ）を複製する
2. `js/config.js` を書き換える（タイトル・質問・選択肢・結果・相談先URLなど）
3. 必要なら `assets/` に画像を追加する
4. GitHub Pages で公開する（ビルド不要）

`index.html` / `css/style.css` / `js/app.js` は共通エンジンなので基本的に編集しない。

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
