---
title: "Integrations API"
source: https://partner.realestate.com.au/integrations/overview/
fetched_at: 2026-04-17T03:52:06.609Z
---

# Integrations API

The Integrations API provides access to information about the delegations between your partner account and resource owners (such as agencies). An Integration represents the authorization relationship and the scopes that have been granted to your application by a resource owner.

This API enables you to:

-   List all integrations for your API consumer account
-   Retrieve detailed information about specific integrations
-   Filter integrations by their update timestamp
-   Monitor which resource owners have authorized your application and what permissions they’ve granted

### Scope Required

None. The Integrations API is accessible to authorized API consumers without additional scopes.

### Included Data

-   **Integration ID** - A unique identifier for the integration (UUID format)
-   **Updated At** - ISO 8601 formatted timestamp of when the integration was last updated
-   **Owner ID** - A human-readable identifier for the resource owner (e.g., Agency ID)
-   **Owner Type** - The type of resource owner (currently supports “agency”)
-   **Scopes** - An array of permission scopes granted to this integration
-   **HAL Links** - Hypermedia links following the HAL specification for easy API navigation

For a detailed list of fields and data available, please see [Explore the Integrations API](./explore.md).

### Integration Events

When integrations are created, updated, or deleted, webhook events can be sent to your registered endpoints:

-   **IntegrationCreated** - Sent when an integration is created
-   **IntegrationUpdated** - Sent when an integration is updated
-   **IntegrationDeleted** - Sent when an integration is deleted

To receive these events, subscribe to the relevant events through the [Webhooks API](../webhooks/overview.md).

### Use Cases

The Integrations API is particularly useful for:

-   **Monitoring Authorization Status** - Track which agencies have authorized your application
-   **Scope Management** - Verify what permissions have been granted for each integration
-   **Sync and Reconciliation** - Keep your local systems in sync with the current state of integrations

### Pagination

The API uses cursor-based pagination to efficiently handle large result sets. When more results are available, the response will include a `next` link in the `_links` section with a `cursor` value. Use the `nextPage` query parameter with this cursor to retrieve the next page of results. Or alternatively follow the `_links.next.href` URL directly.

### Filtering

You can filter the list of integrations using the `since` query parameter to retrieve only integrations that have been updated after a specific timestamp. This is useful for incremental synchronization of integration data.

### FAQ

**Who can access the Integrations API?**

The Integrations API is available to all partners with API credentials.

**How often should I poll for integration updates?**

We recommend using webhook subscriptions (`IntegrationCreated`, `IntegrationUpdated`, and `IntegrationDeleted` events) for real-time updates rather than polling. If you must poll, use the `since` parameter to retrieve only recently updated integrations and limit polling frequency to a reasonable interval (e.g., every 5-10 minutes).

**Can I modify integrations through this API?**

No, the Integrations API is read-only. Integrations are created and modified by agencies through Ignite (or submitting a Change of Uploader form). This API only provides visibility into existing integrations.
