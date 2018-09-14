function padZero(date) {
  return ("0" + date).slice(-2);
}

function getTime(date) {
  if (!date) return null;
  if (!(date instanceof Date)) {
    return new Date(date);
  }
}

export const DAY = 24 * 3600 * 1000;

export const UNIT = {
  day: DAY / 28,
  week: (7 * DAY) / 56,
  month: (30 * DAY) / 56
};

export function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}

export function getDates(begin, end) {
  const dates = [];
  const s = new Date(begin);
  s.setHours(24, 0, 0, 0);
  while (s.getTime() <= end) {
    dates.push(s.getTime());
    addDays(s, 1);
  }
  return dates;
}

let ctx = null;
export function textWidth(text, font, pad) {
  ctx = ctx || document.createElement("canvas").getContext("2d");
  ctx.font = font;
  return ctx.measureText(text).width + pad;
}

export function formatMonth(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  return `${y}/${m > 9 ? m : `0${m}`}`;
}

export function formatDay(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${m}/${d}`;
}

export function formatTime(date) {
  const Y = date.getFullYear();
  const M = padZero(date.getMonth() + 1);
  const D = padZero(date.getDate());
  const h = padZero(date.getHours());
  const m = padZero(date.getMinutes());
  const s = padZero(date.getSeconds());
  return `${Y}-${M}-${D} ${h}:${m}:${s}`;
}

export function formatData(data) {
  return data.map(v => {
    return {
      id: v.id,
      name: v.name,
      init_time: getTime(v.init_time),
      expt_begin: getTime(v.expt_begin),
      expt_end: getTime(v.expt_end),
      real_begin: getTime(v.real_begin),
      real_end: getTime(v.real_end),
      tooltip: v.tooltip
    };
  });
}

export function getEndTime({ data, dataMode = "all", current, unit }) {
  let minCol;
  let maxCol;
  switch (dataMode) {
    case "all":
      minCol = [data.map(v => v.expt_begin), data.map(v => v.real_begin)]
        .flat()
        .filter(v => Boolean(v));
      maxCol = [data.map(v => v.expt_end), data.map(v => v.real_end)]
        .flat()
        .filter(v => Boolean(v));
      if (!minCol.length) minCol = data.map(v => v.init_time);
      break;
    case "expect":
      minCol = data.map(v => v.expt_begin).filter(v => Boolean(v));
      maxCol = data.map(v => v.expt_end);
      if (!minCol.length) minCol = data.map(v => v.init_time);
      break;
    case "reality":
      minCol = data.map(v => v.real_begin).filter(v => Boolean(v));
      maxCol = data.map(v => v.real_end).filter(v => Boolean(v));
      if (!minCol.length) minCol = data.map(v => v.init_time);
      if (!maxCol.length) maxCol = [current];
      break;
  }
  const minTime = Math.min.apply(null, minCol) - unit * 40;
  const maxTime = Math.max.apply(null, maxCol) + unit * 40;
  return { minTime, maxTime };
}
