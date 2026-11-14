import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { BASELINE_PAPER_META } from '../data/paperBaseline';
import { ActiveSection } from './Header';

interface HeroOverviewProps {
  onNavigate: (section: ActiveSection) => void;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({ onNavigate }) => {
  return (
    <section className="no-print border-b border-[#DED9CE] bg-[#F8F6F1]">
      <div className="mx-auto max-w-[1360px] px-6 py-10 lg:py-12">
        {/* Clean unboxed metadata line */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#57534E]">
          <span>Baseline Paper: WJET Vol. 13(4), pp. 754–763</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">DOI {BASELINE_PAPER_META.doi}</span>
          <span aria-hidden="true">·</span>
          <span>Published September 11, 2025</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#9A3412] font-semibold">2026 Architectural Extension</span>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-[1.14] tracking-tight text-[#1C1917]">
              Tri-Strata Governed Hybrid Model (TGHM) for Agentic Low-Code/No-Code and AI/ML Systems
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#44403C]">
              An algorithmic and architectural upgrade to Ahmed et al. (2025). TGHM resolves the four structural
              gaps identified in the published review—citizen-app security exposure (&gt;40%), IoT and deep
              computer-vision scaling limits (YOLOv2, 3D-DCM, PVAM), proprietary vendor lock-in, and unbounded
              generative AI—via the <span className="font-semibold text-[#1C1917]">AMPO-ZT</span> topological
              partitioning algorithm and four complementary benchmark datasets.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('simulator')}
                className="inline-flex items-center gap-2 rounded-md bg-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#172554] whitespace-nowrap shrink-0"
              >
                <span>Open Workload Simulator</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('manuscript')}
                className="inline-flex items-center gap-2 rounded-md border border-[#CFC8B8] bg-white px-4 py-2.5 text-sm font-semibold text-[#1C1917] transition-colors hover:bg-[#EFECE4] whitespace-nowrap shrink-0"
              >
                <FileText className="h-4 w-4 text-[#57534E]" aria-hidden="true" />
                <span>Read Updated Manuscript</span>
              </button>
              <a
                href={BASELINE_PAPER_META.pdfAssetPath}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 text-sm font-medium text-[#57534E] underline underline-offset-4 hover:text-[#1C1917] whitespace-nowrap shrink-0"
              >
                View Original 2025 PDF
              </a>
            </div>
          </div>

          {/* Right column: Original Authors & Baseline Summary */}
          <div className="lg:col-span-4 rounded-lg border border-[#DED9CE] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
              Research Team &amp; Baseline Anchor
            </p>
            <p className="mt-2 font-serif text-base font-semibold text-[#1C1917]">
              N. Ahmed, M. Shahbaz, H. S. U. R. Khalil, Z. Javed, M. A. Khalid, F. A. Khan, Z. Maroof
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[#57534E]">
              University of Coimbra · Comsats University · National Textile University · Xi’an Jiaotong
              University · Sapienza University of Rome
            </p>
            <div className="mt-4 border-t border-[#ECE8DF] pt-3 flex items-center justify-between text-xs text-[#57534E]">
              <span>2015–2023 SLR Corpus</span>
              <span className="font-mono font-semibold text-[#1C1917] tabular-nums">
                68 / 432 Studies
              </span>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-xs text-[#57534E]">
              <span>2026 Dataset Expansion</span>
              <span className="font-mono font-semibold text-[#1E3A8A] tabular-nums">
                4 Benchmark Suites
              </span>
            </div>
          </div>
        </div>

        {/* Full-width 4-column quantitative proof strip below hero split */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-[#DED9CE] pt-6">
          <div className="rounded-lg border border-[#DED9CE] bg-white p-4">
            <p className="text-xs font-medium text-[#57534E]">2025 Security Exposure Gap</p>
            <p className="mt-1 font-mono text-2xl font-semibold text-[#9A3412] tabular-nums">&gt;40% Apps</p>
            <p className="mt-1 text-xs text-[#57534E]">
              Resolved by Plane III automated RBAC &amp; static AST policy gate (&lt;1.5% leakage)
            </p>
          </div>
          <div className="rounded-lg border border-[#DED9CE] bg-white p-4">
            <p className="text-xs font-medium text-[#57534E]">Offload Routing Complexity</p>
            <p className="mt-1 font-mono text-2xl font-semibold text-[#1C1917] tabular-nums">O(|V| + |E|)</p>
            <p className="mt-1 text-xs text-[#57534E]">
              AMPO-ZT topological DAG partitioning across visual and ONNX/gRPC workers
            </p>
          </div>
          <div className="rounded-lg border border-[#DED9CE] bg-white p-4">
            <p className="text-xs font-medium text-[#57534E]">Open-IR Cross-Engine Portability</p>
            <p className="mt-1 font-mono text-2xl font-semibold text-[#1E3A8A] tabular-nums">94% Index</p>
            <p className="mt-1 text-xs text-[#57534E]">
              Decouples BPMN 2.0, OpenAPI 3.1 &amp; ONNX flows from vendor DSL lock-in
            </p>
          </div>
          <div className="rounded-lg border border-[#DED9CE] bg-white p-4">
            <p className="text-xs font-medium text-[#57534E]">Retained SDLC Acceleration</p>
            <p className="mt-1 font-mono text-2xl font-semibold text-[#14532D] tabular-nums">54% – 74%</p>
            <p className="mt-1 text-xs text-[#57534E]">
              Preserves FTEI 2021 speedup while cutting 36-month technical debt by ~54%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
