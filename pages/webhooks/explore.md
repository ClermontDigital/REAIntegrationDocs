---
title: "Explore Webhooks API"
source: https://partner.realestate.com.au/webhooks/explore/
fetched_at: 2026-04-17T03:53:29.891Z
---

# Explore Webhooks API

v1.0

OAS 3.0.3

# Partner Platform Webhook Subscription API

Download OpenAPI Document

json

Download OpenAPI Document

yaml

This API allows partners to create and manage webhook subscriptions to receive real-time notifications about events from Partner Platform.

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

### Get public keys used to verify incoming webhook requests

​Copy link

Responses

-   200
    
    Webhook request signing keys
    
    application/json
    

Request Example for get/webhooks/v1/signing

Shell Curl

```curl
curl https://api.realestate.com.au/webhooks/v1/signing \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Test Request(get /webhooks/v1/signing)

Status: 200

No Body

Webhook request signing keys

### Create a new subscription

​Copy link

Body·SubscriptionRequest

application/json

Subscription's information

A webhook's subscription

-   eventCategoryCopy link to eventCategory
    
    Type: stringenum
    
    required
    
    Example
    
    listing
    
    values
    
    -   listing
        
    -   integration
        
    -   lead
        
    
-   eventTypeCopy link to eventType
    
    Type: stringenum
    
    required
    
    Example
    
    UploadCompleted
    
    values
    
    -   UploadCompleted
        
    -   IntegrationCreated
        
    -   IntegrationUpdated
        
    -   IntegrationDeleted
        
    -   EnquiryCreated
        
    
-   webhookUrlCopy link to webhookUrl
    
    Type: string
    
    required
    
    Example
    
    https://mywebhook.com
    
-   ownerIdCopy link to ownerId
    
    Type: string
    
    Example
    
    ABCDEF
    
-   ownerTypeCopy link to ownerType
    
    enum
    
    const:  
    
    agency
    
    Example
    
    agency
    
    values
    
    -   agency
        
    

Responses

-   202
    
    A new webhook's subscription is accepted in response to your request
    
    application/json
    
-   400
    
    Malformed request
    
    application/json
    
-   401
    
    The application or owner is not authorized to get the notification for the event. This can happen if the Provider is not authorised to act on behalf of the Agency, or required scopes for the event type are missing.
    
-   403
    
    Forbidden
    
-   409
    
    When the same subscription (same ownerId, ownertype, eventCategory and eventType) already exists.
    
-   429
    
    Too Many Requests. You have exceeded the maximum number of requests permitted.
    
-   500
    
    Internal Server Error
    

Request Example for post/webhooks/v1/subscriptions

Shell Curl

```curl
curl https://api.realestate.com.au/webhooks/v1/subscriptions \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN' \
  --data '{
  "eventType": "UploadCompleted",
  "eventCategory": "listing",
  "ownerType": "agency",
  "ownerId": "ABCDEF",
  "webhookUrl": "https://mywebhook.com"
}'
```

cURLCopy

cURLCopy

Test Request(post /webhooks/v1/subscriptions)

Status: 202Status: 400Status: 401Status: 403Status: 409Status: 429Status: 500

Show Schema 

```json
{
  "subscriptionId": "29a5f7f2-f782-4679-b97d-78529c567867",
  "eventType": "UploadCompleted",
  "eventCategory": "listing",
  "ownerType": "agency",
  "ownerId": "ABCDEF",
  "webhookUrl": "https://mywebhook.com",
  "status": "PENDING"
}
```

JSONCopy

JSONCopy

A new webhook's subscription is accepted in response to your request
