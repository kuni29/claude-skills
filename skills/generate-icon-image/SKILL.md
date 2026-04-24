---
name: generate-icon-image
description: >
  Nano Banana 2を使って、シンプルな線画アイコンイラスト（青・グレー・白背景）を生成する。
  「アイコンイラストを作って」「線画イラストを生成して」「ソコスト風のイラストを作って」などのリクエストに使用する。
allowed-tools: Bash, Read
argument-hint: "描きたい被写体の説明（例: パソコンで作業する人）"

# --- SkillNet 拡張 ---
category: content-generation
tags: [画像, アイコン, 線画, AI生成, Gemini]
input:
  - type: text
    description: 描きたい被写体の説明テキスト
output:
  - type: image/png
    description: シンプルな線画アイコンイラスト画像
requires:
  env: [GOOGLE_API_KEY]
  tools: [curl, jq]
related:
  similar_to: [generate-image]
  compose_with: [am-slide-creator, project-to-visual]
---

# アイコンイラスト生成スキル（Nano Banana 2）

ユーザーの指示に基づいて、Nano Banana 2（Gemini 3.1 Flash Image）でシンプルな線画アイコンイラストを生成します。

## スタイル特徴

- 手描き風の細い線画、一定の線幅
- フラット塗り（グラデーション・影なし）
- カラーパレット: くすんだ青（#5B8BD4）+ ライトグレー（#B0B0B0）+ 白背景
- デフォルメされたシンプルな人物・オブジェクト
- 余白多め、軽やかで親しみやすい雰囲気
- 日本のストックイラスト（ソコスト等）に近いテイスト
- テキスト・ラベル・キャプション・ウォーターマークは一切なし（純粋なイラストのみ）

## 使い方

```bash
bash .claude/skills/generate-icon-image/scripts/generate_icon_image.sh '被写体の説明' [出力ファイル名]
```

### 例

```bash
bash .claude/skills/generate-icon-image/scripts/generate_icon_image.sh 'パソコンで作業する人'
bash .claude/skills/generate-icon-image/scripts/generate_icon_image.sh '握手するビジネスマン' 'handshake.png'
```

## 手順

1. ユーザーのリクエストから被写体の説明を組み立てる（スタイル指定はスクリプトが自動付与）
2. スクリプトを実行する
3. 生成された画像を Read ツールで表示してユーザーに見せる
4. 画像は `output/icons/` に保存される

## 前提条件

- `GOOGLE_API_KEY` が環境変数に export されていること
- `curl`、`jq` がインストールされていること
