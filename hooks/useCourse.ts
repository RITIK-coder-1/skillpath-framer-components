/* ---------------------------------------------------------------------------------
useCourse.ts
custom hook for fetching course data and the user's country code
----------------------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import type {
  Course,
  CourseHookData,
  CountryCode,
} from "../types/course_types.ts";

// the base URL for the API calls
const baseUrl = "https://syncsphere-hiv6.onrender.com";

/* ---------------------------------------------------------------------------------
runtime type guards
these validate that a parsed JSON response actually matches the shape I expect,
----------------------------------------------------------------------------------- */

// checks a single course object has the fields the UI actually renders, with the right types.
function isValidCourse(value: unknown): value is Course {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const c = value as Record<string, unknown>;

  return (
    typeof c.courseName === "string" &&
    typeof c.courseCode === "string" &&
    typeof c.description === "string" &&
    typeof c.mainCategory === "string" &&
    typeof c.mangoId === "string" &&
    typeof c.pricePaise === "number" &&
    Number.isFinite(c.pricePaise) &&
    typeof c.priceUsdCents === "number" &&
    Number.isFinite(c.priceUsdCents) &&
    typeof c.refundable === "boolean"
  );
}

// checks the response is actually an array of valid courses
function isValidCourseArray(value: unknown): value is Course[] {
  return Array.isArray(value) && value.every(isValidCourse);
}

// checks the country response is an object with country_code set to exactly "IN" or "US"
function isValidCountryCode(value: unknown): value is CountryCode {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const c = value as Record<string, unknown>;

  return c.country_code === "IN" || c.country_code === "US";
}

/* ---------------------------------------------------------------------------------
custom hook
----------------------------------------------------------------------------------- */

// fetches course data and country code independently
export default function useCourse(): CourseHookData {
  // stores the courses returned by the course API
  const [courses, setCourses] = useState<Course[]>([]);

  // stores the country code returned by the country API
  const [countryCode, setCountryCode] = useState<"US" | "IN" | null>(null);

  // tracks the loading state of the course API
  const [coursesLoading, setCoursesLoading] = useState(true);

  // tracks the loading state of the country API
  const [countryLoading, setCountryLoading] = useState(true);

  // stores an error from the course API
  const [coursesError, setCoursesError] = useState<string | null>(null);

  // stores an error from the country API
  const [countryError, setCountryError] = useState<string | null>(null);

  /* ---------------------------------------------------------------------------------
    fetch course data
    ----------------------------------------------------------------------------------- */

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${baseUrl}/assignment/course-data`);

      // if the response is not successful, throw an error
      if (!response.ok) {
        throw new Error(`Course API returned ${response.status}`);
      }

      const data: unknown = await response.json();

      // guard against a 200 response that doesn't actually match the shape the UI expects
      if (!isValidCourseArray(data)) {
        throw new Error("Course API returned an unexpected shape.");
      }

      // returning additional two fields with converted prices for display
      setCourses(
        data.map((ele) => {
          return {
            ...ele,
            priceRupee: ele.pricePaise / 100,
            priceUsdDollar: ele.priceUsdCents / 100,
          };
        })
      );
    } catch (error: unknown) {
      setCoursesError(
        error instanceof Error ? error.message : "Failed to fetch course data."
      );
    } finally {
      setCoursesLoading(false);
    }
  };

  /* ---------------------------------------------------------------------------------
    fetch country code
    ----------------------------------------------------------------------------------- */

  const fetchCountryCode = async () => {
    try {
      const response = await fetch(`${baseUrl}/assignment/country-code`);

      if (!response.ok) {
        throw new Error(`Country API returned ${response.status}`);
      }

      const data: unknown = await response.json();

      // guard against a 200 response with a missing or invalid country_code
      if (!isValidCountryCode(data)) {
        throw new Error("Country API returned an unexpected value.");
      }

      setCountryCode(data.country_code);
    } catch (error: unknown) {
      setCountryError(
        error instanceof Error ? error.message : "Failed to fetch country code."
      );
    } finally {
      setCountryLoading(false);
    }
  };

  /* ---------------------------------------------------------------------------------
    initialize API requests
    ----------------------------------------------------------------------------------- */

  useEffect(() => {
    // In a production app, I would use an AbortController here to cancel in-flight requests on unmount. Omitted here as this is a single-page app.
    fetchCourses();
    fetchCountryCode();
  }, []);

  /* ---------------------------------------------------------------------------------
    hook return value
    ----------------------------------------------------------------------------------- */

  return {
    courses,
    countryCode,
    coursesLoading,
    countryLoading,
    coursesError,
    countryError,
  };
}
