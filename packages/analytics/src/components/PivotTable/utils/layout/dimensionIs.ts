import {DIMENSION_PROP_ID} from './dimension'

export const dimensionIs = (dimension: string, dimensionId: string | undefined) =>
    dimension[DIMENSION_PROP_ID.name] === dimensionId
