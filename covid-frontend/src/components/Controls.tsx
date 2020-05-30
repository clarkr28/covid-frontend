import React from 'react';
import './Controls.scss';
import { ListPicker } from './ListPicker';
import { stateAbbrev } from '../consts';

function Controls() {
    return (
        <div className="controls">
            <ListPicker title="States" addSelection={true} items={Object.values(stateAbbrev).sort()}/>
            <ListPicker title="Selected" addSelection={false} items={['a', 'b', 'c']}/>
        </div>
    );
}

export default Controls;