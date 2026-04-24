# Nano Banana：スタジオ白ハイキー・超寄りビューティベース（環境・ベース顔用）

**目的**: **環境（白無地・ハイキー・ソフト正面光）**と**商業ビューティ寄りの画風**を一度に固定したいときの**英文テンプレ**。キャラの**顔・髪・瞳の色**は、確定したキャラ設計（muse や `reamero-character-prompt`）の語に**差し替え**て使う。

**前提**: `nano-banana-prompt` **フレームワーク1**（テキストから画像）。**1枚1出力**向け。架空キャラ・実在人物の再現は禁止。

---

## 使い方

1. **まず下記「提供原文」または「りあめろ調整版」をそのまま試す**（全体の空気・照明の参考）。
2. キャラが決まったら、**髪型・前髪・肌・目の色・リップ**の短文だけを**あなたのキャラ用タグ**に置換。背景・照明・`pure white seamless`・`high-key` などは**残す**とベースの統一がしやすい。
3. **参照画像ワークフロー**に移行するときは、このベースで生成した画像を**参照**にし、別シーンは `nanobanana_sample_scenes/with_reference/prompt_document.md` のルールでロックする。

---

## 注意（りあめろ・パーツ辞書）

- **国籍**: プロンプトに `Korean` が出る場合でも、リポジトリ既定は **Japanese の架空キャラ**に寄せる（調整版では明示）。
- **瞳**: **バイオレットグレー**は演出色として強い。実写寄せにするなら `medium ash-brown` 等へ差し替え。**オッドアイ禁止**のキャラでは `identical iris color in both eyes` を必ず足す（調整版に含め済み）。
- **肌**: `porcelain` と `no moles no freckles` は併用しやすい（ホクロブレ防止）。
- **服装**: フレーム端のストラップのみなら `single layer:` で **白タンク**を一文にまとめてもよい（`clothing.md`）。

---

## 提供原文（コピー用・ユーザー寄稿）

そのまま Nano Banana に貼れる1段落。

```text
Ultra close-up beauty portrait, head-and-shoulders framing, face filling most of the frame, pure white seamless studio background, high-key studio lighting, soft diffused frontal light, luminous airy atmosphere, clean commercial beauty photography, Korean beauty editorial style, delicate youthful East Asian girl, short black bob haircut, neat see-through bangs, large glossy violet-gray eyes, subtle eyeliner, soft lower lashes, tiny nose, glossy pale pink lips, porcelain fair skin, smooth refined skin texture, soft blush, bright catchlights in the eyes, slight wind-blown wispy strands across the face, slender neck and collarbones, white tank top straps only slightly visible, minimal composition, dreamy clean white negative space, ultra polished retouching, soft glow, beauty campaign aesthetic, ethereal, fresh, innocent, high detail, sharp eyes, soft skin, premium studio portrait
```

---

## りあめろ調整版（コピー用）

**推奨**: 架空日本人・late teens・オッドアイ禁止・`Create a single...` を先頭に付与。

```text
Create a single photorealistic portrait image. Ultra close-up beauty portrait, head-and-shoulders framing, face filling most of the frame, pure white seamless studio background, high-key studio lighting, soft diffused frontal light, luminous airy atmosphere, clean commercial beauty photography, K-beauty-inspired editorial polish. Subject: original fictional young Japanese woman in her late teens (not based on any real person). Short black bob haircut, neat airy see-through bangs. Eyes: large glossy violet-gray irises, naturally sized, identical iris color in both eyes, no heterochromia; subtle eyeliner, soft lower lashes, bright catchlights in both eyes, natural-looking lashes. Tiny refined nose, glossy pale pink lips. Porcelain fair skin, smooth refined skin texture, soft blush, clear skin without moles or freckles. Slight wind-blown wispy strands across the face. Slender neck and collarbones. Single layer only: simple white cotton tank top, thin straps only slightly visible at the lower frame edge. Minimal composition, dreamy clean white negative space, soft glow, beauty campaign aesthetic, ethereal, fresh, innocent, high detail, sharp eyes, soft skin, premium studio portrait, photorealistic, 8k quality, magazine-quality skin.
```

**実写自然瞳に寄せる差し替え例**（該当箇所だけ置換）:

`Eyes: large glossy violet-gray irises, naturally sized, identical iris color in both eyes, no heterochromia`  
→ `Eyes: soft almond-shaped eyes, medium ash-brown irises, naturally sized, identical iris color in both eyes, no heterochromia`

---

## 機械可読メタ（任意）

`base_brief.json` は JSON ツールやエージェント用の最小メタ。プロンプト全文は上記英文。

---

## 参照

- `.claude/skills/nano-banana-prompt/SKILL.md`（フレームワーク1）
- `.claude/skills/reamero-character-prompt/SKILL.md`
- `nanobanana_sample_character_ash_bob_muse`（別ボブ・別照明のベース比較用）
- `nanobanana_sample_scenes/with_reference/prompt_document.md`（シーン系目次: `nanobanana_sample_scenes/prompt_document.md`）

---

## 免責

創作用のプロンプト実験集です。実在個人の再現や権利侵害用途には使用しないでください。
