---
name: sparkle-design
description: "GoodpatchのSparkle Design Systemを参照してUIデザインを行う。UIコンポーネントの設計、デザイントークンの適用、アクセシビリティ対応に使用する。「UIデザイン」「コンポーネント設計」「デザインシステム」「Sparkle」「ボタン設計」「フォーム設計」「カラー設計」などのキーワードで使用する。React実装やFigmaでのデザイン時にも積極的に参照すること。"
---

# Sparkle Design System リファレンス

GoodpatchのSparkle Design Systemに基づいたUIデザインガイドライン。
公式: https://sparkle-design.goodpatch.com/

> Sparkleは企業のデザインシステムとしてだけでなく、あらゆるプロジェクトのデザイン基盤として利用可能。Figmaライブラリ、Reactコンポーネント、Figmaプラグインとして提供されている。

---

## カラーシステム（4層トークン構造）

Sparkleのカラーは4層のトークン階層で設計されている。

### Layer 1: Primitive Tokens
ベースカラー。10色のカラースキーム × 10段階のトーン（50-900）。
- Black & White
- Gray
- 8つのアクセントカラー（Blue, Red, Green, Orange, Yellow, Purple, Pink, Teal）

### Layer 2: Semantics Tokens
文脈に基づくカラー。Primitive Tokensを継承。
- **Neutral**: 背景、テキスト、アイコン、ボーダー
- **Accent**: Primary、Secondary
- **Additional**: Info、Success、Warning、Negative

### Layer 3: Component Tokens
コンポーネント固有のカラー。強度レベル（low, middle, high）で使い分け。

### Layer 4: Color Tokens
最終的なコンポーネント実装で使用される値。

> 具体的なHEXコードはFigmaライブラリまたはReactパッケージを参照。
> Figma: https://sparkle-design.goodpatch.com/ の Assets セクション

---

## コンポーネント一覧と設計ルール

### Button

**バリエーション（3種）:**
| バリアント | 用途 | 制約 |
|---|---|---|
| **Solid** | 最も目立つ主要アクション | 1画面に1つまで |
| **Outline** | 中程度の重要度のセカンダリアクション | ボーダースタイル |
| **Ghost** | 補助的・入れ子のアクション | テキストのみ |

**サイズ（3種）:**
| サイズ | 高さ | 用途 |
|---|---|---|
| sm | 32px | 狭いスペース、低重要度 |
| md | 40px | デフォルト、最も一般的 |
| lg | 48px | 重要なアクションの強調（控えめに使用） |

**カラーテーマ:**
- **Primary**（Blue）: 必須タスクの実行
- **Neutral**（Gray）: デフォルト、視覚的にニュートラル
- **Negative**（Red）: 破壊的アクション

**状態（6種）:**
Enable / Hover / Active / Focus / Disabled / Loading

**Do's:**
- ボタングループではPrimary Solidを末尾に配置
- ラベルは動詞でアクション指向（「保存する」、「OK」ではなく）
- 1画面にSolid Primaryは1つまで

**Don'ts:**
- バリデーションエラーの表示にDisabledを使わない
- 複数行ラベルにしない
- ラベルに絵文字や句読点を使わない
- ボタングループの先頭にPrimaryを置かない

**追加機能:**
- prefix/suffixアイコン対応
- 幅オプション: auto / fixed / full-width
- 1秒の送信遅延（連打防止）

### その他の主要コンポーネント

以下のコンポーネントが利用可能（詳細は公式ガイドラインを参照）:

**入力系:**
- Checkbox, Radio, Switch, Toggle
- TextInput, TextArea, Select
- DatePicker, TimePicker
- Slider, NumberInput

**データ表示系:**
- Table, Card, List
- Badge, Tag, Avatar
- Stat, Progress

**ナビゲーション系:**
- Breadcrumb, Pagination, Tabs
- Menu, Sidebar, Navbar
- Link, Stepper

**フィードバック系:**
- Dialog, Modal, Drawer
- Toast, Alert, Banner
- Tooltip, Popover

**レイアウト系:**
- Container, Grid, Stack
- Divider, Spacer

---

## アクセシビリティ

Sparkleはアクセシビリティをファウンデーションレベルで組み込んでいる。
- コントラスト比の基準あり
- キーボードナビゲーション対応
- Focus状態のリングインジケータ
- スクリーンリーダー対応のaria属性

---

## テーマ

Sparkleはテーマ対応のデザインシステム。
- Figmaプラグイン「Theme Settings」でテーマカスタマイズ可能
- Semantic Tokens層でテーマの切り替えが行われる
- ライト/ダーク切り替えもサポート

---

## 実装リソース

| リソース | URL | 用途 |
|---|---|---|
| 公式サイト | https://sparkle-design.goodpatch.com/ | ガイドライン全文 |
| Figmaライブラリ | Assetsセクションから取得 | デザインアセット |
| Reactコンポーネント | Assetsセクションから取得 | 実装コード |
| Figmaプラグイン | Theme Settings | テーマカスタマイズ |

---

## 使い方

UIコンポーネントを設計・実装する際は、以下の順序で参照する:

1. **該当コンポーネントのガイドライン**を確認（バリアント、サイズ、状態）
2. **Do's/Don'ts**に従う
3. **カラーテーマ**をSemantic Tokensレベルで適用
4. **アクセシビリティ**基準を満たしているか確認
5. 不明な点は公式サイト（https://sparkle-design.goodpatch.com/guidelines/components/[コンポーネント名]）を参照

各コンポーネントの詳細仕様が必要な場合は、WebFetchで公式ガイドラインの該当ページを読み込むこと。
