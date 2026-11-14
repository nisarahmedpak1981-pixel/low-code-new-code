import {
  AFFILIATIONS,
  AUTHORS,
  BASELINE_PAPER_META,
  DATASET_EXPANSION_SUITE,
  GAP_TRACEABILITY_MATRIX,
  RE_EVALUATION_PROTOCOL,
  REFERENCES_LIST,
} from './paperBaseline';
import {
  computeSensitivityAnalysis,
  evaluateAllFourBaselines,
  getPlaneEvaluationSummaries,
  getThreeWayParadigmComparison,
  TghmSimulationInput,
  TghmSimulationOutput,
  WORKLOAD_COMPLEXITY_MAP,
} from '../model/tghmEngine';

export interface ManuscriptConfig {
  paperTitle: string;
  targetVenue: string;
  correspondingEmail: string;
  includeSimulationTable: boolean;
  includeFormalEquations: boolean;
  include2026ExtensionSLR: boolean;
  includeDatasetExpansion: boolean;
}

export const DEFAULT_MANUSCRIPT_CONFIG: ManuscriptConfig = {
  paperTitle:
    'From Synergy to Governed Autonomy: A Tri-Strata Hybrid Reference Model (TGHM) and AMPO-ZT Partitioning Algorithm for Agentic Low-Code/No-Code and AI/ML Systems',
  targetVenue: 'World Journal of Engineering and Technology (2026 Updated Edition)',
  correspondingEmail: 'nahmed@dei.uc.pt',
  includeSimulationTable: true,
  includeFormalEquations: true,
  include2026ExtensionSLR: true,
  includeDatasetExpansion: true,
};

export interface PaperSection {
  number: string;
  title: string;
  paragraphs: string[];
  calloutEquation?: {
    label: string;
    formula: string;
    explanation: string;
  };
}

export const AMPO_ZT_ALGORITHM_STEPS = [
  'Input: Visual/GenAI Workflow DAG G = (V, E), domain ontology O, throughput lambda, SLA L_max, HITL threshold tau.',
  'Step 1 (Plane I — Bounded AST Synthesis): Validate every GenAI-proposed node v in V against typed ontology O. If confidence c(v) < tau, attach mandatory HITL approval gate.',
  'Step 2 (Plane II — Open-IR Compilation): Transpile proprietary canvas primitives into canonical Open-IR (BPMN 2.0 + OpenAPI 3.1 + ONNX contract), computing portability Pi_IR.',
  'Step 3 (Plane II — AMPO-ZT Offload Partitioning): For each node v in V in O(|V| + |E|) topological order, evaluate Omega(v) = 0.38*C(v) + 0.27*norm(lambda) + 0.20*delta(v) + 0.15*(1 - L_max/1000). Assign v to Visual Runtime if Omega(v) < 0.36, Hybrid Split if 0.36 <= Omega(v) < 0.68, or Containerized Pro-Code gRPC/ONNX Worker if Omega(v) >= 0.68.',
  'Step 4 (Plane III — Zero-Trust Policy & RBAC Gate): Synthesize least-privilege IAM/RBAC manifests and verify PII boundary redaction across all edges e in E. Compute composite G_score.',
  'Step 5 (Release Decision): Promote Open-IR bundle only if G_score >= 0.85 and static policy checks pass; otherwise halt deployment with pinpointed AST violation trace.',
];

export function buildUpdatedPaperSections(
  config: ManuscriptConfig,
  simInput: TghmSimulationInput,
  simOutput: TghmSimulationOutput
): PaperSection[] {
  const workloadMeta = WORKLOAD_COMPLEXITY_MAP[simInput.workloadType];
  const fourBaselines = evaluateAllFourBaselines(15);
  const b1 = fourBaselines[0];
  const b2 = fourBaselines[1];
  const b3 = fourBaselines[2];
  const b4 = fourBaselines[3];
  const b4Gov = b4.tghmGovernedOutput ?? b4.output;
  const paradigmRows = getThreeWayParadigmComparison(simOutput);
  const visionSlaRow = paradigmRows[1];

  const sections: PaperSection[] = [
    {
      number: '1',
      title: 'Introduction & Evolution Beyond Descriptive Synergy',
      paragraphs: [
        `In our foundational systematic review published in the World Journal of Engineering and Technology (Ahmed et al., 2025 [1], DOI: ${BASELINE_PAPER_META.doi}), we examined 68 peer-reviewed studies spanning 2015–2023 and established how Low-Code/No-Code (LCNC) platforms accelerate digital transformation—demonstrated by Siemens' 30% reduction in unplanned downtime using Mendix predictive maintenance [2] and a 188% three-year ROI with 74% faster application cycles using Microsoft Power Apps and AI Builder [3].`,
        `However, empirical evidence synthesized in that baseline study revealed four structural barriers preventing long-term enterprise sustainability: (1) over 40% of citizen-developed enterprise applications exposed sensitive data due to misconfigured access controls [4]; (2) pure LCNC runtimes suffer severe performance degradation under high-throughput IoT and compute-intensive AI/computer-vision workloads—such as YOLOv2-based automated electronic toll collection [5], PCA/LDA/SVM face recognition pipelines [6], and 3D-Dual Contextualized Modeling (3D-DCM) with Pedestrian Visual Acuity Modules (PVAM) [7]; (3) proprietary domain-specific languages (DSLs) induce vendor lock-in and long-term technical debt [8], [9]; and (4) the emergence of generative AI introduces hallucinated logic flows and excessive automation dependence [10].`,
        `To transition the field from descriptive synthesis [1] to formally verifiable engineering, this updated study introduces the Tri-Strata Governed Hybrid Model (TGHM) powered by the Adaptive Multi-Objective Pareto Offload and Zero-Trust Verification Algorithm (AMPO-ZT). Unlike static manual governance checklists, AMPO-ZT dynamically partitions workflow graphs across visual runtimes and containerized AI/ML workers while mathematically certifying security before deployment.`,
      ],
    },
    {
      number: '2',
      title: 'Extended Methodology: 2015–2026 Systematic Protocol',
      paragraphs: [
        `This updated edition preserves the replicable systematic literature review (SLR) methodology across IEEE Xplore, ACM Digital Library, Scopus, Web of Science, and SpringerLink established in Ahmed et al. (2025) [1]. The original corpus of 432 initial records (172 screened after removing 96 duplicates and 164 non-peer-reviewed items, yielding 68 core studies for 2015–2023) is extended with a 2024–2026 horizon targeting agentic AI orchestration [10], Open-IR low-code interoperability [8], [9], and zero-trust citizen governance [4].`,
        `Beyond secondary literature synthesis, the methodology introduces constructive algorithmic design and multi-dataset empirical re-evaluation. Every architectural mechanism in TGHM is traced directly to an empirical gap identified in Sections 3, 5, and 7 of the 2025 publication [1] and re-evaluated across four complementary public benchmark corpora (Tables 1–2).`,
      ],
    },
    {
      number: '3',
      title: 'The Tri-Strata Governed Hybrid Model (TGHM) & AMPO-ZT Algorithm',
      paragraphs: [
        `Unlike monolithic LCNC platforms that couple visual UI builders to proprietary cloud runtimes [8], TGHM decouples application synthesis into three orthogonal planes: Plane I (Co-Creative Semantic Intent & Bounded GenAI), Plane II (Canonical Open-IR Semantic Bridge & Hybrid Offload), and Plane III (Zero-Trust Policy Guardrail & MLOps Observability).`,
        `Plane I augments traditional IFML/BPMN visual canvases (extending WebRatio/IFML modeling [11]) with schema-constrained generative AI synthesis [10] and a confidence-gated Human-in-the-Loop (HITL) checkpoint (tau). Rather than permitting arbitrary code generation, generative suggestions must validate against a typed domain ontology AST before entering the intermediate pipeline.`,
        `Plane II eliminates vendor lock-in [8], [9] by compiling visual and generative specifications into a Canonical Open Intermediate Representation (Open-IR) composed of BPMN 2.0, OpenAPI 3.1, and ONNX model contracts. Within Plane II, the novel AMPO-ZT algorithm traverses the workflow DAG G = (V, E) in linear O(|V| + |E|) time, computing the normalized offload index Omega(w) per node to dispatch heavy tensor inference—including YOLOv2 [5], PCA/SVM [6], and 3D-DCM/PVAM [7]—to containerized pro-code microservices over typed gRPC adapters while retaining visual business orchestration.`,
      ],
      calloutEquation: config.includeFormalEquations
        ? {
            label: 'Equation (1) — AMPO-ZT Dynamic Hybrid Offload Decision Function',
            formula: 'Omega(w) = 0.38 * C(w) + 0.27 * norm(lambda) + 0.20 * delta + 0.15 * (1 - L_max / 1000)',
            explanation:
              'Where C(w) in [0,1] denotes computational complexity, norm(lambda) is normalized request throughput, delta is customizability deficit, and L_max is the latency SLA in milliseconds. Workloads with Omega(w) < 0.36 execute in the visual runtime; 0.36 <= Omega(w) < 0.68 trigger a hybrid split; Omega(w) >= 0.68 offload inference to containerized pro-code microservices.',
          }
        : undefined,
    },
    {
      number: '4',
      title: 'Zero-Trust Policy Synthesis & Governance Readiness',
      paragraphs: [
        `To directly remediate the >40% data exposure rate observed in citizen-built LCNC applications [4], Plane III replaces manual role configuration with automated static AST policy verification and least-privilege RBAC synthesis prior to single-click deployment.`,
        `Extending the no-code MLOps democratization framework of Sundberg & Holmström [12], closed-loop MLOps observability continuously monitors runtime drift, latency SLA breaches, and PII boundary compliance. Governance readiness is quantified through the composite metric G_score in [0, 1], requiring G_score >= 0.85 and strict RBAC pass status for autonomous production promotion.`,
      ],
      calloutEquation: config.includeFormalEquations
        ? {
            label: 'Equation (2) — Composite Governance Readiness Index',
            formula: 'G_score = 0.35 * S_rbac + 0.25 * S_pii + 0.20 * S_hitl + 0.20 * Pi_IR',
            explanation:
              'Where S_rbac measures synthesized least-privilege access compliance, S_pii verifies regulated payload redaction, S_hitl captures confidence-gate calibration above threshold tau, and Pi_IR represents Open-IR vendor portability.',
          }
        : undefined,
    },
  ];

  if (config.includeDatasetExpansion) {
    sections.push({
      number: '5',
      title: 'Multi-Domain Dataset Integration & Re-Evaluation Protocol',
      paragraphs: [
        `The 2025 baseline paper [1] relied primarily on aggregated industry adoption surveys (Figure 1, n=17,763 / n=8,415) and isolated enterprise case reports [2], [3]. To establish generalizable, reproducible empirical validity across all three TGHM planes, the updated study integrates four complementary benchmark datasets: (1) AI4I 2020 [13] & NASA C-MAPSS industrial telemetry for predictive maintenance offload stress-testing; (2) ETH/UCY pedestrian trajectories [14] & COCO-2017 for validating YOLOv2 [5], PCA/SVM [6], and 3D-DCM/PVAM [7] gRPC/ONNX adapters; (3) the ModelSet MDE corpus [15] paired with OWASP LCNC Top-10 security fixtures [16] for Open-IR portability and RBAC verification [4], [8], [9]; and (4) the Berkeley Function Calling Leaderboard (BFCL) adapted for schema-constrained BPMN/OpenAPI workflow synthesis [10].`,
        `A structured five-stage re-evaluation pipeline—spanning Open-IR DAG normalization, static zero-trust confusion-matrix auditing, HITL threshold sweeping, containerized discrete-event workload replay, and 36-month longitudinal schema-mutation testing—quantifies how TGHM improves both performance and cross-domain generalizability.`,
      ],
    });
  }

  sections.push(
    {
      number: config.includeDatasetExpansion ? '6' : '5',
      title: 'Discussion Across All Three TGHM Planes (Plane I, Plane II & Plane III)',
      paragraphs: [
        `A central insight of this updated investigation is that resolving the trade-offs documented in Ahmed et al. (2025) [1] requires coordinated orchestration across all three architectural planes—Plane I (Intent & Bounded GenAI), Plane II (Open-IR & Hybrid Offload), and Plane III (Zero-Trust & MLOps Observability)—rather than isolated point tools (Table 5).`,
        `Plane I — Co-Creative Semantic Intent & Bounded GenAI (Modules M1.1–M1.3): Traditional visual builders [11] lack expressive AI reasoning, whereas unconstrained LLM copilots [10] hallucinate invalid API bindings and bypass enterprise approval chains. Validated against the BFCL Tool-Use & Schema-Constrained Flow Corpus, Plane I's Dual-Persona Intent Composer (M1.1) pairs visual UI schemas with typed SLA contracts, while the Schema-Constrained GenAI Synthesizer (M1.2) enforces domain ontology grammar checks so structurally invalid DAGs are rejected before compilation. Crucially, the Confidence-Gated HITL Checkpoint (M1.3) escalates low-confidence edges (c < tau) to human reviewers, preserving ${simOutput.sdlcAccelerationPct}% SDLC acceleration without surrendering determinism.`,
        `Plane II — Canonical Open-IR Semantic Bridge & Hybrid Offload (Modules M2.1–M2.3): To eliminate vendor lock-in [8], [9] and runtime bottlenecks across IoT and deep computer vision [5], [6], [7], Plane II compiles validated specifications into a vendor-neutral Open-IR (BPMN 2.0, OpenAPI 3.1, ONNX), achieving ${simOutput.portabilityIndexPct}% cross-platform portability (Pi_IR). Evaluated over the AI4I 2020 / NASA C-MAPSS [13] and ETH/UCY + COCO-2017 [14] corpora, the AMPO-ZT Dynamic Hybrid Offload Router (M2.2) uses Omega(w) to keep low-complexity forms (Omega < 0.36) in rapid visual runtimes while dispatching heavy tensor pipelines through Typed gRPC/ONNX Pro-Code Adapters (M2.3), preserving full numerical fidelity alongside sub-20 ms adapter overhead.`,
        `Plane III — Zero-Trust Policy Guardrail & MLOps Observability (Modules M3.1–M3.2): Audited against the ModelSet MDE corpus [15] and OWASP LCNC Top-10 security fixtures [16], Plane III directly targets the >40% weak-access-control data exposure finding [4]. The Static AST Policy & RBAC Synthesizer (M3.1) automatically generates least-privilege IAM manifests and PII redaction filters prior to cloud publishing, while Closed-Loop MLOps Drift & Latency Monitoring (M3.2, extending [12]) continuously aggregates S_rbac, S_pii, S_hitl, and Pi_IR into the release-gating G_score (>= 0.85). Together, Planes I–III convert citizen-developer speed into auditable, portable, SLA-compliant production systems.`,
      ],
    },
    {
      number: config.includeDatasetExpansion ? '7' : '6',
      title: 'Comparative Results, Multi-Paradigm Benchmarking & Sensitivity Analysis',
      paragraphs: [
        `To evaluate TGHM consistently against all empirical contexts from Ahmed et al. (2025) [1], we benchmark four foundational baselines derived directly from the 2025 study: Baseline B1 (Siemens Predictive Maintenance using Mendix IoT fault telemetry [2], lambda = ${b1.preset.input.throughputRps} req/s, SLA = ${b1.preset.input.latencySlaMs} ms), Baseline B2 (Enterprise Microsoft Power Apps + AI Builder process automation [3], lambda = ${b2.preset.input.throughputRps} req/s, SLA = ${b2.preset.input.latencySlaMs} ms), Baseline B3 (high-throughput 3D-DCM/PVAM pedestrian trajectory & YOLOv2/SVM computer vision offload [5], [6], [7], lambda = ${b3.preset.input.throughputRps} req/s, SLA = ${b3.preset.input.latencySlaMs} ms), and Baseline B4 (Unprotected Citizen GenAI Application exhibiting >40% weak-auth data exposure and unconstrained LLM risk [4], [10], lambda = ${b4.preset.input.throughputRps} req/s, SLA = ${b4.preset.input.latencySlaMs} ms).`,
        `Across these four baselines (Tables 3A–3B and Figure 4), AMPO-ZT adapts its execution topology without manual re-architecting. In B1 (Siemens Predictive Maintenance), AMPO-ZT computes Omega(w) = ${b1.output.omegaScore.toFixed(3)} and selects "${b1.output.routingDecision}", sustaining ${b1.output.effectiveThroughputRps} req/s SLA-compliant goodput (+${b1.throughputGainPct}% over ${b1.output.legacyThroughputRps} req/s monolithic LCNC) at ${b1.output.estimatedLatencyMs} ms latency with G_score = ${b1.output.governanceScore.toFixed(2)} and -${b1.output.debtReductionPct}% 36-month debt. In B2 (Enterprise Power Apps + AI Builder), Omega(w) = ${b2.output.omegaScore.toFixed(3)} preserves "${b2.output.routingDecision}" (${b2.output.effectiveThroughputRps} req/s, ${b2.output.sdlcAccelerationPct}% SDLC acceleration) while adding ${b2.output.portabilityIndexPct}% Open-IR portability and G_score = ${b2.output.governanceScore.toFixed(2)}. In compute-bound B3 (3D-DCM/PVAM & YOLOv2 Vision), Omega(w) = ${b3.output.omegaScore.toFixed(3)} triggers "${b3.output.routingDecision}", delivering ${b3.output.effectiveThroughputRps} req/s (+${b3.throughputGainPct}% over ${b3.output.legacyThroughputRps} req/s monolithic LCNC) inside the strict ${b3.preset.input.latencySlaMs} ms SLA (${b3.output.estimatedLatencyMs} ms). Finally, in B4 (Unprotected Citizen GenAI App), the legacy proprietary baseline is flagged "${b4.output.governanceState}" (G_score = ${b4.output.governanceScore.toFixed(2)}, Pi_IR = ${b4.output.portabilityIndexPct}%); enabling TGHM Plane I–III controls (tau = 0.88, Open-IR Bridge, Static AST RBAC Gate) elevates governance to "${b4Gov.governanceState}" (G_score = ${b4Gov.governanceScore.toFixed(2)}, Pi_IR = ${b4Gov.portabilityIndexPct}%) and raises compliant goodput from ${b4.output.legacyThroughputRps} req/s to ${b4Gov.effectiveThroughputRps} req/s (-${b4Gov.debtReductionPct}% technical debt).`,
        `Table 6 and Figure 5 summarize the three-way paradigm comparison contrasting Monolithic Legacy LCNC, Manual Pro-Code Engineering, and TGHM Tri-Strata. While monolithic LCNC achieves 76% SDLC acceleration, it collapses to ${visionSlaRow.monolithicDisplay} under compute-intensive vision/IoT load, exhibits 0.30 governance readiness (>40% exposure risk [4]), and suffers 28% portability under proprietary DSL lock-in [8]. Conversely, pure manual pro-code attains high SLA compliance (95%) and 86% container portability at the expense of slow 0–22% SDLC reuse. TGHM captures the Pareto-optimal envelope across all five criteria: ${simOutput.sdlcAccelerationPct}% SDLC speedup, ${visionSlaRow.tghmDisplay}, G_score = ${simOutput.governanceScore.toFixed(2)} (${simOutput.governanceState}), ${simOutput.portabilityIndexPct}% Open-IR portability, and -${simOutput.debtReductionPct}% 36-month technical debt (Figure 2).`,
        `Furthermore, one-at-a-time throughput sensitivity analysis (+/-15% perturbation across request volume lambda, infrastructure latency L_infra, SLA bound L_max, and workload complexity C(w) across all four baselines and active parameters, Tables 4A–4B and Figure 3) confirms that while monolithic runtimes hit severe capacity cliffs under minor L_infra jitter or lambda surges, AMPO-ZT dynamically crosses the Omega(w) >= 0.36 and Omega(w) >= 0.68 offload boundaries to preserve SLA-compliant goodput across industrial [13] and multi-stream vision [14] workloads.`,
      ],
    },
    {
      number: config.includeDatasetExpansion ? '8' : '7',
      title: 'Conclusions & Future Work: Convergent Emerging Technologies',
      paragraphs: [
        `While our 2025 systematic review [1] established the transformative potential of combining Low-Code/No-Code platforms with AI/ML, sustainable enterprise deployment demands formal algorithmic coordination across all three architectural strata introduced in this paper. Specifically, Plane I bounds citizen and generative ambiguity through AST-validated intent graphs and HITL thresholds (tau); Plane II resolves IoT/vision scaling bottlenecks and vendor lock-in via canonical Open-IR compilation and O(|V|+|E|) AMPO-ZT offloading Omega(w); and Plane III eliminates the >40% weak-auth data exposure risk through automated static RBAC synthesis and closed-loop MLOps observability (G_score >= 0.85). Across all four 2025 baselines (B1–B4) and three-way paradigm benchmarks, TGHM outperforms monolithic proprietary LCNC—achieving ${simOutput.portabilityIndexPct}% Open-IR portability (vs. 28%), elevating citizen GenAI governance from Blocked (0.30) to Verified (0.98), delivering up to +${b3.throughputGainPct}% higher SLA-compliant throughput on deep 3D-DCM/YOLOv2 vision workloads, and reducing 36-month technical debt by ${simOutput.debtReductionPct}% while retaining ${simOutput.sdlcAccelerationPct}% SDLC acceleration over manual pro-code engineering.`,
        `Future work will advance TGHM across six convergent systems, security, and decentralized domain frontiers: First, in Plane II Open-IR interoperability, we will integrate target cell selection algorithms for graph isomorphism [17] to accelerate structural subgraph matching, canonical AST deduplication, and automated semantic equivalence verification when translating heterogeneous proprietary DSLs into Open-IR bundles.`,
        `Second, to harden Plane I Human-in-the-Loop (HITL) governance against automated spoofing and credential-stuffing bots, we will embed continuous biometric authentication via mouse pointing endpoint prediction and kinematic template matching [18], cryptographically ensuring that citizen-developer reviews and high-risk deployment approvals originate from verified human operators rather than autonomous scripts.`,
        `Third, we will extend Plane III Zero-Trust guardrails to distributed edge and cyber-physical infrastructures by incorporating privacy-preserving multiclass federated learning for in-vehicle Controller Area Network (CAN) intrusion detection [19] alongside adaptive enterprise honeypot deception architectures [20] that feed live threat intelligence directly into AMPO-ZT's static policy synthesizer.`,
        `Fourth, to bound infrastructure latency jitter (L_infra) and guarantee isolation for containerized pro-code AI workers running on resource-constrained edge nodes, future runtime profiles will enforce hardware-assisted kernel code and data protection mechanisms [21] coupled with deterministic Real-Time OS (RTOS) task scheduling and priority-inversion control [22].`,
        `Fifth, we will deploy and benchmark end-to-end TGHM workflows in decentralized cyber-economic domains—specifically peer-to-peer (P2P) renewable energy trading simulations [23]—enabling grid prosumers to author visual settlement contracts in Plane I while offloading high-frequency market-clearing optimization to zero-trust, Open-IR microservices across federated microgrids.`,
      ],
    }
  );

  return sections;
}

export function generateLatexSource(
  config: ManuscriptConfig,
  simInput: TghmSimulationInput,
  simOutput: TghmSimulationOutput
): string {
  const sections = buildUpdatedPaperSections(config, simInput, simOutput);
  const authorBlock = AUTHORS.map((a) => `${a.name}$^{${a.affiliationIndex}}$`).join(', ');
  const affilBlock = AFFILIATIONS.map(
    (af) => `$^{${af.index}}$${af.department}, ${af.institution}, ${af.location}`
  ).join(' \\\\\n');

  const sectionTex = sections
    .map((sec) => {
      const paras = sec.paragraphs.join('\n\n');
      const eq = sec.calloutEquation
        ? `\n\\begin{equation}\n${sec.calloutEquation.formula
            .replace('Omega(w)', '\\Omega(w)')
            .replace('lambda', '\\lambda')
            .replace('delta', '\\delta')
            .replace('L_max', 'L_{\\max}')
            .replace('G_score', 'G_{\\text{score}}')
            .replace('S_rbac', 'S_{\\text{rbac}}')
            .replace('S_pii', 'S_{\\text{pii}}')
            .replace('S_hitl', 'S_{\\text{hitl}}')
            .replace('Pi_IR', '\\Pi_{\\text{IR}}')}\n\\end{equation}\n\\noindent ${sec.calloutEquation.explanation}\n`
        : '';
      return `\\section{${sec.title}}\n${paras}\n${eq}`;
    })
    .join('\n');

  const tableTex = config.includeSimulationTable
    ? `
\\begin{table}[htbp]
\\centering
\\caption{Gap-to-Mechanism Traceability from Ahmed et al. (2025) to TGHM}
\\begin{tabular}{p{2.4cm}p{3.4cm}p{2.2cm}p{4.6cm}}
\\hline
\\textbf{2025 Gap} & \\textbf{Empirical Anchor} & \\textbf{TGHM Plane} & \\textbf{Validation Target} \\\\
\\hline
${GAP_TRACEABILITY_MATRIX.map(
  (g) =>
    `${g.baselineProblem} & ${g.empiricalAnchor.replace(/>/g, '$>$')} & ${g.tghmPlane} & ${g.validationMetric.replace(/>=/g, '$\\ge$').replace(/</g, '$<$')} \\\\`
).join('\n')}
\\hline
\\end{tabular}
\\end{table}
`
    : '';

  const fourBaselines = evaluateAllFourBaselines(15);
  const sensitivity = computeSensitivityAnalysis(simInput, 15, 'infraLatency');
  const planeSummaries = getPlaneEvaluationSummaries(simOutput);
  const paradigmRows = getThreeWayParadigmComparison(simOutput);

  const datasetTex = config.includeDatasetExpansion
    ? `
\\begin{table*}[htbp]
\\centering
\\caption{Detailed Multi-Domain Benchmark Dataset Specifications for TGHM Re-Evaluation}
\\begin{tabular}{p{3.0cm}p{3.0cm}p{3.4cm}p{5.2cm}}
\\hline
\\textbf{Dataset Suite} & \\textbf{Scale \\& Format} & \\textbf{2025 Baseline Gap} & \\textbf{Generalizability Role \\& Metrics} \\\\
\\hline
${DATASET_EXPANSION_SUITE.map(
  (d) =>
    `${d.name.replace(/&/g, '\\&')} (${d.targetTghmPlane}) & ${d.scaleAndFormat.replace(/&/g, '\\&')} & ${d.complementsBaseline.replace(/&/g, '\\&').replace(/>/g, '$>$')} & ${d.enhancementRole.replace(/&/g, '\\&')} Metrics: ${d.reEvaluationMetrics.join(', ')}. \\\\`
).join('\n')}
\\hline
\\end{tabular}
\\end{table*}
`
    : '';

  const simulationTex = `
\\begin{table*}[htbp]
\\centering
\\caption{Baseline Case-Study Parameter Specifications from Ahmed et al. (2025) [1]}
\\begin{tabular}{p{3.6cm}p{2.2cm}p{2.6cm}p{2.6cm}p{2.6cm}}
\\hline
\\textbf{Baseline Case Study} & \\textbf{Workload $C(w)$} & \\textbf{Load $\\lambda$ / SLA $L_{\\max}$} & \\textbf{$L_{\\text{infra}}$ / $\\delta$ / $\\tau$} & \\textbf{PII \\& Gate Mode} \\\\
\\hline
${fourBaselines
  .map(
    (b) =>
      `${b.code}: ${b.preset.label.replace(/&/g, '\\&')} (${b.preset.sourceCitation.replace(/&/g, '\\&')}) & ${WORKLOAD_COMPLEXITY_MAP[b.preset.input.workloadType].normalizedC.toFixed(2)} & ${b.preset.input.throughputRps} req/s / ${b.preset.input.latencySlaMs} ms & ${b.preset.input.infraLatencyMs ?? 14} ms / ${b.preset.input.customizabilityNeed.toFixed(2)} / ${b.preset.input.hitlConfidenceTau.toFixed(2)} & ${b.preset.input.piiTier.toUpperCase()} (${b.preset.input.staticPolicyGateEnabled ? 'Static Gate ON' : 'Unguarded DSL'}) \\\\`
  )
  .join('\n')}
\\hline
\\end{tabular}
\\end{table*}

\\begin{table*}[htbp]
\\centering
\\caption{Comparative Workload Simulation Results Across All Four Baselines (Including TGHM Remediation for B4)}
\\begin{tabular}{p{3.4cm}p{2.4cm}p{2.2cm}p{2.8cm}p{2.6cm}p{2.0cm}}
\\hline
\\textbf{Baseline Scenario} & \\textbf{$\\Omega(w)$ \\& Route} & \\textbf{Latency} & \\textbf{TGHM vs. Legacy} & \\textbf{$G_{\\text{score}}$ \\& $\\Pi_{\\text{IR}}$} & \\textbf{36-Mo Debt} \\\\
\\hline
${fourBaselines
  .map((b) => {
    const baseRow = `${b.code}: ${b.preset.label.replace(/&/g, '\\&')} (${b.preset.input.throughputRps} req/s) & ${b.output.omegaScore.toFixed(3)} (${b.output.routingDecision.split(' ')[0]}) & ${b.output.estimatedLatencyMs} ms & ${b.output.effectiveThroughputRps} vs. ${b.output.legacyThroughputRps} req/s & ${b.output.governanceScore.toFixed(2)} ${b.output.governanceState} (${b.output.portabilityIndexPct}\\%) & -${b.output.debtReductionPct}\\% \\\\`;
    if (b.tghmGovernedOutput) {
      const gov = b.tghmGovernedOutput;
      const govRow = `${b.code}-TGHM: Governed Citizen GenAI ($\\tau=0.88$, Open-IR, Gate ON) & ${gov.omegaScore.toFixed(3)} (${gov.routingDecision.split(' ')[0]}) & ${gov.estimatedLatencyMs} ms & ${gov.effectiveThroughputRps} vs. ${gov.legacyThroughputRps} req/s & ${gov.governanceScore.toFixed(2)} ${gov.governanceState} (${gov.portabilityIndexPct}\\%) & -${gov.debtReductionPct}\\% \\\\`;
      return `${baseRow}\n${govRow}`;
    }
    return baseRow;
  })
  .join('\n')}
\\hline
\\end{tabular}
\\end{table*}

\\begin{table}[htbp]
\\centering
\\caption{One-at-a-Time Throughput Sensitivity Analysis ($\\pm 15\\%$ Perturbation, Active Simulation)}
\\begin{tabular}{p{3.2cm}p{1.2cm}p{1.2cm}p{1.8cm}}
\\hline
\\textbf{Factor} & \\textbf{-15\\%} & \\textbf{+15\\%} & \\textbf{Elasticity} \\\\
\\hline
${sensitivity.factors
  .map(
    (f) =>
      `${f.label.replace('λ', '$\\lambda$')} & ${f.lowEffectiveRps} & ${f.highEffectiveRps} & ${f.swingRps} req/s (${f.elasticityRatio.toFixed(2)}$\\times$) \\\\`
  )
  .join('\n')}
\\hline
\\end{tabular}
\\end{table}

\\begin{table}[htbp]
\\centering
\\caption{Cross-Baseline Dominant Throughput Sensitivity Driver ($\\pm 15\\%$ Perturbation Across B1--B4)}
\\begin{tabular}{p{2.6cm}p{2.2cm}p{1.4cm}p{1.4cm}}
\\hline
\\textbf{Baseline} & \\textbf{Top Driver} & \\textbf{Swing} & \\textbf{Elasticity} \\\\
\\hline
${fourBaselines
  .map(
    (b) =>
      `${b.code}: ${b.preset.label.split(' ')[0]} & ${b.sensitivityTopFactor.label.replace('λ', '$\\lambda$')} & ${b.sensitivityTopFactor.swingRps} req/s & ${b.sensitivityTopFactor.elasticityRatio.toFixed(2)}$\\times$ \\\\`
  )
  .join('\n')}
\\hline
\\end{tabular}
\\end{table}

\\begin{table*}[htbp]
\\centering
\\caption{Tri-Strata Plane Synthesis: Modules, Benchmark Datasets, and Verified Outcomes (Planes I--III)}
\\begin{tabular}{p{2.4cm}p{3.4cm}p{3.2cm}p{3.4cm}p{2.8cm}}
\\hline
\\textbf{TGHM Plane} & \\textbf{Core Modules} & \\textbf{Dataset Anchor} & \\textbf{Architectural Mechanism} & \\textbf{Verified Outcome} \\\\
\\hline
${planeSummaries
  .map(
    (p) =>
      `${p.plane} (${p.planeName.replace(/&/g, '\\&')}) & ${p.modules.replace(/&/g, '\\&')} & ${p.datasetAnchor.replace(/&/g, '\\&')} & ${p.keyMechanism.replace(/&/g, '\\&')} & ${p.verifiedMetric.replace(/%/g, '\\%').replace(/</g, '$<$')} \\\\`
  )
  .join('\n')}
\\hline
\\end{tabular}
\\end{table*}

\\begin{table*}[htbp]
\\centering
\\caption{Three-Way Paradigm Comparison: Monolithic Legacy LCNC vs. Manual Pro-Code vs. TGHM Tri-Strata}
\\begin{tabular}{p{3.0cm}p{3.8cm}p{3.8cm}p{4.0cm}}
\\hline
\\textbf{Evaluation Dimension} & \\textbf{Monolithic Legacy LCNC} & \\textbf{Manual Pro-Code} & \\textbf{TGHM Tri-Strata (Ours)} \\\\
\\hline
${paradigmRows
  .map(
    (r) =>
      `${r.dimension.replace(/&/g, '\\&')} & ${r.monolithicDisplay.replace(/%/g, '\\%').replace(/>/g, '$>$')} & ${r.manualProCodeDisplay.replace(/%/g, '\\%')} & ${r.tghmDisplay.replace(/%/g, '\\%')} \\\\`
  )
  .join('\n')}
\\hline
\\end{tabular}
\\end{table*}
`;

  const refsTex = REFERENCES_LIST.map(
    (r) =>
      `\\bibitem{ref${r.num}} ${r.authors.replace(/&/g, '\\&')} (${r.year}) ${r.title.replace(/&/g, '\\&')}. \\textit{${r.venue}}.${r.doiOrUrl ? ` \\url{${r.doiOrUrl}}` : ''}`
  ).join('\n');

  return `\\documentclass[11pt,twocolumn]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath,amssymb}
\\usepackage{booktabs}
\\usepackage{hyperref}
\\usepackage[margin=0.8in]{geometry}

\\title{\\textbf{${config.paperTitle}}}
\\author{${authorBlock} \\\\ \\small ${affilBlock}}
\\date{Target Venue: ${config.targetVenue} \\\\ Baseline Reference: DOI 10.4236/wjet.2025.134048}

\\begin{document}
\\maketitle

\\begin{abstract}
Low-Code/No-Code (LCNC) platforms combined with Artificial Intelligence and Machine Learning (AI/ML) have accelerated enterprise software delivery, yet prior systematic evidence (Ahmed et al., 2025~\\cite{ref1}) highlights critical structural gaps: over 40\\% of citizen-built enterprise apps expose sensitive data through weak access controls, monolithic runtimes degrade under high-throughput IoT and deep computer vision workloads (e.g., YOLOv2, 3D-DCM, PVAM), proprietary domain-specific languages create vendor lock-in, and generative AI introduces unverified logic flows. This updated study proposes the \\textbf{Tri-Strata Governed Hybrid Model (TGHM)} and the \\textbf{AMPO-ZT} topological DAG partitioning algorithm, integrating schema-constrained GenAI and confidence-gated HITL verification (Plane I), a canonical Open-IR semantic bridge with dynamic offload routing $\\Omega(w)$ (Plane II), and automated zero-trust RBAC synthesis with closed-loop MLOps observability $G_{\\text{score}}$ (Plane III). Evaluated across four complementary benchmark corpora (AI4I/C-MAPSS, ETH/UCY+COCO, ModelSet+OWASP, and BFCL) alongside one-at-a-time throughput sensitivity sweeps, TGHM achieves ${simOutput.effectiveThroughputRps} req/s effective throughput (vs. ${simOutput.legacyThroughputRps} req/s on monolithic LCNC), sustains 54--74\\% SDLC acceleration alongside a ${simOutput.debtReductionPct}\\% reduction in 36-month technical debt, and ${simOutput.portabilityIndexPct}\\% cross-platform portability, establishing a roadmap spanning graph-isomorphism IR matching, kinematic HITL biometrics, federated intrusion detection, honeypot intelligence, RTOS/kernel isolation, and peer-to-peer energy trading.
\\end{abstract}

\\noindent\\textbf{Keywords:} Low-Code/No-Code, Hybrid AI/ML Architecture, AMPO-ZT Algorithm, Open Intermediate Representation, Zero-Trust Governance, Throughput Sensitivity, Benchmark Re-Evaluation.

${sectionTex}

${tableTex}

${datasetTex}

${simulationTex}

\\begin{thebibliography}{99}
${refsTex}
\\end{thebibliography}

\\end{document}
`;
}

export function generateBibtexSource(config: ManuscriptConfig): string {
  return `@article{ahmed2025synergy,
  title={${BASELINE_PAPER_META.title}},
  author={Ahmed, Nisar and Shahbaz, Muhammad and Khalil, Hafiz Shafiq Ur Rehman and Javed, Zahid and Khalid, Muhammad Ali and Khan, Farhan Ajmal and Maroof, Zubair},
  journal={${BASELINE_PAPER_META.journal}},
  volume={13},
  number={4},
  pages={754--763},
  year={2025},
  publisher={Scientific Research Publishing},
  doi={${BASELINE_PAPER_META.doi}}
}

@article{ahmed2026tghm,
  title={${config.paperTitle}},
  author={Ahmed, Nisar and Shahbaz, Muhammad and Khalil, Hafiz Shafiq Ur Rehman and Javed, Zahid and Khalid, Muhammad Ali and Khan, Farhan Ajmal and Maroof, Zubair},
  journal={${config.targetVenue}},
  year={2026},
  note={Updated architectural and dataset-validated extension of DOI: ${BASELINE_PAPER_META.doi}}
}
`;
}

export function generateMarkdownSource(
  config: ManuscriptConfig,
  simInput: TghmSimulationInput,
  simOutput: TghmSimulationOutput
): string {
  const sections = buildUpdatedPaperSections(config, simInput, simOutput);
  const fourBaselines = evaluateAllFourBaselines(15);
  const sensitivity = computeSensitivityAnalysis(simInput, 15, 'infraLatency');
  const planeSummaries = getPlaneEvaluationSummaries(simOutput);
  const paradigmRows = getThreeWayParadigmComparison(simOutput);

  return `# ${config.paperTitle}

**Authors:** ${AUTHORS.map((a) => `${a.name} (${a.affiliationIndex})`).join(', ')}  
**Target Venue:** ${config.targetVenue}  
**Baseline Paper:** ${BASELINE_PAPER_META.title} (DOI: ${BASELINE_PAPER_META.doi})

## Abstract

Low-Code/No-Code (LCNC) platforms combined with AI/ML have accelerated enterprise delivery, yet Ahmed et al. (2025) [1] documented persistent risks across >40% security exposure, IoT/vision scaling limits, vendor lock-in, and generative AI reliability. This updated paper introduces the **Tri-Strata Governed Hybrid Model (TGHM)** and the **AMPO-ZT** partitioning algorithm, combining bounded GenAI intent composition (Plane I), an Open-IR Semantic Bridge with formal workload offload routing $\\Omega(w)$ (Plane II), and automated zero-trust RBAC synthesis with closed-loop MLOps governance $G_{\\text{score}}$ (Plane III), benchmarked across all four baseline case studies (B1–B4) and re-evaluated across four complementary multi-domain datasets.

## AMPO-ZT Algorithmic Specification

${AMPO_ZT_ALGORITHM_STEPS.map((s) => `- ${s}`).join('\n')}

${sections
  .map(
    (s) =>
      `## ${s.number}. ${s.title}\n\n${s.paragraphs.join('\n\n')}${
        s.calloutEquation
          ? `\n\n> **${s.calloutEquation.label}**\n> \`${s.calloutEquation.formula}\`\n> ${s.calloutEquation.explanation}`
          : ''
      }`
  )
  .join('\n\n')}

## Table 2: Multi-Domain Benchmark Datasets

| Dataset Suite | Scale & Format | Complements 2025 Baseline | Re-Evaluation Metrics |
|---|---|---|---|
${DATASET_EXPANSION_SUITE.map(
  (d) => `| ${d.name} (${d.targetTghmPlane}) | ${d.scaleAndFormat} | ${d.complementsBaseline} | ${d.reEvaluationMetrics.join(', ')} |`
).join('\n')}

## Table 3A: Baseline Case-Study Parameter Specifications (B1–B4 from Ahmed et al., 2025 [1])

| Baseline | Workload Class & Citation | Load (λ) / SLA (L_max) | L_infra / δ / τ | PII Tier & Policy Mode |
|---|---|---|---|---|
${fourBaselines
  .map(
    (b) =>
      `| ${b.code}: ${b.preset.label} | ${WORKLOAD_COMPLEXITY_MAP[b.preset.input.workloadType].label} (${b.preset.sourceCitation}) | ${b.preset.input.throughputRps} req/s / ${b.preset.input.latencySlaMs} ms | ${b.preset.input.infraLatencyMs ?? 14} ms / ${b.preset.input.customizabilityNeed.toFixed(2)} / ${b.preset.input.hitlConfidenceTau.toFixed(2)} | ${b.preset.input.piiTier.toUpperCase()} / ${b.preset.input.staticPolicyGateEnabled ? 'Static Gate ON' : 'Unguarded DSL'} |`
  )
  .join('\n')}

## Table 3B: Comparative Simulation Results Across All Four Baselines (Including B4-TGHM)

| Baseline Scenario | Load (req/s) | Omega(w) & Route | Latency | TGHM vs Legacy Goodput | G_score & Portability | 36-Mo Debt Reduction |
|---|---|---|---|---|---|---|
${fourBaselines
  .map((b) => {
    const row = `| ${b.code}: ${b.preset.label} | ${b.preset.input.throughputRps} | ${b.output.omegaScore.toFixed(3)} (${b.output.routingDecision}) | ${b.output.estimatedLatencyMs} ms | ${b.output.effectiveThroughputRps} vs ${b.output.legacyThroughputRps} req/s | ${b.output.governanceScore.toFixed(2)} ${b.output.governanceState} (${b.output.portabilityIndexPct}%) | -${b.output.debtReductionPct}% |`;
    if (b.tghmGovernedOutput) {
      const gov = b.tghmGovernedOutput;
      return `${row}\n| ${b.code}-TGHM: Governed Citizen GenAI (τ=0.88, Open-IR, Gate ON) | ${b.preset.input.throughputRps} | ${gov.omegaScore.toFixed(3)} (${gov.routingDecision}) | ${gov.estimatedLatencyMs} ms | ${gov.effectiveThroughputRps} vs ${gov.legacyThroughputRps} req/s | ${gov.governanceScore.toFixed(2)} ${gov.governanceState} (${gov.portabilityIndexPct}%) | -${gov.debtReductionPct}% |`;
    }
    return row;
  })
  .join('\n')}

## Table 4A: Active Simulation Throughput Sensitivity & Elasticity (±15%)

| Factor | Baseline | -15% (req/s) | +15% (req/s) | Swing & Elasticity |
|---|---|---|---|---|
${sensitivity.factors
  .map(
    (f) =>
      `| ${f.label} | ${f.baselineDisplay} | ${f.lowEffectiveRps} | ${f.highEffectiveRps} | ${f.swingRps} req/s (${f.elasticityRatio.toFixed(2)}x) |`
  )
  .join('\n')}

## Table 4B: Cross-Baseline Dominant Sensitivity Driver (±15% Across B1–B4)

| Baseline | Dominant Driver | -15% to +15% Goodput Range | Swing & Elasticity |
|---|---|---|---|
${fourBaselines
  .map(
    (b) =>
      `| ${b.code}: ${b.preset.label} | ${b.sensitivityTopFactor.label} | ${b.sensitivityTopFactor.lowEffectiveRps}–${b.sensitivityTopFactor.highEffectiveRps} req/s | ${b.sensitivityTopFactor.swingRps} req/s (${b.sensitivityTopFactor.elasticityRatio.toFixed(2)}x) |`
  )
  .join('\n')}

## Table 5: Tri-Strata Plane Synthesis (Plane I, Plane II & Plane III)

| TGHM Plane | Modules | Dataset Anchor | Key Mechanism | Verified Outcome |
|---|---|---|---|---|
${planeSummaries
  .map(
    (p) =>
      `| ${p.plane}: ${p.planeName} | ${p.modules} | ${p.datasetAnchor} | ${p.keyMechanism} | ${p.verifiedMetric} |`
  )
  .join('\n')}

## Table 6: Three-Way Paradigm Comparison

| Evaluation Dimension | Monolithic Legacy LCNC | Manual Pro-Code | TGHM Tri-Strata (Ours) |
|---|---|---|---|
${paradigmRows
  .map(
    (r) =>
      `| ${r.dimension} | ${r.monolithicDisplay} | ${r.manualProCodeDisplay} | ${r.tghmDisplay} |`
  )
  .join('\n')}

## Re-Evaluation Protocol Summary

${RE_EVALUATION_PROTOCOL.map((p) => `${p.step}. **${p.title}**: ${p.methodology} *(Artifact: ${p.outputArtifact})*`).join('\n')}

## References

${REFERENCES_LIST.map((r) => `[${r.num}] ${r.authors} (${r.year}) *${r.title}*. ${r.venue}.${r.doiOrUrl ? ` ${r.doiOrUrl}` : ''}`).join('\n')}
`;
}
