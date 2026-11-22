import React, { useState } from 'react';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import {
  AnswerMap,
  ErrorRecognitionItem,
  SentenceCompletionItem,
  StructurePartKey,
} from '../types/eprt';

interface StructureSectionProps {
  completionItems: SentenceCompletionItem[];
  errorItems: ErrorRecognitionItem[];
  answers: AnswerMap;
  onSelectAnswer: (questionId: string, optionIndex: number) => void;
}

export const StructureSection: React.FC<StructureSectionProps> = ({
  completionItems,
  errorItems,
  answers,
  onSelectAnswer,
}) => {
  const [part, setPart] = useState<StructurePartKey>('completion');
  const letters = ['A', 'B', 'C', 'D'];

  const renderInteractiveErrorSentence = (item: ErrorRecognitionItem) => {
    const selected = answers[item.id];
    const isAnswered = selected !== undefined;
    const parts = item.template.split(/(\{\{[ABCD]\}\})/g);

    return (
      <p className="text-base sm:text-lg leading-relaxed text-slate-900 font-medium">
        {parts.map((chunk, idx) => {
          const match = chunk.match(/^\{\{([ABCD])\}\}$/);
          if (!match) {
            return <span key={idx}>{chunk}</span>;
          }
          const label = match[1] as 'A' | 'B' | 'C' | 'D';
          const segIdx = letters.indexOf(label);
          const seg = item.segments[segIdx];
          if (!seg) return null;

          const isChosen = selected === segIdx;
          const isCorrect = item.correctIndex === segIdx;

          let highlight =
            'border-b-2 border-indigo-500 text-indigo-800 hover:bg-indigo-100/70 px-1 rounded-t cursor-pointer';
          if (isAnswered) {
            if (isCorrect) {
              highlight =
                'border-b-2 border-emerald-600 bg-emerald-100 text-emerald-950 px-1.5 rounded font-bold cursor-pointer';
            } else if (isChosen) {
              highlight =
                'border-b-2 border-rose-600 bg-rose-100 text-rose-950 px-1.5 rounded line-through cursor-pointer';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectAnswer(item.id, segIdx)}
              className={`inline-flex items-baseline gap-1 mx-0.5 transition ${highlight}`}
              title={`Klik untuk memilih opsi (${label})`}
            >
              <span>{seg.text}</span>
              <span className="text-[10px] font-bold uppercase text-slate-500">({label})</span>
            </button>
          );
        })}
      </p>
    );
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setPart('completion')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              part === 'completion'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Part A: Sentence Completion ({completionItems.length})
          </button>
          <button
            type="button"
            onClick={() => setPart('error')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              part === 'error'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Part B: Error Recognition ({errorItems.length})
          </button>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          {part === 'completion'
            ? 'Pilih kata/frasa paling tepat untuk melengkapi kalimat.'
            : 'Klik langsung kata bergaris bawah di kalimat atau tombol A–D.'}
        </div>
      </div>

      {/* PART A: SENTENCE COMPLETION */}
      {part === 'completion' && (
        <div className="space-y-4">
          {completionItems.map((item, idx) => {
            const selected = answers[item.id];
            const isAnswered = selected !== undefined;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
              >
                <div className="flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold shrink-0">
                    #{idx + 1}
                  </span>
                  <p className="text-base font-medium text-slate-900 leading-relaxed">
                    {item.sentence}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {item.options.map((opt, optIdx) => {
                    const isChosen = selected === optIdx;
                    const isCorrect = item.correctIndex === optIdx;

                    let style =
                      'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40 text-slate-800';
                    if (isAnswered) {
                      if (isCorrect) {
                        style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                      } else if (isChosen) {
                        style = 'border-rose-500 bg-rose-50 text-rose-950';
                      } else {
                        style = 'border-slate-200 bg-slate-50/70 text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => onSelectAnswer(item.id, optIdx)}
                        className={`p-3 rounded-xl border text-left text-xs flex items-center justify-between gap-2 transition ${style}`}
                      >
                        <div className="flex items-center gap-2">
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
                  <div className="rounded-xl bg-emerald-50/80 border border-emerald-200 p-3.5 text-xs text-emerald-950 leading-relaxed">
                    <strong className="text-emerald-800">Analisis Grammar: </strong>
                    {item.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* PART B: ERROR RECOGNITION */}
      {part === 'error' && (
        <div className="space-y-4">
          {errorItems.map((item, idx) => {
            const selected = answers[item.id];
            const isAnswered = selected !== undefined;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
              >
                <div className="flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold shrink-0">
                    #{idx + 1}
                  </span>
                  <div className="flex-1">{renderInteractiveErrorSentence(item)}</div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {item.segments.map((seg, segIdx) => {
                    const isChosen = selected === segIdx;
                    const isCorrect = item.correctIndex === segIdx;

                    let style =
                      'border-slate-200 bg-slate-50/60 hover:border-indigo-300 text-slate-800';
                    if (isAnswered) {
                      if (isCorrect) style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                      else if (isChosen) style = 'border-rose-500 bg-rose-50 text-rose-950';
                      else style = 'border-slate-200 bg-white text-slate-400';
                    }

                    return (
                      <button
                        key={seg.label}
                        type="button"
                        onClick={() => onSelectAnswer(item.id, segIdx)}
                        className={`p-2.5 rounded-xl border text-left text-xs flex items-center gap-2 transition ${style}`}
                      >
                        <span className="w-6 h-6 rounded-md bg-white border border-slate-200 font-bold flex items-center justify-center shrink-0">
                          {seg.label}
                        </span>
                        <span className="underline decoration-dotted truncate">{seg.text}</span>
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="rounded-xl bg-emerald-50/80 border border-emerald-200 p-3.5 text-xs text-emerald-950 space-y-1">
                    <div>
                      <strong className="text-emerald-800">Perbaikan Seharusnya: </strong>
                      <code className="px-1.5 py-0.5 rounded bg-emerald-100 font-bold">
                        {item.correction}
                      </code>
                    </div>
                    <p className="leading-relaxed">{item.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
