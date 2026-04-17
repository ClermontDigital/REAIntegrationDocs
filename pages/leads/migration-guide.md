---
title: "Migration Guide"
source: https://partner.realestate.com.au/leads/migration-guide/
fetched_at: 2026-04-17T03:52:20.902Z
---

# Migration Guide

## Migrate to V2 of Leads API

We are in the process of updating our API offering around leads and the leads API. At the core, we’re introducing new `v2` endpoints that serve similiar information to their `v1` counterparts, with the added value of _enrichment_ data being included. This is a step away from the previous flow, where a consumer of the API would need to fetch basic lead details from the Leads API and then use the Lead Enrichment API to fetch enrichment data separately.

Currently, we offer a `/v2/seller-leads` endpoint which returns enquiries from potential sellers. Later, we intend to add an equivalent for all enquiries.

### New Fields in /v2/seller-leads

The response from the new `/v2/seller-leads` endpoint also includes a `sellerEnrichment` object. This object represents one of three states:

-   Enrichment information is available for this seller lead, and the requester has access to it
    
    ```
    //   example data"sellerEnrichment": {    "sellerScore": 0,    "sellerReadiness": "EARLY_SELL_STAGE",    "buyerReadiness": "low",    "predicatedSellerSuburb": "string",}
    ```
    
-   The requester does not have access to enrichment information for this seller lead
    
    ```
    "sellerEnrichment": {    "error": "SELLER_ENRICHMENT_NOT_PURCHASED",    "description": "The customer making the request does not have access to this product. Contact REA for subscription options",}
    ```
    
-   Enrichment information is not available for this seller lead
    
    ```
    "sellerEnrichment": {    "error": "SELLER_ENRICHMENT_NO_DATA",    "description": "There is no seller data available for user submitting the enquiry",}
    ```
    

Further details on the new fields in the `sellerEnrichment` object when data is available:

Field

Example

Description

sellerScore

6

X out of 10 value representing seller enrichment score

sellerReadiness

MID\_SELL\_STAGE

Value indicating where the consumer is in their sell journey.

buyerReadiness

high

Value indicating where the consumer is in their buy journey.

predicatedSellerSuburb

3000

A predicted suburb where the consumer’s property to be sold is located

… and when data is unavailable:

Field

Example

Description

error

SELLER\_ENRICHMENT\_NOT\_PURCHASED

An error enum describing why no data is available for this seller lead

description

”The customer making the request does not have access to this product. Contact REA for subscription options”

Further explaination describing why no data is available for this seller lead

### Integrating with /v2/seller-leads

The existing `/v1/enquiries` endpoint returns enquiries of all types, but the `/v2/seller-leads` endpoint is more specialised and only returns enquiries which have come from a potential seller (whether that’s a consumer that has submitted an appraisal request, or a buyer enquiry that also expresses an intent to sell).

Therefore, in order to fetch enriched seller leads alongside _all_ other types of enquiries, it is necessary to compliment usage of `/v2/seller-leads` with a filtered version of `/v1/enquiries`. A new filter added to `/v1/enquiries` allows for filtering out particular on enquiry. Enquiry types passed into the `exclude_types` parameter will not appear in the response.

For example, the following request would exclude appraisal requests (which will appear in the response from `/v2/seller-leads`, along with seller enrichment)

```
/v1/enquiries?exclude_types=REALESTATE_COM_AU_SALES_APPRAISAL_REQUEST,REALESTATE_COM_AU_RENTAL_APPRAISAL_REQUEST
```

### Scenario

Imagine a hypothetical CRM implementation with two requirements:

-   **Req 1**: There should be a view of potential buyers for listed properties for the agent, with a way to access buyer enrichment data for those potential buyers.
-   **Req 2**: There should be a view of potential sellers who have contacted the agent, with a way to access seller enrichment data for those potential sellers.

* * *

**Req 1** - Enriched Potential Buyers View

The list of potential buyers can be fetched with a call to existing endpoints on the Leads API and the Lead Enrichment API:

#### Step #1 - Fetch Basic Enquiries

Fetch a list of basic buyer enquiries, containing consumer entered data. Exclude appraisal requests:

```
GET https://api.realestate.com.au/lead/v1/enquiries?exclude_types=REALESTATE_COM_AU_SALES_APPRAISAL_REQUEST,REALESTATE_COM_AU_RENTAL_APPRAISAL_REQUEST
```

#### Step #2 - Fetch Enrichment

Parse the response to build a set of listing ids based on the returned `id`s. This should be a comma separated string. Fetch enrichment data for each enquiry returned in the produced list

```
GET https://api.realestate.com.au/lead-enrichment/v1/enrichments?enquiryIds={ID LIST}
```

#### Step #3 - Render View

Match data from both responses to build list of enquiries with enrichment. Render view based on the merged data.

* * *

**Req 2** - Enriched Potential Sellers View

The list of potential sellers, with seller enrichment, can be fetched with a call to the new `/v2/seller-leads` endpoint on the Leads API

#### Step #1 - Render View

Fetch a list of seller leads, containing consumer entered data and enrichment. Include buyer enquiries and appraisal requests:

```
GET https://api.realestate.com.au/lead/v2/seller-leads
```

#### Step #2 - Render View

Match data from both responses to build list of enquiries with enrichment. Render view based on data in the response from the `/v2/seller-leads` endpoint.
