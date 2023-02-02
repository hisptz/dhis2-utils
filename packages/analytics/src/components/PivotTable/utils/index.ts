import {getOuLevelAndGroupText} from './getOuLevelAndGroupText'
import {dimensionGetItems} from './layout/dimensionGetItems'
import {dimensionIs} from './layout/dimensionIs'
import {ouIdHelper} from './ouIdHelper'
import {DIMENSION_ID_ORGUNIT} from '../constants/predefinedDimensions'

import {
    CLIPPED_CELL_MAX_SIZE,
    NUMBER_TYPE_COLUMN_PERCENTAGE,
    NUMBER_TYPE_ROW_PERCENTAGE,
    WRAPPED_TEXT_JUSTIFY_BUFFER,
    WRAPPED_TEXT_LINE_HEIGHT,
} from '../constants/pivotTable'
import {isNumericValueType} from '../constants/valueTypes'
import {colors} from '@dhis2/ui'
import {
    getColorByValueFromLegendSet,
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    LEGEND_DISPLAY_STRATEGY_FIXED,
    LEGEND_DISPLAY_STYLE_FILL,
    LEGEND_DISPLAY_STYLE_TEXT,
} from './legend'
import {isColorBright} from './isColorBright.js'

export const parseValue = (valueString: string) => {
    const parsedValue = parseFloat(valueString)
    if (isNaN(parsedValue)) {
        return valueString
    }
    return parsedValue
}

let canvas: HTMLCanvasElement

const getContext = (fontSize: number) => {
    if (!canvas) {
        canvas = document.createElement('canvas')
    }
    const ctx = canvas.getContext('2d')
    ctx.font = `${fontSize}px Roboto, Arial, sans-serif`

    return ctx
}

const measureText = (text: string, fontSize = 11) => {
    const ctx = getContext(fontSize)

    const textMetrics = ctx.measureText(text)
    return textMetrics.width
}

export const measureTextWithWrapping = (
    text: string,
    {
        fontSize = 11,
        maxWidth = CLIPPED_CELL_MAX_SIZE,
        justifyBuffer = WRAPPED_TEXT_JUSTIFY_BUFFER,
        lineHeight = WRAPPED_TEXT_LINE_HEIGHT,
    }: any
) => {
    if (!text) {
        return {width: 0, height: 0}
    }
    // Multiple consecutive linebreaks are combined into one
    const paragraphs = String(text).split(/\n/)

    const lines = []
    let currentLine = ''
    let currentLineWidth = 0
    let maxLineWidth = 0
    while (paragraphs.length) {
        // Currently, all different whitespace types are ignored and assumed to be just a space
        const words = paragraphs.shift()?.split(/\s+/) ?? []
        while (words.length) {
            const nextWord = (currentLineWidth === 0 ? '' : ' ') + words.shift()
            const nextWordWidth = measureText(nextWord, fontSize)
            if (maxWidth && currentLineWidth + nextWordWidth > maxWidth) {
                if (currentLineWidth <= maxWidth - justifyBuffer) {
                    // Wrapping this word would cause an unnaturally short line
                    // For now we allow the cell to expand to fit this word
                    // In the future, we might intelligently hyphenate the word
                    // TODO: if splitting words how would we localize hyphens?
                    // Do nothing, keep the word on this line
                } else {
                    maxLineWidth = Math.max(currentLineWidth, maxLineWidth)
                    lines.push(currentLine)
                    currentLine = ''
                    currentLineWidth = 0

                    words.unshift(nextWord.substring(1)) // Get rid of the extra space
                    continue
                }
            }
            currentLine += nextWord
            currentLineWidth += nextWordWidth
        }
        if (currentLineWidth > 0) {
            maxLineWidth = Math.max(currentLineWidth, maxLineWidth)
            lines.push(currentLine)
        }
    }

    return {
        normalizedText: lines.join('\n'),
        width: maxLineWidth,
        height: lines.length * fontSize * lineHeight, // TODO: use lineHeight=1 for last line?
    }
}


const trimTrailingZeros = (stringValue) => stringValue.replace(/\.?0+$/, '')

const decimalSeparator = '.'

const separateDigitGroups = (stringValue, decimalSeparator) => {
    const isNegative = stringValue[0] === '-'
    const [integer, remainder] = stringValue.replace(/^-/, '').split('.')

    const groups = []
    for (let i = integer.length; i > 0; i -= 3) {
        groups.unshift(integer.substring(i - 3, i))
    }

    if (isNegative) {
        groups[0] = '-' + groups[0]
    }

    if (remainder) {
        const trimmedRemainder = trimTrailingZeros(remainder)
        if (trimmedRemainder.length) {
            groups[groups.length - 1] += decimalSeparator + remainder
        }
    }

    return groups
}

const getSeparator = (visualization) => {
    switch (visualization.digitGroupSeparator) {
        case 'SPACE':
            return ' '
        case 'COMMA':
            return ','
        case 'NONE':
        default:
            return ''
    }
}

const toFixedPrecisionString = (value, skipRounding) => {
    if (typeof value !== 'number') {
        // Values returned from the server should keep their string representation
        return value
    }

    const precision = skipRounding ? 10 : value > -1 && value < 1 ? 2 : 1

    return value.toFixed(precision)
}

export const renderValue = (value, valueType, visualization) => {
    if (!isNumericValueType(valueType) || value === undefined) {
        return String(value).replace(/[^\S\n]+/, ' ')
    }

    if (
        visualization.numberType === NUMBER_TYPE_ROW_PERCENTAGE ||
        visualization.numberType === NUMBER_TYPE_COLUMN_PERCENTAGE
    ) {
        const stringValue = trimTrailingZeros(
            toFixedPrecisionString(value * 100, visualization.skipRounding)
        )

        return (
            separateDigitGroups(stringValue, decimalSeparator).join(
                getSeparator(visualization)
            ) + '%'
        )
    } else {
        const stringValue = toFixedPrecisionString(
            value,
            visualization.skipRounding
        )

        return separateDigitGroups(stringValue, decimalSeparator).join(
            getSeparator(visualization)
        )
    }
}


const getLegendSet = (engine, dxDimension) => {
    let legendSetId
    switch (engine.visualization.legend?.strategy) {
        case LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM:
            if (dxDimension && dxDimension.legendSet) {
                legendSetId = dxDimension.legendSet
            }
            break
        case LEGEND_DISPLAY_STRATEGY_FIXED:
        default:
            legendSetId = engine.visualization.legend?.set?.id
            break
    }

    return engine.legendSets[legendSetId]
}

const buildStyleObject = (legendColor, engine) => {
    const style = {}
    switch (engine.visualization.legend?.style) {
        case LEGEND_DISPLAY_STYLE_TEXT:
            style.color = legendColor
            break
        case LEGEND_DISPLAY_STYLE_FILL:
        default:
            style.backgroundColor = legendColor
            if (isColorBright(legendColor)) {
                style.color = colors.grey900
            } else {
                style.color = colors.white
            }
            break
    }
    return style
}

export const applyLegendSet = (value, dxDimension, engine) => {
    if (isNaN(value) || !engine.legendSets) {
        return {}
    }

    const legendSet = getLegendSet(engine, dxDimension)
    if (!legendSet) {
        return {}
    }

    const legendColor = getColorByValueFromLegendSet(legendSet, value)
    if (!legendColor) {
        return {}
    }

    return buildStyleObject(legendColor, engine)
}

export function getFilterText(filters, metaData) {
    if (!Array.isArray(filters) || !filters.length) {
        return ''
    }

    const titleFragments = []
    let i
    let l

    filters.forEach((filter) => {
        const items = dimensionGetItems(filter)

        if (
            dimensionIs(filter, DIMENSION_ID_ORGUNIT) &&
            items.some(
                ({id}) =>
                    ouIdHelper.hasGroupPrefix(id) ||
                    ouIdHelper.hasLevelPrefix(id)
            )
        ) {
            titleFragments.push(getOuLevelAndGroupText(filter, metaData))
        } else {
            const filterItems = metaData.dimensions[filter.dimension]

            if (Array.isArray(filterItems)) {
                l = filterItems.length
                let id
                const sectionParts = []

                for (i = 0; i < l; i++) {
                    id = filterItems[i]

                    // if the value is present in items take the name to show from there
                    if (metaData.items[id]) {
                        sectionParts.push(metaData.items[id].name)
                    }
                        // otherwise use the values directly
                    // this is a temporary fix to avoid app crashing when using filters with data items in EV
                    else {
                        sectionParts.push(
                            metaData.items[filter.dimension].name +
                            ': ' +
                            filterItems.join(', ')
                        )

                        break
                    }
                }

                titleFragments.push(sectionParts.join(', '))
            }
        }
    })

    return titleFragments.join(' - ')
}


const headerStacksAreEqual = (a, b, limit) => {
    for (let i = 0; i <= limit; ++i) {
        if (a[i] !== b[i]) {
            return false
        }
    }
    return true
}

export const getHeaderForDisplay = ({
                                        start,
                                        count,
                                        index,
                                        dimensionLevel,
                                        getHeader,
                                        showHierarchy,
                                    }) => {
    const header = getHeader(index)
    const showHeader =
        index === start ||
        !headerStacksAreEqual(header, getHeader(index - 1), dimensionLevel)
    if (!showHeader) {
        return null
    }

    let span = 1
    for (let i = index + 1; i < start + count; ++i) {
        if (!headerStacksAreEqual(getHeader(i), header, dimensionLevel)) {
            break
        }
        ++span
    }

    const currentHeader = header[dimensionLevel]

    const includesHierarchy = showHierarchy && currentHeader?.hierarchy

    const label = includesHierarchy
        ? currentHeader.hierarchy.join(' / ')
        : currentHeader?.name

    return {
        span,
        label,
        includesHierarchy,
    }
}

export const clipPartitionedAxis = ({
                                        partitionSize,
                                        partitions,
                                        axisMap,
                                        widthMap,
                                        viewportWidth,
                                        viewportPosition,
                                        totalWidth,
                                    }) => {
    const partition = Math.floor(viewportPosition / partitionSize)

    if (partitions[partition] === undefined) {
        return {
            indices: [0],
            pre: 0,
            post: 0,
        }
    }

    let start = partitions[partition] - partitions[0]
    while (
        start < axisMap.length &&
        widthMap[axisMap[start]].pre < viewportPosition
        ) {
        ++start
    }
    start = start === 0 ? start : start - 1
    const pre = widthMap[axisMap[start]].pre
    const indices = []
    let end = start
    while (
        end < axisMap.length &&
        widthMap[axisMap[end]].pre < viewportPosition + viewportWidth
        ) {
        indices.push(end)
        ++end
    }
    end = end === 0 ? end : end - 1
    const post =
        totalWidth - (widthMap[axisMap[end]].pre + widthMap[axisMap[end]].size)

    return {
        indices,
        pre,
        post,
    }
}
