export const trimMiddleString = (string: string, symbols: number): string => {
  if (symbols <= 0) return ''
  if (symbols * 2 >= string.length) return string

  const left = string.slice(0, symbols)
  const right = string.slice(-symbols)

  return `${left}...${right}`
}
