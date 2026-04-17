---
title: "Successful Applicant API"
source: https://partner.realestate.com.au/successful-applicant/overview/
fetched_at: 2026-04-17T03:53:14.565Z
---

# Successful Applicant API

The Successful Applicant API is a service that allows authorized partners to retrieve the full details of a rental application - including applicants’ details and documents - once a [realestate.com.au](https://www.realestate.com.au/) customer has approved the application for a particular listing in [Ignite](https://ignite.realestate.com.au/).

The API provides three endpoints:

-   [Get Successful Applications feed](./usage.md#get-successful-applications)
-   [Get Successful Application](./usage.md#get-successful-application)
-   [Get Successful Application Documents](./usage.md#get-successful-application-documents)

All requests to the API endpoints are performed with HTTP Version 1.1. Responses that are not in a binary format include hypermedia controls.

### Authorisation scopes

The API requires the following scope to allow access:

-   `rent:successful-applications:read`

### Data included in API responses

-   Applicant details such as name, date of birth, and email address
-   Applicant income details
-   Applicant references
-   Joint applicant details
-   Rent offer amounts
-   Occupants
-   Pets

### FAQ

**Can anyone use the Successful Applicant API?**

The Successful Applicant API is only available to [realestate.com.au](https://www.realestate.com.au/) customers who have authorised their CRM provider to access their rental applications on their behalf.

**Why is the Successful Applicant API returning a `401 Unauthorized` error?**

The Successful Applicant API requires a valid authorization token. Refer to the [Authentication page](../getting-started/authentication.md) to get the `access_token`. If the `access_token` is correct, please check that the `agencyIds` parameter is valid for the `/applications/successful/feed` endpoint. To obtain the details or documents of an application, that application must belong to the agency the CRM is acting for.

**Can I specify a number of listings to be returned per page?** The Successful Applicant API will return up to 25 applications per page. Refer to [Pagination](./usage.md#pagination) for a full explanation.

**Is the `agencyIds` request parameter mandatory?**

The “Get Successful Applications feed” does not require the `agencyIds` query paramter. Refer to [Query Parameters](./usage.md#query-parameters) for more details.

**How often should I poll the Successful Applicant API feed?**

It is up to the API user to determine the frequency of requests to the endpoint. However, to ensure there is a feeling of immediacy in the transfer of applicant data when an application is marked as successful, a period of 2 minutes is recommended.

The API endpoint is rate-limited to 500 requests a minute.
