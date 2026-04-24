# Nano Banana：実験・口まわりだけ差分・正面固定

**目的**: 同じ被写体条件のまま、**唇の形・厚み・口角・輪郭・質感・人中**だけを変えたとき、モデルがどこまで分離して描けるかを確認する。

**前提**: `nano-banana-prompt` のフレームワーク1（テキストから画像・参照なし）に準拠。**1枚につき1出力**の英文で渡す。最終プロンプトは **英語**。

**固定方針**

- 目・眉・鼻・輪郭・肌・髪・服装・視線・カメラ・背景・照明は **全カットで同一**。
- **口のポーズは固定**: 唇を閉じた **ニュートラル**（笑顔・歯見せなし）。差分は **唇のデザイン（形・ボリューム・メイク質感）** のみ。
- **オッドアイ（heterochromia）は禁止**。両眼の虹彩色は同一。
- 口元タグは `detailed-face-parts.md` の「§4. 口元・唇・人中」に準拠し、**1枚あたりおおむね2〜4タグ**（辞書の「1〜2個の特徴」＋質感・口角などの組み合わせ）に抑える。
- `short philtrum` は **M13 のみ**に限定し、他タグを増やしすぎない（辞書の注意に準拠）。

---

## 固定英文ブロック（共通・口の「デザイン」以外）

唇の **形・厚み・グロス／マット・人中** は `MOUTH:` で指定する。**下記には含めない**（閉じた口のポーズのみ記述）。

```text
Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

**各カットの先頭**（`nanobanana_sample_nine_grid_character_sheet` と同様 **single image** を明示）:

```text
Create a single photorealistic portrait image.
```

**口まわりの差分**は、固定英文ブロックの **直前** に `MOUTH:` から始める1文を置く。

---

## 推奨アスペクト比

**正方形 1:1**（`square 1:1 composition`）。多アングルは `nanobanana_sample_nine_grid_character_sheet` の **3×3 グリッド1枚**を参照。

---

## バリエーション早見表（正面・M01〜M18）

| ID | ファイル名例 | 挿入する口ブロック（`MOUTH:` 〜 文末まで） |
| --- | --- | --- |
| M01 | `mouth01_cupid_round_glossy_straightcorners.png` | `MOUTH: cupid's bow lips, round full lower lip, sheer MLBB glossy lip tint, straight mouth corners.` |
| M02 | `mouth02_softupper_round_moist_straight.png` | `MOUTH: soft upper lip curve, round full lower lip, soft moist lips, straight mouth corners.` |
| M03 | `mouth03_ccurl_plumplower_glossy_upturn.png` | `MOUTH: c-curl lips, plump lower lip, glossy lips, upturned mouth corners.` |
| M04 | `mouth04_mshape_peanut_defined_matte.png` | `MOUTH: m-shaped lips, peanut-shaped lower lip, defined lip line, matte lips.` |
| M05 | `mouth05_cupid_plump_glossy_upturn.png` | `MOUTH: cupid's bow lips, plump lips, glossy lips, upturned mouth corners.` |
| M06 | `mouth06_thin_straightlower_matte_straight.png` | `MOUTH: thin elegant lips, straight lower lip line, matte lips, straight mouth corners.` |
| M07 | `mouth07_softupper_straightlower_smudged_moist.png` | `MOUTH: soft upper lip curve, straight lower lip line, smudged lip line, soft moist lips.` |
| M08 | `mouth08_cupid_full_defined_glossy.png` | `MOUTH: cupid's bow lips, full lips, defined lip line, glossy lips.` |
| M09 | `mouth09_soft_round_plumplower_naturalphil.png` | `MOUTH: soft upper lip curve, round full lower lip, plump lower lip, natural philtrum length.` |
| M10 | `mouth10_mshape_round_blurred_glossy.png` | `MOUTH: m-shaped lips, round full lower lip, blurred lip line, glossy lips.` |
| M11 | `mouth11_ccurl_thin_defined_matte.png` | `MOUTH: c-curl lips, thin elegant lips, defined lip line, matte lips.` |
| M12 | `mouth12_cupid_peanut_plump_defined.png` | `MOUTH: cupid's bow lips, peanut-shaped lower lip, plump lips, defined lip line.` |
| M13 | `mouth13_soft_round_shortphil_moist.png` | `MOUTH: soft upper lip curve, round full lower lip, short philtrum, soft moist lips.` |
| M14 | `mouth14_cupid_round_naturalphil_upturn.png` | `MOUTH: cupid's bow lips, round full lower lip, natural philtrum length, upturned mouth corners.` |
| M15 | `mouth15_full_straight_smudged_moist.png` | `MOUTH: full lips, straight mouth corners, smudged lip line, soft moist lips.` |
| M16 | `mouth16_thin_upturn_glossy.png` | `MOUTH: thin elegant lips, upturned mouth corners, glossy lips.` |
| M17 | `mouth17_mshape_peanutdip_glossy_defined.png` | `MOUTH: m-shaped lips, full lower lip with central dip, glossy lips, defined lip line.` |
| M18 | `mouth18_soft_plumplower_matte_straight.png` | `MOUTH: soft upper lip curve, plump lower lip, matte lips, straight mouth corners.` |

**各IDの特徴（狙い）**

- **M01**: 王道の **M字／キューピッド** × **丸い下唇** × **シアーMLBBグロス** × **水平口角**。可愛さ寄りの基準線。
- **M02**: **控えめな上唇の山** × **丸下唇** × **自然な潤い** × **水平口角**。ナチュラルすっぴん寄り。
- **M03**: **Cカール** × **下唇ぽってり** × **艶** × **口角やや上がり**。愛嬌・グラスリップ寄り。
- **M04**: **M字** × **ピーナッツ型下唇** × **くっきり唇線** × **マット**。色気・メイクはっきり寄り。
- **M05**: **キューピッド** × **ぽってり厚め** × **艶** × **口角上がり**。アヒル口寄りの可愛さ。
- **M06**: **薄め上品な唇** × **下唇スクエア寄り** × **マット** × **水平口角**。クール・知的寄り。
- **M07**: 控えめ上唇 × **直線的な下唇ライン** × **ぼかし輪郭** × **潤い**。オーバーリップ・ナチュラル。
- **M08**: **キューピッド** × **フルな厚み** × **くっきり輪郭** × **艶**。キービジュアル向けのはっきり唇。
- **M09**: ナチュラル上唇 × **丸下唇** × **下唇だけボリューム** × **自然な人中長さ**。バランス型。
- **M10**: **M字** × **丸下唇** × **ぼかし輪郭** × **艶**。トレンドのふわっとグラス。
- **M11**: **Cカール** × **薄め唇** × **くっきり線** × **マット**。大人・引き締まり。
- **M12**: **キューピッド** × **ピーナッツ下唇** × **ぽってり** × **定義線**。色気と甘さのミックス。
- **M13**: ナチュラル形状に **短い人中** のみ足す（※辞書注意どおり他タグは抑えめ）。若々しさ寄り。
- **M14**: **キューピッド** × **丸下唇** × **自然人中** × **口角上がり**。アイドル笑み無しでも好印象口角。
- **M15**: **フルリップ** × **水平口角** × **ぼかし線** × **潤い**。すっぴん厚め寄り。
- **M16**: **薄唇** × **口角上がり** × **艶**。クールだが厳しく見えにくい組み合わせ。
- **M17**: **M字** × **中央くぼみのある下唇（ピーナッツ）** × **艶** × **くっきり線**。色気強め。
- **M18**: 控えめ上唇 × **下唇ぽってり** × **マット** × **水平口角**。大人ナチュラル。

---

## 英語プロンプト（コピー用・全文）

Nano Banana にコードブロックごと貼り付けて使う。構造は「`Create a single photorealistic portrait image.` + `MOUTH: ...` + 固定英文ブロック」。

### M01

```text
Create a single photorealistic portrait image. MOUTH: cupid's bow lips, round full lower lip, sheer MLBB glossy lip tint, straight mouth corners. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### M02

```text
Create a single photorealistic portrait image. MOUTH: soft upper lip curve, round full lower lip, soft moist lips, straight mouth corners. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### M03

```text
Create a single photorealistic portrait image. MOUTH: c-curl lips, plump lower lip, glossy lips, upturned mouth corners. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### M04

```text
Create a single photorealistic portrait image. MOUTH: m-shaped lips, peanut-shaped lower lip, defined lip line, matte lips. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### M05

```text
Create a single photorealistic portrait image. MOUTH: cupid's bow lips, plump lips, glossy lips, upturned mouth corners. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### M06

```text
Create a single photorealistic portrait image. MOUTH: thin elegant lips, straight lower lip line, matte lips, straight mouth corners. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### M07

```text
Create a single photorealistic portrait image. MOUTH: soft upper lip curve, straight lower lip line, smudged lip line, soft moist lips. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### M08

```text
Create a single photorealistic portrait image. MOUTH: cupid's bow lips, full lips, defined lip line, glossy lips. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### M09

```text
Create a single photorealistic portrait image. MOUTH: soft upper lip curve, round full lower lip, plump lower lip, natural philtrum length. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### M10

```text
Create a single photorealistic portrait image. MOUTH: m-shaped lips, round full lower lip, blurred lip line, glossy lips. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### M11

```text
Create a single photorealistic portrait image. MOUTH: c-curl lips, thin elegant lips, defined lip line, matte lips. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### M12

```text
Create a single photorealistic portrait image. MOUTH: cupid's bow lips, peanut-shaped lower lip, plump lips, defined lip line. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### M13

```text
Create a single photorealistic portrait image. MOUTH: soft upper lip curve, round full lower lip, short philtrum, soft moist lips. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### M14

```text
Create a single photorealistic portrait image. MOUTH: cupid's bow lips, round full lower lip, natural philtrum length, upturned mouth corners. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### M15

```text
Create a single photorealistic portrait image. MOUTH: full lips, straight mouth corners, smudged lip line, soft moist lips. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### M16

```text
Create a single photorealistic portrait image. MOUTH: thin elegant lips, upturned mouth corners, glossy lips. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### M17

```text
Create a single photorealistic portrait image. MOUTH: m-shaped lips, full lower lip with central dip, glossy lips, defined lip line. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### M18

```text
Create a single photorealistic portrait image. MOUTH: soft upper lip curve, plump lower lip, matte lips, straight mouth corners. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Lips gently closed together in a relaxed neutral pose, no smile, no teeth showing. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

---

## 運用メモ

1. **M01** で目・鼻がブレないか確認する。
2. 続きは同一セッションで回すか、**M01 を参照**して「目・眉・鼻・髪・服は維持、口元だけ変更」と編集プロンプトで試す（`nano-banana-prompt` フレームワーク3）。**顔ブレが気になる多アングル**は `nanobanana_sample_nine_grid_character_sheet` の **3×3 グリッド1枚**を優先する。
3. **笑顔や開口**が混ざったら、固定英文ブロックの *Lips gently closed...* を強調して再生成。

---

## 参照

- `.claude/skills/nano-banana-prompt/SKILL.md`
- `.claude/skills/reamero-character-prompt/references/prompts/detailed-face-parts.md`（§4. 口元・唇・人中）
- `nanobanana_sample_nine_grid_character_sheet/prompt_document.md`（多アングル）

---

## 免責

創作用のプロンプト実験集です。実在個人の再現や権利侵害用途には使用しないでください。
