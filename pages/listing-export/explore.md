---
title: "Explore Listing Export API"
source: https://partner.realestate.com.au/listing-export/explore/
fetched_at: 2026-04-17T03:52:28.909Z
---

# Explore Listing Export API

v1.0.0

OAS 3.0.3

# Listing Export API

Download OpenAPI Document

json

Download OpenAPI Document

yaml

Retrieve listings in REAXML format

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

## listings-export

​Copy link

listings-export Operations

-   get/listing/v1/export
-   get/listing/v1/export?agency\_id={agency\_id}
-   get/listing/v1/export?listing\_id={listing\_id}

### Export all listings filtered based on query params

​Copy link

Export listings

Query Parameters

-   pageCopy link to page
    
    Type: string
    
    Example
    
    000000000
    
    The listing Id to start from (for pagination)
    
-   listing\_typesCopy link to listing\_types
    
    Type: stringenum
    
    Example
    
    residential,rural
    
    String of comma separated `ListingType` to include
    
    values
    
    -   residential
        
    -   rental
        
    -   rural
        
    -   land
        
    -   commercial
        
    
-   statusCopy link to status
    
    Type: stringenum
    
    Example
    
    current,offmarket
    
    String of comma separated `ListingStatus` to include
    
    values
    
    -   current
        
    -   offmarket
        
    -   sold
        
    -   leased
        
    
-   sinceCopy link to since
    
    Type: stringFormat: date-time
    
    Example
    
    2018-03-20T09:12:28Z
    
    ISO8601 formatted datetime that filters based on the modTime of a listing
    
-   page\_sizeCopy link to page\_size
    
    Type: integer
    
    min:  
    
    1
    
    max:  
    
    1000
    
    Default
    
    200
    
    Example
    
    500
    
    An integer representing the pagination size
    

Responses

-   200
    
    OK. Request will return stream of reaxml.
    
    application/xml
    
-   400
    
    Bad Request. The request cannot be processed due to a client error. This could be due to:
    
    -   Specifying agency id and listing id together.
    -   Invalid page size.
    
    application/json
    
-   401
    
    Unauthorized
    
-   403
    
    Forbidden
    
    application/json
    
-   404
    
    Not Found
    
    application/json
    
-   405
    
    Method Not Allowed
    
-   429
    
    Too Many Requests. You have exceeded the maximum number of requests permitted.
    
-   500
    
    Internal Server Error
    

Request Example for get/listing/v1/export

Shell Curl

```curl
curl 'https://api.realestate.com.au/listing/v1/export?page=000000000&listing_types=residential%2Crural&status=current%2Coffmarket&since=2018-03-20T09%3A12%3A28Z&page_size=500' \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /listing/v1/export)

Status: 200Status: 400Status: 401Status: 403Status: 404Status: 405Status: 429Status: 500

Show Schema 

```json
{
  "residential": {
    "modTime": "2020-05-20T10:23:43",
    "status": "sold",
    "...": {}
  }
}
```

JSONCopy

JSONCopy

OK. Request will return stream of reaxml.
