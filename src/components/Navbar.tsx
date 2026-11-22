import React from 'react';
import {
  Headphones,
  CheckSquare,
  BookOpen,
  Database,
  Award,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ExamMode, SectionKey } from '../types/eprt';

interface NavbarProps {
  activeSection: SectionKey;
  onSelectSection: (section: SectionKey) => void;
  examMode: ExamMode;
  onToggleExamMode: (mode: ExamMode) => void;
  totalScore: number;
  answeredCount: number;
  totalQuestions: number;
  onOpenScoreModal: () => void;
  onOpenCrudModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onSelectSection,
  examMode,
  onToggleExamMode,
  totalScore,
  answeredCount,
  totalQuestions,
  onOpenScoreModal,
  onOpenCrudModal,
}) => {
  const navItems: { key: SectionKey; label: string; sub: string; icon: React.ReactNode }[] = [
    {
      key: 'listening',
      label: '1. Listening',
      sub: 'Short, Long & Lecture',
      icon: <Headphones className="w-4 h-4" />,
    },
    {
      key: 'structure',
      label: '2. Structure',
      sub: 'Completion & Error',
      icon: <CheckSquare className="w-4 h-4" />,
    },
    {
      key: 'reading',
      label: '3. Reading',
      sub: 'Academic Passages',
      icon: <BookOpen className="w-4 h-4" />,
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              E®
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 text-base sm:text-lg leading-tight">
                  EPrT® Interactive Suite
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  React + Tailwind
                </span>
              </div>
              <p className="text-xs text-slate-500">
                English Proficiency Test Simulator & Question Bank CRUD
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Practice vs Exam Mode */}
            <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => onToggleExamMode('practice')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition ${
                  examMode === 'practice'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Latihan Bebas
              </button>
              <button
                type="button"
                onClick={() => onToggleExamMode('exam')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition ${
                  examMode === 'exam'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Simulasi Ujian
              </button>
            </div>

            {/* CRUD Button */}
            <button
              type="button"
              onClick={onOpenCrudModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition shadow-xs"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              Kelola Soal (CRUD)
            </button>

            {/* Score Estimator Button */}
            <button
              type="button"
              onClick={onOpenScoreModal}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition"
            >
              <Award className="w-4 h-4 text-indigo-600" />
              <span>Est. Skor: {totalScore}</span>
              <span className="text-[11px] text-indigo-500 font-normal">
                ({answeredCount}/{totalQuestions})
              </span>
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <nav className="flex gap-2 pb-3 overflow-x-auto">
          {navItems.map((item) => {
            const active = activeSection === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onSelectSection(item.key)}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border text-left transition shrink-0 ${
                  active
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40'
                }`}
              >
                {item.icon}
                <div>
                  <div className="text-xs font-bold leading-tight">{item.label}</div>
                  <div
                    className={`text-[11px] ${
                      active ? 'text-indigo-100' : 'text-slate-500'
                    }`}
                  >
                    {item.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
