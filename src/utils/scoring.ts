import { AnswerMap, EprtQuestionBank } from '../types/eprt';

export interface SectionScoreDetail {
  correct: number;
  total: number;
  converted: number; // 31 - 68 scale
}

export interface EprtScoreReport {
  listening: SectionScoreDetail;
  structure: SectionScoreDetail;
  reading: SectionScoreDetail;
  totalScore: number; // 310 - 677 scale
  answeredCount: number;
  totalQuestions: number;
}

function toSectionScale(correct: number, total: number): number {
  if (total === 0) return 31;
  const ratio = correct / total;
  return Math.round(31 + ratio * (68 - 31));
}

export function calculateEprtScore(bank: EprtQuestionBank, answers: AnswerMap): EprtScoreReport {
  // Listening
  let lTotal = 0;
  let lCorrect = 0;
  bank.listeningShort.forEach((item) => {
    lTotal++;
    if (answers[item.id] === item.correctIndex) lCorrect++;
  });
  bank.listeningLong.forEach((group) => {
    group.questions.forEach((q) => {
      lTotal++;
      if (answers[q.id] === q.correctIndex) lCorrect++;
    });
  });
  bank.listeningLecture.forEach((lec) => {
    lec.questions.forEach((q) => {
      lTotal++;
      if (answers[q.id] === q.correctIndex) lCorrect++;
    });
  });

  // Structure
  let sTotal = 0;
  let sCorrect = 0;
  bank.structureCompletion.forEach((item) => {
    sTotal++;
    if (answers[item.id] === item.correctIndex) sCorrect++;
  });
  bank.structureError.forEach((item) => {
    sTotal++;
    if (answers[item.id] === item.correctIndex) sCorrect++;
  });

  // Reading
  let rTotal = 0;
  let rCorrect = 0;
  bank.readingPassages.forEach((passage) => {
    passage.questions.forEach((q) => {
      rTotal++;
      if (answers[q.id] === q.correctIndex) rCorrect++;
    });
  });

  const lConv = toSectionScale(lCorrect, lTotal);
  const sConv = toSectionScale(sCorrect, sTotal);
  const rConv = toSectionScale(rCorrect, rTotal);

  const totalScore = Math.round(((lConv + sConv + rConv) / 3) * 10);
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = lTotal + sTotal + rTotal;

  return {
    listening: { correct: lCorrect, total: lTotal, converted: lConv },
    structure: { correct: sCorrect, total: sTotal, converted: sConv },
    reading: { correct: rCorrect, total: rTotal, converted: rConv },
    totalScore,
    answeredCount,
    totalQuestions,
  };
}
