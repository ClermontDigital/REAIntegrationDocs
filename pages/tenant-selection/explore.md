---
title: "Explore"
source: https://partner.realestate.com.au/tenant-selection/explore/
fetched_at: 2026-04-17T03:53:21.074Z
---

# Explore

v1.0.0

OAS 3.1.1

# Tenant Selection API

Download OpenAPI Document

json

Download OpenAPI Document

yaml

Poll applications' details and update the application status.

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

Scopes Selected 2 / 2

Add Scope Deselect All

Client Libraries

Shell

Ruby

Node.js

PHP

Python

More Select from all clients

Shell Curl

## Tenant Selection API

​Copy link

Tenant Selection API Operations

-   get/applications/published/feed
-   get/applications/updated/feed
-   put/applications/{applicationId}/status

### Poll published applications' details by happenedSince and agencyIds(optional)

​Copy link

The `/applications/published/feed` endpoint returns a list of applications ordered by publication date ascending which belong to the agencies and have been published since the specific time. The response includes the details of the application, the application url, array of applicants, and details of the listing. The number of the applications will be up to 25 per page. Retrieving without the parameter `agencyIds` will return all the applications that belong to the agencies for which the current partner is authorised.

**Support the following query parameters:**

-   agencyIds(optional)
-   happenedSince

Query Parameters

-   agencyIdsCopy link to agencyIds
    
    Type: array string\[\]
    
    A comma-separated list of `agency id` to query the applications which belong to them. If one of the agency is invalid, the request will be rejected.
    
-   happenedSinceCopy link to happenedSince
    
    Type: stringFormat: date-time
    
    required
    
    The endpoint will return the applications published since `happenedSince` (exclusive). This parameter should be formatted as ISO-8601 datetime, i.e. `2020-08-27T22:47:01.604Z`. When using Postman, curl, or a web application, it must use correct URL encoding.
    

Responses

-   200
    
    A set of applications which belong to the agencies and have been published since specific time.
    
    application/hal+json
    
-   400
    
    The request is missing required fields or is malformed
    
    application/hal+json
    
-   401
    
    The authentication token in the request is invalid or the agency id is invalid.
    

Request Example for get/applications/published/feed

Shell Curl

```curl
curl 'https://api.realestate.com.au/applications/v1/rental/applications/published/feed?agencyIds=&happenedSince=' \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /applications/published/feed)

Status: 200Status: 400Status: 401

Show Schema 

```json
{
  "_embedded": {
    "publishedApplications": [
      {
        "applicants": [
          {
            "applicantContactDetails": {
              "email": "string",
              "firstName": "string",
              "lastName": "string",
              "phoneNumber": "string"
            },
            "applicantREAId": "123e4567-e89b-12d3-a456-426614174000",
            "primaryApplicant": true,
            "pets": {
              "dogs": 1,
              "cats": 1,
              "others": 1
            },
            "hasOrWillInspect": true,
            "inspectionDate": "2026-04-17",
            "otherOccupants": 1
          }
        ],
        "applicationDetails": {
          "leaseStartDate": "2026-04-17",
          "leaseTerm": 1,
          "publishedAt": "2026-04-17T03:53:20.007Z",
          "statusLastUpdatedAt": "2026-04-17T03:53:20.007Z",
          "applicationStatus": "string",
          "isShortlisted": true,
          "rentOfferAmount": 1
        },
        "applicationDetailsUrl": "string",
        "applicationId": "123e4567-e89b-12d3-a456-426614174000",
        "listingDetails": {
          "address": {
            "postCode": "string",
            "state": "string",
            "streetAddress": "string",
            "suburb": "string"
          },
          "reaAgencyId": "string",
          "reaListingId": "string"
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

A set of applications which belong to the agencies and have been published since specific time.
