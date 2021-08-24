import ReactDOM from 'react-dom'
import { AppRoot } from './modules/appRoot/AppRoot'
import { getLSTheme, loadThemeColors } from 'modules/themes/loadTheme'

loadThemeColors(getLSTheme())

ReactDOM.render(<AppRoot />, document.getElementById('root'))
