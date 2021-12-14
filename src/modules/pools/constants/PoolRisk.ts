export enum PoolRisk {
  LOW = 'LOW',
  MIDDLE = 'MIDDLE',
  HIGH = 'HIGH',
}

export const RISK_OPTIONS = {
  [PoolRisk.LOW]: (apy: string | number) => ({
    label: `Low / ${apy}% APY`,
    value: PoolRisk.LOW,
  }),

  [PoolRisk.MIDDLE]: (apy: string | number) => ({
    label: `Middle / ${apy}% APY`,
    value: PoolRisk.MIDDLE,
  }),

  [PoolRisk.HIGH]: (apy: string | number) => ({
    label: `High / ${apy}% APY`,
    value: PoolRisk.HIGH,
  }),
} as const

export const getRiskOption = (risk: PoolRisk, apy: string | number) =>
  RISK_OPTIONS[risk](apy)
