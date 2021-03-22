import React from 'react';
import ItemList from "./List/ItemList";
import Grid from "./Grid/Grid";

const HorizontalDisplay = (props) => {
    const config = props ? props.config : null;

    if (!config) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div>
            {config.map((rule, index) => {
                const displayMode = rule ? rule.displayType : null

                if (displayMode === 'list') {
                    return <ItemList key={index.toString()} {...rule}/>
                } else {
                    return <Grid key={index.toString()} {...rule}/>
                }
            })}
        </div>
    )
};

export default HorizontalDisplay;
