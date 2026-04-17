---
title: "Explore"
source: https://partner.realestate.com.au/ratings-reviews/explore/
fetched_at: 2026-04-17T03:53:03.745Z
---

# Explore

v1.0.0

OAS 3.0.2

# Rating reviews outbound API

Download OpenAPI Document

json

Download OpenAPI Document

yaml

This API allows partners to retrieve ratings and reviews information for agents and agencies listed on realestate.com.au. It provides endpoints to fetch ratings and reviews based on agent profile IDs or agency IDs, as well as aggregate statistics such as average ratings and total review counts.

Server

Server:https://api.realestate.com.au/customer-profile/v1/ratings-reviews

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

Scopes Selected 0 / 0

Add Scope Deselect All

Client Libraries

Shell

Ruby

Node.js

PHP

Python

More Select from all clients

Shell Curl

## Agents stats

​Copy link

Agents stats Operations

-   get/agents/{agentProfileIds}/stats

### /agents/{agentProfileIds}/stats

​Copy link

Get agent stats by a list of profileIds

Path Parameters

-   agentProfileIdsCopy link to agentProfileIds
    
    Type: string
    
    required
    
    Example
    
    12345,56789
    
    The agent profile ids delimited by comma in string format
    

Responses

-   200
    
    Success
    
    application/json
    
-   400
    
    Bad Request
    
    application/json
    
-   500
    
    Internal service error
    
    application/json
    

Request Example for get/agents/_{agentProfileIds}_/stats

Shell Curl

```curl
curl https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agents/12345,56789/stats \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /agents/{agentProfileIds}/stats)

Status: 200Status: 400Status: 500

Show Schema 

```json
{
  "agentsStats": [
    {
      "profileId": 123456,
      "averageRating": 4.782,
      "reviewsCount": 13
    }
  ]
}
```

JSONCopy

JSONCopy

Success

## Agent ratings reviews

​Copy link

Agent ratings reviews Operations

-   get/agent/{agentProfileId}

### /agent/{agentProfileId}

​Copy link

Get ratings and reviews information by profileId

Path Parameters

-   agentProfileIdCopy link to agentProfileId
    
    Type: string
    
    required
    
    Example
    
    12345
    
    The agent profile id
    

Query Parameters

-   pageCopy link to page
    
    Type: string
    
    required
    
    Example
    
    cGFnZTo1LHNpemU6MTA=
    
    Either `since` or `page` is required! Unique identifer representing the page
    
-   sinceCopy link to since
    
    Type: string
    
    required
    
    Example
    
    2010-09-06T12:27:00.1Z
    
    Either `since` or `page` is required! Filter reviews from a specific time (UTC Time) in ISO format.
    
-   ratingsCopy link to ratings
    
    Type: string
    
    Example
    
    1,2,3
    
    Filter reviews rating values delimited by comma in string format, default '1,2,3,4,5'
    
-   orderCopy link to order
    
    Type: stringenum
    
    Order options for ratings reviews, DESC or ASC, default DESC.
    
    values
    
    -   ASC
        
    -   DESC
        
    

Responses

-   200
    
    Success
    
    application/json
    
-   400
    
    Bad Request
    
    application/json
    
-   500
    
    Internal service error
    
    application/json
    

Request Example for get/agent/_{agentProfileId}_

Shell Curl

```curl
curl 'https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agent/12345?page=cGFnZTo1LHNpemU6MTA%3D&since=2010-09-06T12%3A27%3A00.1Z&ratings=1%2C2%2C3&order=ASC' \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /agent/{agentProfileId})

Status: 200Status: 400Status: 500

Show Schema 

```json
{
  "totalCount": 123,
  "_links": {
    "self": {
      "href": "string"
    },
    "next": {
      "href": "string"
    },
    "prev": {
      "href": "string"
    }
  },
  "result": [
    {
      "rating": 5,
      "content": "string",
      "listing": {
        "id": "string",
        "_links": {
          "self": {
            "href": "string"
          }
        }
      },
      "reviewer": {
        "role": "buyer",
        "name": "Peter K"
      },
      "agent": {
        "profileId": 999999,
        "name": "Charlie Smith",
        "emailAddresses": [
          "charlie@smith.com"
        ],
        "_links": {
          "self": {
            "href": "string"
          }
        }
      },
      "agency": {
        "id": "FUUVDN",
        "name": "Jellis Craig Whitehorse",
        "_links": {
          "self": {
            "href": "string"
          }
        }
      },
      "createdDate": "string"
    }
  ]
}
```

JSONCopy

JSONCopy

Success

## Agencies stats

​Copy link

Agencies stats Operations

-   get/agencies/{agencyIds}/stats

## Agency ratings reviews

​Copy link

Agency ratings reviews Operations

-   get/agencies/{agencyIds}
