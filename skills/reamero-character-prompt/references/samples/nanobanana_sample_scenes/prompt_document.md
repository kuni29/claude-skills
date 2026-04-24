# Nano Banana：シーン系サンプル（まとめフォルダ）

**目的**: 同一キャラを**別ロケーション・別服装**で回すときの英文例、**JSON ブリーフ**、**シーン JSON ストック**を、リポジトリ上では **`nanobanana_sample_scenes/` 配下に集約**して置く。

---

## サブフォルダ一覧

| サブフォルダ | 内容 |
| --- | --- |
| **`with_reference/`** | 参照画像必須のルールと、ミラー・屋外・カフェ等の**長文英文サンプル**（`prompt_document.md`） |
| **`json_brief_seated_mirror/`** | 着席・横顔・ミラーセルフィーなどの **JSON → 英文**の完全例、`scene_brief.sample.json` |
| **`stock/`** | 汎用 `scene_brief` テンプレ（`scenes/_template/`）と、個別シーンの `scene_brief.json`・一部 `prompt_en.md` |

---

## 読む順序の例

1. **`with_reference/prompt_document.md`** — 参照ロックの書き方・禁止の言い換え。
2. **`json_brief_seated_mirror/prompt_document.md`** — ブリーフを機械可読 JSON にしたいとき。
3. **`stock/prompt_document.md`** — 既存 `scene_id` の一覧と、新規シーン追加手順。

---

## 参照

- `.claude/skills/nano-banana-prompt/SKILL.md`
- `.claude/skills/reamero-character-prompt/SKILL.md`
- スタジオ白ハイキー・顔ベース: `nanobanana_sample_studio_base_closeup/prompt_document.md`

