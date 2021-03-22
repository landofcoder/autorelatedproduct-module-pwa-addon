/**
 * Mappings for overwrites
 * example: [`@magento/venia-ui/lib/components/Main/main.js`]: './lib/components/Main/main.js'
 */
 module.exports = componentOverrideMapping = {
    [`@magento/venia-ui/lib/RootComponents/Category/categoryContent.js`]: '@landofcoder/autorelatedproduct-module/src/override/Category/categoryContent.js',
    [`@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js`]: '@landofcoder/autorelatedproduct-module/src/override/ProductDetails/productFullDetail.js',
    [`@magento/venia-ui/lib/components/CartPage/cartPage.js`]: '@landofcoder/autorelatedproduct-module/src/override/Cart/CartPage.js',
    [`@magento/venia-ui/lib/components/CheckoutPage/checkoutPage.js`]: '@landofcoder/autorelatedproduct-module/src/override/Checkout/checkoutPage.js'

};
