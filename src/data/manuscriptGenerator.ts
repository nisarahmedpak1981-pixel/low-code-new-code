import {
  AFFILIATIONS,
  AUTHORS,
  BASELINE_PAPER_META,
  DATASET_EXPANSION_SUITE,
  GAP_TRACEABILITY_MATRIX,
  RE_EVALUATION_PROTOCOL,
  REFERENCES_LIST,
} from './paperBaseline';
import { TghmSimulationInput, TghmSimulationOutput, WORKLOAD_COMPLEXITY_MAP } from '../model/tghmEngine';

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

  const sections: PaperSection[] = [
    {
      number: '1',
      title: 'Introduction & Evolution Beyond Descriptive Synergy',
      paragraphs: [
        `In our foundational systematic review published in the World Journal of Engineering and Technology (Ahmed et al., 2025, DOI: ${BASELINE_PAPER_META.doi}), we examined 68 peer-reviewed studies spanning 2015–2023 and established how Low-Code/No-Code (LCNC) platforms accelerate digital transformation—demonstrated by Siemens' 30% reduction in unplanned downtime using Mendix and a 188% three-year ROI with 74% faster application cycles using Microsoft Power Apps and AI Builder.`,
        `However, empirical evidence from that baseline study revealed four structural barriers preventing long-term enterprise sustainability: (1) over 40% of citizen-developed enterprise applications exposed sensitive data due to misconfigured access controls; (2) pure LCNC runtimes suffer severe performance degradation under high-throughput IoT and compute-intensive AI/computer-vision workloads such as YOLOv2, SVM, Invertible Neural Networks (INN), 3D-Dual Contextualized Modeling (3D-DCM), and Pedestrian Visual Acuity Modules (PVAM); (3) proprietary domain-specific languages (DSLs) induce vendor lock-in and long-term technical debt; and (4) the emergence of generative AI introduces hallucinated logic flows and excessive automation dependence.`,
        `To transition the field from descriptive synthesis to formally verifiable engineering, this updated study introduces the Tri-Strata Governed Hybrid Model (TGHM) powered by the Adaptive Multi-Objective Pareto Offload and Zero-Trust Verification Algorithm (AMPO-ZT). Unlike static manual governance checklists, AMPO-ZT dynamically partitions workflow graphs across visual runtimes and containerized AI/ML workers while mathematically certifying security before deployment.`,
      ],
    },
    {
      number: '2',
      title: 'Extended Methodology: 2015–2026 Systematic Protocol',
      paragraphs: [
        `This updated edition preserves the replicable systematic literature review (SLR) methodology across IEEE Xplore, ACM Digital Library, Scopus, Web of Science, and SpringerLink established in Ahmed et al. (2025). The original corpus of 432 initial records (172 screened after removing 96 duplicates and 164 non-peer-reviewed items, yielding 68 core studies for 2015–2023) is extended with a 2024–2026 horizon targeting agentic AI orchestration, Open-IR low-code interoperability, and zero-trust citizen governance.`,
        `Beyond secondary literature synthesis, the methodology introduces constructive algorithmic design and multi-dataset empirical re-evaluation. Every architectural mechanism in TGHM is traced directly to an empirical gap identified in Sections 3, 5, and 7 of the 2025 publication and re-evaluated across four complementary public benchmark corpora.`,
      ],
    },
    {
      number: '3',
      title: 'The Tri-Strata Governed Hybrid Model (TGHM) & AMPO-ZT Algorithm',
      paragraphs: [
        `Unlike monolithic LCNC platforms that couple visual UI builders to proprietary cloud runtimes, TGHM decouples application synthesis into three orthogonal planes: Plane I (Co-Creative Semantic Intent & Bounded GenAI), Plane II (Canonical Open-IR Semantic Bridge & Hybrid Offload), and Plane III (Zero-Trust Policy Guardrail & MLOps Observability).`,
        `Plane I augments traditional IFML/BPMN visual canvases with schema-constrained generative AI synthesis and a confidence-gated Human-in-the-Loop (HITL) checkpoint (tau). Rather than permitting arbitrary code generation, generative suggestions must validate against a typed domain ontology AST before entering the intermediate pipeline.`,
        `Plane II eliminates vendor lock-in by compiling visual and generative specifications into a Canonical Open Intermediate Representation (Open-IR) composed of BPMN 2.0, OpenAPI 3.1, and ONNX model contracts. Within Plane II, the novel AMPO-ZT algorithm traverses the workflow DAG G = (V, E) in linear O(|V| + |E|) time, computing the normalized offload index Omega(w) per node to dispatch heavy tensor inference (YOLOv2, 3D-DCM, PVAM) to containerized pro-code microservices over typed gRPC adapters while retaining visual business orchestration.`,
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
        `To directly remediate the >40% data exposure rate observed in citizen-built LCNC applications (John, 2025), Plane III replaces manual role configuration with automated static AST policy verification and least-privilege RBAC synthesis prior to single-click deployment.`,
        `Closed-loop MLOps observability continuously monitors runtime drift, latency SLA breaches, and PII boundary compliance. Governance readiness is quantified through the composite metric G_score in [0, 1], requiring G_score >= 0.85 and strict RBAC pass status for autonomous production promotion.`,
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
        `The 2025 baseline paper relied primarily on aggregated industry adoption surveys (Figure 1, n=17,763 / n=8,415) and isolated enterprise case reports (Siemens Mendix, Microsoft Power Apps FTEI). To establish generalizable, reproducible empirical validity across all three TGHM planes, the updated study integrates four complementary benchmark datasets: (1) AI4I 2020 & NASA C-MAPSS industrial telemetry for predictive maintenance offload stress-testing; (2) ETH/UCY pedestrian trajectories & COCO-2017 for validating YOLOv2, 3D-DCM, and PVAM gRPC/ONNX adapters; (3) the ModelSet MDE corpus paired with OWASP LCNC Top-10 security fixtures for Open-IR portability and RBAC verification; and (4) the Berkeley Function Calling Leaderboard (BFCL) adapted for schema-constrained BPMN/OpenAPI workflow synthesis.`,
        `A structured five-stage re-evaluation pipeline—spanning Open-IR DAG normalization, static zero-trust confusion-matrix auditing, HITL threshold sweeping, containerized discrete-event workload replay, and 36-month longitudinal schema-mutation testing—quantifies how TGHM improves both performance and cross-domain generalizability.`,
      ],
    });
  }

  sections.push(
    {
      number: config.includeDatasetExpansion ? '6' : '5',
      title: 'Comparative Simulation & Benchmark Evaluation',
      paragraphs: [
        `Evaluating TGHM across representative industrial and computer-vision workloads demonstrates how hybrid governance preserves LCNC velocity without sacrificing enterprise resilience. Under the active benchmark configuration (${workloadMeta.label}, throughput lambda = ${simInput.throughputRps} req/s, SLA = ${simInput.latencySlaMs} ms), AMPO-ZT computes an offload index of Omega(w) = ${simOutput.omegaScore.toFixed(3)}, selecting "${simOutput.routingDecision}" with an estimated end-to-end latency of ${simOutput.estimatedLatencyMs} ms (${simOutput.slaSatisfied ? 'SLA satisfied' : 'SLA exceeded'}).`,
        `Furthermore, enabling the Open-IR Semantic Bridge and Plane III static policy gate achieves a Portability Index Pi_IR of ${simOutput.portabilityIndexPct}%, a Governance Readiness Score of G_score = ${simOutput.governanceScore.toFixed(2)} (${simOutput.governanceState}), and an estimated ${simOutput.debtReductionPct}% reduction in 36-month technical debt relative to monolithic proprietary LCNC deployments, while retaining ${simOutput.sdlcAccelerationPct}% SDLC acceleration over manual pro-code engineering.`,
      ],
    },
    {
      number: config.includeDatasetExpansion ? '7' : '6',
      title: 'Conclusions & Future Research Trajectory',
      paragraphs: [
        `While our 2025 review established the transformative potential of combining Low-Code/No-Code platforms with AI/ML, sustainable enterprise adoption requires algorithmic mechanisms that bound generative ambiguity, neutralize vendor lock-in, and enforce zero-trust security automatically.`,
        `The proposed Tri-Strata Governed Hybrid Model (TGHM) and AMPO-ZT partitioning algorithm provide a formal, dataset-validated blueprint bridging citizen-developer agility with pro-code AI/ML rigor. Future work will release the Open-IR benchmark harness across multi-cloud Kubernetes clusters running live 3D-DCM perception and industrial predictive maintenance pipelines.`,
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

  const datasetTex = config.includeDatasetExpansion
    ? `
\\begin{table}[htbp]
\\centering
\\caption{Complementary Benchmark Datasets for TGHM Re-Evaluation}
\\begin{tabular}{p{2.8cm}p{2.2cm}p{2.0cm}p{5.2cm}}
\\hline
\\textbf{Dataset Suite} & \\textbf{Domain} & \\textbf{Plane} & \\textbf{Generalizability Contribution} \\\\
\\hline
${DATASET_EXPANSION_SUITE.map(
  (d) => `${d.name.replace(/&/g, '\\&')} & ${d.domain.replace(/&/g, '\\&')} & ${d.targetTghmPlane} & ${d.enhancementRole.replace(/&/g, '\\&')} \\\\`
).join('\n')}
\\hline
\\end{tabular}
\\end{table}
`
    : '';

  const refsTex = REFERENCES_LIST.map(
    (r) => `\\bibitem{ref${r.num}} ${r.authors.replace(/&/g, '\\&')} (${r.year}) ${r.title.replace(/&/g, '\\&')}. \\textit{${r.venue}}.`
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
Low-Code/No-Code (LCNC) platforms combined with Artificial Intelligence and Machine Learning (AI/ML) have accelerated enterprise software delivery, yet prior systematic evidence (Ahmed et al., 2025) highlights critical structural gaps: over 40\\% of citizen-built enterprise apps expose sensitive data through weak access controls, monolithic runtimes degrade under high-throughput IoT and deep computer vision workloads (e.g., YOLOv2, 3D-DCM, PVAM), proprietary domain-specific languages create vendor lock-in, and generative AI introduces unverified logic flows. This updated study proposes the \\textbf{Tri-Strata Governed Hybrid Model (TGHM)} and the \\textbf{AMPO-ZT} topological DAG partitioning algorithm, integrating schema-constrained GenAI and confidence-gated HITL verification (Plane I), a canonical Open-IR semantic bridge with dynamic offload routing $\\Omega(w)$ (Plane II), and automated zero-trust RBAC synthesis with closed-loop MLOps observability $G_{\\text{score}}$ (Plane III). Evaluated across four complementary benchmark corpora (AI4I/C-MAPSS, ETH/UCY+COCO, ModelSet+OWASP, and BFCL), TGHM sustains 54--74\\% SDLC acceleration alongside a ${simOutput.debtReductionPct}\\% reduction in 36-month technical debt and ${simOutput.portabilityIndexPct}\\% cross-platform portability.
\\end{abstract}

\\noindent\\textbf{Keywords:} Low-Code/No-Code, Hybrid AI/ML Architecture, AMPO-ZT Algorithm, Open Intermediate Representation, Zero-Trust Governance, Benchmark Re-Evaluation.

${sectionTex}

${tableTex}

${datasetTex}

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
  return `# ${config.paperTitle}

**Authors:** ${AUTHORS.map((a) => `${a.name} (${a.affiliationIndex})`).join(', ')}  
**Target Venue:** ${config.targetVenue}  
**Baseline Paper:** ${BASELINE_PAPER_META.title} (DOI: ${BASELINE_PAPER_META.doi})

## Abstract

Low-Code/No-Code (LCNC) platforms combined with AI/ML have accelerated enterprise delivery, yet Ahmed et al. (2025) documented persistent risks across >40% security exposure, IoT/vision scaling limits, vendor lock-in, and generative AI reliability. This updated paper introduces the **Tri-Strata Governed Hybrid Model (TGHM)** and the **AMPO-ZT** partitioning algorithm, combining bounded GenAI intent composition (Plane I), an Open-IR Semantic Bridge with formal workload offload routing $\\Omega(w)$ (Plane II), and automated zero-trust RBAC synthesis with closed-loop MLOps governance $G_{\\text{score}}$ (Plane III), re-evaluated across four complementary multi-domain datasets.

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

## Re-Evaluation Protocol Summary

${RE_EVALUATION_PROTOCOL.map((p) => `${p.step}. **${p.title}**: ${p.methodology} *(Artifact: ${p.outputArtifact})*`).join('\n')}

## References

${REFERENCES_LIST.map((r) => `[${r.num}] ${r.authors} (${r.year}) *${r.title}*. ${r.venue}.`).join('\n')}
`;
}
