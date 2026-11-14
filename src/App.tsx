import { useMemo, useState } from 'react';
import { ActiveSection, Header } from './components/Header';
import { HeroOverview } from './components/HeroOverview';
import { ModelBlueprint } from './components/ModelBlueprint';
import { WorkloadSimulator } from './components/WorkloadSimulator';
import { BaselineEvolution } from './components/BaselineEvolution';
import { ManuscriptStudio } from './components/ManuscriptStudio';
import { evaluateTghmModel, SCENARIO_PRESETS, TghmSimulationInput } from './model/tghmEngine';
import {
  DEFAULT_MANUSCRIPT_CONFIG,
  generateLatexSource,
  ManuscriptConfig,
} from './data/manuscriptGenerator';
import { BASELINE_PAPER_META } from './data/paperBaseline';

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('blueprint');
  const [simInput, setSimInput] = useState<TghmSimulationInput>(SCENARIO_PRESETS[0].input);
  const [manuscriptConfig, setManuscriptConfig] = useState<ManuscriptConfig>(
    DEFAULT_MANUSCRIPT_CONFIG
  );

  const simOutput = useMemo(() => evaluateTghmModel(simInput), [simInput]);

  const handleNavigate = (section: ActiveSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickExportLatex = () => {
    const tex = generateLatexSource(manuscriptConfig, simInput, simOutput);
    const blob = new Blob([tex], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tghm_updated_paper.tex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setActiveSection('manuscript');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#1C1917]">
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onExportLatex={handleQuickExportLatex}
      />

      <main className="flex-1">
        {activeSection === 'blueprint' && (
          <>
            <HeroOverview onNavigate={handleNavigate} />
            <ModelBlueprint />
          </>
        )}

        {activeSection === 'simulator' && (
          <WorkloadSimulator
            input={simInput}
            output={simOutput}
            onChangeInput={setSimInput}
          />
        )}

        {activeSection === 'datasets' && <BaselineEvolution />}

        {activeSection === 'manuscript' && (
          <ManuscriptStudio
            config={manuscriptConfig}
            onChangeConfig={setManuscriptConfig}
            simInput={simInput}
            simOutput={simOutput}
          />
        )}
      </main>

      <footer className="no-print border-t border-[#DED9CE] bg-[#F8F6F1]">
        <div className="mx-auto flex max-w-[1360px] flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-6 text-xs text-[#57534E]">
          <div>
            TGHM Research Studio · Extending Ahmed et al. (2025),{' '}
            <span className="font-mono">DOI {BASELINE_PAPER_META.doi}</span>
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => handleNavigate('blueprint')}
              className="hover:text-[#1C1917] underline-offset-4 hover:underline"
            >
              Architecture
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('datasets')}
              className="hover:text-[#1C1917] underline-offset-4 hover:underline"
            >
              Datasets
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('manuscript')}
              className="hover:text-[#1C1917] underline-offset-4 hover:underline"
            >
              Updated Paper
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
