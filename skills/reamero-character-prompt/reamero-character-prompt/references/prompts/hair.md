# ヘアスタイル詳細プロンプト辞書（Hair Styles & Trends）

キャラクターの髪型を、トレンドを踏まえて詳細に定義するためのパーツ辞書です。
髪型は「ベースの長さ」「前髪・顔周り」「質感・スタイリング」「アレンジ」の組み合わせで構成されます。

---

## 1. トレンドヘアスタイル（2025〜2026）

そのままプロンプトに組み込める、韓国・日本で流行中の旬なヘアスタイルです。

| トレンド名 | 印象・特徴 | タグ |
|---|---|---|
| **レイヤーカット / ハッシュカット** | 2025年大流行。顔周りや毛先に段差をつけ、軽さと小顔効果を出すスタイル。 | `layered hair`, `hush cut`, `wolf cut` |
| **ヨシンモリ（女神ヘア）** | 韓国定番。大きめで優雅な外巻きウェーブ。エレガント・フェミニン。 | `glamorous large waves`, `korean goddess hair`, `voluminous wavy hair` |
| **スリークヘア / タイトヘア** | ツヤ感のあるストレートをタイトにまとめたスタイル。クール・モード。 | `sleek straight hair`, `tightly styled hair` |
| **姫カット（Hime Cut）** | 顔周りの毛を顎ラインでぱっつんと切り揃えたスタイル。Y2K・個性的。 | `hime cut`, `face-framing blunt cut` |
| **エギョモリ（顔周りレイヤー）** | こめかみ〜頬にかけての後れ毛で小顔効果。 | `face-framing layers`, `wispy side bangs` |
| **カチカチお団子（スパイキーバン）** | 毛先をツンツンと遊ばせたY2K風のお団子ヘア。 | `spiky bun`, `y2k spiky updo` |

---

## 2. 前髪・顔周り（Bangs & Face-framing）

前髪は顔の印象（特に年齢感と顔タイプ）を大きく左右します。

| 印象・種類 | タグ |
|---|---|
| **シースルーバング**（抜け感・韓国風・王道） | `see-through bangs`, `wispy bangs` |
| **ぱっつん前髪**（重め・モード・キュート） | `blunt bangs`, `heavy bangs` |
| **センター分け / カーテンバング**（大人・美人） | `center-parted bangs`, `curtain bangs` |
| **かきあげ前髪**（色気・エレガント・ストレート骨格◎） | `swept-up bangs`, `side-swept long bangs` |
| **斜め流し前髪**（清楚・アナウンサー風） | `diagonal bangs`, `neatly swept bangs` |
| **前髪なし**（大人っぽい・知的） | `no bangs`, `forehead exposed` |
| **後れ毛**（アレンジ時の抜け感） | `loose strands`, `wispy hair strands` |

### 2026年トレンドバング（サロン系ナレッジ）

プロンプト設計時の「今っぽさ」の参照として、[ホットペッパービューティーマガジン「2026年8大トレンドバング」](https://beauty.hotpepper.jp/magazine/662112/) の整理を利用する。生成時は**固めすぎず**、ラフな束感・ナチュラルな質感を添えると記事のトーンに近い。

| トレンド名（日本語） | 概要 | 英語プロンプト用タグの例 |
|---|---|---|
| **透け感バング** | 目にかかる長さで薄くカット。サイドバングを長めに残し小顔・目元強調。 | `sheer see-through bangs at eye length`, `long wispy side bangs framing the cheeks` |
| **流しバング** | チークライン付近で切り横に流す。韓国アイドル系で定着。ケンニプモリ（長め前髪を横流し）も「キメすぎない」ラフな曲線・隙間が2026寄り。 | `side-swept bangs at cheekbone length`, `loose Korean-style swept bangs with soft gaps`, `natural piece-y texture, not stiff` |
| **2WAYバング** | 流す／下ろすの両方が決まる。サイドバングをしっかり作り、結んでも顔周りが映える。 | `versatile 2-way bangs`, `parted or down-styled wispy front`, `defined side bangs with face-framing layers` |
| **かきあげバング** | 生え際を立ち上げサイドや後ろへ流す。おでこが見え洗練＋ふんわり華やかさ。 | `brushed-up bangs from the hairline`, `swept-up front hair styled away from forehead`, `soft root lift at front` |
| **フェザーバング** | 端を長めに残し外ハネ。顔周りに動き・立体感。ぱっつんと組み合わせて緩急も可。 | `feathered bangs with flipped-out ends`, `curled-out side bangs framing the face` |
| **極薄シースルーバング** | おでこが透ける薄さ＋束感。定番だが2026はラフ・ナチュラルスタイリングが主流。 | `ultra-thin see-through bangs`, `wispy piece-y bangs`, `natural undone texture, light styling` |
| **センターパート** | 中央分けで眉がはっきり、整った印象。面長向き。プリカール等で根元の立ち上げも。 | `center-parted front`, `middle-part bangs with soft volume at roots` |
| **ワイドバング** | 目尻より外側まで幅のある前髪。余白を抑え目元を際立たせる（フルバングより横幅重視）。 | `wide bangs extending past outer corners of eyes`, `broad forehead-framing bangs`（厚みはサイドの長さで調整） |

### 顔型別・前髪の方向性（似合わせの目安）

キャラの顔型が決まっているとき、前髪の英語指定のブレを減らすための目安（上記記事の「顔型別バング診断」と整合）。

| 顔型 | 向きやすい方向 | 避けやすい方向（目安） |
|---|---|---|
| **丸顔** | 縦ライン（`center part`, `swept-up bangs`, 長めの薄いシースルー） | 横に広がる印象が強いワイドバング・横長の流しのみ、など |
| **面長** | 横へ視線（`wide bangs`, `full bangs`, サイドを外に巻く） | 縦が強まる長めシースルー・センターのみ、など |
| **卵型** | バランス型のため幅広く選択可。可愛さ→ワイド・ぱっつん系、大人・上品→センター・薄シースルー、2way も相性◎ | （特になし。なりたい印象で選ぶ） |
| **ベース型**（エラ・輪郭カバー） | 顔周りを覆えるフェザー系、隙間・後れ毛で抜け感を足したぱっつん | 輪郭が丸出しになる極端な短さのみ、など |
| **逆三角形**（ハチ広め） | 重心が下がる斜め・フェザー、毛先に動き | トップだけ極端に尖るシルエット、など |

---

## 3. レングス・ベースの形（Length & Base Shape）

| 長さ | タグ |
|---|---|
| ショート / ピクシーカット | `short hair`, `pixie cut` |
| ボブ / ショートボブ | `bob cut`, `short bob` |
| 切りっぱなしボブ（タッセルカット） | `blunt bob`, `tassel cut` |
| ミディアム / 鎖骨レングス | `medium hair`, `collarbone-length hair` |
| セミロング / 胸上レングス | `semi-long hair` |
| ロング / スーパーロング | `long hair`, `very long hair` |

---

## 4. 質感・スタイリング（Texture & Styling）

髪の質感は「骨格タイプ」に合わせると似合わせやすくなります。（例：ウェーブ骨格＝エアリー、ストレート骨格＝ツヤ、ナチュラル骨格＝ドライ）

| 質感・動き | タグ |
|---|---|
| **ツヤ髪・サラサラ**（ストレート骨格向け） | `glossy hair`, `silky smooth hair` |
| **濡れ髪・オイルスタイリング**（トレンド・色気） | `wet hair look`, `oil-styled hair` |
| **ふんわり・エアリー**（ウェーブ骨格向け） | `fluffy hair`, `airy texture` |
| **ドライ・無造作**（ナチュラル骨格向け） | `dry texture`, `effortless messy hair` |
| ゆる巻き・ニュアンスウェーブ | `loose waves`, `soft wavy hair` |
| 外ハネ（ボブやミディアムと相性◎） | `flipped out ends` |
| ストレート | `straight hair` |

---

## 5. アレンジ・結び髪（Updos & Arrangements）

| スタイル | タグ |
|---|---|
| **ポニーテール**（高め / 低め） | `high ponytail` / `low ponytail` |
| **お団子**（高め / 低め / シニヨン） | `high bun` / `low bun` / `chignon` |
| **ハーフアップ**（上品・フェミニン） | `half updo` |
| **ツインテール**（高め / 低め） | `high twin tails` / `low twin tails` |
| **三つ編み / 編み込み** | `braid` / `french braid` |
| **カチューシャ / ヘアピン** | `headband` / `hairpins` |

---

## 6. 髪色・カラーリング（Hair Color）

パーソナルカラーに合わせて指定します。

| 色味（パーソナルカラー） | タグ |
|---|---|
| 漆黒（ウインター） | `black hair` |
| ダークブラウン（オータム・ウインター） | `dark brown hair` |
| ミルクティーベージュ（スプリング） | `milky beige hair`, `light ash blonde hair` |
| アッシュグレージュ（サマー） | `ash greige hair`, `ash brown hair` |
| ピンクブラウン（サマー・スプリング） | `pink brown hair` |
| オリーブアッシュ（オータム） | `olive ash brown hair` |
| インナーカラー / イヤリングカラー | `inner color hair`, `hidden dyed hair` |
| ハイライト / グラデーション | `highlighted hair`, `ombre hair` |

---

## 組み立て方の例（プロンプトへの落とし込み）

髪型は「長さ・形」＋「前髪」＋「質感」＋「色」を組み合わせて指定します。

**【韓国風ヨシンモリ（ウェーブ骨格・フェミニン向け）】**
> `dark brown hair styled in voluminous glamorous large waves, curtain bangs, glossy airy texture`
> （ダークブラウンのヨシンモリ、カーテンバング、艶のあるエアリーな質感）

**【切りっぱなしボブの濡れ髪（ナチュラル骨格・クールカジュアル向け）】**
> `ash greige hair styled in a blunt bob with flipped out ends, see-through bangs, wet hair look`
> （アッシュグレージュの切りっぱなしボブ、外ハネ、シースルーバング、濡れ髪）

**【Y2Kスパイキーバン（トレンド感強め）】**
> `black hair styled in a y2k spiky bun updo, face-framing layers, sleek tight texture`
> （黒髪のY2Kスパイキーバン、顔周りレイヤー、スリークでタイトな質感）
