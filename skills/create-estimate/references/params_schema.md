# 見積書パラメータ YAMLスキーマ

## 必須フィールド

| フィールド | 型 | 説明 |
|-----------|------|------|
| `client.company` | string | 宛先企業名（「御中」は自動付与） |
| `project_name` | string | 案件名 |
| `estimate.date` | string | 見積日（例: "2025/10/1"） |
| `estimate.number` | string | 見積No.（例: "am-001"） |
| `terms.payment` | string | 支払条件 |
| `terms.contract_period` | string | 契約期間 |
| `terms.delivery.date` | string | 納品日/検収日 |
| `terms.valid_until` | string | 有効期限 |
| `items` | list | 明細行（後述） |
| `notes` | list[string] | 備考（※番号は自動付与） |

## 任意フィールド

| フィールド | 型 | デフォルト | 説明 |
|-----------|------|-----------|------|
| `terms.delivery.label` | string | "納品日" | "検収日" に変更可 |
| `company.name` | string | "株式会社Algomatic" | 発行元会社名 |
| `company.zip` | string | "〒106-6224" | 郵便番号 |
| `company.address` | string | "東京都港区六本木3-2-1" | 住所1行目 |
| `company.address2` | string | "住友不動産六本木グランドタワー24階" | 住所2行目（省略可） |
| `company.tel` | string | "03-6823-3850" | 電話番号 |
| `discount` | object | null | 出精値引（後述） |
| `tax_rate` | number | 10 | 消費税率（%） |
| `output.filename` | string | - | 出力ファイル名（スキル側で参照） |

## items（明細行）

```yaml
items:
  - name: "項目名"        # 必須
    quantity: 0.3          # 必須: 数量
    unit: "人月"           # 必須: 単位
    unit_price: 4000000    # 必須: 単価
    amount: 1200000        # 任意: 省略時は quantity × unit_price で自動計算
```

## discount（出精値引）

```yaml
discount:
  name: "出精値引（理由）"  # 表示名
  amount: 1450000           # 正数で記載（表示時にマイナス）
```

省略またはコメントアウトすると値引行なし。

## 金額の自動計算

スクリプトが以下を自動計算する:
- 各明細行の `amount`（未指定時）= `quantity × unit_price`
- `小計` = 全明細行の合計 - discount.amount
- `消費税` = 小計 × tax_rate / 100
- `合計（税込）` = 小計 + 消費税

## 備考のフォントサイズ自動調整

| 備考行数 | フォントサイズ |
|---------|-------------|
| 4行以下 | 8.5pt |
| 5-6行 | 8pt |
| 7-8行 | 7.5pt |
| 9行以上 | 7pt |
