---
name: x-mcp-setup
description: X（Twitter）公式MCPサーバーをClaude Codeに接続するセットアップ＆運用スキル。公式MCPで200以上のX機能（バズ分析・投稿生成・競合調査・インプレッション分析）が使えるようになる。「X公式MCPを設定したい」「Xをクロードに繋げたい」「バズ投稿を分析して投稿を自動生成したい」で使う。
user-invocable: true
---

# x-mcp-setup スキル

## 概要

XがMCPサーバーを公式リリース。Claude Codeと連携することで、X上の200以上の機能にプログラムからアクセスできるようになる。

**できること（主要ユースケース）:**
- バズ投稿の取得・分析 → 自分のポスト生成に反映
- トレンドキーワードリサーチ
- 競合アカウントの分析
- 自分の過去投稿のインプレッション・エンゲージメント分析
- ポスト自動生成ワークフロー

**x-search-mcp との違い:**

| | x-mcp-setup（X公式MCP） | x-search-mcp（Grok API） |
|---|---|---|
| 提供元 | X公式 | xAI（Grok） |
| 機能数 | 200以上 | 検索特化 |
| 認証 | X OAuth / API Key | xAI APIキー |
| 投稿操作 | 可能（書き込みも） | 読み取りのみ |

---

## 前提条件

- Claude Code がインストール済み
- Xアカウントを持っている
- X Developer Portalへのアクセス（無料）

---

## セットアップ手順

### Step 1: X Developer Portalでアプリを作成

1. https://developer.x.com/en/portal/dashboard にアクセス
2. 「+ Add App」でアプリを作成
3. OAuth 2.0 の設定:
   - Type: `Web App, Automated App or Bot`
   - Callback URL: `http://localhost:3000/callback`（ローカル開発用）
4. Keys and Tokens で以下を取得:
   - Bearer Token
   - API Key & Secret
   - Access Token & Secret（必要に応じて）

ユーザーに確認する:
> 「X Developer Portalでアプリを作成し、Bearer Tokenはお持ちですか？https://developer.x.com で取得できます（無料）。」

### Step 2: X公式MCP設定の追加

X公式MCPサーバーは公式npmパッケージとして提供されている。以下をターミナルで実行:

```bash
claude mcp add x-official \
  --command npx \
  --args "-y" "@x/mcp" \
  --env "X_BEARER_TOKEN=ここにBearerTokenを貼る"
```

読み書き両方使う場合（ポスト投稿も可能にする）:

```bash
claude mcp add x-official \
  --command npx \
  --args "-y" "@x/mcp" \
  --env "X_BEARER_TOKEN=ここにBearerTokenを貼る" \
  --env "X_API_KEY=ここにAPIKeyを貼る" \
  --env "X_API_SECRET=ここにAPISecretを貼る" \
  --env "X_ACCESS_TOKEN=ここにAccessTokenを貼る" \
  --env "X_ACCESS_SECRET=ここにAccessSecretを貼る"
```

### Step 3: 接続確認

Claude Code を再起動後:

```
/mcp
```

`x-official` がリストに表示されれば成功。

### Step 4: 動作テスト

```
X で「生成AI 活用」をトレンド検索して最新バズポストを5件教えて
```

---

## 主要ワークフロー

### バズ分析 → 投稿生成フロー

```
X で「{テーマ}」の直近7日間バズポストを分析して、
エンゲージメントが高い構造のパターンを抽出してほしい。
そのパターンを使って私（@{自分のhandle}）のトーンで
3パターンのポスト案を生成して。
```

### 競合アカウント分析

```
@{競合handle} の直近30件の投稿を分析して、
・よく使うハッシュタグ
・投稿頻度・時間帯
・エンゲージメント率が高いコンテンツジャンル
を表形式でまとめて。
```

### 自分の投稿パフォーマンス分析

```
私の過去30日間の投稿から、
インプレッション・エンゲージメント率が高かった上位10件を
抽出して共通パターンを分析して。
```

### トレンドリサーチ → コンテンツ企画

```
今週のAI関連トレンドキーワードTop10を取得して、
それぞれに対してnote記事ネタとして使えるかを評価して。
```

---

## x-article-writer との連携

x-mcp-setup が設定済みの場合、`/x-article-writer` でX記事を作成する前に:

```
まずX公式MCPで「{テーマ}」の最新バズポストを取得して、
話題になっている切り口・意見の傾向を把握してから記事を書いて。
```

このワークフローにより、タイムリーかつエンゲージメントの高い記事が作れる。

---

## 他スキルとの連携

- `/x-article-writer` — X記事作成時にバズ分析でネタ収集
- `/x-search-mcp` — Grok APIと組み合わせてリアルタイム検索をさらに強化
- `/content-planning` — トレンド情報をコンテンツカレンダーに反映
- `/shodan-jizen-research-ai` — X上の企業・代表者の最新発言を商談前に把握
