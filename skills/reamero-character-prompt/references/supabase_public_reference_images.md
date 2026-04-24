# Supabase Storage（公開バケット）で参照画像を置く

[Nano Banana API（imgeditor.co）](https://imgeditor.co/ja/api) の `mode: "image"` では **`image_url` に https の公開 URL** が必要です。GitHub Raw の代わりに、**公開してよい参照画像**を Supabase Storage に置く手順です。

## Nano Banana API キーをどこに置くか

`nano_banana.py` は **`NANO_BANANA_API_KEY`** を読みます。設定方法は次のどちらかです。

1. **推奨**: リポジトリ直下に **`.env`** を作成し、次の 1 行を書く（`.env.example` をコピーしてリネーム可）。スクリプト起動時に自動で読み込みます。**`.env` は `.gitignore` 済みなのでコミットしないこと。**
   ```bash
   NANO_BANANA_API_KEY=nb_sk_あなたのキー
   ```
2. **一時的**: ターミナルで `export NANO_BANANA_API_KEY=nb_sk_...` を実行してから `python3 nano_banana.py ...` を実行する。

API キーは [imgeditor.co の API 画面](https://imgeditor.co/ja/api) から発行します。

## 生成の目安（このリポジトリの運用）

- **画質**: 基本 **`--resolution 2K`**（`nano_banana.py` のデフォルトも 2K）
- **キャラクター系**（ポートレート・キャラシートなど）: **`--aspect_ratio 1:1`**
- **シーン系**: **`--aspect_ratio 4:5`**

## 前提

- Supabase プロジェクトを 1 つ用意する
- 参照画像は**第三者に見られてもよい**ものだけを置く（バケットを public にするため）

## 1. バケットを作る

1. Supabase ダッシュボード → **Storage** → **New bucket**
2. 名前例: `character-refs`（英小文字・ハイフン推奨）
3. **Public bucket** をオンにする（参照 URL を API に渡すため）

## 2. アップロード

1. 同じバケット画面で **Upload file**
2. フォルダを切る場合はパス例: `nana_trendy_muse/portrait_front.png`

## 3. 公開 URL の形

プロジェクトの URL は **Project Settings → API → Project URL** にあります（例: `https://xxxxxxxxxxxx.supabase.co`）。

オブジェクトの公開 URL は次の形式です。

```text
https://<PROJECT_REF>.supabase.co/storage/v1/object/public/<BUCKET>/<オブジェクトパス>
```

例:

```text
https://xxxxxxxxxxxx.supabase.co/storage/v1/object/public/character-refs/nana_trendy_muse/portrait_front.png
```

ダッシュボードでファイルを開き、**Get URL** や **Copy public URL** があればそれでも可。

## 4. 動作確認

ブラウザのシークレットウィンドウでその URL を開き、**画像がそのまま表示**されることを確認する（HTML のログイン画面になったら URL が誤りか、バケットが public ではない）。

## 5. `nano_banana.py` から使う

### 方法 A: URL をそのまま渡す

```bash
export NANO_BANANA_API_KEY="nb_sk_..."

python3 nano_banana.py \
  --prompt "..." \
  --mode image \
  --image_url "https://xxxxxxxxxxxx.supabase.co/storage/v1/object/public/character-refs/nana_trendy_muse/portrait_front.png" \
  --model nano-banana-pro \
  --aspect_ratio 16:9 \
  --resolution 2K \
  --output out.png
```

### 方法 B: 環境変数 + オブジェクトパス（URL 組み立て）

```bash
export NANO_BANANA_API_KEY="nb_sk_..."
export SUPABASE_URL="https://xxxxxxxxxxxx.supabase.co"
export SUPABASE_REFERENCE_BUCKET="character-refs"

python3 nano_banana.py \
  --prompt "..." \
  --mode image \
  --supabase_object_path "nana_trendy_muse/portrait_front.png" \
  --model nano-banana-pro \
  --aspect_ratio 16:9 \
  --resolution 2K \
  --output out.png
```

`--image_url` と `--supabase_object_path` を同時に指定した場合は **`--image_url` が優先**されます。

## メモ

- 画像を差し替えたいときは**同じパスに上書きアップロード**すれば URL は変わらず運用しやすい
- 非公開にしたい場合は別途「署名付き URL」が必要（本ドキュメントの対象外）
