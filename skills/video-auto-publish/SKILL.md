---
name: video-auto-publish
description: "Claude Codeで動画編集・SNS投稿を完全自動化するスキル。「動画を自動編集したい」「素材を渡すだけでYouTubeに投稿したい」「字幕を自動生成したい」「BGMを付けたい」「無音カットしたい」「SNS投稿を自動化したい」「Whisperで文字起こし」「Remotionで動画生成」などのキーワードで積極的に使用すること。コンテンツ量産を自動化したい国光さんのSNS発信ワークフローに直接活用できる。"
---

# Video Auto-Publish

動画素材を渡すだけで字幕・BGM・エンドカード付きの完成動画をSNS投稿まで全自動化するワークフロー。

元ネタ: @monta_ai_sns「Claude Codeで動画編集・投稿管理を完全自動化するガイド」

---

## このスキルが解決する問題

- 動画編集に時間がかかってコンテンツ量産できない
- 字幕付け・BGM追加・無音カットなどの単純作業が多い
- 毎回同じ手順を手動でやっている
- SNSへの投稿タイミング管理が面倒

---

## 完全自動化パイプライン

```
[素材動画]
    ↓
[Step 1] 文字起こし（Whisper）
    ↓
[Step 2] 字幕ファイル生成（.srt/.vtt）
    ↓
[Step 3] 動画編集
  ├── 無音カット
  ├── 字幕焼き込み or オーバーレイ
  ├── BGM追加（フェードイン/アウト）
  └── エンドカード挿入
    ↓
[Step 4] プラットフォーム別エクスポート
  ├── YouTube（16:9・高画質）
  ├── X/Instagram（1:1 or 9:16・圧縮）
  └── TikTok（9:16）
    ↓
[Step 5] SNS投稿（自動 or スケジュール）
```

---

## Step 1: 必要な環境

### ツールの確認

```bash
# Whisper（文字起こし）
pip install openai-whisper

# ffmpeg（動画処理）
brew install ffmpeg

# Node.js（Remotion使用時）
node --version
```

### オプション（高度な編集）

| ツール | 用途 | 難易度 |
|---|---|---|
| Remotion | コードで動画生成（テロップ・アニメーション） | 中 |
| DaVinci Resolve CLI | プロフェッショナルな編集 | 高 |
| yt-dlp | YouTube素材のダウンロード | 低 |

---

## Step 2: 文字起こし（Whisper）

```python
# whisper_transcribe.py
import whisper
import json
import sys

model = whisper.load_model("base")  # base/small/medium/large
result = model.transcribe(sys.argv[1], language="ja")

# SRTファイルを出力
with open("output.srt", "w", encoding="utf-8") as f:
    for i, segment in enumerate(result["segments"]):
        start = format_time(segment["start"])
        end = format_time(segment["end"])
        text = segment["text"].strip()
        f.write(f"{i+1}\n{start} --> {end}\n{text}\n\n")

def format_time(seconds):
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int((seconds % 1) * 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"
```

実行:
```bash
python whisper_transcribe.py input_video.mp4
```

---

## Step 3: 動画編集（ffmpeg）

### 字幕焼き込み

```bash
ffmpeg -i input.mp4 \
  -vf "subtitles=output.srt:force_style='FontSize=24,PrimaryColour=&HFFFFFF,OutlineColour=&H000000'" \
  -c:a copy \
  output_subtitled.mp4
```

### 無音カット

```python
# silence_cut.py
import subprocess
import re

def detect_silence(input_file, threshold=-40, duration=0.5):
    """無音区間を検出してタイムスタンプを返す"""
    cmd = [
        "ffmpeg", "-i", input_file,
        "-af", f"silencedetect=noise={threshold}dB:d={duration}",
        "-f", "null", "-"
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    # silence_start / silence_end を抽出
    silence_starts = re.findall(r"silence_start: ([\d.]+)", result.stderr)
    silence_ends = re.findall(r"silence_end: ([\d.]+)", result.stderr)
    return list(zip(silence_starts, silence_ends))
```

### BGM追加（フェードイン/アウト）

```bash
# 動画の長さに合わせてBGMをループ+フェード
ffmpeg -i input.mp4 -i bgm.mp3 \
  -filter_complex "[1:a]afade=t=in:d=2,afade=t=out:st=END_TIME:d=3[bgm]; \
                   [0:a][bgm]amix=inputs=2:weights=1 0.3[audio]" \
  -map 0:v -map "[audio]" \
  -c:v copy output_with_bgm.mp4
```

---

## Step 4: Remotionでのコード動画生成

テキストオーバーレイや動くタイトルカードが必要な場合:

```tsx
// src/MyVideo.tsx
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const MyVideo = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <div style={{ opacity, color: "#fff", fontSize: 60 }}>
        タイトルテキスト
      </div>
    </AbsoluteFill>
  );
};
```

レンダリング:
```bash
npx remotion render MyVideo output.mp4
```

---

## Step 5: SNS投稿自動化

### X（Twitter）投稿

```python
# post_to_x.py
import tweepy

client = tweepy.Client(
    consumer_key=CONSUMER_KEY,
    consumer_secret=CONSUMER_SECRET,
    access_token=ACCESS_TOKEN,
    access_token_secret=ACCESS_TOKEN_SECRET
)

# テキストのみ
client.create_tweet(text="投稿テキスト")

# 動画付き（Media upload APIが必要）
# → v1 APIのmedia_uploadを使う
```

### スケジュール投稿

```python
# schedule_post.py
import schedule
import time

def post_video():
    # 投稿処理
    pass

# 毎日18:00に投稿
schedule.every().day.at("18:00").do(post_video)

while True:
    schedule.run_pending()
    time.sleep(60)
```

---

## Claude Codeでの司令塔としての使い方

Claude Codeを「編集ツールの司令塔」として使う設計:

### プロンプト例

```
以下の素材動画を編集してください:
- ファイル: ~/Videos/recording.mp4
- 言語: 日本語
- 処理内容:
  1. Whisperで文字起こし → SRTファイル生成
  2. 無音区間（0.5秒以上）をカット
  3. 字幕を白テキスト・黒縁取りで焼き込み
  4. BGM（~/Music/bgm.mp3）を音量30%で追加
  5. 出力: ~/Videos/output_final.mp4
```

Claude Codeが:
1. 各ステップのスクリプトを生成
2. ffmpegコマンドを組み立てて実行
3. エラーがあれば自動修正
4. 完成ファイルのパスを報告

---

## 国光さんのSNS発信への活用

### 典型的なワークフロー

```
会議録画 or 画面録画
    ↓
Claude Code に「この動画を自動編集して」と渡す
    ↓
字幕・BGM・無音カット → SNS用にエクスポート
    ↓
X/YouTube/Instagramに投稿
```

### おすすめ設定

- 字幕: 日本語・白テキスト・24pt・黒縁取り
- BGM: 音量は元音声の20〜30%
- 無音カット: 0.5秒以上の無音を削除
- エンドカード: 最後5秒にロゴ・フォローCTAを挿入

---

## 関連ツール

- **文字起こし**: Whisper（ローカル）/ OpenAI Whisper API（高速）
- **動画編集**: ffmpeg（基本）/ Remotion（コード生成）
- **投稿管理**: Buffer / Hootsuite / 各SNS公式API
- **スケジューリング**: Claude Codeのスケジュール機能（`/schedule`）
