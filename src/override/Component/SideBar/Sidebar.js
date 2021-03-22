import React from 'react';
import Item from "../Item/Item";

//only one sidebar will be displayed (most recently updated)
let listItems = []
for (let i = 0; i < 10000; i++) {
    listItems.push({id: i, content: <h4>{i}</h4>})
}

const Sidebar = (props) => {

    const config = props ? props.config : [];

    const chosenSideBar = config.reduce((previousValue, currentValue) => {
        if (!previousValue || !previousValue.updatedTime) {
            return currentValue
        } else if (previousValue.updatedTime && currentValue.updatedTime) {
            try {
                if ((new Date(previousValue.updatedTime)) < (new Date(currentValue.updatedTime))) {
                    return currentValue
                }
            } catch (e) {
                return previousValue
            }
        }
        return previousValue
    }, null)


    if (!chosenSideBar) {
        return (
            <div>

            </div>
        )
    }

    const data = chosenSideBar ? chosenSideBar.carouselData : null;
    const displayPrice = chosenSideBar ? chosenSideBar.displayPrice : false;
    const displayReviews = chosenSideBar ? chosenSideBar.displayReviews : false;
    const displayAddToCart = chosenSideBar ? chosenSideBar.displayAddToCart : false;
    const shouldRenderRelatedProduct = chosenSideBar ? chosenSideBar.shouldRenderRelatedProduct : null;
    const print = chosenSideBar ? chosenSideBar.print : null;
    const name = chosenSideBar ? chosenSideBar.name : '';

    return (
        <div style={{
            width: 200
        }}>
            <div key={'name'}
                 style={{
                     paddingTop: 10,
                     paddingBottom: 20
                 }}>
                {!!print && <h3>{JSON.stringify(print || '')}</h3>}
                <h3 style={{
                    fontSize: 26,

                }}>{name}</h3>
            </div>
            {/*<h3>{JSON.stringify(chosenSideBar || 'abc')}</h3>*/}
            {!!data && data.map(value => (
                    <div style={{
                        // border: '1px solid #000',
                        marginTop: 10,
                        marginBottom: 15
                    }}>
                        <Item key={value.sku}
                              data={value}
                              displayPrice={displayPrice}
                              displayReviews={displayReviews}
                              displayAddToCart={displayAddToCart}
                              outerWidth={180}
                              imgWidth={150}
                        />
                    </div>
                )
            )}
        </div>
    );
};

export default Sidebar;
