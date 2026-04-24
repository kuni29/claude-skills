#!/usr/bin/env bash
set -euo pipefail

# アイコンイラスト生成スクリプト（Nano Banana 2 / Gemini 3.1 Flash Image）
# シンプルな線画 + 青・グレー + 白背景のミニマルなイラストを生成
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "${SCRIPT_DIR}/_api_helper.sh"
load_api_key

if [[ $# -lt 1 ]]; then
    echo "使い方: $0 <被写体の説明> [出力ファイル名]"
    echo "例:     $0 'パソコンで作業する人'"
    echo "例:     $0 '握手するビジネスマン' 'handshake.png'"
    exit 1
fi

SUBJECT="$1"

PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../../../.." && pwd)"
OUTPUT_DIR="${PROJECT_ROOT}/output/icons"
mkdir -p "$OUTPUT_DIR"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
if [[ $# -ge 2 ]]; then
    OUTPUT_FILE="${OUTPUT_DIR}/$2"
else
    OUTPUT_FILE="${OUTPUT_DIR}/${TIMESTAMP}_icon.png"
fi

# スタイル固定のシステムプロンプト
SYSTEM_PROMPT="You are an illustration generator. Always generate images in this exact style:
- Simple flat vector illustration with hand-drawn thin line art
- Consistent line weight throughout
- Flat coloring only, absolutely no gradients, no shadows, no 3D effects
- Color palette strictly limited to: muted blue (#5B8BD4), light gray (#B0B0B0), and white background only
- Simple deformed characters with minimal facial features
- Centered composition with generous whitespace
- Friendly, light-hearted Japanese stock illustration style (similar to sokosto/ソコスト)
- Clean and minimal, suitable for business documents and blog posts
- IMPORTANT: Do NOT include any text, labels, captions, titles, or watermarks in the image. The image must be purely illustrative with no text whatsoever."

# ユーザーの被写体説明からプロンプトを構築
PROMPT="Create a simple flat vector illustration of: ${SUBJECT}

Style requirements:
- Hand-drawn thin line art with consistent line weight
- Flat coloring, no gradients, no shadows, no 3D effects
- Colors: muted blue (#5B8BD4) and light gray (#B0B0B0) only, on pure white background
- Simple deformed character/object with minimal details
- Centered, with generous whitespace around the subject
- Friendly Japanese stock illustration style
- Do NOT include any text, labels, captions, or watermarks in the image"

echo "被写体: ${SUBJECT}"
echo "アイコンイラストを生成中..."

RESPONSE=$(call_gemini_api "$PROMPT" "$SYSTEM_PROMPT")
extract_and_save_image "$RESPONSE" "$OUTPUT_FILE"
