# Nano Banana：参照画像付き・同一キャラの多シーン生成

**目的**: 既に作ったキャラ（例: `nanobanana_sample_character_*_muse` の**同一案**の正面ヘッドショットや2×2の顔コマ）を**参照画像として固定**し、**ロケーション・服装・カメラだけ**を変えたカットを生成する。顔・髪・メイクの**別人化**を防ぐ。

**前提**: `nano-banana-prompt` の**フレームワーク2**＋スキル内「**シーン多様生成（同一キャラ・参照画像必須）**」。最終プロンプトは**英語**。架空のオリジナルキャラクター（実在個人に基づかない）。

**JSON ブリーフの完全例**（着席・横顔・ミラーセルフィー、`identity_mode`・参照ロック版／テキストのみ版の英文）: `../json_brief_seated_mirror/prompt_document.md`（リポジトリルートからは `nanobanana_sample_scenes/json_brief_seated_mirror/prompt_document.md`）と同フォルダの `scene_brief.sample.json`。

**複数シーンの JSON ストック**（テンプレ＋本書の例1〜3相当・レトロミラー等）: `../stock/prompt_document.md`（ルートからは `nanobanana_sample_scenes/stock/prompt_document.md`）。親の目次: `../prompt_document.md`。

---

## 必須ルール（運用）

| # | 内容 |
| --- | --- |
| 1 | **参照画像を1枚以上添付**してからプロンプトを送る（テキストのみの多シーン連打は禁止に近い扱い）。 |
| 2 | 英文の**先頭**で、参照を「顔・肌・髪・メイクの唯一の基準」と宣言し、**別人を生成しない**と書く。 |
| 3 | 本文に**参照と矛盾する**目の色・髪色・前髪の有無・メイクの系統を**書かない**（シーン用の再定義をしない）。 |
| 4 | シーンごとに変えてよいのは **服装・ポーズ・背景・照明・カメラ・アスペクト比** など。服装は `reamero-character-prompt` の `references/prompts/clothing.md`（レイヤー順・色の具体性）。 |
| 5 | 表情は**同一人物の自然な範囲**（例: 閉じた口のニュートラル→閉じた口の穏やかな笑み）。別キャラに読み替わるほど表情指定を激しくしない。 |
| 6 | JSON や Notion の構造化メモを使う場合は、**顔・髪・メイクの細目は JSON に詰めず** `preserve_original` / 参照ロックに寄せ、**シーン固有フィールド**だけを英文に展開する。 |

---

## 参照に使う画像の例

- 各 muse の **案1 の A（正面・頭〜肩・1:1）** の生成結果（推奨）。
- または **2×2 の B** の**顔が最もはっきりしたパネル**をトリミングしたもの。
- **注意**: 参照と**別案**（案2の髪など）を混ぜない。シーン生成は**常に同一案の参照**とセットにする。

---

## 再利用できる「同一性ロック」英文ブロック

シーン例の**直前**に、そのまま貼る（参照画像添付は UI 側で行う）。

```text
Using the attached reference image as the single source of truth for this person: preserve exactly the same facial identity — same face shape, eyes, nose, eyebrows, lip shape, skin tone, hair color, hair length, haircut, bangs or no bangs, and overall makeup style as in the reference. Do not invent a different face or hairstyle. Do not change makeup palette or hair color.
```

続けて `New scene only:` から**シーン専用**の文を書く。

---

## 構造化ブリーフ（JSON）→ 英文への対応（目安）

企画で JSON を使う場合の**落とし込み先**の例（キー名は任意でよい）。

| JSON の意図 | プロンプト側の扱い |
| --- | --- |
| `subject.face.preserve_original: true` | 上記**同一性ロック**ブロックを必ず入れ、顔の生体記述は**書かない**か**参照と一致のみ**の1文に留める。 |
| `hair` / メイクの色 | **参照に従う**ため省略。シーンで髪を**いじる必要がある**場合のみ「参照と同じヘアスタイルを維持」と繰り返す。 |
| `clothing` | **そのカット専用**として英語で詳述（`layered from skin outward:` 等）。 |
| `pose` / `body` | シーン用に記述。体型の骨格は参照と揃うよう `slim build consistent with reference` など短く足してよい。 |
| `photography` | アスペクト比、カメラ文体、被写界深度、グレイン、フラッシュの有無など。 |
| `background` | セット・壁色・小道具・雰囲気。 |
| `mirror_rules` / `constraints` | **ポジティブな一文**に変換（例: 鏡文字が反転しない、スマホは1台、指の本数正常）。 |
| `negative_prompt` | 列挙より**上位5個程度**を「あり方」で書く（スキルのベストプラクティスに従う）。 |

---

## 英語プロンプト例（コピー用）

**使い方**: 各例の先頭ブロックのあとに、**あなたのキャラの参照画像**を添付する。例中の「Japanese woman in her late teens」は**年齢の目安**のみ；**顔の細部は参照が優先**。

### 例1：寝室・ミラーセルフィー（ダイレクトフラッシュ）

```text
Using the attached reference image as the single source of truth for this person: preserve exactly the same facial identity, skin tone, hair color, haircut, bangs, and makeup style as the reference. Do not invent a different person.

New scene only: A fictional young Japanese woman in her late teens (original character, not based on any real person) takes a direct-flash smartphone mirror selfie in a simple bedroom at night. Mirror selfie composition: she is visible in the mirror reflection; the smartphone is visible in her hand in the reflection. Single smartphone only, anatomically correct hands with five fingers each, no duplicated phone edges, no warped hand anatomy. Any visible text on the phone or in the room stays normally readable, not mirrored.

Expression: closed-lip soft smile, relaxed confident energy, eyes toward the mirror and phone screen — same person as reference, natural variation only.

Wardrobe for this shot — layered from skin outward: strapless white cotton bandeau tube top, fitted plain; lower body loose plaid pajama pants in dark gray and muted off-white soft check, relaxed fit, low-rise visible in frame.

Pose: standing slightly angled to the mirror; one hand holds the phone up near the face, the other hand rests lightly across the opposite shoulder and upper chest; casual intimate mirror pose with a slight torso twist.

Accessories: no jewelry unless clearly visible in reference; light-colored smartphone with triple camera array on the back.

Photography: smartphone mirror selfie realism, strong on-camera flash overriding dim ambient bedroom light; sharp direct-flash detail with faint phone-camera grain, slight flash bloom, realistic mirror dust and subtle glare on the glass, unpolished authentic social-media look. Portrait mid-shot framed from head to hips, eye-level mirror reflection, aspect ratio 3:4 vertical. Deep focus typical of phone cameras.

Background: simple bedroom — cool gray wall, dark wooden wardrobe at left edge of frame, bed in lower part of scene, open laptop on bed, lived-in but tidy, quiet late-night atmosphere.

Photorealistic, 8k, coherent reflection physics.
```

### 例2：屋外・ゴールデンアワー・全身寄り

```text
Using the attached reference image as the single source of truth for this person: preserve exactly the same facial identity, skin tone, hair color, haircut, and makeup as the reference. Do not change identity.

New scene only: The same original fictional young Japanese woman in her late teens, outdoors on a tree-lined sidewalk during golden hour. Calm neutral expression with a gentle closed-mouth smile, looking slightly off-camera — natural variation, same person as reference.

Wardrobe for this shot — single layer only: knee-length soft sage green linen wrap dress, thin self-tie at waist, short sleeves, no jewelry, no piercings.

Pose: walking mid-step toward camera, relaxed arms, natural stride.

Photography: full-body or knee-up framing, 2:3 vertical, shot on 35mm film aesthetic with warm golden backlight, long soft shadows, subtle film grain, shallow depth of field with background trees gently blurred.

Background: quiet residential street, warm sunset, no crowds.

Photorealistic, 8k.
```

### 例3：カフェ・窓際・雨の反射

```text
Using the attached reference image as the single source of truth for this person: preserve exactly the same facial identity, skin tone, hair color, haircut, and makeup as the reference.

New scene only: The same original fictional young Japanese woman in her late teens sits by a tall cafe window on an overcast rainy day. She looks toward the camera with a calm soft gaze, lips gently closed — same person as reference.

Wardrobe for this shot — layered from skin outward: fitted ivory cotton turtleneck base; over it a sleeveless charcoal gray wool pinafore-style dress with simple lines, midi length. No jewelry.

Pose: seated three-quarter view, forearms resting lightly on the table, hands around a white ceramic mug.

Photography: natural window light from the side, soft and diffused; faint rain streaks and city bokeh visible through the glass; 4:5 vertical portrait, medium shot waist-up, subtle lens reflection on window acceptable, photorealistic editorial cafe mood, 8k.

Background: blurred cafe interior, warm wood tones, minimal clutter.

Photorealistic.
```

---

## 運用メモ

- **同一シーンでブレたら**: 同一性ロック文を強くし、`Match the reference exactly for face and hair.` を1行追加。参照画像の解像度・明るさを見直す。
- **服装だけ変えたい**: 英文では `Wardrobe for this shot` だけ差し替え、ロックブロックは**毎回同じ**にする。
- **編集モード**（フレームワーク3）で「参照の顔は維持、背景だけ変更」も併用可。その場合も**参照添付**と「keep face and hair from reference」を明示する。

---

## 参照

- `nanobanana_sample_studio_base_closeup/prompt_document.md`（**白無地ハイキー・超寄り**のベース顔／照明・画風テンプレ。多シーン化の前段で使いやすい）
- `.claude/skills/nano-banana-prompt/SKILL.md`（フレームワーク2・シーン多様生成）
- `.claude/skills/reamero-character-prompt/SKILL.md`（同一キャラの多シーン展開）
- `nanobanana_sample_character_ash_bob_muse` / `honey_straight_muse` / `plum_halfup_muse` の各 `prompt_document.md`

---