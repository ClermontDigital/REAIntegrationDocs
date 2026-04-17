---
title: "Usage"
source: https://partner.realestate.com.au/tenant-selection/usage/
fetched_at: 2026-04-17T03:53:25.728Z
---

# Usage

## Poll published applications

Returns a collection of applications which belong to the agencies and published after the specific time. The response includes the details of the application, the application redirecting url, array of applicants, and details of the listing. The number of the applications will be up to 25 per page.

Please refer to [response payload](#response-payload) below for more details.

**Require the following query parameters:**

-   agencyIds(optional)
-   happenedSince

### URL

```
    GET https://api.realestate.com.au/applications/v1/rental/applications/published/feed
```

### Query Parameters

Parameter

Type

Required

Description

Example

agencyIds

array

Optional

A comma-separated list of `agency id` to query the applications which belong to them. If one of the agency is invalid, the request will be rejected and return `401`. Retrieving without the `agencyIds` parameter will return all the applications that belong to the agencies for which the current partner is authorised.

You can omit this parameter or use these two forms to indicate the agency ids in the URL: `&agencyIds=BCDEFG&agencyIds=ABCDEF` or `&agencyIds=ABCDEF,BCDEFG`.

happenedSince

date-time

Required

The endpoint will return the applications published since `happenedSince` (exclusive). This parameter should be formatted as ISO-8601 datetime, i.e. `2020-08-27T22:47:01.604Z`. When using Postman, curl, or a web application, it must use correct URL encoding.

2020-08-27T22:47:01.604Z

### Response Payload

#### Content Type

application/hal+json

#### Response Properties

The response payload uses the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) for embedding resources, for now the endpoint returns up to 25 applications per page. For more details on pagination, refer to the [Pagination](#pagination) section below.

The applications are returned in the `publishedApplications` array within the `_embedded` response property.

The `_links` property at the root level response contains a `self` URL for the actual request, and optionally `next` URLs, which navigate to the next page of results if it exist.

Each published application item (embedded resource) has the following properties:

#### Application

Property

Type

Description

Example

applicationId

string

Unique identifier representing a specific application.

3fa85f64-5717-4562-b3fc-2c963f66afa6

applicants

[Applicant](#applicant) array

A set of applicants of the application. Include primary applicant and secondary applicants.

applicationDetails

[ApplicationDetails](#applicationdetails) object

Contains the details of the application: `leaseStartDate`, `leaseTerm`, `publishedAt`, `statusLastUpdatedAt`, `applicationStatus`.

applicationDetailsUrl

string

The redirecting url to view the application details.

`https://ignite.realestate.com.au/rent-application/3fa85f64-5717-4562-b3fc-2c963f66afa6`

listingDetails

[ListingDetails](#listingdetails) object

Contains the details of the listing: [address](#listingaddress), `reaAgencyId`, `reaListingId`.

#### Applicant

Property

Type

Description

Example

applicantContactDetails

[ApplicantContactDetails](#applicantcontactdetails) object

Contains applicant email, firstname, lastname and phone number.

applicantREAId

string

Unique identifier representing a specific applicant.

acd15f64-5717-4562-b3fc-2c963f66afb2

primaryApplicant

boolean

To indicate it’s a primary applicant or not.

true

pets

[Pets](#pets) object

The number of pets an applicant has. Broken down based on cats, dogs, others

hasOrWillInspect

boolean

Whether the tenant has inspected or is going to inspect the property.

true

inspectionDate

date(ISO-8601)

The date the tenant had inspected or is planning to inspect the property.

2023-08-31

otherOccupants

integer

The number of non-lease holder occupants for application.

1

#### Pets

Property

Type

Description

Example

dogs

integer

The number of dogs an applicant has.

2

cats

integer

The number of cats an applicant has.

1

others

integer

The number of other pets an applicant has.

0

#### ApplicationDetails

Property

Type

Description

Example

leaseTerm

integer

The lease term submitted by the applicant.

12

leaseStartDate

date

The date submitted by the applicant when he/she want to move in.

2020-10-01

publishedAt

date-time(ISO-8601)

The application published time.

2020-08-18T02:22:56.228549Z

statusLastUpdatedAt

date-time(ISO-8601)

The application last updated time.

2020-08-19T02:22:56.228549Z

applicationStatus

string

The application status.  
For [poll published applications](#poll-published-applications): PUBLISHED/VIEWED/SUCCESSFUL/UNSUCCESSFUL/ WITHDRAWN  
For [poll updated applications](#poll-updated-applications): SUCCESSFUL/UNSUCCESSFUL

SUCCESSFUL

isShortlisted

boolean

Flag that indicates whether an application is shortlisted or not.

True

rentOfferAmount

integer

The amount of rent the consumer has indicated they’re willing to pay weekly.

350

#### ListingDetails

Property

Type

Description

Example

address

[Address](#listingaddress) object

Listing address.

reaAgencyId

string

Unique identifier representing the listing agency.

ABCDEF

reaListingId

string

Unique identifier representing the property.

426500698

#### ListingAddress

Property

Type

Description

Example

postCode

string

The post code of the listing.

0862

state

string

The state of the listing.

NT

streetAddress

string

The street address of the listing.

10 Victory Street

suburb

string

The suburb of the listing.

Wycliffe Well

#### ApplicantContactDetails

Property

Type

Description

Example

email

string

Applicant’s email. The email can be null if they use Apple social sign-in.

[applicant@realestate.com](mailto:applicant@realestate.com)

firstName

string

Applicant’s firstname.

Joe

lastName

string

Applicant’s lastname.

Mack

phoneNumber

string

Applicant’s phone number.

0400000000

### Pagination

The Published Application items (embedded resources) are paginated using the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) standard. The API returns a maximum of 25 records at a time, and is ordered by the field `publishedAt` ascending which is the published time of the application. If the query result contains more than 25 items, the first page of 25 items will be returned, and the `_links` property will contain a `self` encoded hyperlink and a `next` encoded hyperlink to navigate to the next page of results.

If there are yet more results pages, the result will again contain a `next` hyperlink to navigate to the third page of results, and so on. The pages of results will not contain a `prev` hyperlink for now.

The last page of the results will not contain a `next` hyperlink, and the results array will be empty.

So if you are using this endpoint to retrieve applications, you should:

-   Start polling from a specific date.
-   Get the first page of results and a `next` link.
-   Poll for that `next` link for the next results.
-   Continue polling until you reach the last page of results, which you can detect by the absence of the `next` link, and empty array of results.
-   Store the last `happenedSince` or the last link you’ve used, and stop polling for a while. The polling frequency is up to you.
-   Then you poll again, use the last `happenedSince` you’ve stored, and the same overall polling logic.

See examples below.

### Poll published applications examples

#### The successful request

**Request with valid token and agencyIds and happenedSince.**

Terminal window

```
    curl -L -X GET 'https://api.realestate.com.au/applications/v1/rental/applications/published/feed?happenedSince=2020-08-30T06%3A49%3A00.494279Z&agencyIds=XNWELF' \    -H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a1'
```

**The response example:**

```
{  "_embedded": {    "publishedApplications": [      {        "applicationId": "33a4d898-0e36-4fe6-9fa4-8fc31bded6f1",        "applicationDetailsUrl": "https://ignite.realestate.com.au/rent-application/33a4d898-0e36-4fe6-9fa4-8fc31bded6f1",        "applicationDetails": {          "leaseTerm": 18,          "leaseStartDate": "2020-08-31",          "publishedAt": "2020-08-31T05:26:00.432202Z",          "statusLastUpdatedAt": "2020-08-31T05:26:00.432202Z",          "applicationStatus": "PUBLISHED",          "isShortlisted": true,          "rentOfferAmount": 350        },        "listingDetails": {          "reaListingId": "429049786",          "reaAgencyId": "XNWELF",          "address": {            "streetAddress": "101 Rental Test St",            "suburb": "Wycliffe Well",            "postCode": "0862",            "state": "NT"          }        },        "applicants": [          {            "applicantREAId": "df488a85-e8b2-4967-8e28-d4c4bc3798e4",            "applicantContactDetails": {              "firstName": "user009",              "lastName": "test",              "email": "rent_data_staging_e2e_test_user009@mailinator.com",              "phoneNumber": "423576546476"            },            "primaryApplicant": true,            "pets": {              "dogs": 1,              "cats": 1,              "others": 0            },            "hasOrWillInspect": true,            "inspectionDate": "2023-08-31",            "otherOccupants": 0          }        ]      }    ]  },  "_links": {    "self": {      "href": "/applications/published/feed?happenedSince=2020-08-30T06%3A49%3A00.494279Z&agencyIds=XNWELF"    },    "next": {      "href": "/applications/published/feed?happenedSince=2020-08-31T05%3A41%3A53.677777Z&agencyIds=XNWELF"    }  }}
```

**Request omitting the agencyIds.**

Terminal window

```
    curl -L -X GET 'https://api.realestate.com.au/applications/v1/rental/applications/published/feed?happenedSince=2020-08-30T06%3A49%3A00.494279Z' \    -H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a1'
```

**The response example:**

```
{  "_embedded": {    "publishedApplications": [      {        "applicationId": "33a4d898-0e36-4fe6-9fa4-8fc31bded6f1",        "applicationDetailsUrl": "https://ignite.realestate.com.au/rent-application/33a4d898-0e36-4fe6-9fa4-8fc31bded6f1",        "applicationDetails": {          "leaseTerm": 18,          "leaseStartDate": "2020-08-31",          "publishedAt": "2020-08-31T05:26:00.432202Z",          "statusLastUpdatedAt": "2020-08-31T05:26:00.432202Z",          "applicationStatus": "PUBLISHED",          "isShortlisted": true,          "rentOfferAmount": 350        },        "listingDetails": {          "reaListingId": "429049786",          "reaAgencyId": "XNWELF",          "address": {            "streetAddress": "101 Rental Test St",            "suburb": "Wycliffe Well",            "postCode": "0862",            "state": "NT"          }        },        "applicants": [          {            "applicantREAId": "df488a85-e8b2-4967-8e28-d4c4bc3798e4",            "applicantContactDetails": {              "firstName": "user009",              "lastName": "test",              "email": "rent_data_staging_e2e_test_user009@mailinator.com",              "phoneNumber": "423576546476"            },            "primaryApplicant": true,            "pets": {              "dogs": 1,              "cats": 1,              "others": 0            },            "hasOrWillInspect": true,            "inspectionDate": "2023-08-31",            "otherOccupants": 0          }        ]      }    ]  },  "_links": {    "self": {      "href": "/applications/published/feed?happenedSince=2020-08-30T06%3A49%3A00.494279Z"    },    "next": {      "href": "/applications/published/feed?happenedSince=2020-08-31T05%3A41%3A53.677777Z"    }  }}
```

#### The unsuccessful request

**Request with invalid authorization token**

Terminal window

```
    curl -L -X GET 'http://api.realestate.com.au/applications/v1/rental/applications/published/feed?happenedSince=2020-08-30T06%3A49%3A00.494279Z&agencyIds=XNWELF' \    -H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a2'
```

**The response example:**

```
{  "errors": [    {      "status": "401",      "meta": {        "transactionId": "57f06781-ac3a-4963-8143-a5926fc5c909"      },      "title": "Unauthorized",      "detail": "The request requires a valid authentication token"    }  ]}
```

**Request with invalid agency id**

Terminal window

```
    curl -L -X GET 'http://api.realestate.com.au/applications/v1/rental/applications/published/feed?happenedSince=2020-08-30T06%3A49%3A00.494279Z&agencyIds=XNWELF,INVALID' \    -H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a1'
```

**The response will be** The response code will be `401 Unauthorized`, and the response payload will be a string: `Unauthorized`.

**Request with invalid parameter `happenedSince`**

Terminal window

```
    curl -L -X GET 'http://api.realestate.com.au/applications/v1/rental/applications/published/feed?happenedSince=2020-08-32T06%3A49%3A00.494279Z&agencyIds=XNWELF' \    -H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a1'
```

**The response example:**

The response code will be `400 Bad Request`, the payload will be:

```
{  "message": "Failed to convert value of type 'java.lang.String' to required type 'java.time.OffsetDateTime'",  "transactionId": "6a29ab71-bb76-418c-9fee-c5a667e866bc",  "details": []}
```

### Try it Out

Try out this endpoint using our [API explorer](../explore/).

## Poll updated applications

Returns a collection of applications which belong to the agencies and been updated to SUCCESSFUL/UNSUCCESSFUL status at a specific time. The response includes the details of the application, the application redirecting url, array of applicants, and details of the listing. The number of the applications will be up to 25 per page.

Please refer to [response payload](#response-payload-1) below for more details.

**Require the following query parameters:**

-   agencyIds(optional)
-   happenedSince

### URL

```
    GET https://api.realestate.com.au/applications/v1/rental/applications/updated/feed
```

### Query Parameters

Parameter

Type

Required

Description

Example

agencyIds

array

Optional

A comma-separated list of `agency id` to query the applications which belong to them. If one of the agency is invalid, the request will be rejected and return `401`. Retrieving without the `agencyIds` parameter will return all the applications that belong to the agencies for which the current partner is authorised.

You can omit this parameter or use these two forms to indicate the agency ids in the URL: `&agencyIds=BCDEFG&agencyIds=ABCDEF` or `&agencyIds=ABCDEF,BCDEFG`.

happenedSince

date-time

Required

The endpoint will return the applications last updated since `happenedSince` (exclusive). This parameter should be formatted as ISO-8601 datetime, i.e. `2020-08-28T22:47:01.604Z`. When using Postman, curl, or a web application, it must use correct URL encoding.

2020-08-28T22%3A47%3A01.604Z

### Response Payload

#### Content Type

application/hal+json

#### Response Properties

The response payload uses the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) for embedding resources, for now the endpoint returns up to 25 applications per page. For more details on pagination, refer to the [Pagination](#pagination-1) section below.

The applications are returned in the `updatedApplications` array within the `_embedded` response property.

The `_links` property at the root level response contains a `self` URL for the actual request, and optionally `next` URLs, which navigate to the next page of results if it exist.

See [examples](#poll-updated-applications-examples).

Each updated application item (embedded resource) has the same properties with poll published applications api. Reference [here](#application).

### Pagination

The Updated Application items (embedded resources) are paginated using the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) standard. The API returns a maximum of 25 records at a time, and is ordered by the field `statusLastUpdatedAt` ascending which is the last updated time of the application. If the query result contains more than 25 items, the first page of 25 items will be returned, and the `_links` property will contain a `self` encoded hyperlink and a `next` encoded hyperlink to navigate to the next page of results.

If there are yet more results pages, the result will again contain a `next` hyperlink to navigate to the third page of results, and so on. The pages of results will not contain a `prev` hyperlink for now.

The last page of the results will not contain a `next` hyperlink, and the results array will be empty.

So if you are using this endpoint to retrieve applications, you should:

-   Start polling from a specific date.
-   Get the first page of results and a `next` link.
-   Poll for that `next` link for the next results.
-   Continue polling until you reach the last page of results, which you can detect by the absence of the `next` link, and empty array of results.
-   Store the last `happenedSince` or the last link you’ve used, and stop polling for a while. The polling frequency is up to you.
-   Then you poll again, use the last `happenedSince` you’ve stored, and the same overall polling logic.

See examples below.

### Poll updated applications examples

#### The successful request

**Request with valid token and agencyIds and happenedSince.**

Terminal window

```
    curl -L -X GET 'https://api.realestate.com.au/applications/v1/rental/applications/updated/feed?happenedSince=2020-08-30T06%3A49%3A00.494279Z&agencyIds=XNWELF' \    -H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a1'
```

**The response example:**

```
{  "_embedded": {    "publishedApplications": [      {        "applicationId": "33a4d898-0e36-4fe6-9fa4-8fc31bded6f1",        "applicationDetailsUrl": "https://ignite.realestate.com.au/rent-application/33a4d898-0e36-4fe6-9fa4-8fc31bded6f1",        "applicationDetails": {          "leaseTerm": 18,          "leaseStartDate": "2020-08-31",          "publishedAt": "2020-08-31T05:26:00.432202Z",          "statusLastUpdatedAt": "2020-08-31T05:26:00.432202Z",          "applicationStatus": "UNSUCCESSFUL",          "isShortlisted": true,          "rentOfferAmount": 350        },        "listingDetails": {          "reaListingId": "429049786",          "reaAgencyId": "XNWELF",          "address": {            "streetAddress": "101 Rental Test St",            "suburb": "Wycliffe Well",            "postCode": "0862",            "state": "NT"          }        },        "applicants": [          {            "applicantREAId": "df488a85-e8b2-4967-8e28-d4c4bc3798e4",            "applicantContactDetails": {              "firstName": "user009",              "lastName": "test",              "email": "rent_data_staging_e2e_test_user009@mailinator.com",              "phoneNumber": "423576546476"            },            "primaryApplicant": true          }        ]      }    ]  },  "_links": {    "self": {      "href": "/applications/updated/feed?happenedSince=2020-08-30T06%3A49%3A00.494279Z&agencyIds=XNWELF"    },    "next": {      "href": "/applications/updated/feed?happenedSince=2020-08-31T05%3A41%3A53.677777Z&agencyIds=XNWELF"    }  }}
```

**Request omitting the agencyIds.**

Terminal window

```
    curl -L -X GET 'https://api.realestate.com.au/applications/v1/rental/applications/updated/feed?happenedSince=2020-08-30T06%3A49%3A00.494279Z' \    -H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a1'
```

**The response example:**

```
{  "_embedded": {    "updatedApplications": [      {        "applicationId": "33a4d898-0e36-4fe6-9fa4-8fc31bded6f1",        "applicationDetailsUrl": "https://ignite.realestate.com.au/rent-application/33a4d898-0e36-4fe6-9fa4-8fc31bded6f1",        "applicationDetails": {          "leaseTerm": 18,          "leaseStartDate": "2020-08-31",          "publishedAt": "2020-08-31T05:26:00.432202Z",          "statusLastUpdatedAt": "2020-08-31T05:26:00.432202Z",          "applicationStatus": "UNSUCCESSFUL",          "isShortlisted": true,          "rentOfferAmount": 350        },        "listingDetails": {          "reaListingId": "429049786",          "reaAgencyId": "XNWELF",          "address": {            "streetAddress": "101 Rental Test St",            "suburb": "Wycliffe Well",            "postCode": "0862",            "state": "NT"          }        },        "applicants": [          {            "applicantREAId": "df488a85-e8b2-4967-8e28-d4c4bc3798e4",            "applicantContactDetails": {              "firstName": "user009",              "lastName": "test",              "email": "rent_data_staging_e2e_test_user009@mailinator.com",              "phoneNumber": "423576546476"            },            "primaryApplicant": true          }        ]      }    ]  },  "_links": {    "self": {      "href": "/applications/updated/feed?happenedSince=2020-08-30T06%3A49%3A00.494279Z"    },    "next": {      "href": "/applications/updated/feed?happenedSince=2020-08-31T05%3A41%3A53.677777Z"    }  }}
```

#### The unsuccessful request

**Request with invalid authorization token**

Terminal window

```
    curl -L -X GET 'http://api.realestate.com.au/applications/v1/rental/applications/updated/feed?happenedSince=2020-08-30T06%3A49%3A00.494279Z&agencyIds=XNWELF' \    -H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a2'
```

**The response example:**

```
{  "errors": [    {      "status": "401",      "meta": {        "transactionId": "57f06781-ac3a-4963-8143-a5926fc5c909"      },      "title": "Unauthorized",      "detail": "The request requires a valid authentication token"    }  ]}
```

**Request with invalid agency id**

Terminal window

```
    curl -L -X GET 'http://api.realestate.com.au/applications/v1/rental/applications/updated/feed?happenedSince=2020-08-30T06%3A49%3A00.494279Z&agencyIds=XNWELF,INVALID' \    -H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a1'
```

**The response will be** The response code will be `401 Unauthorized`, and the response payload will be a string: `Unauthorized`.

**Request with invalid parameter `happenedSince`**

Terminal window

```
    curl -L -X GET 'http://api.realestate.com.au/applications/v1/rental/applications/updated/feed?happenedSince=2020-08-32T06%3A49%3A00.494279Z&agencyIds=XNWELF' \    -H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a1'
```

**The response example:**

The response code will be `400 Bad Request`, the payload will be:

```
{  "message": "Failed to convert value of type 'java.lang.String' to required type 'java.time.OffsetDateTime'",  "transactionId": "6a29ab71-bb76-418c-9fee-c5a667e866bc",  "details": []}
```

### Try it Out

Try out this endpoint using our [API explorer](../explore/).

## Update application status

Allow authorized request to update the application’s `status` and `statusLastUpdatedAt`.

### URL

```
    PUT http://api.realestate.com.au/applications/v1/rental/applications/{applicationId}/status
```

### Path variable / Request body

#### Path variable

name

Type

Required

Description

Example

`applicationId`

UUID

required

To specific which application you want to update. The field `applicationId` can be retrieved from the corresponding field in each application in the results of the first endpoint.

3fa85f64-5717-4562-b3fc-2c963f66afa6

#### Request Content Type

application/json

#### Request Payload

The request payload [UpdateApplicationStatusRequest](#updateapplicationstatusrequest) requires three fields: `fromStatus`, `toStatus`, and `statusLastUpdatedAt`, to update the specific application.

##### UpdateApplicationStatusRequest

Property

Type

Description

Example

fromStatus

enum see [rules](#status-rules)

The previous application status, allows `PUBLISHED/SUCCESSFUL/UNSUCCESSFUL/WITHDRAWN`

PUBLISHED

toStatus

enum see [rules](#status-rules)

The new application status, allows `SUCCESSFUL/UNSUCCESSFUL/WITHDRAWN`

SUCCESSFUL

statusLastUpdatedAt

date-time(ISO-8601)

Past or present offset date time to update application status.

2020-08-30T06:49:00.494279Z

##### Status rules

The status has the following rules to make sure you are updating it to a valid status:

FROM -> TO

SUCCESSFUL

UNSUCCESSFUL

WITHDRAWN

PUBLISHED

✅

✅

✅

SUCCESSFUL

✅

✅

❌

UNSUCCESSFUL

✅

✅

❌

WITHDRAWN

❌

❌

✅

If the status is the same with the current, it means you just update the `statusLastUpdatedAt`, and it should be a past or present time.

When updating an application to SUCCESSFUL, the existing SUCCESSFUL application on the same listing will be updated to UNSUCCESSFUL automatically.

### Update application status examples

#### The successful request

**Request with valid applicationId and request payload:**

Terminal window

```
    curl -v -L -X PUT 'https://api.realestate.com.au/applications/v1/rental/applications/33a4d898-0e36-4fe6-9fa4-8fc31bded6f1/status' \    -H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a1' \    -H 'Content-Type: application/json' \    --data '{        "fromStatus": "PUBLISHED",        "toStatus": "SUCCESSFUL",        "statusLastUpdatedAt":"2020-08-30T06:49:00.494279Z"    }'
```

**Response will be 204 No Content**

#### The unsuccessful request

**Request with invalid authorization token:**

Terminal window

```
    curl -v -L -X PUT 'https://api.realestate.com.au/applications/v1/rental/applications/33a4d898-0e36-4fe6-9fa4-8fc31bded6f1/status' \    -H 'Authorization: Bearer invalid-token' \    -H 'Content-Type: application/json' \    --data '{        "fromStatus": "PUBLISHED",        "toStatus": "SUCCESSFUL",        "statusLastUpdatedAt":"2020-08-30T06:49:00.494279Z"    }'
```

**Response will be 401 Unauthorized:**

```
{  "errors": [    {      "status": "401",      "meta": {        "transactionId": "eb4bf813-d0c0-4769-9f80-612c9fcc9231"      },      "title": "Unauthorized",      "detail": "The request requires a valid authentication token"    }  ]}
```

**Request with non-exist application id:**

Terminal window

```
    curl -v -L -X PUT 'https://api.realestate.com.au/applications/v1/rental/applications/19e68018-0f5e-4fe1-b8f0-02f66de50631/status' \    -H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a1' \    -H 'Content-Type: application/json' \    --data '{        "fromStatus": "PUBLISHED",        "toStatus": "SUCCESSFUL",        "statusLastUpdatedAt":"2020-08-30T06:49:00.494279Z"    }'
```

**Response will be 401 Unauthorized:** Response payload is `Unauthorized`.

**Request with invalid status in request body:**

Update status from `SUCCESSFUL` to `PUBLISHED`:

Terminal window

```
    curl -v -L -X PUT 'https://api.realestate.com.au/applications/v1/rental/applications/19e68018-0f5e-4fe1-b8f0-02f66de50631/status' \    -H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a1' \    -H 'Content-Type: application/json' \    --data '{        "fromStatus": "SUCCESSFUL",        "toStatus": "PUBLISHED",        "statusLastUpdatedAt":"2020-08-30T06:49:00.494279Z"    }'
```

**Response will be 400 Bad Request:**

```
{  "message": "Could not update status from SUCCESSFUL to PUBLISHED!",  "transactionId": "235fee92-91ba-4271-85eb-632006eb2c11",  "details": []}
```

**Request with fromStatus that does not match current application status in request body:**

Update status from `PUBLISHED` to `SUCCESSFUL`, but it was already changed by someone else to `UNSUCCESSFUL`:

Terminal window

```
    curl -v -L -X PUT 'https://api.realestate.com.au/applications/v1/rental/applications/19e68018-0f5e-4fe1-b8f0-02f66de50631/status' \    -H 'Authorization: Bearer f2ed8d04-7eb2-428c-9eda-b9226b6a67a1' \    -H 'Content-Type: application/json' \    --data '{        "fromStatus": "PUBLISHED",        "toStatus": "SUCCESSFUL",        "statusLastUpdatedAt":"2020-08-30T06:49:00.494279Z"    }'
```

**Response will be 409 Conflict:**

```
{  "message": "Status PUBLISHED not match the current status: UNSUCCESSFUL!",  "transactionId": "94a4e3df-67fe-40e9-9683-446344b7ce20",  "details": []}
```

### Try it Out

Try out this endpoint using our [API explorer](./explore.md).
