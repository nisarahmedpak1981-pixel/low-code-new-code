import { FIGURE_1_ADOPTION_DATA } from './paperBaseline';
import {
  computeSensitivityAnalysis,
  DebtCurvePoint,
  evaluateAllFourBaselines,
  getThreeWayParadigmComparison,
  TghmSimulationInput,
  TghmSimulationOutput,
} from '../model/tghmEngine';

async function canvasToUint8Array(canvas: HTMLCanvasElement): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to render chart image blob'));
        return;
      }
      blob.arrayBuffer().then((buf) => resolve(new Uint8Array(buf))).catch(reject);
    }, 'image/png');
  });
}

function createHiResCanvas(width: number, height: number): {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
} {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('2D canvas context unavailable');
  }
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);
  return { canvas, ctx };
}

export async function renderFigure1AdoptionPng(): Promise<Uint8Array> {
  const w = 1100;
  const h = 640;
  const { canvas, ctx } = createHiResCanvas(w, h);

  const padL = 290;
  const padR = 50;
  const padT = 65;
  const padB = 50;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  ctx.fillStyle = '#1C1917';
  ctx.font = 'bold 20px Georgia, serif';
  ctx.fillText('Figure 1: LCNC Usage by Software Development Area (2022–2023 Baseline & 2026 TGHM)', 30, 34);

  // Legend
  const legendY = 52;
  ctx.font = '13px Calibri, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillRect(padL, legendY - 10, 14, 10);
  ctx.fillStyle = '#44403C';
  ctx.fillText('Q1 2022 (n=17,763)', padL + 20, legendY);

  ctx.fillStyle = '#475569';
  ctx.fillRect(padL + 175, legendY - 10, 14, 10);
  ctx.fillStyle = '#44403C';
  ctx.fillText('Q3 2023 (n=8,415)', padL + 195, legendY);

  ctx.fillStyle = '#1E3A8A';
  ctx.fillRect(padL + 350, legendY - 10, 14, 10);
  ctx.fillStyle = '#1E3A8A';
  ctx.fillText('2026 TGHM Hybrid Projection', padL + 370, legendY);

  // Gridlines
  ctx.strokeStyle = '#E7E3DA';
  ctx.lineWidth = 1;
  [0, 20, 40, 60, 80, 100].forEach((pct) => {
    const x = padL + (pct / 100) * plotW;
    ctx.beginPath();
    ctx.moveTo(x, padT);
    ctx.lineTo(x, h - padB);
    ctx.stroke();

    ctx.fillStyle = '#78716C';
    ctx.font = '12px Consolas, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${pct}%`, x, h - padB + 20);
  });

  const rowH = plotH / FIGURE_1_ADOPTION_DATA.length;
  FIGURE_1_ADOPTION_DATA.forEach((row, idx) => {
    const y0 = padT + idx * rowH;
    ctx.fillStyle = '#1C1917';
    ctx.font = '13px Calibri, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(row.area, padL - 12, y0 + rowH * 0.56);

    const barH = 8;
    // Q1 2022
    ctx.fillStyle = '#94A3B8';
    ctx.fillRect(padL, y0 + 6, (row.q1_2022 / 100) * plotW, barH);
    // Q3 2023
    ctx.fillStyle = '#475569';
    ctx.fillRect(padL, y0 + 16, (row.q3_2023 / 100) * plotW, barH);
    // 2026 TGHM
    ctx.fillStyle = '#1E3A8A';
    ctx.fillRect(padL, y0 + 26, (row.projected_2026_tghm / 100) * plotW, barH);

    ctx.fillStyle = '#1E3A8A';
    ctx.font = '11px Consolas, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`${row.projected_2026_tghm}%`, padL + (row.projected_2026_tghm / 100) * plotW + 6, y0 + 34);
  });

  return canvasToUint8Array(canvas);
}

export async function renderFigure2DebtTrajectoryPng(
  debtTrajectory: DebtCurvePoint[]
): Promise<Uint8Array> {
  const w = 1000;
  const h = 440;
  const { canvas, ctx } = createHiResCanvas(w, h);

  const padL = 75;
  const padR = 45;
  const padT = 65;
  const padB = 60;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  const maxDebt = Math.max(100, ...debtTrajectory.map((d) => Math.max(d.legacyLcncDebt, d.tghmDebt)));
  const toX = (m: number) => padL + (m / 36) * plotW;
  const toY = (v: number) => padT + plotH - (v / maxDebt) * plotH;

  ctx.fillStyle = '#1C1917';
  ctx.font = 'bold 20px Georgia, serif';
  ctx.fillText('Figure 2: 36-Month Technical Debt & Migration Burden Trajectory', 30, 34);

  // Legend
  ctx.font = '13px Calibri, sans-serif';
  ctx.strokeStyle = '#9A3412';
  ctx.lineWidth = 3;
  ctx.setLineDash([7, 5]);
  ctx.beginPath();
  ctx.moveTo(padL, 50);
  ctx.lineTo(padL + 30, 50);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#9A3412';
  ctx.fillText('Monolithic Proprietary LCNC (Debt Units)', padL + 38, 54);

  ctx.strokeStyle = '#1E3A8A';
  ctx.beginPath();
  ctx.moveTo(padL + 340, 50);
  ctx.lineTo(padL + 370, 50);
  ctx.stroke();
  ctx.fillStyle = '#1E3A8A';
  ctx.fillText('TGHM Open-IR Hybrid Architecture', padL + 378, 54);

  // Grid
  ctx.strokeStyle = '#E7E3DA';
  ctx.lineWidth = 1;
  [0, 0.25, 0.5, 0.75, 1].forEach((f) => {
    const y = padT + plotH * (1 - f);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(w - padR, y);
    ctx.stroke();

    ctx.fillStyle = '#78716C';
    ctx.font = '12px Consolas, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${Math.round(maxDebt * f)}`, padL - 10, y + 4);
  });

  debtTrajectory.forEach((pt) => {
    ctx.fillStyle = '#78716C';
    ctx.font = '12px Consolas, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`Month ${pt.month}`, toX(pt.month), h - padB + 24);
  });

  // Legacy Line
  ctx.strokeStyle = '#9A3412';
  ctx.lineWidth = 3.5;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  debtTrajectory.forEach((pt, idx) => {
    const x = toX(pt.month);
    const y = toY(pt.legacyLcncDebt);
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.setLineDash([]);

  // TGHM Line
  ctx.strokeStyle = '#1E3A8A';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  debtTrajectory.forEach((pt, idx) => {
    const x = toX(pt.month);
    const y = toY(pt.tghmDebt);
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Points & Value labels
  debtTrajectory.forEach((pt) => {
    ctx.fillStyle = '#9A3412';
    ctx.beginPath();
    ctx.arc(toX(pt.month), toY(pt.legacyLcncDebt), 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1E3A8A';
    ctx.beginPath();
    ctx.arc(toX(pt.month), toY(pt.tghmDebt), 5, 0, Math.PI * 2);
    ctx.fill();
  });

  return canvasToUint8Array(canvas);
}

export async function renderFigure3SensitivityPng(
  simInput: TghmSimulationInput
): Promise<Uint8Array> {
  const w = 1000;
  const h = 440;
  const { canvas, ctx } = createHiResCanvas(w, h);

  const sweep = computeSensitivityAnalysis(simInput, 15, 'throughput');
  const pts = sweep.sweepPoints;
  const minX = pts[0].xValue;
  const maxX = pts[pts.length - 1].xValue;
  const maxY = Math.max(300, ...pts.map((p) => Math.max(p.tghmEffectiveRps, p.legacyEffectiveRps)));

  const padL = 80;
  const padR = 45;
  const padT = 65;
  const padB = 60;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  const toX = (x: number) => padL + ((x - minX) / Math.max(1, maxX - minX)) * plotW;
  const toY = (y: number) => padT + plotH - (y / maxY) * plotH;

  ctx.fillStyle = '#1C1917';
  ctx.font = 'bold 20px Georgia, serif';
  ctx.fillText('Figure 3: Effective Throughput Sensitivity Across Request Volume (100–2,500 req/s)', 30, 34);

  // Legend
  ctx.font = '13px Calibri, sans-serif';
  ctx.strokeStyle = '#1E3A8A';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(padL, 50);
  ctx.lineTo(padL + 30, 50);
  ctx.stroke();
  ctx.fillStyle = '#1E3A8A';
  ctx.fillText('TGHM AMPO-ZT Effective Throughput (req/s)', padL + 38, 54);

  ctx.strokeStyle = '#9A3412';
  ctx.setLineDash([7, 5]);
  ctx.beginPath();
  ctx.moveTo(padL + 350, 50);
  ctx.lineTo(padL + 380, 50);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#9A3412';
  ctx.fillText('Monolithic Legacy LCNC (req/s)', padL + 388, 54);

  // Gridlines
  ctx.strokeStyle = '#E7E3DA';
  ctx.lineWidth = 1;
  [0, 0.25, 0.5, 0.75, 1].forEach((f) => {
    const y = padT + plotH * (1 - f);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(w - padR, y);
    ctx.stroke();

    ctx.fillStyle = '#78716C';
    ctx.font = '12px Consolas, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${Math.round(maxY * f)}`, padL - 10, y + 4);
  });

  // Regime transition vertical lines
  sweep.regimeTransitions.forEach((tr) => {
    const x = toX(tr.xValue);
    ctx.strokeStyle = '#14532D';
    ctx.lineWidth = 1.8;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(x, padT);
    ctx.lineTo(x, padT + plotH);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#14532D';
    ctx.font = 'bold 11px Consolas, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(tr.label, Math.min(w - 190, x + 6), padT + 16);
  });

  // X ticks
  [0, 3, 6, 9, 12].forEach((idx) => {
    const pt = pts[idx];
    if (!pt) return;
    ctx.fillStyle = '#78716C';
    ctx.font = '12px Consolas, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${pt.xValue} req/s`, toX(pt.xValue), h - padB + 24);
  });

  // Legacy curve
  ctx.strokeStyle = '#9A3412';
  ctx.lineWidth = 3;
  ctx.setLineDash([7, 5]);
  ctx.beginPath();
  pts.forEach((p, idx) => {
    if (idx === 0) ctx.moveTo(toX(p.xValue), toY(p.legacyEffectiveRps));
    else ctx.lineTo(toX(p.xValue), toY(p.legacyEffectiveRps));
  });
  ctx.stroke();
  ctx.setLineDash([]);

  // TGHM curve
  ctx.strokeStyle = '#1E3A8A';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  pts.forEach((p, idx) => {
    if (idx === 0) ctx.moveTo(toX(p.xValue), toY(p.tghmEffectiveRps));
    else ctx.lineTo(toX(p.xValue), toY(p.tghmEffectiveRps));
  });
  ctx.stroke();

  return canvasToUint8Array(canvas);
}

export async function renderFigure4BaselineComparisonPng(): Promise<Uint8Array> {
  const w = 1040;
  const h = 480;
  const { canvas, ctx } = createHiResCanvas(w, h);

  const baselines = evaluateAllFourBaselines(15);
  const maxRps = Math.max(
    400,
    ...baselines.map((b) =>
      Math.max(
        b.output.legacyThroughputRps,
        b.output.effectiveThroughputRps,
        b.tghmGovernedOutput?.effectiveThroughputRps ?? 0
      )
    )
  );
  const niceMax = Math.ceil(maxRps / 250) * 250;

  const padL = 85;
  const padR = 40;
  const padT = 76;
  const padB = 92;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  ctx.fillStyle = '#1C1917';
  ctx.font = 'bold 19px Georgia, serif';
  ctx.fillText('Figure 4: Multi-Baseline Throughput Comparison (Legacy LCNC vs. TGHM AMPO-ZT)', 30, 34);

  // Legend
  ctx.font = '13px Calibri, sans-serif';
  ctx.fillStyle = '#9A3412';
  ctx.fillRect(padL, 48, 16, 12);
  ctx.fillStyle = '#44403C';
  ctx.fillText('Monolithic Legacy LCNC (req/s)', padL + 24, 59);

  ctx.fillStyle = '#1E3A8A';
  ctx.fillRect(padL + 275, 48, 16, 12);
  ctx.fillStyle = '#1E3A8A';
  ctx.fillText('TGHM AMPO-ZT Effective Throughput (req/s)', padL + 299, 59);

  // Gridlines
  ctx.strokeStyle = '#E7E3DA';
  ctx.lineWidth = 1;
  [0, 0.25, 0.5, 0.75, 1].forEach((f) => {
    const y = padT + plotH * (1 - f);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(w - padR, y);
    ctx.stroke();

    ctx.fillStyle = '#78716C';
    ctx.font = '12px Consolas, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${Math.round(niceMax * f)}`, padL - 10, y + 4);
  });

  const groupW = plotW / baselines.length;
  const barW = Math.min(54, groupW * 0.28);
  const gap = 10;

  baselines.forEach((b, idx) => {
    const centerX = padL + idx * groupW + groupW / 2;
    const legacyVal = b.output.legacyThroughputRps;
    const tghmOut = b.tghmGovernedOutput ?? b.output;
    const tghmVal = tghmOut.effectiveThroughputRps;

    const legacyH = (legacyVal / niceMax) * plotH;
    const tghmH = (tghmVal / niceMax) * plotH;

    const xLegacy = centerX - barW - gap / 2;
    const xTghm = centerX + gap / 2;

    ctx.fillStyle = '#9A3412';
    ctx.fillRect(xLegacy, padT + plotH - legacyH, barW, legacyH);
    ctx.fillStyle = '#9A3412';
    ctx.font = 'bold 11px Consolas, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${legacyVal}`, xLegacy + barW / 2, padT + plotH - legacyH - 6);

    ctx.fillStyle = '#1E3A8A';
    ctx.fillRect(xTghm, padT + plotH - tghmH, barW, tghmH);
    ctx.fillStyle = '#1E3A8A';
    ctx.fillText(`${tghmVal}`, xTghm + barW / 2, padT + plotH - tghmH - 6);

    // X-axis label (2 lines)
    ctx.fillStyle = '#1C1917';
    ctx.font = 'bold 12px Calibri, sans-serif';
    const shortTitle =
      b.code === 'B1'
        ? 'B1: Siemens Mendix'
        : b.code === 'B2'
          ? 'B2: Power Apps + AI'
          : b.code === 'B3'
            ? 'B3: 3D-DCM / YOLOv2'
            : 'B4: Citizen GenAI*';
    ctx.fillText(shortTitle, centerX, h - padB + 22);

    ctx.fillStyle = '#57534E';
    ctx.font = '11px Consolas, monospace';
    ctx.fillText(
      `Ω=${tghmOut.omegaScore.toFixed(2)} · G=${tghmOut.governanceScore.toFixed(2)}`,
      centerX,
      h - padB + 40
    );
    ctx.fillStyle = '#14532D';
    ctx.fillText(
      b.throughputGainPct > 0 ? `+${b.throughputGainPct}% vs Legacy` : `SLA Matched`,
      centerX,
      h - padB + 56
    );
  });

  return canvasToUint8Array(canvas);
}

export async function renderFigure5ParadigmComparisonPng(
  simOutput: TghmSimulationOutput
): Promise<Uint8Array> {
  const w = 1040;
  const h = 470;
  const { canvas, ctx } = createHiResCanvas(w, h);

  const rows = getThreeWayParadigmComparison(simOutput);
  const padL = 80;
  const padR = 40;
  const padT = 80;
  const padB = 74;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  ctx.fillStyle = '#1C1917';
  ctx.font = 'bold 19px Georgia, serif';
  ctx.fillText('Figure 5: Three-Way Paradigm Comparison (Legacy LCNC vs. Manual Pro-Code vs. TGHM)', 30, 34);

  // Legend
  ctx.font = '13px Calibri, sans-serif';
  ctx.fillStyle = '#9A3412';
  ctx.fillRect(padL, 48, 16, 12);
  ctx.fillStyle = '#44403C';
  ctx.fillText('Monolithic Legacy LCNC', padL + 24, 59);

  ctx.fillStyle = '#64748B';
  ctx.fillRect(padL + 215, 48, 16, 12);
  ctx.fillStyle = '#44403C';
  ctx.fillText('Manual Pro-Code', padL + 239, 59);

  ctx.fillStyle = '#1E3A8A';
  ctx.fillRect(padL + 390, 48, 16, 12);
  ctx.fillStyle = '#1E3A8A';
  ctx.fillText('TGHM Tri-Strata (Planes I–III)', padL + 414, 59);

  // Gridlines 0..100%
  ctx.strokeStyle = '#E7E3DA';
  ctx.lineWidth = 1;
  [0, 25, 50, 75, 100].forEach((pct) => {
    const y = padT + plotH * (1 - pct / 100);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(w - padR, y);
    ctx.stroke();

    ctx.fillStyle = '#78716C';
    ctx.font = '12px Consolas, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${pct}%`, padL - 10, y + 4);
  });

  const groupW = plotW / rows.length;
  const barW = Math.min(34, groupW * 0.22);
  const gap = 7;

  rows.forEach((r, idx) => {
    const cx = padL + idx * groupW + groupW / 2;
    const h1 = (r.monolithicLcncScore / 100) * plotH;
    const h2 = (r.manualProCodeScore / 100) * plotH;
    const h3 = (r.tghmScore / 100) * plotH;

    const x1 = cx - barW * 1.5 - gap;
    const x2 = cx - barW * 0.5;
    const x3 = cx + barW * 0.5 + gap;

    ctx.fillStyle = '#9A3412';
    ctx.fillRect(x1, padT + plotH - h1, barW, h1);
    ctx.font = 'bold 10px Consolas, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${r.monolithicLcncScore}`, x1 + barW / 2, padT + plotH - h1 - 5);

    ctx.fillStyle = '#64748B';
    ctx.fillRect(x2, padT + plotH - h2, barW, h2);
    ctx.fillText(`${r.manualProCodeScore}`, x2 + barW / 2, padT + plotH - h2 - 5);

    ctx.fillStyle = '#1E3A8A';
    ctx.fillRect(x3, padT + plotH - h3, barW, h3);
    ctx.fillText(`${r.tghmScore}`, x3 + barW / 2, padT + plotH - h3 - 5);

    ctx.fillStyle = '#1C1917';
    ctx.font = 'bold 12px Calibri, sans-serif';
    ctx.fillText(r.dimension, cx, h - padB + 24);
  });

  return canvasToUint8Array(canvas);
}
