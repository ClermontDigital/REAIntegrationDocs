---
title: "Responses"
source: https://partner.realestate.com.au/getting-started/responses/
fetched_at: 2026-04-17T03:51:57.590Z
---

# Responses

## `X-Transaction-Id` Header

Each request to `https://api.realestate.com.au` will return a unique `X-Transaction-Id` header. This header is useful for debugging and support purposes, as it allows us to trace the request in our logs. We recommend logging this header in your application so that if you encounter any issues, you can provide this ID to our support team for quicker resolution.

## HTTP Status Codes

When invoking an API, it is essential to check the HTTP response status code to determine the success or otherwise of the request. The following status codes may be returned by the APIs.

-   200 - OK. For a GET request, the response will contain the requested resource. For a POST request, the response will contain the results of the action.
-   201 - Created. Only used for POST requests, this is similar to 200 but explicitly indicates that a new resource was created.
-   307 - Temporary redirect. In some cases we may choose to serve data from a different location and will send a 307 response with corresponding Location header indicating the location of the data. As a result, your client should be configured to follow redirects if they are sent. An example of where we may do this is if payload size is large and we wish to avoid sending it all via API infrastructure.
-   400 - Something is wrong with the request. Check the response for details. See [Error Response](#error-response) for details.
-   401 - The request cannot be authorized. This will typically be due to not providing a valid OAuth token. The token may be missing, invalid, or expired.
-   403 - Access to the requested resource is forbidden. This usually indicates a permission problem where you’ve tried to access a resource to which you’re not entitled. For security reasons, it may also indicate that the requested resource doesn’t exist but that we don’t want to allow clients to determine whether resources to which they’re not entitled exist or don’t exist.
-   404 - The requested resource cannot be found. Note that “resource not found” errors may be sent as 403 rather than 404. See the 403 code for details.
-   429 - Rate limit exceeded. This will occur if too many requests are sent to the API within a period of time. Limits may be put in place to protect the APIs and ensure that they remain available for everybody. Contact us if you think the limits are too strict.
-   500 - An unexpected error has occurred. Check the response for details. See [Error Response](#error-response) for details.
-   503 - Service unavailable exception. This will typically occur if a single API is temporarily unavailable. See [Error Response](#error-response) for details.

## Error Response

Errors returned from Partner Platform API implementations will use the following format:

```
{  "errors": [    {      "status": "403",      "detail": "Access to the requested resource is forbidden",      "title": "Forbidden",      "meta": {        "transactionId": "b0959f3f-0aaa-4cb2-a568-ae320830e8bc"      }    }  ]}
```
