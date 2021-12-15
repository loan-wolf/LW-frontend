import cns from 'classnames'
import { orderBy } from 'lodash'
import { useState } from 'react'

import { Link } from 'shared/ui/controls/Link'
import { ReactComponent as TokenDAI } from 'assets/token-dai.svg'
import { ReactComponent as TokenUSDC } from 'assets/token-usdc.svg'
import { ReactComponent as TokenUSDT } from 'assets/token-usdt.svg'
import { ReactComponent as TokenETH } from 'assets/token-eth.svg'
import { ReactComponent as TokenWBTC } from 'assets/token-wbtc.svg'

import { ReactComponent as BorrowWBTC } from 'assets/borrow.svg'
import { ReactComponent as LendWBTC } from 'assets/lend.svg'
import { ReactComponent as Order } from 'assets/order.svg'

import { PoolAsset } from 'modules/pools/constants/poolAssets'
import * as links from 'modules/router/links'
import s from './MarketsTable.module.scss'

const data = [
  {
    name: PoolAsset.DAI,
    totalDeposit: 32.12,
    depositAPY: 19,
    totalBorrowed: 8.12,
    borrowAPR: 19,
  },
  {
    name: PoolAsset.USDC,
    totalDeposit: 123.12,
    depositAPY: 22,
    totalBorrowed: 11.42,
    borrowAPR: 14,
  },
  {
    name: PoolAsset.USDT,
    totalDeposit: 13.12,
    depositAPY: 21,
    totalBorrowed: 9.12,
    borrowAPR: 23,
  },
  // {
  //   name: PoolAsset.ETH,
  //   totalDeposit: 42.23,
  //   depositAPY: 42,
  //   totalBorrowed: 6.43,
  //   borrowAPR: 13,
  // },
  // {
  //   name: PoolAsset.WBTC,
  //   totalDeposit: 12.32,
  //   depositAPY: 32,
  //   totalBorrowed: 32.4,
  //   borrowAPR: 54,
  // },
] as const

const icons = {
  DAI: <TokenDAI />,
  USDC: <TokenUSDC />,
  USDT: <TokenUSDT />,
  ETH: <TokenETH />,
  WBTC: <TokenWBTC />,
} as const

const tableHead = [
  {
    sortField: 'name',
    title: 'Asset',
  },
  {
    sortField: 'totalDeposit',
    title: (
      <>
        Total
        <br />
        Deposited
      </>
    ),
  },
  {
    sortField: 'depositAPY',
    title: (
      <>
        Deposit
        <br />
        APy
      </>
    ),
  },
  {
    sortField: 'totalBorrowed',
    title: (
      <>
        Total
        <br />
        Borrowed
      </>
    ),
  },
  {
    sortField: 'borrowAPR',
    title: (
      <>
        Borrow
        <br />
        APR
      </>
    ),
  },
  {
    title: 'Borrow',
  },
  {
    title: 'Deposit',
  },
]

type SortHeadCellProps = {
  isActive: boolean
  onClickSort: () => void
  children: React.ReactNode
}

function SortHeadCell({ isActive, onClickSort, children }: SortHeadCellProps) {
  return (
    <td
      className={cns(s.sortHeadCell, { [s.isActive]: isActive })}
      onClick={onClickSort}
    >
      <div className={s.sortHeadCellInner}>
        <div className={s.sortHeadCellLabel}>{children}</div>
        <div className={s.sortHeadControl}>
          <Order />
        </div>
      </div>
    </td>
  )
}

export function MarketsTable() {
  const [[sortBy, sortDesc], setSortBy] = useState<
    [string | null, number | null]
  >([null, null])

  const sortedData =
    sortBy === null
      ? data
      : orderBy(data, sortBy, sortDesc === 1 ? 'desc' : 'asc')

  return (
    <table className={s.marketsTable}>
      <thead>
        <tr>
          {tableHead.map((h, i) =>
            h.sortField ? (
              <SortHeadCell
                isActive={sortBy === h.sortField}
                onClickSort={() =>
                  setSortBy([
                    h.sortField,
                    sortBy === h.sortField ? Number(sortDesc) * -1 : 1,
                  ])
                }
                key={i}
              >
                {h.title}
              </SortHeadCell>
            ) : (
              <td key={i}>{h.title}</td>
            ),
          )}
        </tr>
      </thead>

      <tbody>
        {sortedData.map((row, i) => (
          <tr key={i}>
            <td>
              <div className={s.token}>
                {icons[row.name]}
                <span>{row.name}</span>
              </div>
            </td>
            <td>${row.totalDeposit}M</td>
            <td>
              <span className={s.faded}>UP TO</span> {row.depositAPY}%
            </td>
            <td>${row.totalBorrowed}M</td>
            <td>
              <span className={s.faded}>FROM</span> {row.borrowAPR}%
            </td>
            <td>
              {/* TODO: Add pool info to link when pools data will be real */}
              <Link to={`${links.borrow}?asset=${row.name}`}>
                <BorrowWBTC className={s.borrowIcon} />
              </Link>
            </td>
            <td>
              {/* TODO: Add pool info to link when pools data will be real */}
              <Link to={`${links.deposit}?asset=${row.name}`}>
                <LendWBTC className={s.lendIcon} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
