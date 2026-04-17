---
title: "Usage"
source: https://partner.realestate.com.au/customer-profile/usage/
fetched_at: 2026-04-17T03:51:26.555Z
---

# Usage

## Authentication

The Customer Profile API uses **OAuth 2.0 Client Credentials** flow. See the [Authentication guide](../getting-started/authentication.md) for full setup instructions including how to obtain your client credentials.

Include your access token in the `Authorization` header for all API requests:

```
Authorization: Bearer <access_token>
```

### Required Scopes

Scope

Required for

`customer-profile:individual-customer:write`

Create profiles, add/end working relationships, offboard

`customer-profile:individual-customer:read`

Retrieve profiles (GET endpoints)

Ensure the appropriate scopes are granted when configuring your OAuth client. Contact your REA account representative if you need a scope added.

* * *

## Create a Profile

**Creates a new individual customer profile with one or more working relationships.**

The profile is validated, then distributed across REA’s internal systems. On success, the API returns the external ID (UUID) which you should store for future operations.

### URL

```
POST https://api.realestate.com.au/customer-profile/v1/profile
```

### Request Headers

Header

Value

`Authorization`

`Bearer <access_token>`

`Content-Type`

`application/json`

### Request Body

Field

Type

Required

Description

`firstName`

string

✅

Individual’s first name

`lastName`

string

✅

Individual’s last name

`displayProfile`

boolean

✅

Whether to display the profile publicly on realestate.com.au

`aboutMe`

string

✅

Short biography or description

`workingRelationships`

array

✅

One or more working relationships (see below)

`awards`

array

❌

Professional awards

`industryStartYear`

integer

❌

Year started in real estate (1900–current year)

`professionalWebsite`

string

❌

Professional website URL (10–1024 chars)

`profilePhoto`

string

❌

URL to a profile photo (`.jpg`, `.jpeg`, or `.png`; 10–1024 chars)

`secondaryProfilePhoto`

string

❌

URL to a secondary profile photo (`.jpg`, `.jpeg`, or `.png`; 10–1024 chars)

`coverPhoto`

string

❌

URL to a cover photo (`.jpg`, `.jpeg`, or `.png`; 10–1024 chars)

`socials`

array

❌

Social media URLs (Facebook, Twitter/X, LinkedIn; max 128 chars each)

Note

**Photo URL Accessibility & Requirements:** REA downloads and stores `profilePhoto`, `secondaryProfilePhoto`, and `coverPhoto` from the provided URLs when submitted. The URLs must be publicly accessible at upload time (no authentication). For best performance and display, we recommend an aspect ratio of 1:1 for profile photos, a wide landscape aspect ratio for cover photos, a minimum width of 400px, and a file size under 10MB.

#### Working Relationship Fields

Field

Type

Required

Description

`agencyId`

string

✅

6 uppercase letters (e.g. `ABCDEF`). No programmatic lookup available; obtain from your REA account representative.

`workplaceEmail`

string

✅

Workplace email, used for identity. Cannot be changed after creation. For email updates (e.g. name change), use the [Change of Email Support workflow](../help/support.md).

`contactEmail`

string

✅

Consumer-facing email displayed on realestate.com.au

`contactPhone`

string

✅

Australian mobile: `+614XXXXXXXX`

`roleType`

string

✅

One of: `Principal`, `Sales`, `PropertyManagement`, `Administration`

`jobTitle`

string

✅

Job title at the agency

`primaryOffice`

boolean

❌

Exactly one relationship must be `true`

### Example Request

Terminal window

```
curl --request POST \  --url https://api.realestate.com.au/customer-profile/v1/profile \  --header "Authorization: Bearer <access_token>" \  --header "Content-Type: application/json" \  --data '{    "firstName": "Jane",    "lastName": "Smith",    "displayProfile": true,    "aboutMe": "Jane is a senior sales agent with 10 years experience in Melbourne inner suburbs.",    "workingRelationships": [      {        "agencyId": "ABCDEF",        "workplaceEmail": "jane.smith@example-agency.com.au",        "contactEmail": "jane@example-agency.com.au",        "contactPhone": "+61412345678",        "roleType": "Sales",        "jobTitle": "Senior Sales Agent",        "primaryOffice": true      }    ],    "industryStartYear": 2016,    "professionalWebsite": "https://www.example-agency.com.au/jane-smith",    "socials": [      "https://www.linkedin.com/in/janesmith"    ],    "profilePhoto": "https://example.com/images/primary-photo.jpg",    "secondaryProfilePhoto": "https://example.com/images/secondary-photo.jpg",    "coverPhoto": "https://example.com/images/cover-photo.jpg",    "awards": [      {        "name": "Top Sales Agent",        "year": 2024,        "agencyId": "ABCDEF"      }    ]  }'
```

Note

In `awards`, both `year` (integer, 1900–current year) and `agencyId` (exactly 6 uppercase letters) are validated. Awards referencing an `agencyId` not present in the profile’s working relationships will be rejected.

### Example Response

```
"550e8400-e29b-41d4-a716-446655440000"
```

The returned UUID is the profile’s external ID. Store this for subsequent GET, relationship management, and offboard operations.

* * *

## Retrieve a Profile

**Returns a single profile by external ID, including all working relationships.**

### URL

```
GET https://api.realestate.com.au/customer-profile/v1/profile/{id}
```

### Path Parameters

Parameter

Type

Description

`id`

UUID

The external ID of the profile

### Example Request

Terminal window

```
curl --request GET \  --url https://api.realestate.com.au/customer-profile/v1/profile/550e8400-e29b-41d4-a716-446655440000 \  --header "Authorization: Bearer <access_token>"
```

### Example Response

```
{  "externalId": "550e8400-e29b-41d4-a716-446655440000",  "firstName": "Jane",  "lastName": "Smith",  "displayProfileOnSite": true,  "aboutMe": "Jane is a senior sales agent with 10 years experience in Melbourne inner suburbs.",  "industryStartYear": 2016,  "professionalWebsite": "https://www.example-agency.com.au/jane-smith",  "profilePhoto": "https://example.com/images/primary-photo.jpg",  "secondaryProfilePhoto": "https://example.com/images/secondary-photo.jpg",  "coverPhoto": "https://example.com/images/cover-photo.jpg",  "awards": [    {      "name": "Top Sales Agent",      "year": 2024,      "agencyId": "ABCDEF"    }  ],  "socials": [    "https://www.linkedin.com/in/janesmith"  ],  "workingRelationships": [    {      "agencyId": "ABCDEF",      "contactEmail": "jane@example-agency.com.au",      "contactPhone": "+61412345678",      "roleType": "Sales",      "jobTitle": "Senior Sales Agent",      "primaryOffice": true,      "startDate": "2024-06-15T00:00:00.000Z",      "endDate": null    }  ]}
```

### Response Fields

Field

Type

Description

`externalId`

UUID

The profile’s unique identifier

`firstName`

string

First name

`lastName`

string

Last name

`displayProfileOnSite`

boolean

Whether the profile is publicly visible

`aboutMe`

string

Biography

`industryStartYear`

integer or null

Year started in real estate

`professionalWebsite`

string or null

Professional website URL

`profilePhoto`

string or null

Profile photo URL

`secondaryProfilePhoto`

string or null

Secondary photo URL

`coverPhoto`

string or null

Cover photo URL

`awards`

array or null

Professional awards

`socials`

array or null

Social media URLs

`workingRelationships`

array

All working relationships (active and historical)

* * *

## List All Profiles

**Returns a paginated list of all profiles owned by the calling partner.**

Results are filtered by entity ownership; you will only see profiles that were created by your integration. Uses opaque cursor-based pagination.

### URL

```
GET https://api.realestate.com.au/customer-profile/v1/profiles
```

### Query Parameters

Parameter

Type

Required

Description

`pageSize`

integer

❌

Number of profiles per page (default: 200)

`cursor`

string

❌

Opaque cursor from a previous response

### Example Request

Terminal window

```
curl --request GET \  --url "https://api.realestate.com.au/customer-profile/v1/profiles?pageSize=50" \  --header "Authorization: Bearer <access_token>"
```

### Example Response

```
{  "items": [    {      "externalId": "550e8400-e29b-41d4-a716-446655440000",      "firstName": "Jane",      "lastName": "Smith",      "displayProfileOnSite": true,      "aboutMe": "Jane is a senior sales agent...",      "industryStartYear": 2016,      "professionalWebsite": "https://www.example-agency.com.au/jane-smith",      "profilePhoto": "https://example.com/images/primary-photo.jpg",      "secondaryProfilePhoto": "https://example.com/images/secondary-photo.jpg",      "coverPhoto": "https://example.com/images/cover-photo.jpg",      "awards": [],      "socials": [],      "workingRelationships": [        {          "agencyId": "ABCDEF",          "contactEmail": "jane@example-agency.com.au",          "contactPhone": "+61412345678",          "roleType": "Sales",          "jobTitle": "Senior Sales Agent",          "primaryOffice": true,          "startDate": "2024-06-15T00:00:00.000Z",          "endDate": null        }      ]    }  ],  "_links": {    "next": {      "href": "https://api.realestate.com.au/customer-profile/v1/profiles?pageSize=50&cursor=eyJsYXN0SWQiOiIxMjM0NTY3ODkwIn0="    }  }}
```

### Pagination

Follow the `_links.next.href` value to fetch the next page. When `_links.next.href` is `null`, all results have been consumed.

Caution

The cursor is opaque; do not attempt to parse or construct it manually. Always use the value returned in the previous response.

* * *

## Add Working Relationships

**Adds one or more new working relationships to an existing profile.**

Use this when an agent joins an additional agency, or when you are onboarding them at a second office. Existing working relationships are not affected; this is an additive operation.

### URL

```
POST https://api.realestate.com.au/customer-profile/v1/profile/{externalId}/add-working-relationships
```

### Path Parameters

Parameter

Type

Description

`externalId`

UUID

The external ID of the profile

### Request Body

Field

Type

Required

Description

`workingRelationships`

array

✅

One or more new working relationships to add (see fields below)

#### Working Relationship Fields

Field

Type

Required

Description

`agencyId`

string

✅

6 uppercase letters (e.g. `ABCDEF`)

`workplaceEmail`

string

✅

Workplace email, used for identity. Cannot be changed after creation.

`contactEmail`

string

✅

Consumer-facing email displayed on realestate.com.au

`contactPhone`

string

✅

Australian mobile: `+614XXXXXXXX`

`roleType`

string

✅

One of: `Principal`, `Sales`, `PropertyManagement`, `Administration`

`jobTitle`

string

✅

Job title at the agency

`primaryOffice`

boolean

❌

Set to `true` to designate this as the primary office. Exactly one relationship must be primary across the profile.

### Example Request

Jane has joined a second agency `GHIJKL` as a Sales agent while retaining her existing relationship with `ABCDEF`:

Terminal window

```
curl --request POST \  --url https://api.realestate.com.au/customer-profile/v1/profile/550e8400-e29b-41d4-a716-446655440000/add-working-relationships \  --header "Authorization: Bearer <access_token>" \  --header "Content-Type: application/json" \  --data '{    "workingRelationships": [      {        "agencyId": "GHIJKL",        "workplaceEmail": "jane.smith@second-agency.com.au",        "contactEmail": "jane@second-agency.com.au",        "contactPhone": "+61412345678",        "roleType": "Sales",        "jobTitle": "Sales Agent",        "primaryOffice": false      }    ]  }'
```

### Example Response

```
{  "workingRelationships": [    {      "agencyId": "GHIJKL"    }  ]}
```

* * *

## End Working Relationships

**Ends one or more working relationships by agency ID. Other active relationships are not affected.**

Use this when an agent leaves one agency but continues working with others. To end all relationships at once, use the [offboard endpoint](#offboard-a-profile) instead.

Tip

Retrieve the profile first (`GET /customer-profile/v1/profile/{id}`) to find the `agencyId` of the relationship you want to end.

### URL

```
POST https://api.realestate.com.au/customer-profile/v1/profile/{externalId}/end-working-relationships
```

### Path Parameters

Parameter

Type

Description

`externalId`

UUID

The external ID of the profile

### Request Body

Field

Type

Required

Description

`agencyIds`

array

✅

One or more agency IDs for the relationships to end

### Example Request

Jane is leaving agency `GHIJKL`:

Terminal window

```
curl --request POST \  --url https://api.realestate.com.au/customer-profile/v1/profile/550e8400-e29b-41d4-a716-446655440000/end-working-relationships \  --header "Authorization: Bearer <access_token>" \  --header "Content-Type: application/json" \  --data '{    "agencyIds": ["GHIJKL"]  }'
```

### Example Response

```
HTTP/1.1 204 No Content
```

A `204` response confirms the working relationship has been end-dated. Jane’s relationship with `ABCDEF` remains active and unchanged.

* * *

## Offboard a Profile

**Ends all active working relationships for a profile. The profile itself is retained.**

This is a domain action: it deactivates the individual’s relationships with all agencies and removes their active presence from downstream systems. The profile UUID and historical data are preserved.

Use this when an agent is leaving all agencies simultaneously, or when your system needs to programmatically deactivate a profile entirely. To remove an agent from a single agency only, use the [End Working Relationships endpoint](#end-working-relationships) instead.

### URL

```
POST https://api.realestate.com.au/customer-profile/v1/profile/{externalId}/offboard
```

### Path Parameters

Parameter

Type

Description

`externalId`

UUID

The external ID of the profile to offboard

### Example Request

Terminal window

```
curl --request POST \  --url https://api.realestate.com.au/customer-profile/v1/profile/550e8400-e29b-41d4-a716-446655440000/offboard \  --header "Authorization: Bearer <access_token>"
```

### Example Response

```
HTTP/1.1 204 No Content
```

A `204` response confirms that all working relationships have been end-dated.

* * *

## Update a Profile

**Fully replaces profile-level fields. All profile-level fields are required in the request body. Working relationships are not accepted.**

This endpoint is a full replacement operation, so include every profile-level field each time, including unchanged values. It prevents accidental relationship changes during profile edits. Use this for name changes, bio updates, awards, socials, website, photo URLs, and display profile toggles.

### URL

```
PUT https://api.realestate.com.au/customer-profile/v1/profile/{externalId}
```

### Path Parameters

Parameter

Type

Description

`externalId`

UUID

The external ID of the profile to update

### Request Body

Field

Type

Required

Description

`firstName`

string

✅

Individual’s first name

`lastName`

string

✅

Individual’s last name

`displayProfile`

boolean

✅

Whether to display the profile publicly on realestate.com.au

`aboutMe`

string

✅

Short biography or description

`awards`

array

✅

Professional awards

`industryStartYear`

integer

✅

Year started in real estate (1900–current year)

`professionalWebsite`

string

✅

Professional website URL (10–1024 chars)

`profilePhoto`

string

✅

URL to a profile photo (`.jpg`, `.jpeg`, or `.png`; 10–1024 chars)

`secondaryProfilePhoto`

string

✅

URL to a secondary profile photo (`.jpg`, `.jpeg`, or `.png`; 10–1024 chars)

`coverPhoto`

string

✅

URL to a cover photo (`.jpg`, `.jpeg`, or `.png`; 10–1024 chars)

`socials`

array

✅

Social media URLs (Facebook, Twitter/X, LinkedIn; max 128 chars each)

Note

**Photo URL Accessibility & Requirements:** REA downloads and stores `profilePhoto`, `secondaryProfilePhoto`, and `coverPhoto` from the provided URLs when submitted. The URLs must be publicly accessible at upload time (no authentication). For best performance and display, we recommend an aspect ratio of 1:1 for profile photos, a wide landscape aspect ratio for cover photos, a minimum width of 400px, and a file size under 10MB.

Caution

Working relationships **cannot** be included in this request. Use the dedicated [Add Working Relationships](#add-working-relationships), [End Working Relationships](#end-working-relationships), or [Update a Working Relationship](#update-a-working-relationship) endpoints instead.

### Example Request

Updating Jane’s profile details and media:

Terminal window

```
curl --request PUT \  --url https://api.realestate.com.au/customer-profile/v1/profile/550e8400-e29b-41d4-a716-446655440000 \  --header "Authorization: Bearer <access_token>" \  --header "Content-Type: application/json" \  --data '{    "firstName": "Jane",    "lastName": "Smith",    "displayProfile": true,    "aboutMe": "Jane is an award-winning sales agent with over 12 years experience across Melbourne inner suburbs.",    "industryStartYear": 2014,    "professionalWebsite": "https://www.example-agency.com.au/jane-smith",    "profilePhoto": "https://example.com/images/primary-photo.jpg",    "secondaryProfilePhoto": "https://example.com/images/secondary-photo.jpg",    "coverPhoto": "https://example.com/images/cover-photo.jpg",    "socials": [      "https://www.linkedin.com/in/janesmith"    ],    "awards": [      {        "name": "Top Sales Agent",        "year": 2024,        "agencyId": "ABCDEF"      },      {        "name": "Industry Excellence Award",        "year": 2025,        "agencyId": "ABCDEF"      }    ]  }'
```

### Example Response

```
"550e8400-e29b-41d4-a716-446655440000"
```

The returned UUID confirms the profile was updated successfully.

* * *

## Update a Working Relationship

**Updates fields on an existing active working relationship for a specific agency. All fields in this request are required.**

Use this to change `contactEmail`, `contactPhone`, `roleType`, `jobTitle`, or `primaryOffice` on a relationship without needing to end it and create a new one.

Note

The `workplaceEmail` field is immutable and cannot be changed via this endpoint. To update a workplace email, end the relationship and create a new one, or follow the [Change of Email Support workflow](../help/support.md).

### URL

```
PUT https://api.realestate.com.au/customer-profile/v1/profile/{externalId}/working-relationships/{agencyId}
```

### Path Parameters

Parameter

Type

Description

`externalId`

UUID

The external ID of the profile

`agencyId`

string

The 6-character uppercase agency ID of the relationship to update

### Request Body

Field

Type

Required

Description

`contactEmail`

string

✅

Consumer-facing email displayed on realestate.com.au

`contactPhone`

string

✅

Australian mobile: `+614XXXXXXXX`

`roleType`

string

✅

One of: `Principal`, `Sales`, `PropertyManagement`, `Administration`

`jobTitle`

string

✅

Job title at the agency

`primaryOffice`

boolean

✅

Set to `true` to designate this as the primary office

### Example Request

Updating Jane’s contact details and role at agency `ABCDEF`:

Terminal window

```
curl --request PUT \  --url https://api.realestate.com.au/customer-profile/v1/profile/550e8400-e29b-41d4-a716-446655440000/working-relationships/ABCDEF \  --header "Authorization: Bearer <access_token>" \  --header "Content-Type: application/json" \  --data '{    "contactEmail": "jane.new@example-agency.com.au",    "contactPhone": "+61498765432",    "roleType": "Principal",    "jobTitle": "Principal",    "primaryOffice": true  }'
```

### Example Response

```
{  "agencyId": "ABCDEF",  "contactEmail": "jane.new@example-agency.com.au",  "contactPhone": "+61498765432",  "roleType": "Principal",  "jobTitle": "Principal",  "primaryOffice": true}
```

* * *

## Error Handling

All endpoints return standard HTTP status codes. Validation errors return a `400` response with details about what failed:

### Example Error Response

```
{  "message": "The request did not match the expected schema",  "issues": [    {      "path": [        "aboutMe"      ],      "message": "Expected a non empty string, actual \"\""    },    {      "path": ["workingRelationships", 0, "agencyId"],      "message": "a string matching the pattern ^[A-Z]{6}$"    }  ]}
```

### Common Error Codes

Status

Description

`400`

Validation error: check the `issues` array for details

`409`

Conflict: the profile or working relationship already exists

`404`

Profile not found for the given ID

`500`

Internal server error: retry with exponential backoff
