---
title: "Changelog"
source: https://partner.realestate.com.au/listing-upload/changelog/
fetched_at: 2026-04-17T03:52:34.186Z
---

# Changelog

Date

Element

Comments

18 Jun 2025

externalLink

Extend the usage of external links for property walkthrough video. [Detail here](../elements/#externallink).

27 Aug 2024

Return 409 `Conflict` response when user sending duplicate listings over a certain threshold.

02 Aug 2023

`helpCentreUrl` is added to reports response if there are any issues during uploads.

28 Sep 2022

address

Listing address cannot be updated for upgraded listings

10 Aug 2022

auction

Fixed mapping to allow Expression of Interest date and Tender Closing date to be set in auction `<auction />` element for `commercialAuthority`

02 Feb 2021

depositTaken

A new element `<depositTaken />` was added to describe rental listings when a deposit has been taken

21 Oct 2020

ListingAgent

Add `<uniqueListingAgentId />` element to allow updates to listing agent profile information.

21 Oct 2020

ListingAgent

Allow `<listingAgent />` to accept an attachment for the profile photo of the listing agent.

21 Oct 2020

ListingAgent

Add `displayAgentProfile` attribute.

21 Oct 2020

email

Add `receiveCampaignReport` attribute.

21 Oct 2020

telephone

Remove `BH` value from accepted `type` for `telephone`. Only `AH` and `mobile` remain.

21 Oct 2020

attachment

Remove `contentType` as a mandatory attribute on attachments.

20 Jan 2020

Introduced a XML file size limit of 20MB to reduce listing publication latency caused by large file uploads

20 Jan 2020

media & attachment

Removed the 50MP Image resolution limit and instead added a 60MB file size threshold for attachments

26 Nov 2018

auctionOutcome

A new element was added to accept Auction Results - including the “auctionDate&quot , “auctionResult&quot and “auctionMaxBid”

01 May 2017

media & attachment

A Media element was created to accept new content attachments - including the “Statement of Information”

08 April 2016

listingAgent

It is no longer valid to modify an existing agent on a listing which is sold

25 Jan 2016

status

Amendment to the status value definitions for all listing types, to ensure consistency with listing feeds being sent to our system

15 Jan 2016

inspectionTimes

Added inspectionTimes for Rural and Land listing types

16 June 2015

externalLink

Updated to also be used to transfer a VR(3D) tour URL. URLs should not include the ?autoload parameter. If two VR tour URLs are provided REA will only promote/integrate the single first entry.

01 Mar 2014

SoldDetails

REA will now automatically attribute a sold price sourced from RP Data to a property where the sold price was not provided or the sold price is not revealed.

01 Aug 2012

highlight

The maximum length of the highlight field of a Commercial listing or Commercial Land listing extends from 25 characters to 40 characters

07 May 2012

Building Area or Building Area Range is optional if the commercial listing category is only “Land/Development”.

10 Nov 2011

Added the ability to mark a property as a new construction or an established property.

03 Nov 2011

Added the ability to enter an RCA NABERS energy rating of 5.5 and 6.0.

19 Aug 2011

Added twitterURL, facebookURL and linkedInURL to listingAgent.

01 Jan 2011

Added new element of highlight for commercial and commercialLand listings. (Due to be released 1 Feb 2011). Added videoLink element for commercial and commercialLand listings. (Due to be released 1 March 2011)

01 oct 2010

Added new element of energy rating for commercial and business listings.

02 Feb 2010

Added new element of ecoFriendly with new options of solarPanels, solarHotWater, greyWaterSystem and waterTank for residential, home and land package, rural and rental properties. Added videoLink element. Added new allowances element with optional child emelements of petFriendly, smokers, and furnished for rental properties. Enabled tennisCourt, poolAboveGround and poolInGround feature fields for rental and rural category types. Added carports and garages feature fields for rural category types. Added new child elements remoteGarage, secureParking, balcony, deck, courtyard, outdoorEnt, shed, fullyFenced, openSpaces, insideSpa, outsideSpa, study, gasHeating, workshop, splitSystemHeating, floorboards, splitSystemAirCon, evaporativeCooling, gym, broadband, builtInRobes, hydronicHeating, payTV, dishwasher, ductedHeating, ductedCooling, reverseCycleAirCon, rumpusRoom, toilets and livingAreas for the residential, home and land package, rural and rental properties in the element Features. Enabled pool, tennisCourt, alarmSystem, intercom, vacuumSystem, openFirePlace, airConditioning for rental and rural properties in the element Features. Added area within buidingDetails to rental and rural property types. Added the area element within landDetails to rental properties. Modified the element ensuite so that it may store integer values. Added Address attribute of streetView

25 Nov 2009

Changed validation rules for energyRating.

23 Jun 2009

Removed deprecated ‘newlyBuilt’ element. Please use isHomeLandPackage to indicate if the property is a ‘New Home For Sale’ or a ‘House and Land Package for sale’.

01 May 2009

Added the optional availabilityLink element for holidayRental listings.

01 Apr 2009

Added category type specifically for holiday rentals. This replaces the use of the rental ‘holiday’ attribute which will be discontinued in future but remains for backwards compatibility. ‘holidayRental’ function with their own holiday Categories.

16 Mar 2009

Added the exclusivity element for commercial and business listings. This is a mandatory element which determines if the listing sent is open or exclusive. The detail is not seen on the consumer website.

05 Mar 2009

Added the purchaseOrder element for commercial, commericalLand and business listings. This is a currently optional element, purely for the agent’s convenience in tracking depth product purchases on REA invoices to specific purchase orders.
