---
title: "eDM Performance Usage"
source: https://partner.realestate.com.au/campaign/edm-performance/usage/
fetched_at: 2026-04-17T03:50:53.562Z
---

# eDM Performance Usage

## Get list of all campaigns

This endpoint returns a list of campaigns that a user is authorised to view. It provides the user with high-level detail of each returned campaign. By default, this endpoint returns 20 campaigns ordered by the send date, from newest to oldest and returns the first page of the results.

### URL

```
GET https://api.realestate.com.au/campaign/v1/edm-performance
```

### Response Payload

#### Content Type

application/hal+json

#### Response Properties

The response payload uses the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) for embedding resources, and to support pagination of results and API links for individual resources. For more details on pagination, refer to the [Pagination](#pagination) section below.

The edm-performance resources are returned in the `items` array within the `_embedded` response property. The `_links` property for each embedded resource contains a `self` URL, a direct link for requesting that single item.

The `_links` property at the root level response contains a `self` URL for the actual request, and optionally `prev` and/or `next` URLs, which navigate to the previous or next page of results if they exist.

Each edm-performance item (embedded resource) has the following properties:

#### eDM Performance Item

Property

Type

Description

Example

flightId

string

Unique identifier for the eDM campaign

561125

campaignId

string

n/a

112161

accountManager

[Account Manager](#account-manager) object

Information about the REA account manager servicing the campaign

advertiser

[Advertiser](#advertiser) object

Information about the advertising agency running the campaign

name

string

Name of the campaign

OMD - Hatched Media - Satterley - Botanical

sendDate

string

date of eDM sent

2023-04-03

sends

string

number of eDM sent

11111

clicks

string

Number of delivered clicks for the campaign

314

uniqueClicks

string

Number of delivered unique clicks for the campaign

133

clickThroughRate

string

Number of clicks divided by total impressions served

0.421

flatRateLocal

string

Total spent on campaign to date

5000

leads

string

Number of delivered leads for the campaign

64

costPerLead

string

The amount paid for each lead as the result of campaign activity and value

78

product

string

Type of advertising product - generally “Hyper Targeted”, “Solus State” or “New Homes”

Hyper Targeted

#### Advertiser

Property

Type

Description

Example

id

string

Unique identifier of the advertiser

13380

name

string

Name of the advertising agency

Sunshine Agency - Inner East

#### Account Manager

Property

Type

Description

Example

id

string

Unique identifier of the account manager

330

name

string

Name of the account manager

Joe Bloggs

### Example Request

Terminal window

```
$ curl -H "Authorization: Bearer 9e64dc14-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/edm-performance
```

#### Pagination

The edm-performance campaign list (embedded resource) is paginated using the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) standard. The API returns a maximum of 20 records at a time, and is ordered by the `sendDate` property of the items. If the query result contains more than 20 items, the first page of 20 items will be returned, and the `_links` property will contain a `next` encoded hyperlink to navigate to the next page of results.

Upon navigation to the next page, the result will then contain a `prev` encoded hyperlink to navigate to the previous page of results (in this case the first page). If there are yet more results pages, the result will again contain a `next` hyperlink to navigate to the third page of results, and so on. The first (or only) page of results will not contain a `prev` hyperlink, and the last (or only) page of results will not contain a `next` hyperlink.

Example:

```
{  "_embedded": {    "items": [      // eDM performance campaign reports accessible to authorised user    ]  },  "_links": {    "self": {      "href": "https://api.realestate.com.au/campaign/v1/edm-performance?pageIndex=2&pageSize=20"    },    "prev": {      "href": "https://api.realestate.com.au/campaign/v1/edm-performance?pageIndex=1&pageSize=20"    },    "next": {      "href": "https://api.realestate.com.au/campaign/v1/edm-performance?pageIndex=3&pageSize=20"    }  }}
```

#### Sorting

The payload can be sorted by the following parameters:

Parameters

Sort Directions

Usage

Send Date

asc / desc

”sortBy%sendDate%5D=asc”

Campaign CPL

asc / desc

”sortBy%5BcostPerLead%5D=asc”

Campaign CTR

asc / desc

”sortBy%5BclickThroughRate%5D=asc”

Example:

Terminal window

```
$ curl -H "Authorization: Bearer 9e64dc14-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/edm-performance -G -d "sortBy%sendDate%5D=asc"
```

#### Filter

The payload can be filtered by the following parameters:

Parameters

Options

Usage

Campaign Name

Case insensitive pattern matching

”name=Hatched”

Example:

Terminal window

```
$ curl -H "Authorization: Bearer 9e64dc14-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/edm-performance -G -d "name=Hatched"
```

### Example Responses

#### 200 (Success)

```
{  "_embedded": {    "items": [      {        "flightId": "561125",        "campaignId": "112161",        "accountManager": {          "id": "637",          "name": "Jasmin Goddard"        },        "advertiser": {          "id": "16025",          "name": "OMD - Hatched Media - Satterley - Botanical"        },        "name": "REA Newsletter Solus Hyper-Targeted EDM - Sponsorship Package - Mickleham",        "sendDate": "2023-04-03",        "sends": "14176",        "clicks": "104",        "uniqueClicks": "85",        "clickThroughRate": "0.0073",        "uniqueClickThroughRate": "0.006",        "flatRateLocal": "11285",        "leads": null,        "costPerLead": null,        "product": "Hyper Targeted"      }    ]  },  "_links": {    "self": {      "href": "https://api.realestate.com.au/campaign/v1/edm-performance?pageSize=1&pageIndex=0"    },    "next": {      "href": "https://api.realestate.com.au/campaign/v1/edm-performance?pageSize=1&pageIndex=1"    }  },  "total": 16}
```

#### 400 (Bad Request)

```
{  "errors": [    {      "statusCode": 400,      "error": "Bad request",      "message": "Bad request"    }  ]}
```

#### 500 (General Error)

```
{  "errors": [    {      "statusCode": 500,      "error": "Internal Server Error",      "message": "An internal server error occurred"    }  ]}
```

#### 502 (Bad Gateway)

```
{  "errors": [    {      "statusCode": 502,      "error": "Bad Gateway",      "message": "Bad Gateway"    }  ]}
```

### Try it Out

Try out this endpoint using our [API explorer](./explore.md).
