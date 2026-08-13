export interface KeystrokeEvent {
  /** performance.now() timestamp */
  t: number;
  /** whether the character typed at this position was correct */
  correct: boolean;
}

export interface WpmResult {
  netWpm: number;
  rawWpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalTyped: number;
  elapsedMinutes: number;
}

/**
 * Net WPM: (all typed chars / 5 - uncorrected errors) / minutes.
 * Raw WPM: all typed chars / 5 / minutes, ignoring errors.
 */
export function computeWpm(
  totalTyped: number,
  uncorrectedErrors: number,
  elapsedMs: number
): WpmResult {
  const elapsedMinutes = Math.max(elapsedMs / 60000, 1 / 60000);
  const rawWpm = totalTyped / 5 / elapsedMinutes;
  const netWpm = Math.max(0, (totalTyped / 5 - uncorrectedErrors) / elapsedMinutes);
  const correctChars = totalTyped - uncorrectedErrors;
  const accuracy = totalTyped > 0 ? (correctChars / totalTyped) * 100 : 100;

  return {
    netWpm: round(netWpm),
    rawWpm: round(rawWpm),
    accuracy: round(accuracy),
    correctChars,
    incorrectChars: uncorrectedErrors,
    totalTyped,
    elapsedMinutes,
  };
}

function round(n: number): number {
  return Math.round(n * 10) / 10;
}
