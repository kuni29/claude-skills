# Nano Banana：シーン JSON ストック（汎用テンプレ＋収録シーン）

**目的**: キャラ確定後の**シーン設計**を、**同じ JSON 形**でストック・複製しやすくする。各シーンは `scenes/<scene_id>/scene_brief.json`。**英文プロンプト**は参照ロック版を別ファイルまたは下記リンクにまとめる。

**共通ルール**: `../with_reference/prompt_document.md`（リポジトリルートからは `nanobanana_sample_scenes/with_reference/prompt_document.md`）、スキル `nano-banana-prompt`（シーン多様生成・参照画像必須）。

---

## フォルダ構成

```text
nanobanana_sample_scenes/stock/
  prompt_document.md          ← 本ファイル（目次・運用）
  scenes/
    _template/
      scene_brief.template.json ← 新規シーン用ひな形（コピーして編集）
    seated_mirror_profile/
    direct_flash_bedroom_mirror/
    outdoor_golden_hour/
    cafe_window_rain/
    retro_mirror_headphones_peace/
    topdown_intimate_sofa_selfie/
    night_lounge_phone_glasses/
    night_hotel_bed_lace_iphone/
    flash_street_cap_bandeau_selfie/
    mirror_flash_knees_up_soft_glam/
    grid_intimate_desire_glamour/
```

---

## 新規シーンの作り方

1. `scenes/_template/scene_brief.template.json` を複製し `scenes/<scene_id>/scene_brief.json` に保存。
2. `scene_id` / `title_ja` / `title_en` を埋める。
3. `identity_mode`: 通常は `reference_locked`（**標準画を添付**してから英文を送る）。
4. `hair` は `use_only_when_text_only: true` を維持し、参照ロック時の英文では**髪の再定義を省く**。
5. `constraints.avoid` は **`avoid_as_positive_style`** にし、避けたいことを「〜ではない」ではなく**望ましい画風**で書く（Nano Banana のベストプラクティス）。
6. りあめろ既定: 国籍は **`Japanese`**、**ホクロ・そばかすはプロンプトに書かない**（`reamero-character-prompt` 注意事項）。

---

## 収録シーン一覧

| scene_id | 概要 | scene_brief.json | 英文プロンプト |
| --- | --- | --- | --- |
| `seated_mirror_profile` | 床着席・横顔・鏡越し・寝起き系ルーム | `scenes/seated_mirror_profile/scene_brief.json` | `../json_brief_seated_mirror/prompt_document.md`（参照ロック／テキストのみ） |
| `direct_flash_bedroom_mirror` | 寝室・立ち・オンカメラフラッシュ・ミラー | `scenes/direct_flash_bedroom_mirror/scene_brief.json` | `../with_reference/prompt_document.md` **例1** |
| `outdoor_golden_hour` | 屋外歩行・ゴールデンアワー・リネンワンピ | `scenes/outdoor_golden_hour/scene_brief.json` | `../with_reference/prompt_document.md` **例2** |
| `cafe_window_rain` | カフェ窓際・雨・レイヤード服 | `scenes/cafe_window_rain/scene_brief.json` | `../with_reference/prompt_document.md` **例3** |
| `retro_mirror_headphones_peace` | レトロ低画質・ヘッドホン・赤メガネ・ピース・開口笑顔 | `scenes/retro_mirror_headphones_peace/scene_brief.json` | 同フォルダ **`prompt_en.md`** |
| `topdown_intimate_sofa_selfie` | 俯瞰・ソファ寝そべり・顔と胴の向きが逆・親密カット | `scenes/topdown_intimate_sofa_selfie/scene_brief.json` | 同フォルダ **`prompt_en.md`** |
| `night_lounge_phone_glasses` | 夜・ソファにもたれ・スマホ手前・細眼鏡・ローライト（非ミラー） | `scenes/night_lounge_phone_glasses/scene_brief.json` | 同フォルダ **`prompt_en.md`** |
| `night_hotel_bed_lace_iphone` | 夜・ホテルベッド・黒レース上下セット・ベッドサイドランプ・9:16 iPhone風 | `scenes/night_hotel_bed_lace_iphone/scene_brief.json` | 同フォルダ **`prompt_en.md`** |
| `flash_street_cap_bandeau_selfie` | フラッシュ近距離半身・腕前景・黒キャップ（ラインストーン）・バンドゥ・チョーカー | `scenes/flash_street_cap_bandeau_selfie/scene_brief.json` | 同フォルダ **`prompt_en.md`** |
| `mirror_flash_knees_up_soft_glam` | 暗室ミラー・膝抱え・背面フラッシュ＆レンズフレア・Kソフトグラム・縁なし眼鏡・アッシュボブ | `scenes/mirror_flash_knees_up_soft_glam/scene_brief.json` | 同フォルダ **`prompt_en.md`** |
| `grid_intimate_desire_glamour` | 2×2グリッド・親密な熱気・グラムフォト（汗ばんだツヤ肌・フラッシュ） | `scenes/grid_intimate_desire_glamour/scene_brief.json` | 同フォルダ **`prompt_en.md`** |

---

## JSON の共通キー（目安）

| キー | 役割 |
| --- | --- |
| `scene_brief_version` | スキーマの版（現状 `1.0`） |
| `scene_id` | フォルダ名と一致するスラッグ |
| `title_ja` / `title_en` | 人間用ラベル |
| `identity_mode` | `reference_locked` 推奨 |
| `reference_note` | 添付画像の種類・英文の置き場へのリンク |
| `subject` | 説明・年齢・表情・`mirror_rules`・`face.preserve_original` |
| `hair` | `use_only_when_text_only: true` を推奨 |
| `body` / `pose` / `clothing` / `accessories` | シーンごとに展開 |
| `photography` / `background` / `the_vibe` | カメラ・セット・トーン |
| `constraints` | `must_keep` / `avoid_as_positive_style` |

---

## retro_mirror_headphones_peace について（追加分）

- ユーザー提供ブリーフを **`scene_brief.json` 化**し、**りあめろ準拠**で `note_when_no_reference` から**ホクロ表現を削除**（肌は clear without moles or freckles）。
- **参照ロック版**では髪色・バングは**参照に従う**（ヘッドホン・赤メガネ・服・ピースはシーン指定）。
- 鏡文字: 英文で **readable and correctly oriented** を明示（サンプルどおり）。

## topdown_intimate_sofa_selfie について（追加分）

- ユーザー提供ブリーフを**フラットなストックスキーマ**に再配置（`hair` / `body` / `pose` / `clothing` を `subject` 外に分離）。
- 国籍表現は **fictional young Japanese woman**；メイクは **K-beauty-inspired** とし実在芸能人指定は避ける。
- **参照ロック版**では髪の乱れ方は「参照に合わせつつ重力で顔にかかる」程度にし、**顔・メイクの系統は参照固定**。
- `boyfriend POV` は **intimate top-down personal POV** に言い換え（英文）。

## night_lounge_phone_glasses について（追加分）

- **ミラーではない**ことを `subject.description`・`constraints.must_keep`・英文で明示。
- 年齢は **`young adult` を `early 20s` に狭め**（りあめろの年齢レンジ方針に合わせる）。
- `face.preserve_original` を **boolean**、`note_when_no_reference` にメイク詳細；**ホクロなし**。
- 服装は **`layered_from_skin_outward`** に統一（キャミ＋ショーツ／スリップ下層）。

## night_hotel_bed_lace_iphone について（追加分）

- ユーザー元ブリーフは**実在芸能人指定**・**露出の過度な列挙**・`constraints` と本文の**矛盾**があったため、**りあめろ／創作安全**に合わせて**再構成**したシーンとして収録。
- **架空の日本人キャラ**（early 20s）、**実在人物の再現禁止**を JSON・英文で明示。
- **上下セットのレースルームウェア**（ブリーフ＋ショーツ／タップパンツ）に統一し、**下半身未着の指定は入れない**。
- 髪色は元の「ダークブロンド」を **`dark honey blonde to light brown`** としてテキストのみ版に保持；参照ロック時は**参照優先**。

## flash_street_cap_bandeau_selfie について（追加分）

- **中国語シーン参考**（構図・視角・人物・メイク・服飾・光線・質感）を **`scene_brief.json` + `prompt_en.md`** に整理。
- **泪痣**は `reamero-character-prompt` の**ホクロ禁止**に合わせ**プロンプトから除外**し、`note_when_no_reference` では **soft bright under-eye area** とトレンドメイク表現で代替。
- **ミラーではない**（自撮り・腕前景のパース）。
- フラッシュで**顔が身体より明るく見える**・**帽檐ラインストーンの強い反射**を `subject.description` / `photography` / 英文で明示。

## mirror_flash_knees_up_soft_glam について（追加分）

- ユーザー提供の **mode PRO JSON**（ミラー自撮り・膝抱え・銀アッシュボブ・縁なし眼鏡・Kソフトグラム・暗室・スマホフラッシュのレンズフレア）を **`scene_brief.json` + `prompt_en.md`** に正規化。
- **架空の日本人**（late teens to early 20s）、**実在人物再現禁止**；肌は **ホクロなし**（`note_when_no_reference` / 英文で明示）。
- メイクの **doll-eye** は「**subtle / without exaggeration**」に抑え、りあめろの自然さと両立。
- `negative_prompt` は **`negative_prompt_compact`** に圧縮し、本文・`avoid_as_positive_style` はポジティブ寄り。

## grid_intimate_desire_glamour について（追加分）

- ユーザー提供の「トップグラムフォトグラファーによる親密な熱気・フェロモンを表現する4枚構成」を、Nano Banana 用の **2×2 グリッドの1枚絵**（`contact-sheet style`）として再構築。
- **架空の日本人**（early 20s）、**実在人物再現禁止**；過度な露出（nudity）は避け、tasteful glamour（上品なグラムフォト）に調整。
- 「汗ばんだツヤ肌（slightly sweaty, glossy sheen）」や「深夜のフラッシュ撮影風（late-night flash photography aesthetic）」といった質感を強調。
- 4つのパネルそれぞれに、見上げる・ソファにもたれる・振り返る・頬杖をつくといった、テーマに沿った異なるポーズを割り当て。

---

## 参照

- `../with_reference/prompt_document.md`
- `../json_brief_seated_mirror/`
- 親フォルダ目次: `../prompt_document.md`
- `.claude/skills/nano-banana-prompt/SKILL.md`
- `.claude/skills/reamero-character-prompt/SKILL.md`

---

## 免責

創作用のプロンプト実験集です。実在個人の再現や権利侵害用途には使用しないでください。
