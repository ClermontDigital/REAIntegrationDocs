---
title: "Changelog"
source: https://partner.realestate.com.au/changelog/
fetched_at: 2026-04-17T03:51:09.479Z
---

# Changelog

## 2026-02-03

### Added

-   Integration change events have been added to the [Webhooks API](./webhooks/overview.md), allowing you to receive real-time notifications when integrations are created, updated, or deleted. Subscribe to `IntegrationCreated`, `IntegrationUpdated`, and `IntegrationDeleted` events to stay informed about changes to your integrations.

## 2026-01-30

### Added

-   Lead events have been added to the [Webhooks API](./webhooks/overview.md), allowing you to receive real-time notifications when enquiries are created for listings or agencies. Subscribe to `EnquiryCreated` events to stay informed about new leads.

## 2025-11-05

### Added

-   Deeplinks into Ignite has been released allowing you to quickly and easily help agents move from your system, into [REA’s customer platform Ignite](https://customer.realestate.com.au/residential/ignite/), complete the task they need to do, and move onto the next thing. Deeplinks are free, easy to set up and a huge time save for agents. To learn more see the [Deeplinks section](./deep-links/what-are-deep-links.md)

## 2025-07-25

### Added

-   Self-service permissions released in Ignite. Customers have the tools to manage their own integration set-ups, allowing them to onboard to their CRM in minutes, instead of days. A guide to how to set up data integrations in Ignite is [here](https://help.realestate.com.au/hc/en-us/articles/48886865648665-A-guide-to-data-integrations-in-Ignite#a-guide-to-data-integrations-in-ignite-0-0). The web-form will remain in place for the time being and is available for any complex integration set-ups or if a customer is having problems using the self-self feature in Ignite.

## 2024-10-03

### Changed

-   All NSW rental listings will use a single price field will now be used to power both the search and display price. The “display” field in [Listing Upload API](./listing-upload/elements.md) will be obsolete for NSW rental listings. Future segmented rollouts to other states is being considered.

## 2024-07-01

### Removed

-   Retirement of REA FTP for all listing exports. The FTP exports have been superseded by the [Listing Exports API](../../listing-export/overview/) which will provide you listings data with better accuracy, increased flexibility and at no cost to the customer (For “Change of uploader” requests when using the API).

## 2024-05-15

### Changed

-   [Pricing API](../../pricing/overview/) has updated pricings to reflect pricing changes. This includes Lower Valued Assets (LVA) changes and a new product, Luxe. Luxe is a high-performance digital marketing solution for top properties on realestate.com.au.

## 2024-03-01

### Changed

-   The new Audience Maximiser campaigns will be click-based instead of impression-based. Impressions will not be reported (Campaign Performance API will return 0), and a new purchaseType field will indicate campaign type. The possible values for the purchaseType field can be found [here](./campaign/listing-performance/usage.md).

## 2024-02-21

### Added

-   [Leads API](../../leads/overview/) endpoint has transitioned from `/v1/enquires` to `/v2-seller-leads` ([migration guide](../../leads/migration-guide/)). The new endpoint provides additional data that exposes all the different seller leads that our system captures.

## 2024-01-01

### Changed

-   REA automatically updates listing status when detected as under offer, under contract (buy), or deposit taken (rent), improving search accuracy. Listing uploaders may be contacted by customers if their listing appears differently; direct them to this [REA Help Article](https://help.realestate.com.au/hc/en-us/articles/26653943589017-How-Listing-Status-Correction-works).

## 2023-12-21

### Added

-   [Ratings & Reviews API](../../ratings-reviews/overview/) is live. This means your customers can start consuming and showcasing their realestate.com.au reviews on their own websites.

## Changelogs per API

-   There are changelogs for individual APIs in their respective directories. For example, the [Listing Upload API changelog](../../listing-upload/changelog/) details changes specific to that API.
