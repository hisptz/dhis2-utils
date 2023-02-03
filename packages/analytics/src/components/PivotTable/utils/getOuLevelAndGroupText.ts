import {dimensionGetItems} from './layout/dimensionGetItems.js'
import {dimensionIs} from './layout/dimensionIs.js'
import {ouIdHelper} from './ouIdHelper'
import {DIMENSION_ID_ORGUNIT} from '../constants/predefinedDimensions'
import i18n from '@dhis2/d2-i18n';

export const getOuLevelAndGroupText = (filter: any, metaData: any) => {
    if (!dimensionIs(DIMENSION_ID_ORGUNIT)) {
        return ''
    }

    const items = dimensionGetItems(filter)
    const hasOuLevel = items.some((item: { id: any; }) => ouIdHelper.hasLevelPrefix(item.id))
    const hasOuGroup = items.some((item: { id: any; }) => ouIdHelper.hasGroupPrefix(item.id))

    const filterFragments = []

    if (hasOuGroup) {
        filterFragments.push(getLevelAndGroupText(items, metaData, false))
    }

    if (hasOuLevel) {
        filterFragments.push(getLevelAndGroupText(items, metaData, true))
    }

    return filterFragments.join(' - ')
}

const getLevelAndGroupText = (items: any[], metaData: { items: { [x: string]: { name: any; }; }; }, isLevel: boolean) => {
    const getNameFromMetadata = (id: string | number) =>
        metaData.items[id] ? metaData.items[id].name : id

    const dynamicOuItems = items.filter((item) =>
        isLevel
            ? ouIdHelper.hasLevelPrefix(item.id)
            : ouIdHelper.hasGroupPrefix(item.id)
    )
    const lastItem = dynamicOuItems.length > 1 ? dynamicOuItems.pop() : null
    const dynamicOuNames = dynamicOuItems
        .map((item) => getNameFromMetadata(ouIdHelper.removePrefix(item.id)))
        .join(', ')

    let allDynamicOuNames

    if (lastItem) {
        const lastOuName = getNameFromMetadata(
            ouIdHelper.removePrefix(lastItem.id)
        )
        allDynamicOuNames = i18n.t('{{dynamicOuNames}} and {{lastOuName}}', {
            dynamicOuNames,
            lastOuName,
        })
    } else {
        allDynamicOuNames = dynamicOuNames
    }

    const staticOuNames = items
        .filter(
            (item) =>
                !ouIdHelper.hasGroupPrefix(item.id) &&
                !ouIdHelper.hasLevelPrefix(item.id)
        )
        .map((item) => getNameFromMetadata(item.id))
        .join(', ')

    let ouLevelAndGroupText = ''
    if (!staticOuNames) {
        if (isLevel) {
            ouLevelAndGroupText = i18n.t('{{allDynamicOuNames}} levels', {
                allDynamicOuNames,
            })
        } else {
            ouLevelAndGroupText = i18n.t('{{allDynamicOuNames}} groups', {
                allDynamicOuNames,
            })
        }
    } else {
        if (isLevel) {
            ouLevelAndGroupText = i18n.t(
                '{{allDynamicOuNames}} levels in {{staticOuNames}}',
                {
                    allDynamicOuNames,
                    staticOuNames,
                }
            )
        } else {
            ouLevelAndGroupText = i18n.t(
                '{{allDynamicOuNames}} groups in {{staticOuNames}}',
                {
                    allDynamicOuNames,
                    staticOuNames,
                }
            )
        }
    }

    return ouLevelAndGroupText
}
