---
title: "Changelog"
source: https://partner.realestate.com.au/ratings-reviews/changelog/
fetched_at: 2026-04-17T03:53:00.929Z
---

# Changelog

Date

Comments

26 August 2024

Updated error messages for when the cursor in the page query parameter is invalid

26 August 2024

Updated error messages for when more than 25 agents/agencies are provided as path parameters

20 June 2024

Updated the agent and agency review stats endpoints to return the `averageRating` rounded to one decimal place

29 April 2024

Added agent `emailAddresses` to the responses of review endpoints `/v1/ratings-reviews/agent/` and `/v1/ratings-reviews/agencies/`

10 April 2024

Changed `/v1/ratings-reviews/agent/` and `/v1/ratings-reviews/agencies/` to return `Bad Request (400)` instead of `Unauthorized (401)` for missing path parameters
