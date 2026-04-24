---
name: skill-graph
description: Claude Code × ObsidianでSkill Graphナレッジベースを構築する。スキルファイル間の相互参照リンクをObsidian形式で生成し、複雑なタスク（営業判断・リサーチ・書籍執筆）でAIが関連スキルを横断参照できるようにする。Karpathy式ナレッジベース構築手法に基づく。
user-invocable: true
---

# skill-graph スキル

## 概要

単体のスキルファイル（1ファイル＝1能力）は強力だが、複雑なタスクでは複数スキルの文脈を同時に参照する必要がある。このスキルは、Obsidianの双方向リンク（`[[リンク]]`）を使ってスキル間の関係を可視化し、AIが推論時に多面的なコンテキストを参照できるナレッジグラフを構築する。

**基礎思想: Karpathy式ナレッジベース**
- スキルは原子単位（Atomic Note）として独立して存在
- スキル間の文脈は双方向リンクとタグで表現
- AIは複雑なタスク時に関連スキルを自律的に横断参照

---

## Skill Graphの構成要素

### 1. スキルノード（各SKILL.md）

各スキルはObsidian互換のメタデータを持つ独立したノード。

```yaml
---
name: skill-name
description: 一行説明
type: [writing, sales, design, business, utility]
related: [skill-a, skill-b]  # 関連スキル
triggers: ["キーワード1", "キーワード2"]  # トリガーフレーズ
---
```

### 2. グラフインデックス（SKILL_GRAPH.md）

スキル全体の関係マップ。Obsidianで開くとグラフビューで視覚化できる。

```markdown
# Skill Graph

## 執筆クラスター
[[note-knowledge]] → [[avoid-ai-writing]] → [[polish]]
[[x-article-writer]] → [[avoid-ai-writing]]
[[ichiyasa-writing]] → [[avoid-ai-writing]]

## 営業クラスター
[[shodan-jizen-research-ai]] → [[orei-mail]]
[[shodan-jizen-research2]] → [[joshin-story]]

## デザインクラスター
[[teach-impeccable]] → [[frontend-design]] → [[audit]] → [[polish]]
```

### 3. コンテキストブリッジ（CONTEXT_LINKS.md）

タスク別に参照すべきスキルセットをまとめたブリッジファイル。

---

## 実行ワークフロー

### モード1: グラフ初期化（`/skill-graph init`）

既存の全スキルを走査してグラフを構築する。

**Step 1:** `.claude/skills/` 配下の全 `SKILL.md` を読み込む

**Step 2:** 各スキルの `description` と `## 他スキルとの連携` セクションから関連スキルを抽出

**Step 3:** `SKILL_GRAPH.md` を生成して `.claude/` に配置

```markdown
# Skill Graph（自動生成: {日付}）

## クラスター別マップ
...（Obsidian双方向リンク形式）

## 全スキル一覧
| スキル名 | 種別 | 関連スキル |
|---------|------|----------|
| avoid-ai-writing | writing | note-knowledge, x-article-writer, ichiyasa-writing, polish |
...
```

**Step 4:** Obsidianで開く方法を案内する

```
.claudeフォルダをObsidianのVaultとして開いてください。
File → Open Vault → .claude フォルダを選択
Graph View（Cmd+G）でスキル間の繋がりが視覚化されます。
```

### モード2: スキル横断参照（`/skill-graph query [タスク]`）

タスク説明からどのスキルを参照すべきかを推論して提示する。

**例:** `/skill-graph query 商談前リサーチからお礼メールまで一気通貫でやりたい`

→ 推論結果:
```
推奨スキルチェーン:
1. /shodan-jizen-research-ai（商談前リサーチ）
2. /joshin-story（社長への提案が必要な場合）
3. /orei-mail（商談後のお礼）

参照コンテキスト:
- sales-context.md（Algomatic/アポドリ情報）
- writing-tone.md（メール文体ルール）
```

### モード3: スキル追加時の更新（`/skill-graph update [スキル名]`）

新しいスキルを追加した後にグラフを更新する。

**Step 1:** 新スキルの `description` と連携スキル情報を読む

**Step 2:** 既存の `SKILL_GRAPH.md` に追記

**Step 3:** 関連する既存スキルの `SKILL.md` に `related:` メタデータを追加（任意）

---

## Obsidian連携設定

### 推奨プラグイン

| プラグイン | 用途 |
|-----------|------|
| Graph View（組み込み）| スキル間の関係を視覚化 |
| Dataview | スキルをテーブルで一覧・フィルタリング |
| Templater | 新スキルをテンプレートから作成 |
| Tag Wrangler | スキルをタグでクラスタリング |

### フォルダ構成

```
.claude/
├── skills/           ← Obsidian Vaultのルートに設定
│   ├── SKILL_GRAPH.md
│   ├── CONTEXT_LINKS.md
│   ├── note-knowledge/SKILL.md
│   ├── x-article-writer/SKILL.md
│   └── ...
└── rules/
    └── ...
```

---

## 活用シーン

| タスク | 効果 |
|--------|------|
| 商談前リサーチ | `shodan-jizen-research-ai` が `sales-context.md` と `writing-tone.md` を自動参照 |
| note記事執筆 | `note-knowledge` → `avoid-ai-writing` → `polish` のチェーンを自動推奨 |
| 書籍原稿 | `ichiyasa-writing` が章構成メモリと文体ルールを横断参照 |
| UIデザイン | `teach-impeccable` → `frontend-design` → `audit` → `polish` を一発推奨 |

---

## 他スキルとの連携

- `/skill-creator` — 新スキル作成後に `/skill-graph update` で即座にグラフを更新
- `/claude-folder-optimizer` — `.claude` フォルダ全体の構成最適化と組み合わせて使う
- `/research-deep` — 複雑なリサーチタスクで参照すべきスキルを事前に特定する
