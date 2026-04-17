---
title: "Authentication"
source: https://partner.realestate.com.au/getting-started/authentication/
fetched_at: 2026-04-17T03:51:50.878Z
---

# Authentication

### Client Credentials

The Partner Platform uses [OAuth 2.0](https://oauth.net/2/) as security. For now, the only supported authorization grant type is Client Credentials. This is suitable for direct system to system communications. It is not suitable for end user authentication or use within untrusted clients such as web and mobile applications.

Note

> Other mechanisms such as Authorization Code and Implicit Grant may be offered in the future to support end user authentication use cases. If you have such a use case please let us know. A better understanding of your requirements will help us define and prioritise upcoming features.

The Client Credentials authorization grant type requires your application to authenticate using a Client ID and Client Secret that uniquely identify your application. To obtain your client credentials, please contact us via [Customer Experience](https://help.realestate.com.au/hc/en-us/requests/new?ticket_form_id=593408). These credentials must be stored securely as they will grant access to our APIs on your behalf.

We will use the following client credentials in subsequent examples.

-   Client ID: BE9DA15F-F553-46AC-8453-55286A301C70
-   Client Secret: 91E31486-AF4E-46F4-9A71-E001BBB6A524

All APIs require an OAuth token to be provided in the request. To obtain an access token, a call must be made to the OAuth token endpoint:

```
https://api.realestate.com.au/oauth/token
```

A complete [`curl`](https://curl.haxx.se/) request looks like:

Terminal window

```
$ curl -s https://api.realestate.com.au/oauth/token -u 'BE9DA15F-F553-46AC-8453-55286A301C70:91E31486-AF4E-46F4-9A71-E001BBB6A524' -d 'grant_type=client_credentials'
```

### Token Details

A successful token request will return an OAuth token similar to that shown below:

```
{  "access_token": "41cd46e9-3a68-42e0-922e-c5c885366788",  "token_type": "bearer",  "expires_in": 3599,  "scope": "campaign:listing-performance:read",  "consumer_id": "908AC628-466E-4407-9DD5-A21FFE6A8DDC"}
```

The input fields are:

-   **access\_token** - This is the OAuth token itself. It will be included in subsequent requests. Similar to credentials, this token is highly sensitive and must be managed accordingly. Anybody who gains access to this token will be able to transact on your behalf (albeit for the limited lifetime of the token).
-   **token\_type** - This will always be set to `bearer` which [defines how we provide the token](https://tools.ietf.org/html/rfc6750) to protected APIs.
-   **expires\_in** - Defines the lifetime of the token in seconds. After it expires, a new token must be obtained. It is not necessary to use this expiry, instead we suggest that you continue to access an API until the token expires and obtain a new token when this occurs.
-   **scope** - A comma-separated list of scopes associated with the token. The scopes define which APIs may be accessed with the token. In most cases you can safely ignore this scope, but if you have permission issues accessing APIs, it may be necessary to inspect and validate the values contained in this field.
-   **consumer\_id** - This is the unique identifier for you as a consuming party of the API. This consumer identifier is used within the Partner Platform to grant access to resources.

### Protected API Access

Once we have a valid access token, we can use this to access protected APIs. In this example, we have access to the listing-performance endpoint on the Campaign API.

A complete [`curl`](https://curl.haxx.se/) request looks like:

Terminal window

```
$ curl -H "Authorization: Bearer 41cd46e9-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/listing-performance/1
```
