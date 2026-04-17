---
title: "Listing Export API"
source: https://partner.realestate.com.au/listing-export/overview/
fetched_at: 2026-04-17T03:52:30.685Z
---

# Listing Export API

The Listing Export API is designed to allow partners to retrieve real estate ‘listings’ on behalf of our customers. The API will support all types of listings including Residential (Buy, Rent, Land, Rural) and Commercial.

The listings data is exported in the REAXML format.

The REAXML data structure is described by the DTD, available at [http://reaxml.realestate.com.au/propertyList.dtd](http://reaxml.realestate.com.au/propertyList.dtd). Please note though; this doesn’t delve into the business rules and validations behind each element - you’ll find that information at [Listing Upload Elements](../listing-upload/elements.md).

The API is HTTPS based and the endpoints, callable methods and parameters will be detailed in the usage section.

### Scope Required

If you are authorized to export listings on behalf of customers, you will see the below scope in the authentication response payload:

`listing:listings:export`

### FAQ

#### What Listing types are supported?

The REA Listing Export API supports Residential, Rental, Rural, Land, and Commercial Listing types. Project Profiles are not supported.

#### Can anyone use the Listing Export API?

The Listing Export API can be used by any of the following Partners:

-   XML Providers or CRMs that REA customers use to upload listings
-   Third party service providers that customers have authorised with access to their listings

For details on how to start providing Listings to REA please refer to [https://help.realestate.com.au/hc/en-us/articles/115002994623-How-to-become-an-XML-Uploader](https://help.realestate.com.au/hc/en-us/articles/115002994623-How-to-become-an-XML-Uploader)

#### What listing statuses are supported?

The REA Listing Export API supports retrieval of presently active as well as sold listings.

#### Would customers be charged for the use of this API?

No, the use of this API does not incur charges from REA.
