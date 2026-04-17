---
title: "Webhooks API"
source: https://partner.realestate.com.au/webhooks/overview/
fetched_at: 2026-04-17T03:53:33.284Z
---

# Webhooks API

A webhook refers to a combination of components that allow an application to automatically send messages to other applications in real time.

REA’s Webhooks API enables you to subscribe to events and receive real-time notifications as they occur. Partner Platform sends messages to a URL you define, eliminating the need to poll APIs for updates. This reduces latency, infrastructure costs, and operational overhead.

## How it works

1.  **Subscribe** - Choose event types and configure your HTTPS endpoint
2.  **Receive** - Get real-time notifications when events occur
3.  **Process** - Use the event data to take action in your application

## Available events

When you configure a webhook, you choose the type of event you’d like to subscribe to. Within each category, there are certain types of events that can happen.

Event Category

Event Type

Description

listing

UploadCompleted

Processing completed through the Listing Upload API

integration

IntegrationCreated

An integration was created

integration

IntegrationUpdated

An integration was updated

integration

IntegrationDeleted

An integration was deleted

lead

EnquiryCreated

An enquiry was created for a listing or agency

## Required scopes

To use the Webhooks API, you need the following OAuth scopes:

-   `webhooks:subscriptions:read` - View your webhook subscriptions
-   `webhooks:subscriptions:write` - Create and manage webhook subscriptions

## Getting access

You should automatically have access to the Webhooks API. REA provides partners with a test agency account to use as a sandbox environment for testing webhook notifications for listing uploads.

## Next steps

-   [Getting Started](../getting-started/) - Set up your first webhook
-   [Signature Verification](../signature-verification/) - Secure your webhook endpoint
-   [Usage Guide](../usage/) - Common patterns and examples
-   [Explore](../explore/) - Interactive API documentation
