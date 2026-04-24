---
name: design-md
description: awesome-design-md（欧米55社）とawesome-design-md-jp（日本語23社）のリポジトリから最適なDESIGN.mdをプロジェクトに導入し、AIがピクセルパーフェクトなUIを生成できる状態にセットアップする。「デザインシステムを入れたい」「〇〇のデザインに近いUIを作りたい」「DESIGN.mdを使いたい」「日本語UIを作りたい」と言われたら使う。
user-invocable: true
---

# DESIGN.md セットアップスキル

## 概要

2つのリポジトリからDESIGN.mdを取得できる：

- [awesome-design-md](https://github.com/VoltAgent/awesome-design-md)（欧米55社）— AIがピクセルパーフェクトなUIを生成するためのDESIGN.mdファイル集
- [awesome-design-md-jp](https://github.com/kzhrknt/awesome-design-md-jp)（日本語23社）— CJKタイポグラフィ仕様付き日本語UIサービスのDESIGN.md集

プロジェクトルートに置くだけで、AIがデザインシステムを参照して一貫性のあるUIを生成できる。

## DESIGN.md の構造（全ファイル共通）

各DESIGN.mdは9セクション構成：
1. **Visual Theme & Atmosphere** — ムードと設計哲学
2. **Color Palette & Roles** — セマンティック色名と機能的役割
3. **Typography Rules** — フォントと階層体系
4. **Component Stylings** — ボタン・カード・入力フィールド
5. **Layout Principles** — スペーシングと空白哲学
6. **Depth & Elevation** — シャドウシステム
7. **Do's and Don'ts** — 設計ガイドラインと禁止パターン
8. **Responsive Behavior** — ブレークポイント戦略
9. **Agent Prompt Guide** — AI向けプロンプトガイド

## 収録デザインシステム一覧

### 欧米版 awesome-design-md（55件）

#### AI & Machine Learning
Claude, Cohere, ElevenLabs, Minimax, Mistral AI, Ollama, OpenCode AI, Replicate, RunwayML, Together AI, VoltAgent, xAI

#### Developer Tools & Platforms
Cursor, Expo, Linear, Lovable, Mintlify, PostHog, Raycast, Resend, Sentry, Supabase, Superhuman, Vercel, Warp, Zapier

#### Infrastructure & Cloud
ClickHouse, Composio, HashiCorp, MongoDB, Sanity, Stripe

#### Design & Productivity
Airtable, Cal.com, Clay, Figma, Framer, Intercom, Miro, Notion, Pinterest, Webflow

#### Fintech & Crypto
Coinbase, Kraken, Revolut, Wise

#### Enterprise & Consumer
Airbnb, Apple, BMW, IBM, NVIDIA, SpaceX, Spotify, Uber

### 日本語版 awesome-design-md-jp（23件）

SmartHR, freee, note, Novasell, MUJI（無印良品）, Mercari（メルカリ）, STUDIO, Toyota, LINE, Cookpad（クックパッド）, MoneyForward（マネーフォワード）, Cybozu（サイボウズ）, Qiita, Rakuten（楽天）, Tabelog（食べログ）, pixiv, Zenn, connpass, Sansan, Notion, ABEMA, WIRED.jp, Apple Japan

**日本語版の特徴（CJKタイポグラフィ仕様）:**
- 日本語フォントスタック（和文→英文→汎用ファミリーの優先順位）
- 行間: 1.7〜2.0（欧文の1.4〜1.5より高め）
- 字間: body text で 0.04〜0.1em
- 禁則処理（句読点の行頭禁止など）
- OpenType機能（`palt` `kern`）による比例組版
- 混植ルール（和文と欧文フォントの組み合わせ）

## 使い方

### Step 1: デザインの方向性を確認

ユーザーに聞く（または既存の `.impeccable.md` があれば参照）：

> 「どんなデザイン雰囲気を目指していますか？ミニマル・テック系・エレガント・ポップ・エンタープライズなど、近いものを教えてください。または上記の55社から「このブランドっぽいUI」で選んでもOKです」

### Step 2: 最適なDESIGN.mdを提案

**日本語UIを作る場合は日本語版（awesome-design-md-jp）を優先推奨する。**

ユーザーの答えをもとに2〜3候補を提案する。判断基準：

#### 欧米版（awesome-design-md）
| 方向性 | 推奨 |
|--------|------|
| ミニマル・高級感 | Apple, Linear, Vercel, Raycast |
| テック・開発者向け | Cursor, Supabase, Warp, PostHog |
| SaaS・プロダクティビティ | Notion, Figma, Airtable, Framer |
| フィンテック・信頼感 | Stripe, Wise, Revolut |
| エンタープライズ | IBM, NVIDIA, Salesforce |
| クリエイティブ・エモーショナル | Spotify, Airbnb, Pinterest |

#### 日本語版（awesome-design-md-jp）
| 方向性 | 推奨 |
|--------|------|
| HRSaaS・業務系 | SmartHR, freee, MoneyForward, Cybozu, Sansan |
| EC・マーケット | Mercari, Rakuten, Tabelog, Cookpad |
| クリエイター・コミュニティ | note, Qiita, Zenn, pixiv, connpass |
| ライフスタイル・ブランド | MUJI, Toyota |
| メディア・エンタメ | ABEMA, WIRED.jp, LINE |
| デザインツール | STUDIO |

### Step 3: DESIGN.md を取得してプロジェクトに配置

選ばれたデザインシステムのDESIGN.mdをWebFetchで取得する：

**欧米版（awesome-design-md）:**
```
URL形式: https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/{フォルダ名}/DESIGN.md
例: https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/linear/DESIGN.md
```

**日本語版（awesome-design-md-jp）:**
```
URL形式: https://raw.githubusercontent.com/kzhrknt/awesome-design-md-jp/main/design-md/{フォルダ名}/DESIGN.md
例: https://raw.githubusercontent.com/kzhrknt/awesome-design-md-jp/main/design-md/smarthr/DESIGN.md
```

取得したら `DESIGN.md` としてプロジェクトルートに保存。

**日本語版を使う場合の補足:** CJKタイポグラフィ仕様（禁則処理・行間1.7〜2.0・字間0.04〜0.1em・OpenType palt/kern）がDESIGN.mdに含まれているため、和文レイアウトを `/frontend-design` に指示するときはDESIGN.mdをそのまま参照させること。

### Step 4: .impeccable.md との統合（任意）

`.impeccable.md` が存在する場合、DESIGN.mdの内容を参照先として追記：

```markdown
## Design System Reference
DESIGN.md（{ブランド名}ベース）をプロジェクトルートに配置済み。
UIを生成する際は必ずDESIGN.mdの Color Palette, Typography Rules, Component Stylings を参照すること。
```

### Step 5: 使い方を伝える

> 「これでセットアップ完了です。UIを作るときに『DESIGN.mdに従って作って』と指示するだけで、{ブランド名}のデザインシステムに沿ったUIが生成されます。`/frontend-design` と組み合わせると最も効果的です。」

## URL → DESIGN.md 自動生成（design-md-generator）

参考サイトや競合サービスのURLを渡すだけで、AIが解析してDESIGN.mdを自動生成できる。

### いつ使うか
- 「このサイトのデザインに近いUIを作りたい」とURLを渡された場合
- 既存サービスをリバースエンジニアリングしてDESIGN.mdを作りたい場合
- awesome-design-md に目的のブランドが収録されていない場合

### ワークフロー

**Step 1: URLからサイトを読み込む**

Claude in Chrome MCP（`mcp__Claude_in_Chrome__*`）でURLを開き、実際のサイトを読み込む。

```
mcp__Claude_in_Chrome__navigate → 対象URL
mcp__Claude_in_Chrome__get_page_text → テキスト・構造取得
mcp__Claude_in_Chrome__read_page → DOM詳細（CSS変数・クラス名など）
```

**Step 2: デザイントークンを抽出する**

以下の要素を読み取る：

| 抽出対象 | 方法 |
|----------|------|
| **カラーパレット** | CSS変数（`--color-*`、`--bg-*`）、インラインスタイル、Tailwindクラス |
| **タイポグラフィ** | font-family・font-size・font-weight・line-height・letter-spacing |
| **スペーシング** | padding・margin・gap のパターン（4px基準か8px基準か） |
| **コンポーネント** | ボタン・カード・入力フィールドのborder-radius・shadow |
| **ムード・哲学** | サイト全体のトーン（ミニマル、エンタープライズ、クリエイティブ等） |

**Step 3: DESIGN.md として整形・出力する**

標準9セクション構成でDESIGN.mdを生成し、プロジェクトルートに保存する：

```markdown
# [サービス名] DESIGN.md
*Generated from [URL] by Claude Code*

## 1. Visual Theme & Atmosphere
...

## 2. Color Palette & Roles
...

（以下、標準9セクション）
```

**Step 4: 精度確認と補足**

自動生成後、不確実な箇所（動的に生成されるCSS・フォントのロードタイミング依存など）をユーザーに確認し、手動補正があれば反映する。

### 注意事項
- JavaScript依存の動的UIは取得できない場合がある（スクリーンショットと比較して確認する）
- フォントはGoogle Fonts等の外部CDN参照が多い。`<link>`タグやfont-faceを確認すること
- 著作権上、取得したDESIGN.mdはそのサービスへのオマージュとして社内利用にとどめること

## 他スキルとの連携

- `/teach-impeccable` — デザインコンテキスト収集と組み合わせて使う（DESIGN.mdは技術的な定義、.impeccable.mdはプロジェクト固有の意図）
- `/frontend-design` — UIを実装するときの実行スキル。DESIGN.mdを参照させることでブレなく一貫したUIが生成できる
- `/normalize` — 既存UIをDESIGN.mdに揃える際に使う
