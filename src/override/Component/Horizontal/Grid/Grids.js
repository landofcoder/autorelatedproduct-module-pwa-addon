import React from 'react';
import Grid from "./Grid";

const Grids = (props) => {
    const config = props ? props.config : [];

    return (
        <div style={{}}>
            {config.map((x, index) => (
                <div style={{
                }}>
                    <Grid key={index.toString()} {...x}/>
                </div>
            ))}
        </div>
    );
};

export default Grids;
