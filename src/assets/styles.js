const SIZE = "14px";
const TYPE =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export function getFont({ fontSize = SIZE, fontFamily = TYPE }) {
  return `bold ${fontSize} ${fontFamily}`;
}

export default function getStyles({
  BG = "#fff",
  groupBg = "rgba(0,0,0,0)",
  lineColor = "#eee",
  redLineColor = "#ed3f14",
  baseBar = "#b8c2cc",
  whiteBar = "#ffffff",
  greenBar = "#52c41a",
  greenBarA = "rgba(82, 196, 26, .5)",
  groupBar = "#52c41a",
  redBar = "#ed3f14",
  redBarA = "rgba(237, 63, 20, .5)",
  yellowBar = "#ff9900",
  yellowBarA = "rgba(255, 153, 0, .5)",
  buleBarA = "rgba(45, 140, 240, 0.52)",
  greyBar = "#dddee1",
  textColor = "#222",
  lightTextColor = "#999",
  lineWidth = "1px",
  thickLineWidth = "1.4px",
  fontSize = SIZE,
  smallFontSize = "12px",
  fontFamily = TYPE
}) {
  const line = {
    stroke: lineColor,
    "stroke-width": lineWidth
  };
  const redLine = {
    stroke: redLineColor,
    "stroke-width": lineWidth
  };
  const thickLine = {
    stroke: lineColor,
    "stroke-width": thickLineWidth
  };
  const text = {
    fill: textColor,
    "dominant-baseline": "central",
    "font-size": fontSize,
    "font-family": fontFamily
  };
  const addressText = {
    fill: redBar,
    "dominant-baseline": "central",
    "font-size": fontSize,
    "font-family": fontFamily
  };
  const smallText = {
    fill: lightTextColor,
    "font-size": smallFontSize
  };
  return {
    week: {
      fill: "rgba(252, 248, 227, .6)"
    },
    box: {
      ...thickLine,
      fill: BG
    },
    line,
    cline: redLine,
    bline: thickLine,
    groupBg: {
      fill: groupBg
    },
    label: text,
    groupLabel: {
      ...text,
      "font-weight": "600"
    },
    addressLabel: {
      ...addressText,
      "font-weight": "600"
    },
    text1: {
      ...text,
      ...smallText,
      "text-anchor": "end"
    },
    text2: {
      ...text,
      ...smallText
    },
    text3: {
      ...text,
      ...smallText,
      "text-anchor": "middle"
    },
    bar: {
      fill: baseBar
    },
    white: {
      fill: whiteBar
    },
    green: {
      fill: greenBar
    },
    greenA: {
      fill: greenBarA
    },
    red: {
      fill: redBar
    },
    redA: {
      fill: redBarA
    },
    buleA: {
      fill: buleBarA
    },
    yellow: {
      fill: yellowBar
    },
    yellowA: {
      fill: yellowBarA
    },
    grey: {
      fill: greyBar
    },
    group: {
      fill: groupBar
    }
  };
}
