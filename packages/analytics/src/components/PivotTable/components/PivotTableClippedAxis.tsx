import React from 'react';

export interface PivotTableClippedAxisProps {
    axisClippingResult: Record<string, any>;
    EmptyComponent: React.JSXElementConstructor<any>,
    ItemComponent: React.JSXElementConstructor<any>
}

export const PivotTableClippedAxis = ({
                                          axisClippingResult,
                                          EmptyComponent,
                                          ItemComponent,
                                      }: PivotTableClippedAxisProps) => [
    axisClippingResult.pre ? (<EmptyComponent key="pre" size={axisClippingResult.pre}/>) : null,
    axisClippingResult.indices.map((index: number) => (<ItemComponent key={index} index={index}/>)),
    axisClippingResult.post ? (<EmptyComponent key="post" size={axisClippingResult.post}/>) : null,
] as unknown as React.ReactElement

