import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../use-stores';
import './ListPicker.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const CountyPicker = observer(() => {
    const {selectionStore} = useStores();

    let counties: string[] = selectionStore.countyMap.get(selectionStore.currentSelectedState) || [];
    if (selectionStore.countyMap.has(selectionStore.currentSelectedState)) {
        // add 'all' as the first option
        counties = ['all', ...counties];
    }

    return (
        <div className="list-picker">
            <div className="title">County</div>
            <div className="list-window">{counties.map((county) => <ListItem key={county} name={county}/>)}</div>
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
            <FontAwesomeIcon className="add-icon" icon={faPlus}
                onClick={() => selectionStore.addRegion(name)}/>
        </div>
    )
}