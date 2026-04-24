# Nano Banana：実験・目だけ差分・正面固定

**目的**: 同じ被写体条件のまま、**目周り（形・二重・目頭・まつ毛・涙袋・虹彩の大きさと色）だけ**を変えたとき、モデルがどこまで意図通りに分離して描けるかを確認する。

**前提**: `nano-banana-prompt` のフレームワーク1（テキストから画像・参照なし）に準拠。**1枚につき1出力**の英文で渡す。最終プロンプトは **英語**。

**固定方針**

- 眉・鼻・口・輪郭・肌・髪・服装・表情のトーン・カメラ角度・背景・照明の**語句は全カットで同一**。
- 瞳のキラキラ表現はタグではなく **ソフトな均一ビューティ照明** に任せる（`detailed-face-parts.md` の注意に準拠）。
- 目の組み合わせは辞書の「破綻しにくい」範囲で **1枚あたり特徴タグをおおむね3〜5個**に抑える。
- **オッドアイ（heterochromia・左右で瞳色が異なる指定）は禁止**。すべてのカットで **両眼の虹彩色は同一** とする。

---

## 固定英文ブロック（共通・目以外）

以下を **そのまま** 各プロンプトに含める（目の文だけ差し替え）。

```text
Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

**各カットの先頭**（スキル推奨の「動詞で始める」。`nanobanana_sample_nine_grid_character_sheet` と同様 **single image** を明示）:

```text
Create a single photorealistic portrait image.
```

**目だけの差分**は、固定英文ブロックの **直前** に `EYES:` から始める1文を置く。

---

## 推奨アスペクト比

**正方形 1:1**（`square 1:1 composition`）。胸上ポートレートのバランス確認用。多アングル（顔・上半身・全身 × 正面・45°・90°）は `nanobanana_sample_nine_grid_character_sheet` の **3×3 グリッド1枚**を参照。

---

## バリエーション早見表（正面・各 ID）

ファイル名は生成後の整理用の例。

### 目尻の向き × 形・二重（基本グリッド）

ここでは **目尻の向き**（たれ／つり／丸みのある柔らかさ）、**目の形・開き**（ぱっちり・切れ長アーモンド・見開き）、**二重ラインのタイプ**（自然な平行・幅広平行・奥二重・MIX型）、**目頭**（蒙古襞で柔らかい／シャープ）、**まつ毛**（ナチュラルロング／カール）、**涙袋**（あり／なし）、**虹彩の大きさと色**（自然サイズの茶・大きめの黒／カラコン色）を組み合わせたパターンを並べている。辞書上の対応は `detailed-face-parts.md` の「§1. 目」。

| ID | ファイル名例 | 挿入する目ブロック（`EYES:` 〜 文末まで） |
| --- | --- | --- |
| E01 | `eye01_downturned_large_natural_epi.png` | `EYES: downturned eyes, large round eyes, natural parallel double eyelids, epicanthic fold at inner corners, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera.` |
| E02 | `eye02_upturned_almond_wide_sharp.png` | `EYES: upturned eyes, almond-shaped eyes, wide parallel double eyelids, sharp inner eye corners, curled upward eyelashes, black eyes, large irises, clear white sclera.` |
| E03 | `eye03_roundsoft_wideopen_hooded_epi.png` | `EYES: round soft eyes, wide-open eyes, hooded eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera.` |
| E04 | `eye04_downturned_almond_mixed_sharp.png` | `EYES: downturned eyes, almond-shaped eyes, mixed double eyelid narrow inner wide outer, sharp inner eye corners, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera.` |
| E05 | `eye05_upturned_large_natural_epi_curled.png` | `EYES: upturned eyes, large round eyes, natural parallel double eyelids, epicanthic fold, curled eyelashes, naturally sized irises, dark brown eyes, clear white sclera.` |
| E06 | `eye06_roundsoft_large_wide_aegyo.png` | `EYES: round soft eyes, large round eyes, wide parallel double eyelids, epicanthic fold, prominent aegyo sal, long natural eyelashes, dark brown eyes, large irises, clear white sclera.` |
| E07 | `eye07_almond_hooded_sharp_olive.png` | `EYES: almond-shaped eyes, hooded eyelids, sharp inner eye corners, long natural eyelashes, olive green color contacts, naturally sized irises, clear white sclera.` |
| E08 | `eye08_wideopen_natural_epi_aegyo.png` | `EYES: wide-open eyes, natural parallel double eyelids, epicanthic fold, prominent aegyo sal, curled eyelashes, dark brown eyes, large irises, clear white sclera.` |
| E09 | `eye09_upturned_wideopen_wide_sharp.png` | `EYES: upturned eyes, wide-open eyes, wide parallel double eyelids, sharp inner eye corners, curled eyelashes, black eyes, large irises, clear white sclera.` |
| E10 | `eye10_downturned_large_hooded_epi.png` | `EYES: downturned eyes, large round eyes, hooded eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera.` |
| E11 | `eye11_roundsoft_almond_natural_hazel.png` | `EYES: round soft eyes, almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, hazel color contacts, naturally sized irises, clear white sclera.` |
| E12 | `eye12_upturned_almond_mixed_epi_hazel.png` | `EYES: upturned eyes, almond-shaped eyes, mixed double eyelid narrow inner wide outer, epicanthic fold, curled eyelashes, hazel color contacts, large irises, clear white sclera.` |

**各IDの特徴（狙い）**

- **E01**: **たれ目**に近い目尻で、**大きく丸い目**。**自然な平行二重**と**蒙古襞**で目頭は柔らかい。まつ毛はナチュラルロング、**茶色・自然サイズの黒目**。甘め・愛らしい王道寄り。
- **E02**: **つり目**で、**切れ長のアーモンド形**。**幅広の平行二重**でラインがはっきり、**目頭はシャープ**。まつ毛は**上向きカール**、**漆黒・大きめの虹彩**。クールでキリッとした印象。
- **E03**: **丸みのある柔らかい目**で、**見開いた大きさ**。**奥二重（ホーデッド）**で二重線が控えめ、**蒙古襞**。茶・自然サイズ。ナチュラルなのに目元ははっきり見えるタイプ。
- **E04**: **たれ目**×**切れ長**。**MIX二重**（目頭は狭く、目尻側にかけて幅が広がる）で自然さと目力のバランス、**目頭シャープ**。茶・自然サイズ。知的寄りのたれ目。
- **E05**: **つり目**×**大きな丸い目**。**自然平行二重**と**蒙古襞**、**カールまつ毛**。黒目は**自然サイズ**の**茶**。可愛さとキリッと感のミックス。
- **E06**: **丸い柔らかい目**×**大きな丸い目**。**幅広平行二重**・**蒙古襞**・**ぷっくり涙袋（エギョサル）**、**大きめの虹彩**・茶。甘め・華やか・アイドル寄り。
- **E07**: **切れ長**×**奥二重**で落ち着いた大人っぽさ。**目頭シャープ**、**オリーブグリーン系カラコン**、自然サイズの虹彩。形は抑えめで**色で垢抜け**させるパターン。
- **E08**: **見開いた目**。**自然平行二重**・**蒙古襞**・**涙袋**・**カールまつ毛**、**大きめ虹彩**・茶。ぱっちり可愛い系。
- **E09**: **つり目**＋**見開き**＋**幅広平行二重**＋**シャープ目頭**＋**カール**。漆黒・**大きめ虹彩**。**目力・キリッと感**が出やすい強めの組み合わせ。
- **E10**: **たれ目**×**大きな丸い目**×**奥二重**×**蒙古襞**。茶・自然サイズ。柔らかく**儚げ寄りのたれ目**。
- **E11**: **丸い柔らかさ**と**切れ長**の中間的なアーモンド。**自然平行二重**・**蒙古襞**、**ヘーゼル系カラコン**・自然サイズ虹彩。**色素薄め・ハーフ感寄りの垢抜け**。
- **E12**: **つり目**×**切れ長**×**MIX二重**・**蒙古襞**・**カール**、**ヘーゼル系カラコン**・**大きめ虹彩**。韓流アイドル風の**トレンド目元**寄り。

### カラコン・虹彩サイズ・涙袋の追加バリエーション

前面の表で拾いきれない **サークルレンズ感・ピンクブラウン／ブルーグレーなどの色味** や、**奥目寄り（deep-set）** などを足したバリエーション（いずれも **両眼同一の瞳色**）。

| ID | ファイル名例 | 挿入する目ブロック |
| --- | --- | --- |
| E13 | `eye13_downturned_wide_circle_pinkbrown.png` | `EYES: downturned eyes, wide-open eyes, wide parallel double eyelids, prominent aegyo sal, circle lenses look, pink-brown color contacts, large irises, clear white sclera.` |
| E14 | `eye14_upturned_large_natural_icybluegray.png` | `EYES: upturned eyes, large round eyes, natural parallel double eyelids, epicanthic fold, curled eyelashes, icy blue-gray color contacts, large irises, clear white sclera.` |
| E15 | `eye15_roundsoft_large_wide_olive.png` | `EYES: round soft eyes, large round eyes, wide parallel double eyelids, sharp inner eye corners, long natural eyelashes, olive green color contacts, large irises, clear white sclera.` |
| E16 | `eye16_almond_natural_epi_black_large.png` | `EYES: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, black eyes, large irises, clear white sclera.` |
| E17 | `eye17_wideopen_mixed_sharp_hazel_naturaliris.png` | `EYES: wide-open eyes, mixed double eyelid narrow inner wide outer, sharp inner eye corners, prominent aegyo sal, hazel color contacts, naturally sized irises, clear white sclera.` |
| E18 | `eye18_downturned_almond_hooded_darkbrown.png` | `EYES: downturned eyes, almond-shaped eyes, hooded eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera.` |
| E19 | `eye19_monolidlike_softround_darkbrown.png` | `EYES: soft east asian eyelids without a deep crease, subtle single-lid appearance, round soft eyes, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera.` |
| E20 | `eye20_deepset_almond_natural_epi.png` | `EYES: deep-set eyes, almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes.` |

**各IDの特徴（狙い）**

- **E13**: **たれ目**×**見開き**×**幅広二重**・**涙袋**・**サークルレンズ風**の**ピンクブラウン系カラコン**・大きめ虹彩。地雷系・ウサギ顔寄りの甘めトレンド。
- **E14**: **つり目**×**大きな丸目**・**自然平行二重**・**蒙古襞**・**カール**。**アイスブルーグレー系カラコン**・大きめ虹彩。K-POP寄りのクールな目の色。
- **E15**: **丸い柔らかい目**×**大きな丸目**・**幅広二重**・**シャープ目頭**。**オリーブグリーン系カラコン**・大きめ虹彩。E07と違い形もはっきり目のパターン。
- **E16**: **切れ長アーモンド**・**自然平行二重**・**蒙古襞**・ナチュラルまつ毛。**漆黒・大きめ虹彩**。目尻のたれ／つりを強く書かず、**形＋黒目の大きさ**で印象を作る。
- **E17**: **見開き**×**MIX二重**・**シャープ目頭**・**涙袋**。**ヘーゼル系カラコン**だが虹彩は**自然サイズ**。開きと二重ライン・涙袋は強め、黒目の大きさは控えめの対比。
- **E18**: **たれ目**×**切れ長**×**奥二重**・**蒙古襞**。茶・自然サイズ。E04と違い**二重は奥二重**で、より**儚げ・ナチュラル**寄り。
- **E19**: **深い折れ込みの少ないまぶた**（単層に近い見え方）・**丸い柔らかい目**。茶・自然サイズ。辞書外だが**モノリド系**の見え方を試すカット。
- **E20**: **奥目寄り（deep-set）**×**切れ長アーモンド**・**自然平行二重**・**蒙古襞**・ナチュラルまつ毛。両眼とも**茶・自然サイズ**（`identical iris color in both eyes` で左右同一を明示）。**オッドアイは使わない**。

---

## 英語プロンプト（コピー用・全文）

Nano Banana にコードブロックごと貼り付けて使う。構造は「`Create a single photorealistic portrait image.` + `EYES: ...` + 固定英文ブロック（眉・鼻・口・肌・髪・服・構図・照明）」。

### E01

```text
Create a single photorealistic portrait image. EYES: downturned eyes, large round eyes, natural parallel double eyelids, epicanthic fold at inner corners, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E02

```text
Create a single photorealistic portrait image. EYES: upturned eyes, almond-shaped eyes, wide parallel double eyelids, sharp inner eye corners, curled upward eyelashes, black eyes, large irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E03

```text
Create a single photorealistic portrait image. EYES: round soft eyes, wide-open eyes, hooded eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E04

```text
Create a single photorealistic portrait image. EYES: downturned eyes, almond-shaped eyes, mixed double eyelid narrow inner wide outer, sharp inner eye corners, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E05

```text
Create a single photorealistic portrait image. EYES: upturned eyes, large round eyes, natural parallel double eyelids, epicanthic fold, curled eyelashes, naturally sized irises, dark brown eyes, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E06

```text
Create a single photorealistic portrait image. EYES: round soft eyes, large round eyes, wide parallel double eyelids, epicanthic fold, prominent aegyo sal, long natural eyelashes, dark brown eyes, large irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E07

```text
Create a single photorealistic portrait image. EYES: almond-shaped eyes, hooded eyelids, sharp inner eye corners, long natural eyelashes, olive green color contacts, naturally sized irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E08

```text
Create a single photorealistic portrait image. EYES: wide-open eyes, natural parallel double eyelids, epicanthic fold, prominent aegyo sal, curled eyelashes, dark brown eyes, large irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E09

```text
Create a single photorealistic portrait image. EYES: upturned eyes, wide-open eyes, wide parallel double eyelids, sharp inner eye corners, curled eyelashes, black eyes, large irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E10

```text
Create a single photorealistic portrait image. EYES: downturned eyes, large round eyes, hooded eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E11

```text
Create a single photorealistic portrait image. EYES: round soft eyes, almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, hazel color contacts, naturally sized irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E12

```text
Create a single photorealistic portrait image. EYES: upturned eyes, almond-shaped eyes, mixed double eyelid narrow inner wide outer, epicanthic fold, curled eyelashes, hazel color contacts, large irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E13

```text
Create a single photorealistic portrait image. EYES: downturned eyes, wide-open eyes, wide parallel double eyelids, prominent aegyo sal, circle lenses look, pink-brown color contacts, large irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E14

```text
Create a single photorealistic portrait image. EYES: upturned eyes, large round eyes, natural parallel double eyelids, epicanthic fold, curled eyelashes, icy blue-gray color contacts, large irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E15

```text
Create a single photorealistic portrait image. EYES: round soft eyes, large round eyes, wide parallel double eyelids, sharp inner eye corners, long natural eyelashes, olive green color contacts, large irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E16

```text
Create a single photorealistic portrait image. EYES: almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, black eyes, large irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E17

```text
Create a single photorealistic portrait image. EYES: wide-open eyes, mixed double eyelid narrow inner wide outer, sharp inner eye corners, prominent aegyo sal, hazel color contacts, naturally sized irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E18

```text
Create a single photorealistic portrait image. EYES: downturned eyes, almond-shaped eyes, hooded eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E19

```text
Create a single photorealistic portrait image. EYES: soft east asian eyelids without a deep crease, subtle single-lid appearance, round soft eyes, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

### E20

```text
Create a single photorealistic portrait image. EYES: deep-set eyes, almond-shaped eyes, natural parallel double eyelids, epicanthic fold, long natural eyelashes, dark brown eyes, naturally sized irises, clear white sclera, identical iris color in both eyes. Subject: a beautiful young Japanese woman in her late teens, original fictional character (not based on any real person). Oval face with soft rounded facial contour. Fixed features — do not change: soft arched eyebrows with soft brown powdered finish and medium thickness; inconspicuous nose with nostrils barely visible from front; soft upper lip curve, round full lower lip, sheer MLBB glossy lip tint, closed-mouth neutral relaxed expression; fair soft clear skin, no beauty marks, no moles, no freckles; black hair scraped back into a tight sleek low ponytail, all hair off the face; single layer outfit: simple off-white cotton camisole with thin spaghetti straps, bare neck, no jewelry, no piercings. She is looking directly at the camera with a calm neutral gaze. Straight-on frontal head angle, eye level camera. Pure white seamless studio backdrop. Close-up portrait, head and shoulders, square 1:1 composition, centered. Soft even beauty lighting on the face for natural subtle catchlights from the light setup only. Photorealistic portrait, ultra-detailed, 8k quality, magazine-quality skin.
```

---

## 運用メモ

1. **まず E01 を1枚**生成し、ベースの顔の癖（眉の太さ・口の形など）を確認する。
2. **同一セッションで E02〜E20** を回すか、**E01 を参照画像**にして「同一人物・眉鼻口髪服は維持、目だけ変更」と編集プロンプトで試す（`nano-banana-prompt` フレームワーク3）。**顔ブレが気になる多アングル**は `nanobanana_sample_nine_grid_character_sheet` の **3×3 グリッド1枚**を優先する。
3. **眉・鼻・口がズレた**カットは、プロンプト短文化や「eyes only」の編集指示で再トライ。

---

## 参照

- `.claude/skills/nano-banana-prompt/SKILL.md`
- `.claude/skills/reamero-character-prompt/references/prompts/detailed-face-parts.md`（§1. 目）
- `nanobanana_sample_nine_grid_character_sheet/prompt_document.md`（多アングル）

---

## 免責

創作用のプロンプト実験集です。実在個人の再現や権利侵害用途には使用しないでください。
