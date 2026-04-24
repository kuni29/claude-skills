# Nano Banana：実験・鼻だけ差分・正面固定

**目的**: 同じ被写体条件のまま、**鼻（全体印象＋辞書で許されるサブ要素1つ）だけ**を変えたとき、モデルがどこまで分離して描けるかを確認する。

**前提**: `nano-banana-prompt` のフレームワーク1（テキストから画像・参照なし）に準拠。**1枚につき1出力**の英文で渡す。最終プロンプトは **英語**。

**固定方針**

- 目・眉・口・輪郭・肌・髪・服装・表情・カメラ・背景・照明は **全カットで同一**。
- **オッドアイ（heterochromia）は禁止**。両眼の虹彩色は同一。
- 鼻のタグ設計は `detailed-face-parts.md` の「§3. 鼻」に準拠：**全体印象は原則1つ**、サブ要素は **高々1つ**（本ドキュメントの各 `NOSE:` もその範囲）。
- 補助として `face.md` の鼻語彙を少数試すカット（N17〜N18）を末尾に置く。

---

## 固定英文ブロック（共通・鼻以外）

以下を **そのまま** 各プロンプトに含める（**`NOSE:` の1文だけ差し替え**）。

```text
Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

**各カットの先頭**（`nanobanana_sample_nine_grid_character_sheet` と同様 **single image** を明示）:

```text
Create a single photorealistic portrait image.
```

**鼻だけの差分**は、固定英文ブロックの **直前** に `NOSE:` から始める1文を置く。

---

## 推奨アスペクト比

**正方形 1:1**（`square 1:1 composition`）。多アングルは `nanobanana_sample_nine_grid_character_sheet` の **3×3 グリッド1枚**を参照。

---

## バリエーション早見表（正面・各 ID）

### detailed-face-parts 準拠（N01〜N16）

| ID | ファイル名例 | 挿入する鼻ブロック（`NOSE:` 〜 文末まで） |
| --- | --- | --- |
| N01 | `nose01_inconspicuous_nostrils.png` | `NOSE: inconspicuous nose, nostrils barely visible from front.` |
| N02 | `nose02_sharp_upturned_nostrils.png` | `NOSE: sharp upturned nose with defined tip, nostrils barely visible from front.` |
| N03 | `nose03_elegant_straight_bridge.png` | `NOSE: elegant straight long nose, straight nose bridge.` |
| N04 | `nose04_high_bridge_glabella.png` | `NOSE: prominent high nose bridge, high glabella.` |
| N05 | `nose05_inconspicuous_narrow_alar.png` | `NOSE: inconspicuous nose, narrow refined alar base.` |
| N06 | `nose06_sharp_upturned_columella.png` | `NOSE: sharp upturned nose with defined tip, hanging columella.` |
| N07 | `nose07_elegant_smooth_profile.png` | `NOSE: elegant straight long nose, smooth curved nose profile.` |
| N08 | `nose08_high_bridge_from_inner_corners.png` | `NOSE: prominent high nose bridge, nose bridge starting from inner eye corners.` |
| N09 | `nose09_elegant_soft_tip.png` | `NOSE: elegant straight long nose, soft rounded nose tip.` |
| N10 | `nose10_high_bridge_thin_alar.png` | `NOSE: prominent high nose bridge, thin delicate alar.` |
| N11 | `nose11_inconspicuous_thin_alar.png` | `NOSE: inconspicuous nose, thin delicate alar.` |
| N12 | `nose12_sharp_upturned_narrow_alar.png` | `NOSE: sharp upturned nose with defined tip, narrow refined alar base.` |
| N13 | `nose13_inconspicuous_moderate_upturn_tip.png` | `NOSE: inconspicuous nose, moderately upturned nose tip.` |
| N14 | `nose14_elegant_moderate_upturn_tip.png` | `NOSE: elegant straight long nose, moderately upturned nose tip.` |
| N15 | `nose15_sharp_upturned_smooth_profile.png` | `NOSE: sharp upturned nose with defined tip, smooth curved nose profile.` |
| N16 | `nose16_inconspicuous_smooth_profile.png` | `NOSE: inconspicuous nose, smooth curved nose profile.` |

**各IDの特徴（狙い）**

- **N01**: 鼻の存在感を抑え、**正面から鼻孔がほぼ見えない**クリーンさ。現代的ナチュラルの基準線。
- **N02**: **ツンとしたアップノーズ**で立体感。**鼻孔は控えめ**にして実写で崩れにくくする。
- **N03**: **長めの直鼻**で上品寄り。**まっすぐな鼻筋**を明示。
- **N04**: **眉間から高い鼻筋**で彫り深め。**眉間（glabella）**をセットで指定。
- **N05**: 全体は馴染み型の **inconspicuous** に、**小鼻の幅をすっきり**させるサブ。
- **N06**: アップノーズ系に **鼻中隔が下に出る（hanging columella）** を足し、鼻柱の立ちを強調。
- **N07**: 直鼻ラインを保ちつつ **横顔用の滑らかなカーブ**（正面でも鼻筋のなめらかさに効く）。
- **N08**: 高鼻筋を **目頭位置から立ち上がるナチュラルなライン**で説明。
- **N09**: 長め直鼻に **丸みのある柔らかい鼻先**を足し、硬さを抑える。
- **N10**: 高鼻筋 × **薄く小さめの小鼻**の組み合わせ。
- **N11**: 存在感低めの鼻に **薄い小鼻**だけ足した控えめパターン。
- **N12**: ツン鼻寄り × **小鼻ベースを狭く**、はっきりした鼻下幅のイメージ。
- **N13**: 全体は馴染み、**鼻先だけ適度に上向き**（鼻唇角が広め寄り）。
- **N14**: 上品な直鼻に **適度なアップノーズの鼻先**を足したバランス型。
- **N15**: ツンとした鼻先と **なめらかな側面ライン**を同時指定（矛盾しにくい組み合わせ）。
- **N16**: 馴染み鼻に **側面カーブの滑らかさ**だけ足した微差用。

### face.md 由来の補助タグ（N17〜N18・実験用）

`detailed-face-parts.md` の表外だが、汎用辞書 `face.md` にある語。出力が荒れやすい場合は N01〜N16 に戻す。

| ID | ファイル名例 | 挿入する鼻ブロック |
| --- | --- | --- |
| N17 | `nose17_roman_nostrils.png` | `NOSE: roman nose, nostrils barely visible from front.` |
| N18 | `nose18_small_button_soft_tip.png` | `NOSE: small nose, button nose, soft rounded nose tip.` |

**各IDの特徴（狙い）**

- **N17**: **鷲鼻寄りのライン**を試すカット。実写では強めに出やすいので **鼻孔は見えにくく**抑える。
- **N18**: **小さめの団子鼻**寄り＋**丸い鼻先**（※サブが2つに相当するため、厳密な「1+1」より実験的）。

---

## 英語プロンプト（コピー用・全文）

Nano Banana にコードブロックごと貼り付けて使う。構造は「`Create a single photorealistic portrait image.` + `NOSE: ...` + 固定英文ブロック（目・眉・口・肌・髪・服・構図・照明）」。

### N01

```text
Create a single photorealistic portrait image. NOSE: inconspicuous nose, nostrils barely visible from front. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### N02

```text
Create a single photorealistic portrait image. NOSE: sharp upturned nose with defined tip, nostrils barely visible from front. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### N03

```text
Create a single photorealistic portrait image. NOSE: elegant straight long nose, straight nose bridge. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### N04

```text
Create a single photorealistic portrait image. NOSE: prominent high nose bridge, high glabella. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### N05

```text
Create a single photorealistic portrait image. NOSE: inconspicuous nose, narrow refined alar base. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### N06

```text
Create a single photorealistic portrait image. NOSE: sharp upturned nose with defined tip, hanging columella. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### N07

```text
Create a single photorealistic portrait image. NOSE: elegant straight long nose, smooth curved nose profile. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### N08

```text
Create a single photorealistic portrait image. NOSE: prominent high nose bridge, nose bridge starting from inner eye corners. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### N09

```text
Create a single photorealistic portrait image. NOSE: elegant straight long nose, soft rounded nose tip. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### N10

```text
Create a single photorealistic portrait image. NOSE: prominent high nose bridge, thin delicate alar. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### N11

```text
Create a single photorealistic portrait image. NOSE: inconspicuous nose, thin delicate alar. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### N12

```text
Create a single photorealistic portrait image. NOSE: sharp upturned nose with defined tip, narrow refined alar base. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### N13

```text
Create a single photorealistic portrait image. NOSE: inconspicuous nose, moderately upturned nose tip. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### N14

```text
Create a single photorealistic portrait image. NOSE: elegant straight long nose, moderately upturned nose tip. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### N15

```text
Create a single photorealistic portrait image. NOSE: sharp upturned nose with defined tip, smooth curved nose profile. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### N16

```text
Create a single photorealistic portrait image. NOSE: inconspicuous nose, smooth curved nose profile. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### N17

```text
Create a single photorealistic portrait image. NOSE: roman nose, nostrils barely visible from front. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### N18

```text
Create a single photorealistic portrait image. NOSE: small nose, button nose, soft rounded nose tip. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes; soft arched eyebrows with soft brown powdered finish and medium thickness; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

---

## 運用メモ

1. **N01 を1枚**生成し、目・口がブレていないか確認する。
2. **N02以降**は同一セッションで続けるか、**N01 を参照画像**にして「同一人物・目眉口は維持し、鼻だけ変更」と編集プロンプトで回す（`nano-banana-prompt` フレームワーク3）。**顔ブレが気になる多アングル**は `nanobanana_sample_nine_grid_character_sheet` の **3×3 グリッド1枚**を優先する。
3. 鼻以外がズレたカットは、**NOSE 文を短くする**か、編集で **nose region only** を明示して再生成。

---

## 参照

- `.claude/skills/nano-banana-prompt/SKILL.md`
- `.claude/skills/reamero-character-prompt/references/prompts/detailed-face-parts.md`（§3. 鼻）
- `.claude/skills/reamero-character-prompt/references/prompts/face.md`（鼻・補助語彙）
- `nanobanana_sample_nine_grid_character_sheet/prompt_document.md`（多アングル）

---

## 免責

創作用のプロンプト実験集です。実在個人の再現や権利侵害用途には使用しないでください。
