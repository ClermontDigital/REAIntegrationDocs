---
title: "Ratings & Reviews API"
source: https://partner.realestate.com.au/ratings-reviews/overview/
fetched_at: 2026-04-17T03:53:06.894Z
---

# Ratings & Reviews API

The Ratings and Reviews API allows authorised partners and customers to consume their ratings and reviews that they have received from consumers. This API provides partners the capability to display the curated and verified reviews on their own sites.

This API provides four endpoints:

-   [Get Reviews for an Agent](./usage.md#get-reviews-for-agent)
-   [Get Ratings and Reviews stats for Agents](./usage.md#get-ratings-and-reviews-stats-for-agents)
-   [Get Reviews for Agencies](./usage.md#get-reviews-for-agencies)
-   [Get Ratings and Review stats for Agencies](./usage.md#get-ratings-and-reviews-stats-for-agencies)

### Data included in API responses:

#### Reviews:

-   **Rating** - The number of stars from 1-5.
-   **Content** - The contents of the review given.
-   **Listing** - A link to the listing.
-   **Reviewer** - Contains the role and name of the consumer that created the review.
-   **Agent** - Contains the name of the agent (firstname + lastname, emails) being reviewed and also a link to their profile.
-   **Agency** - Contains the name of the agency the agent belongs to and a link to their profile
-   **Date of creation** - Date the review was created

**Note(\*):** Only the first letter of the last name of the reviewer is returned.

#### Ratings and Reviews stats:

-   **Average rating** - The average rating of all the reviews for the agent/agency.
-   **Total reviews** - Total number of reviews for the agent/agency.

### FAQs

#### Who can access the Ratings and Reviews API?

The Ratings and Reviews API is only available to realestate.com.au partners and customers.

#### How frequently is the data updated?

Ratings and reviews data is refreshed once a day. For more information about how a review gets moderated and then published please refer to [this article](https://help.realestate.com.au/hc/en-us/articles/360023765032-How-long-does-it-take-for-a-rating-and-review-to-appear-online-).

#### Can I specify how many reviews to return per page?

The Ratings and Reviews API will return up to a maximum of 10 reviews per page. Please refer to the [usage section](./usage.md) for more information.

#### Why am I getting a 401 Unauthorized error?

The Ratings and Reviews API requries a valid access token token. To obtain this token, please refer to the [Authentication](../getting-started/authentication.md) page to acquire an `access_token`. If the `access_token` is correct, please refer to the [usage section](./usage.md) and please check the request url is correct.

#### Why am I receiving no reviews in the response?

One of the `since` or `page` parameters must be provided. Please ensure you are providing at least one of these parameters in your request.
