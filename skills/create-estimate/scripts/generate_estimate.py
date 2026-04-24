#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "pyyaml",
#     "jinja2",
#     "weasyprint",
# ]
# ///
"""
見積書PDF生成スクリプト
YAMLパラメータファイルからHTML経由でPDFを生成する。
金額計算（小計・消費税・合計）は全て自動。
"""
import sys
import os

import yaml
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML


def format_number(n):
    """数値をカンマ区切りでフォーマット"""
    return f"{int(n):,}"


def load_params(params_path):
    """YAMLパラメータを読み込み、デフォルト値を適用"""
    with open(params_path, "r", encoding="utf-8") as f:
        params = yaml.safe_load(f)

    # Algomatic デフォルト会社情報
    company = params.get("company", {})
    company.setdefault("name", "株式会社Algomatic")
    company.setdefault("zip", "〒106-6224")
    company.setdefault("address", "東京都港区六本木三丁目2番1号")
    company.setdefault("tel", "03-6823-3850")
    params["company"] = company

    # delivery ラベルのデフォルト
    terms = params.get("terms", {})
    delivery = terms.get("delivery", {})
    delivery.setdefault("label", "納品日")
    terms["delivery"] = delivery
    params["terms"] = terms

    return params


def calculate_amounts(params):
    """明細行の金額と合計を計算"""
    items = params.get("items", [])
    for item in items:
        if "amount" not in item:
            item["amount"] = int(float(item["quantity"]) * item["unit_price"])

    subtotal_before_discount = sum(item["amount"] for item in items)

    discount = params.get("discount", None)
    discount_amount = discount.get("amount", 0) if discount else 0

    subtotal = subtotal_before_discount - discount_amount
    tax_rate = params.get("tax_rate", 10) / 100
    tax = int(subtotal * tax_rate)
    total = subtotal + tax

    return {
        "items": items,
        "discount": discount,
        "discount_amount": discount_amount,
        "subtotal": subtotal,
        "tax": tax,
        "total": total,
    }


def determine_layout(items_count, notes_count, has_discount):
    """項目数+備考数の合計でレイアウトを自動調整"""
    table_rows = items_count + (1 if has_discount else 0)
    total_content = table_rows + notes_count

    # 備考スタイル
    if total_content > 16:
        note_style = {"font_size": "6.5pt", "line_height": "1.4", "padding": "1.5mm 4mm"}
    elif total_content > 13:
        note_style = {"font_size": "7pt", "line_height": "1.5", "padding": "1.5mm 4mm"}
    elif notes_count > 6:
        note_style = {"font_size": "7.5pt", "line_height": "1.6", "padding": "2mm 4mm"}
    elif notes_count > 4:
        note_style = {"font_size": "8pt", "line_height": "1.6", "padding": "2mm 4mm"}
    else:
        note_style = {"font_size": "8.5pt", "line_height": "1.8", "padding": "3mm 4mm"}

    # テーブル行パディング（項目が多い場合は詰める）
    table_padding = "1.5mm 3mm" if table_rows > 6 else "2mm 3mm"

    return {"note_style": note_style, "table_padding": table_padding}


def render_html(params, amounts):
    """Jinja2テンプレートからHTMLを生成"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    template_dir = os.path.join(script_dir, "..", "assets")

    env = Environment(loader=FileSystemLoader(template_dir))
    env.filters["fmt"] = format_number
    template = env.get_template("template.html")

    notes = params.get("notes", [])
    items = amounts["items"]
    layout = determine_layout(len(items), len(notes), amounts["discount"] is not None)

    return template.render(
        client=params.get("client", {}),
        project_name=params.get("project_name", ""),
        estimate=params.get("estimate", {}),
        company=params["company"],
        terms=params["terms"],
        delivery=params["terms"]["delivery"],
        notes=notes,
        note_style=layout["note_style"],
        table_padding=layout["table_padding"],
        **amounts,
    )


def generate(params_path, output_path):
    """メイン: YAML → PDF"""
    params = load_params(params_path)
    amounts = calculate_amounts(params)
    html_content = render_html(params, amounts)

    # HTMLも保存（デバッグ・再利用用）
    html_path = output_path.rsplit(".", 1)[0] + ".html"
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    HTML(string=html_content).write_pdf(output_path)
    print(f"Generated: {output_path}")
    print(f"HTML saved: {html_path}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: generate_estimate.py <params.yaml> <output.pdf>")
        print("Example: generate_estimate.py docs/estimate_params.yaml output/estimates/見積書.pdf")
        sys.exit(1)
    generate(sys.argv[1], sys.argv[2])
