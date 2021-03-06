export const home = '/'
export const markets = '/app/markets'
export const deposit = '/app/deposit'
export const borrow = '/app/borrow'
export const dashboard = '/app/dashboard'
export const dashboardDeposits = '/app/dashboard/deposits'
export const dashboardLoans = '/app/dashboard/loans'
export const dashboardCollateral = '/app/dashboard/collateral'
export const dashboardOldDeposits = '/app/dashboard/old-deposits'
export const dashboardOldLoans = '/app/dashboard/old-loans'
export const analytics = '/app/analytics'
export const repayment = (investorAddress: string, loanId: string) =>
  `/app/repayment/${investorAddress}/${loanId}`
export const withdrawalCollateral = (investorAddress: string, loanId: string) =>
  `/app/withdrawal/collateral/${investorAddress}/${loanId}`
export const withdrawalDeposit = (poolAddress: string) =>
  `/app/withdrawal/deposit/${poolAddress}`
export const transactions = '/app/transactions'
