---
title: "Explore Project Performance API"
source: https://partner.realestate.com.au/campaign/project-performance/explore/
fetched_at: 2026-04-17T03:51:04.273Z
---

# Explore Project Performance API

v1.2.9

OAS 3.1.1

# Campaign API

Download OpenAPI Document

json

Download OpenAPI Document

yaml

Retrieve project performance reports for property advertising campaigns

Server

Server:https://api.realestate.com.au/campaign/v2

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

## Project Performance

​Copy link

Project Performance Operations

-   get/project-performance
-   get/project-performance/{project\_profile\_id}

### Get multiple project performance reports by agency ID

​Copy link

The /project-performance endpoint returns a collection of project performance reports for project profile advertising campaigns belonging to an agent. The response includes reports for projects that match the supplied query parameters. Each project performance report includes details about the project, as well as metrics for the report period:

-   totalProjectPerformance (portal metrics for the whole project profile: projectPagePerformance + totalProjectListingsPerformance)

Each portal metrics object contains metrics at three different aggregation levels:

-   all (totals for the whole reporting period)
-   daily (totals for calendar dates up to a maximum of 90 days history)

Supports the following query parameters:

-   agency\_id

Query Parameters

-   agency\_idCopy link to agency\_id
    
    Type: string
    
    required
    
    Unique identifier representing the project agency.
    

Responses

-   200
    
    A set of project performance reports for the supplied query.
    
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
    
    No project-performance resources were found for the requested parameters
    
    application/hal+json
    
-   default
    
    Unexpected error
    
    application/hal+json
    

Request Example for get/project-performance

Shell Curl

```curl
curl 'https://api.realestate.com.au/campaign/v2/project-performance?agency_id=' \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /project-performance)

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
        "listingType": "string",
        "agencyId": "string",
        "listedDate": "string",
        "lastModifiedAt": "string",
        "pageView": 1,
        "searchResultsPageImpression": 1,
        "spend": 1,
        "phoneEngagement": {
          "revealedAgentPhoneNumber": 1,
          "clickToCall": 1
        },
        "emailLeads": {
          "documentDownload": 1,
          "emailEnquiry": 1
        },
        "phoneLeads": {
          "sms": 1,
          "phoneCall": 1
        },
        "costPerLead": {
          "leadsAndEngagements": 1,
          "emailLeads": 1,
          "phoneEngagement": 1,
          "phoneLeads": 1,
          "emailAndPhoneLeads": 1
        },
        "viewStatementOfInformation": 1,
        "listingSaved": 1,
        "sendToFriend": 1,
        "savedInspectionTime": 1,
        "threeDTourView": 1,
        "floorplanView": 1,
        "videoView": 1,
        "expandMap": 1,
        "getDirections": 1,
        "emailDirections": 1,
        "performance": [
          {
            "pageView": 1,
            "emailLeads": 1,
            "phoneEngagement": 1,
            "phoneLeads": 1,
            "spend": 1,
            "day": "string"
          }
        ],
        "lastActivityDate": "string"
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

A set of project performance reports for the supplied query.
