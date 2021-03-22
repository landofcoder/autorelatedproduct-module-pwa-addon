import React from 'react';
import {Price} from '@magento/peregrine';
import Review from './Reviews'
import AddToCartButton from "./AddToCartButton";


const Item = (props) => {
    const data = props ? props.data : null;

    const displayPrice = props ? props.displayPrice : false;
    const displayReviews = props ? props.displayReviews : false;
    const displayAddToCart = props ? props.displayAddToCart : false;
    const outerWidth = props ? (props.outerWidth !== undefined ? props.outerWidth : 300) : 300;
    const imgWidth = props ? (props.imgWidth !== undefined ? props.imgWidth : 180) : 180;

    if (!data) {
        return (
            <div>

            </div>
        )
    }

    const link = data.url_key + data.url_suffix

    return (
        <div style={{
            textAlign: "center",
            width: outerWidth

        }}>
            <div key={'img'}>
                <a href={link}>
                    <img width={imgWidth}
                         src={data.small_image.url}
                    />
                </a>
            </div>
            <h3 key={'name'}
                style={{
                    marginTop: 10,
                    marginBottom: 8
                }}>
                <a href={link}>
                    {data.name}
                </a>
            </h3>

            {/*{displayReviews & (*/}
            {/*    <div>*/}
            {/*        <a href={link}>*/}
            {/*            <Review data={data.reviews}/>*/}
            {/*        </a>*/}
            {/*    </div>*/}
            {/*)*/}
            {/*}*/}
            {
                displayPrice && (
                    <div key={'price'}>
                        <a href={link}>
                            <Price
                                value={data.price.regularPrice.amount.value}
                                currencyCode={data.price.regularPrice.amount.currency}
                            />
                        </a>
                    </div>
                )
            }

            {
                displayAddToCart && (
                    <div key={'addCart'}>
                        <a href={link}>
                            <AddToCartButton/>
                        </a>
                    </div>
                )
            }
        </div>
    )

}

export default Item;
