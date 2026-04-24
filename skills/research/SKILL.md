---
user-invocable: true
allowed-tools: Read, Write, Glob, WebSearch, Task, AskUserQuestion
description: Conduct preliminary research on a topic and generate research outline. For academic research, benchmark research, technology selection, etc.
---

# Research Skill - Preliminary Research

## Trigger
`/research <topic>`

## Workflow

### Step 1: Generate Initial Framework from Model Knowledge
Based on topic, use model's existing knowledge to generate:
- Main research objects/items list in this domain
- Suggested research field framework

Output {step1_output}, use AskUserQuestion to confirm:
- Need to add/remove items?
- Does field framework meet requirements?

### Step 2: Web Search Supplement
Use AskUserQuestion to ask for time range (e.g., last 6 months, since 2024, unlimited).

**Parameter Retrieval**:
- `{topic}`: User input research topic
- `{YYYY-MM-DD}`: Current date
- `{step1_output}`: Complete output from Step 1
- `{time_range}`: User specified time range

**Hard Constraint**: The following prompt must be strictly reproduced, only replacing variables in {xxx}, do not modify structure or wording.

Launch 1 web-search-agent (background), **Prompt Template**:
```python
prompt = f"""## Task
Research topic: {topic}
Current date: {YYYY-MM-DD}

Based on the following initial framework, supplement latest items and recommended research fields.

## Existing Framework
{step1_output}

## Goals
1. Verify if existing items are missing important objects
2. Supplement items based on missing objects
3. Continue searching for {topic} related items within {time_range} and supplement
4. Supplement new fields

## Output Requirements
Return structured results directly (do not write files):

### Supplementary Items
- item_name: Brief explanation (why it should be added)
...

### Recommended Supplementary Fields
- field_name: Field description (why this dimension is needed)
...

### Sources
- [Source1](url1)
- [Source2](url2)
"""
```

**One-shot Example** (assuming researching AI Coding History):
```
## Task
Research topic: AI Coding History
Current date: 2025-12-30

Based on the following initial framework, supplement latest items and recommended research fields.

## Existing Framework
### Items List
1. GitHub Copilot: Developed by Microsoft/GitHub, first mainstream AI coding assistant
2. Cursor: AI-first IDE, based on VSCode
...

### Field Framework
- Basic Info: name, release_date, company
- Technical Features: underlying_model, context_window
...

## Goals
1. Verify if existing items are missing important objects
2. Supplement items based on missing objects
3. Continue searching for AI Coding History related items within since 2024 and supplement
4. Supplement new fields

## Output Requirements
Return structured results directly (do not write files):

### Supplementary Items
- item_name: Brief explanation (why it should be added)
...

### Recommended Supplementary Fields
- field_name: Field description (why this dimension is needed)
...

### Sources
- [Source1](url1)
- [Source2](url2)
```

### Step 3: Ask User for Existing Fields
Use AskUserQuestion to ask if user has existing field definition file, if so read and merge.

### Step 4: Generate Outline (Separate Files)
Merge {step1_output}, {step2_output} and user's existing fields, generate two files:

**outline.yaml** (items + config):
- topic: Research topic
- items: Research objects list
- execution:
  - batch_size: Number of parallel agents (confirm with AskUserQuestion)
  - items_per_agent: Items per agent (confirm with AskUserQuestion)
  - output_dir: Results output directory (default: ./results)

**fields.yaml** (field definitions):
- Field categories and definitions
- Each field's name, description, detail_level
- detail_level hierarchy: brief -> moderate -> detailed
- uncertain: Uncertain fields list (reserved field, auto-filled in deep phase)

### Step 5: Output and Confirm
- Create directory: `./{topic_slug}/`
- Save: `outline.yaml` and `fields.yaml`
- Show to user for confirmation

## Output Path
```
{current_working_directory}/{topic_slug}/
  ├── outline.yaml    # items list + execution config
  └── fields.yaml     # field definitions
```

## Follow-up Commands
- `/research-add-items` - Supplement items
- `/research-add-fields` - Supplement fields
- `/research-deep` - Start deep research

---

## Agent Reach 統合（オプション）

**Agent Reach** は X/Twitter・YouTube・Reddit・GitHub・TikTok・RSS など18+プラットフォームをAPI料金なしで閲覧・検索できるOSS CLIツール。インストール済みであれば、WebSearch では取得できないソーシャルメディアコンテンツを無料でリサーチできる。

### セットアップ確認

```bash
# インストール済みか確認
agent-reach --version

# 未インストールの場合
pip install agent-reach
agent-reach install --env=auto  # 依存関係を自動セットアップ
```

### 対応プラットフォームと用途

| プラットフォーム | 取得方法 | 用途 |
|---|---|---|
| X/Twitter | cookieベース | トレンド・ツイート検索・スレッド取得 |
| YouTube | yt-dlp | 動画字幕・コメント・チャンネル情報 |
| Reddit | 公開API | スレッド・コメント・コミュニティ動向 |
| GitHub | 公開API | リポジトリ・Issue・スター数・コミット |
| TikTok | cookieベース | バイラルコンテンツ・ハッシュタグ動向 |
| HackerNews | 公開API | 技術コミュニティの評判・議論 |
| RSS | フィード | ニュース・ブログの最新情報 |

### Step 2 の拡張（Agent Reach 使用時）

WebSearch に加えて以下のコマンドでリサーチを補完する：

```bash
# YouTube動画を要約してリサーチに追加
agent-reach youtube search "{topic}" --limit 5

# Redditの最新スレッドを取得
agent-reach reddit search "{topic}" --subreddit all --limit 10

# GitHubリポジトリの動向
agent-reach github search "{topic}" --type repos --sort stars

# X/Twitterのトレンド取得
agent-reach twitter search "{topic}" --limit 20
```

### 注意事項
- Agent Reach はオプション。未インストールの場合は通常の WebSearch フローで続行する
- cookieベースのプラットフォーム（X/TikTok）は事前に `agent-reach auth {platform}` で認証が必要
- 法的・規約上の制限を遵守すること（個人利用・研究目的の範囲内で使用）
