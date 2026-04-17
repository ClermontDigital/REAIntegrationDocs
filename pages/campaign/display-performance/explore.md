---
title: "Explore Display Performance API"
source: https://partner.realestate.com.au/campaign/display-performance/explore/
fetched_at: 2026-04-17T03:50:46.923Z
---

# Explore Display Performance API

v0.0.3

OAS 3.0.0

# Campaign API - display performance

Download OpenAPI Document

json

Download OpenAPI Document

yaml

Aggregated reporting data for developer campaign display performance.

Server

Server:https://api.realestate.com.au

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

## Campaign

​Copy link

Campaign Operations

-   get/campaign/v1/display-performance
-   get/campaign/v1/display-performance/{campaignId}
-   get/campaign/v1/display-performance/csv

### Get multiple campaigns

​Copy link

Returns a paginated collection of campaigns

Query Parameters

-   where\[name\]\[iLike\]Copy link to where\[name\]\[iLike\]
    
    Type: string
    
    Example
    
    Super-special-campaign
    
    Find all campaigns where name contains a given value
    
-   startDateCopy link to startDate
    
    Type: string
    
    Example
    
    2023-09-16
    
    Start date greater than or equal to a given date (iso date)
    
-   endDateCopy link to endDate
    
    Type: string
    
    Example
    
    2023-09-16
    
    End date less than or equal to a given date (iso date)
    
-   statusCopy link to status
    
    Type: string
    
    Example
    
    Active
    
    Find all campaigns of a certain status. Available statuses are `Active`, `Pending`, `Completed` and `Unknown`.
    
-   productCopy link to product
    
    Type: string
    
    Example
    
    Display
    
    Find all campaigns of a certain product type.
    
-   pageSizeCopy link to pageSize
    
    Type: integer
    
    Example
    
    1
    
    Specify the number of results to return in one request, specified as an integer from `1` to `100`
    
-   pageIndexCopy link to pageIndex
    
    Type: integer
    
    Example
    
    1
    
    Specify the page index of results to return. Zero index based.
    
-   sortBy\[costPerLead\]Copy link to sortBy\[costPerLead\]
    
    Type: string
    
    Example
    
    asc
    
    Specify the sorting field (`asc` or `desc`). Any field can be sorted by changing the value in the square brackets. For example, `sortBy[createdAt]=asc`
    
-   listingIdCopy link to listingId
    
    Type: string
    
    Example
    
    5123456
    
    Return campaign list given a specific listing ID
    
-   excludeCommercialCampaignsCopy link to excludeCommercialCampaigns
    
    Type: boolean
    
    Example
    
    true
    
    Passing "true" will exclude all the Commercial Native Ads campaigns from response, any other value will return both Commercial and Residential campaigns.
    

Responses

-   200
    
    Successful Operation
    
    application/json
    
-   400
    
    Bad request. The request is missing required fields or is malformed.
    
    application/json
    
-   422
    
    422 Unprocessable Entity
    
    application/json
    
-   429
    
    Too Many Requests. You have exceeded the maximum number of requests permitted.
    
    application/json
    
-   500
    
    A general error has occurred. Inspect the payload for additional information
    
    application/json
    

Request Example for get/campaign/v1/display-performance

Shell Curl

```curl
curl 'https://api.realestate.com.au/campaign/v1/display-performance?where[name][iLike]=Super-special-campaign&startDate=2023-09-16&endDate=2023-09-16&status=Active&product=Display&pageSize=1&pageIndex=1&sortBy[costPerLead]=asc&listingId=5123456&excludeCommercialCampaigns=true' \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /campaign/v1/display-performance)

Status: 200Status: 400Status: 422Status: 429Status: 500

Show Schema 

```json
{
  "_embedded": {
    "items": [
      {
        "id": "11111",
        "name": "Harmik Estates",
        "product": "Display",
        "status": "active",
        "accountManager": {
          "id": "4444",
          "name": "Owen Wilson"
        },
        "advertiser": {
          "id": "3333",
          "name": "Agency Limited"
        },
        "createdAt": "2021-09-16 13:00:00",
        "startDate": "2021-09-17 13:00:00",
        "endDate": "2021-09-18 13:00:00",
        "impressionsGoal": "8",
        "impressionsDelivered": "2",
        "clicksDelivered": "2",
        "leadsDelivered": "2",
        "clickThroughRate": "50.00",
        "costPerLead": "20.00",
        "budget": "1000.00",
        "spend": "0.00",
        "budgetRemaining": "1000.00",
        "listingId": "5123456"
      }
    ]
  },
  "_links": {
    "self": {
      "href": "https://exampleurl.com"
    },
    "next": {
      "href": "https://exampleurl.com?page=2"
    }
  },
  "total": 20
}
```

JSONCopy

JSONCopy

Successful Operation

## Flight

​Copy link

Flight Operations

-   get/campaign/v1/display-performance/{campaignId}/flights

## Creative

​Copy link

Creative Operations

-   get/{campaignId}/creatives
