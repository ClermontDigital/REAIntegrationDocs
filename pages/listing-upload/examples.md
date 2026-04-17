---
title: "REAXML Examples"
source: https://partner.realestate.com.au/listing-upload/examples/
fetched_at: 2026-04-17T03:52:38.936Z
---

# REAXML Examples

This page provides comprehensive REAXML examples for each listing type. Each example includes different status states to demonstrate the complete lifecycle of a property listing.

## Residential Listings

Residential listings represent houses, apartments, and other residential properties for sale.

### Current Listing

A current listing represents an active property for sale. This status should be used when creating a new listing or updating an existing one that remains on the market.

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE propertyList SYSTEM "http://reaxml.realestate.com.au/propertyList.dtd"><propertyList date="2009-01-01-12:30:00">  <residential modTime="2009-01-01-12:30:00" status="current">    <agentID>XNWXNW</agentID>    <uniqueID>ABCD1234</uniqueID>    <authority value="exclusive"/>    <underOffer value="no"/>        <newConstruction>1</newConstruction>    <listingAgent>      <name>Mr. John Doe</name>      <telephone type="mobile">05 1234 5678</telephone>      <email>jdoe@somedomain.com.au</email>      <twitterURL>https://www.twitter.com/JohnDoe</twitterURL>    </listingAgent>    <price display="yes">500000</price>    <priceView>Between $400,000 and $600,000</priceView>    <address display="yes">      <subNumber>2</subNumber>      <streetNumber>39</streetNumber>      <street>Main Road</street>      <suburb display="yes">RICHMOND</suburb>      <state>vic</state>      <postcode>3121</postcode>      <country>AUS</country>    </address>    <municipality>Yarra</municipality>    <streetDirectory type="melways">      <page>44</page>      <reference>G7</reference>    </streetDirectory>    <category name="House"/>    <headline>SHOW STOPPER!!!</headline>    <description>Don't pass up an opportunity like this! First to inspect will buy! Close to local amenities and schools. Features lavishly appointed bathrooms, modern kitchen, rustic outhouse.Don't pass up an opportunity like this! First to inspect will buy! Close to local amenities and schools. Features lavishly appointed bathrooms, modern kitchen, rustic outhouse.</description>    <features>      <bedrooms>4</bedrooms>      <bathrooms>2</bathrooms>      <ensuite>2</ensuite>      <garages>3</garages>      <carports>2</carports>      <remoteGarage>yes</remoteGarage>      <secureParking>yes</secureParking>      <airConditioning>1</airConditioning>      <alarmSystem>1</alarmSystem>      <vacuumSystem>no</vacuumSystem>      <intercom>no</intercom>      <pool type="inground">yes</pool>      <spa type="inground">no</spa>      <tennisCourt>yes</tennisCourt>      <balcony>yes</balcony>      <deck>yes</deck>      <courtyard>yes</courtyard>      <outdoorEnt>yes</outdoorEnt>      <shed>yes</shed>      <fullyFenced>yes</fullyFenced>      <openFirePlace>1</openFirePlace>      <heating type="other"/>      <hotWaterService type="gas"/>      <otherFeatures>balcony, courtyard, shed</otherFeatures>    </features>    <landDetails>      <area unit="squareMeter">80</area>    </landDetails>    <buildingDetails>      <area unit="square">40</area>      <energyRating>4.5</energyRating>    </buildingDetails>    <inspectionTimes>      <inspection>21-Jan-2009 11:00am to 1:00pm</inspection>      <inspection>22-Jan-2009 3:00pm to 3:30pm</inspection>    </inspectionTimes>    <vendorDetails>      <name>Mr. John Doe</name>      <telephone type="mobile">05 1234 5678</telephone>    </vendorDetails>    <externalLink href="http://www.realestate.com.au/"/>    <images>      <img id="m" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/imageM.jpg" format="jpg"/>      <img id="a" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/imageA.jpg" format="jpg"/>    </images>    <objects>      <floorplan id="1" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/floorplan1.gif" format="gif"/>      <floorplan id="2" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/floorplan2.gif" format="gif"/>    </objects>  </residential></propertyList>
```

### Sold Listing

A sold listing indicates the property has been sold. When sending this status, include the `soldDetails` element with the sale price and date. This removes the listing from active search results and marks it as sold.

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE propertyList SYSTEM "http://reaxml.realestate.com.au/propertyList.dtd"><propertyList date="2009-01-01-12:30:00">  <residential modTime="2009-01-01-12:30:00" status="sold">    <agentID>XNWXNW</agentID>    <uniqueID>ABCD12345</uniqueID>    <soldDetails>      <price display="yes">580000</price>      <date>2009-01-10-12:30:00</date>    </soldDetails>  </residential></propertyList>
```

### Withdrawn Listing

A withdrawn listing removes the property from realestate.com.au. Use this status when a listing is no longer active and should be deleted from the platform. Only the minimum required fields are needed.

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE propertyList SYSTEM "http://reaxml.realestate.com.au/propertyList.dtd"><propertyList date="2009-01-01-12:30:00">  <residential modTime="2009-01-01-12:30:00" status="withdrawn">    <agentID>XNWXNW</agentID>    <uniqueID>ABCD123456</uniqueID>  </residential></propertyList>
```

## Rental Listings

Rental listings represent properties available for lease.

### Current Listing

A current rental listing represents an active property available for rent. Include rental-specific fields like `rent`, `bond`, `dateAvailable`, and `allowances`.

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE propertyList SYSTEM "http://reaxml.realestate.com.au/propertyList.dtd"><propertyList date="2009-01-01-12:30:00">  <rental modTime="2009-01-01-12:30:00" status="current">    <agentID>XNWXNW</agentID>    <uniqueID>ABCD1234</uniqueID>    <depositTaken value="no"/>    <listingAgent>      <name>Mr. John Doe</name>      <telephone type="mobile">05 1234 5678</telephone>      <email>jdoe@somedomain.com.au</email>      <twitterURL>http://www.twitter.com/#!/JoeAtSomeDomain</twitterURL>      <facebookURL>http://www.facebook.com/pages/SomeDomain</facebookURL>      <linkedInURL> http://au.linkedin.com/pub/john-doe/37/599/39a</linkedInURL>    </listingAgent>    <dateAvailable>2009-01-26-12:30:00</dateAvailable>    <rent period="week">350</rent>        <newConstruction>true</newConstruction>    <bond>350</bond>    <address display="yes">      <streetNumber>39</streetNumber>      <street>Main Road</street>      <suburb display="yes">RICHMOND</suburb>      <state>vic</state>      <postcode>3121</postcode>      <country>AUS</country>    </address>    <municipality>Yarra</municipality>    <streetDirectory type="melways">      <page>44</page>      <reference>G7</reference>    </streetDirectory>    <category name="House"/>    <headline>SHOW STOPPER!!!</headline>    <description>Don't pass up an opportunity like this! First to inspect will buy! Close to local amenities and schools. Features lavishly appointed bathrooms, modern kitchen, rustic outhouse.Don't pass up an opportunity like this! First to inspect will buy! Close to local amenities and schools. Features lavishly appointed bathrooms, modern kitchen, rustic outhouse.</description>    <allowances>      <petFriendly>1</petFriendly>      <smoker>1</smoker>      <furnished>1</furnished>    </allowances>    <features>      <bedrooms>4</bedrooms>      <bathrooms>2</bathrooms>      <ensuite>2</ensuite>      <garages>3</garages>      <carports>3</carports>      <remoteGarage>yes</remoteGarage>      <secureParking>yes</secureParking>      <airConditioning>1</airConditioning>      <alarmSystem>1</alarmSystem>      <vacuumSystem>no</vacuumSystem>      <intercom>no</intercom>      <pool type="inground">yes</pool>      <spa type="inground">no</spa>      <tennisCourt>yes</tennisCourt>      <balcony>yes</balcony>      <deck>yes</deck>      <courtyard>yes</courtyard>      <outdoorEnt>yes</outdoorEnt>      <shed>yes</shed>      <fullyFenced>yes</fullyFenced>      <openFirePlace>1</openFirePlace>      <heating type="other"/>      <hotWaterService type="gas"/>      <otherFeatures>balcony, courtyard</otherFeatures>    </features>    <landDetails>      <area unit="squareMeter">60</area>    </landDetails>    <buildingDetails>      <area unit="square">25</area>      <energyRating>4.5</energyRating>    </buildingDetails>    <inspectionTimes>      <inspection>21-Jan-2009 11:00am to 1:00pm</inspection>      <inspection>22-Jan-2009 11:00am to 1:00pm</inspection>    </inspectionTimes>    <externalLink href="http://www.realestate.com.au/"/>    <images>      <img id="m" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/imageM.jpg" format="jpg"/>      <img id="a" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/imageA.jpg" format="jpg"/>    </images>    <objects>      <floorplan id="1" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/floorplan1.gif" format="gif"/>      <floorplan id="2" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/floorplan2.gif" format="gif"/>    </objects>  </rental></propertyList>
```

### Leased Listing

A leased listing indicates the property has been successfully rented. This status removes the listing from active rental searches and marks it as leased.

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE propertyList SYSTEM "http://reaxml.realestate.com.au/propertyList.dtd"><propertyList date="2009-01-01-12:30:00">  <rental modTime="2009-01-01-12:30:00" status="leased">    <agentID>XNWXNW</agentID>    <uniqueID>ABCD12345</uniqueID>  </rental></propertyList>
```

### Withdrawn Listing

A withdrawn rental listing removes the property from realestate.com.au. Use this when the rental listing should no longer appear on the platform.

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE propertyList SYSTEM "http://reaxml.realestate.com.au/propertyList.dtd"><propertyList date="2009-01-01-12:30:00">  <rental modTime="2009-01-01-12:30:00" status="withdrawn">    <agentID>XNWXNW</agentID>    <uniqueID>ABCD123456</uniqueID>  </rental></propertyList>
```

## Commercial Listings

Commercial listings represent business properties, offices, retail spaces, and other commercial real estate.

### Current Listing

A current commercial listing can be for sale or lease. Include commercial-specific fields like `commercialListingType`, `commercialRent`, and `commercialCategory`.

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE propertyList SYSTEM "http://reaxml.realestate.com.au/propertyList.dtd"><propertyList date="2009-01-01-12:30:00">  <commercial modTime="2009-01-01-12:30:00" status="current">    <agentID>XNWXNW</agentID>    <uniqueID>ABCD1234</uniqueID>    <commercialAuthority value="auction"/>    <exclusivity value="open"/>    <commercialListingType value="sale"/>    <underOffer value="no"/>    <listingAgent id="1">      <name>Mr. John Doe</name>      <telephone type="mobile">05 1234 5678</telephone>      <email>jdoe@somedomain.com.au</email>    </listingAgent>    <listingAgent id="2">      <name>Mrs. Jane Doe</name>      <telephone type="mobile">05 1234 5679</telephone>      <email>janedoe@somedomain.com.au</email>      <linkedInURL>http://au.linkedin.com/pub/jane-doe/83/393/62a</linkedInURL>    </listingAgent>    <price display="yes" >120000</price>    <priceView>To suit buyers 100K+ </priceView>    <commercialRent period="annual" plusOutgoings="no">10000</commercialRent>    <outgoings period="annual">3000</outgoings>    <return period="annual" unit="percent">11.2</return>    <currentLeaseEndDate>2009-01-10-12:30:00</currentLeaseEndDate>    <furtherOptions>store room</furtherOptions>    <address display="yes">      <streetNumber>39</streetNumber>      <street>Main Road</street>      <suburb display="yes">RICHMOND</suburb>      <state>vic</state>      <postcode>3121</postcode>      <country>AUS</country>    </address>    <municipality>Yarra</municipality>    <streetDirectory type="melways">      <page>44</page>      <reference>G7</reference>    </streetDirectory>    <commercialCategory name="Other"/>    <headline>SHOW STOPPER!!!</headline>    <description>Don't pass up an opportunity like this! First to inspect will buy! Close to local amenities and schools. Features lavishly appointed bathrooms, modern kitchen, rustic outhouse.</description>    <landDetails>      <area unit="square">40</area>      <frontage unit="meter">20</frontage>      <depth unit="meter" side="rear">20</depth>      <crossOver value="left"/>    </landDetails>    <buildingDetails>      <area unit="square">30</area>      <newlyBuilt value="yes"/>    </buildingDetails>    <carSpaces>12</carSpaces>    <auction date="2009-01-24-12:30:00"/>    <vendorDetails>      <name>Mr. John Doe</name>      <telephone type="mobile">05 1234 5678</telephone>    </vendorDetails>    <zone>Industrial</zone>    <externalLink href="http://www.realestate.com.au/"/>    <images>      <img id="m" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/imageM.jpg" format="jpg"/>      <img id="a" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/imageA.jpg" format="jpg"/>    </images>    <objects>      <floorplan id="1" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/floorplan1.gif" format="gif"/>      <floorplan id="2" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/floorplan2.gif" format="gif"/>    </objects>  </commercial></propertyList>
```

### Sold Listing

A sold commercial listing indicates the property has been sold. Include the sale price and date in the `soldDetails` element.

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE propertyList SYSTEM "http://reaxml.realestate.com.au/propertyList.dtd"><propertyList date="2009-01-01-12:30:00">  <commercial modTime="2009-01-01-12:30:00" status="sold">    <agentID>XNWXNW</agentID>    <uniqueID>ABCD12345</uniqueID>    <soldDetails>      <price display="yes" >160000</price>      <date>2009-01-24-12:30:00</date>    </soldDetails>  </commercial></propertyList>
```

### Withdrawn Listing

A withdrawn commercial listing removes the property from the platform.

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE propertyList SYSTEM "http://reaxml.realestate.com.au/propertyList.dtd"><propertyList date="2009-01-01-12:30:00">  <commercial modTime="2009-01-01-12:30:00" status="withdrawn">    <agentID>XNWXNW</agentID>    <uniqueID>ABCD12346</uniqueID>  </commercial></propertyList>
```

## Land Listings

Land listings represent vacant residential land or development sites.

### Current Listing

A current land listing represents available land for sale. Include land-specific fields like `landCategory`, `estate`, and `landDetails`.

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE propertyList SYSTEM "http://reaxml.realestate.com.au/propertyList.dtd"><propertyList date="2009-01-01-12:30:00">    <land modTime="2009-01-01-12:30:00" status="current">        <agentID>XNWXNW</agentID>        <uniqueID>ABCD1234</uniqueID>        <authority value="auction"/>        <underOffer value="no"/>        <listingAgent>            <name>Mr. John Doe</name>            <telephone type="mobile">05 1234 5678</telephone>            <email>jdoe@somedomain.com.au</email>        </listingAgent>        <price display="yes" >80000</price>        <priceView>To suit buyers 60K+</priceView>        <address display="yes">            <lotNumber>12</lotNumber>            <streetNumber>39</streetNumber>            <street>Main Road</street>            <suburb display="yes">RICHMOND</suburb>            <state>vic</state>            <postcode>3121</postcode>            <country>AUS</country>        </address>        <municipality>Yarra</municipality>        <estate>            <name>Panorama</name>            <stage>5</stage>        </estate>        <streetDirectory type="melways">            <page>44</page>            <reference>G7</reference>        </streetDirectory>        <landCategory name="Residential"/>        <headline>SHOW STOPPER!!!</headline>        <description>Don't pass up an opportunity like this! First to inspect will buy! Close to local amenities and schools. Features lavishly appointed bathrooms, modern kitchen, rustic outhouse</description>        <features>            <fullyFenced>yes</fullyFenced>        </features>        <landDetails>            <area unit="square">60</area>            <frontage unit="meter">20</frontage>            <depth unit="meter" side="rear">30</depth>            <crossOver value="left"/>        </landDetails>        <auction date="2009-01-24-12:30:00"/>        <vendorDetails>            <name>Mr. John Doe</name>            <telephone type="mobile">05 1234 5678</telephone>        </vendorDetails>        <externalLink href="http://www.realestate.com.au/"/>        <images>           <img id="m" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/imageM.jpg" format="jpg"></img>           <img id="a" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/imageA.jpg" format="jpg"></img>        </images>        <objects>            <floorplan id="1" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/floorplan1.gif" format="gif"></floorplan>            <floorplan id="2" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/floorplan2.gif" format="gif"></floorplan>         </objects>    </land></propertyList>
```

### Sold Listing

A sold land listing indicates the land has been sold. Include the sale details in the `soldDetails` element.

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE propertyList SYSTEM "http://reaxml.realestate.com.au/propertyList.dtd"><propertyList date="2009-01-01-12:30:00">    <land modTime="2009-01-01-12:30:00" status="sold">        <agentID>XNWXNW</agentID>        <uniqueID>ABCD12345</uniqueID>        <soldDetails>            <price display="yes" >85000</price>            <date>2009-01-10-12:30:00</date>        </soldDetails>    </land></propertyList>
```

### Withdrawn Listing

A withdrawn land listing removes the property from the platform.

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE propertyList SYSTEM "http://reaxml.realestate.com.au/propertyList.dtd"><propertyList date="2009-01-01-12:30:00">    <land modTime="2009-01-01-12:30:00" status="withdrawn">        <agentID>XNWXNW</agentID>        <uniqueID>ABCD123456</uniqueID>    </land></propertyList>
```

## Rural Listings

Rural listings represent farms, agricultural properties, and rural land.

### Current Listing

A current rural listing represents active rural property for sale. Include rural-specific fields like `ruralCategory` and `ruralFeatures`.

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE propertyList SYSTEM "http://reaxml.realestate.com.au/propertyList.dtd"><propertyList date="2009-01-01-12:30:00">  <rural modTime="2009-01-01-12:30:00" status="current">    <agentID>XNWXNW</agentID>    <uniqueID>ABCD1234</uniqueID>    <authority value="auction"/>    <underOffer value="no"/>    <listingAgent>      <name>Mr. John Doe</name>      <telephone type="mobile">05 1234 5678</telephone>      <email>jdoe@somedomain.com.au</email>      <facebookURL>https://facebook.com/profile.php?id=34523464</facebookURL>    </listingAgent>    <price display="no" >400000</price>    <priceView>To suit buyers 300K+</priceView>    <address display="yes">      <streetNumber>39</streetNumber>      <street>Main Road</street>      <suburb display="yes">RICHMOND</suburb>      <state>vic</state>      <postcode>3121</postcode>      <country>AUS</country>    </address>    <municipality>Yarra</municipality>    <streetDirectory type="melways">      <page>44</page>      <reference>G7</reference>    </streetDirectory>    <ruralCategory name="Cropping"/>    <headline>SHOW STOPPER!!!</headline>    <description>Don't pass up an opportunity like this! First to inspect will buy! Close to local amenities and schools. Features lavishly appointed bathrooms, modern kitchen, rustic outhouse.Don't pass up an opportunity like this! First to inspect will buy! Close to local amenities and schools. Features lavishly appointed bathrooms, modern kitchen, rustic outhouse.Don't pass up an opportunity like this! First to inspect will buy! Close to local amenities and schools. Features lavishly appointed bathrooms, modern kitchen, rustic outhouse.</description>    <features>      <bedrooms>4</bedrooms>      <bathrooms>2</bathrooms>      <ensuite>2</ensuite>      <garages>3</garages>      <carports>2</carports>      <remoteGarage>yes</remoteGarage>      <secureParking>yes</secureParking>      <airConditioning>1</airConditioning>      <alarmSystem>1</alarmSystem>      <vacuumSystem>no</vacuumSystem>      <intercom>no</intercom>      <pool type="inground">yes</pool>      <spa type="inground">no</spa>      <tennisCourt>yes</tennisCourt>      <balcony>yes</balcony>      <deck>yes</deck>      <courtyard>yes</courtyard>      <outdoorEnt>yes</outdoorEnt>      <shed>yes</shed>      <fullyFenced>yes</fullyFenced>      <openFirePlace>1</openFirePlace>      <heating type="other"/>      <hotWaterService type="gas"/>      <otherFeatures>balcony, courtyard, stables</otherFeatures>    </features>    <ruralFeatures>      <fencing>Boundary and internal fencing all in good condition</fencing>      <annualRainfall>250 mm per annum</annualRainfall>      <soilTypes>red basalt</soilTypes>      <improvements>Shearing shed, barn and machinery shed.</improvements>      <councilRates>$2,200 per annum</councilRates>      <irrigation>Electric pump from dam and bore.</irrigation>      <carryingCapacity>400 Deer or 100 head of breeding Cattle</carryingCapacity>      <services>Power, telephone, airstrip, school bus, mail.</services>    </ruralFeatures>    <landDetails>      <area unit="acre">50</area>      <frontage unit="meter">500</frontage>      <depth unit="meter" side="rear">400</depth>      <crossOver value="left"/>    </landDetails>    <buildingDetails>      <area unit="square">20</area>            <newlyBuilt value="yes"/>            <energyRating>4.5</energyRating>    </buildingDetails>    <inspectionTimes>      <inspection>21-Jan-2009 11:00am to 1:00pm</inspection>      <inspection>22-Jan-2009 1:00pm to 3:00pm</inspection>    </inspectionTimes>    <auction date="2009-01-24-14:30:00"/>    <vendorDetails>      <name>Mr. John Doe</name>      <telephone type="mobile">05 1234 5678</telephone>    </vendorDetails>    <externalLink href="http://www.realestate.com.au/"/>    <images>      <img id="m" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/imageM.jpg" format="jpg"/>      <img id="a" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/imageA.jpg" format="jpg"/>    </images>    <objects>      <floorplan id="1" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/floorplan1.gif" format="gif"/>      <floorplan id="2" modTime="2009-01-01-12:30:00" url="http://www.realestate.com.au/tmp/floorplan2.gif" format="gif"/>    </objects>  </rural></propertyList>
```

### Sold Listing

A sold rural listing indicates the property has been sold.

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE propertyList SYSTEM "http://reaxml.realestate.com.au/propertyList.dtd"><propertyList date="2009-01-01-12:30:00">  <rural modTime="2009-01-01-12:30:00" status="sold">    <agentID>XNWXNW</agentID>    <uniqueID>ABCD12345</uniqueID>    <soldDetails>      <price display="yes" >85000</price>      <date>2009-01-10-12:30:00</date>    </soldDetails>  </rural></propertyList>
```

### Withdrawn Listing

A withdrawn rural listing removes the property from the platform.

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE propertyList SYSTEM "http://reaxml.realestate.com.au/propertyList.dtd"><propertyList date="2009-01-01-12:30:00">  <rural modTime="2009-01-01-12:30:00" status="withdrawn">    <agentID>XNWXNW</agentID>    <uniqueID>ABCD123456</uniqueID>  </rural></propertyList>
```
