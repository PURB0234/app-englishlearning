import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, CircleHelp, GraduationCap, RotateCcw } from 'lucide-react';

type LessonQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};
type Lesson = {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  sections: { heading: string; body: string; example?: string; note?: string }[];
  questions: LessonQuestion[];
};

const LESSONS: Lesson[] = [
  {
    id: 'subject-verb',
    title: 'Subject & Verb Fundamentals',
    subtitle: 'Kenali struktur inti kalimat sebelum menganalisis soal.',
    duration: '15–20 menit',
    sections: [
      { heading: '1. Subject (S) dan Verb (V)', body: 'Subject adalah orang, benda, atau hal yang dibicarakan. Verb menyatakan tindakan atau keadaan subject. Kalimat lengkap umumnya memiliki subject dan verb utama.', example: 'The student studies English.\nSubject: The student\nVerb: studies\nObject: English' },
      { heading: '2. Subject bisa berupa frasa', body: 'Subject tidak selalu satu kata. Frasa panjang dapat menjadi subject, tetapi biasanya memiliki satu kata inti (head noun) yang menentukan kesesuaian verb.', example: 'The quality of the products is excellent.\nInti subject: quality (tunggal)\nVerb: is', note: 'Jangan tertipu noun yang paling dekat dengan verb. Pada contoh ini, products bukan inti subject.' },
      { heading: '3. Bentuk-bentuk verb', body: 'Verb memiliki beberapa bentuk. V1 digunakan pada present, V2 untuk past, V3 pada perfect/passive, dan V-ing pada continuous serta beberapa konstruksi lain.', example: 'She studies every day. (V1+s)\nShe studied yesterday. (V2)\nShe has studied English. (V3)\nShe is studying now. (V-ing)' },
      { heading: '4. Action verb dan linking verb', body: 'Action verb menyatakan tindakan. Linking verb menghubungkan subject dengan informasi yang menjelaskannya, misalnya be, seem, become, feel, dan taste.', example: 'They build a house. (action)\nThe food tastes delicious. (linking)', note: 'Setelah linking verb seperti tastes pada makna ini, gunakan adjective: delicious, bukan adverb deliciously.' },
      { heading: '5. Pola dasar kalimat', body: 'Kalimat dapat memiliki object, complement, atau keterangan. Object menerima tindakan, sedangkan complement menjelaskan subject atau object.', example: 'She reads a book. (S + V + O)\nHe is a teacher. (S + V + complement)\nThey work efficiently. (S + V + adverb)' },
      { heading: 'Strategi saat mengerjakan Structure', body: 'Cari verb utama, temukan subject-nya, cari inti subject, lalu periksa bentuk verb dan kelengkapan kalimat. Jangan memilih jawaban hanya karena terdengar familiar.' }
    ],
    questions: [
      { question: 'Pada kalimat “The new student studies English every night”, manakah subject utamanya?', options: ['The new student', 'studies', 'English', 'every night'], answer: 0, explanation: 'The new student adalah frasa noun yang menjadi pelaku/pokok pembicaraan. Studies adalah verb, English object, dan every night keterangan waktu.' },
      { question: 'Tentukan verb utama pada kalimat “My friends are ready for the examination.”', options: ['My friends', 'are', 'ready', 'examination'], answer: 1, explanation: 'Are adalah linking verb yang menghubungkan subject My friends dengan complement ready.' },
      { question: 'Pilih analisis yang tepat untuk kalimat “The quality of these machines is excellent.”', options: ['Subject inti = machines; verb = is', 'Subject inti = quality; verb = is', 'Subject inti = quality; verb = are', 'Subject inti = machines; verb = are'], answer: 1, explanation: 'Inti subject adalah quality (tunggal). Frasa of these machines hanya menerangkan quality, sehingga verb-nya is.' },
      { question: 'Pada kalimat “The soup tastes delicious”, kata “tastes” berfungsi sebagai ...', options: ['Action verb yang diikuti object', 'Linking verb yang diikuti adjective', 'Auxiliary verb untuk continuous tense', 'Noun yang menjadi subject'], answer: 1, explanation: 'Tastes menghubungkan soup dengan sifat delicious. Karena itu delicious adalah adjective sebagai subject complement.' },
      { question: 'Kalimat manakah yang menggunakan V3 dengan benar?', options: ['She has went home.', 'She has gone home.', 'She has going home.', 'She have gone home.'], answer: 1, explanation: 'Present perfect memakai has/have + V3. Bentuk V3 dari go adalah gone, dan subject she memakai has.' }
    ]
  },
  {
    id: 'subject-verb-agreement',
    title: 'Subject-Verb Agreement',
    subtitle: 'Cocokkan verb dengan inti subject, bukan kata terdekat.',
    duration: '20–25 menit',
    sections: [
      { heading: '1. Aturan dasar present tense', body: 'Dalam simple present, subject orang ketiga tunggal (he, she, it, atau noun tunggal) memakai verb + s/es. I, you, we, they, dan noun jamak memakai base verb.', example: 'The lecturer explains the topic.\nThe lecturers explain the topic.\nThey explain the topic.' },
      { heading: '2. Frasa preposisi tidak mengubah subject', body: 'Frasa yang diawali of, with, in, among, atau together with biasanya hanya memberi informasi tambahan. Abaikan sementara frasa tersebut untuk menemukan inti subject.', example: 'The list of required books is on the desk.\nInti subject: list → is', note: 'Ini salah satu jebakan yang sering muncul dalam kalimat panjang.' },
      { heading: '3. Each, every, everyone', body: 'Each, every, everyone, everybody, someone, dan nobody diperlakukan sebagai subject tunggal dalam agreement standar.', example: 'Each student has an ID card.\nEverybody is invited.' },
      { heading: '4. Either...or / Neither...nor', body: 'Pada konstruksi either...or dan neither...nor, verb umumnya mengikuti subject yang paling dekat dengannya.', example: 'Neither the manager nor the employees are available.\nNeither the employees nor the manager is available.' },
      { heading: '5. Jangan tertukar dengan bentuk khusus', body: 'Beberapa noun tampak jamak tetapi diperlakukan tunggal, seperti information dan furniture. Sebaliknya, people dan several plural nouns memerlukan verb jamak.', example: 'The information is useful.\nThe people are waiting.' }
    ],
    questions: [
      { question: 'The list of items _____ on the table.', options: ['are', 'is', 'were', 'have'], answer: 1, explanation: 'Inti subject adalah list (tunggal). Frasa of items tidak mengubah agreement, jadi gunakan is.' },
      { question: 'Each of the participants _____ a registration form.', options: ['have', 'are having', 'has', 'were'], answer: 2, explanation: 'Each diperlakukan sebagai subject tunggal, sehingga memakai has.' },
      { question: 'Neither the supervisor nor the assistants _____ available today.', options: ['is', 'was', 'are', 'has'], answer: 2, explanation: 'Pada neither...nor, verb mengikuti subject terdekat, yaitu assistants (jamak), sehingga are.' },
      { question: 'The quality of the materials _____ improved significantly.', options: ['have', 'are', 'has', 'were'], answer: 2, explanation: 'Inti subject adalah quality (tunggal). Present perfect yang tepat adalah has improved.' },
      { question: 'Everyone in the two classes _____ required to attend.', options: ['are', 'is', 'have', 'were'], answer: 1, explanation: 'Everyone selalu diperlakukan sebagai subject tunggal dalam agreement standar, sehingga memakai is.' }
    ]
  }
];

const PROGRESS_KEY = 'eprt_learning_progress_v1';

export const LearningSection: React.FC = () => {
  const [activeId, setActiveId] = useState(LESSONS[0].id);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]') as string[]; } catch { return []; }
  });
  const [showResults, setShowResults] = useState(false);
  const lesson = useMemo(() => LESSONS.find((item) => item.id === activeId) ?? LESSONS[0], [activeId]);
  const score = lesson.questions.filter((q, i) => answers[`${lesson.id}-${i}`] === q.answer).length;

  useEffect(() => { localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed)); }, [completed]);

  const selectLesson = (id: string) => {
    setActiveId(id);
    setAnswers({});
    setShowResults(false);
  };
  const submitLesson = () => {
    setShowResults(true);
    if (lesson.questions.every((q, i) => answers[`${lesson.id}-${i}`] !== undefined)) {
      setCompleted((prev) => prev.includes(lesson.id) ? prev : [...prev, lesson.id]);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-r from-indigo-700 to-violet-700 p-6 sm:p-8 text-white">
        <div className="flex items-center gap-2 text-indigo-100 text-sm font-semibold"><GraduationCap className="w-5 h-5" /> LEARNING CENTER</div>
        <h2 className="mt-2 text-2xl sm:text-3xl font-bold">Belajar dulu, baru uji kemampuan.</h2>
        <p className="mt-2 max-w-2xl text-indigo-100 text-sm sm:text-base">Pahami konsep, pelajari contoh, lalu kerjakan latihan dengan pembahasan setiap jawaban.</p>
        <div className="mt-5 flex items-center gap-3">
          <div className="h-2 flex-1 max-w-xs rounded-full bg-white/20 overflow-hidden"><div className="h-full rounded-full bg-emerald-300" style={{ width: `${(completed.length / LESSONS.length) * 100}%` }} /></div>
          <span className="text-sm font-semibold">{completed.length}/{LESSONS.length} materi selesai</span>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-5 items-start">
        <aside className="rounded-2xl border border-slate-200 bg-white p-3">
          <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">Daftar materi</div>
          {LESSONS.map((item, index) => {
            const active = item.id === activeId;
            return <button key={item.id} onClick={() => selectLesson(item.id)} className={`w-full text-left rounded-xl p-3 mb-1 transition ${active ? 'bg-indigo-50 border border-indigo-200 text-indigo-800' : 'hover:bg-slate-50 text-slate-700'}`}>
              <div className="flex items-center gap-2"><span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${active ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{index + 1}</span><span className="text-sm font-semibold flex-1">{item.title}</span>{completed.includes(item.id) && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}</div>
              <p className="text-xs mt-2 ml-8 text-slate-500">{item.duration}</p>
            </button>;
          })}
          <div className="mt-3 border-t border-slate-100 p-3 text-xs text-slate-500">Materi berikutnya akan ditambahkan bertahap.</div>
        </aside>

        <div className="space-y-5 min-w-0">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600"><BookOpen className="w-4 h-4" /> Materi pembelajaran</div>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">{lesson.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{lesson.subtitle}</p>
            <div className="mt-6 space-y-6">
              {lesson.sections.map((section, index) => <article key={section.heading} className="border-l-2 border-indigo-200 pl-4">
                <h4 className="font-bold text-slate-800">{section.heading}</h4>
                <p className="mt-2 text-sm leading-7 text-slate-600">{section.body}</p>
                {section.example && <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm leading-6 text-slate-800 font-mono">{section.example}</pre>}
                {section.note && <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800"><strong>Catatan EPrT:</strong> {section.note}</div>}
              </article>)}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider"><CircleHelp className="w-4 h-4" /> Guided practice</div>
            <h3 className="mt-2 text-xl font-bold text-slate-900">Latihan pemahaman</h3>
            <p className="mt-1 text-sm text-slate-500">Pilih jawaban untuk setiap soal. Pembahasan akan muncul setelah kamu menekan periksa jawaban.</p>
            <div className="mt-5 space-y-5">
              {lesson.questions.map((q, index) => {
                const key = `${lesson.id}-${index}`;
                const selected = answers[key];
                return <div key={key} className="rounded-xl border border-slate-200 p-4">
                  <p className="text-sm font-semibold text-slate-800">{index + 1}. {q.question}</p>
                  <div className="mt-3 grid gap-2">
                    {q.options.map((option, optionIndex) => {
                      const isSelected = selected === optionIndex;
                      const isCorrect = q.answer === optionIndex;
                      const style = showResults && isCorrect ? 'border-emerald-400 bg-emerald-50 text-emerald-800' : showResults && isSelected ? 'border-rose-300 bg-rose-50 text-rose-800' : isSelected ? 'border-indigo-400 bg-indigo-50 text-indigo-800' : 'border-slate-200 hover:border-indigo-300 text-slate-700';
                      return <button key={option} disabled={showResults} onClick={() => setAnswers((prev) => ({ ...prev, [key]: optionIndex }))} className={`w-full rounded-lg border px-3 py-2.5 text-left text-sm transition flex gap-3 items-center ${style}`}><span className="font-bold">{String.fromCharCode(65 + optionIndex)}.</span>{option}</button>;
                    })}
                  </div>
                  {showResults && <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700"><strong className={selected === q.answer ? 'text-emerald-700' : 'text-rose-700'}>{selected === q.answer ? 'Jawaban benar.' : `Jawaban benar: ${String.fromCharCode(65 + q.answer)}.`}</strong> {q.explanation}</div>}
                </div>;
              })}
            </div>
            {!showResults ? <button onClick={submitLesson} disabled={lesson.questions.some((q, i) => answers[`${lesson.id}-${i}`] === undefined)} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed">Periksa jawaban <ChevronRight className="w-4 h-4" /></button> :
              <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3">
                <div><p className="font-bold text-slate-900">Hasil latihan: {score}/{lesson.questions.length}</p><p className="text-sm text-slate-500">{score === lesson.questions.length ? 'Bagus! Semua jawaban tepat.' : 'Pelajari pembahasan yang tersedia, lalu coba lagi.'}</p></div>
                <button onClick={() => { setAnswers({}); setShowResults(false); }} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><RotateCcw className="w-4 h-4" /> Ulangi latihan</button>
              </div>}
          </section>
        </div>
      </div>
    </div>
  );
};
