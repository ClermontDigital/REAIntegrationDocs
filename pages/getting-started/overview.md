---
title: "Getting started"
source: https://partner.realestate.com.au/getting-started/overview/
fetched_at: 2026-04-17T03:51:54.302Z
---

# Getting started

Welcome to the Partner Platform technical documentation. Here you will find information about how to access and interact with the Partner Platform, along with more detailed information about each of the APIs.

## Onboarding

You can sign up to the REA Partner Platform by following the below steps:

1.  Read the [Partner Platform terms](https://about.realestate.com.au/partner-platform-terms-partners/) and conditions before proceeding.
2.  Submit an application for a new Partner Platform account by clicking [here](https://help.realestate.com.au/hc/en-us/requests/new?ticket_form_id=360000786991).
3.  Upon successful submission, you will receive an email from the REA Customer Support team with a ticket number for your reference.
4.  Our technical support team member will reach out to you and issue a set of Partner Platform credentials that you can use to access the APIs.
5.  Once you are issued an account, each real estate agency that you are going to be representing needs to set up an integration to your account. Instructions for the customer can be found [here](https://help.realestate.com.au/hc/en-us/articles/48886865648665-A-guide-to-data-integrations-in-Ignite)

## Accessing your first API

As an example, we will use the Campaign API Listing Performance endpoint to retrieve campaign statistics for a fictional listing with a listing ID of 1.

We will use the [`curl`](https://curl.haxx.se/) command line tool to access this endpoint, and the [`jq`](https://stedolan.github.io/jq/) command line tool to format JSON responses. While `jq` isn’t essential, it makes the responses easier to read.

Terminal window

```
$ curl -i https://api.realestate.com.au/campaign/v1/listing-performance/1
```

It fails because this is a secured endpoint and we haven’t provided any form of authentication.

Terminal window

```
HTTP/1.1 401 UnauthorizedDate: Sat, 01 Jul 2017 00:00:00 GMTContent-Type: application/json; charset=utf-8Transfer-Encoding: chunkedConnection: keep-aliveServer: kong/0.10.1
{  "errors": [    {      "status": "401",      "title": "Unauthorized",      "detail": "The request requires a valid authentication token",      "meta": {        "transactionId": "af6dba36-eb9f-40ee-94ca-7abc22fa4661"      }    }  ]}
```

Let’s obtain an OAuth token.

Terminal window

```
$ curl -s https://api.realestate.com.au/oauth/token -u 'BE9DA15F-F553-46AC-8453-55286A301C70:91E31486-AF4E-46F4-9A71-E001BBB6A524' -d 'grant_type=client_credentials' | jq .
```

This returns a response similar to that shown below:

```
{  "access_token": "41cd46e9-3a68-42e0-922e-c5c885366788",  "token_type": "bearer",  "expires_in": 3599,  "scope": "campaign:listing-performance:read",  "consumer_id": "908AC628-466E-4407-9DD5-A21FFE6A8DDC"}
```

Within this response, the OAuth token is contained in the `access_token` field. In this case, the value is `41cd46e9-3a68-42e0-922e-c5c885366788`.

Once we have the token we can use it to update our earlier request to the campaign API.

Terminal window

```
$ curl -H "Authorization: Bearer 41cd46e9-3a68-42e0-922e-c5c885366788" https://api.realestate.com.au/campaign/v1/listing-performance/1 | jq .
```

Using the ID of a valid listing for which you are authorised, it will return a successful response.
