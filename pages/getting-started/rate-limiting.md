---
title: "Rate Limiting"
source: https://partner.realestate.com.au/getting-started/rate-limiting/
fetched_at: 2026-04-17T03:51:55.800Z
---

# Rate Limiting

All Partner Platform APIs are rate limited by capping number of requests allowed per minutes to ensure availability for all customers. We limit the HTTP requests our customers can execute in a given period of seconds or minutes.

Here is a complete list of rate limits on our Partner Platform API:

API

Rate Limit

Listing Upload API

300 requests per minute

Listing Export API

300 requests per minute

Campaign API

400 requests per minute

Leads API

400 requests per minute

Webhooks API

300 requests per minute

Rate limits can be viewed on the response headers, like in this example for Webhooks API.

![](https://partner.realestate.com.au/images/getting-started/rate-limiting/rate-limit.png)

-   X-RateLimit-Limit-minute - Minute in the header name signifies that the rate limit is configured to accept 300 requests per minute.
-   X-RateLimit-Remaining-minute - 299 is the number of remaining HTTP requests we can make during the current minute. In our example above, this counts as 1 request.

If we make another DELETE and POST request within the time we issue the GET request above, the number of remaining HTTP request will be 297. The remaining rate limit will reset to 300 (whatever the limit is set for the API) for every minute (depending on the given period).

When rate limits have been exceeded, a response error code of 429 (Too Many Requests. You have exceeded the maximum number of requests permitted.) is returned.
