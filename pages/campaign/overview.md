---
title: "Campaign API"
source: https://partner.realestate.com.au/campaign/overview/
fetched_at: 2026-04-17T03:51:01.601Z
---

# Campaign API

The Campaign API allows authenticated partners and customers of REA Group to access property campaign reports and performance metrics for listings advertised on realestate.com.au and realcommercial.com.au. Distinct endpoints are used per listing type, to access campaign data.

-   [Listing Performance](./listing-performance/usage.md) - used for the typical use case of retrieving metrics for individual listings advertised on realestate.com.au or realcommercial.com.au
-   [Project Performance](./project-performance/usage.md) - new condensed format, used for retrieving metrics for a collection of listings advertised under a single project profile, typical use case would be for multi apartment sales.
-   [Display Performance](./display-performance/usage.md) - used for retrieving metrics for developer display campaigns.
-   [eDM Performance](./edm-performance/usage.md) - used for retrieving metrics for developer eDM campaigns.

### Scope Required

`campaign:project-performance:read`

`campaign:listing-performance:read`

### Included Data for Listing Performance

-   **ID** - unique identifier of the listing in REA systems
-   **Agency ID** - unique identifier for the agency who has advertised the listing
-   **External Listing ID** - unique identifier of the listing provided by the customer agency or CRM partner
-   **Views & Engagements** - metrics for a listing from user views or engagements on realestate.com.au or realcommercial.com.au websites and apps within the specified reporting periods. Engagement events are broken down into categories such as page views, email enquiries, phone number reveals, photo carousel clicks, etc.

For a detailed list of fields and data available, please see [Listing Performance](./listing-performance/usage.md) or [Explore the Listing Performance Campaign API](./listing-performance/explore.md).

### Included Data for Project Performance

-   **ID** - unique identifier of the project performance report in REA systems (same as the project id)
-   **Project Name** - name of the specific project
-   **Project Agency ID** - unique identifier representing the project agency
-   **Total Project Performance** - view and engagement metrics for the whole project profile: Project Page Performance + Total Project Listings Performance
-   **Project Page Performance** - view and engagement metrics for the project page
-   **Total Project Listings Performance** - view and engagement metrics for all project listings: aggregated total of Project Listings Performance
-   **Project Listings Performance** - collection of child listings that belong to the project profile. Each listing will have similar fields to the listing performance endpoint, such as ID, Agency ID and External Listing ID. View and engagement metrics for each listing is also included.
-   **Views & Engagements** - (these are part of the above 4 entities). Metrics for a listing or project page from user views or engagements on realestate.com.au websites and apps within the specified reporting periods. Engagement events are broken down into categories such as page views, email enquiries, phone number reveals, photo carousel clicks, etc.

For a detailed list of fields and data available, please see [Project Performance](./project-performance/usage.md) or [Explore the Project Performance Campaign API](./project-performance/explore.md).

### Historical Periods

The campaign data is aggregated at different historical levels:

Level

Description

Listing Performance

Project Performance

**All**

Total performance metrics for the whole reporting period

from 1 Oct 2018 for realestate.com.au listings, from 26 Oct 2020 for realcommercial.com.au listings

from 1 Jan 2015

**Daily**

Daily performance metrics, totalled by calendar date

from 1 Oct 2018 for realestate.com.au listings, from 26 Oct 2020 for realcommercial.com.au listings

all metrics, maximum of 90 days history

**Monthly**

Monthly listing performance metrics, totalled by calendar month

not available

all metrics

### Payload Compression

From version `1.2.9`, we have introduced a new capability of supporting payload compression. This capability is opt-in for clients, hence backward-compatible. If a client needs to have response payload compressed, it needs to include the following HTTP request header:

```
Accept-Encoding: gzip
```

When campaign-api detects this header, it will compress the payload accordingly. Otherwise, the payload will be sent out as is. In case of compression, campaign-api will include the following HTTP response header:

```
Content-Encoding: gzip
```

Clients can introduce payload decompression logic in a generic way, without having to maintain the status of whether a request has been made with compression. In particular, as long as clients detect above response header, they can decompress the payload and pass it on to the normal processing logic.

### FAQ

**Can anyone access campaign reports?** Campaign reports will only be made available to customers for their own agencies’ listings, or to partners such as CRM providers whom a customer has authorised to have access on their behalf.

**Are campaign reports available for all listings advertised on realestate.com.au?** All listings currently live on the Buy and Rent sections of realestate.com.au website and apps are available. This also extends to listings that were previously available on the Buy and Rent sections of realestate.com.au website and apps that have been removed from realestate.com.au.

**Are campaign reports available for all listings advertised on realcommercial.com.au?** All listings currently live on the Buy and Rent sections of realcommercial.com.au website and apps are available. This also extends to listings that were previously available on the Buy and Rent sections of realcommercial.com.au website and apps that have been removed from realcommercial.com.au, only if they were removed after 3 Jan 2023. Listings removed prior to 3 Jan 2023 will not be available.

**How frequently is the data updated?** Daily.

**For what time period is data available?** Campaign reports are generated daily for all listings currently live on the Buy and Rent sections of the realestate.com.au and realcommercial.com.au websites and apps. Performance metrics are included from as early as October 1st 2018 for residential listings and October 26th 2020 for commercial listings. For our listing Performance endpoint, once a property has been sold, leased or taken offsite it will be accessible using the [listing-performance by listing-id endpoint](./listing-performance/usage.md#get-listing-performance-report-by-listing-id). For commercial listings, this only applies to properties that have been sold, leased or taken offsite after January 3rd 2023. For our Project Performance endpoint data is not removed.
