---
title: "Project Performance Usage"
source: https://partner.realestate.com.au/campaign/project-performance/usage/
fetched_at: 2026-04-17T03:51:06.180Z
---

# Project Performance Usage

## Get Project Performance Reports for Agency

**Get multiple project performance reports by agency ID**

Returns a collection of project performance reports for project profile advertising campaigns belonging to an agent. The response includes reports for projects that match the supplied query parameters. Each project performance report includes details about the project, as well as metrics for the report period:

-   total project performance (portal metrics for the whole project profile: project page performance + total project child listings performance)

Each portal metrics object contains metrics at two different aggregation levels:

-   all (totals for the whole reporting period)
-   daily (totals for calendar dates of whole history)

Supports the following query parameters:

-   agency\_id

### URL

```
GET https://api.realestate.com.au/campaign/v2/project-performance
```

### Query Parameters

Parameter

Type

Required

Description

Example

agency\_id

string

Required

The unique ID of the agency for the desired project performance reports

ABCDEF

### Response Payload

#### Content Type

application/hal+json

#### Response Properties

The response payload uses the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) for embedding resources, and to support pagination of results and API links for individual resources. For more details on pagination, refer to the [Pagination](#pagination) section below.

The project-performance resources are returned in the `items` array within the `_embedded` response property. The `_links` property for each embedded resource contains a `self` URL, a direct link for requesting that single item.

The `_links` property at the root level response contains a `self` URL for the actual request, and optionally `prev` and/or `next` URLs, which navigate to the previous or next page of results if they exist.

Each project-performance item (embedded resource) has the following properties:

#### Project Performance Item

Property

Type

Description

Example

id

string

Unique identifier for the project performance report (same as project.id)

600012345

listingType

string

Type of listing

Project Profile

agencyId

string

Unique identifier representing the project agency

ABCDEF

listedDate

string

Listed date of listing

2019-02-05

lastModifiedAt

UTC datetime

Date/time that the project performance report was last modified

2023-04-03 09:07:21

pageView

number

Individual metric of total project performance aggregated total value

searchResultsPageImpression

number

Individual metric of total project performance aggregated total value

spend

number

Individual metric of total project performance aggregated total value

phoneEngagement

[Phone Engagement](#phoneEngagement) object

Individual metrics of total project performance aggregated total value

emailLeads

[Email Leads](#emailLeads) object

Individual metrics of total project performance aggregated total value

phoneLeads

[Phone Leads](#phoneLeads) object

Individual metrics of total project performance aggregated total value

costPerLead

[Cost Per Lead](#costPerLead) object

Individual metrics of total project performance aggregated total value

viewStatementOfInformation

number

Individual metric of total project performance aggregated total value

listingSaved

number

Individual metric of total project performance aggregated total value

sendToFriend

number

Individual metric of total project performance aggregated total value

savedInspectionTime

number

Individual metric of total project performance aggregated total value

threeDTourView

number

Individual metric of total project performance aggregated total value

floorplanView

number

Individual metric of total project performance aggregated total value

videoView

number

Individual metric of total project performance aggregated total value

expandMap

number

Individual metric of total project performance aggregated total value

getDirections

number

Individual metric of total project performance aggregated total value

emailDirections

number

Individual metric of total project performance aggregated total value

performance

[Daily Performance](#performance) array

Individual metrics of total project performance at daily level

lastActivityDate

string

a measure of how recently campaign activity occurred for a given project

2023-04-06

#### Phone Engagement

Property

Type

Description

Example

revealedAgentPhoneNumber

number

Individual metric of total project performance aggregated total value

clickToCall

number

Individual metric of total project performance aggregated total value

#### Email Leads

Property

Type

Description

Example

documentDownload

number

Individual metric of total project performance aggregated total value

emailEnquiry

number

Individual metric of total project performance aggregated total value

#### Phone Leads

Property

Type

Description

Example

sms

number

Individual metric of total project performance aggregated total value

phoneCall

number

Individual metric of total project performance aggregated total value

#### Cost Per Lead

Property

Type

Description

Example

leadsAndEngagements

number

Individual metric of total project performance aggregated total value

emailLeads

number

Individual metric of total project performance aggregated total value

phoneEngagement

number

Individual metric of total project performance aggregated total value

phoneLeads

number

Individual metric of total project performance aggregated total value

emailAndPhoneLeads

number

Individual metric of total project performance aggregated total value

#### Daily Performance

Property

Type

Description

Example

pageView

number

Individual metric of total project performance at daily level

emailLeads

number

Individual metric of total project performance at daily level

phoneLeads

number

Individual metric of total project performance at daily level

phoneEngagement

number

Individual metric of total project performance at daily level

spend

number

Individual metric of total project performance at daily level

day

string

reporting day

2019-07-20

#### Pagination

The project-performance items (embedded resources) are paginated using the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) standard. The API returns a maximum of 10 records at a time, and is ordered by the `id` property of the items. If the query result contains more than 10 items, the first page of 10 items will be returned, and the `_links` property will contain a `next` encoded hyperlink to navigate to the next page of results.

Upon navigation to the next page, the result will then contain a `prev` encoded hyperlink to navigate to the previous page of results (in this case the first page). If there are yet more results pages, the result will again contain a `next` hyperlink to navigate to the third page of results, and so on. The first (or only) page of results will not contain a `prev` hyperlink, and the last (or only) page of results will not contain a `next` hyperlink.

For example:

```
{  "_embedded": {    "items": [      // Project performance reports for requested agency ID    ]  },  "_links": {    "self": {      "href": "https://api.realestate.com.au/campaign/v2/project-performance?agency_id=ABCDEF&after=cBzYx7N0jpop9ItntUNppnYxLzMv"    },    "prev": {      "href": "https://api.realestate.com.au/campaign/v2/project-performance?agency_id=ABCDEF&before=Sqf_dyQ6BGvjFZK38NFAPnYxLzMv"    },    "next": {      "href": "https://api.realestate.com.au/campaign/v2/project-performance?agency_id=ABCDEF&after=qwck09xRNzr_4UcsJFh8wHYxLzIv"    }  }}
```

### Example Request

Terminal window

```
$ curl -H "Authorization: Bearer 41cd46e9-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v2/project-performance?agency_id=ABCDEF
```

### Example Responses

#### 200 (Success)

A set of project performance reports for the requested agency\_id

```
{  "_embedded": {    "items": [      {        "_links": {          "self": {            "href": "https://api.realestate.com.au/campaign/v2/project-performance/600012345"          }        },        "id": "600012345",        "listingType": "Project Profile",        "agencyId": "ABCDEF",        "listedDate": "2019-02-05",        "lastModifiedAt": "2023-04-03 09:07:21",        "pageView": 495,        "searchResultsPageImpression": 108155,        "spend": 20154.347925,        "phoneEngagement": {          "revealedAgentPhoneNumber": 9,          "clickToCall": 30        },        "emailLeads": {          "documentDownload": 0,          "emailEnquiry": 299        },        "phoneLeads": {          "sms": 0,          "phoneCall": 0        },        "costPerLead": {          "leadsAndEngagements": 59.628248298816565,          "emailLeads": 67.40584590301003,          "phoneEngagement": 516.7781519230768,          "phoneLeads": 0,          "emailAndPhoneLeads": 67.40584590301003        },        "viewStatementOfInformation": 7,        "listingSaved": 30,        "sendToFriend": 2,        "savedInspectionTime": 0,        "threeDTourView": 0,        "floorplanView": 44,        "videoView": 18,        "expandMap": 20,        "getDirections": 0,        "emailDirections": 0,        "performance": [          {            "pageView": 0,            "emailLeads": 0,            "phoneLeads": 0,            "phoneEngagement": 0,            "spend": 0,            "day": "2019-07-20"          }          // All daily performance history        ],        "lastActivityDate": "2019-07-01"      }      // All project performance reports for agency up to max page size    ]  },  "_links": {    "self": {      "href": "https://api.realestate.com.au/campaign/v2/project-performance?agency_id=ABCDEF"    }  }}
```

#### 400 (Bad Request)

The request is missing required fields or is malformed

```
{  "errors": [    {      "status": "400",      "title": "Bad Request",      "detail": "The request is missing required fields or is malformed",      "meta": {        "transactionId": "b0959f3f-0aaa-4cb2-a568-ae320830e8bc"      }    }  ]}
```

#### 401 (Unauthorized)

The request requires a valid authentication token

```
{  "errors": [    {      "status": "401",      "title": "Unauthorized",      "detail": "The request requires a valid authentication token",      "meta": {        "transactionId": "af6dba36-eb9f-40ee-94ca-7abc22fa4661"      }    }  ]}
```

#### 403 (Forbidden)

Access to project-performance resources on behalf of the requested agency\_id is forbidden

```
{  "errors": [    {      "status": "403",      "title": "Forbidden",      "detail": "Access to the requested resource is forbidden",      "meta": {        "transactionId": "ce596d98-896f-4846-8a90-0ca1ad09ebb2"      }    }  ]}
```

#### 404 (Not Found)

No project-performance resources were found for the requested agency\_id

```
{  "errors": [    {      "status": "404",      "title": "Not Found",      "detail": "The requested resource cannot be found",      "meta": {        "transactionId": "af6dba36-eb9f-40ee-94ca-7abc22fa4661"      }    }  ]}
```

### Try it Out

Try out this endpoint using our [API explorer](./explore.md).

## Get Project Performance Report by Project ID

**Get single project performance report by project ID**

The project-performance by project-id endpoint returns a single project performance report a for project profile advertising campaign. The response is a report for the project that matches the supplied project ID. Each project performance report includes details about the project, as well as four sets of metrics for the report period:

-   total project performance (portal metrics for the whole project profile: project page performance + total project child listings performance)

Each portal metrics object contains metrics at two different aggregation levels:

-   all (totals for the whole reporting period)
-   daily (totals for calendar dates of whole history)

### URL

```
GET https://api.realestate.com.au/campaign/v2/project-performance/:project_profile_id
```

### Path Parameters

Name

Type

Required

Description

Example

project\_profile\_id

integer

Required

The unique project ID for the project performance report

600012345

### Response Payload

#### Content Type

application/hal+json

#### Response Properties

The response payload uses the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) for embedding resources and API links. Single project-performance resources are returned as a root level response object, with the `_links` property containing the `self` URL of the project-performance resource, which in this case is the same as the requested URL.

The project-performance resource has the same properties as the [project-performance item payload](#projectPerformanceItem2).

### Example Request

Terminal window

```
$ curl -H "Authorization: Bearer 41cd46e9-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v2/project-performance/600012345
```

#### Filter

The payload can be filtered by`start_date`, either with or without `end_date`, `end_date` cannot be passed without `start_date`:

Parameters

Options

Usage

Start Date

Date format, greater than or equal to yyyy-mm-dd

”start\_date=2022-07-01”

End Date

Date format, greater than or equal to yyyy-mm-dd

”end\_date=2022-07-01”

Example:

Terminal window

```
$ curl -H "Authorization: Bearer 41cd46e9-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v2/project-performance/600012345?start_date=2023-05-01&end_date=2023-05-06
```

### Example Responses

#### 200 (Success)

A project performance report for the requested project ID

```
{  "id": "600012345",  "listingType": "Project Profile",  "agencyId": "ABCDEF",  "listedDate": "2019-02-05",  "lastModifiedAt": "2023-04-03 09:07:21",  "pageView": 495,  "searchResultsPageImpression": 108155,  "spend": 20154.347925,  "phoneEngagement": {    "revealedAgentPhoneNumber": 9,    "clickToCall": 30  },  "emailLeads": {    "documentDownload": 0,    "emailEnquiry": 299  },  "phoneLeads": {    "sms": 0,    "phoneCall": 0  },  "costPerLead": {    "leadsAndEngagements": 59.628248298816565,    "emailLeads": 67.40584590301003,    "phoneEngagement": 516.7781519230768,    "phoneLeads": 0,    "emailAndPhoneLeads": 67.40584590301003  },  "viewStatementOfInformation": 7,  "listingSaved": 30,  "sendToFriend": 2,  "savedInspectionTime": 0,  "threeDTourView": 0,  "floorplanView": 44,  "videoView": 18,  "expandMap": 20,  "getDirections": 0,  "emailDirections": 0,  "performance": [    {      "pageView": 5,      "emailLeads": 1,      "phoneLeads": 0,      "phoneEngagement": 0,      "spend": 100,      "day": "2021-05-01"    },    {      "pageView": 50,      "emailLeads": 10,      "phoneLeads": 5,      "phoneEngagement": 2,      "spend": 500,      "day": "2021-05-02"    },    {      "pageView": 0,      "emailLeads": 0,      "phoneLeads": 0,      "phoneEngagement": 0,      "spend": 0,      "day": "2021-05-03"    },    {      "pageView": 1,      "emailLeads": 20,      "phoneLeads": 0,      "phoneEngagement": 0,      "spend": 100,      "day": "2021-05-04"    },    {      "pageView": 30,      "emailLeads": 10,      "phoneLeads": 0,      "phoneEngagement": 0,      "spend": 200,      "day": "2021-05-05"    },    {      "pageView": 8,      "emailLeads": 1,      "phoneLeads": 0,      "phoneEngagement": 0,      "spend": 50,      "day": "2021-05-06"    }    // All daily performance history  ],  "_links": {    "self": {      "href": "http://localhost:8000/campaign/v2/project-performance/600012345"    }  }}
```

#### 400 (Bad Request)

The request is missing required fields or is malformed

```
{  "errors": [    {      "status": "400",      "title": "Bad Request",      "detail": "The request is missing required fields or is malformed",      "meta": {        "transactionId": "b0959f3f-0aaa-4cb2-a568-ae320830e8bc"      }    }  ]}
```

#### 401 (Unauthorized)

The request requires a valid authentication token

```
{  "errors": [    {      "status": "401",      "title": "Unauthorized",      "detail": "The request requires a valid authentication token",      "meta": {        "transactionId": "af6dba36-eb9f-40ee-94ca-7abc22fa4661"      }    }  ]}
```

#### 403 (Forbidden)

Access to the requested project-performance resource is forbidden

```
{  "errors": [    {      "status": "403",      "title": "Forbidden",      "detail": "Access to the requested resource is forbidden",      "meta": {        "transactionId": "ce596d98-896f-4846-8a90-0ca1ad09ebb2"      }    }  ]}
```

### Try it Out

Try out this endpoint using our [API explorer](./explore.md).
