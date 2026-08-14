/* ---------------------------------------------------------------------------------
course_types.ts
types and interfaces for course related data
----------------------------------------------------------------------------------- */

// the details displayed on the course cards
export interface CourseCardProps {
  courseName: string;
  description: string;
  price: string;
  mainCategory: string;
}

// all the fields returned by the course API
export interface Course {
  courseName: string;
  courseCode: string;
  description: string;
  mainCategory: string;
  shortCourse: string;
  courseType: "Original" | string; // Restricted to 'Original' or string if more types exist
  pricePaise: number;
  priceUsdCents: number;
  mangoId: string;
  refundable: boolean;
  priceRupee?: number;
  priceUsdDollar?: number;
}

// for the country code structure
export interface CountryCode {
  country_code: "IN" | "US";
}

// the course data returned by the API hooks
export interface CourseHookData {
  courses: Course[];
  countryCode: string | null;
  coursesLoading: boolean;
  countryLoading: boolean;
  coursesError: string | null;
  countryError: string | null;
}
