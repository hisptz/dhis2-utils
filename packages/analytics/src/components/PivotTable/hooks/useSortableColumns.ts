import {useState} from 'react'
import {SORT_ORDER_ASCENDING, SORT_ORDER_DESCENDING,} from '../constants/pivotTable'
import {PivotTableEngine} from "../services/engine";

export const useSortableColumns = (engine: PivotTableEngine) => {
    const [sortBy, setSortBy] = useState<{ order: number; column: number } | null>(null)

    const onSortByColumn = (column: number) => {
        let order = SORT_ORDER_ASCENDING
        if (sortBy && sortBy.column === column) {
            if (sortBy.order === SORT_ORDER_ASCENDING) {
                order = SORT_ORDER_DESCENDING
            } else if (sortBy.order === SORT_ORDER_DESCENDING) {
                engine.clearSort()
                setSortBy(null)
                return
            }
        }
        engine.sort(column, order)
        setSortBy({column, order}) // Force a re-render
    }

    return {
        sortBy,
        onSortByColumn,
    }
}
