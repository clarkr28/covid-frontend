import React from 'react';
import './PlotRegion.scss';
import { observer } from 'mobx-react';
import { useStores } from '../use-stores';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { toKey } from '../SelectionStore';

export const PlotRegion = observer(() => {
    const {selectionStore} = useStores();

    /*const stubData = [
        {a: 1, b: 2, c: 3},
        {a: 2, b: 4, c: 6},
        {a: 3, b: 8, c: 9},
        {a: 4, b: 16, c:12},
        {a: 5, b: 32},
    ];*/

    return (
        <div className="plot-region">
        <div className="chart-container">
        <LineChart width={600} height={400} data={selectionStore.plotData}>
            <XAxis dataKey='date'/>
            <YAxis/>
            {/*<Line dataKey='b' stroke='#ccc'/>*/}
            {/*<Line dataKey='c' stroke='#cfc'/>*/}

            {selectionStore.selectedRegions.map((r) => {
                return (<Line key={toKey(r)} dataKey={toKey(r)} stroke='#ccc' dot={false}/>)
                    })} 
        </LineChart>
        </div>
        </div>
    )
})
