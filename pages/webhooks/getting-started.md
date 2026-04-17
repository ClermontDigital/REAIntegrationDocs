---
title: "Getting started"
source: https://partner.realestate.com.au/webhooks/getting-started/
fetched_at: 2026-04-17T03:53:31.738Z
---

# Getting started

This guide walks you through setting up your first webhook subscription, from configuring your endpoint to receiving your first notification.

## Prerequisites

-   An HTTPS endpoint capable of receiving POST requests
-   OAuth 2.0 credentials with `webhooks:subscriptions:write` scope

## Step 1: Configure your webhook endpoint

Set up a server to receive HTTP POST requests at an endpoint where you want to receive notifications. You can create multiple endpoints and route different events to each.

### Endpoint requirements

-   **HTTPS only** - HTTP endpoints are not supported
-   **Fast response** - Return `200 OK` or `202 Accepted` within 5 seconds
-   **No response body** - Partner Platform ignores response bodies
-   **Handle validation** - Respond to the initial validation request

All responses other than 200 and 202 will be treated as an error, including redirects.

### Security recommendations

We strongly recommend implementing [signature verification](../signature-verification/) to ensure requests are genuinely from Partner Platform. If you’re not implementing signature verification, allowlist the following IP addresses:

```
3.24.68.2533.105.206.1913.54.116.18413.54.198.5113.210.148.10752.62.40.19952.64.157.5454.79.253.18454.153.149.69
```

These are fixed IP addresses that will not change in the foreseeable future. We will update this documentation and notify partners if they do change.

## Step 2: Obtain public keys

To verify webhook signatures, retrieve the public keys from Partner Platform:

```
GET https://api.realestate.com.au/webhooks/v1/signing
```

**Response:**

```
{  "keys": [    {      "kty": "OKP",      "use": "sig",      "crv": "Ed25519",      "kid": "7c35c91f-9765-4b5e-af3e-08bff5ef0ae2",      "x": "53NJ5jBj5X-9PdljnPnwNqL2aCBt78wzjLpDzCHn3bo"    }  ]}
```

Store these keys to verify the `x-rea-signature` header on incoming requests. See [Signature Verification](../signature-verification/) for implementation details.

## Step 3: Create a subscription

Create a subscription for each event type you want to receive. Here’s an example subscribing to listing upload completion events for all agencies:

**Request:**

```
POST https://api.realestate.com.au/webhooks/v1/subscriptions
```

```
{  "eventType": "UploadCompleted",  "eventCategory": "listing",  "webhookUrl": "https://your-endpoint.com/webhooks"}
```

**Response:**

```
{  "subscriptionId": "29a5f7f2-f782-4679-b97d-78529c567867",  "eventType": "UploadCompleted",  "eventCategory": "listing",  "webhookUrl": "https://your-endpoint.com/webhooks",  "status": "PENDING"}
```

**Important:** Save the `subscriptionId` - you’ll need it to manage this subscription later.

## Step 4: Pass subscription validation

After creating a subscription, Partner Platform validates your endpoint by sending a test request. Your endpoint must respond with `200 OK` or `202 Accepted`.

### Validation retry logic

-   **Initial request:** Sent immediately after subscription creation
-   **Retry 1:** 30 minutes after initial request
-   **Retry 2:** 60 minutes after initial request
-   **Retry 3:** 90 minutes after initial request

If all validation attempts fail, the subscription status becomes `FAILED`. You can restart validation using:

```
PATCH https://api.realestate.com.au/webhooks/v1/subscriptions/{subscriptionId}/validate
```

### Subscription statuses

Status

Description

PENDING

Initial status for a new subscription

VALIDATED

Validation successful - you’ll now receive event notifications

FAILED

Validation failed after all retry attempts

DISABLED

Subscription disabled due to repeated delivery failures

![Subscription status state machine](https://partner.realestate.com.au/images/webhooks/StatusStateMachine.png)

## Step 5: Process webhook notifications

When an event occurs, Partner Platform sends a POST request with a JSON payload to your webhook URL.

### Example notification

```
{  "events": [    {      "resourceUrl": "https://api.realestate.com.au/listing/v1/upload/717f2bfc-c6d4-41fd-b238-3f2f0c0cf777",      "resourceId": "717f2bfc-c6d4-41fd-b238-3f2f0c0cf777",      "eventTime": "2025-12-21T01:15:39.902Z",      "eventId": "0f4132e8-af4c-4808-adcb-09c9e453cfd7",      "eventType": "UploadCompleted",      "eventCategory": "listing",      "ownerId": "ABCDEF",      "ownerType": "agency",      "subscriptionId": "45dd2c73-59e1-48ef-8a99-272813afcd8a"    }  ]}
```

### Processing best practices

1.  **Verify the signature** before processing (see [Signature Verification](../signature-verification/))
2.  **Respond quickly** with `200 OK` or `202 Accepted` (within 5 seconds)
3.  **Process asynchronously** - queue the event for processing after responding
4.  **Use the resourceUrl** to fetch full details about the resource

### Delivery retry logic

If delivery fails, Partner Platform retries up to 7 times over approximately 6 hours:

Retry

Wait Time

Cumulative Time

1

20s

20s

2

60s

80s

3

180s

260s

4

540s

800s

5

1,620s

2,420s

6

4,860s

7,280s

7

14,580s

21,860s (~6h)

After 7 failed attempts, Partner Platform stops retrying that specific event.

Webhook system downtime for Leads

If your webhook system goes down and you’re subscribed to Leads events, make requests to the [Enquiries API](../../leads/overview.md) to ensure you don’t miss any enquiries during the outage.

## Next steps

-   [Usage Guide](../usage/) - Learn subscription patterns and API operations
-   [Signature Verification](../signature-verification/) - Implement secure signature verification
-   [Explore](../explore/) - Test the API interactively
