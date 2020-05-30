import React from 'react';
import './ListPicker.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

export interface ListPickerProps {
    title: string
    items: string[]
    addSelection: boolean
};

export const ListPicker: React.FC<ListPickerProps> = ({title, items, addSelection}) => {
    return (
        <div className="list-picker">
            <div className="title">{title}</div>
            <div className="list-window">{items.map((name) => <ListItem name={name} addSelection={addSelection}/>)}</div>
        </div>
    );
}

interface ListItemProps {
    name: string
    addSelection: boolean
};

const ListItem: React.FC<ListItemProps> = ({name, addSelection}) => {
    return (
        <div className="list-item">
            <div className="item-name">{name}</div>
            <ListItemIcon addSelection={addSelection}/>
        </div>
    )
}

interface ListItemIconProps {
    addSelection: boolean
};

const ListItemIcon: React.FC<ListItemIconProps> = ({addSelection}) => {
    if (addSelection) {
        return <FontAwesomeIcon className="add-icon" icon={faPlus}/>;
    }
    return <FontAwesomeIcon className="remove-icon" icon={faMinusCircle}/>;
}