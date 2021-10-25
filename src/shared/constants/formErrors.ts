export const required = 'This field is required'

export const notLess = (val: string | number, test: number) =>
  Number(val) < test ? `Can not be less than ${val}` : false

export const notMore = (val: string | number, test: number) =>
  Number(val) > test ? `Can not be greater than ${val}` : false
