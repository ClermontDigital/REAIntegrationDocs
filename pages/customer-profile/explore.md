---
title: "Explore Customer Profile API"
source: https://partner.realestate.com.au/customer-profile/explore/
fetched_at: 2026-04-17T03:51:21.331Z
---

# Explore Customer Profile API

v0.0.1

OAS 3.1.0

# Partner Profile API

Download OpenAPI Document

json

Download OpenAPI Document

yaml

Partner Profile API presents an access point for Agency CRMs to publish agent profile data to REA. Data written to PPAPI is forwarded onto other systems within the wider ecosystem, and is not stored locally.

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

## diagnostic

​Copy link

diagnostic Operations

-   get/diagnostic/heartbeat

### /diagnostic/heartbeat

​Copy link

Responses

-   200
    
    Success
    
    application/json
    
-   400
    
    The request did not match the expected schema
    
    application/json
    

Request Example for get/diagnostic/heartbeat

Shell Curl

```curl
curl /diagnostic/heartbeat
```

Copy

Copy

Test Request(get /diagnostic/heartbeat)

Status: 200Status: 400

Show Schema 

```json
Service alive
```

Copy

Copy

Success

## customerV1

​Copy link

customerV1 Operations

-   post/v1/individual-customers
-   get/v1/individual-customers
-   get/v1/individual-customers/{id}
-   put/v1/individual-customers/{externalId}
-   post/v1/individual-customers/{externalId}/offboard
-   post/v1/individual-customers/{externalId}/add-working-relationships
-   post/v1/individual-customers/{externalId}/end-working-relationships
-   put/v1/individual-customers/{externalId}/working-relationships/{agencyId}

### /v1/individual-customers

​Copy link

Body

required

application/json

-   aboutMeCopy link to aboutMe
    
    Type: string · nonEmptyString
    
    min length:  
    
    1
    
    required
    
    a non empty string
    
-   displayProfileCopy link to displayProfile
    
    Type: boolean
    
    required
    
-   firstNameCopy link to firstName
    
    Type: string · nonEmptyString
    
    min length:  
    
    1
    
    required
    
    a non empty string
    
-   lastNameCopy link to lastName
    
    Type: string · nonEmptyString
    
    min length:  
    
    1
    
    required
    
    a non empty string
    
-   workingRelationshipsCopy link to workingRelationships
    
    Type: array object\[\] 1…
    
    required
    
    Show Child Attributesfor workingRelationships
    
-   awardsCopy link to awards
    
    Type: array object\[\]
    
    Show Child Attributesfor awards
    
-   coverPhotoCopy link to coverPhoto
    
    Any ofmaxLength(1024)
    
    -   Type: string · maxLength(1024)
        
        min length:  
        
        10
        
        max length:  
        
        1024
        
        A URL pointing to an image file. The URL path must end with .jpg, .jpeg, or .png.
        
    
-   industryStartYearCopy link to industryStartYear
    
    Type: integer · int
    
    a number less than or equal to 2026
    
-   professionalWebsiteCopy link to professionalWebsite
    
    Any ofmaxLength(1024)
    
    -   Type: string · maxLength(1024)
        
        min length:  
        
        10
        
        max length:  
        
        1024
        
        a string at most 1024 character(s) long
        
    
-   profilePhotoCopy link to profilePhoto
    
    Any ofmaxLength(1024)
    
    -   Type: string · maxLength(1024)
        
        min length:  
        
        10
        
        max length:  
        
        1024
        
        A URL pointing to an image file. The URL path must end with .jpg, .jpeg, or .png.
        
    
-   secondaryProfilePhotoCopy link to secondaryProfilePhoto
    
    Any ofmaxLength(1024)
    
    -   Type: string · maxLength(1024)
        
        min length:  
        
        10
        
        max length:  
        
        1024
        
        A URL pointing to an image file. The URL path must end with .jpg, .jpeg, or .png.
        
    
-   socialsCopy link to socials
    
    Type: array string\[\] · nonEmptyString\[\]
    
    Show nonEmptyStringfor socials
    

Responses

-   200
    
    a Universally Unique Identifier
    
    application/json
    
-   400
    
    The request did not match the expected schema
    
    application/json
    
-   500
    
    InternalServerError
    

Request Example for post/v1/individual-customers

Shell Curl

```curl
curl /v1/individual-customers \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "firstName": "Jane",
  "lastName": "Smith",
  "displayProfile": true,
  "aboutMe": "Jane is a senior sales agent with 10 years experience in Melbourne inner suburbs.",
  "workingRelationships": [
    {
      "agencyId": "ABCDEF",
      "workplaceEmail": "jane.smith@example-agency.com.au",
      "contactEmail": "jane@example-agency.com.au",
      "contactPhone": "+61412345678",
      "roleType": "Sales",
      "jobTitle": "Senior Sales Agent",
      "primaryOffice": true
    }
  ],
  "industryStartYear": 2016,
  "professionalWebsite": "https://www.example-agency.com.au/jane-smith",
  "socials": [
    "https://www.linkedin.com/in/janesmith"
  ],
  "profilePhoto": "https://example.com/images/primary-photo.jpg",
  "secondaryProfilePhoto": "https://example.com/images/secondary-photo.jpg",
  "coverPhoto": "https://example.com/images/cover-photo.jpg",
  "awards": [
    {
      "name": "Top Sales Agent",
      "year": 2024,
      "agencyId": "ABCDEF"
    }
  ]
}'
```

cURLCopy

cURLCopy

Test Request(post /v1/individual-customers)

Status: 200Status: 400Status: 500

Show Schema 

```json
123e4567-e89b-12d3-a456-426614174000
```

Copy

Copy

a Universally Unique Identifier
