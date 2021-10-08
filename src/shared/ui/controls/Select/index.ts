import { Select } from './Select'
import { withFormController } from 'shared/hocs/withFormController'

export * from './Select'
export * from '../SelectOptions'

export const SelectControl = withFormController(Select)
