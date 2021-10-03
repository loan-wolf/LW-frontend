import { useState } from 'react'
import { useMount } from 'react-use'

import { Link } from 'react-router-dom'

import { StarsBg } from './StarsBg'
import { ReactComponent as Logo } from 'assets/logo.svg'
import { ReactComponent as TokenDAI } from 'assets/token-dai.svg'
import { ReactComponent as TokenUSDC } from 'assets/token-usdc.svg'
import { ReactComponent as TokenUSDT } from 'assets/token-usdt.svg'
import { ReactComponent as TokenETH } from 'assets/token-eth.svg'
import { ReactComponent as TokenWBTC } from 'assets/token-wbtc.svg'

import arrington from 'assets/arrington.png'
import chainsulting from 'assets/chainsulting.png'
import peck from 'assets/peck-shield.png'
import signum from 'assets/signum-capital.png'

import { createRoute } from 'modules/router/utils/createRoute'
import * as links from 'modules/router/links'
import s from './RouteMain.module.scss'

function RouteMain() {
  const [showStars, setShowStars] = useState(false)
  useMount(() => window.requestAnimationFrame(() => setShowStars(true)))
  return (
    <div className={s.wrap}>
      {showStars && <StarsBg className={s.stars} />}
      <div className={s.content}>
        <div className={s.contentBox}>
          <div className={s.roundBg}>
            <div className={s.roundCircle1} />
            <div className={s.roundCircle2} />
            <div className={s.roundCircle3} />
          </div>

          <div className={s.contentBoxInner}>
            <Logo className={s.logo} />

            <div className={s.title}>
              Undercollateralized
              <br /> lending protocol
            </div>

            <div className={s.tokens}>
              <div className={s.token}>
                <TokenDAI />
                <span>DAI</span>
              </div>
              <div className={s.token}>
                <TokenUSDC />
                <span>USDC</span>
              </div>
              <div className={s.token}>
                <TokenUSDT />
                <span>USDT</span>
              </div>
              <div className={s.token}>
                <TokenETH />
                <span>ETH</span>
              </div>
              <div className={s.token}>
                <TokenWBTC />
                <span>WBTC</span>
              </div>
            </div>

            <div className={s.line} />

            <div className={s.infoRow}>
              <div className={s.infoRowLabel}>BOROW from</div>
              <div className={s.infoRowValue}>12% APR</div>
              <div className={s.infoRowHint}>
                with reduced
                <br /> collateral
              </div>
            </div>

            <div className={s.line} />

            <div className={s.infoRow}>
              <div className={s.infoRowLabel}>Lend UP to</div>
              <div className={s.infoRowValue}>21% APY</div>
              <div className={s.infoRowHint} />
            </div>
          </div>
        </div>

        <Link className={s.goToApp} to={links.markets}>
          <span>Go to app</span>
        </Link>
      </div>

      <div className={s.footer}>
        <div className={s.footerSection}>
          <div className={s.footerLabel}>Backed by</div>
          <div className={s.footerRow}>
            <div
              className={s.signum}
              style={{ backgroundImage: `url('${signum}')` }}
            />
            <div
              className={s.arrington}
              style={{ backgroundImage: `url('${arrington}')` }}
            />
          </div>
        </div>

        <div className={s.footerSection}>
          <div className={s.footerLabel}>Audited by</div>
          <div className={s.footerRow}>
            <div
              className={s.chainsulting}
              style={{ backgroundImage: `url('${chainsulting}')` }}
            />
            <div
              className={s.peck}
              style={{ backgroundImage: `url('${peck}')` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const routeMain = createRoute({
  component: RouteMain,
})
