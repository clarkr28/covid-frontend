import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../use-stores';
import './ListPicker.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { Region } from '../SelectionStore';

export const SelectedPlacesPicker = observer(() => {
    const {selectionStore} = useStores();
    return (
        <div className="list-picker">
            <div className="title">Selected</div>
            <div className="list-window">{selectionStore.selectedRegions.map((region) => <ListItem key={region.state + region.county} region={region}/>)}</div>
        </div>
    )
});

interface ListItemProps {
    region: Region
}

const ListItem: React.FC<ListItemProps> = ({region}) => {
    const {selectionStore} = useStores();

    return (
        <div className="list-item">
            <div className="item-name">{region.state + ':' + region.county}</div>
            <FontAwesomeIcon className="remove-icon" icon={faMinusCircle} 
                onClick={() => selectionStore.removeRegion(region)}/>
        </div>
    )
}