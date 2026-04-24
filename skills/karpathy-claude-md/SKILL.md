---
name: karpathy-claude-md
description: Andrej Karpathyが指摘したLLMの典型ミス（過剰設計・既存パターン無視・余計な依存関係）を防ぐCLAUDE.mdをプロジェクト分析から自動生成するスキル。「CLAUDE.mdを作りたい」「AIの暴走を防ぎたい」「LLMの違反率を下げたい」で使う。実績: 違反率40%→3%に削減。
user-invocable: true
---

# karpathy-claude-md スキル

## 概要

Andrej Karpathy（元Tesla AI Director、元OpenAI）が指摘した、LLMがコードを書く際に陥りやすい典型的なミスを防ぐCLAUDE.mdを自動生成する。

**Karpathyが指摘したLLMの典型ミス:**
1. **過剰設計（Over-engineering）** — シンプルな問題に複雑なアーキテクチャを当てはめる
2. **既存パターン無視** — プロジェクトのコーディング規約・命名規則を無視して自分流で書く
3. **余計な依存関係の追加** — 不要なライブラリをインストールしようとする
4. **スコープクリープ** — 頼んでいない機能を勝手に追加する
5. **テストのスキップ** — 実装を急いでテストを省略する
6. **ドキュメントの捏造** — 存在しない関数・APIを呼び出す

**実績:** このアプローチで違反率40% → 3%に削減。GitHubで1週間で15k stars獲得。

---

## 実行フロー

### Step 1: プロジェクト分析

以下のコマンドで現在のプロジェクトを分析してCLAUDE.mdを生成する:

```bash
claude -p "Analyze this project and create a comprehensive CLAUDE.md file based on Andrej Karpathy's principles for preventing common LLM mistakes. 

Examine:
1. Project structure, stack, and architecture patterns
2. Existing code style, naming conventions, and patterns
3. Package.json / requirements.txt / go.mod for dependency philosophy
4. Test files for testing patterns and coverage expectations
5. Any existing documentation or README

Then generate a CLAUDE.md that:
- Documents the exact coding style this project uses (naming, formatting, structure)
- Lists FORBIDDEN actions (adding dependencies, changing architecture, skipping tests)
- Specifies REQUIRED actions (following existing patterns, running tests before committing)
- Includes project-specific gotchas and constraints
- Adds Karpathy anti-patterns checklist

Output ONLY the CLAUDE.md content, nothing else." \
  --allowedTools Bash,Write,Read \
  --output-file CLAUDE.md
```

### Step 2: 生成後のレビュー

生成されたCLAUDE.mdを開いて以下を確認する:
- [ ] プロジェクトのスタックが正確に記載されているか
- [ ] 禁止事項（FORBIDDEN）が具体的かつ実用的か
- [ ] 既存のコーディングパターンが反映されているか
- [ ] チームの独自ルールが漏れていないか

---

## CLAUDE.md テンプレート構造

自動生成されるCLAUDE.mdは以下の構造を持つ:

```markdown
# CLAUDE.md

## Project Overview
{プロジェクト概要・目的・技術スタック}

## Architecture
{ディレクトリ構造・主要コンポーネントの役割}

## Code Style
{命名規則・フォーマット・コメントルール}

## FORBIDDEN Actions（絶対にやってはいけないこと）
- [ ] 新しい外部ライブラリを追加すること（承認なし）
- [ ] 既存のアーキテクチャパターンを変えること
- [ ] テストなしで機能を追加すること
- [ ] 頼まれていない機能を追加すること
- [ ] 存在しない関数・APIを使うこと

## REQUIRED Before Committing
- [ ] 既存テストが全てパスすること
- [ ] 新機能には対応するテストを書くこと
- [ ] {プロジェクト固有のLintルール}が通ること

## Project-Specific Patterns
{このプロジェクト固有のパターン・ゴッチャ}

## Common Pitfalls
{このコードベースで過去にミスが起きやすかったポイント}
```

---

## Karpathy Anti-patterns チェックリスト

CLAUDE.mdに含める標準チェックリスト（プロジェクトに合わせてカスタマイズ）:

```markdown
## Karpathy Anti-patterns Checklist（実装前に確認）

Before writing any code, check:
- [ ] Am I solving the simplest possible version of this problem?
- [ ] Does a similar pattern already exist in this codebase?
- [ ] Can I reuse existing utilities instead of creating new ones?
- [ ] Is this feature actually requested, or am I adding it "just because"?
- [ ] Am I about to add a new dependency? If yes, STOP and ask first.
- [ ] Will this change break existing tests?
- [ ] Am I following the exact naming conventions used in this project?
```

---

## update-config との連携

`/update-config` でClaude Codeの設定を調整する際、CLAUDE.mdの内容を設定ファイルに反映する場合は以下の手順:

1. `/karpathy-claude-md` でCLAUDE.mdを生成
2. 禁止コマンドをpermissionsの`deny`リストに追加
3. 必須実行コマンドをhooksに設定

```bash
# 例: テスト必須化をhookに追加
/update-config
> "コミット前に npm test を自動実行するhookを追加して"
```

---

## 他スキルとの連携

- `/update-config` — CLAUDE.md生成後にClaude Code設定に反映する
- `/claude-folder-optimizer` — CLAUDE.mdを含む.claudeフォルダ全体を最適化
- `/audit` — 生成したCLAUDE.mdの品質チェック
- `/init` — 新プロジェクト初期化時にCLAUDE.mdも同時に生成
