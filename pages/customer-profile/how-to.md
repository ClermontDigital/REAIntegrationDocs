---
title: "How to Use the Customer Profile API"
source: https://partner.realestate.com.au/customer-profile/how-to/
fetched_at: 2026-04-17T03:51:23.228Z
---

# How to Use the Customer Profile API

This guide walks through the most common integration patterns for the Customer Profile API. Use it alongside the [Usage reference](./usage.md) which documents every endpoint in detail.

Note

Make sure you have completed [authentication setup](../getting-started/authentication.md) and have been granted the required scopes (`customer-profile:individual-customer:write` and `customer-profile:individual-customer:read`) before starting.

* * *

## Scenario 1: Onboarding a new agent

**When to use this:** An agent joins your agency and their profile needs to be created in REA’s systems so they appear on realestate.com.au.

### Prerequisites

-   You have the agent’s personal details (name, bio, contact information)
-   You have the 6-character `agencyId` for the agency (available from your REA account representative)
-   You have a `customer-profile:individual-customer:write` scope token

### Step 1: Create the profile

Send a `POST /customer-profile/v1/profile` with the agent’s details and at least one working relationship.

Terminal window

```
curl --request POST \  --url https://api.realestate.com.au/customer-profile/v1/profile \  --header "Authorization: Bearer <access_token>" \  --header "Content-Type: application/json" \  --data '{    "firstName": "Jane",    "lastName": "Smith",    "displayProfile": true,    "aboutMe": "Jane is a senior sales agent with 10 years experience in Melbourne inner suburbs.",    "workingRelationships": [      {        "agencyId": "ABCDEF",        "workplaceEmail": "jane.smith@example-agency.com.au",        "contactEmail": "jane@example-agency.com.au",        "contactPhone": "+61412345678",        "roleType": "Sales",        "jobTitle": "Senior Sales Agent",        "primaryOffice": true      }    ],    "industryStartYear": 2016,    "professionalWebsite": "https://www.example-agency.com.au/jane-smith",    "socials": [      "https://www.linkedin.com/in/janesmith"    ],    "profilePhoto": "https://example.com/images/primary-photo.jpg",    "secondaryProfilePhoto": "https://example.com/images/secondary-photo.jpg",    "coverPhoto": "https://example.com/images/cover-photo.jpg",    "awards": [      {        "name": "Top Sales Agent",        "year": 2024,        "agencyId": "ABCDEF"      }    ]  }'
```

### Step 2: Store the returned external ID

The response is a UUID string: this is the profile’s permanent external ID. **Store this in your system** against the agent record. You’ll need it for every subsequent operation.

```
"550e8400-e29b-41d4-a716-446655440000"
```

### Verification

Retrieve the profile to confirm it was created correctly:

Terminal window

```
curl --request GET \  --url https://api.realestate.com.au/customer-profile/v1/profile/550e8400-e29b-41d4-a716-446655440000 \  --header "Authorization: Bearer <access_token>"
```

The profile will appear on realestate.com.au once downstream propagation completes (typically within a few minutes).

* * *

## Scenario 2: Agent joins a second agency

**When to use this:** An existing agent starts working with an additional agency. Their original working relationship must remain active.

### Prerequisites

-   You have the agent’s existing external ID stored in your system
-   You have the `agencyId` for the new agency

### Step 1: Add the new working relationship

Use `POST .../add-working-relationships`; this is additive and will not affect the agent’s existing relationships.

Terminal window

```
curl --request POST \  --url https://api.realestate.com.au/customer-profile/v1/profile/550e8400-e29b-41d4-a716-446655440000/add-working-relationships \  --header "Authorization: Bearer <access_token>" \  --header "Content-Type: application/json" \  --data '{    "workingRelationships": [      {        "agencyId": "GHIJKL",        "workplaceEmail": "jane.smith@second-agency.com.au",        "contactEmail": "jane@second-agency.com.au",        "contactPhone": "+61498765432",        "roleType": "Principal",        "jobTitle": "Principal",        "primaryOffice": false      }    ]  }'
```

Tip

Only set `primaryOffice: true` on the relationship you want to be the agent’s primary office. Exactly one relationship must be primary across the profile at any time.

### Verification

Retrieve the profile and confirm `workingRelationships` now contains both agencies, both with `endDate: null`.

* * *

## Scenario 3: Agent leaves one agency (but stays with others)

**When to use this:** An agent departs one agency but remains active at one or more others. Only the specific relationship should be ended.

### Prerequisites

-   You have the agent’s external ID
-   You know which agency they are leaving

### Step 1: Retrieve the profile to confirm the active relationship

Terminal window

```
curl --request GET \  --url https://api.realestate.com.au/customer-profile/v1/profile/550e8400-e29b-41d4-a716-446655440000 \  --header "Authorization: Bearer <access_token>"
```

In the response, find the `workingRelationships` array and locate the entry for the agency being vacated. Confirm it is active — it must have `endDate: null`:

```
"workingRelationships": [  {    "agencyId": "GHIJKL",    "endDate": null,    ...  }]
```

### Step 2: End the specific relationship

Terminal window

```
curl --request POST \  --url https://api.realestate.com.au/customer-profile/v1/profile/550e8400-e29b-41d4-a716-446655440000/end-working-relationships \  --header "Authorization: Bearer <access_token>" \  --header "Content-Type: application/json" \  --data '{    "agencyIds": ["GHIJKL"]  }'
```

A `204 No Content` response confirms the relationship has been end-dated. The agent’s remaining relationships are unchanged.

### Verification

Retrieve the profile and confirm the departed relationship now has an `endDate` value, while the remaining relationships still have `endDate: null`.

* * *

## Scenario 4: Agent leaves all agencies (full offboard)

**When to use this:** An agent is leaving the industry entirely, or departing all agencies simultaneously. All working relationships should be ended at once.

### Step 1: Offboard the profile

Terminal window

```
curl --request POST \  --url https://api.realestate.com.au/customer-profile/v1/profile/550e8400-e29b-41d4-a716-446655440000/offboard \  --header "Authorization: Bearer <access_token>"
```

A `204 No Content` response confirms all relationships have been end-dated and downstream profiles deactivated.

Profile is not deleted

Offboarding does **not** delete the profile. The UUID and historical data are retained, so the agent can be re-onboarded later, for example if they return to the industry, by creating new working relationships using the same external ID.

* * *

## Scenario 5: Syncing profiles in bulk during initial integration

**When to use this:** You are integrating for the first time and need to create profiles for all existing agents in your system.

### Recommended approach

1.  **Paginate through your existing agents** in your platform
2.  For each agent, **check if an external ID already exists** in your system (from a previous integration or manual setup)
3.  If no external ID exists, **create the profile** via `POST /customer-profile/v1/profile` and store the returned UUID
4.  If an external ID already exists, **retrieve the profile** via `GET` to verify the current state before making any changes

### Pagination when auditing REA-side

To list all profiles your integration owns (e.g. to reconcile against your system):

Terminal window

```
curl --request GET \  --url "https://api.realestate.com.au/customer-profile/v1/profiles?pageSize=200" \  --header "Authorization: Bearer <access_token>"
```

Follow `_links.next.href` until it is `null` to consume all pages. The default and maximum page size is 200.

Caution

Do not attempt to parse or construct the pagination cursor manually; always use the value returned verbatim from the previous response.

### Rate limiting and batching

If you are creating a large number of profiles, introduce a short delay between requests (e.g. 100–200ms) to stay within REA’s standard rate limits. See the [Rate Limiting guide](../getting-started/rate-limiting.md) for details.

* * *

## Scenario 6: Updating profile fields

**When to use this:** An agent’s name, bio, awards, website, or display settings have changed. You need to update profile-level fields without touching their working relationships.

### Prerequisites

-   You have the agent’s external ID
-   You have a `customer-profile:individual-customer:write` scope token

### Step 1: Update the profile

Send a `PUT /customer-profile/v1/profile/{externalId}` as a full replacement request. All profile-level fields are required on every call (including unchanged values). Working relationships are not accepted in this request and cannot be accidentally changed.

Terminal window

```
curl --request PUT \  --url https://api.realestate.com.au/customer-profile/v1/profile/550e8400-e29b-41d4-a716-446655440000 \  --header "Authorization: Bearer <access_token>" \  --header "Content-Type: application/json" \  --data '{    "firstName": "Jane",    "lastName": "Smith",    "displayProfile": true,    "aboutMe": "Jane is an award-winning sales agent with over 12 years experience across Melbourne inner suburbs.",    "industryStartYear": 2014,    "professionalWebsite": "https://www.example-agency.com.au/jane-smith",    "profilePhoto": "https://example.com/images/primary-photo.jpg",    "secondaryProfilePhoto": "https://example.com/images/secondary-photo.jpg",    "coverPhoto": "https://example.com/images/cover-photo.jpg",    "socials": [      "https://www.linkedin.com/in/janesmith"    ],    "awards": [      {        "name": "Top Sales Agent",        "year": 2024,        "agencyId": "ABCDEF"      },      {        "name": "Industry Excellence Award",        "year": 2025,        "agencyId": "ABCDEF"      }    ]  }'
```

A UUID response confirms the update was applied.

### Verification

Retrieve the profile to confirm the fields were updated. Working relationships will be unchanged.

* * *

## Scenario 7: Updating a working relationship

**When to use this:** An agent’s contact details, role, or job title at a specific agency have changed. You want to update the relationship in place without ending and re-adding it.

### Prerequisites

-   You have the agent’s external ID
-   You know the `agencyId` of the relationship to update

### Step 1: Update the relationship

Send a `PUT /customer-profile/v1/profile/{externalId}/working-relationships/{agencyId}` with the updated fields. This endpoint is a full replacement request for the relationship, so all fields are required on every call.

Terminal window

```
curl --request PUT \  --url https://api.realestate.com.au/customer-profile/v1/profile/550e8400-e29b-41d4-a716-446655440000/working-relationships/ABCDEF \  --header "Authorization: Bearer <access_token>" \  --header "Content-Type: application/json" \  --data '{    "contactEmail": "jane.new@example-agency.com.au",    "contactPhone": "+61498765432",    "roleType": "Principal",    "jobTitle": "Principal",    "primaryOffice": true  }'
```

The response returns the updated relationship fields.

Note

The `workplaceEmail` field is immutable and cannot be changed via this endpoint. To change a workplace email, end the relationship and create a new one, or follow the [Change of Email Support workflow](../help/support.md).

### Verification

Retrieve the profile and confirm the relationship for agency `ABCDEF` reflects the updated contact details, role, and job title.

* * *

## Troubleshooting

### `400`: `workplaceEmail` already in use

Each `workplaceEmail` can only be associated with one individual across all profiles. If you receive this error on create, the email is already tied to an existing profile. Retrieve profiles by email (if supported) or contact your REA account representative to identify the existing record.

### `400`: `agencyId` format invalid

Agency IDs must be exactly 6 uppercase letters (e.g. `ABCDEF`). Check for typos, lowercase characters, or extra whitespace. Agency IDs are not available via the API; obtain them from your REA account representative.

### `404` on relationship endpoint

If `end-working-relationships` returns a `404`, the profile ID is incorrect. Retrieve the profile first to confirm the ID before retrying.

### `409`: profile or working relationship already exists

If you receive `409 Conflict` on create or add-relationship operations, the target profile or agency relationship already exists. Retrieve the profile first, then use the relevant update endpoint instead of re-creating the existing resource.

### Profile not appearing on realestate.com.au

After a successful create or update, allow a few minutes for downstream propagation. If the profile is still not visible after 10 minutes, check that `displayProfile` was set to `true` and that the working relationship is active (`endDate: null`). Contact REA support if the issue persists.
