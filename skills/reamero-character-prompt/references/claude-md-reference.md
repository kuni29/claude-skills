# reamero-character（Claude 向けメモ）

このリポジトリは、**りあめろカテゴリの実写キャラクター向け画像プロンプト**を設計・保管するためのものです。キャラクター要素の組み立てルールは **Claude スキル** に集約されています。

## まず読むスキル

| 用途 | パス |
|------|------|
| アイドルグループのコンセプト設計・メンバーバランス診断 | `.claude/skills/idol-character-concept/SKILL.md` |
| 顔タイプ・骨格・パーソナルカラー中心の汎用プロンプト設計 | `.claude/skills/reamero-character-prompt/SKILL.md` |
| Nano Banana（Gemini 画像）向けの英文構造・公式フレームワーク | `.claude/skills/nano-banana-prompt/SKILL.md` |

詳細タグ辞書は `reamero-character-prompt` の `references/` 配下（`face.md`, `body.md`, `hair.md`, `clothing.md`, `scene.md`, `detailed-face-parts.md` など）を必要に応じて読み込む。

## 設計の固定順序

キャラクターを考えるときは **顔 → 体 → 髪（＋メイク）→ 服装** の順で検討する。前のステップで決めた軸に合わせて次を似合わせる。

## 服装を書くとき

`references/prompts/clothing.md` 冒頭の **必須ルール** に従う。

- **レイヤー順**（肌側から外側）。単層なら `single layer:` などで明示。
- **色は詳細に**（トーン・素材とセット。抽象色だけにしない）。

## アイドルコンセプト設計の固定ルール

`idol-character-concept` スキルは **女性アイドルのみ** を設計対象とする。男性・混合グループは対象外。

## サンプルフォルダ

`nanobanana_sample_*` および `nanobanana_sample_workflow_*` は、Nano Banana 向けのプロンプト文面（`prompt_document.md`）と生成サンプル画像のセット。新規サンプルを足すときは既存ディレクトリの構成に合わせる。**Nano Banana の既定**（顔・グリッド **2K・1:1**、**2×2**で表情＋顔アングル、ポーズ **4:5**）は `.claude/skills/nano-banana-prompt/SKILL.md` 冒頭を参照。パーツ差分のプロンプト参考用フォルダとして、`nanobanana_sample_face_parts_reference`（目・鼻・口の差分プロンプト集）、`nanobanana_sample_nine_grid_character_sheet`（顔・上半身・全身 × 正面・45°・90° を **1枚の3×3グリッド**にまとめる英語プロンプト・**オプション**）がある。別ビジュアルのサンプルキャラ（いずれも正面1枚＋**2×2**＋**全身／ポーズは別枚**。歴史的例は **9:16**、**新規は 4:5** に読み替え）: `nanobanana_sample_character_ash_bob_muse`（アッシュボブ・モックネック・クール寄り）、`nanobanana_sample_character_honey_straight_muse`（ロングストレート・センターパート・ウォーム肌・バターイエローのスクエアネックリブ）、`nanobanana_sample_character_plum_halfup_muse`（ハーフアップ・カーテンバング・ニュートラル肌・ダスティプラムのVネックリネンキャミ）、`nanobanana_sample_character_izumi_hinata_muse`（卵型・たれ寄り目・ハニーブラウン・カーテンバング・ローズブラウス＋ベージュワイドパンツのレイヤード・仮名・泉ひなた）、`nanobanana_sample_character_olive_pixie_muse`（フレッシュ顔・オリーブブラウンのショートピクシー・カーキリネンシャツのレイヤード・仮名・結衣）、`nanobanana_sample_character_hazel_angel_muse`（橋本環奈風の抽象化：ヘーゼルアイ・丸顔・王道アイドルメイク・白シフォンブラウス・仮名・結愛）、`nanobanana_sample_character_pure_clear_muse`（出口夏希風の抽象化：圧倒的透明感・黒髪ロング・極薄メイク・ストライプシャツ・仮名・凛）、`nanobanana_sample_character_koharu_petite_muse`（与田祐希風の抽象化：小動物系童顔・たれ目・低身長×曲線美・ゆるふわミディアム・仮名・小春）、`nanobanana_sample_character_rei_foxy_muse`（ガールクラッシュの抽象化：フォックスアイ・ブルーブラック・センターパート・ベリーリップ・仮名・レイ）、`nanobanana_sample_character_mio_lavender_muse`（フェミニン×ウェーブの抽象化：ラベンダーグレージュ・シアー素材・マーメイドスカート・仮名・美桜）、`nanobanana_sample_character_yuna_cool_muse`（クール×ストレートの抽象化：ダークチョコ・ジレ・サテンパンツ・仮名・結奈）、`nanobanana_sample_character_riko_peach_muse`（キュート×ウェーブの抽象化：ミルクティーボブ・シアーリボン・プリーツミニ・仮名・莉子）、`nanobanana_sample_character_tsumugi_fresh_muse`（フレッシュ×ナチュラルの抽象化：ブルーブラックボブ・シアーシャツ・パラシュートパンツ・仮名・紬）、`nanobanana_sample_character_nana_trendy_muse`（最新トレンドのドール系：さらに大きな丸目・忘れ鼻・黒髪・口角を上げない無表情・仮名・菜々）。**シーン系サンプル**（参照ロック多シーン・JSON ブリーフ・ストックを **1 フォルダに集約**）: `nanobanana_sample_scenes/prompt_document.md`（目次）。サブフォルダ: `nanobanana_sample_scenes/with_reference/`（英文例）、`nanobanana_sample_scenes/json_brief_seated_mirror/`（着席ミラー完全例・`scene_brief.sample.json`）、`nanobanana_sample_scenes/stock/`（テンプレ＋各 `scene_brief.json`）。**スタジオ白ハイキー・超寄りビューティ**のベース顔／環境・画風テンプレ（英文・りあめろ調整版・`base_brief.json`）: `nanobanana_sample_studio_base_closeup/prompt_document.md`。

## 言語

- スキル内の**最終プロンプト（モデルへ渡す文）は英語**（各スキルに記載のとおり）。
- ユーザーとのやり取りや説明が日本語の場合は、その前提で補足する。
