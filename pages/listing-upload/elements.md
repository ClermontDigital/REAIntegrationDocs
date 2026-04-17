---
title: "REAXML Elements"
source: https://partner.realestate.com.au/listing-upload/elements/
fetched_at: 2026-04-17T03:52:36.971Z
---

# REAXML Elements

## address

Indicates the physical address of the property

### Validation

The address is considered valid, if all of its enclosing elements are valid - and the suburb belongs to the postcode and state.

Attribute

Description

Values

Default

`display`

The `display` attribute may be used to hide some address details and show the Suburb and State only.

please refer to the next table

’yes’

`streetview`

The `streetview` attribute may be used to hide the option to view a Google sourced StreetView of the property.

please refer to the next table

’yes’

The _display_ attribute must be one of the ‘Accepted Values’ in the following table, otherwise it will default to `yes`.

-   Please note – using the display attribute to hide the address does not circumvent the address validation above.

Boolean

Accepted Values

True

”yes”, “1”, “true”

False

”no”, “0”, “false”

### See Also

`subNumber`, `lotNumber`, `site`,`streetNumber`, `street`, `suburb`, `state`, `postcode`, `country`.

## allowances

This indicates common restrictions a vendor may place on the tenants of a residential rental property.

### Validation

The allowance element is available for Residential Rental property only and limited to set child elements, `petFriendly`, `furnished` and `smokers`. Child elements can be true/false.

### Valid Example:

```
<allowances>  <petFriendly>true</petFriendly>  <furnished>false</furnished>  <smokers>false</smokers></allowances>
```

### See Also

`petFriendly`, `furnished`, `smokers`.

## agentID

Each REA customer/account is assigned a unique 6 character identity code.

This is also used to help identify a conjunctional listingAgent.

### Validation

This string is six alphabetic characters long. The `agentID` must also be known to REA and be for an active subscribed agent.

### Valid Examples

Assuming the `agentID` is active and known to REA:

```
<agentID>ABCDEF</agentID><agentID>abcdef</agentID>
```

## airConditioning

Specifies if the listed property has air conditioning or not.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<airConditioning>true</airConditioning><airConditioning>false</airConditioning>
```

### See Also

`features`.

## alarmSystem

Specifies if the listed property has an alarm system or not.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<alarmSystem></alarmSystem><alarmSystem>false</alarmSystem><alarmSystem>true</alarmSystem>
```

### See Also

`features`.

## annualRainfall

Descriptive text defining the annual rain fall for a `rural` property.

### Validation

Descriptive text of up to 65535 characters long is accepted as valid.

### Valid Examples

```
<annualRainfall>250 mm per annum</annualRainfall><annualRainfall>18 inches</annualRainfall>
```

### See Also

`ruralFeatures`.

## area

Represents a measurement of area being offered for sale / lease. The `unit` attribute must be given, and must have a value of `square`, `squareMeter`, `acre`, or `hectare`.

If the of attribute is omitted, then it is assumed to be _total_, meaning total area.

### Validation

-   The `area` value must be a number greater than zero, with or without a decimal portion.
-   It is mandatory for `commercial` listings to specify a valid floor area.
-   The `unit` attribute must be given.
-   `commercial` listings with an `isMultiple` value of `yes` MUST specify the `area_range` under `buildingDetails`. In this implementation, the element represents the smallest to largest floor space/configurations available for sale or lease - this must be done using the `range` element.

### Valid Examples

```
<area unit="acre">2.5</area><area unit="squareMeter">750</area><area unit="acre"></area><area unit="square">23</area>
<area unit="squareMeter"><range><min>880</min><max>990</max></area>
```

### See Also

`buildingDetails`, `landDetails`, `range`.

## attachment

This is used under the `media` element, to provide a file ‘attachment’ to a listing. These attachments are downloaded and subsequently served by REA.

> **Please note** - Media attachments must be included with each XML file processed for a listing. Supported content types are in the following table:

Usage Type:

Supported content types:

statementOfInformation

`application/pdf`

agentPhoto

See [Image requirements](../specifications/#image-requirements) for full list of supported content types

### usage:

The `usage` attribute is used to demonstrate the intended purpose of the attachment. Please provide one value from the predefined list below.

Usage Type:

Description:

Quantity limit:

statementOfInformation

This specifically refers to a state government required document, dictating legally required information regarding a property for sale or lease. Eg, Consumer Affairs Victoria require all residential properties display a statement of information detailing expected sale price, comparable properties & other information.

1

agentPhoto

This refers to the agent’s profile photo or headshot.

1

_At this point in time, “statementOfInformation” and “agentPhoto” are the only supported usages of the `attachment` element._

### id:

Each `media` entry must include the `id` attribute as a unique identifier - for each version of the `attachment`. Each new version of an `attachment` requires a new `id`. We recommend generating an ID by hashing the file contents.

The `id` is not used to order content, or for site display purposes.

### url:

Media provided to REA requires a source URL, in a standard http:// or https:// structure.

### Validation

> Each new, retained, or updated attachment requires a `usage` (from the types in the table above), an `ID` unique to the customer’s account/`agentID`, and a live and accessible `URL` - supplied in **_every_** XML file referencing the listing.

### Ordering media entries:

The order of `media` entries is implicit - it is based on the order in which they’re presented within the XML file.

### Updating an attachment:

To provide a new version of an attachment, provide `attachment` with a new `id` relating to the updated content. The URL may remain the same.

### Delete an existing attachment:

To delete an existing attachment, simply exclude `attachment` from the `media` collection.

### Valid Example

_Upload attachment_

```
<media>  <attachment usage="statementOfInformation" id="da39a3ee5e6b4b0d3255bfef95601890afd80709" url="http://www.example.com/statementofinformation.pdf"/></media>
```

_Delete attachment_

```
<media></media>
```

### See Also

`Media`, `url`

## auction

This element is used if the property is scheduled to be sold at auction.

This element can also be used to publish

-   Set Sale date (when `authority` is `setsale`)
-   Expression of Interest date (when `commercialAuthority` is `eoi`)
-   Tender Closing date (when `commercialAuthority` is `tender`)

### Validation

An auction date must be specified for all ‘auction’ listings.

### Valid Examples

```
<auction date="2003-12-04T18:30"/>
```

### See Also

Date and Time validation rules.

## auctionDate

This element is part of the `AuctionOutcome` and is used to indicate the date the property was auctioned on.

### Validation

An auction date must be specified if `auctionResult` is provided.

### Valid Examples

```
<auctionDate>2003-12-04T18:30</auctionDate>
```

### See Also

Date and Time validation rules, `authority`, `commercialAuthority`

## auctionMaxBid

This element is used to record the maximum bid or last bid made at the auction.

### Validation

A maximum bid must be specified if `auctionResult` is set to `passed-in-vendor-bid`.

### Valid Examples

```
<auctionMaxBid value="10000"/>
```

### Invalid Examples

```
<auctionMaxBid value="$10000"/><auctionMaxBid value="1,000,000"/>
```

### See Also

`auctionOutcome`

## auctionOutcome

This element contains all the auction result - related items including `AuctionDate`, `AuctionMaxBid` and `AuctionResult`.

### Validation

See validations for all the nested attributes.

### Valid Examples

```
<auctionOutcome>  <auctionDate>2003-12-04T18:30</auctionDate>  <auctionMaxBid value="10000"/>  <auctionResult type="sold-at-auction"/></auctionOutcome>
```

### See Also

`auctionDate`, `auctionMaxBid`, `auctionResult`

## auctionResult

This element specifies the result of the auction.

\_ **type** \_

**description**

sold-prior-to-auction

The property had been sold before the auction.

sold-at-auction

The property has been sold at the auction.

passed-in

The property has been passed in.

passed-in-vendor-bid

The property has been passed in on the vendor bid, supplied as `auctionMaxBid`.

withdrawn

The property has been withdrawn from the auction.

sold-after-auction

The property has been sold after the auction.

### Validation

The `type` attribute must have one of the values from the table above.

### Valid Examples

```
<auctionResult type="sold-at-auction"/>
```

### See Also

`auctionOutcome`, `auctionMaxBid`

## authority

The method of sale for this property.

**value**

**description**

“ (blank)

Remove the authority from the listing.

`auction`

The property is offered for sale via auction at a particular date and time.

`sale`

Most common sale type - The property is offered for sale by negotiation.

`setsale`

The property is offered for sale up to the set sale date. (set sale date must be supplied where authority is setsale)

The following values are also supported but are being deprecated. They should not be provided for new usages, but will continue to be valid values. The `future interpretation` column indicates how these values will be interpreted by REA in upcoming changes.

**value**

**description**

**future interpretation**

`exclusive`

The property is “For Sale” via a single Agency

`sale`

`multilist`

The property is “For Sale” and listed with multiple agencies

`sale`

`conjunctional`

The property is “For Sale” and listed with multiple agents working together - sales commission is shared amongst agents

`sale`

`open`

More than one real estate agent may be employed to sell the property. The owner pays a commission only to the agent who finds the buyer

`sale`

### Validation

The _value_ attribute of the `authority` element must be present in the table above.

### Valid Examples

```
<authority value="auction"/><authority value="sale"/>
```

### See Also

`commercialAuthority`, `auction`.

## balcony

Indicates whether the property has a balcony.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value a `false`. The default value is `false`.

### Valid Examples

```
<balcony></balcony><balcony>false</balcony><balcony>true</balcony>
```

### See Also

`features`

## bathrooms

This portrays a count of the number of bathrooms in the property.

`Ensuites` should be included in the `bathrooms` value, but are also tracked separately; see the `ensuite` element.

### Validation

-   All new `Residential` and `Rental` properties must have a `bathroom` value. For these listings, it will be incorrect to supply an empty element or the value 0.
-   All new `Rural` listings may have a `bathrooms` value of 0. This should indicate there is no residence on the property.
-   Maximum value – 20 bathrooms

### Valid Examples

```
<bathrooms>4</bathrooms>
```

### See Also

`features`, `ensuite`.

## bedrooms

This depicts the number of bedrooms in the property for sale.

### Validation

-   All new `Residential` and `Rental` properties must have a `bedrooms` value. It will be incorrect to supply empty elements. If the listing is a _Studio_ with a bedroom incorporated into the living space, then the text `Studio` can be supplied within this element, in place of a numeric value.
-   New `Rural` listings may have a `bedrooms` value of 0. This should indicate there is no residence on the property.
-   Maximum value – 30 bedrooms

### Valid Examples

```
<bedrooms>Studio</bedrooms><bedrooms>4</bedrooms>
```

### See Also

`features`.

## bond

This is the dollar value of a bond/security deposit required, to rent the property.

### Validation

-   The `bond` value is validated the same as the `price` element.
-   The `bond` value must be a number, with optional decimal places.

### Valid Examples

```
<bond>2400</bond><bond>1999.95</bond>
```

### See Also

`rent`, `price`.

## broadband

Specifies if the listed property has Broadband Internet Available.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`

### Valid Examples

```
<broadband>true</broadband><broadband>false</broadband><broadband></broadband>
```

### See Also

`features`

## buildingDetails

This element contains information about the physical structure of the building for sale or rent. The sub element `Area` is displayed on site as Floor Area.

### Validation

There are no special requirements for the `buildingDetails` element to be valid, except for all sub elements to be valid.

### See Also

`area`, `energyRating`,

## builtInRobes

Specifies if the property has Built-in Wardrobes.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<builtInRobes>true</builtInRobes><builtInRobes>1</builtInRobes><builtInRobes>no</builtInRobes>
```

### See Also

`features`.

## carSpaces

Lists the total number of car parking spots available at the listed `commercial` property.

### Validation

-   The value must be a positive whole number, without any fractional component.
-   Only valid for `commercial` listings.

### Valid Examples

```
<carSpaces>0</carSpaces><carSpaces>500</carSpaces>
```

## carports

This is a numerical count of car port spots available at this property.

### Validation

A whole number greater than or equal to zero is accepted as valid. Default value is `0`.

### Valid Examples

```
<carports></carports><carports>0</carports><carports>1</carports>
```

### See Also

`garages`, `openSpaces`

## carryingCapacity

Describes the livestock carrying capacity of the rural property.

### Validation

Descriptive text of up to 65535 characters long is accepted as valid.

### Valid Examples

```
<carryingCapacity></carryingCapacity><carryingCapacity>50 Breeders</carryingCapacity><carryingCapacity>400 Deer or 100 head of breeding Cattle</carryingCapacity>
```

### See Also

`ruralFeatures`

## category

Declares the type of `residential` property being listed for sale or lease.

> Please note: the strict definitions of these categories can vary from state to state. A stand-alone building however, would normally be classified as under the House, Villa, Warehouse, Alpine, or AcreageSemi-rural categories – whilst all others usually incorporate shared walls, common access paths, or both.

**Available Values**

House

Unit

Townhouse

Villa

Apartment

Flat

Studio

Warehouse

DuplexSemi-detached

Alpine

AcreageSemi-rural

BlockOfUnits (only available for `Residential` Home sale listings)

Terrace

Retirement

ServicedApartment

Other

### Validation

For a new listing under `residential` or `rental`, there must be a `category` element.

The _name_ attribute of the `category` element must be present in the table above.

### See Also

`ruralCategory`

## commercial

This depicts the listing relates to a `commercial` property for sale.

**Status**

**Description**

current

When a property is for sale/lease and published to realcommercial.com.au

sold

The property has been sold.

offmarket

The property is sold/leased by another agency, the agency no longer has the sales/lease agreement or the listing should be unpublished and removed from realcommercial.com.au temporarily.

deleted

The property upload is in error and the listing should be removed and not accessible by the agency.

### Validation

The `modTime` attribute follows the same validation rules as the `date` element.

### See Also

`status`

## commercialAuthority

This depicts the method of sale for this `commercial` property. A listing can only have one `commercialAuthority` set, and is only applicable where `commercialListingType` is `sale` or `isMultiple`.

**Value**

**Description**

auction

Sale by auction

eoi

Sale by Expression of Interest. To set the Expression of Interest date, see `auction`.

Forsale

For Sale

offers

Offers to Purchase.

Sale

Sale by Negotiation.

tender

Sale by public tender by a particular date. To set the Tender Closing date, see `auction`.

### See Also

`auction`, `commercialListingType`

## commercialCategory

A classification of the type of `commercial` property.

`commercial` properties can have up to 3 different `commercialCategory` values. The _id_ attribute refers to the sequence of the `commercialCategory`, and ranges from 1 - 3.

For example, multiple `commercialCategory` elements may be used to represent a property that includes both office and warehouse areas.

_id_ 1 refers to the primary `commercialCategory`.

_id_ 2 and 3 refer to secondary `commercialCategory` elements.

**Available Values**

Commercial Farming

Land/Development

Hotel/Leisure

Industrial/Warehouse

Medical/Consulting

Offices

Retail

Showrooms/Bulky Goods

Other

### Validation

-   For a new `commercial` property listing, there must be a `commercialCategory`.
-   A maximum of 3 `commercialCategory` values can be selected. Listings uploaded without an _id_ attribute can only modify the main `commercialCategory`.
-   The _name_ attribute of the `commercialCategory` element must have a value from the table above.

### Valid Examples

```
<commercialCategory id="1" name="Offices"/><commercialCategory id="2" name="Hotel/Leisure"/><commercialCategory id="3" name="Retail "/>
```

## commercialListingType

Declares the type of listing - if the property is for sale, or lease.

A `commercialListingType` must be included for all new `Commercial` Properties.

### Validation

_Value_ attribute must have one of `sale`, `lease`, or `both`.

## commercialRent

For commercial properties, this element specifies the annual rent.

The rent may be specified as either a single figure, or if the `isMultiple` is flagged as ‘yes’, a `rentalrange` per square metre - or both.

-   Please Note: If `isMultiple` is set to `no` or omitted during listing creation, a single valid figure must be supplied.

### Validation

The rent value is validated the same as for the `price` element. The _plusOutgoings_ attribute must be either yes or no.

### Valid Examples

```
<commercialRent period="annual" tax="inclusive"><rentPerSquareMetre><range><min>88</min><max>99</max></range></rentPerSquareMetre></commercialRent>
<commercialRent period="annual" tax="inclusive">80000 <!– a fixed value, or a range … –><rentPerSquareMetre><range><min>88</min><max>99</max></range></rentPerSquareMetre></commercialRent>
```

### See Also

`price`, `rentPerSquareMetre`, `rent`.

## councilRates

Describes any annual council rates applicable to the property. Only applicable to Rural listings.

### Validation

Descriptive text of up to 65535 characters long is accepted as valid.

### Valid Examples

```
<councilRates></councilRates><councilRates>$1,200 per annum</councilRates>
```

## country

The country where the listing is located.

### Validation

The `country` value must either match the formal english name or the two/three-character country codes listed in [ISO 3166](https://www.iso.org/obp/ui/).

If the `country` element is omitted or missing during listing creation, the country is assumed to be **Australia**.

### Valid Examples

```
<country>AUSTRALIA</country><country>AUS</country>
```

### See Also

`address`.

## courtyard

Indicates whether the property has a courtyard.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

## crossOver

A cross over is the part of the driveway outside of the property boundary between the boundary and the road provided by the local council. This element is used to indicate if a cross over is present on a vacant block of land.

### Validation

The _value_ attribute must have one of ‘left’, ‘right’ or ‘center’.

### Valid Examples

```
<crossOver value="left" /><crossOver value="right" />
```

## currentLeaseEndDate

The expected termination date of any current lease held on the listed property. Only applicable to Commercial, Land, and Rural listings.

### Validation

The `currentLeaseEndDate` element follows the same validation rules as the `date` element.

## date

A date value, with optional time. Please see the description of Date and Time data for a full description of what date and time formats are accepted, including examples.

## dateAvailable

The date a `rental` property is available for occupation – i.e. the earliest start date of a new lease.

### Validation

For new `rental` property listings, there must be a `dateAvailable` value. This element follows the Date and Time validation rules.

## deck

Indicates whether the property has a deck.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

## depth

Represents a specific depth measurement of the physical dimensions of the property.

**Side**

**Description**

left

The left side of the property from the perspective of someone standing on the street frontage and facing inwards.

right

The opposite side of the property from the left side.

rear

The rear side of the property from the street frontage.

### Validation

The `frontage` value must be a number greater than zero, with or without a decimal portion.

### Valid Examples

```
<depth side="left">25</depth><depth unit="meter" side="rear">40</depth>
```

## depositTaken

Represents a `rental` property that is close to being leased when a deposit has been taken.

-   Please note – this option is only applicable to residential rental properties using the Listing Upload API

### Validation

The _value_ attribute of `depositTaken` must be one of `yes` or `no`.

### Valid Examples

```
<depositTaken value="yes"/><depositTaken value="YES"/><depositTaken value="no"/>
```

## description

The `description` of the listed property, which can include multiple paragraphs of text.

### Validation

-   Any amount of viewable text up to 65535 characters long is accepted as valid.
-   Our parser will remove any HTML tags submitted within this field, but often fails if rich text values are submitted – this failure classifies the file as ‘poorly formed XML’.
-   HTML encoded character sets can be included for any special characters. This supports ASCII chars in decimal (`&#10;`) or hex (`&#xA`).

Examples:

-   Line feed (new line) -> `&#10;` Or `&#xA;`
-   Euro symbol € -> `&#8364;` Or `&#x20AC;`

```
  <description>    Once in a lifetime opportunity! &#xA;    The next paragraph goes here...  </description>
```

## dishwasher

Specifies if the listed property has a dishwasher.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<dishwasher>0</dishwasher><dishwasher>1</dishwasher><dishwasher>no</dishwasher>
```

### See Also

`features`

## document

The `document` element is used to refer to a single PDF file, displayed on `Commercial` listings only.

Up to 10 PDF files can be attached to a `Commercial` listing. The _id_ attribute refers to the sequence of the `document` and ranges from 1 -10.

If you wish to delete a `document`, then you need to provide the _id_ attribute alone.

### Validation

-   The _url_ attribute must point to an accessible file. If `document` data is provided, it MUST be a valid PDF format. Other document formats are not acceptable.
-   The _title_ attribute refers to the title of the documents as displayed on the site. An example could be ‘Listing Authority’.
-   The _id_ attribute must be in the range 1 through 10.
-   The `modTime` attribute, if it exists, must follow the Date and Time validation rules.

> Please note – When updating an existing listing, omitting this element retains its existing value. This behaviour is being deprecated, and may be removed in future. Please provide the full XML & element payload related to each listing, in every XML file.

### Valid Examples

Add document:

```
<objects>  <document id="1" modTime="2007-01-01-12:00:00" url="http://agencyX.com.au/title.pdf" format="pdf"/></objects>
```

Remove document:

```
<objects>  <document id="1"/></objects>
```

## ductedCooling

Specifies if the listed property has Ducted Cooling.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<ductedCooling>0</ductedCooling><ductedCooling>1</ductedCooling><ductedCooling>no</ductedCooling>
```

### See Also

`features`

## ductedHeating

Specifies if the listed property has Ducted Heating or not.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<ductedHeating>0</ductedHeating><ductedHeating>1</ductedHeating><ductedHeating>no</ductedHeating>
```

### See Also

`features`

## ecoFriendly

Applies common eco friendly housing attributes to the listing, from a set list.

### Validation

The `ecoFriendly` element is limited to set child elements, `solarPanels`, `solarHotWater`, `waterTank`, `greyWaterSystem`. Child elements are attributed by a true/false flag.

### See Also

`solarPanels`, `solarHotWater`, `waterTank`, `greyWaterSystem`

## email

Represents a single email address.

### receiveCampaignReport

The _receiveCampaignReport_ attribute controls whether the agent receives a weekly listing performance email. Accepted values for this attributes are: `yes` and `no`. By default, this is set to `yes`.

### Validation

A valid email address consists of up to 60 characters.

## energyRating

Indicates the energy efficiency rating of the property.

### Validation

`Residential` **homes:**

A value between 0.0 and 10.0 (using 0.5 increments) is to be supplied. This is mandatory for sale properties in the Australian Capital Territory but is optional for other `states`.

`Commercial` **listings:**

A value between 0.0 and 6.0 (using 0.5 increments) is to be supplied. This is optional for all `states`.

### See Also

`buildingDetails`.

### Valid Examples

```
<energyRating>4.5</energyRating>
<energyRating/> (for residential sale properties outside of ACT and QLD)
```

## ensuite

The number of ensuite bathrooms in the property for sale. `ensuite` should also be included in the `bathrooms` count value, however are tracked separately in this element as well; see the `bathrooms`.

### Validation

A whole number greater than or equal to zero is accepted as valid.

Default Value: `0`

### Valid Examples

```
<ensuite></ensuite><ensuite>0</ensuite><ensuite>1</ensuite><ensuite>13</ensuite><ensuite>yes</ensuite>
```

### See Also

`features`, `bathrooms`.

## evaporativeCooling

Specifies if the listed property has Evaporative Cooling.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<evaporativeCooling>0</evaporativeCooling><evaporativeCooling>1</evaporativeCooling><evaporativeCooling>no</evaporativeCooling>
```

### See Also

`features`.

## exclusivity

This indicates the right acquired by the Agent, to market a `commercial` property.

**Value**

**Description**

exclusive

The property is listed exclusively by this agent.

open

The property can be listed by multiple agents.

### Validation

-   The value must be one of those listed in the table above.
-   If no value is provided or the element is omitted during creation of a new listing, `open` will be implied.
-   This field is only applicable to `commercial` listings.

## externalLink

Listings can include links to 3D tours, Online Auctions and Property Walkthrough Videos.

To feature Online Auctions on property listings, provide a valid Online Auction link using the externalLink element. More information can be found in this [Help Article](https://help.realestate.com.au/hc/en-us/articles/360041266812-How-to-feature-Online-Auctions-on-property-listings).

`Residential` listings can have 2 `externalLink` elements. `Commercial` listings can have 3 `externalLink` elements. `Project Profile` listings can have 1 `externalLink` element.

To attach a 3D tour to a Project Profile, provide a valid 3D tour externalLink to the **first externalLink element of the first Residential/Land child listing** of the Project Profile.

### Validation

The _href_ attribute of `externalLink` must be a valid _Online Tour_, _VR(3D) Tour_ URL or YouTube URL, and must refer to an accessible resource.

Please omit any autoplay/autoload URL parameters. Where more than one VR tour URL or Property Walkthrough Video URL has been provided, REA will only use a single scan URL.

e.g.

```
<externalLink href="http://www.realestate.com.au/onlinetours/VictoriaSt.tour"/><externalLink href="https://youtu.be/ZKlsVuSq77w?si=pMllbifsXn4v2YdA"/>
```

For Property Walkthrough Videos, please use one of the following supported YouTube URL formats:

-   YouTube Shorts: `https://www.youtube.com/shorts/{video_id}?extra_parameters`
-   Share: `https://youtu.be/{video_id}?extra_parameters`
-   Standard: `https://www.youtube.com/watch?v={video_id}&extra_parameters`

Example for attaching a 3D tour to a Project Profile through a child Residential/Land XML upload.

e.g.

```
 <residential>    <project>        <id>600004427</id>        <order>0</order>    </project>    <externalLink href="https://my.valid.3d.tour"/></residential>
```

Note that `<order>0</order>` specifies that this is the **first child listing** of this Project Profile. `https://my.valid.3d.tour` will be associated with this Project Profile.

To remove existing externalLinks, include the `externalLink` element, leaving the _href_ empty.

e.g. `<externalLink href=""/>`

## features

These sub elements assign different `features` of `residential`, `rental`, `rural`, or `land` based properties to a listing.

Features

type

land

rental

residential

rural

`bedrooms`

integer

yes

yes

yes

`bathrooms`

integer

yes

yes

yes

`ensuite`

integer

yes

yes

yes

`toilet`

integer

yes

yes

yes

`livingArea`

integer

yes

yes

yes

`garages`

integer

yes

yes

yes

`carports`

integer

yes

yes

yes

`remoteGarage`

boolean

yes

yes

yes

`secureParking`

boolean

yes

yes

yes

`study`

boolean

yes

yes

yes

`dishwasher`

boolean

yes

yes

yes

`builtInRobes`

boolean

yes

yes

yes

`gym`

boolean

yes

yes

yes

`workshop`

boolean

yes

yes

yes

`rumpusRoom`

boolean

yes

yes

yes

`floorboards`

boolean

yes

yes

yes

`broadband`

boolean

yes

yes

yes

`payTV`

boolean

yes

yes

yes

`ductedHeating`

boolean

yes

yes

yes

`ductedCooling`

boolean

yes

yes

yes

`splitsystemHeating`

boolean

yes

yes

yes

`hydronicHeating`

boolean

yes

yes

yes

`splitsystemAircon`

boolean

yes

yes

yes

`gasHeating`

boolean

yes

yes

yes

`reverseCycleAircon`

boolean

yes

yes

yes

`evaporativeCooling`

boolean

yes

yes

yes

`airConditioning`

boolean

yes

yes

yes

`alarmSystem`

boolean

yes

yes

yes

`vacuumSystem`

boolean

yes

yes

yes

`intercom`

boolean

yes

yes

yes

`poolInGround`

boolean

yes

yes

yes

`poolAboveGround`

boolean

yes

yes

yes

`tennisCourt`

boolean

yes

yes

yes

`balcony`

boolean

yes

yes

yes

`deck`

boolean

yes

yes

yes

`courtyard`

boolean

yes

yes

yes

`outdoorEnt`

boolean

yes

yes

yes

`shed`

boolean

yes

yes

yes

`fullyFenced`

boolean

yes

yes

yes

yes

`openFirePlace`

boolean

yes

yes

yes

`openSpaces`

integer

yes

yes

yes

`insideSpa`

boolean

yes

yes

yes

`outsideSpa`

boolean

yes

yes

yes

`otherFeatures`

text

yes

### Validation

-   Any boolean based sub-element omitted during the creation of a new listing will default to `false`.
-   Any integer based sub-element omitted during the creation of a new listing will default to `0`.

## facebookURL

Represents a URL to the Facebook page of a listing agent.

### Validation

Any string of up to 128 characters will be accepted.

### Valid Examples

```
<facebookURL>http://www.facebook.com/MrsStephenFry</facebookURL><facebookURL>http://facebook.com/MrsStephenFry</facebookURL><facebookURL>https://facebook.com/MrsStephenFry</facebookURL><facebookURL>https://www.facebook.com/mrsstephenfry</facebookURL><facebookURL>https://www.facebook.com/profile.php?id=100000159371578</facebookURL><facebookURL>http://www.facebook.com/pages/This-Is-The-Page-With-The-Longest-URL-In-The-World-WOW-Its-Really-Very-Long/220173687842</facebookURL>
```

## fencing

Describes the state of the fencing on a `rural` property.

### Validation

Descriptive text of up to 65535 characters long is accepted as valid.

### Valid Examples

```
<fencing>Boundary and internal fencing all in good condition</fencing>
```

## floorboards

Specifies if the listed property has floorboards.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<floorboards>true</floorboards><floorboards>false</floorboards>
```

### See Also

`features`.

## floorplan

Up to two floorplans may be provided per listing, depicting the layout of the building and/or surrounding land.

The `floorplan` element is used to refer to a single JPEG, GIF or PNG image file.

Floorplans must be provided within the `objects` element.

The _id_ attribute refers to the sequence of the images.

**Colour profile:** REA only supports RGB images, CMYK images will not render correctly on site.

**Filesize/Maximum Resolution:** We do not restrict the file size of the image you can provide, however we do limit the maximum total resolution (50MPixel).

We recommend you follow our specific guidance around the optimal aspect ratio and image resolution, depending upon the type of image you are providing. These are detailed under the `img` element.

### Validation

For the floorplan image to be valid:

-   JPEG, GIF or PNG format should be used
-   The id attribute must be either 1 or 2.
-   The `modTime` attribute, must follow theDate and Time validation rules.

### Valid Examples

```
<objects>  <floorplan id="1" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/floorplan1.gif" format="gif"/>  <floorplan id="2" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/floorplan2.gif" format="gif"/></objects>
```

### See Also

`img`, `objects`.

## frontage

Represents the measurement of physical frontage for the property. The _unit_ attribute is optional and if not provided `meter` will be used.

This field is only applicable to `residential land` listings

### Validation

The `frontage` value must be a number greater than zero, with or without a decimal portion.

### Valid Examples

```
<frontage>18</frontage><frontage unit="meter">12.4</frontage>
```

## fullyFenced

Indicates whether the property has a fence around the full perimeter.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

## furnished

Specifies if the listed property is furnished.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<furnished></furnished><furnished>true</furnished><furnished>false</furnished>
```

## furtherOptions

Text describing any further options for a `commercial` property.

### Validation

Up to 65535 characters of text is accepted as valid.

## garages

This depicts the number of garaged car spaces located within the property.

### Validation

A whole number greater than or equal to zero is accepted as valid. The default value is `0`.

### Valid Examples

```
<garages></garages><garages>0</garages><garages>1</garages><garages>2</garages>
```

### See Also

`carports`.

## greyWaterSystem

Specifies if grey water system is included for the listed property or not.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<greyWaterSystem>true</greyWaterSystem><greyWaterSystem>false</greyWaterSystem>
```

### See Also

`ecoFriendly`.

## gasHeating

Specifies if the listed property has Gas Heating.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<gasHeating>true</gasHeating><gasHeating>false</gasHeating>
```

### See Also

`features`.

## gym

Specifies if the listed property has access to a Gym included in the sale or lease.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<gym>true</gym><gym>false</gym>
```

### See Also

`features`.

## headline

This is a single line description of the property.

All property types must include a valid `headline`.

### Validation

The `headline` may have up to 150 characters of alphabetic, numeric or punctuation characters. HTML tags will be removed if detected, and rich text characters may be categorised as poorly formed XML.

### Valid Examples

```
<headline>Location! Location! Location!</headline><headline>Renovator's Delight!</headline>
```

## Highlight

This element specifies bullet point summary highlights for listed `commercial` property.

### Validation

This field is only applicable to `commercial` listings. `Commercial` listings can have up to 3 property `highlights`. Each `highlight` can be a maximum of 40 characters.

### Valid Examples

```
<highlight id="1">Street front</highlight><highlight id="2">Undercover Parking</highlight><highlight id="3"/>
```

## id

As an element (rather than an attribute), this represents the unique identity code of an existing Project Profile. The `id` for each Project Profile can be in Agent Admin, on the Project Profile tab.

A Project Profile cannot be created via XML; only have new `Residential`, `Land` and `New Home for sale` listings assigned to it.

If `id` is omitted or empty on listing creation, the listing will be processed and attributed to the account – appearing in the Agent Admin mapping screen, where it can be attached to a project.

If `id` is omitted on listing update, the listing update will not be processed – with an error presented.

If `id` is empty on listing update, the listing will be detached from all projects – appearing in the Agent Admin mapping screen, where it can be attached to a project.

### Validation

The project profile `id` must already exist.

The project profile and listing must have the same `agentID` and `Suburb` – the `id` will be used to confirm this.

### Valid Examples

(Assuming the project `ID` exists.)

```
<project>  <id>600004427<id></project>
```

> Please Note: In the following example, a new listing will be sent to the Agent Admin mapping screens, and an existing listing will be detached from any project it was previously attached to.

```
<project>  <id></id></project>
```

### See Also

`order`, `project`.

## img

The `img` element is used to refer to a JPEG, GIF or PNG image file depicting the property. A total of 35 images can be provided for each listing.

**We recommend the following image specs:**

\*\*Aspect Ratio \*\*

\*\* Minimum Pixel Dimensions \*\*

\*\* Recommended Pixel Dimensions \*\*

\*\* Recommended megapixel \*\*

\*\* Recommended DPI\*\*

4:3

800x 600

1920x 1440

2.7

72 to 96

3:4

800x 600

1440x 1920

2.7

72 to 96

16:10

800x 500

1920x 1200

2.3

72 to 96

16:9

800x 450

1920x 1080

2.0

72 to 96

3:1

800x 266

1920x 640

1.2

72 to 96

While our system accepts image resolutions outside the above specifications, to utilise them across our many 16:9 and 4:3 implementations some modifications may be applied. For best results, please abide by the recommendations above.

Images are provided to REA by a URL attribute in the `img` element.

> Please note; slow storage/server solutions may produce a **timeout** warning from our XML system, failing the upload.

> Please note; Legacy submission methods (eg, INLINE/ZIP) are being deprecated, and may be removed in future.

### Validation

The _url_ attribute must point to an accessible JPEG, GIF or PNG file, with a file size of less than 60MB.

A minimum of 1 image must be supplied with every listing, with the _id_ of ‘m’ (representing the main image).

A total of 35 images can be supplied; the id attributes must be in the range ‘a’ to ‘z’ (and if more than 25 images), ‘aa’ to ‘ai’.

The `modTime` attribute, must follow the Date and Time validation rules.

### Updating an image:

The `modTime` attribute on the img element controls how REA treats image updates. The `modTime` attribute set against the image is considered separate to the `modTime` attribute set against the listing. The `modTime` for an image should only be updated, if the image it references has changed – this avoids unnecessary calls to the image host.

### Removing an image:

A previously supplied image can be removed by submitting an empty `img` element and _id_ combination.

### Valid Examples

Adding an image

```
<img id="m" modTime="2013-01-21-12:30:00" url="https://realestate.com.au/picsatrea.jpg" format="jpg" />
```

Removing an image

```
<img id="a"/>
```

### See Also

`floorplan`, `objects`.

## hydronicHeating

Specifies if the listed property has Hydronic Heating.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<hydronicHeating>true</hydronicHeating><hydronicHeating>false</hydronicHeating>
```

### See Also

`features`.

## improvements

Describes any improvements made to a `rural` property.

### Validation

Descriptive text of up to 65535 characters long is accepted as valid.

### Valid Examples

```
<improvements></improvements><improvements>Shearing shed, barn and machinery shed.</improvements>
```

### See Also

`ruralFeatures`.

## insideSpa

Specifies whether the property has an indoor spa.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

## inspection

Used to specify a single open-for-inspection (OFI) timeslot.

**Note:** Must be contained within the parent element tags

### Validation

Only the following format is accepted as valid: _DD_\-_MON_\-_YYYY\_\_hh_:_mm\[am|pm\]_ to _hh_:_mm\[am|pm\]_

### Valid Examples

```
<inspectionTimes>  <inspection>21-Dec-2006 11:00am to 1:00pm</inspection>  <inspection>02-Jan-2006 12:00pm to 12:30pm</inspection></inspectionTimes>
```

### See Also

`inspectionTimes`.

## inspectionTimes

The parent element in which `inspection` child elements should be contained.

**Note:** This element is not available for `commercial` listings. It is only supported for `residential`, `rental`, `land`, and `rural` listing types.

### Valid Examples

```
<inspectionTimes>  <inspection>21-Dec-2006 11:00am to 1:00pm</inspection>  <inspection>02-Jan-2006 12:00pm to 12:30pm</inspection></inspectionTimes>
```

### See Also

`inspection`.

## intercom

Specifies if the listed property has an intercom.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<intercom></intercom><intercom>true</intercom><intercom>false</intercom>
```

### See Also

`features`.

## irrigation

Describes any developed irrigation on a `rural` property.

### Validation

Descriptive text of up to 65535 characters long is accepted as valid.

### Valid Examples

```
<irrigation></irrigation><irrigation>Electric pump from dam and bore.</irrigation>
```

### See Also

`ruralFeatures`.

## isHomeLandPackage

Indicates if the `residential sale` listing is a ‘House and Land Package’.

> Please note: This will also place the property in the ‘New Home For Sale’ section of realestate.com.au, provided the agency has a ‘New Homes’ subscription with REA.

### Validation

The value must be ‘yes’ or ‘no’.

### Valid Examples

```
<isHomeLandPackage value="yes"/>
```

### See Also

`buildingDetails`.

## isMultiple

This element indicates if the listed `commercial` property can be sold or leased in more than one configuration – for example, must a renter lease the entire building, or are they able to lease just floors 3 and 4?

### Validation

The element must contain a _value_ attribute with either yes or no.

Available for `commercial` listings only.

If no value is provided or the element is omitted on listing creation entirely, ‘no’ will be implied – eg, representing that the property can only be leased or purchased in one configuration.

\*\*Where `isMultiple` is ‘yes’:

-   A price `range` must be provided to demonstrate the highest priced configuration of the property, and the lowest priced configuration - instead of a single value.
-   An area `range` must be provided to demonstrate the largest configuration available, and the smallest configuration available - instead of a single value. Area range is not required for listings with a `commercialCategory` of `Land/Development`.

### Valid Examples

```
<isMultiple value="yes"/><isMultiple value="no" />
```

### See Also

`area`, `price`, `range`.

## land

Represents a vacant, undeveloped block of land available for purchase.

**Status**

**Description**

current

When a property is for sale/lease and published to realestate.com.au

sold

The property has been sold.

offmarket

The property is sold/leased by another agency, the agency no longer has the sales/lease agreement or the listing should be unpublished and removed from realestate.com.au temporarily.

deleted

The property upload is in error and the listing should be removed and not accessible by the agency.

### Validation

The _modTime_ attribute follows the Date and Time validation rules.

## landCategory

This element demonstrates the intended use of the listed `land`.

### Validation

The _name_ attribute must be one of `Commercial` or `Residential`.

## landDetails

This is used to describe the physical attributes of the land being offered

### See Also:

`area`, `frontage`, `depth` and `crossOver`

## linkedInURL

Represents the URL to the _public_ LinkedIn profile page of a listing agent.

### Validation

Any string of up to 128 characters will be accepted.

### Valid Examples

```
<linkedInURL>http://au.linkedin.com/pub/dev-email/37/599/39a</linkedInURL><linkedInURL>http://www.linkedin.com/company/1508717</linkedInURL>
```

## listingAgent

This element contains the contact details for a single agent that is listing the property.

`Residential` listings can have up to 2 `listingAgent` elements associated with each listing - both must be from within the same agency.

`Commercial` listings can have:

-   Up to 4 _listingAgent_ elements associated with each listing, when the _listingAgents_ are from the publishing agency/`agentID`, or
-   Up to 3 conjunctional `listingAgent` elements with each listing, when the agents are from other agencies/different `agentIDs`.

### id

The _id_ attribute refers to the sequence of the `listingAgent` and ranges from 1 to 4. It is assumed that a `listingAgent` without an `agentID` or _id_ attribute is the primary agent.

### displayAgentProfile

The _displayAgentProfile_ attribute controls whether the Agent Profile appears on the “Find an Agent” section on realestate.com.au. Accepted values for this attributes are: `yes` and `no`. By default, this is set to `yes`.

### Validation

Conjunctional `listingAgent` elements must use the _id_ attribute 2, 3 or 4 and must provide a valid `agentID`

If you wish to delete a `listingAgent`, then you only need to provide the _id_ attribute.

> Please Note: It is not considered valid to modify a listing agent on a property that has been marked as Sold.

**Valid Example**

```
<listingAgent displayAgentProfile="yes" id="1">  <name>Mr. Primary Lister</name><telephone type="mobile">05 12345678</telephone>  <email>pl@somedomain.com.au</email><twitterURL>http://twitter.com/#!/plAtSomeDomain</twitterURL>  <facebookURL>http://www.facebook.com/pages/Some_Domain_Facebook_Page</facebookURL>  <linkedInURL>http://au.linkedin.com/pub/primary-lister/37/599/39a</linkedInURL></listingAgent>
<listingAgent id="2">  <agentID>XNWSUR</agentID>  <name>Mr. Conjunction Lister</name>  <telephone type="mobile">05 1234 5678</telephone>  <email>cl@somedomain.com.au</email>  <twitterURL>http://twitter.com/#!/clAtSomeDomain</twitterURL>  <facebookURL>http://www.facebook.com/profile.php?id=7834527823478</facebookURL>  <linkedInURL>http://au.linkedin.com/pub/conjunction-lister/37/639/39a</linkedInURL></listingAgent>
```

### See Also:

`name`, `agentID`, `uniqueListingAgentID` ,`email`, `telephone`, `twitterURL`, `facebookURL` and `linkedInURL`.

## livingAreas

This depicts the number of living areas within the property.

### Validation

A whole number greater than or equal to zero is accepted as valid.

Default value: `0`

### Valid Examples

```
<livingAreas></livingAreas><livingAreas>0</livingAreas><livingAreas>1</livingAreas><livingAreas>3</livingAreas>
```

## lotNumber

The prefix to the `streetNumber` of the listing.

Used by `land` listing types, this is in reference to a specified/allocated undeveloped block of land.

**Valid Example**

```
<lotNumber>2</lotNumber>
```

## max

Used to specify the maximum value of an element, generally as the upper bound of a `range`.

### See Also

`min`, `range`.

## media

The `media` element is used to refer to an REA recognised piece of media that correlates to a property or listing.

### Media Type:

This stipulates the type of `media` included in the entry. Below are the REA recognised media types:

Media Type:

Description:

Quantity limit:

`attachment`

This refers to content that REA will download, and surface on listings and products from our own hosting services.

1

_At this point in time, “Attachment” is the only supported media type, under the <media> element._

## min

Used to specify the minimum value of an element, generally as the lower bound of a range.

### See Also

`max`, `range`.

## miniweb

This element is a URL linking to an external site – providing additional information about the property. It must only be used to link to a site that is specifically relevant to the listing.

`commercial` listings can upload a maximum of 3 `miniweb` elements. The _id_ attribute refers to the sequence of the miniweb and ranges from 1 - 3.

### Validation

A `miniweb` provided to REA requires a source URL, in a standard “http:// ” or “https://” structure.

The id attribute must be in the range of 1-3

**Valid Example**

```
<miniweb>  <uri id="1">http://www.externalclientwebsite.com.au/101LonsdaleStreet.html</uri>  <uri id="2">http:://www.externalclientwebsite.com.au/101LonsdaleStreetInterior.html</uri>  <uri id="3"></miniweb>
```

## municipality

Represents the formally recognised local government or council, in which the property is located. These must be a clearly defined territory, typically governed by a mayor and a city council or municipal council. Municipality is ignored on upload, however is included in the export.

## name

Represents, depending on the parent element, the `name` of an estate, `listingAgent`, or `vendorDetails`.

### Validation

Up to 65 text only characters.

### Valid Examples

```
<name>City of Bayside</name>
```

## newConstruction

Specifies if the listed property is a new construction or an established property.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`.

**Residential Sale & Rental:**

If no value is provided or the element is omitted entirely, `false` will be implied.

**Home and Land Packages:**

If no value is provided or the element is omitted entirely, `true` will be implied.

Previous legacy validations remain supported, but may be deprecated in future.

### Valid Examples

```
<newConstruction>true</newConstruction><newConstruction>false</newConstruction>
```

## objects

Objects are file attachments to the listing. Typically, they are binary files.

### See Also

`floorplan`, `img`, `documents`.

## order

An order by which listings linked to a Project Profile are sorted, when displayed on our sites (for example Agent Admin, Buy). Order is an integer, which begins from 0.

If the `order` tag is omitted, empty, or invalid on listing creation, the listing will be sent to the top of the project listings.

If the `order` tag is omitted, empty, or invalid when updating a listing, the listing will remain in its previous position.

If an XML file contains listings with `order` sub-elements that are valid and omitted/empty/invalid, the listings with valid tags will have ordering precedence over the others.

### Validation

The order element must contain an integer.

### Valid Examples

```
<project>  <order>0</order></project>
```

### See Also

`project`, `id`.

## openFirePlace

Specifies if the listed property has an open fire place.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<openFirePlace></openFirePlace><openFirePlace>true</openFirePlace><openFirePlace>false</openFirePlace>
```

### See Also

`features`.

## openSpaces

This specifies the number of car parking spaces on a `residential` or `rental` property, that are neither carported, nor garaged. e.g. A paved parking space with no cover, would be considered an `openSpace`.

### Validation

A whole number greater than or equal to zero is accepted as valid. The default value is `0`.

### Valid Examples

```
<openSpaces></openSpaces><openSpaces>0</openSpaces><openSpaces>1</openSpaces><openSpaces>3</openSpaces>
```

### See Also

`carports` or `garages`.

## outdoorEnt

Indicates whether the property has an outdoor entertaining area available.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

## otherFeatures

This element provides the ability to list any other notable property features (that are not available within the list of predefined `feature` elements), in plain text, with comma separation.

### Validation

Up to 100 characters of text is accepted as valid.

### Valid Examples

```
<otherFeatures>Stables, Award-winning garden</otherFeatures>
```

### See Also

`features`.

## Outgoings

This is used to portray the additional expenses incurred in a `commercial` property’s lease or sale (eg, rates, insurance, repairs etc).

### Validation

The outgoings value is validated the same as for the _price_ element.

## outsideSpa

Specifies whether the property has a spa that is outside the house.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

## parkingComments

This element is an alphanumeric string, used to describe or make comments about the parking at a `commercial` property.

### Validation

Up to 150 characters permitted.

**Valid Example**

```
<parkingComments>Secure parking is provided and monitored on each level</parkingComments>
```

## payTV

Specifies if the listed property has Pay TV access.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<payTV>true</payTV><payTV>false</payTV>
```

### See Also

`features`.

## poolInGround

Specifies if the listed property has an in-ground swimming pool.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<poolInGround></poolInGround><poolInGround>true</poolInGround><poolInGround>false</poolInGround>
```

## poolAboveGround

Specifies if the listed property has an above ground swimming pool.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<poolAboveGround></poolAboveGround><poolAboveGround>true</poolAboveGround><poolAboveGround>false</poolAboveGround>
```

## petFriendly

This element is used on `rental` listings, specifying if pets are specifically excluded as part of the lease agreement.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<petFriendly></petFriendly><petFriendly>true</petFriendly><petFriendly>false</petFriendly>
```

## postcode

This is the recognised postal code for the property.

### Validation

All new property listings require a `postcode` value.

The `postcode` value must be a four digit number, present in the Australia Post Postcode database, [https://auspost.com.au/postcode](https://auspost.com.au/postcode)

**The postcode must match the `suburb` value submitted, within the `address` element.**

### Valid Examples

```
<postcode>3000</postcode>
```

### Invalid Examples

```
<postcode>820</postcode><postcode>80210</postcode>Any postcode between 2595 and 2599.
```

## price

This element represents the `price` of the property, and needs to be represented in AUD$. `land`, `residential`, `rural` and `commercial` listings require a `price` element. For `rental` listings refer to `rent`.

`commercial` listings can specify whether or not GST is included in the `price`. This is done using the _tax_ attribute.

Only `commercial` listings with an `isMultiple` value of _yes_ may use the `range` element. Refer to `range` for example.

The `display` attribute controls if the submitted data is to be actively displayed in REA products.

> Please Note: The _display_ attribute controls if the `price` or `priceView` fields are displayed on site. If _display_ is set to ‘yes’ and a `priceView` element has been submitted, the `priceView` value will be displayed in place of the `price` or `commercialRent` values.

### Validation

The `price` value must be a number.

For the `residential` and `commercial` uploads, price must be a number greater than 2900

The _display_ attribute must be one of the ‘Accepted Values’ in the following table, otherwise it will default to `yes`.

Accepted values

Display price

”yes”, “1”, “true”

Hide price

”no”, “0”, “false”

### Valid Examples

```
<price>240000</price><price display="yes">500000</price>
```

### Invalid Examples

```
<price></price><price>0</price><price>$300000</price><price>1,500,000</price><price>250000-310000</price><price display="yes"></price>
```

### See Also

`isMultiple`, `priceView`, `range`, `rent`, `tax` .

## priceView

This element represents a text string describing the price of the listed property, that can be displayed in place of the `price` element.

If present and valid, the `priceView` value will display in place of `price` and/or `commercialRent` – unless _display_ is set to ‘no’. This includes `commercial` `isMultiple` listings, where both `price` _and_`commercialRent` have been supplied for the one listing.

### Validation

Any mixture of up to 50 viewable alphabetic, numeric, or punctuation characters is accepted.

### Valid Examples

```
<price>$500,000.99</price><priceView>Between $400,000 and $600,000</priceView>
```

### See Also:

`price`.

## project

This element indicates the listing is part of a Project Profile – so it contains child elements of `id` and `order`. This element and its child elements are not mandatory, and will only impact customers with the Project Profiles Access Subscription (‘_DeveloperProject0’_).

**Valid Example**

```
<project><id>600004427</id><order>7</order></project>
```

### See Also

`order`, `id`.

## propertyExtent

This optional element depicts the proportion of a `commercial` building that is for lease – eg, the ‘whole’ building, or ‘part’.

Accepted values: ‘whole’ or ‘part’

If no value is provided or the element is omitted during creation of a new listing, ‘not applicable’ will be implied.

**Valid Example**

```
<propertyExtent>whole</propertyExtent>
```

## purchaseOrder

This element provides customers the ability to assign their internal ‘purchase order’ reference to a `commercial` listing on our site. This value is visible on our invoices.

### Valid Examples

```
<purchaseOrder>1234567890</purchaseOrder><purchaseOrder>abc123</purchaseOrder>
```

### Validation

Any text up to 20 characters long is accepted as valid

## range

This element is used to enclose a _min_ and _max_ value. This element is only applicable to `commercial` property listings, where `isMultiple` value is “yes”>.

For `commercial` listings only where the `isMultiple` value for price is “yes”>:

```
<price><range> <min>450000</min><max>550000</max></range></price>
```

### See Also

`isMultiple`, `max`, `min`, `price`, `rentPerSquareMetre`.

## remoteGarage

Defines whether the property has a remote controlled garage door.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

## rent

This element includes 3 details:

1.  the rental `price` for the property,
2.  the period over which the rent amount applies,
3.  whether to display the price or not

Please note, a Weekly Rental Price is mandatory for `Rental` listings, as this is used to refine search results by `price`. It may however, be hidden from site users by setting the _display_ attribute to ‘no’, or submitting the `priceView` element (displaying a text based replacement).

You cannot however, provide two conflicting instances of the _display_ attribute (eg, one in `priceView` and one in `rent`).

**Note:** REA now ignore the display value and always show the price on rental listings

### Validation

-   Only values of 50 or greater are accepted.
-   The _period_ attribute must be `week`.
-   The _display_ attribute must be one of the ‘Accepted Values’ in the following table, otherwise it will fail.

Accepted values

Display price

”yes”, “1”, “true”

Hide price

”no”, “0”, “false”

### Valid Examples

```
<rent period="week">120</rent><rent display="yes" period="week">250</rent>
```

‘Contact Agent’ will display if the `display` value is set to `no`.

```
<rent display="no" period="week">200</rent>
```

### Invalid Examples

```
<rent>120</rent><rent period="week">0</rent><rent period="week">null</rent><rent period="week" display="1">145</rent><rent period="week" display="No">180</rent><rent display="yes" period="week"></rent>
```

## rentPerSquareMetre

Used within the `commercialRent` element to indicate the rent per square metre per annum, for a `commercial` property. It is only relevant to listings with a `commercialListingType` value of ‘lease’ or ‘both’.

### Validation

It is a validation error to include a range that does not have both a _min_ and _max_ value.

### Valid Examples

See `commercialRent` for valid examples.

### See Also

`commercialRent`, `range`.

## rental

this indicates the listings relates to a residential property available for rent.

**Status**

**Description**

current

When a property is for sale/lease and published to realestate.com.au

leased

The property has been leased or rented.

offmarket

The property is sold/leased by another agency, the agency no longer has the sales/lease agreement or the listing should be unpublished and removed from realestate.com.au temporarily.

deleted

The property upload is in error and the listing should be removed and not accessible by the agency.

### Validation

The _modTime_ attribute follows the Date and Time validation rules.

## residential

This indicates the listing relates to a `residential` property for sale.

**Status**

**Description**

current

When a property is for sale/lease and published to realestate.com.au

sold

The property has been sold.

offmarket

The property is sold/leased by another agency, the agency no longer has the sales/lease agreement or the listing should be unpublished and removed from realestate.com.au temporarily.

deleted

The property upload is in error and the listing should be removed and not accessible by the agency.

### Validation

The _modTime_ attribute follows Date and Time validation rules.

## return

This element represents the annual rate of ‘return’ (in percentage) provided by this property. In order to demonstrate a `return`, the property must be currently tenanted.

### Validation

The rate of `return` must be a number, followed optionally by a decimal point and a decimal component.

Percentage character immediately following number or decimal component is accepted as valid.

### Valid Examples

```
<return>5</return><return>11.2</return><return>5%</return><return>2.3%</return>
```

### Invalid Examples

```
<return>$100,000</return>
```

## reverseCycleAirCon

Specifies if the listed property has Reverse Cycle Air Conditioning.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<reverseCycleAirCon>true</reverseCycleAirCon><reverseCycleAirCon>false</reverseCycleAirCon>
```

### See Also

`features`.

## rumpusRoom

Specifies if the listed property has Rumpus Room.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<rumpusRoom>true</rumpusRoom><rumpusRoom>false</rumpusRoom>
```

### See Also

`features`.

## rural

This depicts the listing relates to a `rural` property for sale.

**status**

**Description**

current

When a property is for sale/lease and published to realestate.com.au

sold

The property has been sold.

offmarket

The property is sold/leased by another agency, the agency no longer has the sales/lease agreement or the listing should be unpublished and removed from realestate.com.au temporarily.

deleted

The property upload is in error and the listing should be removed and not accessible by the agency.

### Validation

The _modTime_ attribute follows the Date and Time validation rules.

## ruralCategory

This element can be considered a sub-category of ‘rural’, defining the primary agricultural use of a rural property.

\*\* Available Values \*\*

Cropping

Dairy

Farmlet

Horticulture

Lifestyle

Livestock

Viticulture

MixedFarming

Other

Any type of rural property that does not fit into the above categories.

### Validation

The _name_ attribute must have one of the values listed in the above table.

## ruralFeatures

This element defines particular features of a `rural` property.

### Validation

For child elements available under ruralFeatures see fencing, annualRainfall, soilTypes, improvements, councilRates, irrigation, carryingCapacity, services

\*\* Available Values \*\*

fencing

annualRainfall

soilTypes

improvements

councilRates

irrigation

carryingCapacity

services

## secureParking

Indicates whether secure parking is available at the property.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

## services

Describes any services supplied to a `rural` property.

### Validation

Descriptive text of up to 65535 characters long is accepted as valid.

### Valid Examples

```
<services></services><services>Power, Telephone. School Bus to Front Gate.</services><services>Power, phone, sealed road.</services><services>Power, telephone, airstrip, school bus, mail.</services>
```

## setSale

The property is offered for sale, up to a specific date.

### Validation

A _setSale date_ must be supplied.

This element follows the [Date and Time validation rules](../specifications/#date-and-time-formats).

### Valid Examples

```
<setSale date="2017-05-01-10:30:00"/><setSale date="2017-05-01"/>
```

### See Also

`authority`

## shed

Indicates whether the property has a shed included.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

## site

0 - 50 alphanumeric characters to display the name or _site_ of a `commercial` listing

**Valid Example**

-   <address><site>Victoria Gardens Shopping Complex</site></address>

## smokers

Specifies if smokers are specifically excluded from applying for this property, as part of a lease agreement.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<smokers></smokers><smokers>true</smokers><smokers>false</smokers>
```

## soilTypes

Describes the soil of a `rural` property.

### Validation

Descriptive text of up to 65535 characters long is accepted as valid.

### Valid Examples

```
<soilTypes>clay loam</soilTypes>
```

## solarHotWater

Specifies if solar hot water is included for the listed property.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<solarHotWater>true</solarHotWater><solarHotWater>false</solarHotWater>
```

### See Also

`ecoFriendly`.

## solarPanels

Specifies if solar panels are included for the listed property.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<solarPanels>true</solarPanels><solarPanels>false</solarPanels>
```

### See Also

`ecoFriendly`.

## soldDate

`soldDate` indicates the date the listed property was `sold`. This should be the _date_ the sale contract was signed (eg, no more offers are being accepted) - not the settlement date.

### Validation

-   When submitting the `status` as `Sold`, this field is mandatory.
-   This _date_ cannot be in the future.
-   This can only be included as an element of the `soldDetails`.
-   A range cannot be used for `soldPrice`.

### Valid Examples

```
<soldDetails>  <soldDate>2025-01-03</soldDate>  <soldPrice display="yes">1500000</soldPrice></soldDetails>
```

## soldDetails

`soldDetails` must only be included if the status is submitted as `sold`, and should include the `soldDate` and `soldPrice`. See `soldDate` for valid example.

## soldPrice

This indicates the actual price for which the property was `sold`, and whether to display this agent supplied price or not. This is included as an element of the `soldDetails`. See `soldDate` for valid example.

### Validation

-   Where the status is `Sold`, this field is mandatory.
-   The `soldPrice` figure is validated the same as for the `price` element.
-   The `display` attribute must be one of `yes` and `no`. `range` is not supported.
-   Negative signs and decimals will be omitted. For example, -250000 will be converted to 250000

### Valid Examples

```
<soldPrice>250000</soldPrice><soldPrice display="no">250000</soldPrice><soldPrice display="yes">250000</soldPrice>
```

### Invalid Examples

```
<soldPrice display="yes"></soldPrice>
```

## splitSystemAirCon

Specifies if the listed property has Split-System Air Conditioning.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<splitSystemAirCon>true</splitSystemAirCon><splitSystemAirCon>false</splitSystemAirCon>
```

### See Also

`features`.

## splitSystemHeating

Specifies if the listed property has Split-System Heating.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<splitSystemHeating>true</splitSystemHeating><splitSystemHeating>false</splitSystemHeating>
```

### See Also

`features`.

## state

This represents the state or territory where the listed property is located.

### Validation

**Available Values**

act

vic

nsw

qld

sa

tas

nt

wa

australian capital territory

victoria

new south wales

queensland

south australia

tasmania

northern territory

western australia

Case is ignored.

### See Also

`region`, `address`.

## street

### Validation

All `rental` and `Residential` property listings must have a `street` value.

## streetNumber

The number of the property on the `street`, not including the street name itself.

Any unit/flat/apartment numbers can be submitted under the `subNumber`.

### Validation

All `rental` and `Residential` listings, must have a `streetNumber`. Zero or 0 is not considered a valid street number.

Up to 20 characters of text are allowed.

### Valid Examples

```
<streetNumber>12</streetNumber><streetNumber>LOT 4A</streetNumber><streetNumber>2/102</streetNumber><streetNumber>Unit 5, 102</streetNumber><streetNumber>7 &amp; 9</streetNumber>
```

### Invalid Examples

```
<streetNumber>0</streetNumber><streetNumber>7 &amp; 9</streetNumber> (any ' &' characters must be encoded in an XML document)
```

### See Also

`address`, `street`.

## study

Specifies if the listed property has Study.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<study>true</study><study>false</study>
```

### See Also

`features`.

## subNumber

The prefix to the `streetNumber` or `lotNumber` of the listing.

`commercial` listings often refer to this as the suite, shop, floor or factory number.

`residential` listings often refer to this as the unit, flat or apartment number.

### Validation

Listings can be uploaded with a `subNumber` as a separate field, or it can be included as part of the `streetNumber` element; but cannot include both.

## suburb

The name of the `suburb` where the property is physically located, as recognised by the appropriate state government.

`Commercial` listings may hide their `suburb` (and implicitly all of their address) from the buyer by setting the _display_ attribute to no.

### Validation

The `suburb` name submitted must be a valid and proper suburb / locality name, as recognised by REA’s locations database. These can only be added to REA’s locations database if they are deemed legitimate bordered localities in Australia - by the appropriate department within the relevant state government. [See here for a list of supported suburbs](../supported-suburbs/).

We have three requirements that all Australian place names need to meet so that we can verify that they are genuine `suburbs`. These are general guidelines used to maintain our own locations database:

1.  They need to be registered as a Delivery Area with a post code by Australia Post ( [https://auspost.com.au/postcode](https://auspost.com.au/postcode)).
    
2.  They need to be an officially recognised location with a boundary (‘LOCB’ or ‘SUB’) by Geoscience Australia ( [https://placenames.fsdf.org.au/](https://placenames.fsdf.org.au/)).
    
3.  They need to have an exact pinpoint (longitude and latitude) on Google Maps ( [https://www.google.com/maps](https://www.google.com/maps)).
    

### Valid Examples

```
<suburb>Melbourne</suburb><suburb>MOUNT GAMBIER</suburb><suburb>NORTHBRIDGE</suburb><suburb display="no">Brisbane</suburb>
```

### Invalid Examples

```
<suburb>MT GAMBIER</suburb><suburb>TIMBUCKTOO</suburb><suburb display="no"/><suburb display="">Brisbane</suburb>
```

### See Also

`address`, `municipality`, `postcode`.

## telephone

Represents a single telephone number, including area code.

### Validation

A valid phone number consists of up to 40 numeric or whitespace characters.

The _type_ attribute must be `mobile`.

## tenancy

Indicates whether or not the property is a Vacant possession or Tenanted Investment. Only applicable to Commercial listings.

Accepted values: unknown, vacant or tenanted Default: unknown

## tennisCourt

Specifies if the listed property has a tennis court.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<tennisCourt></tennisCourt><tennisCourt>true</tennisCourt><tennisCourt>false</tennisCourt>
```

## toilets

This represents a total count of toilets available on the property.

### Validation

A whole number greater than or equal to zero is accepted as valid. The default value is `0`.

### Valid Examples

```
<toilets></toilets><toilets>0</toilets><toilets>1</toilets><toilets>3</toilets><toilets>yes</toilets>
```

## twitterURL

Represents a URL to the Twitter profile page of the `listing agent`.

### Validation

Any string of up to 128 characters will be accepted.

### Valid Examples

```
<twitterURL>http://www.twit​ter.com/#!/MrsStephenFry</twitterURL><twitterURL>http://twitter.com/MrsStephenFry</twitterURL><twitterURL>https://twitter.com/MrsStephenFry</twitterURL><twitterURL>https://www.twitter.com/#!/mrsstephenfry</twitterURL>
```

## underOffer

Describes if the property is currently under any offers.

> Please note – this option can only be used if a contract of sale has not yet been signed by both parties. That action indicates the property is `sold`.

### Validation

The _value_ attribute of `underOffer` must be one of ‘yes’ or ‘no’.

### Valid Examples

```
<underOffer value="yes"/><underOffer value="YES"/><underOffer value="no"/>
```

## uniqueID

This represents a string supplied by an XML provider, to uniquely identify a listing (against an `agentID`). The value must be unique for the real estate agent (different agencies may use the same `uniqueID`, representing different properties).

The `uniqueID` needs to be populated/provided upon the creation of any new listing – however cannot be changed thereafter. If the customer’s listing predates their use of your system, it will have a pre-existing `uniqueID` - which must be provided in all update requests for that listing.

### Validation

Arbitary text with any mix of alphabetic, numeric, or punctuation; up to 50 characters long.

`uniqueID` should not contain special characters or spaces.

### Valid Examples

```
<uniqueID>1234567890</uniqueID><uniqueID>buckinghampalace</uniqueID>
```

## uniqueListingAgentID

This represents a string supplied by an XML provider, to uniquely identify an agent who is listing the property. The value must be unique for each listing agent and agency (different agencies may use the same `uniqueListingAgentID`).

A listingAgent can only be updated if this element is present. [See here for details about how to update a listing agent.](../specifications/#requirements-to-update-a-listing-agent-profile)

### `uniqueListingAgentID` update behaviour

Providing this field will allow you to **merge any provided fields in the `<ListingAgent />` element of your REAXML upload with any existing data currently stored in the listing agent’s profile** (i.e. fields in the latest REAXML upload will overwrite existing stored profile information)

### Valid Examples

_a. Create new ListingAgent_

```
<listingAgent id="1">  <uniqueListingAgentID>ea5524e2-09ea-11eb-adc1-0242ac120002</uniqueListingAgentID>  <name>My Initial Name</name>  <facebookURL>My Initial facebookURL</facebookURL>  <media>    <attachment usage="agentPhoto" id="a" url="https://my-image.com/INTIAL-HEADSHOT.png" />  </media></listingAgent>
```

_b. Update ListingAgent field_

This updates the `<name />` and `agentPhoto` of the ListingAgent, and leaves `<facebookURL />` untouched.

```
<listingAgent id="1">  <uniqueListingAgentID>ea5524e2-09ea-11eb-adc1-0242ac120002</uniqueListingAgentID>  <name>My Updated Name</name>  <media>    <attachment usage="agentPhoto" id="b" url="https://my-image.com/UPDATED-HEADSHOT.png" />  </media></listingAgent>
```

_c. Delete ListingAgent field_

To delete a field, simply exclude a value for the field. Other existing fields will be preserved.

```
<listingAgent id="1">  <uniqueListingAgentID>ea5524e2-09ea-11eb-adc1-0242ac120002</uniqueListingAgentID>  <facebookURL></facebookURL></listingAgent>
```

_d. Preserve all fields on ListingAgent_

You do not need to provide anything other than `<uniqueListingAgentID />` to indicate that no changes are required.

```
<listingAgent id="1">  <uniqueListingAgentID>ea5524e2-09ea-11eb-adc1-0242ac120002</uniqueListingAgentID></listingAgent>
```

### Validation

Arbitary text with any mix of alphabetic, numeric, or punctuation; up to 100 characters long.

`uniqueListingAgentID` should not contain special characters or spaces.

## vacuumSystem

Specifies if the listed property has a built-in ducted vacuum system.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<vacuumSystem>true</vacuumSystem><vacuumSystem>false</vacuumSystem>
```

## videoLink

Listings may present links to a video display of the property.

If the _URL_ references youtube hosted content, it will be embedded in the photo-carousel of the listing.

### Validation

The _href_ attribute of `videoLink` must be a valid _Video_ URL, and must refer to an accessible resource. This is not to be used as a link to agent sites or any sites other than legitimate property related Video Files.

```
<videoLink href="http://www.realestate.com.au/videos/VictoriaSt.avi"/>
```

To remove an existing `videoLink`, submit the `videoLink` element with the _href_ empty.

```
<videoLink href=""/>
```

## waterTank

Specifies if water tank included for the listed property.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<waterTank>true</waterTank><waterTank>false</waterTank>
```

### See Also

`ecoFriendly`.

## workshop

Specifies if the listed property has Workshop.

### Validation

To attribute this to a listing, submit the value as `true`. To remove this from a listing, submit the value as `false`. The default value is `false`.

### Valid Examples

```
<workshop>true</workshop><workshop>false</workshop>
```

### See Also

`features`.

## yearBuilt

This element is used to record the year when a property was built.

### Validation

`value` must be a 4-digit integer

### Valid Examples

```
<yearBuilt value="1997"/>
```

### Invalid Examples

```
<yearBuilt value="97"/>
```

## yearLastRenovated

This element is used to record the year when a property was renovated for the last time.

### Validation

`value` must be a 4-digit integer

### Valid Examples

```
<yearLastRenovated value="1988"/>
```

### Invalid Examples

```
<yearLastRenovated value="88"/>
```

## zone

Describes the land-use zoning for this `commercial` property.

### Validation

Up to 150 characters of alphabetic, numeric or punctuation is accepted as valid.

### Valid Examples

```
<zone>light industrial</zone><zone>FUTURE INDUSTRY</zone><zone>low density residential</zone>
```
