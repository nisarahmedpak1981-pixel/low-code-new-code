import React, { useState } from 'react';
import { ArrowDown, CheckCircle2, Layers, ShieldCheck, Cpu } from 'lucide-react';
import { TGHM_MODULES, PlaneModuleSpec } from '../model/tghmEngine';
import { AMPO_ZT_ALGORITHM_STEPS } from '../data/manuscriptGenerator';

const PLANES: {
  id: 'Plane I' | 'Plane II' | 'Plane III';
  title: string;
  subtitle: string;
  accentText: string;
  accentBg: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'Plane I',
    title: 'Plane I · Co-Creative Semantic Intent & Bounded GenAI',
    subtitle: 'Bridges citizen drag-and-drop modeling with AST-constrained GenAI and HITL gating',
    accentText: 'text-[#1E3A8A]',
    accentBg: 'bg-[#EFF6FF]',
    Icon: Layers,
  },
  {
    id: 'Plane II',
    title: 'Plane II · Canonical Open-IR Bridge & AMPO-ZT Offload',
    subtitle: 'Eliminates vendor lock-in and partitions heavy AI/CV workloads to pro-code gRPC/ONNX workers',
    accentText: 'text-[#9A3412]',
    accentBg: 'bg-[#FFF7ED]',
    Icon: Cpu,
  },
  {
    id: 'Plane III',
    title: 'Plane III · Zero-Trust Policy Guardrail & MLOps Observability',
    subtitle: 'Automates least-privilege RBAC synthesis, PII redaction, and closed-loop drift monitoring',
    accentText: 'text-[#14532D]',
    accentBg: 'bg-[#F0FDF4]',
    Icon: ShieldCheck,
  },
];

export const ModelBlueprint: React.FC = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('p2-router');
  const [activeAlgoStep, setActiveAlgoStep] = useState<number>(3);

  const selectedModule: PlaneModuleSpec =
    TGHM_MODULES.find((m) => m.id === selectedModuleId) ?? TGHM_MODULES[0];

  return (
    <section aria-labelledby="blueprint-heading" className="mx-auto max-w-[1360px] px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DED9CE] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#78716C]">
            01. Novel Architectural &amp; Algorithmic Contribution
          </p>
          <h2 id="blueprint-heading" className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
            Tri-Strata Governed Hybrid Model (TGHM) Blueprint
          </h2>
        </div>
        <p className="max-w-md text-sm text-[#57534E]">
          Select any architectural module across the three decoupled planes to inspect its formal contract,
          mathematical objective, and direct lineage to Ahmed et al. (2025).
        </p>
      </div>

      {/* Main Two-Zone Split: 65% Interactive Tri-Strata Architecture | 35% Module Inspector */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-5">
          {PLANES.map((plane, idx) => {
            const planeModules = TGHM_MODULES.filter((m) => m.plane === plane.id);
            const PlaneIcon = plane.Icon;
            return (
              <React.Fragment key={plane.id}>
                <div className="rounded-lg border border-[#DED9CE] bg-white p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 rounded-md p-2 ${plane.accentBg} ${plane.accentText}`}>
                        <PlaneIcon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                          {plane.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-[#57534E]">{plane.subtitle}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#78716C] whitespace-nowrap shrink-0">
                      {planeModules.length} Modules
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {planeModules.map((mod) => {
                      const isSelected = mod.id === selectedModule.id;
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => setSelectedModuleId(mod.id)}
                          className={`text-left rounded-md border p-3.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
                            isSelected
                              ? 'border-[#1E3A8A] bg-[#EFF6FF]/60'
                              : 'border-[#E7E3DA] bg-[#FAF9F6] hover:border-[#CFC8B8] hover:bg-[#F3F0E8]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[11px] font-semibold text-[#57534E]">
                              {mod.code}
                            </span>
                            {isSelected && (
                              <span className="text-[11px] font-semibold text-[#1E3A8A]">
                                Inspecting
                              </span>
                            )}
                          </div>
                          <p className="mt-1.5 text-sm font-semibold text-[#1C1917] leading-snug">
                            {mod.name}
                          </p>
                          <p className="mt-1 text-xs text-[#57534E] line-clamp-2">
                            {mod.role}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {idx < PLANES.length - 1 && (
                  <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#78716C]">
                    <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>
                      {idx === 0
                        ? 'Validated Typed Semantic Graph -> Open-IR DAG Compilation'
                        : 'Open-IR Artifact + Runtime Telemetry -> Zero-Trust Policy Gate'}
                    </span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right Column: Module Formal Specification Inspector */}
        <aside className="lg:col-span-5 rounded-lg border border-[#DED9CE] bg-white p-6">
          <div className="flex items-center justify-between gap-2 border-b border-[#ECE8DF] pb-4">
            <span className="font-mono text-xs font-semibold text-[#1E3A8A]">
              {selectedModule.plane} · Module {selectedModule.code}
            </span>
            <span className="text-xs text-[#57534E]">Formal Component Spec</span>
          </div>

          <h3 className="mt-4 font-serif text-xl font-semibold text-[#1C1917]">
            {selectedModule.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#44403C]">
            {selectedModule.role}
          </p>

          <div className="mt-5 rounded-md border border-[#E7E3DA] bg-[#F8F6F1] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
              Mathematical &amp; Structural Formulation
            </p>
            <p className="mt-2 font-mono text-xs sm:text-sm font-medium text-[#1C1917] break-words">
              {selectedModule.formulaLabel}
            </p>
          </div>

          <dl className="mt-5 space-y-4 text-sm">
            <div className="border-t border-[#ECE8DF] pt-3">
              <dt className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                Resolves 2025 Paper Limitation
              </dt>
              <dd className="mt-1 text-sm font-medium text-[#9A3412]">
                {selectedModule.resolvesGap}
              </dd>
            </div>

            <div className="border-t border-[#ECE8DF] pt-3">
              <dt className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                Scholarly Context &amp; Novelty
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-[#44403C]">
                {selectedModule.academicContext}
              </dd>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-[#ECE8DF] pt-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                  Inputs
                </dt>
                <dd className="mt-1.5 space-y-1 text-xs text-[#1C1917]">
                  {selectedModule.inputs.map((inp) => (
                    <div key={inp} className="font-mono">
                      · {inp}
                    </div>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                  Outputs
                </dt>
                <dd className="mt-1.5 space-y-1 text-xs text-[#1C1917]">
                  {selectedModule.outputs.map((outp) => (
                    <div key={outp} className="font-mono">
                      · {outp}
                    </div>
                  ))}
                </dd>
              </div>
            </div>
          </dl>
        </aside>
      </div>

      {/* AMPO-ZT Algorithmic Innovation Walkthrough */}
      <div className="mt-10 rounded-lg border border-[#DED9CE] bg-white p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#ECE8DF] pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#78716C]">
              Core Algorithmic Innovation
            </p>
            <h3 className="mt-1 font-serif text-xl font-semibold text-[#1C1917]">
              AMPO-ZT: Adaptive Multi-Objective Pareto Offload &amp; Zero-Trust Verification Algorithm
            </h3>
          </div>
          <span className="font-mono text-xs font-semibold text-[#1E3A8A] whitespace-nowrap shrink-0">
            Time Complexity: O(|V| + |E|) DAG Pass
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-2.5">
            {AMPO_ZT_ALGORITHM_STEPS.map((stepText, idx) => {
              const isActive = activeAlgoStep === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveAlgoStep(idx)}
                  className={`w-full text-left rounded-md border px-4 py-3 text-xs sm:text-sm font-mono transition-colors ${
                    isActive
                      ? 'border-[#1E3A8A] bg-[#EFF6FF]/60 text-[#1C1917]'
                      : 'border-[#ECE8DF] bg-[#FAF9F6] text-[#44403C] hover:bg-[#F3F0E8]'
                  }`}
                >
                  {stepText}
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-5 rounded-md border border-[#E7E3DA] bg-[#F8F6F1] p-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                Advantages Over 2025 Baseline Methods
              </p>
              <ul className="mt-3 space-y-3 text-sm text-[#44403C]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#14532D] shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="text-[#1C1917]">Eliminates Static Silos:</strong> Replaces ad-hoc
                    developer guesswork with deterministic, multi-criteria node partitioning across visual
                    and pro-code runtimes.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#14532D] shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="text-[#1C1917]">Pre-Deploy Security Proof:</strong> Shifts RBAC and
                    PII checks from post-incident audits to compile-time AST verification on Open-IR graphs.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#14532D] shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="text-[#1C1917]">Preserves Specialized AI Fidelity:</strong> Runs
                    YOLOv2, INN, 3D-DCM, and PVAM natively via ONNX/gRPC without dumbing down algorithms.
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-5 border-t border-[#DED9CE] pt-3 text-xs text-[#57534E]">
              Active Inspection: <span className="font-mono font-semibold text-[#1C1917]">Stage {activeAlgoStep} of 5</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
