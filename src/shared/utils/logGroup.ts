import { toPairs } from 'lodash'

export function logGroup(title: string, fields: Record<string, any>) {
  console.group(title)
  toPairs(fields).forEach(([key, value]) => console.info(`${key}:`, value))
  ;(console.groupEnd as any)(title)
}
