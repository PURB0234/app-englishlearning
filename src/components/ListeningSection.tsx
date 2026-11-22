import React, { useEffect, useState } from 'react';
import {
  Play,
  Square,
  Volume2,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Clock,
  Lock,
  ChevronLeft,
  ChevronRight,
  Mic,
} from 'lucide-react';
import {
  AnswerMap,
  DialogueLine,
  ExamMode,
  ListeningPartKey,
  SpeakerRole,
} from '../types/eprt';
import { speechController } from '../utils/speech';

interface ListeningSectionProps {
  shortItems: {
    id: string;
    title: string;
    dialogue: DialogueLine[];
    question: string;
    options: [string, string, string, string];
    correctIndex: number;
    explanation: string;
  }[];
  longItems: {
    id: string;
    title: string;
    context: string;
    dialogue: DialogueLine[];
    questions: {
      id: string;
      question: string;
      options: [string, string, string, string];
      correctIndex: number;
      explanation: string;
    }[];
  }[];
  lectureItems: {
    id: string;
    title: string;
    topic: string;
    transcript: string;
    questions: {
      id: string;
      question: string;
      options: [string, string, string, string];
      correctIndex: number;
      explanation: string;
    }[];
  }[];
  answers: AnswerMap;
  onSelectAnswer: (questionId: string, optionIndex: number) => void;
  examMode: ExamMode;
}

export const ListeningSection: React.FC<ListeningSectionProps> = ({
  shortItems,
  longItems,
  lectureItems,
  answers,
  onSelectAnswer,
  examMode,
}) => {
  const [part, setPart] = useState<ListeningPartKey>('short');
  const [index, setIndex] = useState(0);
  const [rate, setRate] = useState<number>(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLineIdx, setActiveLineIdx] = useState<number | null>(null);
  const [activeSpeaker, setActiveSpeaker] = useState<SpeakerRole | null>(null);
  const [playCounts, setPlayCounts] = useState<Record<string, number>>({});
  const [showTranscript, setShowTranscript] = useState<Record<string, boolean>>({});
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      speechController.stop();
    };
  }, []);

  useEffect(() => {
    speechController.stop();
    setIsPlaying(false);
    setActiveLineIdx(null);
    setActiveSpeaker(null);
    setCountdown(null);
  }, [part, index]);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;
    const timer = setTimeout(() => {
      setCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handlePartChange = (newPart: ListeningPartKey) => {
    setPart(newPart);
    setIndex(0);
  };

  const playLines = async (audioKey: string, lines: DialogueLine[], startTimerAfter = false) => {
    const used = playCounts[audioKey] || 0;
    if (examMode === 'exam' && used >= 1) return;

    setPlayCounts((prev) => ({ ...prev, [audioKey]: used + 1 }));
    setIsPlaying(true);
    setCountdown(null);

    await speechController.playSequence(lines, rate, (lineIdx, spk) => {
      setActiveLineIdx(lineIdx);
      setActiveSpeaker(spk);
    });

    setIsPlaying(false);
    setActiveLineIdx(null);
    setActiveSpeaker(null);

    if (examMode === 'exam' && startTimerAfter) {
      setCountdown(15);
    }
  };

  const handleStop = () => {
    speechController.stop();
    setIsPlaying(false);
    setActiveLineIdx(null);
    setActiveSpeaker(null);
  };

  const letters = ['A', 'B', 'C', 'D'];

  const currentListLength =
    part === 'short' ? shortItems.length : part === 'long' ? longItems.length : lectureItems.length;
  const safeIndex = Math.min(index, Math.max(0, currentListLength - 1));

  return (
    <div className="space-y-6">
      {/* Sub-navigation + Audio Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handlePartChange('short')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              part === 'short'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Part A: Short Dialogue ({shortItems.length})
          </button>
          <button
            type="button"
            onClick={() => handlePartChange('long')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              part === 'long'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Part B: Long Dialogue ({longItems.length} dialog)
          </button>
          <button
            type="button"
            onClick={() => handlePartChange('lecture')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              part === 'lecture'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Part C: Lecture ({lectureItems.length} kuliah)
          </button>
        </div>

        {/* Speed & Test Voice */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs">
            <span className="text-slate-500 font-medium">Speed:</span>
            {[0.85, 1.0, 1.15].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRate(r)}
                className={`px-2 py-0.5 rounded font-semibold ${
                  rate === r ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600'
                }`}
              >
                {r}x
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => speechController.testAudio(rate)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
            Tes Suara
          </button>
        </div>
      </div>

      {/* Empty State */}
      {currentListLength === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500 text-sm">
          Belum ada soal di bagian ini. Tambahkan melalui tombol <strong>Kelola Soal (CRUD)</strong> di atas.
        </div>
      )}

      {/* PART A: SHORT DIALOGUE */}
      {part === 'short' && shortItems[safeIndex] && (() => {
        const item = shortItems[safeIndex];
        const audioKey = `audio-${item.id}`;
        const playCount = playCounts[audioKey] || 0;
        const locked = examMode === 'exam' && playCount >= 1;
        const selected = answers[item.id];
        const isAnswered = selected !== undefined;
        const transcriptVisible = showTranscript[item.id] ?? (examMode === 'practice' && isAnswered);

        return (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Short Dialogue • Soal {safeIndex + 1} dari {shortItems.length}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">{item.title}</h2>
              </div>

              {countdown !== null && (
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                    countdown <= 5
                      ? 'bg-rose-100 text-rose-700 animate-pulse'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Sisa waktu jawab: {countdown}d
                </div>
              )}
            </div>

            {/* Audio Player Box */}
            <div className="rounded-2xl bg-gradient-to-br from-indigo-50 via-slate-50 to-indigo-50/50 border border-indigo-100 p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isPlaying ? 'bg-indigo-600 text-white animate-pulse' : 'bg-white text-indigo-600 border border-indigo-200'
                  }`}
                >
                  <Mic className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {isPlaying
                      ? `Sedang Berbicara: ${activeSpeaker ?? 'Audio'}`
                      : locked
                      ? 'Audio Selesai Diputar (Mode Ujian: 1x)'
                      : 'Putar Percakapan & Pertanyaan Narator'}
                  </div>
                  <p className="text-xs text-slate-600">
                    {examMode === 'exam'
                      ? 'Aturan EPrT®: Audio hanya dapat diputar 1 kali.'
                      : `Diputar ${playCount} kali • Mode latihan bebas (dapat diulang).`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!isPlaying ? (
                  <button
                    type="button"
                    disabled={locked}
                    onClick={() =>
                      playLines(
                        audioKey,
                        [...item.dialogue, { speaker: 'Narrator', text: item.question }],
                        true
                      )
                    }
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-xs ${
                      locked
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {locked ? <Lock className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {locked ? 'Terkunci (1x)' : playCount > 0 ? 'Putar Ulang Audio' : 'Putar Audio'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStop}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition"
                  >
                    <Square className="w-4 h-4" />
                    Hentikan
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    setShowTranscript((prev) => ({ ...prev, [item.id]: !transcriptVisible }))
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                >
                  {transcriptVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {transcriptVisible ? 'Sembunyikan Transkrip' : 'Lihat Transkrip'}
                </button>
              </div>
            </div>

            {/* Transcript */}
            {transcriptVisible && (
              <div className="rounded-xl bg-slate-900 text-slate-100 p-4 space-y-2 text-sm">
                <div className="text-[11px] uppercase tracking-wider text-indigo-300 font-bold">
                  Audio Transcript
                </div>
                {item.dialogue.map((line, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-lg transition ${
                      activeLineIdx === i ? 'bg-indigo-600/40 ring-1 ring-indigo-400' : ''
                    }`}
                  >
                    <span className="font-bold text-indigo-300">{line.speaker}: </span>
                    <span>{line.text}</span>
                  </div>
                ))}
                <div
                  className={`p-2 rounded-lg border-t border-slate-700 pt-2 ${
                    activeLineIdx === item.dialogue.length ? 'bg-indigo-600/40' : ''
                  }`}
                >
                  <span className="font-bold text-amber-300">Narrator: </span>
                  <span>{item.question}</span>
                </div>
              </div>
            )}

            {/* Options */}
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-slate-500">
                Pilih jawaban paling tepat (A, B, C, atau D):
              </div>
              {item.options.map((opt, optIdx) => {
                const isChosen = selected === optIdx;
                const isCorrect = item.correctIndex === optIdx;
                let cardStyle =
                  'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30 text-slate-800';

                if (isAnswered) {
                  if (isCorrect) {
                    cardStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500';
                  } else if (isChosen) {
                    cardStyle = 'border-rose-500 bg-rose-50 text-rose-950 ring-1 ring-rose-500';
                  } else {
                    cardStyle = 'border-slate-200 bg-slate-50/60 text-slate-500';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => onSelectAnswer(item.id, optIdx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between gap-3 ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          isAnswered && isCorrect
                            ? 'bg-emerald-600 text-white'
                            : isAnswered && isChosen
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {letters[optIdx]}
                      </span>
                      <span className="text-sm font-medium">{opt}</span>
                    </div>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && isChosen && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {isAnswered && (
              <div className="rounded-xl bg-emerald-50/80 border border-emerald-200 p-4 text-sm text-emerald-950">
                <div className="font-bold text-emerald-800 mb-1">Pembahasan & Strategi:</div>
                <p className="leading-relaxed">{item.explanation}</p>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                disabled={safeIndex === 0}
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
                Sebelumnya
              </button>
              <button
                type="button"
                disabled={safeIndex >= shortItems.length - 1}
                onClick={() => setIndex((i) => Math.min(shortItems.length - 1, i + 1))}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40"
              >
                Soal Berikutnya
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })()}

      {/* PART B: LONG DIALOGUE */}
      {part === 'long' && longItems[safeIndex] && (() => {
        const group = longItems[safeIndex];
        const audioKey = `audio-${group.id}`;
        const playCount = playCounts[audioKey] || 0;
        const locked = examMode === 'exam' && playCount >= 1;
        const transcriptVisible = showTranscript[group.id] ?? false;

        return (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Long Dialogue • Percakapan {safeIndex + 1} dari {longItems.length}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">{group.title}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{group.context}</p>
              </div>

              <div className="flex items-center gap-2">
                {!isPlaying ? (
                  <button
                    type="button"
                    disabled={locked}
                    onClick={() =>
                      playLines(audioKey, [
                        { speaker: 'Narrator', text: group.context },
                        ...group.dialogue,
                      ])
                    }
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                      locked
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    <Play className="w-4 h-4" />
                    {locked ? 'Terkunci (1x)' : 'Putar Dialog Panjang'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStop}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 text-white"
                  >
                    <Square className="w-4 h-4" />
                    Stop
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    setShowTranscript((prev) => ({ ...prev, [group.id]: !transcriptVisible }))
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  {transcriptVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  Transkrip
                </button>
              </div>
            </div>

            {isPlaying && (
              <div className="px-4 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-800 flex items-center gap-2">
                <Volume2 className="w-4 h-4 animate-bounce" />
                Sedang berbicara: {activeSpeaker}
              </div>
            )}

            {transcriptVisible && (
              <div className="rounded-xl bg-slate-900 text-slate-100 p-4 space-y-2 text-sm max-h-72 overflow-y-auto">
                {group.dialogue.map((line, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-lg ${
                      activeLineIdx === i + 1 ? 'bg-indigo-600/40 ring-1 ring-indigo-400' : ''
                    }`}
                  >
                    <span className="font-bold text-indigo-300">{line.speaker}: </span>
                    <span>{line.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Multi Questions */}
            <div className="space-y-6">
              {group.questions.map((q, qIdx) => {
                const selected = answers[q.id];
                const isAnswered = selected !== undefined;
                return (
                  <div
                    key={q.id}
                    className="rounded-xl border border-slate-200 p-4 bg-slate-50/40 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-bold text-slate-900">
                        {qIdx + 1}. {q.question}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          speechController.playSequence(
                            [{ speaker: 'Narrator', text: q.question }],
                            rate
                          )
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 text-indigo-600 hover:bg-indigo-50 shrink-0"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        Dengar Soal
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selected === optIdx;
                        const isCorrect = q.correctIndex === optIdx;
                        let style =
                          'border-slate-200 bg-white hover:border-indigo-300 text-slate-800';
                        if (isAnswered) {
                          if (isCorrect) style = 'border-emerald-500 bg-emerald-50 text-emerald-950';
                          else if (isChosen) style = 'border-rose-500 bg-rose-50 text-rose-950';
                          else style = 'border-slate-200 bg-white/60 text-slate-400';
                        }
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => onSelectAnswer(q.id, optIdx)}
                            className={`text-left p-3 rounded-xl border text-xs font-medium flex items-center gap-2.5 transition ${style}`}
                          >
                            <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0">
                              {letters[optIdx]}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className="text-xs text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                        <strong>Pembahasan:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                disabled={safeIndex === 0}
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
                Dialog Sebelumnya
              </button>
              <button
                type="button"
                disabled={safeIndex >= longItems.length - 1}
                onClick={() => setIndex((i) => Math.min(longItems.length - 1, i + 1))}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white disabled:opacity-40"
              >
                Dialog Berikutnya
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })()}

      {/* PART C: LECTURE */}
      {part === 'lecture' && lectureItems[safeIndex] && (() => {
        const lec = lectureItems[safeIndex];
        const audioKey = `audio-${lec.id}`;
        const playCount = playCounts[audioKey] || 0;
        const locked = examMode === 'exam' && playCount >= 1;
        const transcriptVisible = showTranscript[lec.id] ?? false;

        return (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Lecture Monologue • Kuliah {safeIndex + 1} dari {lectureItems.length}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">{lec.title}</h2>
                <p className="text-xs text-slate-500 mt-0.5">Topik: {lec.topic}</p>
              </div>

              <div className="flex items-center gap-2">
                {!isPlaying ? (
                  <button
                    type="button"
                    disabled={locked}
                    onClick={() =>
                      playLines(audioKey, [{ speaker: 'Speaker', text: lec.transcript }])
                    }
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                      locked
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    <Play className="w-4 h-4" />
                    {locked ? 'Terkunci (1x)' : 'Putar Monolog Kuliah'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStop}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 text-white"
                  >
                    <Square className="w-4 h-4" />
                    Stop
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    setShowTranscript((prev) => ({ ...prev, [lec.id]: !transcriptVisible }))
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  {transcriptVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  Transkrip
                </button>
              </div>
            </div>

            {transcriptVisible && (
              <div className="rounded-xl bg-slate-900 text-slate-100 p-4 text-sm leading-relaxed">
                <div className="text-[11px] uppercase tracking-wider text-indigo-300 font-bold mb-1.5">
                  Lecture Transcript
                </div>
                <p>{lec.transcript}</p>
              </div>
            )}

            <div className="space-y-5">
              {lec.questions.map((q, qIdx) => {
                const selected = answers[q.id];
                const isAnswered = selected !== undefined;
                return (
                  <div
                    key={q.id}
                    className="rounded-xl border border-slate-200 p-4 bg-slate-50/40 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-bold text-slate-900">
                        {qIdx + 1}. {q.question}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          speechController.playSequence(
                            [{ speaker: 'Narrator', text: q.question }],
                            rate
                          )
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 text-indigo-600 hover:bg-indigo-50 shrink-0"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        Dengar Soal
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selected === optIdx;
                        const isCorrect = q.correctIndex === optIdx;
                        let style =
                          'border-slate-200 bg-white hover:border-indigo-300 text-slate-800';
                        if (isAnswered) {
                          if (isCorrect) style = 'border-emerald-500 bg-emerald-50 text-emerald-950';
                          else if (isChosen) style = 'border-rose-500 bg-rose-50 text-rose-950';
                          else style = 'border-slate-200 bg-white/60 text-slate-400';
                        }
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => onSelectAnswer(q.id, optIdx)}
                            className={`text-left p-3 rounded-xl border text-xs font-medium flex items-center gap-2.5 transition ${style}`}
                          >
                            <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0">
                              {letters[optIdx]}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className="text-xs text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                        <strong>Pembahasan:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                disabled={safeIndex === 0}
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
                Kuliah Sebelumnya
              </button>
              <button
                type="button"
                disabled={safeIndex >= lectureItems.length - 1}
                onClick={() => setIndex((i) => Math.min(lectureItems.length - 1, i + 1))}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white disabled:opacity-40"
              >
                Kuliah Berikutnya
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
