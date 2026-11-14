import React, { useState } from 'react';
import {
  BASELINE_PAPER_META,
  DATASET_EXPANSION_SUITE,
  FIGURE_1_ADOPTION_DATA,
  GAP_TRACEABILITY_MATRIX,
  RE_EVALUATION_PROTOCOL,
} from '../data/paperBaseline';

type WorkloadFilter = 'all' | 'Visual LCNC' | 'Hybrid Offload' | 'Edge / Vision';

export const BaselineEvolution: React.FC = () => {
  const [workloadFilter, setWorkloadFilter] = useState<WorkloadFilter>('all');
  const [show2026Projection, setShow2026Projection] = useState<boolean>(true);
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>(DATASET_EXPANSION_SUITE[0].id);

  const filteredAreas =
    workloadFilter === 'all'
      ? FIGURE_1_ADOPTION_DATA
      : FIGURE_1_ADOPTION_DATA.filter((item) => item.primaryWorkload === workloadFilter);

  const selectedDataset =
    DATASET_EXPANSION_SUITE.find((d) => d.id === selectedDatasetId) ?? DATASET_EXPANSION_SUITE[0];

  return (
    <section aria-labelledby="datasets-heading" className="mx-auto max-w-[1360px] px-6 py-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DED9CE] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#78716C]">
            03. Empirical Baseline, Gap Traceability &amp; Dataset Expansion
          </p>
          <h2 id="datasets-heading" className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
            From 2025 Literature Synthesis to Multi-Dataset Re-Evaluation
          </h2>
        </div>
        <p className="max-w-md text-sm text-[#57534E]">
          Connects the {BASELINE_PAPER_META.slrFunnel.includedStudies}-study SLR baseline directly to
          four reproducible benchmark corpora for validating TGHM generalizability.
        </p>
      </div>

      {/* Part A: Complementary Benchmark Datasets + Re-Evaluation Protocol */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 rounded-lg border border-[#DED9CE] bg-white p-6">
          <div className="border-b border-[#ECE8DF] pb-4">
            <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
              Proposed Benchmark Datasets Complementing Ahmed et al. (2025)
            </h3>
            <p className="mt-1 text-xs text-[#57534E]">
              Select any dataset suite to inspect how it expands generalizability beyond the 2025 survey and case reports.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DATASET_EXPANSION_SUITE.map((ds) => {
              const isSelected = ds.id === selectedDataset.id;
              return (
                <button
                  key={ds.id}
                  type="button"
                  onClick={() => setSelectedDatasetId(ds.id)}
                  className={`text-left rounded-md border p-4 transition-colors ${
                    isSelected
                      ? 'border-[#1E3A8A] bg-[#EFF6FF]/60'
                      : 'border-[#E7E3DA] bg-[#FAF9F6] hover:bg-[#F3F0E8]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[#57534E]">
                    <span>{ds.targetTghmPlane}</span>
                    <span>{ds.domain}</span>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-[#1C1917] leading-snug">
                    {ds.name}
                  </p>
                  <p className="mt-1.5 text-xs text-[#57534E] line-clamp-2">
                    {ds.complementsBaseline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Dataset Specification */}
          <div className="mt-5 rounded-md border border-[#E7E3DA] bg-[#F8F6F1] p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-serif text-base font-semibold text-[#1C1917]">
                {selectedDataset.name}
              </h4>
              <span className="font-mono text-xs font-semibold text-[#1E3A8A]">
                Target: {selectedDataset.targetTghmPlane}
              </span>
            </div>
            <dl className="mt-3 space-y-2.5 text-xs sm:text-sm">
              <div>
                <dt className="font-semibold text-[#57534E]">Scale &amp; Ingestion Format</dt>
                <dd className="mt-0.5 font-mono text-xs text-[#1C1917]">{selectedDataset.scaleAndFormat}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#57534E]">Complements 2025 Baseline</dt>
                <dd className="mt-0.5 text-[#44403C]">{selectedDataset.complementsBaseline}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#57534E]">Performance &amp; Generalizability Role</dt>
                <dd className="mt-0.5 text-[#44403C]">{selectedDataset.enhancementRole}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#57534E]">Re-Evaluation Metrics</dt>
                <dd className="mt-1 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-[#14532D]">
                  {selectedDataset.reEvaluationMetrics.map((m) => (
                    <span key={m}>· {m}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right: 5-Step Integration & Re-Evaluation Pipeline */}
        <aside className="lg:col-span-5 rounded-lg border border-[#DED9CE] bg-white p-6">
          <div className="border-b border-[#ECE8DF] pb-4">
            <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
              5-Step Integration &amp; Re-Evaluation Pipeline
            </h3>
            <p className="mt-1 text-xs text-[#57534E]">
              Reproducible workflow for validating TGHM against legacy LCNC and pro-code baselines.
            </p>
          </div>

          <ol className="mt-4 space-y-4">
            {RE_EVALUATION_PROTOCOL.map((item) => (
              <li key={item.step} className="border-b border-[#ECE8DF] pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-xs font-semibold text-[#1E3A8A] tabular-nums">
                    0{item.step}.
                  </span>
                  <h4 className="text-sm font-semibold text-[#1C1917]">{item.title}</h4>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[#44403C]">{item.methodology}</p>
                <p className="mt-1.5 font-mono text-[11px] text-[#78716C]">
                  Artifact: {item.outputArtifact}
                </p>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      {/* Part B: Interactive Reproduction & 2026 Extension of Figure 1 */}
      <div className="rounded-lg border border-[#DED9CE] bg-white p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#ECE8DF] pb-4">
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
              LCNC Adoption by Development Area: 2022–2023 Baseline &amp; 2026 TGHM Horizon
            </h3>
            <p className="mt-1 text-xs text-[#57534E]">
              Source: Ahmed et al. (2025) Figure 1 (n=17,763 Q1 2022; n=8,415 Q3 2023) extended with TGHM Hybrid-Agentic adoption targets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-md bg-[#F3F0E8] p-1">
              {(['all', 'Hybrid Offload', 'Edge / Vision', 'Visual LCNC'] as WorkloadFilter[]).map(
                (flt) => (
                  <button
                    key={flt}
                    type="button"
                    onClick={() => setWorkloadFilter(flt)}
                    className={`rounded px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      workloadFilter === flt
                        ? 'bg-white text-[#1C1917] shadow-xs'
                        : 'text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    {flt === 'all' ? 'All 13 Areas' : flt}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              onClick={() => setShow2026Projection(!show2026Projection)}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                show2026Projection
                  ? 'border-[#1E3A8A] bg-[#EFF6FF] text-[#1E3A8A]'
                  : 'border-[#CFC8B8] bg-white text-[#57534E]'
              }`}
            >
              {show2026Projection ? '2026 TGHM Overlay: On' : '2026 TGHM Overlay: Off'}
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-3.5">
          {filteredAreas.map((row) => (
            <div
              key={row.area}
              className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center text-xs"
            >
              <div className="md:col-span-4 flex items-center justify-between md:justify-start gap-2">
                <span className="font-medium text-[#1C1917]">{row.area}</span>
                <span className="font-mono text-[11px] text-[#78716C] shrink-0">
                  ({row.primaryWorkload})
                </span>
              </div>
              <div className="md:col-span-8 space-y-1">
                {/* Q1 2022 */}
                <div className="flex items-center gap-2">
                  <span className="w-14 font-mono text-[11px] text-[#78716C] shrink-0">Q1 2022</span>
                  <div className="flex-1 h-2 rounded-xs bg-[#F3F0E8] overflow-hidden">
                    <div
                      className="h-full bg-[#94A3B8]"
                      style={{ width: `${row.q1_2022}%` }}
                    />
                  </div>
                  <span className="w-9 text-right font-mono tabular-nums text-[#57534E]">
                    {row.q1_2022}%
                  </span>
                </div>
                {/* Q3 2023 */}
                <div className="flex items-center gap-2">
                  <span className="w-14 font-mono text-[11px] text-[#57534E] shrink-0">Q3 2023</span>
                  <div className="flex-1 h-2 rounded-xs bg-[#F3F0E8] overflow-hidden">
                    <div
                      className="h-full bg-[#475569]"
                      style={{ width: `${row.q3_2023}%` }}
                    />
                  </div>
                  <span className="w-9 text-right font-mono font-semibold tabular-nums text-[#1C1917]">
                    {row.q3_2023}%
                  </span>
                </div>
                {/* 2026 TGHM */}
                {show2026Projection && (
                  <div className="flex items-center gap-2">
                    <span className="w-14 font-mono text-[11px] font-semibold text-[#1E3A8A] shrink-0">
                      2026*
                    </span>
                    <div className="flex-1 h-2 rounded-xs bg-[#EFF6FF] overflow-hidden">
                      <div
                        className="h-full bg-[#1E3A8A]"
                        style={{ width: `${row.projected_2026_tghm}%` }}
                      />
                    </div>
                    <span className="w-9 text-right font-mono font-semibold tabular-nums text-[#1E3A8A]">
                      {row.projected_2026_tghm}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part C: Gap-to-Model Traceability Table */}
      <div className="rounded-lg border border-[#DED9CE] bg-white p-6">
        <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
          2025 Research Gap to 2026 TGHM Contribution Traceability Matrix
        </h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#DED9CE] text-xs uppercase tracking-wider text-[#78716C]">
                <th className="py-3 pr-4 font-semibold">2025 Section &amp; Citation</th>
                <th className="py-3 pr-4 font-semibold">Identified Limitation</th>
                <th className="py-3 pr-4 font-semibold">TGHM Mechanism</th>
                <th className="py-3 font-semibold">Target Validation Metric</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE8DF]">
              {GAP_TRACEABILITY_MATRIX.map((row) => (
                <tr key={row.id} className="align-top">
                  <td className="py-3.5 pr-4 whitespace-nowrap">
                    <div className="font-semibold text-[#1C1917]">{row.sourceSection}</div>
                    <div className="font-mono text-xs text-[#78716C]">{row.citationRef}</div>
                  </td>
                  <td className="py-3.5 pr-4">
                    <div className="font-semibold text-[#9A3412]">{row.baselineProblem}</div>
                    <div className="mt-1 text-xs text-[#57534E]">{row.empiricalAnchor}</div>
                  </td>
                  <td className="py-3.5 pr-4">
                    <div className="font-mono text-xs font-semibold text-[#1E3A8A]">
                      {row.tghmPlane} · {row.tghmModule}
                    </div>
                    <div className="mt-1 text-xs text-[#44403C]">{row.newContribution}</div>
                  </td>
                  <td className="py-3.5 font-mono text-xs text-[#14532D]">
                    {row.validationMetric}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
