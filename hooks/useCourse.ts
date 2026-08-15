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

      const data: Course[] = await response.json();

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

      const data: CountryCode = await response.json();

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
