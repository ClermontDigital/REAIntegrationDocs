---
title: "Changelog"
source: https://partner.realestate.com.au/customer-profile/changelog/
fetched_at: 2026-04-17T03:51:18.675Z
---

# Changelog

## v1.0.1 / 2026-04-10

### Documentation updates

-   **Endpoint paths aligned:** Documentation now uses `/v1/profile` paths across the Customer Profile section.
-   **Profile update behavior clarified:** `PUT /v1/profile/{externalId}` is documented as a full profile-field replacement (all profile-level fields required), with working relationships managed via dedicated relationship endpoints.
-   **Working relationship response fields clarified:** Examples and schemas now use `contactEmail` and `contactPhone`.

### New endpoints

-   **Update profile fields:** `PUT /v1/profile/{externalId}` — fully replace name, bio, awards, socials, website, photos, and display settings (all required) without affecting working relationships.
-   **Update a working relationship:** `PUT /v1/profile/{externalId}/working-relationships/{agencyId}` — update `contactEmail`, `contactPhone`, `roleType`, `jobTitle`, or `primaryOffice` on an existing active relationship in place.

### New features

-   **Profile imagery now writable:** `profilePhoto`, `secondaryProfilePhoto`, and `coverPhoto` fields are accepted on Create and Update (URL to `.jpg`, `.jpeg`, or `.png`).
-   **Add working relationships is live:** `POST /v1/profile/{externalId}/add-working-relationships` — no longer marked as “coming soon”.
-   **End working relationships is live:** `POST /v1/profile/{externalId}/end-working-relationships` — no longer marked as “coming soon”.
-   **Primary office auto-demotion:** Setting `primaryOffice: true` on any working relationship operation automatically demotes the existing primary.

* * *

## v1.0.0-beta / 2026-03-02

-   Initial release of the Customer Profile API documentation
-   Create, retrieve, update and offboard endpoints documented
