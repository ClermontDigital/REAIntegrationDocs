---
title: "Explore Subscriptions Deep Link"
source: https://partner.realestate.com.au/deep-links/examples/explore-subscriptions/
fetched_at: 2026-04-17T03:51:35.569Z
---

# Explore Subscriptions Deep Link

Ensure you include the `target="_blank"` attribute in your deep link to open it in a new tab.

-   [Web](#tab-panel-24)
-   [iOS (SwiftUI)](#tab-panel-25)
-   [Android (Kotlin)](#tab-panel-26)

```
<a href="https://ignite.realestate.com.au/manage/subscription-and-listing-contract/<agencyId>/explore-subscriptions" target="_blank">Explore Subscriptions in Ignite</a>
```

```
import SwiftUI
struct ExploreSubscriptionsLink: View {    let agencyId: String    var body: some View {        Link("Explore Subscriptions in Ignite", destination: URL(string: "https://ignite.realestate.com.au/manage/subscription-and-listing-contract/\(agencyId)/explore-subscriptions")!)    }}
```

```
import androidx.compose.runtime.Composableimport androidx.compose.ui.platform.LocalUriHandler
@Composablefun OpenExploreSubscriptions(agencyId: String) {    val uriHandler = LocalUriHandler.current    val uri = "https://ignite.realestate.com.au/manage/subscription-and-listing-contract/$agencyId/explore-subscriptions"    uriHandler.openUri(uri)}
```

What your customers will see:

![Ignite subscriptions and listing contract](https://partner.realestate.com.au/images/ignite/ignite-explore-subscriptions.png)
