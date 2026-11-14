import React, { useState } from 'react';
import { Check, Copy, Download, Printer } from 'lucide-react';
import {
  AFFILIATIONS,
  AUTHORS,
  BASELINE_PAPER_META,
  DATASET_EXPANSION_SUITE,
  GAP_TRACEABILITY_MATRIX,
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
import { TghmSimulationInput, TghmSimulationOutput } from '../model/tghmEngine';

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

  const sections = buildUpdatedPaperSections(config, simInput, simOutput);
  const latexSource = generateLatexSource(config, simInput, simOutput);
  const bibtexSource = generateBibtexSource(config);
  const markdownSource = generateMarkdownSource(config, simInput, simOutput);

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
                  2025) documented critical unresolved risks: over 40% of citizen-built enterprise applications
                  exposed sensitive data via weak access controls, monolithic runtimes degraded under IoT and
                  deep computer-vision workloads (YOLOv2, 3D-DCM, PVAM), proprietary DSLs imposed vendor
                  lock-in, and generative AI introduced unverified logic. This updated paper proposes the{' '}
                  <strong>Tri-Strata Governed Hybrid Model (TGHM)</strong> and the{' '}
                  <strong>AMPO-ZT</strong> topological partitioning algorithm, evaluated across four
                  complementary multi-domain datasets. Under live simulation, TGHM achieves{' '}
                  <span className="font-mono font-semibold">{simOutput.portabilityIndexPct}%</span> Open-IR
                  portability, a governance readiness index of{' '}
                  <span className="font-mono font-semibold">{simOutput.governanceScore.toFixed(2)}</span>, and{' '}
                  <span className="font-mono font-semibold">{simOutput.debtReductionPct}%</span> lower 36-month
                  technical debt while preserving{' '}
                  <span className="font-mono font-semibold">{simOutput.sdlcAccelerationPct}%</span> SDLC
                  acceleration.
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
                            <tr key={g.id}>
                              <td className="py-2 pr-3 font-medium text-[#1C1917]">{g.baselineProblem}</td>
                              <td className="py-2 pr-3 text-[#44403C]">
                                {g.tghmPlane}: {g.tghmModule}
                              </td>
                              <td className="py-2 font-mono text-[#14532D]">{g.validationMetric}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}

                {/* Table 2: Datasets */}
                {config.includeDatasetExpansion && (
                  <section>
                    <p className="font-serif text-xs italic text-[#57534E]">
                      Table 2 — Complementary Multi-Domain Benchmark Datasets for TGHM Re-Evaluation.
                    </p>
                    <div className="mt-2 overflow-x-auto border-y border-[#DED9CE]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#DED9CE] text-[#57534E]">
                            <th className="py-2 pr-3 font-semibold">Dataset Suite</th>
                            <th className="py-2 pr-3 font-semibold">Plane</th>
                            <th className="py-2 font-semibold">Re-Evaluation Metrics</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#ECE8DF]">
                          {DATASET_EXPANSION_SUITE.map((d) => (
                            <tr key={d.id}>
                              <td className="py-2 pr-3 font-medium text-[#1C1917]">{d.name}</td>
                              <td className="py-2 pr-3 font-mono text-[#1E3A8A]">{d.targetTghmPlane}</td>
                              <td className="py-2 text-[#44403C]">{d.reEvaluationMetrics.join(', ')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}

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
                onClick={() => handleDownload('tghm_updated_paper.tex', latexSource)}
                className="w-full flex items-center justify-between rounded-md bg-[#1E3A8A] px-3.5 py-2.5 text-xs font-semibold text-white hover:bg-[#172554]"
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
