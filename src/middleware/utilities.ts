export const getDigits = (number: string) => {
  return number.replace(/\D/g, '')
}

export const checkPhone = (number: string) => {
  number = getDigits(number)!
  if (number.length === 11 && number.charAt(0).match('7'))
    return true

  else
    return false
}

export const prettifyNumber = (number: string) => {
  return ref(`+${number.charAt(0)}-(${number.substring(1, 5)})-${number.substring(5, 7)}-${number.substring(7, 9)}-${number.substring(9, 11)}`)
}
