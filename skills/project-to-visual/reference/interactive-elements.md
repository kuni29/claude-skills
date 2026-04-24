# インタラクティブ要素リファレンス

プロジェクト可視化における全インタラクティブ要素の実装パターン。

---

## 1. アーキテクチャ図（インタラクティブSVG）

出力全体で最も重要なビジュアル。システムコンポーネントをノードとして表示し、接続線で繋ぐ。

### 構造

```html
<div class="arch-diagram" id="architecture">
  <svg viewBox="0 0 1000 600" class="arch-svg">
    <!-- レイヤーラベル -->
    <text class="layer-label" x="20" y="30">フロントエンド</text>
    <text class="layer-label" x="20" y="220">バックエンド</text>
    <text class="layer-label" x="20" y="420">データ</text>

    <!-- 接続線（ノードの背後に描画） -->
    <g class="connections">
      <path class="connection" d="M250,100 C250,160 400,160 400,220"
            data-from="web-app" data-to="api-gateway"
            data-label="HTTPS / REST" />
    </g>

    <!-- コンポーネントノード -->
    <g class="node" data-id="web-app" data-type="frontend" transform="translate(200, 60)">
      <rect width="120" height="60" rx="10" />
      <text x="60" y="25" text-anchor="middle">🌐</text>
      <text x="60" y="45" text-anchor="middle" class="node-label">Web App</text>
    </g>
  </svg>

  <!-- 詳細パネル（ノードのクリック/ホバーで表示） -->
  <div class="arch-detail-panel" id="arch-detail" hidden>
    <h4 class="detail-title"></h4>
    <p class="detail-desc"></p>
    <div class="detail-connections"></div>
  </div>
</div>
```

### 動作

* **ホバー**: ノードがわずかに浮く（`translateY(-3px)`）、接続線がアクセントカラーでハイライト、無関係なノードは30%透明度に
* **クリック**: 詳細パネルが開き、コンポーネントの説明、責務、接続一覧（入出力）を表示
* **接続ハイライト**: ノードがアクティブ時、接続線が破線ストロークでアニメーション（`stroke-dashoffset`アニメーション）

### CSS

```css
.arch-svg .node rect {
  fill: white;
  stroke: var(--border-medium);
  stroke-width: 2;
  transition: all var(--transition-fast);
  cursor: pointer;
}

.arch-svg .node:hover rect,
.arch-svg .node.active rect {
  stroke: var(--accent-primary);
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
}

.arch-svg .connection {
  fill: none;
  stroke: var(--border-medium);
  stroke-width: 2;
  transition: all var(--transition-base);
}

.arch-svg .connection.highlighted {
  stroke: var(--accent-primary);
  stroke-width: 3;
  stroke-dasharray: 8 4;
  animation: dashFlow 1s linear infinite;
}

@keyframes dashFlow {
  to { stroke-dashoffset: -12; }
}

.arch-svg .node.dimmed {
  opacity: 0.3;
  transition: opacity var(--transition-base);
}
```

---

## 2. フローアニメーション

アーキテクチャ内のデータ/業務フローのアニメーショントレース。「データパケット」がコンポーネントを順にステップ移動する。

### 構造

```html
<div class="flow-animation" data-flow="order-creation">
  <!-- コントロール -->
  <div class="flow-controls">
    <button class="flow-btn" data-action="play">▶ 再生</button>
    <button class="flow-btn" data-action="pause">⏸ 一時停止</button>
    <button class="flow-btn" data-action="step">⏭ ステップ</button>
    <button class="flow-btn" data-action="reset">↺ リセット</button>
    <span class="flow-step-label">ステップ <span class="current-step">0</span> / <span class="total-steps">6</span></span>
  </div>

  <!-- SVGフロー図 -->
  <svg viewBox="0 0 1000 300" class="flow-svg">
    <!-- コンポーネントノード（アーキテクチャ図の簡略版） -->
    <!-- フローパス矢印 -->
    <!-- アニメーションデータパケット（パスに沿って移動する円またはアイコン） -->
    <circle class="data-packet" r="8" fill="var(--accent-primary)" opacity="0" />
  </svg>

  <!-- ナレーショントラック -->
  <div class="flow-narration">
    <div class="narration-step" data-step="1">
      <span class="step-badge">1</span>
      <div class="narration-content">
        <p class="narration-technical">POST /api/orders → APIゲートウェイが認証トークンを検証</p>
        <p class="narration-business">ユーザーが「注文する」をクリック — システムはまずログイン状態を確認する。</p>
      </div>
    </div>
    <!-- 以降のステップ... -->
  </div>
</div>
```

### 動作

* **再生**: 1.5秒間隔で自動的にステップ進行
* **ステップ**: 1ステップずつ進行
* **各ステップ**: (1)アクティブなコンポーネントをハイライト、(2)パスに沿ってデータパケットを移動アニメーション、(3)そのステップのナレーションを表示、(4)前のコンポーネントを50%に減光
* **データパケットアニメーション**: SVGの `animateMotion` でパスに沿って移動、またはJSベースの `offset-path` アニメーション

### CSS

```css
.flow-controls {
  display: flex;
  gap: var(--space-3);
  align-items: center;
  margin-bottom: var(--space-6);
}

.flow-btn {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  border: 1px solid var(--border-medium);
  background: white;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.flow-btn:hover {
  background: var(--accent-primary);
  color: var(--text-on-accent);
  border-color: var(--accent-primary);
}

.narration-step {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  opacity: 0.4;
  transition: all var(--transition-base);
}

.narration-step.active {
  opacity: 1;
  background: var(--bg-tertiary);
}

.narration-technical {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.narration-business {
  font-size: var(--text-base);
  color: var(--text-primary);
}
```

---

## 3. 意思決定タイムライン（ADR形式）

アーキテクチャ判断を時系列で表示するインタラクティブタイムライン。

### 構造

```html
<div class="decision-timeline">
  <div class="timeline-line"></div>

  <div class="timeline-entry" data-status="accepted" data-date="2024-03">
    <div class="timeline-dot"></div>
    <div class="timeline-card">
      <div class="timeline-header">
        <span class="timeline-date">2024-03</span>
        <span class="timeline-status status-accepted">✅ 採択</span>
      </div>
      <h4 class="timeline-title">ADR-001: 注文ストレージにDynamoDBを使用</h4>
      <div class="timeline-body" hidden>
        <div class="adr-section">
          <h5>コンテキスト</h5>
          <p>ピーク時に秒間10Kライトを処理できるデータベースが必要だった…</p>
        </div>
        <div class="adr-section">
          <h5>判断</h5>
          <p>シングルテーブル設計でDynamoDBを使用…</p>
        </div>
        <div class="adr-section">
          <h5>検討した代替案</h5>
          <div class="alternatives-grid">
            <div class="alt-card rejected">
              <span class="alt-name">PostgreSQL</span>
              <span class="alt-reason">ピーク負荷時のスケーリング懸念</span>
            </div>
            <div class="alt-card rejected">
              <span class="alt-name">MongoDB</span>
              <span class="alt-reason">チームに運用経験がない</span>
            </div>
          </div>
        </div>
        <div class="adr-section">
          <h5>結果</h5>
          <p>レポーティングには別の読み取り最適化ストアが必要。クエリの柔軟性は制限される…</p>
        </div>
      </div>
      <button class="timeline-toggle">詳細を表示 ▾</button>
    </div>
  </div>
  <!-- 以降のエントリ... -->
</div>
```

### 動作

* **トグルクリック**: スライドアニメーションで判断本文を展開/折りたたみ
* **ステータス色分け**: 採択＝ティール、廃止＝ゴールド、レビュー中＝パープル
* **関連判断**: 別の判断を参照している場合、エントリ間に接続線を表示
* **スクロールインビュー**: 別のモジュールから判断が参照された場合、クリックでタイムラインエントリにスムーズスクロールしハイライト

### CSS

```css
.timeline-line {
  position: absolute;
  left: 24px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--border-light);
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent-primary);
  border: 3px solid white;
  box-shadow: var(--shadow-sm);
  position: absolute;
  left: 19px;
}

.timeline-entry[data-status="accepted"] .timeline-dot { background: var(--status-accepted); }
.timeline-entry[data-status="superseded"] .timeline-dot { background: var(--status-superseded); }
.timeline-entry[data-status="review"] .timeline-dot { background: var(--status-review); }

.timeline-card {
  margin-left: 48px;
  padding: var(--space-6);
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.timeline-card:hover {
  box-shadow: var(--shadow-md);
}

.alternatives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-3);
}

.alt-card {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-light);
}

.alt-card.rejected {
  opacity: 0.7;
  border-left: 3px solid var(--accent-primary);
}
```

---

## 4. テクニカル ↔ ビジネス翻訳ブロック

サイドバイサイド表示：左に技術的記述、右にビジネス上の意味。

### 構造

```html
<div class="translation-block">
  <div class="translation-panel technical">
    <div class="panel-label">🔧 技術的</div>
    <div class="panel-content">
      <p>決済サービス呼び出しにサーキットブレーカーパターン（タイムアウト5秒）。連続3回失敗後、ブレーカーが30秒間オープン。</p>
    </div>
  </div>
  <div class="translation-divider">
    <span class="divider-icon">↔</span>
  </div>
  <div class="translation-panel business">
    <div class="panel-label">💼 ビジネスインパクト</div>
    <div class="panel-content">
      <p>決済システムがダウンしても、アプリの他の部分は動き続ける。ユーザーは閲覧やカート追加が可能 — チェックアウトだけがシステム再試行中の約30秒間できなくなる。</p>
    </div>
  </div>
</div>
```

### CSS

```css
.translation-block {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--space-4);
  align-items: stretch;
  max-width: var(--content-wide);
  margin: var(--space-8) auto;
}

@media (max-width: 768px) {
  .translation-block {
    grid-template-columns: 1fr;
  }
  .translation-divider {
    transform: rotate(90deg);
  }
}

.translation-panel {
  padding: var(--space-6);
  border-radius: var(--radius-md);
}

.translation-panel.technical {
  background: var(--bg-dark);
  color: var(--text-on-dark);
}

.translation-panel.business {
  background: white;
  border: 1px solid var(--border-light);
  color: var(--text-primary);
}

.panel-label {
  font-family: var(--font-body);
  font-weight: var(--weight-semibold);
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-4);
}

.translation-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xl);
  color: var(--text-tertiary);
}
```

---

## 5. 理解度チェック（クイズ）

各モジュール末尾のインタラクティブクイズ。記憶ではなく理解をテストする。

### 構造

```html
<div class="quiz" data-module="3">
  <h3 class="quiz-title">理解度チェック</h3>
  <p class="quiz-subtitle">学んだことを応用できますか？</p>

  <div class="quiz-question" data-q="1">
    <p class="question-text">OrderServiceがダウンした場合、まだ動作するユーザー向け機能はどれか？</p>
    <div class="quiz-options">
      <button class="quiz-option" data-correct="false">
        <span class="option-letter">A</span>
        <span class="option-text">何も動かない — アプリ全体がクラッシュ</span>
      </button>
      <button class="quiz-option" data-correct="true">
        <span class="option-letter">B</span>
        <span class="option-text">閲覧、検索、ユーザープロフィール — ただしチェックアウトと注文履歴は壊れる</span>
      </button>
      <button class="quiz-option" data-correct="false">
        <span class="option-letter">C</span>
        <span class="option-text">すべて動く、注文はキューに入るだけ</span>
      </button>
    </div>
    <div class="quiz-feedback" hidden>
      <div class="feedback-correct">
        <span class="feedback-icon">✓</span>
        <p>その通り。OrderServiceは分離されており、他のサービスはコア機能においてOrderServiceに依存していない。これが議論したマイクロサービス境界のメリット。</p>
      </div>
      <div class="feedback-incorrect">
        <span class="feedback-icon">→</span>
        <p>少し違う。アーキテクチャ図を見てみよう — 実際にOrderServiceを呼び出しているサービスはどれか？チェックアウトと注文履歴だけが直接依存している。閲覧と検索のフローは完全に別のサービスを使用。</p>
      </div>
    </div>
  </div>
  <!-- 以降の問題... -->
</div>
```

### 動作

* **回答選択**: 選択したオプションをハイライトし、即座にフィードバックを表示（「送信」ボタンなし）
* **正解**: 緑のハイライト、励ましの説明を表示
* **不正解**: 穏やかなオレンジのハイライト（赤は禁止 — 罰的にしない）、教育的な説明を表示
* **スコアなし**: 「3/5正解！」は表示しない — これは学習演習であり試験ではない
* **再挑戦可能**: フィードバック表示後に別のオプションをクリック可能

### CSS

```css
.quiz {
  max-width: var(--content-narrow);
  margin: var(--space-12) auto;
  padding: var(--space-8);
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.quiz-option {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  width: 100%;
  padding: var(--space-4) var(--space-6);
  margin-bottom: var(--space-3);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-md);
  background: white;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-body);
  font-size: var(--text-base);
  transition: all var(--transition-fast);
}

.quiz-option:hover {
  border-color: var(--accent-primary);
  background: rgba(232, 93, 58, 0.04);
}

.quiz-option.selected-correct {
  border-color: var(--status-done);
  background: rgba(42, 157, 143, 0.08);
}

.quiz-option.selected-incorrect {
  border-color: var(--accent-tertiary);
  background: rgba(233, 196, 106, 0.08);
}

.option-letter {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--bg-secondary);
  font-weight: var(--weight-semibold);
  font-size: var(--text-sm);
  flex-shrink: 0;
}
```

---

## 6. 「aha!」コールアウトボックス

特に注意を払うべき重要な洞察やハマりポイント。

### 構造

```html
<div class="callout callout-insight">
  <div class="callout-icon">💡</div>
  <div class="callout-content">
    <h4 class="callout-title">なぜこれが重要か</h4>
    <p>この非同期処理パターンは、APIが200を返した後に注文が「完了」したとは絶対に仮定できないことを意味する。レスポンスは「注文を受け付けた」を意味するだけ — 実際のフルフィルメントはイベント経由で後から発生する。</p>
  </div>
</div>

<div class="callout callout-gotcha">
  <div class="callout-icon">⚠️</div>
  <div class="callout-content">
    <h4 class="callout-title">ハマりポイント</h4>
    <p>レガシー決済連携はまだ同期呼び出しを使用している。新しい決済プロバイダーを追加する場合、同じパターンに従わないこと — 注文フローの非同期イベント駆動アプローチを使う。</p>
  </div>
</div>
```

### バリエーション

| タイプ | アイコン | ボーダー色 | 用途 |
|------|------|-------------|---------|
| `callout-insight` | 💡 | `--accent-secondary`（ティール） | 重要なアーキテクチャ洞察、「なぜこれが重要か」 |
| `callout-gotcha` | ⚠️ | `--accent-tertiary`（ゴールド） | よくある落とし穴、つまずきやすいポイント |
| `callout-history` | 📖 | `--component-data`（パープル） | 歴史的コンテキスト、「なぜこうなっているか」 |
| `callout-tip` | 🎯 | `--accent-primary`（バーミリオン） | このシステムで作業する際の実践的なTips |

---

## 7. 進捗 / ステータスボード

完了・進行中・計画中の視覚的表現。

### 構造

```html
<div class="status-board">
  <div class="status-column" data-status="done">
    <h4 class="column-header">
      <span class="status-dot done"></span> 完了
      <span class="column-count">8</span>
    </h4>
    <div class="status-cards">
      <div class="status-card">
        <span class="card-title">注文API v2</span>
        <span class="card-meta">2024-06 リリース</span>
      </div>
      <!-- 以降のカード... -->
    </div>
  </div>

  <div class="status-column" data-status="in-progress">
    <h4 class="column-header">
      <span class="status-dot in-progress"></span> 進行中
      <span class="column-count">3</span>
    </h4>
    <!-- カード... -->
  </div>

  <div class="status-column" data-status="planned">
    <h4 class="column-header">
      <span class="status-dot planned"></span> 計画中
      <span class="column-count">5</span>
    </h4>
    <!-- カード... -->
  </div>
</div>
```

---

## 8. ツールチップシステム

プロジェクト固有の語彙ツールチップ。チーム横断の理解に不可欠。

### 実装

```javascript
// overflow クリッピング回避のためbodyに追加
document.querySelectorAll('.term').forEach(term => {
  term.addEventListener('mouseenter', (e) => {
    const rect = e.target.getBoundingClientRect();
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.dataset.definition;

    // position: fixed、バウンディングレクトから計算
    tooltip.style.position = 'fixed';
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top - 8}px`;
    tooltip.style.transform = 'translate(-50%, -100%)';

    document.body.appendChild(tooltip);
    e.target._tooltip = tooltip;
  });

  term.addEventListener('mouseleave', (e) => {
    if (e.target._tooltip) {
      e.target._tooltip.remove();
      e.target._tooltip = null;
    }
  });
});
```

### CSS

```css
.term {
  border-bottom: 2px dashed var(--accent-secondary);
  cursor: pointer;  /* cursor: help は使わない */
  font-family: var(--font-mono);
  font-size: 0.9em;
}

.tooltip {
  position: fixed;
  z-index: 1000;
  max-width: 300px;
  padding: var(--space-3) var(--space-4);
  background: var(--bg-dark);
  color: var(--text-on-dark);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  box-shadow: var(--shadow-lg);
  pointer-events: none;
  animation: tooltipFadeIn 150ms ease;
}

@keyframes tooltipFadeIn {
  from { opacity: 0; transform: translate(-50%, -100%) translateY(4px); }
  to { opacity: 1; transform: translate(-50%, -100%) translateY(0); }
}
```

---

## 9. コンポーネント識別カード

各システムコンポーネントの役割を示すコンパクトなカード。「コンポーネント紹介」モジュールで使用。

### 構造

```html
<div class="component-cards">
  <div class="component-card" data-type="backend">
    <div class="card-icon">⚡</div>
    <h4 class="card-name">OrderService</h4>
    <p class="card-role">注文ライフサイクルを管理 — 作成、バリデーション、状態遷移、キャンセル。</p>
    <div class="card-meta">
      <span class="meta-tag">Go</span>
      <span class="meta-tag">gRPC</span>
      <span class="meta-tag">DynamoDB</span>
    </div>
  </div>
  <!-- 以降のカード... -->
</div>
```

### CSS

```css
.component-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  max-width: var(--content-max);
}

.component-card {
  padding: var(--space-6);
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border-top: 4px solid var(--border-light);
  transition: all var(--transition-fast);
}

.component-card[data-type="backend"]  { border-top-color: var(--component-backend); }
.component-card[data-type="frontend"] { border-top-color: var(--component-frontend); }
.component-card[data-type="data"]     { border-top-color: var(--component-data); }

.card-icon {
  font-size: var(--text-3xl);
  margin-bottom: var(--space-3);
}

.meta-tag {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background: var(--bg-secondary);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--text-secondary);
}
```
