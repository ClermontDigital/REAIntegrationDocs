---
title: "Usage"
source: https://partner.realestate.com.au/successful-applicant/usage/
fetched_at: 2026-04-17T03:53:16.787Z
---

# Usage

## Get Successful Applications

A feed that can be polled to determine if applications are marked approved (successful) in [Ignite](https://ignite.realestate.com.au/).

The feed returns a collection of applications, that belong to an authorised agency, which are marked successful. Only the first or second application marked successful are present in the feed at any one time. If a third or more applications are marked successful for a particular listing, then no applications for that listing appear in the feed.

The response that makes up the feed contains a summary of the applications, the listings, and pagination details. The number of applications present in the feed are up to 25 per page.

Please refer to the [feed payload](#successful-applications-feed-payload) below for more details.

### URL

```
GET https://api.realestate.com.au/applications/v1/rental/applications/successful/feed
```

### Query parameters

Parameter

Type

Required

Description

Example

`happenedSince`

datetime

Yes

The endpoint will return applications marked successful since the value specified. The value should be in ISO-8601 format and URL-encoded when making the request

2021-11-27T22:47:01.604Z

`agencyIds`

array

No

A comma-separated list of REA Agency IDs to query the applications that belong to them. If one of the IDs is invalid, or unknown, the request will be rejected and the response will be `401`. A request without this parameter will return all the applications and listings that belong to agencies which the current partner is authorised for

You can omit this parameter or use these two forms to indicate the agency ids in the URL: `&agencyIds=BCDEFG&agencyIds=ABCDEF` or `&agencyIds=ABCDEF,BCDEFG`

### Response payload

The response payload uses the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) and its MIME type is `application/hal+json`. For now, the endpoint is configured to return 25 successful applications per page.

The `_embedded` property, at the first level inside the response, contains the `successfulApplications` property. The `successfulApplications` property contains a list of applications currently marked successful. Each item contains summaries of the application and listing.

The `_links` property is also first level inside the response, and it contains a `self` property that holds the URI for the actual request. Optionally the `_links` property will contain the property `next` that holds the URI for navigation to the next page of results if it exists.

For more details on pagination, refer to the [Pagination](#pagination) section below.

Below are descriptions for each embedded resource in the response:

#### Application

Property

Type

Description

Example

`applicationId`

string

The unique identifier for the rental application

3fa85f64-5717-4562-b3fc-2c963f66afa6

`applicationDetailsUrl`

string

URL to fetch the application data from this API

`https://api.realestate.com.au/applications/v1/rental/applications/successful/3fa85f64-5717-4562-b3fc-2c963f66afa6/details`

`applicationDetails`

[Application Details](#application-details) object

A summary of the status of the application

`listingDetails`

[Listing Details](#listing-details) object

A summary of the listing

#### Application Details

Property

Type

Description

Example

`leaseTerm`

integer

The lease term submitted by the primary applicant

12

`leaseStartDate`

date

The date submitted by the primary applicant when they want to move in

2021-09-08

`publishedAt`

date-time (ISO-8601)

The time when the application was published

2021-08-08T02:22:56.2228549Z

`statusLastUpdatedAt`

date-time (ISO-8601)

The time when the application was marked successful (approved)

#### Listing Details

Property

Type

Description

Example

`address`

[Listing Address](#listing-address) object

Listing address

`reaAgencyId`

string

Unique identifier representing the listing agency

PCRDJL

`reaListingId`

string

Unique identifier representing the property

26500698

#### Listing Address

Property

Type

Description

Example

`postcode`

string

The post code of the listing

2617

`state`

string

The state or territory of the listing

ACT

`streetAddress`

string

The street address of the listing

3 La Forge Court

`suburb`

string

The suburb of the listing

Belconnen

### Pagination

The successful application items (embedded resources) are separated into pages and formatted using the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) standard. A maximum of 25 items per page is returned by the API.

As mentioned above, the response body contains the first-level property `_links` that holds an object map. This object contains the property `self` that is an encoded hyperlink to the current page. If there are additional pages to poll, then this object will contain the `next` property: an encoded hyperlink to the next page of results.

When using this endpoint to retrieve applications, you should:

-   Start polling from a specific date using the `happenedSince` query string parameter
-   Get the first page of results with a `next` link
-   Poll using that `next` link for the next page of results
-   Continue polling until you reach the last page of results, which you detect by the absence of the `next` link
-   Store the last `happenedSince` or the last link used, and stop polling for a while. How often you poll is up to you
-   When you start to poll again, use the `happenedSince` or link you’ve stored, and begin the polling sequence again

### Poll successful applications - examples

#### Responses with embedded successful applications

**1\. Request with valid PP token, matching agency ID and properly formed URL:**

```
GET https://api.realestate.com.au/applications/v1/rental/applications/successful/feed?happenedSince=2021-09-08T14%3A00%3A00.000000Z&agencyIds=PCRDJL'
```

**Response:**

```
{  "_embedded": {    "successfulApplications": [      {        "applicationId": "117794da-8249-4f2d-af11-5cbb257396fe",        "applicationDetailsUrl": "/applications/successful/117794da-8249-4f2d-af11-5cbb257396fe/details",        "applicationDetails": {          "leaseTerm": 1,          "leaseStartDate": "2020-10-15",          "publishedAt": "2020-09-07T04:56:23Z",          "statusLastUpdatedAt": "2020-09-08T23:45:13Z"        },        "listingDetails": {          "reaListingId": "427765734",          "reaAgencyId": "PCRDJL",          "address": {            "streetAddress": "Street",            "suburb": "Suburb",            "postcode": "4014",            "state": "QLD"          }        }      }    ]  },  "_links": {    "self": {      "href": "https://api.realestate.com.au/applications/v1/rental/applications/successful/feed?happenedSince=2021-09-08T14%3A00%3A00.000000Z&agencyIds=PCRDJL"    },    "next": {      "href": "https://api.realestate.com.au/applications/v1/rental/applications/successful/feed?happenedSince=2021-09-09T14%3A00%3A00.000000Z&agencyIds=PCRDJL"    }  }}
```

**2\. Request that omits agency IDs**

```
GET https://api.realestate.com.au/applications/v1/rental/applications/successful/feed?happenedSince=2021-09-08T14%3A00%3A00.000000Z
```

**Response:**

```
{  "_embedded": {    "successfulApplications": [      {        "applicationId": "117794da-8249-4f2d-af11-5cbb257396fe",        "applicationDetailsUrl": "/applications/successful/117794da-8249-4f2d-af11-5cbb257396fe/details",        "applicationDetails": {          "leaseTerm": 1,          "leaseStartDate": "2021-10-15",          "publishedAt": "2021-09-07T04:56:23Z",          "statusLastUpdatedAt": "2021-09-08T23:45:13Z"        },        "listingDetails": {          "reaListingId": "427765734",          "reaAgencyId": "PCRDJL",          "address": {            "streetAddress": "43 Gold Street",            "suburb": "Shady Vale",            "postcode": "4014",            "state": "QLD"          }        }      },      {        "applicationId": "c13b4cd3-d8e0-0e50-7219-f9fc31589e1b",        "applicationDetailsUrl": "/applications/successful/c13b4cd3-d8e0-0e50-7219-f9fc31589e1b/details",        "applicationDetails": {          "leaseTerm": 1,          "leaseStartDate": "2021-10-15",          "publishedAt": "2021-09-07T02:43:15Z",          "statusLastUpdatedAt": "2021-09-08T21:34:56Z"        },        "listingDetails": {          "reaListingId": "434100326",          "reaAgencyId": "RYKRWL",          "address": {            "streetAddress": "21A Silver Avenue",            "suburb": "Shady Vale",            "postcode": "4014",            "state": "QLD"          }        }      }    ]  },  "_links": {    "self": {      "href": "https://api.realestate.com.au/applications/v1/rental/applications/successful/feed?happenedSince=2021-09-08T14%3A00%3A00.000000Z"    },    "next": {      "href": "https://api.realestate.com.au/applications/v1/rental/applications/successful/feed?happenedSince=2021-09-09T14%3A00%3A00.000000Z"    }  }}
```

#### Response with zero successful applications

**Request:**

```
GET https://api.realestate.com.au/applications/v1/rental/applications/successful/feed?happenedSince=2021-09-10T14%3A00%3A00.000000Z
```

**Response:**

```
{  "_embedded": {    "successfulApplications": []  },  "_links": {    "self": "https://api.realestate.com.au/applications/v1/rental/applications/v1/rental/applications/successful/feed?happenedSince=2021-09-10T14%3A00%3A00.000000Z"  }}
```

#### Responses with errors

**1\. Request with invalid authorization token**

```
GET https://api.realestate.com.au/applications/v1/rental/applications/successful/feed?happenedSince=2021-09-08T14%3A00%3A00.000000Z&agencyIds=PCRDJL'
```

**Response:**

-   HTTP status code: `401 Unauthorized`
-   HTTP body:

```
{  "errors": [    {      "status": "401",      "meta": {        "transactionId": "57f06781-ac3a-4963-8143-a5926fc5c909"      },      "title": "Unauthorized",      "detail": "The request requires a valid authentication token"    }  ]}
```

**2\. Request with invalid agency ID**

```
GET https://api.realestate.com.au/applications/v1/rental/applications/successful/feed?happenedSince=2021-09-08T14%3A00%3A00.000000Z&agencyIds=ABCDZZ'
```

**Response:**

-   HTTP status code: `401 Unauthorized`
-   HTTP body: `Unauthorized` _(text only)_

**3\. Request with invalid parameter `happenedSince`:**

-   HTTP status code: `400 Bad Request`
-   HTTP body:

```
{  "message": "Failed to convert value of type 'java.lang.String' to required type 'java.time.OffsetDateTime'",  "transactionId": "6a29ab71-bb76-418c-9fee-c5a667e866bc",  "details": []}
```

### Try it Out

Try out this endpoint using our [API explorer](../explore/).

## Get Successful Application

This endpoint allows access to the application that is currently marked successful in [Ignite](https://ignite.realestate.com.au). In the response from this endpoint are all the data points submitted by each applicant.

There are restrictions, however, to _what_ application is retrievable from this endpoint. In Ignite, a user may change the application that is marked successful, for a listing, multiple times. This endpoint only allows access to one of the first two applications marked successful. The following table elaborates how this endpoint will respond depending on the change in Ignite:

Step

Ignite user action

Status of App 1

Status of App 2

Status of App 3+

Response (App 1)

Response (App 2)

0

start

published

published

published

404

404

1

Approve App 1

successful

unsuccessful

unsuccessful

App 1

404

2

Approve App 2

unsuccessful

successful

unsuccessful

404

App 2

3

Approve App 1

successful

unsuccessful

unsuccessful

App 1

404

4

Approve App 3

unsuccessful

unsuccessful

successful

404

404

5

Approve App 1

successful

unsuccessful

unsuccessful

App 1

404

A further restriction is that the application details are only available for a limited time. Once that time has passed, the endpoint will respond with the status of `410 Gone`.

### URL

```
GET https://api.realestate.com.au/applications/v1/rental/applications/successful/<application_id>/details
```

### Path parameters

Name

Type

Required

Description

Example

`application_id`

UUID

Yes

The unique identifier for the rental application

117794da-8249-4f2d-af11-5cbb257396fe

### Response payload

The response payload uses the [HAL hypermedia content type](https://en.wikipedia.org/wiki/Hypertext_Application_Language) and its MIME type is `application/hal+json`.

The `_embedded` property, at the first level inside the response, contains the `application` property. The application data is contained in this `application` property.

The `_links` property is also first level inside the response, and it contains a `self`property that holds the URI for the actual request.

Below are descriptions for each embedded resource in the response:

#### Application

Property

Type

Description

Example

`applicationId`

string

The unique identifier for the rental application

3fa85f64-5717-4562-b3fc-2c963f66afa6

`applicationDocumentsUrl`

string

URL to fetch the documents attached to this application from this API as a PDF download. [See here](#get-successful-application-documents)

GET `https://api.realestate.com.au/applications/v1/rental/documents/applications/successful/3fa85f64-5717-4562-b3fc-2c963f66afa6/documents/`

`applicationDetails`

[Application Details](#application-details) object

A summary of the status of the application

`listingDetails`

[Listing Details](#listing-details) object

A summary of the listing

`applicants`

List of [Applicant](#applicant)

The applicants for the lease

#### Applicant

Property

Type

Description

Example

`applicantREAId`

string

The unique identifier for the applicant within REA’s scope

5db962a8-984a-4741-93c8-6d2149a35fff

`primaryApplicant`

boolean

A flag indicating the applicant is responsible for initiating the application

`applicantContactDetails`

[Applicant Contact Details](#applicant-contact-details)

The basic contact information for the applicant

`birthDate`

string

The birth date of the applicant in YYYY-MM-DD format

1984-11-27

`hasOrWillInspect`

boolean

A flag indicating whether the applicant has visited the property or intends to

true

`inspectionDate`

string

The date the applicant visited the property in YYYY-MM-DD format

2021-09-25

`residentialHistory`

array of [Residential History](#residential-history)

A list of properties the applicant previously resided at. Can be empty if the applicant has no residential history

`employmentHistory`

array of [Employment History](#employment-history)

A list of records showing where the applicant has been employed. Can be empty if the applicant has no employment history

`income`

[Income](#income)

A structure that describes proof of income for the applicant

`coverLetter`

string

A letter of introduction written by the applicant for the purposes of the application

`identityDocuments`

array of [Applicant Document](#applicant-document)

A list of documents used by the applicant for proof of identity

`pets`

[Pets](#pets)

A structure that describes the pets the applicant owns

`verification`

[Verification](#verification)

A structure that describes the applicant’s verification

`otherOccupants`

[Occupant](#occupant)

A list of occupants who will be at the property but are not lease-holders

`emergencyContact`

[Emergency Contact](#emergency-contact)

Contact details of a family member, close friend or carer to contact during an emergency

#### Applicant Contact Details

Property

Type

Description

Example

`firstName`

string

The applicant’s first name

Wade

`lastName`

string

The applicant’s last or family name

Wilson

`email`

string

The applicant’s email address

[wade@marvel.com](mailto:wade@marvel.com)

`phoneNumber`

string

The applicant’s phone number

0410 234 567

#### Residential History

Property

Type

Description

Example

`isCurrent`

boolean

A flag indicating if the address record is the present home for the applicant

true

`address`

[Address History](#address-history)

A record showing the full address of the property

`addressReference`

[Applicant Reference](#applicant-reference)

A reference provided by the applicant for the property

`startDate`

string

The date from when the applicant occupied the property in the format YYYY-MM

2021-01

`endDate`

string

The date until when the applicant occupied the property in the format YYYY-MM

2021-12

#### Address History

Property

Type

Description

Example

`street`

string

The street and street number of the property

23 Summer Street

`cityOrSuburb`

string

The locality the property is in

Lilyvale

`postcode`

string

The postcode for the property

3455

`stateOrTerritoryOrProvince`

string

The state or territory the property is in

Victoria

`country`

[Country Record](#country-record)

The country the property is in

#### Country Record

Property

Type

Description

Example

`code`

string

The ISO code for the country

AU

`name`

string

The official name for the country

Australia

#### Applicant Reference

Property

Type

Description

Example

`fullName`

string

The full name for the referee

Henry Baker

`email`

string

The email address for the referee

[henryb@thebestrealestateagents.com.au](mailto:henryb@thebestrealestateagents.com.au)

`phoneNumber`

string

The contact phone number for the referee

0412 678 903

`relationship`

string

The relationship between referee and applicant. Can be one of these values for residential history: `PROPERTY_MANAGER`, `PRIVATE_LANDLORD`, `PARENTS`, `OTHER`, `HOMER_OWNER`. Can be one of these values for employment history: `OWNER`, `MANAGER`, `ACCOUNTANT`, `OTHER`

PROPERTY\_MANAGER

#### Employment History

Property

Type

Description

Example

`isCurrent`

boolean

A flag indicating if the record shows the current employment details for the applicant

true

`type`

string

The type of employment the record relates to. Can be a value of `EMPLOYED`, `SELF_EMPLOYED` or `UNEMPLOYED`

SELF\_EMPLOYED

`abnOrAcn`

string

The ABN or ACN the applicant uses for their self-employed business

12345678

`workRole`

[Work Role](#work-role)

A record that describes the work the applicant is engaged in

`employmentReference`

[Applicant Reference](#applicant-reference)

A reference provided by the applicant for the employment

`startDate`

string

The date from when the applicant started the employment in the format YYYY-MM

2021-01

`endDate`

string

The date when the applicant finished the employment in the format YYYY-MM

2021-12

#### Work Role

Property

Type

Description

Example

`occupation`

string

The occupation the applicant engaged in for the employment period

Software Developer

`companyName`

string

The name of the company the applicant was employed with

REA Group Ltd

#### Income

Property

Type

Description

Example

`hasIncome`

boolean

A flag indicating the applicant has provided proof of income

true

`incomeRecords`

array of [Income Record](#income-record)

A list of income records to show the types of income the applicant receives

`documents`

array of [Applicant Document](#applicant-document)

A list of documents to show proof of income

#### Income Record

Property

Type

Description

Example

`type`

string

The type of income received by the applicant. Can be one of these values: `SALARY`, `FAMILY_ALLOWANCE`, `PENSIONS`, `EXISTING_RENTAL_INCOME`, `PROPOSED_RENTAL_INCOME`, `SUPERANNUATION_INCOME`, `DIVIDEND_INCOME`, `OVERTIME`, `COMMISSION`, `CHILD_SUPPORT`, `BONUS`, `OTHER`, `NO_INCOME`

SALARY

`amount`

integer

The value of the income per cycle

10,000

`frequency`

string

How often this income is received by the applicant. Can be one of these value: `YEARLY`, `MONTHLY`, `FORTNIGHTLY`, `WEEKLY`

MONTHLY

#### Applicant Document

Property

Type

Description

Example

`name`

string

The name of the file uploaded by the applicant

passport.pdf

`type`

string

The type of document uploaded. Can be one of these values: `INCOME`, `AU_DRIVERS_LICENCE`, `AU_PASSPORT`, `OVERSEAS_PASSPORT`, `TENANT_VERIFICATION_1FORM`, `OTHER`, `ADDITIONAL`

AU\_PASSPORT

#### Pets

Property

Type

Description

Example

`cats`

integer

The number of cats the applicant owns. A value of **4** indicates four or more

0

`dogs`

integer

The number of dogs the applicant owns. A value of **4** indicates four or more

2

`other`

integer

The number of other animals the applicant owns. A value of **4** indicates four or more

1

`description`

string

A description of the pets the applicant owns

My dogs are a doberman and a staffy

#### Occupant

Property

Type

Description

Example

`name`

string

The full name of the occupant

Josie Perkins

`type`

string

A descriptor of either `CHILD` or `ADULT`

CHILD

`age`

integer

The age in years of the child

16

#### Verification

Property

Type

Description

Example

`identityVerificationResult`

string

The type of identity verification result. Can be one of these values: `VERIFIED`, `UNVERIFIED`

VERIFIED

`ntdRecordCount`

integer

NTD(National Tenancy Database) record count

0

`bankruptcyRecordCount`

integer

Bankruptcy record count

1

`courtRecordCount`

integer

Court record count

2

`directorshipProprietorshipCount`

integer

Directorship proprietorship count

3

`ntdRecordCountDisplay`

string

Text description for `NTD(National Tenancy Database) record count`

No records

`bankruptcyRecordCountDisplay`

string

Text description for `bankruptcy record count`

1 record

`courtRecordCountDisplay`

string

Text description for `court record count`

2 records

`directorshipProprietorshipCountDisplay`

string

Text description for `directorship proprietorship count`

3 records

#### Emergency Contact

Property

Type

Description

Example

`name`

string

Name of the Emergency Contact

Jared Wilson

`relationship`

string

The type of relationship between the Applicant and the Emergency Contact, available options are, `PARENT`, `SIBLING`, `CHILD`, `GRANDPARENT`, `OTHER_RELATIVE`, `SPOUSE`, `PARTNER`, `FRIEND`, `COLLEAGUE`, `OTHER`

`PARENT`

`email`

string

The emergency contact’s email address

[jared@marvel.com](mailto:jared@marvel.com)

`phoneNumber`

string

The emergency contact’s phone number

0410 234 567

### Examples

#### Successful responses

**Request:**

```
GET https://api.realestate.com.au/applications/v1/rental/applications/successful/117794da-8249-4f2d-af11-5cbb257396fe/details
```

**Response:**

```
{  "_embedded": {    "application": {      "applicationId": "117794da-8249-4f2d-af11-5cbb257396fe",      "applicationDocumentsUrl": "https://api.realestate.com.au/applications/v1/rental/applications/successful/117794da-8249-4f2d-af11-5cbb257396fe/documents",      "applicationDetails": {        "leaseTerm": 1,        "leaseStartDate": "2021-10-15",        "publishedAt": "2021-09-07T04:56:23Z",        "statusLastUpdatedAt": "2021-09-08T23:45:13Z"      },      "listingDetails": {        "reaListingId": "427765734",        "reaAgencyId": "PCRDJL",        "address": {          "streetAddress": "43 Gold Street",          "suburb": "Shady Vale",          "postcode": "4014",          "state": "QLD"        }      },      "applicants": [        {          "applicantREAId": "5db962a8-984a-4741-93c8-6d2149a35fff",          "primaryApplicant": true,          "applicantContactDetails": {            "firstName": "Wade",            "lastName": "Wilson",            "email": "wade@marvel.com",            "phoneNumber": "0410 234 567"          },          "birthDate": "1984-11-27",          "hasOrWillInspect": true,          "inspectionDate": "2021-09-02",          "residentialHistory": [            {              "isCurrent": true,              "address": {                "street": "23 Coldharbour Lane",                "cityOrSuburb": "Burleigh Heads",                "postcode": "4220",                "stateOrTerritoryOrProvince": "QLD",                "country": {                  "code": "AU",                  "name": "Australia"                }              },              "addressReference": {                "fullName": "Adele Greenway",                "email": "adele.greenway@raywhite.com.au",                "phoneNumber": "0400 123 123",                "relationship": "PROPERTY_MANAGER"              },              "startDate": "2019-10-11",              "endDate": null            },            {              "isCurrent": false,              "address": {                "street": "45/23 Ninth Avenue",                "cityOrSuburb": "Palm Beach",                "postcode": "4221",                "stateOrTerritoryOrProvince": "QLD",                "country": {                  "code": "AU",                  "name": "Australia"                }              },              "addressReference": {                "fullName": "Ben Chifley",                "email": "ben.chifley@harcourts.com.au",                "phoneNumber": "0400 321 321",                "relationship": "PROPERTY_MANAGER"              },              "startDate": "2017-08-13",              "endDate": "2019-10-16"            }          ],          "employmentHistory": [            {              "isCurrent": true,              "type": "EMPLOYED",              "workRole": {                "occupation": "Teacher",                "companyName": "Shady Vale High School"              },              "employmentReference": {                "fullName": "Megan Scoot",                "email": "megan.scoot@qld.edu.au",                "phoneNumber": "",                "relationship": "MANAGER"              },              "startDate": "2015-07-01",              "endDate": null            }          ],          "income": [            {              "hasIncome": true,              "incomeRecords": [                {                  "type": "SALARY",                  "amount": "$8,500",                  "frequency": "MONTHLY"                }              ],              "documents": [                {                  "name": "payslip-1.pdf",                  "type": "INCOME"                }              ]            }          ],          "coverLetter": "This is my cover letter",          "identityDocuments": [            {              "name": "file-1.pdf",              "type": "AU_DRIVERS_LICENCE"            },            {              "name": "file-2.pdf",              "type": "AU_PASSPORT"            },            {              "name": "file-3.pdf",              "type": "ADDITIONAL"            }          ],          "pets": {            "cats": 0,            "dogs": 2,            "other": 0,            "details": null          },          "verification": null,          "otherOccupants": [            {              "type": "CHILD",              "age": 7,              "name": "Isaac"            }          ],          "emergencyContact": {            "name": "Homer Simpson",            "relationship": "PARENT",            "email": "homer@simpson.com.au",            "phoneNumber": "0412345678"          }        },        {          "applicantREAId": "a353fbc5-14e2-9ed6-0da2-3c4a43b99940",          "primaryApplicant": false,          "applicantContactDetails": {            "firstName": "Vanessa",            "lastName": "Carlysle",            "email": "carvans27@gmail.com",            "phoneNumber": "0490 423 675"          },          "birthDate": "1985-03-27",          "hasOrWillInspect": true,          "inspectionDate": "2021-09-02",          "residentialHistory": [            {              "isCurrent": true,              "address": {                "street": "23 Coldharbour Lane",                "cityOrSuburb": "Burleigh Heads",                "postcode": "4220",                "stateOrTerritoryOrProvince": "QLD",                "country": {                  "code": "AU",                  "name": "Australia"                }              },              "addressReference": {                "fullName": "Adele Greenway",                "email": "adele.greenway@raywhite.com.au",                "phoneNumber": "0400 123 123",                "relationship": "PROPERTY_MANAGER"              },              "startDate": "2019-10-11",              "endDate": null            },            {              "isCurrent": false,              "address": {                "street": "45/23 Ninth Avenue",                "cityOrSuburb": "Palm Beach",                "postcode": "4221",                "stateOrTerritoryOrProvince": "QLD",                "country": {                  "code": "AU",                  "name": "Australia"                }              },              "addressReference": {                "fullName": "Ben Chifley",                "email": "ben.chifley@harcourts.com.au",                "phoneNumber": "0400 321 321",                "relationship": "PROPERTY_MANAGER"              },              "startDate": "2017-08-13",              "endDate": "2019-10-16"            }          ],          "employmentHistory": [            {              "isCurrent": true,              "type": "EMPLOYED",              "workRole": {                "occupation": "Nurse",                "companyName": "Queensland Childrens Hospital"              },              "employmentReference": {                "fullName": "Neal Stephenson",                "email": "neal.stephenson@health.qld.gov.au",                "phoneNumber": "0499 111 222",                "relationship": "MANAGER"              },              "startDate": "2010-03-21",              "endDate": null            }          ],          "income": [            {              "hasIncome": true,              "incomeRecords": [                {                  "type": "SALARY",                  "amount": "$7,020",                  "frequency": "MONTHLY"                }              ],              "documents": [                {                  "name": "payslip-1.pdf",                  "type": "INCOME"                }              ]            }          ],          "coverLetter": "This is my cover letter",          "identityDocuments": [            {              "name": "file-1.pdf",              "type": "AU_DRIVERS_LICENCE"            },            {              "name": "file-2.pdf",              "type": "AU_PASSPORT"            },            {              "name": "file-3.pdf",              "type": "ADDITIONAL"            }          ],          "pets": {            "cats": 0,            "dogs": 0,            "other": 0,            "details": null          },          "verification": {            "identityVerificationResult": "VERIFIED",            "ntdRecordCount": 0,            "courtRecordCount": 1,            "bankruptcyRecordCount": 2,            "directorshipProprietorshipCount": 3,            "ntdRecordCountDisplay": "No records",            "courtRecordCountDisplay": "1 record",            "bankruptcyRecordCountDisplay": "2 records",            "directorshipProprietorshipCountDisplay": "3 records"          },          "otherOccupants": []        }      ]    }  },  "_links": {    "self": "https://api.realestate.com.au/applications/v1/rental/applications/successful/117794da-8249-4f2d-af11-5cbb257396fe/details"  }}
```

#### Responses with errors

These errors are caused by problems in the request itself, not to errors raised due to the logic based on the successful status of the application. For a description of those errors, see the table above.

**1\. Request with invalid authorization token**

```
GET https://api.realestate.com.au/applications/v1/rental/applications/successful/117794da-8249-4f2d-af11-5cbb257396fe/details
```

**Response:**

-   HTTP status code: `401 Unauthorized`
-   HTTP body:

```
{  "errors": [    {      "status": "401",      "meta": {        "transactionId": "57f06781-ac3a-4963-8143-a5926fc5c909"      },      "title": "Unauthorized",      "detail": "The request requires a valid authentication token"    }  ]}
```

**2\. Request with a poorly formed UUID for an application ID:**

```
GET https://api.realestate.com.au/applications/v1/rental/applications/successful/117794d2d-af11-5cbb257396fe/details
```

**Response:**

-   HTTP Status code: `400 Bad Request`

### Try it Out

Try out this endpoint using our [API explorer](../explore/).

## Get Successful Application Documents

This endpoint allows access to the documents attached to the application that is currently marked successful in [Ignite](https://ignite.realestate.com.au). From this endpoint, a PDF is downloaded.

As with the [Get Successful Application endpoint](#get-successful-application), there are restrictions to downloading these documents. See the documentation for that endpoint to understand the HTTP statuses returned for these error conditions.

**Disclaimer**: Attached PDFs are uploaded by third parties and we are unable to verify their contents or check that all files or links are safe. Take care when opening and viewing PDFs as use is at your own risk.

### URL

To download all documents:

```
GET https://api.realestate.com.au/applications/v1/rental/documents/applications/successful/<application_id>/documents/<document_id>
```

### Path parameters

Name

Type

Required

Description

Example

`application_id`

UUID

Yes

The unique identifier for the rental application

117794da-8249-4f2d-af11-5cbb257396fe

`document_id`

String

Yes

A base 64 encoded unique identifier for the documents submitted

NjcxYjFlZmUtNzU4YyEtNDdkOS1hZTQ0LTM1NWIzMWEzMGE2Yg==

### Responses

**Successful: document or documents were found**

The response is a binary object representing the PDF with a HTTP status code of `200`.

**Note** - The response will have a header `X-Is-Partially-Downloaded` with a string value - `true` / `false` to indicate if the downloaded PDF file contains an error page.

**Errors**

**1\. Request with invalid authorisation token**

-   HTTP status code: `401 Unauthorized`
    
-   HTTP body: `Unauthorized` _(text only)_
    

**2\. Request documents for an unsuccessful application**

-   HTTP status code: `404 Not found`
-   Error response payload is `json` format

**3\. Request documents for an application that is not the first two marked successful**

This error occurs if the application is NOT one of the first two applications that are marked successful.

-   HTTP status code: `403 Forbidden`
-   Error response payload is `json` format

**4\. Request documents for a successful application after application is past 21 days**

This error occurs when the application was submitted over 21 days from the date of request.

-   HTTP status code: `410 Gone`
-   Error response payload is `json` format

**5\. Request with invalid IDs in the URL path**

This error occurs when there is an invalid authentication token.

-   HTTP status code: `400 Bad Request`
-   Error response payload is `json` format
