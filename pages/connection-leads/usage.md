---
title: "Usage"
source: https://partner.realestate.com.au/connection-leads/usage/
fetched_at: 2026-04-17T03:51:17.127Z
---

# Usage

## Poll connection leads

Returns a collection of connection leads which belong to the agencies that authorized the partner and of which applications were approved after the specific time. The response includes the details of the application, tenant, property, agency and agent. The number of the leads will be up to 25 per page.

Please refer to [response payload](#response-payload) below for more details.

**Require the following query parameters:**

-   happenedSince

### URL

```
GET https://api.realestate.com.au/applications/v1/rental/connection-leads
```

### Query Parameters

Parameter

Type

Required

Description

Example

happenedSince

date-time

Required

The endpoint will return the connection leads of applications approved since `happenedSince` (exclusive). This parameter should be formatted as ISO-8601 datetime, i.e. `2020-08-27T22:47:01.604Z`. When using Postman, curl, or a web application, it must use correct URL encoding.

2020-08-27T22:47:01.604Z

### Response Payload

#### Content Type

application/hal+json

#### Response Properties

The response payload uses the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) for embedding resources, for now the endpoint returns up to 25 connection leads per page. For more details on pagination, refer to the [Pagination](#pagination) section below.

The connection leads are returned in the `connectionLeads` array within the `_embedded` response property.

The `_links` property at the root level response contains a `self` URL for the actual request, and optionally `next` URLs, which navigate to the next page of results if it exist.

Each connection leads item (embedded resource) has the following properties:

#### Payload

Property

Type

Description

Example

connectionLeads

Array of \[ConnectionLead\] (#connection-lead) objects

The collection of connection leads matching the request.

#### ConnectionLead

Property

Type

Description

Example

application

\[Application\] (#connection-lead) object

The application where the connection lead belongs.

tenant

\[Tenant\] (#tenant) object

The tenant applied the property.

property

\[Property\] (#property) object

The details of the property.

agency

\[Agency\] (#agency) object

The agency where the property belongs. For the `un-affiliated` leads, the agency will be null.

agents

Array of \[Agent\] (#agent) objects

The agents who posted the property. For the `un-affiliated` leads, the agents will be null.

connectionProviderName

string

The name of the connection provider.

connectnow

utilityConnectionsAllowed

Array of string

The types of the utility connection allowed to be connecting.  
For `VIC` properties, if applicant opts out of connections, the value will be \[“water”\]. If applicant opts into connections, the value will be \[“all”\].  
For other properties, if applicants allow utility connections, the value will always be \[“all”\].

\[“all”\]

#### Application

Property

Type

Description

Example

id

string

Unique identifier representing a specific application.

3fa85f64-5717-4562-b3fc-2c963f66afa6

approvedAt

date-time(ISO-8601)

The application approved time.

2020-08-18T02:22:56.228549Z

#### Tenant

Property

Type

Description

Example

firstName

string

The tenant’s first name.

James

lastName

string

The tenant’s last name.

Smith

email

string

The tenant’s email.

[james.smith@test.com](mailto:james.smith@test.com)

mobilePhoneNumber

string

The tenant’s mobile phone number.

423576546476

birthDate

date

The tenant’s birth date.

2000-01-01

identityDocument

\[IdentityDocument\] (#identityDocument) object

The tenant’s identity document details.  
For VIC properties, the value will be the identity document details.  
For other properties, the value will always be `null`.

#### IdentityDocument

Property

Type

Description

Example

documentType

string

The type of identity document that the tenant provides.  
it could be either `DRIVER_LICENCE` or `PASSPORT`.

DRIVER\_LICENCE

passportCountryCode

string

The code of country in the passport.

AU

passportNumber

string

The passport number in the passport.

AU1234567

passportExpiryDate

date

The passport expiry date in the passport.

2022-09-01

licenceNumber

string

The licence number in the driver licence.

123456789

licenceState

string

The licence state in the driver licence.

VIC

licenceExpiryDate

date

The licence expiry date in the driver licence.

2022-09-01

#### Property

Property

Type

Description

Example

street

string

The street where the property is, could be null if the agent not provide.

10 Victory Street

suburb

string

The suburb where the property is.

Wycliffe Well

state

string

The state where the property is.

VIC

postcode

string

The postcode where the property is.

1234

moveInDate

date

The date when tenant moves in.

2021-09-01

#### Agency

Property

Type

Description

Example

reaId

string

Unique identifier representing the agency.

ABCDEF

name

string

The name of the agency.

Pippin & Hall Real Estate - Wycliffe Well

#### Agent

Property

Type

Description

Example

id

string

Unique identifier representing the agent.

2395822

name

string

The name of the agent.

Peter Bond

email

string

The email of the agent.

[peter.bond@test.com](mailto:peter.bond@test.com)

### Pagination

The connection lead items (embedded resources) are paginated using the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) standard. The API returns a maximum of 25 records at a time, and is ordered by the field `approvedAt` ascending which is the approved time of the application. If the query result contains more than 25 items, the first page of 25 items will be returned, and the `_links` property will contain a `self` encoded hyperlink and a `next` encoded hyperlink to navigate to the next page of results.

If there are yet more results pages, the result will again contain a `next` hyperlink to navigate to the third page of results, and so on. The pages of results will not contain a `prev` hyperlink for now.

The last page of the results will not contain a `next` hyperlink, and the results array will be empty.

So if you are using this endpoint to retrieve connection leads, you should:

-   Start polling from a specific date.
-   Get the first page of results and a `next` link.
-   Poll for that `next` link for the next results.
-   Continue polling until you reach the last page of results, which you can detect by the absence of the `next` link, and empty array of results.
-   Store the last `happenedSince` or the last link you’ve used, and stop polling for a while. The polling frequency is up to you.
-   Then you poll again, use the last `happenedSince` you’ve stored, and the same overall polling logic.

See examples below.

### Poll connection leads examples

#### The successful request

**Request with valid token and happenedSince:**

Terminal window

```
curl -L -X GET 'https://api.realestate.com.au/applications/v1/rental/connection-leads?happenedSince=2020-08-30T06%3A49%3A00.494279Z' \-H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a1'
```

**The response example:**

```
{  "_embedded": {    "connectionLeads": [      {        "application": {          "id": "33a4d898-0e36-4fe6-9fa4-8fc31bded6f1",          "approvedAt": "2020-08-31T05:26:00.432202Z"        },        "tenant": {          "firstName": "James",          "lastName": "Smith",          "email": "james.smith@test.com",          "mobilePhoneNumber": "423576546476",          "birthDate": "2000-01-01",          "identityDocument": null        },        "property": {          "street": "101 Rental Test St",          "suburb": "Wycliffe Well",          "state": "NT",          "postCode": "0862",          "moveInDate": "2020-09-31T05:26:00.432202Z"        },        "agency": {          "reaId": "ABCDEF",          "name": "Pippin & Hall Real Estate - Wycliffe Well"        },        "agents": [          {            "id": "2395822",            "name": "Peter Bond",            "email": "peter.bond@test.com"          }        ],        "connectionProviderName": "connectnow",        "utilityConnectionsAllowed": ["all"]      }    ]  },  "_links": {    "self": {      "href": "/connection-leads?happenedSince=2020-08-30T06%3A49%3A00.494279Z"    },    "next": {      "href": "/connection-leads?happenedSince=2020-08-31T05%3A41%3A53.677777Z"    }  }}
```

#### The unsuccessful request

**Request with invalid authorization token**

Terminal window

```
curl -L -X GET 'http://api.realestate.com.au/applications/v1/rental/connection-leads?happenedSince=2020-08-30T06%3A49%3A00.494279Z' \-H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a2'
```

**The response example:**

```
{  "errors": [    {      "status": "401",      "meta": {        "transactionId": "57f06781-ac3a-4963-8143-a5926fc5c909"      },      "title": "Unauthorized",      "detail": "The request requires a valid authentication token"    }  ]}
```

**Request with invalid parameter `happenedSince`**

Terminal window

```
curl -L -X GET 'http://api.realestate.com.au/applications/v1/rental/connection-leads?happenedSince=2020-08-32T06%3A49%3A00.494279Z' \-H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a1'
```

**The response example:**

The response code will be `400 Bad Request`, the payload will be:

```
{  "message": "Failed to convert value of type 'java.lang.String' to required type 'java.time.OffsetDateTime'",  "transactionId": "6a29ab71-bb76-418c-9fee-c5a667e866bc",  "details": []}
```

### Try it Out

Try out this endpoint using our [API explorer](../explore/).

## Poll affiliated agencies

Returns a collection of affiliated agencies for the provider after the specific time, the response include agencyId, agencyName, providerName, and updatedAt. The number of the affiliated agencies will be up to 25 per page.

Please refer to [response payload](#affiliated-agencies-response-payload) below for more details.

**Require the following query parameters:**

-   happenedSince

### URL

```
GET https://api.realestate.com.au/applications/v1/rental/connection-leads/agencies
```

### Query Parameters

Parameter

Type

Required

Description

Example

happenedSince

date-time

Required

The endpoint will return the affiliated agencies since `happenedSince` (exclusive). This parameter should be formatted as ISO-8601 datetime, i.e. `2020-08-27T22:47:01.604Z`. When using Postman, curl, or a web application, it must use correct URL encoding.

2020-08-27T22:47:01.604Z

### Response Payload

#### Content Type

application/hal+json

#### Response Properties

The response payload uses the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) for embedding resources, for now the endpoint returns up to 25 affiliated agencies per page. For more details on pagination, refer to the [Pagination](#affiliated-agencies-pagination) section below.

The affiliated agencies are returned in the `affiliatedAgencies` array within the `_embedded` response property.

The `_links` property at the root level response contains a `self` URL for the actual request, and optionally `next` URLs, which navigate to the next page of results if it exist.

Each affiliated agency item (embedded resource) has the following properties:

#### Payload

Property

Type

Description

Example

affiliatedAgencies

Array of \[AffiliatedAgency\] (#affiliated-agency) objects

The collection of affiliated agencies matching the request.

#### AffiliatedAgency

Property

Type

Description

Example

agencyId

string

The unique id for the agency in REA system.

VKSYFQ

agencyName

string

The name of the agency.

Pippin & Hall Real Estate - Wycliffe Well

providerName

string

The name of the provider this agency has selected.

connectnow

updatedAt

string

The provider has been selected datetime.

2021-07-13T03:49:11.035403Z

### Pagination

The affiliated agency items (embedded resources) are paginated using the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) standard. The API returns a maximum of 25 records at a time, and is ordered by the field `updatedAt` ascending which is the time the agency selected the provider. If the query result contains more than 25 items, the first page of 25 items will be returned, and the `_links` property will contain a `self` encoded hyperlink and a `next` encoded hyperlink to navigate to the next page of results.

If there are yet more results pages, the result will again contain a `next` hyperlink to navigate to the third page of results, and so on. The pages of results will not contain a `prev` hyperlink for now.

The last page of the results will not contain a `next` hyperlink, and the results array will be empty.

So if you are using this endpoint to retrieve affiliated agencies, you should:

-   Start polling from a specific date.
-   Get the first page of results and a `next` link.
-   Poll for that `next` link for the next results.
-   Continue polling until you reach the last page of results, which you can detect by the absence of the `next` link, and empty array of results.
-   Store the last `happenedSince` or the last link you’ve used, and stop polling for a while. The polling frequency is up to you.
-   Then you poll again, use the last `happenedSince` you’ve stored, and the same overall polling logic.

See examples below.

### Poll affiliated agencies examples

#### The successful request

**Request with valid token and happenedSince:**

Terminal window

```
curl -L -X GET 'https://api.realestate.com.au/applications/v1/rental/connection-leads/agencies?happenedSince=2020-08-30T06%3A49%3A00.494279Z' \-H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a1'
```

**The response example:**

```
{  "_embedded": {    "affiliatedAgencies": [      {        "agencyId": "KKOOPV",        "agencyName": "Judd & Gibbs Agency - ERRINUNDRA",        "providerName": "Compare and Connect",        "updatedAt": "2021-07-09T08:37:25.180952Z"      },      {        "agencyId": "JELHAW",        "agencyName": "Jellis Craig & Company Pty Ltd - HAWTHORN",        "providerName": "Compare and Connect",        "updatedAt": "2021-07-13T03:49:11.035403Z"      }    ]  },  "_links": {    "self": {      "href": "/connection-leads/agencies?happenedSince=2021-07-01T06%3A49%3A00.494279Z"    },    "next": {      "href": "/connection-leads/agencies?happenedSince=2021-07-13T03%3A49%3A11.035403Z"    }  }}
```

#### The unsuccessful request

**Request with invalid authorization token**

Terminal window

```
curl -L -X GET 'http://api.realestate.com.au/applications/v1/rental/connection-leads/agencies?happenedSince=2020-08-30T06%3A49%3A00.494279Z' \-H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a2'
```

**The response example:**

```
{  "errors": [    {      "status": "401",      "meta": {        "transactionId": "57f06781-ac3a-4963-8143-a5926fc5c909"      },      "title": "Unauthorized",      "detail": "The request requires a valid authentication token"    }  ]}
```

**Request with invalid parameter `happenedSince`**

Terminal window

```
curl -L -X GET 'http://api.realestate.com.au/applications/v1/rental/connection-leads/agencies?happenedSince=2020-08-32T06%3A49%3A00.494279Z' \-H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a1'
```

**The response example:**

The response code will be `400 Bad Request`, the payload will be:

```
{  "message": "Failed to convert value of type 'java.lang.String' to required type 'java.time.OffsetDateTime'",  "transactionId": "6a29ab71-bb76-418c-9fee-c5a667e866bc",  "details": []}
```

### Try it Out

Try out this endpoint using our [API explorer](../explore/).
