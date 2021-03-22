import React, {Fragment} from 'react';
import Carousel, {slidesToShowPlugin, autoplayPlugin, slidesToScrollPlugin} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Item from "../../Item/Item";

const ItemList = (props) => {
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

            <div>
                <Carousel
                    arrows
                    infinite
                    autoplay
                    itemWidth={300}
                    animationSpeed={1000}
                    plugins={[
                        'arrows',
                        'infinite',
                        'clickToChange',
                        {
                            resolve: autoplayPlugin,
                            options: {
                                interval: 1000,
                                stopAutoPlayOnHover: true
                            }
                        },
                        {
                            resolve: slidesToShowPlugin,
                            options: {
                                numberOfSlides: 5
                            }
                        },
                        {
                            resolve: slidesToScrollPlugin,
                            options: {
                                numberOfSlides: 1
                            }
                        },
                    ]}
                >
                    {data.map(value => <Item key={value.sku}
                                             data={value}
                                             displayPrice={displayPrice}
                                             displayReviews={displayReviews}
                                             displayAddToCart={displayAddToCart}
                    />)}
                </Carousel>
            </div>
        </div>
    );
};

//memo this
export default ItemList;
