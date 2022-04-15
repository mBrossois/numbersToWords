import {connectWords, numberLanguageLibrary, orderToAmount} from "@/utils/number-language.library";
import {Digit, EndWords, NumberToLanguage} from "@/types/number-to-language.types";
import {getErrors} from "@/utils/errors.utils";

export function transformNumberToWord(numberInput: number, language: string): string {
  // Get library based on language and see if the value is zero
  const library = numberLanguageLibrary(numberInput === 0)[language]

  const errors = getErrors(numberInput, library)
  if(errors) {
    return errors
  }

  // Splitting it in hundreds
  const splitNumb = splitNumber(numberInput);
  const lengthOfNumbers = splitNumb.length - 1;

  let totalWord = ''

  // Loop through split numbers as hundreds and translate it to text!
  splitNumb.forEach((numb: string, index: number) => {
    totalWord += getTotalWord(numb, library, language) + library.endWords[lengthOfNumbers - index as keyof EndWords];
  })
  return totalWord;
}

// Splits the number in hundreds like [102, 301], a hundred always act the same
function splitNumber(numberInput: number): string[] {
  // Transform to string to use length
  const numberToString = numberInput.toString();

  // Get the length of numbers that should be split of the first part
  const lengthFirstWord: number = numberToString.length % 3;

  const splitWords = [];
  // Get first part and fill up the empty parts with 0
  if (lengthFirstWord > 0) {
    const firstNumber = fillWithZero(3 - lengthFirstWord) + numberToString.substring(0, lengthFirstWord)
    splitWords.push(firstNumber)
  }

  //Get all the other parts by hundreds
  for (let i = lengthFirstWord; i < numberToString.length; i += 3) {
    splitWords.push(numberToString.substring(i, i + 3));
  }

  return splitWords

}

// Fill up function, so every part contains 3 numbers
function fillWithZero(amountOfZero: number): string {
  let zeroAmount = ''
  for (let i = 0; i < amountOfZero; i++) {
    zeroAmount += '0'
  }
  return zeroAmount;
}

// This translate an amount of 3 numbers to text
function getTotalWord(numb: string, library: NumberToLanguage, language: string): string {
  let word = '';
  // Counter for calculating the pos of the number, since order is longer then that
  let counter = 0
  const order = library.order.split('');

  // Loop through whole number
  for (let i = 0; i < order.length; i++) {
    // if an exception for number with two digits is defined in the library, it will return the exception plus the previous letter
    if (i === 1 && library.exceptions[numb[1] + numb[2]]) {

      word += library.exceptions[numb[1] + numb[2]]
      return word

    // Check if it the next one in order is supposed to be a connector and it should be displayed
    } else if (order[i] === 'c' && numb[i-1] !== '0' && numb[i + 1] !== '0') {

      word += connectWords(word[word.length - 1])[language].and

    // If it isn't supposed to be a connector, translate number to word and add it to the total
    } else if(order[i] !== 'c') {

      const posNumber = order[i]
      const libraryPart = library[posNumber as keyof NumberToLanguage] as Digit
      word += libraryPart[numb[orderToAmount[posNumber]] as keyof Digit]
      counter++;

    }
  }
  return word
}
