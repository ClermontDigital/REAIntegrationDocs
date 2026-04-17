---
title: "Migration Guide"
source: https://partner.realestate.com.au/ratings-reviews/migration/
fetched_at: 2026-04-17T03:53:05.351Z
---

# Migration Guide

This is the migration guide for users who were using the previous ratings reviews api.

The **new base url is:** `https://api.realestate.com.au/customer-profile/v1/ratings-reviews`

### Agent Ratings & Reviews endpoint `/agent` => `/agent/{agentProfileId}`

#### Request

-   Reviews can only be retrieved for one `agentProfileId` per request.
-   The agent’s profile id `agentProfileId` is specified in the path parameters.
-   `minimumRating` is replaced with `ratings` delimited by comma in string format, e.g. ‘1,2,3,4,5’
-   New `order` query parameter which can sort the results by review `created_date` either in ascending or descending order. By default it is descending.
-   `since` has to be provided in the very first request. `order` and `ratings` can be optionally provided
-   Example request: `GET https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agent/12345676?since=2018-02-29T22%3A50%3A44.842Z&order=ASC`

#### Response

-   Response structure has been updated,
-   Add `_links` in `listing` field

### Agent Ratings & Reviews stats endpoint `/agent/stats` => `/agents/{agentProfileIds}/stats`

#### Request

-   Move the `agentIds` from query param to path param
-   Example request: `GET https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agents/12345676,8697545/stats`

#### Response

-   Return the agent stats separately in an array
-   Add agentId in response
-   Remove the `_links` from response (there is no pagination for this endpoint, all results are returned)

### Agency Ratings & Reviews endpoint `/agency` => `/agencies/{agencyIds}`

#### Request

-   Move the `agencyIds` from query param to path param
-   `minimumRating` is replaced with `ratings` delimited by comma in string format, e.g. ‘1,2,3,4,5’
-   New `order` query parameter which can sort the results by review `created_date` either in ascending or descending order. By default it is descending.
-   `since` has to be provided in the very first request. `order` and `ratings` can be optionally provided
-   Example request: `GET https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agencies/ABCDEF,GHIJK?since=2018-02-29T22%3A50%3A44.842Z&order=ASC`

#### Response

-   Response structure has been updated,
-   Add `_links` in `listing` field

### Agency Ratings & Reviews stats endpoint `/agency/stats` => `/agencies/{agencyIds}/stats`

#### Request

-   Move the `agencyIds` from query param to path param
-   Example request: `GET https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agencies/ABCDEF,GHIJK/stats`

#### Response

-   Return the agency stats separately in an array
-   Add agencyId in response
-   Remove the `_links` from response (there is no pagination for this endpoint, all results are returned)
