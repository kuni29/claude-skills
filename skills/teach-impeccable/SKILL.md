---
name: teach-impeccable
description: One-time setup that gathers design context for your project and saves it to your AI config file. Run once to establish persistent design guidelines. Also guides non-engineers (designers, planners) through Claude Code initial setup — permissions, API key, model selection — before collecting design context. Includes Design System maturity diagnosis (Lv0–Lv4) and automatically proposes next actions based on the current level. Use this skill whenever someone runs /teach-impeccable, starts a new project, or says they're new to Claude Code and don't know where to begin.
user-invocable: true
---

Gather design context for this project, then persist it for all future sessions.

## Phase 0: Claude Code Initial Setup (Non-Engineers)

Before diving into design context, check if the user needs help setting up Claude Code itself.

**Run this phase if:**
- The user mentions they're a designer, planner, or non-engineer
- There is no `.impeccable.md` and no obvious code project present
- The user seems confused about where to start

**Skip this phase if:**
- There's already a codebase present with package.json or similar
- The user appears technically confident

### 0-1: Check Current Setup Status

Ask the user:

> 「Claude Codeは初めて使いますか？すでに基本設定（APIキー・権限）は済んでいますか？」

If they say yes or unsure, walk them through:

### 0-2: Permissions Setup

Explain that Claude Code needs permission to read/write files and run commands. Guide them:

1. **初回起動時の権限確認**: Claude Codeを起動すると「Allow file access?」のような確認が出る。基本的に「Yes / Allow」で進んでOK。
2. **プロジェクトフォルダを開く**: `cd ~/Desktop/my-project` または Finder からフォルダを右クリック → 「ターミナルで開く」
3. **Claude Codeの起動**: ターミナルで `claude` と入力してEnter

### 0-3: API Key Setup

If they don't have an API key configured:

1. Anthropicのコンソール（console.anthropic.com）でAPIキーを取得する
2. ターミナルで以下を実行:
   ```bash
   export ANTHROPIC_API_KEY="sk-ant-..."
   ```
3. 永続化したい場合: `~/.zshrc` または `~/.bashrc` に上記を追記する

### 0-4: Model Selection

Recommend the right model for their use case:

| 用途 | 推奨モデル |
|------|-----------|
| デザインレビュー・文章生成 | claude-sonnet-4-6（バランス型） |
| 複雑なコード生成・アーキテクチャ設計 | claude-opus-4-6（最高性能） |
| 素早い確認・繰り返し作業 | claude-haiku-4-5（高速・低コスト） |

デフォルトはSonnetで問題なし。設定方法:
```bash
claude --model claude-sonnet-4-6
```

### 0-5: First Run Confirmation

Confirm everything is working:
> 「`claude` と入力してEnterを押すと、プロンプトが表示されますか？」

表示されたら設定完了。次のステップへ進む。

---

## Step 1: Explore the Codebase

Before asking questions, thoroughly scan the project to discover what you can:

- **README and docs**: Project purpose, target audience, any stated goals
- **Package.json / config files**: Tech stack, dependencies, existing design libraries
- **Existing components**: Current design patterns, spacing, typography in use
- **Brand assets**: Logos, favicons, color values already defined
- **Design tokens / CSS variables**: Existing color palettes, font stacks, spacing scales
- **Any style guides or brand documentation**

Note what you've learned and what remains unclear.

## Step 1.5: Design System Maturity Diagnosis

After exploring the codebase, diagnose the current Design System (DS) maturity level. This shapes what setup actions to take automatically vs. what to propose.

### Maturity Levels

| Level | Name | Criteria |
|-------|------|----------|
| **Lv0** | DS無し | No DESIGN.md, no design tokens, design info is absent or scattered |
| **Lv1** | CLAUDE.md混在 | Design guidelines exist but are mixed inside CLAUDE.md, not separated |
| **Lv2** | DESIGN.md分離 | A dedicated DESIGN.md exists, separate from CLAUDE.md |
| **Lv3** | JSON構造化 | Design tokens are in machine-readable JSON (tokens.json, etc.) |
| **Lv4** | 自動検証 | CI/CD validation scripts enforce design system compliance automatically |

### Detection Heuristics

- Check for `DESIGN.md` in the project root → Lv2+
- Check for `design/contracts/tokens.json` or similar token files → Lv3+
- Check for design validation scripts in `package.json` or `.github/workflows/` → Lv4
- If CLAUDE.md contains color values, font stacks, or spacing rules → Lv1

### Actions by Level

**Lv0 detected:**
> 「DESIGN.mdが見つかりませんでした。デザインシステムの基盤として今すぐ作成します。」
→ Proceed to Step 3 and write both `.impeccable.md` and a starter `DESIGN.md`.

**Lv1 detected:**
> 「CLAUDE.mdにデザイン情報が混在しています。DESIGN.mdに切り出すことで、AIがより精度高くデザインを参照できます。」
→ Extract design-relevant content from CLAUDE.md and propose writing it to `DESIGN.md`.

**Lv2 detected:**
> 「DESIGN.mdが分離されています（Lv2）。次のステップはJSONトークン化（Lv3）です。」
→ Mention the next step in the summary, but don't force it now.

**Lv3 detected:**
> 「JSONトークンが整備されています（Lv3）。自動検証（Lv4）に進む場合はCIスクリプトの追加をご検討ください。」
→ Acknowledge the advanced setup.

**Lv4 detected:**
> 「自動検証まで整備済みです（Lv4）。デザインシステムの成熟度は最高レベルです。」
→ Note in the summary.

Include the detected level and recommended next step in the `.impeccable.md` output.

---

## Step 2: Ask UX-Focused Questions

ask the user directly to clarify what you cannot infer. Focus only on what you couldn't infer from the codebase:

### Users & Purpose
- Who uses this? What's their context when using it?
- What job are they trying to get done?
- What emotions should the interface evoke? (confidence, delight, calm, urgency, etc.)

### Brand & Personality
- How would you describe the brand personality in 3 words?
- Any reference sites or apps that capture the right feel? What specifically about them?
- What should this explicitly NOT look like? Any anti-references?

### Aesthetic Preferences
- Any strong preferences for visual direction? (minimal, bold, elegant, playful, technical, organic, etc.)
- Light mode, dark mode, or both?
- Any colors that must be used or avoided?

### Accessibility & Inclusion
- Specific accessibility requirements? (WCAG level, known user needs)
- Considerations for reduced motion, color blindness, or other accommodations?

Skip questions where the answer is already clear from the codebase exploration.

## Step 3: Write Design Context

Synthesize your findings and the user's answers into a `## Design Context` section:

```markdown
## Design Context

### Users
[Who they are, their context, the job to be done]

### Brand Personality
[Voice, tone, 3-word personality, emotional goals]

### Aesthetic Direction
[Visual tone, references, anti-references, theme]

### Design Principles
[3-5 principles derived from the conversation that should guide all design decisions]

### Design System Maturity
- **Current Level**: Lv[0-4] — [Level name]
- **Evidence**: [What was found or not found in the codebase]
- **Next Recommended Step**: [Specific action to reach the next level]
```

Write this section to `.impeccable.md` in the project root. If the file already exists, update the Design Context section in place.

Then ask the user directly to clarify what you cannot infer. whether they'd also like the Design Context appended to .github/copilot-instructions.md. If yes, append or update the section there as well.

Confirm completion and summarize the key design principles that will now guide all future work.