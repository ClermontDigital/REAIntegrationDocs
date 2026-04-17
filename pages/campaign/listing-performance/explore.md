---
title: "Explore Listing Performance API"
source: https://partner.realestate.com.au/campaign/listing-performance/explore/
fetched_at: 2026-04-17T03:50:56.148Z
---

# Explore Listing Performance API

v1.6.9

OAS 3.1.1

# Campaign API

Download OpenAPI Document

json

Download OpenAPI Document

yaml

Retrieve listing performance reports for property advertising campaigns

Server

Server:https://api.realestate.com.au/campaign/v1

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

## Listing Performance

​Copy link

Listing Performance Operations

-   get/listing-performance
-   get/listing-performance/{listing\_id}

### Get multiple listing performance reports by agency ID

​Copy link

The /listing-performance endpoint returns a collection of listing performance reports for property advertising campaigns. The response includes reports for listings that match the supplied query parameters. Each listing performance report includes details about the listing, and a list of portal metrics for the report period.

Each portal metrics object contains metrics at two different aggregation levels:

-   all (totals for the whole reporting period)
-   daily (totals for calendar dates for the whole reporting period)

Supports the following query parameters:

-   agency\_id

\*_Not available for Commercial listings performance._

Query Parameters

-   agency\_idCopy link to agency\_id
    
    Type: string
    
    required
    
    Unique identifier representing the listing agency.
    

Responses

-   200
    
    A set of listing performance reports for the supplied query.
    
    application/hal+json
    
-   400
    
    The request is missing required fields or is malformed
    
    application/hal+json
    
-   401
    
    The request requires a valid authentication token
    
    application/hal+json
    
-   403
    
    Access to the requested resource is forbidden
    
    application/hal+json
    
-   404
    
    No listing-performance resources were found for the requested parameters
    
    application/hal+json
    
-   default
    
    Unexpected error
    
    application/hal+json
    

Request Example for get/listing-performance

Shell Curl

```curl
curl 'https://api.realestate.com.au/campaign/v1/listing-performance?agency_id=' \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /listing-performance)

Status: 200Status: 400Status: 401Status: 403Status: 404Status: default

Show Schema 

```json
{
  "_embedded": {
    "items": [
      {
        "_links": {
          "self": {
            "href": "string"
          }
        },
        "id": "string",
        "dataSourceLastUpdated": {
          "listingEvents": "2026-04-17",
          "audienceMaximiser": "2026-04-17",
          "eBrochure": "2026-04-17",
          "bundledNotifications": "2026-04-17",
          "amplify": "2026-04-17"
        },
        "lastModifiedAt": "string",
        "listing": {
          "id": "string",
          "externalListingId": "string",
          "agencyId": "string"
        },
        "reportingPeriod": {
          "startDate": "2026-04-17",
          "endDate": "2026-04-17"
        },
        "portalMetrics": [
          {
            "portalName": "realestate_au",
            "all": [
              {
                "metricName": "listingEvents",
                "metricType": "sum",
                "metricPeriods": [
                  {
                    "period": "string",
                    "metricValues": [
                      "[Max Depth Exceeded]"
                    ]
                  }
                ]
              }
            ],
            "daily": [
              {
                "metricName": "listingEvents",
                "metricType": "sum",
                "metricPeriods": [
                  {
                    "period": "string",
                    "metricValues": [
                      "[Max Depth Exceeded]"
                    ]
                  }
                ]
              }
            ]
          }
        ],
        "productMetrics": [
          {
            "productName": "string",
            "productPurchases": [
              {
                "purchaseId": "string",
                "purchaseType": "string",
                "all": [
                  {
                    "metricName": "listingEvents",
                    "metricType": "sum",
                    "metricPeriods": [
                      "[Max Depth Exceeded]"
                    ]
                  }
                ],
                "daily": [
                  {
                    "metricName": "listingEvents",
                    "metricType": "sum",
                    "metricPeriods": [
                      "[Max Depth Exceeded]"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "_links": {
    "self": {
      "href": "string"
    },
    "prev": {
      "href": "string"
    },
    "next": {
      "href": "string"
    }
  }
}
```

JSONCopy

JSONCopy

A set of listing performance reports for the supplied query.
