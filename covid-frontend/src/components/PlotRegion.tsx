import React from 'react';
import './PlotRegion.scss';
import { observer } from 'mobx-react';
import { useStores } from '../use-stores';

export const PlotRegion = observer(() => {
    const {selectionStore} = useStores();
    return (
        <div className="plot-region">
            {"" + selectionStore.countyMap.size + " " + selectionStore.currentSelectedState}
        </div>
    )
})
