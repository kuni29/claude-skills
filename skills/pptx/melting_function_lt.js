const pptxgen = require("pptxgenjs");
let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "デザイナーからBizDevへ";

// ── Editorial palette ──
// Light slides: warm cream  ／  Dark slides: near-black
const CREAM  = "F3EDE7";   // warm cream background
const DARK   = "111118";   // near-black background
const INK    = "15151C";   // text on cream
const CHALK  = "EDE9E0";   // text on dark
const RUST   = "A83C20";   // deep terracotta accent (light slides)
const GOLD   = "C08A42";   // warm gold accent (dark slides)
const MUTED  = "7A7572";   // muted text on cream
const DIM    = "606075";   // muted text on dark
const RULE   = "CCC7C0";   // thin rule on cream
const DARKRULE = "1E1E32"; // thin rule on dark

const SW = 10, SH = 5.625;

// ── Footer ──
function footerOnCream(s) {
  s.addText("@ku_ni_29", {
    x: 0.7, y: 5.1, w: 2.2, h: 0.4,
    fontFace: "Calibri", fontSize: 9, color: MUTED,
    align: "left", valign: "middle", margin: 0
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 8.18, y: 5.15, w: 1.42, h: 0.25,
    fill: { color: INK }, line: { color: INK }, rectRadius: 0.12
  });
  s.addText("#融ける職能", {
    x: 8.18, y: 5.15, w: 1.42, h: 0.25,
    fontFace: "Calibri", fontSize: 7.5, bold: true,
    color: CHALK, align: "center", valign: "middle", margin: 0
  });
}

function footerOnDark(s) {
  s.addText("@ku_ni_29", {
    x: 0.7, y: 5.1, w: 2.2, h: 0.4,
    fontFace: "Calibri", fontSize: 9, color: DIM,
    align: "left", valign: "middle", margin: 0
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 8.18, y: 5.15, w: 1.42, h: 0.25,
    fill: { color: CHALK }, line: { color: CHALK }, rectRadius: 0.12
  });
  s.addText("#融ける職能", {
    x: 8.18, y: 5.15, w: 1.42, h: 0.25,
    fontFace: "Calibri", fontSize: 7.5, bold: true,
    color: DARK, align: "center", valign: "middle", margin: 0
  });
}

// ─────────────────────────────────────────
// Slide 1: タイトル — DARK
// ─────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: DARK };
  footerOnDark(s);

  // Event label — small, top-left
  s.addText("融ける職能 — デザイナーはどこへ向かうのか  2026.4.16", {
    x: 0.7, y: 0.42, w: 7.5, h: 0.3,
    fontFace: "Calibri", fontSize: 9.5,
    color: DIM, align: "left", margin: 0
  });

  // Main title — left-aligned, large, positioned slightly above center
  s.addText([
    { text: "デザイナーからBizDevへ。", options: { breakLine: true } },
    { text: "なんでもやってみてわかった", options: { breakLine: true } },
    { text: "デザイナーの介在価値", options: {} }
  ], {
    x: 0.7, y: 1.1, w: 9.0, h: 3.0,
    fontFace: "Calibri", fontSize: 34, bold: true,
    color: CHALK, align: "left", valign: "middle", margin: 0
  });

  // Thin horizontal rule
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 4.28, w: 4.5, h: 0.022,
    fill: { color: DARKRULE }, line: { color: DARKRULE }
  });

  // Speaker
  s.addText("國光俊樹 / 株式会社Algomatic", {
    x: 0.7, y: 4.42, w: 6, h: 0.4,
    fontFace: "Calibri", fontSize: 14, bold: true,
    color: CHALK, align: "left", margin: 0
  });
}

// ─────────────────────────────────────────
// Slide 2: つかみ — CREAM, max impact text
// ─────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: CREAM };
  footerOnCream(s);

  s.addText([
    { text: "デザイナーを、", options: { breakLine: true } },
    { text: "やめました。", options: {} }
  ], {
    x: 0.7, y: 0.7, w: 9.0, h: 3.8,
    fontFace: "Calibri", fontSize: 62, bold: true,
    color: INK, align: "left", valign: "middle", margin: 0
  });

  s.addText("UXデザイナー → BizDev（CS・マーケ・営業）", {
    x: 0.7, y: 4.68, w: 7, h: 0.32,
    fontFace: "Calibri", fontSize: 13, color: MUTED,
    align: "left", margin: 0
  });
}

// ─────────────────────────────────────────
// Slide 3: 葛藤 — split panel (dark left / cream right)
// ─────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: CREAM };

  // Full-height dark left panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 4.9, h: SH,
    fill: { color: DARK }, line: { color: DARK }
  });

  // Left: header
  s.addText("チームの Slack", {
    x: 0.55, y: 0.55, w: 3.8, h: 0.38,
    fontFace: "Calibri", fontSize: 10, bold: true,
    color: GOLD, align: "left", margin: 0
  });

  // Left: content
  s.addText([
    { text: "「こんなクオリティが", options: { breakLine: true } },
    { text: "出せるようになった」", options: { breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "「毎日ブレイクスルー」", options: { bold: true } }
  ], {
    x: 0.55, y: 1.08, w: 3.8, h: 3.2,
    fontFace: "Calibri", fontSize: 17,
    color: CHALK, align: "left", valign: "top", margin: 0
  });

  // VS label — right-aligned at the dividing edge (on dark)
  s.addText("vs", {
    x: 3.5, y: 2.45, w: 1.2, h: 0.6,
    fontFace: "Calibri", fontSize: 20, bold: false, italic: true,
    color: DIM, align: "right", valign: "middle", margin: 0
  });

  // Right: header
  s.addText("深夜の展示会場", {
    x: 5.25, y: 0.55, w: 4.3, h: 0.38,
    fontFace: "Calibri", fontSize: 10, bold: true,
    color: MUTED, align: "left", margin: 0
  });

  // Right: content
  s.addText([
    { text: "備品を車で運搬", options: { breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "会場装飾を深夜まで準備", options: { breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "段ボールを手で開封", options: { bold: true } }
  ], {
    x: 5.25, y: 1.08, w: 4.3, h: 3.2,
    fontFace: "Calibri", fontSize: 17,
    color: INK, align: "left", valign: "top", margin: 0
  });

  // Footer — right side (on cream)
  s.addText("@ku_ni_29", {
    x: 5.25, y: 5.1, w: 2.2, h: 0.4,
    fontFace: "Calibri", fontSize: 9, color: MUTED,
    align: "left", valign: "middle", margin: 0
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 8.18, y: 5.15, w: 1.42, h: 0.25,
    fill: { color: INK }, line: { color: INK }, rectRadius: 0.12
  });
  s.addText("#融ける職能", {
    x: 8.18, y: 5.15, w: 1.42, h: 0.25,
    fontFace: "Calibri", fontSize: 7.5, bold: true,
    color: CHALK, align: "center", valign: "middle", margin: 0
  });
}

// ─────────────────────────────────────────
// Slide 4: アイデンティティ — CREAM, big question
// ─────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: CREAM };
  footerOnCream(s);

  // Big question — slightly lower than center for weight
  s.addText("「自分は何者なのか」", {
    x: 0.7, y: 0.85, w: 9.0, h: 3.1,
    fontFace: "Calibri", fontSize: 58, bold: true,
    color: INK, align: "left", valign: "middle", margin: 0
  });

  // Thin rule + context
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 4.2, w: 8.2, h: 0.022,
    fill: { color: RULE }, line: { color: RULE }
  });

  s.addText("デザイナーとして出なきゃいけない。でも実際はほとんどデザインをしていない。", {
    x: 0.7, y: 4.32, w: 8.2, h: 0.5,
    fontFace: "Calibri", fontSize: 13, color: MUTED,
    align: "left", valign: "middle", margin: 0
  });
}

// ─────────────────────────────────────────
// Slide 5: 転機 — CREAM, section label prominent
// ─────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: CREAM };
  footerOnCream(s);

  // Section label — small, muted, top-left
  s.addText("転機", {
    x: 0.7, y: 0.45, w: 2, h: 0.3,
    fontFace: "Calibri", fontSize: 10, bold: true,
    color: RUST, align: "left", margin: 0
  });

  s.addText([
    { text: "月2〜3回の展示会で、", options: { breakLine: true } },
    { text: "気づいた。", options: {} }
  ], {
    x: 0.7, y: 0.9, w: 9.0, h: 3.4,
    fontFace: "Calibri", fontSize: 52, bold: true,
    color: INK, align: "left", valign: "middle", margin: 0
  });

  s.addText("競合他社のブースを歩き回り、顧客と向き合い続けた。", {
    x: 0.7, y: 4.68, w: 8, h: 0.32,
    fontFace: "Calibri", fontSize: 13, color: MUTED,
    align: "left", margin: 0
  });
}

// ─────────────────────────────────────────
// Slide 6: 競合紹介 — CREAM
// ─────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: CREAM };
  footerOnCream(s);

  s.addText("転機", {
    x: 0.7, y: 0.45, w: 2, h: 0.3,
    fontFace: "Calibri", fontSize: 10, bold: true,
    color: RUST, align: "left", margin: 0
  });

  s.addText([
    { text: "「競合他社のブースを、", options: { breakLine: true } },
    { text: "紹介した」", options: {} }
  ], {
    x: 0.7, y: 0.9, w: 9.0, h: 2.5,
    fontFace: "Calibri", fontSize: 46, bold: true,
    color: INK, align: "left", valign: "middle", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 3.55, w: 8.4, h: 0.022,
    fill: { color: RULE }, line: { color: RULE }
  });

  s.addText([
    { text: "「この人の課題には、今日は競合のサービスの方が合っている」", options: { breakLine: true } },
    { text: "そう気づいたら、正直に伝えるようになった。自分も、チームも。", options: {} }
  ], {
    x: 0.7, y: 3.7, w: 8.4, h: 1.1,
    fontFace: "Calibri", fontSize: 15,
    color: MUTED, align: "left", valign: "top", margin: 0
  });
}

// ─────────────────────────────────────────
// Slide 7: 目的と手段 — CREAM, clean diagram
// ─────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: CREAM };
  footerOnCream(s);

  // Purpose label
  s.addText("目的", {
    x: 0.7, y: 0.52, w: 1.5, h: 0.32,
    fontFace: "Calibri", fontSize: 11, bold: true,
    color: RUST, align: "left", margin: 0
  });

  s.addText("顧客の課題を解決する", {
    x: 0.7, y: 0.95, w: 8.8, h: 1.6,
    fontFace: "Calibri", fontSize: 44, bold: true,
    color: INK, align: "left", valign: "middle", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 2.7, w: 8.4, h: 0.022,
    fill: { color: RULE }, line: { color: RULE }
  });

  s.addText("手段", {
    x: 0.7, y: 2.85, w: 1.5, h: 0.32,
    fontFace: "Calibri", fontSize: 11, bold: true,
    color: MUTED, align: "left", margin: 0
  });

  // Means — text-only tags with bottom border (not AI pill boxes)
  const means  = ["デザイン", "営業", "CS", "マーケ", "段ボール運び"];
  const widths = [1.5, 1.1, 0.8, 1.15, 1.85];
  let curX = 0.7;
  const tagY  = 3.28;
  const gap   = 0.2;

  means.forEach((m, i) => {
    // Bottom border line only — editorial "tag" style
    s.addShape(pres.shapes.RECTANGLE, {
      x: curX, y: tagY + 0.52, w: widths[i], h: 0.03,
      fill: { color: RULE }, line: { color: RULE }
    });
    s.addText(m, {
      x: curX, y: tagY, w: widths[i], h: 0.52,
      fontFace: "Calibri", fontSize: 14, bold: true,
      color: INK, align: "left", valign: "bottom", margin: 0
    });
    curX += widths[i] + gap;
  });
}

// ─────────────────────────────────────────
// Slide 8: 介在価値 — DARK
// ─────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: DARK };
  footerOnDark(s);

  s.addText([
    { text: "デザイナーの介在価値は、", options: { breakLine: true } },
    { text: "Figmaを開くことでは", options: { breakLine: true } },
    { text: "なかった。", options: {} }
  ], {
    x: 0.7, y: 0.7, w: 9.0, h: 4.0,
    fontFace: "Calibri", fontSize: 44, bold: true,
    color: CHALK, align: "left", valign: "middle", margin: 0
  });
}

// ─────────────────────────────────────────
// Slide 9: 問いを変える — CREAM
// ─────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: CREAM };
  footerOnCream(s);

  s.addText("問いを変える", {
    x: 0.7, y: 0.45, w: 4, h: 0.3,
    fontFace: "Calibri", fontSize: 10, bold: true,
    color: RUST, align: "left", margin: 0
  });

  // Old question — struck through
  s.addText("「デザイナーは不要になるのか」", {
    x: 0.7, y: 0.9, w: 8.5, h: 0.65,
    fontFace: "Calibri", fontSize: 21,
    color: MUTED, align: "left", valign: "middle", margin: 0,
    strike: true
  });

  // Arrow (text-based, clean)
  s.addText("↓", {
    x: 0.7, y: 1.65, w: 0.8, h: 0.55,
    fontFace: "Calibri", fontSize: 20,
    color: RUST, align: "left", valign: "middle", margin: 0
  });

  // New question
  s.addText([
    { text: "「何者であるか」より、", options: { breakLine: true } },
    { text: "「何を生み出すか」", options: {} }
  ], {
    x: 0.7, y: 2.3, w: 9.0, h: 2.4,
    fontFace: "Calibri", fontSize: 44, bold: true,
    color: INK, align: "left", valign: "top", margin: 0
  });
}

// ─────────────────────────────────────────
// Slide 10: 締め — DARK
// ─────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: DARK };
  footerOnDark(s);

  s.addText([
    { text: "「デザイナーをやめた」", options: { breakLine: true } },
    { text: "のではなく、", options: { breakLine: true } },
    { text: "デザイナーの枠を", options: { breakLine: true } },
    { text: "溶かしただけだった。", options: {} }
  ], {
    x: 0.7, y: 0.7, w: 9.0, h: 3.7,
    fontFace: "Calibri", fontSize: 38, bold: true,
    color: CHALK, align: "left", valign: "middle", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 4.55, w: 4.5, h: 0.022,
    fill: { color: DARKRULE }, line: { color: DARKRULE }
  });

  s.addText("ありがとうございました", {
    x: 0.7, y: 4.68, w: 3.8, h: 0.35,
    fontFace: "Calibri", fontSize: 13,
    color: DIM, align: "left", valign: "middle", margin: 0
  });

  s.addText("國光俊樹 / Algomatic", {
    x: 5.5, y: 4.68, w: 3.8, h: 0.35,
    fontFace: "Calibri", fontSize: 12,
    color: DIM, align: "right", valign: "middle", margin: 0
  });
}

// ─────────────────────────────────────────
// Save
// ─────────────────────────────────────────
pres.writeFile({ fileName: "/Users/kunimitsu-toshiki/Desktop/melting_function_LT.pptx" })
  .then(() => console.log("✅ Saved: melting_function_LT.pptx"))
  .catch(err => { console.error("❌ Error:", err); process.exit(1); });
