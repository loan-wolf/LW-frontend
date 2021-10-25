import { Toggle } from './Toggle'
import { withFormController } from 'shared/hocs/withFormController'

export * from './Toggle'
export * from '../SelectOptions'

export const ToggleControl = withFormController(Toggle)
