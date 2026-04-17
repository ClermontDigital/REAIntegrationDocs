---
title: "Explore Leads API"
source: https://partner.realestate.com.au/leads/explore/
fetched_at: 2026-04-17T03:52:18.990Z
---

# Explore Leads API

v1.1.1

OAS 3.1.1

# Leads API

Download OpenAPI Document

json

Download OpenAPI Document

yaml

Retrieve leads enquiries from Leads API

Server

Server:https://api.realestate.com.au/lead

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

## Enquiries

​Copy link

Enquiries Operations

-   get/v1/enquiries
-   get/v1/enquiries/{enquiry\_id}
-   get/v1/enquiries/count

### Get multiple enquiries accessible to the partner

​Copy link

The Enquiries endpoint returns a paginated collection of enquiries that the partner has read access to. Supports the following query parameters:

-   since
-   page
-   agency\_id
-   agent\_profile\_id
-   listing\_ids
-   exclude\_types

Query Parameters

-   sinceCopy link to since
    
    Type: string
    
    Either `since` or `page` is required! An ISO-8601 timestamp (UTC) representing the point in time to begin consuming enquiries from.
    
-   pageCopy link to page
    
    Type: string
    
    Either `since` or `page` is required! A unique identifier representing the page.
    
-   agency\_idCopy link to agency\_id
    
    Type: string
    
    String representing a specific agency id. e.g ABCDEF.
    
-   agent\_profile\_idCopy link to agent\_profile\_id
    
    Type: string
    
    String representing a specific salesperson id. e.g 123.
    
-   listing\_idsCopy link to listing\_ids
    
    Type: string
    
    String of comma separated listing ids for an enquiry.
    
-   exclude\_typesCopy link to exclude\_types
    
    Type: string
    
    String of comma separated enquiry types to be removed from response.
    

Responses

-   200
    
    A set of enquiries received after the since timestamp
    
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
    

Request Example for get/v1/enquiries

Shell Curl

```curl
curl 'https://api.realestate.com.au/lead/v1/enquiries?since=&page=&agency_id=&agent_profile_id=&listing_ids=&exclude_types=' \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /v1/enquiries)

Status: 200Status: 400Status: 401Status: 403Status: 404Status: 405Status: 406Status: 429Status: 500Status: default

Show Schema 

```json
{
  "_embedded": {
    "enquiries": [
      {
        "id": "string",
        "agencyId": "string",
        "receivedAt": "2026-04-17T03:52:17.812Z",
        "processedAt": "2026-04-17T03:52:17.812Z",
        "comments": "string",
        "requestedInformation": [
          "string"
        ],
        "suppliedMarketStatus": "string",
        "agentRecipients": [
          "string"
        ],
        "contactDetails": {
          "fullName": "string",
          "email": "string",
          "phone": "string",
          "postcode": "string",
          "preferredContactMethod": "PHONE"
        },
        "source": {
          "id": "string",
          "name": "string",
          "type": "string"
        },
        "externalIdentifiers": {
          "externalProjectId": "string",
          "externalListingId": "string"
        },
        "customAttributes": {
          "additionalProperty": "string"
        },
        "emailSubject": "string",
        "_links": {
          "self": {
            "href": "string"
          }
        },
        "type": "DEVELOPER_BUILDER_DESIGN",
        "listing": {
          "id": "string",
          "parentId": "string",
          "address": "string"
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

A set of enquiries received after the since timestamp

## Seller Leads

​Copy link

Seller Leads Operations

-   get/v2/seller-leads
-   get/v2/seller-leads/{enquiry\_id}
