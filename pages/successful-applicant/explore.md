---
title: "Explore"
source: https://partner.realestate.com.au/successful-applicant/explore/
fetched_at: 2026-04-17T03:53:12.995Z
---

# Explore

v1.0.0

OAS 3.0.0

# Successful Applicant API

Download OpenAPI Document

json

Download OpenAPI Document

yaml

Poll for a successful application and retrieve all the data and documents for applicants.

Server

Server:https://api.realestate.com.au/applications/v1/rental

Location of API when running in production.

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

## Successful Applicant API

​Copy link

Successful Applicant API Operations

-   get/applications/successful/feed
-   get/applications/successful/{applicationId}/details

### Poll for successful applications since a specified date and time

​Copy link

The feed returns a collection of applications, that belong to an authorised agency, which are marked successful.

**Supports these query parameters:**

-   agencyIds (optional)
-   happenedSince

Query Parameters

-   agencyIdsCopy link to agencyIds
    
    Type: array string\[\]
    
    A comma-separated list of REA Agency IDs to query the applications that belong to them. If one of the IDs is invalid, or unknown, the request will be rejected.
    
-   happenedSinceCopy link to happenedSince
    
    Type: stringFormat: date-time
    
    required
    
    The endpoint will return applications marked successful since the value specified. The value should be in ISO-8601 format and URL-encoded. e.g. 2021-11-27T22%3A47%3A01.604Z
    

Responses

-   200
    
    A set of applications which belong to the agencies and are marked successful since the specific time.
    
    application/hal+json
    
-   400
    
    The request is missing required parameters or is malformed
    
    application/json
    
-   401
    
    The authentication token in the request is invalid or the agency ID is invalid.
    

Request Example for get/applications/successful/feed

Shell Curl

```curl
curl 'https://api.realestate.com.au/applications/v1/rental/applications/successful/feed?agencyIds=&happenedSince=' \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /applications/successful/feed)

Status: 200Status: 400Status: 401

Show Schema 

```json
{
  "_embedded": {
    "successfulApplications": [
      {
        "applicationId": "123e4567-e89b-12d3-a456-426614174000",
        "applicationDetailsUrl": "string",
        "applicationDetails": {
          "leaseTerm": 1,
          "leaseStartDate": "2026-04-17",
          "publishedAt": "2026-04-17T03:53:11.930Z",
          "statusLastUpdatedAt": "2026-04-17T03:53:11.930Z"
        },
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
    ],
    "application": {
      "applicationId": "123e4567-e89b-12d3-a456-426614174000",
      "applicationDocumentsUrl": "string",
      "applicationDetails": {
        "leaseTerm": 1,
        "leaseStartDate": "2026-04-17",
        "publishedAt": "2026-04-17T03:53:11.930Z",
        "statusLastUpdatedAt": "2026-04-17T03:53:11.930Z"
      },
      "listingDetails": {
        "address": {
          "postCode": "string",
          "state": "string",
          "streetAddress": "string",
          "suburb": "string"
        },
        "reaAgencyId": "string",
        "reaListingId": "string"
      },
      "applicants": [
        {
          "applicantREAId": "123e4567-e89b-12d3-a456-426614174000",
          "primaryApplicant": true,
          "applicantContactDetails": {
            "firstName": "string",
            "lastName": "string",
            "email": "string",
            "phoneNumber": "string"
          },
          "birthDate": "2026-04-17",
          "hasOrWillInspect": true,
          "inspectionDate": "2026-04-17",
          "residentialHistory": [
            {
              "isCurrent": true,
              "address": {
                "street": "string",
                "cityOrSuburb": "string",
                "postcode": "string",
                "stateOrTerritoryOrProvince": "string",
                "country": {
                  "code": "string",
                  "name": "string"
                }
              },
              "addressReference": {
                "fullName": "string",
                "email": "hello@example.com",
                "phoneNumber": "string",
                "relationship": "PROPERTY_MANAGER"
              },
              "startDate": "2026-04-17",
              "endDate": "2026-04-17"
            }
          ],
          "employmentHistory": [
            {
              "isCurrent": true,
              "type": "EMPLOYED",
              "abnOrAcn": "string",
              "workRole": {
                "occupation": "string",
                "companyName": "string"
              },
              "employmentReference": {
                "fullName": "string",
                "email": "hello@example.com",
                "phoneNumber": "string",
                "relationship": "PROPERTY_MANAGER"
              },
              "startDate": "2026-04-17",
              "endDate": "2026-04-17"
            }
          ],
          "income": {
            "hasIncome": true,
            "incomeRecords": [
              {
                "type": "SALARY",
                "amount": 1,
                "frequency": "YEARLY"
              }
            ],
            "documents": [
              {
                "name": "string",
                "type": "INCOME"
              }
            ]
          },
          "coverLetter": "string",
          "identityDocuments": [
            {
              "name": "string",
              "type": "INCOME"
            }
          ],
          "pets": {
            "cats": 1,
            "dogs": 1,
            "other": 1,
            "description": "string"
          },
          "tenantVerification": {
            "name": "string",
            "type": "INCOME"
          },
          "otherOccupants": [
            {
              "name": "string",
              "type": "CHILD",
              "age": 1
            }
          ]
        }
      ]
    }
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

A set of applications which belong to the agencies and are marked successful since the specific time.

### Access the details of a successful application

​Copy link

This endpoint allows an authorized request to fetch all the data points submitted by the applicants for a successful application.

Path Parameters

-   applicationIdCopy link to applicationId
    
    Type: stringFormat: uuid
    
    required
    
    The unique identifier for the rental application
    

Responses

-   200
    
    The application data points.
    
    application/hal+json
    
-   400
    
    The request is missing required parameters or is malformed
    
    application/json
    
-   401
    
    The authentication token in the request is invalid
    
    application/json
    
-   404
    
    The requested application is not marked successful
    
-   410
    
    The requested successful application is no longer available
    

Request Example for get/applications/successful/_{applicationId}_/details

Shell Curl

```curl
curl https://api.realestate.com.au/applications/v1/rental/applications/successful/123e4567-e89b-12d3-a456-426614174000/details \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /applications/successful/{applicationId}/details)

Status: 200Status: 400Status: 401Status: 404Status: 410

Show Schema 

```json
{
  "_embedded": {
    "successfulApplications": [
      {
        "applicationId": "123e4567-e89b-12d3-a456-426614174000",
        "applicationDetailsUrl": "string",
        "applicationDetails": {
          "leaseTerm": 1,
          "leaseStartDate": "2026-04-17",
          "publishedAt": "2026-04-17T03:53:11.930Z",
          "statusLastUpdatedAt": "2026-04-17T03:53:11.930Z"
        },
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
    ],
    "application": {
      "applicationId": "123e4567-e89b-12d3-a456-426614174000",
      "applicationDocumentsUrl": "string",
      "applicationDetails": {
        "leaseTerm": 1,
        "leaseStartDate": "2026-04-17",
        "publishedAt": "2026-04-17T03:53:11.930Z",
        "statusLastUpdatedAt": "2026-04-17T03:53:11.930Z"
      },
      "listingDetails": {
        "address": {
          "postCode": "string",
          "state": "string",
          "streetAddress": "string",
          "suburb": "string"
        },
        "reaAgencyId": "string",
        "reaListingId": "string"
      },
      "applicants": [
        {
          "applicantREAId": "123e4567-e89b-12d3-a456-426614174000",
          "primaryApplicant": true,
          "applicantContactDetails": {
            "firstName": "string",
            "lastName": "string",
            "email": "string",
            "phoneNumber": "string"
          },
          "birthDate": "2026-04-17",
          "hasOrWillInspect": true,
          "inspectionDate": "2026-04-17",
          "residentialHistory": [
            {
              "isCurrent": true,
              "address": {
                "street": "string",
                "cityOrSuburb": "string",
                "postcode": "string",
                "stateOrTerritoryOrProvince": "string",
                "country": {
                  "code": "string",
                  "name": "string"
                }
              },
              "addressReference": {
                "fullName": "string",
                "email": "hello@example.com",
                "phoneNumber": "string",
                "relationship": "PROPERTY_MANAGER"
              },
              "startDate": "2026-04-17",
              "endDate": "2026-04-17"
            }
          ],
          "employmentHistory": [
            {
              "isCurrent": true,
              "type": "EMPLOYED",
              "abnOrAcn": "string",
              "workRole": {
                "occupation": "string",
                "companyName": "string"
              },
              "employmentReference": {
                "fullName": "string",
                "email": "hello@example.com",
                "phoneNumber": "string",
                "relationship": "PROPERTY_MANAGER"
              },
              "startDate": "2026-04-17",
              "endDate": "2026-04-17"
            }
          ],
          "income": {
            "hasIncome": true,
            "incomeRecords": [
              {
                "type": "SALARY",
                "amount": 1,
                "frequency": "YEARLY"
              }
            ],
            "documents": [
              {
                "name": "string",
                "type": "INCOME"
              }
            ]
          },
          "coverLetter": "string",
          "identityDocuments": [
            {
              "name": "string",
              "type": "INCOME"
            }
          ],
          "pets": {
            "cats": 1,
            "dogs": 1,
            "other": 1,
            "description": "string"
          },
          "tenantVerification": {
            "name": "string",
            "type": "INCOME"
          },
          "otherOccupants": [
            {
              "name": "string",
              "type": "CHILD",
              "age": 1
            }
          ]
        }
      ]
    }
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

The application data points.
