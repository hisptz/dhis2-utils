import PropTypes from 'prop-types';
import React from 'react';
import {PivotTableColumnHeaders} from './PivotTableColumnHeaders.js';
import {PivotTableTitleRows} from './PivotTableTitleRows';
import {ClippingResult} from "../interfaces";
import {TableHead} from '@dhis2/ui'

export interface PivotTableHeadProps {
    clippingResult: ClippingResult;
    width: number;
    sortBy: {
        order: number;
        column: number;
    } | null
    onSortByColumn: (column: number) => void
}

export const PivotTableHead = ({clippingResult, width, sortBy, onSortByColumn,}: PivotTableHeadProps) => (<TableHead>
<PivotTableTitleRows clippingResult={clippingResult} width={width}/>
<PivotTableColumnHeaders clippingResult={clippingResult} sortBy={sortBy} onSortByColumn={onSortByColumn}/>
</TableHead>);

PivotTableHead.propTypes = {
    clippingResult: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    onSortByColumn: PropTypes.func.isRequired,
    sortBy: PropTypes.object
};

