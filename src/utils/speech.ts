import { DialogueLine, SpeakerRole } from '../types/eprt';

class SpeechController {
  private isCancelled = false;

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public stop(): void {
    this.isCancelled = true;
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  private pickVoice(speaker: SpeakerRole): SpeechSynthesisVoice | null {
    if (!this.isSupported()) return null;
    const voices = window.speechSynthesis.getVoices();
    const enVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
    if (enVoices.length === 0) return null;

    const femaleHints = ['female', 'zira', 'samantha', 'victoria', 'aria', 'jenny', 'google us english', 'karen'];
    const maleHints = ['male', 'david', 'mark', 'daniel', 'alex', 'guy', 'christopher', 'google uk english male'];

    if (speaker === 'Woman') {
      return (
        enVoices.find((v) => femaleHints.some((h) => v.name.toLowerCase().includes(h))) ||
        enVoices[0]
      );
    }
    if (speaker === 'Man' || speaker === 'Speaker') {
      return (
        enVoices.find((v) => maleHints.some((h) => v.name.toLowerCase().includes(h))) ||
        enVoices[Math.min(1, enVoices.length - 1)]
      );
    }
    // Narrator
    return (
      enVoices.find((v) => v.name.toLowerCase().includes('uk') || v.name.toLowerCase().includes('daniel')) ||
      enVoices[0]
    );
  }

  private speakSingle(text: string, speaker: SpeakerRole, rate: number): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isSupported() || this.isCancelled) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      const voice = this.pickVoice(speaker);
      if (voice) {
        utterance.voice = voice;
      }

      if (speaker === 'Woman') {
        utterance.pitch = 1.15;
        utterance.rate = rate;
      } else if (speaker === 'Man') {
        utterance.pitch = 0.92;
        utterance.rate = rate;
      } else if (speaker === 'Speaker') {
        utterance.pitch = 0.96;
        utterance.rate = rate * 0.97;
      } else {
        utterance.pitch = 1.02;
        utterance.rate = rate * 0.98;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    });
  }

  private pause(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async playSequence(
    lines: DialogueLine[],
    rate: number,
    onSpeakerChange?: (index: number | null, speaker: SpeakerRole | null) => void
  ): Promise<void> {
    this.stop();
    this.isCancelled = false;

    for (let i = 0; i < lines.length; i++) {
      if (this.isCancelled) break;
      const line = lines[i];
      onSpeakerChange?.(i, line.speaker);
      await this.speakSingle(line.text, line.speaker, rate);
      if (this.isCancelled) break;
      await this.pause(320);
    }

    onSpeakerChange?.(null, null);
  }

  public testAudio(rate: number): Promise<void> {
    return this.playSequence(
      [
        { speaker: 'Narrator', text: 'Audio check. Ready for your English Proficiency Test.' },
        { speaker: 'Woman', text: 'Hello! Can you hear my voice clearly?' },
        { speaker: 'Man', text: 'Yes, loud and clear. Good luck on your test!' },
      ],
      rate
    );
  }
}

export const speechController = new SpeechController();
