---
name: portrait-prompt
description: >
  人物画像生成プロンプト集。シチュエーション別・ファッション別・リアル人物向けの
  構造化プロンプトを提供。Grok Imagine / NanoBanana2 対応。R18含む。
  /generate-image または Grok Imagineに渡して使う。
allowed-tools: Bash, Read
argument-hint: "人物・シチュエーション・スタイルの指定（例: 韓国系インフルエンサー, キャバ嬢風, ファッション誌, AIアイドル）"

category: content-generation
tags: [画像, AI生成, プロンプト, 人物, リアル, ファッション, R18]
input:
  - type: text
    description: 人物イメージ・シチュエーション・衣装・用途の説明
output:
  - type: text
    description: 最適化された画像生成プロンプト（英語）
related:
  similar_to: [hairstyle-prompt, generate-image]
  compose_with: [hairstyle-prompt, generate-image]
---

# 人物画像プロンプト集（portrait-prompt）

シチュエーション・ファッション・リアル人物の3軸で、魅力的な人物画像を生成するプロンプトを構築します。
`/hairstyle-prompt` と組み合わせると、より精密な指定が可能。

---

## 使い方フロー

```
1. 以下のカテゴリから用途を選ぶ
2. テンプレートをカスタマイズ
3. 必要なら /hairstyle-prompt のプロンプトを追加
4. /generate-image または Grok Imagine に渡す
```

---

## カテゴリ A：シチュエーション別

### キャバ嬢・ナイトクラブ

```
Ultra-realistic photo, 8K, RAW, hyper-detailed,
beautiful Japanese woman, 20s, long black hair,
cabaret hostess at luxury nightclub,
shimmering sequin dress, deep neckline, elegant jewelry,
alluring smile, holding champagne glass,
soft booth lighting, blurred club background,
professional photography, editorial quality
```

### ライブ配信 / 配信者

```
Cinematic photo, ultra-realistic, 8K,
cute Japanese streamer girl, 18-25 years old,
live streaming setup, wearing casual cute outfit,
natural smile, looking directly at camera,
ring light illumination, gaming setup background,
bokeh effect, warm color grade
```

### SNSインフルエンサー（セルフィー）

```
Ultra-realistic vertical selfie photo, iPhone quality,
20-22 year old Korean influencer woman,
perfect glass skin, large almond eyes, plump glossy lips,
trendy casual outfit, minimal jewelry,
natural smile, slight head tilt, looking directly at camera,
bright airy room, ring light reflection visible in eyes,
8K quality, hyperrealistic, editorial Instagram aesthetic
```

### オフィス / キャリアウーマン

```
Professional photography, 8K,
beautiful businesswoman, late 20s,
sophisticated office attire, blazer, pencil skirt,
confident posture, subtle smile,
modern office background, clean lighting,
corporate portrait style
```

### コスプレ / アニメ系

```
Hyper-realistic cosplay photo, studio quality,
young Japanese woman, accurate anime costume,
detailed costume craftsmanship,
character-accurate expression and pose,
gradient background, professional cosplay photography,
sharp details, dramatic lighting
```

---

## カテゴリ B：ファッション系

### プロンプト構造

```
[クオリティ] + [人物] + [衣装詳細：素材・シルエット・色・ディテール] + [スタイリング] + [背景] + [照明]
```

### 衣装キーワード辞書

**素材**: tweed / silk satin / chunky knit / raw denim / patent leather / sheer organza  
**シルエット**: oversized / fitted / A-line / bodycon / wrap / cropped / maxi  
**ディテール**: double-breasted / puff sleeve / cut-out / embroidered / ruched / pleated

### ツイードブレザースタイル

```
Ultra-realistic fashion editorial photo, 8K, RAW,
beautiful young woman, slim figure,
oversized double-breasted cream tweed blazer with gold buttons,
matching wide-leg tweed trousers, silk blouse underneath,
pearl accessories, pointed-toe heeled mules,
confident pose, direct gaze,
clean minimalist studio background,
soft diffused lighting, Vogue editorial style
```

### ストリートカジュアル

```
Street style photography, hyper-realistic, 8K,
trendy Asian woman in her 20s,
oversized graphic hoodie, high-waist cargo pants, chunky sneakers,
layered accessories, baseball cap,
urban street background, Tokyo Harajuku aesthetic,
natural daylight, candid fashion photo
```

### フォーマル / ガラ

```
Luxury fashion editorial, ultra-realistic, 8K,
elegant woman, 25-35 years old,
floor-length silk gown with intricate beading, deep back cut,
statement jewelry, strappy heels,
glamorous ballroom or rooftop setting,
dramatic cinematic lighting, golden hour
```

---

## カテゴリ C：リアル人物（高精細）

### 人物特徴キーワード辞書

**人種系統**  
- 韓国系: `Korean, k-beauty features, double eyelid, high cheekbones`  
- 日本系: `Japanese, soft features, porcelain skin`  
- 混血系: `mixed heritage, exotic features`

**顔・目**  
- `almond-shaped eyes / large doe eyes / bedroom eyes`  
- `plump lips / pouty lips / glossy lips`  
- `flawless skin / glass skin / dewy skin`

### バーチャルタレント / AIアイドル

```
Hyper-realistic portrait, 8K, studio quality,
beautiful young Asian woman, 19-22 years old,
idol-like features: large bright eyes, small face, perfect skin,
pastel pink or gradient hair, idol-style makeup,
cute idol outfit or casual street fashion,
bright cheerful expression, V-sign or heart pose,
clean white or gradient background,
professional idol photography, soft glamour lighting
```

### ライフスタイルインフルエンサー

```
Lifestyle photography, ultra-realistic, 8K RAW,
beautiful Korean or Japanese woman, early 20s,
natural beauty with minimal makeup, dewy glowing skin,
casual chic outfit: oversized shirt, high-waist jeans,
relaxed confident pose, genuine candid smile,
café or aesthetic interior background,
warm natural light, film-grade color grading
```

### R18 / セクシャル系（Grok Imagine向け）

```
Ultra-realistic photo, adult content,
beautiful woman, 22-28 years old, [人種],
[体型・特徴],
[衣装: lingerie / swimwear / artistic nude],
[ポーズ・表情],
[背景: bedroom / beach / studio],
photorealistic, high resolution
```

*注: Grok Imagineを使用。年齢は必ず18歳以上の設定。実在人物は不可。*

---

## hairstyle-promptとの組み合わせ

ヘアスタイルを精密に指定したいときは `/hairstyle-prompt` のプロンプトをそのまま追記:

```
[portrait-promptのベース],
[hairstyle-promptの出力: long waist-length hair, loose beachy waves, honey blonde]
```

---

## 推奨ツール

| ツール | リアル人物 | ファッション | R18 | API |
|--------|-----------|------------|-----|-----|
| Grok Imagine | ◎ | ○ | ○ | △ |
| NanoBanana 2 | ○ | ○ | △ | ◎ |
| Midjourney v7 | ◎ | ◎ | △ | △ |
| SDXL + LoRA | ○ | ○ | ◎ | ◎ |
