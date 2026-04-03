# Care Navigator

Care Navigator is a simple web MVP that helps patients understand what to do after a referral is approved. It guides the user from referral details to a clear next step, so the process feels easier to follow and less confusing.

## Problem

After a referral is approved, many patients are still left with basic questions:

- Which type of doctor should I see?
- Does my insurance plan match the next step?
- Who can I book with?
- What date and time are available?

When those steps are unclear, follow-up care can be delayed or missed. This MVP focuses on making that path easier to understand.

## Current User Flow

The current app flow is:

1. Choose a specialty
2. Choose an insurance plan
3. View the next steps page
4. Choose a doctor
5. Choose an appointment date
6. Choose an appointment time
7. Confirm the appointment

The experience is split across two pages:

- `index.html` for the initial referral step
- `results.html` for provider selection and appointment confirmation

## Multilingual Support

The MVP currently supports:

- English
- Español
- 中文

The selected language is saved in `localStorage` and carries across both pages.

## Features

- Simple referral intake flow
- Specialty selection
- Insurance plan selection
- Approved referral summary
- Provider card selection
- Appointment date selection
- Appointment time selection
- Appointment confirmation modal
- Multilingual UI support
- Local storage persistence for referral details and language
- Responsive layout for desktop and mobile

## Tech Stack

This MVP is built with:

- HTML
- CSS
- JavaScript
- `localStorage` for lightweight persistence

There is no backend or live scheduling integration in the current version. All provider, date, and time data is mock data used for the MVP flow.

## Future Improvements

- Connect to real referral and insurance data
- Add live provider availability
- Add real appointment scheduling
- Improve screen-reader and keyboard accessibility
- Add stronger form validation and empty-state handling
- Support patient login and session-based data
- Connect with clinical or hospital systems

## Project Goal

The goal of Care Navigator is to make referral follow-up easier to understand, easier to present, and easier to act on for patients. This MVP is a front-end prototype focused on clarity, guidance, and a simple care navigation experience.
