---
title: "Display Performance Usage"
source: https://partner.realestate.com.au/campaign/display-performance/usage/
fetched_at: 2026-04-17T03:50:48.942Z
---

# Display Performance Usage

## Get list of all campaigns

This endpoint returns a list of campaigns that a user is authorised to view. It provides the user with high-level detail of each returned campaign. By default, this endpoint returns 20 campaigns ordered by the created date, from newest to oldest and returns the first page of the results.

### URL

```
GET https://api.realestate.com.au/campaign/v1/display-performance
```

### Response Payload

#### Content Type

application/hal+json

#### Response Properties

The response payload uses the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) for embedding resources, and to support pagination of results and API links for individual resources. For more details on pagination, refer to the [Pagination](#pagination) section below.

The display-performance resources are returned in the `items` array within the `_embedded` response property. The `_links` property for each embedded resource contains a `self` URL, a direct link for requesting that single item.

The `_links` property at the root level response contains a `self` URL for the actual request, and optionally `prev` and/or `next` URLs, which navigate to the previous or next page of results if they exist.

Each display-performance item (embedded resource) has the following properties:

#### Display Performance Item

Property

Type

Description

Example

id

string

Unique identifier for the display campaign (same as campaign\_id)

“54186”

name

string

Name of the campaign

”41571 - Sunshine Agency - Inner East - Star - Display”

ioNumber

string

Insertion Order Number

”41571”

product

string

Type of advertising product - generally “Display” or “Audience Extension"

"display”

status

string

Current status of campaign - generally “Active”, “Completed”, or “Pending"

"completed”

advertiser

[Advertiser](#advertiser) object

Information about the advertising agency running the campaign

accountManager

[Account Manager](#account-manager) object

Information about the REA account manager servicing the campaign

createdAt

Melbourne date

Creation date of the campaign (inclusive)

“2021-11-06T06:08:08.000Z”

startDate

Melbourne date

Date the campaign begins (inclusive)

“2021-12-10”

endDate

Melbourne date

Date the campaign concludes (inclusive)

“2022-03-01”

impressionsGoal

string

Number of goal impressions for the campaign

”1366875”

impressionsDelivered

string

Number of delivered impressions for the campaign

”1366893”

clicksDelivered

string

Number of delivered clicks for the campaign

”5755”

leadsDelivered

string

Number of delivered leads for the campaign

”92”

clickThroughRate

string

Number of clicks divided by total impressions served

”0.421”

costPerLead

string

The amount paid for each lead as the result of campaign activity and value

”316.000”

budget

string

Total budgeted for campaign spend

”29100.000”

spend

string

Total spent on campaign to date

”29100.000”

budgetRemaining

string

Total budget remaining

”0.000”

listingId

string

Related listingId of the campaign. _Only available for partial Commercial listings, default null_

”5123456”

excludeCommercialCampaigns

string

Passing “true” will exclude all the Commercial Native Ads campaigns from response, default returning both Commercial and Residential campaigns.

”true”

#### Advertiser

Property

Type

Description

Example

id

string

Unique identifier of the advertiser

”13380”

name

string

Name of the advertising agency

”Sunshine Agency - Inner East”

#### Account Manager

Property

Type

Description

Example

id

string

Unique identifier of the account manager

”330”

name

string

Name of the account manager

”Joe Bloggs”

### Example Request

Terminal window

```
$ curl -H "Authorization: Bearer 9e64dc14-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/display-performance
```

#### Pagination

The display-performance campaign list (embedded resource) is paginated using the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) standard. The API returns a maximum of 20 records at a time, and is ordered by the `createdAt` property of the items. If the query result contains more than 20 items, the first page of 20 items will be returned, and the `_links` property will contain a `next` encoded hyperlink to navigate to the next page of results.

Upon navigation to the next page, the result will then contain a `prev` encoded hyperlink to navigate to the previous page of results (in this case the first page). If there are yet more results pages, the result will again contain a `next` hyperlink to navigate to the third page of results, and so on. The first (or only) page of results will not contain a `prev` hyperlink, and the last (or only) page of results will not contain a `next` hyperlink.

Example:

```
{  "_embedded": {    "items": [      // Display performance campaign reports accessible to authorised user    ]  },  "_links": {    "self": {      "href": "https://api.realestate.com.au/campaign/v1/display-performance/?pageIndex=2&pageSize=20"    },    "prev": {      "href": "https://api.realestate.com.au/campaign/v1/display-performance/?pageIndex=1&pageSize=20"    },    "next": {      "href": "https://api.realestate.com.au/campaign/v1/display-performance/?pageIndex=3&pageSize=20"    }  }}
```

#### Sorting

The payload can be sorted by the following parameters:

Parameters

Sort Directions

Usage

CreatedAt Date

asc / desc

”sortBy%5BcreatedAt%5D=asc”

Campaign CPL

asc / desc

”sortBy%5BcostPerLead%5D=asc”

Campaign CTR

asc / desc

”sortBy%5BclickThroughRate%5D=asc”

Example:

Terminal window

```
$ curl -H "Authorization: Bearer 9e64dc14-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/display-performance -G -d "sortBy%5BcreatedAt%5D=asc"
```

#### Filter

The payload can be filtered by the following parameters:

Parameters

Options

Usage

Campaign Status

EXACT MATCH active / pending / completed

”status=active”

Campaign Name

Case insensitive pattern matching

”name=Sunshine”

Start Date

Date format, greater than or equal to yyyy-mm-dd

”startDate=2020-01-02”

End Date

Date format, greater than or equal to yyyy-mm-dd

”endDate=2020-01-02”

Example:

Terminal window

```
$ curl -H "Authorization: Bearer 9e64dc14-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/display-performance -G -d "status=active"
```

### Example Responses

#### 200 (Success)

```
{  "_embedded": {    "items": [      {        "id": "57611",        "name": "38659 - Sunshine Agency - KMSM - Signature - Display",        "ioNumber": "38659",        "product": "display",        "status": "completed",        "advertiser": {          "id": "13961",          "name": "Sunshine Agency - KMSM - Signature Broadchurch"        },        "accountManager": {          "id": "334",          "name": "Connie Olivier"        },        "createdAt": "2017-11-21T23:43:01.000Z",        "startDate": "2017-11-23",        "endDate": "2018-03-31",        "impressionsGoal": "5003906",        "impressionsDelivered": "4650345",        "clicksDelivered": "11531",        "leadsDelivered": null,        "clickThroughRate": "0.248",        "costPerLead": null,        "budget": "82405.030",        "spend": "71463.300",        "budgetRemaining": "10941.730",        "listingId": null      },      {        "id": "57474",        "name": "38658 - Sunshine Agency - KMSM - Signature - Hyper Targeted eDM - 8 Jan 2018",        "ioNumber": "38658",        "product": "display",        "status": "completed",        "advertiser": {          "id": "13961",          "name": "Sunshine Agency - KMSM - Signature Broadchurch"        },        "accountManager": {          "id": "334",          "name": "Connie Olivier"        },        "createdAt": "2017-11-20T00:59:56.000Z",        "startDate": "2018-01-08",        "endDate": "2018-01-09",        "impressionsGoal": "0",        "impressionsDelivered": "0",        "clicksDelivered": "0",        "leadsDelivered": null,        "clickThroughRate": null,        "costPerLead": null,        "budget": "8039.000",        "spend": "8039.000",        "budgetRemaining": "0.000",        "listingId": null      },      {        "id": "60460",        "name": "41648 - Sunshine Agency - KMSM - Signature - Display",        "ioNumber": "41648",        "product": "display",        "status": "completed",        "advertiser": {          "id": "13961",          "name": "Sunshine Agency - KMSM - Signature Broadchurch"        },        "accountManager": {          "id": "334",          "name": "Connie Olivier"        },        "createdAt": "2018-03-14T23:51:35.000Z",        "startDate": "2018-03-16",        "endDate": "2018-05-31",        "impressionsGoal": "1516029",        "impressionsDelivered": "1621395",        "clicksDelivered": "5457",        "leadsDelivered": null,        "clickThroughRate": "0.337",        "costPerLead": null,        "budget": "40112.310",        "spend": "39575.950",        "budgetRemaining": "536.360",        "listingId": null      },      {        "id": "60472",        "name": "41649 - Sunshine Agency - KMSM - Signature - eDM - Display",        "ioNumber": "41649",        "product": "display",        "status": "completed",        "advertiser": {          "id": "13961",          "name": "Sunshine Agency - KMSM - Signature Broadchurch"        },        "accountManager": {          "id": "334",          "name": "Connie Olivier"        },        "createdAt": "2018-03-15T02:42:38.000Z",        "startDate": "2018-04-16",        "endDate": "2018-05-01",        "impressionsGoal": "234068",        "impressionsDelivered": "234195",        "clicksDelivered": "685",        "leadsDelivered": null,        "clickThroughRate": "0.293",        "costPerLead": null,        "budget": "6687.700",        "spend": "6687.700",        "budgetRemaining": "0.000",        "listingId": null      },      {        "id": "62326",        "name": "43526 - Sunshine Agency - KMSM - Signature - Display",        "ioNumber": "43526",        "product": "display",        "status": "completed",        "advertiser": {          "id": "13961",          "name": "Sunshine Agency - KMSM - Signature Broadchurch"        },        "accountManager": {          "id": "334",          "name": "Connie Olivier"        },        "createdAt": "2018-05-23T01:09:36.000Z",        "startDate": "2018-05-23",        "endDate": "2018-08-01",        "impressionsGoal": "1405420",        "impressionsDelivered": "1522492",        "clicksDelivered": "4546",        "leadsDelivered": null,        "clickThroughRate": "0.299",        "costPerLead": null,        "budget": "35118.000",        "spend": "34621.400",        "budgetRemaining": "496.600",        "listingId": null      }    ]  },  "_links": {    "self": {      "href": "https://vision-api.devlob-staging.realestate.com.au/campaigns"    },    "next": {      "href": "https://vision-api.devlob-staging.realestate.com.au/campaigns?pageIndex=1&pageSize=20"    }  },  "total": 5}
```

#### 400 (Bad Request)

```
{  "errors": [    {      "statusCode": 400,      "error": "Bad request",      "message": "Bad request"    }  ]}
```

#### 404 (Not Found)

```
{  "errors": [    {      "statusCode": 404,      "error": "Not Found",      "message": "Not Found"    }  ]}
```

#### 422 (Unprocessable Entity)

```
{  "errors": [    {      "statusCode": 422,      "error": "Unprocessable Entity",      "message": "Something went wrong"    }  ]}
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

## Get a campaign with full details by campaign ID

The display-performance by campaign-id endpoint returns a single display performance report for a campaign. The performance report is available for active, pending, and completed campaigns. The response is a report for the campaign that matches the supplied campaign ID. The display performance report includes details about the campaign.

### URL

```
GET https://api.realestate.com.au/campaign/v1/display-performance/:campaign_id/
```

### Path Parameters

Name

Type

Required

Description

Example

campaign\_id

integer

Required

The unique campaign ID for the display performance report

89850

### Response Payload

#### Content Type

application/hal+json

#### Response Properties

The response payload uses the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) for embedding resources, to support links for individual resources.

The display-performance resources are returned in the `items` array. The `_links` property for each embedded resource contains a `self` URL, a direct link for requesting that single item.

The `_links` property at the root level response contains a `self` URL for the actual request.

Each display-performance item has the following properties:

#### Display Performance Item

Property

Type

Description

Example

id

string

Unique identifier for the display campaign (same as campaign\_id)

“54186”

name

string

Name of the campaign

”41571 - Sunshine Agency - Inner East - Star - Display”

product

string

Type of advertising product - generally Display or Audience Extension

”display”

status

string

Current status of campaign - generally “Active”, “Completed”, or “Pending"

"completed”

impressionsGoal

string

Number of goal impressions for the campaign

”1366875”

budget

string

Total budgeted for campaign spend

”29100.000”

accountManager

[Account Manager](#account-manager) object

Information about the REA account manager servicing the campaign

startDate

Melbourne date

Date the campaign begins (inclusive)

“2021-12-10”

endDate

Melbourne date

Date the campaign concludes (inclusive)

“2022-03-01”

advertiser

[Advertiser](#advertiser) object

Information about the entity responsible for the campaign

updatedAt

Melbourne date

Creation date of the campaign (inclusive)

“2021-11-06T06:08:08.000Z”

impressionsDelivered

string

Number of delivered impressions for the campaign

”1366893”

clicksDelivered

string

Number of delivered clicks for the campaign

”5755”

spend

string

Total spent on campaign to date

”29100.000”

leadsDelivered

string

Number of delivered leads for the campaign

”92”

costPerLead

string

The amount paid for each lead as the result of campaign activity and value

”316.000”

clickThroughRate

string

Number of clicks divided by total impressions served

”0.421”

clickThroughConversion

string

The percentage of clicks that have converted to leads

”0.421”

performance

[Performance](#performance) object

A day by day breakdown of performance metrics

listingId

string

Related listingId of the campaign. _Only available for partial Commercial listings, default null_

”5123456”

#### Advertiser

Property

Type

Description

Example

id

string

Unique identifier of the advertiser

”13380”

name

string

Name of the advertising agency

”Sunshine Agency - Inner East”

#### Account Manager

Property

Type

Description

Example

id

string

Unique identifier of the account manager

”330”

name

string

Name of the account manager

”Joe Bloggs”

#### Performance

Property

Type

Description

Example

campaignId

string

Date that the data for Web, Mobile, SRP Impressions was last refreshed.

”2017-07-27”

impressionsDelivered

string

Number of delivered impressions for the campaign

”1366893”

clicksDelivered

string

Number of delivered clicks for the campaign

”5755”

leadsDelivered

string

Number of delivered leads for the campaign

”92”

leadsDeliveredPostClicks

string

Number of leads delivered directly after a customer interacts with an ad

”80”

leadsDeliveredPostImpressions

string

Number of leads delivered directly after a customer sees an ad

”12”

spend

string

Total spent on campaign to date

”29100.000”

day

string

The date to which the above metrics apply

”2021-05-21”

### Example Request

Terminal window

```
$ curl -H "Authorization: Bearer 9e64dc14-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/display-performance/89850
```

#### Pagination

The single campaign detail payload is not paginated.

#### Filter

The payload can be filtered by the following parameters, separately or in conjunction:

Parameters

Options

Usage

Start Date

Date format, greater than or equal to yyyy-mm-dd

”startDate=2020-01-02”

End Date

Date format, greater than or equal to yyyy-mm-dd

”endDate=2020-04-02”

Example:

Terminal window

```
$ curl -H "Authorization: Bearer 9e64dc14-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/display-performance/89493 -G -d "startDate=2021-05-01&endDate=2021-06-01"
```

### Example Responses

#### 200 (Success)

A single display performance report for the requested campaign\_id

```
{  "id": "89850",  "name": "71395 - Sunshine Agency - KMSM - Signature - FB Link Ads AudEx - Audience Extension",  "product": "audienceExtension",  "status": "completed",  "impressionsGoal": null,  "budget": "6000",  "accountManager": "Connie Olivier",  "startDate": "2021-07-17",  "endDate": "2021-07-23",  "advertiser": "Sunshine Agency - KMSM - Signature Broadchurch",  "updatedAt": "2021-11-18T23:47:03.070Z",  "impressionsDelivered": "141803",  "clicksDelivered": "1986",  "spend": "4963.105",  "leadsDelivered": "90",  "costPerLead": "55.146",  "clickThroughRate": "1.401",  "clickThroughConversion": "4.532",  "performance": [    {      "campaignId": "89850",      "impressionsDelivered": "701",      "clicksDelivered": "13",      "leadsDelivered": "1",      "leadsDeliveredPostClicks": "0",      "leadsDeliveredPostImpressions": "0",      "spend": "24.535",      "day": "2021-07-17"    },    {      "campaignId": "89850",      "impressionsDelivered": "862",      "clicksDelivered": "29",      "leadsDelivered": "2",      "leadsDeliveredPostClicks": "0",      "leadsDeliveredPostImpressions": "0",      "spend": "30.170",      "day": "2021-07-18"    },    {      "campaignId": "89850",      "impressionsDelivered": "778",      "clicksDelivered": "14",      "leadsDelivered": "0",      "leadsDeliveredPostClicks": "0",      "leadsDeliveredPostImpressions": "0",      "spend": "27.230",      "day": "2021-07-19"    },    {      "campaignId": "89850",      "impressionsDelivered": "687",      "clicksDelivered": "22",      "leadsDelivered": "1",      "leadsDeliveredPostClicks": "0",      "leadsDeliveredPostImpressions": "0",      "spend": "24.045",      "day": "2021-07-20"    },    {      "campaignId": "89850",      "impressionsDelivered": "624",      "clicksDelivered": "17",      "leadsDelivered": "1",      "leadsDeliveredPostClicks": "0",      "leadsDeliveredPostImpressions": "0",      "spend": "21.840",      "day": "2021-07-21"    },    {      "campaignId": "89850",      "impressionsDelivered": "594",      "clicksDelivered": "19",      "leadsDelivered": "0",      "leadsDeliveredPostClicks": "0",      "leadsDeliveredPostImpressions": "0",      "spend": "20.790",      "day": "2021-07-22"    },    {      "campaignId": "89850",      "impressionsDelivered": "530",      "clicksDelivered": "10",      "leadsDelivered": "0",      "leadsDeliveredPostClicks": "0",      "leadsDeliveredPostImpressions": "0",      "spend": "18.550",      "day": "2021-07-23"    },    "listingId": null  ],  "_links": {    "self": {      "href": "https://api.realestate.com.au/campaign/v1/display-performance/89850"    }  }}
```

#### 400 (Bad Request)

```
{  "errors": [    {      "statusCode": 400,      "error": "Bad request",      "message": "Bad request"    }  ]}
```

#### 404 (Not Found)

```
{  "errors": [    {      "statusCode": 404,      "error": "Not Found",      "message": "Not Found"    }  ]}
```

#### 422 (Unprocessable Entity)

```
{  "errors": [    {      "statusCode": 422,      "error": "Unprocessable Entity",      "message": "Something went wrong"    }  ]}
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

Try out this endpoint using our [API explorer](./explore.md)).

## Get list of all flights by campaign ID

Returns a collection of flight data for a given campaign ID.

### URL

```
GET https://api.realestate.com.au/campaign/v1/detail-performance/:campaign_id/flights
```

### Path Parameters

Name

Type

Required

Description

Example

campaign\_id

integer

Required

The unique campaign ID for the display performance report

89850

### Response Payload

#### Content Type

application/hal+json

#### Response Properties

The response payload uses the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) for embedding resources, and to support pagination of results and API links for individual resources. For more details on pagination, refer to the [Pagination](#pagination) section below.

The flight list resources are returned in the `items` array. The `_links` property for each embedded resource contains a `self` URL, a direct link for requesting that single item.

The `_links` property at the root level response contains a `self` URL for the actual request.

Each flight list (embedded resource) has the following properties:

#### Flight List

Property

Type

Description

Example

id

string

Unique identifier for the flight

”754739c0567616fe01cee87c7435ewtuoqwgs897f3”

name

string

Name of the flight

”South CC\_Apartments”

startDate

Melbourne date

Date the flight begins (inclusive)

“2021-12-10”

endDate

Melbourne date

Date the flight concludes (inclusive)

“2022-03-01”

productRateType

string

Rate type applied to product

”CPM”

type

string

Type of advertisement

”Lead Ad”

adType

string

Ad type applied to flight

”CPM”

impressionsGoal

string

Number of goal impressions for the flight

”1366875”

budget

string

Total budgeted for flight spend

”29100.000”

status

string

Current status of flight - generally “Active”, “Completed”, “Paused”, or “Pending"

"completed”

channel

string

Advertising channel where flight is live

”FB Newsfeed”

creatives

[Creative](#creative) array

Creative previews associated to the flight

performance

[Performance](#performance) object

Key performance metrics

spend

string

Total spent on flight to date

”29100.000”

clickThroughRate

string

Number of clicks divided by total impressions served

”0.421”

costPerLead

string

The amount paid for each lead as the result of flight activity and value

”316.000”

costPerClick

string

The amount paid for each click as the result of flight activity and value.

”2.407”

postEngagement

[Post Engagement](#post-engagement) object

Social media post engagement metrics

dailyPerformance

[Daily Performance](#daily-performance) array

daily performance metrics

#### Creative

Property

Type

Description

Example

id

string

Unique identifier for the creative

”42536”

name

string

Name of the creative

”220304\_ulah\_300x600\_V1”

isActive

boolean

Indicates whether the creative is currently active

false

imageUrl

string

URL location of the creative image

”[https://creative-previews.media-tools.realestate.com.au/v1/display/45536.png](https://creative-previews.media-tools.realestate.com.au/v1/display/45536.png)”

#### Performance

Property

Type

Description

Example

impressionsDelivered

string

Number of impressions delivered

”57976”

clicksDelivered

string

Number of clicks delivered

”843”

leadsDelivered

string

Number of leads delivered

”34”

leads

[Leads](#leads) object

Lead metrics

#### Daily Performance

Property

Type

Description

Example

spend

string

Total spent on flight to date

”29100.000”

clickThroughRate

string

Number of clicks divided by total impressions served

”0.421”

costPerLead

string

The amount paid for each lead as the result of flight activity and value

”316.000”

costPerClick

string

The amount paid for each click as the result of flight activity and value.

”2.407”

postEngagement

[Post Engagement](#post-engagement) object

Social media post engagement metrics

impressionsDelivered

string

Number of impressions delivered

”57976”

clicksDelivered

string

Number of clicks delivered

”843”

leadsDelivered

string

Number of leads delivered

”34”

leads

[Leads](#leads) object

Lead metrics

day

string

date where the metrics apply

”2024-09-09”

#### Leads

Property

Type

Description

Example

delivered

string

Number of leads delivered

”34”

deliveredPostClicks

string

Number of delivered post clicks

”843”

deliveredPostImpressions

string

Number of delivered post impressions

”843”

#### Post Engagement

Property

Type

Description

Example

postComments

string

Number of comments on a post

”7”

postShares

string

Number of times a post has been shared

”2”

postReactions

string

Number of reactions a post has generated

”60”

pageLikes

string

Number of likes the parent page has received

”10”

### Example Request

Terminal window

```
$ curl -H "Authorization: Bearer 9e64dc14-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/display-performance/76598/flights
```

#### Pagination

The flight items list (embedded resources) is paginated using the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) standard. The API returns a maximum of 20 records at a time. If the query result contains more than 20 items, the first page of 20 items will be returned, and the `_links` property will contain a `next` encoded hyperlink to navigate to the next page of results.

Upon navigation to the next page, the result will then contain a `prev` encoded hyperlink to navigate to the previous page of results (in this case the first page). If there are yet more results pages, the result will again contain a `next` hyperlink to navigate to the third page of results, and so on. The first (or only) page of results will not contain a `prev` hyperlink, and the last (or only) page of results will not contain a `next` hyperlink.

Example:

```
{  "_embedded": {    "items": [      // Flight items accessible to authorised user    ]  },  "_links": {    "self": {      "href": "https://api.realestate.com.au/campaign/v1/display-performance/70629/flights?pageIndex=2&pageSize=20"    },    "prev": {      "href": "https://api.realestate.com.au/campaign/v1/display-performance/70629/flights?pageIndex=1&pageSize=20"    },    "next": {      "href": "https://api.realestate.com.au/campaign/v1/display-performance/70629/flights?pageIndex=3&pageSize=20"    }  }}
```

#### Filter

The payload can be filtered by the following parameters:

Parameters

Options

Usage

Status

EXACT MATCH (‘pending’, ‘paused’, ‘completed’, ‘active’)

“status=pending”

Creative Id

EXACT MATCH

”creativeId=05b6558b8b4940e07a47e241c1dd1fc183ce6c7853f684c75fbe6c1e50ecaac7”

Start Date

Date format, greater than or equal to yyyy-mm-dd

”startDate=2020-01-02”

End Date

Date format, greater than or equal to yyyy-mm-dd

”endDate=2020-01-02”

With Daily Performance

String, either true or false (default)

“withDailyPerformance=true”

Example:

Terminal window

```
$ curl -H "Authorization: Bearer 9e64dc14-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/display-performance/89850/flights"
```

### Example Responses

#### 200 (Success) (no filters)

```
{  "_embedded": {    "items": [      {        "id": "754739c0567616fe01cee87c7435ewtuoqwgs897f3",        "name": "South CC_Apartments",        "startDate": null,        "endDate": null,        "productRateType": null,        "type": "Lead Ad",        "adType": null,        "impressionsGoal": null,        "budget": null,        "status": "completed",        "channel": "FB Newsfeed",        "creatives": [          {            "id": "42536",            "name": "220304_ulah_300x600_V1",            "isActive": false,            "imageUrl": "https://creative-previews.media-tools.realestate.com.au/v1/display/45536.png"          }        ],        "performance": {          "impressionsDelivered": "57976",          "clicksDelivered": "843",          "leadsDelivered": "34",          "leads": {            "delivered": "34",            "deliveredPostClicks": "0",            "deliveredPostImpressions": "0"          },          "spend": "2029.160",          "clickThroughRate": "1.454",          "costPerLead": "59.681",          "costPerClick": "2.407",          "postEngagement": {            "postComments": "7",            "postShares": "2",            "postReactions": "60",            "pageLikes": "0"          }        }      }    ]  },  "_links": {    "self": {      "href": "https://vision-api.devlob-staging.realestate.com.au/campaigns/89850/flights"    },    "next": {      "href": null    }  },  "total": 1}
```

#### 200 (Success) (with filters `withDailyPerformance`, `startDate`, `endDate`, and `creativeId`)

```
{  "_embedded": {    "items": [      {        "id": "754739c0567616fe01cee87c7435ewtuoqwgs897f3",        "name": "South CC_Apartments",        "startDate": null,        "endDate": null,        "productRateType": null,        "type": "Lead Ad",        "adType": null,        "impressionsGoal": null,        "budget": null,        "status": "completed",        "channel": "FB Newsfeed",        "creatives": [          {            "id": "42536",            "name": "220304_ulah_300x600_V1",            "isActive": false,            "imageUrl": "https://creative-previews.media-tools.realestate.com.au/v1/display/45536.png"          }        ],        "performance": {          "impressionsDelivered": "57976",          "clicksDelivered": "843",          "leadsDelivered": "34",          "leads": {            "delivered": "34",            "deliveredPostClicks": "0",            "deliveredPostImpressions": "0"          },          "spend": "2029.160",          "clickThroughRate": "1.454",          "costPerLead": "59.681",          "costPerClick": "2.407",          "postEngagement": {            "postComments": "7",            "postShares": "2",            "postReactions": "60",            "pageLikes": "0"          }        },        "dailyPerformance": [          {            "day": "2022-12-07",            "impressionsDelivered": "32",            "clicksDelivered": "0",            "leadsDelivered": "0",            "leads": {              "delivered": "0",              "deliveredPostClicks": "0",              "deliveredPostImpressions": "0"            },            "spend": "0.960",            "clickThroughRate": "0.000",            "costPerLead": null,            "costPerClick": null,            "postEngagement": {              "postComments": "7",              "postShares": "0",              "postReactions": "17",              "pageLikes": "0"            }          }        ]      }    ]  },  "_links": {    "self": {      "href": "https://vision-api.devlob-staging.realestate.com.au/campaigns/89850/flights?withDailyPerformance=true&creativeId=05b6558b8b4940e07a47e241c1dd1fc183ce6c7853f684c75fbe6c1e50ecaac7&startDate=2022-12-07&endDate=2022-12-07"    },    "next": {      "href": null    }  },  "total": 1}
```

#### 400 (Bad Request)

```
{  "errors": [    {      "statusCode": 400,      "error": "Bad request",      "message": "Bad request"    }  ]}
```

#### 404 (Not Found)

```
{  "errors": [    {      "statusCode": 404,      "error": "Not Found",      "message": "Not Found"    }  ]}
```

#### 422 (Unprocessable Entity)

```
{  "errors": [    {      "statusCode": 422,      "error": "Unprocessable Entity",      "message": "Something went wrong"    }  ]}
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

Try out this endpoint using our [API explorer](./explore.md)).

## Get list of all creatives by campaign ID

Returns a collection of creative data for a given campaign ID.

### URL

```
GET https://api.realestate.com.au/campaign/v1/detail-performance/:campaign_id/creatives
```

### Path Parameters

Name

Type

Required

Description

Example

campaign\_id

integer

Required

The unique campaign ID for the display performance creative report

89850

### Response Payload

#### Content Type

application/hal+json

#### Response Properties

The response payload uses the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) for embedding resources, and to support pagination of results and API links for individual resources. For more details on pagination, refer to the [Pagination](#pagination) section below.

The creative list resources are returned in the `items` array. The `_links` property for each embedded resource contains a `self` URL, a direct link for requesting that single item.

The `_links` property at the root level response contains a `self` URL for the actual request.

Each creative list (embedded resource) has the following properties:

#### Creative List

Property

Type

Description

Example

id

string

Unique identifier for the creative

”1a561e172d41156a7e829b54262c7352f3071702eb22dd9bf8800e78e31abf82”

name

string

Name of the creative

”210310\_Signature\_Aerial”

imageURL

string

URL location of creative image

”imagelocation.jpeg”

isActive

boolean or null

Indicates whether the creative is active for the campaign

true

channel

string

Advertising channel where creative is live

”FB Newsfeed”

performance

[Performance](#performance) object

Key performance metrics

spend

string

Total spent on creative to date

”29100.000”

clickThroughRate

string

Number of clicks divided by total impressions served

”0.421”

costPerLead

string

The amount paid for each lead as the result of campaign activity and value

”316.000”

costPerClick

string

The amount paid for each click as the result of campaign activity and value.

”2.407”

postEngagement

[Post Engagement](#post-engagement) object

Social media post engagement metrics

dailyPerformance

[Daily Performance](#daily-performance) array

daily performance metrics

_Creative spending in total and daily performance does not include the sponsorship type of spending_

#### Performance

Property

Type

Description

Example

impressionsDelivered

string

Number of impressions delivered

”57976”

clicksDelivered

string

Number of clicks delivered

”843”

leadsDelivered

string

Number of leads delivered

”34”

leads

[Leads](#leads) object

Lead metrics

#### Daily Performance

Property

Type

Description

Example

spend

string

Total spent on flight to date

”29100.000”

clickThroughRate

string

Number of clicks divided by total impressions served

”0.421”

costPerLead

string

The amount paid for each lead as the result of flight activity and value

”316.000”

costPerClick

string

The amount paid for each click as the result of flight activity and value.

”2.407”

postEngagement

[Post Engagement](#post-engagement) object

Social media post engagement metrics

impressionsDelivered

string

Number of impressions delivered

”57976”

clicksDelivered

string

Number of clicks delivered

”843”

leadsDelivered

string

Number of leads delivered

”34”

leads

[Leads](#leads) object

Lead metrics

day

string

date where the metrics apply

”2024-09-09”

#### Leads

Property

Type

Description

Example

delivered

string

Number of leads delivered

”34”

deliveredPostClicks

string

Number of delivered post clicks

”843”

deliveredPostImpressions

string

Number of delivered post impressions

”843”

#### Post Engagement

Property

Type

Description

Example

postComments

string

Number of comments on a post

”7”

postShares

string

Number of times a post has been shared

”2”

postReactions

string

Number of reactions a post has generated

”60”

pageLikes

string

Number of likes the parent page has received

”10”

### Example Request

Terminal window

```
$ curl -H "Authorization: Bearer 9e64dc14-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/display-performance/76598/creatives
```

#### Pagination

The creative item list (embedded resources) is paginated using the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) standard. The API returns a maximum of 20 records at a time. If the query result contains more than 20 items, the first page of 20 items will be returned, and the `_links` property will contain a `next` encoded hyperlink to navigate to the next page of results.

Upon navigation to the next page, the result will then contain a `prev` encoded hyperlink to navigate to the previous page of results (in this case the first page). If there are yet more results pages, the result will again contain a `next` hyperlink to navigate to the third page of results, and so on. The first (or only) page of results will not contain a `prev` hyperlink, and the last (or only) page of results will not contain a `next` hyperlink.

Example:

```
{  "_embedded": {    "items": [      // Creative items accessible to authorised user    ]  },  "_links": {    "self": {      "href": "https://api.realestate.com.au/campaign/v1/display-performance/70629/creatives?pageIndex=2&pageSize=20"    },    "prev": {      "href": "https://api.realestate.com.au/campaign/v1/display-performance/70629/creatives?pageIndex=1&pageSize=20"    },    "next": {      "href": "https://api.realestate.com.au/campaign/v1/display-performance/70629/creatives?pageIndex=3&pageSize=20"    }  }}
```

#### Filter

The payload can be filtered by the following parameters:

Parameters

Options

Usage

Creative Id

EXACT MATCH

”creativeId=05b6558b8b4940e07a47e241c1dd1fc183ce6c7853f684c75fbe6c1e50ecaac7”

Flight Id

EXACT MATCH

”flightId=55aa34304cd18a4c3d6b806dfa9240f2abcd292c55c1d8f299e1bc21e8a11257”

Start Date

Date format, greater than or equal to yyyy-mm-dd

”startDate=2020-01-02”

End Date

Date format, greater than or equal to yyyy-mm-dd

”endDate=2020-01-02”

With Daily Performance

String, either true or false (default)

“withDailyPerformance=true”

Example:

Terminal window

```
$ curl -H "Authorization: Bearer 9e64dc14-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/display-performance/89850/creatives"
```

### Example Responses

#### 200 (Success) (no filters)

```
{  "_embedded": {    "items": [      {        "id": "1a561e172d41156a7e829b54262c7352f3071702eb22dd9bf8800e78e31abf82",        "name": "210310_Signature_Aerial",        "imageUrl": null,        "type": "Link Ad",        "channel": "FB Newsfeed",        "isActive": true,        "performance": {          "impressionsDelivered": "39216",          "clicksDelivered": "318",          "leadsDelivered": "6",          "leads": {            "delivered": "6",            "deliveredPostClicks": "0",            "deliveredPostImpressions": "0"          },          "spend": "1372.560",          "clickThroughRate": "0.811",          "costPerLead": "228.760",          "costPerClick": "4.316",          "postEngagement": {            "postComments": "4",            "postShares": "2",            "postReactions": "31",            "pageLikes": "0"          }        }      },      {        "id": "042f2981330a9df10de337522653099fe2631d16251773e8e36306f68ba50605",        "name": "210310_Signature_PoolView",        "imageUrl": null,        "type": "Link Ad",        "channel": "FB Newsfeed",        "isActive": false,        "performance": {          "impressionsDelivered": "27416",          "clicksDelivered": "343",          "leadsDelivered": "13",          "leads": {            "delivered": "13",            "deliveredPostClicks": "0",            "deliveredPostImpressions": "0"          },          "spend": "959.560",          "clickThroughRate": "1.251",          "costPerLead": "73.812",          "costPerClick": "2.798",          "postEngagement": {            "postComments": "3",            "postShares": "0",            "postReactions": "18",            "pageLikes": "0"          }        }      },      {        "id": "7e3692a5db3e031b5b3d8c2bc2fa8369198e5b0bfcf3da6a7eac2fb4e79b85bc",        "name": "210310_Signature_External",        "imageUrl": null,        "type": "Link Ad",        "channel": "FB Newsfeed",        "isActive": true,        "performance": {          "impressionsDelivered": "20054",          "clicksDelivered": "278",          "leadsDelivered": "19",          "leads": {            "delivered": "19",            "deliveredPostClicks": "0",            "deliveredPostImpressions": "0"          },          "spend": "701.890",          "clickThroughRate": "1.386",          "costPerLead": "36.942",          "costPerClick": "2.525",          "postEngagement": {            "postComments": "1",            "postShares": "0",            "postReactions": "44",            "pageLikes": "0"          }        }      },      {        "id": "c1cd8a5f063030f23b063e0a3bf714a05bf8c2bfb2a0b4fb028e1a5c5f2b5234",        "name": "210310_Signature_Amenity",        "imageUrl": null,        "type": "Link Ad",        "channel": "FB Newsfeed",        "isActive": null,        "performance": {          "impressionsDelivered": "55117",          "clicksDelivered": "1047",          "leadsDelivered": "52",          "leads": {            "delivered": "52",            "deliveredPostClicks": "0",            "deliveredPostImpressions": "0"          },          "spend": "1929.095",          "clickThroughRate": "1.900",          "costPerLead": "37.098",          "costPerClick": "1.842",          "postEngagement": {            "postComments": "14",            "postShares": "4",            "postReactions": "83",            "pageLikes": "1"          }        }      }    ]  },  "_links": {    "self": {      "href": "https://vision-api.devlob-staging.realestate.com.au/campaigns/89850/creatives"    },    "next": {      "href": null    }  },  "total": 4}
```

#### 200 (Success) (with filters `withDailyPerformance`, `flightId`, `creativeId`, `startDate` and `endDate`)

```
{  "_embedded": {    "items": [      {        "id": "1a561e172d41156a7e829b54262c7352f3071702eb22dd9bf8800e78e31abf82",        "name": "210310_Signature_Aerial",        "imageUrl": null,        "type": "Link Ad",        "channel": "FB Newsfeed",        "isActive": true,        "performance": {          "impressionsDelivered": "39216",          "clicksDelivered": "318",          "leadsDelivered": "6",          "leads": {            "delivered": "6",            "deliveredPostClicks": "0",            "deliveredPostImpressions": "0"          },          "spend": "1372.560",          "clickThroughRate": "0.811",          "costPerLead": "228.760",          "costPerClick": "4.316",          "postEngagement": {            "postComments": "4",            "postShares": "2",            "postReactions": "31",            "pageLikes": "0"          }        },        "dailyPerformance": [          {            "day": "2022-12-07",            "impressionsDelivered": "32",            "clicksDelivered": "0",            "leadsDelivered": "0",            "leads": {              "delivered": "0",              "deliveredPostClicks": "0",              "deliveredPostImpressions": "0"            },            "spend": "0.960",            "clickThroughRate": "0.000",            "costPerLead": null,            "costPerClick": null,            "postEngagement": {              "postComments": "7",              "postShares": "0",              "postReactions": "17",              "pageLikes": "0"            }          },          {            "day": "2022-12-08",            "impressionsDelivered": "32",            "clicksDelivered": "0",            "leadsDelivered": "0",            "leads": {              "delivered": "0",              "deliveredPostClicks": "0",              "deliveredPostImpressions": "0"            },            "spend": "0.960",            "clickThroughRate": "0.000",            "costPerLead": null,            "costPerClick": null,            "postEngagement": {              "postComments": "7",              "postShares": "0",              "postReactions": "17",              "pageLikes": "0"            }          }        ]      }    ]  },  "_links": {    "self": {      "href": "https://vision-api.devlob-staging.realestate.com.au/campaigns/89850/creatives?withDailyPerformance=true&startDate=2022-12-07&endDate=2022-12-08&creativeId=1a561e172d41156a7e829b54262c7352f3071702eb22dd9bf8800e78e31abf82&flightId=542876"    },    "next": {      "href": null    }  },  "total": 1}
```

#### 400 (Bad Request)

```
{  "errors": [    {      "statusCode": 400,      "error": "Bad request",      "message": "Bad request"    }  ]}
```

#### 404 (Not Found)

```
{  "errors": [    {      "statusCode": 404,      "error": "Not Found",      "message": "Not Found"    }  ]}
```

#### 422 (Unprocessable Entity)

```
{  "errors": [    {      "statusCode": 422,      "error": "Unprocessable Entity",      "message": "Something went wrong"    }  ]}
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

Try out this endpoint using our [API explorer](./explore.md)).

## Get a CSV for one or more campaigns

Returns a CSV download of campaign data for one or more given campaign IDs, grouped by campaign and sorted by startDate. The CSV by default includes full campaign details, but can be reduced to snapshot only with a query parameter.

This CSV is a flat file structure, with creatives represented at the top level. If two campaigns are queried for, each with three flights and four creatives, then 24 rows would be returned in the CSV (2 \_ 3 \_ 4 = 24)

### URL

```
GET https://api.realestate.com.au/campaign/v1/detail-performance/csv
```

### Response Payload

#### Content Type

text/csv

#### Response Properties

The response payload is a CSV file download - default file name is `Campaign Detail Report.csv` or `Campaign Report.csv` for snapshot.

### Query Parameters

Parameters

Options

Usage

Campaign Id(s)

EXACT MATCH (one or more)

“campaignIds=79748,79741,85991”

Snaphot Details Only

Boolean

”snapshot=true”

Example

Terminal window

```
$ curl -H "Authorization: Bearer 9e64dc14-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/display-performance/csv -G -d "campaignIds=79741&snapshot=true"
```

#### Filters

Parameters

Options

Usage

Start Date

Date format, greater than or equal to yyyy-mm-dd

”startDate=2020-01-02”

End Date

Date format, greater than or equal to yyyy-mm-dd

”endDate=2020-04-02”

Example

Terminal window

```
$ curl -H "Authorization: Bearer 9e64dc14-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/display-performance/csv -G -d "campaignIds=79741&startDate=2020-07-02"
```

#### CSV Detail Fields (Default)

-   campaignEndDate
-   campaignStartDate
-   campaignName
-   product
-   flightName
-   creativeName
-   flightStartDate
-   flightEndDate
-   clickThroughRate
-   costPerLead
-   clicks
-   leads
-   spend
-   impressions
-   costPerClick
-   comments
-   reactions
-   shares
-   pageLikes

#### CSV Snapshot Fields (Using Query Parameter)

-   campaignStartDate
-   campaignEndDate
-   campaignName
-   clickThroughRate
-   leads
-   costPerLead
-   spend
-   impressions
-   clicks
-   costPerClick

### Example Request

Terminal window

```
$ curl -H "Authorization: Bearer 9e64dc14-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/display-performance/csv -G -d "campaignIds=79741"
```

### Example Responses

#### 200 (Success)

[See Example Campaign Detail Report CSV](https://partner.realestate.com.au/files/campaign/display-performance/Campaign_Detail_Report.csv)

```
"campaignStartDate","campaignEndDate","campaignName","product","flightName","creativeName","flightStartDate","flightEndDate","clickThroughRate","costPerLead","clicks","leads","spend","impressions","costPerClick","comments","reactions","shares","pageLikes""01 Jul 2020","30 Jun 2021","*CHANGE ORDER* 61231 - Ikon - Stockland NSW - Terraces Elara MD - AO FY21 - Audience Extension","audienceExtension","Buy + TH + House + NW Sydney","200701_NF_Jul2020","","","0.21%","$66","74","19","$1,255","35,850","$17","","2","","""01 Jul 2020","30 Jun 2021","*CHANGE ORDER* 61231 - Ikon - Stockland NSW - Terraces Elara MD - AO FY21 - Audience Extension","audienceExtension","Buy + NW Sydney","200701_NF_Jul2020","","","0.23%","$81","91","17","$1,370","39,141","$15","","4","","""01 Jul 2020","30 Jun 2021","*CHANGE ORDER* 61231 - Ikon - Stockland NSW - Terraces Elara MD - AO FY21 - Audience Extension","audienceExtension","Retargeting","200701_NF_Jul2020","","","0.54%","$28","227","53","$1,466","41,878","$6","","14","",""
```

#### 400 (Bad Request)

```
{  "errors": [    {      "statusCode": 400,      "error": "Bad request",      "message": "Missing campaign IDs in request query"    }  ]}
```

#### 404 (Not Found)

```
{  "errors": [    {      "statusCode": 404,      "error": "Not Found",      "message": "campaign is not found"    }  ]}
```

#### 422 (Unprocessable Entity)

```
{  "errors": [    {      "statusCode": 422,      "error": "Unprocessable Entity",      "message": "Something went wrong"    }  ]}
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

Try out this endpoint using our [API explorer](./explore.md)).
