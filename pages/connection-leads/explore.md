---
title: "Explore Connection Leads API"
source: https://partner.realestate.com.au/connection-leads/explore/
fetched_at: 2026-04-17T03:51:13.686Z
---

# Explore Connection Leads API

v1.0.3

OAS 3.1.1

# Connection Leads API

Download OpenAPI Document

json

Download OpenAPI Document

yaml

Poll connection leads of the applications approved by agents, and poll the affiliated agencies for the provider.

Server

Server:https://api.realestate.com.au/applications/v1/rental

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

## Connection Leads API

​Copy link

Connection Leads API Operations

-   get/connection-leads
-   get/connection-leads/agencies

### Poll connection leads of the applications approved by agents

​Copy link

The `/connection-leads` endpoint returns a collection of connection leads against the applications which belong to the agencies that authorized the partner. And the applications were approved after the specific time. The response includes the details of the application, tenant, property, agency and agent. The number of the leads will be up to 25 per page.

**Support the following query parameters:**

-   happenedSince

Query Parameters

-   happenedSinceCopy link to happenedSince
    
    Type: stringFormat: date-time
    
    required
    
    The endpoint will return the connection leads against applications approved since `happenedSince` (exclusive). This parameter should be formatted as ISO-8601 datetime, i.e. `2020-08-27T22:47:01.604Z`. When using Postman, curl, or a web application, it must use correct URL encoding.
    

Responses

-   200
    
    A set of connection leads where each one contains application, tenant, property, agency and agent.
    
    application/hal+json
    
-   400
    
    The request is missing required fields or is malformed
    
    application/hal+json
    
-   401
    
    The authentication token in the request is invalid.
    

Request Example for get/connection-leads

Shell Curl

```curl
curl 'https://api.realestate.com.au/applications/v1/rental/connection-leads?happenedSince=' \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /connection-leads)

Status: 200Status: 400Status: 401

Show Schema 

```json
{
  "_embedded": {
    "connectionLeads": [
      {
        "application": {
          "id": "123e4567-e89b-12d3-a456-426614174000",
          "approvedAt": "2026-04-17T03:51:12.638Z"
        },
        "tenant": {
          "firstName": "string",
          "lastName": "string",
          "email": "string",
          "mobilePhoneNumber": "string",
          "birthDate": "2026-04-17",
          "identityDocument": {
            "documentType": "DRIVER_LICENCE",
            "passportCountryCode": "string",
            "passportNumber": "string",
            "passportExpiryDate": "2026-04-17",
            "licenceNumber": "string",
            "licenceState": "string",
            "licenceExpiryDate": "2026-04-17"
          }
        },
        "property": {
          "street": "string",
          "suburb": "string",
          "state": "string",
          "postCode": "string",
          "moveInDate": "2026-04-17"
        },
        "agency": {
          "reaId": "string",
          "name": "string"
        },
        "agents": [
          {
            "id": "string",
            "name": "string",
            "email": "string"
          }
        ],
        "connectionProviderName": "string",
        "utilityConnectionsAllowed": [
          "string"
        ]
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

A set of connection leads where each one contains application, tenant, property, agency and agent.

### Poll the affiliated agencies for the provider.

​Copy link

The `/connection-leads/agencies` endpoint returns a collection of affiliated agencies for the provider after the specific time, the response include agencyId, agencyName, providerName, and updatedAt. The number of the affiliated agencies will be up to 25 per page.

**Support the following query parameters:**

-   happenedSince

Query Parameters

-   happenedSinceCopy link to happenedSince
    
    Type: stringFormat: date-time
    
    required
    
    The endpoint will return a collection of affiliated agencies for the provider since `happenedSince` (exclusive). This parameter should be formatted as ISO-8601 datetime, i.e. `2020-08-27T22:47:01.604Z`. When using Postman, curl, or a web application, it must use correct URL encoding.
    

Responses

-   200
    
    A set of affiliated agencies where each one contains agencyId, agencyName, providerName, and updatedAt.
    
    application/hal+json
    
-   400
    
    The request is missing required fields or is malformed
    
    application/hal+json
    
-   401
    
    The authentication token in the request is invalid.
    

Request Example for get/connection-leads/agencies

Shell Curl

```curl
curl 'https://api.realestate.com.au/applications/v1/rental/connection-leads/agencies?happenedSince=' \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /connection-leads/agencies)

Status: 200Status: 400Status: 401

Show Schema 

```json
{
  "_embedded": {
    "affiliatedAgencies": [
      {
        "agencyId": "string",
        "agencyName": "string",
        "providerName": "string",
        "updatedAt": "2026-04-17T03:51:12.638Z"
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

A set of affiliated agencies where each one contains agencyId, agencyName, providerName, and updatedAt.
