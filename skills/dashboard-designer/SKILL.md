---
name: dashboard-designer
description: "データダッシュボードを行政品質・デジタル庁ガイドライン準拠で設計・実装するスキル。「ダッシュボードを作りたい」「KPIを可視化したい」「グラフを作りたい」「データビジュアライゼーション」「チャート設計」「アポドリの実績を見やすく」「社内データを可視化」「Recharts」「Chart.js」などのキーワードで積極的に使用すること。frontend-designスキルのデータビズ特化版として、アドホックなグラフ作成からプロ品質のダッシュボード設計まで対応する。"
---

# Dashboard Designer

デジタル庁「ダッシュボードデザインの実践ガイドブック」に基づいた、行政品質のデータビジュアライゼーション設計スキル。

元ネタ: @ota1200「デジタル庁のダッシュボードガイドブックをClaude Codeのスキルにした」

---

## このスキルが解決する問題

- 「なんとなく」でグラフ種類を選んでいる
- アドホックなグラフ作成に毎回時間をかけている
- デザインがバラバラで統一感がない
- データが多くて「何を伝えたいか」が不明確になる

---

## グラフ種類の選び方（デジタル庁ガイドライン）

### 目的別チャート選択フロー

```
「何を伝えたいか」で選ぶ:

比較したい
├── カテゴリ間の比較 → 棒グラフ（横棒 推奨）
├── 時系列の変化 → 折れ線グラフ
└── 少数カテゴリの構成比 → 棒グラフ（積み上げ）

割合・構成比を見せたい
├── 全体に占める割合 → 100%積み上げ棒グラフ
├── 少数（3つ以下）の構成 → 円グラフ（ドーナツ）※多用禁止
└── 多数の構成 → ツリーマップ

相関・分布を見せたい
├── 2変数の関係 → 散布図
├── 値の分布 → ヒストグラム / 箱ひげ図
└── 多変数の比較 → レーダーチャート ※ただし最終手段

地理情報
└── 地域差 → コロプレスマップ（色付き地図）
```

### やってはいけないグラフ選択

| NG | 理由 | 代替 |
|---|---|---|
| 円グラフを5分割以上 | 面積で大小が判断できない | 横棒グラフ |
| 3Dグラフ | 遠近感で値が歪んで見える | 平面グラフ |
| 2軸グラフの乱用 | 相関があるように見せてしまう | 別々のグラフ |
| 切り取られたY軸 | 差を誇張する | 0から始める |

---

## カラーパレット（デジタル庁7種）

### 用途別パレット

```css
/* 1. 定性的カラー（カテゴリ比較・混同しにくい） */
--cat-blue:   #0071BC;
--cat-orange: #E87722;
--cat-green:  #2CA02C;
--cat-red:    #D62728;
--cat-purple: #9467BD;
--cat-brown:  #8C564B;
--cat-gray:   #7F7F7F;

/* 2. 連続データ（ヒートマップ・数値の濃淡） */
/* 低値: 薄い → 高値: 濃い の単色グラデーション */
--seq-light: #EFF3FF;
--seq-mid:   #6BAED6;
--seq-dark:  #08306B;

/* 3. 発散データ（中央値を基準にした正負） */
--div-negative: #D62728;  /* 赤: 低い・悪い */
--div-neutral:  #F7F7F7;  /* 白: 中立 */
--div-positive: #0071BC;  /* 青: 高い・良い */

/* 4. アクセシブルカラー（色覚多様性対応） */
/* 赤-緑の同時使用を避け、上記のblue-redまたはblue-orangeを使う */
```

### カラー選択のルール

1. カテゴリ数が7以下 → 定性的カラーから順番に使う
2. 順位・濃度を表す → 連続データパレット
3. 目標比較（達成/未達）→ 発散データパレット（青/赤）
4. **1チャートに4色以上は使わない**

---

## チャートコンポーネントライブラリ

### React/TypeScript実装テンプレート

#### 横棒グラフ（最もよく使う）

```tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HorizontalBarChartProps {
  data: { label: string; value: number }[];
  title: string;
  color?: string;
  valueUnit?: string;
}

export const HorizontalBarChart = ({
  data,
  title,
  color = '#0071BC',
  valueUnit = ''
}: HorizontalBarChartProps) => {
  const sorted = [...data].sort((a, b) => b.value - a.value);

  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <ResponsiveContainer width="100%" height={data.length * 40 + 60}>
        <BarChart data={sorted} layout="vertical" margin={{ left: 120, right: 40 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tickFormatter={v => `${v}${valueUnit}`} />
          <YAxis type="category" dataKey="label" width={110} />
          <Tooltip formatter={(v: number) => [`${v}${valueUnit}`, title]} />
          <Bar dataKey="value" fill={color} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
```

#### 時系列折れ線グラフ

```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const TimeSeriesChart = ({
  data,        // { date: string; [series]: number }[]
  series,      // string[]  系列名の配列
  title,
  yAxisLabel
}: TimeSeriesChartProps) => {
  const colors = ['#0071BC', '#E87722', '#2CA02C', '#D62728'];

  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          {series.map((s, i) => (
            <Line key={s} type="monotone" dataKey={s}
              stroke={colors[i % colors.length]} strokeWidth={2} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
```

#### KPIカード（数値サマリー）

```tsx
interface KPICardProps {
  label: string;
  value: string | number;
  change?: number;       // 前期比（%）
  unit?: string;
  positive?: 'up' | 'down';  // 上昇が良いか悪いか
}

export const KPICard = ({ label, value, change, unit, positive = 'up' }: KPICardProps) => {
  const isGood = change ? (positive === 'up' ? change > 0 : change < 0) : null;

  return (
    <div className="kpi-card">
      <p className="kpi-label">{label}</p>
      <p className="kpi-value">{value}{unit && <span className="kpi-unit">{unit}</span>}</p>
      {change !== undefined && (
        <p className={`kpi-change ${isGood ? 'positive' : 'negative'}`}>
          {change > 0 ? '▲' : '▼'} {Math.abs(change)}%
        </p>
      )}
    </div>
  );
};
```

---

## ダッシュボードレイアウト設計

### 情報階層の原則

```
[ページ最上部] KPIカード（3〜5枚）
  → 「今何が起きているか」を一目で把握

[中段] メインチャート（1〜2個）
  → 「なぜそうなっているか」を説明

[下段] 詳細データ / サブチャート
  → 「どこを掘り下げるか」を探索
```

### グリッドシステム

```css
/* 12カラムグリッド推奨 */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
}

/* KPIカード: 3カラム × 4個 */
.kpi-card { grid-column: span 3; }

/* メインチャート: 8カラム */
.main-chart { grid-column: span 8; }

/* サイドバー統計: 4カラム */
.side-stats { grid-column: span 4; }
```

---

## アポドリ・社内KPIへの適用例

### アポドリダッシュボード構成案

```
[KPI行]
├── 総アポ数（今月）        ▲12% vs 先月
├── 商談化率               ▼3% vs 先月
├── パイプライン総額         ▲25% vs 先月
└── メール開封率             ▲8% vs 先月

[メインチャート]
└── ファネル別コンバージョン推移（折れ線・月別）

[詳細]
├── 業種別アポ獲得数（横棒グラフ）
└── 担当者別パフォーマンス（横棒・ランキング）
```

---

## 実装ステップ

### Step 1: データ確認

ユーザーから以下を確認:
1. どんなデータを可視化するか（CSVファイル / APIレスポンス / スプレッドシート）
2. 主要な「問い」は何か（「どの部門が一番成果を出しているか」など）
3. 見せる相手は誰か（経営陣 / 現場 / 外部）

### Step 2: グラフ選択

上記の「目的別チャート選択フロー」に従い、各データにベストなグラフ種類を提案。

### Step 3: コンポーネント実装

上記テンプレートをベースに、データ形式に合わせてカスタマイズ。

### Step 4: レイアウト統合

グリッドシステムを使い、情報階層に沿ったレイアウトで配置。

---

## 関連スキル

- **Webフロントエンド実装**: `/frontend-design`
- **デザイン品質チェック**: `/audit` `/critique`
- **データ処理（Excel/CSV）**: `/xlsx`
- **レイアウト調整**: `/arrange`
