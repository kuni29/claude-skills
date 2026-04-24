---
name: am-slide-creator
description: >
  Algomaticスタイルのスライド（PPTX）を作成・編集するスキル。
  テンプレートベースの編集とPptxGenJSによる新規作成に対応。
  「スライドを作って」「プレゼン作成」「PPTX編集」「slide」でトリガー。
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Agent, AskUserQuestion
user-invocable: true

# --- SkillNet 拡張 ---
category: content-generation
tags: [スライド, PPTX, プレゼン, Algomatic]
input:
  - type: text
    description: スライド内容（Markdown、テキスト、または画像素材）
output:
  - type: application/pptx
    description: Algomaticスタイルのスライドファイル
requires:
  env: []
  tools: [uv, soffice, pdftoppm]
related:
  similar_to: []
  compose_with: [generate-image, generate-icon-image]
---

# Algomaticスライド作成スキル

Algomaticのデザインフォーマットに準拠したPPTXスライドを作成・編集する。
テンプレートベースの編集（既存PPTXの改修）と、PptxGenJSによるスクラッチ作成の2モードに対応。

## 起動時ガイダンス

スキルがトリガーされたら、作業を始める前に以下のガイダンスをユーザーに表示する:

---

**スライドを作成します。**

まず、どの方法で始めますか？

- **テンプレート編集** — Algomaticテンプレート（11種レイアウト）をベースに作成します
- **新規作成（PptxGenJS）** — テンプレートなしでゼロからスライドを作成します
- **既存PPTXの修正** — 既にあるPPTXファイルのテキストやレイアウトを修正します

**推奨ワークフロー（テンプレート編集の場合）:**
1. Markdownで内容を整理
2. Planモードで構成を設計（テンプレートレイアウト選択）
3. 自動作成（展開→編集→クリーン→パック→QA）

---

ガイダンスを表示した後、ユーザーの選択に応じて該当モードに進む。
ユーザーが既にMarkdownや具体的な指示を添付している場合はガイダンスを省略して直接該当モードに入る。

## 利用可能なアセット

| アセット | パス | 説明 |
|---------|------|------|
| テンプレートPPTX | `<this-skill-path>/assets/template.pptx` | 11種レイアウトのマスターテンプレート |
| テンプレートPDF | `<this-skill-path>/assets/template.pdf` | テンプレートのPDFプレビュー |
| サムネイル一覧 | `<this-skill-path>/assets/thumbnails.jpg` | テンプレート全スライドのサムネイルグリッド |
| テンプレート仕様 | `<this-skill-path>/references/template-slides.md` | 全11種レイアウトの詳細仕様 |
| 編集ガイド | `<this-skill-path>/references/editing.md` | テンプレートベース編集の詳細手順 |
| PptxGenJSガイド | `<this-skill-path>/references/pptxgenjs.md` | スクラッチ作成の詳細チュートリアル |

## スクリプト一覧

全スクリプトは `uv run` 経由で実行する。

| スクリプト | コマンド | 用途 |
|-----------|---------|------|
| thumbnail.py | `uv run <this-skill-path>/scripts/thumbnail.py input.pptx` | サムネイルグリッド生成 |
| unpack.py | `uv run <this-skill-path>/scripts/office/unpack.py input.pptx unpacked/` | PPTX展開・XML整形 |
| add_slide.py | `uv run <this-skill-path>/scripts/add_slide.py unpacked/ slide2.xml` | スライド複製・追加 |
| clean.py | `uv run <this-skill-path>/scripts/clean.py unpacked/` | 孤立スライド/メディア清掃 |
| pack.py | `uv run <this-skill-path>/scripts/office/pack.py unpacked/ output.pptx --original input.pptx` | 再パック＋バリデーション |
| soffice.py | `uv run <this-skill-path>/scripts/office/soffice.py --headless --convert-to pdf output.pptx` | LibreOffice経由でPDF変換 |
| validate.py | `uv run <this-skill-path>/scripts/office/validate.py unpacked/` | XMLスキーマ検証 |

## ワークフロー: テンプレート編集モード

### Step 1: コンテンツ準備（Markdown作成）

ユーザーの指示をもとにMarkdownで内容を整理する。以下を含める:
- 各スライドに載せるテキスト（タイトル、本文、箇条書き）
- 使用するデータや数値
- 必要な図表・画像の説明

### Step 2: 構成設計（Planモード推奨）

1. テンプレートのサムネイルを確認:
   - `<this-skill-path>/assets/thumbnails.jpg` を Read で表示
   - 詳細仕様は `<this-skill-path>/references/template-slides.md` を参照

2. 各コンテンツに最適なレイアウトを選択:

| 伝えたい内容 | 推奨レイアウト |
|-------------|---------------|
| 資料の顔・第一印象 | スライド1（表紙） |
| 前回からの経緯と今日のゴール | スライド2（振り返りと目的） |
| 資料全体の構成を提示 | スライド3（アジェンダ） |
| セクションの切り替え | スライド4（セクション区切り） |
| 課題や問題点を列挙して訴求 | スライド5（課題提起） |
| 1つのテーマを図解＋詳細解説 | スライド6（1トピック深掘り） |
| 2つの案やテーマを対比 | スライド7（2トピック比較） |
| 3つの案やテーマを並列提示 | スライド8（3トピック並列） |
| 複数項目を複数軸で定量比較 | スライド9（表パターン） |
| 時系列のタスク計画を共有 | スライド10（スケジュール） |
| 発表の締め | スライド11（白紙/エンド） |

3. スライド順序と各スライドの内容をマッピング

**注意**: 同じレイアウトの繰り返しを避け、多様なレイアウトを使うこと。

### Step 3: スライド自動作成

`<this-skill-path>/references/editing.md` の手順に従って作成する。概要:

1. **テンプレート分析**: `thumbnail.py` と `markitdown` でレイアウト確認
2. **展開**: `unpack.py` でPPTXをXMLに展開
3. **構造変更**: `add_slide.py` でスライド複製、`presentation.xml` で並べ替え・削除
   - **構造変更は全てサブエージェント投入前に完了すること**
4. **コンテンツ編集**: 各 `slide{N}.xml` のテキストを差し替え
   - **サブエージェントで並列編集可能**（スライドは独立したXMLファイル）
5. **クリーン**: `clean.py` で孤立ファイル除去
6. **パック**: `pack.py` で再パック＋バリデーション

### Step 4: QA（必須）

**問題があることを前提に検査する。**

#### コンテンツQA
```bash
uv run python -m markitdown output.pptx
# プレースホルダー残りチェック
uv run python -m markitdown output.pptx | grep -iE "xxxx|lorem|ipsum|this.*(page|slide).*layout"
```

#### ビジュアルQA（サブエージェント必須）
```bash
uv run <this-skill-path>/scripts/office/soffice.py --headless --convert-to pdf output.pptx
pdftoppm -jpeg -r 150 output.pdf slide
```

生成されたスライド画像をサブエージェントに渡し、以下を検査:
- 要素の重なり（テキストがシェイプを貫通等）
- テキストのはみ出し・切り詰め
- 要素間の余白不足（< 0.3"）
- スライド端からの余白不足（< 0.5"）
- コントラスト不足（薄い文字、暗背景の暗アイコン等）
- プレースホルダーの残り

#### 検証ループ
1. 生成 → 画像変換 → 検査
2. 問題リスト作成（問題なしなら再度精査）
3. 修正
4. **修正影響のあるスライドを再検証**
5. 全パスで問題なしになるまで繰り返す

### Step 5: 納品（PDF化・クリーンアップ）

QAが完了したら、最終成果物を整理する。

```bash
# PDF変換
uv run <this-skill-path>/scripts/office/soffice.py --headless --convert-to pdf output.pptx
# 出力先がカレントディレクトリになるため、スライドディレクトリに移動
mv output.pdf output/slides/<project-name>/

# 作業ディレクトリのクリーンアップ
rm -rf unpacked/                    # 展開済みXMLは不要
rm -f output/slides/<project-name>/thumbnails.jpg  # サムネイルはQA用なので削除可

# QA用の一時画像も削除
rm -f slide-*.jpg
```

最終的なディレクトリ構成:
```
output/slides/<project-name>/
├── <project-name>.pptx   # 最終成果物
└── <project-name>.pdf    # PDF版
```

## ワークフロー: PptxGenJS新規作成モード

テンプレートなしでゼロからスライドを作成する場合。
`<this-skill-path>/references/pptxgenjs.md` を読み、手順に従う。

```bash
npm install pptxgenjs
# アイコンを使う場合
npm install react react-dom react-icons sharp
```

Node.jsスクリプトを作成してスライドを生成する。

## インフォグラフィックスエリアの扱い

テンプレートの一部レイアウト（スライド5〜8）には、図解・グラフ・画像を配置するためのコンテンツエリア（白背景・枠線付き）がある。このエリアにプレーンテキストを無理やり流し込むのではなく、以下の方針で対応:

1. **構造化データ → 図形グリッドに差し替え**: 表・マトリクス・内訳など構造化できるデータは、矩形シェイプのグリッド配置（スライド9の表パターンを参考）に置き換える
2. **図解・チャート → 画像に差し替え**: フロー図・アーキテクチャ図・グラフなど、XMLの図形だけでは表現が困難な内容は、外部で作成した画像を挿入する方が望ましい旨をユーザーに提案する
3. **テキストのみの場合 → レイアウト自体を変更**: どうしてもテキストしかない場合は、コンテンツエリアを削除してテキストボックス（accent3背景）に差し替えるか、別のレイアウト（スライド2の2カラム等）の採用を検討する

**やってはいけないこと:**
- コンテンツエリアにプレーンテキストの箇条書きをそのまま流し込む
- 本来図解が入るべきエリアを空白のまま残す

## デザイン規約（テンプレート準拠）

| 要素 | 仕様 |
|------|------|
| スライドサイズ | ワイドスクリーン 16:9（9144000 x 5143500 EMU） |
| フォント | Noto Sans JP |
| メインカラー（dk2） | ダークネイビー — タイトルバー、セクション見出し |
| テキスト色（lt1） | ホワイト — ダーク背景上のテキスト |
| コンテンツ背景色（accent3） | ライトブルー — 本文ボックス、データセル |
| 余白 | スライド端から最低270000 EMU（約0.3"） |
| フッター | 左下「© Algomatic Inc.」、右下にページ番号 |

## 生成物の管理

- PDF・サムネイル画像などの生成物は削除せずに残す
- QA用の一時ファイル（pdftoppmで生成したスライド画像等）はQA完了後に削除してよい

## 前提条件

- **Python 3.13+** + **uv** — スクリプト実行に必要
- **Node.js 18+** — PptxGenJSモードで使用
- **LibreOffice** (`soffice`) — PDF変換に必要
- **Poppler** (`pdftoppm`) — スライド画像変換に必要
- 依存不足が判明した場合のみ、ユーザーにインストールを提案する
