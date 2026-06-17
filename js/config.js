// このファイルだけを書き換えれば新しいチェックアプリが作れます。
// js/app.js（共通エンジン）は触らないでください。
const APP_CONFIG = {
  // ブラウザタブのタイトル & トップ画面の見出し
  title: "親の物忘れチェック",

  // トップ画面の説明文
  description:
    "親の物忘れや認知機能の変化が気になる方向けの簡易チェックです。10個の質問に答えるだけで、今の状態を簡単に振り返ることができます。",

  // 開始ボタンの文言
  startButtonText: "チェックをはじめる",

  // 各質問で共通して使う選択肢（key が questions[].scores のキーに対応）
  options: [
    { key: "none", label: "ない" },
    { key: "sometimes", label: "ときどきある" },
    { key: "often", label: "よくある" }
  ],

  // 質問一覧（10問）
  questions: [
    {
      text: "同じ話や質問を繰り返すことが増えた",
      scores: { none: 0, sometimes: 1, often: 2 }
    },
    {
      text: "物をしまった場所を忘れて探し回ることが増えた",
      scores: { none: 0, sometimes: 1, often: 2 }
    },
    {
      text: "今日の日付や曜日がわからなくなることがある",
      scores: { none: 0, sometimes: 1, often: 2 }
    },
    {
      text: "約束や予定を忘れてしまうことがある",
      scores: { none: 0, sometimes: 1, often: 2 }
    },
    {
      text: "料理や家事の手順を間違えることが増えた",
      scores: { none: 0, sometimes: 1, often: 2 }
    },
    {
      text: "お金の管理（支払いや釣り銭の計算など）が苦手になった",
      scores: { none: 0, sometimes: 1, often: 2 }
    },
    {
      text: "外出先で道に迷うことがある",
      scores: { none: 0, sometimes: 1, often: 2 }
    },
    {
      text: "服装や身だしなみに気を配らなくなった",
      scores: { none: 0, sometimes: 1, often: 2 }
    },
    {
      text: "以前より怒りやすくなった、または感情の変化が大きくなった",
      scores: { none: 0, sometimes: 1, often: 2 }
    },
    {
      text: "趣味や好きだったことへの興味が薄れてきた",
      scores: { none: 0, sometimes: 1, often: 2 }
    }
  ],

  // 結果判定（合計スコアが maxScore 以下になる最初の項目が採用される／昇順で記載）
  results: [
    {
      maxScore: 4,
      title: "大きな変化は少ないようです",
      message:
        "現時点で気になる変化は少ないようです。とはいえ、状態は変化していくものなので、時々この機会にチェックしてみることをおすすめします。"
    },
    {
      maxScore: 9,
      title: "少し気になる変化があります",
      message:
        "いくつか気になる変化が見られます。今後の変化を見守りながら、気になることがあれば早めに相談先へ問い合わせてみることをおすすめします。"
    },
    {
      maxScore: 999,
      title: "相談を検討してみましょう",
      message:
        "気になる変化が複数見られます。一人で抱え込まず、お近くの相談窓口（地域包括支援センターなど）に相談してみることをおすすめします。"
    }
  ],

  // 結果画面の行動ボタン
  actionButton: {
    text: "相談先を探す",
    url: "https://koredeii-app.github.io/care-00/"
  },

  // 結果画面に表示する注意書き
  disclaimer: "本サービスは医療診断を行うものではありません。"
};
