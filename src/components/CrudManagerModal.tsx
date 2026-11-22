import React, { useRef, useState } from 'react';
import {
  X,
  Plus,
  Pencil,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  Search,
  Save,
} from 'lucide-react';
import {
  DialogueLine,
  EprtQuestionBank,
  ErrorRecognitionItem,
  SentenceCompletionItem,
  ShortDialogueItem,
  SpeakerRole,
} from '../types/eprt';

interface CrudManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  bank: EprtQuestionBank;
  onUpdateBank: (newBank: EprtQuestionBank) => void;
  onResetDefault: () => void;
}

type CrudCategory = 'listeningShort' | 'structureCompletion' | 'structureError';

export const CrudManagerModal: React.FC<CrudManagerModalProps> = ({
  isOpen,
  onClose,
  bank,
  onUpdateBank,
  onResetDefault,
}) => {
  const [category, setCategory] = useState<CrudCategory>('listeningShort');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Shared Form States
  const [title, setTitle] = useState('');
  const [speaker1, setSpeaker1] = useState<SpeakerRole>('Man');
  const [line1, setLine1] = useState('');
  const [speaker2, setSpeaker2] = useState<SpeakerRole>('Woman');
  const [line2, setLine2] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctIndex, setCorrectIndex] = useState<number>(0);
  const [correctionText, setCorrectionText] = useState('');
  const [explanation, setExplanation] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSpeaker1('Man');
    setLine1('');
    setSpeaker2('Woman');
    setLine2('');
    setQuestionText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setCorrectIndex(0);
    setCorrectionText('');
    setExplanation('');
    setIsFormOpen(false);
  };

  const openCreateForm = () => {
    resetForm();
    if (category === 'structureError') {
      setQuestionText('The student {{A}} very {{B}} about {{C}} final {{D}}.');
      setOptA('were');
      setOptB('excited');
      setOptC('their');
      setOptD('project');
      setCorrectionText('was');
    }
    setIsFormOpen(true);
  };

  const openEditShort = (item: ShortDialogueItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setSpeaker1(item.dialogue[0]?.speaker || 'Man');
    setLine1(item.dialogue[0]?.text || '');
    setSpeaker2(item.dialogue[1]?.speaker || 'Woman');
    setLine2(item.dialogue[1]?.text || '');
    setQuestionText(item.question);
    setOptA(item.options[0]);
    setOptB(item.options[1]);
    setOptC(item.options[2]);
    setOptD(item.options[3]);
    setCorrectIndex(item.correctIndex);
    setExplanation(item.explanation);
    setIsFormOpen(true);
  };

  const openEditCompletion = (item: SentenceCompletionItem) => {
    setEditingId(item.id);
    setQuestionText(item.sentence);
    setOptA(item.options[0]);
    setOptB(item.options[1]);
    setOptC(item.options[2]);
    setOptD(item.options[3]);
    setCorrectIndex(item.correctIndex);
    setExplanation(item.explanation);
    setIsFormOpen(true);
  };

  const openEditError = (item: ErrorRecognitionItem) => {
    setEditingId(item.id);
    setQuestionText(item.template);
    setOptA(item.segments[0].text);
    setOptB(item.segments[1].text);
    setOptC(item.segments[2].text);
    setOptD(item.segments[3].text);
    setCorrectIndex(item.correctIndex);
    setCorrectionText(item.correction);
    setExplanation(item.explanation);
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingId || `${category}-${Date.now()}`;

    if (category === 'listeningShort') {
      const dialogue: DialogueLine[] = [
        { speaker: speaker1, text: line1.trim() },
        { speaker: speaker2, text: line2.trim() },
      ];
      const newItem: ShortDialogueItem = {
        id,
        title: title.trim() || 'Custom Short Dialogue',
        dialogue,
        question: questionText.trim(),
        options: [optA.trim(), optB.trim(), optC.trim(), optD.trim()],
        correctIndex,
        explanation: explanation.trim(),
      };
      const updatedList = editingId
        ? bank.listeningShort.map((it) => (it.id === editingId ? newItem : it))
        : [newItem, ...bank.listeningShort];
      onUpdateBank({ ...bank, listeningShort: updatedList });
    } else if (category === 'structureCompletion') {
      const newItem: SentenceCompletionItem = {
        id,
        sentence: questionText.trim(),
        options: [optA.trim(), optB.trim(), optC.trim(), optD.trim()],
        correctIndex,
        explanation: explanation.trim(),
      };
      const updatedList = editingId
        ? bank.structureCompletion.map((it) => (it.id === editingId ? newItem : it))
        : [newItem, ...bank.structureCompletion];
      onUpdateBank({ ...bank, structureCompletion: updatedList });
    } else if (category === 'structureError') {
      const newItem: ErrorRecognitionItem = {
        id,
        template: questionText.trim(),
        segments: [
          { label: 'A', text: optA.trim() },
          { label: 'B', text: optB.trim() },
          { label: 'C', text: optC.trim() },
          { label: 'D', text: optD.trim() },
        ],
        correctIndex,
        correction: correctionText.trim(),
        explanation: explanation.trim(),
      };
      const updatedList = editingId
        ? bank.structureError.map((it) => (it.id === editingId ? newItem : it))
        : [newItem, ...bank.structureError];
      onUpdateBank({ ...bank, structureError: updatedList });
    }

    resetForm();
  };

  const handleDelete = (id: string) => {
    if (category === 'listeningShort') {
      onUpdateBank({
        ...bank,
        listeningShort: bank.listeningShort.filter((it) => it.id !== id),
      });
    } else if (category === 'structureCompletion') {
      onUpdateBank({
        ...bank,
        structureCompletion: bank.structureCompletion.filter((it) => it.id !== id),
      });
    } else {
      onUpdateBank({
        ...bank,
        structureError: bank.structureError.filter((it) => it.id !== id),
      });
    }
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(bank, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'eprt-question-bank.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as EprtQuestionBank;
        if (parsed.listeningShort && parsed.structureCompletion && parsed.readingPassages) {
          onUpdateBank(parsed);
          alert('Bank soal JSON berhasil diimpor!');
        } else {
          alert('Format JSON tidak valid.');
        }
      } catch {
        alert('Gagal membaca file JSON.');
      }
    };
    reader.readAsText(file);
  };

  const q = searchQuery.toLowerCase();

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold">
              Manajemen Bank Soal EPrT® (CRUD + LocalStorage)
            </h2>
            <p className="text-xs text-slate-300">
              Tambah, ubah, hapus, atau ekspor/impor soal latihan secara langsung di browser.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => {
                setCategory('listeningShort');
                resetForm();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                category === 'listeningShort'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              Listening: Short ({bank.listeningShort.length})
            </button>
            <button
              type="button"
              onClick={() => {
                setCategory('structureCompletion');
                resetForm();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                category === 'structureCompletion'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              Structure: Completion ({bank.structureCompletion.length})
            </button>
            <button
              type="button"
              onClick={() => {
                setCategory('structureError');
                resetForm();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                category === 'structureError'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              Structure: Error ({bank.structureError.length})
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              <Download className="w-3.5 h-3.5" />
              Export JSON
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              <Upload className="w-3.5 h-3.5" />
              Import JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportJson}
              className="hidden"
            />
            <button
              type="button"
              onClick={onResetDefault}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Default
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {!isFormOpen ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari judul, teks dialog, atau kalimat soal..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={openCreateForm}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Soal Baru
                </button>
              </div>

              {/* List View */}
              <div className="space-y-2.5">
                {category === 'listeningShort' &&
                  bank.listeningShort
                    .filter(
                      (it) =>
                        it.title.toLowerCase().includes(q) ||
                        it.question.toLowerCase().includes(q)
                    )
                    .map((it) => (
                      <div
                        key={it.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-indigo-600">{it.title}</div>
                          <div className="text-sm font-medium text-slate-900">{it.question}</div>
                          <div className="text-xs text-slate-500">
                            Kunci: <strong>{['A', 'B', 'C', 'D'][it.correctIndex]}</strong> ({it.options[it.correctIndex]})
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => openEditShort(it)}
                            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(it.id)}
                            className="p-2 rounded-lg border border-slate-200 text-rose-600 hover:bg-rose-50"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                {category === 'structureCompletion' &&
                  bank.structureCompletion
                    .filter((it) => it.sentence.toLowerCase().includes(q))
                    .map((it) => (
                      <div
                        key={it.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-slate-900">{it.sentence}</div>
                          <div className="text-xs text-slate-500">
                            Kunci: <strong>{['A', 'B', 'C', 'D'][it.correctIndex]}</strong> ({it.options[it.correctIndex]})
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => openEditCompletion(it)}
                            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(it.id)}
                            className="p-2 rounded-lg border border-slate-200 text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                {category === 'structureError' &&
                  bank.structureError
                    .filter((it) => it.template.toLowerCase().includes(q))
                    .map((it) => (
                      <div
                        key={it.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-slate-900">{it.template}</div>
                          <div className="text-xs text-slate-500">
                            Salah: <strong>{['A', 'B', 'C', 'D'][it.correctIndex]}</strong> → Perbaikan: <strong>{it.correction}</strong>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => openEditError(it)}
                            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(it.id)}
                            className="p-2 rounded-lg border border-slate-200 text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
              </div>
            </>
          ) : (
            /* Create / Edit Form */
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900">
                  {editingId ? 'Edit Soal' : 'Buat Soal Baru'} ({category})
                </h3>
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Batal
                </button>
              </div>

              {category === 'listeningShort' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Judul / Topik Dialog
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Contoh: Campus Bookshop Inquiry"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Pembicara 1 ({speaker1})
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={speaker1}
                          onChange={(e) => setSpeaker1(e.target.value as SpeakerRole)}
                          className="px-2.5 py-2 rounded-xl border border-slate-200 text-xs"
                        >
                          <option value="Man">Man</option>
                          <option value="Woman">Woman</option>
                        </select>
                        <input
                          type="text"
                          required
                          value={line1}
                          onChange={(e) => setLine1(e.target.value)}
                          placeholder="Dialog baris pertama (Bahasa Inggris)..."
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Pembicara 2 ({speaker2})
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={speaker2}
                          onChange={(e) => setSpeaker2(e.target.value as SpeakerRole)}
                          className="px-2.5 py-2 rounded-xl border border-slate-200 text-xs"
                        >
                          <option value="Woman">Woman</option>
                          <option value="Man">Man</option>
                        </select>
                        <input
                          type="text"
                          required
                          value={line2}
                          onChange={(e) => setLine2(e.target.value)}
                          placeholder="Dialog balasan (Bahasa Inggris)..."
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {category === 'listeningShort'
                    ? 'Pertanyaan Narator'
                    : category === 'structureCompletion'
                    ? 'Kalimat Rumpang (gunakan _____ untuk bagian kosong)'
                    : 'Template Kalimat (gunakan {{A}}, {{B}}, {{C}}, {{D}})'}
                </label>
                <input
                  type="text"
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Opsi A', val: optA, set: setOptA },
                  { label: 'Opsi B', val: optB, set: setOptB },
                  { label: 'Opsi C', val: optC, set: setOptC },
                  { label: 'Opsi D', val: optD, set: setOptD },
                ].map((o, idx) => (
                  <div key={idx}>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {o.label}
                    </label>
                    <input
                      type="text"
                      required
                      value={o.val}
                      onChange={(e) => o.set(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kunci Jawaban Benar
                  </label>
                  <select
                    value={correctIndex}
                    onChange={(e) => setCorrectIndex(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  >
                    <option value={0}>A</option>
                    <option value={1}>B</option>
                    <option value={2}>C</option>
                    <option value={3}>D</option>
                  </select>
                </div>

                {category === 'structureError' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kata Perbaikan yang Benar
                    </label>
                    <input
                      type="text"
                      required
                      value={correctionText}
                      onChange={(e) => setCorrectionText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pembahasan (Bahasa Indonesia)
                </label>
                <textarea
                  rows={3}
                  required
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  <Save className="w-4 h-4" />
                  Simpan Soal
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
