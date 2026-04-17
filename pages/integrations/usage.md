---
title: "Usage"
source: https://partner.realestate.com.au/integrations/usage/
fetched_at: 2026-04-17T03:52:08.553Z
---

# Usage

This guide demonstrates common usage patterns for the Integrations API, including how to retrieve integrations, filter results, and handle pagination.

## Authentication

All requests to the Integrations API require authentication using OAuth 2.0 Client Credentials flow.

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## List all integrations

To retrieve a list of all integrations for your API account:

#### Request

```
GET https://api.realestate.com.au/me/v1/integrations
```

#### Response

```
{  "_links": {    "self": {      "href": "https://api.realestate.com.au/me/v1/integrations"    },    "next": {      "href": "https://api.realestate.com.au/me/v1/integrations?nextPage=eyJ0aW1lc3RhbXAiOiIyMDI0LTA0LTAyVDAwOjAwOjAwWiIsImlkIjoiYWJjMTIzIn0=",      "cursor": "eyJ0aW1lc3RhbXAiOiIyMDI0LTA0LTAyVDAwOjAwOjAwWiIsImlkIjoiYWJjMTIzIn0="    }  },  "_embedded": {    "integrations": [      {        "integrationId": "123e4567-e89b-12d3-a456-426614174000",        "updatedAt": "2024-10-03T05:30:30.554399Z",        "ownerId": "XYZABC",        "ownerType": "agency",        "scopes": ["listing:listings:write", "lead:enquiries:read"],        "_links": {          "self": {            "href": "https://api.realestate.com.au/me/v1/integrations/123e4567-e89b-12d3-a456-426614174000"          }        }      }    ]  }}
```

## Get a specific integration

To retrieve detailed information about a specific integration by its ID:

#### Request

```
GET https://api.realestate.com.au/me/v1/integrations/123e4567-e89b-12d3-a456-426614174000
```

#### Response

```
{  "integrationId": "123e4567-e89b-12d3-a456-426614174000",  "updatedAt": "2024-10-03T05:30:30.554399Z",  "ownerId": "XYZABC",  "ownerType": "agency",  "scopes": ["listing:listings:write", "lead:enquiries:read"],  "_links": {    "self": {      "href": "https://api.realestate.com.au/me/v1/integrations/123e4567-e89b-12d3-a456-426614174000"    }  }}
```

## Filter by update timestamp

To retrieve only integrations that have been updated since a specific timestamp, use the `since` query parameter:

#### Request

```
GET https://api.realestate.com.au/me/v1/integrations?since=2024-10-02T02:30:30.554399Z
```

#### Response

```
{  "_links": {    "self": {      "href": "https://api.realestate.com.au/me/v1/integrations?since=2024-10-02T02:30:30.554399Z"    },    "next": null  },  "_embedded": {    "integrations": [      {        "integrationId": "123e4567-e89b-12d3-a456-426614174000",        "updatedAt": "2024-10-03T05:30:30.554399Z",        "ownerId": "XYZABC",        "ownerType": "agency",        "scopes": ["listing:listings:write", "lead:enquiries:read"],        "_links": {          "self": {            "href": "https://api.realestate.com.au/me/v1/integrations/123e4567-e89b-12d3-a456-426614174000"          }        }      }    ]  }}
```

This is particularly useful for incremental synchronization, allowing you to efficiently fetch only the integrations that have changed since your last sync.

## Pagination

The Integrations API uses cursor-based pagination. When more results are available, the response will include a `next` link with a `cursor` value.

#### Request for the first page

```
GET https://api.realestate.com.au/me/v1/integrations
```

#### Response with pagination

```
{  "_links": {    "self": {      "href": "https://api.realestate.com.au/me/v1/integrations"    },    "next": {      "href": "https://api.realestate.com.au/me/v1/integrations?nextPage=eyJ0aW1lc3RhbXAiOiIyMDI0LTA0LTAyVDAwOjAwOjAwWiIsImlkIjoiYWJjMTIzIn0=",      "cursor": "eyJ0aW1lc3RhbXAiOiIyMDI0LTA0LTAyVDAwOjAwOjAwWiIsImlkIjoiYWJjMTIzIn0="    }  },  "_embedded": {    "integrations": [      // ... integrations ...    ]  }}
```

#### Request for the next page

To fetch the next page of results, use the cursor from the `next.cursor` field:

```
GET https://api.realestate.com.au/me/v1/integrations?nextPage=eyJ0aW1lc3RhbXAiOiIyMDI0LTA0LTAyVDAwOjAwOjAwWiIsImlkIjoiYWJjMTIzIn0=
```

When there are no more pages, the `next` link will be `null`.

## Combining filters and pagination

You can combine the `since` filter with pagination:

#### Request

```
GET https://api.realestate.com.au/me/v1/integrations?since=2024-10-02T02:30:30.554399Z&nextPage=eyJ0aW1lc3RhbXAiOiIyMDI0LTA0LTAyVDAwOjAwOjAwWiIsImlkIjoiYWJjMTIzIn0=
```

## Using HAL links

The API follows the HAL (Hypertext Application Language) specification. Each resource includes `_links` that you can use to navigate the API:

```
{  "_links": {    "self": {      "href": "https://api.realestate.com.au/me/v1/integrations/123e4567-e89b-12d3-a456-426614174000"    }  }}
```

The `self` link always points to the canonical URL of the current resource. You can use these links to navigate the API without hardcoding URLs in your application.

## Error handling

The API returns standard HTTP status codes:

-   **401 Unauthorized** - Invalid or expired access token
-   **403 Forbidden** - Insufficient permissions to access this resource
-   **404 Not Found** - Integration not found
-   **500 Internal Server Error** - Server error occurred

## Best practices

### 1\. Use webhook subscriptions for real-time updates

Instead of polling the API frequently, subscribe to `IntegrationCreated`, `IntegrationUpdated`, and `IntegrationDeleted` webhook events through the [Webhooks API](../webhooks/overview.md). This provides real-time notifications when integrations change.

### 2\. Implement incremental sync

Use the `since` parameter to fetch only integrations that have been updated since your last sync:

```
// Store the last sync timestampconst lastSyncTime = "2024-10-03T05:30:30.554399Z";
// Fetch only updated integrationsconst response = await fetch(  `https://api.realestate.com.au/me/v1/integrations?since=${lastSyncTime}`,);
```

### 3\. Handle pagination correctly

Always check for the `next` link and iterate through all pages:

```
let nextPage = null;const allIntegrations = [];
do {  const url = nextPage    ? `https://api.realestate.com.au/me/v1/integrations?nextPage=${nextPage}`    : "https://api.realestate.com.au/me/v1/integrations";
  const response = await fetch(url);  const data = await response.json();
  allIntegrations.push(...data._embedded.integrations);  nextPage = data._links.next?.cursor;} while (nextPage);
```

### 4\. Cache HAL links

Use the HAL links provided in responses rather than constructing URLs manually. This makes your code more resilient to API changes.
