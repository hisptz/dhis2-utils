// @ts-nocheck
import {measureTextWithWrapping} from '../utils'
import {CLIPPED_AXIS_PARTITION_SIZE_PX, CLIPPED_CELL_MIN_SIZE,} from '../constants/pivotTable'
import {PivotTableEngine} from "./engine";


export interface AxisInterface {
    sizes: { size: number; pre: number }[];
    headerSizes?: any;
    headerSize: any;
    orientation?: "column" | "row";
    totalSize: number;
    partitions: number[];
}

export class AdaptiveClippingController {
    columns: AxisInterface = {
        orientation: "column",
        sizes: [],
        headerSize: 0,
        partitions: [],
        totalSize: 0
    }
    rows: AxisInterface = {
        orientation: "row",
        sizes: [],
        headerSize: 0,
        partitions: [],
        totalSize: 0
    }
    engine: PivotTableEngine;

    constructor(engine: PivotTableEngine) {
        this.engine = engine
        this.reset()
    }

    addSize({row, column}: { row: number; column: number }, {width, height}: { width: number; height: number }) {
        if (column >= 0) {
            const columnSize = this.columns.sizes[column] || {
                pre: 0,
                size: 0,
            }
            columnSize.size = Math.max(columnSize.size, width)
            this.columns.sizes[column] = columnSize
        } else {
            const index = this.engine.rowDepth + column
            this.columns.headerSizes[index] = Math.max(
                this.columns.headerSizes[index] || 0,
                width
            )
        }

        if (row >= 0) {
            const rowSize = this.rows.sizes[row] || {
                pre: 0,
                size: 0,
            }
            rowSize.size = Math.max(rowSize.size, height)
            this.rows.sizes[row] = rowSize
        } else {
            const index = this.engine.columnDepth + row
            this.rows.headerSizes[index] = Math.max(
                this.rows.headerSizes[index] || 0,
                height
            )
        }
    }

    add({row, column}: { row: number, column: number }, renderedValue?: string) {
        this.addSize({row, column}, this.measureText(renderedValue))
    }

    measureText(renderedValue?: string, options?:any  = {}) {
        return measureTextWithWrapping(renderedValue, {
            fontSize: this.engine.fontSize,
            ...options,
        })
    }

    getCellSize(contentSize: number) {
        return (
            Math.ceil(contentSize) + this.engine.cellPadding * 2 + /*border*/ 2
        )
    }

    finalizeAxis(axis: AxisInterface) {
        axis.headerSize = 0

        const isColumn = axis.orientation === 'column'

        const map = isColumn ? this.engine.columnMap : this.engine.rowMap
        const getHeader = (index: number) =>
            isColumn
                ? this.engine.getRawColumnHeader(index)
                : this.engine.getRawRowHeader(index)

        map.forEach((index, mapIndex) => {
            const headerStack = getHeader(index)
            headerStack?.forEach((header: { hierarchy: any[]; name: any; }, level: number) => {
                const label =
                    this.engine.visualization.showHierarchy && header?.hierarchy
                        ? header.hierarchy.join(' / ')
                        : header?.name

                if (label) {
                    const isLeafHeader = level === headerStack.length - 1
                    if (isColumn) {
                        const headerSize = this.measureText(label, {
                            maxWidth: isLeafHeader
                                ? Math.max(
                                    CLIPPED_CELL_MIN_SIZE,
                                    axis.sizes[index]?.size || 0
                                )
                                : 0,
                        })
                        this.addSize(
                            {row: -headerStack.length + level, column: index},
                            {
                                height: headerSize.height,
                                width: isLeafHeader
                                    ? headerSize.width +
                                    (this.engine.isSortable(mapIndex)
                                        ? this.engine.scrollIconBuffer
                                        : 0)
                                    : 0,
                            }
                        )
                    } else {
                        const headerSize = this.measureText(label, {})
                        this.addSize(
                            {row: index, column: -headerStack.length + level},
                            {
                                height: isLeafHeader ? headerSize.height : 0,
                                width: headerSize.width,
                            }
                        )
                    }
                }
            })

            axis.sizes[index] = {
                pre: 0,
                size: this.getCellSize(axis.sizes[index]?.size),
            }
        })

        this.populateAxisPartitions(axis)
    }

    populateAxisPartitions(axis: AxisInterface) {
        axis.totalSize = 0
        axis.partitions = []
        let nextPartitionPx = 0

        const isColumn = axis.orientation === 'column'
        const map = isColumn ? this.engine.columnMap : this.engine.rowMap
        map.forEach((index, mapIndex) => {
            if (axis.totalSize >= nextPartitionPx) {
                axis.partitions.push(mapIndex)
                nextPartitionPx += CLIPPED_AXIS_PARTITION_SIZE_PX
            }
            axis.sizes[index].pre = axis.totalSize
            axis.totalSize += axis.sizes[index].size
        })
    }

    resetRowPartitions() {
        this.populateAxisPartitions(this.rows)
    }

    finalize() {
        if (this.engine.visualization.showDimensionLabels) {
            const columnDimensionCount =
                this.engine.dimensionLookup?.columnHeaders.length ?? 0
            const rowDimensionCount =
                this.engine.dimensionLookup?.rowHeaders.length ?? 0
            this.engine.dimensionLookup?.columnHeaders?.forEach(
                (_: any, columnLevel: number) => {
                    this.engine.dimensionLookup?.rowHeaders?.forEach(
                        (_: any, rowLevel: number) => {
                            const label = this.engine.getDimensionLabel(
                                rowLevel,
                                columnLevel
                            )
                            if (label) {
                                this.add(
                                    {
                                        row: -rowDimensionCount + rowLevel,
                                        column:
                                            -columnDimensionCount + columnLevel,
                                    },
                                    label
                                )
                            }
                        }
                    )
                }
            )
        }

        this.finalizeAxis(this.columns)
        this.finalizeAxis(this.rows)

        this.columns.headerSize = 0
        this.columns.headerSizes = this.columns.headerSizes.map((size: number) => {
            const paddedSize = this.getCellSize(size)
            this.columns.headerSize += paddedSize
            return paddedSize
        })

        this.rows.headerSize = 0
        this.rows.headerSizes = this.rows.headerSizes.map((size: number) => {
            const paddedSize = this.getCellSize(size)
            this.rows.headerSize += paddedSize
            return paddedSize
        })
    }

    reset() {
        this.columns = {
            orientation: 'column',
            totalSize: 0,
            headerSize: 0,
            sizes: [],
            partitions: [],
            headerSizes: [],
        }
        this.rows = {
            orientation: 'row',
            totalSize: 0,
            headerSize: 0,
            sizes: [],
            partitions: [],
            headerSizes: [],
        }
    }
}
