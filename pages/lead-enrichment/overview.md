---
title: "Lead Enrichment API"
source: https://partner.realestate.com.au/lead-enrichment/overview/
fetched_at: 2026-04-17T03:52:12.692Z
---

# Lead Enrichment API

The Lead Enrichment API allows authenticated partners and customers of REA Group to access lead enrichment data for enquiries received from realestate.com.au.

**What is Lead Enrichment?**

Lead Enrichment will allow customers to tap in to realestate.com.au’s audience and insights to understand more about interested buyers than ever before. Customers can now get a deeper understanding about their buyers before even picking up the phone, including what stage of their buying journey they’re in, and the property types and suburbs they might be interested in.

### Scope Required

`lead:enquiries:read`

### Included Data

-   **Enquiry ID** - unique identifier for the enquiry
-   **Listing ID** - unique identifier for the listing the consumer enquired about
-   **Score** - X out of 10 score designed to assist in identifying the leads intent to purchase at the point in time when the enquiry was submitted. Use this to guide prioritisation of leads and to inform whether to nurture or convert
-   **Enrichment data finalisation status** - generating the most relevant enrichment data takes multiple iterations, finalisation status indicates whether or not the enrichment process is complete and the data is fully available
-   **Buyer readiness band** - indicator showing where the consumer is in their buy journey _(early, mid or late stage buyer)_
-   **Listing engagement band** - indicator showing the level of consumer engagement with the listing they enquired about
-   **Search criteria match** - set of indicators providing insight into the suburbs and property attributes the consumer is most interested in and how the specific listing matches up

For a detailed list of fields and data available please see [Using Lead Enrichment API](./usage.md) or [Explore Lead Enrichment API](./explore.md).

### FAQ

**Can anyone access the Lead Enrichment API?**

Lead Enrichment API will only be made available to realestate.com.au customers, or to partners such as CRM providers whom a customer has authorised to have access on their behalf.

**Is enrichment data available for all Buyer Enquiries via the Lead Enrichment API?**

Lead enrichment data is available to Developer Project Profiles and Residential Premiere All 60 Customers.

**How frequently is the data updated?**

The first iteration of enrichment data becomes available shortly after the enquiry has been submitted. Average time to enrich is up to 5 minutes. In order to provide the most up to date enrichment data for enquiry we also refresh this data again 24 hours later.

To provide the most relevant enrichment data for enquiry we are actualising it _once_ on the day after it has been submitted.

**What enrichment data history is available?**

A rolling 90-day window of enrichment data will be made available via Lead Enrichment API.

**Can the price range the consumer is most interested in be sent with the enrichment data?**

To ensure our data led products provide value for both customers and consumers, insight into a consumers budget will not be provided. This is a decision driven and backed by consumer feedback.

**Does a low score suggest the enquiry is low quality?**

The score is calculated based on what we can infer from the consumers onsite behaviour at the time the enquiry is submitted. It is imperative to understand a consumer’s interest and intent to purchase can change considerably in the period after the enquiry is made. Low scoring leads don’t mean that it is low quality. The additional insights that are attached to the lead may indicate that the buyer may just need some nurturing, a different communication strategy, or may be better suited to other properties in your portfolio.

**How do you I get access to the Lead enrichment API?**

Both the Leads API and Lead Enrichment API share the same scope/permissions. Having access to the Leads API is a pre-requisite for Lead enrichment API access. If you have access to the Leads API, you can access the Lead Enrichment API without going through the onboarding process again.
