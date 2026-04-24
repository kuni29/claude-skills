---
name: nano-banana-prompt
description: Google の Nano Banana（Gemini 3 系画像生成・編集）向けにプロンプトを書く。テキスト生成・参照画像あり・編集・照明・カメラ指定の公式に沿った英語プロンプトを組み立てるときに使用する。
---

# Nano Banana プロンプトガイド

Google Cloud が公開している [Nano Banana のプロンプト方法の究極ガイド](https://cloud.google.com/blog/ja/products/ai-machine-learning/ultimate-prompting-guide-for-nano-banana) に基づく、Nano Banana / Nano Banana 2 / Nano Banana Pro（Gemini 3 ファミリーの画像モデル）向けの記述ルールです。

りあめろのキャラクター設計（顔タイプ・パーツ辞書など）は汎用スキル `reamero-character-prompt` で組み立て、**書き方・構造は本スキルに従う**。

### 本リポジトリの Nano Banana 既定（解像度・アスペクト）

API や UI で指定できる場合は次を**デフォルト**とする（プロンプト文末にも英語で明記する）。

| 用途 | 解像度 | アスペクト比 | プロンプトでの明示例 |
|------|--------|--------------|----------------------|
| **顔の単体生成**（ヘッドショット・証明写真・参照用の正面など） | **2K** | **1:1** | `2K output`, `square 1:1 composition` |
| **顔バリエーションのグリッド**（下記ワークフロー Step 1） | **2K** | **1:1** | `single image`, `2×2 grid`, `four equal panels`, `2K`, `square 1:1` |
| **ポーズ主体**（全身〜ウエストアップで立ち姿・ラインが主題のカット、Step 2 のポーズ展開・シーンの体の見せ方が主なもの） | **2K** | **4:5** | `2K`, `4:5 vertical portrait aspect ratio` |

- **グリッドは 2×2（4 パネル）を標準**とする。4 セルそれぞれで **表情の差** と **顔の角度（正面・約 45° three-quarter・strict profile など）** の**両方**を変える（同一セル内で組み合わせる）。**同一人物・同一肌・髪・メイク・服装・スタジオ背景・照明**は維持する。英語例: `same person in all four panels`, `vary both expression and head turn in each panel`, `thin white dividers`, `contact sheet`。
- **3×3 のコンタクトシート**は、1 枚で顔・上半身・全身まで揃えたい場合の**オプション**（`nanobanana_sample_nine_grid_character_sheet`）。負荷が高い・コマが崩れるときは **2×2 に戻す**。

---

## モデルの位置づけ（概要）

- 実世界の知識と推論で、プロンプトを細部まで解釈してから画像を生成する画像生成・編集モデル群。
- **Nano Banana 2** の特徴（ガイド記載）:
  - 正確性: ウェブ検索由来のリアルタイム情報・画像を活用できるユースケースがある。
  - プロ向け機能: テキストレンダリング・翻訳、2K / 4K アップスケールなど。
  - きめ細かな制御: 複数のアスペクト比をネイティブサポート。

公式の最新仕様（解像度・トークン上限・API）は [Gemini / Vertex AI の画像モデルドキュメント](https://cloud.google.com/vertex-ai/docs) を参照する。

---

## ベストプラクティス（ガイド要約）

1. **具体的に書く**  
   被写体・照明・構図まで、細部を文章で指示する。

2. **ポジティブな表現**  
   「入れないもの」ではなく「あるべき姿」を書く。  
   例: 「車を入れない」ではなく「空っぽの通り」。

3. **カメラ・撮影用語**  
   ローアングル、空撮など、写真・映像の語彙で構図を指定する。

4. **イテレーション**  
   会話で追記・修正し、段階的に仕上げる。

5. **動詞で始める**  
   実行したい主な操作を、はっきりした動詞でプロンプトの冒頭に置く。

---

## フレームワーク1: テキストから画像（参照画像なし）

キーワードの羅列ではなく、**シーンを物語のように**書く。

**公式構造:**

`[題材]` + `[アクション]` + `[場所 / 背景]` + `[構図]` + `[スタイル]`

**例（ガイド掲載の英訳イメージに沿った形）:**

- 題材: A fashion model in a tailored brown dress, stylish boots, structured handbag.
- アクション: Confident pose, slightly turned to the side.
- 場所 / 背景: Seamless studio backdrop in deep cherry red.
- 構図: Medium or full shot, centered.
- スタイル: Fashion magazine aesthetic; medium-format analog film look, visible grain, rich color; cinematic lighting.

キャラクター用途では、題材に年齢・国籍・髪・服装、スタイルに `photorealistic portrait` などを入れる。

**白ハイキー超寄りの「ベース顔／環境」テンプレ**（商業ビューティ寄り・シームレス白・ソフト正面光）をストックした例: `nanobanana_sample_studio_base_closeup/prompt_document.md`。多シーン展開の**前に**照明と背景を揃えたいときの参考にする。

---

## フレームワーク2: 参照画像あり（マルチモーダル）

**公式構造:**

`[参照画像]` + `[関係の指示]` + `[新しいシナリオ]`

- 複数参照（スケッチ＋生地サンプルなど）を組み合わせ、出力への役割を明示する。
- キャラ一貫性・商品を別背景へ置く用途向け。

### 複数アングル生成のワークフロー（顔のブレ防止・必須ルール）

キャラクターの正面・斜め・横顔など複数アングルを生成する際は、顔立ちの一貫性を保つため**「まずグリッド画像を作成し、それを参照画像として展開する」**手順を厳守する。

1. **Step 1: グリッド画像の生成（テキストのみ）**: フレームワーク1を使用し、テキストプロンプトのみで **2×2 グリッド（4 パネル・1:1・2K）**を生成する。**各パネルで表情と顔の向き（カメラアングル）の両方を変え**（セルごとに組み合わせる）、同一人物の造形を固定する「シングル・ソース・オブ・トゥルース」とする。必要に応じて **3×3**（顔・上半身・全身 × 3 アングル）も使えるが、**既定は 2×2**（冒頭の既定表参照）。
2. **Step 2: 参照画像ロックによる展開**: 1で生成したグリッド画像（またはその中の正面パネル）を `[参照画像]` として指定し、フレームワーク2（マルチモーダル）を使用して以下の画像を生成する。
   - 正面ポートレートなど**顔中心のカット**（**1:1・2K**）
   - **ポーズ主体のカット**（全身〜ウエストアップなど、**4:5・2K**）
   - 各シーンの画像（S1, S2…。シーンの主題がポーズなら **4:5**、顔寄りなら **1:1** を選ぶ）

### 代替ワークフロー: 1枚の 3×3 グリッド（同一出力内で多アングル）

**連続で1枚ずつ**生成すると、セッションや乱数の影響で**顔が別人化**しやすい。その対策として、**1回の生成で 3 行 × 3 列のコンタクトシート**にまとめる方法がある（例: *Make a single image: a 3×3 grid of the same woman with different camera angles*）。

- **行の意味（上→下）**: **① 顔アップ（頭〜肩）** / **② 上半身（腰〜太もも上まで、またはウエストアップ）** / **③ 全身（頭から足元）**。
- **列の意味（左→右）**: **正面（straight-on）** / **約 45° の three-quarter view** / **90° の strict profile（横顔）**。列ごとに**同じポーズ**を保ち、**変えるのはカメラの周り込み角だけ**と英文で明示する。
- **9パネル共通**: **同一人物**（同一の顔・肌・髪型・メイク・服装）、**同一のスタジオ背景・照明**。上半身・全身の行では、従来どおり **contrapposto（片足重心）** など**ポーズは行内で固定**し、角度だけ変える。
- **プロンプトのコツ**: `Create one photorealistic image` / `a single 3×3 grid` / `nine equal panels` / `thin white dividers` / `contact sheet` などで**1ファイルに9コマ**であることをはっきり書く。**正方形 1:1**（`square 1:1 composition`）がコマ均等化に向く。
- **限界**: モデルや解像度によってはグリッドが崩れる・顔がパネル間で微妙にズレることがある。その場合は指示を短くする、列を減らす、または上記 **手順1→2（参照画像あり）** に戻す。

リポジトリのコピー用プロンプト例: `nanobanana_sample_nine_grid_character_sheet/prompt_document.md`。

### 別形: 2×2 グリッド（既定）とポーズを別枚 4:5

**本リポジトリの既定**は、2×2 で**表情 × 顔アングル**のバリエーション（4 セルすべてで同一人物・同一スタジオ条件）。従来サンプルにある「顔 3 アングル＋ウエストアップ正面」の並べ方も**許容される 2×2 の一例**。

- **2×2（正方形 1:1・2K）**: 例 — 左上 **顔正面・ニュートラル**、右上 **約 45°・穏やかな微笑**、左下 **strict profile・落ち着いた視線**、右下 **正面・別表情**（など、**表情と角度を 4 セルに分散**）。パネルごとに**変えるのは頭の向きと表情**、被写体の同一性は維持。
- **ポーズ主体**: **別出力**で **4:5・2K**（ウエストアップ〜フルボディ。足元まで入れるならフレーミングを英文で明示）。

コピー用の英文例（構成の参考。アスペクトは本スキルの既定に合わせて **1:1 / 4:5・2K** に読み替え可）: `nanobanana_sample_character_ash_bob_muse/prompt_document.md`（B・D）、同系の `nanobanana_sample_character_honey_straight_muse` / `nanobanana_sample_character_plum_halfup_muse` の各 `prompt_document.md`。

### シーン多様生成（同一キャラ・参照画像必須）

**テキストだけで**場所や服装を変えた別シーンを連続生成すると、**顔・髪・メイクが別人化**しやすい。確立したキャラ（例: `nanobanana_sample_character_*_muse` の**案1**の正面ヘッドショット、または2×2シートの**顔がはっきりした1コマ**）を **必ず参照画像として添付**してから、**フレームワーク2**でシーンを指示する。

#### ルール（必須）

1. **参照画像**: 少なくとも **1枚**。可能なら **正面の顔が明瞭**なもの。髪型・メイクの系統が読める解像度にする。
2. **先に書くこと（英文の冒頭）**: 参照とロック範囲を明示する。例:
   - `Using the attached reference image as the single source of truth for this person's facial identity: keep the same face shape, eyes, nose, brows, lips, skin tone, hair color, hair length and cut, and makeup style as in the reference. Do not invent a different person.`
3. **テキストで顔・髪・メイクを「書き換えない」**: 参照と**矛盾する**目の色・髪色・前髪の有無・メイクの系統をプロンプトに書かない。補強するなら **参照に一致**させる短い1文だけ（例: `Match the reference exactly for hair and makeup.`）。
4. **シーン側で変えてよい要素**: そのカット専用の**服装（レイヤー順・色の具体性は `clothing.md` 準拠）**、**ポーズ**、**背景・小道具**、**カメラ距離・角度・レンズ感**、**照明・時間帯**。表情は**同一人物の自然なバリエーション**に留め、別人に読み替わらない程度の微差にする。
5. **構造化ブリーフ（JSON 等）**: 企画メモを JSON で持つ場合は、**`subject.face.preserve_original: true` 相当の意図**を英文に必ず含め、**髪・メイク・顔の生体特徴は参照に委ねる**フィールドとして扱う。シーン固有の `clothing` / `pose` / `background` / `photography` だけを詳述してモデルへ渡す。
6. **ネガティブの扱い**: ガイドのベストプラクティスどおり、**列挙よりポジティブ記述**を優先。手・スマホ・鏡が絡む場合は `single smartphone`, `anatomically correct hands`, `one mirror reflection only`, `any visible text stays normally readable, not mirrored` のように**あり方**で書く。

#### 英文テンプレ（参照＋シーン）

```text
Using the attached reference image(s): preserve exactly the same person — same facial features, same skin tone, same hair color, hairstyle, and makeup as the reference. Do not change identity.

New scene only: [場所・時間帯]. [ポーズ・アクション]. Wardrobe for this shot — layered from skin outward: [服装の具体]. [カメラ・構図・アスペクト比]. [照明・画風]. Photorealistic, coherent anatomy, 2K.
```

コピー用の長文例・ミラーセルフィー等: `nanobanana_sample_scenes/with_reference/prompt_document.md`（シーン系まとめ: `nanobanana_sample_scenes/prompt_document.md`）。

**JSON ブリーフから英文へ**（キャラ確定後のシーン設計）: `subject` / `pose` / `clothing` / `photography` / `background` / `constraints` を段落に落とし、参照ロック時は `hair` と顔の細目を本文から外す。完全サンプル（着席・横顔・ミラー）: `nanobanana_sample_scenes/json_brief_seated_mirror/prompt_document.md`・`nanobanana_sample_scenes/json_brief_seated_mirror/scene_brief.sample.json`。

---

## フレームワーク3: 画像編集

- **変えたいこと / 変えたくないこと** をはっきり書く。
- **セマンティックなマスク（インペイント）**: テキストで編集領域を指定し、それ以外は維持。
- 例（ガイド）: 「写真から男性を削除して」— 残す部分を明確にすると安全。

参照画像を追加して構図変更・スタイル変換（例: 写真をゴッホ風に）も可能。

---

## フレームワーク4: ウェブ検索連動

**公式構造:**

`[ソース / 検索リクエスト]` + `[分析タスク]` + `[ビジュアルの変換]`

実データを取得してから、その内容を画面に反映させる指示を書く（天気・日付など）。

---

## フレームワーク5: テキストレンダリング・ローカライズ

- 表示したい語句を**引用符や括弧で囲む**（例: 「Happy Birthday」）。
- **フォント・タイポグラフィ**を指定（例: bold gothic, Century Gothic 12px）。
- 多言語: プロンプトは一つの言語でも、出力言語を指定できる。
- 長文は、まず Gemini で文案を固めてから画像化する、とガイドでも推奨。

---

## クリエイティブディレクター視点（ガイド要約）

### 照明

- 商品の均一照明: ソフトボックスを使った三点照明など。
- ドラマ: キアロスクーロ、ゴールデンアワーのバックライトと長い影、など。

### カメラ・レンズ・フォーカス

- 機材名でトーンを変える（例: GoPro の歪み、Fujifilm の色、使い捨てカメラのフラッシュ感）。
- 被写界深度: `shallow depth of field (f/1.8)`、広角、マクロなどを明示。

### 色調・フィルム

- 例: 1980 年代カラーフィルムの粒状感、シネマ風のティールトーン、など。

### 素材・質感

- 「ジャケット」ではなく「ネイビーのツイード」のように素材まで書く。
- 商品モックは「ミニマルなセラミックのマグ」のように表面を指定。

---

## アスペクト比・解像度（ガイド記載の例）

- アスペクト比の例: 1:1, 3:2, 2:3, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9 など（Flash プレビューでは 1:4, 4:1 なども言及）。
- 解像度: 0.5K〜4K などモデル・API により異なる。API ドキュメントで確認する。

**本リポジトリの既定**は冒頭の「本リポジトリの Nano Banana 既定」表のとおり（顔・2×2グリッド **1:1・2K**、ポーズ **4:5**）。

キャラクター証明写真など **1:1 固定**は、プロンプトの構図ブロックで `square 1:1 composition` のように明示する。

**3×3 キャラクターシート**を使う場合も **1:1・2K** を推奨（9コマが均等になりやすい）。

---

## りあめろキャラクターとの組み合わせ

1. `reamero-character-prompt` で顔タイプ・肌・髪・服の**要素**を英語タグ／短文で決める。
2. 本スキルの **題材 + アクション + 背景 + 構図 + スタイル** に落とし込み、**1本の英文（または短い段落）** にする。
3. 顔の細部は詰め込みすぎず、`detailed-face-parts.md` の「差分は少数」ルールと併用する。
4. 瞳のハイライト・肌の強いギラつきは、**照明・環境**の文で指定し、瞳そのものの装飾タグは避ける（画風崩れ防止）。
5. **服装を題材に含めるときは**、`reamero-character-prompt` の `references/prompts/clothing.md` にある必須ルールに従い、**レイヤー順（肌側→外側）**と**色の詳細**を英文に組み込む（抽象色や順序なしの列挙は避ける）。
6. **アイドル・グループ向け**は同スキルの「アイドルとしてのビジュアル完成度」「グループの年齢感・メイクの統一」に従う（共感型でもヘア・メイクはプロ品質、全メンバー同一の年齢レンジ英文）。
7. **確立した1人キャラを別ロケーション・別服装で量産**するときは、**参照画像必須**（上記「シーン多様生成」）。テキストで顔・髪・メイクを毎回書き直さず、**参照にロック**してシーン要素だけを変える。例文は `nanobanana_sample_scenes/with_reference/prompt_document.md`。企画を **JSON** で持つ場合は `nanobanana_sample_scenes/json_brief_seated_mirror/` のサンプル、または複数シーンストック `nanobanana_sample_scenes/stock/`（`scenes/_template` と各 `scene_brief.json`）をテンプレにする。シーン系は親フォルダ `nanobanana_sample_scenes/prompt_document.md` に目次あり。

---

## 公式参照

- [Nano Banana のプロンプト方法の究極ガイド（Google Cloud ブログ・日本語）](https://cloud.google.com/blog/ja/products/ai-machine-learning/ultimate-prompting-guide-for-nano-banana)

---

## 他モデルとの連携（ガイド記載）

- **Nano Banana + Gemini**: プロンプト推敲・クリエイティブディレクション。
- **Nano Banana + Veo**: キーフレーム生成後に動画化。
- **+ Lyria**: 映像にサウンドトラックを追加。

キャラクター静止画だけでなく、動画パイプラインを組む場合の参照として使う。
