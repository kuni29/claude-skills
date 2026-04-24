---
name: claude-browser-agent
description: >
  ClaudeにPlaywrightブラウザを持たせてAIエージェントのWeb操作を本物にするワークフロー。
  Anthropicのdev-browserを使い、スクリーンショットベースではなくDOM直接操作でスクレイピング・
  フォーム入力・Web UIテストを実行する。
allowed-tools: Bash, Read, Write, Glob, Grep
argument-hint: "ブラウザで実行したいタスク（例: サイトからデータ収集, フォーム自動入力, Web UIテスト）"

category: automation
tags: [ブラウザ, Playwright, 自動化, スクレイピング, エージェント]
input:
  - type: text
    description: ブラウザで実行したいタスクの説明
output:
  - type: text
    description: 実行結果・取得データ
requires:
  tools: [npx, node]
related:
  similar_to: [download-analytics, video-auto-publish]
---

# Claude Browser Agent（Playwright × dev-browser）

ClaudeにAnthropicのdev-browserを接続し、本物のPlaywrightでWeb自動化を実行するワークフロー。

元ネタ: @NainsiDwiv50980「これは狂ってる…誰かがClaudeに本物のブラウザを与えた」

---

## 従来のブラウザエージェントとの違い

| 方式 | 精度 | 速度 | 対応範囲 |
|------|------|------|----------|
| スクリーンショット→クリック | △ 座標依存で不安定 | 遅い | 限定的 |
| **dev-browser（本スキル）** | ◎ DOM直接操作 | 速い | 広い |

---

## セットアップ

### 1. dev-browserのインストール

```bash
npx @anthropic-ai/dev-browser
```

### 2. MCPサーバーとして登録（claude_desktop_config.json）

```json
{
  "mcpServers": {
    "browser": {
      "command": "npx",
      "args": ["@anthropic-ai/dev-browser", "--mcp"]
    }
  }
}
```

または Claude Code の場合:

```bash
claude mcp add browser -- npx @anthropic-ai/dev-browser --mcp
```

### 3. 動作確認

```bash
# Claude Codeで実行
claude "https://example.comにアクセスして、ページタイトルを取得して"
```

---

## 主なユースケース

### Webスクレイピング

```
「https://[サイトURL] から以下のデータを取得してCSVに保存:
- 商品名
- 価格
- 在庫状況」
```

### フォーム自動入力

```
「[フォームURL] にアクセスして以下の情報を入力して送信:
- 名前: [名前]
- メール: [メール]
- メッセージ: [内容]」
```

### Web UIテスト

```
「[アプリURL] で以下のテストを実行:
1. ログインボタンをクリック
2. 認証情報を入力
3. ダッシュボードが表示されることを確認
4. スクリーンショットを撮影」
```

### リサーチ自動化

```
「Google検索で[キーワード]を検索して、
上位10件のタイトル・URL・ディスクリプションを取得して
Markdownテーブルで出力」
```

---

## 使い方

1. **セットアップ確認**: dev-browserがMCPとして登録されているか確認
2. **タスク記述**: やりたいことを日本語で説明
3. **実行**: Claudeがブラウザを操作してタスクを完了
4. **結果取得**: データをファイルに保存 or 画面に出力

---

## トラブルシューティング

| 問題 | 対処 |
|------|------|
| MCPが認識されない | `claude mcp list` で登録確認 |
| Playwrightエラー | `npx playwright install chromium` で再インストール |
| ページロードタイムアウト | `--timeout 30000` オプション追加 |
| ログイン必要なサイト | セッションCookieを事前に保存してから実行 |

---

## 参考

- Anthropic dev-browser: `npx @anthropic-ai/dev-browser --help`
- MCP接続確認: `claude mcp list`
- ローカルURL形式: `http://127.0.0.1:PORT` を使用
