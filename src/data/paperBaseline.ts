export interface AuthorInfo {
  name: string;
  affiliationIndex: number;
  email: string;
}

export interface AffiliationInfo {
  index: number;
  department: string;
  institution: string;
  location: string;
}

export interface AdoptionAreaMetric {
  area: string;
  q1_2022: number;
  q3_2023: number;
  projected_2026_tghm: number;
  primaryWorkload: 'Visual LCNC' | 'Hybrid Offload' | 'Edge / Vision';
}

export interface GapTraceabilityItem {
  id: string;
  sourceSection: string;
  citationRef: string;
  baselineProblem: string;
  empiricalAnchor: string;
  tghmPlane: 'Plane I' | 'Plane II' | 'Plane III';
  tghmModule: string;
  newContribution: string;
  validationMetric: string;
}

export interface DatasetExpansionItem {
  id: string;
  name: string;
  domain: string;
  complementsBaseline: string;
  scaleAndFormat: string;
  targetTghmPlane: 'Plane I' | 'Plane II' | 'Plane III';
  enhancementRole: string;
  reEvaluationMetrics: string[];
}

export interface ReEvaluationStep {
  step: number;
  title: string;
  methodology: string;
  outputArtifact: string;
}

export interface ReferenceItem {
  num: number;
  authors: string;
  year: string;
  title: string;
  venue: string;
  doiOrUrl?: string;
  isNew2026?: boolean;
}

export const BASELINE_PAPER_META = {
  title: 'The Synergy of Low-Code/No-Code and AI/ML: Enhancing Intelligent Automation',
  journal: 'World Journal of Engineering and Technology',
  volume: '2025, 13(4), 754-763',
  doi: '10.4236/wjet.2025.134048',
  publishedDate: 'September 11, 2025',
  receivedDate: 'August 18, 2025',
  acceptedDate: 'September 8, 2025',
  pdfAssetPath: '/assets/aistudio/wjet_1561772_d2895cf1.pdf',
  slrWindow: 'January 2015 – December 2023',
  slrFunnel: {
    initialRecords: 432,
    duplicatesRemoved: 96,
    nonPeerReviewedEliminated: 164,
    abstractsScreened: 172,
    includedStudies: 68,
  },
};

export const AUTHORS: AuthorInfo[] = [
  { name: 'Nisar Ahmed', affiliationIndex: 1, email: 'nahmed@dei.uc.pt' },
  { name: 'Muhammad Shahbaz', affiliationIndex: 2, email: 'fa14mcs151@vcomsats.edu.pk' },
  { name: 'Hafiz Shafiq Ur Rehman Khalil', affiliationIndex: 1, email: 'hsurk@dei.uc.pt' },
  { name: 'Zahid Javed', affiliationIndex: 3, email: 'zahid.javed@ntu.edu.pk' },
  { name: 'Muhammad Ali Khalid', affiliationIndex: 4, email: 'alikhalid2k18@gmail.com' },
  { name: 'Farhan Ajmal Khan', affiliationIndex: 5, email: 'khan.1923279@studenti.uniroma1.it' },
  { name: 'Zubair Maroof', affiliationIndex: 6, email: 'zubairxjtu15@hotmail.com' },
];

export const AFFILIATIONS: AffiliationInfo[] = [
  { index: 1, department: 'Department of Computer Engineering', institution: 'University of Coimbra', location: 'Coimbra, Portugal' },
  { index: 2, department: 'Department of Computer Science', institution: 'Comsats University', location: 'Islamabad, Pakistan' },
  { index: 3, department: 'Department of Computer Science', institution: 'National Textile University', location: 'Faisalabad, Pakistan' },
  { index: 4, department: 'School of Energy and Power Engineering', institution: 'Xi’an Jiaotong University', location: 'Xi’an, China' },
  { index: 5, department: 'Department of Artificial Intelligence', institution: 'Sapienza University of Rome', location: 'Rome, Italy' },
  { index: 6, department: 'School of Electronics and Information Engineering', institution: 'Xi’an Jiaotong University', location: 'Xi’an, China' },
];

// Exact Figure 1 dataset from Ahmed et al. (2025), p. 758, plus 2026 TGHM Hybrid-Agentic projection
export const FIGURE_1_ADOPTION_DATA: AdoptionAreaMetric[] = [
  { area: 'Virtual Reality (incl. non-developers)', q1_2022: 68, q3_2023: 78, projected_2026_tghm: 84, primaryWorkload: 'Hybrid Offload' },
  { area: 'Consumer Electronics Devices', q1_2022: 64, q3_2023: 76, projected_2026_tghm: 82, primaryWorkload: 'Edge / Vision' },
  { area: 'Augmented Reality (incl. non-developers)', q1_2022: 62, q3_2023: 76, projected_2026_tghm: 83, primaryWorkload: 'Edge / Vision' },
  { area: 'Embedded Software', q1_2022: 63, q3_2023: 75, projected_2026_tghm: 80, primaryWorkload: 'Edge / Vision' },
  { area: 'Industrial IoT', q1_2022: 65, q3_2023: 74, projected_2026_tghm: 85, primaryWorkload: 'Hybrid Offload' },
  { area: 'Data Science', q1_2022: 56, q3_2023: 70, projected_2026_tghm: 81, primaryWorkload: 'Hybrid Offload' },
  { area: 'Apps/Extensions for 3rd-Party Ecosystems', q1_2022: 56, q3_2023: 69, projected_2026_tghm: 79, primaryWorkload: 'Visual LCNC' },
  { area: 'Games', q1_2022: 52, q3_2023: 66, projected_2026_tghm: 73, primaryWorkload: 'Hybrid Offload' },
  { area: 'Machine Learning / AI', q1_2022: 52, q3_2023: 66, projected_2026_tghm: 86, primaryWorkload: 'Hybrid Offload' },
  { area: 'Mobile Apps', q1_2022: 48, q3_2023: 58, projected_2026_tghm: 72, primaryWorkload: 'Visual LCNC' },
  { area: 'Desktop Apps', q1_2022: 46, q3_2023: 58, projected_2026_tghm: 67, primaryWorkload: 'Visual LCNC' },
  { area: 'Web Apps / Software as a Service', q1_2022: 41, q3_2023: 48, projected_2026_tghm: 68, primaryWorkload: 'Visual LCNC' },
  { area: 'Backend Services', q1_2022: 37, q3_2023: 44, projected_2026_tghm: 64, primaryWorkload: 'Hybrid Offload' },
];

export const GAP_TRACEABILITY_MATRIX: GapTraceabilityItem[] = [
  {
    id: 'gap-security',
    sourceSection: 'Section 3 (p. 757)',
    citationRef: 'John (2025) [4]',
    baselineProblem: 'Weak Access Controls & Citizen-Developer Misconfigurations',
    empiricalAnchor: '>40% of LCNC-built enterprise apps exposed sensitive data via weak authentication policies.',
    tghmPlane: 'Plane III',
    tghmModule: 'Zero-Trust RBAC Synthesizer & Static Policy Gate',
    newContribution: 'Automated least-privilege RBAC generation and pre-deploy static AST/IR policy enforcement before single-click cloud publishing.',
    validationMetric: 'Governance Readiness Score G_score >= 0.85; Policy Violation Leakage < 1.5%',
  },
  {
    id: 'gap-scalability',
    sourceSection: 'Section 1 & 3 (p. 755, 757)',
    citationRef: 'Mujeeb et al. [5]; Ahmed et al. [6]; Ul Abideen et al. [7]',
    baselineProblem: 'Performance Degradation in High-Throughput IoT & Code-Heavy AI/CV Models',
    empiricalAnchor: 'YOLOv2, PCA, SVM, INN, 3D-DCM, and PVAM cannot be built in pure LCNC; IoT streams degrade at enterprise scale.',
    tghmPlane: 'Plane II',
    tghmModule: 'AMPO-ZT Dynamic Hybrid Offload Router Omega(w)',
    newContribution: 'Pareto-optimal DAG partitioning algorithm routing heavy tensor/stream nodes to containerized pro-code microservices while keeping orchestration visual.',
    validationMetric: 'SLA Compliance >= 99.2% under lambda >= 1,000 req/s; <18ms orchestration overhead',
  },
  {
    id: 'gap-lockin',
    sourceSection: 'Section 3 & 5.5 (p. 757, 760)',
    citationRef: 'Sahay et al. (2020) [8]; Alfonso et al. (2025) [9]',
    baselineProblem: 'Vendor Lock-In, Proprietary DSLs & Long-Term Technical Debt',
    empiricalAnchor: 'Proprietary architectures block cross-platform migration; SoftwareX (2022) noted severe technical debt upon IT integration.',
    tghmPlane: 'Plane II',
    tghmModule: 'Canonical Open-IR Semantic Bridge (IFML / BPMN / OpenAPI)',
    newContribution: 'Compiles visual drag-and-drop workflows into a vendor-neutral Open Intermediate Representation (Open-IR) decoupled from runtime hosts.',
    validationMetric: 'Portability Index Pi_IR >= 92%; 36-Month Technical Debt Ratio reduced by 54%',
  },
  {
    id: 'gap-genai',
    sourceSection: 'Section 7 (p. 761)',
    citationRef: 'Ramdurai & Adhithya (2023) [10]',
    baselineProblem: 'Unbounded GenAI Synthesis, Data Privacy & Automation Over-Reliance',
    empiricalAnchor: 'Generative AI accelerates LCNC authoring but introduces hallucinated logic, privacy leaks, and unverified autonomous actions.',
    tghmPlane: 'Plane I',
    tghmModule: 'Bounded Domain-GenAI Compiler & Confidence-Gated HITL',
    newContribution: 'Schema-constrained generative synthesis with mandatory human-in-the-loop confidence gates (tau) and automated PII boundary redaction.',
    validationMetric: 'Hallucinated Flow Defect Rate < 2.0%; 100% Auditability on Confidence < tau',
  },
];

export const DATASET_EXPANSION_SUITE: DatasetExpansionItem[] = [
  {
    id: 'ds-iot',
    name: 'AI4I 2020 & NASA C-MAPSS Telemetry Suite',
    domain: 'Industrial IoT Predictive Maintenance',
    complementsBaseline: 'Replaces single-case anecdotal evidence (Siemens Mendix 30% downtime reduction [2]) with reproducible multi-sensor failure streams.',
    scaleAndFormat: '10,000+ multivariate industrial cycles + turbofan run-to-failure time-series (CSV / Parquet stream)',
    targetTghmPlane: 'Plane II',
    enhancementRole: 'Stress-tests AMPO-ZT dynamic workload partitioning Omega(w) under bursty lambda up to 2,500 req/s, measuring p99 latency vs. pure LCNC workflows.',
    reEvaluationMetrics: ['p99 Tail Latency (ms)', 'SLA Violation Rate (%)', 'F1 Fault Recall'],
  },
  {
    id: 'ds-vision',
    name: 'ETH / UCY Trajectory & COCO-2017 Vision Benchmark',
    domain: 'Deep Computer Vision & Pedestrian Modeling',
    complementsBaseline: 'Directly benchmarks the code-heavy CV models cited in Section 1: YOLOv2 [5], Face Recognition PCA/SVM [6], and 3D-DCM / PVAM [7].',
    scaleAndFormat: '1,536+ annotated pedestrian trajectories (5 crowd scenes) + 118K labeled visual frames (ONNX/gRPC payloads)',
    targetTghmPlane: 'Plane II',
    enhancementRole: 'Proves that invoking heavy spatial models via Plane II Typed gRPC/ONNX adapters inside a visual LCNC canvas preserves exact ADE/FDE accuracy without runtime bottlenecks.',
    reEvaluationMetrics: ['ADE / FDE Trajectory Error', 'Inference Throughput (FPS)', 'Adapter Overhead (ms)'],
  },
  {
    id: 'ds-mde-sec',
    name: 'ModelSet MDE Corpus & OWASP LCNC Security Suite',
    domain: 'Model Interoperability & Zero-Trust Governance',
    complementsBaseline: 'Validates Section 3 findings: >40% data exposure via weak auth [4] and cross-platform lock-in across WebRatio/IFML/BPMN [8][9][11].',
    scaleAndFormat: '5,460+ Ecore/UML/BPMN structural models + 120 synthetic OWASP LCNC misconfiguration fixtures',
    targetTghmPlane: 'Plane III',
    enhancementRole: 'Quantifies Open-IR round-trip portability Pi_IR across engines and measures Static AST Policy Gate precision/recall on leaked PII & missing RBAC.',
    reEvaluationMetrics: ['Open-IR Portability Pi_IR (%)', 'Vulnerability Catch Rate (%)', 'False-Positive Gate Rate'],
  },
  {
    id: 'ds-genai',
    name: 'BFCL Tool-Use & Schema-Constrained Flow Corpus',
    domain: 'Agentic GenAI Workflow Synthesis',
    complementsBaseline: 'Operationalizes Section 7 future work [10]: domain-customized generative architectures and automated assessment measures.',
    scaleAndFormat: '2,000+ multi-turn API/workflow synthesis prompts with strict JSON-Schema & BPMN ground-truth DAGs',
    targetTghmPlane: 'Plane I',
    enhancementRole: 'Benchmarks AST-constrained GenAI synthesis against unconstrained LLM generation, calibrating HITL confidence threshold tau against hallucinated edge bindings.',
    reEvaluationMetrics: ['AST Structural Validity (%)', 'Hallucination Rate (%)', 'HITL Escalation Precision'],
  },
];

export const RE_EVALUATION_PROTOCOL: ReEvaluationStep[] = [
  {
    step: 1,
    title: 'Canonical Open-IR Normalization',
    methodology: 'Ingest ModelSet BPMN/IFML graphs and BFCL workflow prompts into a unified typed Directed Acyclic Graph G = (V, E) annotated with PII sensitivity tiers and tensor payload sizes.',
    outputArtifact: 'Normalized Benchmark DAG Corpus (Open-IR v1 Schema)',
  },
  {
    step: 2,
    title: 'Static Zero-Trust Gate Calibration (Plane III)',
    methodology: 'Run the OWASP LCNC vulnerability fixtures through the Static AST Policy & RBAC Synthesizer to measure detection recall against the >40% baseline exposure rate.',
    outputArtifact: 'Confusion Matrix & Synthesized IAM Policy Coverage Report',
  },
  {
    step: 3,
    title: 'Bounded GenAI & HITL Threshold Sweep (Plane I)',
    methodology: 'Sweep confidence threshold tau in [0.55, 0.95] across the BFCL flow synthesis suite, logging syntactic AST errors and human-escalation volume.',
    outputArtifact: 'ROC-style Confidence Calibration Curve (tau vs. Defect Leakage)',
  },
  {
    step: 4,
    title: 'Discrete-Event & Containerized Offload Replay (Plane II)',
    methodology: 'Replay AI4I/C-MAPSS telemetry bursts and ETH-UCY/YOLOv2 ONNX inference streams under 3 baselines: (a) Monolithic LCNC, (b) Manual Pro-Code, and (c) TGHM AMPO-ZT.',
    outputArtifact: 'Pareto Frontier Plots (Latency SLA vs. SDLC Speedup & Cost)',
  },
  {
    step: 5,
    title: '36-Month Longitudinal Technical Debt Audit',
    methodology: 'Simulate iterative schema mutations (12 quarterly business requirement changes) to quantify migration effort and maintainability debt across proprietary DSLs vs. Open-IR.',
    outputArtifact: 'Comparative TCO & Technical Debt Trajectory Tables',
  },
];

export const REFERENCES_LIST: ReferenceItem[] = [
  { num: 1, authors: 'Ahmed, N., Shahbaz, M., Khalil, H. S. U. R., Javed, Z., Khalid, M. A., Khan, F. A. & Maroof, Z.', year: '2025', title: 'The synergy of low-code/no-code and AI/ML: Enhancing intelligent automation', venue: 'World J. Eng. Technol., vol. 13, no. 4, pp. 754–763', doiOrUrl: 'https://doi.org/10.4236/wjet.2025.134048' },
  { num: 2, authors: 'Emma, L.', year: '2025', title: 'AI-Driven Predictive Maintenance for Smart Manufacturing and Industry 4.0', venue: 'ResearchGate Technical Report', doiOrUrl: 'https://www.researchgate.net/publication/389498658' },
  { num: 3, authors: 'Shrivastava, A.', year: '2024', title: 'Learning Microsoft Power Apps: Building Business Applications with Low-Code Technology', venue: 'O’Reilly Media, Inc.' },
  { num: 4, authors: 'John, B.', year: '2025', title: 'Low-Code and No-Code Platforms: Accelerating Enterprise Software Development', venue: 'ResearchGate Technical Monograph', doiOrUrl: 'https://www.researchgate.net/publication/389634372' },
  { num: 5, authors: 'Mujeeb, A., Ahmed, N., Arshed, H. & Khan, F. A.', year: '2022', title: 'Electronic Toll Collector Framework', venue: 'Adv. Sci. Technol. Res. J., vol. 16, no. 1, pp. 294–302', doiOrUrl: 'https://doi.org/10.12913/22998624/144537' },
  { num: 6, authors: 'Ahmed, N., Khan, F. A., Ullah, Z., Ahmed, H., Shahzad, T. & Ali, N.', year: '2021', title: 'Face recognition comparative analysis using different machine learning approaches', venue: 'Adv. Sci. Technol. Res. J., vol. 15, no. 1, pp. 265–272', doiOrUrl: 'https://doi.org/10.12913/22998624/132611' },
  { num: 7, authors: 'Ul Abideen, Z., Ahmed, N., Khalil, H. S. U. R. & Shahbaz, M.', year: '2025', title: 'Advancing pedestrian trajectory prediction with interaction-aware 3D-dual contextualized modeling', venue: 'Egyptian Informatics J., vol. 31, art. 100742', doiOrUrl: 'https://doi.org/10.1016/j.eij.2025.100742' },
  { num: 8, authors: 'Sahay, A., Indamutsa, A., Di Ruscio, D. & Pierantonio, A.', year: '2020', title: 'Supporting the Understanding and Comparison of Low-Code Development Platforms', venue: '46th Euromicro Conf. Software Engineering and Advanced Applications (SEAA), pp. 171–178', doiOrUrl: 'https://doi.org/10.1109/seaa51224.2020.00036' },
  { num: 9, authors: 'Alfonso, I., Conrardy, A. & Cabot, J.', year: '2025', title: 'Towards the Interoperability of Low-Code Platforms', venue: 'Intelligent Information Systems, Springer, pp. 3–11', doiOrUrl: 'https://doi.org/10.1007/978-3-031-94590-8_1' },
  { num: 10, authors: 'Ramdurai, B. & Adhithya, P.', year: '2023', title: 'The Impact, Advancements and Applications of Generative AI', venue: 'Int. J. Comput. Sci. Eng., vol. 10, pp. 1–8', doiOrUrl: 'https://doi.org/10.14445/23488387/ijcse-v10i6p101' },
  { num: 11, authors: 'Acerbis, R., Bongio, A., Brambilla, M. & Butti, S.', year: '2016', title: 'Model-Driven Development of Cross-Platform Mobile Applications with Web Ratio and IFML', venue: '2nd ACM Int. Conf. Mobile Software Engineering and Systems, pp. 170–171' },
  { num: 12, authors: 'Sundberg, L. & Holmström, J.', year: '2023', title: 'Democratizing Artificial Intelligence: How No-Code AI Can Leverage Machine Learning Operations', venue: 'Business Horizons, vol. 66, pp. 777–788', doiOrUrl: 'https://doi.org/10.1016/j.bushor.2023.04.003' },
  { num: 13, authors: 'Matzka, S.', year: '2020', title: 'Explainable Artificial Intelligence for Predictive Maintenance Applications (AI4I 2020 Dataset)', venue: '3rd Int. Conf. Artificial Intelligence for Industries, pp. 69–74', isNew2026: true },
  { num: 14, authors: 'Pellegrini, S., Ess, A., Schindler, K. & Van Gool, L.', year: '2009', title: 'You’ll Never Walk Alone: Modeling Social Behavior for Multi-Target Tracking (ETH/UCY Benchmark)', venue: 'IEEE Int. Conf. Computer Vision (ICCV)', isNew2026: true },
  { num: 15, authors: 'López, J. A. H., Cánovas Izquierdo, J. L. & Cuadrado, J. S.', year: '2022', title: 'ModelSet: A Dataset for Machine Learning in Model-Driven Engineering', venue: 'Software and Systems Modeling, vol. 21, pp. 967–986', doiOrUrl: 'https://doi.org/10.1007/s10270-021-00929-3', isNew2026: true },
  { num: 16, authors: 'OWASP Foundation', year: '2024', title: 'OWASP Low-Code/No-Code Top 10 Security Risks and Mitigations', venue: 'Open Worldwide Application Security Project Technical Standard', isNew2026: true },
  { num: 17, authors: 'Sankal, U. C., Ahmed, N., Khan, F. A. & Hanni, R.', year: '2021', title: 'Target cell selection algorithms in graph isomorphism problem', venue: 'Int. J. Sci. Tech. Res. Eng. (IJSTRE), vol. 6, no. 4, pp. 35–47, Jul.–Aug. 2021', doiOrUrl: 'https://doi.org/10.5281/zenodo.22149607', isNew2026: true },
  { num: 18, authors: 'Khalil, H. S. U. R., Ahmed, N. & Yang, Y.', year: '2026', title: 'Mouse Pointing Endpoint Prediction to Distinguish Between Human and Bot Using Kinematic Template Matching', venue: 'HCI International 2025 – Late Breaking Papers, Lecture Notes in Computer Science, vol. 16337, Cham, Switzerland: Springer, pp. 343–364', doiOrUrl: 'https://doi.org/10.1007/978-3-032-12801-0_23', isNew2026: true },
  { num: 19, authors: 'Bounceur, A., Ibrahim, M., Saqib, M., et al.', year: '2026', title: 'Privacy-preserving multiclass intrusion detection in in-vehicle CAN networks using federated learning', venue: 'Sci. Rep.', doiOrUrl: 'https://doi.org/10.1038/s41598-026-64490-z', isNew2026: true },
  { num: 20, authors: 'Shahbaz, M., Imtiaz, R., Junejo, M. H., Emran, M., Ahmed, N. & Khalil, H. S. U. R.', year: '2026', title: 'Deployment of honeypot system for threat detection and intelligence in modern cybersecurity architectures', venue: 'Proc. 2026 1st Int. Conf. Innovations Inf. Commun. Technol. (IICT), pp. 1–5', doiOrUrl: 'https://doi.org/10.1109/IICT68374.2026.11468479', isNew2026: true },
  { num: 21, authors: 'Ahmed, N., Rana, H. Y., Qureshi, M. T. & Shakoor, B.', year: '2015', title: 'How to protecting kernal code and data', venue: 'Int. J. Comput. Organ. Trends (IJCOT), vol. 5, no. 4, pp. 20–23', doiOrUrl: 'https://doi.org/10.14445/22492593/IJCOT-V23P301', isNew2026: true },
  { num: 22, authors: 'Ahmed, N.', year: '2015', title: 'Understanding Real Time OS Concepts', venue: 'Understanding Real Time OS Concepts, vol. 6, no. 9, Zenodo', doiOrUrl: 'https://doi.org/10.5281/zenodo.22148015', isNew2026: true },
  { num: 23, authors: 'Ahmed, N., Ajmal, F., Usman, M., Javed, Z., Abid, M. H., Yousaf, M. & Noohani, M. Z.', year: '2021', title: 'A Software Capable of Simulating Peer-to-Peer Energy Trading', venue: 'Int. J. Appl. Phys. Sci., vol. 7, pp. 18–26', doiOrUrl: 'https://doi.org/10.20469/ijaps.7.50003', isNew2026: true },
];
