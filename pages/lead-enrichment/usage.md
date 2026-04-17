---
title: "Usage"
source: https://partner.realestate.com.au/lead-enrichment/usage/
fetched_at: 2026-04-17T03:52:14.647Z
---

# Usage

Lead Enrichment API provides the following methods to request enrichment data:

-   Request paginated collection of enrichment data items with filtering capabilities [Link](#get-enrichment-data-for-enquiries-submitted-to-your-customers)
-   Request single enrichment data item for given enquiry ID [Link](#get-enrichment-data-item-by-enquiry-id)

## Get enrichment data for enquiries submitted to your customers

**Returns enrichment data for all the enquiries submitted to the agents you represent.**

Returns a collection representing enrichment data for all the enquiry records submitted to customers for which you have access.

Supports the following query parameters:

-   enquiryIds
-   since
-   pageIndex
-   pageSize

### Pagination

Every response payload with enrichment data will have a next link associated with it to act as a pointer to the next page that needs to be requested. If the next link on a page is null that indicates that there is no more available enrichment data for given query parameters.

The maximum number of enrichment data items on a single page is 100.

### URL

```
GET https://api.realestate.com.au/lead-enrichment/v1/enrichments
```

### Query Parameters

Parameter

Type

Required

Description

Example

enquiryIds

string

String of comma separated enquiry IDs to retrieve enrichment data for

e8ccd190-273f-4f53-a817-23665e576e2b,4814b93a-b40a-4369-a5b8-9b655ea958c3

since

string

An ISO-8601 timestamp (UTC) representing the point in time to begin consuming enquiries from. Filters results by enquiry creation time.

2020-01-01T00:00:00.1Z

pageIndex

integer

Value representing page index starting 1 (default is 1)

5

pageSize

integer

Value representing the number of enrichment data items per page (default is 20)

50

### Response Payload

#### Content Type

`application/hal+json`

_Response Properties_ The response payload uses the HAL hypermedia content type for embedding resources and API links. The enrichment resources are returned in the `items` array within the `_embedded` response property. The `_links` properties contain the `self` URL of the current page, as well as the `next` URL for the following page.

Each enrichment resource (item) has the following properties:

**Payload**

Property

Type

Description

Example

items

Array of [Enrichment](#enrichment) objects

The collection of enrichment data items matching the request

#### Enrichment

Property

Type

Description

Example

enquiryId

string

Unique identifier for the enquiry

”e8ccd190-273f-4f53-a817-23665e576e2b”

listingId

string

Unique identifier for the listing

”1337111”

isFinalised

string (boolean)

Value indicating whether enrichment process has been completed and data is fully available

”true”

enrichedAt

string (ISO8601 datetime)

Date/Time that the enquiry was enriched

”2020-01-24T12:00:36.000Z”

score

integer

X out of 10 value representing enquiry enrichment score

10

buyerReadiness

string, enum(low,medium,high)

Value indicating where the consumer is in their buy journey

”high”

listingEngagement

string, enum(low,medium,high)

Value indicating level of engagement with the listing

”medium”

topSearchedConfigurationBathrooms

array of [`TopSearchedConfigurationBathroom`](#topsearchedconfigurationbathroom-es) objects

Collection of consumer’s top searched bedroom configurations. If corresponding data is not available, it will be returned as an empty array (`[]`)

topSearchedConfigurationBedrooms

array of [`TopSearchedConfigurationBedroom`](#topsearchedconfigurationbedroom-es) objects

Collection of consumer’s top searched bathroom configurations. If corresponding data is not available, it will be returned as an empty array (`[]`)

topSearchedConstructionTypes

array of [`TopSearchedConstructionType`](#topsearchedconstructiontype-es) objects

Collection of consumer’s top searched construction types. If corresponding data is not available, it will be returned as an empty array (`[]`)

topSearchedPropertyTypes

array of [`TopSearchedPropertyType`](#topsearchedpropertytype-es) objects

Collection of consumer’s top searched property types. If corresponding data is not available, it will be returned as an empty array (`[]`)

topSearchedSuburbs

array of [`TopSearchedSuburb`](#topsearchedsuburb-es) objects

Collection of consumer’s top searched suburbs. If corresponding data is not available, it will be returned as an empty array (`[]`)

\_links

[`EnrichmentCollectionLinks`](#enrichmentcollectionlinks) object

Set of URLs related to the enrichment item, includes `self` URL and `next` page URL

#### TopSearchedConfigurationBathroom

Property

Type

Description

Example

position

integer

Number indicating the order of available search preference items

1

band

string, enum(low,medium,high)

Value indicating level of consumer’s interest in particular listing configuration

”high”

match

string (boolean)

Value indicating whether consumer’s search preference matches the listing configuration

”true”

bathrooms

integer

Number of bathrooms captured as consumer’s listing configuration search preference

2

#### **TopSearchedConfigurationBedroom**

Property

Type

Description

Example

position

integer

Number indicating the order of available search preference items

1

band

string, enum(low,medium,high)

Value indicating level of consumer’s interest in particular listing configuration

”high”

match

string (boolean)

Value indicating whether consumer’s search preference matches the listing configuration

”true”

bedrooms

integer

Number of bedrooms captured as consumer’s search preference

2

#### **TopSearchedConstructionType**

Property

Type

Description

Example

position

integer

Number indicating the order of available search preference items

1

band

string, enum(low,medium,high)

Value indicating level of consumer’s interest in particular construction type

”high”

match

string (boolean)

Value indicating whether consumer’s search preference matches the listing construction type

”true”

constructionType

string, enum(new,established)

Construction type captured as consumer’s search preference

”new”

#### TopSearchedPropertyType

Property

Type

Description

Example

position

integer

Number indicating the order of available search preference items

1

band

string, enum(low,medium,high)

Value indicating level of consumer’s interest in particular property type

”high”

match

string (boolean)

Value indicating whether consumer’s search preference matches the listing property type

”true”

propertyType

string, enum(house,land,townhouse,unit,other)

Construction type captured as consumer’s search preference

”townhouse”

#### TopSearchedSuburb

Property

Type

Description

Example

position

integer

Number indicating the order of available search preference items

1

band

string, enum(low,medium,high)

Value indicating level of consumer’s interest in particular suburb

”high”

match

string (boolean)

Value indicating whether consumer’s search preference matches the listing location suburb

”true”

suburb

string

Suburb name captured as consumer’s search preference

”Glen Huntly”

#### EnrichmentItemLinks

Property

Type

Description

Example

self

[`Link`](#link-es) object

`Link` object containing URL of the current page

next

[`Link`](#link-es) object

`Link` object containing URL of the next page

#### Link

Property

Type

Description

Example

href

string

Value specifying the link’s destination

`https://api.realestate.com.au/enrichment/v1/enrichments`

### Example Request

Terminal window

```
$ curl -H "Authorization: Bearer <token returned by OAuth service>" "https://api.realestate.com.au/lead-enrichment/v1/enrichments?enquiryIds=e8ccd190-273f-4f53-a817-23665e576e2b,4814b93a-b40a-4369-a5b8-9b655ea958c3"
```

### Example Responses

#### 200 (Success)

A set of enrichment data items for the requested `enquiryIds`.

```
{  "_embedded": {    "items": [      {        "enquiryId": "e8ccd190-273f-4f53-a817-23665e576e2b",        "listingId": "60001337",        "score": 9,        "isFinalised": true,        "enrichedAt": "2020-11-03T02:58:03.529Z",        "buyerReadiness": "high",        "listingEngagement": "high",        "topSearchedConfigurationBathrooms": [          {            "position": 1,            "band": "high",            "match": false,            "bathrooms": 3          },          {            "position": 2,            "band": "high",            "match": true,            "bathrooms": 2          },          {            "position": 3,            "band": "medium",            "match": false,            "bathrooms": 1          }        ],        "topSearchedConfigurationBedrooms": [          {            "position": 2,            "band": "high",            "match": false,            "bedrooms": 2          },          {            "position": 3,            "band": "high",            "match": false,            "bedrooms": 1          }        ],        "topSearchedConstructionTypes": [          {            "position": 1,            "band": "high",            "match": true,            "constructionType": "new"          },          {            "position": 2,            "band": "medium",            "match": false,            "constructionType": "established"          }        ],        "topSearchedPropertyTypes": [          {            "position": 1,            "band": "high",            "match": true,            "propertyType": "unit"          },          {            "position": 2,            "band": "medium",            "match": false,            "propertyType": "house"          },          {            "position": 3,            "band": "low",            "match": false,            "propertyType": "land"          }        ],        "topSearchedSuburbs": [          {            "position": 1,            "band": "high",            "match": false,            "suburb": "richmond"          },          {            "position": 2,            "band": "medium",            "match": true,            "suburb": "wycliffe well"          },          {            "position": 3,            "band": "low",            "match": false,            "suburb": "south yarra"          }        ],        "_links": {          "self": {            "href": "https://api.realestate.com/lead-enrichment/v1/enrichments/e8ccd190-273f-4f53-a817-23665e576e2b"          },          "enquiry": {            "href": "https://api.realestate.com/lead/v1/enquiries/e8ccd190-273f-4f53-a817-23665e576e2b"          }        }      }    ]  },  "_links": {    "self": {      "href": "https://api.realestate.com/lead-enrichment/v1/enrichments?enquiryIds=e8ccd190-273f-4f53-a817-23665e576e2b"    },    "next": {      "href": null    }  }}
```

#### 400 (Bad Request)

This request is missing required fields or is malformed.

```
{  "errors": [    {      "status": "400",      "title": "Bad Request",      "detail": "The request is missing required fields or is malformed",      "meta": {        "transactionId": "b0959f3f-0aaa-4cb2-a568-ae320830e8bc"      }    }  ]}
```

#### 401 (Unauthorized)

The authentication token is invalid or has expired.

```
{  "errors": [    {      "status": "401",      "title": "Unauthorized",      "detail": "The request requires a valid authentication token",      "meta": {        "transactionId": "af6dba36-eb9f-40ee-94ca-7abc22fa4661"      }    }  ]}
```

#### 403 (Forbidden)

Access to the requested resources is forbidden for given parameters.

```
{  "errors": [    {      "status": "403",      "title": "Forbidden",      "detail": "Access to the requested resource is forbidden",      "meta": {        "transactionId": "ce596d98-896f-4846-8a90-0ca1ad09ebb2"      }    }  ]}
```

### Try it Out

Try out this endpoint using our [API explorer](../explore/).

## Get Enrichment data item by enquiry ID

**Returns a single enrichment data item by Enquiry ID.**

The enrichment data item by enquiry ID endpoint returns enrichment data for a single enquiry. The response is the single enrichment data item for the enquiry that matches the supplied enquiry ID.

### URL

```
GET https://api.realestate.com.au/lead-enrichment/v1/enrichments/<enquiryId>
```

### Path Parameters

Parameter

Type

Required

Description

Example

enquiryId

string

Required

Unique ID for the enquiry

e8ccd190-273f-4f53-a817-23665e576e2b

### Response Payload

#### Content Type

`application/hal+json`

#### Response Properties

The response payload uses the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) for embedding resources and API links. Enrichment data for single enquiry is returned as a root level response object. The `_links` properties contain the `self` URL of the enrichment resource, and the `enquiry` URL of the corresponding enquiry in the Leads API.

Enrichment resource has the following properties:

#### Payload

Property

Type

Description

Example

enquiryId

string

Unique identifier for the enquiry

”e8ccd190-273f-4f53-a817-23665e576e2b”

listingId

string

Unique identifier for the listing

”1337111”

isFinalised

string (boolean)

Value indicating whether enrichment process has been completed and data is fully available

”true”

enrichedAt

string (ISO8601 datetime)

Date/Time that the enquiry was enriched

”2020-01-24T12:00:36.000Z”

score

integer

X out of 10 value representing enquiry enrichment score

10

buyerReadiness

string, enum(low,medium,high)

Value indicating where the consumer is in their buy journey

”high”

listingEngagement

string, enum(low,medium,high)

Value indicating level of engagement with the listing

”medium”

topSearchedConfigurationBathrooms

array of [`TopSearchedConfigurationBathroom`](#topsearchedconfigurationbathroom) objects

Collection of consumer’s top searched bedroom configurations. If corresponding data is not available, it will be returned as an empty array (`[]`)

topSearchedConfigurationBedrooms

array of [`TopSearchedConfigurationBedroom`](#topsearchedconfigurationbedroom) objects

Collection of consumer’s top searched bathroom configurations. If corresponding data is not available, it will be returned as an empty array (`[]`)

topSearchedConstructionTypes

array of [`TopSearchedConstructionType`](#topsearchedconstructiontype) objects

Collection of consumer’s top searched construction types. If corresponding data is not available, it will be returned as an empty array (`[]`)

topSearchedPropertyTypes

array of [`TopSearchedPropertyType`](#topsearchedpropertytype) objects

Collection of consumer’s top searched property types. If corresponding data is not available, it will be returned as an empty array (`[]`)

topSearchedSuburbs

array of [`TopSearchedSuburb`](#topsearchedsuburb) objects

Collection of consumer’s top searched suburbs. If corresponding data is not available, it will be returned as an empty array (`[]`)

\_links

[`EnrichmentItemLinks`](#enrichmentitemlinks) object

Set of URLs related to the enrichment item, includes `self` URL and `enquiry` URL

#### TopSearchedConfigurationBathroom

Property

Type

Description

Example

bathrooms

integer

Number of bathrooms captured as consumer’s listing configuration search preference

2

position

integer

Number indicating the order of available search preference items

1

band

string, enum(low,medium,high)

Value indicating level of consumer’s interest in particular listing configuration

”high”

match

string (boolean)

Value indicating whether consumer’s search preference matches the listing configuration

”true”

#### TopSearchedConfigurationBedroom

Property

Type

Description

Example

bedrooms

integer

Number of bedrooms captured as consumer’s search preference

2

position

integer

Number indicating the order of available search preference items

1

band

string, enum(low,medium,high)

Value indicating level of consumer’s interest in particular listing configuration

”high”

match

string (boolean)

Value indicating whether consumer’s search preference matches the listing configuration

”true”

#### TopSearchedConstructionType

Property

Type

Description

Example

constructionType

string, enum(new,established)

Construction type captured as consumer’s search preference

”new”

position

integer

Number indicating the order of available search preference items

1

band

string, enum(low,medium,high)

Value indicating level of consumer’s interest in particular construction type

”high”

match

string (boolean)

Value indicating whether consumer’s search preference matches the listing construction type

”true”

#### TopSearchedPropertyType

Property

Type

Description

Example

propertyType

string, enum(house,land,townhouse,unit,other)

Construction type captured as consumer’s search preference

”townhouse”

position

integer

Number indicating the order of available search preference items

1

band

string, enum(low,medium,high)

Value indicating level of consumer’s interest in particular property type

”high”

match

string (boolean)

Value indicating whether consumer’s search preference matches the listing property type

”true”

#### TopSearchedSuburb

Property

Type

Description

Example

suburb

string

Suburb name captured as consumer’s search preference

”Glen Huntly”

position

integer

Number indicating the order of available search preference items

1

band

string, enum(low,medium,high)

Value indicating level of consumer’s interest in particular suburb

”high”

match

string (boolean)

Value indicating whether consumer’s search preference matches the listing location suburb

”true”

#### EnrichmentItemLinks

Property

Type

Description

Example

self

[`Link`](#link) object

`Link` object containing URL of the enrichment item

enquiry

[`Link`](#link) object

`Link` object containing URL of corresponding enquiry in Leads API

#### Link

Property

Type

Description

Example

href

string

Value specifying the link’s destination

`https://api.realestate.com.au/enrichment/v1/enrichments/1`

### Example Request

Terminal window

```
$ curl -H "Authorization: Bearer <token returned by OAuth service>" "https://api.realestate.com.au/lead-enrichment/v1/enrichments/e8ccd190-273f-4f53-a817-23665e576e2b"
```

### Example Responses

#### 200 (Success)

A set of enrichment data items for the requested `enquiryId`.

```
{  "enquiryId": "e8ccd190-273f-4f53-a817-23665e576e2b",  "listingId": "60001337",  "score": 9,  "isFinalised": true,  "enrichedAt": "2020-11-03T02:58:03.529Z",  "buyerReadiness": "high",  "listingEngagement": "high",  "topSearchedConfigurationBathrooms": [    {      "position": 1,      "band": "high",      "match": false,      "bathrooms": 3    },    {      "position": 2,      "band": "high",      "match": true,      "bathrooms": 2    },    {      "position": 3,      "band": "medium",      "match": false,      "bathrooms": 1    }  ],  "topSearchedConfigurationBedrooms": [    {      "position": 2,      "band": "high",      "match": false,      "bedrooms": 2    },    {      "position": 3,      "band": "high",      "match": false,      "bedrooms": 1    }  ],  "topSearchedConstructionTypes": [    {      "position": 1,      "band": "high",      "match": true,      "constructionType": "new"    },    {      "position": 2,      "band": "medium",      "match": false,      "constructionType": "established"    }  ],  "topSearchedPropertyTypes": [    {      "position": 1,      "band": "high",      "match": true,      "propertyType": "unit"    },    {      "position": 2,      "band": "medium",      "match": false,      "propertyType": "house"    },    {      "position": 3,      "band": "low",      "match": false,      "propertyType": "land"    }  ],  "topSearchedSuburbs": [    {      "position": 1,      "band": "high",      "match": false,      "suburb": "richmond"    },    {      "position": 2,      "band": "medium",      "match": true,      "suburb": "wycliffe well"    },    {      "position": 3,      "band": "low",      "match": false,      "suburb": "south yarra"    }  ],  "_links": {    "self": {      "href": "https://api.realestate.com/lead-enrichment/v1/enrichments/e8ccd190-273f-4f53-a817-23665e576e2b"    },    "enquiry": {      "href": "https://api.realestate.com/lead/v1/enquiries/e8ccd190-273f-4f53-a817-23665e576e2b"    }  }}
```

#### 400 (Bad Request)

This request is missing required fields or is malformed.

```
{  "errors": [    {      "status": "400",      "title": "Bad Request",      "detail": "The request is missing required fields or is malformed",      "meta": {        "transactionId": "b0959f3f-0aaa-4cb2-a568-ae320830e8bc"      }    }  ]}
```

#### 401 (Unauthorized)

The authentication token is invalid or has expired.

```
{  "errors": [    {      "status": "401",      "title": "Unauthorized",      "detail": "The request requires a valid authentication token",      "meta": {        "transactionId": "af6dba36-eb9f-40ee-94ca-7abc22fa4661"      }    }  ]}
```

#### 403 (Forbidden)

Access to the requested resources is forbidden for given parameters.

```
{  "errors": [    {      "status": "403",      "title": "Forbidden",      "detail": "Access to the requested resource is forbidden",      "meta": {        "transactionId": "ce596d98-896f-4846-8a90-0ca1ad09ebb2"      }    }  ]}
```

#### 404 (Not Found)

No resources were found with the requested enquiry ID.

```
{  "errors": [    {      "status": "404",      "title": "Not Found",      "detail": "The requested resource cannot be found",      "meta": {        "transactionId": "af6dba36-eb9f-40ee-94ca-7abc22fa4661"      }    }  ]}
```

#### 406 (Not Acceptable)

Incorrect accept header sent in request. Need to send either `*/*` or `application/json`.

```
{  "errors": [    {      "status": 406,      "title": "Not Acceptable",      "detail": "The response content type is not acceptable according to the accept headers sent in the request",      "meta": {        "transactionId": "af6dba36-eb9f-40ee-94ca-7abc22fa4661"      }    }  ]}
```

### Try it Out

Try out this endpoint using our [API explorer](../explore/).
