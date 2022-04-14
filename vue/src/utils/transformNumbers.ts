import {connectWords, numberLanguageLibrary, orderToAmount} from "@/utils/number-language.library";
import {Digit, EndWords, NumberToLanguage} from "@/types/number-to-language.types";

export function transformNumberToWord(numberInput: number, language: string): string {
  const library = numberLanguageLibrary(numberInput === 0)[language]

  const splitNumb = splitNumber(numberInput);
  const lengthOfNumbers = splitNumb.length - 1;

  let totalWord = ''
  splitNumb.forEach((numb: string, index: number) => {
    totalWord += getTotalWord(numb, library, language) + library.endWords[lengthOfNumbers - index as keyof EndWords];
  })
  return totalWord;
}

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

function getTotalWord(numb: string, library: NumberToLanguage, language: string): string {
  let word = '';
  let counter = 0
  const order = library.order.split('');

  for (let i = 0; i < order.length; i++) {

    if (i === 1 && library.exceptions[numb[1] + numb[2]]) {

      word += library.exceptions[numb[1] + numb[2]]
      return word

    } else if (order[i] === 'c' && numb[i-1] !== '0' && numb[i + 1] !== '0') {

      word += connectWords(word[word.length - 1])[language].and

    } else if(order[i] !== 'c') {

      const posNumber = order[i]
      const libraryPart = library[posNumber as keyof NumberToLanguage] as Digit
      word += libraryPart[numb[orderToAmount[posNumber]] as keyof Digit]
      counter++;

    }
  }
  return word
}
