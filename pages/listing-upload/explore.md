---
title: "Explore Listing Upload API"
source: https://partner.realestate.com.au/listing-upload/explore/
fetched_at: 2026-04-17T03:52:41.523Z
---

# Explore Listing Upload API

v1

OAS 3.0.2

# Listing Upload API

Download OpenAPI Document

json

Download OpenAPI Document

yaml

An API to accept listing uploads and report on the progress of these listing uploads.

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

## Upload

​Copy link

Upload Operations

-   post/listing/v1/upload

### Accepts an REAXML document containing a single listing for processing.

​Copy link

The Listing Upload API will return an uploadId after submission.

Body

required

application/xml

REAXML document containing one single listing

Responses

-   202
    
    The listing has been accepted for processing.
    
    application/json
    
-   400
    
    Processing the upload request failed. Bad Request, the Xml is invalid..
    
    application/json
    
-   403
    
    Forbidden
    
-   404
    
    Processing the upload request failed. Verify that the URL is correct.
    
    application/json
    
-   405
    
    Method Not Allowed
    
-   406
    
    Processing the upload request failed. Verify that `Accept.MediaType` is correct.
    
    application/json
    
-   413
    
    Payload Too Large
    
-   500
    
    Processing the upload request failed. The listing may not have been submitted for processing.
    
    application/json
    

[Find REAXML schema here](../documentation/api/listings/elements.md)

Request Example for post/listing/v1/upload

Shell Curl

```curl
curl https://api.realestate.com.au/listing/v1/upload \
  --request POST \
  --header 'Content-Type: application/xml' \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN' \
  --data '<?xml version="1.0" encoding="UTF-8"?>
 <propertyList date="2018-06-15-11:29:16">
   <residential status="current" modTime="2019-06-15-11:29:15">
     <agentID>XNWTRD</agentID>
     <uniqueID>rea_111234324</uniqueID>
     <listingAgent id="1">
       <name>Jayne Doherty</name>
       <telephone type="mobile">123</telephone>
       <email>test@test.com.au</email>
     </listingAgent>
     <newConstruction>1</newConstruction>
     <category name="Apartment" />
     <authority value="exclusive" />
     <underOffer value="no" />
     <isHomeLandPackage value="no" />
     <address streetview="no" display="no">
       <street>test road</street>
       <suburb display="yes">Errinundra</suburb>
       <state>VIC</state>
       <postcode>3889</postcode>
       <country>AU</country>
       <streetNumber>8/333</streetNumber>
     </address>
     <municipality />
     <headline>North facing apartment near Riversdale Village</headline>
     <description />
     <price display="yes">450000.00</price>
     <priceView>Private Sale $460,000</priceView>
     <bond />
     <idealFor />
     <views />
     <ecoFriendly>
       <solarPanels>no</solarPanels>
       <solarHotWater>no</solarHotWater>
       <waterTank>no</waterTank>
       <greyWaterSystem>no</greyWaterSystem>
     </ecoFriendly>
     <features>
       <bedrooms>2</bedrooms>
       <bathrooms>1</bathrooms>
       <carports>1</carports>
       <garages>0</garages>
       <openSpaces>0</openSpaces>
       <yearBuilt value="1976" />
       <yearLastRenovated value="1988" />
     </features>
     <landDetails />
     <buildingDetails />
     <objects>
       <img modTime="2018-06-15-11:29:16" file="images.jpeg" id="m" format="jpeg" />
       <img id="a" />
     </objects>
     <videoLink href="" />
     <externalLink href="" />
   </residential>
 </propertyList>
'
```

cURLCopy

cURLCopy

Test Request(post /listing/v1/upload)

Status: 202Status: 400Status: 403Status: 404Status: 405Status: 406Status: 413Status: 500

Show Schema 

```json
{
  "uploadId": "36d2b88b-aecd-4323-b40c-dad8fb514ea4"
}
```

JSONCopy

JSONCopy

The listing has been accepted for processing.

## Report

​Copy link

Report Operations

-   get/listing/v1/upload
-   get/listing/v1/upload/{uploadId}
