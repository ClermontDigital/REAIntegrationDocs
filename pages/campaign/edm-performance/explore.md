---
title: "Explore eDM Performance API"
source: https://partner.realestate.com.au/campaign/edm-performance/explore/
fetched_at: 2026-04-17T03:50:51.659Z
---

# Explore eDM Performance API

v1.2.9

OAS 3.1.1

# Campaign API - eDM Performance

Download OpenAPI Document

json

Download OpenAPI Document

yaml

High-level details of eDM campaigns

Server

Server:https://api.realestate.com.au/campaign/v1/edm-performance

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

## eDM Performance

​Copy link

eDM Performance Operations

-   get/edm-performance

### Get list of campaigns as per user's permission

​Copy link

The /edm-performance endpoint returns a list of campaigns that a user is authorised to view. It provides the user with high-level detail of each returned campaign. By default, this endpoint returns 20 campaigns ordered by the send date, from newest to oldest and returns the first page of the results.

Responses

-   200
    
    A list of campaigns for the user.
    
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
    
    No edm-performance resources were found for the requested parameters
    
    application/hal+json
    
-   default
    
    Unexpected error
    
    application/hal+json
    

Request Example for get/edm-performance

Shell Curl

```curl
curl https://api.realestate.com.au/campaign/v1/edm-performance/edm-performance \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /edm-performance)

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
        "flightId": "string",
        "campaignId": "string",
        "accountManager": {
          "id": "string",
          "name": "string"
        },
        "advertiser": {
          "id": "string",
          "name": "string"
        },
        "name": "string",
        "sendDate": "string",
        "sends": "string",
        "clicks": "string",
        "uniqueClicks": "string",
        "clickThroughRate": "string",
        "flatRateLocal": "string",
        "leads": "string",
        "costPerLead": "string",
        "product": "string"
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

A list of campaigns for the user.
