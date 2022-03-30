export const palindrome = (string) => {
  return string.split('').reverse().join('')
}

export const average = (array) => {
  const result =
    array.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    ) / array.length

  return Number.isNaN(result) ? 0 : result
}
