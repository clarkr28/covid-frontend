import React from 'react';
import './Controls.scss';
import { ListPicker } from './ListPicker';
import { stateAbbrev } from '../consts';

export interface ControlsProps {
    selectedStates: string[]
    setSelectedStates: React.Dispatch<React.SetStateAction<string[]>>
}

export const Controls: React.FC<ControlsProps> = ({selectedStates, setSelectedStates}) => {
    return (
        <div className="controls">
            <ListPicker title="States" addSelection={true} listItems={Object.values(stateAbbrev).sort()} selectedStates={selectedStates} setSelectedStates={setSelectedStates}/>
            <ListPicker title="Selected" addSelection={false} listItems={selectedStates} selectedStates={selectedStates} setSelectedStates={setSelectedStates}/>
        </div>
    );
}

export default Controls;