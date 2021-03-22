# Auto related product module for Magento PWA Studio

This module acts as an add-on for [Auto Recommend Products extension](https://landofcoder.com/magento-2-recommended-products.html/) to make it work with Magento PWA Studio.

# autorelatedproduct-module-pwa-studio

Developing...
```
yarn add node-sass
yarn add sass-loader
```

modify packagejson
```
"dependencies": {
    ...
    "@landofcoder/autorelatedproduct": "link:./@landofcoder/autorelatedproduct-module",
    ...
}
```

modify webpack.config.js
```
config.module.noParse = [/braintree\-web\-drop\-in/];
config.module.rules.push(
    {
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
    }
);
```
