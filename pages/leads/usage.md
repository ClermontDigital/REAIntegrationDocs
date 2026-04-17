---
title: "Usage"
source: https://partner.realestate.com.au/leads/usage/
fetched_at: 2026-04-17T03:52:24.580Z
---

# Usage

## Get Enquiries submitted to your Customers

**Returns all the enquiries submitted to the agents you represent `since` a given date and time.**

Returns a collection representing all the enquiry records submitted to customers for which you have access. This end-point should be consumed on a regular basis (every few minutes) to ensure timely retrieval and processing of enquiries. The enquiry includes all of the details submitted by the consumer as well the related listing and enquirer contact information.

Real-time notifications

For real-time enquiry notifications, use the [Webhooks API](../webhooks/overview.md) to subscribe to `EnquiryCreated` events. This eliminates the need for polling and reduces latency in your lead processing workflow.

Supports the following query parameters:

-   since
-   page
-   agency\_id
-   agent\_profile\_id
-   listing\_ids
-   exclude\_types

### Pagination

Every response payload with an enquiry will have a `next` link associated with it to act as a pointer to the next page that needs to be requested. If the `next` link on a page is `null` that indicates that all the enquiries have been consumed and there are no more enquiries available. It is recommended to visit the same page again in a few minutes for new enquiries.

When retrieving enquiries for the first time it is recommended to use the `since` parameter. Follow the `next` page links until all the available enquiries have been read. It is recommended to record the last page you were at. For subsequent requests to retrieve the new enquiries received since your last request, navigate to the `next` page link that was recorded previously.

The maximum number of enquiries on a single page is 100.

### URL

```
GET https://api.realestate.com.au/lead/v1/enquiries
```

### Query Parameters

Parameter

Type

Required

Description

Example

since

string

Required(\*)

An ISO-8601 timestamp (UTC) representing the point in time to begin consuming enquiries from.

2010-09-06T12:27:00.1Z

page

string

Required(\*)

Unique identifier representing the page

MzUyNS\_GweUEfVVZrpxOb1-nTDkkdjEvNjU=

agency\_id

string

String representing a specific agency id.

ABCDEF

agent\_profile\_id

string

String representing a specific salesperson id.

123

listing\_ids

string

String of comma separated listing ids for an enquiry.

1, 2, 3

exclude\_types

string

String of comma separated enquiry types to be excluded from the results

REALESTATE\_COM\_AU\_RENTAL\_APPRAISAL\_REQUEST, REALESTATE\_COM\_AU\_AGENCY\_SALES\_APPRAISAL\_REQUEST

**Required(\*):** Either since or page is required.

### Response Payload

#### Content Type

`application/hal+json`

#### Response Properties

The response payload uses the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) for embedding resources and API links. The enquiry resources are returned in the `enquiry` array within the `_embedded` response property. The `_links` properties contain the `self` URL of the current page, as well as the `next` URL for the following page.

Each enquiry resource (item) has the following properties:

#### Payload

Property

Type

Description

Example

enquiries

Array of \[Enquiry\] (#enquiry) objects

The collection of enquiries matching the request.

#### Enquiry

Property

Type

Description

Example

id

string

Unique identifier for the enquiry

”2bb121ad-2849-4b20-bc40-19e4ae371b7e”

agencyId

string

Unique identifier representing the listing agency

”ABCDEF”

receivedAt

string (date-time)

Date/Time that the enquiry was received by REA Group.

”2017-07-24T10:58:32.000Z”

processedAt

string (date-time)

Date/Time that the enquiry was processed by REA Group.

”2017-07-26T03:21:25.090Z”

type

enum  
  
\- DEVELOPER\_PROJECT  
\- DEVELOPER\_PROJECT\_DOCUMENT\_DOWNLOAD  
\- DEVELOPER\_BUILDER\_GENERAL  
\- DEVELOPER\_BUILDER\_INFORMATION\_PACK  
\- DEVELOPER\_BUILDER\_DESIGN  
\- DEVELOPER\_BUILDER\_PROMOTION  
\- DEVELOPER\_BUILDER\_DISPLAY\_VISIT  
\- DEVELOPER\_INSPECTION\_REGISTRATION  
\- DEVELOPER\_EXTENSION\_CAMPAIGN  
\- REALESTATE\_COM\_AU\_AGENT  
\- REALESTATE\_COM\_AU\_AGENCY  
\- REALESTATE\_COM\_AU\_LISTING  
\- REALESTATE\_COM\_AU\_LEAD\_AD  
\- REALESTATE\_COM\_AU\_SALES\_APPRAISAL\_REQUEST  
\- REALESTATE\_COM\_AU\_RENTAL\_APPRAISAL\_REQUEST  
\- REALESTATE\_COM\_AU\_AGENCY\_SALES\_APPRAISAL\_REQUEST  
\- REALESTATE\_COM\_AU\_AGENCY\_RENTAL\_APPRAISAL\_REQUEST  
\- REALESTATE\_COM\_AU\_RENT  
\- REALCOMMERCIAL\_COM\_AU\_BUY  
\- REALCOMMERCIAL\_COM\_AU\_FIND\_AGENCY  
\- REALCOMMERCIAL\_COM\_AU\_LEASE  
\- REALCOMMERCIAL\_COM\_AU\_BUY\_AND\_LEASE  
\- OTHER

The type of enquiry that was captured.

”REALESTATE\_COM\_AU\_LISTING”

comments

string

The enquirer’s free-form comments.

”Hi there I’m interested in getting some more information on the property…“

requestedInformation

< string > array

A list of information the enquirer is asking for.

”Find out the length of the lease”

agentRecipients

< string > array

A list of recipients for this enquiry.

”[agent@example.com](mailto:agent@example.com)”

suppliedMarketStatus

string

The enquirer’s description of their market status.

”Monitoring the market”

listing

[Listing](#listing) object

The listing related to this enquiry.

contactDetails

[ContactDetails](#contact_details) object

The contact details for the person enquiring.

source

[Source](#source) object

The campaign source information of the lead.

externalIdentifiers

[ExternalIdentifiers](#external_identifiers) object

Identifiers set by CRM / customer during product setup.

customAttributes

[CustomAttributes](#custom_attributes) object

A set of custom question and its answer related to this enquiry from consumer.

#### Listing

Property

Type

Description

Example

id

string

Unique identifier representing a specific listing.

”100012345”

externalListingId

string

The partner’s identifier for the listing. This will be deprecated, please use `external_identifiers.externalListingId` instead.

”PARTNER\_12345”

parentId

string

The parent listing’s identifier in the case of a child project listing.

”600012345”

address

string

The address of the listed property.

”1 Test Street, Melbourne, Vic 3000”

#### ContactDetails

Property

Type

Description

Example

fullName

string

The enquirer’s full name.

”Sarah Smith”

email

string

The enquirer’s supplied email address.

”[sarah@example.com](mailto:sarah@example.com)”

phone

string

The enquirer’s supplied phone number.

”0401234567”

postcode

string

The enquirer’s supplied postcode.

”4020”

preferredContactMethod

enum (PHONE, EMAIL)

The enquirer’s preferred contact method.

”PHONE”

#### Source

`id`, `name` and `type` can be null.

For `DEVELOPER_EXTENSION_CAMPAIGN` enquiries, `id` can be a campaign id; `name` can be a campaign name; `type` can be `LEAD_CAPTURE_PAGE`, `SPONSORED_CONTENT` or `NATIVE_LEAD_AD_WITH_FORM`.

For `DEVELOPER_INSPECTION_REGISTRATION` enquiries, `id` can be a project or listing id; `name` can be `PROJECT_DETAIL_PAGE`, `CHILD_LISTING_DETAIL_PAGE` or `LISTING_DETAIL_PAGE`; `type` can be `DISPLAY_SUITE_INSPECTION`, `SALES_OFFICE_INSPECTION` or `PROPERTY_INSPECTION`.

Property

Type

Description

Example

id

string

The id of the enquiry source

”019aaf7c-91f5-49f4-b30c-afe0cc71603a”

name

string

The name of the enquiry source

”My campaign”

type

string

Type of the enquiry source

”SPONSORED\_CONTENT”

#### ExternalIdentifiers

Property

Type

Description

Example

externalProjectId

string

External project identifier setup by CRM / customer.

”PROJECT\_XYZ”

externalListingId

string

The partner’s identifier for the listing. This is used to replace the old `listing.externalListingId` field

”PARTNER\_12345”

#### CustomAttributes

This field contains key value string pairs that varies depending on the product. The keys will be set by customers and the values will be filled in by consumers. The whole object field `custom_attributes` returns null, if the product doesn’t support it.

| Property | Type | Description | Example | | ------------------- | ------ | ---------------------------------------------------------------------------------------- | ------- | ------ | ------ | | “I’m interested in” | string | A key value string pair, where the key is a custom question, and the value is its answer | “1 bed | 1 bath | 1 car” |

### Interpreting 200 OK Responses with Empty Arrays

When querying the Leads API, a `200 OK` response with an empty `enquiries` array can mean either:

-   There are genuinely no enquiries matching your filters (e.g., date range, `agency_id`), **or**
-   Your integration is not authorised to access enquiries for the specified agency (for example, missing delegation or scope).

**Important:** The API does not return a `403 Forbidden` in this case. If you expect enquiries but receive an empty array, check:

-   The `agency_id` is correct and matches the agency your integration is authorised for.
-   Your client has the required scope **`lead:enquiries:read`**, and the agency has delegated access to your integration in Ignite.
-   There have been no recent changes to permissions or agency associations (for example, removing/re‑adding an integration or changing which agencies it can access).

#### Verifying permissions with the Integrations API

The Integrations API will allow you to check which agencies have authorised your account to request leads. View the documentation [here](../integrations/usage.md)

### Example Request

Terminal window

```
$ curl -H "Accept: application/json" -H "Authorization: Bearer <token returned by OAuth service>" "https://api.realestate.com.au/lead/v1/enquiries?since=2017-08-08T12:27:00.1Z"
```

### Example Responses

#### 200 (Success)

A set of enquiries requested - by default leads for all agencies you have permission on will be retrieved.

```
{  "_embedded": {    "enquiries": [      {        "id": "80erpo30-2e24-4bea-842c-9df71f90brtl",        "agencyId": "ABCDEF",        "receivedAt": "2017-07-24T10:58:32.000Z",        "processedAt": "2017-07-26T03:21:25.090Z",        "type": "REALESTATECOMAULISTING",        "comments": "Hi there I'm interested in getting some more information on the property...",        "requestedInformation": [],        "agentRecipients": ["agent@example.com"],        "suppliedMarketStatus": null,        "listing": {          "id": "100012345",          "externalListingId": "PARTNER_12345",          "parentId": null        },        "contactDetails": {          "fullName": "Sarah Smith",          "email": "sarah@example.com",          "phone": "0401234567",          "postcode": "4020",          "preferredContactMethod": "PHONE"        },        "source": {          "id": null,          "name": null,          "type": null        },        "externalIdentifiers": {          "externalProjectId": null,          "externalListingId": null        },        "customAttributes": null,        "_links": {          "self": {            "href": "https://api.realestate.com.au/lead/v1/enquiries/80erpo30-2e24-4bea-842c-9df71f90brtl"          }        }      }    ]  },  "_links": {    "self": {      "href": "https://api.realestate.com.au/lead/v1/enquiries?since=2010-09-06T12:27:00.1Z"    },    "next": {      "href": "https://api.realestate.com.au/lead/v1/enquiries?page=NDE4NC_xRdy3eH4yc1i-T5D_ZRu9djEvNDE="    }  }}
```

#### 400 (Bad Request)

The request is missing required fields or is malformed.

```
{  "errors": [    {      "status": "400",      "title": "Bad Request",      "detail": "The request is missing required fields or is malformed",      "meta": {        "transactionId": "b0959f3f-0aaa-4cb2-a568-ae320830e8bc"      }    }  ]}
```

#### 401 (Unauthorized)

The authentication token is invalid or has expired.

```
{  "errors": [    {      "status": "401",      "title": "Unauthorized",      "detail": "The request requires a valid authentication token",      "meta": {        "transactionId": "af6dba36-eb9f-40ee-94ca-7abc22fa4661"      }    }  ]}
```

#### 403 (Forbidden)

Access to the requested resources is forbidden for the scope assigned.

```
{  "errors": [    {      "status": "403",      "title": "Forbidden",      "detail": "Access to the requested resource is forbidden",      "meta": {        "transactionId": "ce596d98-896f-4846-8a90-0ca1ad09ebb2"      }    }  ]}
```

### Try it Out

Try out this endpoint using our [API explorer](../explore/).

## Get Enquiry by Enquiry ID

**Get a single enquiry by enquiry ID.**

The enquiry by enquiry ID endpoint returns a single enquiry for an agent. The response is the single enquiry that matches the supplied enquiry ID. The enquiry includes all of the details submitted by the consumer as well the related listing and enquirer contact information.

### URL

```
GET https://api.realestate.com.au/lead/v1/enquiries/<enquiry_id>
```

### Path Parameters

Name

Type

Required

Description

Example

enquiry\_id

string

Required

The unique ID for the enquiry

a1234b56-1654-4528-837b-3e4261736f08

### Response Payload

#### Content Type

`application/hal+json`

#### Response Properties

The response payload uses the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) for embedding resources and API links. Single enquiry resources are returned as a root level response object, with the `_links` property containing the `self` URL of the enquiry resource, which in this case is the same as the requested URL.

The enquiry resource itself has the following properties:

#### Payload

Property

Type

Description

Example

id

string

Unique identifier for the enquiry

”2bb121ad-2849-4b20-bc40-19e4ae371b7e”

agencyId

string

Unique identifier representing the listing agency

”ABCDEF”

receivedAt

string (date-time)

Date/Time that the enquiry was received by REA Group.

”2017-07-24T10:58:32.000Z”

processedAt

string (date-time)

Date/Time that the enquiry was processed by REA Group.

”2017-07-26T03:21:25.090Z”

type

enum (DEVELOPERPROJECT, REALESTATECOMAUAGENCY, REALESTATECOMAUAGENT, REALESTATECOMAULISTING, DEVELOPERBUILDERINFORMATIONPACK, DEVELOPERBUILDERGENERAL, DEVELOPERBUILDERDESIGN, DEVELOPERBUILDERPROMOTION, DEVELOPERBUILDERDISPLAYVISIT, DEVELOPERINSPECTIONREGISTRATION, DEVELOPEREXTENSIONCAMPAIGN, REALESTATECOMAURENT, REALCOMMERCIALCOMAUBUY, REALCOMMERCIALCOMAUFINDAGENCY)

The type of enquiry that was captured.

”REALESTATECOMAULISTING”

comments

string

The enquirer’s free-form comments.

”Hi there I’m interested in getting some more information on the property…“

requestedInformation

< string > array

A list of information the enquirer is asking for.

”Find out the length of the lease”

agentRecipients

< string > array

A list of recipients for this enquiry.

”[agent@example.com](mailto:agent@example.com)”

suppliedMarketStatus

string

The enquirer’s description of their market status.

”Monitoring the market”

listing

[Listing](#listing2) object

The listing related to this enquiry.

contactDetails

[ContactDetails](#contact_details2) object

The contact details for the person enquiring.

source

[Source](#source2) object

The campaign source information of the lead.

externalIdentifiers

[ExternalIdentifiers](#external_identifiers2) object

Identifiers set by CRM / customer during product setup.

customAttributes

[CustomAttributes](#custom_attributes2) object

A set of custom question and its answer related to this enquiry from consumer.

#### Listing

Property

Type

Description

Example

id

string

Unique identifier representing a specific listing.

”100012345”

externalListingId

string

The partner’s identifier for the listing. This will be deprecated, please use `external_identifiers.externalListingId` instead.

”PARTNER\_12345”

parentId

string

The parent listing’s identifier in the case of a child project listing.

”600012345”

#### ContactDetails

Property

Type

Description

Example

fullName

string

The enquirer’s full name.

”Sarah Smith”

email

string

The enquirer’s supplied email address.

”[sarah@example.com](mailto:sarah@example.com)”

phone

string

The enquirer’s supplied phone number.

”0401234567”

preferredContactMethod

enum (PHONE, EMAIL)

The enquirer’s preferred contact method.

”PHONE”

#### Source

`id`, `name` and `type` can be null.

For `DEVELOPER_EXTENSION_CAMPAIGN` enquiries, `id` can be a campaign id; `name` can be a campaign name; `type` can be `LEAD_CAPTURE_PAGE`, `SPONSORED_CONTENT` or `NATIVE_LEAD_AD_WITH_FORM`.

For `DEVELOPER_INSPECTION_REGISTRATION` enquiries, `id` can be a project or listing id; `name` can be `PROJECT_DETAIL_PAGE`, `CHILD_LISTING_DETAIL_PAGE` or `LISTING_DETAIL_PAGE`; `type` can be `DISPLAY_SUITE_INSPECTION`, `SALES_OFFICE_INSPECTION` or `PROPERTY_INSPECTION`.

Property

Type

Description

Example

id

string

The id of the enquiry source

”019aaf7c-91f5-49f4-b30c-afe0cc71603a”

name

string

The name of the enquiry source

”My campaign”

type

string

Type of the enquiry source

”SPONSORED\_CONTENT”

#### ExternalIdentifiers

Property

Type

Description

Example

externalProjectId

string

External project identifier setup by CRM / customer.

”PROJECT\_XYZ”

externalListingId

string

The partner’s identifier for the listing. This is used to replace the old `listing.externalListingId` field.

”PARTNER\_12345”

#### CustomAttributes

This field contains key value string pairs that varies depending on the product. The keys will be set by customers and the values will be filled in by consumers. The whole object field `custom_attributes` returns null, if the product doesn’t support it.

| Property | Type | Description | Example | | ------------------- | ------ | ---------------------------------------------------------------------------------------- | ------- | ------ | ------ | | “I’m interested in” | string | A key value string pair, where the key is a custom question, and the value is its answer | “1 bed | 1 bath | 1 car” |

### Example Request

Terminal window

```
$ curl -H "Accept: application/json" -H "Authorization: Bearer <token>" https://api.realestate.com.au/lead/v1/enquiries/<enquiry_id>
```

### Example Responses

#### 200 (Success)

A leads report for the requested enquiry ID.

```
{  "id": "d12f565c-ca75-44bd-a68c-b62cf0114bca",  "agencyId": "ABCEFG",  "receivedAt": "2017-07-24T11:45:02.000Z",  "processedAt": "2017-07-26T03:24:40.442Z",  "type": "REALESTATE_COM_AU_RENT",  "comments": "",  "requestedInformation": [    "Find out the length of the lease",    "Inspect the property"  ],  "agentRecipients": ["agent@example.com"],  "suppliedMarketStatus": null,  "listing": {    "id": "12345678",    "externalListingId": "EXTERNAL123",    "parentId": null  },  "contactDetails": {    "fullName": "Sarah Smith",    "email": "sarah@example.com",    "phone": "0412345678",    "postcode": "4020",    "preferredContactMethod": null  },  "source": {    "id": null,    "name": null,    "type": null  },  "externalIdentifiers": {    "externalProjectId": null,    "externalListingId": null  },  "customAttributes": null,  "_links": {    "self": {      "href": "https://api.realestate.com.au/partner/enquiries/d12f565c-ca75-44bd-a68c-b62cf0114bca"    }  }}
```

#### 400 (Bad Request)

The request is missing required fields or is malformed

```
{  "errors": [    {      "status": "400",      "title": "Bad Request",      "detail": "The request is missing required fields or is malformed",      "meta": {        "transactionId": "b0959f3f-0aaa-4cb2-a568-ae320830e8bc"      }    }  ]}
```

#### 401 (Unauthorized)

The request requires a valid authentication token.

```
{  "errors": [    {      "status": "401",      "title": "Unauthorized",      "detail": "The request requires a valid authentication token",      "meta": {        "transactionId": "af6dba36-eb9f-40ee-94ca-7abc22fa4661"      }    }  ]}
```

#### 403 (Forbidden)

Access to the requested resource is forbidden.

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
{  "errors": [    {      "status": 406,      "title": "Not Acceptable",      "detail": "The response content type is not acceptable according to the accept headers sent in the reques",      "meta": {        "transactionId": "af6dba36-eb9f-40ee-94ca-7abc22fa4661"      }    }  ]}
```

### Try it Out

Try out this endpoint using our [API explorer](../explore/).

## Get Seller Leads

The seller lead list endpoint returns a list of seller leads for an agent. These are both appraisal requests submitted directly to agents from sellers, and also buyer enquiries that we have identified as potential sellers.

The response includes all details submited by the consumer, as well seller lead enrichment information (if a customer has an appropraite subscription with REA).

For details on migrating to `v2/seller-leads` and how to use this endpoint in conjuction with the existing `v1/enquiries` endpoint, see [migration guide here](../migration-guide/).

### URL

```
GET https://api.realestate.com.au/lead/v2/seller-leads
```

### Try it Out

Try out this endpoint using our [API explorer](../explore/).

## Get Seller Leads by ID

The seller lead detail endpoint returns a single seller lead for an agent. This can be both an appraisal request submitted directly to agents from a seller, or a buyer enquiry that we have identified as a potential seller.

The response includes all details submited by the consumer, as well seller lead enrichment information (if a customer has an appropraite subscription with REA)

### URL

```
GET https://api.realestate.com.au/lead/v2/seller-leads/{enquiry-id}
```

### Path Parameters

Name

Type

Required

Description

Example

enquiry\_id

string

Required

The unique ID for the enquiry/owner-lead

a1234b56-1654-4528-837b-3e4261736f08

### Try it Out

Try out this endpoint using our [API explorer](../explore/).
