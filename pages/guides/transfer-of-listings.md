---
title: "Transfer of Listing process for CRM/Partners"
source: https://partner.realestate.com.au/guides/transfer-of-listings/
fetched_at: 2026-04-17T03:51:59.460Z
---

# Transfer of Listing process for CRM/Partners

This guide explains what **CRM/Partners** need to do when REA Support asks you to complete a **Transfer of Listings**.

Within a Transfer of Listings there are usually **two separate CRMs/partners** involved:

-   The **FROM agency CRM** – CRM used by the agency **the listings are being transferred _from_**
-   The **TO agency CRM** – CRM used by the agency **the listings are being transferred _to_**

This guide covers:

-   What you receive from REA Support
-   What the **FROM agency CRM** must do (delete/hide/disable listings)
-   What the **TO agency CRM** must do (copy listings into their CRM)
-   How to retrieve listings using the **Listing Export API** (TO agency CRM)
-   How to store listings safely in the TO agency CRM
-   Why the TO agency CRM must preserve the REAXML elements [<agentID>](../listing-upload/elements.md#agentid) and [<uniqueID>](../listing-upload/elements.md#uniqueid)
-   How to confirm completion back to REA

It aligns with REA’s official **“Transfer of Listings and/or Agent”** process described in the help centre:  
[How to transfer listings between agencies](https://help.realestate.com.au/hc/en-us/articles/115002014863-How-to-transfer-listings-between-agencies#h_01K05NDP50SHKM1CA7BX2VRJ36).

* * *

## 1\. High‑Level Flow

At a high level, a Transfer of Listings works like this:

1.  **Customer (agency)** submits a Transfer of Listings request via REA’s **Transfer Of Listings and/or Agent** form:  
    [Transfer Of Listings and/or Agent form](https://help.realestate.com.au/hc/en-us/requests/new?ticket_form_id=46305321153305).
    
2.  **REA Support** reviews the request, obtains approvals from the agencies, and if approved:
    
    -   Emails the **FROM agency** and **TO agency**, and any relevant CRMs/partners, with instructions and filters.
    -   Enables the **TO agency CRM** to use the **Listing Export API** for the relevant agencies and scope.
3.  **TO agency CRM** (agency receiving the listings):
    
    -   Exports the required listings using the Listing Export API.
    -   Saves them into the TO agency’s CRM.
    -   Preserves REAXML `<agentID>` and `<uniqueID>` values exactly.
    -   Confirms completion back to REA Support.
4.  **FROM agency CRM** (agency giving up the listings):
    
    -   Deletes, hides, or otherwise **disables** the transferred listings in the FROM agency’s CRM.
    -   Ensures those listings are **no longer sent to REA** (e.g. stops updating or re‑uploading them).
5.  The **customer (TO agency)** then manages those transferred listings **only in the TO agency CRM** going forward (not in the FROM agency CRM) to avoid duplicates and billing errors.
    

The remainder of this guide focuses on both CRM roles:

-   Sections **2–3** – background and what you receive from REA
-   Section **4.1–4.2** – **TO agency CRM** responsibilities
-   Section **4.3** – **FROM agency CRM** responsibilities
-   Sections **5–7** – shared error‑handling and checklists

* * *

## 2\. How the Transfer Is Initiated (Context Only)

This section is background only — **neither CRM** performs these steps, but it explains why you are contacted.

Transfers are typically required for business changes like **agency mergers/splits** or when an **agent moves agencies with their listings**.

The customer must:

-   Gather required information and submit the **Transfer Of Listings and/or Agent** form:  
    [Submit transfer request](https://help.realestate.com.au/hc/en-us/requests/new?ticket_form_id=46305321153305).
-   Identify which listings to move (e.g. 5 specific listings, more than 5 via CSV, listings for a specific agent, or entire stock sets).
-   Provide the six‑letter **Agency ID** for both the “from” and “to” agencies — these correspond directly to REAXML `<agentID>` values.

REA then collects written approvals from both agency principals / authorised users before starting the transfer.

* * *

## 3\. What You Receive from REA Support

Once the request has been approved internally, **REA Support** will email:

-   The **FROM agency** and/or their CRM/partner
-   The **TO agency** and/or their CRM/partner

In that email, you can expect:

-   One or more REA **`agency_id`** values (6‑character codes) indicating which accounts are involved.
-   Instructions such as **“all current \[listing\_types\]”**, **“all Active/Sold listings”**, etc. , or specific **`listing_id`** values (REA property IDs) if only some listings are being moved
-   Confirmation that the **TO agency CRM** has (or will have) the necessary **Listing Export API** permissions for the specified agencies and listing scope.
-   An explicit request that:
    -   The **TO agency CRM** transfers/copies the listings into the TO agency’s CRM.
    -   The **FROM agency CRM** delete/hide/disable’s the listings.

From this point forward:

-   The **TO agency CRM** is responsible for:
    
    -   Retrieving the listings via the **Listing Export API**
    -   Storing them correctly in the TO agency CRM
    -   Confirming back to REA Support when done
-   The **FROM agency CRM** is responsible for:
    
    -   Removing or disabling the transferred listings in the FROM agency CRM
    -   Ensuring those listings are no longer sent to REA

* * *

## 4\. Your Responsibilities as a CRM/Partner

### 4.1 TO agency CRM

#### 4.1.1 Using the filters REA Support provides

As the **TO agency CRM**, you will use the **Listing Export API** to obtain a copy of the listings that REA has approved for transfer:

-   [Listing Export API – Usage](../listing-export/usage.md)

Depending on REA’s email, you may need to filter by:

**Agency**

```
GET https://api.realestate.com.au/listing/v1/export?agency_id=AAAAAA
```

**Specific listing IDs (REA listing IDs)**

```
GET https://api.realestate.com.au/listing/v1/export?listing_id=123948576
```

**Listing types and/or status**

-   `listing_types` — comma‑separated set of listing types, e.g. `residential,rental,commercial`.
-   `status` — comma‑separated set of statuses, e.g. `current,offmarket,sold,leased`.

**Example**

```
GET https://api.realestate.com.au/listing/v1/export?agency_id=AAAAAA&listing_types=residential,commercial&status=current
```

Match these filters **exactly** to what REA Support has requested to ensure you only transfer the intended stock.

#### 4.1.2 Pagination

The Listing Export API is **paginated**. For details on how pagination works (including use of the `x-next-link` response header and page size limits), refer to the [official docs](../listing-export/usage.md#pagination)

#### 4.1.3 Simple “export by agency with filters” example (curl)

Terminal window

```
curl --location \  --request GET 'https://api.realestate.com.au/listing/v1/export?agency_id=AAAAAA&listing_types=residential,rental&status=current' \  --header 'Authorization: Bearer <access_token>'
```

You’ll receive REAXML, for example:

```
<?xml version="1.0" encoding="UTF-8"?><propertyList>  <residential modTime="2020-05-20T10:23:43" status="sold">    ...  </residential></propertyList>
```

* * *

#### 4.1.4 Save listings and preserve keys

Once you (the **TO agency CRM**) have exported the listings:

-   Parse the **REAXML** returned from each Listing Export API response.
    
-   For each listing, **create or update** the record in the TO agency’s CRM.
    
-   Critically, **do not change** two key elements:
    
    -   [`<uniqueID>`](../listing-upload/elements.md#uniqueid) – a provider‑supplied string that uniquely identifies a listing for a given agent/agency.
    -   [`<agentID>`](../listing-upload/elements.md#agentid) – the six‑character REA account code for the agency.

Together, `<agentID>` + `<uniqueID>` act as a **composite key** for the listing in REA systems.

If you change either of these values:

-   REA will treat this as a **new listing**, not the transferred one.
-   This can create **duplicate listings**.
-   The customer can be **billed twice** for what is effectively the same property — REA’s help content explicitly warns that customer‑side moves or re‑uploads can cause duplicate listings and billing errors.

#### 4.1.5 Recommended storage pattern (TO agency CRM)

When you ingest each listing:

-   **Store:**
    -   The exact `<uniqueID>` from REAXML.
    -   The exact `<agentID>` value for the agency.
    -   The REA listing ID (if present and useful for diagnostics).
    -   All other listing attributes required for your product (address, price, media, etc.).
-   Use your own **internal primary key**, but **do not overwrite or regenerate** `<uniqueID>` for REA; treat it as the external key.
-   Going forward, when you later integrate via upload mechanisms, keep using the **same** `<agentID>` and `<uniqueID>` for each transferred listing.

* * *

### 4.3 FROM agency CRM

As the **FROM agency CRM**, once REA Support has confirmed the transfer has been processed and the TO agency/CRM has taken over:

-   **Delete, hide, or disable** the transferred listings in the FROM agency’s CRM.
-   Ensure those listings are **no longer sent to REA**, for example by:
    -   Stopping uploads/feeds for those listings.
    -   Marking them as transferred/archived so they are excluded from any future exports or updates.

This supports REA’s guidance that customers and CRMs must **not** move listings or re‑upload them as new, as that can cause duplicates and billing errors.

> **Important:** After a transfer, the **TO agency CRM becomes the sole source of truth** for the transferred listings. The FROM agency CRM must not continue to publish or update these listings to REA.

* * *

* * *

### 4.4 Notify REA support once completed

Once you have completed your required tasks, reply back to the email from REA support informing them you have completed your section. Also inform them if something has gone wrong or there is further to discuss for this transfer.

## 5\. Relation to the Listing Upload API (After Transfer)

This document is about **transferring** listings using **Listing Export**. After the transfer:

-   The **TO agency CRM’s** normal day‑to‑day integration may create/update/delete listings using the **Listing Upload API**, which accepts REAXML uploads of single listings per request and returns an `uploadId` for status tracking:
    -   [Listing Upload API – Overview](../listing-upload/overview.md)
-   When the TO agency CRM starts uploading or updating transferred listings via its usual integration:
    -   Continue to use the same `<agentID>` and `<uniqueID>` combination for each listing.
    -   Treat these as **immutable keys** for the life of that listing in REA systems.

The **FROM agency CRM** should **not** use the Listing Upload API for these transferred listings after the transfer is complete.

This preserves listing history and billing continuity and avoids duplicates.

* * *

## 6\. Quick Checklists for CRM/Partners

### 6.1 TO agency CRM checklist

Use this checklist when actioning a Transfer of Listings request as the **TO agency CRM**:

1.  **Read the REA Support email**
    
    -   Note `agency_id`(s), any `listing_id` lists, listing types, and other filters.
2.  **Call the Listing Export API**
    
    -   Use the requested filters.
    -   Follow pagination as described in the dev docs:  
        [Listing Export API – Pagination](../listing-export/usage.md#pagination).
3.  **Store listings in your system**
    
    -   Parse REAXML.
    -   Preserve `<agentID>` and `<uniqueID>` exactly.
4.  **Sanity‑check**
    
    -   Confirm listing counts and scopes line up with REA’s instructions.
5.  **Reply to REA Support**
    
    -   Confirm that the transfer has been completed in your system (for the TO agency).
6.  **Operational follow‑up**
    
    -   Ensure the customer now manages those transferred listings only in your CRM.
    -   Use the same `<agentID>` + `<uniqueID>` keys for subsequent uploads and updates.

### 6.2 FROM agency CRM checklist

Use this checklist when actioning a Transfer of Listings request as the **FROM agency CRM**:

1.  **Read the REA Support email**
    
    -   Confirm which listings (by `listing_id`, listing types, etc.) are being transferred away.
2.  **Identify impacted listings in your CRM**
    
    -   Locate all listings in scope of the transfer.
3.  **Delete/hide/disable listings**
    
    -   Remove or disable those listings in your CRM so they are no longer active for the FROM agency.
4.  **Stop sending those listings to REA**
    
    -   Ensure your feeds/uploads **exclude** the transferred listings going forward.
5.  **Sanity‑check**
    
    -   Verify that no transferred listings are still being exported or updated to REA.

Following these responsibilities on both sides keeps the official **Transfer of Listings** workflow intact while ensuring your implementation is safe, predictable, and billing‑correct for customers.
