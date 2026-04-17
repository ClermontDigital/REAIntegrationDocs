---
title: "Explore Integrations API"
source: https://partner.realestate.com.au/integrations/explore/
fetched_at: 2026-04-17T03:52:05.124Z
---

# Explore Integrations API

v1

OAS 3.0.2

# Integrations API

Download OpenAPI Document

json

Download OpenAPI Document

yaml

The Integrations API allows you to retrieve information about delegations between API Consumers and Resource Owners. An Integration represents the authorization relationship and associated scopes granted to your application by a resource owner (such as an agency).

This API uses HAL (Hypertext Application Language) for hypermedia links.

Server

Server:https://api.realestate.com.au

Production API

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

## Integrations

​Copy link

Integrations Operations

-   get/me/v1/integrations
-   get/me/v1/integrations/{id}

### List all integrations

​Copy link

Retrieves a paginated list of all integrations for the authenticated API consumer. Results can be filtered by the `since` parameter to only return integrations updated after a specific timestamp. Pagination is cursor-based using the `nextPage` parameter.

Query Parameters

-   sinceCopy link to since
    
    Type: stringFormat: date-time
    
    Example
    
    2024-10-02T02:30:30.554399Z
    
    Optional query parameter to filter integrations updated since the specified timestamp
    
-   nextPageCopy link to nextPage
    
    Type: string
    
    Example
    
    eyJ0aW1lc3RhbXAiOiIyMDI0LTA0LTAyVDAwOjAwOjAwWiIsImlkIjoiYWJjMTIzIn0=
    
    Optional query parameter to paginate the Integration search results
    

Responses

-   200
    
    Successfully retrieved integrations
    
    application/json
    
-   400
    
    Bad Request
    
-   401
    
    Unauthorized
    
-   403
    
    Forbidden
    
-   500
    
    Internal Server Error
    

Request Example for get/me/v1/integrations

Shell Curl

```curl
curl 'https://api.realestate.com.au/me/v1/integrations?since=2024-10-02T02%3A30%3A30.554399Z&nextPage=eyJ0aW1lc3RhbXAiOiIyMDI0LTA0LTAyVDAwOjAwOjAwWiIsImlkIjoiYWJjMTIzIn0%3D' \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /me/v1/integrations)

Status: 200Status: 400Status: 401Status: 403Status: 500

Show Schema 

```json
{
  "_links": {
    "self": {
      "href": "https://api.realestate.com.au/me/v1/integrations"
    },
    "next": {
      "href": "https://api.realestate.com.au/me/v1/integrations?nextPage=eyJ0aW1lc3RhbXAiOiIyMDI0LTA0LTAyVDAwOjAwOjAwWiIsImlkIjoiYWJjMTIzIn0=",
      "cursor": "eyJ0aW1lc3RhbXAiOiIyMDI0LTA0LTAyVDAwOjAwOjAwWiIsImlkIjoiYWJjMTIzIn0="
    }
  },
  "_embedded": {
    "integrations": [
      {
        "integrationId": "123e4567-e89b-12d3-a456-426614174000",
        "updatedAt": "2024-10-03T05:30:30.554399Z",
        "ownerId": "XYZABC",
        "ownerType": "agency",
        "scopes": [
          "listing:listings:write",
          "lead:enquiries:read"
        ],
        "_links": {
          "self": {
            "href": "https://api.realestate.com.au/me/v1/integrations/123e4567-e89b-12d3-a456-426614174000"
          }
        }
      }
    ]
  }
}
```

JSONCopy

JSONCopy

Successfully retrieved integrations

### Get a specific integration

​Copy link

Retrieves detailed information about a specific integration by its ID

Path Parameters

-   idCopy link to id
    
    Type: stringFormat: uuid
    
    required
    
    Example
    
    123e4567-e89b-12d3-a456-426614174000
    
    The ID of the Integration to retrieve
    

Responses

-   200
    
    Successfully retrieved the integration
    
    application/json
    
-   401
    
    Unauthorized
    
-   403
    
    Forbidden
    
-   404
    
    Integration not found
    
-   500
    
    Internal Server Error
    

Request Example for get/me/v1/integrations/_{id}_

Shell Curl

```curl
curl https://api.realestate.com.au/me/v1/integrations/123e4567-e89b-12d3-a456-426614174000 \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /me/v1/integrations/{id})

Status: 200Status: 401Status: 403Status: 404Status: 500

Show Schema 

```json
{
  "integrationId": "123e4567-e89b-12d3-a456-426614174000",
  "updatedAt": "2024-10-03T05:30:30.554399Z",
  "ownerId": "XYZABC",
  "ownerType": "agency",
  "scopes": [
    "listing:listings:write",
    "lead:enquiries:read"
  ],
  "_links": {
    "self": {
      "href": "https://api.realestate.com.au/me/v1/integrations/123e4567-e89b-12d3-a456-426614174000"
    }
  }
}
```

JSONCopy

JSONCopy

Successfully retrieved the integration
