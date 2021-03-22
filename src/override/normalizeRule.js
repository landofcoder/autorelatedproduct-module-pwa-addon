import {shuffleArray} from "./shuffle";

export const normalizeRule = (rules, config = {}) => {
    const {
        type,
        location,
        shouldRenderRelatedProduct = true,
        sku,
        categoryId
    } = config

    if (!shouldRenderRelatedProduct || !rules) {
        return []
    }


    //TODO: sort
    return (
        (rules).map(rule => {
            const effectiveData = shouldRenderRelatedProduct ? rule : null

            const block_name = (shouldRenderRelatedProduct
                ? effectiveData.block_name
                : null)

            const limit_number = (shouldRenderRelatedProduct
                ? effectiveData.limit_number
                : null)

            const category_display_rule = (shouldRenderRelatedProduct && effectiveData.category_conditions_serialized)
                ? JSON.parse(effectiveData.category_conditions_serialized).map(x => x.trim()) //serialization on server is really weird
                : null

            const is_active = (shouldRenderRelatedProduct
                ? (effectiveData.is_active === 1)
                : false)

            const shouldDisplayOutOfStock = (shouldRenderRelatedProduct
                ? (effectiveData.display_out_of_stock === 1)
                : false)

            const sortStrategy = (shouldRenderRelatedProduct
                ? effectiveData.sort_order_direction
                : 0)


            let carouselData = (shouldRenderRelatedProduct
                ? effectiveData.match_products
                    .filter(x => (
                        !(type === 'category')
                        || (!category_display_rule)
                        || (!categoryId)
                        || category_display_rule.includes(categoryId.toString()))
                    )
                    .filter(x => !(shouldDisplayOutOfStock && x.stock_status === 'OUT_OF_STOCK'))
                    .filter(x => x.sku !== sku)
                    // .filter(x => is_active === true) //always true
                    .sort((a, b) => {
                        switch (sortStrategy) {
                            case 1: {
                                //best seller.not sure how?
                                break
                            }
                            case 2: {
                                return a.price.regularPrice.amount.value - b.price.regularPrice.amount.value
                            }
                            case 3: {
                                return b.price.regularPrice.amount.value - a.price.regularPrice.amount.value
                            }
                            case 4: {
                                return (new Date(a.updated_at || Date.now())) - (new Date(b.updated_at || Date.now()))
                            }
                            default:
                                return 0
                        }
                    })
                : [])
            if (sortStrategy === 5) {
                shuffleArray(carouselData)
            }

            const displayPrice = ((shouldRenderRelatedProduct && effectiveData.display_additional)
                ? effectiveData.display_additional.includes('1')
                : false)

            const displayReviews = ((shouldRenderRelatedProduct && effectiveData.display_additional)
                ? effectiveData.display_additional.includes('5')
                : false)

            const displayAddToCart = ((shouldRenderRelatedProduct && effectiveData.display_additional)
                ? effectiveData.display_additional.includes('2')
                : false)


            let direction = null
            if (location === 'left-popup-content') {
                direction = 'left'
            } else if (location === 'right-popup-content') {
                direction = 'right'
            }

            const updatedTimeString = (shouldRenderRelatedProduct && effectiveData.updated_at)
                ? effectiveData.updated_at
                : null

            const displayType = (shouldRenderRelatedProduct)
                ? ((effectiveData.display_mode === 0) ? 'list' : 'grid')
                : "list"

            return {
                shouldRenderRelatedProduct: shouldRenderRelatedProduct,
                carouselData: (limit_number !== null) ? carouselData.slice(0, limit_number) : carouselData,
                displayPrice: displayPrice,
                displayReviews: displayReviews,
                displayAddToCart: displayAddToCart,
                // print: location,
                direction: direction,
                name: block_name,
                updatedTimeString: updatedTimeString,
                displayType: displayType
            }
        }).filter(x => x.carouselData.length > 0)
    )
}
