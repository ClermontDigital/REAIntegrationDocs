---
title: "Listing Upload API"
source: https://partner.realestate.com.au/listing-upload/overview/
fetched_at: 2026-04-17T03:52:44.553Z
---

# Listing Upload API

The Listing Upload API is designed to allow partners to upload real estate ‘listings’ (content specific to the sale or lease of a property) to REA Group’s websites on behalf of our customers. It enables you to add, update and delete listings and request detailed reporting data. The API supports all types of listings including Residential (Buy, Rent, Land, Rural) and Commercial.

The listings data is received in the REAXML format. Received content is queued, validated, and ingested for use in REA Group products. These products include (but are not limited to) ‘property listings’ on realestate.com.au, realcommercial.com.au, native iOS and Android apps, and email and media based communication channels.

The REAXML data structure is described by the DTD, available at [http://reaxml.realestate.com.au/propertyList.dtd](http://reaxml.realestate.com.au/propertyList.dtd). Please note though; this doesn’t delve into the business rules and validations behind each element - you’ll find that information at [Listing Upload Elements](./elements.md).

The API is HTTPS based and the endpoints, callable methods and parameters will be detailed in the usage section.

### FAQs

#### What Listing types are supported?

The REA Listing Upload API supports Residential, Rental, Rural, Land and Commercial Listing types. Project Profiles are not supported, however, project listings are.

#### Does the Listing Upload API support the retrieval of REA Listings?

The Listing Upload API is meant for XML providers to push Listings to REA. It does not support the retrieval of Listings.

#### Can anyone use the Listing Upload API?

The Listing Upload API is meant for the XML Providers or CRMs that REA customers use to upload listings. For details on how to start providing Listings to REA please refer to [https://help.realestate.com.au/hc/en-us/articles/115002994623-How-to-become-an-XML-Uploader](https://help.realestate.com.au/hc/en-us/articles/115002994623-How-to-become-an-XML-Uploader)

#### Is it possible to receive a notification when listings are successfully processed instead of polling the Listing upload reporting endpoint?

By using the Webhooks API we can push listing upload completion information to you in real time.

#### What if the Listing Upload API does not return a HTTP 202 Accepted response code?

This generally means that the API has failed to receive the upload request successfully and hence it would be best to try again after sometime. Please contact our customer support team if the problem persists.

#### Does the Listing Upload API support bulk uploads?

The Listing Upload API is designed for continuous processing of single listings uploads and not for scheduled uploads of listing batches. The individual processing will ensure customer listings are up-to-date on site as soon as the upload has been processed.

#### Are listings published in the order they are uploaded?

If there are multiple uploads for the same listing, the Listing Upload API queues them up ensuring that subsequent updates do not invalidate earlier uploads.

#### Are email logs supported for listings uploaded via API?

For listings uploaded via API you can obtain the logs via Listing Upload API reporting endpoint or webhooks. Email logs are not supported.

#### Why am I getting a 404 Not Found error when trying to retrieve a listing upload report?

This generally indicates the listing has not yet been processed. Please try again after sometime or use the [Webhooks API](../webhooks/overview.md) to get notified when the listing upload has been processed.
