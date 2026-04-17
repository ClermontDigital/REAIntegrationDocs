---
title: "Changelog"
source: https://partner.realestate.com.au/campaign/changelog/
fetched_at: 2026-04-17T03:50:42.862Z
---

# Changelog

## 1.6.10 / 2025-11-21

-   Listing Performance
    -   Updated the `portalMetrics` to include new metrics
        -   `emailEnquiryEvents` represents the total number of unique visitors who made email enquiry for the listing.
    -   Updated the `productMetrics` to include new metrics.
        -   `productEvents` represents the events from the product.
        -   `uniqueImpression` represents the total number of unique visitor’s impression for audienceMaximiser.
        -   `publisherSourceAdImpression` represents the rank of the ad impression on publisher sites for audienceMaximiser.
        -   `suburbs` represents the top suburbs engaged with Amplify.

## 1.6.9 / 2025-11-17

-   Listing Performance
    -   Updated the `portalMetrics` to include new commercial metrics:
        -   `viewNearbyPlaces` represents the page views originating from listings in the nearby properties carousel
        -   `elitePlusCarouselImpressions` represents the impression count for elite plus listings in the homepage showcase
        -   `elitePlusCarouselListingClicks` represents the click count for elite plus listings in the homepage showcase
        -   `clicksFromTheAustralian` represents the property views with click-through source from The Australian
        -   `bundledNotificationDailyPageview` represents the page views from daily notifications

## 1.6.8 / 2025-10-29

-   Listing Performance
    -   Updated the `productMetrics` to include the total commercial Bundled Notifications metrics.
        -   The start date of commercial notification data is 2025/07/01

## 1.6.7 / 2025-10-17

-   Listing Performance
    -   Added new metric value `offersReceived` into `listingEvents` metric.
        -   `offersReceived` represents the total number of offers from realestate.com.au.
    -   Added new metric value `offersReceived` into `uniqueVisitorsEvents` metric.
        -   `offersReceived` represents the total number of people who put in an offer through realestate.com.au

## 1.6.6 / 2025-07-11

-   Listing Performance
    -   Added new metric value `tourThePropertyPhotoView` into `listingEvents` metric.
        -   `tourThePropertyPhotoView` represents the number of estimated photo views in tour the property (ttp). This metric, in conjunction with `searchResultPhotoView` and `propertyDetailPhotoView`, provides the complete number of views on photos added to this listing.
        -   `propertyDetailPhotoView` now also includes the number of times hero image is viewed on visiting the property details page.
    -   Updated the `portalMetrics` to include a new `videoViews` metrics which include two sub metrics.
        -   `propertyWalkthroughVideo` represents the number of times the ‘Play’ button was clicked for the property walkthrough video on the listing.
        -   `other` represents the number of times the ‘Play’ button was clicked for the videos other than the property walkthrough video.

## 1.6.5 / 2025-04-27

-   Listing Performance
    -   Updated the `portalMetrics` to include `marketPerformance`,`intentToInspectEvents`,`productSourceCampaignExposure`,`uniqueVisitorsEvents` metrics.
        -   marketPerformance represents the market median page view of similar listings.
        -   intentToInspectEvents represents total number of actions that show intent to inspect, including
            -   addedToPlan: Number of times user saves an inspection or auction to calendar
            -   registered: Number of times the consumer registered for an inspection.
        -   productSourceCampaignExposure represents the times your campaign has been exposed on realestate.com.au and beyond, includes breakdown by `searchResultsPage`, `eBrochure`, `amplify`, `notifications`, `propertyShowcase`, `suggestedProperties`.
        -   uniqueVisitorsEvents represents campaign events based on unique visitors.
            -   campaignExposure: Number of property seekers that has been served to on realestate.com.au and beyond.
            -   pageView: Number of unique visitors viewing the listing on realestate.com.au.
            -   enquiry: Number of property seekers that have emailed and revealed phone & SMS.
            -   intendToInspect: Number of property seekers that have taken inspection related actions on your listing.
    -   Added new metric value `campaignExposure`, `enquiry`, `intentToInspect` into `listingEvents` metric.
        -   Campaign exposure represents the number of consumer touchpoints facilitated by realestate.com.au for a property advertising campaign.
        -   Enquiry represents the total number of times consumers reached out to the agents.
        -   Intent to Inspect represents the total number of inspection related actions taken by consumers on realestate.com.au.
    -   Added new values into `productSourcePageView` metric to provide a breakdown of source of PDP page views originating from the suggested properties experience (`suggestedProperties`), Search results page (`searchResultsPage`) and Property showcase (`propertyShowcase`) .
        -   suggestedProperties represents the number of times the property details page is viewed that are attributable to suggested properties carousel.
        -   searchResultsPage represents the number of times the property details page is viewed that are attributable to search result page.
        -   propertyShowcase represents the number of times the property details page is viewed that are attributable to property showcase.

## 1.6.4 / 2024-09-30

-   Listing Performance
    -   Update the `productMetrics` to include Amplify and Bundled Notifications metrics.
    -   Update the `portalMetrics` to include Amplify and Bundled Notifications metrics.
    -   Update the `dataSourceLastUpdated`to include Amplify and Bundled Notifications metrics.

## 1.6.3 / 2023-12-01

-   Listing Performance
    -   LAM migration changes are deployed on 2023-11-08, the data start from 8 Nov will use data from LAM table.
    -   `searchResultPhotoView` and `propertyDetailPhotoView` are used to track each click, and the values of these two fields may increase.

## 1.6.2 / 2023-11-30

-   Retired Project Performance v1

## 1.6.1 / 2023-07-31

-   Listing Performance
    -   Add a new field `purchaseType` in `ProductPurchase`.

## 1.6.0 / 2023-04-04

-   Project Performance V2
    
    -   Fetch relevant data relating to all project profiles for an agency
    -   Fetch relevant data relating to one project profile by project profile id
-   eDM Campaign Performance
    
    -   Fetch relevant data relating to all eDM campaigns for an authorised user

## 1.5.0 / 2023-01-03

-   Commercial Listing Performance by Listing ID
    -   Added the daily portal metric history data and campaign info data for commercial listings starting from `2020-10-26`.

## 1.4.0 / 2021-11-29

-   Initial release of Display Performance
    -   Fetch relevant data relating to all display campaigns for an authorised user
    -   Fetch relevant data relating to display campaigns, flights, and creatives by campaign\_id for an authorised user

## 1.3.0 / 2020-10-12

-   Listing Performance
    -   Added inactive listing performance report for the endpoint `/listing-performance/:listing_id`.
    -   Added the daily portal metric history data starting from `2018-10-01`.
    -   Updated the `audienceMaximiser` in `dataSourceLastUpdated` to be nullable. Will be null if Audience Maximiser add on is not purchased.
    -   Updated the `eBrochure` in `dataSourceLastUpdated` to be nullable. Will be null if eBrochure add on is not purchased.
    -   Updated the page size for the endpoint `/listing-performance?agency_id=:agency_id`, from `100` down to `20` listing-performance items.
    -   Removed the 365 days limitation for daily metric history.
    -   Removed the monthly metrics from `metricPeriods`.
    -   Removed the fields `mapFlyoutPremiere`, `mapFlyoutFeature`, `mapFlyoutPlatinum`, `mapFlyoutStandard` and `mapFlyoutHighlight` from `portalMetrics`.

## 1.2.12 / 2020-07-29

-   The monthly `metricPeriods` is deprecated and will be removed in the near future.
-   The metrics `mapFlyoutPremiere`, `mapFlyoutFeature`, `mapFlyoutPlatinum`, `mapFlyoutStandard` and `mapFlyoutHighlight` from `portalMetrics` will be removed as well.

## 1.2.11 / 2019-06-26

-   Listing add-on performance ([eBrochure](https://customer.realestate.com.au/residential/ebrochure/))
    -   eBrochure add-on product performance metrics (if any) will appear in `productMetrics` array
    -   Any listings which have not purchased this additional add-on product will contain an empty `productMetrics` array
    -   Add extra data point for `productSourcePageView` to have `eBrochure` breakdown. `productSourcePageView` will have metrics `audienceMaximiser`, `eBrochure` and `other`

## 1.2.10 / 2019-04-15

-   Increase the number of days in daily breakdown
    -   Listing Performance data will increase maximum daily metric history from 90 days to 365 days.

## 1.2.9 / 2019-02-22

-   Listing add-on performance ([Audience Maximiser](https://customer.realestate.com.au/residential/audience-maximiser/))
    
    -   New `productMetrics` array to provide performance metrics for Listing Add-On Products from REA Group.
    -   The first Listing Add-On product to be included by end-Feb 2019 will be [Audience Maximiser](https://customer.realestate.com.au/residential/audience-maximiser/).
    -   Any listings which have not purchased this additional add-on product will contain an empty `productMetrics` array.
-   Data source currency
    
    -   We will also be adding a second new property `dataSourceLastUpdated` to provide a more granular view of the currency of different data types.
-   Payload compression
    
    -   The API will support a compression option to reduce the size of the payload for both `listing-performance` and `project-performance`.

## 1.2.8 / 2019-01-23

-   Listing Performance
    -   Add `productSourcePageView` metric group with metrics `audienceMaximiser` and `other`

## 1.2.7 / 2018-11-08

-   Listing Performance
    
    -   Added metric `searchResultsPageImpression` to `listingEvents` metric type for total, daily, and monthly metric periods
-   Project Performance
    
    -   Added metric `searchResultsPageImpression` to `listingEvents` metric type for total, daily, and monthly metric periods within each of `projectPagePerformance`, `totalProjectListingsPerformance`, and `projectListingsPerformance`
    -   Added metric `searchResultsPageImpressionProject` to `listingEvents` metric type for total, daily, and monthly metric periods within each of `totalProjectPerformance` and `projectPagePerformance`

## 1.2.6 / 2018-07-18

-   Listing Performance
    
    -   `audienceSourcePhoneReveal` metric group in all metric types
-   Project Performance
    
    -   `audienceSourcePhoneReveal` metric group in all metric types

## 1.2.5 / 2018-06-22

-   Project Performance
    -   `projectListingsPerformance` no longer contains self links for individual listings

## 1.2.5 / 2018-06-21

-   Project Performance
    -   Added metric `3dTourView` to `metricValues` within each of `totalProjectPerformance`, `projectPagePerformance`, `totalProjectListingsPerformance`, and `projectListingsPerformance`

## 1.2.4 / 2018-06-13

-   Project Performance
    -   Added `audienceSourcePageViews` metric to all metric types and metric periods

## 1.2.3 / 2018-05-25

-   Project Performance
    -   Added metric `viewStatementOfInformation` to `metricValues` within each of `totalProjectPerformance`, `projectPagePerformance`, `totalProjectListingsPerformance`, and `projectListingsPerformance`

## 1.2.2 / 2018-05-15

-   Listing Performance
    -   Added `audienceSourcePageViews` metric to total, daily and monthly portal metrics
    -   Added all metrics into daily and monthly portal metrics

## 1.2.1 / 2018-04-19

-   Listing Performance
    -   Added metric `viewStatementOfInformation` to the array of `metricValues` (i.e., `portalMetrics.all[metricName = "listingEvents"].metricPeriods[period = "all"].metricValues[]`)

## 1.2.0 / 2017-10-02

-   Project Performance
    -   Fetch single project-performance report by `project_id`
    -   Fetch all project-performance reports for an `agency_id`

## 1.1.0 / 2017-09-18

-   Remove the field `listing.dateActive`
-   Remove the field `listing.isOnTheMarket`
-   Add daily portal metrics: `portalMetrics.daily`
-   Add monthly portal metrics: `portalMetrics.monthly`
-   Structural changes to the listing-performance payload:
    -   Allow for portal metrics to be consistently split across time periods (“all”, “daily”, “monthly” etc.)
    -   Allow for multiple metric types (eg. “listingEvents”, and future metric types) to be returned in an extensible array
    -   Allow for leaf nodes (“metricValues”) to contain any name / value pairs, decoupled from metric or number type
    -   Total portal metrics (`portalMetrics.total`) becomes `portalMetrics.all[metricName = "listingEvents"].metricPeriods[period = "all"]`
    -   Daily portal metrics returned in `portalMetrics.daily[metricName = "listingEvents"].metricPeriods[period = "2017-09-18"]...` etc.
    -   Monthly portal returned in `portalMetrics.monthly[metricName = "listingEvents"].metricPeriods[period = "2017-09"]...` etc.
    -   `portalMetrics.total[].count` becomes `portalMetrics.all[metricName = "listingEvents"].metricPeriods[period = "all"].metricValues[].value`
-   Add Hypermedia Application Language (HAL) style Pagination to the `/listing-performance?` endpoint:
    -   One request to /listing-performance?agency\_id=ABCDEF will return a page of up to 100 listing-performance items, and include a link to the next page of the response (`_links.next.href`) if there are more items
    -   Subsequent pages will contain a link to the previous page of items (`_links.prev.href`)
    -   Follow the `_links.next.href` until there are no more `_links.next` (the last page of items)

## 1.0.0 / 2017-08-17

-   Initial campaign-api release
-   Fetch single listing-performance report by listing\_id
-   Fetch all listing-performance reports for an agency\_id
-   Total realestate\_au portal metrics for active listings
