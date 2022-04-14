export interface NumberToLanguage {
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

export interface EndWords {
  0: string;
  1: string;
  2: string;
  3: string;
}

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
