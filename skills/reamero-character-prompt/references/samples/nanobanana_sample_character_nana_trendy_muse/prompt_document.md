# 菜々 / Nana Trendy Muse (Trendy × Slender)

**コンセプト**: ユーザーのご要望である「さらに大きな流行りの目」「忘れ鼻（存在感のない小さな鼻）」「黒髪」「口角を上げないアンニュイな表情」をすべて反映した、令和トレンドのドール系・アンニュイ美少女。

---

## 1. キャラ設定（意図と構成）

| 軸 | 内容 |
| --- | --- |
| 国籍・年齢 | youthful young Japanese woman in her late teens（AIの老け見え対策で年齢を下げ、womanを使用） |
| **顔の造形（要望反映）** | **忘れ鼻**: very small inconspicuous nose（存在感のない小さな鼻）<br>**輪郭**: short midface, soft delicate cheeks, slightly shorter chin（中顔面短め、華奢な頬、短めの顎） |
| **目（流行りの大きな目）** | **extra large trendy round eyes**（流行りのさらに大きな丸目）, wide parallel double eyelids（幅広平行二重）, prominent aegyo sal (涙袋), **large prominent irises, less white sclera visible**（黒目がち）, identical iris color in both eyes |
| **表情（要望反映）** | **neutral unsmiling expression, relaxed straight lips, mouth corners not raised**（口角を上げない、リラックスした無表情・アンニュイな表情） |
| メイク（令和トレンド） | **translucent glass skin finish**（透明感のあるガラススキン）, **feathered natural eyebrows with visible hair texture**（毛流れの見える眉）, **trendy bundled curled lashes**（束感まつ毛）, **plump glossy MLBB sheer pink lips with a glass-like finish**（ちゅるんとしたシアーピンクリップ）, flawless professional idol makeup |
| 髪型・髪色（要望反映） | Trendy medium hush cut (layered cut) with see-through bangs, **glossy jet black hair with a subtle natural sheen**（ツヤのある黒髪）, magazine-ready polished hair |
| 体型・骨格 | long slender neck, defined collarbones, very slender build, delicate frame（華奢な首と体型） |
| 服装（令和トレンド） | Layered from skin outward: fitted black ribbed cotton camisole; trendy sheer gray organza oversized shirt worn off one shoulder; black high-waisted wide-leg slacks. Modern Tokyo trendy chic aesthetic. |

---

## 2. キャラクターシート生成用プロンプト（必須ワークフロー）

**【運用ルール】**
顔のブレを防ぐため、**必ず最初に「Step 1」で2x2グリッド画像を生成し、それを参照画像としてロックした上で「Step 2」以降の画像を生成**してください。

### Step 1: 3パネル（正面・45度・90度横顔・テキストのみで生成）
正面・45度・90度横顔の顔アップを1枚に横並び（トリプティク）でまとめ、顔の立体感を固定する「シングル・ソース・オブ・トゥルース」を作成します。

```text
Photorealistic triptych of three equal vertical panels side-by-side separated by thin white lines, 16:9 aspect ratio. 

Subject in all panels: exactly the same original fictional youthful young Japanese woman in her late teens. Small face, short midface, soft delicate cheeks, slightly shorter chin. Very small inconspicuous nose. Fair translucent skin, clear without moles or freckles. Extra large trendy round eyes, wide parallel double eyelids, prominent aegyo sal, large prominent irises, less white sclera visible. Translucent glass skin finish, feathered natural eyebrows, trendy bundled curled lashes, plump glossy MLBB sheer pink lips. Trendy medium hush cut with see-through bangs, glossy jet black hair with a subtle natural sheen. 

Wardrobe in all panels: layered from skin outward: fitted black ribbed cotton camisole; trendy sheer gray organza oversized shirt worn off one shoulder. Modern Tokyo trendy chic aesthetic. No jewelry. 

Panel 1 (Left): Close-up portrait, front face, looking directly at the camera, neutral unsmiling expression, relaxed straight lips, mouth corners not raised.
Panel 2 (Center): Close-up portrait, 45-degree angle face, looking slightly off-camera, neutral unsmiling expression.
Panel 3 (Right): Close-up portrait, 90-degree profile face, looking straight ahead, calm expression.

Setting & Lighting: bright modern studio with a clean white background. Soft diffused studio lighting.
```

### Step 2-A: 1:1 正面ポートレート（参照画像ロック）
Step 1 で生成したグリッド画像を参照画像としてアップロードし、高解像度な正面アップを生成します。

```text
Using the attached reference image as the single source of truth: preserve exactly the same facial identity, skin tone, hair color, hair length, haircut, bangs, and overall makeup style as the reference. Do not invent a different person or imitate a real celebrity.

New scene only: original fictional youthful young Japanese woman in her late teens. Upper body shot, standing straight, facing the camera directly, looking directly at the viewer. Neutral unsmiling expression, relaxed straight lips, mouth corners not raised, calm gaze. 

Wardrobe: layered from skin outward: fitted black ribbed cotton camisole; trendy sheer gray organza oversized shirt worn off one shoulder. Modern Tokyo trendy chic aesthetic. No jewelry, no piercings, bare neck. 

Setting & Lighting: bright modern studio with a clean white background. Soft diffused studio lighting highlighting the glass skin texture and glossy hair. Photorealistic portrait, ultra-detailed, 8k, 1:1 aspect ratio.
```

### Step 2-B: 9:16 全身ショット（参照画像ロック・骨格プロポーションの確認）
華奢なラインと、トレンドのモノトーンコーデ（シアーシャツ＋ワイドスラックス）を確認します。

```text
Using the attached reference image as the single source of truth: preserve exactly the same facial identity, skin tone, hair color, hair length, haircut, bangs, and overall makeup style as the reference. Do not invent a different person or imitate a real celebrity.

New scene only: original fictional youthful young Japanese woman in her late teens. Full-body shot from head to toe. Standing in a relaxed stylish pose. Neutral unsmiling expression, relaxed straight lips, mouth corners not raised, looking at the viewer. 

Body type: long slender neck, defined collarbones, stylish frame, very slender build, delicate frame. 

Wardrobe: layered from skin outward: fitted black ribbed cotton camisole; trendy sheer gray organza oversized shirt worn off one shoulder; black high-waisted wide-leg slacks; black chunky leather loafers. Modern Tokyo trendy chic aesthetic. No jewelry, bare neck. 

Setting & Lighting: bright modern studio with a clean white background. Soft diffused studio lighting. Photorealistic full-body shot, ultra-detailed, 8k, 9:16 vertical aspect ratio.
```

---

## 3. キャラ確定後 × シーンストック（参照画像ロック）

**【運用メモ】**
- **参照画像**: Step 1 の 2x2 グリッド画像、または Step 2-A の正面アップ画像を 1 枚だけアップロードしてロックする。
- **アスペクト比**: Nano Banana の UI 側で `9:16` などを指定する。

### S1. 暗室ミラー・膝抱え・スマホフラッシュ（シーンストックより）

```text
Using the attached reference image as the single source of truth: preserve exactly the same facial identity, skin tone, hair color, hair length, haircut, bangs, and overall makeup style as the reference. Do not invent a different person or imitate a real celebrity.

New scene only: original fictional youthful young Japanese woman in her late teens (not based on any real person). Mirror selfie in a dark bedroom or studio corner: minimal uncluttered background, crushed ambient light. She sits with knees pulled up toward her chest, smartphone in her right hand at mirror height, gaze slightly sideways — calm, soft, introspective, elegant modern mood. Close-up to mid-body vertical framing. Neutral unsmiling expression, relaxed lips.

Hair, face structure, and makeup must follow the reference only.

Do not add glasses, earrings, or rings unless they clearly appear in the reference image.

Wardrobe for this shot only — layered from skin outward: fitted black ribbed camisole; oversized layered loose gray knit sweater worn off one shoulder; faded blue wide-leg vintage denim jeans. Modern Tokyo trendy chic aesthetic.
```
### S2. カフェの窓際・雨の日（シーンストックより）

```text
Using the attached reference image as the single source of truth: preserve exactly the same facial identity, skin tone, hair color, hair length, haircut, bangs, and overall makeup style as the reference. Do not invent a different person or imitate a real celebrity.

New scene only: original fictional youthful young Japanese woman in her late teens (not based on any real person). Sitting at a small wooden table by a large window in a cozy, dimly lit vintage cafe. Outside the window, it is raining heavily, with raindrops streaking down the glass. The street outside is blurred and moody. She is looking out the window with a thoughtful, slightly melancholic expression, her chin resting lightly on her hand. Upper body framing. Cinematic lighting: soft cool daylight filtering through the rainy window, contrasting with warm dim ambient cafe lights inside. Neutral unsmiling expression, relaxed lips.

Hair, face structure, and makeup must follow the reference only.

Do not add glasses, earrings, or rings unless they clearly appear in the reference image.

Wardrobe for this shot only — layered from skin outward: fitted black ribbed asymmetrical cotton camisole; trendy cropped fluffy charcoal mohair cardigan worn slightly off one shoulder. Modern Tokyo trendy chic aesthetic.
```

### S3. スタジオ白ハイキー・超寄りビューティ（ベース環境）

```text
Using the attached reference image as the single source of truth: preserve exactly the same facial identity, skin tone, hair color, hair length, haircut, bangs, and overall makeup style as the reference. Do not invent a different person or imitate a real celebrity.

New scene only: Create a single photorealistic portrait image. Ultra close-up beauty portrait, head-and-shoulders framing, face filling most of the frame, pure white seamless studio background, high-key studio lighting, soft diffused frontal light, luminous airy atmosphere, clean commercial beauty photography. Subject: original fictional youthful young Japanese woman in her late teens. Neutral unsmiling expression, relaxed straight lips, mouth corners not raised, calm gaze.

Hair, face structure, and makeup must follow the reference only.

Wardrobe for this shot only — single layer only: fitted black ribbed cotton camisole, thin straps only slightly visible at the lower frame edge. Minimal composition, dreamy clean white negative space, soft glow, beauty campaign aesthetic, ethereal, fresh, high detail, sharp eyes, soft skin, premium studio portrait, photorealistic, 8k resolution, ultra-detailed macro photography, magazine-quality skin.
```

### S4. 室内セルフィー・やや煽り（下から）・ウインク・頬に手（参考構図）

**意図**: スマホをやや下に置いた**煽り寄りの超近距離セルフィー**（顔が画面の大部分を占める）。頭を少し傾け、片手を頬に添え、片目ウインク。**服装・メイクは菜々の基本（黒キャミ＋シアーグレー、参照のメイク）のまま**。**表情だけ**ちょっと頬を膨らませたムーポア、**むーっと前に出したソフトな唇**。背景に**テレビは出さない**。

**りあめろ注意**: ホクロ・そばかすなし。オッドアイ禁止。頬の膨らみは**表情のみ**（造形を太らせない）。

```text
Using the attached reference image as the single source of truth: preserve exactly the same facial identity, skin tone, hair color, hair length, haircut, bangs, and overall makeup style as the reference. Do not invent a different person or imitate a real celebrity.

New scene only: original fictional youthful young Japanese woman in her late teens (not based on any real person). Indoor casual close-up selfie aesthetic: mild low-angle selfie framing — smartphone held slightly below chin height, lens tilted subtly upward toward the face (classic Japanese idol-style "aori" selfie, not extreme). Extreme close-up framing, face filling a large portion of the frame. She tilts her head gently to one side toward the camera and looks slightly down toward the lens with a soft gaze. Her right hand is raised to her cheek with softly curved fingers in a cute face-framing or half-heart gesture, shot from a close smartphone perspective. Playful expression: winking with her left eye while her right eye stays open and bright. Cheeks very slightly puffed in a cute playful sulky pose — subtle temporary puff from expression only, not a fuller face shape. Lips softly pushed forward in a gentle "muu" pout — mild forward projection, relaxed closed mouth, petty-cute mood, not angry or exaggerated. Mouth corners not lifted into a full smile. Clear skin without moles or freckles.

Hair, face bone structure, eye size, nose shape, and baseline makeup must follow the reference only — keep glossy jet black hair and see-through bangs as in the reference.

Do not add glasses, earrings, or rings unless they clearly appear in the reference image.

Wardrobe: layered from skin outward: fitted black ribbed cotton camisole; trendy sheer gray organza oversized shirt worn off one shoulder. Modern Tokyo trendy chic aesthetic. No jewelry, no piercings, bare neck.

Background: softly blurred cozy home interior (bedroom or living room feel), shallow depth of field; neutral furniture barely visible in the bokeh. Lighting: bright soft frontal daylight-like light on the face, clean idol-beauty clarity, natural catchlights in the open eye.

Photorealistic, coherent close-range smartphone selfie perspective, anatomically correct hands and fingers, 9:16 vertical aspect ratio, ultra-detailed, 8k quality.
```

**テキストのみ版**（参照なし・同一キャラを文章で再指定する場合。別人化しやすいので推奨は参照ロック版）:

```text
Photorealistic indoor close-up selfie, 9:16 vertical, mild low-angle selfie — smartphone slightly below chin, lens tilted subtly upward toward the face (idol-style aori, not extreme), extreme close-up framing, face filling a large portion of the frame. Original fictional youthful young Japanese woman in her late teens (not based on any real person). Small face, short midface, soft delicate cheeks, very small inconspicuous nose. Extra large trendy round eyes, wide parallel double eyelids, prominent aegyo sal, large prominent irises, less white sclera visible, identical iris color in both eyes. Glossy jet black layered hush cut with see-through bangs. Playful wink with left eye, right eye open; slight downward gaze toward the lens; right hand to cheek with curved fingers framing the face, shot from a close smartphone perspective. Cheeks very slightly puffed from a cute playful expression only (subtle, not a rounder face). Lips softly pushed forward in a gentle "muu" pout with mild forward projection, relaxed closed mouth, petty-cute sulky mood. Clear skin without moles or freckles; translucent glass skin finish; feathered natural eyebrows; trendy bundled curled lashes; plump glossy MLBB sheer pink lips with the same forward pout shape. Layered from skin outward: fitted black ribbed cotton camisole; trendy sheer gray organza oversized shirt worn off one shoulder. No jewelry, bare neck. Blurred home interior background, soft bright frontal light, no television. 8k, photorealistic.
```

### S5. 室内・手を顎〜側面に添える・前のめり（参考ポーズ）

**意図**: カメラに**やや前のめり**、**右手の指先を顎〜耳前の横ラインにそっと添える**自然なポーズ。視線はレンズ目線で柔らかく、**両目オープン**（ウインクなし）。服装・メイクは菜々の基本のまま。**テレビは背景に出さない**。

**りあめろ注意**: ホクロ・そばかすなし。オッドアイ禁止。

```text
Using the attached reference image as the single source of truth: preserve exactly the same facial identity, skin tone, hair color, hair length, haircut, bangs, and overall makeup style as the reference. Do not invent a different person or imitate a real celebrity.

New scene only: original fictional youthful young Japanese woman in her late teens (not based on any real person). Indoor casual photorealistic portrait, 9:16 vertical. Close-up to upper-chest framing: head, shoulders, and upper chest visible. She leans slightly forward toward the camera in a natural intimate selfie mood. Her right hand is raised with relaxed fingers; fingertips lightly touch the side of her face along the jawline and near the ear — a soft, natural pose, not gripping the face. Left arm relaxed and mostly out of frame or lowered. Both eyes open, looking directly at the camera with a soft calm gaze; relaxed closed lips or very subtle neutral mouth, no exaggerated smile. Clear skin without moles or freckles.

Hair, face bone structure, eye size, nose shape, and baseline makeup must follow the reference only — keep glossy jet black hair and see-through bangs as in the reference.

Do not add glasses, earrings, or rings unless they clearly appear in the reference image.

Wardrobe: layered from skin outward: fitted black ribbed cotton camisole; trendy sheer gray organza oversized shirt worn off one shoulder. Modern Tokyo trendy chic aesthetic. No jewelry, no piercings, bare neck.

Background: very soft warm bokeh, blurred cozy indoor interior, shallow depth of field; no television, no monitors, no visible electronics. Lighting: soft warm diffused indoor light, gentle glow on skin, natural catchlights in both eyes.

Photorealistic, mild low-angle or eye-level smartphone selfie perspective (subtle idol-style aori with phone slightly below chin, or slight high angle like a handheld front camera), anatomically correct hand and fingers, ultra-detailed, 8k quality.
```

**参考画像の白タンクトップに寄せる場合**（オプション）:

```text
Wardrobe for this shot only — single layer only: simple fitted white ribbed cotton camisole, thin straps, bare shoulders if natural for the pose. No jewelry, bare neck.
```

**テキストのみ版**（参照なし）:

```text
Photorealistic indoor portrait, 9:16 vertical, close-up to upper chest. Original fictional youthful young Japanese woman in her late teens (not based on any real person). Small face, short midface, soft delicate cheeks, very small inconspicuous nose. Extra large trendy round eyes, wide parallel double eyelids, prominent aegyo sal, large prominent irises, less white sclera visible, identical iris color in both eyes. Glossy jet black hair with see-through bangs. Slight forward lean toward camera. Right hand raised: fingertips lightly touching jawline and side of face near the ear, relaxed natural pose. Both eyes open, soft direct gaze at camera; relaxed neutral lips. Clear skin without moles or freckles; translucent glass skin finish; feathered natural eyebrows; trendy bundled curled lashes; plump glossy MLBB sheer pink lips. Layered from skin outward: fitted black ribbed cotton camisole; trendy sheer gray organza oversized shirt worn off one shoulder. No jewelry. Very blurred warm indoor background, no TV or screens, soft diffused warm light. 8k, photorealistic.
```

### S6. 舞台裏（バックステージ）・パパッと撮った低角度セルフィ

**意図**: 公演や撮影の合間に、**控室・舞台裏の雑多な環境**の前で、スマホを**やや下に構えた煽り（ローアングル）**で**パッと自撮りした**ようなカット。片手の人差し指を**あご先に軽く添え**、素手の自然な手の形。**指輪・ピアス・チェーン等の装飾は付けない**。表情は**ちょっと頬を膨らませたムーポア**でもよい（表情のみ）。**テレビ・モニターは背景に出さない**。

**りあめろ注意**: 架空の日本人キャラ。ホクロ・そばかすなし。オッドアイ禁止。**指輪・イヤリング・ネックレス・腕輪などアクセサリーは付けない**（参照画像にない限り）。

```text
Using the attached reference image as the single source of truth: preserve exactly the same facial identity, skin tone, hair color, hair length, haircut, bangs, and overall makeup style as the reference. Do not invent a different person or imitate a real celebrity.

New scene only: original fictional youthful young Japanese woman in her late teens (not based on any real person). Authentic backstage / dressing-room smartphone selfie, candid "quick snap" mood after rehearsal or between takes. Strong mild low-angle selfie (aori): smartphone held slightly below chin height, lens tilted upward toward the face — intimate idol backstage vibe, not a studio portrait. Tight vertical close-up: head, neck, and one bare shoulder visible; shallow depth of field; slight natural phone-camera softness and realistic social-media selfie polish.

Pose: she leans slightly toward the camera. One hand raised near the face: index fingertip lightly touching the chin, relaxed natural hand pose, bare fingers. The other hand holds the phone out of frame (implied selfie). Both eyes open, looking into the lens. Expression: cheeks very slightly puffed from a playful cute pose only (temporary, not a rounder face); lips softly pushed forward in a gentle "muu" pout — mild forward projection, relaxed closed mouth, petty-cute, not angry. Clear skin without moles or freckles. Baseline makeup follows the reference; optional subtle reddish-pink glossy lip tint for stage-ready polish.

Hair, face bone structure, eye size, nose shape must follow the reference — glossy jet black hair with see-through bangs.

Do not add glasses, earrings, rings, bracelets, necklaces, chains, or any jewelry unless they clearly appear in the reference image. Bare neck, bare earlobes, bare fingers.

Wardrobe for this shot only — choose one style:
- **A (菜々のいつもの服)**: layered from skin outward: fitted black ribbed cotton camisole; sheer gray organza shirt slipped off one shoulder for a rushed change-room look.
- **B (舞台衣装っぽさ)**: single layer or base: pale lavender or icy-blue slip dress or cami dress with subtle purple floral embroidery and sheer lace panels on the shoulder, one strap slipping off — still modest coverage, photorealistic stage costume.

Background: realistic cluttered backstage area. On one side, plain white or cream fabric curtain (dressing booth), no patterns or doodles on the fabric. Opposite side: metal racks, stacked road cases or cardboard boxes, cables, hangers, and miscellaneous stage clutter softly blurred; a hint of blue door or curtain deep in the bokeh. No television, no monitors, no glowing screens. Lighting: soft mixed indoor dressing-room light, slightly uneven and authentic, gentle catchlights in the eyes.

Photorealistic, anatomically correct hands and fingers, 9:16 vertical aspect ratio, ultra-detailed, 8k quality.
```

**テキストのみ版**（参照なし）:

```text
Photorealistic backstage smartphone selfie, 9:16 vertical, mild low-angle aori, tight close-up, head neck one bare shoulder. Original fictional youthful young Japanese woman in her late teens. Glossy jet black hair, see-through bangs. Extra large trendy round eyes, identical iris color both eyes, prominent aegyo sal. Index finger lightly touching chin, relaxed bare hand, no rings or jewelry. Cheeks slightly puffed and gentle "muu" pout, expression only. Clear skin without moles or freckles; natural polished makeup, glossy reddish-pink lips. No earrings, no necklaces, bare neck. Pale lavender slip dress with purple floral embroidery and sheer lace, one strap off shoulder — OR black ribbed camisole with sheer gray shirt off shoulder. Background: plain white curtain, no doodles; opposite side cluttered racks boxes cables, blue accent in distance; no TV. Soft uneven dressing-room light. Candid BTS snap mood, 8k.
```

### S7. 表情差分3グリッド（微笑み・口開け笑い・舌出し）

**意図**: 菜々の正面顔をベースに、3つの異なる表情（左：口角が上がった微笑み、中央：口を開けて笑う、右：舌を出す）を1枚の横長グリッド（16:9）で生成する。
**りあめろ注意**: Nano Banana Pro（Gemini 3系）で高画質に生成するための専用プロンプト。顔の造形（忘れ鼻、大きな目など）が崩れないよう、ベースの正面ポートレート画像を参照ロックして使用すること。

```text
Using the attached reference image as the single source of truth: preserve exactly the same facial identity, skin tone, hair color, hair length, haircut, bangs, and overall makeup style as the reference. Do not invent a different person or imitate a real celebrity.

New scene only: Photorealistic triptych of three equal vertical panels side-by-side separated by thin white lines, 16:9 aspect ratio.

Subject in all panels: exactly the same original fictional youthful young Japanese woman in her late teens. Small face, short midface, soft delicate cheeks. Very small inconspicuous nose. Translucent glass skin finish. Trendy medium hush cut with see-through bangs, glossy jet black hair. Wardrobe: black ribbed cotton camisole and sheer gray organza shirt.

Panel 1 (Left): Front face portrait. Expression: bright and clear closed-mouth smile, cheeks visibly lifted, mouth corners distinctly raised in a joyful curve. Eyes crinkled in a genuine happy eye smile, prominent aegyo sal pushed up by the smiling cheeks.
Panel 2 (Center): Front face portrait. Expression: bright joyful laugh with mouth open, heart-shaped smile, showing upper teeth. Eyes crinkled in a genuine joyful laugh, happy smiling eyes (eye smile), prominent aegyo sal pushed up by the smiling cheeks.
Panel 3 (Right): Front face portrait. Expression: playful, sticking tongue out slightly, cute cheeky mood. Playful smiling eyes, slightly narrowed with a mischievous happy glint.

Setting & Lighting: bright modern studio with a clean white background. Soft diffused studio lighting. Photorealistic portrait, ultra-detailed, 8k, sharp focus, high resolution.
```
