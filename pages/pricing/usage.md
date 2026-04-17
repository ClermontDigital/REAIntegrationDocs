---
title: "Usage"
source: https://partner.realestate.com.au/pricing/usage/
fetched_at: 2026-04-17T03:52:57.334Z
---

# Usage

## Get Residential Product Prices

**Returns all the residential product prices for a specific location, agencyId and section**

Customers listing on realestate.com.au can find out the products they have pre-selected to automatically purchase along with the discounted price for them. In addition, this API will also return other products that they can optionally choose to purchase or products that they have a minimum commitment to purchase.

Supports the following query parameters:

-   agency\_id
-   suburb
-   state
-   postcode
-   section
-   listing\_type
-   reupgrade
-   date

### URL

```
GET https://api.realestate.com.au/prices/v1/realestate-properties
```

### Query Parameters

Parameter

Type

Required

Description

Example

agency\_id

string

Required

This is the unique 6 letter agency code for an office with an active subscription.

FEXBNP

suburb

string

Required

The name of the suburb where the property is physically located, as recognised by the appropriate state government.

Sydney

state

enum (ACT, NSW, NT, QLD, SA, TAS, VIC, WA)

Required

The state or territory where the listed property is located.

NSW

postcode

string

Required

This is the recognised postal code for the property.

2000

section

enum (buy, rent, sold)

This is the section on realestate.com.au that the customer wishes to list the property in.

buy

listing\_type

enum (residential, land, rural)

This is the type of property that the customer wishes to list.

residential

reupgrade

boolean

This is used to indicate whether the product is priced for the initial upgrade or a subsequent reupgrade.

false

date

string (date-time)

This is the date that the customer wishes to list, and to return the price for this date.

2021-12-01T11:00:00Z

### Response Payload

#### Content Type

`application/hal+json`

#### Payload

Property

Type

Description

Example

section

enum (buy, rent, sold)

As the section parameter is optional in the request, the response will explicitly specify the section that relates to the prices returned.

buy

listingType

enum (residential, land, rural)

As the listingType parameter is optional in the request, the response will explicitly specify the listingType that relates to the prices returned.

residential

reupgrade

boolean

As the reupgrade parameter is optional in the request, the response will explicitly specify whether the prices returned are for a subsequent upgrade (true), or if it is for the initial upgrade of the product (false).

false

date

string (date)

This is the date that the product prices are for. If the request did not include a date, the date returned will be today’s date (Australian Eastern Daylight Savings Time).

1970-01-01

all

[ProductPrice](#product_price) array

These products will be automatically purchased on the customer’s behalf when they list on realestate.com.au

elect

[ProductPrice](#product_price) array

These products are not automatically purchased, but customers can choose to purchase them at their discretion. However, they have a minimum number that have been commited to over a specified period of time

manual

[ProductPrice](#product_price) array

These products can be manually purchased by the customer and are not automatically purchased on their behalf.

flex

[FlexProductPrice](#flex_product_price) object

These products are available to customers to manually purchase, so long as they have the necessary points to access them or the listing price is lower than the threshold. There is a points attribute included for each product that indicates how many points will be needed to access them.

cappedProduct

[CappedProductPrice](#capped_product_price) array

For a given period, this indicates the maximum amount a customer can list for a particular product before additional charges apply. Once this number is exceeded, each additional listing with this product will be charged during the specified period. so long as they have the necessary points to access them. There is a points attribute included for each product that indicates how many points will be needed to access them.

#### FlexProductPrice

Property

Type

Description

Example

exceptionDowngrade

[ProductPrice](#product_price) array

\-

payOnSale

[ProductPrice](#product_price) array

\-

lvaDowngrade

[ProductPrice](#product_price) array

\-

lvaPayOnSale

[ProductPrice](#product_price) array

\-

#### CappedProductPrice

Property

Type

Description

Example

cap

integer

This indicates that how many listings can have this product for the corresponding period.

5

period

enum(monthly, quarterly)

This indicates that the length of time that the cap applies for.

monthly

price

[ProductPrice](#product_price) object

monthly

#### ProductPrice

Property

Type

Description

Example

product

enum(standard, feature, highlight, premiere, luxe, ebrochure, audience-maximiser, property-showcase, suburb-sponsorship, rent-banners)

This is the name of the product available for purchase. This product may appear multiple times, but the combination of the product and duration should be unique (note: duration is optional).

“premiere”

productName

string

This is the user friendly product name to display to the customer. This name will remain consistent with the latest names used for each of REA’s products and services and is recommended for use when showing the customers the price of a product.

”ABCDEF”

duration

integer

This is the number of active days for the specified product. This field is optional, and if it is not specified, it means this product is available for an unlimited time for this price.

60

billingCyclePeriod

integer

This is the days of the billing cycle period. This field is optional, and only existing when this is a multiple billing cycle product.

30

displayPrice

string

This is a formatted string that represents the price to display to the customer. This includes the ’$’ symbol along with the dollar and cents amount for this product. It is important to note that there could be other text in this field and it is recommended that this field be used to display the price to the customer.

”$1000.00”

price

string

This is the price the customer will pay for this product. It includes GST and any discounts applicable for this customer. This value will include the dollars and cents amount, but will not include the ’$’ symbol, eg. ‘5.00’ or ‘10000.00‘

“1000.00”

rackPrice

string

This is the standard price for this product, and should be displayed to the customer to help illustrate the discounting they receive.

”2000.00”

currency

string

This is the units of price and rackPrice.

”AUD”

points

integer

Some products require the customer to use their points to be able to access a particular product and price combination. This indicates how many points the customer has to use to be able to access this product.

1

upliftedFrom

enum(feature, highlight)

This indicates that this is an uplifted product from a lower-priced depth tier. This indicates how many points the customer has to use to be able to access this product.

feature

propertyPriceThreshold

string

The price threshold is specific to each Atlas, based on the given address.

”599999.0”

topUpPrice

string

The extra price for Luxe in addition to original Premiere+ price. This is only applicable to Luxe prices.

”2000.00”

### Example Request

Terminal window

```
$ curl -H "Accept: application/json" -H "Authorization: Bearer <token returned by OAuth service>" "https://api.realestate.com.au/prices/v1/realestate-properties?agency_id=FEXBNP&suburb=Southbank&state=VIC&postcode=3006&listing_type=residential&section=buy&reupgrade=false"
```

### Example Responses

#### 200 (Success)

The list of products and prices available to the customer for the specified section and type of property.

```
{  "_links": {    "self": {      "href": "https://api.realestate.com.au/prices/v1/realestate-properties?agency_id=FEXBNP&suburb=Sydney&state=NSW&postcode=2000"    }  },  "section": "buy",  "listingType": "residential",  "reupgrade": false,  "date": "1970-01-01",  "all": [    {      "product": "premiere",      "productName": "Premiere (60 days) - Buy",      "duration": 60,      "displayPrice": "$1000.00",      "price": "1000.00",      "rackPrice": "2000.00",      "currency": "AUD"    },    {      "product": "ebrochure",      "productName": "eBrochure - Buy",      "displayPrice": "$50.00",      "price": "50.00",      "rackPrice": "100.00",      "currency": "AUD"    },    {      "product": "audience-maximiser",      "productName": "Audience Maximiser",      "displayPrice": "$250.00",      "price": "250.00",      "rackPrice": "350.00",      "currency": "AUD"    }  ],  "manual": [    {      "product": "luxe",      "productName": "Luxe Unlimited - Buy",      "displayPrice": "$2000.00",      "price": "2000.00",      "rackPrice": "2000.00",      "currency": "AUD",      "topUpPrice": "1000.00"    },    {      "product": "property-showcase",      "productName": "Property Showcase - Buy",      "displayPrice": "$100.00",      "price": "100.00",      "rackPrice": "100.00",      "currency": "AUD"    },    {      "product": "suburb-sponsorship",      "productName": "Suburb Sponsorship",      "displayPrice": "$869.00",      "price": "869.00",      "rackPrice": "869.00",      "currency": "AUD"    }  ],  "flex": {    "exceptionDowngrade": [      {        "product": "highlight",        "productName": "Highlight (30 days) - Buy",        "duration": 30,        "displayPrice": "$400.00",        "price": "400.00",        "rackPrice": "800.00",        "currency": "AUD",        "points": 1      },      {        "product": "feature",        "productName": "Feature (30 days) - Buy",        "duration": 30,        "displayPrice": "$200.00",        "price": "200.00",        "rackPrice": "450.00",        "currency": "AUD",        "points": 1      },      {        "product": "standard",        "productName": "Standard - Buy",        "displayPrice": "$30.00",        "price": "30.00",        "rackPrice": "100.00",        "currency": "AUD",        "points": 1      }    ],    "payOnSale": [      {        "product": "premiere",        "productName": "Premiere (60 days) - Buy",        "duration": 60,        "displayPrice": "$0.00 up front, $2,400.00 when sold",        "price": "2400.00",        "rackPrice": "2000.00",        "currency": "AUD",        "points": 1      }    ],    "lvaDowngrade": [      {        "product": "highlight",        "productName": "LVA Flex - Highlight 60 Buy",        "duration": 60,        "displayPrice": "$2409.00",        "price": "2409.00",        "rackPrice": "4380.00",        "currency": "AUD",        "propertyPriceThreshold": "599999.0"      },      {        "product": "feature",        "productName": "LVA Flex - Feature 60 Buy",        "duration": 60,        "displayPrice": "$1429.00",        "price": "1429.00",        "rackPrice": "2598.00",        "currency": "AUD",        "propertyPriceThreshold": "599999.0"      }    ],    "lvaPayOnSale": [      {        "product": "premiere",        "productName": "LVA Flex - Premiere Unlimited Pay on Sale - Buy",        "displayPrice": "$0.00 upfront, $3527.00 when sold",        "price": "3527.00",        "rackPrice": "3527.00",        "currency": "AUD",        "propertyPriceThreshold": "599999.0"      }    ]  }}
```

#### 400 (Bad Request)

This response indicates when the required parameters were missing or if the values in the parameters were invalid.

```
{  "_links": {    "self": {      "href": "https://api.realestate.com.au/prices/v1/realestate-properties?agency_id=FEXBNP&suburb=Sydney&state=NSW&postcode=2000"    }  },  "type": "https://partner.realestate.com.au/documentation/api/pricing/errors/unknown-location",  "title": "Unknown suburb, state and postcode combination",  "detail": "The combination of suburb, state and postcode cannot be found. Please check Australia Post \n(https://auspost.com.au/postcode) and Geoscience Australia (https://www.ga.gov.au/placename/)\nfor a valid list of values.\n"}
```

#### 401 (Unauthorized)

This response indicate when the caller is not allowed to access the content or API. Possible reasons for this could be authentication (missing or expired login tokens).

```
{  "_links": {    "self": {      "href": "https://api.realestate.com.au/prices/v1/realestate-properties?agency_id=FEXBNP&suburb=Sydney&state=NSW&postcode=2000"    }  },  "type": "https://partner.realestate.com.au/documentation/api/pricing/errors/unauthorised",  "title": "Unauthorised access",  "detail": "The caller is not authorised to access the content for the specified agencyId. Also\ncheck that the authentication token has not expired, preventing access to data for\nthis agencyId.\n"}
```

#### 403 (Forbidden)

This response indicate when the caller is not allowed to access the content or API. Possible reasons for this could be authorisation (caller is not allowed to access the prices for the agencyId).

```
{  "_links": {    "self": {      "href": "https://api.realestate.com.au/prices/v1/realestate-properties?agency_id=FEXBNP&suburb=Sydney&state=NSW&postcode=2000"    }  },  "type": "https://partner.realestate.com.au/documentation/api/pricing/errors/forbidden",  "title": "Forbidden",  "detail": "The caller can't access to the prices.\n"}
```

#### 404 (Not Found)

This response indicate when there are no available products to the customer for the specified query.

```
{  "_links": {    "self": {      "href": "https://api.realestate.com.au/prices/v1/realestate-properties?agency_id=FEXBNP&suburb=Sydney&state=NSW&postcode=2000"    }  },  "type": "https://partner.realestate.com.au/documentation/api/pricing/errors/notfound",  "title": "Prices not found",  "detail": "The caller doesn't have available products for the specified query. Please check if the query parameter is correct.\n"}
```

#### 500 (Internal Server Error)

This response indicate when there are some internal server errors.

```
{  "_links": {    "self": {      "href": "https://api.realestate.com.au/prices/v1/realestate-properties?agency_id=FEXBNP&suburb=Sydney&state=NSW&postcode=2000"    }  },  "type": "https://partner.realestate.com.au/documentation/api/pricing/errors/internal-server-rror",  "title": "Internal Server Error",  "detail": "Sorry, your request could not be serviced at this time.\n"}
```

### Try it Out

Try out this endpoint using our [API explorer](../explore/).

## Get Commercial Product Prices

Returns the commercial product prices for a specific location and agencyId

Customers listing on realcommercial.com.au can find out their purchase price options for listings in each channel, at various listing tiers and durations. The price detail for each configuration will include whether it is the default listing for the contact, and the price on the current contract. The product options for the subscription (the additional listings available as part of their subscription) are also returned. Also returned are the new price options (e.g. the new prices that are available for the upcoming financial year).

Supports the following query parameters:

-   agency\_id
-   suburb
-   state
-   postcode

### URL

```
GET https://api.realestate.com.au/prices/v1/commercial-properties
```

### Query Parameters

Parameter

Type

Required

Description

Example

agency\_id

string

Required

This is the unique 6 letter agency code for an office with an active subscription.

FEXBNP

suburb

string

Required

The name of the suburb where the property is physically located, as recognised by the appropriate state government.

Sydney

state

enum (ACT, NSW, NT, QLD, SA, TAS, VIC, WA)

Required

The state or territory where the listed property is located.

NSW

postcode

string

Required

This is the recognised postal code for the property.

2000

### Response Payload

#### Content Type

`application/hal+json`

#### Payload

Property

Type

Description

agencyName

string

The name of the agency

state

enum (ACT, NSW, NT, QLD, SA, TAS, VIC, WA)

The state or territory associated with the prices

suburb

string

The name of the suburb associated with the prices

postcode

string

The postcode associated with the prices property

subscription

enum (Diamond, Flexi, Access, Standard)

The agency’s subscription type

productPrice

[ProductPriceSection](#product_price_section) array

The price options for channel

productOption

[ProductOption](#product_option) array

The available ad-hoc listings bundled with the subscription

#### ProductPriceSection

Property

Type

Description

section

enum (sale, lease)

The channel.

priceOptions

[PriceOption](#price_option) array

The price options for this channel.

newPrice

[NewPrice](#new_price))

New price options

#### PriceOption

Property

Type

Description

listingTier

enum (elite\_plus, elite, enhanced, basic)

The listing tier

isCurrentContract

boolean

Whether this is the current contract

priceDetails

[PriceDetail](#price_detail) array

The price details for this tier

#### PriceDetail

Property

Type

Description

duration

integer

The duration in days

price

number

The price for this duration

rackPrice

number

The standard (rack) price

isContracted

boolean

Whether this price is contracted

#### NewPrice

Property

Type

Description

title

String

The title of the new price

priceOptions

[PriceOption](#price_option) array

The new price options

#### ProductOption

Property

Type

Description

listingTier

enum (elite\_plus, elite, enhanced, basic)

The listing tier

listingPrice

string

The price for the listing

description

string

Description of the product option

### Example Responses

#### 200 (Success)

```
{  "agencyName": "Example Agency",  "state": "NSW",  "suburb": "Sydney",  "postcode": "2000",  "subscription": "Flexi",  "productPrice": [    {      "section": "sale",      "priceOptions": [        {          "listingTier": "enhanced",          "isCurrentContract": true,          "priceDetails": [            {              "duration": 60,              "price": 1000,              "rackPrice": 2000,              "isContracted": false            }          ]        }      ],      "newPrice": {        "title": "FY26 Pricing",        "priceOptions": [          {            "listingTier": "elite",            "isCurrentContract": false,            "priceDetails": [              {                "duration": 180,                "price": 2000,                "rackPrice": 2500,                "isContracted": true              }            ]          }        ]      }    }  ],  "productOption": [    {      "listingTier": "enhanced",      "listingPrice": "10 per month",      "description": "30 day Enhanced upgrade. Any additional upgrades will be charged at rack rates shown in the above table."    }  ]}
```

#### 400 (Bad Request)

This response indicates when the required parameters were missing or if the values in the parameters were invalid.

```
{  "_links": {    "self": {      "href": "https://api.realestate.com.au/prices/v1/commercial-properties?agency_id=ZZZZZZ&postcode=2000&suburb=Sydney&state=NSW"    }  },  "title": "Invalid agencyId error",  "type": "https://partner.realestate.com.au/documentation/api/pricing/errors/invalid-agency-id",  "detail": "The agencyId is invalid"}
```

#### 401 (Unauthorized)

This response indicate when the caller is not allowed to access the content or API. Possible reasons for this could be authentication (missing or expired login tokens).

```
{  "_links": {    "self": {      "href": "https://api.realestate.com.au/prices/v1/commercial-properties?agency_id=FEXBNP&suburb=Sydney&state=NSW&postcode=2000"    }  },  "type": "https://partner.realestate.com.au/documentation/api/pricing/errors/unauthorised",  "title": "Unauthorised access",  "detail": "The caller is not authorised to access the content for the specified agencyId. Also\ncheck that the authentication token has not expired, preventing access to data for\nthis agencyId.\n"}
```

#### 403 (Forbidden)

This response indicate when the caller is not allowed to access the content or API. Possible reasons for this could be authorisation (caller is not allowed to access the prices for the agencyId).

```
{  "_links": {    "self": {      "href": "https://api.realestate.com.au/prices/v1/commercial-properties?agency_id=FEXBNP&suburb=Sydney&state=NSW&postcode=2000"    }  },  "type": "https://partner.realestate.com.au/documentation/api/pricing/errors/forbidden",  "title": "Forbidden",  "detail": "The caller can't access to the prices."}
```

#### 404 (Not Found)

This response indicate when there are no available products to the customer for the specified query.

```
{  "_links": {    "self": {      "href": "https://api.realestate.com.au/prices/v1/commercial-properties?agency_id=FEXBNP&postcode=2000&suburb=Sydney&state=NSW"    }  },  "title": "No active commercial subscription",  "type": "https://partner.realestate.com.au/documentation/api/pricing/errors/no-commercial-subscription",  "detail": "There is no active commercial subscription"}
```

#### 500 (Internal Server Error)

This response indicate when there are some internal server errors.

```
{  "_links": {    "self": {      "href": "https://api.realestate.com.au/prices/v1/commercial-properties?agency_id=FEXBNP&suburb=Sydney&state=NSW&postcode=2000"    }  },  "type": "https://partner.realestate.com.au/documentation/api/pricing/errors/internal-server-rror",  "title": "Internal Server Error",  "detail": "Sorry, your request could not be serviced at this time."}
```

### Try it Out

Try out this endpoint using our [API explorer](../explore/).
