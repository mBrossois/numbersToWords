import {NumberToLanguage} from "@/types/number-to-language.types";

// Lets make sure there are no errors in the logic send!
export const getErrors = (numberInput: number, library: NumberToLanguage): string | null => {
  if(languageIncluded(library)) {
    return "This language isn't included yet!"
  } else if(containsNoneNumber(numberInput)) {
    return 'Only full numbers can be translated'
  } else if(outsideBoundaries(numberInput, library)) {
    return `Out of bounds, try to add a number that's bigger or equal to ${library.min} and smaller then ${library.ceiling}`
  }

  return null
}

// Check if it's a full number
const containsNoneNumber = (numberInput: number): RegExpMatchArray | null => {
  const regex = /([^-1234567890])/g
  return numberInput.toString().match(regex)
}

// Check if it's in the bounds set in the library
const outsideBoundaries = (numberInput: number, library: NumberToLanguage): boolean => {
  return numberInput < library.min || numberInput >= library.ceiling
}

// Check if the language is included in the library
const languageIncluded = (library?: NumberToLanguage): boolean => {
  return library === undefined
}
