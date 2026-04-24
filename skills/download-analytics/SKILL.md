---
name: download-analytics
description: X アナリティクスの概要 CSV（7D）を playwright-cli でダウンロードし、日付プレフィックス付きでリネームする。
allowed-tools: Bash(playwright-cli:*), Bash(mv:*), Read
---

# download-analytics: X アナリティクス CSV ダウンロード

playwright-cli を使って X アナリティクス（概要タブ・7D）の CSV をダウンロードし、期間が分かるファイル名にリネームする。

## トリガー

`/download-analytics` または「アナリティクスの CSV をダウンロードして」等の指示。

## 前提条件

- playwright-cli がインストール済みであること（未インストールの場合 `npx playwright-cli` で代替可能）
- X にログイン済みの永続プロファイルがあること（初回は手動ログインが必要）
- ブラウザ操作中は手動でブラウザを触らないこと（ref ID がずれる原因になる）

## 手順

### Step 0: ブラウザセッション確認

`playwright-cli list` で既存セッションを確認する。

- **セッションあり** → そのまま Step 1 へ
- **セッションなし** → 以下で起動:

```bash
playwright-cli open https://x.com --persistent --headed
```

ログインページにリダイレクトされた場合（ページタイトルに「ログイン」または「Log in」を含む）:
1. ユーザーに「ブラウザ上で手動ログインしてください」と案内する
2. ログイン完了の報告を待つ
3. `playwright-cli snapshot` でログイン状態を確認してから Step 1 へ

### Step 1: アナリティクスページに移動

```bash
playwright-cli goto https://x.com/i/account_analytics
```

ページタイトルに「アナリティクス」または「Analytics」が含まれることを確認する。

**失敗時**:
- ページタイトルが「ログイン」を含む → Step 0 のログインフローに戻る
- タイムアウトした場合 → 5 秒後に 1 回リトライ。再度失敗した場合はユーザーに報告して終了

### Step 2: 7D ボタンをクリック

1. スナップショットを取得する:

```bash
playwright-cli snapshot
```

2. コマンド出力の `[Snapshot](.playwright-cli/page-XXXX.yml)` からファイルパスを取得し、Read ツールで YAML を読み取る。テキスト `"7D"` を含む `button` 要素を探し、その `ref=eXXXX` を特定する。

   検索パターン例: `button "7D" [ref=eXXXX]`

3. クリックする:

```bash
playwright-cli click <7D の ref>
```

**ボタンが見つからない場合**: スナップショットの該当部分をユーザーに提示し、正しい ref を確認する。

### Step 3: ダウンロードボタンをクリック

1. スナップショットを再取得する:

```bash
playwright-cli snapshot
```

2. Read ツールで YAML を読み取り、ダウンロードボタンの ref ID を以下の優先順で特定する:

   **方法 1（推奨）**: `button "1Y"` の ref を見つけ、その **直後** にあるラベルなしの `button`（`img` 子要素のみを持つ）がダウンロードボタン:

   ```yaml
   - button "1Y" [ref=eXXXX] [cursor=pointer]:
       - generic [ref=eXXXX]: 1Y
   - button [ref=eXXXX] [cursor=pointer]:    # ← これがダウンロードボタン
       - img [ref=eXXXX]
   ```

   **方法 2（フォールバック）**: JavaScript で DOM を直接検索する:

   ```bash
   playwright-cli eval "document.querySelector('[aria-label*=\"download\"], [aria-label*=\"ダウンロード\"], [data-testid*=\"download\"]')?.outerHTML"
   ```

   **いずれの方法でも特定できない場合**: スクリーンショットを撮ってユーザーに提示し、ダウンロードボタンの ref を手動で指定してもらう

3. クリックする:

```bash
playwright-cli click <ダウンロードボタンの ref>
```

4. 出力に `Downloaded file` を含むことを確認する。含まれない場合:
   - 3 秒待ってからスナップショットを再取得する
   - ダウンロード確認ダイアログが表示されている場合は `playwright-cli dialog-accept` で承認する
   - 3 回リトライしてもダウンロードされない場合はユーザーに報告する

### Step 4: CSV リネーム

1. ダウンロードされた CSV のファイル名を Step 3 の出力 `Downloaded file <filename> to "<path>"` から取得する。ファイルの保存先は `.playwright-cli/` ディレクトリ。

   ファイルが見つからない場合は Glob で確認する: `.playwright-cli/account*overview*analytics*.csv`

2. Read ツールで CSV を読み取り、日付範囲を抽出する:
   - **最古日**: 最終データ行の Date 列（例: `"Sun, Feb 15, 2026"` → `20260215`）
   - **最新日**: 2行目（最初のデータ行）の Date 列（例: `"Sat, Feb 21, 2026"` → `20260221`）

   日付パースに失敗した場合は、CSV の最初と最後のデータ行をユーザーに提示し、日付範囲を手動指定してもらう。

3. リネーム先のファイルが既に存在するか確認する:
   - 存在する場合 → ユーザーに上書きするか確認する
   - 存在しない場合 → そのままリネーム

4. リネームする:

```bash
mv .playwright-cli/<元のファイル名> \
   .playwright-cli/YYYYMMDD-YYYYMMDD_account-overview-analytics.csv
```

例: `20260215-20260221_account-overview-analytics.csv`

### Step 5: 完了報告

リネーム後のファイルパスと、CSV の概要（期間・行数・主要指標のヘッダー一覧）をユーザーに報告する。

サマリーの末尾に以下を案内する:
> この CSV を使って振り返りレポートを作成する場合は `/weekly-review` を実行してください。

## 使用例

```
/download-analytics
```

引数は不要。実行すると対話的にブラウザを操作し、CSV をダウンロードする。

## 注意事項

- ブラウザ操作中は手動でブラウザを操作しないこと（ref ID がずれる原因になる）
- X の UI アップデートによりボタンの構造が変わった場合、スナップショットを確認して手順を更新する必要がある
- CSV のデータは UTC 基準の可能性がある。日付範囲は CSV 内のデータに基づいて判定する（画面表示ではなく）
- ダウンロードした CSV は `.playwright-cli/` に保存される
