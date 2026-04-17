---
title: "Usage Guide"
source: https://partner.realestate.com.au/webhooks/usage/
fetched_at: 2026-04-17T03:53:37.126Z
---

# Usage Guide

This guide provides common patterns, API examples, and troubleshooting tips for the Webhooks API.

## Subscription patterns

When creating a subscription, you choose between two subscription models. Understanding these patterns helps you avoid duplicate notifications and manage subscriptions effectively.

### Subscribe to all resource owners

Omit `ownerId` and `ownerType` to receive events for **all resource owners**. This is ideal for partners who manage multiple agencies and want a single subscription for all of them.

**Example: All listing upload events**

```
POST https://api.realestate.com.au/webhooks/v1/subscriptions
```

```
{  "eventType": "UploadCompleted",  "eventCategory": "listing",  "webhookUrl": "https://your-endpoint.com/webhooks/listings"}
```

**Example: All integration created events**

```
{  "eventType": "IntegrationCreated",  "eventCategory": "integration",  "webhookUrl": "https://your-endpoint.com/webhooks/integrations"}
```

**Example: All enquiry created events**

```
{  "eventType": "EnquiryCreated",  "eventCategory": "lead",  "webhookUrl": "https://your-endpoint.com/webhooks/leads"}
```

### Subscribe to specific resource owners

Include `ownerId` and `ownerType` to receive events only for **specific resource owners**. Create a separate subscription for each resource owner you want to monitor.

**Example: Listing events for a specific agency**

```
POST https://api.realestate.com.au/webhooks/v1/subscriptions
```

```
{  "eventType": "UploadCompleted",  "eventCategory": "listing",  "ownerType": "agency",  "ownerId": "ABCDEF",  "webhookUrl": "https://your-endpoint.com/webhooks/agency-abcdef"}
```

**Example: Integration events for a specific agency**

```
{  "eventType": "IntegrationCreated",  "eventCategory": "integration",  "ownerType": "agency",  "ownerId": "XYZABC",  "webhookUrl": "https://your-endpoint.com/webhooks/agency-xyzabc"}
```

**Example: Lead events for a specific agency**

```
{  "eventType": "EnquiryCreated",  "eventCategory": "lead",  "ownerType": "agency",  "ownerId": "ABCDEF",  "webhookUrl": "https://your-endpoint.com/webhooks/agency-abcdef/leads"}
```

### Important: No overlapping subscriptions

You **cannot** have overlapping subscriptions for the same event type and category. If you create a subscription for all resource owners, you cannot also create subscriptions for individual resource owners, as this would result in duplicate notifications.

**❌ Invalid: Overlapping subscriptions**

```
// First subscription - all agencies{  "eventType": "UploadCompleted",  "eventCategory": "listing",  "webhookUrl": "https://your-endpoint.com/all"}
// Second subscription - specific agency (will fail){  "eventType": "UploadCompleted",  "eventCategory": "listing",  "ownerId": "ABCDEF",  "ownerType": "agency",  "webhookUrl": "https://your-endpoint.com/abcdef"}
```

**Error:** `DUPLICATE_SUBSCRIPTION_FOR_EVENT` or `DUPLICATE_SUBSCRIPTION_FOR_OWNER`

## Managing subscriptions

### List all subscriptions

Retrieve all your subscriptions with pagination support:

```
GET https://api.realestate.com.au/webhooks/v1/subscriptions
```

**Response:**

```
{  "subscriptions": [    {      "subscriptionId": "f4c2bd7e-b549-4ac9-89a2-0f2a1c09b8a8",      "eventType": "UploadCompleted",      "eventCategory": "listing",      "ownerType": "agency",      "ownerId": "ABCDEF",      "webhookUrl": "https://your-endpoint.com/webhooks",      "status": "VALIDATED"    },    {      "subscriptionId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",      "eventType": "IntegrationCreated",      "eventCategory": "integration",      "webhookUrl": "https://your-endpoint.com/integrations",      "status": "VALIDATED"    }  ],  "_links": null}
```

**Pagination:** The API returns the first 200 subscriptions (oldest to newest). If you have more, use the `next` link:

```
{  "_links": {    "next": {      "href": "https://api.realestate.com.au/webhooks/v1/subscriptions?page=e6bcc38d-fd2c-4f48-a2b1-4905d909febc"    }  }}
```

### Get a specific subscription

Retrieve details of a single subscription:

```
GET https://api.realestate.com.au/webhooks/v1/subscriptions/{subscriptionId}
```

**Response:**

```
{  "subscriptionId": "f4c2bd7e-b549-4ac9-89a2-0f2a1c09b8a8",  "eventType": "UploadCompleted",  "eventCategory": "listing",  "ownerType": "agency",  "ownerId": "ABCDEF",  "webhookUrl": "https://your-endpoint.com/webhooks",  "status": "VALIDATED"}
```

### Delete a subscription

Permanently remove a subscription:

```
DELETE https://api.realestate.com.au/webhooks/v1/subscriptions/{subscriptionId}
```

**Response:** `204 No Content`

**Note:** Some events already queued may still be delivered after deletion.

### Validate a subscription

Restart the validation process for subscriptions with `FAILED` or `DISABLED` status:

```
PATCH https://api.realestate.com.au/webhooks/v1/subscriptions/{subscriptionId}/validate
```

**Response:** `202 Accepted`

## Understanding event payloads

All webhook notifications follow a consistent structure. Use the `resourceUrl` to fetch complete details about the affected resource.

### Listing event payload

```
{  "events": [    {      "resourceUrl": "https://api.realestate.com.au/listing/v1/upload/717f2bfc-c6d4-41fd-b238-3f2f0c0cf777",      "resourceId": "717f2bfc-c6d4-41fd-b238-3f2f0c0cf777",      "eventTime": "2025-12-21T01:15:39.902Z",      "eventId": "0f4132e8-af4c-4808-adcb-09c9e453cfd7",      "eventType": "UploadCompleted",      "eventCategory": "listing",      "ownerId": "ABCDEF",      "ownerType": "agency",      "subscriptionId": "45dd2c73-59e1-48ef-8a99-272813afcd8a"    }  ]}
```

**Resource details:** Use `resourceUrl` to GET the upload result from the [Listing Upload API](../listing-upload/overview.md). The result indicates whether the upload succeeded or failed.

### Integration event payloads

#### IntegrationCreated

Triggered when an integration is created:

```
{  "events": [    {      "resourceUrl": "https://api.realestate.com.au/me/v1/integrations/123e4567-e89b-12d3-a456-426614174000",      "resourceId": "123e4567-e89b-12d3-a456-426614174000",      "eventTime": "2025-12-21T05:30:00.123Z",      "eventId": "f8a1b2c3-d4e5-6789-0abc-def123456789",      "eventType": "IntegrationCreated",      "eventCategory": "integration",      "ownerId": "XYZABC",      "ownerType": "agency",      "subscriptionId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"    }  ]}
```

#### IntegrationUpdated

Triggered when an integration is updated:

```
{  "events": [    {      "resourceUrl": "https://api.realestate.com.au/me/v1/integrations/123e4567-e89b-12d3-a456-426614174000",      "resourceId": "123e4567-e89b-12d3-a456-426614174000",      "eventTime": "2025-12-21T05:45:00.456Z",      "eventId": "a9b8c7d6-e5f4-3210-9876-543210fedcba",      "eventType": "IntegrationUpdated",      "eventCategory": "integration",      "ownerId": "XYZABC",      "ownerType": "agency",      "subscriptionId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"    }  ]}
```

#### IntegrationDeleted

Triggered when an integration is deleted:

```
{  "events": [    {      "resourceUrl": "https://api.realestate.com.au/me/v1/integrations/123e4567-e89b-12d3-a456-426614174000",      "resourceId": "123e4567-e89b-12d3-a456-426614174000",      "eventTime": "2025-12-21T06:45:00.456Z",      "eventId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",      "eventType": "IntegrationDeleted",      "eventCategory": "integration",      "ownerId": "XYZABC",      "ownerType": "agency",      "subscriptionId": "b2c3d4e5-f6a7-8901-bcde-f12345678901"    }  ]}
```

**Resource details:** The `resourceId` contains the integration ID. Use the `resourceUrl` to GET full integration details from the [Integrations API](../integrations/overview.md).

### Lead event payloads

#### EnquiryCreated

Triggered when an enquiry is created for a listing or agency:

```
{  "events": [    {      "resourceUrl": "https://api.realestate.com.au/lead/v1/enquiries/2bb121ad-2849-4b20-bc40-19e4ae371b7e",      "resourceId": "2bb121ad-2849-4b20-bc40-19e4ae371b7e",      "eventTime": "2026-01-13T03:45:12.789Z",      "eventId": "c5d6e7f8-9012-3456-7890-abcdef123456",      "eventType": "EnquiryCreated",      "eventCategory": "lead",      "ownerId": "ABCDEF",      "ownerType": "agency",      "subscriptionId": "d7e8f9a0-1234-5678-9012-3456789abcde"    }  ]}
```

**Resource details:** The `resourceId` contains the enquiry ID. Use the `resourceUrl` to GET full enquiry details from the [Leads API](../leads/overview.md).

### Payload field reference

Field

Description

`resourceUrl`

URL to fetch complete resource details

`resourceId`

Unique identifier of the resource (e.g., upload ID, integration ID, enquiry ID)

`eventTime`

When the event occurred (ISO 8601 UTC)

`eventId`

Unique identifier for this event

`eventType`

Type of event (e.g., `UploadCompleted`, `IntegrationCreated`, `EnquiryCreated`)

`eventCategory`

Event category (e.g., `listing`, `integration`, `lead`)

`ownerId`

ID of the resource owner (e.g., agency ID)

`ownerType`

Type of owner (currently only `agency`)

`subscriptionId`

ID of the subscription that triggered this notification

## How to setup webhooks using a no-code tool

You can use no-code tools like Zapier or Make to set up webhook endpoints without writing code. Here’s a general guide on how to do this:

1.  Create a webhook endpoint using your chosen no-code tool (e.g. Zapier, Make).
2.  Create a webhooks subscription with REA. You’ll need to provide your webhook endpoint URL and the type of events you want to subscribe to. Future webhook events (e.g. `EnquiryCreated`) will be sent to this endpoint. If you’re familiar with curl, Postman, or similar tools, you can use them to create the subscription. Alternatively, you use the test request feature on the [explore page](../explore/) to create a subscription.
3.  Configure your no-code tool to process incoming webhook notifications. This typically involves setting up a workflow that triggers when a POST request is received at your webhook endpoint. You may need to send a test enquiry to see the event payload structure in your no-code tool.
4.  Extract the `resourceUrl` from the webhook payload and use it to fetch full details about the resource (e.g., enquiry details) using the appropriate REA API (e.g., Leads API). Note: all REA APIs require authentication. Make sure you have a token generation step in your workflow to obtain an access token before making API requests.
5.  Send the fetched resource details to your desired destination (e.g., email, database, CRM) using the capabilities of your no-code tool.

## Monitoring & troubleshooting

### View delivery attempts

Track delivery attempts for a subscription to troubleshoot issues:

```
GET https://api.realestate.com.au/webhooks/v1/subscriptions/{subscriptionId}/delivery
```

**Response:**

```
{  "deliveries": [    {      "attemptId": "214cb16e-967d-499d-b819-8c17a07e8af5",      "deliveryId": "755e0ad8-5111-43b2-ba36-e6c21420ae5b",      "statusCode": 200,      "outcome": "Ok",      "createdAt": "2021-09-09T05:37:25.951303Z"    }  ],  "_links": null}
```

**Pagination:** Returns the first 200 delivery attempts (newest to oldest).

### Common errors

Error Code

Cause

Solution

`DUPLICATE_SUBSCRIPTION_FOR_EVENT`

Subscription already exists for this event type and resource owner combination

Delete the existing subscription or use it instead

`DUPLICATE_SUBSCRIPTION_FOR_OWNER`

Subscription conflicts with an existing “all resource owners” subscription

Delete the “all resource owners” subscription before creating specific ones

`INVALID_OWNER_TYPE`

`ownerType` must be `agency`

Use `"ownerType": "agency"`

`INVALID_OWNER_ID`

`ownerId` must be 6 uppercase letters (A-Z)

Check the agency ID format

`INVALID_WEBHOOK_URL_NO_HTTPS`

Webhook URL uses HTTP instead of HTTPS

Use an HTTPS endpoint

`INVALID_WEBHOOK_URL`

Webhook URL is missing or malformed

Provide a valid HTTPS URL

`INVALID_EVENT_CATEGORY`

Event category not recognized

Use `listing`, `integration`, or `lead`

`INVALID_EVENT_TYPE`

Event type not recognized

Use `UploadCompleted`, `IntegrationCreated`, `IntegrationUpdated`, `IntegrationDeleted`, or `EnquiryCreated`

`INVALID_COMBINATION_FOR_EVENT_TYPE_AND_EVENT_CATEGORY`

Event type doesn’t match event category

Check valid combinations in [Overview](../overview/#available-events)

`VALIDATION_NOT_REQUIRED`

Validation can only be restarted for `FAILED` or `DISABLED` subscriptions

Check subscription status first

### Troubleshooting checklist

**Subscription not validating?**

-   Verify your endpoint returns `200 OK` or `202 Accepted` within 5 seconds
-   Check your endpoint accepts HTTPS POST requests
-   Review firewall rules and IP allowlists
-   Test signature verification implementation

**Not receiving events?**

-   Confirm subscription status is `VALIDATED`
-   Verify you’re subscribed to the correct event type and category
-   Check delivery attempts for error details
-   Ensure your endpoint hasn’t been disabled due to repeated failures

**Events delayed or missing?**

-   Check the delivery attempts endpoint for retry information
-   Verify your endpoint responds within 5 seconds
-   Review server logs for errors or timeouts

## Testing with Postman

Download our Postman collection to quickly test the Webhooks API.

### Setup steps

1.  **Download Postman** from [postman.com/downloads](https://www.postman.com/downloads/)
2.  **Download the collection** - [webhooks-prod-postman-collection.zip](https://partner.realestate.com.au/files/webhooks/webhooks-prod-postman-collection.zip)
3.  **Import both files:**
    -   `Webhooks API Prod.postman_environment`
    -   `Webhooks Subscription API Prod.postman_collection`
4.  **Configure environment:**
    -   Open “Manage Environments”
    -   Select “Webhooks API Prod”
    -   Add your `ClientID` and `ClientSecret` (in both initial and current value columns)
    -   Variables `token-prod` and `subscriptionId` auto-populate after running requests
5.  **Select the environment** from the dropdown
6.  **Run requests:**
    -   Execute “Token Prod” to authenticate
    -   Create and manage subscriptions

![Postman environment selection](https://partner.realestate.com.au/images/webhooks/environment-select.png)

## Best practices

-   **Verify signatures** - Always implement [signature verification](../signature-verification/) in production
-   **Respond quickly** - Return 200/202 within 5 seconds, then process asynchronously
-   **Handle idempotency** - Store `eventId` to detect and skip duplicate deliveries
-   **Monitor delivery attempts** - Track failures to detect endpoint issues early
-   **Use resource URLs** - Fetch full resource details instead of caching event data
-   **Choose the right subscription model** - Use “all resource owners” for simplicity unless you need per-agency routing
-   **Clean up unused subscriptions** - Delete subscriptions you no longer need
