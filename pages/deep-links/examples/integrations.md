---
title: "Integrations Deep Link"
source: https://partner.realestate.com.au/deep-links/examples/integrations/
fetched_at: 2026-04-17T03:51:37.597Z
---

# Integrations Deep Link

Ensure you include the `target="_blank"` attribute in your deep link to open it in a new tab.

-   [Web](#tab-panel-27)
-   [iOS (SwiftUI)](#tab-panel-28)
-   [Android (Kotlin)](#tab-panel-29)

```
<a href="https://ignite.realestate.com.au/manage/data-and-integrations?agencyId=<agencyId>" target="_blank">Manage Integrations in Ignite</a>
```

```
import SwiftUI
struct IntegrationsLink: View {    let agencyId: String    var body: some View {        Link("Manage Integrations in Ignite", destination: URL(string: "https://ignite.realestate.com.au/manage/data-and-integrations?agencyId=\(agencyId)")!)    }}
```

```
import androidx.compose.runtime.Composableimport androidx.compose.ui.platform.LocalUriHandler
@Composablefun OpenIntegrations(agencyId: String) {    val uriHandler = LocalUriHandler.current    val uri = "https://ignite.realestate.com.au/manage/data-and-integrations?agencyId=$agencyId"    uriHandler.openUri(uri)}
```

What your customers will see:

![Ignite Data and integrations page](https://partner.realestate.com.au/images/ignite/ignite-data-and-integrations.png)

## How to get the `agencyId`

The `agencyId` is a six letter code (e.g. `ABCDEF`). If the customer does not provide this at set up with your application, the `agencyId` parameter can be omitted from the deep link URL and the user will be taken to a page where they can select the relevant agency.
