---
title: "Changelog"
source: https://partner.realestate.com.au/tenant-selection/changelog/
fetched_at: 2026-04-17T03:53:18.425Z
---

# Changelog

## 1.3.0 / 2023-06-15

-   Surface additional data points about the application and its tenants.
    -   New fields added to application details (`rentOfferAmount`,`isShortlisted`)
    -   New fields added to applicant (`Pets`,`hasOrWillInspect`,`inspectionDate`,`otherOccupants`)
    -   New resource `Pets` (`dogs`,`cats`,`others`)

## 1.2.1 / 2022-04-20

-   Update usage document to mention that default behaviour about automatically decline previously approved application.

## 1.2.0 / 2021-04-09

-   Poll updated applications which belong to `agencyIds` and updated since `happenedSince`.

## 1.2.0 / 2021-04-09

-   Updated application status endpoint `/applications/{applicationId}/status`
    -   Updated request body parameters to enable change conflict detection:
    -   Renamed `status` to `toStatus` for the new status of the specified application.
    -   Added `fromStatus`, which must contain the previous application status.

## 1.1.0 / 2021-02-01

-   Updated the parameter `agencyIds` to be optional for the endpoint `/applications/published/feed`.

## 1.0.0 / 2020-08-28

-   Initial tenant-selection-api release.
-   Poll applications which belong to `agencyIds` and published since `happenedSince`.
-   Update the `status` and `statusLastUpdatedAt` of the specific application.
