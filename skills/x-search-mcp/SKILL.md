---
name: x-search-mcp
description: Grok API（xAI）経由でX（Twitter）のリアルタイム検索をClaude CodeのMCPに統合するセットアップスキル。MCP設定を自動生成し、商談前リサーチ（shodan-jizen-research-ai）でX最新投稿も参照できるようにする。「X検索をClaudeに繋げたい」「Grok MCPを設定したい」「商談リサーチにX情報を加えたい」で使う。
user-invocable: true
---

# x-search-mcp セットアップスキル

## 概要

xAI（Grok）のLive Search APIをClaude CodeのMCPサーバーとして接続することで、Claude CodeからリアルタイムX検索が可能になる。商談前リサーチ（`/shodan-jizen-research-ai`）でX上の最新発言・動向・採用情報を追加取得でき、リサーチの深度と鮮度が格段に向上する。

**コスト感:** xAI APIは$10チャージで1回検索$0.01程度。コスパ良好。

---

## 前提条件

- Claude Code がインストール済み
- xAI APIキーの取得（https://console.x.ai/ でアカウント作成・$10チャージ）

---

## セットアップ手順

### Step 1: xAI APIキーの確認

ユーザーに確認する:

> 「xAI（Grok）のAPIキーはお持ちですか？https://console.x.ai/ で取得できます。$10チャージして `xai-` で始まるAPIキーをコピーしてください。」

### Step 2: MCP設定の追加

以下のコマンドをターミナルで実行する（ユーザーに提示する）:

**方法A: x-search-mcp（推奨）**
```bash
claude mcp add x-search \
  --transport http \
  https://x-search-mcp.vercel.app/mcp \
  --header "Authorization: Bearer {XAI_API_KEY}"
```

**方法B: grok-mcp（代替）**
```bash
claude mcp add grok \
  --command npx \
  --args "-y" "grok-mcp" \
  --env "XAI_API_KEY={XAI_API_KEY}"
```

`{XAI_API_KEY}` をStep 1で取得したキーに置き換える。

### Step 3: 接続確認

Claude Code を再起動後、以下で接続確認:

```
/mcp
```

`x-search` または `grok` がリストに表示されれば成功。

### Step 4: テスト検索

```
X で「Algomatic アポドリ」を検索して
```

最新ポストが表示されれば完了。

---

## shodan-jizen-research-ai との統合

x-search-mcp が設定済みの場合、商談前リサーチに**X投稿セクション**が追加される。

`/shodan-jizen-research-ai` 実行時に以下を各企業テーブルに追記する:

```
| X最新投稿 | 投稿1 | @handle「投稿内容」（日付）|
| X最新投稿 | 投稿2 | @handle「投稿内容」（日付）|
| X最新投稿 | 投稿3 | @handle「投稿内容」（日付）|
```

**検索クエリ例:**
- `{企業名} 採用` — 急成長・採用強化の文脈を把握
- `{企業名} AI` — AI導入への関心度を測定
- `{代表者名} OR {企業名}` — 代表の発言・思想を把握

---

## 活用シーン

| シーン | 使い方 |
|--------|--------|
| 商談前リサーチ | 企業名でX検索 → 代表の最新発言・採用動向を把握 |
| 競合リサーチ | 競合他社名でX検索 → 市場の動きをリアルタイム把握 |
| ニュース補完 | WebSearch で見つからない最新情報をXから取得 |
| トレンド把握 | ハッシュタグ検索でバズっているAI活用事例を収集 |

---

## 他スキルとの連携

- `/shodan-jizen-research-ai` — X投稿セクションで商談前リサーチを強化
- `/shodan-jizen-research2` — 手動入力の企業リサーチにもX情報を追加
- `/research-deep` — 深いリサーチタスクでX情報源を活用
