import React, { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, RotateCcw, ShieldAlert } from 'lucide-react';
import {
  computeSensitivityAnalysis,
  ModelWorkloadType,
  SCENARIO_PRESETS,
  TghmSimulationInput,
  TghmSimulationOutput,
  WORKLOAD_COMPLEXITY_MAP,
} from '../model/tghmEngine';

interface WorkloadSimulatorProps {
  input: TghmSimulationInput;
  output: TghmSimulationOutput;
  onChangeInput: (next: TghmSimulationInput) => void;
}

export const WorkloadSimulator: React.FC<WorkloadSimulatorProps> = ({
  input,
  output,
  onChangeInput,
}) => {
  const [perturbationPct, setPerturbationPct] = useState<number>(15);
  const [sweepAxis, setSweepAxis] = useState<'infraLatency' | 'throughput'>('infraLatency');

  const sensitivity = useMemo(
    () => computeSensitivityAnalysis(input, perturbationPct, sweepAxis),
    [input, perturbationPct, sweepAxis]
  );

  const applyPreset = (presetId: string) => {
    const preset = SCENARIO_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      onChangeInput({ ...preset.input });
    }
  };

  // SVG chart bounds for 36-Month Technical Debt Trajectory
  const maxDebt = Math.max(
    100,
    ...output.debtTrajectory.map((d) => Math.max(d.legacyLcncDebt, d.tghmDebt))
  );
  const svgW = 540;
  const svgH = 210;
  const padL = 44;
  const padR = 18;
  const padT = 18;
  const padB = 30;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const toX = (month: number) => padL + (month / 36) * plotW;
  const toY = (val: number) => padT + plotH - (val / maxDebt) * plotH;

  const legacyPath = output.debtTrajectory
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${toX(pt.month).toFixed(1)} ${toY(pt.legacyLcncDebt).toFixed(1)}`)
    .join(' ');
  const tghmPath = output.debtTrajectory
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${toX(pt.month).toFixed(1)} ${toY(pt.tghmDebt).toFixed(1)}`)
    .join(' ');

  return (
    <section aria-labelledby="simulator-heading" className="mx-auto max-w-[1360px] px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DED9CE] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#78716C]">
            02. Interactive AMPO-ZT &amp; Governance Sandbox
          </p>
          <h2 id="simulator-heading" className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
            Live Workload Partitioning &amp; Technical Debt Simulator
          </h2>
        </div>
        <button
          type="button"
          onClick={() => applyPreset('siemens-mendix')}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#CFC8B8] bg-white px-3 py-1.5 text-xs font-semibold text-[#1C1917] hover:bg-[#EFECE4] whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Reset to Baseline</span>
        </button>
      </div>

      {/* Case-Study Preset Selector Bar */}
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
          Load Case Study from Ahmed et al. (2025)
        </p>
        <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SCENARIO_PRESETS.map((preset) => {
            const active = input.presetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id)}
                className={`text-left rounded-md border p-3.5 transition-colors ${
                  active
                    ? 'border-[#1E3A8A] bg-[#EFF6FF]/60'
                    : 'border-[#DED9CE] bg-white hover:bg-[#F3F0E8]'
                }`}
              >
                <p className="text-sm font-semibold text-[#1C1917]">{preset.label}</p>
                <p className="mt-1 text-xs text-[#57534E] line-clamp-2">{preset.subtitle}</p>
                <p className="mt-2 font-mono text-[11px] text-[#78716C]">{preset.sourceCitation}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two-Zone Sandbox Layout: 65% Stage / 35% Control Deck */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Live Output Stage */}
        <div className="lg:col-span-7 space-y-6">
          {/* Primary Routing & Governance Verdict */}
          <div className="rounded-lg border border-[#DED9CE] bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECE8DF] pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                  AMPO-ZT Partitioning Decision
                </p>
                <h3 className="mt-1 font-serif text-xl font-semibold text-[#1C1917]">
                  {output.routingDecision}
                </h3>
              </div>

              {/* Dual-coded state indicator (Icon + Explicit Text Label) */}
              <div
                className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-semibold ${
                  output.governanceState === 'Verified'
                    ? 'border-[#BBF7D0] bg-[#F0FDF4] text-[#14532D]'
                    : output.governanceState === 'Review Required'
                      ? 'border-[#FDE68A] bg-[#FFFBEB] text-[#92400E]'
                      : 'border-[#FECACA] bg-[#FEF2F2] text-[#9A3412]'
                }`}
              >
                {output.governanceState === 'Verified' ? (
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                ) : output.governanceState === 'Review Required' ? (
                  <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                )}
                <span>Gate Status: {output.governanceState}</span>
              </div>
            </div>

            {/* Tabular Telemetry Grid */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div>
                <p className="text-xs text-[#57534E]">Effective Throughput</p>
                <p className="mt-1 font-mono text-xl font-semibold text-[#14532D] tabular-nums">
                  {output.effectiveThroughputRps} <span className="text-xs font-normal">req/s</span>
                </p>
                <p className="text-[11px] text-[#78716C] tabular-nums">
                  Cap: {output.saturationCapacityRps} · Legacy: {output.legacyThroughputRps}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#57534E]">Offload Index Ω(w)</p>
                <p className="mt-1 font-mono text-xl font-semibold text-[#1E3A8A] tabular-nums">
                  {output.omegaScore.toFixed(3)}
                </p>
                <p className="text-[11px] text-[#78716C]">Threshold ≥ 0.68 offload</p>
              </div>
              <div>
                <p className="text-xs text-[#57534E]">Est. End-to-End Latency</p>
                <p
                  className={`mt-1 font-mono text-xl font-semibold tabular-nums ${
                    output.slaSatisfied ? 'text-[#14532D]' : 'text-[#9A3412]'
                  }`}
                >
                  {output.estimatedLatencyMs} ms
                </p>
                <p className="text-[11px] text-[#78716C]">
                  {output.slaSatisfied ? 'Within' : 'Exceeds'} {input.latencySlaMs} ms SLA
                </p>
              </div>
              <div>
                <p className="text-xs text-[#57534E]">Governance G_score</p>
                <p className="mt-1 font-mono text-xl font-semibold text-[#1C1917] tabular-nums">
                  {output.governanceScore.toFixed(2)}
                </p>
                <p className="text-[11px] text-[#78716C]">Target ≥ 0.85</p>
              </div>
              <div>
                <p className="text-xs text-[#57534E]">Open-IR Portability Π_IR</p>
                <p className="mt-1 font-mono text-xl font-semibold text-[#1C1917] tabular-nums">
                  {output.portabilityIndexPct}%
                </p>
                <p className="text-[11px] text-[#78716C]">
                  SDLC Speedup: {output.sdlcAccelerationPct}%
                </p>
              </div>
            </div>

            {/* Plane III Policy Gate Audit Breakdown */}
            <div className="mt-6 border-t border-[#ECE8DF] pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                Plane III Pre-Deployment Policy &amp; RBAC Checks
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {output.policyChecks.map((chk) => (
                  <div
                    key={chk.id}
                    className="rounded-md border border-[#E7E3DA] bg-[#FAF9F6] p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#1C1917]">{chk.label}</span>
                      <span
                        className={`font-mono text-[11px] font-semibold ${
                          chk.passed ? 'text-[#14532D]' : 'text-[#9A3412]'
                        }`}
                      >
                        {chk.passed ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#57534E]">{chk.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 36-Month Technical Debt Trajectory Chart */}
          <div className="rounded-lg border border-[#DED9CE] bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                  36-Month Technical Debt &amp; Migration Burden Trajectory
                </h3>
                <p className="text-xs text-[#57534E]">
                  Comparing Monolithic Proprietary LCNC (SoftwareX 2022 baseline) vs. TGHM Open-IR
                </p>
              </div>
              <span className="font-mono text-sm font-semibold text-[#14532D] tabular-nums">
                -{output.debtReductionPct}% Debt at Month 36
              </span>
            </div>

            <div className="mt-4 overflow-x-auto">
              <svg
                viewBox={`0 0 ${svgW} ${svgH}`}
                className="w-full h-auto max-h-[240px]"
                role="img"
                aria-label="36-month technical debt comparison curve between Legacy LCNC and TGHM"
              >
                {/* Horizontal gridlines */}
                {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
                  const y = padT + plotH * (1 - frac);
                  const val = Math.round(maxDebt * frac);
                  return (
                    <g key={frac}>
                      <line
                        x1={padL}
                        y1={y}
                        x2={svgW - padR}
                        y2={y}
                        stroke="#E7E3DA"
                        strokeDasharray="3 3"
                      />
                      <text
                        x={padL - 8}
                        y={y + 4}
                        textAnchor="end"
                        className="fill-[#78716C] font-mono text-[10px]"
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* X-axis labels */}
                {output.debtTrajectory.map((pt) => (
                  <text
                    key={pt.month}
                    x={toX(pt.month)}
                    y={svgH - 8}
                    textAnchor="middle"
                    className="fill-[#78716C] font-mono text-[10px]"
                  >
                    M{pt.month}
                  </text>
                ))}

                {/* Curves */}
                <path
                  d={legacyPath}
                  fill="none"
                  stroke="#9A3412"
                  strokeWidth={2.5}
                  strokeDasharray="6 4"
                />
                <path d={tghmPath} fill="none" stroke="#1E3A8A" strokeWidth={2.75} />

                {/* Data points */}
                {output.debtTrajectory.map((pt) => (
                  <g key={pt.month}>
                    <circle
                      cx={toX(pt.month)}
                      cy={toY(pt.legacyLcncDebt)}
                      r={3.5}
                      fill="#9A3412"
                    />
                    <circle cx={toX(pt.month)} cy={toY(pt.tghmDebt)} r={3.5} fill="#1E3A8A" />
                  </g>
                ))}
              </svg>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-6 text-xs text-[#57534E]">
              <div className="flex items-center gap-2">
                <span className="inline-block h-0.5 w-5 border-t-2 border-dashed border-[#9A3412]" />
                <span>Monolithic Proprietary LCNC (Debt Units)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-0.5 w-5 bg-[#1E3A8A]" />
                <span>TGHM Open-IR Hybrid Architecture</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Zone: Parameter Control Deck */}
        <aside className="lg:col-span-5 rounded-lg border border-[#DED9CE] bg-white p-6 space-y-5">
          <div className="border-b border-[#ECE8DF] pb-3">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Simulation Parameters
            </h3>
            <p className="text-xs text-[#57534E]">
              Adjust workload scale, AI complexity, and Plane III governance thresholds.
            </p>
          </div>

          {/* Workload Model Class */}
          <div>
            <label htmlFor="workload-select" className="block text-xs font-semibold text-[#1C1917]">
              AI / Application Workload Class
            </label>
            <select
              id="workload-select"
              value={input.workloadType}
              onChange={(e) =>
                onChangeInput({
                  ...input,
                  presetId: 'custom',
                  workloadType: e.target.value as ModelWorkloadType,
                })
              }
              className="mt-1.5 w-full rounded-md border border-[#CFC8B8] bg-[#FAF9F6] px-3 py-2 text-sm text-[#1C1917] focus-visible:outline-2 focus-visible:outline-[#1E3A8A]"
            >
              {Object.entries(WORKLOAD_COMPLEXITY_MAP).map(([key, meta]) => (
                <option key={key} value={key}>
                  {meta.label} (C={meta.normalizedC.toFixed(2)})
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-[#57534E]">
              {WORKLOAD_COMPLEXITY_MAP[input.workloadType].description}
            </p>
          </div>

          {/* Throughput Slider */}
          <div>
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="throughput-slider" className="font-semibold text-[#1C1917]">
                Payload Throughput (λ)
              </label>
              <span className="font-mono font-semibold text-[#1E3A8A] tabular-nums">
                {input.throughputRps} req/s
              </span>
            </div>
            <input
              id="throughput-slider"
              type="range"
              min={10}
              max={2500}
              step={10}
              value={input.throughputRps}
              onChange={(e) =>
                onChangeInput({
                  ...input,
                  presetId: 'custom',
                  throughputRps: Number(e.target.value),
                })
              }
              className="mt-2 w-full accent-[#1E3A8A]"
            />
            <div className="flex justify-between font-mono text-[11px] text-[#78716C]">
              <span>10 req/s</span>
              <span>1,250 req/s</span>
              <span>2,500 req/s</span>
            </div>
          </div>

          {/* Latency SLA Slider */}
          <div>
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="sla-slider" className="font-semibold text-[#1C1917]">
                Latency SLA Bound (L_max)
              </label>
              <span className="font-mono font-semibold text-[#1E3A8A] tabular-nums">
                {input.latencySlaMs} ms
              </span>
            </div>
            <input
              id="sla-slider"
              type="range"
              min={50}
              max={1000}
              step={5}
              value={input.latencySlaMs}
              onChange={(e) =>
                onChangeInput({
                  ...input,
                  presetId: 'custom',
                  latencySlaMs: Number(e.target.value),
                })
              }
              className="mt-2 w-full accent-[#1E3A8A]"
            />
            <div className="flex justify-between font-mono text-[11px] text-[#78716C]">
              <span>50 ms (Strict)</span>
              <span>500 ms</span>
              <span>1,000 ms</span>
            </div>
          </div>

          {/* Infrastructure Network / Serialization Latency Slider */}
          <div>
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="infra-slider" className="font-semibold text-[#1C1917]">
                Infrastructure Base Latency (L_infra)
              </label>
              <span className="font-mono font-semibold text-[#1E3A8A] tabular-nums">
                {input.infraLatencyMs ?? 14} ms
              </span>
            </div>
            <input
              id="infra-slider"
              type="range"
              min={2}
              max={80}
              step={1}
              value={input.infraLatencyMs ?? 14}
              onChange={(e) =>
                onChangeInput({
                  ...input,
                  presetId: 'custom',
                  infraLatencyMs: Number(e.target.value),
                })
              }
              className="mt-2 w-full accent-[#1E3A8A]"
            />
            <div className="flex justify-between font-mono text-[11px] text-[#78716C]">
              <span>2 ms (Local)</span>
              <span>40 ms</span>
              <span>80 ms (Cross-Region)</span>
            </div>
          </div>

          {/* Customizability Need */}
          <div>
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="delta-slider" className="font-semibold text-[#1C1917]">
                Domain Customizability Deficit (δ)
              </label>
              <span className="font-mono font-semibold text-[#1E3A8A] tabular-nums">
                {input.customizabilityNeed.toFixed(2)}
              </span>
            </div>
            <input
              id="delta-slider"
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={input.customizabilityNeed}
              onChange={(e) =>
                onChangeInput({
                  ...input,
                  presetId: 'custom',
                  customizabilityNeed: Number(e.target.value),
                })
              }
              className="mt-2 w-full accent-[#1E3A8A]"
            />
          </div>

          {/* HITL Confidence Threshold */}
          <div>
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="tau-slider" className="font-semibold text-[#1C1917]">
                HITL Confidence Gate Threshold (τ)
              </label>
              <span className="font-mono font-semibold text-[#1E3A8A] tabular-nums">
                {input.hitlConfidenceTau.toFixed(2)}
              </span>
            </div>
            <input
              id="tau-slider"
              type="range"
              min={0.5}
              max={0.99}
              step={0.01}
              value={input.hitlConfidenceTau}
              onChange={(e) =>
                onChangeInput({
                  ...input,
                  presetId: 'custom',
                  hitlConfidenceTau: Number(e.target.value),
                })
              }
              className="mt-2 w-full accent-[#1E3A8A]"
            />
          </div>

          {/* PII Tier & Portability Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label htmlFor="pii-select" className="block text-xs font-semibold text-[#1C1917]">
                Data / PII Tier
              </label>
              <select
                id="pii-select"
                value={input.piiTier}
                onChange={(e) =>
                  onChangeInput({
                    ...input,
                    presetId: 'custom',
                    piiTier: e.target.value as TghmSimulationInput['piiTier'],
                  })
                }
                className="mt-1.5 w-full rounded-md border border-[#CFC8B8] bg-[#FAF9F6] px-2.5 py-2 text-xs font-medium text-[#1C1917]"
              >
                <option value="public">Public Telemetry</option>
                <option value="internal">Internal Enterprise</option>
                <option value="regulated">Regulated PII / HIPAA</option>
              </select>
            </div>

            <div>
              <label htmlFor="ir-select" className="block text-xs font-semibold text-[#1C1917]">
                Intermediate Compiler
              </label>
              <select
                id="ir-select"
                value={input.portabilityMode}
                onChange={(e) =>
                  onChangeInput({
                    ...input,
                    presetId: 'custom',
                    portabilityMode: e.target.value as TghmSimulationInput['portabilityMode'],
                  })
                }
                className="mt-1.5 w-full rounded-md border border-[#CFC8B8] bg-[#FAF9F6] px-2.5 py-2 text-xs font-medium text-[#1C1917]"
              >
                <option value="open-ir-bridge">TGHM Open-IR Bridge</option>
                <option value="proprietary-dsl">Proprietary Vendor DSL</option>
              </select>
            </div>
          </div>

          {/* Static Policy Gate Toggle */}
          <div className="flex items-center justify-between rounded-md border border-[#E7E3DA] bg-[#FAF9F6] px-3.5 py-3">
            <div>
              <p className="text-xs font-semibold text-[#1C1917]">
                Plane III Static AST Policy &amp; RBAC Gate
              </p>
              <p className="text-[11px] text-[#57534E]">
                Enforces least-privilege auth before deployment
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={input.staticPolicyGateEnabled}
              onClick={() =>
                onChangeInput({
                  ...input,
                  presetId: 'custom',
                  staticPolicyGateEnabled: !input.staticPolicyGateEnabled,
                })
              }
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                input.staticPolicyGateEnabled
                  ? 'bg-[#14532D] text-white'
                  : 'bg-[#9A3412] text-white'
              }`}
            >
              {input.staticPolicyGateEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </aside>
      </div>

      {/* Full-Width Sensitivity Analysis Panel */}
      <div className="mt-8 rounded-lg border border-[#DED9CE] bg-white p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#ECE8DF] pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#78716C]">
              Sensitivity &amp; Elasticity Analysis
            </p>
            <h3 className="mt-1 font-serif text-xl font-semibold text-[#1C1917]">
              Impact of Input Perturbations on Effective System Throughput
            </h3>
            <p className="mt-1 text-xs text-[#57534E]">
              Quantifies how minor shifts in request volume, infrastructure latency, SLA bounds, or model complexity alter delivered goodput (req/s) and trigger AMPO-ZT offload transitions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Sweep Axis Selector */}
            <div className="flex items-center gap-1 rounded-md bg-[#F3F0E8] p-1">
              <button
                type="button"
                onClick={() => setSweepAxis('infraLatency')}
                className={`rounded px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  sweepAxis === 'infraLatency'
                    ? 'bg-white text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                Sweep: Infra Latency
              </button>
              <button
                type="button"
                onClick={() => setSweepAxis('throughput')}
                className={`rounded px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  sweepAxis === 'throughput'
                    ? 'bg-white text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                Sweep: Request Volume
              </button>
            </div>

            {/* Perturbation Delta Selector */}
            <div className="flex items-center gap-1 rounded-md bg-[#F3F0E8] p-1">
              {[5, 10, 15, 25].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setPerturbationPct(pct)}
                  className={`rounded px-2.5 py-1 font-mono text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    perturbationPct === pct
                      ? 'bg-white text-[#1E3A8A] font-semibold shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  ±{pct}%
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Sweep Response Curve SVG */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between text-xs text-[#57534E]">
              <span className="font-semibold text-[#1C1917]">
                {sweepAxis === 'infraLatency'
                  ? 'Delivered Throughput vs. Infrastructure Latency (2–80 ms)'
                  : 'Delivered Throughput vs. Incoming Request Volume (100–2,500 req/s)'}
              </span>
              <span className="font-mono text-[11px]">
                Current: {sweepAxis === 'infraLatency' ? `${input.infraLatencyMs ?? 14} ms` : `${input.throughputRps} req/s`}
              </span>
            </div>

            {(() => {
              const pts = sensitivity.sweepPoints;
              const minX = pts[0].xValue;
              const maxX = pts[pts.length - 1].xValue;
              const maxY = Math.max(
                200,
                ...pts.map((p) => Math.max(p.tghmEffectiveRps, p.legacyEffectiveRps))
              );
              const sW = 540;
              const sH = 230;
              const pL = 48;
              const pR = 18;
              const pT = 22;
              const pB = 34;
              const plW = sW - pL - pR;
              const plH = sH - pT - pB;

              const sx = (x: number) => pL + ((x - minX) / Math.max(1, maxX - minX)) * plW;
              const sy = (y: number) => pT + plH - (y / maxY) * plH;

              const tghmSweepPath = pts
                .map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.xValue).toFixed(1)} ${sy(p.tghmEffectiveRps).toFixed(1)}`)
                .join(' ');
              const legacySweepPath = pts
                .map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.xValue).toFixed(1)} ${sy(p.legacyEffectiveRps).toFixed(1)}`)
                .join(' ');

              const currentXVal =
                sweepAxis === 'infraLatency' ? (input.infraLatencyMs ?? 14) : input.throughputRps;
              const clampedCurX = Math.min(maxX, Math.max(minX, currentXVal));

              return (
                <div className="mt-3 overflow-x-auto">
                  <svg
                    viewBox={`0 0 ${sW} ${sH}`}
                    className="w-full h-auto max-h-[250px]"
                    role="img"
                    aria-label="Throughput sensitivity sweep curve comparing TGHM and Monolithic LCNC"
                  >
                    {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
                      const y = pT + plH * (1 - frac);
                      const val = Math.round(maxY * frac);
                      return (
                        <g key={frac}>
                          <line
                            x1={pL}
                            y1={y}
                            x2={sW - pR}
                            y2={y}
                            stroke="#E7E3DA"
                            strokeDasharray="3 3"
                          />
                          <text
                            x={pL - 8}
                            y={y + 4}
                            textAnchor="end"
                            className="fill-[#78716C] font-mono text-[10px]"
                          >
                            {val}
                          </text>
                        </g>
                      );
                    })}

                    {/* Regime Transition Vertical Markers */}
                    {sensitivity.regimeTransitions.map((tr) => (
                      <g key={`${tr.xValue}-${tr.label}`}>
                        <line
                          x1={sx(tr.xValue)}
                          y1={pT}
                          x2={sx(tr.xValue)}
                          y2={pT + plH}
                          stroke="#14532D"
                          strokeWidth={1.25}
                          strokeDasharray="4 3"
                        />
                        <text
                          x={Math.min(sW - 80, sx(tr.xValue) + 4)}
                          y={pT + 10}
                          className="fill-[#14532D] font-mono text-[9px] font-semibold"
                        >
                          {tr.label}
                        </text>
                      </g>
                    ))}

                    {/* Current Operating Point Line */}
                    <line
                      x1={sx(clampedCurX)}
                      y1={pT}
                      x2={sx(clampedCurX)}
                      y2={pT + plH}
                      stroke="#1C1917"
                      strokeWidth={1.2}
                      strokeDasharray="2 2"
                    />

                    {/* X-axis tick labels (5 evenly spaced) */}
                    {[0, 3, 6, 9, 12].map((idx) => {
                      const pt = pts[idx];
                      if (!pt) return null;
                      return (
                        <text
                          key={pt.xValue}
                          x={sx(pt.xValue)}
                          y={sH - 10}
                          textAnchor="middle"
                          className="fill-[#78716C] font-mono text-[10px]"
                        >
                          {sweepAxis === 'infraLatency' ? `${pt.xValue}ms` : `${pt.xValue}`}
                        </text>
                      );
                    })}

                    <path
                      d={legacySweepPath}
                      fill="none"
                      stroke="#9A3412"
                      strokeWidth={2.25}
                      strokeDasharray="5 4"
                    />
                    <path d={tghmSweepPath} fill="none" stroke="#1E3A8A" strokeWidth={2.75} />

                    <circle
                      cx={sx(clampedCurX)}
                      cy={sy(output.effectiveThroughputRps)}
                      r={4.5}
                      fill="#1E3A8A"
                      stroke="#FFFFFF"
                      strokeWidth={1.5}
                    />
                  </svg>
                </div>
              );
            })()}

            <div className="mt-2 flex flex-wrap items-center gap-5 text-xs text-[#57534E]">
              <div className="flex items-center gap-2">
                <span className="inline-block h-0.5 w-5 bg-[#1E3A8A]" />
                <span>TGHM Effective Throughput (req/s)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-0.5 w-5 border-t-2 border-dashed border-[#9A3412]" />
                <span>Monolithic Legacy LCNC (req/s)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-0.5 border-l border-dashed border-[#14532D]" />
                <span>AMPO-ZT Regime Transition</span>
              </div>
            </div>
          </div>

          {/* Right: Elasticity & Perturbation Impact Table */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between text-xs text-[#57534E]">
              <span className="font-semibold text-[#1C1917]">
                One-at-a-Time (±{perturbationPct}%) Parameter Elasticity Breakdown
              </span>
              <span className="font-mono text-[11px]">
                Base: {output.effectiveThroughputRps} req/s
              </span>
            </div>

            <div className="mt-3 overflow-x-auto border-t border-[#ECE8DF]">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#DED9CE] text-[11px] uppercase tracking-wider text-[#78716C]">
                    <th className="py-2.5 pr-3 font-semibold">Input Factor</th>
                    <th className="py-2.5 pr-3 font-semibold text-right">-{perturbationPct}%</th>
                    <th className="py-2.5 pr-3 font-semibold text-right">+{perturbationPct}%</th>
                    <th className="py-2.5 pr-3 font-semibold text-right">Swing</th>
                    <th className="py-2.5 font-semibold text-right">Elasticity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECE8DF]">
                  {sensitivity.factors.map((f) => {
                    const maxSwing = Math.max(1, ...sensitivity.factors.map((x) => x.swingRps));
                    const barPct = Math.round((f.swingRps / maxSwing) * 100);
                    return (
                      <tr key={f.id} className="align-top">
                        <td className="py-3 pr-3">
                          <div className="font-semibold text-[#1C1917]">{f.label}</div>
                          <div className="mt-0.5 font-mono text-[11px] text-[#78716C]">
                            Base: {f.baselineDisplay}
                            {f.regimeShiftTriggered && (
                              <span className="ml-2 font-sans font-semibold text-[#9A3412]">
                                · Triggers Offload Regime Shift
                              </span>
                            )}
                          </div>
                          <div className="mt-1.5 h-1.5 w-full rounded-xs bg-[#F3F0E8] overflow-hidden">
                            <div
                              className={`h-full ${
                                f.regimeShiftTriggered ? 'bg-[#9A3412]' : 'bg-[#1E3A8A]'
                              }`}
                              style={{ width: `${barPct}%` }}
                            />
                          </div>
                        </td>
                        <td className="py-3 pr-3 text-right font-mono tabular-nums text-[#1C1917] whitespace-nowrap">
                          {f.lowEffectiveRps} req/s
                        </td>
                        <td className="py-3 pr-3 text-right font-mono tabular-nums text-[#1C1917] whitespace-nowrap">
                          {f.highEffectiveRps} req/s
                        </td>
                        <td className="py-3 pr-3 text-right font-mono font-semibold tabular-nums text-[#1E3A8A] whitespace-nowrap">
                          {f.swingRps} req/s
                        </td>
                        <td className="py-3 text-right font-mono font-semibold tabular-nums text-[#14532D] whitespace-nowrap">
                          {f.elasticityRatio.toFixed(2)}×
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
