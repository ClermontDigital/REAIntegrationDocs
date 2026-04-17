---
title: "Agency Insights Deep Links"
source: https://partner.realestate.com.au/deep-links/examples/agency-insights/
fetched_at: 2026-04-17T03:51:31.344Z
---

# Agency Insights Deep Links

Ensure you include the `target="_blank"` attribute in your deep links to open them in a new tab.

## Branding Insights

-   [Web](#tab-panel-0)
-   [iOS (SwiftUI)](#tab-panel-1)
-   [Android (Kotlin)](#tab-panel-2)

```
<a href="https://ignite.realestate.com.au/insights/agency-dashboard/branding-insights" target="_blank">View Branding Insights in Ignite</a>
```

```
import SwiftUI
struct BrandingInsightsLink: View {    var body: some View {    Link("View Branding Insights in Ignite", destination: URL(string: "https://ignite.realestate.com.au/insights/agency-dashboard/branding-insights")!)    }}
```

```
import androidx.compose.runtime.Composableimport androidx.compose.ui.platform.LocalUriHandler
@Composablefun OpenBrandingInsights() {    val uriHandler = LocalUriHandler.current    val uri = "https://ignite.realestate.com.au/insights/agency-dashboard/branding-insights"    uriHandler.openUri(uri)}
```

## Lead Insights - Residential

-   [Web](#tab-panel-3)
-   [iOS (SwiftUI)](#tab-panel-4)
-   [Android (Kotlin)](#tab-panel-5)

```
<a href="https://ignite.realestate.com.au/insights/agency-dashboard/lead-insights/residential" target="_blank">View Residential Lead Insights in Ignite</a>
```

```
import SwiftUI
struct ResidentialLeadInsightsLink: View {    var body: some View {        Link("View Residential Lead Insights in Ignite", destination: URL(string: "https://ignite.realestate.com.au/insights/agency-dashboard/lead-insights/residential")!)    }}
```

```
import androidx.compose.runtime.Composableimport androidx.compose.ui.platform.LocalUriHandler
@Composablefun OpenResidentialLeadInsights() {    val uriHandler = LocalUriHandler.current    val uri = "https://ignite.realestate.com.au/insights/agency-dashboard/lead-insights/residential"    uriHandler.openUri(uri)}
```

What your customers will see:

![Ignite Residential Insights](https://partner.realestate.com.au/images/ignite/ignite-insights-residential.png)

## Lead Insights - Commercial

-   [Web](#tab-panel-6)
-   [iOS (SwiftUI)](#tab-panel-7)
-   [Android (Kotlin)](#tab-panel-8)

```
<a href="https://ignite.realestate.com.au/insights/agency-dashboard/lead-insights/commercial" target="_blank">View Commercial Lead Insights in Ignite</a>
```

```
import SwiftUI
struct CommercialLeadInsightsLink: View {    var body: some View {        Link("View Commercial Lead Insights in Ignite", destination: URL(string: "https://ignite.realestate.com.au/insights/agency-dashboard/lead-insights/commercial")!)    }}
```

```
import androidx.compose.runtime.Composableimport androidx.compose.ui.platform.LocalUriHandler
@Composablefun OpenCommercialLeadInsights() {    val uriHandler = LocalUriHandler.current    val uri = "https://ignite.realestate.com.au/insights/agency-dashboard/lead-insights/commercial"    uriHandler.openUri(uri)}
```

## Performance - Residential

-   [Web](#tab-panel-9)
-   [iOS (SwiftUI)](#tab-panel-10)
-   [Android (Kotlin)](#tab-panel-11)

```
<a href="https://ignite.realestate.com.au/insights/agency-dashboard/performance/residential" target="_blank">View Residential Performance in Ignite</a>
```

```
import SwiftUI
struct ResidentialPerformanceLink: View {    var body: some View {        Link("View Residential Performance in Ignite", destination: URL(string: "https://ignite.realestate.com.au/insights/agency-dashboard/performance/residential")!)    }}
```

```
import androidx.compose.runtime.Composableimport androidx.compose.ui.platform.LocalUriHandler
@Composablefun OpenResidentialPerformance() {    val uriHandler = LocalUriHandler.current    val uri = "https://ignite.realestate.com.au/insights/agency-dashboard/performance/residential"    uriHandler.openUri(uri)}
```

## Performance - Residential Audience Maximiser

-   [Web](#tab-panel-12)
-   [iOS (SwiftUI)](#tab-panel-13)
-   [Android (Kotlin)](#tab-panel-14)

```
<a href="https://ignite.realestate.com.au/insights/agency-dashboard/performance/residential/audience-maximiser" target="_blank">View Residential Audience Maximiser Performance in Ignite</a>
```

```
import SwiftUI
struct ResidentialAudienceMaximiserPerformanceLink: View {    var body: some View {        Link("View Residential Audience Maximiser Performance in Ignite", destination: URL(string: "https://ignite.realestate.com.au/insights/agency-dashboard/performance/residential/audience-maximiser")!)    }}
```

```
import androidx.compose.runtime.Composableimport androidx.compose.ui.platform.LocalUriHandler
@Composablefun OpenResidentialAudienceMaximiserPerformance() {    val uriHandler = LocalUriHandler.current    val uri = "https://ignite.realestate.com.au/insights/agency-dashboard/performance/residential/audience-maximiser"    uriHandler.openUri(uri)}
```

What your customers will see:

![Ignite Audience Maximiser](https://partner.realestate.com.au/images/ignite/ignite-audience-maximiser.png)
