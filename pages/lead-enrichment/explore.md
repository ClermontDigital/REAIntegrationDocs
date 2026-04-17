---
title: "Explore"
source: https://partner.realestate.com.au/lead-enrichment/explore/
fetched_at: 2026-04-17T03:52:11.138Z
---

# Explore

v1.0.0

OAS 3.1.1

# Lead Enrichment API

Download OpenAPI Document

json

Download OpenAPI Document

yaml

Retrieves enrichment information for enquiries

Server

Server:https://api.realestate.com.au/lead-enrichment/v1

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

### /enrichments

​Copy link

Get enrichment data for multiple enquiries accessible to the partner

Query Parameters

-   enquiryIdsCopy link to enquiryIds
    
    Type: array string\[\]
    
    Comma-separated list of enquiry IDs to request
    
-   sinceCopy link to since
    
    Type: string
    
    an ISO-8601 timestamp (UTC) representing the point in time to begin consuming enrichment data from. Filters results by enquiry creation time.
    
-   pageIndexCopy link to pageIndex
    
    Type: integer
    
    Value representing page index starting 1 (default is 1)
    
-   pageSizeCopy link to pageSize
    
    Type: integer
    
    Value representing the number of enrichment data items per page (default is 20)
    

Responses

-   200
    
    A set of enrichment data items for enquiries accessible to the partner
    
    application/json
    
-   400
    
    Bad request. The request is missing required fields or is malformed.
    
    application/json
    
-   401
    
    Unauthorized. The request requires a valid authentication token.
    
    application/json
    
-   403
    
    Forbidden. Access to the requested resource is forbidden.
    
    application/json
    
-   404
    
    Not Found. The requested resource cannot be found.
    
    application/json
    
-   405
    
    Method Not Allowed. The requested HTTP Method is not permitted on this resource.
    
    application/json
    
-   406
    
    Not Acceptable. The response content type is not acceptable according to the accept headers sent in the request.
    
    application/json
    
-   429
    
    Too Many Requests. You have exceeded the maximum number of requests permitted.
    
    application/json
    
-   500
    
    Internal Server Error. Sorry, your request could not be serviced at this time.
    
    application/json
    
-   default
    
    Unexpected error
    
    application/json
    

Request Example for get/enrichments

Shell Curl

```curl
curl 'https://api.realestate.com.au/lead-enrichment/v1/enrichments?enquiryIds=&since=&pageIndex=1&pageSize=1' \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /enrichments)

Status: 200Status: 400Status: 401Status: 403Status: 404Status: 405Status: 406Status: 429Status: 500Status: default

Show Schema 

```json
{
  "_embedded": {
    "items": [
      {
        "enquiryId": "string",
        "listingId": "string",
        "score": 1,
        "isFinalised": true,
        "enrichedAt": "string",
        "buyerReadiness": "low",
        "listingEngagement": "low",
        "topSearchedConfigurationBathrooms": [
          {
            "position": 1,
            "band": "low",
            "match": true,
            "bathrooms": 1
          }
        ],
        "topSearchedConfigurationBedrooms": [
          {
            "position": 1,
            "band": "low",
            "match": true,
            "bedrooms": 1
          }
        ],
        "topSearchedConstructionTypes": [
          {
            "position": 1,
            "band": "low",
            "match": true,
            "constructionType": "string"
          }
        ],
        "topSearchedPropertyTypes": [
          {
            "position": 1,
            "band": "low",
            "match": true,
            "propertyType": "house"
          }
        ],
        "topSearchedSuburbs": [
          {
            "position": 1,
            "band": "low",
            "match": true,
            "suburb": "string"
          }
        ],
        "_links": {
          "self": {
            "href": "string"
          },
          "enquiry": {
            "href": "string"
          }
        }
      }
    ]
  },
  "_links": {
    "self": {
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

A set of enrichment data items for enquiries accessible to the partner

### Get enrichment data for a single enquiry

​Copy link

Enrichment data for a single enquiry with given ID

Path Parameters

-   enquiryIdCopy link to enquiryId
    
    Type: string
    
    required
    
    Unique identifier representing a specific enquiry
    

Responses

-   200
    
    Enrichment data item for enquiry with given ID
    
    application/json
    
-   400
    
    Bad request. The request is missing required fields or is malformed.
    
    application/json
    
-   401
    
    Unauthorized. The request requires a valid authentication token.
    
    application/json
    
-   403
    
    Forbidden. Access to the requested resource is forbidden.
    
    application/json
    
-   404
    
    Not Found. The requested resource cannot be found.
    
    application/json
    
-   405
    
    Method Not Allowed. The requested HTTP Method is not permitted on this resource.
    
    application/json
    
-   406
    
    Not Acceptable. The response content type is not acceptable according to the accept headers sent in the request.
    
    application/json
    
-   429
    
    Too Many Requests. You have exceeded the maximum number of requests permitted.
    
    application/json
    
-   500
    
    Internal Server Error. Sorry, your request could not be serviced at this time.
    
    application/json
    
-   default
    
    Unexpected error
    
    application/json
    

Request Example for get/enrichments/_{enquiryId}_

Shell Curl

```curl
curl 'https://api.realestate.com.au/lead-enrichment/v1/enrichments/{enquiryId}' \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /enrichments/{enquiryId})

Status: 200Status: 400Status: 401Status: 403Status: 404Status: 405Status: 406Status: 429Status: 500Status: default

Show Schema 

```json
{
  "enquiryId": "string",
  "listingId": "string",
  "score": 1,
  "isFinalised": true,
  "enrichedAt": "string",
  "buyerReadiness": "low",
  "listingEngagement": "low",
  "topSearchedConfigurationBathrooms": [
    {
      "position": 1,
      "band": "low",
      "match": true,
      "bathrooms": 1
    }
  ],
  "topSearchedConfigurationBedrooms": [
    {
      "position": 1,
      "band": "low",
      "match": true,
      "bedrooms": 1
    }
  ],
  "topSearchedConstructionTypes": [
    {
      "position": 1,
      "band": "low",
      "match": true,
      "constructionType": "string"
    }
  ],
  "topSearchedPropertyTypes": [
    {
      "position": 1,
      "band": "low",
      "match": true,
      "propertyType": "house"
    }
  ],
  "topSearchedSuburbs": [
    {
      "position": 1,
      "band": "low",
      "match": true,
      "suburb": "string"
    }
  ],
  "_links": {
    "self": {
      "href": "string"
    },
    "enquiry": {
      "href": "string"
    }
  }
}
```

JSONCopy

JSONCopy

Enrichment data item for enquiry with given ID
