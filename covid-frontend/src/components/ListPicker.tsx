import React from 'react';
import './ListPicker.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

export interface ListPickerProps {
    title: string
    listItems: string[]
    selectedStates: string[]
    addSelection: boolean
    setSelectedStates: React.Dispatch<React.SetStateAction<string[]>>
};

export const ListPicker: React.FC<ListPickerProps> = ({title, listItems, selectedStates, addSelection, setSelectedStates}) => {
    return (
        <div className="list-picker">
            <div className="title">{title}</div>
            <div className="list-window">{listItems.map((name) => <ListItem key={name} name={name} listItems={listItems} selectedStates={selectedStates} addSelection={addSelection} setSelectedStates={setSelectedStates}/>)}</div>
        </div>
    );
}

interface ListItemProps {
    name: string
    listItems: string[]
    selectedStates: string[]
    addSelection: boolean
    setSelectedStates: React.Dispatch<React.SetStateAction<string[]>>
};

const ListItem: React.FC<ListItemProps> = ({name, listItems, selectedStates, addSelection, setSelectedStates}) => {
    return (
        <div className="list-item">
            <div className="item-name">{name}</div>
            <ListItemIcon name={name} listItems={listItems} selectedStates={selectedStates} addSelection={addSelection} setSelectedStates={setSelectedStates}/>
        </div>
    )
}

interface ListItemIconProps {
    name: string
    listItems: string[]
    selectedStates: string[]
    addSelection: boolean
    setSelectedStates: React.Dispatch<React.SetStateAction<string[]>>
};

const ListItemIcon: React.FC<ListItemIconProps> = ({name, listItems, selectedStates, addSelection, setSelectedStates}) => {
    const className = addSelection ? "add-icon" : "remove-icon";
    const icon = addSelection ? faPlus : faMinusCircle;

    const handleClick = function(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
        if (addSelection && !selectedStates.includes(name)) {
            setSelectedStates(selectedStates => selectedStates.concat(name));
        } else if (!addSelection && listItems.includes(name)) {
            setSelectedStates(listItems => listItems.filter(item => item !== name));
        }
    }

    if (addSelection && selectedStates.includes(name)) {
        return null;
    }
    return <FontAwesomeIcon className={className} icon={icon} onClick={handleClick} />;
}