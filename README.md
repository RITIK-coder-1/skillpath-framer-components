# Skillpath – Resilient Framer React Architecture

A resilient, production-grade course catalog landing page built inside **Framer** using modular **React + TypeScript** code components.

Built for the **WebVeda assignment**, with a focus on resilient API handling, graceful failure states, responsive UI architecture, precise currency formatting, and designer-friendly Framer Property Controls.

---

## 📋 Table of Contents

* [Overview](#-overview)
* [Architecture](#-architecture)
* [Project Structure](#-project-structure)
* [Key Engineering Decisions](#-key-engineering-decisions)

  * [Resilient Async Data Fetching](#1-resilient-async-data-fetching)
  * [Precise Currency Math & Localization](#2-precise-currency-math--localization)
  * [Framer Property Controls](#3-framer-property-controls)
  * [Responsive Layout](#4-fluid-responsive-layout)
* [UI State Machine](#-ui-state-machine)
* [Resilience Strategy](#-resilience-strategy)

---

## 🚀 Overview

**Skillpath** is a course catalog landing page implemented inside **Framer** with modular React components written in TypeScript.

The implementation is designed around a resilient architecture rather than a monolithic component. Data fetching, presentation, layout, types, and Framer-specific configuration are separated into focused modules.

The application also accounts for unreliable API behavior, including expected `404` and `500` responses, while ensuring that recoverable failures do not unnecessarily break the entire interface.

### Core goals

* Build a modular React architecture inside Framer.
* Handle unreliable API responses gracefully.
* Explicitly model loading, error, empty, partial-failure, and success states.
* Keep course discovery functional when non-critical data fails.
* Provide accurate INR and USD price calculations.
* Support dynamic localization based on the API response.
* Expose useful configuration options through Framer's visual canvas.
* Maintain a responsive layout across screen sizes.

---

## 🏛️ Architecture

The project follows a layered component architecture with clear separation of responsibilities:

```text
skillpath/
├── components/
│   ├── CourseSection.tsx
│   ├── CourseCard.tsx
│   ├── Header.tsx
│   └── Footer.tsx
│
├── hooks/
│   └── useCourse.ts
│
└── types/
    ├── course_types.ts
    └── course_property_controls.ts
```

### Architectural responsibilities

| Layer         | Responsibility                                |
| ------------- | --------------------------------------------- |
| `components/` | UI rendering and presentation                 |
| `hooks/`      | Async data fetching and state management      |
| `types/`      | TypeScript contracts and Framer control types |

### Component responsibilities

**`CourseSection.tsx`**

Acts as the primary section/container component. It is responsible for:

* Managing the course catalog layout.
* Consuming course data from the custom hook.
* Rendering the appropriate UI state.
* Handling Framer Property Controls.
* Passing relevant data to presentational components.

**`CourseCard.tsx`**

A pure presentational component responsible for rendering individual courses.

It does not own API or application-level state, keeping the component simple and reusable.

**`Header.tsx`**

Provides the main navigation header for the landing page.

**`Footer.tsx`**

Provides the page footer, including relevant links and copyright information.

**`useCourse.ts`**

Encapsulates the asynchronous API logic and associated UI state, including:

* Course data fetching.
* Country-code fetching.
* HTTP error handling.
* Loading state.
* Course-fetch errors.
* Partial failure handling.
* Derived localization information.

**`course_types.ts`**

Contains TypeScript interfaces used to describe API payloads and component contracts.

**`course_property_controls.ts`**

Contains types associated with Framer-specific property controls.

---

## ⚙️ Key Engineering Decisions

### 1. Resilient Async Data Fetching

The assignment API intentionally introduces unreliable responses, with the endpoints returning `404` and `500` status codes approximately one-third of the time.

A standard `fetch()` call does **not** reject its Promise merely because the server responds with an HTTP error status. Therefore, the implementation explicitly checks the response:

```ts
if (!response.ok) {
    // Handle HTTP failure
}
```

This ensures that HTTP failures are converted into meaningful application states instead of allowing failed requests to silently produce incomplete or broken UI.

#### Independent API requests

The application consumes two separate endpoints:

```text
/assignment/course-data
/assignment/country-code
```

These requests are handled independently rather than treating them as a single all-or-nothing operation.

This distinction is important because the country code is supplementary information, while course data is essential to the catalog itself.

#### Graceful partial failure

If:

* `/assignment/course-data` succeeds, and
* `/assignment/country-code` fails,

the course catalog **continues to render normally**.

Instead of making the entire section unusable, the price area displays a non-intrusive fallback message:

> Refresh to view the price.

This preserves the primary user goal — discovering courses — even when secondary localization data is temporarily unavailable.

---

### 2. Precise Currency Math & Localization

The API provides prices using integer-based currency units.

The implementation converts these values into displayable currency amounts without introducing unnecessary floating-point assumptions.

#### INR

The API's `pricePaise` value is converted to rupees by dividing by `100`:

```text
199900 paise ÷ 100 = ₹1,999
```

#### USD

The API's `priceUsdCents` value is converted to dollars by dividing by `100`:

```text
3999 cents ÷ 100 = $39.99
```

This keeps the conversion logic explicit and predictable.

#### Dynamic localization

The `/assignment/country-code` endpoint determines which currency should be displayed.

The UI therefore dynamically switches between:

* **INR (`₹`)**
* **USD (`$`)**

based on the country-code response.

If the country-code request fails, the application avoids displaying potentially incorrect pricing and instead communicates that the user should refresh to retrieve the price.

---

### 3. Canvas-Native Property Controls

The implementation uses Framer's `addPropertyControls` functionality to expose useful configuration options (course section heading and the gap among the course cards) directly inside the visual canvas.

This allows non-technical users to modify presentation-related properties without changing the underlying code.

#### `heading`

Uses:

```text
ControlType.String
```

Allows the section heading to be edited directly from the Framer interface.

#### `courseCardGap`

Uses:

```text
ControlType.Number
```

Provides a slider-based control for adjusting the spacing between course cards.

This keeps visual configuration separate from application logic while making the component more flexible for designers.

---

### 4. Fluid Responsive Layout

The course catalog uses a fluid CSS Grid:

```css
grid-template-columns: repeat(auto-fit, minmax(208px, 1fr));
```

This allows the grid to automatically adapt to the available viewport width rather than relying on rigid breakpoint-specific column definitions.

The result is a layout that scales naturally across:

* Mobile
* Tablet
* Desktop

### Description truncation

Course descriptions use line clamping to prevent long descriptions from creating inconsistent card heights:

```css
-webkit-line-clamp: 2;
```

This maintains visual consistency while still allowing meaningful course information to remain visible.

---

## 🔄 UI State Machine

The interface explicitly handles **five runtime states**:

| UI State            | Trigger Condition                                   | Visual Behavior                                                           |
| ------------------- | --------------------------------------------------- | ------------------------------------------------------------------------- |
| **Loading**         | Initial network request is in progress              | Displays a styled `Loading courses...` container.                         |
| **Error**           | `/course-data` returns `404` or `500`               | Displays an informative error card asking the user to refresh.            |
| **Zero Results**    | API returns an empty `[]` array                     | Displays a `No courses found.` fallback container.                        |
| **Partial Failure** | Course data succeeds but country-code request fails | Displays courses normally with a `Refresh to view the price.` message.    |
| **Working**         | Both endpoints return `200 OK`                      | Displays the complete course grid with dynamic pricing and category tags. |

### State flow

```text
                    ┌──────────────────┐
                    │     Loading      │
                    └────────┬─────────┘
                             │
                    API requests complete
                             │
                 ┌───────────┴───────────┐
                 │                       │
          Course request fails     Course request succeeds
                 │                       │
                 ▼                       ▼
              ERROR              ┌───────────────┐
                                 │ Courses empty?│
                                 └───────┬───────┘
                                         │
                              ┌──────────┴──────────┐
                              │                     │
                            Yes                     No
                              │                     │
                              ▼                     ▼
                       ZERO RESULTS        Country request?
                                                │
                                      ┌─────────┴─────────┐
                                      │                   │
                                    Fails              Succeeds
                                      │                   │
                                      ▼                   ▼
                              PARTIAL FAILURE        WORKING
```

---

## 🛡️ Resilience Strategy

A central architectural principle of the implementation is that **not every failure should have the same consequence**.

The application distinguishes between **critical** and **non-critical** data.

### Critical dependency

**Course data** is essential.

If `/assignment/course-data` fails, there is no meaningful catalog to display, so the interface transitions into an explicit error state.

### Non-critical dependency

**Country code** is supplementary.

If `/assignment/country-code` fails, users can still browse the course catalog. Only localized pricing becomes unavailable.

This produces a more resilient failure model:

```text
Course Data
    │
    ├── Success ───────────────► Render catalog
    │
    └── Failure ───────────────► Show error state


Country Code
    │
    ├── Success ───────────────► Render localized price
    │
    └── Failure ───────────────► Keep catalog + price fallback
```

The result is a UI that degrades gracefully instead of treating every network failure as a complete application failure.

---

## 🧩 Design Principles

The implementation follows several principles throughout the architecture:

### Separation of concerns

Fetching, state management, presentation, typing, and Framer configuration are kept in separate modules.

### Explicit failure handling

Network and HTTP failures are treated as expected runtime conditions rather than exceptional cases that can be ignored.

### Graceful degradation

The application preserves as much functionality as possible when a non-critical dependency fails.

### Type safety

TypeScript interfaces define the expected shape of API data and component contracts.

### Designer-friendly configuration

Visual properties that are likely to change are exposed through Framer's Property Controls rather than requiring code changes.

### Responsive by default

The layout adapts to available space using fluid CSS rather than relying exclusively on fixed viewport breakpoints.

---

## 🎯 Result

The final implementation provides a **modular, resilient, and designer-friendly Framer React architecture** capable of handling unreliable API behavior while maintaining a usable course discovery experience.

Rather than simply rendering the happy path, the application explicitly accounts for:

* Network/API failures
* HTTP `404` and `500` responses
* Empty datasets
* Partial API failures
* Dynamic currency localization
* Responsive layouts
* Designer-controlled presentation properties

This makes the course catalog more predictable and robust under real-world runtime conditions.
