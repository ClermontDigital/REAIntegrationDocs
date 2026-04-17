---
title: "Changelog"
source: https://partner.realestate.com.au/leads/changelog/
fetched_at: 2026-04-17T03:52:16.235Z
---

# Changelog

## 1.1.8 / 2026-04-01

-   Add a new type `REALCOMMERCIAL_COM_AU_DOCUMENT_ACCESS` for commercial customers

## 1.1.7 / 2026-01-30

-   Support for real-time lead notifications via [Webhooks API](../webhooks/overview.md) `EnquiryCreated` events. Subscribe to receive instant notifications when enquiries are created, eliminating the need for polling.

## 1.1.6 / 2026-01-27

-   Add new object fields: `customAttributes`
-   Add new type `DEVELOPER_EXTENSION_CAMPAIGN` for developer customers
-   Deprecate `listing.externalListingId` and show it in `externalIdentifiers.externalListingId` instead

## 1.1.5 / 2025-12-01

-   Add a new type `DEVELOPER_INSPECTION_REGISTRATION` for developer customers
-   Add a new `Source` object field in response payload
-   Add a new `externalIdentifiers.externalProjectId` field in response payload

## 1.1.4 / 2024-02-12

-   Add `/v2/seller-leads` endpoint to Leads API
-   Add `/v2/seller-leads/{enquiry_id}` endpoint to Leads API
-   Add [migtraion guide](../migration-guide/) for transition from `/v1/enquiries` endpoints to `/v2/seller-leads` endpoints

## 1.1.3 / 2023-12-09

-   Add new types `REALESTATE_COM_AU_AGENCY_SALES_APPRAISAL_REQUEST` and `REALESTATE_COM_AU_AGENCY_RENTAL_APPRAISAL_REQUEST`.

## 1.1.2 / 2023-11-30

-   Add a new field `postcode` in `contactDetails` in response payload.

## 1.1.1 / 2023-04-11

-   Add new types `REALESTATE_COM_AU_SALES_APPRAISAL_REQUEST` and `REALESTATE_COM_AU_RENTAL_APPRAISAL_REQUEST`.

## 1.0.0 / 2022-03-30

-   Add new Native Lead Ad lead type to Leads API. Retrieved leads of this type will have a `type` of `REALESTATE_COM_AU_LEAD_AD`.
