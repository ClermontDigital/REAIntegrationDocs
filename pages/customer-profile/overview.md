---
title: "Customer Profile API"
source: https://partner.realestate.com.au/customer-profile/overview/
fetched_at: 2026-04-17T03:51:24.753Z
---

# Customer Profile API

The Customer Profile API allows partners to create, retrieve, update and offboard property professional profiles in REA’s ecosystem. It’s designed for near real-time syncing so agencies don’t have to double-handle profile data across their systems and REA tools.

This capability is part of REA’s broader investment to improve profile data quality and establish a single, trusted source of profile data across REA systems. It also supports the transition away from legacy, manual profile maintenance workflows by letting your partners securely publish profile updates that can be reflected on realestate.com.au.

Note

The Customer Profile API is currently in a controlled pilot. To request access, contact your REA account representative.

### What a public profile looks like

When your integration submits data via the Customer Profile API, it surfaces directly on **realestate.com.au**, one of Australia’s most visited property platforms, with 1.5 million prospective sellers visiting each month. The sections below show the consumer-facing pages your data populates.

#### The agent profile page

![Example of a public agent profile page on realestate.com.au, showing profile photo, bio, performance snapshot, listings, and reviews](https://partner.realestate.com.au/images/customer-profile/agent-profile-page.png)

_Example: a public agent profile page at `realestate.com.au/agent/{id}`. Each section is powered by data you can create and keep in sync via this API._

The profile page is built from the data fields you submit:

What the consumer sees

Where it comes from

Agent name, profile photos, and banner imagery

`firstName`, `lastName`, `profilePhoto`, `secondaryProfilePhoto`, `coverPhoto`

Bio / “About me”

`aboutMe` field

Agency name and contact details

Working relationship: `agencyId`, `contactPhone`, `contactEmail`

Years of experience

Derived from `industryStartYear`

Awards and recognition

`awards[]` array

Website and social links

`professionalWebsite`, `socials[]`

Performance snapshot (median sold price, days on site, sales count)

Populated automatically from listing data once the profile is linked

Ratings and reviews

Collected from verified buyers and sellers via the Ratings & Reviews product

Tip

The `displayProfile` field controls whether the profile appears publicly on realestate.com.au. Profile imagery can be set via the `profilePhoto`, `secondaryProfilePhoto`, and `coverPhoto` fields (URL to a `.jpg`, `.jpeg`, or `.png` image, 10–1024 characters). REA downloads and stores these images from the provided URLs when submitted. The URLs must be publicly accessible at upload time (no authentication). For optimal display, we recommend an aspect ratio of 1:1 for profile photos, a wide landscape aspect ratio for cover photos, a minimum width of 400px, and a file size under 10MB.

#### The Find an Agent search card

Agents also surface in the **Find an Agent** experience (`realestate.com.au/find-agent`). When a prospective seller searches by suburb, your agent’s card shows their photo, agency, sales performance, star rating, and any Top Agent badge they’ve earned.

![Example of an agent card in the Find an Agent search results on realestate.com.au](https://partner.realestate.com.au/images/customer-profile/find-agent-search-card.png)

_Example: the Find an Agent search card, the moment sellers are deciding who to trust with their property._

#### Why this matters for your integration

Profile data is surfaced at the precise moment sellers choose an agent. Stale or incomplete data, such as a missing photo, outdated contact details, or a wrong agency association, is visible to sellers at this critical decision point. The Customer Profile API gives you a programmatic channel to keep this data accurate and consistent, without manual re-entry.

### How your data flows through REA

The Customer Profile API is a **gateway for publishing profile updates into REA**. It validates your request and then applies the change across the relevant REA systems that power profile experiences (including realestate.com.au).

The API itself **doesn’t persist profile records**. Think of it as a managed integration surface that routes accepted updates to the systems of record used inside REA.

At a high level:

1.  **You send a profile payload** from your system (for example, a CRM or agency platform) to create, update, read, or offboard.
2.  **REA validates and authorises the request**, including ensuring you’re permitted to act on the referenced agency profile data.
3.  **REA propagates the change** so downstream profile experiences (including realestate.com.au) can reflect the latest state.

### Scopes Required

Scope

Description

`customer-profile:individual-customer:write`

Create, update, and offboard profiles

`customer-profile:individual-customer:read`

Retrieve profile data

### Available Operations

Method

Endpoint

Description

`POST`

`/customer-profile/v1/profile`

Create a new agent profile

`GET`

`/customer-profile/v1/profiles`

List all profiles you own (paginated)

`GET`

`/customer-profile/v1/profile/{id}`

Retrieve a profile by external ID

`PUT`

`/customer-profile/v1/profile/{externalId}`

Fully replace profile fields (all profile-level fields required)

`POST`

`/customer-profile/v1/profile/{externalId}/offboard`

Offboard a profile (end all working relationships)

`POST`

`/customer-profile/v1/profile/{externalId}/add-working-relationships`

Add one or more new working relationships to an existing profile

`POST`

`/customer-profile/v1/profile/{externalId}/end-working-relationships`

End one or more working relationships by agency ID

`PUT`

`/customer-profile/v1/profile/{externalId}/working-relationships/{agencyId}`

Update a single working relationship

### Included Data

-   **External ID:** A UUID that uniquely identifies the profile across REA systems
-   **Personal Details:** First name, last name, biography (`aboutMe`), industry start year
-   **Working Relationships:** One or more agency associations, each with role, contact details, and primary office designation
-   **Professional Info:** Awards, professional website URL, social media links
-   **Profile Imagery:** Primary, secondary, and cover photo URLs (`profilePhoto`, `secondaryProfilePhoto`, `coverPhoto`)
-   **Display Control:** Whether the profile appears publicly on realestate.com.au

### Key Concepts

#### Working Relationships

A working relationship represents an individual’s association with a specific agency. Each relationship includes:

-   **Agency ID:** A 6-character uppercase identifier (e.g. `ABCDEF`). There is currently no programmatic lookup for agency IDs via the Profile API; these are available from your REA account representative.
-   **Workplace Email:** Used for identity and authentication purposes. Cannot be changed on existing relationships. To update a workplace email (for example, following a legal name change), follow the [Change of Email Support workflow](../help/support.md) rather than modifying the field directly.
-   **Contact Email & Phone:** Consumer-facing details displayed on realestate.com.au. Can be updated in place via `PUT .../working-relationships/{agencyId}`.
-   **Role Type:** One of: `Principal`, `Sales`, `PropertyManagement`, `Administration`
-   **Primary Office:** Exactly one relationship must be designated as the primary office

An individual can have relationships with multiple agencies simultaneously, but only one active relationship for any given agency at a time.

#### Managing Working Relationships

Working relationships are treated as a first-class sub-resource with targeted operations that affect only what you specify. Profile updates and working relationship updates happen via separate endpoints, preventing accidental relationship changes during profile edits.

-   **Add relationships:** Use `POST .../add-working-relationships` to add one or more new agency associations to an existing profile. Existing relationships are not affected.
-   **Update a relationship:** Use `PUT .../working-relationships/{agencyId}` to update `contactEmail`, `contactPhone`, `roleType`, `jobTitle`, or `primaryOffice` on an existing active relationship. The `workplaceEmail` field is immutable and cannot be changed this way.
-   **End relationships:** Use `POST .../end-working-relationships` to end one or more specific relationships by agency ID. Other active relationships remain unchanged.
-   **Offboard entirely:** Use `POST .../offboard` to end all active working relationships at once (e.g. an agent leaving all agencies).

This design means you only need to know about the relationship you want to change, not the complete state of the profile, making integrations simpler and less error-prone.

#### Offboarding Behavior

Use offboarding to remove a profile from active use while retaining its record:

**Offboard** (`POST .../offboard`) ends all active working relationships and deactivates downstream profiles, but **preserves the profile**. The UUID and historical data are retained, which means:

-   The customer can be re-onboarded later with new working relationships
-   Historical listing and review associations are retained
-   Accidental offboards can be recovered from

### Validation Rules

Field

Constraint

`agencyId`

Exactly 6 uppercase letters (`^[A-Z]{6}$`). No programmatic lookup is available; obtain from your REA account representative.

`contactPhone`

Australian mobile format: `+614XXXXXXXX`

`workplaceEmail`

Valid email. Uniquely tied to one individual, cannot be reused across profiles. Cannot be updated after creation; email changes require the [Change of Email Support workflow](../help/support.md).

`professionalWebsite`

Valid URL (http/https) or domain, 10–1024 characters

`socials`

Facebook, Twitter/X, or LinkedIn URLs, max 128 characters each

`industryStartYear`

Integer between 1900 and the current year

`awards[{year}]`

Integer between 1900 and the current year

### FAQ

**Who can access the Customer Profile API?**

The API is available to approved integration partners who have been onboarded through the Ignite Partner Gateway. Contact your REA account representative to request access.

**Does this replace the existing profile management in Agent Admin?**

The Customer Profile API provides a programmatic alternative to manual profile management. Profiles created via the API are visible in Agent Admin and on realestate.com.au.

**What happens if I send a duplicate profile?**

The API enforces a unique email constraint: if you attempt to create a profile with a `workplaceEmail` that is already associated with another individual, the request will return a `400 Bad Request` error.

**Can an agent belong to multiple agencies?**

Yes. An individual can have working relationships with multiple agencies simultaneously. Each relationship is tracked independently with its own role, contact details, and start/end dates. However, only one relationship can be designated as the `primaryOffice`.

**How do I remove an agent from one agency without offboarding them entirely?**

Use `POST .../end-working-relationships` with the relevant `agencyIds` to end those relationships. Other active relationships remain unchanged. For example, if an agent has relationships with agencies `ABCDEF` and `GHIJKL` and you want to remove `GHIJKL`, call the End Working Relationships endpoint with `"agencyIds": ["GHIJKL"]`.

**Where do I find an agency’s `agencyId`?**

There is currently no programmatic lookup for agency IDs via the Profile API. Obtain the 6-character identifier from your REA account representative.

**How do I update a `workplaceEmail`, for example after a name change?**

The `workplaceEmail` field cannot be changed via the API once a working relationship is created. Email updates (for example, following a legal name change or marriage) must follow the [Change of Email Support workflow](../help/support.md). Contact REA support to initiate this process.

**How do I update contact details for a single working relationship?**

Use `PUT .../working-relationships/{agencyId}` to update `contactEmail`, `contactPhone`, `roleType`, `jobTitle`, or `primaryOffice` on an existing active relationship. This updates the relationship in place without needing to end and re-add it. Note that `workplaceEmail` is immutable and cannot be changed this way.

For the business case and expected benefits, see [Why Customer Profile API](./why-customer-profile.md). For detailed request/response examples, see [Using the Customer Profile API](./usage.md).
