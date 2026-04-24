# デザインシステムリファレンス

プロジェクト可視化出力のためのCSSデザイントークン全仕様。生成するすべてのHTMLファイルでこれらのトークンを使用すること。

## カラーパレット

```css
:root {
  /* 背景 — Algomaticブランドカラー基準 */
  --bg-primary: #FFFFFF;          /* 白背景 */
  --bg-secondary: #CFE3F3;        /* ライトブルー — モジュール交互、カード背景 */
  --bg-tertiary: #D9D9D9;         /* ライトグレー — サブセクション背景 */
  --bg-dark: #1B394F;             /* ダークネイビー — コード/技術ブロック */
  --bg-dark-secondary: #386F9E;   /* ミディアムブルー — ホバー状態 */

  /* アクセント — ブランドブルーを基調に */
  --accent-primary: #1B394F;      /* ダークネイビー — 見出し、アクティブ状態、CTA */
  --accent-secondary: #386F9E;    /* ミディアムブルー — セカンダリハイライト、リンク */
  --accent-tertiary: #CFE3F3;     /* ライトブルー — コールアウト、注意喚起 */

  /* テキスト */
  --text-primary: #1B394F;        /* ダークネイビー — メインテキスト */
  --text-secondary: #386F9E;      /* ミディアムブルー — サポートテキスト */
  --text-tertiary: #6B8EAF;       /* ライトブルーグレー — キャプション、メタデータ */
  --text-on-dark: #CFE3F3;        /* ダーク背景上のライトブルーテキスト */
  --text-on-accent: #FFFFFF;      /* アクセントカラー背景上の白テキスト */

  /* コンポーネント識別色 — ブランドカラーの濃淡で識別 */
  --component-frontend: #386F9E;    /* フロントエンド/UI用ミディアムブルー */
  --component-backend: #1B394F;     /* バックエンドサービス用ダークネイビー */
  --component-data: #2A5478;        /* データベース用ディープブルー */
  --component-queue: #CFE3F3;       /* メッセージキュー用ライトブルー */
  --component-external: #D9D9D9;    /* 外部API用グレー */
  --component-auth: #4A8AC0;        /* 認証/セキュリティ用ブライトブルー */

  /* ステータスカラー */
  --status-done: #386F9E;           /* ミディアムブルー — 完了 */
  --status-in-progress: #CFE3F3;    /* ライトブルー — 進行中 */
  --status-blocked: #1B394F;        /* ダークネイビー — ブロック */
  --status-planned: #D9D9D9;        /* グレー — 計画/将来 */
  --status-accepted: #386F9E;       /* ADR採択 */
  --status-superseded: #D9D9D9;     /* ADR廃止 */
  --status-review: #CFE3F3;         /* ADRレビュー中 */

  /* ボーダー・区切り線 */
  --border-light: #CFE3F3;
  --border-medium: #D9D9D9;
  --border-dark: #1B394F;

  /* シャドウ — ネイビー基調 */
  --shadow-sm: 0 1px 3px rgba(27, 57, 79, 0.08);
  --shadow-md: 0 4px 12px rgba(27, 57, 79, 0.10);
  --shadow-lg: 0 8px 24px rgba(27, 57, 79, 0.12);
  --shadow-xl: 0 16px 48px rgba(27, 57, 79, 0.14);

  /* スペーシングスケール */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */

  /* 角丸 */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 999px;

  /* トランジション */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
  --transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

## タイポグラフィ

```css
/* フォントインポート — <head>に追加 */
/* <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"> */

:root {
  --font-display: 'Bricolage Grotesque', system-ui, sans-serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Consolas', monospace;

  /* タイプスケール */
  --text-xs: 0.75rem;      /* 12px — キャプション、メタデータ */
  --text-sm: 0.875rem;     /* 14px — 小さいラベル */
  --text-base: 1rem;       /* 16px — 本文 */
  --text-lg: 1.125rem;     /* 18px — リードテキスト */
  --text-xl: 1.25rem;      /* 20px — セクション見出し */
  --text-2xl: 1.5rem;      /* 24px — モジュールサブ見出し */
  --text-3xl: 2rem;        /* 32px — モジュールタイトル */
  --text-4xl: 2.5rem;      /* 40px — ヒーロータイトル */
  --text-5xl: 3.5rem;      /* 56px — コースタイトル */

  /* 行間 */
  --leading-tight: 1.2;
  --leading-normal: 1.6;
  --leading-relaxed: 1.8;

  /* フォントウェイト */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-extrabold: 800;
}
```

### タイポグラフィルール

* **見出し**: `font-display`、`weight-bold` または `weight-extrabold`、`leading-tight`
* **本文**: `font-body`、`weight-regular`、`leading-normal` または `leading-relaxed`
* **技術用語**: `font-mono`、`weight-medium`、ツールチップ用語には破線下線
* **ラベル/バッジ**: `font-body`、`weight-semibold`、`text-xs` または `text-sm`、`letter-spacing: 0.05em`、大文字
* **最大行長**: 本文は `max-width: 65ch`。これ以上広くしない。

## レイアウト

```css
/* コンテンツ幅 */
--content-max: 1200px;        /* 最大コンテナ幅 */
--content-narrow: 720px;      /* 狭いテキストカラム */
--content-wide: 960px;        /* 広いコンテンツ（ダイアグラム、サイドバイサイド） */

/* モジュールセクション */
.module {
  min-height: 100dvh;          /* ビューポート全高 */
  min-height: 100vh;           /* フォールバック */
  scroll-snap-align: start;
  padding: var(--space-16) var(--space-8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 交互背景 */
.module:nth-child(odd) { background: var(--bg-primary); }
.module:nth-child(even) { background: var(--bg-secondary); }
```

### スクロール動作

```css
html {
  scroll-snap-type: y proximity;  /* mandatoryは絶対禁止 */
  scroll-behavior: smooth;
}
```

### ナビゲーションバー

上部固定。モジュールタイトルをドットまたは短いラベルとして表示。スクロール位置に基づいて現在のモジュールをハイライト。ビューポート最上部に細いプログレスバーを含む。

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(250, 248, 245, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border-light);
}

.progress-bar {
  height: 3px;
  background: var(--accent-primary);
  transition: width var(--transition-base);
}
```

## アニメーション原則

* `transform` と `opacity` のみアニメーション — GPUアクセラレーション対象
* スクロールトリガーアニメーションには `IntersectionObserver` を使用
* すべてのアニメーションに `prefers-reduced-motion` メディアクエリのフォールバック
* フローアニメーション：1ステップ300〜500ms、イージング付き
* ホバートランジション：`--transition-fast` を使用
* モジュールフェードイン：`--transition-slow` を使用

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## コンポーネントノードデザイン

各システムコンポーネントに一貫したビジュアルアイデンティティを持たせる：

```css
.component-node {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-md);
  background: white;
  border: 2px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.component-node:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.component-node[data-type="frontend"] { border-left: 4px solid var(--component-frontend); }
.component-node[data-type="backend"]  { border-left: 4px solid var(--component-backend); }
.component-node[data-type="data"]     { border-left: 4px solid var(--component-data); }
.component-node[data-type="queue"]    { border-left: 4px solid var(--component-queue); }
.component-node[data-type="external"] { border-left: 4px solid var(--component-external); }
.component-node[data-type="auth"]     { border-left: 4px solid var(--component-auth); }
```

## スクロールバースタイリング

```css
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--bg-secondary); }
::-webkit-scrollbar-thumb {
  background: var(--border-medium);
  border-radius: var(--radius-full);
}
::-webkit-scrollbar-thumb:hover { background: var(--text-tertiary); }
```

## レスポンシブブレークポイント

```css
/* モバイルファースト */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

サイドバイサイドレイアウト（テクニカル↔ビジネス翻訳、アーキテクチャ詳細）は、`md`未満の画面では縦に積む。
