import React, { useState } from 'react';
import './Body.scss';
import Controls from './Controls';
import PlotRegion from './PlotRegion';

function Body() {
    const initialStates: string[] = [];
    const [selectedStates, setSelectedStates] = useState(initialStates);
    return (
        <div className="body">
            <Controls selectedStates={selectedStates} setSelectedStates={setSelectedStates}/>
            <PlotRegion/> 
        </div>
    );
}

export default Body;