---
name: vibe-design
description: Claude Code + Paper MCPでFigmaを使わずにデザイン→コード→デプロイするVibe Designワークフロー。Paper DesktopをMCPでClaude Codeに接続し、プロンプト一つでキャンバスにUIを生成・コード変換・Vercelデプロイまで完全自動化する。「Figma使わずにデザインしたい」「Paper MCPを設定したい」「プロンプトでUIを作りたい」で使う。
user-invocable: true
---

# vibe-design スキル

## 概要

**Vibe Design** = プロンプトだけでUIを生成し、Figmaのキャンバス操作を一切不要にするデザインワークフロー。

Paper Desktop（AIエージェント専用デザインツール）をMCPでClaude Codeに接続することで、Claude CodeがPaperキャンバスに直接読み書きできる。デザインしたものをそのままコードに変換してVercelにデプロイするまでが1セッションで完結する。

**`/frontend-design` との違い:** `/frontend-design` はコードベースでUIを実装するスキル。`/vibe-design` はPaperというデザインキャンバス上でビジュアルを先に作り、それをコードに変換する「デザインファースト」のワークフロー。

---

## セットアップ（初回のみ）

### Step 1: Paper Desktop をインストール

1. https://paper.design/downloads からPaper Desktopをダウンロード
2. インストールして起動
3. 任意のファイルを開く（これでMCPサーバーがバックグラウンドで起動する）

### Step 2: Claude CodeにMCPを追加

ターミナルで実行:

```bash
claude mcp add paper --transport http http://127.0.0.1:29979/mcp --scope user
```

### Step 3: 接続確認

Claude Code内で:

```
/mcp
```

`paper` がリストに表示されれば成功。

**テスト:** 「Paperに赤い四角形を作って」と入力してキャンバスに図形が現れれば接続完了。

---

## Vibe Designワークフロー

### Phase 1: プロンプトでデザイン生成

Paper MCPが接続された状態で、自然言語でUIを指示する:

```
ヒーローセクションを作って。
太いヘッドライン、プレミアム感、十分なホワイトスペース、グラデーションボタン。
SmartHRっぽい信頼感のあるトーンで。
```

**効果的なプロンプトの書き方:**
- ムード・雰囲気を先に（「プレミアム感」「親しみやすい」「テック系」）
- 具体的なコンポーネントを列挙（「ヘッドライン・サブコピー・CTAボタン・背景グラデーション」）
- 参照ブランドを指定（「Linearっぽい」「Notionのミニマル感で」）
- `/design-md` との組み合わせが効果的（DESIGN.mdを先にセットアップしてから指示）

### Phase 2: 反復的な調整

キャンバスを見ながら会話で調整:

```
もっとホワイトスペースを増やして
ボタンを右寄せに
フォントサイズを一段階大きく
背景をグラデーションじゃなくて単色の#F8F8F8に
```

Figmaのパネルを操作せず、すべてプロンプトで完結する。

### Phase 3: コードへの変換

デザインが固まったら:

```
このデザインをNext.js + Tailwind CSSのコードに変換して
```

PaperがキャンバスのデザインデータをAIが読み取れる形式で出力し、コードに変換する。

### Phase 4: Vercelへデプロイ

```bash
# プロジェクトをVercelに接続（初回のみ）
npx vercel

# デプロイ
npx vercel --prod
```

または Claude Code内で:

```
Vercelにデプロイして
```

---

## 実際の活用シーン

| シーン | やり方 |
|--------|--------|
| LP・ヒーロー | プロンプトで構成指示 → コード変換 → デプロイ |
| プロトタイプ | 複数画面をPaperで設計 → コードに変換 |
| デザイン確認 | クライアントに見せるビジュアルを短時間で生成 |
| UI探索 | 複数パターンを並べて比較検討 |

---

## 他スキルとの連携

| スキル | 組み合わせ方 |
|--------|-------------|
| `/design-md` | 先にDESIGN.mdをセットして「このデザインシステムに従って」と指示 |
| `/frontend-design` | Vibe Designでビジュアルを固め、コード実装の品質は `/frontend-design` で担保 |
| `/teach-impeccable` | プロジェクトのデザインコンテキスト（ブランド・ターゲット）を事前収集 |
| `/audit` | 生成されたコードの技術品質チェック |
| `/polish` | リリース前の最終仕上げ |

---

## トラブルシューティング

| 問題 | 解決策 |
|------|--------|
| MCPに `paper` が表示されない | Paper Desktopを起動してファイルを開いてから `/mcp` を再確認 |
| コマンドがエラー | `http://127.0.0.1:29979/mcp` がアクセスできるか確認（Paper Desktop起動中のみ有効） |
| デザインが反映されない | Paper Desktop側でファイルが開かれているか確認 |
