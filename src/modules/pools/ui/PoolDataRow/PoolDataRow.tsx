import { identity } from 'lodash'
import type { SWRResponse } from 'modules/network/hooks/useSwr'
import s from './PoolDataRow.module.scss'

type Props<D> = {
  title?: React.ReactNode
  data: SWRResponse<D>
  render?: (d?: D) => React.ReactNode
}

export function PoolDataRow<D>({ title, data, render = identity }: Props<D>) {
  return (
    <div className={s.row}>
      <div className={s.rowTitle}>{title}</div>
      <div className={s.rowText}>
        {data.isLoading
          ? 'Loading...'
          : data.error
          ? 'Error'
          : render(data.data)}
      </div>
    </div>
  )
}
