import {ConnectWords, NumberToLanguage} from "@/types/number-to-language.types";

// Get the library for the number to words, `isZero` is true if the total value of the number is zero
export const numberLanguageLibrary = (isZero: boolean): { [key: string]: NumberToLanguage } => {
  return {
    'EN':
      {
        order: 'HcTD',
        min: 0,
        ceiling: 1000000000000,
        endWords: {
          0: '',
          1: 'thousand ',
          2: 'million ',
          3: 'billion '
        },
        D: {
          '1': 'one',
          '2': 'two',
          '3': 'three',
          '4': 'four',
          '5': 'five',
          '6': 'six',
          '7': 'seven',
          '8': 'eight',
          '9': 'nine',
          '0': isZero ? 'zero' : '',
        },
        T: {
          '1': 'ten',
          '2': 'twenty',
          '3': 'thirty',
          '4': 'forty',
          '5': 'fifty',
          '6': 'sixty',
          '7': 'seventy',
          '8': 'eighty',
          '9': 'ninety',
          '0': ''
        },
        H: {
          '1': 'onehundred',
          '2': 'twohundred',
          '3': 'threehundred',
          '4': 'forhundred',
          '5': 'fivehundred',
          '6': 'sixhundred',
          '7': 'sevenhundred',
          '8': 'eighthundred',
          '9': 'ninehundred',
          '0': ''
        },
        exceptions: {
          '11': 'eleven',
          '12': 'twelve',
          '13': 'thirteen',
          '14': 'fourteen',
          '15': 'fifteen',
          '16': 'sixteen',
          '17': 'seventeen',
          '18': 'eighteen',
          '19': 'nineteen',
        }
      },
    'NL': {
      order: 'HDcT',
      endWords: {
        0: '',
        1: 'duizend ',
        2: 'miljoen ',
        3: 'biljoen ',
      },
      min: 0,
      ceiling: 1000000000000,
      D: {
        '1': 'een',
        '2': 'twee',
        '3': 'drie',
        '4': 'vier',
        '5': 'vijf',
        '6': 'zes',
        '7': 'zeven',
        '8': 'acht',
        '9': 'negen',
        '0': isZero ? 'nul' : '',
      },
      T: {
        '1': 'tien',
        '2': 'twintig',
        '3': 'dertig',
        '4': 'veertig',
        '5': 'vijftig',
        '6': 'zestig',
        '7': 'zeventig',
        '8': 'tachtig',
        '9': 'negentig',
        '0': ''
      },
      H: {
        '1': 'honderd',
        '2': 'tweehonderd',
        '3': 'driehonderd',
        '4': 'vierhonderd',
        '5': 'vijfhonderd',
        '6': 'zeshonderd',
        '7': 'zevenhonderd',
        '8': 'achthonderd',
        '9': 'negenhonderd',
        '0': ''
      },
      exceptions: {
        '11': 'elf',
        '12': 'twaalf',
        '13': 'dertien',
        '14': 'veertien',
        '15': 'vijftien',
        '16': 'zestien',
        '17': 'zeventien',
        '18': 'achtien',
        '19': 'negentien',
      }
    }
  }
}

export const connectWords = (lastLetter: string): {[key: string]: ConnectWords} => {
  return {
    'NL': {
      and: lastLetter === 'e' ? '??n' : 'en' ,
    },
    'EN': {
      and: 'and'
    }
  }
}

// Is used to get the position of the number, which is supposed to be translated
export const orderToAmount: {[key: string]: number} = {
  'H': 0,
  'T': 1,
  'D': 2
}
