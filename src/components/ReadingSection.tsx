import React, { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, ZoomIn, ZoomOut } from 'lucide-react';
import { AnswerMap, ReadingPassageItem } from '../types/eprt';

interface ReadingSectionProps {
  passages: ReadingPassageItem[];
  answers: AnswerMap;
  onSelectAnswer: (questionId: string, optionIndex: number) => void;
}

export const ReadingSection: React.FC<ReadingSectionProps> = ({
  passages,
  answers,
  onSelectAnswer,
}) => {
  const [passageIdx, setPassageIdx] = useState(0);
  const [fontScale, setFontScale] = useState<'sm' | 'base' | 'lg'>('base');
  const letters = ['A', 'B', 'C', 'D'];

  const safeIdx = Math.min(passageIdx, Math.max(0, passages.length - 1));
  const current = passages[safeIdx];

  if (!current) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500 text-sm">
        Belum ada teks Reading. Tambahkan melalui menu <strong>Kelola Soal (CRUD)</strong>.
      </div>
    );
  }

  const fontClass =
    fontScale === 'sm' ? 'text-sm leading-relaxed' : fontScale === 'lg' ? 'text-lg leading-loose' : 'text-base leading-relaxed';

  return (
    <div className="space-y-5">
      {/* Passage Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {passages.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPassageIdx(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                safeIdx === idx
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Teks {idx + 1}: {p.title.split('(')[0].trim()}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setFontScale((s) => (s === 'lg' ? 'base' : 'sm'))}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            title="Perkecil Teks"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setFontScale((s) => (s === 'sm' ? 'base' : 'lg'))}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            title="Perbesar Teks"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Academic Passage */}
        <article className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs lg:sticky lg:top-32 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              {current.category}
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">{current.title}</h2>
          </div>

          <div className={`space-y-4 text-slate-800 ${fontClass}`}>
            {current.paragraphs.map((para, pIdx) => (
              <div key={pIdx} className="flex gap-3">
                <span className="text-[11px] font-bold text-slate-400 select-none pt-1 shrink-0">
                  [{pIdx + 1}]
                </span>
                <p className="text-justify">{para}</p>
              </div>
            ))}
          </div>
        </article>

        {/* Right: Comprehension Questions */}
        <div className="lg:col-span-6 space-y-4">
          {current.questions.map((q, qIdx) => {
            const selected = answers[q.id];
            const isAnswered = selected !== undefined;

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-bold text-slate-900">
                    {qIdx + 1}. {q.question}
                  </div>
                  {q.paragraphRef && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold shrink-0">
                      Paragraf {q.paragraphRef}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isChosen = selected === optIdx;
                    const isCorrect = q.correctIndex === optIdx;

                    let style =
                      'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30 text-slate-800';
                    if (isAnswered) {
                      if (isCorrect) style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                      else if (isChosen) style = 'border-rose-500 bg-rose-50 text-rose-950';
                      else style = 'border-slate-200 bg-slate-50/70 text-slate-400';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => onSelectAnswer(q.id, optIdx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between gap-2 transition ${style}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0">
                            {letters[optIdx]}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isAnswered && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isAnswered && isChosen && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="rounded-xl bg-emerald-50/80 border border-emerald-200 p-3 text-xs text-emerald-950">
                    <strong className="text-emerald-800">Pembahasan: </strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
