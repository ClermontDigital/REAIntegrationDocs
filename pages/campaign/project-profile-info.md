---
title: "Project Profile Info"
source: https://partner.realestate.com.au/campaign/project-profile-info/
fetched_at: 2026-04-17T03:51:07.945Z
---

# Project Profile Info

**Get project profiles for a user or agency**

Returns a collection of project profiles for a given list of agencies. If none are provided, it returns a collection of all the project profiles for all the agencies the user has access to.

Supports the following query parameters:

-   agency\_ids
-   status
-   size
-   from

### URL

```
GET https://api.realestate.com.au/campaign/v1/project-profile-info
```

### Query Parameters

Parameter

Type

Required

Description

Example

agency\_ids

string

Optional

One or more agency ids separated by a comma

ABCDEF,GHIJKL

status

string

Optional

One of ACTIVE or EXPIRED

ACTIVE

size

integer

Optional

The maximum number of items the request will return (Default is 20)

20

from

integer

Optional

The cursor of where to start returning project profiles (e.g. if you got 20 items on the first page, the request for page 2 should have ?from=21)

21

### Response Payload

#### Content Type

application/hal+json

#### Response Properties

The response payload uses the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) for embedding resources, and to support pagination of results and API links for individual resources. For more details on pagination, refer to the [Pagination](#pagination) section below.

The project-profile resources are returned in the `items` array within the `_embedded` response property. The `_links` property for each embedded resource contains a `self` URL, a direct link for requesting that single item.

The `_links` property at the root level response contains a `self` URL for the actual request, and optionally `prev` and/or `next` URLs, which navigate to the previous or next page of results if they exist.

Each project-profile item (embedded resource) has the following properties:

#### Project Profile Item

Property

Type

Description

Example

listingId

string

Unique identifier for the listing

600012345

externalListingId

string

External identifier for the listing (nullable)

null

agencyId

string

Unique identifier representing the project agency

ABCDEF

documentType

string

Type of document

project

activeDate

string

Date when the listing becomes active

YYYY-MM-DD

delistedDate

string

Date when the listing is delisted (nullable)

null

projectName

string

Name of the project

REA Developer Project

#### Pagination

The project-profile items (embedded resources) are paginated using the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) standard. The API returns 20 records at a time by default, and is ordered by the `id` property of the items. If the query result contains more than 20 items, the first page of 20 items will be returned, and the `_links` property will contain a `next` encoded hyperlink to navigate to the next page of results.

Upon navigation to the next page, the result will then contain a `prev` encoded hyperlink to navigate to the previous page of results (in this case the first page). If there are yet more results pages, the result will again contain a `next` hyperlink to navigate to the third page of results, and so on. The first (or only) page of results will not contain a `prev` hyperlink, and the last (or only) page of results will not contain a `next` hyperlink.

For example:

```
{  "_links": {    "self": {      "rel": "self",      "href": "https://api.realestate.com.au/campaign/v1/project-profile-info?agency_ids=ABCDEF&size=20&from=20"    },    "next": {      "rel": "next",      "href": "https://api.realestate.com.au/campaign/v1/project-profile-info?agency_ids=ABCDEF&size=20&from=40"    },    "prev": {      "rel": "prev",      "href": "https://api.realestate.com.au/campaign/v1/project-profile-info?agency_ids=ABCDEF&size=20&from=0"    }  },  "_embedded": {    "items": [      // Project profile items for the requested agency ID(s)    ]  },  "total": 70}
```

### Example Request

Terminal window

```
$ curl -H "Authorization: Bearer 41cd46e9-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/project-profile-info?agency_ids=ABCDEF&size=1
```

### Example Responses

#### 200 (Success)

A set of project profiles for the requested agency\_ids

```
{  "_links": {    "self": {      "rel": "self",      "href": "https://api.realestate.com.au/campaign/v1/project-profile-info?agency_ids=ABCDEF&size=1&from=0"    },    "next": {      "rel": "next",      "href": "https://api.realestate.com.au/campaign/v1/project-profile-info?agency_ids=ABCDEF&size=1&from=1"    }  },  "_embedded": {    "items": [      {        "_links": {          "self": {            "href": "https://api.realestate.com.au/campaign/v1/project-profile-info/600012345"          }        },        "listingId": "600012345",        "externalListingId": null,        "agencyId": "ABCDEF",        "documentType": "project",        "activeDate": "2024-04-10",        "delistedDate": null,        "projectName": "REA Developer Project"      }    ]  },  "total": 10}
```

#### 403 (Forbidden)

Access to project-profile resources on behalf of the requested agency\_ids is forbidden

```
{  "errors": [    {      "status": "403",      "title": "Forbidden",      "detail": "Access to the requested resource is forbidden",      "meta": {        "transactionId": "ce596d98-896f-4846-8a90-0ca1ad09ebb2"      }    }  ]}
```

#### 404 (Not Found)

No project-profile resources were found for the requested agency\_ids

```
{  "errors": [    {      "status": "404",      "title": "Not Found",      "detail": "The requested resource cannot be found",      "meta": {        "transactionId": "af6dba36-eb9f-40ee-94ca-7abc22fa4661"      }    }  ]}
```
