// Setup for number to language in the library
export interface NumberToLanguage {
  // Order decides the order the number is supposed to translate in D = digit, T = ten, H = hundred, c = connector
  order: string
  endWords: EndWords
  D: Digit
  T: Digit
  H: Digit
  exceptions: {[key: string]: string}
}

export interface ConnectWords {
  and: string
}

// The words that come after an amount of hundred has been returned (thousand, million)
export interface EndWords {
  0: string;
  1: string;
  2: string;
  3: string;
}

// Setup for Digit/Ten/Hundred
export interface Digit {
  '1': string
  '2': string
  '3': string
  '4': string
  '5': string
  '6': string
  '7': string
  '8': string
  '9': string
  '0': string
}
