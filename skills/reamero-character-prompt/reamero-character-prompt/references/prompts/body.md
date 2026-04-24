# ボディプロンプト一覧（Body & Figure）

キャラクターの体型を「美しいビジュアル」に最適化するためのパーツ辞書です。
AIは「太め・肉付きが良い」というタグ（`chubby`, `plump`, `curvy`, `thick` など）を過剰に解釈し、過度に太った体型を出力しやすい傾向があります。
そのため、**基本は「痩せ型・モデル体型」をベースとし、そこから少し女性らしいラインを出すレベルに留める**のが破綻しないコツです。

ボディは以下の3つの軸（骨格・肉付き・胸）を組み合わせて設計します。

---

## 1. 骨格（Skeleton / Frame）

生まれつきのフレーム（肩幅・首・胴の厚み・関節の出方）を決定します。
骨格診断（ストレート・ウェーブ・ナチュラル）の特徴を反映させます。

| 骨格タイプ | 特徴・印象 | タグ |
|---|---|---|
| **ストレート（Straight）** | 身体に厚みがある、上重心、メリハリ、首が短め | `athletic build, hourglass figure` |
| **ウェーブ（Wave）** | 身体が薄い、下重心、華奢、首が長め、鎖骨が綺麗 | `slender body, long neck, visible collarbone` |
| **ナチュラル（Natural）** | 骨格・関節がしっかりしている、肩幅広め、スタイリッシュ | `model figure, wide shoulders, prominent collarbones` |

---

## 2. 肉付き（Flesh / Build）

骨格の上に乗る筋肉・脂肪のつき方を決定します。
**⚠️ 注意:** AIの過剰解釈を防ぐため、ベースは必ず「痩せ型（slim/slender）」に設定し、肉感を足す場合も `soft` や `toned` などのマイルドな表現を使用します。

| 肉付きの印象 | タグ |
|---|---|
| 痩せ型・華奢（基本ベース） | `slim build` / `slender build` |
| モデル体型（高身長でスタイリッシュ） | `tall model figure` / `well-proportioned slim body` |
| 柔らかい肉付き（女性らしい曲線・マシュマロ感） | `soft feminine lines` / `soft body` |
| 引き締まった・健康的（腹筋や脚のライン） | `toned body` / `lean build` |
| 筋肉質・スポーティ | `muscular build` / `defined abs` |

> **❌ 避けるべきタグ（過度に太りやすい）:**
> `chubby`, `plump`, `curvy`, `thick thighs`, `voluptuous`, `fat`, `overweight`

---

## 3. 胸（Breasts）

バストの大きさやディテールを指定します。
※過激な表現はAIのセーフティフィルターに引っかかる可能性があるため、自然な表現に留めます。

| 印象 | タグ |
|---|---|
| 控えめ・小さめ（スレンダー・ウェーブ骨格に合う） | `modest breasts` / `small breasts` |
| 標準・自然なサイズ | `medium breasts` / `shapely breasts` |
| 大きめ・豊満（ストレート骨格に合う） | `large breasts` / `full breasts` |
| 谷間が見える（衣装による） | `cleavage` |

---

## 4. その他の部位（Parts）

必要に応じて、くびれや脚などのディテールを1〜2個追加します。

| 部位 | 印象 | タグ |
|---|---|---|
| ウエスト | 細い腰・くびれ | `narrow waist` / `slim waist` |
| 腹部 | 平らなお腹 | `flat stomach` |
| 脚 | 長く細い脚 | `long slender legs` |
| 腕 | 細く引き締まった腕 | `slim toned arms` |
| 手・指 | 華奢な手・長い指 | `delicate hands`, `long slender fingers` |

---

## 組み合わせ設計（プリセット例）

**【ウェーブ骨格 × 華奢 × 控えめ胸】**
> `slender body, long neck, visible collarbone, slim build, modest breasts, narrow waist`
> （華奢で首が長く、鎖骨が綺麗に見えるスリムな体型）

**【ストレート骨格 × 柔らかい肉付き × 大きめ胸】**
> `athletic build, hourglass figure, soft feminine lines, large breasts, narrow waist`
> （メリハリがありつつも、柔らかい女性らしいラインを持つ体型）

**【ナチュラル骨格 × モデル体型 × 標準胸】**
> `model figure, wide shoulders, prominent collarbones, toned body, medium breasts, long slender legs`
> （肩幅があり骨格がしっかりした、引き締まったモデル体型）
