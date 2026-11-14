import React from 'react';

export type ActiveSection = 'blueprint' | 'simulator' | 'datasets' | 'manuscript';

interface HeaderProps {
  activeSection: ActiveSection;
  onNavigate: (section: ActiveSection) => void;
  onExportLatex: () => void;
}

const NAV_ITEMS: { id: ActiveSection; label: string }[] = [
  { id: 'blueprint', label: 'Model Blueprint' },
  { id: 'simulator', label: 'Workload Simulator' },
  { id: 'datasets', label: 'Datasets & Baseline' },
  { id: 'manuscript', label: 'Updated Paper' },
];

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onExportLatex,
}) => {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-[#DED9CE] bg-[#F8F6F1]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element Brand Zone */}
        <button
          type="button"
          onClick={() => onNavigate('blueprint')}
          className="font-serif text-lg font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
        >
          TGHM Research Studio
        </button>

        {/* Zone 2: 4 single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A] ${
                  isActive
                    ? 'text-[#1C1917] font-semibold'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[17px] h-[2px] bg-[#1E3A8A]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary CTA button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onExportLatex}
            className="rounded-md bg-[#1E3A8A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#172554] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            Download Word (.docx)
          </button>
        </div>
      </div>

      {/* Compact mobile nav row kept minimal under sticky cap */}
      <nav
        aria-label="Mobile navigation"
        className="flex md:hidden items-center justify-between gap-2 border-t border-[#E7E3DA] px-4 py-2 overflow-x-auto"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`px-2 py-1 text-xs font-medium whitespace-nowrap shrink-0 rounded ${
                isActive
                  ? 'bg-[#1E3A8A] text-white'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
