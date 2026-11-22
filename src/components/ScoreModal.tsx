import React from 'react';
import { X, Award, RotateCcw } from 'lucide-react';
import { EprtScoreReport } from '../utils/scoring';

interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: EprtScoreReport;
  onResetAnswers: () => void;
}

export const ScoreModal: React.FC<ScoreModalProps> = ({
  isOpen,
  onClose,
  report,
  onResetAnswers,
}) => {
  if (!isOpen) return null;

  const sections = [
    {
      name: '1. Listening Comprehension',
      detail: report.listening,
      color: 'bg-indigo-600',
    },
    {
      name: '2. Structure & Written Expression',
      detail: report.structure,
      color: 'bg-amber-500',
    },
    {
      name: '3. Reading Comprehension',
      detail: report.reading,
      color: 'bg-emerald-600',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="px-6 py-4 bg-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <h2 className="font-bold text-base">Laporan Estimasi Skor EPrT®</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-indigo-100 hover:text-white hover:bg-indigo-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="text-center p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Proyeksi Skor Total (Skala 310 – 677)
            </div>
            <div className="text-4xl font-extrabold text-indigo-700 mt-1">
              {report.totalScore}
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Terjawab {report.answeredCount} dari {report.totalQuestions} soal tersedia
            </div>
          </div>

          <div className="space-y-3">
            {sections.map((sec) => {
              const pct =
                sec.detail.total > 0
                  ? Math.round((sec.detail.correct / sec.detail.total) * 100)
                  : 0;
              return (
                <div key={sec.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800">{sec.name}</span>
                    <span className="text-slate-600">
                      {sec.detail.correct}/{sec.detail.total} Benar • Skala{' '}
                      <strong>{sec.detail.converted}</strong>/68
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${sec.color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onResetAnswers}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Semua Jawaban
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
