---
title: "Usage"
source: https://partner.realestate.com.au/ratings-reviews/usage/
fetched_at: 2026-04-17T03:53:08.829Z
---

# Usage

## Get Reviews for Agent:

Returns a collection of ratings & reviews for an Agent’s `agentProfileId`. This collection can be filtered by `ratings` which will return reviews with specific star ratings (1,2,3,4,5) or `since` a given date and time of creation. If the `since` query parameter is not provided, then by default, only the reviews created within the last 12 months will be returned. This collection contains the ratings reviews belonging to not only this `agentProfileId`, but also all of this agent’s linked agent profile ids.

**For partners**: The agency reviews endpoint provided by this API can be used to obtain agent profile ids. Once the agency endpoint is consumed, inside each review of the response, there exists a field under `agent` called `profileId`. This `profileId` can be used in the agent reviews endpoint.

**Support the following query parameters:**

-   page\*
    
-   since\*
    
-   ratings
    
-   order
    

**Required(\*):** Either since or page is required.

**Note:** The `since` and `ratings` query parameters need to be url encoded. For more information on url encoding, please refer to [this guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent).

### Pagination

Every response payload with agent reviews will have a `next` link which will act as a pointer to the `next` page that needs to be requested. If the next link on a page is `null` then this means that all reviews for this agent profile have been consumed and there are no more reviews available.

Every response payload will also have a `prev` link which will act as a pointer to the previous page that can be requested. If the prev link on a page is `null` then this means that you are currently at the first page.

When retrieving agent reviews for the first time, it is recommended to use `since` query parameter as well as the `order` query parameter. The `order` query parameter is **optional** and by default it will be set to `DESC` (descending order by creation date). Follow the `next` page links until all the available agent reviews have been read. The `order` that you specify will be the same for all subsequent pages.

The payload also contains a `totalCount` which indicates the total number of reviews for this agent profile across all the pages available.

By default every page will return up to a maximum of 10 reviews in the `result` of the payload.

### URL

```
  GET https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agent/{agentProfileId}
```

### Example request:

```
  GET https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agent/12345678?since=2010-09-06T12%3A27%3A00.1Z&order=ASC
```

### Response Payload

A list of reviews for the agent profile id.

#### 200 (Success)

```
{  "totalCount": 1,  "_links": {    "self": {      "href": "https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agent/12345678?since=2010-09-06T12%3A27%3A00.1Z&order=ASC"    },    "next": {      "href": "https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agent/12345678?page=eyJwYWdlIjozLCJzaXplIjoxMCwib3JkZXIiOiJERVNDIiwic2luY2UiOiIyMDE4LTAzLTAxVDAwOjAwOjAwLjAwMFoiLCJyYXRpbmdzIjpbMSwyLDMsNCw1XX0%3D"    },    "prev": {      "href": null    }  },  "result": [    {      "rating": 5,      "content": "Ana worked tirelessly to achieve the best possible price.",      "listing": {        "id": "14325448",        "_links": {          "self": {            "href": "https://www.realestate.com.au/14325448"          }        }      },      "reviewer": {        "role": "seller",        "name": "Paul C"      },      "agent": {        "profileId": "99999",        "name": "Ana Borcherdt",        "emailAddresses": ["ana@test.com"],        "_links": {          "self": {            "href": "https://www.realestate.com.au/agent/ana-borcherdt-99999?cid=rea:api:rnr"          }        }      },
      "agency": {        "id": "VKSYFQ",        "name": "The Agency - PERTH",        "_links": {          "self": {            "href": "https://www.realestate.com.au/agency/the-agency-perth-VKSYFQ?cid=rea:api:rnr"          }        }      },      "createdDate": "2023-11-02T01:32:31.397Z"    }  ]}
```

#### 400 (Bad Request)

The request is sent with an invalid cursor set in the `page` query parameter.

```
{  "errors": [    {      "The page query parameter is set to an invalid cursor"    }  ]}
```

#### 401 (Unauthorized)

The authentication token is invalid or has expired

```
{  "errors": [    {      "status": "401",      "meta": {        "transactionId": "6b9e8eab-34a3-4a94-b3fa-f99a8af4c42c"      },      "title": "Unauthorized",      "detail": "The request requires a valid authentication token"    }  ]}
```

### Try it out:

Please refer to the [explore](./explore.md) section to understand the response payload and request parameters.

## Get Ratings and Reviews Stats for Agents:

Returns the ratings reviews stats value by agents `agentProfileIds`. The `agentProfileIds` must be comma delimited with a maximum of 25 agent ids. Stats are returned for each agent specified in the `agentProfileIds` path parameter. If the agent `profileId` doesn’t have any ratings reviews, the array will not contain this agent’s stats.

### URL

```
  GET https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agents/{agentProfileIds}/stats
```

### Example request:

```
  GET https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agents/000000,000001/stats
```

### Response Payload

A list of ratings and review stats for the agent profile ids.

#### 200 (Success)

```
{  "agentsStats": [    {      "agentId": "000000",      "averageRating": 5.0,      "reviewsCount": 112    },
    {      "agentId": "000001",      "averageRating": 2.233,      "reviewsCount": 99    }  ]}
```

#### 400 (Bad Request)

The request contains more than 25 agent profile ids in the `agentProfileIds` path paramter.

```
{  "errors": [    {      "The agentIds path parameter cannot have more than 25 agent ids"    }  ]}
```

#### 401 (Unauthorized)

The authentication token is invalid or has expired

```
{  "errors": [    {      "status": "401",      "meta": {        "transactionId": "6b9e8eab-34a3-4a94-b3fa-f99a8af4c42c"      },      "title": "Unauthorized",      "detail": "The request requires a valid authentication token"    }  ]}
```

### Try it out:

Please refer to the [explore](./explore.md) section to understand the response payload.

## Get Reviews for Agencies:

Returns a collection of ratings & reviews for agencies specified by `agencyIds`. The `agencyIds` must be comma delimited with a maximum of 25 agency ids. The collection can be filtered by `ratings` which will return reviews with specific star ratings (1,2,3,4,5) or `since` a given date and time of creation. If the `since` query parameter is not provided, then by default, only the reviews created within the last 12 months will be returned. This collection contains the reviews belonging to all the agents working for these `agencyIds`. One thing to note is the response will combine the reviews into one array instead of returning them separately.

**For partners**: To obtain agency ids, please request them from customers.

**Support the following query parameters:**

-   page\*
    
-   since\*
    
-   ratings
    
-   order
    

**Required(\*):** Either since or page is required.

**Note:** The `since` and `ratings` query parameters need to be url encoded. For more information on url encoding, please refer to [this guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent).

### Pagination

Every response payload with reviews will have a `next` link which will act as a pointer to the `next` page that needs to be requested. If the next link on a page is `null` then this means that all reviews for all the agents at the agencies have been consumed and there are no more reviews available.

Every response payload will also have a `prev` link which will act as a pointer to the previous page that can be requested. If the prev link on a page is `null` then this means that you are currently at the first page.

When retrieving reviews for the first time, it is recommended to use `since` query parameter as well as the `order` query parameter. The `order` query parameter is **optional** and by default it will be set to `DESC` (descending order by creation date). Follow the `next` page links until all the available reviews have been read. The `order` that you specify will be the same for all subsequent pages.

The payload also contains a `totalCount` which indicates the total number of reviews for the specified agencies across all the pages available.

By default every page will return up to a maximum of 10 reviews in the `result` of the payload.

### URL

```
  GET https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agencies/{agencyIds}
```

### Example

```
  GET  https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agencies/ABCDEF,GHIJKL?since=2010-09-06T12%3A27%3A00.1Z&order=ASC
```

### Response Payload

A list of reviews for agency ids.

#### 200 (Success)

```
{  "totalCount": 1,  "_links": {    "self": {      "href": "https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agencies/ABCDEF,GHIJKL?since=2010-09-06T12%3A27%3A00.1Z&order=ASC"    },    "next": {      "href": "https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agencies/ABCDEF,GHIJKL?page=eyJwYWdlIjozLCJzaXplIjoxMCwib3JkZXIiOiJERVNDIiwic2luY2UiOiIyMDE4LTAzLTAxVDAwOjAwOjAwLjAwMFoiLCJyYXRpbmdzIjpbMSwyLDMsNCw1XX0%3D"    },    "prev": {      "href": null    }  },  "result": [    {      "rating": 5,      "content": "Ana worked tirelessly to achieve the best possible price.",      "listing": {        "id": "14325448",        "_links": {          "self": {            "href": "https://www.realestate.com.au/14325448"          }        }      },      "reviewer": {        "role": "seller",        "name": "Paul C"      },      "agent": {        "profileId": "99999",        "name": "Ana Borcherdt",        "emailAddresses": ["ana@test.com"],        "_links": {          "self": {            "href": "https://www.realestate.com.au/agent/ana-borcherdt-99999?cid=rea:api:rnr"          }        }      },
      "agency": {        "id": "VKSYFQ",        "name": "The Agency - PERTH",        "_links": {          "self": {            "href": "https://www.realestate.com.au/agency/the-agency-perth-VKSYFQ?cid=rea:api:rnr"          }        }      },      "createdDate": "2023-11-02T01:32:31.397Z"    }  ]}
```

#### 400 (Bad Request)

The request is sent with an invalid cursor set in the `page` query parameter.

```
{  "errors": [    {      "The page query parameter is set to an invalid cursor"    }  ]}
```

#### 400 (Bad Request)

The request contains more than 25 agency profile ids in the `agencyIds` path paramter.

```
{  "errors": [    {      "The agencyIds path parameter cannot have more than 25 agency ids"    }  ]}
```

#### 401 (Unauthorized)

The authentication token is invalid or has expired

```
{  "errors": [    {      "status": "401",      "meta": {        "transactionId": "6b9e8eab-34a3-4a94-b3fa-f99a8af4c42c"      },      "title": "Unauthorized",      "detail": "The request requires a valid authentication token"    }  ]}
```

### Try it out:

Please refer to the [explore](./explore.md) section to understand the response payload.

## Get Ratings and Reviews Stats for Agencies:

Returns the ratings and reviews stats for agencies specified by the `agencyIds` path parameter. The `agencyIds` must be comma delimited with a maximum of 25 agency ids. The ratings and reviews stats are returned for each agency in an array format. If the `agencyId` doesn’t have any ratings and reviews in our system, the array will not contain this `agencyId`’s stats.

### URL

```
  GET https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agencies/{agencyIds}/stats
```

### Example

```
  GET https://api.realestate.com.au/customer-profile/v1/ratings-reviews/agencies/ABCDEF,GHIJKL/stats
```

### Response Payload

A list of ratings and reviews stats for agency ids.

#### 200 (Success)

```
{  "agenciesStats": [    {      "agentId": "000000",      "averageRating": 5.0,      "reviewsCount": 112    },
    {      "agentId": "000001",      "averageRating": 2.233,      "reviewsCount": 99    }  ]}
```

#### 400 (Bad Request)

The request contains more than 25 agency profile ids in the `agencyIds` path paramter.

```
{  "errors": [    {      "The agencyIds path parameter cannot have more than 25 agency ids"    }  ]}
```

#### 401 (Unauthorized)

The authentication token is invalid or has expired

```
{  "errors": [    {      "status": "401",      "meta": {        "transactionId": "6b9e8eab-34a3-4a94-b3fa-f99a8af4c42c"      },      "title": "Unauthorized",      "detail": "The request requires a valid authentication token"    }  ]}
```

### Try it out:

Please refer to the [explore](./explore.md) section to understand the response payload.
