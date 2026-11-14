import React, { useState } from 'react';
import { Check, Copy, Download, Printer } from 'lucide-react';
import {
  AFFILIATIONS,
  AUTHORS,
  BASELINE_PAPER_META,
  DATASET_EXPANSION_SUITE,
  FIGURE_1_ADOPTION_DATA,
  GAP_TRACEABILITY_MATRIX,
  RE_EVALUATION_PROTOCOL,
  REFERENCES_LIST,
} from '../data/paperBaseline';
import {
  AMPO_ZT_ALGORITHM_STEPS,
  buildUpdatedPaperSections,
  generateBibtexSource,
  generateLatexSource,
  generateMarkdownSource,
  ManuscriptConfig,
} from '../data/manuscriptGenerator';
import { generateWordDocBlob } from '../data/wordDocGenerator';
import {
  computeSensitivityAnalysis,
  evaluateAllFourBaselines,
  getPlaneEvaluationSummaries,
  getThreeWayParadigmComparison,
  TghmSimulationInput,
  TghmSimulationOutput,
  WORKLOAD_COMPLEXITY_MAP,
} from '../model/tghmEngine';

interface ManuscriptStudioProps {
  config: ManuscriptConfig;
  onChangeConfig: (next: ManuscriptConfig) => void;
  simInput: TghmSimulationInput;
  simOutput: TghmSimulationOutput;
}

export const ManuscriptStudio: React.FC<ManuscriptStudioProps> = ({
  config,
  onChangeConfig,
  simInput,
  simOutput,
}) => {
  const [copiedFormat, setCopiedFormat] = useState<'latex' | 'bibtex' | 'markdown' | null>(null);
  const [previewMode, setPreviewMode] = useState<'formatted' | 'latex'>('formatted');
  const [isExportingWord, setIsExportingWord] = useState<boolean>(false);

  const sections = buildUpdatedPaperSections(config, simInput, simOutput);
  const latexSource = generateLatexSource(config, simInput, simOutput);
  const bibtexSource = generateBibtexSource(config);
  const markdownSource = generateMarkdownSource(config, simInput, simOutput);
  const fourBaselines = evaluateAllFourBaselines(15);
  const sensitivity = computeSensitivityAnalysis(simInput, 15, 'throughput');
  const planeSummaries = getPlaneEvaluationSummaries(simOutput);
  const paradigmRows = getThreeWayParadigmComparison(simOutput);

  const handleCopy = async (kind: 'latex' | 'bibtex' | 'markdown', content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedFormat(kind);
      setTimeout(() => setCopiedFormat(null), 2200);
    } catch {
      // Clipboard blocked in restricted context; trigger download fallback
      handleDownload(
        kind === 'latex' ? 'tghm_updated_paper.tex' : kind === 'bibtex' ? 'references.bib' : 'tghm_updated_paper.md',
        content
      );
    }
  };

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadWord = async () => {
    try {
      setIsExportingWord(true);
      const blob = await generateWordDocBlob(config, simInput, simOutput);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'TGHM_Updated_Research_Paper_2026.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setIsExportingWord(false);
    }
  };

  return (
    <section aria-labelledby="manuscript-heading" className="mx-auto max-w-[1360px] px-6 py-10">
      <div className="no-print flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DED9CE] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#78716C]">
            04. Updated 2026 Publication Studio
          </p>
          <h2 id="manuscript-heading" className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
            Publication-Ready Manuscript &amp; LaTeX Exporter
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-md bg-[#EFECE4] p-1">
            <button
              type="button"
              onClick={() => setPreviewMode('formatted')}
              className={`rounded px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                previewMode === 'formatted' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-[#57534E]'
              }`}
            >
              Formatted Paper
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode('latex')}
              className={`rounded px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                previewMode === 'latex' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-[#57534E]'
              }`}
            >
              LaTeX Source
            </button>
          </div>

          <button
            type="button"
            onClick={handleDownloadWord}
            disabled={isExportingWord}
            className="inline-flex items-center gap-1.5 rounded-md bg-[#1E3A8A] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#172554] disabled:opacity-60 whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{isExportingWord ? 'Generating .docx...' : 'Download Word (.docx)'}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#CFC8B8] bg-white px-3 py-2 text-xs font-semibold text-[#1C1917] hover:bg-[#EFECE4] whitespace-nowrap shrink-0"
          >
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Asymmetric 70/30 Editorial Canvas */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left/Center 70%: Formatted Academic Manuscript or LaTeX Code */}
        <article className="lg:col-span-8 print-only-full rounded-lg border border-[#DED9CE] bg-white p-8 sm:p-10">
          {previewMode === 'latex' ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECE8DF] pb-4">
                <span className="font-mono text-xs font-semibold text-[#1E3A8A]">
                  tghm_updated_paper.tex · Overleaf Ready
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy('latex', latexSource)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#CFC8B8] bg-[#FAF9F6] px-3 py-1.5 text-xs font-semibold text-[#1C1917] hover:bg-[#EFECE4]"
                  >
                    {copiedFormat === 'latex' ? (
                      <Check className="h-3.5 w-3.5 text-[#14532D]" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>{copiedFormat === 'latex' ? 'Copied LaTeX' : 'Copy LaTeX'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload('tghm_updated_paper.tex', latexSource)}
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#1E3A8A] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#172554]"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Download .tex</span>
                  </button>
                </div>
              </div>
              <pre className="mt-5 max-h-[760px] overflow-auto rounded-md border border-[#E7E3DA] bg-[#FAF9F6] p-4 font-mono text-xs leading-relaxed text-[#1C1917] whitespace-pre-wrap">
                {latexSource}
              </pre>
            </div>
          ) : (
            <div className="mx-auto max-w-[68ch]">
              {/* Journal Masthead */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DED9CE] pb-3 text-xs text-[#78716C]">
                <span>{config.targetVenue}</span>
                <span className="font-mono">Extends DOI {BASELINE_PAPER_META.doi}</span>
              </div>

              <h1 className="mt-6 font-serif text-2xl sm:text-3xl font-semibold leading-tight text-[#1C1917]">
                {config.paperTitle}
              </h1>

              {/* Authors & Affiliations */}
              <p className="mt-4 text-sm font-semibold text-[#1C1917]">
                {AUTHORS.map((a, i) => (
                  <React.Fragment key={a.name}>
                    {a.name}
                    <sup>{a.affiliationIndex}</sup>
                    {i < AUTHORS.length - 1 ? ', ' : ''}
                  </React.Fragment>
                ))}
              </p>
              <div className="mt-2 space-y-0.5 text-xs text-[#57534E]">
                {AFFILIATIONS.map((af) => (
                  <p key={af.index}>
                    <sup>{af.index}</sup>
                    {af.department}, {af.institution}, {af.location}
                  </p>
                ))}
                <p className="pt-1 font-mono text-[11px] text-[#78716C]">
                  Corresponding Author: {config.correspondingEmail}
                </p>
              </div>

              {/* Abstract with Drop Cap */}
              <div className="mt-6 border-y border-[#DED9CE] py-5">
                <h2 className="font-serif text-base font-semibold text-[#9A3412]">Abstract</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#292524] first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-serif first-letter:text-4xl first-letter:font-bold first-letter:text-[#1C1917]">
                  Low-Code/No-Code (LCNC) platforms combined with Artificial Intelligence and Machine Learning
                  (AI/ML) have accelerated enterprise delivery, yet our baseline systematic study (Ahmed et al.,
                  2025 [1]) documented critical unresolved risks: over 40% of citizen-built enterprise applications
                  exposed sensitive data via weak access controls, monolithic runtimes degraded under IoT and
                  deep computer-vision workloads (YOLOv2, 3D-DCM, PVAM), proprietary DSLs imposed vendor
                  lock-in, and generative AI introduced unverified logic. This updated paper proposes the{' '}
                  <strong>Tri-Strata Governed Hybrid Model (TGHM)</strong> and the{' '}
                  <strong>AMPO-ZT</strong> topological partitioning algorithm, evaluated across four
                  complementary multi-domain datasets and one-at-a-time throughput sensitivity sweeps. Under live
                  simulation, TGHM achieves{' '}
                  <span className="font-mono font-semibold">{simOutput.portabilityIndexPct}%</span> Open-IR
                  portability, a governance readiness index of{' '}
                  <span className="font-mono font-semibold">{simOutput.governanceScore.toFixed(2)}</span>,{' '}
                  <span className="font-mono font-semibold">{simOutput.effectiveThroughputRps} req/s</span>{' '}
                  effective throughput (vs.{' '}
                  <span className="font-mono font-semibold">{simOutput.legacyThroughputRps} req/s</span> legacy
                  LCNC), and{' '}
                  <span className="font-mono font-semibold">{simOutput.debtReductionPct}%</span> lower 36-month
                  technical debt while preserving{' '}
                  <span className="font-mono font-semibold">{simOutput.sdlcAccelerationPct}%</span> SDLC
                  acceleration, charting a roadmap spanning graph-isomorphism IR matching, kinematic HITL
                  biometrics, federated CAN intrusion detection, honeypot cyber-deception, RTOS/kernel
                  isolation, and peer-to-peer energy trading.
                </p>
                <p className="mt-3 text-xs text-[#57534E]">
                  <strong className="text-[#9A3412]">Keywords:</strong> Low-Code/No-Code, Hybrid AI/ML
                  Architecture, AMPO-ZT Algorithm, Open Intermediate Representation, Zero-Trust Governance,
                  Benchmark Re-Evaluation
                </p>
              </div>

              {/* Body Sections */}
              <div className="mt-8 space-y-8">
                {sections.map((sec) => (
                  <section key={sec.number}>
                    <h2 className="font-serif text-xl font-semibold text-[#9A3412]">
                      {sec.number}. {sec.title}
                    </h2>
                    <div className="mt-3 space-y-3.5 text-sm leading-[1.75] text-[#292524]">
                      {sec.paragraphs.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>

                    {sec.calloutEquation && (
                      <div className="my-5 rounded-md border border-[#DED9CE] bg-[#FAF9F6] p-4">
                        <p className="text-xs font-semibold text-[#1E3A8A]">
                          {sec.calloutEquation.label}
                        </p>
                        <p className="mt-2 font-mono text-xs sm:text-sm font-semibold text-[#1C1917]">
                          {sec.calloutEquation.formula}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-[#57534E]">
                          {sec.calloutEquation.explanation}
                        </p>
                      </div>
                    )}
                  </section>
                ))}

                {/* Algorithm Box */}
                <section className="rounded-md border border-[#DED9CE] bg-[#FAF9F6] p-5">
                  <h3 className="font-serif text-base font-semibold text-[#1C1917]">
                    Algorithm 1: AMPO-ZT Topological Offload &amp; Zero-Trust Verification
                  </h3>
                  <ol className="mt-3 space-y-2 font-mono text-xs leading-relaxed text-[#292524]">
                    {AMPO_ZT_ALGORITHM_STEPS.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ol>
                </section>

                {/* Figure 1: Adoption Chart (SVG) */}
                <section className="rounded-md border border-[#DED9CE] bg-[#FAF9F6] p-5">
                  <div className="space-y-2">
                    {FIGURE_1_ADOPTION_DATA.map((row) => (
                      <div key={row.area} className="grid grid-cols-12 items-center gap-2 text-[11px]">
                        <span className="col-span-5 font-medium text-[#1C1917] truncate">
                          {row.area}
                        </span>
                        <div className="col-span-6 space-y-0.5">
                          <div className="h-1.5 bg-[#E7E3DA]">
                            <div className="h-full bg-[#94A3B8]" style={{ width: `${row.q1_2022}%` }} />
                          </div>
                          <div className="h-1.5 bg-[#E7E3DA]">
                            <div className="h-full bg-[#475569]" style={{ width: `${row.q3_2023}%` }} />
                          </div>
                          <div className="h-1.5 bg-[#EFF6FF]">
                            <div className="h-full bg-[#1E3A8A]" style={{ width: `${row.projected_2026_tghm}%` }} />
                          </div>
                        </div>
                        <span className="col-span-1 text-right font-mono font-semibold text-[#1E3A8A] tabular-nums">
                          {row.projected_2026_tghm}%
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 font-serif text-xs italic text-[#57534E]">
                    Figure 1 — LCNC adoption across 13 software areas: Q1 2022 (light gray), Q3 2023 (charcoal, Ahmed et al. 2025), and 2026 TGHM Hybrid-Agentic projection (blue).
                  </p>
                </section>

                {/* Table 1: Traceability */}
                {config.includeSimulationTable && (
                  <section>
                    <p className="font-serif text-xs italic text-[#57534E]">
                      Table 1 — Traceability from Ahmed et al. (2025) Research Gaps to TGHM Mechanisms.
                    </p>
                    <div className="mt-2 overflow-x-auto border-y border-[#DED9CE]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#DED9CE] text-[#57534E]">
                            <th className="py-2 pr-3 font-semibold">2025 Gap</th>
                            <th className="py-2 pr-3 font-semibold">TGHM Plane &amp; Module</th>
                            <th className="py-2 font-semibold">Target Metric</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#ECE8DF]">
                          {GAP_TRACEABILITY_MATRIX.map((g) => (
                            <tr key={g.id} className="align-top">
                              <td className="py-2 pr-3">
                                <div className="font-medium text-[#1C1917]">{g.baselineProblem}</div>
                                <div className="text-[11px] text-[#57534E]">{g.sourceSection} · {g.citationRef}</div>
                              </td>
                              <td className="py-2 pr-3 text-[#44403C]">
                                <span className="font-mono font-semibold text-[#1E3A8A]">{g.tghmPlane}</span>: {g.tghmModule}
                              </td>
                              <td className="py-2 font-mono text-[#14532D]">{g.validationMetric}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}

                {/* Table 2: Detailed Datasets & 5-Step Protocol */}
                {config.includeDatasetExpansion && (
                  <section className="space-y-4">
                    <div>
                      <p className="font-serif text-xs italic text-[#57534E]">
                        Table 2 — Detailed Multi-Domain Benchmark Dataset Specifications for TGHM Re-Evaluation.
                      </p>
                      <div className="mt-2 overflow-x-auto border-y border-[#DED9CE]">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-[#DED9CE] text-[#57534E]">
                              <th className="py-2 pr-3 font-semibold">Dataset Suite &amp; Scale</th>
                              <th className="py-2 pr-3 font-semibold">Complements 2025 Baseline</th>
                              <th className="py-2 font-semibold">Generalizability &amp; Metrics</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#ECE8DF]">
                            {DATASET_EXPANSION_SUITE.map((d) => (
                              <tr key={d.id} className="align-top">
                                <td className="py-2.5 pr-3">
                                  <div className="font-semibold text-[#1C1917]">{d.name}</div>
                                  <div className="font-mono text-[11px] text-[#1E3A8A]">{d.targetTghmPlane} · {d.domain}</div>
                                  <div className="mt-0.5 text-[11px] text-[#57534E]">{d.scaleAndFormat}</div>
                                </td>
                                <td className="py-2.5 pr-3 text-[#44403C]">{d.complementsBaseline}</td>
                                <td className="py-2.5 text-[#44403C]">
                                  <div>{d.enhancementRole}</div>
                                  <div className="mt-1 font-mono text-[11px] text-[#14532D]">
                                    Metrics: {d.reEvaluationMetrics.join(', ')}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="rounded-md border border-[#DED9CE] bg-[#FAF9F6] p-4">
                      <h3 className="font-serif text-sm font-semibold text-[#1C1917]">
                        Five-Stage Dataset Integration &amp; Re-Evaluation Protocol
                      </h3>
                      <ol className="mt-2 space-y-1.5 text-xs text-[#44403C]">
                        {RE_EVALUATION_PROTOCOL.map((p) => (
                          <li key={p.step}>
                            <strong className="text-[#1C1917]">Step {p.step} ({p.title}):</strong> {p.methodology}{' '}
                            <span className="font-mono text-[11px] text-[#78716C]">[{p.outputArtifact}]</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </section>
                )}

                {/* Table 3A: All Four Baseline Case-Study Specifications */}
                <section className="space-y-6">
                  <div>
                    <p className="font-serif text-xs italic text-[#57534E]">
                      Table 3A — Baseline Case-Study Parameter Specifications from Ahmed et al. (2025) [1].
                    </p>
                    <div className="mt-2 overflow-x-auto border-y border-[#DED9CE]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#DED9CE] text-[#57534E]">
                            <th className="py-2 pr-2 font-semibold">Baseline &amp; Source</th>
                            <th className="py-2 pr-2 font-semibold">Workload C(w)</th>
                            <th className="py-2 pr-2 font-semibold text-right">λ / L_max</th>
                            <th className="py-2 pr-2 font-semibold text-right">L_infra / δ / τ</th>
                            <th className="py-2 font-semibold text-right">PII &amp; Gate Mode</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#ECE8DF]">
                          {fourBaselines.map((b) => (
                            <tr key={b.code} className="align-top">
                              <td className="py-2 pr-2">
                                <div className="font-medium text-[#1C1917]">
                                  {b.code}: {b.preset.label}
                                </div>
                                <div className="font-mono text-[11px] text-[#78716C]">
                                  {b.preset.sourceCitation}
                                </div>
                              </td>
                              <td className="py-2 pr-2 text-[#44403C]">
                                <div>{WORKLOAD_COMPLEXITY_MAP[b.preset.input.workloadType].label}</div>
                                <div className="font-mono text-[11px] text-[#1E3A8A]">
                                  C={WORKLOAD_COMPLEXITY_MAP[b.preset.input.workloadType].normalizedC.toFixed(2)}
                                </div>
                              </td>
                              <td className="py-2 pr-2 text-right font-mono tabular-nums text-[#1C1917]">
                                {b.preset.input.throughputRps} req/s
                                <div className="text-[11px] text-[#78716C]">SLA {b.preset.input.latencySlaMs} ms</div>
                              </td>
                              <td className="py-2 pr-2 text-right font-mono tabular-nums text-[#44403C]">
                                {b.preset.input.infraLatencyMs ?? 14} ms / {b.preset.input.customizabilityNeed.toFixed(2)} / {b.preset.input.hitlConfidenceTau.toFixed(2)}
                              </td>
                              <td className="py-2 text-right font-mono text-[11px] text-[#1C1917]">
                                {b.preset.input.piiTier.toUpperCase()}
                                <div className={b.preset.input.staticPolicyGateEnabled ? 'text-[#14532D]' : 'text-[#9A3412]'}>
                                  {b.preset.input.staticPolicyGateEnabled ? 'Open-IR + Gate ON' : 'Legacy DSL, Gate OFF'}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Table 3B: Comparative Workload Simulation Results Across All Four Baselines */}
                  <div>
                    <p className="font-serif text-xs italic text-[#57534E]">
                      Table 3B — Comparative Workload Simulation Results Across All Four Baselines (Including TGHM Remediation for B4).
                    </p>
                    <div className="mt-2 overflow-x-auto border-y border-[#DED9CE]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#DED9CE] text-[#57534E]">
                            <th className="py-2 pr-2 font-semibold">Baseline Scenario</th>
                            <th className="py-2 pr-2 font-semibold">Ω(w) &amp; Route</th>
                            <th className="py-2 pr-2 font-semibold text-right">Latency</th>
                            <th className="py-2 pr-2 font-semibold text-right">TGHM vs Legacy</th>
                            <th className="py-2 pr-2 font-semibold text-right">G_score / Π_IR</th>
                            <th className="py-2 font-semibold text-right">Debt Drop</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#ECE8DF]">
                          {fourBaselines.map((b) => (
                            <React.Fragment key={b.code}>
                              <tr className="align-top">
                                <td className="py-2 pr-2">
                                  <div className="font-medium text-[#1C1917]">
                                    {b.code}: {b.preset.label}
                                  </div>
                                  <div className="font-mono text-[11px] text-[#78716C]">
                                    λ={b.preset.input.throughputRps} req/s · SLA {b.preset.input.latencySlaMs} ms
                                  </div>
                                </td>
                                <td className="py-2 pr-2">
                                  <div className="font-mono font-semibold text-[#1E3A8A] tabular-nums">
                                    {b.output.omegaScore.toFixed(3)}
                                  </div>
                                  <div className="text-[11px] text-[#57534E]">{b.output.routingDecision}</div>
                                </td>
                                <td className="py-2 pr-2 text-right font-mono tabular-nums text-[#1C1917]">
                                  {b.output.estimatedLatencyMs} ms
                                  <div className={`text-[10px] ${b.output.slaSatisfied ? 'text-[#14532D]' : 'text-[#9A3412]'}`}>
                                    {b.output.slaSatisfied ? 'SLA Met' : 'Breach'}
                                  </div>
                                </td>
                                <td className="py-2 pr-2 text-right font-mono tabular-nums text-[#14532D]">
                                  {b.output.effectiveThroughputRps} vs {b.output.legacyThroughputRps} req/s
                                </td>
                                <td className="py-2 pr-2 text-right font-mono tabular-nums text-[#1C1917]">
                                  {b.output.governanceScore.toFixed(2)} / {b.output.portabilityIndexPct}%
                                  <div className={`text-[10px] ${b.output.governanceState === 'Verified' ? 'text-[#14532D]' : 'text-[#9A3412]'}`}>
                                    {b.output.governanceState}
                                  </div>
                                </td>
                                <td className="py-2 text-right font-mono font-semibold tabular-nums text-[#14532D]">
                                  -{b.output.debtReductionPct}%
                                </td>
                              </tr>
                              {b.tghmGovernedOutput && (
                                <tr className="align-top bg-[#FAF9F6]">
                                  <td className="py-2 pr-2">
                                    <div className="font-medium text-[#1E3A8A]">
                                      {b.code}-TGHM: Governed Citizen GenAI
                                    </div>
                                    <div className="font-mono text-[11px] text-[#57534E]">
                                      τ=0.88 · Open-IR · Static RBAC Gate ON
                                    </div>
                                  </td>
                                  <td className="py-2 pr-2">
                                    <div className="font-mono font-semibold text-[#1E3A8A] tabular-nums">
                                      {b.tghmGovernedOutput.omegaScore.toFixed(3)}
                                    </div>
                                    <div className="text-[11px] text-[#57534E]">
                                      {b.tghmGovernedOutput.routingDecision}
                                    </div>
                                  </td>
                                  <td className="py-2 pr-2 text-right font-mono tabular-nums text-[#1C1917]">
                                    {b.tghmGovernedOutput.estimatedLatencyMs} ms
                                    <div className="text-[10px] text-[#14532D]">SLA Met</div>
                                  </td>
                                  <td className="py-2 pr-2 text-right font-mono tabular-nums text-[#14532D]">
                                    {b.tghmGovernedOutput.effectiveThroughputRps} vs {b.tghmGovernedOutput.legacyThroughputRps} req/s
                                  </td>
                                  <td className="py-2 pr-2 text-right font-mono tabular-nums text-[#1C1917]">
                                    {b.tghmGovernedOutput.governanceScore.toFixed(2)} / {b.tghmGovernedOutput.portabilityIndexPct}%
                                    <div className="text-[10px] text-[#14532D]">
                                      {b.tghmGovernedOutput.governanceState}
                                    </div>
                                  </td>
                                  <td className="py-2 text-right font-mono font-semibold tabular-nums text-[#14532D]">
                                    -{b.tghmGovernedOutput.debtReductionPct}%
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Figure 4: Multi-Baseline Throughput Bar Comparison (SVG) */}
                  {(() => {
                    const maxRps = Math.max(
                      400,
                      ...fourBaselines.map((b) =>
                        Math.max(
                          b.output.legacyThroughputRps,
                          b.output.effectiveThroughputRps,
                          b.tghmGovernedOutput?.effectiveThroughputRps ?? 0
                        )
                      )
                    );
                    const niceMax = Math.ceil(maxRps / 250) * 250;
                    const w = 540;
                    const h = 210;
                    const pL = 46;
                    const pR = 16;
                    const pT = 22;
                    const pB = 46;
                    const plW = w - pL - pR;
                    const plH = h - pT - pB;
                    const groupW = plW / fourBaselines.length;
                    const barW = 28;

                    return (
                      <div className="rounded-md border border-[#DED9CE] bg-[#FAF9F6] p-4">
                        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" role="img" aria-label="Figure 4 Multi-Baseline Throughput Comparison">
                          {[0, 0.5, 1].map((f) => {
                            const y = pT + plH * (1 - f);
                            return (
                              <g key={f}>
                                <line x1={pL} y1={y} x2={w - pR} y2={y} stroke="#DED9CE" strokeDasharray="3 3" />
                                <text x={pL - 6} y={y + 4} textAnchor="end" className="fill-[#78716C] font-mono text-[10px]">
                                  {Math.round(niceMax * f)}
                                </text>
                              </g>
                            );
                          })}
                          {fourBaselines.map((b, idx) => {
                            const cx = pL + idx * groupW + groupW / 2;
                            const legacyVal = b.output.legacyThroughputRps;
                            const tghmOut = b.tghmGovernedOutput ?? b.output;
                            const tghmVal = tghmOut.effectiveThroughputRps;
                            const legH = (legacyVal / niceMax) * plH;
                            const tgH = (tghmVal / niceMax) * plH;
                            const shortTitle =
                              b.code === 'B1'
                                ? 'B1: Siemens'
                                : b.code === 'B2'
                                  ? 'B2: PowerApps'
                                  : b.code === 'B3'
                                    ? 'B3: 3D-DCM'
                                    : 'B4: GenAI*';
                            return (
                              <g key={b.code}>
                                <rect x={cx - barW - 3} y={pT + plH - legH} width={barW} height={legH} fill="#9A3412" />
                                <text x={cx - barW / 2 - 3} y={pT + plH - legH - 4} textAnchor="middle" className="fill-[#9A3412] font-mono text-[9px] font-semibold">
                                  {legacyVal}
                                </text>
                                <rect x={cx + 3} y={pT + plH - tgH} width={barW} height={tgH} fill="#1E3A8A" />
                                <text x={cx + barW / 2 + 3} y={pT + plH - tgH - 4} textAnchor="middle" className="fill-[#1E3A8A] font-mono text-[9px] font-semibold">
                                  {tghmVal}
                                </text>
                                <text x={cx} y={h - pB + 16} textAnchor="middle" className="fill-[#1C1917] text-[10px] font-semibold">
                                  {shortTitle}
                                </text>
                                <text x={cx} y={h - pB + 29} textAnchor="middle" className="fill-[#57534E] font-mono text-[9px]">
                                  Ω={tghmOut.omegaScore.toFixed(2)} · G={tghmOut.governanceScore.toFixed(2)}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                        <p className="mt-2 font-serif text-xs italic text-[#57534E]">
                          Figure 4 — Multi-baseline SLA-compliant throughput comparison across all four Ahmed et al. (2025) [1] benchmarks (B1–B4, *B4 evaluated under TGHM Plane I–III governance): Monolithic Legacy LCNC (terracotta) vs. TGHM AMPO-ZT (blue).
                        </p>
                      </div>
                    );
                  })()}
                </section>

                {/* Figure 2: 36-Month Technical Debt Trajectory (SVG) */}
                {(() => {
                  const maxDebt = Math.max(
                    100,
                    ...simOutput.debtTrajectory.map((d) => Math.max(d.legacyLcncDebt, d.tghmDebt))
                  );
                  const w = 540;
                  const h = 190;
                  const pL = 42;
                  const pR = 16;
                  const pT = 16;
                  const pB = 28;
                  const plW = w - pL - pR;
                  const plH = h - pT - pB;
                  const tx = (m: number) => pL + (m / 36) * plW;
                  const ty = (v: number) => pT + plH - (v / maxDebt) * plH;
                  const legPath = simOutput.debtTrajectory
                    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${tx(pt.month).toFixed(1)} ${ty(pt.legacyLcncDebt).toFixed(1)}`)
                    .join(' ');
                  const tghmPath = simOutput.debtTrajectory
                    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${tx(pt.month).toFixed(1)} ${ty(pt.tghmDebt).toFixed(1)}`)
                    .join(' ');
                  return (
                    <section className="rounded-md border border-[#DED9CE] bg-[#FAF9F6] p-4">
                      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" role="img" aria-label="Figure 2 Technical Debt Trajectory">
                        {[0, 0.5, 1].map((f) => {
                          const y = pT + plH * (1 - f);
                          return (
                            <g key={f}>
                              <line x1={pL} y1={y} x2={w - pR} y2={y} stroke="#DED9CE" strokeDasharray="3 3" />
                              <text x={pL - 6} y={y + 4} textAnchor="end" className="fill-[#78716C] font-mono text-[10px]">
                                {Math.round(maxDebt * f)}
                              </text>
                            </g>
                          );
                        })}
                        {simOutput.debtTrajectory.map((pt) => (
                          <text key={pt.month} x={tx(pt.month)} y={h - 6} textAnchor="middle" className="fill-[#78716C] font-mono text-[10px]">
                            M{pt.month}
                          </text>
                        ))}
                        <path d={legPath} fill="none" stroke="#9A3412" strokeWidth={2.2} strokeDasharray="5 4" />
                        <path d={tghmPath} fill="none" stroke="#1E3A8A" strokeWidth={2.5} />
                      </svg>
                      <p className="mt-2 font-serif text-xs italic text-[#57534E]">
                        Figure 2 — 36-month technical debt accumulation comparing monolithic proprietary LCNC (dashed terracotta) against TGHM Open-IR Hybrid (solid blue, -{simOutput.debtReductionPct}% debt at Month 36).
                      </p>
                    </section>
                  );
                })()}

                {/* Table 4A & 4B + Figure 3: Sensitivity & Elasticity Analysis */}
                <section className="space-y-5">
                  <div>
                    <p className="font-serif text-xs italic text-[#57534E]">
                      Table 4A — One-at-a-Time Throughput Sensitivity &amp; Elasticity Analysis (±15% Perturbation, Active Base = {simOutput.effectiveThroughputRps} req/s).
                    </p>
                    <div className="mt-2 overflow-x-auto border-y border-[#DED9CE]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#DED9CE] text-[#57534E]">
                            <th className="py-2 pr-3 font-semibold">Input Factor</th>
                            <th className="py-2 pr-3 font-semibold text-right">-15%</th>
                            <th className="py-2 pr-3 font-semibold text-right">+15%</th>
                            <th className="py-2 font-semibold text-right">Swing &amp; Elasticity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#ECE8DF]">
                          {sensitivity.factors.map((f) => (
                            <tr key={f.id}>
                              <td className="py-2 pr-3 font-medium text-[#1C1917]">
                                {f.label} <span className="font-mono text-[11px] text-[#78716C]">({f.baselineDisplay})</span>
                              </td>
                              <td className="py-2 pr-3 text-right font-mono tabular-nums">{f.lowEffectiveRps} req/s</td>
                              <td className="py-2 pr-3 text-right font-mono tabular-nums">{f.highEffectiveRps} req/s</td>
                              <td className="py-2 text-right font-mono font-semibold text-[#1E3A8A] tabular-nums">
                                {f.swingRps} req/s ({f.elasticityRatio.toFixed(2)}×)
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <p className="font-serif text-xs italic text-[#57534E]">
                      Table 4B — Cross-Baseline Dominant Throughput Sensitivity Driver (±15% Perturbation Across B1–B4).
                    </p>
                    <div className="mt-2 overflow-x-auto border-y border-[#DED9CE]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#DED9CE] text-[#57534E]">
                            <th className="py-2 pr-3 font-semibold">Baseline Case Study</th>
                            <th className="py-2 pr-3 font-semibold">Dominant Driver</th>
                            <th className="py-2 pr-3 font-semibold text-right">-15% to +15% Range</th>
                            <th className="py-2 font-semibold text-right">Swing &amp; Elasticity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#ECE8DF]">
                          {fourBaselines.map((b) => (
                            <tr key={b.code}>
                              <td className="py-2 pr-3 font-medium text-[#1C1917]">
                                {b.code}: {b.preset.label}
                              </td>
                              <td className="py-2 pr-3 text-[#44403C]">{b.sensitivityTopFactor.label}</td>
                              <td className="py-2 pr-3 text-right font-mono tabular-nums">
                                {b.sensitivityTopFactor.lowEffectiveRps}–{b.sensitivityTopFactor.highEffectiveRps} req/s
                              </td>
                              <td className="py-2 text-right font-mono font-semibold text-[#1E3A8A] tabular-nums">
                                {b.sensitivityTopFactor.swingRps} req/s ({b.sensitivityTopFactor.elasticityRatio.toFixed(2)}×)
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {(() => {
                    const pts = sensitivity.sweepPoints;
                    const minX = pts[0].xValue;
                    const maxX = pts[pts.length - 1].xValue;
                    const maxY = Math.max(250, ...pts.map((p) => Math.max(p.tghmEffectiveRps, p.legacyEffectiveRps)));
                    const w = 540;
                    const h = 190;
                    const pL = 44;
                    const pR = 16;
                    const pT = 18;
                    const pB = 28;
                    const plW = w - pL - pR;
                    const plH = h - pT - pB;
                    const sx = (x: number) => pL + ((x - minX) / Math.max(1, maxX - minX)) * plW;
                    const sy = (y: number) => pT + plH - (y / maxY) * plH;
                    const tPath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.xValue).toFixed(1)} ${sy(p.tghmEffectiveRps).toFixed(1)}`).join(' ');
                    const lPath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.xValue).toFixed(1)} ${sy(p.legacyEffectiveRps).toFixed(1)}`).join(' ');
                    return (
                      <div className="rounded-md border border-[#DED9CE] bg-[#FAF9F6] p-4">
                        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" role="img" aria-label="Figure 3 Throughput Sensitivity Sweep">
                          {[0, 0.5, 1].map((f) => {
                            const y = pT + plH * (1 - f);
                            return (
                              <g key={f}>
                                <line x1={pL} y1={y} x2={w - pR} y2={y} stroke="#DED9CE" strokeDasharray="3 3" />
                                <text x={pL - 6} y={y + 4} textAnchor="end" className="fill-[#78716C] font-mono text-[10px]">
                                  {Math.round(maxY * f)}
                                </text>
                              </g>
                            );
                          })}
                          {sensitivity.regimeTransitions.map((tr) => (
                            <line key={tr.xValue} x1={sx(tr.xValue)} y1={pT} x2={sx(tr.xValue)} y2={pT + plH} stroke="#14532D" strokeDasharray="4 3" />
                          ))}
                          {[0, 3, 6, 9, 12].map((idx) => {
                            const pt = pts[idx];
                            if (!pt) return null;
                            return (
                              <text key={pt.xValue} x={sx(pt.xValue)} y={h - 6} textAnchor="middle" className="fill-[#78716C] font-mono text-[10px]">
                                {pt.xValue}
                              </text>
                            );
                          })}
                          <path d={lPath} fill="none" stroke="#9A3412" strokeWidth={2.2} strokeDasharray="5 4" />
                          <path d={tPath} fill="none" stroke="#1E3A8A" strokeWidth={2.5} />
                        </svg>
                        <p className="mt-2 font-serif text-xs italic text-[#57534E]">
                          Figure 3 — Delivered system throughput across incoming request volume (100–2,500 req/s): TGHM AMPO-ZT (solid blue) vs. monolithic legacy LCNC (dashed terracotta), with vertical dashed AMPO-ZT offload regime transitions.
                        </p>
                      </div>
                    );
                  })()}
                </section>

                {/* Table 5: Tri-Strata Plane Synthesis (Plane I, Plane II & Plane III) */}
                <section>
                  <p className="font-serif text-xs italic text-[#57534E]">
                    Table 5 — Tri-Strata Architectural Synthesis Across Plane I, Plane II, and Plane III (Modules, Datasets &amp; Verified Outcomes).
                  </p>
                  <div className="mt-2 overflow-x-auto border-y border-[#DED9CE]">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#DED9CE] text-[#57534E]">
                          <th className="py-2 pr-3 font-semibold">TGHM Plane</th>
                          <th className="py-2 pr-3 font-semibold">Modules &amp; Dataset Anchor</th>
                          <th className="py-2 font-semibold">Mechanism &amp; Verified Outcome</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#ECE8DF]">
                        {planeSummaries.map((p) => (
                          <tr key={p.plane} className="align-top">
                            <td className="py-2.5 pr-3">
                              <div className="font-mono font-semibold text-[#1E3A8A]">{p.plane}</div>
                              <div className="font-medium text-[#1C1917]">{p.planeName}</div>
                            </td>
                            <td className="py-2.5 pr-3 text-[#44403C]">
                              <div>{p.modules}</div>
                              <div className="mt-1 font-mono text-[11px] text-[#78716C]">{p.datasetAnchor}</div>
                            </td>
                            <td className="py-2.5 text-[#44403C]">
                              <div>{p.keyMechanism}</div>
                              <div className="mt-1 font-mono text-[11px] text-[#14532D]">{p.verifiedMetric}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Table 6 & Figure 5: Three-Way Paradigm Comparison */}
                <section className="space-y-4">
                  <div>
                    <p className="font-serif text-xs italic text-[#57534E]">
                      Table 6 — Three-Way Engineering Paradigm Comparison: Monolithic Legacy LCNC vs. Manual Pro-Code vs. TGHM Tri-Strata.
                    </p>
                    <div className="mt-2 overflow-x-auto border-y border-[#DED9CE]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#DED9CE] text-[#57534E]">
                            <th className="py-2 pr-3 font-semibold">Evaluation Dimension</th>
                            <th className="py-2 pr-3 font-semibold">Monolithic Legacy LCNC</th>
                            <th className="py-2 pr-3 font-semibold">Manual Pro-Code</th>
                            <th className="py-2 font-semibold text-[#1E3A8A]">TGHM Tri-Strata (Ours)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#ECE8DF]">
                          {paradigmRows.map((r) => (
                            <tr key={r.dimension}>
                              <td className="py-2 pr-3 font-medium text-[#1C1917]">{r.dimension}</td>
                              <td className="py-2 pr-3 text-[#9A3412]">{r.monolithicDisplay}</td>
                              <td className="py-2 pr-3 text-[#44403C]">{r.manualProCodeDisplay}</td>
                              <td className="py-2 font-semibold text-[#1E3A8A]">{r.tghmDisplay}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {(() => {
                    const w = 540;
                    const h = 205;
                    const pL = 42;
                    const pR = 16;
                    const pT = 22;
                    const pB = 42;
                    const plW = w - pL - pR;
                    const plH = h - pT - pB;
                    const groupW = plW / paradigmRows.length;
                    const barW = 16;
                    const gap = 4;

                    return (
                      <div className="rounded-md border border-[#DED9CE] bg-[#FAF9F6] p-4">
                        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" role="img" aria-label="Figure 5 Three-Way Paradigm Comparison">
                          {[0, 50, 100].map((pct) => {
                            const y = pT + plH * (1 - pct / 100);
                            return (
                              <g key={pct}>
                                <line x1={pL} y1={y} x2={w - pR} y2={y} stroke="#DED9CE" strokeDasharray="3 3" />
                                <text x={pL - 6} y={y + 4} textAnchor="end" className="fill-[#78716C] font-mono text-[10px]">
                                  {pct}%
                                </text>
                              </g>
                            );
                          })}
                          {paradigmRows.map((r, idx) => {
                            const cx = pL + idx * groupW + groupW / 2;
                            const h1 = (r.monolithicLcncScore / 100) * plH;
                            const h2 = (r.manualProCodeScore / 100) * plH;
                            const h3 = (r.tghmScore / 100) * plH;
                            const x1 = cx - barW * 1.5 - gap;
                            const x2 = cx - barW * 0.5;
                            const x3 = cx + barW * 0.5 + gap;
                            return (
                              <g key={r.dimension}>
                                <rect x={x1} y={pT + plH - h1} width={barW} height={h1} fill="#9A3412" />
                                <rect x={x2} y={pT + plH - h2} width={barW} height={h2} fill="#64748B" />
                                <rect x={x3} y={pT + plH - h3} width={barW} height={h3} fill="#1E3A8A" />
                                <text x={x3 + barW / 2} y={pT + plH - h3 - 4} textAnchor="middle" className="fill-[#1E3A8A] font-mono text-[9px] font-semibold">
                                  {r.tghmScore}
                                </text>
                                <text x={cx} y={h - pB + 16} textAnchor="middle" className="fill-[#1C1917] text-[9px] font-semibold">
                                  {r.dimension}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                        <p className="mt-2 font-serif text-xs italic text-[#57534E]">
                          Figure 5 — Normalized (0–100) three-way paradigm comparison contrasting Monolithic Legacy LCNC (terracotta), Manual Pro-Code (slate gray), and TGHM Tri-Strata Planes I–III (blue).
                        </p>
                      </div>
                    );
                  })()}
                </section>

                {/* References */}
                <section className="border-t border-[#DED9CE] pt-6">
                  <h2 className="font-serif text-lg font-semibold text-[#9A3412]">References</h2>
                  <ol className="mt-3 space-y-2 text-xs leading-relaxed text-[#44403C]">
                    {REFERENCES_LIST.map((ref) => (
                      <li key={ref.num}>
                        <span className="font-mono font-semibold text-[#1C1917]">[{ref.num}]</span>{' '}
                        {ref.authors} ({ref.year}) {ref.title}. <em>{ref.venue}</em>.{' '}
                        {ref.doiOrUrl && (
                          <span className="font-mono text-[11px] text-[#1E3A8A] break-all">
                            {ref.doiOrUrl}
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
            </div>
          )}
        </article>

        {/* Right 30% Margin Rail: Configuration & Multi-Format Exports */}
        <aside className="no-print lg:col-span-4 space-y-5">
          <div className="rounded-lg border border-[#DED9CE] bg-white p-5 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Manuscript Parameters
            </h3>

            <div>
              <label htmlFor="paper-title-input" className="block text-xs font-semibold text-[#1C1917]">
                Updated Paper Title
              </label>
              <textarea
                id="paper-title-input"
                rows={3}
                value={config.paperTitle}
                onChange={(e) => onChangeConfig({ ...config, paperTitle: e.target.value })}
                className="mt-1.5 w-full rounded-md border border-[#CFC8B8] bg-[#FAF9F6] p-2.5 text-xs leading-relaxed text-[#1C1917]"
              />
            </div>

            <div>
              <label htmlFor="venue-input" className="block text-xs font-semibold text-[#1C1917]">
                Target Journal / Venue
              </label>
              <input
                id="venue-input"
                type="text"
                value={config.targetVenue}
                onChange={(e) => onChangeConfig({ ...config, targetVenue: e.target.value })}
                className="mt-1.5 w-full rounded-md border border-[#CFC8B8] bg-[#FAF9F6] px-3 py-2 text-xs text-[#1C1917]"
              />
            </div>

            <div className="space-y-2.5 pt-2 border-t border-[#ECE8DF]">
              <label className="flex items-center justify-between gap-2 text-xs text-[#1C1917] cursor-pointer">
                <span>Include Formal Equations (Ω &amp; G_score)</span>
                <input
                  type="checkbox"
                  checked={config.includeFormalEquations}
                  onChange={(e) =>
                    onChangeConfig({ ...config, includeFormalEquations: e.target.checked })
                  }
                  className="accent-[#1E3A8A]"
                />
              </label>
              <label className="flex items-center justify-between gap-2 text-xs text-[#1C1917] cursor-pointer">
                <span>Include Gap Traceability Table</span>
                <input
                  type="checkbox"
                  checked={config.includeSimulationTable}
                  onChange={(e) =>
                    onChangeConfig({ ...config, includeSimulationTable: e.target.checked })
                  }
                  className="accent-[#1E3A8A]"
                />
              </label>
              <label className="flex items-center justify-between gap-2 text-xs text-[#1C1917] cursor-pointer">
                <span>Include Dataset Expansion &amp; Table 2</span>
                <input
                  type="checkbox"
                  checked={config.includeDatasetExpansion}
                  onChange={(e) =>
                    onChangeConfig({ ...config, includeDatasetExpansion: e.target.checked })
                  }
                  className="accent-[#1E3A8A]"
                />
              </label>
            </div>
          </div>

          {/* Export Suite */}
          <div className="rounded-lg border border-[#DED9CE] bg-white p-5 space-y-3">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Publication Export Bundle
            </h3>
            <p className="text-xs text-[#57534E]">
              Every export embeds your live simulator parameters and mathematical equations.
            </p>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleDownloadWord}
                disabled={isExportingWord}
                className="w-full flex items-center justify-between rounded-md bg-[#1E3A8A] px-3.5 py-2.5 text-xs font-semibold text-white hover:bg-[#172554] disabled:opacity-60"
              >
                <span>{isExportingWord ? 'Building Word Document...' : 'Download Word Document (.docx)'}</span>
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => handleDownload('tghm_updated_paper.tex', latexSource)}
                className="w-full flex items-center justify-between rounded-md border border-[#CFC8B8] bg-[#FAF9F6] px-3.5 py-2.5 text-xs font-semibold text-[#1C1917] hover:bg-[#EFECE4]"
              >
                <span>Download LaTeX Manuscript (.tex)</span>
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => handleCopy('bibtex', bibtexSource)}
                className="w-full flex items-center justify-between rounded-md border border-[#CFC8B8] bg-[#FAF9F6] px-3.5 py-2.5 text-xs font-semibold text-[#1C1917] hover:bg-[#EFECE4]"
              >
                <span>{copiedFormat === 'bibtex' ? 'Copied BibTeX Citations' : 'Copy BibTeX Entries (.bib)'}</span>
                {copiedFormat === 'bibtex' ? (
                  <Check className="h-3.5 w-3.5 text-[#14532D]" aria-hidden="true" />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleDownload('tghm_updated_paper.md', markdownSource)}
                className="w-full flex items-center justify-between rounded-md border border-[#CFC8B8] bg-[#FAF9F6] px-3.5 py-2.5 text-xs font-semibold text-[#1C1917] hover:bg-[#EFECE4]"
              >
                <span>Download Markdown Draft (.md)</span>
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
