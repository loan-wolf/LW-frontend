export const targetRiskOptions = [
  { label: 'Low / 12% APY', value: '12' },
  { label: 'Middle / 15% APY', value: '15' },
  { label: 'High / 18% APY', value: '18' },
]

export const getTargetRiskLabel = (val: string) =>
  targetRiskOptions.find(o => o.value === val)?.label
