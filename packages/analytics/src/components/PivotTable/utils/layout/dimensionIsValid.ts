import {DIMENSION, DIMENSION_PROPS} from './dimension'
import {dimensionIsEmpty} from './dimensionIsEmpty'

export const dimensionIsValid = (dimension: { [x: string]: any }, {requireItems}: { requireItems?: boolean } = {}) => {
    if (!DIMENSION.isValid(dimension)) {
        return false
    }

    const requiredProps = DIMENSION_PROPS.filter((prop: { required: any }) => prop.required)

    if (!requiredProps.every((prop: { isValid: (arg0: any) => any; name: string | number }) => prop.isValid(dimension[prop.name]))) {
        return false
    }

    if (requireItems === true && dimensionIsEmpty(dimension)) {
        return false
    }

    return true
}
