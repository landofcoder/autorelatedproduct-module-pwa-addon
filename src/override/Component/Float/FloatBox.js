import React, {useState} from 'react';
import Price from "@magento/venia-ui/lib/components/Price";
import AddToCartButton from "../Item/AddToCartButton";

const FloatBox = (props) => {
    const _data = props ? props.carouselData : null;
    const data = _data ? _data[0] : null;

    const displayPrice = props ? props.displayPrice : false;
    const displayReviews = props ? props.displayReviews : false;
    const displayAddToCart = props ? props.displayAddToCart : false;
    const shouldRenderRelatedProduct = props ? props.shouldRenderRelatedProduct : null;
    const print = props ? props.print : null;
    const direction = props ? props.direction : 'left';
    const name = props ? props.name : '';

    const [shouldShow, setShow] = useState(true)
    const [showExit, setShowExit] = useState(false)


    if (!shouldRenderRelatedProduct || !data || !shouldShow) {
        return (
            <div>
                <h2>{print !== undefined ? JSON.stringify(print) : ''}</h2>

            </div>
        )
    }

    const link = (!!data) ? (data.url_key + data.url_suffix) : null

    return (
        <div style={
            Object.assign(
                {

                    border: '1px solid #00000040',
                    borderRadius: 5,
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    backgroundColor: "white"
                },
            )
        }
             onMouseEnter={() => setShowExit(true)}
             onMouseLeave={() => setShowExit(false)}
        >
            {showExit && (
                <div key={'control'}
                     style={{
                         textAlign: "right",
                         marginTop: 2,
                         marginRight: 4,
                         marginBottom: -15,
                     }}
                >
                    <button onClick={(event) => {
                        event.stopPropagation()
                        setShow(false)
                    }}
                            style={{
                                fontSize: 20
                            }}
                    >x
                    </button>
                </div>
            )}

            <div style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 7,
                marginBottom: 7,
                marginLeft: 5,
                marginRight: 5
            }}>
                <div key={'img'}
                     style={{
                         width: 140,
                         height: 140,
                         backgroundColor: 'white',
                         textAlign: 'center',
                         textJustify: 'center',
                         paddingTop: 20
                     }}>
                    <a href={link}>
                        <img src={data.small_image.url}
                             style={{
                                 maxWidth: 100,
                                 maxHeight: 100
                             }}
                        />
                    </a>
                </div>

                <div key={'detail'}
                     style={{
                         marginRight: 5,
                         marginTop: 5
                     }}
                >
                    <a href={link}>

                        <h2 style={{
                            color: "grey",
                            opacity: 0.8
                        }}>
                            {name}
                        </h2>

                        <h3 key={'product_name'}
                            style={{
                                marginTop: 10,
                                marginBottom: 8
                            }}>
                            <a href={link} style={{
                                color: '#006bb4'
                            }}>
                                {data.name}
                            </a>
                        </h3>

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
                                <div key={'addCart'}
                                     style={{
                                         position: "absolute",
                                         bottom: 5
                                     }}>
                                    <a href={link}>
                                        <AddToCartButton/>
                                    </a>
                                </div>
                            )
                        }
                    </a>
                </div>

            </div>
        </div>
    );
};

export default FloatBox;
