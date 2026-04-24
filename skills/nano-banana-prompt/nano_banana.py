import urllib.request
import urllib.error
import json
import time
import sys
import os
import ssl
import argparse
from typing import Optional

BASE_URL = "https://imgeditor.co/api/v1"


def ssl_context() -> ssl.SSLContext:
    """macOS 等で標準 CA が足りない場合に certifi を使う。検証を切る場合は NANO_BANANA_SSL_VERIFY=0。"""
    if os.environ.get("NANO_BANANA_SSL_VERIFY", "1") == "0":
        print("Warning: SSL 証明書検証を無効にしています（NANO_BANANA_SSL_VERIFY=0）")
        return ssl._create_unverified_context()
    try:
        import certifi

        return ssl.create_default_context(cafile=certifi.where())
    except ImportError:
        return ssl.create_default_context()


def load_env_file() -> None:
    """リポジトリ直下またはスクリプトと同じディレクトリの .env を読み込む（既存の環境変数は上書きしない）。"""
    paths = [
        os.path.join(os.getcwd(), ".env"),
        os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env"),
    ]
    seen = set()
    for path in paths:
        if path in seen or not os.path.isfile(path):
            continue
        seen.add(path)
        with open(path, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if "=" not in line:
                    continue
                key, _, value = line.partition("=")
                key = key.strip()
                value = value.strip().strip('"').strip("'")
                if key and key not in os.environ:
                    os.environ[key] = value


load_env_file()
API_KEY = os.environ.get("NANO_BANANA_API_KEY")


def build_supabase_public_url(project_url: str, bucket: str, object_path: str) -> str:
    """Supabase Storage 公開バケットの object public URL を組み立てる。"""
    base = project_url.rstrip("/")
    key = object_path.lstrip("/").replace("\\", "/")
    return f"{base}/storage/v1/object/public/{bucket}/{key}"


def resolve_image_url(
    image_url: Optional[str],
    supabase_object_path: Optional[str],
    supabase_bucket: Optional[str],
) -> Optional[str]:
    if image_url:
        return image_url
    if not supabase_object_path:
        return None
    project = os.environ.get("SUPABASE_URL")
    bucket = supabase_bucket or os.environ.get("SUPABASE_REFERENCE_BUCKET")
    if not project or not bucket:
        print(
            "Error: --supabase_object_path を使うには SUPABASE_URL と "
            "SUPABASE_REFERENCE_BUCKET（または --supabase_bucket）が必要です。"
        )
        sys.exit(1)
    return build_supabase_public_url(project, bucket, supabase_object_path)

def generate_image(prompt, model="nano-banana-pro", mode="text", image_url=None, aspect_ratio="1:1", resolution="2K"):
    if not API_KEY:
        print("Error: NANO_BANANA_API_KEY が設定されていません。")
        print("次のいずれかで設定してください:")
        print("  1) リポジトリ直下に .env を置き、NANO_BANANA_API_KEY=nb_sk_... と書く（.env.example を参照）")
        print("  2) シェルで export NANO_BANANA_API_KEY=nb_sk_...")
        sys.exit(1)

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "prompt": prompt,
        "mode": mode,
        "model": model,
        "aspect_ratio": aspect_ratio,
        "resolution": resolution,
        "num_images": 1,
        "quality": "standard",
        "output_format": "png"
    }
    
    if mode == "image":
        if not image_url:
            print("Error: mode='image' の場合、--image_url が必要です。")
            sys.exit(1)
        data["image_url"] = image_url

    print(f"Generating with model: {model}, mode: {mode}, aspect_ratio: {aspect_ratio}, resolution: {resolution}")
    req = urllib.request.Request(f"{BASE_URL}/images/generate", data=json.dumps(data).encode('utf-8'), headers=headers, method='POST')

    try:
        with urllib.request.urlopen(req, context=ssl_context()) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            if not res_data.get("success"):
                print(f"API Error: {res_data}")
                sys.exit(1)
            task_id = res_data["data"]["task_id"]
            print(f"Task started successfully. Task ID: {task_id}")
            return task_id
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.read().decode('utf-8')}")
        sys.exit(1)

def check_status(task_id):
    headers = {
        "Authorization": f"Bearer {API_KEY}"
    }
    req = urllib.request.Request(f"{BASE_URL}/images/status?task_id={task_id}", headers=headers)

    print("Waiting for generation to complete...")
    while True:
        try:
            with urllib.request.urlopen(req, context=ssl_context()) as response:
                res_data = json.loads(response.read().decode('utf-8'))
                if not res_data.get("success"):
                    print(f"API Error: {res_data}")
                    sys.exit(1)

                status = res_data["data"]["status"]
                print(f"Current status: {status}")

                if status == "completed":
                    return res_data["data"]["image_url"]
                elif status == "failed":
                    print("Generation failed.")
                    sys.exit(1)

        except urllib.error.HTTPError as e:
            print(f"HTTP Error: {e.code} - {e.read().decode('utf-8')}")
            sys.exit(1)

        time.sleep(5) # 5秒ごとにポーリング

def download_image(url, output_path):
    print(f"Downloading image from {url} to {output_path}...")
    ua = (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": ua,
            "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        },
    )
    with urllib.request.urlopen(req, context=ssl_context()) as response:
        with open(output_path, "wb") as out:
            out.write(response.read())
    print("Download complete!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate image using Nano Banana API")
    parser.add_argument("--prompt", required=True, help="Text prompt")
    parser.add_argument("--model", default="nano-banana-pro", help="Model ID (e.g., nano-banana-pro)")
    parser.add_argument("--mode", default="text", help="text or image")
    parser.add_argument("--image_url", help="Reference image URL for image mode (must be public http/https url)")
    parser.add_argument(
        "--supabase_object_path",
        help="Supabase Storage のオブジェクトキー（例: nana/portrait.png）。SUPABASE_URL とバケット名が必要",
    )
    parser.add_argument(
        "--supabase_bucket",
        help="公開バケット名（省略時は環境変数 SUPABASE_REFERENCE_BUCKET）",
    )
    parser.add_argument(
        "--aspect_ratio",
        default="1:1",
        help="Aspect ratio. Repo default: 1:1 for face / 2×2 grids; use 4:5 for pose-focused shots (see .claude/skills/nano-banana-prompt/SKILL.md)",
    )
    parser.add_argument(
        "--resolution",
        default="2K",
        help="Resolution (1K, 2K, 4K)。キャラ系は 2K 推奨",
    )
    parser.add_argument("--output", default="output.png", help="Output file path")

    args = parser.parse_args()

    image_url = resolve_image_url(args.image_url, args.supabase_object_path, args.supabase_bucket)
    if args.mode == "image" and not image_url:
        print("Error: mode='image' の場合、--image_url または --supabase_object_path が必要です。")
        sys.exit(1)

    task_id = generate_image(args.prompt, args.model, args.mode, image_url, args.aspect_ratio, args.resolution)
    image_url = check_status(task_id)
    download_image(image_url, args.output)
