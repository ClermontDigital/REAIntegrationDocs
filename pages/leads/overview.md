---
title: "Leads API"
source: https://partner.realestate.com.au/leads/overview/
fetched_at: 2026-04-17T03:52:22.608Z
---

# Leads API

The Leads API provides a reliable and supported channel for the supply of consumer enquiries from REA’s portals.

We understand the importance of leads to our customers and have developed the Leads API to ensure enquiries are delivered quickly and reliably.

### Real-time notifications with Webhooks

For real-time enquiry notifications, consider using the [Webhooks API](../webhooks/overview.md) to subscribe to `EnquiryCreated` events. This eliminates the need for polling and ensures you receive enquiries immediately as they arrive.

### Scope Required

`lead:enquiries:read`

### Included Data

-   **ID** - A unique REA identifier for the enquiry
-   **Agency ID** - Unique identifier for the agency to which the enquiry has been sent
-   **Enquiry Dates** - Date/time of receipt and processing
-   **Type** - The type of enquiry
-   **Comments** - Any comments entered by the enquirer or additional information about the enquiry
-   **Requested Information** - One or more pieces of information the enquirer would like to receive.
-   **Agent Recipients** - The individual agents/salespeople that should receive the enquiry.
-   **Supplied Market Status** - The current market status provided by the Consumer at the time of the enquiry.
-   **Listing** - The listing the consumer is enquiring about.
-   **Contact Details** - The contact details provided by the consumer.
-   **Source** - Metadata of where the enquiry is from, e.g campaign, listing details pages.
-   **External Identifiers** - The external identifiers of enquiry, which are set by CRM / customer during product setup.
-   **Custom Attributes** - A set of custom question and its answer related to this enquiry from consumer.

For a detailed list of fields and data available please see [Using Leads API](./usage.md#get-enquiries-submitted-to-your-customers) or [Explore the Leads API](./explore.md).

### Enquiry Types

Enquiry Type

Description

REALESTATE\_COM\_AU\_LISTING

General enquiry on any realestate.com.au Residential Listing

REALESTATE\_COM\_AU\_RENT

General enquiry on any realestate.com.au Rental Listing

REALESTATE\_COM\_AU\_AGENCY

General enquiry on the Find an agency experience on realestate.com.au

REALESTATE\_COM\_AU\_AGENT

General enquiry on the Find an agent experience on realestate.com.au

REALCOMMERCIAL\_COM\_AU\_BUY

General enquiry on any realcommercial.com.au Buy Listing

REALCOMMERCIAL\_COM\_AU\_FIND\_AGENCY

General enquiry on the Find an agency experience on realcommercial.com.au

REALCOMMERCIAL\_COM\_AU\_LEASE

General enquiry on any realcommercial.com.au Lease Listing

REALCOMMERCIAL\_COM\_AU\_BUY\_AND\_LEASE

General enquiry on any realcommercial.com.au Buy and Lease Listing

REALCOMMERCIAL\_COM\_AU\_DOCUMENT\_ACCESS

General enquiry to download documentation (pdf) for a Commercial listing

DEVELOPER\_PROJECT

General enquiry on a project profile

DEVELOPER\_PROJECT\_DOCUMENT\_DOWNLOAD

General enquiry to download a project’s documentation (pdf)

DEVELOPER\_BUILDER\_GENERAL

General enquiry on any realestate.com.au Builder Profile

DEVELOPER\_BUILDER\_DESIGN

General enquiry on a particular realestate.com.au Builder design

DEVELOPER\_BUILDER\_INFORMATION\_PACK

General enquiry about an information pack for a Builder design

DEVELOPER\_BUILDER\_PROMOTION

General enquiry about a promotion on the Builder design

DEVELOPER\_BUILDER\_DISPLAY\_VISIT

General enquiry about a visit to the Builder design

DEVELOPER\_INSPECTION\_REGISTRATION

General enquiry about an inspection registration of any project profile, its child listings and Builder/Developer listings

DEVELOPER\_EXTENSION\_CAMPAIGN

General enquiry for non-listing extension products such as Lead Capture Page, Sponsored Content, and Native Lead Ads for Developer customers

REALESTATE\_COM\_AU\_LEAD\_AD

Native Lead Ad enquiry for a project profile

REALESTATE\_COM\_AU\_SALES\_APPRAISAL\_REQUEST

Owner Lead enquiry sent to agent for sales appraisal request

REALESTATE\_COM\_AU\_RENTAL\_APPRAISAL\_REQUEST

Owner Lead enquiry sent to agent for rental appraisal request

REALESTATE\_COM\_AU\_AGENCY\_SALES\_APPRAISAL\_REQUEST

Owner Lead enquiry sent to agency for sales appraisal request

REALESTATE\_COM\_AU\_AGENCY\_RENTAL\_APPRAISAL\_REQUEST

Owner Lead enquiry sent to agency for rental appraisal request

### FAQ

**Can anyone access the Leads API?** The Leads API will only be made available to realestate.com.au customers, or to partners such as CRM providers whom a customer has authorised to have access on their behalf.

**Are all Enquiry types available via the LeadsAPI?** Leads API v1.0 includes all enquiries except Seller enquiries.

**How frequently is the data updated?** Enquiries are made available via the Leads API as soon as they are received & processed. We recommend a retrieval schedule of every 2 minutes.

**Can I receive real-time notifications for new enquiries?** Yes! You can subscribe to the `EnquiryCreated` webhook event to receive real-time notifications when enquiries are created. This eliminates the need for polling and reduces latency. See the [Webhooks API documentation](../webhooks/overview.md) to get started.

**What enquiry history is available?** A rolling 90 day window of enquiries will be made available via the Leads API.
