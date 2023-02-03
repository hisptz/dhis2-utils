import {DIMENSION_PROP_ID, DIMENSION_PROP_PROGRAM_STAGE} from './dimension'

export const dimensionGetId = (dimension: { [x: string]: any }) =>
    dimension[DIMENSION_PROP_PROGRAM_STAGE.name]?.id
        ? `${dimension[DIMENSION_PROP_PROGRAM_STAGE.name].id}.${
              dimension[DIMENSION_PROP_ID.name]
          }`
        : dimension[DIMENSION_PROP_ID.name]
