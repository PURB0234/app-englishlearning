export type SectionKey = 'listening' | 'structure' | 'reading';

export type ListeningPartKey = 'short' | 'long' | 'lecture';

export type StructurePartKey = 'completion' | 'error';

export type SpeakerRole = 'Man' | 'Woman' | 'Narrator' | 'Speaker';

export interface DialogueLine {
  speaker: SpeakerRole;
  text: string;
}

export interface SubQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  paragraphRef?: number;
}

export interface ShortDialogueItem {
  id: string;
  title: string;
  dialogue: DialogueLine[];
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface LongDialogueItem {
  id: string;
  title: string;
  context: string;
  dialogue: DialogueLine[];
  questions: SubQuestion[];
}

export interface LectureItem {
  id: string;
  title: string;
  topic: string;
  transcript: string;
  questions: SubQuestion[];
}

export interface SentenceCompletionItem {
  id: string;
  sentence: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface ErrorSegment {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface ErrorRecognitionItem {
  id: string;
  /** Full sentence using {{A}}, {{B}}, {{C}}, {{D}} placeholders for underlined parts */
  template: string;
  segments: [ErrorSegment, ErrorSegment, ErrorSegment, ErrorSegment];
  correctIndex: number;
  correction: string;
  explanation: string;
}

export interface ReadingPassageItem {
  id: string;
  title: string;
  category: string;
  paragraphs: string[];
  questions: SubQuestion[];
}

export interface EprtQuestionBank {
  listeningShort: ShortDialogueItem[];
  listeningLong: LongDialogueItem[];
  listeningLecture: LectureItem[];
  structureCompletion: SentenceCompletionItem[];
  structureError: ErrorRecognitionItem[];
  readingPassages: ReadingPassageItem[];
}

export type AnswerMap = Record<string, number>;

export type ExamMode = 'practice' | 'exam';
