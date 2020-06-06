import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../use-stores';
import './ListPicker.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const StatePicker = observer(() => {
    const {selectionStore} = useStores();
    return (
        <div className="list-picker">
            <div className="title">State</div>
            <div className="list-window">{selectionStore.states.map((state) => <ListItem key={state} name={state}/>)}</div>
        </div>
    )
});

interface ListItemProps {
    name: string
}

const ListItem: React.FC<ListItemProps> = ({name}) => {
    const {selectionStore} = useStores();

    return (
        <div className="list-item">
            <div className="item-name">{name}</div>
            <FontAwesomeIcon className="add-icon" icon={faArrowRight} onClick={() => selectionStore.setCurrentSelectedState(name)}/>
        </div>
    )
}