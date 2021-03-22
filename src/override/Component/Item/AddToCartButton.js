import React from 'react';

const AddToCartButton = (props) => {

    return (
        <div style={{
            marginTop: 10,
            marginBottom: 7
        }}>
            <button style={{
                backgroundColor: 'rgb(39, 114, 172)',
                color: "white",
                fontWeight: 'bold',
                fontSize: 18,
                borderRadius: 5,
                paddingTop: 7,
                paddingBottom: 7,
                paddingLeft: 8,
                paddingRight: 8
            }}>Add to Cart
            </button>
        </div>
    );
};

export default AddToCartButton;
