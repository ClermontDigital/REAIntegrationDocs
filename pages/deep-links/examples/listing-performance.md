---
title: "Listing Performance Deep Link"
source: https://partner.realestate.com.au/deep-links/examples/listing-performance/
fetched_at: 2026-04-17T03:51:41.439Z
---

# Listing Performance Deep Link

Ensure you include the `target="_blank"` attribute in your deep link to open it in a new tab.

-   [Web](#tab-panel-33)
-   [iOS (SwiftUI)](#tab-panel-34)
-   [Android (Kotlin)](#tab-panel-35)

```
<a href="https://ignite.realestate.com.au/listings-and-campaigns/listing/<listingId>/performance/" target="_blank">View Listing Performance in Ignite</a>
```

```
import SwiftUI
struct ListingPerformanceLink: View {    let listingId: String    var body: some View {        Link("View Listing Performance in Ignite", destination: URL(string: "https://ignite.realestate.com.au/listings-and-campaigns/listing/\(listingId)/performance/")!)    }}
```

```
import androidx.compose.runtime.Composableimport androidx.compose.ui.platform.LocalUriHandler
@Composablefun OpenListingPerformance(listingId: String) {    val uriHandler = LocalUriHandler.current    val uri = "https://ignite.realestate.com.au/listings-and-campaigns/listing/$listingId/performance/"    uriHandler.openUri(uri)}
```

What your customers will see:

![](https://partner.realestate.com.au/images/ignite/ignite-listing-performance.png)

## How to get the `listingId`

To make the request above, an REA `listingId` is required. When uploading a listing via the [Listing Upload API](../../../listing-upload/overview/), after the request is successfully processed, the [Listing Upload Reporting endpoint](../../../listing-upload/usage/#retrieve-a-listing-upload-report-by-agencyid-and-uniqueid) will include the REA `listingId` in the response.
