---
title: "Webhooks Signature Verification"
source: https://partner.realestate.com.au/webhooks/signature-verification/
fetched_at: 2026-04-17T03:53:35.206Z
---

# Webhooks Signature Verification

Each message Partner Platform sends to a registered webhook is signed. The signature can be verified using a public key which is obtained by sending a request to the `signing` endpoint of the Webhooks API. It is not necessary (or advisable) to retrieve the public key from Partner Platform on every request.

#### Signing keys example response

The JSON below is an example response from the signing endpoint. It contains one or more public keys which can be used to verify signatures.

```
{  "keys": [    {      "kty": "OKP",      "use": "sig",      "crv": "Ed25519",      "kid": "512bcc40-2aab-4cb7-9810-58a3dd8fa418",      "x": "7ddLwGURjXv06OFw0/nLTl8YZbOlBw/wfLKYYafdGv0="    }  ]}
```

Attribute

Description

Example

kid

Key ID

`512bcc40-2aab-4cb7-9810-58a3dd8fa418`

x

32-byte public key with Base64 encoding

`7ddLwGURjXv06OFw0/nLTl8YZbOlBw/wfLKYYafdGv0=`

#### `x-rea-signature` header

The request header will contain a field `x-rea-signature` with a value in the form:

`s:{keyId}:{timestamp}:{signature}`

Attribute

Description

Example

keyId (kid)

Taken at the signing endpoint

`7c35c91f-9765-4b5e-af3e-08bff5ef0ae2`

timestamp

Epoch time in seconds

`1764308232`

signature

Signed combination of timestamp and request body with Base64 encoding

`21V9TDeXDkrCSoLGD6XrOSBNcyT5KuZNeC2u/Pkmi/Y0MuvrQ2bRTJR25uks8jgNI/Re0JY+E5NR+C+53kBODQ==`

To validate the signature:

-   1.  Use the public key (`x`) returned from the signing endpoint associated with the `keyId` received in the `x-rea-signature` header. For example, the Base64 encoded public key for `512bcc40-2aab-4b7-9810-58a3dd8fa418` is `7ddLwGURjXv06OFw0/nLTl8YZbOlBw/wfLKYYafdGv0=`.
-   2.  Decode the public key and the `signature` using the Base64 scheme
-   3.  Concatenate the `timestamp` and the request body. It is important that the order is `timestamp` + `body`.
-   4.  Use an Ed25519 signer to validate the signature using the result of step 3 and the decoded public key and `signature` as parameters

You should reject the request if any of the following conditions are true:

-   The `x-rea-signature` value does not start with the two characters `s:`
-   The `keyId` does not match one published by Partner Platform
-   The `timestamp` is more than 8 hours earlier than the current time
-   The Ed25519 signer fails to verify the signature

If all the above steps return false, the request is validly signed by REA and you can process the request body.

#### Example verification in Node.js

Imagine your webhook endpoint has received a POST request with the following body and header:

```
x-rea-signature: s:512bcc40-2aab-4cb7-9810-58a3dd8fa418:1764308232:1764308232:21V9TDeXDkrCSoLGD6XrOSBNcyT5KuZNeC2u/Pkmi/Y0MuvrQ2bRTJR25uks8jgNI/Re0JY+E5NR+C+53kBODQ==
{   "events": [      {         "resourceUrl": "https://api.realestate.com.au/listing/v1/upload/717f2bfc-c6d4-41fd-b238-3f2f0c0cf777",         "resourceId": "717f2bfc-c6d4-41fd-b238-3f2f0c0cf777",         "eventTime": "2025-11-28T04:15:39.902Z",         "eventId": "0f4132e8-af4c-4808-adcb-09c9e453cfd7",         "eventType": "UploadCompleted",         "eventCategory": "listing",         "ownerId": "ABCDEF",         "ownerType": "agency",         "subscriptionId": "45dd2c73-59e1-48ef-8a99-272813afcd8a"      }   ]}
```

This is what the TypeScript code to verify the signature would look like:

```
import * as ed from "@noble/ed25519";import { Buffer } from "node:buffer";
// From GET https://api.realestate.com.au/webhooks/v1/signingconst signingEndpointResponse = {  keys: [    {      kty: "OKP",      use: "sig",      crv: "Ed25519",      kid: "512bcc40-2aab-4cb7-9810-58a3dd8fa418",      x: "7ddLwGURjXv06OFw0/nLTl8YZbOlBw/wfLKYYafdGv0=",    },  ],};
// The response body we will send to your webhook endpointconst webhookBody: string = `{"events":[{"resourceUrl":"https://api.realestate.com.au/listing/v1/upload/717f2bfc-c6d4-41fd-b238-3f2f0c0cf777","resourceId":"717f2bfc-c6d4-41fd-b238-3f2f0c0cf777","eventTime":"2025-11-28T04:15:39.902Z","eventId":"0f4132e8-af4c-4808-adcb-09c9e453cfd7","eventType":"UploadCompleted","eventCategory":"listings","ownerId":"ABCDEF","ownerType":"agency","subscriptionId":"45dd2c73-59e1-48ef-8a99-272813afcd8a"}]}`;
// This should be extracted from x-rea-signature header sent with the webhook eventconst xReaSignatureHeader: string = `s:512bcc40-2aab-4cb7-9810-58a3dd8fa418:1764308232:1764308232:21V9TDeXDkrCSoLGD6XrOSBNcyT5KuZNeC2u/Pkmi/Y0MuvrQ2bRTJR25uks8jgNI/Re0JY+E5NR+C+53kBODQ==`;
// 1. Check the x-rea-signature header starts with "s:" and contains the expected partsif (!xReaSignatureHeader.startsWith("s:")) {  throw new Error("Invalid signature header format. Must start with 's:'");}
const [, keyId, timestampStr, , signatureBase64] =  xReaSignatureHeader.split(":");
if (!keyId || !timestampStr || !signatureBase64) {  throw new Error("Invalid signature header format. Must contain 4 parts");}
// 2. Parse the x-rea-signature header: determine key ID, timestamp, signature and Base64 decode the signature and keyconst timestamp: number = parseInt(timestampStr, 10);
const EIGHT_HOURS_IN_SECONDS = 8 * 60 * 60;const currentEpochTimeInSeconds = Math.floor(Date.now() / 1000);
if (timestamp + EIGHT_HOURS_IN_SECONDS < currentEpochTimeInSeconds) {  throw new Error("Signature timestamp is too old");}
const signature: Buffer = Buffer.from(signatureBase64, "base64");
const keyEntry = signingEndpointResponse.keys.find((key) => key.kid === keyId);
if (!keyEntry) {  throw new Error(`Key ID ${keyId} not found in signing endpoint response`);}
const publicKey: Buffer = Buffer.from(keyEntry.x, "base64");
// 3. Concatenate the timestamp and body to create the body to be verified
const messageBytes = Buffer.from(`${timestamp}${webhookBody}`);
// 4. Verify the signature using the public key and the signed string
const isValidSignature = await ed.verifyAsync(  signature,  messageBytes,  publicKey);
console.log("Is valid signature:", isValidSignature); // => Is valid signature: true
```
