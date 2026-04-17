---
title: "Usage"
source: https://partner.realestate.com.au/listing-upload/usage/
fetched_at: 2026-04-17T03:52:49.390Z
---

# Usage

The Listing Upload API accepts an REAXML document containing a single listing for processing. The API will return an `uploadId` after submission of an REAXML Listing. The `uploadId` can then be used to retrieve the real time processing status of the listing upload. Every upload of the listing will create a new `uploadId` even if the content hasn’t changed.

## Upload a Listing

You can use the following endpoint to upload listings on behalf of agencies that you represent.

### URL

```
POST https://api.realestate.com.au/listing/v1/upload
```

The XML document should be embedded in the request **Body**.

The **Content-Type** header should be set to `text/xml`.

The **Authorization** header should contain the **Bearer** token obtained upon successful authentication.

### Response Payload

A sample response payload for the Listing upload request looks like

```
{  "uploadId": "b9512dd0-d48f-4108-903b-82bc9b0fa8b1"}
```

This will return a HTTP status code of `202 Accepted` when the listing upload request has been received successfully.

HTTP status code of `400 Bad Request` will be returned when the XML is invalid. Please refer to the response message to modify the XML payload.

If any other status codes are returned it would mean that the API has failed to receive the upload request successfully and hence it would be best to try again after sometime or notify our support team.

The **Content-Type** header will be set to `application/json` for all responses.

## Retrieve a Listing Upload Report by uploadID

The Listing Upload API returns an `uploadId` after submission of an REAXML Listing. The `uploadId` can then be used to poll this endpoint and retrieve the status of the listing upload.

### URL

```
GET https://api.realestate.com.au/listing/v1/upload/{uploadId}
```

## Retrieve a Listing Upload Report by agencyID and uniqueID

To lookup the upload report based on agentID (agencyId) and uniqueID (externalListingId) the below endpoint can be used:

### URL

```
GET https://api.realestate.com.au/listing/v1/upload?agencyId={agencyId}&externalListingId={externalListingId}
```

* * *

### Listings Upload Schema

The Listing Upload API uses the [REAXML schema](./elements.md).

### Listings Reports Schema

The Listings reporting endpoint returns the following fields:

Field

Description

Type

uploadId

The uploadID returned by the Listing Upload API

string

completedTime

The time at which the listing upload finished

string

progress

The progress of the listing upload request. It will initially be IN\_PROGRESS and eventually be COMPLETED when the listing upload is processed

string

result

The status of the uploaded listing

string

externalListingId

The provider’s uniqueID for the listing

string

listingId

REA Listing identifier for the listing

integer

issues

Any warnings or errors when uploading the listing

object

issues.type

Type of object throwing the error or warning

string

issues.field

REAXML field that is throwing the message

string

issues.messages

REAXML validation error message detailing the error

\[string\]

issues.helpCentreUrl

URL to the help centre article on how to resolve the error

string

An example Listings upload reporting response looks like this:

```
{  "uploadId": "21c24ed0-f7c1-4298-beb9-2af5ab4d76c3",  "completedTime": "2019-07-22T04:34:46.372Z",  "progress": "COMPLETED",  "result": "NEW",  "externalListingId": "143",  "listingId": "131603746",  "issues": {    "warnings": [],    "errors": [      {        "type": "listing",        "field": "features.ductedCooling",        "messages": ["Invalid feature Ducted Cooling: '2'"],        "helpCentreUrl": "https://help.realestate.com.au/hc/en-us/categories/20857782169113"      }    ]  }}
```

### Possible values for Reporting Results

Result

Description

NEW

A successful upload of a new listing

PROCESSED

A successful update to an existing listing

DELETED

A successful deletion of an existing listing

UNCHANGED

An existing listing which has not been altered

SKIPPED

An error occurred with processing the listing. Please fix the errors and try again

INTERNAL\_ERROR

This is when our internal service could not understand the request. (We are monitoring this so that we can fix these and add more meaningful errors)

### Below is a summary of all the possible Listing Upload API error responses as well as the reasons

HTTP Code

HTTP Error

Error description

Reasons

400

Bad Request

The request is missing required fields or is malformed

Missing headers/body

Invalid XML, please refer to [REAXML schema](./elements.md) for validation details

401

Unauthorized

The request requires a valid authentication token

Invalid/missing authentication token in Header

403

Forbidden

Access to the requested resource is forbidden

Access unauthorized Agency/API/endpoint

Access non-existent resource

Access resource/endpoint that is out of scope

404

Not Found

The requested resource cannot be found

The report does not exist yet for the uploadId or the URL may be malformed

405

Method Not Allowed

The requested HTTP Method is not permitted on this resource

Unsupported HTTP verb

406

Not Acceptable

The response content type is not acceptable according to the accept headers sent in the request

Accept header set to unsupported MIME type

Request body wrong

409

Conflict

You have exceeded the maximum number of requests permitted for same listing in processing queue

There are too many duplicate requests (calculated per listing) in the process queue for the submitted listing, it won’t block other listing upload requests not over the threshold.

429

Too Many Requests

You have exceeded the maximum number of requests permitted

Rate limit exceeded

500

Internal Server Error

Sorry, your request could not be serviced at this time

Processing the upload request failed. The listing may not have been submitted for processing.

## Postman Collection

### The Postman Collection will make it easier for you to get started with the Listing Upload API. Follow the steps below for setting up Postman:

**1\. If you do not have Postman already you can download it here ([https://www.getpostman.com/downloads/](https://www.getpostman.com/downloads/)) after choosing your Operating System.**

**2\. Download the Postman Collection [here](https://partner.realestate.com.au/files/listing-upload/postman_collection.zip)**

**3\. Unzip and import the attached file into Postman.**

**4\. Under “Manage Environments” in Postman select the Listings Prod environment.**

**5\. Add the Partner Platform ClientID and ClientSecret that has been provided earlier. Please note: You will need to add these twice, in both the initial and current columns.**

**6\. Update the uniqueId for the listing. Please note: You will need to add uniqueId to both the initial and current columns.**

![](https://partner.realestate.com.au/images/listing-upload/environment.png)

**7\. Update the agentID to reflect the agency ID that was provided for the Sandbox environment.**

**8\. Select the newly imported environment from the drop-down list.**

![](https://partner.realestate.com.au/images/listing-upload/environment-select.png)

**9\. Under the request Body, update the listing address (for subsequent uploads).**

### How to run the test

**1\. Execute the “Token Prod” request (No need to copy paste tokens).**

**2\. Execute the “Residential Prod Create” request or any other request.**

**3\. Execute the “Report by Upload ID” ( {{uploadId}} variable holds the last uploadId that was generated. You can change it manually to any uploadId of your choice).**
