---
name: x-article-writer
description: X（Twitter）の長文記事・スレッドを自動執筆する。テーマ指定だけで、企画→調査→執筆→推敲の4層構造で高品質なX記事を生成。「X記事書いて」「Xの長文」「ツイート記事」「X記事を自動化」などのキーワードで使用する。
---

# X記事自動執筆スキル

X（Twitter）の長文記事・スレッドを、テーマ指定だけで自動生成するスキル。
note記事（/note-knowledge）やエモ系記事（/nyusha-entry）とは異なり、X記事特有の構成・文字数制限・バズ要素を組み込む。

---

## 4層構造ワークフロー

### Layer 1: 企画（テーマ設計）
1. ユーザーからテーマ・キーワードを受け取る
2. 以下を決定する：
   - **記事タイプ**: 単独ポスト / スレッド / 長文記事
   - **ターゲット**: 誰に向けた記事か
   - **フック**: 最初の1文で読者の手を止める要素
   - **CTA**: 読後に何をしてほしいか

### Layer 2: 調査（情報収集）
1. WebSearchでテーマに関する最新情報を収集
2. 関連するX上のトレンド・議論を把握
3. 數字・事例・引用など根拠となる情報を整理
4. 差別化ポイント（他の投稿と何が違うか）を明確化

### Layer 3: 執筆（ドラフト作成）
記事タイプに応じたフォーマットで下書きを作成（後述の構成パターン参照）

### Layer 4: 推敲（品質チェック）
チェックリストに基づいて最終調整を行い、コードブロックで出力

---

## 記事タイプ別の構成パターン

### パターンA: 単独ポスト（〜280文字）

短く刺さる1投稿。情報密度を最大化する。

```
[フック: 意外性のある事実 or 問いかけ]

[本文: 核心を2〜3文で]

[CTA or 余韻を残す締め]
```

### パターンB: スレッド（3〜7ツイート）

1つのテーマを段階的に掘り下げる。

```
【1/N】フック＋テーマ提示
  → 最初の1文が最重要。タイムラインで手を止めさせる

【2/N】背景・問題提起
  → なぜこのテーマが今重要なのか

【3/N〜(N-1)/N】本論
  → 具体例・数字・体験を交えた考察
  → 1ツイートにつき1メッセージの原則

【N/N】まとめ＋CTA
  → 「いいね・RT」ではなく、読者への問いかけで締める
```

### パターンC: X長文記事（500〜2000文字）

note記事に近い深さをX上で展開する。

```
■ タイトル（太字 or 【】で目立たせる）

■ 導入（2〜3文）
  → フック＋「この記事で何がわかるか」

■ 本文（見出し付きで構造化）
  → H2相当の区切りを入れる
  → 箇条書きと段落を混ぜる
  → 具体例・数字は必ず入れる

■ まとめ
  → 3行以内で要点を凝縮
  → 読者への問いかけ or 行動喚起
```

---

## 文体ルール（國光俊樹スタイル）

### 基本
- 「です/ます」調ベース
- 断定（「〜だと思っています」）と問いかけ（「〜ではないでしょうか」）を混ぜる
- 丸括弧で本音・補足を挟む: `(とはいえこれは個人の見解ですが)`

### X記事特有のルール
- **冒頭3行が命**: タイムラインで「もっと見る」を押させる構成
- **数字で引きつける**: 「3つの理由」「10倍にする方法」「実績〇〇件」
- **体験ベース**: 「やってみた」「〜して分かったこと」が強い
- **専門用語は噛み砕く**: エンジニア以外にもわかる言葉選び
- **絵文字は控えめ**: 使うなら1〜2個まで。多用は避ける

### 避けるべきパターン
- 「今日は〇〇についてお話しします」→ 退屈な書き出し
- 「いかがでしたか？」→ 安っぽい締め
- 情報の羅列だけで自分の考察がない
- 「〜と思います」の連発

---

## フック文のテンプレート

以下のパターンから選んで冒頭を作る：

1. **逆説型**: 「〇〇すべき、と言われているが、実は逆だった」
2. **数字型**: 「〇〇を△△したら、結果が□□倍になった」
3. **告白型**: 「正直に言うと、〇〇は失敗だった」
4. **問いかけ型**: 「〇〇について考えたことはありますか？」
5. **驚き型**: 「〇〇が△△だと知ったとき、衝撃を受けた」
6. **リスト型**: 「〇〇で成果を出すために必要な3つのこと」

---

## 出力フォーマット

### パターンA・B（単独ポスト・スレッド）→ コードブロック出力

```
## X記事（スレッド形式）

---
テーマ: [テーマ]
タイプ: スレッド (N投稿)
ターゲット: [想定読者]
---

【投稿1】
[本文]

---

【投稿2】
[本文]

---
...
```

### パターンC（X長文記事）→ HTMLファイル出力（IMPORTANT）

X Articlesはリッチテキストエディタ（WYSIWYG）であり、Markdownは解釈されない。
見出し・小見出しを保持してペーストするには、**必ずHTMLファイルで出力する**。

**出力先**: `~/Desktop/x-article-[テーマの英語略称].html`

**HTMLテンプレート構造**:
```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[記事タイトル]</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #1a1a2e; color: #e0e0e0;
    font-family: -apple-system, BlinkMacSystemFont, 'Hiragino Sans', 'Yu Gothic', sans-serif;
    line-height: 1.8; padding: 40px 20px;
  }
  .container { max-width: 680px; margin: 0 auto; }
  .copy-btn {
    display: block; width: 100%; max-width: 320px;
    margin: 0 auto 40px; padding: 14px 24px;
    background: #4a90d9; color: #fff; border: none;
    border-radius: 8px; font-size: 16px; font-weight: bold;
    cursor: pointer; transition: background 0.2s;
  }
  .copy-btn:hover { background: #357abd; }
  .copy-btn.copied { background: #27ae60; }
  #article-content h1 {
    font-size: 22px; font-weight: bold;
    margin-top: 32px; margin-bottom: 16px;
    padding-bottom: 8px; border-bottom: 1px solid #444; color: #ffffff;
  }
  #article-content h2 {
    font-size: 18px; font-weight: bold;
    margin-top: 24px; margin-bottom: 12px; color: #ffffff;
  }
  #article-content p {
    font-size: 15px; margin-bottom: 16px; color: #e0e0e0;
  }
</style>
</head>
<body>
<div class="container">
  <button class="copy-btn" onclick="copyArticle()">記事全体をコピー</button>
  <div id="article-content">
    <h1>[見出し]</h1>
    <p>[本文段落]</p>
    <!-- 小見出しが必要な場合は <h2> を使用 -->
    <!-- タイトルはX Articles側で入力するため、HTML内には含めない -->
  </div>
</div>
<script>
function copyArticle() {
  const content = document.getElementById('article-content');
  const range = document.createRange();
  range.selectNodeContents(content);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('copy');
  selection.removeAllRanges();
  const btn = document.querySelector('.copy-btn');
  btn.textContent = 'コピーしました!';
  btn.classList.add('copied');
  setTimeout(() => {
    btn.textContent = '記事全体をコピー';
    btn.classList.remove('copied');
  }, 2000);
}
</script>
</body>
</html>
```

**HTML記事コンテンツのルール**:
- タイトル: X Articles側で別途入力するため、HTML内では `<h1>` をタイトルに使わない
- 見出し: `<h1>` タグ（X Articlesで「見出し」として認識される）
- 小見出し: `<h2>` タグ（X Articlesで「小見出し」として認識される）
- 本文: `<p>` タグ（1段落ずつ分離。3〜4行ごとに区切る）
- 改行のみ: `<br>` タグ
- Markdownの `##` や `**` は使わない — すべてHTMLタグで記述
- コピーボタンで `document.execCommand('copy')` を使い、リッチテキストとしてクリップボードに送る
- ユーザーはコピー後、Xの記事エディタにペーストすれば見出しが保持される

---

## チェックリスト

- [ ] 冒頭3行でタイムラインの手を止められるか？
- [ ] 1投稿1メッセージの原則を守っているか？
- [ ] 数字・具体例・体験が含まれているか？
- [ ] 自分ならではの考察・洞察があるか？
- [ ] 「とはいえ」の謙虚さが入っているか？
- [ ] CTAまたは読者への問いかけで締めているか？
- [ ] X記事の文字数制限を守っているか？
- [ ] 末尾にAlgomatic/アポドリ/Xアカウントのリンクを入れたか？

---

## 末尾リンク（必要に応じて付与）

```
▼ Algomatic
https://algomatic.jp

▼ アポドリ
https://apodori.ai

▼ X
https://twitter.com/ku_ni_29
```
