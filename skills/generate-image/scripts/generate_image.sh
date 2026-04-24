#!/usr/bin/env bash
set -euo pipefail

# 汎用画像生成スクリプト（Nano Banana 2 / Gemini 3.1 Flash Image）
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "${SCRIPT_DIR}/_api_helper.sh"
load_api_key

if [[ $# -lt 1 ]]; then
    echo "使い方: $0 <プロンプト> [出力ファイル名]"
    echo "例:     $0 '夕焼けの富士山、湖に映る逆さ富士'"
    echo "例:     $0 '夕焼けの富士山' 'fuji_sunset.png'"
    exit 1
fi

PROMPT="$1"

PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../../../.." && pwd)"
OUTPUT_DIR="${PROJECT_ROOT}/output/images"
mkdir -p "$OUTPUT_DIR"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
if [[ $# -ge 2 ]]; then
    OUTPUT_FILE="${OUTPUT_DIR}/$2"
else
    OUTPUT_FILE="${OUTPUT_DIR}/${TIMESTAMP}.png"
fi

echo "プロンプト: ${PROMPT}"
echo "画像を生成中..."

RESPONSE=$(call_gemini_api "$PROMPT")
extract_and_save_image "$RESPONSE" "$OUTPUT_FILE"
