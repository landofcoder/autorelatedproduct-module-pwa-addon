import React from 'react';
import FloatBox from "./FloatBox";

const MAXIMUM_STACK_COUNT = 3;

const FloatBoxes = (props) => {
    const config = (props ? props.config : []).slice(0, MAXIMUM_STACK_COUNT);
    // const leftMargin = props ? (props.leftMargin !== undefined ? props.leftMargin : 5) : 5;

    if (config.length === 0) {
        return (
            <div>

            </div>
        )
    }
    const direction = (config[0].direction ? config[0].direction : 'left') //check first component for direction

    return (
        <div style={Object.assign({
            position: "fixed",
            bottom: 0,
            marginLeft: 5,
            marginRight: 5,
            zIndex: 10,
        }, (direction === 'left') ? {left: 0} : {right: 0})}
        >
            {config.map((x, index) => (
                <div key={index.toString()}
                     style={{
                         marginTop: 5,
                         marginBottom: 5
                     }}>
                    <FloatBox  {...x}/>
                </div>
            ))}
        </div>
    );
};

export default FloatBoxes;
