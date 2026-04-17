---
title: "Explore"
source: https://partner.realestate.com.au/pricing/explore/
fetched_at: 2026-04-17T03:52:53.799Z
---

# Explore

v0.1.1

OAS 3.0.3

# Pricing API

Download OpenAPI Document

json

Download OpenAPI Document

yaml

## Introduction

The Pricing API provides prices for the various portals in REA. A portal can be realestate.com.au for example. Given a specific _location, agencyId and section_ on the portal the API will return a list of products along with their respective price.

Server

Server:https://api.realestate.com.au

production server with live data

## 

AuthenticationRequired

Selected Auth Type: PartnerPlatform

Authorize

OAuth 2 Client Credentials grant flow

Token URL :

https://api.realestate.com.au/oauth/token

Clear Value

Client ID :

12345  

Client Secret :

Show Password

Credentials Location :

header

Clear Value

Scopes Selected 1 / 1

Add Scope Deselect All

Client Libraries

Shell

Ruby

Node.js

PHP

Python

More Select from all clients

Shell Curl

### Product prices when listing properties on realestate.com.au

​Copy link

Customers listing on realestate.com.au can find out the products they have pre-selected to automatically purchase along with the discounted price for them. In addition, this API will also return other products that they can optionally choose to purchase or products that they have a minimum commitment to purchase. All products returned will be grouped in 1 of these categories:

-   **all:** these products will be automatically purchased on the customer's behalf when they list on realestate.com.au
-   **elect:** these products are _not_ automatically purchased, but customers can choose to purchase them at their discretion. However, they have a minimum number that have been committed to over a specified period of time
-   **manual:** these products can be manually purchased by the customer and are not automatically purchased on their behalf.
-   **flex:** these products can be manually purchased, but require the customer to have the required number of **Campaign flex points** before they can access these product(s). **Note:** the data returned does not check if the customer has the points necessary to purchase the product. Instead it just specifies how many points and price for each product.
-   **cappedProduct:** the capped product can be manually purchased if customer doesn't have **all** contract. Once they exceed the cap amount during the specified period, the price indicated will be charged to the customer for each listing that uses this type of product.

Query Parameters

-   agency\_idCopy link to agency\_id
    
    Type: string `Pattern: ^[A-Z]{6}$`
    
    required
    
    Example
    
    FEXBNP
    
    This is the unique 6 letter agency code for an office with an active subscription. Refer to 'API X' for a list of agency codes that can be accessed by the caller.
    
-   suburbCopy link to suburb
    
    Type: string
    
    required
    
    Example
    
    Sydney
    
    The name of the suburb where the property is physically located, as recognised by the appropriate state government. The suburb specified must be a recognised suburb according to Geoscience Australia ([https://www.ga.gov.au/placename/](https://www.ga.gov.au/placename/))
    
-   stateCopy link to state
    
    Type: stringenum
    
    required
    
    Example
    
    NSW
    
    This represents the state or territory where the listed property is located. Available values "ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA".
    
    values
    
    -   ACT
        
    -   NSW
        
    -   NT
        
    -   QLD
        
    -   SA
        
    -   TAS
        
    -   VIC
        
    -   WA
        
    
-   postcodeCopy link to postcode
    
    Type: string `Pattern: ^[0-9]{4}$`
    
    required
    
    Example
    
    2000
    
    This is the recognised postal code for the property. The postcode specified must be recognised by Australia Post ([https://auspost.com.au/postcode](https://auspost.com.au/postcode)) officially
    
-   sectionCopy link to section
    
    Type: stringenum
    
    Default
    
    buy
    
    This is the section on realestate.com.au that the customer wishes to list the property in. Depending on this section chosen, it may have an effect on the list of products available to the customer. When this isn't specified, it defaults to _buy_. Available values "buy", "rent", "sold".
    
    values
    
    -   buy
        
    -   rent
        
    -   sold
        
    
-   listing\_typeCopy link to listing\_type
    
    Type: stringenum
    
    Default
    
    residential
    
    This is the type of property that the customer wishes to list. Depending on the type of property, it may affect the list of products available to the customer. When this isn't specified, it defaults to _residential_. Available values "residential", "land", "rural".
    
    values
    
    -   residential
        
    -   land
        
    -   rural
        
    
-   reupgradeCopy link to reupgrade
    
    Type: boolean
    
    Default
    
    false
    
    This is used to indicate whether the product is priced for the initial upgrade or a subsequent reupgrade. When a property listed has already had a product upgraded, it could entitle the customer to and additional discount on top of the initial upgrade discount. By default this is _false_.
    
-   dateCopy link to date
    
    Type: stringFormat: date-time
    
    Examples
    
    2022-06-30T10:00:00Z2022-06-30T00:00:00+10:00
    
    This is the date that the customer wishes to list, and to return the price for this date. This is an optional parameter and defaults to today's date (Australian Eastern Daylight Savings Time). **Note:** we will not allow a date in the past, or a date longer than 46 days from today's date.
    

Responses

-   200
    
    The list of products and prices available to the customer for the specified section and type of property.
    
    application/hal+json
    
-   400
    
    This response indicates when the required parameters were missing or if the values in the parameters were invalid.
    
    application/hal+json
    
-   401
    
    This response indicate when the caller is not allowed to access the content or API. Possible reasons for this could be authentication (missing or expired login tokens).
    
    application/hal+json
    
-   403
    
    This response indicate when the caller is not allowed to access the content or API. Possible reasons for this could be authorisation (caller is not allowed to access the prices for the agencyId).
    
    application/hal+json
    
-   404
    
    This response indicate when there are no available products to the customer for the specified query.
    
    application/hal+json
    
-   500
    
    This response indicate when there are some internal server errors.
    
    application/hal+json
    

Request Example for get/prices/v1/realestate-properties

Shell Curl

```curl
curl 'https://api.realestate.com.au/prices/v1/realestate-properties?agency_id=FEXBNP&suburb=Sydney&state=NSW&postcode=2000&section=buy&listing_type=residential&reupgrade=false&date=2022-06-30T10%3A00%3A00Z' \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /prices/v1/realestate-properties)

Status: 200Status: 400Status: 401Status: 403Status: 404Status: 500

Show Schema 

```json
{
  "_links": {
    "self": {
      "href": "https://api.realestate.com.au/prices/v1/realestate-properties?agency_id=FEXBNP&suburb=Sydney&state=NSW&postcode=2000"
    }
  },
  "section": "buy",
  "listingType": "residential",
  "reupgrade": false,
  "date": "1970-01-01",
  "all": [
    {
      "product": "premiere",
      "productName": "Premiere (60 days) - Buy",
      "duration": 60,
      "displayPrice": "$1000.00",
      "price": "1000.00",
      "rackPrice": "2000.00",
      "currency": "AUD"
    },
    {
      "product": "ebrochure",
      "productName": "eBrochure - Buy",
      "displayPrice": "$50.00",
      "price": "50.00",
      "rackPrice": "100.00",
      "currency": "AUD"
    },
    {
      "product": "audience-maximiser",
      "productName": "Audience Maximiser",
      "displayPrice": "$250.00",
      "price": "250.00",
      "rackPrice": "350.00",
      "currency": "AUD"
    }
  ],
  "manual": [
    {
      "product": "luxe",
      "productName": "Luxe Unlimited - Buy",
      "displayPrice": "$2000.00",
      "price": "2000.00",
      "rackPrice": "2000.00",
      "currency": "AUD",
      "topUpPrice": "1000.00"
    },
    {
      "product": "property-showcase",
      "productName": "Property Showcase - Buy",
      "displayPrice": "$100.00",
      "price": "100.00",
      "rackPrice": "100.00",
      "currency": "AUD"
    }
  ],
  "flex": {
    "exceptionDowngrade": [
      {
        "product": "highlight",
        "productName": "Highlight (30 days) - Buy",
        "duration": 30,
        "displayPrice": "$400.00",
        "price": "400.00",
        "rackPrice": "800.00",
        "currency": "AUD",
        "points": 1
      },
      {
        "product": "feature",
        "productName": "Feature (30 days) - Buy",
        "duration": 30,
        "displayPrice": "$200.00",
        "price": "200.00",
        "rackPrice": "450.00",
        "currency": "AUD",
        "points": 1
      },
      {
        "product": "standard",
        "productName": "Standard - Buy",
        "displayPrice": "$30.00",
        "price": "30.00",
        "rackPrice": "100.00",
        "currency": "AUD",
        "points": 1
      }
    ],
    "payOnSale": [
      {
        "product": "premiere",
        "productName": "Premiere (60 days) - Buy",
        "duration": 60,
        "displayPrice": "$0.00 up front, $2,400.00 when sold",
        "price": "2400.00",
        "rackPrice": "2000.00",
        "currency": "AUD",
        "points": 1
      }
    ]
  }
}
```

JSONCopy

JSONCopy

Ultimate Marketing Package

The list of products and prices available to the customer for the specified section and type of property.
