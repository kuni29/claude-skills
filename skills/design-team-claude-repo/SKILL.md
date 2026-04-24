---
name: design-team-claude-repo
description: Generate a Claude Code shared repository template for non-engineer design teams. Use this skill when a user wants to set up Claude Code for a design team, share skills across team members, create a team CLAUDE.md, structure a shared Claude Code repository, or onboard designers to a shared AI workflow. Also trigger when someone asks how to share Claude Code skills with teammates, or mentions wanting to use Claude Code collaboratively with a design team.
user-invocable: true
---

# Design Team Claude Code Shared Repository Builder

非エンジニアのデザインチームがClaude Codeを共有リポジトリで運用するためのテンプレートを生成するスキル。

元ネタ: @shingo2000「デザインチームにClaude Codeと共有リポジトリを導入して2ヶ月が経った」（3名・204コミットの実績）

## このスキルでできること

- チーム共有リポジトリの**ディレクトリ構成**を生成
- チーム全体の**CLAUDE.md雛形**を出力
- 個人設定用の**members/雛形**を生成
- デザインチーム向け**推奨スキルセット**リストを提示
- 導入後の**運用ルール**を自動生成

---

## Step 1: チーム情報を収集する

以下を確認する（会話から推測できる場合はスキップ）:

1. **チーム人数**: 何人でリポジトリを共有するか
2. **主な用途**: UIデザイン制作 / 執筆・コンテンツ / 営業・リサーチ / その他
3. **使用ツール**: Figma / Notion / Slack など連携したいツール
4. **スキルレベル**: 全員非エンジニア / 一部エンジニアがいる

---

## Step 2: ディレクトリ構成を生成する

以下のテンプレート構成を出力する:

```
team-claude/
├── CLAUDE.md              # チーム共通ルール・スキルルーティング
├── DESIGN.md              # デザインシステム定義（UIチームは必須）
├── shared/
│   ├── skills/            # チーム全員が使えるスキル格納場所
│   │   ├── [skill-name]/
│   │   │   └── SKILL.md
│   │   └── ...
│   ├── prompts/           # 再利用可能プロンプトテンプレート
│   └── references/        # チームで共有する参照ドキュメント
├── members/
│   ├── [member-name]/
│   │   ├── CLAUDE.md      # 個人ルール（グローバルを上書き）
│   │   └── notes.md       # 個人メモ・ナレッジ
│   └── ...
└── README.md              # リポジトリの使い方
```

**なぜこの構成か:**
- `shared/` はチーム全員が読み書きするナレッジベース
- `members/` は個人のカスタマイズ領域（プライベート設定も置ける）
- コミット履歴がチームのAIナレッジベースとして蓄積される

---

## Step 3: チーム共通 CLAUDE.md を生成する

以下のテンプレートをカスタマイズして出力:

```markdown
# Team Claude Code - CLAUDE.md

## チーム情報
- チーム名: [チーム名]
- メンバー: [メンバーリスト]
- 主な用途: [用途]

## 共通ルール
- デフォルト言語: 日本語
- コミットメッセージ: 日本語でOK
- ファイル命名: kebab-case（例: design-review.md）

## スキルルーティング
（チームの用途に合わせて記載）
- UIデザイン → /teach-impeccable → /frontend-design
- コンテンツ制作 → /note-knowledge or /x-article-writer
- リサーチ → /research or /research-deep

## 共有スキルの場所
shared/skills/ 配下にチームスキルを格納。
新しいスキルを作ったら shared/skills/ に置いてコミットする。

## ナレッジ共有ルール
- 使えた設定・プロンプトは shared/prompts/ に保存する
- 試して失敗した手法も README に記録する（同じ失敗を繰り返さない）
```

---

## Step 4: 個人フォルダ雛形を生成する

各メンバー用の `members/[name]/CLAUDE.md` テンプレート:

```markdown
# [メンバー名] 個人設定

## 優先用途
[自分がよく使う機能・スキルを記載]

## 個人ルール（チームルールを上書き）
[チームと異なる設定があれば記載]

## よく使うコマンド
- /[skill-name]: [説明]
```

---

## Step 5: 推奨スキルセットを提示する

チームの用途に応じて推奨スキルを提示する:

### UIデザインチーム向け（必須）
- `teach-impeccable` — プロジェクトのデザインコンテキスト収集
- `frontend-design` — AI臭くないUIを作るガイドライン
- `audit` — 技術品質チェック
- `critique` — UXレビュー
- `polish` — リリース前最終調整

### コンテンツ・マーケティングチーム向け
- `note-knowledge` — 知見・分析記事
- `x-article-writer` — X長文記事
- `content-planning` — コンテンツ企画

### 全チーム共通（あると便利）
- `claude-folder-optimizer` — .claude設定の最適化
- `skill-creator` — 新しいスキルの作成
- `prompt-master` — プロンプト生成

---

## Step 6: 導入ステップガイドを出力する

```markdown
## チーム導入手順

### Week 1: 環境構築
1. GitHubでリポジトリ作成（チームの場合はOrg配下推奨）
2. 全メンバーがリポジトリをclone
3. 各メンバーが members/[自分の名前]/ フォルダを作成
4. チームの CLAUDE.md を全員でレビュー

### Week 2: スキル共有
1. まず1人が試してよかったスキルを shared/skills/ にコミット
2. 週次でナレッジ共有タイム（15分）を設ける
3. 「これやったらうまくいった」をREADMEに記録

### Week 3以降: 運用定着
1. 共有スキルが増えるほどROIが上がる
2. コミット履歴 = チームのAIナレッジベース
3. 月1でスキルを棚卸し・整理する
```

---

## 出力形式

ユーザーの状況に応じて以下を出力:

- **初期セットアップの場合**: Step 2〜6を全出力（コピペできるMarkdown形式）
- **CLAUDE.mdだけ欲しい場合**: Step 3のみ
- **スキルの相談の場合**: Step 5のみ

最後に: 「このテンプレートをそのままコピーして使えます。チームの規模や用途に合わせてカスタマイズしてください。」と案内する。
