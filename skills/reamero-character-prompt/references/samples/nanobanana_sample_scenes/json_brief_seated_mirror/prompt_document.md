# Nano Banana：シーン JSON ブリーフ（着席・横顔・ミラーセルフィー）

**目的**: キャラクタークリエイトの**後段**（または並行）で、**構造化 JSON** としてシーンを定義し、それを**そのまま保存**できるサンプル。Nano Banana へは **参照画像あり**（推奨）または **テキストのみ**（参照前の試行）の**英語1本**に変換して渡す。

**関連**: `../with_reference/prompt_document.md`（ルートからは `nanobanana_sample_scenes/with_reference/prompt_document.md`）— 同一性ロック・JSON→英文の一般ルール。**ストック集**の同一シーン JSON: `../stock/scenes/seated_mirror_profile/scene_brief.json`（`scene_id` 等のメタ付き）。親の目次: `../prompt_document.md`。

---

## キャラクリエイト時の推しフロー

1. **顔 → 体 → 髪 → 服装**でキャラを確定（`reamero-character-prompt`）。
2. **標準画を生成**し、**参照用画像**を保存（muse 系なら**同一案**の **A** または **2×2** の顔コマ）。
3. 本ファイルの **JSON スキーマに沿った `scene_brief.json`** をコピーし、`subject` / `pose` / `clothing` などを**そのシーン用**に編集。
4. **`identity_mode`** を `reference_locked` にし、**参照画像を添付**したうえで「**変換後プロンプト（参照ロック版）**」の型で英文を送る。  
   - JSON の `hair` / `subject.face` の細目は**参照と矛盾させない**（省略または「match reference」のみ）。

---

## JSON フィールドと英文の対応（このサンプル用）

| ブロック | 参照ロック時 | テキストのみ時 |
| --- | --- | --- |
| `subject` / `hair` | 同一性ロック文に任せ、**髪色・メイクの再記述なし** | ブロックごと英語に展開 |
| `body` / `pose` | シーン用に**全文展開** | 同左 |
| `clothing` | `layered from skin outward:` で展開 | 同左 |
| `accessories` | 展開（参照にない装飾はシーン限定で明示） | 同左 |
| `photography` / `background` / `the_vibe` | 統合して段落化 | 同左 |
| `constraints` / `negative_prompt` | **ポジティブな「あり方」**に言い換え | 同左（列挙しすぎない） |

---

## サンプル JSON（`scene_brief.json` 相当）

以下を `scene_brief.json` として保存してよい。`identity_mode` と `reference_note` はこのリポジトリ用の拡張。

```json
{
  "scene_brief_version": "1.0",
  "identity_mode": "reference_locked",
  "reference_note": "Attach canonical headshot or 2x2 face panel before sending the English prompt. When reference_locked, omit conflicting hair/face/makeup text in the final prompt.",
  "subject": {
    "description": "Young woman taking a seated mirror selfie, head turned in profile.",
    "mirror_rules": "Holding phone in right hand, reflecting herself; gaze is directed away from the mirror (looking off to the left in the reflection). Single smartphone, correct hand anatomy.",
    "age": "early 20s",
    "expression": {
      "eyes": {
        "look": "Soft, distant",
        "energy": "Calm, detached",
        "direction": "Looking away to the left"
      },
      "mouth": {
        "position": "Closed, relaxed",
        "energy": "Neutral"
      },
      "overall": "Candid, unguarded, relaxed"
    },
    "face": {
      "preserve_original": true,
      "note_when_no_reference": "East Asian facial features, soft jawline; minimalist glass-skin makeup, dewy finish, soft peach lips"
    }
  },
  "hair": {
    "color": "Black",
    "style": "Messy low bun, long loose curtain bangs framing the face",
    "effect": "Casual, slightly frizzy, slept-in texture",
    "use_only_when_text_only": true
  },
  "body": {
    "frame": "Slim, soft curves",
    "waist": "Slightly bent, relaxed core",
    "chest": "Subtle cleavage, natural drop",
    "legs": "Folded and bent, prominent foreground",
    "skin": {
      "visible_areas": "Shoulders, collarbones, upper chest, full arms, entire thighs and lower legs",
      "tone": "Fair to light tan",
      "texture": "Smooth, dewy, supple moisturized look",
      "lighting_effect": "Soft physical daylight highlights catching the left shoulder cap, collarbone, and upper thigh"
    }
  },
  "pose": {
    "position": "Sitting on the floor, sideways to the mirror",
    "base": "Resting on buttocks and feet/heels",
    "overall": "Legs loosely tucked and bent, left arm resting casually across the lap, right arm raised holding the phone"
  },
  "clothing": {
    "top": {
      "type": "Sports bra / bralette",
      "color": "White",
      "details": "Scoop neck, thick straps",
      "effect": "Form-fitting, matte fabric"
    },
    "bottom": {
      "type": "High-cut briefs",
      "color": "White",
      "details": "Matching set, high leg line",
      "effect": "Stretches over hips seamlessly"
    },
    "extras": "White ribbed mid-calf socks"
  },
  "accessories": {
    "headwear": null,
    "jewelry": "Simple silver ring on right index finger",
    "device": "Rose gold smartphone with visible back logo",
    "prop": null
  },
  "photography": {
    "camera_style": "Smartphone camera mirror selfie",
    "angle": "Slightly high angle, looking down at the seated subject",
    "shot_type": "Mid-shot to full body",
    "aspect_ratio": "3:4 or 4:5",
    "texture": "Slight digital noise, unpolished phone camera realism",
    "lighting": "Soft natural ambient indoor lighting, diffuse shadows",
    "depth_of_field": "Deep enough for subject and mirror reflection; slight overall softness"
  },
  "background": {
    "setting": "Cozy bedroom interior",
    "wall_color": "Off-white / pale cream",
    "elements": [
      "Thick wooden mirror frame dominating the right foreground",
      "Bed with pink and white gingham checkered sheets",
      "White floor lamp",
      "Ocean landscape painting on wall",
      "Wall-mounted thermostats or light switches",
      "Light wood flooring"
    ],
    "atmosphere": "Quiet weekend morning, bright but soft",
    "lighting": "Natural window light bleeding into the room"
  },
  "the_vibe": {
    "energy": "Lazy, comfortable, intimate",
    "mood": "Tranquil",
    "aesthetic": "Soft girl, casual loungewear, authentic candid",
    "authenticity": "Imperfect framing and messy hair add realism",
    "intimacy": "Private morning moment before getting dressed",
    "story": "Weekend morning, quick snap before starting the day",
    "caption_energy": "Lazy Sunday mood"
  },
  "constraints": {
    "must_keep": [
      "Thick wooden mirror frame cutting off the right side",
      "Profile face angle looking away from lens",
      "Seated floor pose with bent legs",
      "White two-piece set and ribbed socks"
    ],
    "avoid_as_positive_style": [
      "Not direct eye contact with the camera lens",
      "Not polished studio lighting — natural window-led ambient only",
      "Slightly casual off-center framing, not perfectly symmetrical",
      "Light fresh makeup only, not heavy glam"
    ]
  }
}
```

国籍をりあめろ既定に合わせる場合は、`subject` に `"ethnicity": "Japanese"` を足し、英文で `original fictional Japanese woman` と書く。

---

## 変換後プロンプト（参照ロック版・コピー用）

**添付**: キャラの標準画（正面または顔がはっきりした参照）。**JSON の `hair` は無視**（参照に従う）。

```text
Using the attached reference image as the single source of truth for this person: preserve exactly the same facial identity, face shape, skin tone, hair color, hair length, haircut, bangs or no bangs, and makeup style as the reference. Do not invent a different person. Match hair texture loosely to the scene (casual slept-in) only if it still clearly matches the reference hairstyle.

New scene only: Original fictional young Japanese woman in her early 20s (not based on any real person). Seated smartphone mirror selfie: sitting on light wood flooring, body angled sideways relative to the mirror, head turned in profile. She holds a rose gold smartphone in her right hand visible in the mirror reflection; single phone, anatomically correct hands, five fingers per hand. Her gaze is directed away to the left — soft, distant, calm, detached — not looking at the camera lens and not making direct eye contact with the viewer. Closed relaxed neutral mouth. Candid, unguarded, relaxed mood.

Body: slim build with soft feminine curves, slightly bent relaxed core; legs folded and bent in foreground; skin fair to light tan with smooth dewy moisturized texture on visible shoulders, collarbones, upper chest, full arms, thighs and lower legs. Soft natural daylight catches the left shoulder cap, collarbone, and upper thigh.

Pose: seated on buttocks and heels, legs loosely tucked; left arm rests casually across the lap; right arm raised holding the phone for the mirror selfie.

Wardrobe for this shot — layered from skin outward: white matte scoop-neck sports bra with thick straps, form-fitting; matching white high-cut briefs, high leg line, seamless over hips; white ribbed cotton mid-calf socks. Simple silver ring on right index finger only.

Photography: smartphone mirror selfie, slightly high camera angle looking down at the seated subject; mid-shot to full-body framing; aspect ratio 3:4 vertical (or 4:5); slight digital noise, authentic unpolished phone realism; soft natural ambient indoor light with diffuse shadows and window light filling the room — not studio softboxes, not harsh spotlights; depth of field deep enough to read subject and mirror reflection with gentle overall softness.

Background: cozy bedroom, off-white pale cream walls; thick wooden mirror frame dominating the right foreground; bed with pink and white gingham sheets; white floor lamp; small ocean landscape painting; wall switches or thermostat; quiet weekend morning atmosphere, bright but soft.

Composition: thick mirror frame may crop the right edge; framing slightly imperfect and candid. Photorealistic, 8k, coherent mirror reflection.
```

---

## 変換後プロンプト（テキストのみ版・参照なし試行用）

参照画像が**まだない**段階でのラフ生成用。`hair` / `face` を含む。

```text
Photorealistic smartphone mirror selfie. Original fictional young Japanese woman in her early 20s (not based on any real person), soft East Asian features and soft jawline. Seated on light wood floor, sideways to mirror, head in profile, gaze looking away to the left — soft distant calm eyes, not at camera. Closed relaxed mouth, candid unguarded mood.

Hair: black hair in a messy low bun with long loose curtain bangs framing the face; casual slightly frizzy slept-in texture. Minimalist glass-skin makeup: dewy finish, soft peach lips, light fresh not heavy.

Body: slim with soft curves, relaxed bent core; legs folded and bent prominent in frame; fair to light tan dewy skin on shoulders, collarbones, upper chest, arms, thighs, calves; soft daylight highlights on left shoulder, collarbone, upper thigh.

Wardrobe — layered from skin outward: white matte scoop-neck sports bra, thick straps; matching white high-cut briefs; white ribbed mid-calf socks. Silver ring on right index finger. Rose gold smartphone in right hand, visible in reflection, single device, correct hands.

Slightly high angle, mid to full body, 3:4 or 4:5, slight phone noise. Bedroom: pale cream walls, thick wood mirror frame right foreground, gingham bed, floor lamp, ocean painting, natural window light, tranquil lazy Sunday morning. Not studio lighting, not centered fashion symmetry, not heavy makeup. Photorealistic, 8k.
```

---

## Claude / エージェント向け：生成指示の型

キャラ確定後にシーン用 JSON を出力させるときの例（システム指示に近い短文）:

- 「`nanobanana_sample_scenes/json_brief_seated_mirror/prompt_document.md` の JSON スキーマに従い、`identity_mode`・`subject`・`pose`・`clothing`・`photography`・`background`・`constraints` を埋めた**有効な JSON だけ**を出力する。`negative_prompt` は任意；使う場合は5件以内。」
- 「参照画像を使う前提なら `identity_mode` を `reference_locked` にし、`hair` に `use_only_when_text_only: true` を付ける。」

---

## 参照

- `../with_reference/prompt_document.md`（ルートからは `nanobanana_sample_scenes/with_reference/prompt_document.md`）
- `.claude/skills/nano-banana-prompt/SKILL.md`
- `.claude/skills/reamero-character-prompt/SKILL.md`
- `references/prompts/clothing.md`

---

## 免責

創作用のプロンプト実験集です。実在個人の再現や権利侵害用途には使用しないでください。
