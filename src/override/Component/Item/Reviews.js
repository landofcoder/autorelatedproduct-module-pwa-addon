import React from 'react';

const Reviews = (props) => {
    const data = props ? props.data : [];

    if (!data || !data.items || data.items.length === 0) {
        return (
            <div style={{
                marginTop: 5,
                marginBottom: 5
            }}>
                <a href={'#'} style={{
                    color: 'rgb(95, 198, 255)',
                }}>
                    {'Be the first to review this product'}
                </a>
            </div>
        )
    }

    const items = data.items;

    return (
        <div style={{marginTop: 5, marginBottom: 5}}>
            {items.map(value => {
                return (
                    <div key={value.nickname}
                         style={{
                             marginBottom: 7
                         }}
                    >
                        <h3 style={{
                            textAlign: 'left',
                            marginLeft: 5,
                            marginBottom: 3,
                            fontWeight: "bold",
                            fontSize: 20
                        }}>
                            <a href={'#'}>{value.nickname || ''}</a>
                        </h3>
                        <h3 style={{
                            textAlign: 'left',
                            marginLeft: 15
                        }}>
                            <a href={'#'}>{value.summary || ''}</a>
                        </h3>
                    </div>
                )
            })}
        </div>
    );
};

export default Reviews;
