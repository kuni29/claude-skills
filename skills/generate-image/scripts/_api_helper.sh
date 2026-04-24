#!/usr/bin/env bash
# 共通ライブラリ — source して使う（直接実行不可）
# 使い方: source "${SCRIPT_DIR}/_api_helper.sh"

GEMINI_API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent"

# GOOGLE_API_KEY の存在を確認する
# 事前に export GOOGLE_API_KEY="your-api-key" が必要
load_api_key() {
    # 環境変数が未設定の場合、プロジェクトルートの .env から読み取る
    if [[ -z "${GOOGLE_API_KEY:-}" ]]; then
        local project_root
        project_root="$(cd "${SCRIPT_DIR}/../../../.." && pwd)"
        if [[ -f "${project_root}/.env" ]]; then
            local val
            val=$(grep -E '^GOOGLE_API_KEY=' "${project_root}/.env" | head -1 | cut -d'=' -f2-)
            val="${val%\"}"
            val="${val#\"}"
            val="${val%\'}"
            val="${val#\'}"
            if [[ -n "$val" ]]; then
                export GOOGLE_API_KEY="$val"
            fi
        fi
    fi
    if [[ -z "${GOOGLE_API_KEY:-}" ]]; then
        echo "エラー: GOOGLE_API_KEY が設定されていません。" >&2
        echo "  export GOOGLE_API_KEY='your-api-key' を実行するか、プロジェクトルートに .env ファイルを配置してください。" >&2
        return 1
    fi
}

# Gemini API を呼び出す
# 引数: $1 = プロンプト, $2 = システムプロンプト（省略可）
# 出力: APIレスポンスJSON（stdout）
call_gemini_api() {
    local prompt="$1"
    local system_prompt="${2:-}"

    local json_body
    if [[ -n "$system_prompt" ]]; then
        json_body=$(jq -n --arg prompt "$prompt" --arg system "$system_prompt" '{
            systemInstruction: {parts: [{text: $system}]},
            contents: [{parts: [{text: $prompt}]}],
            generationConfig: {responseModalities: ["TEXT", "IMAGE"]}
        }')
    else
        json_body=$(jq -n --arg prompt "$prompt" '{
            contents: [{parts: [{text: $prompt}]}],
            generationConfig: {responseModalities: ["TEXT", "IMAGE"]}
        }')
    fi

    curl -s "$GEMINI_API_URL" \
        -H "x-goog-api-key: ${GOOGLE_API_KEY}" \
        -H "Content-Type: application/json" \
        -X POST \
        -d "$json_body"
}

# APIレスポンスからテキスト部分を表示
# 引数: $1 = APIレスポンスJSON
print_response_text() {
    local response="$1"
    local text
    text=$(echo "$response" | jq -r '.candidates[0].content.parts[] | select(.text) | .text // empty')
    if [[ -n "$text" ]]; then
        echo "モデルの応答: ${text}"
    fi
}

# APIレスポンスから画像を抽出して保存
# 引数: $1 = APIレスポンスJSON, $2 = 出力ファイルパス
# 戻り値: 0=成功, 1=失敗
extract_and_save_image() {
    local response="$1"
    local output_file="$2"

    # エラーチェック
    local error
    error=$(echo "$response" | jq -r '.error.message // empty')
    if [[ -n "$error" ]]; then
        echo "APIエラー: ${error}" >&2
        return 1
    fi

    # テキスト部分を表示
    print_response_text "$response"

    # 画像データを抽出
    local image_data
    image_data=$(echo "$response" | jq -r '.candidates[0].content.parts[] | select(.inlineData) | .inlineData.data // empty')
    if [[ -n "$image_data" ]]; then
        echo "$image_data" | base64 -d > "$output_file"
        echo "画像を保存しました: ${output_file}"
        return 0
    else
        echo "画像が生成されませんでした。" >&2
        return 1
    fi
}
