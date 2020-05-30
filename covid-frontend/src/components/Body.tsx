import React from 'react';
import './Body.scss';
import Controls from './Controls';
import PlotRegion from './PlotRegion';

function Body() {
    return (
        <div className="body">
            <Controls/>
            <PlotRegion/> 
        </div>
    );
}

export default Body;