export const LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM = 'BY_DATA_ITEM'
export const LEGEND_DISPLAY_STRATEGY_FIXED = 'FIXED'

export const LEGEND_DISPLAY_STYLE_FILL = 'FILL'
export const LEGEND_DISPLAY_STYLE_TEXT = 'TEXT'

export const getLegendByValueFromLegendSet = (legendSet: { legends: any[] }, value: string) =>
    Number.isInteger(parseInt(value as string))
        ? legendSet?.legends?.find(
            (legend) => value >= legend.startValue && value < legend.endValue // TODO: Confirm inclusive/exclusive bounds
        )
        : null

export const getColorByValueFromLegendSet = (legendSet: { legends: any[] }, value: string) => {
    const legend = getLegendByValueFromLegendSet(legendSet, value)
    return legend && legend.color
}

export const getLegendSetByDisplayStrategy = ({
                                                  displayStrategy,
                                                  legendSets,
                                                  legendSetId,
                                              }: any) => {
    if (
        displayStrategy === LEGEND_DISPLAY_STRATEGY_FIXED &&
        legendSets.length
    ) {
        return legendSets[0]
    } else if (displayStrategy === LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM) {
        return legendSets.find((legendSet: { id: any }) => legendSet.id === legendSetId)
    } else {
        return null
    }
}
