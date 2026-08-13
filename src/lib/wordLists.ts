// Common English words, ranked by frequency, lowercase only. Used for the "words" content mode.
export const COMMON_WORDS: string[] = [
  "the", "of", "and", "a", "to", "in", "is", "you", "that", "it", "he", "was", "for", "on", "are", "as",
  "with", "his", "they", "i", "at", "be", "this", "have", "from", "or", "one", "had", "by", "word", "but",
  "not", "what", "all", "were", "we", "when", "your", "can", "said", "there", "use", "an", "each", "which",
  "she", "do", "how", "their", "if", "will", "up", "other", "about", "out", "many", "then", "them", "these",
  "so", "some", "her", "would", "make", "like", "him", "into", "time", "has", "look", "two", "more", "write",
  "go", "see", "number", "no", "way", "could", "people", "my", "than", "first", "water", "been", "call",
  "who", "oil", "its", "now", "find", "long", "down", "day", "did", "get", "come", "made", "may", "part",
  "over", "new", "sound", "take", "only", "little", "work", "know", "place", "year", "live", "me", "back",
  "give", "most", "very", "after", "thing", "our", "just", "name", "good", "sentence", "man", "think", "say",
  "great", "where", "help", "through", "much", "before", "line", "right", "too", "mean", "old", "any", "same",
  "tell", "boy", "follow", "came", "want", "show", "also", "around", "form", "three", "small", "set", "put",
  "end", "why", "again", "turn", "here", "off", "went", "old", "number", "great", "tell", "men", "say",
  "small", "every", "found", "still", "between", "mane", "should", "home", "big", "give", "air", "line",
  "set", "own", "under", "read", "last", "never", "us", "left", "end", "along", "while", "might", "next",
  "sound", "below", "saw", "something", "thought", "both", "few", "those", "always", "looked", "show",
  "large", "often", "together", "asked", "house", "don't", "world", "going", "want", "school", "important",
  "until", "form", "food", "keep", "children", "feet", "land", "side", "without", "boy", "once", "animal",
  "life", "enough", "took", "sometimes", "four", "head", "above", "kind", "began", "almost", "live", "page",
  "got", "earth", "need", "far", "hand", "high", "year", "mother", "light", "country", "father", "let",
  "night", "picture", "being", "study", "second", "book", "carry", "science", "eat", "room", "friend",
  "began", "idea", "fish", "mountain", "north", "once", "base", "hear", "horse", "cut", "sure", "watch",
  "color", "face", "wood", "main", "open", "seem", "together", "next", "white", "children", "begin",
];

interface Quote {
  text: string;
  source?: string;
}

export const QUOTES: Quote[] = [
  {
    text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
  },
  {
    text: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.",
    source: "Charles Dickens",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  },
  {
    text: "In the middle of every difficulty lies opportunity. The person who moves a mountain begins by carrying away small stones.",
  },
  {
    text: "Whether you think you can or you think you can't, you're right. The mind is the limit, and it knows no bounds.",
  },
  {
    text: "Typing quickly means nothing if the words on the screen do not say what you meant. Speed without accuracy is just noise.",
  },
  {
    text: "A keyboard is a simple machine with dozens of moving parts, each one a small lever waiting to be pressed with intent.",
  },
  {
    text: "The mechanical keyboard hobby began as a way to make typing feel tactile again, a small rebellion against flat glass screens.",
  },
  {
    text: "Practice does not make perfect. Only perfect practice makes perfect, and perfect practice takes patience most people skip.",
  },
  {
    text: "Every expert was once a beginner who refused to give up when the results were slow and the progress felt invisible.",
  },
];

export function buildWordSample(count: number, seedOffset = 0): string[] {
  const words: string[] = [];
  const poolSize = COMMON_WORDS.length;
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(pseudoRandom(i + seedOffset) * poolSize);
    words.push(COMMON_WORDS[idx]);
  }
  return words;
}

export function randomQuote(seedOffset = 0): Quote {
  const idx = Math.floor(pseudoRandom(seedOffset) * QUOTES.length);
  return QUOTES[idx];
}

// Deterministic-enough pseudo-random so server/client renders can agree when a seed is fixed,
// while still varying between attempts when the caller passes Date.now() as the offset.
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
