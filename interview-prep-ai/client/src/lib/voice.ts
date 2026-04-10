export interface VoiceState {
  isListening: boolean;
  transcript: string;
  isSpeaking: boolean;
}

export function speakText(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!("speechSynthesis" in window)) {
      reject(new Error("Speech Synthesis not supported"));
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      resolve();
    };

    utterance.onerror = (event) => {
      reject(new Error(`Speech synthesis error: ${event.error}`));
    };

    window.speechSynthesis.speak(utterance);
  });
}

export function startListening(
  onInterimTranscript?: (transcript: string) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      reject(new Error("Speech Recognition not supported"));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    let finalTranscript = "";
    let hasReceivedResult = false;
    let timeoutId: NodeJS.Timeout | null = null;
    let isAborted = false;

    // Set a timeout for the recognition process (15 seconds)
    // This is a safety timeout - recognition will naturally end when user stops speaking
    const startTimeout = () => {
      timeoutId = setTimeout(() => {
        if (!isAborted) {
          isAborted = true;
          recognition.abort();
          // Don't reject on timeout - let onend handle the result
        }
      }, 15000);
    };

    recognition.onstart = () => {
      startTimeout();
    };

    recognition.onresult = (event: any) => {
      hasReceivedResult = true;

      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      // Emit interim results for real-time feedback
      const currentTranscript = finalTranscript || interimTranscript;
      if (currentTranscript && onInterimTranscript) {
        onInterimTranscript(currentTranscript);
      }
    };

    recognition.onend = () => {
      // Clear timeout if still running
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Always resolve with the transcript (even if empty)
      // This allows users to proceed and type if speech recognition didn't work
      // The Interview component will handle the empty answer validation
      resolve(finalTranscript.trim());
    };

    recognition.onerror = (event: any) => {
      // Clear timeout on error
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const errorMessages: Record<string, string> = {
        "no-speech":
          "No speech detected. Please speak clearly into the microphone and try again.",
        "audio-capture":
          "No microphone found. Please check your audio input device.",
        "network":
          "Network error. Please check your internet connection.",
        "aborted": "Speech recognition was cancelled.",
        "service-not-allowed":
          "Speech recognition is not allowed. Please check your browser permissions.",
        "bad-grammar": "Grammar error in recognition. Please try again.",
        "unknown": "An unknown error occurred. Please try again.",
      };

      const errorMessage =
        errorMessages[event.error] ||
        `Speech recognition error: ${event.error}`;
      reject(new Error(errorMessage));
    };

    recognition.start();
  });
}

export function stopListening(): void {
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.abort();
  }
}

export function isSpeechRecognitionSupported(): boolean {
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;
  return !!SpeechRecognition;
}

export function isSpeechSynthesisSupported(): boolean {
  return "speechSynthesis" in window;
}

export function stopSpeaking(): void {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
