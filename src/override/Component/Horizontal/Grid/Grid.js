import React, {Fragment} from 'react';
import Item from "../../Item/Item";

const Grid = (props) => {
    const data = props ? props.carouselData : null;
    const displayPrice = props ? props.displayPrice : false;
    const displayReviews = props ? props.displayReviews : false;
    const displayAddToCart = props ? props.displayAddToCart : false;
    const shouldRenderRelatedProduct = props ? props.shouldRenderRelatedProduct : null;
    const print = props ? props.print : null;
    const name = props ? props.name : null;

    if (!shouldRenderRelatedProduct) {
        return (
            <div>
                <h2>{print !== undefined ? JSON.stringify(print) : ''}</h2>

            </div>
        )
    }

    //TODO: change arrow
    return (
        <div style={{
            marginTop: 20,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10
        }}>
            <h2>{print !== undefined ? JSON.stringify(print) : ''}</h2>

            <h2 style={{
                fontSize: 28,
                marginBottom: 10
            }}>
                {name}
            </h2>

            <div style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap"
            }}>
                {data.map(value => (
                    <div style={{
                        marginBottom: 15
                    }}>
                        <Item key={value.sku}
                              data={value}
                              displayPrice={displayPrice}
                              displayReviews={displayReviews}
                              displayAddToCart={displayAddToCart}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

//memo this
export default Grid;
