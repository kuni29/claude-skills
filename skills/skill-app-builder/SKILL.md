---
name: skill-app-builder
description: Claude CodeのSkillからWebアプリやUIプロトタイプを自動生成する。非エンジニアが「こういうアプリが欲しい」と伝えるだけでReactアプリやインタラクティブなUIを作成。「アプリ作って」「プロトタイプ」「ツール作って」「簡単なアプリ」「Webアプリ」などのキーワードで使用する。
---

# Skill App Builder

非エンジニアが「こういうアプリが欲しい」と伝えるだけで、Webアプリやインタラクティブなプロトタイプを自動生成するスキル。

---

## ワークフロー

### Step 1: 要件ヒアリング
AskUserQuestionで以下を確認：
- **何をしたいか**: アプリの目的（例: 「顧客リストを管理したい」「ダッシュボードが欲しい」）
- **誰が使うか**: 自分だけ / チーム / 外部ユーザー
- **データ**: 既存データがあるか、どこに保存するか
- **参考**: 似ているサービスやイメージ

### Step 2: 技術選定
要件に応じて最適な構成を自動選択：

| ユースケース | 推奨構成 |
|-------------|---------|
| シンプルなツール | HTML + Tailwind CSS（単一ファイル） |
| インタラクティブUI | React + Vite + Tailwind |
| データ管理系 | Next.js + Supabase or Notion API |
| ダッシュボード | React + Recharts/D3 |
| フォーム系 | React Hook Form + Zod |

### Step 3: プロトタイプ生成
1. `/frontend-design` スキルのガイドラインに従ってUI設計
2. コード生成（AIっぽいデザインを避ける）
3. Preview MCPで即座にプレビュー

### Step 4: イテレーション
ユーザーのフィードバックを受けて修正。以下のスキルと連携：
- デザイン調整 → `/polish`, `/arrange`, `/typeset`
- レスポンシブ → `/adapt`
- アニメーション → `/animate`

---

## 出力ルール

### ファイル構成（シンプルなツールの場合）
```
project-name/
├── index.html      # 単一ファイルで完結
├── package.json    # 必要に応じて
└── .claude/
    └── launch.json # Preview用
```

### ファイル構成（React appの場合）
```
project-name/
├── src/
│   ├── App.tsx
│   ├── components/
│   └── lib/
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── .claude/
    └── launch.json
```

### デザイン原則
- `/frontend-design` のガイドラインを必ず適用
- グラデーション背景、角丸カードの羅列などAIっぽいデザインを避ける
- 実用的で、実際に使えるUIを目指す
- モバイル対応を考慮する

---

## launch.json テンプレート

Preview MCPで確認するための設定を自動生成：

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "dev",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 5173
    }
  ]
}
```

---

## 非エンジニア向けのガイド

スキル実行時、以下のメッセージでユーザーをガイドする：

1. 「どんなアプリを作りたいですか？自然言語で教えてください」
2. 生成後: 「プレビューを確認してください。変更したい箇所があれば教えてください」
3. 完成後: 「デプロイ方法をご案内しましょうか？（Vercel / Netlify / ローカル）」
