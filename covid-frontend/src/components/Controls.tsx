import React from 'react';
import './Controls.scss';
import { StatePicker } from './StatePicker';
import { CountyPicker } from './CountyPicker';
import { SelectedPlacesPicker } from './SelectedPlacesPicker';

export const Controls: React.FC = () => {
    return (
        <div className="controls">
            <StatePicker/>
            <CountyPicker/>
            <SelectedPlacesPicker/>
        </div>
    );
}

export default Controls;