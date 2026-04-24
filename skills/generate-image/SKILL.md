---
name: generate-image
description: >
  Nano Banana 2を使って画像を生成する汎用スキル。
  「画像を生成して」「〜の画像を作って」などのリクエストに使用する。
allowed-tools: Bash, Read
argument-hint: "生成したい画像の説明（例: 夕焼けの富士山）"

# --- SkillNet 拡張 ---
category: content-generation
tags: [画像, AI生成, Gemini]
input:
  - type: text
    description: 生成したい画像の説明テキスト（プロンプト）
output:
  - type: image/png
    description: 生成された画像ファイル
requires:
  env: [GOOGLE_API_KEY]
  tools: [curl, jq]
related:
  similar_to: [generate-icon-image]
  compose_with: [am-slide-creator, project-to-visual]
---

# 汎用画像生成スキル（Nano Banana 2）

ユーザーの指示に基づいて、Nano Banana 2（Gemini 3.1 Flash Image）で画像を生成します。

## 使い方

```bash
bash .claude/skills/generate-image/scripts/generate_image.sh 'プロンプト' [出力ファイル名]
```

### 例

```bash
bash .claude/skills/generate-image/scripts/generate_image.sh '夕焼けの富士山、湖に映る逆さ富士'
```

ファイル名を指定する場合:

```bash
bash .claude/skills/generate-image/scripts/generate_image.sh '夕焼けの富士山' 'fuji_sunset.png'
```

## 手順

1. ユーザーのリクエストから画像生成用のプロンプトを組み立てる
2. スクリプトを実行する
3. 生成された画像を Read ツールで表示してユーザーに見せる
4. 画像は `output/images/` に保存される

## 前提条件

- `GOOGLE_API_KEY` が環境変数に export されていること
- `curl`、`jq` がインストールされていること
