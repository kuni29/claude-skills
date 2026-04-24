---
name: hairstyle-prompt
description: >
  ヘアスタイル詳細プロンプト集（NanoBanana2 / Grok Imagine対応）。
  Urban Women Hair Styleを150項目以上で要素分解した詳細プロンプト。
  AIアイドル・キャラクターのビジュアル制作ワークフローに直結。
allowed-tools: Bash, Read
argument-hint: "ヘアスタイル（例: ロングウェーブ, ボブ, ツインテール, ピンクグラデ）"

category: content-generation
tags: [画像, AI生成, プロンプト, ヘアスタイル, キャラクター]
input:
  - type: text
    description: ヘアスタイル・色・長さ・テクスチャの指定
output:
  - type: text
    description: ヘアスタイル詳細プロンプト（英語）、generate-imageに直結
related:
  similar_to: [realistic-portrait-prompt, ai-portrait-situation, generate-image]
  compose_with: [generate-image, realistic-portrait-prompt, ai-fashion-portrait]
---

# ヘアスタイル詳細プロンプト集

キャラクター・バーチャルタレントのヘアスタイルを精密に指定するための詳細プロンプト集。
v5まで継続更新されているUrban Women Hair Style 150項目のエッセンスを収録。

元ネタ: @AIPixLab「【Z-Image Turbo / NanoBanana2 / Grok】実用的ヘアメイク プロンプト集【DETAILED 150】v5」

---

## ヘアスタイル要素マップ

### 長さ（Length）

```
ultra-short pixie / short bob / chin-length lob / shoulder-length /
mid-back length / waist-length / floor-length / hip-length
```

### テクスチャ（Texture）

```
pin-straight / sleek and shiny / natural waves / loose waves /
beachy waves / deep waves / tight curls / coil curls /
kinky coils / finger waves / crimped
```

### ボリューム（Volume）

```
flat and sleek / minimal volume / medium volume / voluminous /
ultra-voluminous / teased and big / deflated and limp /
perfectly bouncy
```

### スタイル（Style）

```
blunt cut / layered / heavily layered / textured layers /
razor-cut / shaggy / wolf cut / butterfly cut / curtain bangs /
straight bangs / side-swept bangs / no bangs / face-framing layers
```

---

## カラーパレット

### ナチュラル系

```
jet black / deep brown / chestnut brown / warm auburn / 
honey blonde / platinum blonde / ash blonde / dirty blonde /
strawberry blonde / natural red / copper red
```

### グラデーション系

```
black to dark brown ombre / brunette balayage / blonde highlights /
caramel highlights / rose gold balayage / sunset ombre /
blue to purple gradient / pink roots to blonde /
galaxy hair multi-tone
```

### ビビッド / アニメ系

```
neon pink / pastel lavender / electric blue / mint green /
coral orange / silver white / two-tone split dye /
rainbow sections / holographic shimmer
```

---

## スタイル別完全プロンプト

### ロングウェーブ（インフルエンサー定番）

```
long waist-length hair, loose beachy waves,
glossy and healthy shine, slight movement in breeze,
honey blonde with subtle caramel highlights,
center part, soft face-framing layers,
lived-in textured finish, editorial hair styling
```

### ショートボブ（クールビューティー）

```
blunt chin-length bob, pin-straight and sleek,
deep glossy black, minimal volume,
sharp cut ends, no bangs,
structured geometric shape, high shine finish,
professional salon quality
```

### ツインテール（アニメ・アイドル系）

```
high twin tails, ultra-long reaching waist,
perfectly styled with slight curl at ends,
bubblegum pink with gradient to white tips,
ribbon accessories at the base,
voluminous and bouncy, idol-style perfection
```

### ウルフカット（トレンド系）

```
wolf cut with heavy layers and curtain bangs,
shoulder-length with shaggy textured layers,
natural brunette with face-framing blonde highlights,
effortlessly tousled, slightly messy,
modern grunge aesthetic, editorial finish
```

### ツーブロックアンダーカット（ストリート系）

```
undercut sides with longer top section,
slicked back or textured pompadour styling,
natural black or deep brown,
high contrast between shaved sides and voluminous top,
urban streetwear aesthetic
```

### グラデーションカラー（AIアイドル向け）

```
ultra-long silky hair reaching hips,
pastel blue fading to soft lavender at tips,
perfectly straight with mirror shine,
slight natural movement, ethereal quality,
virtual idol aesthetic, fantasy hair
```

---

## 使い方

1. ユーザーが指定したヘアスタイルをカテゴリ（長さ・テクスチャ・カラー）に分解
2. 該当するキーワードを組み合わせて英語プロンプトを構築
3. 単体で使うか、`/realistic-portrait-prompt` や `/ai-portrait-situation` に組み込む
4. `/generate-image` に渡して生成

---

## 組み合わせ例

### 人物プロンプトへの組み込み

```
[realistic-portrait-promptのベース] + 
[hairstyle-prompt: long waist-length hair, loose beachy waves, honey blonde]
```

### generate-imageへの直接渡し

```bash
# ヘアスタイル単体でビジュアライゼーション
bash .claude/skills/generate-image/scripts/generate_image.sh \
  "close-up portrait, beautiful woman, long waist-length hair, loose beachy waves, honey blonde with caramel highlights, ultra-realistic, 8K"
```

---

## 対応ツール

| ツール | ヘアディテール | 色精度 |
|--------|-------------|--------|
| Grok Imagine | ◎ 極めて精密 | ◎ |
| NanoBanana 2 | ○ 良好 | ○ |
| Midjourney v7 | ◎ ファッション誌級 | ◎ |
| SDXL + Hair LoRA | ◎ アニメ系最強 | ◎ |
