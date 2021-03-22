import React, {useState, useEffect, useMemo} from 'react';
import {gql, useQuery} from "@apollo/client";
import {normalizeRule} from "../normalizeRule";

const relatedCartConfigQuery = gql`
query($location: String) {
  mpARPShoppingCartPage(filter:{location:{eq: $location}}) {
    items {
      actions {
        aggregator
        attribute
        conditions {
          aggregator
          attribute
          conditions {
            value
          }
          is_value_parsed
          operator
          type
        }
        is_value_parsed
        operator
        type
        value
      }
      updated_at
      add_ruc_product
      block_name
      block_type
      category_conditions_serialized
      conditions {
        aggregator
        attribute
        conditions {
          attribute
          aggregator
          is_value_parsed
          operator
          value
        }
        is_value_parsed
        operator
        type
        value
      }
      display_mode
      display_additional
      display_out_of_stock
      is_active
      location
      limit_number
      match_products{
        sku
        name
        canonical_url
        small_image{
          disabled
          url
        }
        url_key
        url_suffix
        updated_at
        stock_status
        reviews(pageSize:2){
          items{
            nickname
            summary
          }
        }
        price{
        regularPrice{
          amount{
            currency
            value
          }
        }
      }
      }
      name
      parent_id
      product_layout
      rule_id
      product_not_displayed
      sort_order
      sort_order_direction
      display_mode
    }
    total_count
  }
}
`

export const useRelatedCart = (props) => {
    const location = props ? props.location : null;

    const {data: configData, loading, error} = useQuery(relatedCartConfigQuery, {
        variables: {
            location: location
        },
        fetchPolicy: 'no-cache' //dev only
    })


    const shouldRenderRelatedProduct = (
        !!configData
        && !!configData.mpARPShoppingCartPage
        && !!configData.mpARPShoppingCartPage.items
        && (configData.mpARPShoppingCartPage.items.length > 0)
    )


    // memo this: there is a case with random shuffling of data.
    // If not memo, might flicker at first load
    const config = useMemo(() => normalizeRule(
        shouldRenderRelatedProduct ? configData.mpARPShoppingCartPage.items : null,
        {
            location: location,
            shouldRenderRelatedProduct: shouldRenderRelatedProduct,
            type: 'cart',
        }
    ), [shouldRenderRelatedProduct, location])

    return {
        config: config,
        loading: loading,
        // print: config
    }
};
