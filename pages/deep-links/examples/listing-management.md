---
title: "Listing Management Deep Link"
source: https://partner.realestate.com.au/deep-links/examples/listing-management/
fetched_at: 2026-04-17T03:51:39.402Z
---

# Listing Management Deep Link

Ensure you include the `target="_blank"` attribute in your deep link to open it in a new tab.

-   [Web](#tab-panel-30)
-   [iOS (SwiftUI)](#tab-panel-31)
-   [Android (Kotlin)](#tab-panel-32)

```
<a href="https://ignite.realestate.com.au/listings-and-campaigns/listing/<listingId>/manage/" target="_blank">View Listing Management in Ignite</a>
```

```
import SwiftUI
struct ListingManagementLink: View {    let listingId: String    var body: some View {        Link("View Listing Management in Ignite", destination: URL(string: "https://ignite.realestate.com.au/listings-and-campaigns/listing/\(listingId)/manage/")!)    }}
```

```
import androidx.compose.runtime.Composableimport androidx.compose.ui.platform.LocalUriHandler
@Composablefun OpenListingManagement(listingId: String) {    val uriHandler = LocalUriHandler.current    val uri = "https://ignite.realestate.com.au/listings-and-campaigns/listing/$listingId/manage/"    uriHandler.openUri(uri)}
```

What your customers will see:

![](https://partner.realestate.com.au/images/ignite/ignite-listing-manage.png)

## How to get the `listingId`

To make the request above, an REA `listingId` is required. When uploading a listing via the [Listing Upload API](../../../listing-upload/overview/), after the request is successfully processed, the [Listing Upload Reporting endpoint](../../../listing-upload/usage/#retrieve-a-listing-upload-report-by-agencyid-and-uniqueid) will include the REA `listingId` in the response.
