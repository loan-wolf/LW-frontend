import type { Investor } from 'generated'
import type { UnpackedPromise } from 'shared/utils/utilTypes'

export type Loan = UnpackedPromise<ReturnType<Investor['loanLookup']>>
