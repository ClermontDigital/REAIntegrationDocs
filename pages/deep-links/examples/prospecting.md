---
title: "Prospecting Deep Link"
source: https://partner.realestate.com.au/deep-links/examples/prospecting/
fetched_at: 2026-04-17T03:51:44.882Z
---

# Prospecting Deep Link

Ensure you include the `target="_blank"` attribute in your deep link to open it in a new tab.

-   [Web](#tab-panel-36)
-   [iOS (SwiftUI)](#tab-panel-37)
-   [Android (Kotlin)](#tab-panel-38)

```
<a href="https://ignite.realestate.com.au/prospecting/reports/cma" target="_blank">View CMA Reports in Ignite</a>
```

```
import SwiftUI
struct ProspectingLink: View {    private let path = "https://ignite.realestate.com.au/prospecting/reports/cma"    var body: some View {        Link("View CMA Reports in Ignite", destination: URL(string: path)!)    }}
```

```
import androidx.compose.runtime.Composableimport androidx.compose.ui.platform.LocalUriHandler
@Composablefun OpenProspecting() {    val uriHandler = LocalUriHandler.current    val uri = "https://ignite.realestate.com.au/prospecting/reports/cma"    uriHandler.openUri(uri)}
```

What your customers will see:

![Ignite CMA reports](https://partner.realestate.com.au/images/ignite/ignite-prospecting-cma.png)
