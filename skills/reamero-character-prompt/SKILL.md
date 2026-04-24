---
name: reamero-character-prompt
description: りあめろカテゴリの実写キャラクタービジュアル向けプロンプトを作成する。顔タイプ・骨格・パーソナルカラーを踏まえて人物プロンプトを組み立てるときに使用する。特定の画像生成モデルに依存しない汎用的なプロンプト設計を行う。
---

# りあめろキャラクター プロンプト作成

AI画像生成モデル（Gemini, Stable Diffusion, Midjourney, DALL-E 3など）向けの実写キャラクタープロンプトを、
**顔タイプ診断 × 骨格診断 × パーソナルカラー診断** の3軸で組み立てる。

詳細な知識・タグ辞書は `references/` 配下を必要に応じて読み込む。

---

## 出力フォーマット（モデル非依存の論理ブロック）

特定モデルの記法（タグ列・LoRA・API パラメータなど）は **本スキルでは扱わない**。`.claude/skills/` 配下の **モデル専用スキル** に委ねる。

| モデル例 | プロンプトの書き方 |
|---|---|
| Nano Banana（Gemini 画像） | `nano-banana-prompt` スキル（物語型・題材＋アクション＋背景＋構図＋スタイル） |
| その他 | 該当スキルが追加されたらそちらを参照 |

本スキルで組み立てるのは **内容の論理ブロック** である。すべて英語で出力すること。

```text
[基本設定・品質・画風]
[人物の基本情報（年齢・国籍）]
[顔・表情・髪型]
[体型・ポーズ]
[服装]
[背景・照明・構図]
```

ターゲットが Nano Banana のときは、上記ブロックを `nano-banana-prompt` の公式構造へマージした **連続した英文** に変換して渡す。

---

## 組み立て手順（固定ワークフロー）

キャラクターを考える際は、**必ず「顔 → 体 → 髪 → 衣装」の順番**で検討・設計する。
前のステップで決めたベース軸（顔・体）を踏まえて、次のステップ（髪・衣装）を似合わせるように設計すること。

### 1. 顔（Face）

※顔の造形のみを純粋に評価するため、髪型や衣装は**「フラットな状態（ノイズのない状態）」**に固定して生成する。
- **フラット指定の例**: `black hair styled in a tight ponytail with no bangs`（前髪なしのひっつめポニーテール）, `simple white camisole, bare neck, no jewelry`（シンプルな白キャミソール、装飾なし）

1. **国籍・ルーツを指定** — デフォルトは `japanese`
2. **年齢帯を指定（グループでは必ず統一）**:
   - 1人のときも、**狭いレンジ**で書く（例: `in her late teens to very early 20s (around 18–21)`）。`teenager` 単独や `mid-20s` など幅の広い語だけにしない。
   - **同一グループの複数メンバーを生成するとき**は、全員に**同一の年齢英文**を使う。メンバーごとに「幼く」「大人っぽく」ブレさせない。大人っぽさ・幼さは**年齢タグではなく**顔の造形・メイクのトーン・表情の微差で出す。
3. **顔タイプを判断** → `references/face-types.md`
4. 同ファイルの「プロンプトタグへのマッピング」から顔タグを選択
5. **パーソナルカラーを判断** → `references/personal-color.md`
6. 同ファイルの「肌タグへのマッピング」から肌タグを選択
7. 表情・視線・メイクなどの追加タグは `references/prompts/face.md` から選択
8. **より詳細な顔パーツやトレンドの指定が必要な場合** は `references/prompts/detailed-face-parts.md` を使用して特徴を抽出する（※詰め込みすぎによる破綻に注意し、特徴は1〜3個に絞る）
9. **複数アングルの生成（必須の固定ワークフロー）**:
   キャラクターのアイデンティティ（顔の造形）を固定し、複数枚の画像を生成する場合は、**必ず「グリッド画像を最初に作成し、それを参照画像（シングル・ソース・オブ・トゥルース）として展開する」**ルールとする。Nano Banana 利用時の**解像度・アスペクトの既定**は `nano-banana-prompt` スキル冒頭の表に従う（**顔・グリッドは 2K・1:1**、**ポーズ主体は 2K・4:5**）。
   - **Step 1: グリッド画像の生成（テキストのみ）**
     - **標準: 2×2 グリッド（4 パネル・2K・1:1）** — 各パネルで **表情の差** と **顔の向き（正面・約 45°・横顔など）** の**両方**を変え、同一人物・同一スタジオ条件のコンタクトシートにまとめる。構成の参考: `nanobanana_sample_character_ash_bob_muse`（英文中のアスペクトは `nano-banana-prompt` の既定に読み替え可）。
     - **オプション: 1枚の 3×3 グリッド** — 顔アップ・上半身・全身の **3段** × 正面・45°・90° の **3列** を **単一画像**にまとめる（`nanobanana_sample_nine_grid_character_sheet` 参照）。1枚に全身まで含めたい場合向け。
   - **Step 2: 参照画像ロックによる展開**
     - Step 1 で生成したグリッド画像（またはその中の最も顔が明瞭なパネル）を**参照画像としてロック**し、以下の画像を生成する。
       - **顔中心のカット**（**1:1・2K**）
       - **ポーズ・全身・ウエストアップ**（**4:5・2K**）
       - **各シーン（S1, S2...）**（カットの主題に応じて 1:1 または 4:5）

### 2. ボディ（Body）

※顔の次にボディを考える。顔の評価と同様に、髪や衣装は**「フラットな状態」**を維持する。

ボディは以下の3つの軸（骨格・肉付き・胸）で構成し、AIの過剰解釈（太りすぎ）を防ぐため、**基本は「痩せ型・モデル体型」をベースとし、少し女性らしいラインを出すレベル**に留める。

1. **骨格（Skeleton）**: 生まれつきのフレーム（肩幅・首・胴の厚み・関節の出方）。`references/body-types.md` からストレート／ウェーブ／ナチュラルを判断し、ベースタグを選択する。
2. **肉付き（Flesh）**: その上に乗る筋肉・脂肪。AIは実写指定だと健康的な肉付き（やや太め・がっちり・首が太い）を出力しやすいため、アイドルのような華奢さを出すには **`very slender build`, `delicate frame`, `thin waist`** などを強めに指定する。また、首が太くなるのを防ぐため、必ず **`long slender neck`**（細く長い首）や `delicate neck` をプロンプトに含める（※`chubby` や `curvy` など太りやすいタグは厳禁。また、顔の若作り目的で `plump` を使いすぎると全体がぽっちゃりするため注意）。
3. **胸（Breasts）**: バストの大きさやディテール（`modest breasts`, `medium breasts`, `large breasts` など）を選択する。
4. **構図とポーズの指定**: 体型が明確にわかるように、構図は「上半身（`upper body shot`）」、ポーズは「コントラポスト（`contrapposto` / 片足重心で体のラインが出るポーズ）」を指定して生成する。※顔の正面画像を参照画像として使用する。

### 3. 髪とメイク（Hair & Makeup）

※顔・ボディのベース軸に似合う「髪型」と「メイク」をセットで考える。衣装はまだ「フラットな状態」を維持する。

1. **メイクトレンドのリサーチ**: 生成時にウェブ検索等で最新のメイクトレンド（チークの位置、アイシャドウの色など）をリサーチし、キャラクターの印象に合ったメイクプランを作成する。

2. **アイドルとしてのビジュアル完成度（ファン心理タイプ共通）**:
   - **共感型・庇護型**でも「親しみ」「等身大」は**キャラの立ち位置・表情・距離感**で表現し、**ヘアとメイクはアイドルとしてプロ品質**にする。すっぴん・地味・未完成なサロン仕上がりに倒さない。
   - 英語プロンプトでは、例として `flawless professional idol styling`, `magazine-ready polished hair and makeup`, `salon-perfect hair with healthy glossy finish`, `clean even skin, refined brows, defined but natural lashes` など、**形の上に乗る完成度**を明示する。
   - 「チーク・アイシャドウを薄く」と「メイクが薄い＝雑」は別。色味は抑えても、**均一肌・眉・まつ毛・リップの形・毛束の艶**は揃えて「アイドルらしい整い」を出す。

3. **メイクのプロンプト設計（ダサ見え・濃すぎ防止）**: 
   - AIはメイクを濃く（ケバく）出力しやすいため、基本的にチークは極力抑えめ（`very subtle blush` や `minimal blush`）に指定し、アイシャドウ等も「薄く色が乗る程度（`subtle`, `sheer`, `light touch of`）」と指定する。
   - 色や位置がダサくならないよう、「どこに」「何色を」乗せるかトレンドに基づき正確に指定する（例：`subtle sheer lavender eyeshadow`, `very subtle pink blush high on the cheekbones`）。

4. **令和っぽい顔（最新トレンド）へのチューニング**:
   - AIは少し前のメイクやのっぺりした顔を出力しやすいため、**令和の最新トレンド（透明感・束感・ちゅるん感）**をプロンプトに強制する。
   - **肌**: `translucent glass skin finish`（透明感のあるツヤ肌、ガラススキン）をベースにする。
   - **眉**: `feathered natural eyebrows with visible hair texture`（毛流れの見えるナチュラルな眉）とし、単なるパウダー眉（のっぺり）を避ける。
   - **まつ毛**: `trendy bundled curled lashes`（トレンドの束感まつ毛）を指定する。
   - **リップ**: `plump glossy MLBB lips with a glass-like finish`（ちゅるんとしたツヤのあるオーバーリップ気味のMLBB）を指定する。
   - **全体**: `modern Tokyo beauty aesthetic` や `trendy 2020s Japanese idol aesthetic` をSubjectに加える。

5. **瞳の大きさ（黒目がちのデフォルト化）**:
   - AIはデフォルトで白目の面積を広く（三白眼気味に）出力しやすいため、**基本は「黒目がち（瞳が1.5倍ほど大きい）」をデフォルト**とする。
   - **黒目がち指定（基本）**: `large prominent irises`, `less white sclera visible`（または `circle lens effect`）をプロンプトに追加する。
   - **三白眼（Sanpaku eyes）**: ユーザーから「三白眼」「クールな目」など指定があった場合のみ、`sanpaku eyes`, `small irises`, `more white sclera visible below the iris` に切り替える。

5. **髪色のトレンドルール（2025–2026）**: 以下に従い、ダサ見えを防ぐ。
   - **禁止カラー**: 単色の黒（`black hair` 単独）、古くさいアッシュグレー単体（`ash gray` など寒色単色）、明度が低すぎて重い暗色
   - **推奨カラー傾向（垢抜け系）**: 暖色ブラウン（`warm chocolate brown`, `honey brown`, `caramel brown`）、透明感グレージュ（`cool greige`, `blue-greige`）、垢抜けオリーブ（`dark olive brown`）、ラベンダーグレージュ（`lavender greige`）
   - 必ず **ツヤ感・透明感** の修飾語を添える（例: `glossy warm brown`, `translucent greige`）。マットな単色は避ける。
   - 「漆黒」を使うセンタータイプでも、`jet black with a subtle blue-black sheen`（青みの艶がある漆黒）のように質感を必ず指定する。
   - ⚠️ **ターゲットのファン心理によって「似合う髪色」の方向性が変わる**。以下を必ず確認する：
     - **庇護欲ターゲット（守りたい系）**: 「サロン風のトレンドカラー（グレージュ・カラコン強調・ハイライト）」は禁止。自然な黒・ダークブラウン・ソフトブラウン系で「地毛に近い清潔感」を出す。カラーを入れる場合も最低限（`soft natural dark brown`, `very dark warm brown with a slight natural sheen`）にとどめる。
     - **憧れ型ターゲット（手が届かない美しさ）**: センタータイプは漆黒（`jet black with blue-black sheen`）が有効。高彩度や明るすぎる色は品位を損ねる。
     - **共感型ターゲット（近い存在）**: 髪色はナチュラルブラウン〜ミディアムブラウンなど**親しみのあるトーン**でもよいが、**セット・艶・前髪の作り**はアイドル水準（上記「アイドルとしてのビジュアル完成度」）で揃える。

6. **グループ複数人を生成するときの統一感ルール**:
   - **年齢感の統一**: `[人物の基本情報]` の年齢英文を**全メンバー同一**にする（上記「顔」手順の年齢帯参照）。1人だけ `mature sophisticated` や `childlike`, `very young teen` など、他とズレる形容を入れない。
   - **表情の統一**: グループのターゲットファン心理に合った「表情のトーン」を1つ決め、全員に適用する。個性はビジュアルの造形・髪で出し、表情のトーンで差をつけない。
     - 庇護欲系グループ → `gentle, slightly shy expression, soft warm eyes, a barely-there timid smile` など「控えめ・もじもじ感」にする。`natural smile` は明るすぎるので禁止。
     - 憧れ型グループ → `calm, composed, serene expression, direct gaze`
   - **メイクの統一感**: グループのターゲットに合ったトーンで、全員の以下を統一する（いずれも**プロのアイドルメイク**としての統一。色の濃さだけを揃えるのではなく、**仕上がりのランク**も揃える）。
     - チークの色調・位置（庇護欲系は `very subtle barely-visible blush` など**薄くても均一に入った**指定にする）
     - リップの質感（例: 全員 `sheer glossy MLBB lip`）
     - アイシャドウのトーン（庇護欲系でも `sheer neutral wash on lids` のように**無色に近くても「化粧としての均一さ」**は残す）
   - **フラット状態の指定統一**: 顔評価時の髪型・衣装指定は全員同じ文字列を使う

7. **髪型の決定**: `references/hair-guide.md` と `references/prompts/hair.md`（ヘアスタイル辞書）から、顔タイプ・骨格・パーソナルカラーに合う髪型を決定する。前髪の旬の種類・顔型別の目安は `hair.md` セクション2（2026トレンドバング・顔型別）を参照。

8. **バリエーション生成**: 顔の「正面」画像を参照画像として設定し、同じ顔アップの構図で**「髪型＋メイク」の組み合わせパターンを複数生成**して比較検討する。

### 4. 服装（Clothing）

※最後に、顔・ボディ・決定した髪型すべてに似合う衣装を考える。

- `{素材} {服の名前}` の構文が基本（例: `cotton blouse`, `satin dress`）
- タグは `references/prompts/clothing.md` から選択
- **服装を指定するときは必ず**、同ファイル冒頭の「服装を指定するルール（必須）」に従い、**レイヤードの順番（肌側→外側）**と**各アイテムの色の詳細指定**を英語プロンプトに含める
- **骨格タイプ別の似合わせ**: キャラクターの**骨格タイプ（ストレート・ウェーブ・ナチュラル）**に合わせて、最もスタイルが良く見える服を選んでください。`references/prompts/clothing.md` の「骨格タイプ別の似合う服」セクションを参照し、骨格の強み（メリハリ、華奢さ、フレーム感）を活かすアイテムを選択します。
- **ダサ見え防止（令和トレンドへのアップデート）**: AIは単に `skirt` や `cardigan` と指定すると、2010年代前半のような量産型・コンサバで古臭い服を生成しがちです。必ず `references/prompts/clothing.md` の「ダサ見え防止」セクションを参照し、`sheer organza shirt`, `parachute pants`, `satin mermaid skirt` などの**現代（2025〜2026年）の東京トレンド**を反映したアイテムを選び、プロンプトに `Modern Tokyo trendy chic aesthetic` などを添えてください。

### 5. シーン・構図・照明（Scene & Lighting）

- `references/prompts/scene.md` から選択。
- 瞳のハイライトや肌の質感などは、顔パーツとして直接指定するのではなく、ここで照明（`studio lighting` 等）として設定し、環境光として自然に表現させる。

### 6. 同一キャラの多シーン展開（Nano Banana・参照画像必須）

キャラの標準画を一度決めたあと、**違うロケーション・服装・カメラ**のカットを量産するときは、**参照画像なしのテキストだけの生成を避ける**。

1. **参照画像を必ず添付する**（正面ヘッドショット、または2×2キャラシートのうち顔が最も明瞭なパネルなど）。複数枚ある場合は「顔の一致に効く画像」を優先。
2. **顔・髪・メイクは参照にロック**し、プロンプト本文では**矛盾する再定義を書かない**。変えるのは主に**そのカットの服装・ポーズ・背景・照明・カメラ**。
3. 英文の型・ロック文言・ミラーセルフィー等の例は `nano-banana-prompt` の「シーン多様生成（同一キャラ・参照画像必須）」および `nanobanana_sample_scenes/with_reference/prompt_document.md` を参照する（シーン系目次: `nanobanana_sample_scenes/prompt_document.md`）。
4. **シーンを JSON で保存**し、キャラクリエイト後に Nano Banana 用英文へ変換する場合は、`nanobanana_sample_scenes/json_brief_seated_mirror/prompt_document.md` のスキーマと**参照ロック版／テキストのみ版**のプロンプト例に合わせる。機械可読なひな形は同フォルダの `scene_brief.sample.json`。**複数シーンのストック**は `nanobanana_sample_scenes/stock/`（`scenes/_template/scene_brief.template.json` と各シーンの `scene_brief.json`）。
5. **スタジオ白ハイキーで顔を大きく写すベース証明写真**の照明・背景・画風の型は `nanobanana_sample_studio_base_closeup/prompt_document.md`（顔・髪・瞳はキャラに合わせて差し替え）。

---

## 注意事項

- **国籍・ルーツ**: 明示的に別の指定がない限り `japanese` を必ず入れる。
- **プロンプトはすべて英語** で出力する（最終的にモデルへ渡す文面のベース）。
- **引き算の設計**: 顔パーツを細かく指定しすぎると解釈が破綻しやすい。ベースの美しさはモデルに任せ、特徴的なパーツ指定は最小限に留める（`detailed-face-parts.md` の安全量も参照）。
- **年齢感の補正（老け見え対策とセーフティ回避）**: AIは実写アジア人を大人っぽく（老けて）出力しやすいが、若くしようとして `girl`, `18 years old`, `baby fat` など「未成年・幼さ」を強調する単語を重ねると、**AIプロバイダーの児童保護（CSAM）フィルターに誤検知されエラーになる**。
  1. **安全な年齢指定**: `girl` は避け、`youthful young woman in her late teens` など「若々しい女性」として指定する。
  2. **安全な骨格指定**: `short midface`（中顔面短め）、`slightly shorter chin`（顎短め）、`soft delicate cheeks`（柔らかく華奢な頬）を入れる。※以前は `plump`（ふっくら）を推奨していましたが、AIが顔全体を「ぽっちゃり・太め」と解釈しやすいため、現在は `delicate` や `smooth` を推奨します。`baby fat`はNG。
  3. **メイクを極薄に**: `very light makeup` や `clear lip gloss` を強調し、ケバさを抜く。
  **グループ複数人**では全員に**同一の年齢英文**を使い、メンバー間で幼さ・大人っぽさがブレないようにする。
- **装飾品の除外**: 明示的な指定がない限り、ピアス、イヤリング、ネックレスなどのアクセサリーは生成されないようにする（例: 服装や顔のプロンプトに `no jewelry, no piercings, bare neck` などを追加）。
- **ホクロの禁止**: アングル間で位置がブレる原因となるため、ホクロ（beauty mark/mole）やそばかすは指定しない。
- **複数アングルの生成（顔のブレ防止）**: 画像を複数生成するときは**必ず参照画像が必要**です。そのため、**「まずテキストプロンプトのみでグリッド画像（既定は 2×2、必要なら 3×3）を作成し、それを参照画像（シングル・ソース・オブ・トゥルース）として展開する」**ことを基本ルールとします。Nano Banana では **2×2 を 2K・1:1**、各セルで**表情＋顔アングル**を変える（詳細は `nano-banana-prompt`）。
  1. **Step 1（グリッド生成）**: **2×2（4 パネル）**で表情と顔の角度のバリエーションをまとめる（**2K・1:1**）。全身まで1枚のシートにしたい場合は **3×3**。
  2. **Step 2（参照展開）**: 生成したグリッド画像（またはその中の正面パネル）を参照画像としてロックし、顔中心カット（**1:1・2K**）、ポーズ主体（**4:5・2K**）、各シーンの画像を生成します。
- **パーツの検討順序**: キャラクターを考える際は、必ず「顔 → 体 → 髪 → 衣装」の順番で検討し、前のステップで決めたベース軸を踏まえて似合わせるように設計すること。

---

## 出力例（論理ブロックの英語サンプル）

モデルへ貼る直前は、ターゲット用スキル（例: `nano-banana-prompt`）の構造に合わせて整形する。

```text
Photorealistic portrait, ultra-detailed, 8k. Subject: a beautiful young Japanese woman in her early 20s with a balanced oval face, soft features, large droopy eyes with prominent aegyo sal, and an inconspicuous nose. Fair porcelain skin. Black hair in a neat bob. White silk blouse, standing, gentle smile, looking at viewer. Setting: bright modern room. Lighting: soft studio lighting on face and skin. Composition: medium close-up portrait.
```

---

## リファレンス一覧

| ファイル | 内容 |
|---|---|
| `references/face-types.md` | 顔タイプ診断8種 + 顔タグマッピング |
| `references/body-types.md` | 骨格診断3タイプ + 体型タグマッピング |
| `references/personal-color.md` | パーソナルカラー診断4タイプ + 肌タグマッピング |
| `references/hair-guide.md` | 顔型・顔タイプ・髪質別の髪型ガイド |
| `references/prompts/face.md` | 顔・目・表情・メイク・肌の基本タグ辞書 |
| `references/prompts/detailed-face-parts.md` | 目頭・目尻・二重幅・唇の形など、極めて詳細な顔パーツのタグ辞書とトレンド情報 |
| `references/prompts/hair.md` | 髪型・髪色のタグ辞書 |
| `references/prompts/body.md` | 体型・骨格のタグ辞書 |
| `references/prompts/clothing.md` | 服・素材のタグ辞書 |
| `references/prompts/pose-action.md` | ポーズ・アクションのタグ辞書 |
| `references/prompts/scene.md` | カメラ・構図・照明・雰囲気のタグ辞書 |

## 関連スキル（モデル別プロンプト記法）

| スキル | 用途 |
|---|---|
| `.claude/skills/nano-banana-prompt/SKILL.md` | Nano Banana（Google Gemini 系画像）向けの物語型プロンプト・編集・照明・公式フレームワーク |
