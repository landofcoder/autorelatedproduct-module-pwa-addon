import React from 'react';
import ItemList from "./ItemList";

const ItemLists = (props) => {
    const config = props ? props.config : [];

    return (
        <div>
            {config.map((x, index) => <ItemList key={index.toString()} {...x}/>)}
        </div>
    );
};

export default ItemLists;
