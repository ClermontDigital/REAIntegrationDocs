---
title: "Tenant Selection API"
source: https://partner.realestate.com.au/tenant-selection/overview/
fetched_at: 2026-04-17T03:53:22.621Z
---

# Tenant Selection API

The Tenant Selection API allows authenticated partners and customers of REA Group to get rental applications received by the agencies, and update the application’s status to `SUCCESSFUL/UNSUCCESSFUL/WITHDRAWN`.

-   [Poll published applications](./usage.md#poll-published-applications) - Get rental applications received by the agencies.
-   [Poll updated applications](./usage.md#poll-updated-applications) - Get rental applications updated to SUCCESSFUL/UNSUCCESSFUL status by the agencies.
-   [Update application status](./usage.md#update-application-status) - Update the field `status` and `statusLastUpdatedAt` of the application.

### Scope Required

`rent:applications:read`

`rent:applications:write`

### Included Data for Tenant Selection API

-   applicationId - Unique identifier representing a specific application.
-   applicationDetailsUrl - The URL of the application details.
-   applicationDetails - Details of the application. Includes: `leaseStartDate`, `leaseTerm`, `publishedAt`, `statusLastUpdatedAt`, `applicationStatus`,`isShortlisted`,`rentOfferAmount`.
-   listingDetails - Details of the listing of the application, includes `listingAddress`, `reaAgencyId`, `reaListingId`.
-   applicants - A set of applicants of the application. Include the primary applicant and secondary applicants.

For a detailed list of fields and data available, please see [Usage](./usage.md).

### FAQ

**Can anyone access the Tenant Selection API?** The Tenant Selection API is only available to [realestate.com.au](https://realestate.com.au/) customers for their own agencies’ applications, or to partners such as CRM providers after a customer has authorised them to have access on their behalf.

**Why is the Tenant Selection API returning a `401 Unauthorized` error?** The Tenant Selection API requires a valid access token token. Refer to the [Authentication](../getting-started/authentication.md) to get the `access_token`. If the `access_token` is correct, please check that your `agencyIds` is valid for the `/applications/published/feed`, `/application/updated/feed` endpoints and that the `applicationId` is valid for `/applications/{applicationId}/status` endpoint.

**Can I specify a number of applications to be returned per page?** The Tenant Selection API will return up to 25 applications per page. Refer to [Pagination](./usage.md#pagination) for a full explanation.

**Is the “agencyIds” request parameter mandatory?** The “agencyIds” request parameter is no longer mandatory. Refer to [Query Parameters](./usage.md#query-parameters) for more details.
