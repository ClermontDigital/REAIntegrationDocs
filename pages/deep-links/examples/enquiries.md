---
title: "Enquiries Deep Link"
source: https://partner.realestate.com.au/deep-links/examples/enquiries/
fetched_at: 2026-04-17T03:51:33.629Z
---

# Enquiries Deep Link

Ensure you include the `target="_blank"` attribute in your deep link to open it in a new tab.

-   [Web](#tab-panel-15)
-   [iOS (SwiftUI)](#tab-panel-16)
-   [Android (Kotlin)](#tab-panel-17)

```
<a href="https://ignite.realestate.com.au/listings-and-campaigns/listing/<listingId>/enquiries" target="_blank">View Enquiries for Listing in Ignite</a>
```

```
import SwiftUI
struct EnquiriesLink: View {    let listingId: String    var body: some View {        Link("View Enquiries for Listing in Ignite", destination: URL(string: "https://ignite.realestate.com.au/listings-and-campaigns/listing/\(listingId)/enquiries")!)    }}
```

```
import androidx.compose.runtime.Composableimport androidx.compose.ui.platform.LocalUriHandler
@Composablefun OpenEnquiries(listingId: String) {    val uriHandler = LocalUriHandler.current    val uri = "https://ignite.realestate.com.au/listings-and-campaigns/listing/$listingId/enquiries"    uriHandler.openUri(uri)}
```

## How to get the `listingId`

Listing uploaders can get the REA `listingId` when uploading a listing via the [Listing Upload API](../../../listing-upload/overview/). After the request is successfully processed, the [Listing Upload Reporting endpoint](../../../listing-upload/usage/#retrieve-a-listing-upload-report-by-agencyid-and-uniqueid) will include the REA `listingId` in the response.

## Non-listing uploaders

For seller leads:

-   [Web](#tab-panel-18)
-   [iOS (SwiftUI)](#tab-panel-19)
-   [Android (Kotlin)](#tab-panel-20)

```
<a href="https://ignite.realestate.com.au/inbox/leads" target="_blank">View Seller Leads Inbox in Ignite</a>
```

```
import SwiftUI
struct SellerLeadsLink: View {    var body: some View {        Link("View Seller Leads Inbox in Ignite", destination: URL(string: "https://ignite.realestate.com.au/inbox/leads")!)    }}
```

```
import androidx.compose.runtime.Composableimport androidx.compose.ui.platform.LocalUriHandler
@Composablefun OpenSellerLeads() {    val uriHandler = LocalUriHandler.current    val uri = "https://ignite.realestate.com.au/inbox/leads"    uriHandler.openUri(uri)}
```

For buyer enquiries:

-   [Web](#tab-panel-21)
-   [iOS (SwiftUI)](#tab-panel-22)
-   [Android (Kotlin)](#tab-panel-23)

```
<a href="https://ignite.realestate.com.au/inbox/enquiries" target="_blank">View Buyer Enquiries Inbox in Ignite</a>
```

```
import SwiftUI
struct BuyerEnquiriesLink: View {    var body: some View {        Link("View Buyer Enquiries Inbox in Ignite", destination: URL(string: "https://ignite.realestate.com.au/inbox/enquiries")!)    }}
```

```
import androidx.compose.runtime.Composableimport androidx.compose.ui.platform.LocalUriHandler
@Composablefun OpenBuyerEnquiries() {    val uriHandler = LocalUriHandler.current    val uri = "https://ignite.realestate.com.au/inbox/enquiries"    uriHandler.openUri(uri)}
```

What your customers will see:

![Ignite enquiries inbox](https://partner.realestate.com.au/images/ignite/ignite-enquiries-inbox.png)
