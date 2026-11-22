import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_QUESTION_BANK } from './data/defaultQuestions';
import { AnswerMap, EprtQuestionBank, ExamMode, SectionKey } from './types/eprt';
import { calculateEprtScore } from './utils/scoring';
import { Navbar } from './components/Navbar';
import { ListeningSection } from './components/ListeningSection';
import { StructureSection } from './components/StructureSection';
import { ReadingSection } from './components/ReadingSection';
import { CrudManagerModal } from './components/CrudManagerModal';
import { ScoreModal } from './components/ScoreModal';

const STORAGE_BANK_KEY = 'eprt_question_bank_v1';
const STORAGE_ANSWERS_KEY = 'eprt_user_answers_v1';

export function App() {
  const [questionBank, setQuestionBank] = useState<EprtQuestionBank>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BANK_KEY);
      if (saved) return JSON.parse(saved) as EprtQuestionBank;
    } catch {
      // Fallback to default bank
    }
    return DEFAULT_QUESTION_BANK;
  });

  const [answers, setAnswers] = useState<AnswerMap>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ANSWERS_KEY);
      if (saved) return JSON.parse(saved) as AnswerMap;
    } catch {
      // Fallback empty
    }
    return {};
  });

  const [activeSection, setActiveSection] = useState<SectionKey>('listening');
  const [examMode, setExamMode] = useState<ExamMode>('practice');
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isCrudModalOpen, setIsCrudModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BANK_KEY, JSON.stringify(questionBank));
    } catch {
      // Ignore storage quota errors
    }
  }, [questionBank]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ANSWERS_KEY, JSON.stringify(answers));
    } catch {
      // Ignore storage quota errors
    }
  }, [answers]);

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleResetAnswers = () => {
    setAnswers({});
    localStorage.removeItem(STORAGE_ANSWERS_KEY);
  };

  const handleResetDefaultBank = () => {
    setQuestionBank(DEFAULT_QUESTION_BANK);
    localStorage.removeItem(STORAGE_BANK_KEY);
  };

  const scoreReport = useMemo(
    () => calculateEprtScore(questionBank, answers),
    [questionBank, answers]
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        examMode={examMode}
        onToggleExamMode={setExamMode}
        totalScore={scoreReport.totalScore}
        answeredCount={scoreReport.answeredCount}
        totalQuestions={scoreReport.totalQuestions}
        onOpenScoreModal={() => setIsScoreModalOpen(true)}
        onOpenCrudModal={() => setIsCrudModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeSection === 'listening' && (
          <ListeningSection
            shortItems={questionBank.listeningShort}
            longItems={questionBank.listeningLong}
            lectureItems={questionBank.listeningLecture}
            answers={answers}
            onSelectAnswer={handleSelectAnswer}
            examMode={examMode}
          />
        )}

        {activeSection === 'structure' && (
          <StructureSection
            completionItems={questionBank.structureCompletion}
            errorItems={questionBank.structureError}
            answers={answers}
            onSelectAnswer={handleSelectAnswer}
          />
        )}

        {activeSection === 'reading' && (
          <ReadingSection
            passages={questionBank.readingPassages}
            answers={answers}
            onSelectAnswer={handleSelectAnswer}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 px-4 text-center text-xs text-slate-500">
        EPrT® Interactive Learning & Simulation Suite • Built with React, TypeScript & Tailwind CSS
      </footer>

      <ScoreModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        report={scoreReport}
        onResetAnswers={handleResetAnswers}
      />

      <CrudManagerModal
        isOpen={isCrudModalOpen}
        onClose={() => setIsCrudModalOpen(false)}
        bank={questionBank}
        onUpdateBank={setQuestionBank}
        onResetDefault={handleResetDefaultBank}
      />
    </div>
  );
}

export default App;
