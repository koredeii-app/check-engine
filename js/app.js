// 共通エンジン本体。アプリ固有の内容は js/config.js のみで管理し、
// このファイルは触らずに新しいチェックアプリを量産できるようにする。
(function () {
  const root = document.getElementById("app");

  const state = {
    questionIndex: 0,
    totalScore: 0
  };

  function init() {
    document.title = APP_CONFIG.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", APP_CONFIG.description);
    }
    renderTop();
  }

  function renderTop() {
    root.innerHTML = `
      <div class="card">
        <h1 class="app-title">${escapeHtml(APP_CONFIG.title)}</h1>
        <p class="app-description">${escapeHtml(APP_CONFIG.description)}</p>
        <button type="button" class="btn btn-primary" id="start-btn">
          ${escapeHtml(APP_CONFIG.startButtonText || "はじめる")}
        </button>
      </div>
    `;
    document.getElementById("start-btn").addEventListener("click", () => {
      state.questionIndex = 0;
      state.totalScore = 0;
      renderQuestion();
    });
  }

  function renderQuestion() {
    const total = APP_CONFIG.questions.length;
    const question = APP_CONFIG.questions[state.questionIndex];
    const progressPercent = (state.questionIndex / total) * 100;

    const optionsHtml = APP_CONFIG.options
      .map(
        (option) => `
          <button type="button" class="btn btn-option" data-key="${escapeHtml(option.key)}">
            ${escapeHtml(option.label)}
          </button>
        `
      )
      .join("");

    root.innerHTML = `
      <div class="card">
        <div class="progress">
          <div class="progress-bar" style="width: ${progressPercent}%"></div>
        </div>
        <p class="progress-label">${state.questionIndex + 1} / ${total}</p>
        <h2 class="question-text">${escapeHtml(question.text)}</h2>
        <div class="options">${optionsHtml}</div>
      </div>
    `;

    root.querySelectorAll(".btn-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.key;
        state.totalScore += question.scores[key] || 0;
        state.questionIndex += 1;
        if (state.questionIndex < total) {
          renderQuestion();
        } else {
          renderResult();
        }
      });
    });
  }

  function getResult(score) {
    const sorted = [...APP_CONFIG.results].sort((a, b) => a.maxScore - b.maxScore);
    return sorted.find((r) => score <= r.maxScore) || sorted[sorted.length - 1];
  }

  function renderResult() {
    const result = getResult(state.totalScore);

    root.innerHTML = `
      <div class="card">
        <p class="score-badge">合計スコア: ${state.totalScore}</p>
        <h2 class="result-title">${escapeHtml(result.title)}</h2>
        <p class="result-message">${escapeHtml(result.message)}</p>
        <a class="btn btn-primary" id="action-btn" href="${escapeAttr(APP_CONFIG.actionButton.url)}">
          ${escapeHtml(APP_CONFIG.actionButton.text)}
        </a>
        <p class="disclaimer">${escapeHtml(APP_CONFIG.disclaimer || "")}</p>
      </div>
    `;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttr(str) {
    return escapeHtml(str);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
