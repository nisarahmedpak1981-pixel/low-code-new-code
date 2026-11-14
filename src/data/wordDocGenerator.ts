import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';
import {
  AFFILIATIONS,
  AUTHORS,
  BASELINE_PAPER_META,
  DATASET_EXPANSION_SUITE,
  FIGURE_1_ADOPTION_DATA,
  GAP_TRACEABILITY_MATRIX,
  RE_EVALUATION_PROTOCOL,
  REFERENCES_LIST,
} from './paperBaseline';
import {
  AMPO_ZT_ALGORITHM_STEPS,
  buildUpdatedPaperSections,
  ManuscriptConfig,
} from './manuscriptGenerator';
import {
  computeSensitivityAnalysis,
  evaluateAllFourBaselines,
  getPlaneEvaluationSummaries,
  getThreeWayParadigmComparison,
  TghmSimulationInput,
  TghmSimulationOutput,
  WORKLOAD_COMPLEXITY_MAP,
} from '../model/tghmEngine';
import {
  renderFigure1AdoptionPng,
  renderFigure2DebtTrajectoryPng,
  renderFigure3SensitivityPng,
  renderFigure4BaselineComparisonPng,
  renderFigure5ParadigmComparisonPng,
} from './chartRenderer';

const BORDER_STYLE = {
  top: { style: BorderStyle.SINGLE, size: 4, color: 'D6D3D1' },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: 'D6D3D1' },
  left: { style: BorderStyle.SINGLE, size: 4, color: 'D6D3D1' },
  right: { style: BorderStyle.SINGLE, size: 4, color: 'D6D3D1' },
};

function makeCell(text: string, bold = false, shaded = false): TableCell {
  return new TableCell({
    borders: BORDER_STYLE,
    shading: shaded ? { fill: 'F5F3EE' } : undefined,
    margins: { top: 70, bottom: 70, left: 100, right: 100 },
    children: [
      new Paragraph({
        spacing: { after: 0 },
        children: [
          new TextRun({
            text,
            bold,
            size: 18,
            font: 'Calibri',
            color: '1C1917',
          }),
        ],
      }),
    ],
  });
}

export async function generateWordDocBlob(
  config: ManuscriptConfig,
  simInput: TghmSimulationInput,
  simOutput: TghmSimulationOutput
): Promise<Blob> {
  const sections = buildUpdatedPaperSections(config, simInput, simOutput);
  const sensitivity = computeSensitivityAnalysis(simInput, 15, 'infraLatency');
  const fourBaselines = evaluateAllFourBaselines(15);
  const planeSummaries = getPlaneEvaluationSummaries(simOutput);
  const paradigmRows = getThreeWayParadigmComparison(simOutput);

  const [fig1Png, fig2Png, fig3Png, fig4Png, fig5Png] = await Promise.all([
    renderFigure1AdoptionPng(),
    renderFigure2DebtTrajectoryPng(simOutput.debtTrajectory),
    renderFigure3SensitivityPng(simInput),
    renderFigure4BaselineComparisonPng(),
    renderFigure5ParadigmComparisonPng(simOutput),
  ]);

  const authorRuns: TextRun[] = [];
  AUTHORS.forEach((author, idx) => {
    authorRuns.push(
      new TextRun({
        text: author.name,
        bold: true,
        size: 22,
        font: 'Calibri',
        color: '1C1917',
      }),
      new TextRun({
        text: `${author.affiliationIndex}`,
        superScript: true,
        bold: true,
        size: 18,
        font: 'Calibri',
        color: '1C1917',
      })
    );
    if (idx < AUTHORS.length - 1) {
      authorRuns.push(
        new TextRun({
          text: ', ',
          bold: true,
          size: 22,
          font: 'Calibri',
          color: '1C1917',
        })
      );
    }
  });

  const children: (Paragraph | Table)[] = [
    // Journal Masthead
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: `${config.targetVenue}   |   Extends DOI: ${BASELINE_PAPER_META.doi}`,
          italics: true,
          size: 19,
          font: 'Calibri',
          color: '57534E',
        }),
      ],
    }),

    // Title
    new Paragraph({
      heading: HeadingLevel.TITLE,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: config.paperTitle,
          bold: true,
          size: 32,
          font: 'Georgia',
          color: '1C1917',
        }),
      ],
    }),

    // Authors
    new Paragraph({
      spacing: { after: 120 },
      children: authorRuns,
    }),

    // Affiliations
    ...AFFILIATIONS.map(
      (af) =>
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: `${af.index}`,
              superScript: true,
              size: 18,
              font: 'Calibri',
              color: '57534E',
            }),
            new TextRun({
              text: `${af.department}, ${af.institution}, ${af.location}`,
              size: 19,
              font: 'Calibri',
              color: '57534E',
            }),
          ],
        })
    ),

    new Paragraph({
      spacing: { before: 60, after: 220 },
      children: [
        new TextRun({
          text: `Corresponding Author Email: ${config.correspondingEmail}`,
          size: 19,
          font: 'Calibri',
          italics: true,
          color: '57534E',
        }),
      ],
    }),

    // Abstract
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 120, after: 100 },
      children: [
        new TextRun({
          text: 'Abstract',
          bold: true,
          size: 24,
          font: 'Georgia',
          color: '9A3412',
        }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 140, line: 276 },
      children: [
        new TextRun({
          text:
            `Low-Code/No-Code (LCNC) platforms combined with Artificial Intelligence and Machine Learning (AI/ML) have accelerated enterprise software delivery, yet prior systematic evidence (Ahmed et al., 2025 [1], DOI: ${BASELINE_PAPER_META.doi}) documented four unresolved structural barriers: over 40% of citizen-built enterprise apps expose sensitive data through weak access controls, monolithic runtimes degrade under high-throughput IoT and deep computer-vision workloads (YOLOv2, 3D-DCM, PVAM), proprietary domain-specific languages create vendor lock-in, and generative AI introduces unverified logic flows. ` +
            `This updated study proposes the Tri-Strata Governed Hybrid Model (TGHM) and the AMPO-ZT topological DAG partitioning algorithm, uniting schema-constrained GenAI with confidence-gated Human-in-the-Loop (HITL) verification (Plane I), a canonical Open-IR semantic bridge with formal workload offload routing Omega(w) (Plane II), and automated zero-trust RBAC policy synthesis with closed-loop MLOps observability G_score (Plane III). ` +
            `Re-evaluated across four complementary multi-domain datasets (AI4I 2020/NASA C-MAPSS, ETH/UCY+COCO-2017, ModelSet+OWASP LCNC Top-10, and BFCL) alongside one-at-a-time throughput sensitivity sweeps, TGHM achieves ${simOutput.portabilityIndexPct}% Open-IR portability, a governance readiness score of ${simOutput.governanceScore.toFixed(2)}, ${simOutput.effectiveThroughputRps} req/s effective SLA-compliant throughput (vs. ${simOutput.legacyThroughputRps} req/s on monolithic LCNC), and a ${simOutput.debtReductionPct}% reduction in 36-month technical debt while preserving ${simOutput.sdlcAccelerationPct}% SDLC acceleration, while charting future integration across graph-isomorphism Open-IR matching, kinematic HITL biometrics, federated CAN intrusion detection, honeypot cyber-deception, RTOS/kernel isolation, and peer-to-peer energy trading.`,
          size: 21,
          font: 'Calibri',
          color: '1C1917',
        }),
      ],
    }),

    new Paragraph({
      spacing: { after: 240 },
      children: [
        new TextRun({
          text: 'Keywords: ',
          bold: true,
          size: 20,
          font: 'Calibri',
          color: '9A3412',
        }),
        new TextRun({
          text: 'Low-Code/No-Code, Hybrid AI/ML Architecture, AMPO-ZT Algorithm, Open Intermediate Representation, Zero-Trust Governance, Throughput Sensitivity Analysis, Benchmark Re-Evaluation.',
          size: 20,
          font: 'Calibri',
          color: '44403C',
        }),
      ],
    }),
  ];

  // Numbered Sections
  sections.forEach((sec) => {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 220, after: 100 },
        children: [
          new TextRun({
            text: `${sec.number}. ${sec.title}`,
            bold: true,
            size: 24,
            font: 'Georgia',
            color: '9A3412',
          }),
        ],
      })
    );

    sec.paragraphs.forEach((para) => {
      children.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 130, line: 276 },
          children: [
            new TextRun({
              text: para,
              size: 21,
              font: 'Calibri',
              color: '1C1917',
            }),
          ],
        })
      );
    });

    if (sec.calloutEquation) {
      children.push(
        new Paragraph({
          spacing: { before: 80, after: 60 },
          children: [
            new TextRun({
              text: sec.calloutEquation.label,
              bold: true,
              size: 20,
              font: 'Calibri',
              color: '1E3A8A',
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: sec.calloutEquation.formula,
              bold: true,
              size: 21,
              font: 'Consolas',
              color: '1C1917',
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 160 },
          children: [
            new TextRun({
              text: sec.calloutEquation.explanation,
              italics: true,
              size: 19,
              font: 'Calibri',
              color: '57534E',
            }),
          ],
        })
      );
    }
  });

  // Algorithm 1 Box
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 },
      children: [
        new TextRun({
          text: 'Algorithm 1: AMPO-ZT Topological Offload & Zero-Trust Verification',
          bold: true,
          size: 22,
          font: 'Georgia',
          color: '1C1917',
        }),
      ],
    })
  );

  AMPO_ZT_ALGORITHM_STEPS.forEach((step) => {
    children.push(
      new Paragraph({
        spacing: { after: 70 },
        children: [
          new TextRun({
            text: step,
            size: 19,
            font: 'Consolas',
            color: '1C1917',
          }),
        ],
      })
    );
  });

  // Figure 1 Embedded Graph + Table 1B Adoption Data
  children.push(
    new Paragraph({
      spacing: { before: 240, after: 80 },
      alignment: AlignmentType.CENTER,
      children: [
        new ImageRun({
          type: 'png',
          data: fig1Png,
          transformation: { width: 600, height: 350 },
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
      children: [
        new TextRun({
          text: 'Figure 1. Usage of LCNC tools by software development area (Q1 2022 vs. Q3 2023 baseline from Ahmed et al., 2025, extended with 2026 TGHM Hybrid-Agentic projection).',
          italics: true,
          size: 18,
          font: 'Calibri',
          color: '57534E',
        }),
      ],
    })
  );

  // Table 1: Gap Traceability Matrix
  if (config.includeSimulationTable) {
    children.push(
      new Paragraph({
        spacing: { before: 200, after: 80 },
        children: [
          new TextRun({
            text: 'Table 1. Traceability from Ahmed et al. (2025) Research Gaps to TGHM Mechanisms.',
            bold: true,
            italics: true,
            size: 20,
            font: 'Calibri',
            color: '44403C',
          }),
        ],
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              makeCell('2025 Section & Citation', true, true),
              makeCell('Baseline Limitation & Empirical Anchor', true, true),
              makeCell('TGHM Plane & Module', true, true),
              makeCell('Validation Target', true, true),
            ],
          }),
          ...GAP_TRACEABILITY_MATRIX.map(
            (g) =>
              new TableRow({
                children: [
                  makeCell(`${g.sourceSection} (${g.citationRef})`),
                  makeCell(`${g.baselineProblem}: ${g.empiricalAnchor}`),
                  makeCell(`${g.tghmPlane} — ${g.tghmModule}: ${g.newContribution}`),
                  makeCell(g.validationMetric),
                ],
              })
          ),
        ],
      })
    );
  }

  // Table 2: Complete Multi-Domain Dataset Details & 5-Step Protocol
  if (config.includeDatasetExpansion) {
    children.push(
      new Paragraph({
        spacing: { before: 240, after: 80 },
        children: [
          new TextRun({
            text: 'Table 2. Detailed Multi-Domain Benchmark Dataset Specifications for TGHM Re-Evaluation.',
            bold: true,
            italics: true,
            size: 20,
            font: 'Calibri',
            color: '44403C',
          }),
        ],
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              makeCell('Dataset Suite & Domain', true, true),
              makeCell('Scale & Format', true, true),
              makeCell('2025 Baseline Gap Addressed', true, true),
              makeCell('TGHM Generalizability Role & Metrics', true, true),
            ],
          }),
          ...DATASET_EXPANSION_SUITE.map(
            (d) =>
              new TableRow({
                children: [
                  makeCell(`${d.name} (${d.domain} · ${d.targetTghmPlane})`),
                  makeCell(d.scaleAndFormat),
                  makeCell(d.complementsBaseline),
                  makeCell(`${d.enhancementRole} Metrics: ${d.reEvaluationMetrics.join(', ')}.`),
                ],
              })
          ),
        ],
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 80 },
        children: [
          new TextRun({
            text: 'Five-Stage Dataset Integration & Re-Evaluation Protocol',
            bold: true,
            size: 22,
            font: 'Georgia',
            color: '1C1917',
          }),
        ],
      }),
      ...RE_EVALUATION_PROTOCOL.map(
        (step) =>
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: `Step ${step.step} — ${step.title}: `,
                bold: true,
                size: 20,
                font: 'Calibri',
                color: '1C1917',
              }),
              new TextRun({
                text: `${step.methodology} (Artifact: ${step.outputArtifact})`,
                size: 20,
                font: 'Calibri',
                color: '44403C',
              }),
            ],
          })
      )
    );
  }

  // Table 3A: All Four Baseline Case-Study Specifications
  children.push(
    new Paragraph({
      spacing: { before: 240, after: 80 },
      children: [
        new TextRun({
          text: 'Table 3A. Baseline Case-Study Parameter Specifications from Ahmed et al. (2025) [1].',
          bold: true,
          italics: true,
          size: 20,
          font: 'Calibri',
          color: '44403C',
        }),
      ],
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            makeCell('Baseline & Source Citation', true, true),
            makeCell('Workload Class & C(w)', true, true),
            makeCell('Load λ / SLA L_max', true, true),
            makeCell('L_infra / δ / τ', true, true),
            makeCell('PII Tier & Policy Gate', true, true),
          ],
        }),
        ...fourBaselines.map(
          (b) =>
            new TableRow({
              children: [
                makeCell(`${b.code}: ${b.preset.label} (${b.preset.sourceCitation})`),
                makeCell(
                  `${WORKLOAD_COMPLEXITY_MAP[b.preset.input.workloadType].label} (C=${WORKLOAD_COMPLEXITY_MAP[b.preset.input.workloadType].normalizedC.toFixed(2)})`
                ),
                makeCell(`${b.preset.input.throughputRps} req/s / ${b.preset.input.latencySlaMs} ms`),
                makeCell(
                  `${b.preset.input.infraLatencyMs ?? 14} ms / ${b.preset.input.customizabilityNeed.toFixed(2)} / ${b.preset.input.hitlConfidenceTau.toFixed(2)}`
                ),
                makeCell(
                  `${b.preset.input.piiTier.toUpperCase()} (${b.preset.input.staticPolicyGateEnabled ? 'Open-IR + Gate ON' : 'Proprietary DSL, Gate OFF'})`
                ),
              ],
            })
        ),
      ],
    }),

    // Table 3B: Comparative Workload Simulation Results Across All 4 Baselines + B4-TGHM
    new Paragraph({
      spacing: { before: 240, after: 80 },
      children: [
        new TextRun({
          text: 'Table 3B. Comparative Workload Simulation Results Across All Four Baselines (Including TGHM Remediation for B4).',
          bold: true,
          italics: true,
          size: 20,
          font: 'Calibri',
          color: '44403C',
        }),
      ],
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            makeCell('Baseline Scenario (Load λ / SLA)', true, true),
            makeCell('Ω(w) & AMPO-ZT Route', true, true),
            makeCell('Est. Latency', true, true),
            makeCell('TGHM vs. Legacy Goodput', true, true),
            makeCell('G_score & Π_IR', true, true),
            makeCell('36-Mo Debt Drop', true, true),
          ],
        }),
        ...fourBaselines.flatMap((b) => {
          const rows = [
            new TableRow({
              children: [
                makeCell(
                  `${b.code}: ${b.preset.label} (${b.preset.input.throughputRps} req/s, ${b.preset.input.latencySlaMs} ms)`
                ),
                makeCell(`${b.output.omegaScore.toFixed(3)} · ${b.output.routingDecision}`),
                makeCell(
                  `${b.output.estimatedLatencyMs} ms (${b.output.slaSatisfied ? 'SLA Met' : 'SLA Breach'})`
                ),
                makeCell(`${b.output.effectiveThroughputRps} vs. ${b.output.legacyThroughputRps} req/s`),
                makeCell(
                  `${b.output.governanceScore.toFixed(2)} (${b.output.governanceState}) · ${b.output.portabilityIndexPct}%`
                ),
                makeCell(`-${b.output.debtReductionPct}% (${b.output.sdlcAccelerationPct}% SDLC)`),
              ],
            }),
          ];
          if (b.tghmGovernedOutput) {
            const gov = b.tghmGovernedOutput;
            rows.push(
              new TableRow({
                children: [
                  makeCell(`${b.code}-TGHM: Governed Citizen GenAI (τ=0.88, Open-IR, Gate ON)`, false, true),
                  makeCell(`${gov.omegaScore.toFixed(3)} · ${gov.routingDecision}`, false, true),
                  makeCell(
                    `${gov.estimatedLatencyMs} ms (${gov.slaSatisfied ? 'SLA Met' : 'SLA Breach'})`,
                    false,
                    true
                  ),
                  makeCell(
                    `${gov.effectiveThroughputRps} vs. ${gov.legacyThroughputRps} req/s (+${b.throughputGainPct}%)`,
                    false,
                    true
                  ),
                  makeCell(
                    `${gov.governanceScore.toFixed(2)} (${gov.governanceState}) · ${gov.portabilityIndexPct}%`,
                    false,
                    true
                  ),
                  makeCell(`-${gov.debtReductionPct}% (${gov.sdlcAccelerationPct}% SDLC)`, false, true),
                ],
              })
            );
          }
          return rows;
        }),
      ],
    }),

    // Figure 4: All Four Baselines Grouped Bar Chart PNG
    new Paragraph({
      spacing: { before: 240, after: 80 },
      alignment: AlignmentType.CENTER,
      children: [
        new ImageRun({
          type: 'png',
          data: fig4Png,
          transformation: { width: 580, height: 268 },
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
      children: [
        new TextRun({
          text: 'Figure 4. Multi-baseline SLA-compliant throughput comparison across all four Ahmed et al. (2025) [1] reference workloads (B1–B4, *B4 evaluated under TGHM Plane I–III remediation): Monolithic Legacy LCNC vs. TGHM AMPO-ZT.',
          italics: true,
          size: 18,
          font: 'Calibri',
          color: '57534E',
        }),
      ],
    })
  );

  // Figure 2: 36-Month Technical Debt Trajectory PNG
  children.push(
    new Paragraph({
      spacing: { before: 240, after: 80 },
      alignment: AlignmentType.CENTER,
      children: [
        new ImageRun({
          type: 'png',
          data: fig2Png,
          transformation: { width: 580, height: 255 },
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
      children: [
        new TextRun({
          text: `Figure 2. 36-month technical debt accumulation comparing monolithic proprietary LCNC vs. TGHM Open-IR Hybrid (-${simOutput.debtReductionPct}% debt reduction at Month 36).`,
          italics: true,
          size: 18,
          font: 'Calibri',
          color: '57534E',
        }),
      ],
    })
  );

  // Table 4A & 4B: Throughput Sensitivity Analysis (±15%) + Figure 3 PNG
  children.push(
    new Paragraph({
      spacing: { before: 200, after: 80 },
      children: [
        new TextRun({
          text: `Table 4A. One-at-a-Time Throughput Sensitivity & Elasticity Analysis (±${sensitivity.perturbationPct}% Perturbation, Base Effective Throughput = ${simOutput.effectiveThroughputRps} req/s).`,
          bold: true,
          italics: true,
          size: 20,
          font: 'Calibri',
          color: '44403C',
        }),
      ],
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            makeCell('Input Factor (Baseline)', true, true),
            makeCell(`-${sensitivity.perturbationPct}% (req/s)`, true, true),
            makeCell(`+${sensitivity.perturbationPct}% (req/s)`, true, true),
            makeCell('Swing & Elasticity', true, true),
          ],
        }),
        ...sensitivity.factors.map(
          (f) =>
            new TableRow({
              children: [
                makeCell(
                  `${f.label} (${f.baselineDisplay})${f.regimeShiftTriggered ? ' [Regime Shift]' : ''}`
                ),
                makeCell(`${f.lowEffectiveRps}`),
                makeCell(`${f.highEffectiveRps}`),
                makeCell(`${f.swingRps} req/s (${f.elasticityRatio.toFixed(2)}x)`),
              ],
            })
        ),
      ],
    }),
    new Paragraph({
      spacing: { before: 200, after: 80 },
      children: [
        new TextRun({
          text: 'Table 4B. Cross-Baseline Dominant Throughput Sensitivity Driver (±15% Perturbation Across Baselines B1–B4).',
          bold: true,
          italics: true,
          size: 20,
          font: 'Calibri',
          color: '44403C',
        }),
      ],
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            makeCell('Baseline Case Study', true, true),
            makeCell('Dominant Sensitivity Driver', true, true),
            makeCell('-15% to +15% Goodput', true, true),
            makeCell('Swing & Elasticity', true, true),
          ],
        }),
        ...fourBaselines.map(
          (b) =>
            new TableRow({
              children: [
                makeCell(`${b.code}: ${b.preset.label}`),
                makeCell(b.sensitivityTopFactor.label),
                makeCell(
                  `${b.sensitivityTopFactor.lowEffectiveRps}–${b.sensitivityTopFactor.highEffectiveRps} req/s`
                ),
                makeCell(
                  `${b.sensitivityTopFactor.swingRps} req/s (${b.sensitivityTopFactor.elasticityRatio.toFixed(2)}x)`
                ),
              ],
            })
        ),
      ],
    }),
    new Paragraph({
      spacing: { before: 220, after: 80 },
      alignment: AlignmentType.CENTER,
      children: [
        new ImageRun({
          type: 'png',
          data: fig3Png,
          transformation: { width: 580, height: 255 },
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 180 },
      children: [
        new TextRun({
          text: 'Figure 3. Effective system throughput sensitivity sweep across incoming request volume (100–2,500 req/s), illustrating AMPO-ZT offload regime transitions vs. monolithic LCNC saturation.',
          italics: true,
          size: 18,
          font: 'Calibri',
          color: '57534E',
        }),
      ],
    }),

    // Table 5: Tri-Strata Plane Synthesis (Plane I, Plane II & Plane III)
    new Paragraph({
      spacing: { before: 220, after: 80 },
      children: [
        new TextRun({
          text: 'Table 5. Tri-Strata Architectural Synthesis Across Plane I, Plane II, and Plane III (Modules, Dataset Anchors, and Verified Outcomes).',
          bold: true,
          italics: true,
          size: 20,
          font: 'Calibri',
          color: '44403C',
        }),
      ],
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            makeCell('TGHM Plane', true, true),
            makeCell('Core Modules', true, true),
            makeCell('Benchmark Dataset Anchor', true, true),
            makeCell('Mechanism & Verified Outcome', true, true),
          ],
        }),
        ...planeSummaries.map(
          (p) =>
            new TableRow({
              children: [
                makeCell(`${p.plane}: ${p.planeName}`),
                makeCell(p.modules),
                makeCell(p.datasetAnchor),
                makeCell(`${p.keyMechanism} [${p.verifiedMetric}]`),
              ],
            })
        ),
      ],
    }),

    // Table 6: Three-Way Paradigm Comparison + Figure 5 PNG
    new Paragraph({
      spacing: { before: 220, after: 80 },
      children: [
        new TextRun({
          text: 'Table 6. Three-Way Engineering Paradigm Comparison: Monolithic Legacy LCNC vs. Manual Pro-Code vs. TGHM Tri-Strata.',
          bold: true,
          italics: true,
          size: 20,
          font: 'Calibri',
          color: '44403C',
        }),
      ],
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            makeCell('Evaluation Dimension', true, true),
            makeCell('Monolithic Legacy LCNC', true, true),
            makeCell('Manual Pro-Code', true, true),
            makeCell('TGHM Tri-Strata (Ours)', true, true),
          ],
        }),
        ...paradigmRows.map(
          (r) =>
            new TableRow({
              children: [
                makeCell(r.dimension, true),
                makeCell(r.monolithicDisplay),
                makeCell(r.manualProCodeDisplay),
                makeCell(r.tghmDisplay, false, true),
              ],
            })
        ),
      ],
    }),
    new Paragraph({
      spacing: { before: 220, after: 80 },
      alignment: AlignmentType.CENTER,
      children: [
        new ImageRun({
          type: 'png',
          data: fig5Png,
          transformation: { width: 580, height: 262 },
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 180 },
      children: [
        new TextRun({
          text: 'Figure 5. Normalized (0–100) three-way paradigm comparison contrasting Monolithic Legacy LCNC, Manual Pro-Code Engineering, and TGHM Tri-Strata (Planes I–III).',
          italics: true,
          size: 18,
          font: 'Calibri',
          color: '57534E',
        }),
      ],
    }),

    // Table 7: Figure 1 Adoption Percentages Reference Table
    new Paragraph({
      spacing: { before: 180, after: 80 },
      children: [
        new TextRun({
          text: 'Table 7. LCNC Adoption Percentages Across 13 Software Development Areas (Ahmed et al., 2025 Baseline & 2026 TGHM Projection).',
          bold: true,
          italics: true,
          size: 20,
          font: 'Calibri',
          color: '44403C',
        }),
      ],
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            makeCell('Software Development Area', true, true),
            makeCell('Q1 2022 (%)', true, true),
            makeCell('Q3 2023 (%)', true, true),
            makeCell('2026 TGHM (%)', true, true),
            makeCell('Primary Workload', true, true),
          ],
        }),
        ...FIGURE_1_ADOPTION_DATA.map(
          (r) =>
            new TableRow({
              children: [
                makeCell(r.area),
                makeCell(`${r.q1_2022}%`),
                makeCell(`${r.q3_2023}%`),
                makeCell(`${r.projected_2026_tghm}%`),
                makeCell(r.primaryWorkload),
              ],
            })
        ),
      ],
    })
  );

  // Conflicts of Interest & References
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 240, after: 80 },
      children: [
        new TextRun({
          text: 'Conflicts of Interest',
          bold: true,
          size: 24,
          font: 'Georgia',
          color: '9A3412',
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 180 },
      children: [
        new TextRun({
          text: 'The authors declare no conflicts of interest regarding the publication of this updated manuscript.',
          size: 21,
          font: 'Calibri',
          color: '1C1917',
        }),
      ],
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 },
      children: [
        new TextRun({
          text: 'References',
          bold: true,
          size: 24,
          font: 'Georgia',
          color: '9A3412',
        }),
      ],
    }),
    ...REFERENCES_LIST.map(
      (r) =>
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: `[${r.num}] `,
              bold: true,
              size: 19,
              font: 'Calibri',
              color: '1C1917',
            }),
            new TextRun({
              text: `${r.authors} (${r.year}) ${r.title}. `,
              size: 19,
              font: 'Calibri',
              color: '1C1917',
            }),
            new TextRun({
              text: `${r.venue}.`,
              italics: true,
              size: 19,
              font: 'Calibri',
              color: '1C1917',
            }),
            ...(r.doiOrUrl
              ? [
                  new TextRun({
                    text: ` ${r.doiOrUrl}`,
                    size: 18,
                    font: 'Calibri',
                    color: '1E3A8A',
                  }),
                ]
              : []),
          ],
        })
    )
  );

  const doc = new Document({
    creator: AUTHORS[0].name,
    title: config.paperTitle,
    description: `Final Updated 2026 Research Paper extending ${BASELINE_PAPER_META.doi}`,
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  return Packer.toBlob(doc);
}
