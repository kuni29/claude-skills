# 顔パーツ詳細プロンプト辞書（Granular Face Parts）

キャラクターの顔立ちを「美しいビジュアル」に最適化するためのパーツ辞書です。
ここに記載するすべてのタグは「好印象・美しい」方向に作用するものに限定しています。

---

## ⚠️ AIの過剰解釈（太りすぎ・濃すぎ）に注意

AI画像生成モデル（特に実写系）は、特定のパーツタグを過剰に解釈し、全体のバランスを崩すことがあります。

- **太りすぎの罠**: `plump cheeks`（ふっくら頬）や `round face`（丸顔）を強調しすぎると、顔だけでなく体型まで「太った・ぽっちゃりした」状態で出力されやすくなります。迷ったら `soft rounded face contour`（柔らかい輪郭）など、より安全なタグに置き換えてください。
- **ゲジ眉の罠**: `thick eyebrows`（太眉）は「不自然に太いゲジ眉」として出力されやすいです。基本は `soft natural straight eyebrows`（柔らかい平行眉）を推奨します。
- **引き算の設計**: ベースの美しさはモデルに任せ、特徴的なパーツ指定は1〜3個に留めるのが破綻しないコツです。

---

## 1. 目（Eyes）

パーツ数が多く、組み合わせが最も顔の印象を左右するパーツです。
「目尻の向き」か「まぶたの種類」のどちらか一方だけを選ぶのが破綻しないコツです。

### 目尻の向き（どちらか1つ選ぶ）

| 印象 | タグ |
|---|---|
| 可愛い・甘い（タレ目） | `downturned eyes` |
| クール・凛々しい（ツリ目） | `upturned eyes` |
| 丸く柔らかい（ナチュラル） | `round soft eyes` |

### 目の形・サイズ

| 印象 | タグ |
|---|---|
| ぱっちりと大きい | `large round eyes` |
| 知的・上品な切れ長 | `almond-shaped eyes` |
| 華やかなぱっちり目 | `wide-open eyes` |

### まぶた（どちらか1つ選ぶ）

| 印象 | タグ |
|---|---|
| くっきりとした二重（はっきり・万能） | `natural parallel double eyelids` |
| 幅広の平行二重（アイドル系・目力強め） | `wide parallel double eyelids` |
| 奥二重（ナチュラル・クール） | `hooded eyelids` |
| MIX型（目頭は細く目尻にかけて幅が広がる・自然なのに目力アップ） | `mixed double eyelid, narrow inner wide outer` |

### 目頭

| 印象 | タグ |
|---|---|
| 鋭くハッキリした目頭 | `sharp inner eye corners` |
| 柔らかく自然な目頭（蒙古襞） | `epicanthic fold` |

### 涙袋・まつ毛

| 印象 | タグ |
|---|---|
| ぷっくりした涙袋（甘め・愛嬌） | `prominent aegyo sal` |
| 長く繊細なまつ毛（自然） | `long natural eyelashes` |
| 上向きカールまつ毛（華やか） | `curled eyelashes` |

### 瞳（Iris / Pupils）

瞳は「黒目の大きさ」「瞳の色」「白目の清潔感」で構成されます。

#### 黒目のサイズ

| 印象 | タグ |
|---|---|
| 黒目がち（大きな黒目・愛らしい・アイドル系） | `large irises` |
| カラコン（黒目を大きく・盛れる） | `circle lenses` / `color contacts` |
| 均整の取れた自然な黒目 | `naturally sized irises` |

#### 瞳の色・カラコン（Iris Color & Color Contacts）

瞳の色は顔の印象を一気に垢抜けさせる重要なトレンド要素です。
デフォルトの黒/茶色に加え、K-POPアイドルや最新トレンドで多用される「カラコン（Color Contacts）」を指定することで、瞳に多様性と今っぽさを出せます。

| 印象 | タグ |
|---|---|
| 漆黒（コントラストが強い・凛々しい） | `black eyes` |
| ダークブラウン（日本人らしい温かみ） | `dark brown eyes` |
| 抜け感ヘーゼル（色素薄い系・ハーフ感・垢抜け） | `hazel color contacts` |
| クールなブルーグレー（K-POPアイドル風・神秘的・トレンド） | `icy blue-gray color contacts` |
| オリーブグリーン（洒落感・こなれ感） | `olive green color contacts` |
| ちゅるんとしたピンクブラウン（甘め・地雷系・ウサギ顔） | `pink-brown color contacts` |

#### 白目の質感

| 印象 | タグ |
|---|---|
| 白く清潔な白目（若々しさ・健康感） | `clear white sclera` |

> 注意: `sparkling eyes` / `catchlight` / `glistening eyes` などの瞳の輝き・反射表現は、照明（studio lighting / soft lighting 等）や環境設定によって自然に生まれるものとして扱う。顔パーツとして直接指定しない。照明設定は `scene.md` を参照。

---

## 2. 眉（Eyebrows）

眉は顔の「洗練度（垢抜け感）」を最も左右するパーツです。
AIは眉を「濃く・太く・海苔のように（描いた感強く）」出力しがちで、これが**「ダサい顔」になる最大の原因**です。
これを防ぐため、唇と同様に以下のパラメータに分解して指定します。

### ① 形状（Shape）
2025年の主流は、かつての「完全な直線」から「なだらかなアーチ」への回帰です。
| 印象・トレンド | タグ |
|---|---|
| 平行アーチ（2025韓国アイドル定番・柔らかい） | `soft arched eyebrows`, `gently curved eyebrows` |
| ナチュラル平行（王道・面長カバー） | `straight eyebrows` |
| しっかりアーチ（大人・クール・海外風） | `angled arched eyebrows` |
| 下がり眉・困り眉（甘め・愛嬌） | `slight downward slanted eyebrows` |

### ② 濃さ・色（Intensity & Color）★最重要
「ダサ眉」を回避するための最重要パラメータですが、**薄すぎるとすっぴん感が出すぎてメイクと浮いてしまいます**。すっぴん時とメイク時で使い分けます。
| 印象・用途 | タグ |
|---|---|
| メイク時（アイブロウパウダー・マスカラ） | `soft brown powdered eyebrows`, `warm brown eyebrow mascara`, `colored eyebrows matching hair` |
| すっぴん時・色素薄い系 | `light-colored eyebrows`, `muted eyebrows`, `soft pale eyebrows` |
| 濃い・ボールド（意志の強さ・海外風） | `dark bold eyebrows` |

### ③ 質感・輪郭（Texture & Edges）
| 印象・トレンド | タグ |
|---|---|
| フェザーブロウ（毛流れを活かした立体感・旬） | `brushed-up textured eyebrows`, `feathery eyebrows` |
| パウダー仕上げ（エッジをぼかしたふんわり感） | `soft blurred eyebrows`, `powdery eyebrows` |
| ペンシル仕上げ（輪郭がくっきりした眉） | `sharply defined eyebrows` |

### ④ 太さ（Thickness）
| 印象 | タグ |
|---|---|
| やや太め（※必ず「淡色」や「ふんわり」とセットで使うこと） | `moderately thick eyebrows` |
| 標準・自然 | `medium thickness eyebrows` |
| 細め（Y2K・クール・大人っぽい） | `thin well-groomed eyebrows` |

### 💡 垢抜け眉の組み合わせ（プリセット例）
*   **2025韓国アイドル眉（垢抜け・透明感）**: `soft arched eyebrows, light-colored muted eyebrows, soft blurred edges`（なだらかなアーチ、淡色ミュート、ふんわりぼかし）
*   **旬のフェザー眉（立体的・お洒落）**: `straight eyebrows, brushed-up feathery eyebrows, medium thickness`（平行、毛流れ立体感、標準の太さ）
*   **クール系細眉（大人・洗練）**: `angled arched eyebrows, thin well-groomed eyebrows, sharply defined`（アーチ、細め、くっきり）

---

## 3. 鼻（Nose）

鼻は「全体印象」で1タグのみ指定を基本とし、こだわりがある場合に限りサブ要素を1つだけ追加します。

### 全体印象（1つ選ぶ）

| 印象 | タグ |
|---|---|
| 存在感がなく顔に馴染む（ナチュラル・現代的） | `inconspicuous nose` |
| ツンとしたアップノーズ・鼻柱が下に出ている（立体的） | `sharp upturned nose with defined tip` |
| スッと通った長めの直鼻（上品・大人） | `elegant straight long nose` |
| 眉間から高く立体的（彫り深め） | `prominent high nose bridge` |

### サブ要素（追加する場合は1つまで）

| 部位 | 印象 | タグ |
|---|---|---|
| 鼻筋の開始位置 | 目頭から始まる自然な鼻筋 | `nose bridge starting from inner eye corners` |
| 鼻筋の開始位置 | 眉間から始まる高い鼻筋 | `high glabella` |
| 鼻筋のライン | 滑らかなカーブ（横顔が美しい） | `smooth curved nose profile` |
| 鼻筋のライン | まっすぐな直鼻 | `straight nose bridge` |
| 鼻先 | 適度なアップノーズ（鼻唇角が広い） | `moderately upturned nose tip` |
| 鼻先 | ツンと尖った鼻先（最頂点がはっきり） | `sharp defined nose tip` |
| 鼻先 | 丸みのある柔らかい鼻先 | `soft rounded nose tip` |
| 小鼻 | 目間の距離に収まるすっきり小鼻 | `narrow refined alar base` |
| 小鼻 | 薄くすっきりとした小鼻 | `thin delicate alar` |
| 鼻の穴 | 正面から鼻の穴が見えにくい | `nostrils barely visible from front` |
| 鼻中隔 | 鼻中隔が下に出ている（立体感） | `hanging columella` |

---

## 4. 口元・唇・人中（Mouth, Lips & Philtrum）

唇の印象は「上唇の形」「下唇の形」「厚み」「口角」「輪郭」「人中」などの独立したパラメータの組み合わせで決定されます。
AI生成においては、これらの中から**特徴的なものを1〜2個**選んで組み合わせることで、破綻なく理想の口元をデザインできます。

### ① 上唇の形状（Upper Lip Shape）
| 印象 | タグ |
|---|---|
| M字リップ・キューピッドボウ（可愛い・華やか） | `cupid's bow lips`, `m-shaped lips` |
| Cカール（横顔の立体感・人中短縮効果） | `c-curl lips` |
| 控えめな山（大人っぽい・ナチュラル） | `soft upper lip curve` |

### ② 下唇の形状（Lower Lip Shape）
| 印象 | タグ |
|---|---|
| ピーナッツ型（中央にくぼみ、左右にボリューム・色気） | `peanut-shaped lower lip`, `full lower lip with central dip` |
| ラウンド型（均一な丸み・王道可愛い） | `round full lower lip` |
| スクエア寄り（大人・シャープ） | `straight lower lip line` |

### ③ 厚みとボリューム分布（Thickness & Volume）
| 印象 | タグ |
|---|---|
| ぽってり厚め（セクシー・存在感） | `plump lips`, `full lips` |
| 下唇ぽってり（バランス・色気） | `plump lower lip` |
| 薄め（クール・知的） | `thin elegant lips` |

### ④ 口角（Mouth Corners）
| 印象 | タグ |
|---|---|
| 上がった口角（アヒル口・微笑み・好印象） | `upturned mouth corners` |
| 水平な口角（ニュートラル・落ち着き） | `straight mouth corners` |
> ※ 下がった口角は不機嫌に見えるため除外。

### ⑤ 輪郭・境界線（Vermilion Border）
| 印象 | タグ |
|---|---|
| くっきりした輪郭（メイク映え・上品） | `defined lip line` |
| ぼかした輪郭（オーバーリップ・すっぴん感・ナチュラル） | `smudged lip line`, `blurred lip line` |

### ⑥ 表面の質感（Texture）
| 印象 | タグ |
|---|---|
| 艶・グロス（若さ・色気・グラスリップ） | `glossy lips` |
| マット（大人・落ち着き） | `matte lips` |
| 潤い・自然な艶（すっぴんベース） | `soft moist lips` |

### ⑦ 人中（Philtrum）
鼻の下〜上唇の間の距離。短い人中は若々しさ・可愛らしさ・理想的な顔バランスに直結する重要条件です。
> 注意: 画像モデルによっては人中の過剰指定で口元が崩れやすい。`short philtrum` は他の口元タグと重ねすぎない。

| 印象 | タグ |
|---|---|
| 短い人中（若々しい・理想的バランス） | `short philtrum` |
| 自然な人中（中間・主張しない） | `natural philtrum length` |
> ※ 長い人中や平坦な人中は間延びして見えるため除外。

---

## 5. 輪郭・頬・顎（Face Contour & Jawline）

輪郭は顔タイプで決まることが多いため、基本は顔タイプのタグに任せてここでは指定しない。
こだわりがある場合のみ、以下から1つ追加します。

| 印象 | タグ |
|---|---|
| シャープなV字顎ライン・横顔も美しい | `v-shaped jawline` |
| 柔らかくなだらかなVライン | `soft v-shaped jawline` |
| 丸みのある柔らかいフェイスライン | `soft rounded face contour` |
| 頬骨が高く光が当たりやすい（立体的） | `high cheekbones` |
| ふっくらした愛嬌のある頬 | `soft plump cheeks` ※太りすぎに見えるリスクあり。注意 |
| 小さく女性らしい顎先（横顔美人） | `small delicate chin` |

---

## 6. 特徴・チャームポイント（Charm Marks）

> **⚠️ 一貫性のルール（ホクロの禁止）:**
> ほくろ（beauty mark / mole）やそばかす（freckles）などの局所的な特徴は、アングルが変わった際に位置がブレる（消える・増える・移動する）原因となるため、**原則としてプロンプトには含めない（指定しない）**ようにしてください。
> 必要な場合は、顔や肌のプロンプトに `clear skin, no beauty marks, no moles` などの除外指示を追加します。

| 印象 | タグ |
|---|---|
| えくぼ（両頬・笑顔が可愛い） | `dimples on both cheeks` |

---

## 7. 目の間の距離（Eye Spacing）

眼間距離は「顔の広さの印象」と「国籍感・タイプ感」を左右します。

注意: 基本はモデルに任せ、明確なキャラクター差分が必要なときのみ使用する。

| 印象 | タグ |
|---|---|
| 程よく離れている（穏やか・可愛い） | `slightly wide-set eyes` |
| 間が近い（クール・彫りが深く見える） | `close-set eyes` |

---

## 8. 顔全体の立体感・彫りの深さ（Facial Depth）

日本人顔・韓国顔・ハーフ顔の印象の差を最も大きく決定づける要素です。

注意: 肌タグ（パーソナルカラー）と組み合わせて使うのが効果的。

| 印象 | タグ |
|---|---|
| 平面的でナチュラルな顔（日本人顔・忘れ鼻と相性よい） | `natural asian facial depth` |
| 適度な立体感（現代的な韓国顔・バランス型） | `subtly defined facial features` |
| 彫りの深い立体的な顔（ハーフ顔・西洋的な骨格感） | `deeply defined facial features` |

---

## 9. 年齢感の微調整（Age Impression）

「20代前半のすっぴんベース」を起点に、より若い印象・より成熟した印象へスライドさせるためのタグです。

> **⚠️ 年齢指定の鉄則（老け見え防止）:**
> AIモデルは実写アジア人を生成する際、**想定より大人びて（老けて）出力する傾向**があります。
> 常に想定より「少し若め（-3〜5歳程度）」のタグ（`late teens`, `early 20s`, `youthful`）をベースに設定してください。
> 「20代後半〜30代」の大人っぽさを出したい場合でも、`late 20s` や `30s` と直接指定すると一気に老けて見えるリスクがあるため、年齢タグは `early 20s` に留め、顔タイプ（`elegant`）やメイクで大人っぽさを表現することを強く推奨します。

| 方向 | 印象 | タグ |
|---|---|---|
| より若く | 10代後半〜20代前半（あどけなさ・学生感） | `teenage softness`, `youthful round features`, `late teens` |
| 基準 | 20代前半（すっぴん・清潔感） | `early 20s`, `fresh youthful face` |
| やや成熟 | 20代中頃（女性らしさと若さの共存） | `mid 20s`, `young adult` |
| 成熟 | 大人っぽさの表現（※`late 20s`の直接指定は避ける） | `elegant mature face`, `refined adult features` |

## 11. メイクアップ（Makeup & Trends）

AIはメイクを濃く（ケバく）出力しやすいため「引き算」が必要ですが、`subtle` や `sheer` を多用しすぎると**「ほぼすっぴん（メイク感ゼロ）」**になってしまい、髪型や衣装と調和しなくなります。
色味をしっかり出しつつダサくならないよう、「グラデーション（`gradient`）」や「ツヤ（`glossy`）」などの質感でコントロールし、顔タイプ別の理論に基づいた「位置」を正確に指定します。

### ① アイメイク（Eye Makeup）
2025年のキーワードは「透明感・立体感・ツヤ」です。濃い黒のアイラインは避け、ブラウンやグラデーションで陰影を作ります。

| 顔タイプ・印象 | タグ |
|---|---|
| **キュート向け（丸み強調）** | `pink eyeshadow concentrated in the center`, `brown inner eyeliner focused on the center` |
| **フレッシュ向け（爽やか・透け感）** | `sheer mint green and pink beige eyeshadow`, `thin brown eyeliner filling the lash line` |
| **フェミニン向け（華やか・曲線）** | `pale pink gradient eyeshadow`, `fanned-out eyelashes`, `ultra-thin brown eyeliner` |
| **クール向け（切れ長・彫り深）** | `brown eyeshadow with outer v-shape gradient`, `eyeliner extended horizontally at the outer corners` |
| **涙袋の強調（全タイプ共通）** | `glittery under-eye makeup`, `highlighted aegyo sal` |
| **繊細な束感まつ毛（アイドル定番）** | `delicate clustered eyelashes` |

### ② チーク（Blush）
2025年のトレンドは「高めで横長」「2色使いによる立体感」です。低い位置の丸いチークは古く見えやすいため避けます。

| 顔タイプ・印象 | タグ |
|---|---|
| **キュート向け（ふんわり丸み）** | `soft round blush high on the cheeks` |
| **フレッシュ向け（ヘルシー・広め）** | `sheer wide blush for a healthy flush` |
| **フェミニン・クール向け（斜め楕円・大人）** | `rose blush applied diagonally along the cheekbones` |
| **トレンド（目の下横長・多幸感）** | `horizontal pink blush under the eyes` |

### ③ リップメイク（Lip Makeup）
リップの形状は「4. 口・唇」で指定し、ここでは色・質感・塗り方を指定します。

| 顔タイプ・印象 | タグ |
|---|---|
| **キュート・フレッシュ向け（抜け感・直塗り）** | `sheer glossy lip tint`, `blurred lip line`, `color concentrated in the center of lips` |
| **フェミニン・クール向け（上品・輪郭）** | `plump lips with rounded defined lip line`, `neatly defined lip line` |
| **粘膜リップ（自然な血色感）** | `glossy MLBB lip color` |
| **落ち着いたマットリップ** | `soft blurred matte lipstick`, `matte terracotta lips` |

### ④ ハイライト（Highlighting）
ツヤ感を足すことで、マット肌による老け見えを防ぎます。

| 顔タイプ・印象 | タグ |
|---|---|
| **子供顔向け（顔の中心に集める）** | `highlight focused on the center of the face`, `glowing t-zone` |
| **大人顔向け（ポイントでツヤを足す）** | `subtle highlight on brow bone and inner corners`, `glowing skin` |

---

## 💡 顔タイプ別・垢抜けメイクレシピ（プリセット）

顔タイプ診断の理論に基づいた、パーツの魅力を最大限に引き出すメイクの組み合わせです。

### 🌸 キュートタイプ（子供 × 曲線）
丸い目元とふんわりした頬を強調し、ピュアな可愛らしさを引き出すメイク。
> `soft brown powdered eyebrows, pink eyeshadow concentrated in the center, brown inner eyeliner focused on the center, soft round blush high on the cheeks, sheer glossy lip tint with blurred lip line`

### 🌿 フレッシュタイプ（子供 × 直線）
透明感のある明るいカラーでふわっと仕上げ、爽やかさと清潔感を引き出すメイク。
> `light orange-brown fluffy eyebrows, sheer mint green and pink beige eyeshadow, thin brown eyeliner filling the lash line, sheer wide blush for a healthy flush, sheer clear lip color with blurred lip line`

### 🎀 フェミニンタイプ（大人 × 曲線）
目と眉の曲線をリンクさせ、大人っぽく華やかな女性らしさを引き出すメイク。
> `long soft arched eyebrows, pale pink gradient eyeshadow, fanned-out eyelashes, rose blush applied diagonally along the cheekbones, plump lips with rounded defined lip line`

### 💎 クールタイプ（大人 × 直線）
目尻側を強調するグラデーションで彫りの深さを出し、美人感とスタイリッシュさを引き出すメイク。
> `long straight eyebrows with sharp ends, brown eyeshadow with outer v-shape gradient, eyeliner extended horizontally at the outer corners, blush applied diagonally upwards along the cheekbones, neatly defined lip line`

---

## 【別観点】顔パーツのトレンド（2025〜2026）

上記のパーツ辞書とは独立した観点として、「今どきの顔」を構成するトレンドを整理します。
キャラクターに時代感・リアリティを持たせたい場合に参照してください。

### 目のトレンド

| トレンド名 | 発祥・背景 | 構成要素 |
|---|---|---|
| フォックスアイ | 2023〜継続。BLACKPINK Jennie等が火付け役。クール・都会的な目元 | `upturned eyes` + アーチ眉 |
| パピーアイ | 2024〜韓国で急上昇。愛嬌系・守ってあげたくなる目元 | `downturned eyes` + `prominent aegyo sal` |
| ディアアイ | 2025〜日本でも浸透。ナチュラルで無邪気な目元 | `round soft eyes` + `prominent aegyo sal` |
| MIX型二重（セミアウトライン） | 2025韓国最新。自然なのに目力アップ | `mixed double eyelid, narrow inner wide outer` |

### 眉のトレンド

| トレンド名 | 発祥・背景 | 構成要素 |
|---|---|---|
| ミュート眉・淡色眉 | 2024〜韓国・日本共通。眉の存在感を消しアイメイクを引き立てる | `light-colored eyebrows`, `muted eyebrows` |
| 平行アーチ眉 | 2025韓国アイドル定番。直線からなだらかなアーチへ回帰 | `soft arched eyebrows` |
| フェザーブロウ | 2024〜継続。毛並みを活かした立体感ある眉。旬感が高い | `brushed-up textured eyebrows` |

### 鼻のトレンド

| トレンド名 | 発祥・背景 | 構成要素 |
|---|---|---|
| 忘れ鼻 | 2024〜日本の主流。存在感を消し目や唇を引き立てる | `inconspicuous nose` + `narrow refined alar base` |
| 韓国アイドル鼻 | 2023〜継続。ツンとしたアップノーズ・立体感 | `sharp upturned nose with defined tip` + `hanging columella` |

### 唇のトレンドと組み合わせ設計

唇は「形」ではなく「パラメータの集合」として設計します。各要素は独立して調整可能ですが、以下のプリセットを参考にするとバランスが良くなります。

| トレンド名 / 系統 | 構成要素（パラメータの組み合わせ） | タグの例 |
|---|---|---|
| アヒル口 / Cカールリップ | 2024〜韓国・日本共通。口角が上がり自然な微笑み感 | `upturned mouth corners`, `c-curl lips` |
| グラスリップ | 2025〜ガラス肌の唇版。内側から光るような透明感 | `glossy plump lips` |
| ピーナッツ型リップ | 韓国トレンド。中央にくぼみがあり左右にボリューム | `peanut-shaped lower lip` |
| **可愛い系（Cute）** | M字中〜強、山あり、人中短め、下唇ラウンド、口角やや上げ | `cupid's bow lips`, `round full lower lip`, `short philtrum`, `upturned mouth corners` |
| **綺麗系（Beautiful）** | M字弱〜中、人中標準、厚み均一、下唇スクエア寄り、輪郭ややシャープ | `soft upper lip curve`, `thin elegant lips`, `defined lip line` |
| **色気系（Sexy）** | M字中、人中やや短、下唇ピーナッツ、輪郭くっきり | `m-shaped lips`, `peanut-shaped lower lip`, `glossy plump lips` |
| **ナチュラル系（Natural）** | M字弱、人中標準、厚み控えめ、下唇ラウンド、輪郭ややぼかし | `soft moist lips`, `blurred lip line`, `natural philtrum length` |

### フェイスラインのトレンド

| トレンド名 | 発祥・背景 | 構成要素 |
|---|---|---|
| Vライン小顔 | 2023〜アジア全域で継続。シャープなV字顎ライン | `v-shaped jawline` + `small delicate chin` |
| ソフトVライン | 2025〜韓国ナチュラル志向。自然な小顔 | `soft v-shaped jawline` |
| Eライン横顔美人 | 継続。鼻先・口先・顎先が一直線の横顔 | `inconspicuous nose` + `small delicate chin` |

### トレンド顔タイプ別レシピ（総合）

キャラクターの「時代感」を一括で指定したい場合の組み合わせ例です。

| 顔タイプ | 目 | 眉 | 鼻 | 唇 | フェイスライン |
|---|---|---|---|---|---|
| 2025日本ナチュラル | `natural parallel double eyelids` / ディアアイ | `straight eyebrows` + `muted eyebrows` | 忘れ鼻 | `soft natural lips` | 丸みフェイスライン |
| 2025韓国Kビューティー | MIX型二重 / パピーアイ | `soft arched eyebrows` + `light-colored eyebrows` | 忘れ鼻 | `upturned mouth corners` | `v-shaped jawline` |
| フォックスフェイス | `upturned eyes` | `angled arched eyebrows` + `sharply defined eyebrows` | `prominent high nose bridge` | `thin elegant lips` | `high cheekbones` + `small delicate chin` |
| パピーフェイス | `downturned eyes` + `prominent aegyo sal` | `soft arched eyebrows` + `soft blurred eyebrows` | 忘れ鼻 | `cupid's bow lips` | `soft rounded face contour` |
| チャイニーズビューティー | `almond-shaped eyes` / 奥二重 | `thin well-groomed eyebrows` | `elegant straight long nose` | `thin elegant lips` | `high cheekbones` |

---

## 顔の差分ブロックの組み合わせ例（英語・短文）

以下は **内容の素材** である。Nano Banana ではカンマ羅列ではなく、`nano-banana-prompt` スキルの **題材＋アクション＋背景＋構図＋スタイル** に組み込んだ連続した英文にする。

### キュート系（丸顔・タレ目・忘れ鼻）
```
downturned eyes, prominent aegyo sal, soft natural straight eyebrows, inconspicuous nose, soft rounded face contour
```

### クール系（アーモンド目・ツリ目・直鼻）
```
upturned eyes, almond-shaped eyes, elegant straight long nose
```

### 甘め大人系（タレ目・M字唇・えくぼ）
```
downturned eyes, wide parallel double eyelids, cupid's bow lips, dimples on both cheeks, clear skin, no beauty marks
```

### 韓国アイドル系（MIX二重・アップノーズ・Vライン）
```
mixed double eyelid narrow inner wide outer, sharp upturned nose with defined tip, v-shaped jawline
```

### 忘れ鼻の完全再現
```
inconspicuous nose, narrow refined alar base, nostrils barely visible from front
```
※ モデルによっては `inconspicuous nose` のみでも十分な場合がある。詳細は `nano-banana-prompt` スキル。
