---
title: "Usage"
source: https://partner.realestate.com.au/listing-export/usage/
fetched_at: 2026-04-17T03:52:32.670Z
---

# Usage

As a Partner of REA, you have the ability to export listings from agencies you are entitled.

## Pagination

The API is paginated and when the response has multiple pages, the next link `x-next-link` can be obtained from the header of the response. If the response is a single page, the `x-next-link` header will not be present. To retrieve the next page, you can append the `x-next-link` obtained from the current page to the request like this:

#### Request

```
GET https://api.realestate.com.au/listing/v1/export?page=123948576
```

The response would be similar to the above example, listings in REAXML format as the body and `x-next-link` in the header if there are more pages of listings. Otherwise, `x-next-link` won’t be provided.

## Get listings by Agency

Listings can be exported by Agency if the `agency_id` parameter is provided in the request, e.g:

#### Request

```
GET https://api.realestate.com.au/listing/v1/export?agency_id=AAAAAA
```

#### Response

```
<?xml version="1.0" encoding="UTF-8"?><propertyList>  <residential modTime="2020-05-20T10:23:43" status="sold">    <...>    </...>  </residential></propertyList>
```

In case there are more than 200 listings, a `x-next-link` will be provided and needs to be used to get the next page as outlined in the above pagination section:

```
x-next-link: "/v1/export?agency_id=AAAAAA&page=123948576"
```

Also, it is important to notice that listings will be sorted by REA Listing ID in ascending order.

## Get listing by ListingID

The API also supports exporting a specific listing if the `listing_id` parameter is provided in the request. At the moment, uniqueId/externalListingId are not supported, only REA listingIds are accepted, e.g:

#### Request

```
GET https://api.realestate.com.au/listing/v1/export?listing_id=123948576
```

#### Response

```
<?xml version="1.0" encoding="UTF-8"?><propertyList>  <residential modTime="2020-05-20T10:23:43" status="sold">    <...>    </...>  </residential></propertyList>
```

Same as the previous responses, but without `x-next-link` because pagination is not required in this scenario.

Also, listings for test agencies and project profiles are not available using the parameter `listing_id`.

## Get all listings

To retrieve all customer listings, you can send the following request:

#### Request

```
GET https://api.realestate.com.au/listing/v1/export
```

#### Response

```
<?xml version="1.0" encoding="UTF-8"?><propertyList>  <residential modTime="2020-05-20T10:23:43" status="sold">    <...>    </...>  </residential></propertyList>
```

Exporting a snapshot will return the first 200 listings sorted by REA Listing ID in ascending order. If you have more than 200 listings, you will be provided with a link to the next page in the header response, for example:

```
x-next-link: "/v1/export?page=123948576"
```

## Additional Query Parameters/Filters

These query parameters can be applied in addition to all the `GET` requests above.

Parameter

Type

Required

Description

Example

listing\_types

string

optional

String of comma separated `ListingType` to include

&listing\_types=residential,rural

page

string

optional

The listing Id to start from (for pagination). This parameter value is obtained from `x-next-link` header. See [Pagination](#pagination) for details

&page=123456789

since

datetime

optional

Fetch listings modified from this date until now

&since=2010-09-06T12:27:00.1Z

status

string

optional

String of comma separated `ListingStatus` to include

&status=current,offmarket

### ListingType

ListingType

Residential

Rental

Rural

Land

Commercial

### ListingStatus

ListingStatus

current

offmarket

sold

leased

### Listing Export Schema

The Listing Export API uses the [REAXML schema](../listing-upload/elements.md).

### Below is a summary of all the possible Listing Export API error responses as well as the reasons

HTTP Code

HTTP Error

Error description

Reasons

400

Bad Request

Bad Request

The request cannot be processed due to a client error.

401

Unauthorized

The request requires a valid authentication token

Invalid/missing authentication token in Header

403

Forbidden

Forbidden

You are not authorized to access this endpoint or the resource does not exist, e.g. a request for a specific `listing_id`

404

Not Found

Not found

No listings found

405

Method Not Allowed

The requested HTTP Method is not permitted on this resource

Unsupported HTTP verb

429

Too Many Requests

You have exceeded the maximum number of requests permitted

Rate limit exceeded

500

Internal Server Error

Sorry, your request could not be serviced at this time

Processing the export request failed.

### Example Request

Terminal window

```
$ curl --location --request GET 'https://api.realestate.com.au/listing/v1/export?agency_id=AAAAAA' \--header 'Authorization: Bearer <token returned by OAuth service>'
```

### Try it Out

Try out this endpoint using our [API explorer](../explore/).

## Postman Collection

The Postman Collection will make it easier for you to get started with the Listing Export API. Follow the steps below for setting up Postman:

**1\. If you do not have Postman already, you can download it here ([https://www.postman.com/downloads/](https://www.postman.com/downloads/)) after choosing your Operating System.**

**2\. Download the Listing export API Postman Collection [here](https://partner.realestate.com.au/files/listing-export/listing-export-prod-postman-collection.zip) and unzip the contents.**

**3\. Import the 2 files named “Listing Export API Prod.postman\_environment” and “Listing Export API Prod.postman\_collection”.**

![](https://partner.realestate.com.au/images/listing-export/import.png)

**4\. Under “Manage Environments” in Postman select the Listing Export API Prod.**

**5\. Add the Partner Platform ClientID and ClientSecret that has been provided earlier. Please note: You will need to add these twice, in both the initial and current columns. Values for variable `token-prod` will automatically be updated once you have run the “Token Prod” and “Export All Listings” endpoints.**

**6\. Select the newly imported environment from the drop-down list.**

![](https://partner.realestate.com.au/images/listing-export/environment-select.png)

### How to run the test

**1\. Execute the “Token Prod” endpoint to authenticate to Partner Platform. (No need to copy paste tokens).**

**2\. Execute the “Export All Listings” endpoint or any other endpoints.**
